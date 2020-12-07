/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const conversation: FlowTypes.Conversation[] = [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "c55e8977-9cd1-4d69-b747-fe06de2eceb5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4227ddf1-0659-4384-b812-d7f960323aa5",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a020886a-2fba-4e42-9885-e1931560a575"
              }
            ],
            "exits": [
              {
                "uuid": "e1fd1298-98b1-40af-825c-be4ae4c29ec8",
                "destination_uuid": "07f59ab3-98a6-440e-92c2-7689f113b779"
              }
            ]
          },
          {
            "uuid": "07f59ab3-98a6-440e-92c2-7689f113b779",
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
                "uuid": "4e9a506e-df70-4452-8a7b-c304b8317b6a"
              }
            ],
            "exits": [
              {
                "uuid": "b45898b7-f638-4cfc-9c91-aa1bff0fa621",
                "destination_uuid": "f935652a-16d2-4a1d-89dc-93581a51b11e"
              }
            ]
          },
          {
            "uuid": "f935652a-16d2-4a1d-89dc-93581a51b11e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "82ea3bc2-a82a-46b3-aaae-9a86e58f442d",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "bae0affd-0576-4e64-879e-0a54d213cfc5",
                  "type": "has_only_phrase",
                  "uuid": "17ea40a9-7b37-4e54-985d-1f3f0f7d6227"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "195e3441-e0e3-462f-ab3a-a657deb2aa0c",
                  "type": "has_only_phrase",
                  "uuid": "a25ce422-d120-493b-bce1-faff9437d589"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "5599e58d-4e9f-4284-8683-4f1607cfc06d",
                  "type": "has_only_phrase",
                  "uuid": "973b3c9a-151e-44b0-805b-1a66c930cd4c"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "bcfb5f43-fc9c-4ec3-a981-05e6fa30d99c",
                  "type": "has_only_phrase",
                  "uuid": "bfecb77a-8163-434d-a490-aff98d13e9d6"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "e9e13338-441c-4aa8-bcbb-6d961f2585d1",
                  "type": "has_only_phrase",
                  "uuid": "890b67be-fc65-4632-8065-40c8e05c51af"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "62bf7e73-8e1f-4d74-b3b1-11bb268402ab",
                  "name": "All Responses",
                  "uuid": "82ea3bc2-a82a-46b3-aaae-9a86e58f442d"
                },
                {
                  "exit_uuid": "958088b1-21af-41a1-87e9-ee5844b59b3e",
                  "name": "First option: launch example_media flow",
                  "uuid": "bae0affd-0576-4e64-879e-0a54d213cfc5"
                },
                {
                  "exit_uuid": "bd054780-2f12-4eba-b099-3bed3e4d4090",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "195e3441-e0e3-462f-ab3a-a657deb2aa0c"
                },
                {
                  "exit_uuid": "1d02e43e-5555-4b63-87de-fce53ad5373e",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "5599e58d-4e9f-4284-8683-4f1607cfc06d"
                },
                {
                  "exit_uuid": "ba501650-6b7a-458a-879f-bc6af708b940",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "bcfb5f43-fc9c-4ec3-a981-05e6fa30d99c"
                },
                {
                  "exit_uuid": "9f0294e8-2dd4-4146-a635-eb1f8ca502f1",
                  "name": "Stay in this flow.",
                  "uuid": "e9e13338-441c-4aa8-bcbb-6d961f2585d1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "62bf7e73-8e1f-4d74-b3b1-11bb268402ab",
                "destination_uuid": null
              },
              {
                "uuid": "958088b1-21af-41a1-87e9-ee5844b59b3e",
                "destination_uuid": "ffa0f90f-c6ca-416e-be38-6a45f7b9ee64"
              },
              {
                "uuid": "bd054780-2f12-4eba-b099-3bed3e4d4090",
                "destination_uuid": "8a152294-d30a-49d9-b6c3-2de6f51bce8e"
              },
              {
                "uuid": "1d02e43e-5555-4b63-87de-fce53ad5373e",
                "destination_uuid": "66e0ea61-c8c0-4bc2-8ffb-6217cd5aa3a8"
              },
              {
                "uuid": "ba501650-6b7a-458a-879f-bc6af708b940",
                "destination_uuid": "d554aa19-9628-4b6c-9d34-eeca7737c53e"
              },
              {
                "uuid": "9f0294e8-2dd4-4146-a635-eb1f8ca502f1",
                "destination_uuid": "7f3515af-c6e6-4c73-93a2-7e3cd9779774"
              }
            ]
          },
          {
            "uuid": "ffa0f90f-c6ca-416e-be38-6a45f7b9ee64",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "07dd836a-f6b9-4691-8207-c67624820966"
                },
                "type": "enter_flow",
                "uuid": "2c3fa376-b06d-4aaf-836c-c7feae64970a"
              }
            ],
            "exits": [
              {
                "uuid": "ce49d961-e02b-4f8e-8e47-9a0215ae851d",
                "destination_uuid": "aae73f9c-56b9-495a-bd7f-e4dadf8e4dd3"
              },
              {
                "uuid": "15b5ebee-1575-4cb6-8a97-4b6480b7193b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "de7e9c97-f7cd-4455-9675-ac869016cf4f",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "3d478fc4-bedc-400b-8578-a3c0511e2b8f"
                },
                {
                  "uuid": "8c5e4d4f-fe2b-4ccb-8321-2112bbaf54d4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "3849cc4d-67ab-44c4-a628-06adc7770240"
                }
              ],
              "categories": [
                {
                  "uuid": "3d478fc4-bedc-400b-8578-a3c0511e2b8f",
                  "name": "Complete",
                  "exit_uuid": "ce49d961-e02b-4f8e-8e47-9a0215ae851d"
                },
                {
                  "uuid": "3849cc4d-67ab-44c4-a628-06adc7770240",
                  "name": "Expired",
                  "exit_uuid": "15b5ebee-1575-4cb6-8a97-4b6480b7193b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "3d478fc4-bedc-400b-8578-a3c0511e2b8f"
            }
          },
          {
            "uuid": "8a152294-d30a-49d9-b6c3-2de6f51bce8e",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "1feed399-ed00-48a3-99a0-682b11f3d506"
                },
                "type": "enter_flow",
                "uuid": "41ae7336-45c9-4ffc-a886-ddcd8bfe503d"
              }
            ],
            "exits": [
              {
                "uuid": "be9aef63-2729-4618-83b8-ad3371203dda",
                "destination_uuid": "aae73f9c-56b9-495a-bd7f-e4dadf8e4dd3"
              },
              {
                "uuid": "35246e0e-c214-4750-a7f2-80d159756bfa",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "47a95d82-0bdb-4b25-a6c6-c657a02c67f4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "cee5f3be-8dc0-4dc3-8513-42b68f810adf"
                },
                {
                  "uuid": "46bb3fcf-6cde-48d0-a5be-563d042deb93",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "ecfb799e-f60f-4910-b14f-62442dfdcf86"
                }
              ],
              "categories": [
                {
                  "uuid": "cee5f3be-8dc0-4dc3-8513-42b68f810adf",
                  "name": "Complete",
                  "exit_uuid": "be9aef63-2729-4618-83b8-ad3371203dda"
                },
                {
                  "uuid": "ecfb799e-f60f-4910-b14f-62442dfdcf86",
                  "name": "Expired",
                  "exit_uuid": "35246e0e-c214-4750-a7f2-80d159756bfa"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "cee5f3be-8dc0-4dc3-8513-42b68f810adf"
            }
          },
          {
            "uuid": "66e0ea61-c8c0-4bc2-8ffb-6217cd5aa3a8",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "6bddaff2-0a25-49b0-a178-0c6333fbba3a"
                },
                "type": "enter_flow",
                "uuid": "b561325e-1e4d-49c0-b953-54a3ecfe800b"
              }
            ],
            "exits": [
              {
                "uuid": "440892ac-7a52-4254-a3b1-3dc585571a78",
                "destination_uuid": "aae73f9c-56b9-495a-bd7f-e4dadf8e4dd3"
              },
              {
                "uuid": "7c7a7d88-b95f-4207-9f4e-a8bf9bcddb4d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "bcfa2dda-58dd-4b30-b098-35a4baa010cb",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "05d010b0-98bc-491f-bc6a-e4b236e30c39"
                },
                {
                  "uuid": "ff0a5c6f-4d8b-4cd3-af5e-a6abecc7de08",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "500f3104-ea08-44f8-86e1-677b76d69943"
                }
              ],
              "categories": [
                {
                  "uuid": "05d010b0-98bc-491f-bc6a-e4b236e30c39",
                  "name": "Complete",
                  "exit_uuid": "440892ac-7a52-4254-a3b1-3dc585571a78"
                },
                {
                  "uuid": "500f3104-ea08-44f8-86e1-677b76d69943",
                  "name": "Expired",
                  "exit_uuid": "7c7a7d88-b95f-4207-9f4e-a8bf9bcddb4d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "05d010b0-98bc-491f-bc6a-e4b236e30c39"
            }
          },
          {
            "uuid": "d554aa19-9628-4b6c-9d34-eeca7737c53e",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "a6cda3d6-1370-4226-b941-32815eac5a0f"
                },
                "type": "enter_flow",
                "uuid": "1815c76f-96ea-4883-b2f9-ef0005a24cdc"
              }
            ],
            "exits": [
              {
                "uuid": "ae3eba6e-c5e5-4677-9c40-4cfa44d10f39",
                "destination_uuid": "aae73f9c-56b9-495a-bd7f-e4dadf8e4dd3"
              },
              {
                "uuid": "4a469413-74bd-4e07-84e2-bef1a6340b1e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "f2f511ea-d9ea-4292-bcdd-955d4a06d439",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7630c428-830c-4ca4-bcd0-9035ec1a5c71"
                },
                {
                  "uuid": "2fd86b3b-126d-4c17-a6a3-574585c836b2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a3a80c6f-bd35-4cbe-9d0f-a6b02b555721"
                }
              ],
              "categories": [
                {
                  "uuid": "7630c428-830c-4ca4-bcd0-9035ec1a5c71",
                  "name": "Complete",
                  "exit_uuid": "ae3eba6e-c5e5-4677-9c40-4cfa44d10f39"
                },
                {
                  "uuid": "a3a80c6f-bd35-4cbe-9d0f-a6b02b555721",
                  "name": "Expired",
                  "exit_uuid": "4a469413-74bd-4e07-84e2-bef1a6340b1e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7630c428-830c-4ca4-bcd0-9035ec1a5c71"
            }
          },
          {
            "uuid": "7f3515af-c6e6-4c73-93a2-7e3cd9779774",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "47b9595d-a7ea-44ab-94a3-9047e98a7f1f"
              }
            ],
            "exits": [
              {
                "uuid": "8c42e3bf-c0b1-4891-a1c4-233087094f56",
                "destination_uuid": "57954440-ac61-40d6-a7fa-3b61de74d53c"
              }
            ]
          },
          {
            "uuid": "aae73f9c-56b9-495a-bd7f-e4dadf8e4dd3",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9dfa4768-87ca-4412-8b46-6fba7a11b786"
              }
            ],
            "exits": [
              {
                "uuid": "3e1fc75b-778b-43aa-aa98-969f5bcf26d0",
                "destination_uuid": "57954440-ac61-40d6-a7fa-3b61de74d53c"
              }
            ]
          },
          {
            "uuid": "57954440-ac61-40d6-a7fa-3b61de74d53c",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "733c30ca-fd04-42a7-b9b1-745d88635c59"
              }
            ],
            "exits": [
              {
                "uuid": "cfc44d29-c6ed-44c4-b344-402a9e808f97",
                "destination_uuid": "45d4c645-5974-42dd-9ef2-1257f5f2ae30"
              }
            ]
          },
          {
            "uuid": "45d4c645-5974-42dd-9ef2-1257f5f2ae30",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a2aef140-ab17-4470-919e-7132fbd2997d",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "30ed70ed-bd4f-4f1c-8599-7ec745f8889c",
                  "type": "has_only_phrase",
                  "uuid": "e823f278-f78b-44f3-aadb-e286742512d1"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "cd713b36-fe29-4d99-9de9-7c50905bad0d",
                  "type": "has_only_phrase",
                  "uuid": "763cfad0-7f1b-4a56-b8bd-4d2e74f72ec6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "91f1741b-66e7-40a8-a830-8982b3381aa2",
                  "name": "All Responses",
                  "uuid": "a2aef140-ab17-4470-919e-7132fbd2997d"
                },
                {
                  "exit_uuid": "920ebdd6-0335-4b5e-b8e1-ed653d03913f",
                  "name": "Yes",
                  "uuid": "30ed70ed-bd4f-4f1c-8599-7ec745f8889c"
                },
                {
                  "exit_uuid": "18b2a19d-6472-48e1-832e-7f232ec06ede",
                  "name": "No",
                  "uuid": "cd713b36-fe29-4d99-9de9-7c50905bad0d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "91f1741b-66e7-40a8-a830-8982b3381aa2",
                "destination_uuid": null
              },
              {
                "uuid": "920ebdd6-0335-4b5e-b8e1-ed653d03913f",
                "destination_uuid": "07f59ab3-98a6-440e-92c2-7689f113b779"
              },
              {
                "uuid": "18b2a19d-6472-48e1-832e-7f232ec06ede",
                "destination_uuid": "69a212ee-5b41-4e5f-a01b-f05d6dd55c22"
              }
            ]
          },
          {
            "uuid": "69a212ee-5b41-4e5f-a01b-f05d6dd55c22",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1245f208-9ed7-458b-bf16-4ff8a9c13ba3"
              }
            ],
            "exits": [
              {
                "uuid": "9aaf47d4-f4a8-445c-85d5-af473ecb3a52",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "86591f74-27d8-4fe8-86a1-f825904299c9",
            "actions": [
              {
                "uuid": "6ec1e356-07ef-451b-9ad9-3be44ae75a8d",
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
                "uuid": "f29deed2-6187-4627-a995-8465128d0229",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c77aee85-1eaa-40f9-921f-21d8ff5140c6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8c328e55-ad68-4899-a6f9-9b0c75b6cf30",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9f560ceb-ae54-478d-b23c-f0cd44d7692a"
              }
            ],
            "exits": [
              {
                "uuid": "14bc67d9-c9c3-4007-b2dd-c7536caf51e9",
                "destination_uuid": "ff41f6f8-0383-4291-b04d-d2a767075047"
              }
            ]
          },
          {
            "uuid": "466685d9-a890-4a58-a8a1-357987f39ace",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "66cde89b-9139-4619-a5a9-792717a081b2"
              }
            ],
            "exits": [
              {
                "uuid": "c9df6bcd-05a7-4034-b9fb-8b863edc0984",
                "destination_uuid": "5f3f5339-4568-4163-b4ba-dd798ea4a41f"
              }
            ]
          },
          {
            "uuid": "5f3f5339-4568-4163-b4ba-dd798ea4a41f",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "0721bef3-ba30-4e78-958a-7eb92a63c0b5"
              }
            ],
            "exits": [
              {
                "uuid": "37c18a3f-7e5d-45da-8fa6-25f0952f4695",
                "destination_uuid": "711f4f30-2e5a-4ffe-97d8-69c5c2f0a6af"
              }
            ]
          },
          {
            "uuid": "711f4f30-2e5a-4ffe-97d8-69c5c2f0a6af",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b60faf9a-c0f7-439f-b71a-15d4e0d4ade8",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "b9cd75b6-971d-46ef-a048-eeb415f77b11",
                  "type": "has_only_phrase",
                  "uuid": "c9bafb7e-d853-470a-ad91-43a8642944b3"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "b9cd75b6-971d-46ef-a048-eeb415f77b11",
                  "type": "has_only_phrase",
                  "uuid": "0c46f9b4-4016-4540-813b-54ef89c76809"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8e288cb6-adc6-4d92-90bc-bc083f5b8f43",
                  "name": "All Responses",
                  "uuid": "b60faf9a-c0f7-439f-b71a-15d4e0d4ade8"
                },
                {
                  "exit_uuid": "c36d5061-c075-4469-ad1f-287785cd4dc7",
                  "name": "image1; image2",
                  "uuid": "b9cd75b6-971d-46ef-a048-eeb415f77b11"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8e288cb6-adc6-4d92-90bc-bc083f5b8f43",
                "destination_uuid": null
              },
              {
                "uuid": "c36d5061-c075-4469-ad1f-287785cd4dc7",
                "destination_uuid": "fba19f22-25a9-4f73-96cb-f2c8b13ef8ac"
              }
            ]
          },
          {
            "uuid": "fba19f22-25a9-4f73-96cb-f2c8b13ef8ac",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "c5960f5a-1b7c-46ab-a76f-80f0da8285cd"
              }
            ],
            "exits": [
              {
                "uuid": "5f5580ca-e732-403a-8111-a0a5420bab55",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ff41f6f8-0383-4291-b04d-d2a767075047",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4f4bf713-2e6b-4e51-af91-5450a665527c",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "6cf27649-f248-4636-806d-692d6af5c1a0",
                  "type": "has_only_phrase",
                  "uuid": "9fcad6bf-e981-480e-b597-75580d296922"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "6cf27649-f248-4636-806d-692d6af5c1a0",
                  "type": "has_only_phrase",
                  "uuid": "faf28a76-894b-47ff-bc21-31deb61877e9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "824207b2-ae42-4bce-b8e1-5437feeea99f",
                  "name": "All Responses",
                  "uuid": "4f4bf713-2e6b-4e51-af91-5450a665527c"
                },
                {
                  "exit_uuid": "0b4c4752-cd04-428b-9324-bcb1f8e8d573",
                  "name": "image1; image2",
                  "uuid": "6cf27649-f248-4636-806d-692d6af5c1a0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "824207b2-ae42-4bce-b8e1-5437feeea99f",
                "destination_uuid": "466685d9-a890-4a58-a8a1-357987f39ace"
              },
              {
                "uuid": "0b4c4752-cd04-428b-9324-bcb1f8e8d573",
                "destination_uuid": "0a77bb02-9245-4669-beca-8bb3be8e75f0"
              }
            ]
          },
          {
            "uuid": "0a77bb02-9245-4669-beca-8bb3be8e75f0",
            "actions": [
              {
                "uuid": "fd901500-5aa5-4d93-9e78-2bb1d0be2d2a",
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
                "uuid": "77a72e42-1b80-486f-a2a2-3a2a986c5480",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "7bbd17fd-b9c2-43ac-bc81-e52d06c29834",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3b7ea356-e072-43ab-a319-6310cfeda913",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "98b11694-c6df-4502-a302-fe880367d37c"
              }
            ],
            "exits": [
              {
                "uuid": "f3e189ff-b017-48a8-b696-44b6ff3b7106",
                "destination_uuid": "65178f92-bdaf-48db-b84a-2cf5f3a76d15"
              }
            ]
          },
          {
            "uuid": "65178f92-bdaf-48db-b84a-2cf5f3a76d15",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c57eb58c-2149-4e8d-930f-2d308b9e46b8",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "8dd19bdc-b888-401d-951d-3c65e719b649",
                  "type": "has_only_phrase",
                  "uuid": "15509eeb-065b-449f-ae96-037ef9de4f3b"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "dea934f8-6d55-4fa3-a92b-7b41092ba6f7",
                  "type": "has_only_phrase",
                  "uuid": "90591221-a814-4c28-b7b6-613fa512bd99"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a2665b86-f1ba-401d-bcdb-f4ab29228415",
                  "name": "All Responses",
                  "uuid": "c57eb58c-2149-4e8d-930f-2d308b9e46b8"
                },
                {
                  "exit_uuid": "4572e102-be0d-49ce-8cd1-ca237dcdeea7",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "8dd19bdc-b888-401d-951d-3c65e719b649"
                },
                {
                  "exit_uuid": "23e39c89-6ffd-45f7-a33a-d9f770a14092",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "dea934f8-6d55-4fa3-a92b-7b41092ba6f7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a2665b86-f1ba-401d-bcdb-f4ab29228415",
                "destination_uuid": null
              },
              {
                "uuid": "4572e102-be0d-49ce-8cd1-ca237dcdeea7",
                "destination_uuid": "961849f0-e0c0-47eb-b65c-7875881f9315"
              },
              {
                "uuid": "23e39c89-6ffd-45f7-a33a-d9f770a14092",
                "destination_uuid": "4177572b-b015-4fe4-bfc0-662177253db2"
              }
            ]
          },
          {
            "uuid": "961849f0-e0c0-47eb-b65c-7875881f9315",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "f1647501-5f94-473f-98de-65dfbc0f9ab7"
              }
            ],
            "exits": [
              {
                "uuid": "3d0304ea-64d5-48b0-9d91-e6e12fc312af",
                "destination_uuid": "68dae495-bf1f-45c3-8afb-e0047b092324"
              }
            ]
          },
          {
            "uuid": "4177572b-b015-4fe4-bfc0-662177253db2",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "11978295-7dac-46e5-9aad-ce1ac329d1c6"
              }
            ],
            "exits": [
              {
                "uuid": "25ac75aa-d67c-49b7-85a6-2c778e13d306",
                "destination_uuid": "68dae495-bf1f-45c3-8afb-e0047b092324"
              }
            ]
          },
          {
            "uuid": "68dae495-bf1f-45c3-8afb-e0047b092324",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a3b1efc8-ed96-4d46-b6a7-577967970d76",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "51b2d432-9fae-4c16-bc3c-58070797d93b",
                  "type": "has_only_phrase",
                  "uuid": "dd572c04-4920-4b8c-8b5f-4bd29b265ade"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "f6dc7359-e568-4691-b1b1-9760a5caa247",
                  "type": "has_only_phrase",
                  "uuid": "b3b22c9d-e525-405b-870d-9c8ec68e5029"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "59b503ea-dcad-4f82-a3fc-21d2fee06e5e",
                  "type": "has_only_phrase",
                  "uuid": "05dcae83-5b91-4fe5-919d-ebd0e5527623"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e6c28f14-650d-4bf4-b8ac-ee26b1dd4987",
                  "name": "All Responses",
                  "uuid": "a3b1efc8-ed96-4d46-b6a7-577967970d76"
                },
                {
                  "exit_uuid": "f0ef4802-8d3f-4cdc-85e2-265ba3f51ea6",
                  "name": "Hello",
                  "uuid": "51b2d432-9fae-4c16-bc3c-58070797d93b"
                },
                {
                  "exit_uuid": "5a125e1f-f9fa-436c-bca7-69a5ccf3df59",
                  "name": "Goodbye",
                  "uuid": "f6dc7359-e568-4691-b1b1-9760a5caa247"
                },
                {
                  "exit_uuid": "150ee638-6235-4870-bab6-46198bcd16ea",
                  "name": "Goodbye",
                  "uuid": "59b503ea-dcad-4f82-a3fc-21d2fee06e5e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e6c28f14-650d-4bf4-b8ac-ee26b1dd4987",
                "destination_uuid": null
              },
              {
                "uuid": "f0ef4802-8d3f-4cdc-85e2-265ba3f51ea6",
                "destination_uuid": "3bad590c-1350-4f79-8880-b7f775b97a9c"
              },
              {
                "uuid": "5a125e1f-f9fa-436c-bca7-69a5ccf3df59",
                "destination_uuid": "34487283-434c-4bf4-9367-805e37b6f5d4"
              },
              {
                "uuid": "150ee638-6235-4870-bab6-46198bcd16ea",
                "destination_uuid": "34487283-434c-4bf4-9367-805e37b6f5d4"
              }
            ]
          },
          {
            "uuid": "3bad590c-1350-4f79-8880-b7f775b97a9c",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4ee741a0-0b41-4691-a594-bf73a7efb80e"
              }
            ],
            "exits": [
              {
                "uuid": "aa98f555-93c0-42c4-a364-cc579fccc8f6",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "34487283-434c-4bf4-9367-805e37b6f5d4",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "16dd0723-2ce4-4972-9eb4-f1582b398c32"
              }
            ],
            "exits": [
              {
                "uuid": "aa6bdf3b-2947-4924-846f-fcbcf65e53f7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "a69f2211-ed99-4eb4-b675-d497b8426d1e",
            "actions": [
              {
                "uuid": "3f8ed7f3-03df-4f46-b37d-b470afb59ea2",
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
                "uuid": "9686577d-0eaf-4f31-8511-fd445152c2f4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3376cc0d-ef74-4b2f-8321-e6b1cbdda897",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5dc393f2-e99a-43d7-b3a7-626cdcd451ca",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2dd47efb-5cfa-4f44-bd64-cfdb6c132e80"
              }
            ],
            "exits": [
              {
                "uuid": "16a2b7a9-005c-4472-b79e-5b4d685411ff",
                "destination_uuid": "0348abc5-1a7f-44b1-8e84-529b824ec74f"
              }
            ]
          },
          {
            "uuid": "0348abc5-1a7f-44b1-8e84-529b824ec74f",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "c95c6c6d-f845-43db-8473-dd229eae581b"
              }
            ],
            "exits": [
              {
                "uuid": "9f896912-a55c-40a3-8a60-1c026864c5d5",
                "destination_uuid": "b4b0509b-b8f3-4919-a4a3-82d4795c46b6"
              }
            ]
          },
          {
            "uuid": "b4b0509b-b8f3-4919-a4a3-82d4795c46b6",
            "actions": [],
            "exits": [
              {
                "uuid": "0e43a8fd-3dba-4805-96d5-aec2f6d447e0",
                "destination_uuid": "7858d260-73f5-4e41-8a31-6ff2639ac520"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a9d61466-84ab-4f63-8846-48ed0da359e0",
              "cases": [],
              "categories": [
                {
                  "uuid": "a9d61466-84ab-4f63-8846-48ed0da359e0",
                  "name": "All Responses",
                  "exit_uuid": "0e43a8fd-3dba-4805-96d5-aec2f6d447e0"
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
            "uuid": "7858d260-73f5-4e41-8a31-6ff2639ac520",
            "actions": [
              {
                "uuid": "265dc1e2-b819-4f54-b271-ace0c301c036",
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
                "uuid": "6d6e4605-ddf1-4265-8a62-d5cfbb0fd673",
                "destination_uuid": "e804394f-5b6c-4caa-a9d1-d5dd93c47cd3"
              }
            ]
          },
          {
            "uuid": "e804394f-5b6c-4caa-a9d1-d5dd93c47cd3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "96a29167-9f0a-4bcb-ac3a-e458b66db3e8",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "6b09b02d-7b69-47f5-85a8-e16aa30752f8",
                  "type": "has_only_phrase",
                  "uuid": "5dd1e328-c95d-4ac1-b582-88c8ef490456"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "1bba89dd-3e7a-4927-a61c-730cb31f5aed",
                  "type": "has_only_phrase",
                  "uuid": "e6fa6552-89bd-4b6a-9cbd-80c38fade878"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "108cc69a-3e94-4790-bf17-870389bcb644",
                  "name": "All Responses",
                  "uuid": "96a29167-9f0a-4bcb-ac3a-e458b66db3e8"
                },
                {
                  "exit_uuid": "6ecc38fe-e754-41a0-9003-86ce791885e4",
                  "name": "1",
                  "uuid": "6b09b02d-7b69-47f5-85a8-e16aa30752f8"
                },
                {
                  "exit_uuid": "4725f5b2-a9a6-4220-a364-7d0984f54a88",
                  "name": "2",
                  "uuid": "1bba89dd-3e7a-4927-a61c-730cb31f5aed"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "108cc69a-3e94-4790-bf17-870389bcb644",
                "destination_uuid": "6ff091a1-9b8d-44e5-8200-dd8d1f157202"
              },
              {
                "uuid": "6ecc38fe-e754-41a0-9003-86ce791885e4",
                "destination_uuid": "9f74341d-da99-41b7-b3b4-eb60d038f39b"
              },
              {
                "uuid": "4725f5b2-a9a6-4220-a364-7d0984f54a88",
                "destination_uuid": "9e4b6bcd-952a-4a91-b170-23a9baefb406"
              }
            ]
          },
          {
            "uuid": "9f74341d-da99-41b7-b3b4-eb60d038f39b",
            "actions": [
              {
                "uuid": "ce68784d-9595-4869-9a1a-fc4eddd32846",
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
                "uuid": "a19793ff-f7dd-4cd5-8f32-c346b6822f2d",
                "destination_uuid": "daaa96cc-2976-440a-a150-28aab8e7f9ca"
              }
            ]
          },
          {
            "uuid": "9e4b6bcd-952a-4a91-b170-23a9baefb406",
            "actions": [
              {
                "uuid": "00d48d87-ee19-4b2d-a271-723c97b77ff1",
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
                "uuid": "8b802115-9a44-408e-a7f3-817fdec88213",
                "destination_uuid": "e2384aca-15cd-4532-a824-32df848cbf9d"
              }
            ]
          },
          {
            "uuid": "6ff091a1-9b8d-44e5-8200-dd8d1f157202",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6bf2ab00-8a58-4d8e-b898-4b5a43c813d1"
              }
            ],
            "exits": [
              {
                "uuid": "eec38345-c945-4208-b048-98e91b86ebcd",
                "destination_uuid": "2420655b-6b0c-4ebd-93b3-dc6e3c195ad8"
              }
            ]
          },
          {
            "uuid": "2420655b-6b0c-4ebd-93b3-dc6e3c195ad8",
            "actions": [],
            "exits": [
              {
                "uuid": "09be3938-271e-49de-80b6-2aa9f40f14ea",
                "destination_uuid": "a24a4a45-164f-4714-b430-d77ea518bbc6"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a21c5047-6326-49b3-9c3f-ad16ec853733",
              "cases": [],
              "categories": [
                {
                  "uuid": "a21c5047-6326-49b3-9c3f-ad16ec853733",
                  "name": "All Responses",
                  "exit_uuid": "09be3938-271e-49de-80b6-2aa9f40f14ea"
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
            "uuid": "a24a4a45-164f-4714-b430-d77ea518bbc6",
            "actions": [
              {
                "uuid": "1b65a663-8dd7-43b3-8075-b2bb91db5281",
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
                "uuid": "47344c0d-ec74-4608-af2e-ee5fca954e8d",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "daaa96cc-2976-440a-a150-28aab8e7f9ca",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7f2b517f-289b-43df-b17e-71c6edcefa44"
              }
            ],
            "exits": [
              {
                "uuid": "8ebfcdd3-3369-4174-a9a4-844473f668b4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "e2384aca-15cd-4532-a824-32df848cbf9d",
            "actions": [
              {
                "uuid": "189af31e-df03-4ae7-962d-af0421041106",
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
                "uuid": "89134b6e-9e3c-4d78-9a25-bf4348623f33",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d52259ab-63e2-48dc-bf3a-4aad3e097814",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7a5e6c51-68d1-4abd-846c-802adc453077",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "99562adc-e5a2-44fa-a317-2bfbd989a5b9"
              }
            ],
            "exits": [
              {
                "uuid": "011d8a83-a929-4746-95e4-9df609b0d372",
                "destination_uuid": "3774f6e4-81af-4637-92b8-c2ecbe3f739d"
              }
            ]
          },
          {
            "uuid": "3774f6e4-81af-4637-92b8-c2ecbe3f739d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0cfa5525-afa3-4773-be85-e0214436b992",
              "cases": [
                {
                  "arguments": [
                    "Go to the story"
                  ],
                  "category_uuid": "03b9d604-d7a7-4ce8-b628-cb475c76cad1",
                  "type": "has_only_phrase",
                  "uuid": "77d85712-17e6-45b5-b07d-d309af026f91"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "030f02ee-f7a8-4288-8807-1cd82c9341fb",
                  "name": "All Responses",
                  "uuid": "0cfa5525-afa3-4773-be85-e0214436b992"
                },
                {
                  "exit_uuid": "0265cf85-47e1-428a-8abe-258fafac45da",
                  "name": "Go to the story",
                  "uuid": "03b9d604-d7a7-4ce8-b628-cb475c76cad1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "030f02ee-f7a8-4288-8807-1cd82c9341fb",
                "destination_uuid": null
              },
              {
                "uuid": "0265cf85-47e1-428a-8abe-258fafac45da",
                "destination_uuid": "8339940b-13a6-4db4-a00c-880b2a79cad9"
              }
            ]
          },
          {
            "uuid": "8339940b-13a6-4db4-a00c-880b2a79cad9",
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
                "uuid": "b4f778c6-d31a-4dbf-bfdd-f5708509f05b"
              }
            ],
            "exits": [
              {
                "uuid": "c81c93ff-5170-4fc5-97c5-f5a4b940a8ca",
                "destination_uuid": "e228b3c0-e728-461a-8eb3-dffa86bca718"
              }
            ]
          },
          {
            "uuid": "e228b3c0-e728-461a-8eb3-dffa86bca718",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f7d91a49-464a-48d3-a526-145825c13f32",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9fafc98d-0430-41f2-b225-d7180be14f5c",
                  "type": "has_only_phrase",
                  "uuid": "9e4cfc7a-26d8-4961-8834-fc823f4ee559"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "84ac7ad3-c34c-4343-8374-049f62216bca",
                  "name": "All Responses",
                  "uuid": "f7d91a49-464a-48d3-a526-145825c13f32"
                },
                {
                  "exit_uuid": "6ad998ec-f56e-4d47-8648-b16d2afcf42f",
                  "name": "Next",
                  "uuid": "9fafc98d-0430-41f2-b225-d7180be14f5c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "84ac7ad3-c34c-4343-8374-049f62216bca",
                "destination_uuid": null
              },
              {
                "uuid": "6ad998ec-f56e-4d47-8648-b16d2afcf42f",
                "destination_uuid": "62da5b92-7387-421f-9c27-5168eb806b4c"
              }
            ]
          },
          {
            "uuid": "62da5b92-7387-421f-9c27-5168eb806b4c",
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
                "uuid": "d0a8ac95-77c8-404a-8e83-6465741b28f1"
              }
            ],
            "exits": [
              {
                "uuid": "9b4edd44-58b7-43e5-999d-243186e12129",
                "destination_uuid": "b75b4dec-a57a-4dd7-9ca4-e6b46e49fdb1"
              }
            ]
          },
          {
            "uuid": "b75b4dec-a57a-4dd7-9ca4-e6b46e49fdb1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1e662bf5-4e11-4699-be30-fbc712e4cb18",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "88e7ac1a-31be-4281-9aea-2fe54bd5fcc3",
                  "type": "has_only_phrase",
                  "uuid": "740944f2-b620-4e20-9518-a9424c4e2a68"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "33a3536d-afbf-4aa4-8580-83135cf49557",
                  "type": "has_only_phrase",
                  "uuid": "db2ac101-e2c5-4026-8317-fa676ee39b1b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ab8db866-d728-4e11-967c-98ec9fe4f75b",
                  "name": "All Responses",
                  "uuid": "1e662bf5-4e11-4699-be30-fbc712e4cb18"
                },
                {
                  "exit_uuid": "ecaacbea-d1d6-473d-bcc2-dedfd1b9815d",
                  "name": "Previous",
                  "uuid": "88e7ac1a-31be-4281-9aea-2fe54bd5fcc3"
                },
                {
                  "exit_uuid": "a98df5dd-5bab-4faa-9131-1934ce71157b",
                  "name": "Next",
                  "uuid": "33a3536d-afbf-4aa4-8580-83135cf49557"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ab8db866-d728-4e11-967c-98ec9fe4f75b",
                "destination_uuid": null
              },
              {
                "uuid": "ecaacbea-d1d6-473d-bcc2-dedfd1b9815d",
                "destination_uuid": "8339940b-13a6-4db4-a00c-880b2a79cad9"
              },
              {
                "uuid": "a98df5dd-5bab-4faa-9131-1934ce71157b",
                "destination_uuid": "d0fd9d95-26a5-4800-bd3e-a0c6217a41b3"
              }
            ]
          },
          {
            "uuid": "d0fd9d95-26a5-4800-bd3e-a0c6217a41b3",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d486c741-58ad-4b4f-b44e-b614b8b3bf83"
              }
            ],
            "exits": [
              {
                "uuid": "e84c0fb7-6bfc-48ab-9bdb-f325ba4110cc",
                "destination_uuid": "f8065473-f434-4d8b-8812-99ae4a7d5f37"
              }
            ]
          },
          {
            "uuid": "f8065473-f434-4d8b-8812-99ae4a7d5f37",
            "actions": [
              {
                "uuid": "e4eea1ef-12da-4bdb-83b2-58fdc9924ef7",
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
                "uuid": "83f75920-d5a3-4b18-8718-4591442be1c5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "9c42bf0a-4ca1-4514-924c-f488c275b678",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b07f70a7-dc15-46a2-81ab-6d97ff4fd795",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fc4f1235-e566-4a4a-8c2c-0bf134c965fa"
              }
            ],
            "exits": [
              {
                "uuid": "07f8a853-864e-4e27-bb64-31073116d508",
                "destination_uuid": "c9e2f3fc-5355-43d6-992c-c22ba9ae8b96"
              }
            ]
          },
          {
            "uuid": "c9e2f3fc-5355-43d6-992c-c22ba9ae8b96",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "5656d29c-7a70-4905-a4ab-b2199d40a20b"
              }
            ],
            "exits": [
              {
                "uuid": "2d79c151-bc8d-42c2-987f-860b2b133d5d",
                "destination_uuid": "714c1777-b2c1-4538-b234-2ff08d017b53"
              }
            ]
          },
          {
            "uuid": "714c1777-b2c1-4538-b234-2ff08d017b53",
            "actions": [],
            "exits": [
              {
                "uuid": "9256ab1b-43da-4f13-ac68-ec09ce77776b",
                "destination_uuid": "d7cc2718-5f3d-4aed-bc29-8a060baeb94c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d2697996-3476-4c2e-891d-865082e1b498",
              "cases": [],
              "categories": [
                {
                  "uuid": "d2697996-3476-4c2e-891d-865082e1b498",
                  "name": "All Responses",
                  "exit_uuid": "9256ab1b-43da-4f13-ac68-ec09ce77776b"
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
            "uuid": "d7cc2718-5f3d-4aed-bc29-8a060baeb94c",
            "actions": [
              {
                "uuid": "e8fb7f77-cbe1-4863-8397-c2862d5928a8",
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
                "uuid": "c552367e-6f5a-4422-a232-c3f4885706a1",
                "destination_uuid": "b0c7b28c-283c-4310-a3b8-d55acb0debcd"
              }
            ]
          },
          {
            "uuid": "b0c7b28c-283c-4310-a3b8-d55acb0debcd",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "4febabc6-ab8a-4a3e-a476-f094b24521b9"
                },
                "type": "enter_flow",
                "uuid": "201c9588-65d9-4431-8c2d-9907778bb956"
              }
            ],
            "exits": [
              {
                "uuid": "8ef41a35-074d-473d-a550-631c7ebf4cb9",
                "destination_uuid": "5ebe5fb9-64f4-437b-a463-dbb4c70f463e"
              },
              {
                "uuid": "4bf670b8-fcb7-4cb4-a738-0a62f7bf431a",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "d827d1af-480c-4618-8ff8-684dfac8fc62",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "655c5db8-8715-4465-9dab-b37d56dc685e"
                },
                {
                  "uuid": "2c189ac8-ebc8-4628-a15c-ffdbb31c52ab",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "41d3eafe-2efb-4810-83e2-59cc4d0b66f7"
                }
              ],
              "categories": [
                {
                  "uuid": "655c5db8-8715-4465-9dab-b37d56dc685e",
                  "name": "Complete",
                  "exit_uuid": "8ef41a35-074d-473d-a550-631c7ebf4cb9"
                },
                {
                  "uuid": "41d3eafe-2efb-4810-83e2-59cc4d0b66f7",
                  "name": "Expired",
                  "exit_uuid": "4bf670b8-fcb7-4cb4-a738-0a62f7bf431a"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "655c5db8-8715-4465-9dab-b37d56dc685e"
            }
          },
          {
            "uuid": "5ebe5fb9-64f4-437b-a463-dbb4c70f463e",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "24d9d4e4-0659-4249-a47a-5e64eb115be9"
              }
            ],
            "exits": [
              {
                "uuid": "5270f1fe-0111-4782-90ee-e0175ffdaedb",
                "destination_uuid": "b41f00e5-ae19-4faf-b10e-e991fb3bc88f"
              }
            ]
          },
          {
            "uuid": "b41f00e5-ae19-4faf-b10e-e991fb3bc88f",
            "actions": [],
            "exits": [
              {
                "uuid": "5b3eb97d-7a8b-4c38-a899-4cd2f106bf68",
                "destination_uuid": "2b905704-b6a9-4d46-9ef0-f70ee7f70515"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "846c3dd1-2256-4ff5-a646-3be88899e825",
              "cases": [],
              "categories": [
                {
                  "uuid": "846c3dd1-2256-4ff5-a646-3be88899e825",
                  "name": "All Responses",
                  "exit_uuid": "5b3eb97d-7a8b-4c38-a899-4cd2f106bf68"
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
            "uuid": "2b905704-b6a9-4d46-9ef0-f70ee7f70515",
            "actions": [
              {
                "uuid": "e3767526-f39e-42df-b54a-7e3a055a510e",
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
                "uuid": "80083dc0-c7a6-4436-ae8d-ab597550603f",
                "destination_uuid": "b11ffe5f-9e21-4527-a312-fb8bffc75c7c"
              }
            ]
          },
          {
            "uuid": "b11ffe5f-9e21-4527-a312-fb8bffc75c7c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5cff6a4b-1eb1-4389-91fa-974ad48d4d7f",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "531347da-fedf-4a67-816c-874ef77b52b7",
                  "type": "has_only_phrase",
                  "uuid": "0355e70c-28e4-48b0-b908-09fad3d756a6"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "3c641f1f-5212-4df7-bdd1-5d2e04b1d2fa",
                  "type": "has_only_phrase",
                  "uuid": "3c07a2c9-49cd-448c-ac62-a2759ffa5420"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d41840f3-14b7-426b-b0e7-0c26a7ba2949",
                  "name": "All Responses",
                  "uuid": "5cff6a4b-1eb1-4389-91fa-974ad48d4d7f"
                },
                {
                  "exit_uuid": "fbfa389d-c264-48d8-8427-ea9447cc8dd6",
                  "name": "guide1",
                  "uuid": "531347da-fedf-4a67-816c-874ef77b52b7"
                },
                {
                  "exit_uuid": "5c0d6bd3-a96f-4fdf-b54f-4d91b89d514c",
                  "name": "guide2",
                  "uuid": "3c641f1f-5212-4df7-bdd1-5d2e04b1d2fa"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "d41840f3-14b7-426b-b0e7-0c26a7ba2949",
                "destination_uuid": null
              },
              {
                "uuid": "fbfa389d-c264-48d8-8427-ea9447cc8dd6",
                "destination_uuid": "091ce702-0127-41ab-b323-1adc9b5ae405"
              },
              {
                "uuid": "5c0d6bd3-a96f-4fdf-b54f-4d91b89d514c",
                "destination_uuid": "8386ac6a-5889-42a8-9e0c-543c9c9ffa08"
              }
            ]
          },
          {
            "uuid": "091ce702-0127-41ab-b323-1adc9b5ae405",
            "actions": [
              {
                "uuid": "6feb97ed-6aa0-4288-958f-bece2b3057b5",
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
                "uuid": "694068af-6d94-4ac9-9074-176518db2c42",
                "destination_uuid": "0c21fc23-aaf0-4981-9743-1ad8e95b538e"
              }
            ]
          },
          {
            "uuid": "8386ac6a-5889-42a8-9e0c-543c9c9ffa08",
            "actions": [
              {
                "uuid": "78331544-8cf1-47a6-a7de-7c51118f7f76",
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
                "uuid": "451ee691-91ac-40d7-9e77-e0a37e968539",
                "destination_uuid": "0c21fc23-aaf0-4981-9743-1ad8e95b538e"
              }
            ]
          },
          {
            "uuid": "0c21fc23-aaf0-4981-9743-1ad8e95b538e",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fa9f64e2-2e5b-43d1-8ec9-678594bd89d9"
              }
            ],
            "exits": [
              {
                "uuid": "1436cb34-6af4-4270-ae72-61b8a08c9a8b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1e07d993-4ae5-4e19-9d6e-adc3eaec130d",
            "actions": [
              {
                "uuid": "3ba2d578-fba4-43ea-8483-03495c312e2b",
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
                "uuid": "5b0bdb0b-1dc9-44e6-a066-7e3932f012f6",
                "destination_uuid": "314d668b-046c-4b0e-bb35-d4fc105bdf30"
              }
            ]
          },
          {
            "uuid": "314d668b-046c-4b0e-bb35-d4fc105bdf30",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "294828a5-2f4a-41d6-8767-434f2a26cc27"
                },
                "type": "enter_flow",
                "uuid": "700fe320-a44c-4d6b-bdf5-0314fb228934"
              }
            ],
            "exits": [
              {
                "uuid": "227562ba-3ec4-47d2-83d8-25327c45d66f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "989e8685-ae5f-45a7-8eb0-75fa6904146d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "bdb783f8-15b2-4346-b81c-6c3e4e2686e1",
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
                "uuid": "3ad4eefb-72a9-47e3-8b35-1407704be9ec"
              }
            ],
            "exits": [
              {
                "uuid": "a83ce2e2-f56f-46a9-a737-cc0e5bfd74c0",
                "destination_uuid": "a5adaa4b-bad6-4dfe-aec2-f5f42081ea80"
              }
            ]
          },
          {
            "uuid": "a5adaa4b-bad6-4dfe-aec2-f5f42081ea80",
            "actions": [],
            "exits": [
              {
                "uuid": "cae2ed98-bcce-4d0c-a6fb-3507525d60c2",
                "destination_uuid": "fbc6a74e-12b8-490d-9f41-88275eabbabf"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b34f5689-3e9a-4ce0-8466-996ae71399ac",
              "cases": [],
              "categories": [
                {
                  "uuid": "b34f5689-3e9a-4ce0-8466-996ae71399ac",
                  "name": "All Responses",
                  "exit_uuid": "cae2ed98-bcce-4d0c-a6fb-3507525d60c2"
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
            "uuid": "fbc6a74e-12b8-490d-9f41-88275eabbabf",
            "actions": [
              {
                "uuid": "cbefbbdc-1255-4897-9b92-fe3f3b0f7757",
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
                "uuid": "1d9059d2-cb40-4ef4-ba7c-77f8b66928fc",
                "destination_uuid": "85bd3067-7bb4-4bd0-b18a-436ba6c81093"
              }
            ]
          },
          {
            "uuid": "85bd3067-7bb4-4bd0-b18a-436ba6c81093",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b6ec42aa-0d6d-472f-8425-ce3396ee22c4"
              }
            ],
            "exits": [
              {
                "uuid": "15f5e0d4-f479-4f92-9456-c594cfddd9ff",
                "destination_uuid": "c7d69a78-e839-4cf8-aff8-a177d77d25e1"
              }
            ]
          },
          {
            "uuid": "c7d69a78-e839-4cf8-aff8-a177d77d25e1",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "10b937c6-fd36-41c5-a251-197adc1e37cb"
              }
            ],
            "exits": [
              {
                "uuid": "a843468b-cd01-4e1a-8450-50150f891bf7",
                "destination_uuid": "91ba40cb-e14c-4751-a462-567dafee7909"
              }
            ]
          },
          {
            "uuid": "91ba40cb-e14c-4751-a462-567dafee7909",
            "actions": [
              {
                "flow": {
                  "name": "calm_5",
                  "uuid": "1635517f-5b9e-479a-b285-db4247c64dca"
                },
                "type": "enter_flow",
                "uuid": "602255f8-8c42-4bba-8620-e253058dde4d"
              }
            ],
            "exits": [
              {
                "uuid": "a32eef79-dafb-4e2b-b0f3-371dbff5e554",
                "destination_uuid": "06fb94b9-14ec-4d6a-ab81-caa7a2fd91ee"
              },
              {
                "uuid": "2f152b46-e416-4cc9-a9c8-4d81c9d9cf16",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "70f4df41-d3fb-4f38-95fd-56e3e54969c8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "88d2a4af-7646-44d2-a9c3-a168c53129de"
                },
                {
                  "uuid": "0b2a2898-2ed2-4ed1-83ca-145d15d800f4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c0cc682e-5955-44e1-81dc-d56b3b9274ca"
                }
              ],
              "categories": [
                {
                  "uuid": "88d2a4af-7646-44d2-a9c3-a168c53129de",
                  "name": "Complete",
                  "exit_uuid": "a32eef79-dafb-4e2b-b0f3-371dbff5e554"
                },
                {
                  "uuid": "c0cc682e-5955-44e1-81dc-d56b3b9274ca",
                  "name": "Expired",
                  "exit_uuid": "2f152b46-e416-4cc9-a9c8-4d81c9d9cf16"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "88d2a4af-7646-44d2-a9c3-a168c53129de"
            }
          },
          {
            "uuid": "06fb94b9-14ec-4d6a-ab81-caa7a2fd91ee",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b5b5741c-ce13-424c-815e-ab655d4008a8"
              }
            ],
            "exits": [
              {
                "uuid": "b5c7817e-95f1-468a-9084-2c2b722565cc",
                "destination_uuid": "279edf7e-6721-4043-ab30-f69e10320f6c"
              }
            ]
          },
          {
            "uuid": "279edf7e-6721-4043-ab30-f69e10320f6c",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "fb6aea60-cb21-48a4-9ea8-0857e14fed3c"
              }
            ],
            "exits": [
              {
                "uuid": "60f06969-a302-461a-b67c-4a4205826a8d",
                "destination_uuid": "07efa97b-a318-4344-9e27-f7554558b017"
              }
            ]
          },
          {
            "uuid": "07efa97b-a318-4344-9e27-f7554558b017",
            "actions": [],
            "exits": [
              {
                "uuid": "40313069-8ab5-4ac3-bc02-1ac87d59e20d",
                "destination_uuid": "0b800f05-b797-4e8b-89ad-300dc430b242"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9152d939-d63d-4fca-a6c4-35d97d7e4df8",
              "cases": [],
              "categories": [
                {
                  "uuid": "9152d939-d63d-4fca-a6c4-35d97d7e4df8",
                  "name": "All Responses",
                  "exit_uuid": "40313069-8ab5-4ac3-bc02-1ac87d59e20d"
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
            "uuid": "0b800f05-b797-4e8b-89ad-300dc430b242",
            "actions": [
              {
                "uuid": "d3103f64-4c39-467a-ac9a-98242d692555",
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
                "uuid": "627bd57c-0eb2-41b8-b7cc-7540ea1c4398",
                "destination_uuid": "26452577-7a26-401e-a9af-dac6391b93b6"
              }
            ]
          },
          {
            "uuid": "26452577-7a26-401e-a9af-dac6391b93b6",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0b86fe46-46c4-4b26-9d81-a264981ac8f2"
              }
            ],
            "exits": [
              {
                "uuid": "3501b5d3-98ed-49cf-8542-d98642f9dc90",
                "destination_uuid": "134e9a4f-3ae2-43f5-8953-f25fb4ec2152"
              }
            ]
          },
          {
            "uuid": "134e9a4f-3ae2-43f5-8953-f25fb4ec2152",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3c47cbb9-2fd6-48e0-b9d3-454dc6bad3f6"
              }
            ],
            "exits": [
              {
                "uuid": "a918e801-d678-4d72-9390-16f367154417",
                "destination_uuid": "eca64009-21a0-4ca8-b07f-f843f740ecec"
              }
            ]
          },
          {
            "uuid": "eca64009-21a0-4ca8-b07f-f843f740ecec",
            "actions": [
              {
                "uuid": "2dba5b51-2679-4a66-b313-262ecaca73d1",
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
                "uuid": "3604d504-9b32-4325-b91e-833ef339042f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e31e3ff1-1934-4f5f-b2ea-ff1466a36367",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "273320f6-40e0-4794-b903-c0c8bfe474a2",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9ce87d86-d897-40bc-960c-a97eef6f33d6"
              }
            ],
            "exits": [
              {
                "uuid": "6720e083-acf0-48ae-ad79-cfc9a584ebec",
                "destination_uuid": "8cd8ef47-65fa-4da2-9ae1-c7512533193a"
              }
            ]
          },
          {
            "uuid": "8cd8ef47-65fa-4da2-9ae1-c7512533193a",
            "actions": [
              {
                "uuid": "9e10f785-1d03-4adb-8d2f-80d7af6795ad",
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
                "uuid": "b1fd95d5-2641-4c28-aea8-b1a9663600d9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "daaba55f-9d63-4903-a275-9bca925d9471",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b3a2e417-da6d-48a3-b07a-ef0a0f566b3d",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "550f453e-ee7c-428a-b0c5-76ad3233f505"
              }
            ],
            "exits": [
              {
                "uuid": "760bc182-a62a-43e6-afb0-3236ae4399f6",
                "destination_uuid": "cbb01d5b-6ad1-431e-a907-d57c902a742b"
              }
            ]
          },
          {
            "uuid": "cbb01d5b-6ad1-431e-a907-d57c902a742b",
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
                "uuid": "8cdcb5f0-4a85-4a5f-8966-6d1a4f3a56a7"
              }
            ],
            "exits": [
              {
                "uuid": "97de0306-0ee7-416d-8513-6334840fdeb4",
                "destination_uuid": "a7bbb815-c061-4782-87e8-0916971a91b2"
              }
            ]
          },
          {
            "uuid": "a7bbb815-c061-4782-87e8-0916971a91b2",
            "actions": [],
            "exits": [
              {
                "uuid": "5ebd50dd-d5f7-4e52-b170-8dc6717d2eaf",
                "destination_uuid": "b7596103-6e54-4517-8921-0e85716588e2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f2556de5-f7dd-4283-a68c-e242d4ee80f0",
              "cases": [],
              "categories": [
                {
                  "uuid": "f2556de5-f7dd-4283-a68c-e242d4ee80f0",
                  "name": "All Responses",
                  "exit_uuid": "5ebd50dd-d5f7-4e52-b170-8dc6717d2eaf"
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
            "uuid": "b7596103-6e54-4517-8921-0e85716588e2",
            "actions": [
              {
                "uuid": "5c0356b2-b44a-4e2b-91fe-1fc05ed93439",
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
                "uuid": "7bb451c5-64d5-47a9-b2c1-9a0fc332a502",
                "destination_uuid": "6c74b965-0e94-4356-95a9-1c28a2be71fe"
              }
            ]
          },
          {
            "uuid": "6c74b965-0e94-4356-95a9-1c28a2be71fe",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bddc1fe8-4d7c-4bd2-a153-4e27298de236",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "2797861e-7fbb-4d19-9314-c4276b77d26e",
                  "type": "has_only_phrase",
                  "uuid": "2c1fbcf9-e10d-4b07-ba99-78c9d115151c"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "2797861e-7fbb-4d19-9314-c4276b77d26e",
                  "type": "has_only_phrase",
                  "uuid": "442d09e8-ee0b-4273-9b56-e4e317685b78"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "2797861e-7fbb-4d19-9314-c4276b77d26e",
                  "type": "has_only_phrase",
                  "uuid": "30e656fb-7eb0-4d2c-9724-baccf83b04b4"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "2797861e-7fbb-4d19-9314-c4276b77d26e",
                  "type": "has_only_phrase",
                  "uuid": "9ef549a9-b19e-4eaa-8cac-d2ce6cf776b7"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "34040d0e-b311-4ac6-b515-56e19c300435",
                  "type": "has_only_phrase",
                  "uuid": "7d7f3ec3-c149-468c-be23-ced08b86385e"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "34040d0e-b311-4ac6-b515-56e19c300435",
                  "type": "has_only_phrase",
                  "uuid": "168dac16-bffd-41e4-98c9-b1be64f519a7"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "34040d0e-b311-4ac6-b515-56e19c300435",
                  "type": "has_only_phrase",
                  "uuid": "b6618dc1-b57f-45ac-a9a4-55bc64aff69d"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "34040d0e-b311-4ac6-b515-56e19c300435",
                  "type": "has_only_phrase",
                  "uuid": "04462a64-a978-4992-b5b2-f29a658d12b0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "92b0a260-0586-465c-8ef6-0019f06eff44",
                  "name": "All Responses",
                  "uuid": "bddc1fe8-4d7c-4bd2-a153-4e27298de236"
                },
                {
                  "exit_uuid": "c36b258c-3412-44a3-a95c-09c1fa5c0ad3",
                  "name": "0;1;2;3",
                  "uuid": "2797861e-7fbb-4d19-9314-c4276b77d26e"
                },
                {
                  "exit_uuid": "e899cb31-125a-4983-9a0b-f32efeacb031",
                  "name": "4;5;6;7",
                  "uuid": "34040d0e-b311-4ac6-b515-56e19c300435"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "92b0a260-0586-465c-8ef6-0019f06eff44",
                "destination_uuid": null
              },
              {
                "uuid": "c36b258c-3412-44a3-a95c-09c1fa5c0ad3",
                "destination_uuid": "36bd0605-f2d3-41e1-8947-7fe7915a14a0"
              },
              {
                "uuid": "e899cb31-125a-4983-9a0b-f32efeacb031",
                "destination_uuid": "d4cb89ce-521b-4210-bff9-d175cf67a0f9"
              }
            ]
          },
          {
            "uuid": "36bd0605-f2d3-41e1-8947-7fe7915a14a0",
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
                "uuid": "ecd3c391-ece2-4cf4-98b3-17cad822bcf3"
              }
            ],
            "exits": [
              {
                "uuid": "71202cba-5f18-456b-a5ea-e78bbda6f49d",
                "destination_uuid": "3183c959-8ce3-4356-a78b-48768791d493"
              }
            ]
          },
          {
            "uuid": "d4cb89ce-521b-4210-bff9-d175cf67a0f9",
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
                "uuid": "404c9bce-43c8-4c12-99e8-b28d78e3b22b"
              }
            ],
            "exits": [
              {
                "uuid": "e687b060-490a-4b20-b201-7dc50456c85b",
                "destination_uuid": "3183c959-8ce3-4356-a78b-48768791d493"
              }
            ]
          },
          {
            "uuid": "3183c959-8ce3-4356-a78b-48768791d493",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "519a8c18-9b00-4ad9-ac60-d229db0c970f",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b3945198-e1bd-4271-9bdb-540c44b506b4",
                  "type": "has_only_phrase",
                  "uuid": "cc92a39a-0654-422e-80f7-a4d1bebe302d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "791c79dc-ec88-4973-b4e9-08cbc593afb4",
                  "name": "All Responses",
                  "uuid": "519a8c18-9b00-4ad9-ac60-d229db0c970f"
                },
                {
                  "exit_uuid": "df524e4f-a786-4be6-8d05-c02af95eea4a",
                  "name": "Next",
                  "uuid": "b3945198-e1bd-4271-9bdb-540c44b506b4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "791c79dc-ec88-4973-b4e9-08cbc593afb4",
                "destination_uuid": null
              },
              {
                "uuid": "df524e4f-a786-4be6-8d05-c02af95eea4a",
                "destination_uuid": "dc4972dc-c9c3-4a74-a4a3-6d29d1058883"
              }
            ]
          },
          {
            "uuid": "dc4972dc-c9c3-4a74-a4a3-6d29d1058883",
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
                "uuid": "4c5df9e7-e63d-44fb-ba96-1616a6870d02"
              }
            ],
            "exits": [
              {
                "uuid": "1bf8df3d-155d-4c54-aede-d1ed733481c9",
                "destination_uuid": "ce89db34-ff2d-4fd5-8f6d-e2a5acdb190a"
              }
            ]
          },
          {
            "uuid": "ce89db34-ff2d-4fd5-8f6d-e2a5acdb190a",
            "actions": [],
            "exits": [
              {
                "uuid": "9f6a80dc-d72b-4dc0-a0ea-7a70e40d269c",
                "destination_uuid": "63d158bd-d6ff-4037-b7b1-3267f3bfac7e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3f6a6d55-9f7f-4e00-9632-8369f1f275a3",
              "cases": [],
              "categories": [
                {
                  "uuid": "3f6a6d55-9f7f-4e00-9632-8369f1f275a3",
                  "name": "All Responses",
                  "exit_uuid": "9f6a80dc-d72b-4dc0-a0ea-7a70e40d269c"
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
            "uuid": "63d158bd-d6ff-4037-b7b1-3267f3bfac7e",
            "actions": [
              {
                "uuid": "bc70053b-eff4-4383-bd10-baee0774d3da",
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
                "uuid": "3c99a355-ebab-431b-9c54-0ad969784e23",
                "destination_uuid": "bb99dd83-bdf6-40a9-b112-d01db46414a2"
              }
            ]
          },
          {
            "uuid": "bb99dd83-bdf6-40a9-b112-d01db46414a2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "dbb130ce-4f00-4d8f-b3e4-dfbb6c4931ca",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "c4f0355f-da30-4586-ad59-9232e5b1fde1",
                  "type": "has_only_phrase",
                  "uuid": "ddb33358-06eb-4be4-98af-39fa967da8ca"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "c4f0355f-da30-4586-ad59-9232e5b1fde1",
                  "type": "has_only_phrase",
                  "uuid": "050b3cc9-563c-4804-8cdc-cb9662c1ef9b"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "c4f0355f-da30-4586-ad59-9232e5b1fde1",
                  "type": "has_only_phrase",
                  "uuid": "eb513032-8c43-4f10-8aa0-7e339bcc177f"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "c4f0355f-da30-4586-ad59-9232e5b1fde1",
                  "type": "has_only_phrase",
                  "uuid": "78ab7a32-ecf1-44ff-9d24-2304922d843d"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "c4f0355f-da30-4586-ad59-9232e5b1fde1",
                  "type": "has_only_phrase",
                  "uuid": "0e2eb423-bf9b-4491-bb60-844dcc82b90f"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "ffbce46f-4335-4c49-a2d1-b0a6fac8abcc",
                  "type": "has_only_phrase",
                  "uuid": "c1bb150e-15fb-4952-8199-aa483a04f0a3"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "ffbce46f-4335-4c49-a2d1-b0a6fac8abcc",
                  "type": "has_only_phrase",
                  "uuid": "d08ca38f-4201-4ae7-b768-bbb367bfab08"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "ffbce46f-4335-4c49-a2d1-b0a6fac8abcc",
                  "type": "has_only_phrase",
                  "uuid": "b0131b23-c634-4320-b640-52ce8d028191"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "ffbce46f-4335-4c49-a2d1-b0a6fac8abcc",
                  "type": "has_only_phrase",
                  "uuid": "2d5d7eac-67ce-4be3-9abc-0f52037d1dda"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "88b0a777-f051-48de-a68f-99e4e6442678",
                  "name": "All Responses",
                  "uuid": "dbb130ce-4f00-4d8f-b3e4-dfbb6c4931ca"
                },
                {
                  "exit_uuid": "580d0164-f993-4b89-941b-b3abcdcf2083",
                  "name": "0;1;2;3;4",
                  "uuid": "c4f0355f-da30-4586-ad59-9232e5b1fde1"
                },
                {
                  "exit_uuid": "8e21e850-9dde-457e-b0a9-4e6edf2a179c",
                  "name": "5;6;7;8",
                  "uuid": "ffbce46f-4335-4c49-a2d1-b0a6fac8abcc"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "88b0a777-f051-48de-a68f-99e4e6442678",
                "destination_uuid": null
              },
              {
                "uuid": "580d0164-f993-4b89-941b-b3abcdcf2083",
                "destination_uuid": "1f127cc7-528c-49d6-b776-d5f5ce42fdfd"
              },
              {
                "uuid": "8e21e850-9dde-457e-b0a9-4e6edf2a179c",
                "destination_uuid": "0b59f4ba-0c3d-4dbe-b942-2accf8dc721b"
              }
            ]
          },
          {
            "uuid": "1f127cc7-528c-49d6-b776-d5f5ce42fdfd",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "b8b91920-2d53-4cc7-a89b-64680c6c807a"
              }
            ],
            "exits": [
              {
                "uuid": "8cb553a4-3b55-4ed7-b640-3855b53d64b5",
                "destination_uuid": "c593a4ef-c286-4035-9ed7-84696f395c7d"
              }
            ]
          },
          {
            "uuid": "0b59f4ba-0c3d-4dbe-b942-2accf8dc721b",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c7bdf0e9-290a-4b7e-b1ca-76bb3668275d"
              }
            ],
            "exits": [
              {
                "uuid": "f07cda14-0327-4703-a094-162126aa8289",
                "destination_uuid": "c593a4ef-c286-4035-9ed7-84696f395c7d"
              }
            ]
          },
          {
            "uuid": "c593a4ef-c286-4035-9ed7-84696f395c7d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "38ee804e-cd84-473e-9687-eb9d0c97821b",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b37d3a9b-9f57-44c5-a8c9-03b06d4c5e4f",
                  "type": "has_only_phrase",
                  "uuid": "043bccfd-c61f-45c9-9ab0-9f6e5d65cc31"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4c16fac3-ec04-4eae-ae55-7bfeba633bc6",
                  "name": "All Responses",
                  "uuid": "38ee804e-cd84-473e-9687-eb9d0c97821b"
                },
                {
                  "exit_uuid": "d8699ba1-99a8-4a73-ae57-8997a39ff8ba",
                  "name": "Next",
                  "uuid": "b37d3a9b-9f57-44c5-a8c9-03b06d4c5e4f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4c16fac3-ec04-4eae-ae55-7bfeba633bc6",
                "destination_uuid": null
              },
              {
                "uuid": "d8699ba1-99a8-4a73-ae57-8997a39ff8ba",
                "destination_uuid": "23eafbda-9285-4632-8fd0-37c9ddeafcbd"
              }
            ]
          },
          {
            "uuid": "23eafbda-9285-4632-8fd0-37c9ddeafcbd",
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
                "uuid": "15ab7ea7-6799-4139-861d-988196b96f5e"
              }
            ],
            "exits": [
              {
                "uuid": "cef00888-937e-497b-938d-0c2847f9cb34",
                "destination_uuid": "2824849a-05e5-4c7c-baa1-97f7496ac0b4"
              }
            ]
          },
          {
            "uuid": "2824849a-05e5-4c7c-baa1-97f7496ac0b4",
            "actions": [],
            "exits": [
              {
                "uuid": "209644f5-0945-4cf7-a9dc-f3828dd67862",
                "destination_uuid": "7ee7c46b-5684-46ac-8027-a2862e17d92a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "efd5221a-09f6-4439-8e31-1fd0ca07523d",
              "cases": [],
              "categories": [
                {
                  "uuid": "efd5221a-09f6-4439-8e31-1fd0ca07523d",
                  "name": "All Responses",
                  "exit_uuid": "209644f5-0945-4cf7-a9dc-f3828dd67862"
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
            "uuid": "7ee7c46b-5684-46ac-8027-a2862e17d92a",
            "actions": [
              {
                "uuid": "4b103d93-3e82-4f6f-b9d7-5ba62df80962",
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
                "uuid": "d51415da-45cf-41ab-b03f-8620a990ceac",
                "destination_uuid": "3ef1b42b-0647-47b5-b3a8-c82ed80e0d1d"
              }
            ]
          },
          {
            "uuid": "3ef1b42b-0647-47b5-b3a8-c82ed80e0d1d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4bd7b615-c180-4537-abfd-bbb7c10edda3",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "b3a39cb2-71b4-4fe0-bb73-1ac8df956822",
                  "type": "has_only_phrase",
                  "uuid": "9280ba4a-16d4-4df9-bb62-7ac8a990e447"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "b3a39cb2-71b4-4fe0-bb73-1ac8df956822",
                  "type": "has_only_phrase",
                  "uuid": "0e5e3d09-7345-44ba-af16-3a693edd8817"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "b3a39cb2-71b4-4fe0-bb73-1ac8df956822",
                  "type": "has_only_phrase",
                  "uuid": "1856962f-cfdb-48b0-b246-e3914abf0bf2"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "1a1f6c60-7d25-40cc-8f51-01557ecec7d3",
                  "type": "has_only_phrase",
                  "uuid": "020954ce-91c5-48b8-a27f-0131a159562e"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "1a1f6c60-7d25-40cc-8f51-01557ecec7d3",
                  "type": "has_only_phrase",
                  "uuid": "7c71a296-39ef-4bba-b282-afa06d99502a"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "1a1f6c60-7d25-40cc-8f51-01557ecec7d3",
                  "type": "has_only_phrase",
                  "uuid": "267f68ad-bb75-43a8-a2b6-b929e9b00675"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "1a1f6c60-7d25-40cc-8f51-01557ecec7d3",
                  "type": "has_only_phrase",
                  "uuid": "96f5b4ec-da0a-43b4-8512-cfac6b9e709b"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "1a1f6c60-7d25-40cc-8f51-01557ecec7d3",
                  "type": "has_only_phrase",
                  "uuid": "545da16a-e299-47e6-a3b9-3f4cfe7c3702"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4832e99c-3c6b-4a6d-8e26-37c9f073d0ec",
                  "name": "All Responses",
                  "uuid": "4bd7b615-c180-4537-abfd-bbb7c10edda3"
                },
                {
                  "exit_uuid": "801b6e57-4540-480d-a744-89464c4c4265",
                  "name": "0;1;2",
                  "uuid": "b3a39cb2-71b4-4fe0-bb73-1ac8df956822"
                },
                {
                  "exit_uuid": "cff71b0a-2e6f-49af-b7d7-cb4b60e3e067",
                  "name": "3;4;5;6;7",
                  "uuid": "1a1f6c60-7d25-40cc-8f51-01557ecec7d3"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "4832e99c-3c6b-4a6d-8e26-37c9f073d0ec",
                "destination_uuid": null
              },
              {
                "uuid": "801b6e57-4540-480d-a744-89464c4c4265",
                "destination_uuid": "8ab47501-ada1-4611-b8b3-89ed3fd66fb1"
              },
              {
                "uuid": "cff71b0a-2e6f-49af-b7d7-cb4b60e3e067",
                "destination_uuid": "e5f2c424-47e6-4b42-a8de-40afe725ab13"
              }
            ]
          },
          {
            "uuid": "8ab47501-ada1-4611-b8b3-89ed3fd66fb1",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "12268b0a-f61c-4f20-9a88-47d31ef09e8c"
              }
            ],
            "exits": [
              {
                "uuid": "c3bb835a-cb58-49cf-bd91-7b5043b2b756",
                "destination_uuid": "e9c380db-b5d2-40e1-8ecb-f4e1311600ef"
              }
            ]
          },
          {
            "uuid": "e5f2c424-47e6-4b42-a8de-40afe725ab13",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "122129c0-26f4-41c8-83f0-11b8bd5244b0"
              }
            ],
            "exits": [
              {
                "uuid": "1082baa9-e708-4385-8a90-cb37602bc6be",
                "destination_uuid": "e9c380db-b5d2-40e1-8ecb-f4e1311600ef"
              }
            ]
          },
          {
            "uuid": "e9c380db-b5d2-40e1-8ecb-f4e1311600ef",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "32c011ff-a7e2-4020-882a-dff4e40a6d23",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "e005a59c-5654-4425-9b55-6d52be96173e",
                  "type": "has_only_phrase",
                  "uuid": "3fea79f2-7a5b-410d-94c3-692fd07bf524"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "15f60a44-5232-4f2e-a3dc-b373a020a2a3",
                  "name": "All Responses",
                  "uuid": "32c011ff-a7e2-4020-882a-dff4e40a6d23"
                },
                {
                  "exit_uuid": "06915f51-45af-4c8c-a449-6bffe2af4537",
                  "name": "Next",
                  "uuid": "e005a59c-5654-4425-9b55-6d52be96173e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "15f60a44-5232-4f2e-a3dc-b373a020a2a3",
                "destination_uuid": null
              },
              {
                "uuid": "06915f51-45af-4c8c-a449-6bffe2af4537",
                "destination_uuid": "0dbaa4a1-bb37-4869-87e6-3831b139695c"
              }
            ]
          },
          {
            "uuid": "0dbaa4a1-bb37-4869-87e6-3831b139695c",
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
                "uuid": "ad7c7a7d-4999-4e81-b2c6-88b051398c2e"
              }
            ],
            "exits": [
              {
                "uuid": "0fc593d7-0693-4153-8068-a0a4e45bf6e2",
                "destination_uuid": "a975c135-afef-4770-993d-ce2e78242320"
              }
            ]
          },
          {
            "uuid": "a975c135-afef-4770-993d-ce2e78242320",
            "actions": [],
            "exits": [
              {
                "uuid": "8d780e1d-013b-44b8-a069-b1960f0399f5",
                "destination_uuid": "1b54eb22-b081-4923-abdf-07f5905881ba"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f4c895e4-a94f-4e4d-a348-71bbe4bc71cc",
              "cases": [],
              "categories": [
                {
                  "uuid": "f4c895e4-a94f-4e4d-a348-71bbe4bc71cc",
                  "name": "All Responses",
                  "exit_uuid": "8d780e1d-013b-44b8-a069-b1960f0399f5"
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
            "uuid": "1b54eb22-b081-4923-abdf-07f5905881ba",
            "actions": [
              {
                "uuid": "b4ad3170-1ac2-418a-82e3-9de82044e586",
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
                "uuid": "5179f0d0-628d-4542-bc81-aa6e2ef5f2e9",
                "destination_uuid": "37865221-e999-4e85-be5f-48a0a269510c"
              }
            ]
          },
          {
            "uuid": "37865221-e999-4e85-be5f-48a0a269510c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6abcef1c-6a89-4df5-a24f-b2bca884161e",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "71298cf7-92e6-420f-9654-72896d0e99e6",
                  "type": "has_only_phrase",
                  "uuid": "49f4070b-23fa-4ece-aeda-cc012cb7a2d2"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "71298cf7-92e6-420f-9654-72896d0e99e6",
                  "type": "has_only_phrase",
                  "uuid": "39ed5d21-cdd6-4d7d-bad5-805bf0f5f9e6"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "8a600822-b9d2-466d-bcc8-ec2026934b70",
                  "type": "has_only_phrase",
                  "uuid": "846fe3a3-c3e4-4970-8d1a-2ba223b2a804"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "8a600822-b9d2-466d-bcc8-ec2026934b70",
                  "type": "has_only_phrase",
                  "uuid": "257ec2dd-01b0-4a38-bb2c-5e5868f757e2"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "8a600822-b9d2-466d-bcc8-ec2026934b70",
                  "type": "has_only_phrase",
                  "uuid": "51da9f8c-2820-4ab4-b349-c9ad30e14c08"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "8a600822-b9d2-466d-bcc8-ec2026934b70",
                  "type": "has_only_phrase",
                  "uuid": "04b707c8-1e83-4682-9447-56a02f515715"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "8a600822-b9d2-466d-bcc8-ec2026934b70",
                  "type": "has_only_phrase",
                  "uuid": "b6871e67-e618-4281-ac35-400ca3e1f959"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "8a600822-b9d2-466d-bcc8-ec2026934b70",
                  "type": "has_only_phrase",
                  "uuid": "531dd462-32cb-4cc0-95f3-1ba64320892d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ef83387b-5368-4ab2-a083-561ac4a2ea97",
                  "name": "All Responses",
                  "uuid": "6abcef1c-6a89-4df5-a24f-b2bca884161e"
                },
                {
                  "exit_uuid": "5b986ebd-94ff-4c51-a7bb-f6706c7d65e1",
                  "name": "0;1",
                  "uuid": "71298cf7-92e6-420f-9654-72896d0e99e6"
                },
                {
                  "exit_uuid": "101b2a6a-e490-49e5-b5db-f5c924af1099",
                  "name": "2;3;4;5;6;7",
                  "uuid": "8a600822-b9d2-466d-bcc8-ec2026934b70"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "ef83387b-5368-4ab2-a083-561ac4a2ea97",
                "destination_uuid": null
              },
              {
                "uuid": "5b986ebd-94ff-4c51-a7bb-f6706c7d65e1",
                "destination_uuid": "9b868e86-6f13-448f-8fd5-d7ad0b49a1a0"
              },
              {
                "uuid": "101b2a6a-e490-49e5-b5db-f5c924af1099",
                "destination_uuid": "900da0b4-9581-4128-8c04-ba589d89310f"
              }
            ]
          },
          {
            "uuid": "9b868e86-6f13-448f-8fd5-d7ad0b49a1a0",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "b3806e54-5e5b-46b1-9161-92385d7bd9f4"
              }
            ],
            "exits": [
              {
                "uuid": "88c17d4f-4aca-4e18-987c-112e6ac43d7d",
                "destination_uuid": "1200f128-011d-4c94-82e6-4c9f7b21bb8a"
              }
            ]
          },
          {
            "uuid": "900da0b4-9581-4128-8c04-ba589d89310f",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c1f7c63d-cc3c-484c-8c6f-22d53e4cb0d2"
              }
            ],
            "exits": [
              {
                "uuid": "dcdf517e-fa57-4b89-aa31-f17466cc96ac",
                "destination_uuid": "1200f128-011d-4c94-82e6-4c9f7b21bb8a"
              }
            ]
          },
          {
            "uuid": "1200f128-011d-4c94-82e6-4c9f7b21bb8a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "dada3f69-8483-4a04-a067-293d26726040",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "4967e18d-2031-452c-86ca-9511732dec85",
                  "type": "has_only_phrase",
                  "uuid": "1e39d4d2-bce4-4c9c-a6dc-db8164067931"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f7a6ca0a-15a6-4862-aff4-13c2b24f312f",
                  "name": "All Responses",
                  "uuid": "dada3f69-8483-4a04-a067-293d26726040"
                },
                {
                  "exit_uuid": "c3326675-c1ab-4100-8f85-c32a56720d07",
                  "name": "Next",
                  "uuid": "4967e18d-2031-452c-86ca-9511732dec85"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f7a6ca0a-15a6-4862-aff4-13c2b24f312f",
                "destination_uuid": null
              },
              {
                "uuid": "c3326675-c1ab-4100-8f85-c32a56720d07",
                "destination_uuid": "4302d9be-c966-4fbf-89d5-09b684a4fdaf"
              }
            ]
          },
          {
            "uuid": "4302d9be-c966-4fbf-89d5-09b684a4fdaf",
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
                "uuid": "230e2499-c872-41fa-9f34-3597671917e0"
              }
            ],
            "exits": [
              {
                "uuid": "69822a9d-1ee1-4b11-8dee-f84833a590c0",
                "destination_uuid": "e3a0d087-df24-4b95-96e7-b84e0480b3c7"
              }
            ]
          },
          {
            "uuid": "e3a0d087-df24-4b95-96e7-b84e0480b3c7",
            "actions": [],
            "exits": [
              {
                "uuid": "e924c7a9-7d7c-42f9-989e-1a02b2585176",
                "destination_uuid": "7002213c-49fc-4480-8930-584277f1d6a8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a29e08ba-e689-4a5d-bbc4-3989e120d1b1",
              "cases": [],
              "categories": [
                {
                  "uuid": "a29e08ba-e689-4a5d-bbc4-3989e120d1b1",
                  "name": "All Responses",
                  "exit_uuid": "e924c7a9-7d7c-42f9-989e-1a02b2585176"
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
            "uuid": "7002213c-49fc-4480-8930-584277f1d6a8",
            "actions": [
              {
                "uuid": "7e2cb59a-4aa8-4f3b-ad80-380af36b4f22",
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
                "uuid": "bf0f8675-c293-4455-ada0-845499018d32",
                "destination_uuid": "6034760b-f943-4990-93a0-6a5b756a1b5c"
              }
            ]
          },
          {
            "uuid": "4abaaa5d-8a98-4948-949f-7d07c2dcba3b",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "e2861031-3f3e-4519-a460-f6c84eca7bd2"
              }
            ],
            "exits": [
              {
                "uuid": "5f5804a3-c095-4067-938c-4d580ab65440",
                "destination_uuid": "caa76734-2444-4e41-a201-4bc65cd12d4c"
              }
            ]
          },
          {
            "uuid": "6034760b-f943-4990-93a0-6a5b756a1b5c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "34cc8421-545b-48ae-909d-26af3316ea52",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "ca2e0308-28f9-43ca-899c-b54333ab349e",
                  "type": "has_only_phrase",
                  "uuid": "d15bd40a-a676-4eb7-bb0b-00883d8cf892"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "ca2e0308-28f9-43ca-899c-b54333ab349e",
                  "type": "has_only_phrase",
                  "uuid": "9497443e-f913-4095-aa13-3ab8232c0460"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "ca2e0308-28f9-43ca-899c-b54333ab349e",
                  "type": "has_only_phrase",
                  "uuid": "f36bca38-4e0b-424e-bffa-9f7a043c2f8e"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "ca2e0308-28f9-43ca-899c-b54333ab349e",
                  "type": "has_only_phrase",
                  "uuid": "a2ba9fae-fc1d-4811-8bba-e032f04c354d"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "ca2e0308-28f9-43ca-899c-b54333ab349e",
                  "type": "has_only_phrase",
                  "uuid": "47fd3780-33e5-4715-85ee-5231c910973b"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "ca2e0308-28f9-43ca-899c-b54333ab349e",
                  "type": "has_only_phrase",
                  "uuid": "b0aa7f24-8c3c-43ff-8712-cea7765368b4"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "ca2e0308-28f9-43ca-899c-b54333ab349e",
                  "type": "has_only_phrase",
                  "uuid": "da1d6ce6-1906-47e8-8b52-aed482d4dcaf"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1ff94c41-7133-420d-a32d-529029f91c65",
                  "name": "All Responses",
                  "uuid": "34cc8421-545b-48ae-909d-26af3316ea52"
                },
                {
                  "exit_uuid": "eb70ec6b-fca9-4475-9a12-ebf03da3aea1",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "ca2e0308-28f9-43ca-899c-b54333ab349e"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "1ff94c41-7133-420d-a32d-529029f91c65",
                "destination_uuid": "4abaaa5d-8a98-4948-949f-7d07c2dcba3b"
              },
              {
                "uuid": "eb70ec6b-fca9-4475-9a12-ebf03da3aea1",
                "destination_uuid": "0518e73f-f43e-4968-85a6-f9b058253265"
              }
            ]
          },
          {
            "uuid": "0518e73f-f43e-4968-85a6-f9b058253265",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "66201155-83fe-45b4-996b-a8fafd00f85d"
              }
            ],
            "exits": [
              {
                "uuid": "cb59955f-3af1-4527-abf2-f1dbf32c1232",
                "destination_uuid": "caa76734-2444-4e41-a201-4bc65cd12d4c"
              }
            ]
          },
          {
            "uuid": "caa76734-2444-4e41-a201-4bc65cd12d4c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e824cd43-eb6a-47a2-8066-9b559289b451",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "f9177bd6-c410-4947-b421-97f4be120fab",
                  "type": "has_only_phrase",
                  "uuid": "9340a91f-4728-46dc-b0be-3103ba9f81f2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5881a618-3452-46e9-b904-40da89532e6c",
                  "name": "All Responses",
                  "uuid": "e824cd43-eb6a-47a2-8066-9b559289b451"
                },
                {
                  "exit_uuid": "b5f8a96e-3e59-44ff-be27-0e75d362c485",
                  "name": "Next",
                  "uuid": "f9177bd6-c410-4947-b421-97f4be120fab"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5881a618-3452-46e9-b904-40da89532e6c",
                "destination_uuid": null
              },
              {
                "uuid": "b5f8a96e-3e59-44ff-be27-0e75d362c485",
                "destination_uuid": "b4da6ad2-0e79-4bad-b7dd-94dadc3ec6fb"
              }
            ]
          },
          {
            "uuid": "b4da6ad2-0e79-4bad-b7dd-94dadc3ec6fb",
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
                "uuid": "bc310aea-22bd-4bda-9051-598ec4bd2d63"
              }
            ],
            "exits": [
              {
                "uuid": "ea5dac84-105e-4d2e-8fe4-4c2b0109a831",
                "destination_uuid": "afbbaff0-cd07-4db3-84ce-32d4d69a3e97"
              }
            ]
          },
          {
            "uuid": "afbbaff0-cd07-4db3-84ce-32d4d69a3e97",
            "actions": [],
            "exits": [
              {
                "uuid": "80c7fd3a-b420-42ef-b4ae-42f1f3db9e59",
                "destination_uuid": "83a91b9c-b982-4b3e-8c23-81779f242640"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "adc6cca5-28a9-4756-b80d-9ac707eade38",
              "cases": [],
              "categories": [
                {
                  "uuid": "adc6cca5-28a9-4756-b80d-9ac707eade38",
                  "name": "All Responses",
                  "exit_uuid": "80c7fd3a-b420-42ef-b4ae-42f1f3db9e59"
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
            "uuid": "83a91b9c-b982-4b3e-8c23-81779f242640",
            "actions": [
              {
                "uuid": "82ca754c-0a8b-4f19-85f3-65a2419b7e0d",
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
                "uuid": "013df868-2b43-42e1-95f0-45ec32dd0b19",
                "destination_uuid": "9f60df61-37a8-4ef4-9916-1753c991c838"
              }
            ]
          },
          {
            "uuid": "9f60df61-37a8-4ef4-9916-1753c991c838",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "93ee6ce7-e96c-4112-a60e-b32efeece686",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "4901231a-7430-4ec2-936f-d1cd7a29abe3",
                  "type": "has_only_phrase",
                  "uuid": "8058f9dd-1c36-4ae7-a0b7-b4fcdfeba073"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "4901231a-7430-4ec2-936f-d1cd7a29abe3",
                  "type": "has_only_phrase",
                  "uuid": "b15d3a78-29bd-4800-b67a-bdc72b6fe5c3"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "4901231a-7430-4ec2-936f-d1cd7a29abe3",
                  "type": "has_only_phrase",
                  "uuid": "95fd200a-ab06-45d4-bc2c-01f546323b83"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "4901231a-7430-4ec2-936f-d1cd7a29abe3",
                  "type": "has_only_phrase",
                  "uuid": "45343884-987d-4a6b-b2fb-0aa114511b2a"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "4901231a-7430-4ec2-936f-d1cd7a29abe3",
                  "type": "has_only_phrase",
                  "uuid": "c6c1337e-f696-4bf2-8814-9d0758a6c082"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "7c65d8e5-f258-4524-8a8a-320e91344035",
                  "type": "has_only_phrase",
                  "uuid": "06090d09-bb50-404b-9532-71481c045e65"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "7c65d8e5-f258-4524-8a8a-320e91344035",
                  "type": "has_only_phrase",
                  "uuid": "236ff302-f754-43a2-89ef-da446c1a43e3"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "7c65d8e5-f258-4524-8a8a-320e91344035",
                  "type": "has_only_phrase",
                  "uuid": "61e5b2e0-46a2-43df-8854-3bbc3bded3be"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "7c65d8e5-f258-4524-8a8a-320e91344035",
                  "type": "has_only_phrase",
                  "uuid": "58033911-bc3e-4962-b1f8-54312eb7ea18"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8b0093a4-2c2a-4c67-b8ed-c0eb81c0bf40",
                  "name": "All Responses",
                  "uuid": "93ee6ce7-e96c-4112-a60e-b32efeece686"
                },
                {
                  "exit_uuid": "e9fb6c54-0d05-4f41-8794-b3dd0cae35e6",
                  "name": "0;1;2;3;4",
                  "uuid": "4901231a-7430-4ec2-936f-d1cd7a29abe3"
                },
                {
                  "exit_uuid": "751d5881-96a1-4fdd-8b0a-6306425175f8",
                  "name": "5;6;7;8",
                  "uuid": "7c65d8e5-f258-4524-8a8a-320e91344035"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "8b0093a4-2c2a-4c67-b8ed-c0eb81c0bf40",
                "destination_uuid": null
              },
              {
                "uuid": "e9fb6c54-0d05-4f41-8794-b3dd0cae35e6",
                "destination_uuid": "d3ccac93-dedf-45fe-8130-9cb72bd5826b"
              },
              {
                "uuid": "751d5881-96a1-4fdd-8b0a-6306425175f8",
                "destination_uuid": "a3d242a7-1edb-4f34-b7b8-a09e35244865"
              }
            ]
          },
          {
            "uuid": "d3ccac93-dedf-45fe-8130-9cb72bd5826b",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "aa6a8094-7723-4945-acce-b441f80154df"
              }
            ],
            "exits": [
              {
                "uuid": "1e6b17d0-5c1d-49a2-b61d-a6e9441246f0",
                "destination_uuid": "af73385b-1081-4ad0-99eb-1bf4eb6273c7"
              }
            ]
          },
          {
            "uuid": "a3d242a7-1edb-4f34-b7b8-a09e35244865",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "fe6aae33-3617-40ca-a84a-15cb1e2e251d"
              }
            ],
            "exits": [
              {
                "uuid": "f1c8fa38-d8e4-430b-aec3-9b4d89a5c65c",
                "destination_uuid": "af73385b-1081-4ad0-99eb-1bf4eb6273c7"
              }
            ]
          },
          {
            "uuid": "af73385b-1081-4ad0-99eb-1bf4eb6273c7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "381dc8ad-30ea-4598-a62a-f640477c90a2",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "f689f579-13ff-4668-be6f-dc9c3788ce84",
                  "type": "has_only_phrase",
                  "uuid": "e56552c0-757f-4247-9376-fb1b552da64d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "501f8019-e64e-4846-892b-1cf59ca005b8",
                  "name": "All Responses",
                  "uuid": "381dc8ad-30ea-4598-a62a-f640477c90a2"
                },
                {
                  "exit_uuid": "3fa6dbc3-b78d-4a22-95de-ea654810308f",
                  "name": "Next",
                  "uuid": "f689f579-13ff-4668-be6f-dc9c3788ce84"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "501f8019-e64e-4846-892b-1cf59ca005b8",
                "destination_uuid": null
              },
              {
                "uuid": "3fa6dbc3-b78d-4a22-95de-ea654810308f",
                "destination_uuid": "b2f1ba4a-ee6d-4a00-9de1-46126b61c053"
              }
            ]
          },
          {
            "uuid": "b2f1ba4a-ee6d-4a00-9de1-46126b61c053",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "b58e9d74-d367-4b37-9d57-84f6c6f2c48d"
              }
            ],
            "exits": [
              {
                "uuid": "6c9c021d-a997-4b44-be5c-21b58424c943",
                "destination_uuid": "48095496-057c-40a4-a209-e035265e6ad9"
              }
            ]
          },
          {
            "uuid": "48095496-057c-40a4-a209-e035265e6ad9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "42390e86-fb00-4372-a492-1f9157ef139a",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "436df971-cca7-4649-8d73-283930433133",
                  "type": "has_only_phrase",
                  "uuid": "0413b30a-57d9-4bc9-ab83-b64106e96d46"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "217222aa-6460-4fb4-9505-35ebfcae2e1d",
                  "name": "All Responses",
                  "uuid": "42390e86-fb00-4372-a492-1f9157ef139a"
                },
                {
                  "exit_uuid": "c56dacf9-bfd0-4416-a162-c0bcc8f81c9c",
                  "name": "Next",
                  "uuid": "436df971-cca7-4649-8d73-283930433133"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "217222aa-6460-4fb4-9505-35ebfcae2e1d",
                "destination_uuid": null
              },
              {
                "uuid": "c56dacf9-bfd0-4416-a162-c0bcc8f81c9c",
                "destination_uuid": "cdf3efd4-223e-4f01-83c2-30baa9f007df"
              }
            ]
          },
          {
            "uuid": "cdf3efd4-223e-4f01-83c2-30baa9f007df",
            "actions": [
              {
                "uuid": "5eb12069-24b1-4d36-82fb-2320ba62bf1f",
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
                "uuid": "8337bcf1-3a02-49d3-92aa-d2613ec0b525",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a0af7470-5008-446f-b3e2-1017d744b8b0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6eaa318a-2732-480e-9eb3-d667a250062d",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "0179219c-2c7c-4d05-8240-b930d0c4f6e3"
              }
            ],
            "exits": [
              {
                "uuid": "680c0539-68af-4417-b434-c79b024a4cc7",
                "destination_uuid": "eab1752e-b29c-4758-8370-718c4aec802d"
              }
            ]
          },
          {
            "uuid": "eab1752e-b29c-4758-8370-718c4aec802d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ec4d8b1d-d1bf-41d2-9db0-c1f5edfe5419",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "4b7c59ed-2d47-4868-a491-278f6cbaeb68",
                  "type": "has_only_phrase",
                  "uuid": "e675273c-094f-4a06-bd07-5bde97f9cbd5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7b8f0e2a-d667-4727-823f-f9b65cd5eb00",
                  "name": "All Responses",
                  "uuid": "ec4d8b1d-d1bf-41d2-9db0-c1f5edfe5419"
                },
                {
                  "exit_uuid": "b15eca83-20cb-4bf9-9974-14c930400052",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "4b7c59ed-2d47-4868-a491-278f6cbaeb68"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7b8f0e2a-d667-4727-823f-f9b65cd5eb00",
                "destination_uuid": null
              },
              {
                "uuid": "b15eca83-20cb-4bf9-9974-14c930400052",
                "destination_uuid": "045710ac-38f0-4a98-bbc7-27bfd0bf0969"
              }
            ]
          },
          {
            "uuid": "045710ac-38f0-4a98-bbc7-27bfd0bf0969",
            "actions": [
              {
                "uuid": "18252909-ee62-4624-a9f2-fb67b428c088",
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
                "uuid": "510abbc9-208f-486d-b815-017ae99ee18e",
                "destination_uuid": "16ad1bcb-7b21-4157-9976-fc44487e67d4"
              }
            ]
          },
          {
            "uuid": "16ad1bcb-7b21-4157-9976-fc44487e67d4",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "9fce499e-c2f0-4b9c-919c-ad56ac1abe6b"
                },
                "type": "enter_flow",
                "uuid": "cb9f2272-e83f-41d7-b454-e463ea59abb9"
              }
            ],
            "exits": [
              {
                "uuid": "a76b2f8e-b8fc-42b6-a79c-724f652aa79e",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "d23639ed-b233-4df6-8fc4-e6a33da20acb",
            "actions": [
              {
                "uuid": "7cb2b953-0aab-4d1b-a3b4-bc97db5aba4c",
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
                "uuid": "391b1119-9146-4e01-a162-4739bc5d27e1",
                "destination_uuid": "6b6ec542-b06c-490c-824f-d0b6d773aefe"
              }
            ]
          },
          {
            "uuid": "6b6ec542-b06c-490c-824f-d0b6d773aefe",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "4f485f3d-3889-4b1d-bf1e-6c57aba31250"
                },
                "type": "enter_flow",
                "uuid": "0c1c7fd3-a38b-4f9b-9aa8-66deaf01684a"
              }
            ],
            "exits": [
              {
                "uuid": "113ecaa8-c2c2-4cae-a391-a4a814e3f6f8",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "eae67eac-74b9-49b8-96bd-31f13f7e7107",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3dd2ab68-df72-49bd-a194-5715b47a6d8c",
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
                "uuid": "c16c3df0-a607-4403-b8a8-27c2272a62a0"
              }
            ],
            "exits": [
              {
                "uuid": "35dabf9e-e2af-4ca0-a57f-88949cc2d1e4",
                "destination_uuid": "ac2a4c96-7b7b-4385-8e39-f509123fc81d"
              }
            ]
          },
          {
            "uuid": "ac2a4c96-7b7b-4385-8e39-f509123fc81d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ea563a96-3774-4847-996d-1b9c7000574e",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "2f0e51e0-5712-43cc-a27e-386a8334f9c0",
                  "type": "has_only_phrase",
                  "uuid": "a7c92d48-d15a-4052-b150-f161078f435e"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "6c1ab4a3-12f6-4741-b7b5-3b051f63c6ef",
                  "type": "has_only_phrase",
                  "uuid": "3fdbeae4-89e0-40d8-a18c-ef0ed4e89807"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "6c1ab4a3-12f6-4741-b7b5-3b051f63c6ef",
                  "type": "has_only_phrase",
                  "uuid": "7e56519b-7709-4df2-b1fb-658d7f51c4f3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "858cd6b3-0c93-463f-b960-d0c4a3b2935d",
                  "name": "All Responses",
                  "uuid": "ea563a96-3774-4847-996d-1b9c7000574e"
                },
                {
                  "exit_uuid": "6dd631a9-f5bf-4663-a021-f4fd30d058fd",
                  "name": "Happy",
                  "uuid": "2f0e51e0-5712-43cc-a27e-386a8334f9c0"
                },
                {
                  "exit_uuid": "d6e3329f-1cc3-42f7-990f-365fbb6d82a3",
                  "name": "Neutral; Sad",
                  "uuid": "6c1ab4a3-12f6-4741-b7b5-3b051f63c6ef"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "858cd6b3-0c93-463f-b960-d0c4a3b2935d",
                "destination_uuid": null
              },
              {
                "uuid": "6dd631a9-f5bf-4663-a021-f4fd30d058fd",
                "destination_uuid": "b423b976-e4fa-46ba-adda-a1613e061bd3"
              },
              {
                "uuid": "d6e3329f-1cc3-42f7-990f-365fbb6d82a3",
                "destination_uuid": "81c2834a-a300-491c-b979-c9a988f87017"
              }
            ]
          },
          {
            "uuid": "b423b976-e4fa-46ba-adda-a1613e061bd3",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "a88bd860-4718-4fdd-ac07-1dcea0ff05bc"
              }
            ],
            "exits": [
              {
                "uuid": "af2d12e3-8367-4521-8132-983d4b600f74",
                "destination_uuid": "916edf69-36d0-48eb-81f4-eb4f059357dc"
              }
            ]
          },
          {
            "uuid": "81c2834a-a300-491c-b979-c9a988f87017",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6e84e95f-e01a-45f6-b6cb-bec67be6129f"
              }
            ],
            "exits": [
              {
                "uuid": "2c905b98-e3e3-4119-bf5f-8f93e7234de7",
                "destination_uuid": "848c300d-93e9-462d-9526-2ca9a224fa38"
              }
            ]
          },
          {
            "uuid": "848c300d-93e9-462d-9526-2ca9a224fa38",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "0311ed6d-49dd-49e2-9128-3c210771e0df"
              }
            ],
            "exits": [
              {
                "uuid": "b2a37b66-5136-47b7-9bc7-7929ad288398",
                "destination_uuid": "aa3071ec-626b-4111-ae0a-e87329bf0bfe"
              }
            ]
          },
          {
            "uuid": "aa3071ec-626b-4111-ae0a-e87329bf0bfe",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4d2ed476-b376-4694-a9b8-f57bd22b015a",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "ea626395-8910-406f-ae8b-9c3e8280ede0",
                  "type": "has_only_phrase",
                  "uuid": "da98816a-f0b3-460a-b23d-1ce450e6883f"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "ecce1503-2a45-4cd3-b9f5-d60a4def0b84",
                  "type": "has_only_phrase",
                  "uuid": "95a1cf88-a1f5-4e6d-b9e9-12f7b6edb848"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1bd6b7f2-97ae-47c7-985a-81a4f4090c26",
                  "name": "All Responses",
                  "uuid": "4d2ed476-b376-4694-a9b8-f57bd22b015a"
                },
                {
                  "exit_uuid": "b5a638e8-d417-4214-95c1-c0e524a610c2",
                  "name": "Yes",
                  "uuid": "ea626395-8910-406f-ae8b-9c3e8280ede0"
                },
                {
                  "exit_uuid": "aa236203-68c7-4e87-b01a-e87449c0fbf6",
                  "name": "No",
                  "uuid": "ecce1503-2a45-4cd3-b9f5-d60a4def0b84"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1bd6b7f2-97ae-47c7-985a-81a4f4090c26",
                "destination_uuid": null
              },
              {
                "uuid": "b5a638e8-d417-4214-95c1-c0e524a610c2",
                "destination_uuid": "f0e645cb-6a19-49cd-8cf0-eb7ba33a674a"
              },
              {
                "uuid": "aa236203-68c7-4e87-b01a-e87449c0fbf6",
                "destination_uuid": "b7649739-597a-492c-8c1e-6b080c39a64f"
              }
            ]
          },
          {
            "uuid": "f0e645cb-6a19-49cd-8cf0-eb7ba33a674a",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "41ba20b1-e01e-47d8-a68d-0dbd8bae47be"
                },
                "type": "enter_flow",
                "uuid": "ed36b83c-3f3b-456a-9990-19956a7e625e"
              }
            ],
            "exits": [
              {
                "uuid": "4fe6c779-f9f6-455a-99ac-33539b77f0cb",
                "destination_uuid": "32e426e9-3021-46eb-8df1-97626bd43005"
              },
              {
                "uuid": "2ad6b32d-67cd-4205-b5f8-76429f8fa2ac",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "f9554465-e4ab-4c98-b504-711f7184ecdb",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "e34bfcef-3a1b-4033-b6a4-3408f54bc739"
                },
                {
                  "uuid": "60425a95-de26-403b-92ae-6198c6cd9c50",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "4dc6d6b7-47dc-4eb8-aab9-9f41335086a5"
                }
              ],
              "categories": [
                {
                  "uuid": "e34bfcef-3a1b-4033-b6a4-3408f54bc739",
                  "name": "Complete",
                  "exit_uuid": "4fe6c779-f9f6-455a-99ac-33539b77f0cb"
                },
                {
                  "uuid": "4dc6d6b7-47dc-4eb8-aab9-9f41335086a5",
                  "name": "Expired",
                  "exit_uuid": "2ad6b32d-67cd-4205-b5f8-76429f8fa2ac"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "e34bfcef-3a1b-4033-b6a4-3408f54bc739"
            }
          },
          {
            "uuid": "32e426e9-3021-46eb-8df1-97626bd43005",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b861463e-ab9b-42d5-ad9f-9246e3c5e4ec"
              }
            ],
            "exits": [
              {
                "uuid": "f9e41160-f83f-4d87-a2c8-165eb8359753",
                "destination_uuid": "104350d9-a641-41e0-9aa8-d7ae26d9290b"
              }
            ]
          },
          {
            "uuid": "104350d9-a641-41e0-9aa8-d7ae26d9290b",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "80f741ba-6156-4a9b-bc9c-e4b9d829db00"
              }
            ],
            "exits": [
              {
                "uuid": "7f595b5f-57f2-4a7f-b60a-363d437dd64e",
                "destination_uuid": "916edf69-36d0-48eb-81f4-eb4f059357dc"
              }
            ]
          },
          {
            "uuid": "b7649739-597a-492c-8c1e-6b080c39a64f",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "82006dad-6456-413f-899e-11fa2fe5ae59"
              }
            ],
            "exits": [
              {
                "uuid": "dedf64b5-305d-43e3-b987-647e22bb30f1",
                "destination_uuid": "916edf69-36d0-48eb-81f4-eb4f059357dc"
              }
            ]
          },
          {
            "uuid": "916edf69-36d0-48eb-81f4-eb4f059357dc",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "96f36105-e5bb-420f-a0c1-f378aa64c99d",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "a6f4acd9-a58a-42a8-bee6-3d82bc094aaf",
                  "type": "has_only_phrase",
                  "uuid": "53aea734-94eb-4a6c-88dd-7563b4964c8b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "15447524-c461-4b74-920c-9b934c2df3cf",
                  "name": "All Responses",
                  "uuid": "96f36105-e5bb-420f-a0c1-f378aa64c99d"
                },
                {
                  "exit_uuid": "ad19678e-9de8-4e64-9673-c3feb35cb07b",
                  "name": "Chat to @fields.elder",
                  "uuid": "a6f4acd9-a58a-42a8-bee6-3d82bc094aaf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "15447524-c461-4b74-920c-9b934c2df3cf",
                "destination_uuid": null
              },
              {
                "uuid": "ad19678e-9de8-4e64-9673-c3feb35cb07b",
                "destination_uuid": "d9e35b71-5a34-4813-a910-bc8c9d9aef24"
              }
            ]
          },
          {
            "uuid": "d9e35b71-5a34-4813-a910-bc8c9d9aef24",
            "actions": [
              {
                "uuid": "d1c2d402-ce79-4669-918c-7eaebda37b75",
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
                "uuid": "b9f36a79-ff5a-4651-ad6b-cb71f45d6512",
                "destination_uuid": "ef00dc6a-4da7-49d0-9097-9ceca01e371b"
              }
            ]
          },
          {
            "uuid": "ef00dc6a-4da7-49d0-9097-9ceca01e371b",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "01daa9a8-9027-44ba-b7e1-aab1add73162"
                },
                "type": "enter_flow",
                "uuid": "fb9a5342-f317-4942-851a-f19f9e2b0bf4"
              }
            ],
            "exits": [
              {
                "uuid": "1dfc6b0c-d34c-4a9d-bdb3-b760a6ac03cc",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "acc9ee55-09ba-40d9-a76f-6a3f1a96ba59",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "43516473-51cd-4984-836e-d633aef233d0",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b0b1b2ef-7967-4734-8434-49e2fc1cc705"
              }
            ],
            "exits": [
              {
                "uuid": "f0ae1e5b-25ca-4dc2-99fc-05ef5791905b",
                "destination_uuid": "31764b10-cd78-4d48-a12c-8cd94b197a93"
              }
            ]
          },
          {
            "uuid": "31764b10-cd78-4d48-a12c-8cd94b197a93",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "17def78c-faf2-4d9c-888d-85944400390f"
              }
            ],
            "exits": [
              {
                "uuid": "3032fba1-c64d-46c7-b6d5-3182fd7b68ec",
                "destination_uuid": "42d19c5b-6e83-4a87-a85e-41bf9b11e57a"
              }
            ]
          },
          {
            "uuid": "42d19c5b-6e83-4a87-a85e-41bf9b11e57a",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "bdc4370e-d892-482b-b7b7-2a557899a8d2"
              }
            ],
            "exits": [
              {
                "uuid": "0bb8673e-251c-4b9a-a85c-d42a5436d5b1",
                "destination_uuid": "ecff3066-48b9-4ce0-9616-1d4cf3cb6b18"
              }
            ]
          },
          {
            "uuid": "ecff3066-48b9-4ce0-9616-1d4cf3cb6b18",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "60a0d447-f797-4d1a-8d6b-f97921f7a35e",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "512dba97-33ee-4d99-8a0c-d1a9f237b809",
                  "type": "has_only_phrase",
                  "uuid": "0f07fc99-a358-4186-ba93-997012940e5f"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "38cd64a5-192f-4e6f-b6ac-8d303ceccf2a",
                  "type": "has_only_phrase",
                  "uuid": "d30e2a34-871f-4304-8b48-d92375403d42"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "25512272-a762-4d4e-8558-d550ad08594e",
                  "name": "All Responses",
                  "uuid": "60a0d447-f797-4d1a-8d6b-f97921f7a35e"
                },
                {
                  "exit_uuid": "7215c69b-7eec-455d-a045-5cade63672a3",
                  "name": "Yes",
                  "uuid": "512dba97-33ee-4d99-8a0c-d1a9f237b809"
                },
                {
                  "exit_uuid": "b122b769-5b77-4974-87ec-fc2f7f4b8cf5",
                  "name": "No",
                  "uuid": "38cd64a5-192f-4e6f-b6ac-8d303ceccf2a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "25512272-a762-4d4e-8558-d550ad08594e",
                "destination_uuid": null
              },
              {
                "uuid": "7215c69b-7eec-455d-a045-5cade63672a3",
                "destination_uuid": "e946f38d-7fa5-4275-b02a-def1d1b50e2d"
              },
              {
                "uuid": "b122b769-5b77-4974-87ec-fc2f7f4b8cf5",
                "destination_uuid": "5ab29486-102e-4bf3-b816-909c7713f91e"
              }
            ]
          },
          {
            "uuid": "e946f38d-7fa5-4275-b02a-def1d1b50e2d",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b6220c74-9303-438c-9eb8-d9c3ef0465f1"
              }
            ],
            "exits": [
              {
                "uuid": "d5e34d7e-8204-463a-a647-90b1c7c9ed99",
                "destination_uuid": "7c206ff7-45cb-4018-9122-158e5d3c0b1f"
              }
            ]
          },
          {
            "uuid": "5ab29486-102e-4bf3-b816-909c7713f91e",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f287a784-5a2c-483e-846c-6c07babc29ae"
              }
            ],
            "exits": [
              {
                "uuid": "9fbc52d8-307f-4896-809a-1678aa57f203",
                "destination_uuid": "7c206ff7-45cb-4018-9122-158e5d3c0b1f"
              }
            ]
          },
          {
            "uuid": "7c206ff7-45cb-4018-9122-158e5d3c0b1f",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "89652dae-cee1-476c-af20-5574d821b2ba"
              }
            ],
            "exits": [
              {
                "uuid": "c0f8abaa-cf06-4b63-875c-b89c14ba3e0a",
                "destination_uuid": "1b4e3b60-d007-4d6f-a723-34037d7e80b1"
              }
            ]
          },
          {
            "uuid": "1b4e3b60-d007-4d6f-a723-34037d7e80b1",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "6ad72115-64c1-47ff-93af-38b437e675eb"
              }
            ],
            "exits": [
              {
                "uuid": "bbbe34be-b5ee-43b4-a174-2be371b10dc7",
                "destination_uuid": "07af82d4-0085-44a2-bc51-518bc60a20e7"
              }
            ]
          },
          {
            "uuid": "07af82d4-0085-44a2-bc51-518bc60a20e7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "52fae63d-292a-4dac-804d-ac417fbd9613",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "2236d970-c4c6-4b9e-930b-e8d521cc0e7f",
                  "type": "has_only_phrase",
                  "uuid": "0bca9ba2-8604-417e-aeb2-e018b67385bb"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "e2a0e010-652d-4945-99c8-7a4473419771",
                  "type": "has_only_phrase",
                  "uuid": "a8ffb876-da54-4b0b-86c2-0a6a725da5ca"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c7bec2fc-22f4-4763-8376-541ea57df134",
                  "name": "All Responses",
                  "uuid": "52fae63d-292a-4dac-804d-ac417fbd9613"
                },
                {
                  "exit_uuid": "1b8986fe-1fd0-42db-a906-8348665d987f",
                  "name": "Yes",
                  "uuid": "2236d970-c4c6-4b9e-930b-e8d521cc0e7f"
                },
                {
                  "exit_uuid": "d933c5dd-6fb4-481c-808d-1920a1bca515",
                  "name": "Later",
                  "uuid": "e2a0e010-652d-4945-99c8-7a4473419771"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c7bec2fc-22f4-4763-8376-541ea57df134",
                "destination_uuid": null
              },
              {
                "uuid": "1b8986fe-1fd0-42db-a906-8348665d987f",
                "destination_uuid": "9cd571ff-d8e8-494d-895b-034848a0a849"
              },
              {
                "uuid": "d933c5dd-6fb4-481c-808d-1920a1bca515",
                "destination_uuid": "1abf4765-bd5c-4b16-8238-b3748aa2f7f2"
              }
            ]
          },
          {
            "uuid": "9cd571ff-d8e8-494d-895b-034848a0a849",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "fab7e963-a6df-44cb-a40a-27c1ab503e4e"
              }
            ],
            "exits": [
              {
                "uuid": "2497e2a1-7901-46c2-b776-167858bf9d72",
                "destination_uuid": "d380af37-1528-4f1f-8df3-e75f7a36e6f6"
              }
            ]
          },
          {
            "uuid": "d380af37-1528-4f1f-8df3-e75f7a36e6f6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7e9a4077-5a63-467c-9b24-928f35ed1fb3",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "588c096f-a409-4820-b954-9cc68b922b61",
                  "type": "has_only_phrase",
                  "uuid": "723d6749-1b13-4bb4-b67b-72d3cc7149d4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "58f3df38-65ae-478c-bc06-3a64035f2a2b",
                  "name": "All Responses",
                  "uuid": "7e9a4077-5a63-467c-9b24-928f35ed1fb3"
                },
                {
                  "exit_uuid": "8ac81a4a-91ee-41d5-9afb-0b658307ade5",
                  "name": "Take me to Tips",
                  "uuid": "588c096f-a409-4820-b954-9cc68b922b61"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "58f3df38-65ae-478c-bc06-3a64035f2a2b",
                "destination_uuid": null
              },
              {
                "uuid": "8ac81a4a-91ee-41d5-9afb-0b658307ade5",
                "destination_uuid": "0c5f7242-0727-40d7-8fd7-71a7f1ec9540"
              }
            ]
          },
          {
            "uuid": "0c5f7242-0727-40d7-8fd7-71a7f1ec9540",
            "actions": [
              {
                "uuid": "3227caa0-4b59-4a95-90fb-3954082f8c8b",
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
                "uuid": "6f13f932-8472-41fd-b041-b7a3a20bad9c",
                "destination_uuid": "f6276b33-02cf-4d73-98d9-9a3d98e64580"
              }
            ]
          },
          {
            "uuid": "f6276b33-02cf-4d73-98d9-9a3d98e64580",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "001e5a47-5ad1-4d2f-b5bc-878e82385486"
                },
                "type": "enter_flow",
                "uuid": "063f6d2c-9656-4fb6-bcba-dbe6297dc55f"
              }
            ],
            "exits": [
              {
                "uuid": "60905ed8-dfef-425b-a718-e931188d696a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1abf4765-bd5c-4b16-8238-b3748aa2f7f2",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "061d2dcf-f4d8-42d8-be03-821e29cb023f"
              }
            ],
            "exits": [
              {
                "uuid": "e0b0ef89-fcc9-4093-a926-d464b72a1413",
                "destination_uuid": "78747360-69ff-4df1-816f-094fa7fee734"
              }
            ]
          },
          {
            "uuid": "78747360-69ff-4df1-816f-094fa7fee734",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5b077d67-289c-412c-af4a-2576a22a0998",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "82974f20-f703-42ab-8f58-42df9b2e34ae",
                  "type": "has_only_phrase",
                  "uuid": "9bf87d01-03d5-4276-8baf-8cfaa6f1f794"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "316a1af6-83ec-43a3-817b-767be62806a1",
                  "name": "All Responses",
                  "uuid": "5b077d67-289c-412c-af4a-2576a22a0998"
                },
                {
                  "exit_uuid": "69885eef-ed17-4bca-996d-3f03ca820075",
                  "name": "Take me to the home screen",
                  "uuid": "82974f20-f703-42ab-8f58-42df9b2e34ae"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "316a1af6-83ec-43a3-817b-767be62806a1",
                "destination_uuid": null
              },
              {
                "uuid": "69885eef-ed17-4bca-996d-3f03ca820075",
                "destination_uuid": "8bd409cb-9ca0-4b63-9434-0a84ae5211cb"
              }
            ]
          },
          {
            "uuid": "8bd409cb-9ca0-4b63-9434-0a84ae5211cb",
            "actions": [
              {
                "uuid": "51c0e2c1-593a-4f51-8430-7470604c44e6",
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
                "uuid": "cff34f0b-df60-4b40-9d59-99f3d34b7b9b",
                "destination_uuid": "5c6b9ba3-15a2-4a7a-a6b0-a62a8133ba08"
              }
            ]
          },
          {
            "uuid": "5c6b9ba3-15a2-4a7a-a6b0-a62a8133ba08",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "a68fc409-e65f-40ca-bf23-719e9be7a722"
                },
                "type": "enter_flow",
                "uuid": "e9ce88c9-1505-4c1a-aabb-35731c511adf"
              }
            ],
            "exits": [
              {
                "uuid": "cf5ee3e4-4e71-424e-be5f-7811cdd6a3cc",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f2047ce0-2fd4-4404-a4f9-f6fe4fdba4d0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6f36fbdb-7137-43b6-9ba4-27c8ce035e1a",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "303b21b9-e81a-4a93-970a-44abd468eea2"
              }
            ],
            "exits": [
              {
                "uuid": "0fd1c615-19d5-4cc4-b65e-73dd57e226bb",
                "destination_uuid": "f28a2591-5e04-470a-8a85-af030cad7e55"
              }
            ]
          },
          {
            "uuid": "f28a2591-5e04-470a-8a85-af030cad7e55",
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
                "uuid": "bfedc9a5-38e6-4d45-be91-9dbe83588c02"
              }
            ],
            "exits": [
              {
                "uuid": "6286ba5e-764b-4f84-b996-3876444f86d7",
                "destination_uuid": "3de2f60c-31f8-4d0e-ac53-6f90f4dc1afe"
              }
            ]
          },
          {
            "uuid": "3de2f60c-31f8-4d0e-ac53-6f90f4dc1afe",
            "actions": [],
            "exits": [
              {
                "uuid": "173d923f-b571-46a6-978d-318a1e929a96",
                "destination_uuid": "a0b437c0-c1c0-4e15-9514-d9fc36783ac3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6a3dcf2d-82c6-45b3-a3d6-6f8fa4555ba1",
              "cases": [],
              "categories": [
                {
                  "uuid": "6a3dcf2d-82c6-45b3-a3d6-6f8fa4555ba1",
                  "name": "All Responses",
                  "exit_uuid": "173d923f-b571-46a6-978d-318a1e929a96"
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
            "uuid": "a0b437c0-c1c0-4e15-9514-d9fc36783ac3",
            "actions": [
              {
                "uuid": "8be9de09-959b-41fd-9ced-e3a6575370ec",
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
                "uuid": "5c52e4e3-ed98-4ab3-b447-05fba7d2e999",
                "destination_uuid": "122fa23b-0c48-4147-9d7d-a2599f162e33"
              }
            ]
          },
          {
            "uuid": "122fa23b-0c48-4147-9d7d-a2599f162e33",
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
                "uuid": "47e6f34b-5718-4fa0-b31b-2543f7e057c7"
              }
            ],
            "exits": [
              {
                "uuid": "a0eaece5-c587-4988-bb0b-38bb8248d9c6",
                "destination_uuid": "bca6eee3-655f-4944-8885-29297dae2fc1"
              }
            ]
          },
          {
            "uuid": "bca6eee3-655f-4944-8885-29297dae2fc1",
            "actions": [],
            "exits": [
              {
                "uuid": "2aaeeaa2-a659-4b4f-83ae-cb3cb6eb8c47",
                "destination_uuid": "a23cdf4a-b842-41e3-be98-5b9c7e41b089"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "87836caf-07bd-4e7f-a1b6-591b66569200",
              "cases": [],
              "categories": [
                {
                  "uuid": "87836caf-07bd-4e7f-a1b6-591b66569200",
                  "name": "All Responses",
                  "exit_uuid": "2aaeeaa2-a659-4b4f-83ae-cb3cb6eb8c47"
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
            "uuid": "a23cdf4a-b842-41e3-be98-5b9c7e41b089",
            "actions": [
              {
                "uuid": "3f93526b-6734-45d6-bfdf-4f6b7cb8efb2",
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
                "uuid": "1d527e9d-e8da-4b05-808d-68a683ed8711",
                "destination_uuid": "4a1577d6-72e4-4899-8372-638d3bcb96b1"
              }
            ]
          },
          {
            "uuid": "4a1577d6-72e4-4899-8372-638d3bcb96b1",
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
                "uuid": "f38b2ca4-7e57-4d48-9c8e-6ea2e2c9ee84"
              }
            ],
            "exits": [
              {
                "uuid": "dd14eccb-becc-436e-b722-ebf197aa38c9",
                "destination_uuid": "aa22e35b-3d1d-468c-ae77-3e907d33b40b"
              }
            ]
          },
          {
            "uuid": "aa22e35b-3d1d-468c-ae77-3e907d33b40b",
            "actions": [],
            "exits": [
              {
                "uuid": "cb3a946d-79b8-4573-8bda-006f82083e98",
                "destination_uuid": "7b47d508-780e-4f90-beea-8136e0204295"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "15d97e5d-7166-4f7c-96cf-a0ed2164eb65",
              "cases": [],
              "categories": [
                {
                  "uuid": "15d97e5d-7166-4f7c-96cf-a0ed2164eb65",
                  "name": "All Responses",
                  "exit_uuid": "cb3a946d-79b8-4573-8bda-006f82083e98"
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
            "uuid": "7b47d508-780e-4f90-beea-8136e0204295",
            "actions": [
              {
                "uuid": "28d08134-1656-410c-86fb-782701166431",
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
                "uuid": "8c42baf4-d089-4feb-a1a1-4b835b90bac0",
                "destination_uuid": "b2b0df7d-76a6-4b31-9e4e-acbdc7c5c99a"
              }
            ]
          },
          {
            "uuid": "b2b0df7d-76a6-4b31-9e4e-acbdc7c5c99a",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "0777c85e-8ce7-405b-99f4-323e83bb44d0"
              }
            ],
            "exits": [
              {
                "uuid": "7e7000d0-23f9-4a6c-81e1-58e5c16d6f70",
                "destination_uuid": "39e82339-6d7b-4600-b106-213d951c5427"
              }
            ]
          },
          {
            "uuid": "39e82339-6d7b-4600-b106-213d951c5427",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cc353a1d-04ba-4f1a-ac83-8fb51bd23d10",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "4cd096de-844b-4ccb-8064-36b9dca25303",
                  "type": "has_only_phrase",
                  "uuid": "52ad0dbb-d1a9-4736-afd2-ab990ea7a724"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c6c75c3e-0daf-4fea-a836-5877833d7885",
                  "name": "All Responses",
                  "uuid": "cc353a1d-04ba-4f1a-ac83-8fb51bd23d10"
                },
                {
                  "exit_uuid": "9b8e000f-5c47-45d9-a085-806613af8d03",
                  "name": "Take me to Homescreen",
                  "uuid": "4cd096de-844b-4ccb-8064-36b9dca25303"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c6c75c3e-0daf-4fea-a836-5877833d7885",
                "destination_uuid": null
              },
              {
                "uuid": "9b8e000f-5c47-45d9-a085-806613af8d03",
                "destination_uuid": "92b2bf0f-3461-4cba-9952-7fb18759ac29"
              }
            ]
          },
          {
            "uuid": "92b2bf0f-3461-4cba-9952-7fb18759ac29",
            "actions": [
              {
                "uuid": "6ef45a58-5752-448c-b905-96cfeec9a060",
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
                "uuid": "a010bdf8-7d2a-4b8a-bbe8-b6e1a8de5190",
                "destination_uuid": "920207a1-f9fa-488a-8fc2-882052920c9d"
              }
            ]
          },
          {
            "uuid": "920207a1-f9fa-488a-8fc2-882052920c9d",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "973480a6-a9b0-4fec-adf8-bc6a8e7007b6"
                },
                "type": "enter_flow",
                "uuid": "e8461e28-a6ce-4c88-b969-c528e05b7cc7"
              }
            ],
            "exits": [
              {
                "uuid": "4ce982a9-5e16-4959-9964-ca3c47926c53",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b5d1e522-3f2d-4215-99f2-7381466f2fc3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "285c3584-65dd-4a2d-81e4-ad8f34a9fb72",
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
                "uuid": "5a027574-36b0-41d8-bd44-9280c383585e"
              }
            ],
            "exits": [
              {
                "uuid": "c020738f-0fcb-4138-bbd4-b19293375a0b",
                "destination_uuid": "26c22a50-44b7-43e8-a55c-d3738572324c"
              }
            ]
          },
          {
            "uuid": "26c22a50-44b7-43e8-a55c-d3738572324c",
            "actions": [],
            "exits": [
              {
                "uuid": "f43a5f2b-d78a-4799-8ff3-b07fb55656e1",
                "destination_uuid": "fad1f2ae-c2e9-41b3-bd2c-df916e4b43fc"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7cf57cc1-1734-4f25-ba00-b4872de23737",
              "cases": [],
              "categories": [
                {
                  "uuid": "7cf57cc1-1734-4f25-ba00-b4872de23737",
                  "name": "All Responses",
                  "exit_uuid": "f43a5f2b-d78a-4799-8ff3-b07fb55656e1"
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
            "uuid": "fad1f2ae-c2e9-41b3-bd2c-df916e4b43fc",
            "actions": [
              {
                "uuid": "4e9498d7-0f39-484d-a41e-d2dc8030b169",
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
                "uuid": "2ab233df-eb87-4530-b51f-f0eaf0f8cc7e",
                "destination_uuid": "a5cbb202-e807-4a89-8636-1bf6e6cd6761"
              }
            ]
          },
          {
            "uuid": "a5cbb202-e807-4a89-8636-1bf6e6cd6761",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "80e9986d-ebfc-4589-be45-7a4ffddd5ba8",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "8056eed4-add2-47c3-932d-fa74a30ecec7",
                  "type": "has_only_phrase",
                  "uuid": "72286b62-8062-48fd-b785-ec7d3d3fec13"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "555454f0-12dc-4c89-87f1-3c8fbf83a851",
                  "type": "has_only_phrase",
                  "uuid": "8542a527-c2b8-4c50-8c7a-a55a0702f2ea"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "3047026a-ff5e-49de-a5a6-6acf878103d6",
                  "type": "has_only_phrase",
                  "uuid": "5bd61c5a-4fd8-4e6d-8998-b1b707bf6a13"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fa54b025-c37d-4cd7-8ced-dd1c28b4c986",
                  "name": "All Responses",
                  "uuid": "80e9986d-ebfc-4589-be45-7a4ffddd5ba8"
                },
                {
                  "exit_uuid": "ab640763-35eb-41ad-92ed-28678682d8dc",
                  "name": "Great",
                  "uuid": "8056eed4-add2-47c3-932d-fa74a30ecec7"
                },
                {
                  "exit_uuid": "0e920260-f506-4772-bfbb-9968d1f525a6",
                  "name": "Neutral",
                  "uuid": "555454f0-12dc-4c89-87f1-3c8fbf83a851"
                },
                {
                  "exit_uuid": "5cef59e3-ba7d-437c-a2ab-4095b572f6bb",
                  "name": "Bad",
                  "uuid": "3047026a-ff5e-49de-a5a6-6acf878103d6"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "fa54b025-c37d-4cd7-8ced-dd1c28b4c986",
                "destination_uuid": null
              },
              {
                "uuid": "ab640763-35eb-41ad-92ed-28678682d8dc",
                "destination_uuid": "47df53a9-d9ed-4811-a1a5-625b95641087"
              },
              {
                "uuid": "0e920260-f506-4772-bfbb-9968d1f525a6",
                "destination_uuid": "6b1c6e21-8a7c-435c-9716-ab87d4448480"
              },
              {
                "uuid": "5cef59e3-ba7d-437c-a2ab-4095b572f6bb",
                "destination_uuid": "6851a290-4248-421e-817d-96157b78ff93"
              }
            ]
          },
          {
            "uuid": "47df53a9-d9ed-4811-a1a5-625b95641087",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5539db6f-2819-4c8f-abac-6d8b479023ed"
              }
            ],
            "exits": [
              {
                "uuid": "a7cfa37d-b6a3-45b6-bea0-090475817a9f",
                "destination_uuid": "3d583e0c-52b7-4ed9-b4dc-257bd7201cae"
              }
            ]
          },
          {
            "uuid": "6b1c6e21-8a7c-435c-9716-ab87d4448480",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6780cb64-f2a8-43b4-aace-90d83f2e75f0"
              }
            ],
            "exits": [
              {
                "uuid": "2301b13e-b921-4971-8f2c-e8bdbcae4d58",
                "destination_uuid": "3d583e0c-52b7-4ed9-b4dc-257bd7201cae"
              }
            ]
          },
          {
            "uuid": "3d583e0c-52b7-4ed9-b4dc-257bd7201cae",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "34f80798-b987-404f-98ca-b5db6e8e8eb9"
                },
                "type": "enter_flow",
                "uuid": "5698231e-029a-4373-991d-41e145833958"
              }
            ],
            "exits": [
              {
                "uuid": "0584ad19-ef21-4373-8dbf-9bb1887daed5",
                "destination_uuid": "beaf88a8-789e-4c0d-8bed-cce820795b98"
              },
              {
                "uuid": "04e5f57e-2681-46a6-bbb7-4d5760af48a0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ffd14f43-e08e-4f2b-a178-f179e3c2cc30",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b958d2de-a3d4-4174-a44e-81d260f6ef12"
                },
                {
                  "uuid": "038441ed-9308-4e4e-8695-e2b3ebdb87c2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "3265c1fd-0ec4-40fc-982e-b8bd3d8fa971"
                }
              ],
              "categories": [
                {
                  "uuid": "b958d2de-a3d4-4174-a44e-81d260f6ef12",
                  "name": "Complete",
                  "exit_uuid": "0584ad19-ef21-4373-8dbf-9bb1887daed5"
                },
                {
                  "uuid": "3265c1fd-0ec4-40fc-982e-b8bd3d8fa971",
                  "name": "Expired",
                  "exit_uuid": "04e5f57e-2681-46a6-bbb7-4d5760af48a0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b958d2de-a3d4-4174-a44e-81d260f6ef12"
            }
          },
          {
            "uuid": "beaf88a8-789e-4c0d-8bed-cce820795b98",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "97247bc3-4a54-475e-9522-275cb65fdb11"
                },
                "type": "enter_flow",
                "uuid": "c2a7c055-7ed0-4075-8db7-28a1542a1597"
              }
            ],
            "exits": [
              {
                "uuid": "4bbf68af-2de9-47f3-b8aa-98d8cda1150d",
                "destination_uuid": "8f5b45c1-8e65-4475-bbae-5594e6e2c80a"
              },
              {
                "uuid": "e019485a-12f6-4477-8775-68aa5e68ad38",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "fd9395e6-98eb-4df2-9d3e-24b8a4db7c6c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "19b7caf7-3c98-4e5f-b4ae-e6bc1fb21ff9"
                },
                {
                  "uuid": "26a6ee6f-6bff-4edc-a316-42cb0e8c93e3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c92482c3-f255-4894-95fd-586dc633eb1e"
                }
              ],
              "categories": [
                {
                  "uuid": "19b7caf7-3c98-4e5f-b4ae-e6bc1fb21ff9",
                  "name": "Complete",
                  "exit_uuid": "4bbf68af-2de9-47f3-b8aa-98d8cda1150d"
                },
                {
                  "uuid": "c92482c3-f255-4894-95fd-586dc633eb1e",
                  "name": "Expired",
                  "exit_uuid": "e019485a-12f6-4477-8775-68aa5e68ad38"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "19b7caf7-3c98-4e5f-b4ae-e6bc1fb21ff9"
            }
          },
          {
            "uuid": "6851a290-4248-421e-817d-96157b78ff93",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "025ea265-097b-4b28-8858-586e505c78bf"
              }
            ],
            "exits": [
              {
                "uuid": "0c060e37-befe-47dd-8a2c-a67ff413ef7b",
                "destination_uuid": "6ab961d9-362f-4efe-b0f4-6c1dd3cc6131"
              }
            ]
          },
          {
            "uuid": "6ab961d9-362f-4efe-b0f4-6c1dd3cc6131",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "8f6e8663-67f1-4bcb-a5f9-4866addd07b9"
                },
                "type": "enter_flow",
                "uuid": "603c86d9-319a-4dca-9c9a-8f9f550238c8"
              }
            ],
            "exits": [
              {
                "uuid": "2c7abc8e-4416-401c-9878-18bc364d1149",
                "destination_uuid": "3d60a33c-59a9-4450-b905-e2452c8d48aa"
              },
              {
                "uuid": "c1b97751-7b01-4e8e-a496-296634b3ff12",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "38ac94db-d731-452f-8ff8-fd60e0772224",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "3fac9f6f-fb97-4239-a2b0-8d1877b8aa43"
                },
                {
                  "uuid": "2e78930c-4905-4516-ac4f-9970024e0d70",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0115ab1a-98d8-402c-8927-0fbf4677fb1f"
                }
              ],
              "categories": [
                {
                  "uuid": "3fac9f6f-fb97-4239-a2b0-8d1877b8aa43",
                  "name": "Complete",
                  "exit_uuid": "2c7abc8e-4416-401c-9878-18bc364d1149"
                },
                {
                  "uuid": "0115ab1a-98d8-402c-8927-0fbf4677fb1f",
                  "name": "Expired",
                  "exit_uuid": "c1b97751-7b01-4e8e-a496-296634b3ff12"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "3fac9f6f-fb97-4239-a2b0-8d1877b8aa43"
            }
          },
          {
            "uuid": "3d60a33c-59a9-4450-b905-e2452c8d48aa",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "9702f121-fb64-4063-b9fe-f5f549d900fe"
                },
                "type": "enter_flow",
                "uuid": "b49c32ef-5273-4add-9cea-2430b928bcfd"
              }
            ],
            "exits": [
              {
                "uuid": "b17240c4-d28f-498f-bd79-1d2d39d33bed",
                "destination_uuid": "8f5b45c1-8e65-4475-bbae-5594e6e2c80a"
              },
              {
                "uuid": "d8e42ecb-f983-419b-b2e6-9b7bb2b0bd3a",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7fa582c6-7c7a-4a40-80e1-36835cbac4c3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8381a33c-5df1-45f1-91af-a9e130f671b5"
                },
                {
                  "uuid": "07755d4a-c001-4924-90d8-8359c53a5560",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "79938fed-6e3a-48a7-b4f7-54357c450dd3"
                }
              ],
              "categories": [
                {
                  "uuid": "8381a33c-5df1-45f1-91af-a9e130f671b5",
                  "name": "Complete",
                  "exit_uuid": "b17240c4-d28f-498f-bd79-1d2d39d33bed"
                },
                {
                  "uuid": "79938fed-6e3a-48a7-b4f7-54357c450dd3",
                  "name": "Expired",
                  "exit_uuid": "d8e42ecb-f983-419b-b2e6-9b7bb2b0bd3a"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8381a33c-5df1-45f1-91af-a9e130f671b5"
            }
          },
          {
            "uuid": "8f5b45c1-8e65-4475-bbae-5594e6e2c80a",
            "actions": [
              {
                "uuid": "5fbb0cc8-da2a-453c-85cd-87844c9ff328",
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
                "uuid": "e7bbc51f-83af-4ff5-ab51-1abf5413a0a8",
                "destination_uuid": "e7d34501-f876-4d0a-b655-5da8f5b3e1fa"
              }
            ]
          },
          {
            "uuid": "e7d34501-f876-4d0a-b655-5da8f5b3e1fa",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "5893e937-dd69-449f-9a08-7ce2fc342217"
                },
                "type": "enter_flow",
                "uuid": "0babfee5-0aeb-45c0-a39e-4960e5b21c53"
              }
            ],
            "exits": [
              {
                "uuid": "89248e38-2852-41d6-ae10-549d98ae5566",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4d59bce1-0c8b-485b-99e3-3ce2de1e87cb",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0503daa8-aafe-4a12-b8a5-65eca51a653d",
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
                "uuid": "a00a473b-90b5-4a0e-83fd-fcc87317c2b3"
              }
            ],
            "exits": [
              {
                "uuid": "ead07fad-a3eb-4faa-a683-4c3f04a06a12",
                "destination_uuid": "eda65427-6376-4557-9e74-685297bd9166"
              }
            ]
          },
          {
            "uuid": "eda65427-6376-4557-9e74-685297bd9166",
            "actions": [],
            "exits": [
              {
                "uuid": "5a9be576-bd6b-4017-9f99-487f6d33205f",
                "destination_uuid": "ef7eab2a-1c32-4f25-a70b-423751ea237f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "25192435-ea31-4fcc-a9d9-3ba8ad7653b9",
              "cases": [],
              "categories": [
                {
                  "uuid": "25192435-ea31-4fcc-a9d9-3ba8ad7653b9",
                  "name": "All Responses",
                  "exit_uuid": "5a9be576-bd6b-4017-9f99-487f6d33205f"
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
            "uuid": "ef7eab2a-1c32-4f25-a70b-423751ea237f",
            "actions": [
              {
                "uuid": "ed870b47-4f11-4145-8445-0242741714cc",
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
                "uuid": "5dc758d2-2edb-4ebf-85cb-3f2c71c32fc7",
                "destination_uuid": "bfb20194-3064-4a2d-bde5-052bb4df9db4"
              }
            ]
          },
          {
            "uuid": "bfb20194-3064-4a2d-bde5-052bb4df9db4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e93cf0c5-08ba-4ba0-bb07-61f6a792ba51",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "6c16fc2d-7629-4aa1-b62d-d1dbfbd77619",
                  "type": "has_only_phrase",
                  "uuid": "32054787-bdda-434a-8c0c-1c5df83c90e6"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "2d55bbea-6105-45d9-8d31-9d026c74edc4",
                  "type": "has_only_phrase",
                  "uuid": "51e92905-ae78-4ec0-b95c-5ff5f2c264e2"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "36bd10f8-a92f-4d02-9843-16ac3fedec1b",
                  "type": "has_only_phrase",
                  "uuid": "19d33bec-ae6f-4efa-912d-52ab2abdb34a"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "db0dc3a2-2db7-41af-971f-b1c6da859d6b",
                  "type": "has_only_phrase",
                  "uuid": "380b32f7-8959-4b0b-8e21-26d6595f3d3e"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "ff2b3a58-3772-4a83-baec-24a3c90e9029",
                  "type": "has_only_phrase",
                  "uuid": "2df24023-f458-4686-94f0-5c38bf8436fe"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "9a92f7ad-92d4-4796-9aa2-f456c104c66e",
                  "type": "has_only_phrase",
                  "uuid": "c17a3a60-3b88-4b67-9bab-cbad1bc808ec"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "5e08fcfe-eb3e-4d1f-80bd-0eb07509137c",
                  "type": "has_only_phrase",
                  "uuid": "186945b2-6c68-4884-a684-3c70cc5597d4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c6dbb4ea-949d-4f1a-93d1-d519b30d7b78",
                  "name": "All Responses",
                  "uuid": "e93cf0c5-08ba-4ba0-bb07-61f6a792ba51"
                },
                {
                  "exit_uuid": "35b1fd67-0d57-4a20-8fad-989c79217328",
                  "name": "Do it every day",
                  "uuid": "6c16fc2d-7629-4aa1-b62d-d1dbfbd77619"
                },
                {
                  "exit_uuid": "2e251a82-6532-4e19-8d5d-eef7a9745b51",
                  "name": "Let your teen choose the activity",
                  "uuid": "2d55bbea-6105-45d9-8d31-9d026c74edc4"
                },
                {
                  "exit_uuid": "1b099c50-c370-49b1-bd73-06b68e938b60",
                  "name": "Follow your teen’s lead",
                  "uuid": "36bd10f8-a92f-4d02-9843-16ac3fedec1b"
                },
                {
                  "exit_uuid": "1b32f016-7841-4f4e-a4c9-b6b92229b4e0",
                  "name": "Give your teen all of your attention",
                  "uuid": "db0dc3a2-2db7-41af-971f-b1c6da859d6b"
                },
                {
                  "exit_uuid": "f95ad0e3-239d-49cc-bd61-8981dde33ffd",
                  "name": "Show your teen you are really listening",
                  "uuid": "ff2b3a58-3772-4a83-baec-24a3c90e9029"
                },
                {
                  "exit_uuid": "cd5ff543-6af1-4131-92b2-423183de1910",
                  "name": "Have fun!",
                  "uuid": "9a92f7ad-92d4-4796-9aa2-f456c104c66e"
                },
                {
                  "exit_uuid": "58a73c70-79de-4917-afc6-a9ffe95ad2d7",
                  "name": "None ",
                  "uuid": "5e08fcfe-eb3e-4d1f-80bd-0eb07509137c"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "c6dbb4ea-949d-4f1a-93d1-d519b30d7b78",
                "destination_uuid": null
              },
              {
                "uuid": "35b1fd67-0d57-4a20-8fad-989c79217328",
                "destination_uuid": "4f237d41-8293-46bf-b2fd-5c060e954f9f"
              },
              {
                "uuid": "2e251a82-6532-4e19-8d5d-eef7a9745b51",
                "destination_uuid": "0f006495-3e8f-489d-a227-663c4f09d82e"
              },
              {
                "uuid": "1b099c50-c370-49b1-bd73-06b68e938b60",
                "destination_uuid": "b1273949-3a29-42e2-8503-87a73846b1dc"
              },
              {
                "uuid": "1b32f016-7841-4f4e-a4c9-b6b92229b4e0",
                "destination_uuid": "277fabc6-ae15-4fd5-9523-b268b9ac960e"
              },
              {
                "uuid": "f95ad0e3-239d-49cc-bd61-8981dde33ffd",
                "destination_uuid": "ab6a5ba9-195d-4d42-bb69-86a6fef4dba6"
              },
              {
                "uuid": "cd5ff543-6af1-4131-92b2-423183de1910",
                "destination_uuid": "17776c5d-7338-4e8b-b109-f96ff06bbe55"
              },
              {
                "uuid": "58a73c70-79de-4917-afc6-a9ffe95ad2d7",
                "destination_uuid": "d53fd5ce-ef90-4659-88e7-02b15aa2c2e2"
              }
            ]
          },
          {
            "uuid": "4f237d41-8293-46bf-b2fd-5c060e954f9f",
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
                "uuid": "80f40df5-bc30-4006-93e8-942d8a1b27e5"
              }
            ],
            "exits": [
              {
                "uuid": "3c837990-54f3-4798-88c1-c3449285b809",
                "destination_uuid": "5a0a6b5a-bacf-4c40-a40e-f641745f0b11"
              }
            ]
          },
          {
            "uuid": "5a0a6b5a-bacf-4c40-a40e-f641745f0b11",
            "actions": [],
            "exits": [
              {
                "uuid": "4144aaf4-977f-492a-b0d5-45f8fc525cba",
                "destination_uuid": "976f2cb0-1861-4811-b389-90ece363aaff"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d06afb68-63c8-45b7-beb2-0b1d137aff85",
              "cases": [],
              "categories": [
                {
                  "uuid": "d06afb68-63c8-45b7-beb2-0b1d137aff85",
                  "name": "All Responses",
                  "exit_uuid": "4144aaf4-977f-492a-b0d5-45f8fc525cba"
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
            "uuid": "976f2cb0-1861-4811-b389-90ece363aaff",
            "actions": [
              {
                "uuid": "2c64f8b6-49bf-410b-a5bd-3b1c3f35f413",
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
                "uuid": "5e00a9d2-92fa-4f92-9f7e-87f9b8bae2ce",
                "destination_uuid": "18911a9e-1514-409b-95d7-b2abfca196a5"
              }
            ]
          },
          {
            "uuid": "18911a9e-1514-409b-95d7-b2abfca196a5",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8a51133b-f20d-4bbe-a7aa-60b8f5ed6247"
              }
            ],
            "exits": [
              {
                "uuid": "43a10fed-b5ea-49a0-8447-267ad4f8f5ee",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "0f006495-3e8f-489d-a227-663c4f09d82e",
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
                "uuid": "9c3878cd-bdad-4b49-97dd-2ad72e4d5688"
              }
            ],
            "exits": [
              {
                "uuid": "a4c6c984-a840-4dbc-856d-fb1bf7ec1cda",
                "destination_uuid": "34d0af9b-41ad-468f-875d-7de18c858677"
              }
            ]
          },
          {
            "uuid": "34d0af9b-41ad-468f-875d-7de18c858677",
            "actions": [],
            "exits": [
              {
                "uuid": "4c8e840b-cb3e-43f0-87c7-35cf62bf698e",
                "destination_uuid": "8dd7369d-3ce9-42a8-ab5b-954bf448d4ec"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "41e16d46-b139-49d0-9ab6-cce75a73f43a",
              "cases": [],
              "categories": [
                {
                  "uuid": "41e16d46-b139-49d0-9ab6-cce75a73f43a",
                  "name": "All Responses",
                  "exit_uuid": "4c8e840b-cb3e-43f0-87c7-35cf62bf698e"
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
            "uuid": "8dd7369d-3ce9-42a8-ab5b-954bf448d4ec",
            "actions": [
              {
                "uuid": "dbfa8b29-942d-4ea6-9111-099a22dee191",
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
                "uuid": "85111ffe-103f-4d47-acee-76650fb653ec",
                "destination_uuid": "b418c395-8641-46a7-a0b9-6967735b8dd2"
              }
            ]
          },
          {
            "uuid": "b418c395-8641-46a7-a0b9-6967735b8dd2",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "94a57b01-5244-4c5f-a8b6-e35d959d4ffd"
              }
            ],
            "exits": [
              {
                "uuid": "2013a253-2ad5-438a-93b7-aa24cf609ff1",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b1273949-3a29-42e2-8503-87a73846b1dc",
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
                "uuid": "dceb67a6-7ba5-4db3-a7a7-11af94a10808"
              }
            ],
            "exits": [
              {
                "uuid": "c47badd0-a649-4ede-9918-f90f2c262899",
                "destination_uuid": "46dfd741-80b6-47cc-837e-3b183f713263"
              }
            ]
          },
          {
            "uuid": "46dfd741-80b6-47cc-837e-3b183f713263",
            "actions": [],
            "exits": [
              {
                "uuid": "c8220ea9-5b8f-402e-8ca3-b7f172875b6b",
                "destination_uuid": "284dfbfb-2a3d-4fb4-a4c4-737f7a646831"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "58cab19a-3695-4460-b04a-3c8703330003",
              "cases": [],
              "categories": [
                {
                  "uuid": "58cab19a-3695-4460-b04a-3c8703330003",
                  "name": "All Responses",
                  "exit_uuid": "c8220ea9-5b8f-402e-8ca3-b7f172875b6b"
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
            "uuid": "284dfbfb-2a3d-4fb4-a4c4-737f7a646831",
            "actions": [
              {
                "uuid": "dcbd225c-30c2-4863-b652-d4432aaddae5",
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
                "uuid": "b78224d0-d1ec-4699-9c29-a0e008593f03",
                "destination_uuid": "cd1472b7-e188-484b-a31e-8259112e71b3"
              }
            ]
          },
          {
            "uuid": "cd1472b7-e188-484b-a31e-8259112e71b3",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ca2331dd-4d43-4ac8-8128-46e948c0acb8"
              }
            ],
            "exits": [
              {
                "uuid": "9768347f-614c-452c-afa5-dec82e0cf78b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "277fabc6-ae15-4fd5-9523-b268b9ac960e",
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
                "uuid": "77b6d264-29eb-49aa-b110-418cdc687357"
              }
            ],
            "exits": [
              {
                "uuid": "3c7140d8-4e64-47e5-aff5-6ba12191b0e2",
                "destination_uuid": "16c6c341-d5b4-440c-af3f-2fb99957796d"
              }
            ]
          },
          {
            "uuid": "16c6c341-d5b4-440c-af3f-2fb99957796d",
            "actions": [],
            "exits": [
              {
                "uuid": "1e11e7b0-5d1d-45e4-8c13-63580f680e0a",
                "destination_uuid": "4b974c3a-fca8-453e-97e9-b97bd22d8770"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "30fdf70d-dc1f-4944-b210-a9b566fa9b0a",
              "cases": [],
              "categories": [
                {
                  "uuid": "30fdf70d-dc1f-4944-b210-a9b566fa9b0a",
                  "name": "All Responses",
                  "exit_uuid": "1e11e7b0-5d1d-45e4-8c13-63580f680e0a"
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
            "uuid": "4b974c3a-fca8-453e-97e9-b97bd22d8770",
            "actions": [
              {
                "uuid": "8b7b8cc0-789b-4939-97ca-3bc57a1bd29c",
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
                "uuid": "1009e339-f711-4e10-8370-b3d1d8720434",
                "destination_uuid": "9e7e9087-e8d8-4825-821d-fbea09a18b42"
              }
            ]
          },
          {
            "uuid": "9e7e9087-e8d8-4825-821d-fbea09a18b42",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3b777a8e-636c-4c77-872a-1d07572c7a9a"
              }
            ],
            "exits": [
              {
                "uuid": "7f7dd343-ec30-43b9-8799-6502460def63",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ab6a5ba9-195d-4d42-bb69-86a6fef4dba6",
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
                "uuid": "706c675f-7dc2-4d32-9a77-ed6b1c7c50e6"
              }
            ],
            "exits": [
              {
                "uuid": "1721114d-d3aa-4763-8aac-1966ef9ab7cb",
                "destination_uuid": "a13235e4-9ffa-48c7-85b4-f612604f4d7e"
              }
            ]
          },
          {
            "uuid": "a13235e4-9ffa-48c7-85b4-f612604f4d7e",
            "actions": [],
            "exits": [
              {
                "uuid": "e630220d-cd5d-451a-8e51-506672e21070",
                "destination_uuid": "d276f1b4-ca8d-431d-9fdc-9e3251cb91f2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d1008d07-6ce7-4a47-a313-5371cbfe5294",
              "cases": [],
              "categories": [
                {
                  "uuid": "d1008d07-6ce7-4a47-a313-5371cbfe5294",
                  "name": "All Responses",
                  "exit_uuid": "e630220d-cd5d-451a-8e51-506672e21070"
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
            "uuid": "d276f1b4-ca8d-431d-9fdc-9e3251cb91f2",
            "actions": [
              {
                "uuid": "11de5087-52d5-4eac-a118-98e42609a20a",
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
                "uuid": "1f98d1db-be5b-40d9-9977-3252dc57321c",
                "destination_uuid": "13b3ffb7-7204-4f6b-bdb1-7fafc8e6baaa"
              }
            ]
          },
          {
            "uuid": "13b3ffb7-7204-4f6b-bdb1-7fafc8e6baaa",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "303d7aff-475f-4941-a3bc-1c8b1ffa6567"
              }
            ],
            "exits": [
              {
                "uuid": "ec60c0cd-62da-4a04-b125-23d19eb157d6",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "17776c5d-7338-4e8b-b109-f96ff06bbe55",
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
                "uuid": "7cefbf5a-b49f-4258-9cb2-217c0991d729"
              }
            ],
            "exits": [
              {
                "uuid": "5bdd2c15-aca0-43d9-b1cf-d1cac7d437fb",
                "destination_uuid": "17d24139-6c4a-444d-a1ba-75ef4b486e0a"
              }
            ]
          },
          {
            "uuid": "17d24139-6c4a-444d-a1ba-75ef4b486e0a",
            "actions": [],
            "exits": [
              {
                "uuid": "850f7fd4-92f6-409c-b2dd-5fac1c6e4832",
                "destination_uuid": "223ca0a7-47b7-47a7-a001-926ebb751b5a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "08f033fe-0400-4017-b32d-13bcefeb3512",
              "cases": [],
              "categories": [
                {
                  "uuid": "08f033fe-0400-4017-b32d-13bcefeb3512",
                  "name": "All Responses",
                  "exit_uuid": "850f7fd4-92f6-409c-b2dd-5fac1c6e4832"
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
            "uuid": "223ca0a7-47b7-47a7-a001-926ebb751b5a",
            "actions": [
              {
                "uuid": "a2c00dd4-3042-4d6b-a8c0-681bce13ede5",
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
                "uuid": "92229043-86ca-426f-a2cb-97fc7d5926ce",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "628419d0-ebb4-4fbd-9297-7d5f8a29c52b",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "99bfbc89-3658-4b74-a46e-0856dd560aec"
              }
            ],
            "exits": [
              {
                "uuid": "a32a3a33-8062-4172-b53c-3ba0b0642b5b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "d53fd5ce-ef90-4659-88e7-02b15aa2c2e2",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "834a8229-d87f-4ba8-9736-980ff814760d"
              }
            ],
            "exits": [
              {
                "uuid": "7efcb67e-eb5b-4948-b058-743589e67c1c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "34247cce-3388-4271-9858-bf62c199c44e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b9026a9b-8893-46ff-84b9-cc06d540c55d",
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
                "uuid": "e5eac69f-15d2-4342-88a5-aefff07a5bb9"
              }
            ],
            "exits": [
              {
                "uuid": "c6ddb5fd-a02f-4cf7-8513-7f32feb22e2a",
                "destination_uuid": "68e1dabc-c2a1-4431-bf05-79230f3c8be8"
              }
            ]
          },
          {
            "uuid": "8dbb47ed-50ec-430f-ad07-f1ea1142e901",
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
                "uuid": "492ca6e1-deca-4f07-be30-95b4403e94da"
              }
            ],
            "exits": [
              {
                "uuid": "d0475e2b-4ffb-4284-af19-2cd52d8449d4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ce8b297c-3759-4949-9938-ce62219d6a22",
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
                "uuid": "5a5dbb01-d7d5-4f20-8388-26577973e464"
              }
            ],
            "exits": [
              {
                "uuid": "41b1c563-0f20-4ca1-891e-ab2c70669fac",
                "destination_uuid": "68e1dabc-c2a1-4431-bf05-79230f3c8be8"
              }
            ]
          },
          {
            "uuid": "68e1dabc-c2a1-4431-bf05-79230f3c8be8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2dc1733c-5243-442a-96a9-27af34bb8d53",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "70774fb7-8d91-4ca0-b575-e68b7a9732b8",
                  "type": "has_only_phrase",
                  "uuid": "5845cdb6-65e5-4189-9da2-638717a0eae5"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "a6d4501c-4f5b-4398-9c90-7c92297bdecc",
                  "type": "has_only_phrase",
                  "uuid": "ec9dbb72-ba8c-4a2b-8761-e01973ab533b"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "589e6c67-75a9-452d-a378-bc6ef1a41ca6",
                  "type": "has_only_phrase",
                  "uuid": "92655c87-cb4e-45d5-b7bc-76d86ba5f47b"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "8791840c-e612-41d7-add1-ed3691ebfe7c",
                  "type": "has_only_phrase",
                  "uuid": "dc7637cd-d64a-4f94-9063-a2737fc84755"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "05ba859d-a0dc-4927-ab90-9adbe252a72a",
                  "type": "has_only_phrase",
                  "uuid": "6ffa2680-72c9-490a-b435-5c398ef268c5"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "48af356b-6d44-41b7-8ebe-5c34760b2e67",
                  "type": "has_only_phrase",
                  "uuid": "0e04efa3-d512-44c3-bbf6-ac5dcc6c3d0f"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "e59011f8-f27c-4a7f-9d25-eedeeb59e0db",
                  "type": "has_only_phrase",
                  "uuid": "1b140a9d-c68a-4855-afa1-d23fd44a432f"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "1a6ab202-d3cc-41e3-aca2-cc7735c166ea",
                  "type": "has_only_phrase",
                  "uuid": "bcd908bc-4dc1-4b5a-8457-6823cbf67059"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "2dee63be-8142-4838-89b5-ef83bd772c71",
                  "type": "has_only_phrase",
                  "uuid": "2bbb83d3-9489-4faf-94c6-219e9c71be60"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "0319e2e4-a926-4d22-893d-5ced6daa4af3",
                  "type": "has_only_phrase",
                  "uuid": "9a580164-6775-47f1-929f-3c957fc82d0a"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "1e9ded64-3865-4794-bff7-aeec321e7950",
                  "type": "has_only_phrase",
                  "uuid": "768ec796-6159-404c-a32e-3c49a4b6d932"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "cc18f454-f244-46f4-a60a-b25600b88e3d",
                  "type": "has_only_phrase",
                  "uuid": "7d22ccba-809f-408b-8e18-952bbeedd2d8"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "a41e3959-81fc-4309-8d87-782f33a9f6e9",
                  "type": "has_only_phrase",
                  "uuid": "23fb42c0-cf83-481a-b416-0846cc51eb9d"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "04e538a2-b768-42e4-a6ea-889239db9c76",
                  "type": "has_only_phrase",
                  "uuid": "446a7210-81e1-477e-ad74-e0873b00cae5"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "1ebd45f7-9bb5-47df-8c79-4594d7bfb043",
                  "type": "has_only_phrase",
                  "uuid": "19edbfd3-0b68-4ac6-9cd0-d1acf6706b2f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ddea1d93-c5a1-4b0c-b595-fa1f67d302c0",
                  "name": "All Responses",
                  "uuid": "2dc1733c-5243-442a-96a9-27af34bb8d53"
                },
                {
                  "exit_uuid": "79cecb17-531c-47df-b8e5-c040a4c11268",
                  "name": "I don’t have enough time",
                  "uuid": "70774fb7-8d91-4ca0-b575-e68b7a9732b8"
                },
                {
                  "exit_uuid": "83858930-470c-4ed1-836c-e7df7d5cc314",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "a6d4501c-4f5b-4398-9c90-7c92297bdecc"
                },
                {
                  "exit_uuid": "62506ed9-2ec6-48b4-bbcb-965cefb25b76",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "589e6c67-75a9-452d-a378-bc6ef1a41ca6"
                },
                {
                  "exit_uuid": "7bfb2c7c-b2e2-4b61-9324-20c13135ba49",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "8791840c-e612-41d7-add1-ed3691ebfe7c"
                },
                {
                  "exit_uuid": "bc9cd21c-054f-4d7a-be12-15aa6334a8b8",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "05ba859d-a0dc-4927-ab90-9adbe252a72a"
                },
                {
                  "exit_uuid": "88d9f375-ced3-43fe-8c2d-9f207acc8dd1",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "48af356b-6d44-41b7-8ebe-5c34760b2e67"
                },
                {
                  "exit_uuid": "40e0004a-3c7c-4467-a3d3-3caa1f584a51",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "e59011f8-f27c-4a7f-9d25-eedeeb59e0db"
                },
                {
                  "exit_uuid": "b94cb0bf-229c-4e26-9214-3d2570205a4d",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "1a6ab202-d3cc-41e3-aca2-cc7735c166ea"
                },
                {
                  "exit_uuid": "faa49cc1-874e-4a39-91f2-ec954ce582c1",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "2dee63be-8142-4838-89b5-ef83bd772c71"
                },
                {
                  "exit_uuid": "a5e69337-0c6e-4586-82cf-b42a784044ca",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "0319e2e4-a926-4d22-893d-5ced6daa4af3"
                },
                {
                  "exit_uuid": "93de8327-7ade-489c-a9f2-93d5e83a91ce",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "1e9ded64-3865-4794-bff7-aeec321e7950"
                },
                {
                  "exit_uuid": "8db546ed-4489-438e-9bbf-1d205a5c0ae2",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "cc18f454-f244-46f4-a60a-b25600b88e3d"
                },
                {
                  "exit_uuid": "dbab09f9-54c2-46c0-b684-94d35bcdbff1",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "a41e3959-81fc-4309-8d87-782f33a9f6e9"
                },
                {
                  "exit_uuid": "75572e70-988f-4bba-b16b-d553d850bc23",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "04e538a2-b768-42e4-a6ea-889239db9c76"
                },
                {
                  "exit_uuid": "466d2a67-22ca-4204-8e65-ffaca3c92105",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "1ebd45f7-9bb5-47df-8c79-4594d7bfb043"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ddea1d93-c5a1-4b0c-b595-fa1f67d302c0",
                "destination_uuid": null
              },
              {
                "uuid": "79cecb17-531c-47df-b8e5-c040a4c11268",
                "destination_uuid": "a5802557-ac4a-43a9-94ba-678ec05d05bb"
              },
              {
                "uuid": "83858930-470c-4ed1-836c-e7df7d5cc314",
                "destination_uuid": "aa39fc00-759e-4a6d-a65a-cd15c63b53e1"
              },
              {
                "uuid": "62506ed9-2ec6-48b4-bbcb-965cefb25b76",
                "destination_uuid": "aa39fc00-759e-4a6d-a65a-cd15c63b53e1"
              },
              {
                "uuid": "7bfb2c7c-b2e2-4b61-9324-20c13135ba49",
                "destination_uuid": "209788f9-d764-413f-923a-578ec06241c5"
              },
              {
                "uuid": "bc9cd21c-054f-4d7a-be12-15aa6334a8b8",
                "destination_uuid": "209788f9-d764-413f-923a-578ec06241c5"
              },
              {
                "uuid": "88d9f375-ced3-43fe-8c2d-9f207acc8dd1",
                "destination_uuid": "c899cea4-28fd-4ca4-ba98-a1be50f6b929"
              },
              {
                "uuid": "40e0004a-3c7c-4467-a3d3-3caa1f584a51",
                "destination_uuid": "c899cea4-28fd-4ca4-ba98-a1be50f6b929"
              },
              {
                "uuid": "b94cb0bf-229c-4e26-9214-3d2570205a4d",
                "destination_uuid": "c8f93651-d9e3-4b07-8c30-23c51e053e27"
              },
              {
                "uuid": "faa49cc1-874e-4a39-91f2-ec954ce582c1",
                "destination_uuid": "c8f93651-d9e3-4b07-8c30-23c51e053e27"
              },
              {
                "uuid": "a5e69337-0c6e-4586-82cf-b42a784044ca",
                "destination_uuid": "d990b78e-c54e-488e-b665-31bfabcae414"
              },
              {
                "uuid": "93de8327-7ade-489c-a9f2-93d5e83a91ce",
                "destination_uuid": "d990b78e-c54e-488e-b665-31bfabcae414"
              },
              {
                "uuid": "8db546ed-4489-438e-9bbf-1d205a5c0ae2",
                "destination_uuid": "45c056f8-347e-46f8-a8ba-7ac69e3fe20e"
              },
              {
                "uuid": "dbab09f9-54c2-46c0-b684-94d35bcdbff1",
                "destination_uuid": "45c056f8-347e-46f8-a8ba-7ac69e3fe20e"
              },
              {
                "uuid": "75572e70-988f-4bba-b16b-d553d850bc23",
                "destination_uuid": "9926aed0-ad12-4338-9846-53f903365b20"
              },
              {
                "uuid": "466d2a67-22ca-4204-8e65-ffaca3c92105",
                "destination_uuid": "9926aed0-ad12-4338-9846-53f903365b20"
              }
            ]
          },
          {
            "uuid": "a5802557-ac4a-43a9-94ba-678ec05d05bb",
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
                "uuid": "732cb026-d453-486f-89c6-dad73521922b"
              }
            ],
            "exits": [
              {
                "uuid": "5b07cac4-cfbb-44d4-9cda-a955a191cece",
                "destination_uuid": "935b9b10-5948-4bc4-8705-4bc8c2b426ec"
              }
            ]
          },
          {
            "uuid": "935b9b10-5948-4bc4-8705-4bc8c2b426ec",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "447b031b-3a23-4d9f-9ac8-c8d4ab5be62b",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "aa4ee92a-a3a9-410b-920e-94a6b3ddc53f",
                  "type": "has_only_phrase",
                  "uuid": "a49ad579-80c1-4a93-9286-218d942f1f2b"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "2f7e32cf-b5eb-4495-b059-78e189a005af",
                  "type": "has_only_phrase",
                  "uuid": "4bb248d0-64f1-4c78-9eeb-3554661cc98c"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "44146189-5850-4d89-8547-ec625472e94e",
                  "type": "has_only_phrase",
                  "uuid": "4ea657d1-30e7-40cb-a883-fc0cc430a9d7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "590e86dc-b9b4-4489-bd93-cbc698c1d1bc",
                  "name": "All Responses",
                  "uuid": "447b031b-3a23-4d9f-9ac8-c8d4ab5be62b"
                },
                {
                  "exit_uuid": "7d1dc5b7-8ef8-4009-8e65-55d95531f113",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "aa4ee92a-a3a9-410b-920e-94a6b3ddc53f"
                },
                {
                  "exit_uuid": "8d5ac5b6-9c76-49e7-8d1d-e6045936ab22",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "2f7e32cf-b5eb-4495-b059-78e189a005af"
                },
                {
                  "exit_uuid": "fe6416ac-2955-45f8-ac9a-74ea0deb415e",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "44146189-5850-4d89-8547-ec625472e94e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "590e86dc-b9b4-4489-bd93-cbc698c1d1bc",
                "destination_uuid": null
              },
              {
                "uuid": "7d1dc5b7-8ef8-4009-8e65-55d95531f113",
                "destination_uuid": "3288a273-78a0-4a30-91b8-89ef8208619f"
              },
              {
                "uuid": "8d5ac5b6-9c76-49e7-8d1d-e6045936ab22",
                "destination_uuid": "22cf263f-4e22-4171-9153-7107f73aa761"
              },
              {
                "uuid": "fe6416ac-2955-45f8-ac9a-74ea0deb415e",
                "destination_uuid": "e4f82101-7a2e-4e55-aa86-5d6ab549b5d8"
              }
            ]
          },
          {
            "uuid": "3288a273-78a0-4a30-91b8-89ef8208619f",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "67a732b9-bd7b-4512-9d25-22765af3d1fe"
              }
            ],
            "exits": [
              {
                "uuid": "6dbd4b2a-a987-4eae-abcd-fd094c282559",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "22cf263f-4e22-4171-9153-7107f73aa761",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f2d415e1-2b4a-48d9-b4da-0510f5025e8f"
              }
            ],
            "exits": [
              {
                "uuid": "654a5b15-0f64-4c8a-86f0-45cdab1366e5",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "e4f82101-7a2e-4e55-aa86-5d6ab549b5d8",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "22019cd7-a885-48a1-b841-6901e4bb758b"
              }
            ],
            "exits": [
              {
                "uuid": "f1d7fa84-9a1a-4c09-b77a-0d7b725522c5",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "aa39fc00-759e-4a6d-a65a-cd15c63b53e1",
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
                "uuid": "db0ef9f2-627c-4e91-96e4-e3ecd7bf11a2"
              }
            ],
            "exits": [
              {
                "uuid": "3f26c9bd-cc9d-40ed-ba25-b92e64142e3a",
                "destination_uuid": "633a6ed1-e269-4a37-8b7f-f14d4960cb88"
              }
            ]
          },
          {
            "uuid": "633a6ed1-e269-4a37-8b7f-f14d4960cb88",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a71eecd7-c7b7-44dd-a805-c69e9ec75808",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "bc24043b-05ed-4e0e-a808-f25c9f797c9b",
                  "type": "has_only_phrase",
                  "uuid": "7fc88d39-e229-4098-a358-26dfec8da8b4"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "531c0468-a19f-430b-970a-9ad2faf2ce5b",
                  "type": "has_only_phrase",
                  "uuid": "1f599f28-5471-4568-84d6-9bd2a6e87cf6"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "992bcc96-1a00-4f9a-a22a-f7e0b7a2048c",
                  "type": "has_only_phrase",
                  "uuid": "b4e2bcf9-4ad4-4338-902d-c607bf3d1b23"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "81b976d2-c5f7-4ff2-8221-8aa13f186edf",
                  "name": "All Responses",
                  "uuid": "a71eecd7-c7b7-44dd-a805-c69e9ec75808"
                },
                {
                  "exit_uuid": "f166030d-8b1b-4406-a0e3-eb24eb80a8a0",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "bc24043b-05ed-4e0e-a808-f25c9f797c9b"
                },
                {
                  "exit_uuid": "0c40e8c3-4bd9-4782-a74b-0f4413589595",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "531c0468-a19f-430b-970a-9ad2faf2ce5b"
                },
                {
                  "exit_uuid": "dc1f3589-6bb2-48df-b50f-5dd136959fe3",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "992bcc96-1a00-4f9a-a22a-f7e0b7a2048c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "81b976d2-c5f7-4ff2-8221-8aa13f186edf",
                "destination_uuid": null
              },
              {
                "uuid": "f166030d-8b1b-4406-a0e3-eb24eb80a8a0",
                "destination_uuid": "533ee6c2-9f8b-4bc9-8687-76e4e023a3d9"
              },
              {
                "uuid": "0c40e8c3-4bd9-4782-a74b-0f4413589595",
                "destination_uuid": "d2247b36-9743-4439-a82b-4ac6792a0125"
              },
              {
                "uuid": "dc1f3589-6bb2-48df-b50f-5dd136959fe3",
                "destination_uuid": "a72579cf-6fe4-437a-8631-8c0500b8f9d3"
              }
            ]
          },
          {
            "uuid": "533ee6c2-9f8b-4bc9-8687-76e4e023a3d9",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "81bbc344-bc0b-4481-9832-b5518d56de31"
              }
            ],
            "exits": [
              {
                "uuid": "9b97a40e-a351-454c-97ff-ae198aecdf58",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "d2247b36-9743-4439-a82b-4ac6792a0125",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8df4b313-f5f3-4d67-a882-d850f6a7e3ad"
              }
            ],
            "exits": [
              {
                "uuid": "9349293a-e9db-4d9f-8a7c-5173f0b3438a",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "a72579cf-6fe4-437a-8631-8c0500b8f9d3",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4a5ff9eb-0871-422a-9ed7-f08514b1f8b4"
              }
            ],
            "exits": [
              {
                "uuid": "4ef92c19-551f-42b7-ad06-80185bc2bede",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "209788f9-d764-413f-923a-578ec06241c5",
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
                "uuid": "f98d724d-2c5b-41e7-8aee-7debe7fa843b"
              }
            ],
            "exits": [
              {
                "uuid": "cca38dc3-5cd9-4bb5-aa2a-d9d387f2377d",
                "destination_uuid": "1ee7538a-131d-4116-81c2-1bc9b505bacf"
              }
            ]
          },
          {
            "uuid": "1ee7538a-131d-4116-81c2-1bc9b505bacf",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fa29b2b4-a7b2-41b9-aeab-0f62e947714c",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "b8f5be7a-4173-48ce-a0c9-defb9f9bef70",
                  "type": "has_only_phrase",
                  "uuid": "6f5afb66-60db-403c-afd6-b90858c1824b"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "0faf64d1-381c-4c80-a873-1754d34eaaf4",
                  "type": "has_only_phrase",
                  "uuid": "d091246c-1e0a-4f20-b929-dbafc1f042a1"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "91855889-2752-4a72-bc10-03f288cb7aa5",
                  "type": "has_only_phrase",
                  "uuid": "afa31220-14e0-4648-9c1c-651de8b7db5a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ba73ccaa-b612-46bd-96ac-b187c07b9ce5",
                  "name": "All Responses",
                  "uuid": "fa29b2b4-a7b2-41b9-aeab-0f62e947714c"
                },
                {
                  "exit_uuid": "67e23fb5-f26e-4cc2-ab67-be8cef77ee96",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "b8f5be7a-4173-48ce-a0c9-defb9f9bef70"
                },
                {
                  "exit_uuid": "54317be1-5ba3-46c6-b680-b03df8be3585",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "0faf64d1-381c-4c80-a873-1754d34eaaf4"
                },
                {
                  "exit_uuid": "b8fb1bdb-39ae-4a87-977b-3d8cc1e1d31a",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "91855889-2752-4a72-bc10-03f288cb7aa5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ba73ccaa-b612-46bd-96ac-b187c07b9ce5",
                "destination_uuid": null
              },
              {
                "uuid": "67e23fb5-f26e-4cc2-ab67-be8cef77ee96",
                "destination_uuid": "cca5b33d-3eb6-4eee-99e4-cb794b009c0e"
              },
              {
                "uuid": "54317be1-5ba3-46c6-b680-b03df8be3585",
                "destination_uuid": "b99e764d-583d-4ffa-a2ba-be64c5f3d432"
              },
              {
                "uuid": "b8fb1bdb-39ae-4a87-977b-3d8cc1e1d31a",
                "destination_uuid": "0d4dea65-4b2e-4730-aff6-b33a10572de1"
              }
            ]
          },
          {
            "uuid": "cca5b33d-3eb6-4eee-99e4-cb794b009c0e",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "09584a85-97bf-425f-8503-7a916f786e44"
              }
            ],
            "exits": [
              {
                "uuid": "00c7cdf9-0c12-4a01-ab14-10aebbd49697",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "b99e764d-583d-4ffa-a2ba-be64c5f3d432",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3008eb25-00d9-43d9-8d32-712757d8a28e"
              }
            ],
            "exits": [
              {
                "uuid": "2ddb01ac-048b-4865-9261-47aa60b0cbc7",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "0d4dea65-4b2e-4730-aff6-b33a10572de1",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b860b8d1-01af-4d6d-a83d-9dc3e0d3e33c"
              }
            ],
            "exits": [
              {
                "uuid": "fbb3dbec-e553-48d9-bba3-4aa37f432602",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "c899cea4-28fd-4ca4-ba98-a1be50f6b929",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "62edd51b-d5a9-4129-b1da-85fce44fff31"
              }
            ],
            "exits": [
              {
                "uuid": "d383a683-25c1-402d-90d4-3930970618f0",
                "destination_uuid": "f30d64c6-0bfa-4f04-8e16-7503edefd7e7"
              }
            ]
          },
          {
            "uuid": "f30d64c6-0bfa-4f04-8e16-7503edefd7e7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4e91a099-262a-4b24-a85b-4c2e3db293f2",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "d48df9c8-e75e-4bff-8df0-c8f4b8bd4b18",
                  "type": "has_only_phrase",
                  "uuid": "2397ddfe-0958-4cd4-9b5e-e2f95acbfb5d"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "1676385d-71b9-4d25-b671-46848ecba9a0",
                  "type": "has_only_phrase",
                  "uuid": "32285375-f4ea-43b2-bb46-ec1bdedd6942"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "46f72bb6-fe98-4f37-9d4d-ec6c4c55363b",
                  "name": "All Responses",
                  "uuid": "4e91a099-262a-4b24-a85b-4c2e3db293f2"
                },
                {
                  "exit_uuid": "1fdad1c0-17d5-467e-bd29-c47e0a3c7173",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "d48df9c8-e75e-4bff-8df0-c8f4b8bd4b18"
                },
                {
                  "exit_uuid": "b7384eaf-c2f2-4e14-8db0-2014c02ca462",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "1676385d-71b9-4d25-b671-46848ecba9a0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "46f72bb6-fe98-4f37-9d4d-ec6c4c55363b",
                "destination_uuid": null
              },
              {
                "uuid": "1fdad1c0-17d5-467e-bd29-c47e0a3c7173",
                "destination_uuid": "a8768de7-c21f-4097-94b2-77ecda0aa9a4"
              },
              {
                "uuid": "b7384eaf-c2f2-4e14-8db0-2014c02ca462",
                "destination_uuid": "1e0367e1-2fb4-4693-a4a2-152f6cce6c48"
              }
            ]
          },
          {
            "uuid": "a8768de7-c21f-4097-94b2-77ecda0aa9a4",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "180afe85-8e70-492a-a234-cd864192b8cf"
              }
            ],
            "exits": [
              {
                "uuid": "d0f454ed-3ea4-4fba-ab23-c674c2a922e3",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "1e0367e1-2fb4-4693-a4a2-152f6cce6c48",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "60445eb2-f917-4df1-8a8a-8f8b82f5bf77"
              }
            ],
            "exits": [
              {
                "uuid": "11491ee0-2b6d-4320-9a9d-d3f3a235aaa6",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "c8f93651-d9e3-4b07-8c30-23c51e053e27",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "95e4fb9a-f955-4f0f-bccb-718a769d7bc8"
              }
            ],
            "exits": [
              {
                "uuid": "a1ea50f5-26ae-4d48-8852-ebf9e2d16626",
                "destination_uuid": "343b3b85-d172-4bc0-8a18-be2804174957"
              }
            ]
          },
          {
            "uuid": "343b3b85-d172-4bc0-8a18-be2804174957",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fae57097-a23d-40a2-b4b0-7b671d1c92ec",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "bc4750c5-964a-449f-bd37-5e19cfcf3aed",
                  "type": "has_only_phrase",
                  "uuid": "1b6db22a-a645-4027-be19-e594cdbd7c02"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "1b9c1b73-b157-404f-bc44-75a8c3de214e",
                  "type": "has_only_phrase",
                  "uuid": "36270a2c-0efe-4c27-8639-d6719dd26eb9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "44701dbc-dc01-4aef-a3a0-85c0e98b164a",
                  "name": "All Responses",
                  "uuid": "fae57097-a23d-40a2-b4b0-7b671d1c92ec"
                },
                {
                  "exit_uuid": "b940f877-60bc-4f89-b63c-d7050e3799db",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "bc4750c5-964a-449f-bd37-5e19cfcf3aed"
                },
                {
                  "exit_uuid": "1c3ec7be-310b-49db-8861-86d3967921ce",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "1b9c1b73-b157-404f-bc44-75a8c3de214e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "44701dbc-dc01-4aef-a3a0-85c0e98b164a",
                "destination_uuid": null
              },
              {
                "uuid": "b940f877-60bc-4f89-b63c-d7050e3799db",
                "destination_uuid": "e238198f-15f8-4b49-aacc-1152753a4b93"
              },
              {
                "uuid": "1c3ec7be-310b-49db-8861-86d3967921ce",
                "destination_uuid": "afb5f142-5f86-4c5c-9620-9948975bb84f"
              }
            ]
          },
          {
            "uuid": "e238198f-15f8-4b49-aacc-1152753a4b93",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8b5c0eba-e00b-4507-9371-bc7e4eb1a0b2"
              }
            ],
            "exits": [
              {
                "uuid": "b7461ec4-1c48-4fc9-b568-2193aa624d64",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "afb5f142-5f86-4c5c-9620-9948975bb84f",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "57f2ebd2-e84c-4948-99ab-4f7fd85108fd"
              }
            ],
            "exits": [
              {
                "uuid": "3e26a12b-36ff-4607-8214-98bf064c5463",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "d990b78e-c54e-488e-b665-31bfabcae414",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "c15142f3-9894-40d9-a323-810a453afa26"
              }
            ],
            "exits": [
              {
                "uuid": "aaf5c854-1509-4919-ba7f-cb590de5bc4a",
                "destination_uuid": "ab19cd8d-bcb2-431d-93e5-1d4b64780ee9"
              }
            ]
          },
          {
            "uuid": "ab19cd8d-bcb2-431d-93e5-1d4b64780ee9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "987641de-20c0-4ef6-a872-d6dfa50dbb00",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "c62ac583-1f26-4f23-9ba4-7b316a4c72e2",
                  "type": "has_only_phrase",
                  "uuid": "5d57e5ae-4061-47e6-a029-8dd8e07bf929"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "0a8c2f34-6978-46e6-80d9-593ad79ff8ac",
                  "type": "has_only_phrase",
                  "uuid": "02920fc6-f1b1-4e48-86a1-6b1265ac469c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "55a6017e-0104-48eb-9339-26035b9939b8",
                  "name": "All Responses",
                  "uuid": "987641de-20c0-4ef6-a872-d6dfa50dbb00"
                },
                {
                  "exit_uuid": "3c5af62f-c222-44a6-9c3c-d43fe562af4b",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "c62ac583-1f26-4f23-9ba4-7b316a4c72e2"
                },
                {
                  "exit_uuid": "6865a57f-a9e3-42da-8682-189f10232bc0",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "0a8c2f34-6978-46e6-80d9-593ad79ff8ac"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "55a6017e-0104-48eb-9339-26035b9939b8",
                "destination_uuid": null
              },
              {
                "uuid": "3c5af62f-c222-44a6-9c3c-d43fe562af4b",
                "destination_uuid": "f54447b9-528d-4025-85d1-d58172ce9f55"
              },
              {
                "uuid": "6865a57f-a9e3-42da-8682-189f10232bc0",
                "destination_uuid": "25af8707-b97f-4fca-9054-4b125f2974de"
              }
            ]
          },
          {
            "uuid": "f54447b9-528d-4025-85d1-d58172ce9f55",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c1b8ffcc-298d-448d-b9a5-71187bca4d19"
              }
            ],
            "exits": [
              {
                "uuid": "2bfc18f1-6ecb-445d-9fef-dfa4e75c396d",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "25af8707-b97f-4fca-9054-4b125f2974de",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "46313ada-16ae-4091-bef6-507f93e14427"
              }
            ],
            "exits": [
              {
                "uuid": "42833bfe-7ae7-4e39-8990-d55f2e76a5c8",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "45c056f8-347e-46f8-a8ba-7ac69e3fe20e",
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
                "uuid": "c0b580ac-4f3b-45cf-a7f6-571bb8414147"
              }
            ],
            "exits": [
              {
                "uuid": "259038da-2bd7-4581-8738-0080bbec1638",
                "destination_uuid": "f63fc94b-79ed-4a3a-9bd7-61fd8e0b546a"
              }
            ]
          },
          {
            "uuid": "f63fc94b-79ed-4a3a-9bd7-61fd8e0b546a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "33f3369d-41f0-47e5-bea6-ccae2f1741a6",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "53139785-1508-48ef-ba59-b825b95b4f10",
                  "type": "has_only_phrase",
                  "uuid": "d43ea849-c5ad-4e08-87fd-81443410cc87"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "83d64562-c018-4b42-b751-94bb21878f01",
                  "type": "has_only_phrase",
                  "uuid": "e6044dd5-6785-49d3-9240-fa5fc966c870"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "d841c65c-9559-4b91-9b21-9acb5182ae85",
                  "type": "has_only_phrase",
                  "uuid": "654e213b-6821-4786-97e7-c6993ec58443"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "74cb487f-90ea-4816-835d-15cedfb3e31d",
                  "name": "All Responses",
                  "uuid": "33f3369d-41f0-47e5-bea6-ccae2f1741a6"
                },
                {
                  "exit_uuid": "0846b211-f7ce-451e-b0ae-49ba1fb6d3bd",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "53139785-1508-48ef-ba59-b825b95b4f10"
                },
                {
                  "exit_uuid": "35a8ecf0-882c-43ba-aebb-21f27504e1b6",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "83d64562-c018-4b42-b751-94bb21878f01"
                },
                {
                  "exit_uuid": "8f8429af-f64e-46da-9457-1375fab43f76",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "d841c65c-9559-4b91-9b21-9acb5182ae85"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "74cb487f-90ea-4816-835d-15cedfb3e31d",
                "destination_uuid": null
              },
              {
                "uuid": "0846b211-f7ce-451e-b0ae-49ba1fb6d3bd",
                "destination_uuid": "d69f06c9-905e-47ed-a4a6-c67560c1fdcc"
              },
              {
                "uuid": "35a8ecf0-882c-43ba-aebb-21f27504e1b6",
                "destination_uuid": "22af3a4f-6dab-49d7-b158-becd904dc44f"
              },
              {
                "uuid": "8f8429af-f64e-46da-9457-1375fab43f76",
                "destination_uuid": "91ea1bcf-dea6-483a-a81e-245b4767bef5"
              }
            ]
          },
          {
            "uuid": "d69f06c9-905e-47ed-a4a6-c67560c1fdcc",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "deb84996-3b30-4049-9a39-10f4b64687a1"
              }
            ],
            "exits": [
              {
                "uuid": "97c86ffe-8e29-4840-8952-a21b6519890e",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "22af3a4f-6dab-49d7-b158-becd904dc44f",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "78885342-0e84-40b3-848f-c51713cdd543"
              }
            ],
            "exits": [
              {
                "uuid": "d1b48e08-80d6-4f36-bebd-fe8cd22edaee",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "91ea1bcf-dea6-483a-a81e-245b4767bef5",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "45f74aa3-9b9b-481f-8fcc-84a55c6963f8"
              }
            ],
            "exits": [
              {
                "uuid": "0e2a4ffc-f9bd-4f4d-91a1-210ff92eec47",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "9926aed0-ad12-4338-9846-53f903365b20",
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
                "uuid": "ab8c03bd-dfc4-41c6-96f2-371961ffc59c"
              }
            ],
            "exits": [
              {
                "uuid": "31d7510d-beb3-4257-86d7-96ec53896d67",
                "destination_uuid": "c0fdd332-fd9c-46a1-87a1-68766f52f908"
              }
            ]
          },
          {
            "uuid": "c0fdd332-fd9c-46a1-87a1-68766f52f908",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bf0eefb4-d84a-41d5-9bd7-7269a9d42321",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "fe35be2c-8d2b-4b63-b5ef-ca65d2858c10",
                  "type": "has_only_phrase",
                  "uuid": "56a7143a-9f4d-489d-8863-ef09a111b5ae"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "0fb5b318-9487-4b2f-a593-bc5615fbbe32",
                  "type": "has_only_phrase",
                  "uuid": "4d33510b-13cf-4da2-b3a4-582419fd0103"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "84974c49-f261-4358-a49b-d010985826cc",
                  "type": "has_only_phrase",
                  "uuid": "6a39d7a3-c8ac-495f-aff9-4acc58c104c8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e8647b57-e609-4a45-a7ac-6c01ea893679",
                  "name": "All Responses",
                  "uuid": "bf0eefb4-d84a-41d5-9bd7-7269a9d42321"
                },
                {
                  "exit_uuid": "c43a1021-ecf3-4a82-817e-d2b4ba403959",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "fe35be2c-8d2b-4b63-b5ef-ca65d2858c10"
                },
                {
                  "exit_uuid": "be49d8ea-c5bd-4df2-b93a-d5f19a7056ab",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "0fb5b318-9487-4b2f-a593-bc5615fbbe32"
                },
                {
                  "exit_uuid": "3e03448e-39b9-4be5-b331-6c965bc18995",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "84974c49-f261-4358-a49b-d010985826cc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e8647b57-e609-4a45-a7ac-6c01ea893679",
                "destination_uuid": null
              },
              {
                "uuid": "c43a1021-ecf3-4a82-817e-d2b4ba403959",
                "destination_uuid": "ca0c99db-b7fb-4adb-abce-c79d6c50ab75"
              },
              {
                "uuid": "be49d8ea-c5bd-4df2-b93a-d5f19a7056ab",
                "destination_uuid": "e671bbb7-169d-4b78-b1bf-ac865a2731e8"
              },
              {
                "uuid": "3e03448e-39b9-4be5-b331-6c965bc18995",
                "destination_uuid": "b679cd91-abd3-47ca-a683-30073b6b3ec1"
              }
            ]
          },
          {
            "uuid": "ca0c99db-b7fb-4adb-abce-c79d6c50ab75",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "68538c7d-7f7f-47c1-9084-e0f1bef14bdf"
              }
            ],
            "exits": [
              {
                "uuid": "9b9576cb-dfcd-4ccf-92bf-4747a6858c90",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "e671bbb7-169d-4b78-b1bf-ac865a2731e8",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f78ae83e-5875-4dec-80a6-5842d6dd970b"
              }
            ],
            "exits": [
              {
                "uuid": "3068d705-08f6-4061-ae91-4c691e7bba32",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "b679cd91-abd3-47ca-a683-30073b6b3ec1",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "73dc2645-b920-4f39-a849-acee4e78c391"
              }
            ],
            "exits": [
              {
                "uuid": "bf17a29d-ad47-46ab-bb5d-dbb70a3dc78f",
                "destination_uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db"
              }
            ]
          },
          {
            "uuid": "721f3297-2d8f-4d35-aa81-b61f0158e9db",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b84a0289-4bee-4b1a-a095-55ed208d4777",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "be2f779f-ab12-424c-bfdc-2e53ca9f7e56",
                  "type": "has_only_phrase",
                  "uuid": "8f32e4ff-ce66-4926-ad11-feded482f265"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d26aa340-25d3-4699-a379-f6287a85fcda",
                  "name": "All Responses",
                  "uuid": "b84a0289-4bee-4b1a-a095-55ed208d4777"
                },
                {
                  "exit_uuid": "82ba68e8-903d-43ea-9cb1-23ca4b66e332",
                  "name": "Next",
                  "uuid": "be2f779f-ab12-424c-bfdc-2e53ca9f7e56"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d26aa340-25d3-4699-a379-f6287a85fcda",
                "destination_uuid": null
              },
              {
                "uuid": "82ba68e8-903d-43ea-9cb1-23ca4b66e332",
                "destination_uuid": "d60b77f9-3ce6-4297-bd61-53271e1e4ebc"
              }
            ]
          },
          {
            "uuid": "d60b77f9-3ce6-4297-bd61-53271e1e4ebc",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "a0786c69-5aa9-484e-bca3-c230904486f6"
              }
            ],
            "exits": [
              {
                "uuid": "4f3fa906-4819-43ed-bcb4-f249bedede21",
                "destination_uuid": "bd05520b-171b-4005-b257-308b0d0b119a"
              }
            ]
          },
          {
            "uuid": "bd05520b-171b-4005-b257-308b0d0b119a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8cf3e229-8ed6-4cfc-b774-27523cc924c5",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "dc101de3-dcc4-4678-9418-53aecac053a8",
                  "type": "has_only_phrase",
                  "uuid": "ecd7afde-6351-4a6e-a1a4-db094199efeb"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "9577d77a-58a1-46a0-a526-bb3f9cc2a049",
                  "type": "has_only_phrase",
                  "uuid": "a09fba47-6dbd-4da4-b3d4-73f38b76a2d9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0ad98fc6-b776-4cac-a312-ca093a4908e1",
                  "name": "All Responses",
                  "uuid": "8cf3e229-8ed6-4cfc-b774-27523cc924c5"
                },
                {
                  "exit_uuid": "1ebf6a13-f3bb-4b0d-a7d5-f80a8427578b",
                  "name": "No",
                  "uuid": "dc101de3-dcc4-4678-9418-53aecac053a8"
                },
                {
                  "exit_uuid": "6f81213c-1fa8-4901-9d0c-add2f0bce99b",
                  "name": "Yes",
                  "uuid": "9577d77a-58a1-46a0-a526-bb3f9cc2a049"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0ad98fc6-b776-4cac-a312-ca093a4908e1",
                "destination_uuid": null
              },
              {
                "uuid": "1ebf6a13-f3bb-4b0d-a7d5-f80a8427578b",
                "destination_uuid": "0056e3ad-ca60-4755-916c-d9ad450989be"
              },
              {
                "uuid": "6f81213c-1fa8-4901-9d0c-add2f0bce99b",
                "destination_uuid": "a96c070b-7955-4a08-b9fe-2956626418b9"
              }
            ]
          },
          {
            "uuid": "0056e3ad-ca60-4755-916c-d9ad450989be",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e33f0eee-d664-4e53-b8c4-1c3352567ec8"
              }
            ],
            "exits": [
              {
                "uuid": "079ffbe1-32f6-4e3d-ba6b-bff01a3cef1a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "a96c070b-7955-4a08-b9fe-2956626418b9",
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
                "uuid": "68883ddb-1bab-42c7-92a0-cba198e2913c"
              }
            ],
            "exits": [
              {
                "uuid": "9e0567f6-bec8-45d0-ab84-c282d29bdc50",
                "destination_uuid": "fc44060f-d6e5-46c6-88ad-a9e1e102e666"
              }
            ]
          },
          {
            "uuid": "fc44060f-d6e5-46c6-88ad-a9e1e102e666",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d8d175a1-bcab-463f-9a5b-b3e9dd7a85f9",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "f39c0ff3-0de2-4da1-acfc-5e7876ece0a6",
                  "type": "has_only_phrase",
                  "uuid": "9e926e1e-ece9-43cd-8bac-465bedbc2ee1"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "9e4bb95e-dd2c-4a25-b56f-2e7c07a23a64",
                  "type": "has_only_phrase",
                  "uuid": "7e69dd0f-cca5-408c-9790-5c6b51fe7b94"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "7ce81c2f-7ee5-4456-b134-f1e3db206dd3",
                  "type": "has_only_phrase",
                  "uuid": "21eff84a-5838-4bf3-8565-235b1ea5cb16"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "40bd28da-7c53-4c63-aa8f-7633d09a0cc4",
                  "type": "has_only_phrase",
                  "uuid": "db05a92d-bdfd-45ec-a50f-966402b15457"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "3e098209-da40-4128-9abb-d26a150f0b5f",
                  "type": "has_only_phrase",
                  "uuid": "f4a9f2ae-0f10-4101-a61d-f2fe356700f8"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "332aa834-b26a-4104-9c30-7a369a3516c9",
                  "type": "has_only_phrase",
                  "uuid": "1673c364-0b54-4773-badc-3893d271b1e6"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "aee4ac0e-4ecb-4f2b-a33f-b3b1de0d213f",
                  "type": "has_only_phrase",
                  "uuid": "b248394f-f927-4e9e-810c-50f6627f3cf7"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "dedcf241-ebce-4c8d-ba79-abf6d25b4f21",
                  "type": "has_only_phrase",
                  "uuid": "ba5400c1-4681-4858-8456-f9d283f0b8a7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "48e7b94d-8067-419f-b271-13764ab88feb",
                  "name": "All Responses",
                  "uuid": "d8d175a1-bcab-463f-9a5b-b3e9dd7a85f9"
                },
                {
                  "exit_uuid": "682532eb-8bb5-4448-8274-6c0fa8c7d34d",
                  "name": "I don’t have enough time",
                  "uuid": "f39c0ff3-0de2-4da1-acfc-5e7876ece0a6"
                },
                {
                  "exit_uuid": "1100fc0d-d075-4fc7-9620-a59b4cdcfda6",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "9e4bb95e-dd2c-4a25-b56f-2e7c07a23a64"
                },
                {
                  "exit_uuid": "60f469b2-f31a-40d1-a2ba-4483b16121d9",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "7ce81c2f-7ee5-4456-b134-f1e3db206dd3"
                },
                {
                  "exit_uuid": "dc747e60-7ba1-49f6-8c48-53854b10407f",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "40bd28da-7c53-4c63-aa8f-7633d09a0cc4"
                },
                {
                  "exit_uuid": "3b625f4e-ee76-4735-b7d2-e5b6dbd3b4e5",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "3e098209-da40-4128-9abb-d26a150f0b5f"
                },
                {
                  "exit_uuid": "280a9f04-2b3c-41c6-9518-d6d0dad3b68c",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "332aa834-b26a-4104-9c30-7a369a3516c9"
                },
                {
                  "exit_uuid": "93e6f505-cc56-4634-8e8e-fda0899e04d9",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "aee4ac0e-4ecb-4f2b-a33f-b3b1de0d213f"
                },
                {
                  "exit_uuid": "3ca95b69-4bec-4e1e-a14e-37c90aba0503",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "dedcf241-ebce-4c8d-ba79-abf6d25b4f21"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "48e7b94d-8067-419f-b271-13764ab88feb",
                "destination_uuid": null
              },
              {
                "uuid": "682532eb-8bb5-4448-8274-6c0fa8c7d34d",
                "destination_uuid": "a5802557-ac4a-43a9-94ba-678ec05d05bb"
              },
              {
                "uuid": "1100fc0d-d075-4fc7-9620-a59b4cdcfda6",
                "destination_uuid": "aa39fc00-759e-4a6d-a65a-cd15c63b53e1"
              },
              {
                "uuid": "60f469b2-f31a-40d1-a2ba-4483b16121d9",
                "destination_uuid": "209788f9-d764-413f-923a-578ec06241c5"
              },
              {
                "uuid": "dc747e60-7ba1-49f6-8c48-53854b10407f",
                "destination_uuid": "c899cea4-28fd-4ca4-ba98-a1be50f6b929"
              },
              {
                "uuid": "3b625f4e-ee76-4735-b7d2-e5b6dbd3b4e5",
                "destination_uuid": "c8f93651-d9e3-4b07-8c30-23c51e053e27"
              },
              {
                "uuid": "280a9f04-2b3c-41c6-9518-d6d0dad3b68c",
                "destination_uuid": "d990b78e-c54e-488e-b665-31bfabcae414"
              },
              {
                "uuid": "93e6f505-cc56-4634-8e8e-fda0899e04d9",
                "destination_uuid": "45c056f8-347e-46f8-a8ba-7ac69e3fe20e"
              },
              {
                "uuid": "3ca95b69-4bec-4e1e-a14e-37c90aba0503",
                "destination_uuid": "9926aed0-ad12-4338-9846-53f903365b20"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f154ec29-0535-464b-85f3-cfc7b7ba02c1",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "39c8113f-3e99-42a2-9e7d-e72a107477c5",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6ceaaea6-a781-4dd2-b9f0-8e97b35994e3"
              }
            ],
            "exits": [
              {
                "uuid": "44806e9c-00f4-4786-989b-79288b89d961",
                "destination_uuid": "7810c554-45c5-4353-8d59-8c68a85dd4b4"
              }
            ]
          },
          {
            "uuid": "7810c554-45c5-4353-8d59-8c68a85dd4b4",
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
                "uuid": "89ea5a4a-41c1-4646-9c9a-8c87c7ac3e48"
              }
            ],
            "exits": [
              {
                "uuid": "f6611b31-da1c-400b-b388-e6cee567dd21",
                "destination_uuid": "dbb1bec7-a472-4751-9fc2-73371938ceab"
              }
            ]
          },
          {
            "uuid": "dbb1bec7-a472-4751-9fc2-73371938ceab",
            "actions": [],
            "exits": [
              {
                "uuid": "9f48a8d1-0897-4406-95ab-a1806315c6be",
                "destination_uuid": "74d503ee-d23f-4066-b5ea-15985040a286"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f6978a9d-bb29-4564-9573-93338098ad51",
              "cases": [],
              "categories": [
                {
                  "uuid": "f6978a9d-bb29-4564-9573-93338098ad51",
                  "name": "All Responses",
                  "exit_uuid": "9f48a8d1-0897-4406-95ab-a1806315c6be"
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
            "uuid": "74d503ee-d23f-4066-b5ea-15985040a286",
            "actions": [
              {
                "uuid": "5cb59401-c3d2-4092-a5bc-cf2403f468e2",
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
                "uuid": "aecfdd64-6740-4751-882f-c2abb4fe065b",
                "destination_uuid": "040195fa-ba68-4c09-9b4f-22859e2c6e35"
              }
            ]
          },
          {
            "uuid": "040195fa-ba68-4c09-9b4f-22859e2c6e35",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4c90ce94-1f5b-462a-aca4-e87f5c30d308"
              }
            ],
            "exits": [
              {
                "uuid": "18902a68-f821-4b05-80c2-6c26886ca419",
                "destination_uuid": "e13ce263-d2d6-4be5-a116-0f65adaf8e2c"
              }
            ]
          },
          {
            "uuid": "e13ce263-d2d6-4be5-a116-0f65adaf8e2c",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9181fdc6-e995-4a40-b67b-374220d0837a"
              }
            ],
            "exits": [
              {
                "uuid": "86254e03-ba9a-4a70-8c29-c02644900c28",
                "destination_uuid": "215342f6-a5f7-4513-85ab-eea7940b0f4e"
              }
            ]
          },
          {
            "uuid": "215342f6-a5f7-4513-85ab-eea7940b0f4e",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1b6d685a-f27c-4ba8-958d-6c59fb3684d9"
              }
            ],
            "exits": [
              {
                "uuid": "4385ba85-6d53-4eb3-8005-d2d4fcd726e7",
                "destination_uuid": "e57f6b9f-de54-4b39-b84d-6c1bf428bcbb"
              }
            ]
          },
          {
            "uuid": "e57f6b9f-de54-4b39-b84d-6c1bf428bcbb",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "5ebae1ab-1fb4-4b53-9053-5139b49e98b6"
              }
            ],
            "exits": [
              {
                "uuid": "ea29bd01-439e-4a13-8f2d-5cb61963e3c6",
                "destination_uuid": "eb6961be-3eea-4f7e-b3b5-118a55c51370"
              }
            ]
          },
          {
            "uuid": "eb6961be-3eea-4f7e-b3b5-118a55c51370",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0d62dd3b-be36-42e3-8b8d-b42e99558c82",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "bd24de81-7f14-4631-bab4-3f10ba63644c",
                  "type": "has_only_phrase",
                  "uuid": "897218ca-260a-43ec-b51a-3199beba87ca"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ee715318-b8af-4c95-9ef0-785f665cd056",
                  "name": "All Responses",
                  "uuid": "0d62dd3b-be36-42e3-8b8d-b42e99558c82"
                },
                {
                  "exit_uuid": "45ca37bb-bfa0-4d9b-bcc5-4a0bd313dfd9",
                  "name": "Let me hear your story",
                  "uuid": "bd24de81-7f14-4631-bab4-3f10ba63644c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ee715318-b8af-4c95-9ef0-785f665cd056",
                "destination_uuid": null
              },
              {
                "uuid": "45ca37bb-bfa0-4d9b-bcc5-4a0bd313dfd9",
                "destination_uuid": "98e25315-6a71-4748-b3bf-5a1bfcd17f39"
              }
            ]
          },
          {
            "uuid": "98e25315-6a71-4748-b3bf-5a1bfcd17f39",
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
                "uuid": "51dec675-94d2-4841-a4eb-b7af8aa5cffd"
              }
            ],
            "exits": [
              {
                "uuid": "ea8e5761-d844-462d-a17e-1892984a61a1",
                "destination_uuid": "a3dcec71-057d-42d0-9aae-3d4384cd7f1c"
              }
            ]
          },
          {
            "uuid": "a3dcec71-057d-42d0-9aae-3d4384cd7f1c",
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
                "uuid": "f4f005db-e9e4-4d1a-be63-748272106e31"
              }
            ],
            "exits": [
              {
                "uuid": "8e6957c0-74e1-46b3-b8fe-412d025ed198",
                "destination_uuid": "d38d5453-e0ec-4427-bfc3-6dbcfcb12802"
              }
            ]
          },
          {
            "uuid": "d38d5453-e0ec-4427-bfc3-6dbcfcb12802",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "736c69eb-31f1-42b7-b111-ee7e63cd9544",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "9fc793e9-7f85-47ce-b55a-245f26c034b4",
                  "type": "has_only_phrase",
                  "uuid": "1f729199-68b7-43c3-895a-0079681afb18"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "3625c1c4-fe9f-4191-a3bf-88439f06a911",
                  "type": "has_only_phrase",
                  "uuid": "919e1f81-9229-42e2-a536-fc9e97e5f02c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "aa4ff0f8-bc2a-4623-af67-3589f9aa47f8",
                  "name": "All Responses",
                  "uuid": "736c69eb-31f1-42b7-b111-ee7e63cd9544"
                },
                {
                  "exit_uuid": "e95a2f03-c05d-424c-b303-7baa16498963",
                  "name": "Previous",
                  "uuid": "9fc793e9-7f85-47ce-b55a-245f26c034b4"
                },
                {
                  "exit_uuid": "f02238b4-7d78-48f5-8233-2f37583815da",
                  "name": "Next",
                  "uuid": "3625c1c4-fe9f-4191-a3bf-88439f06a911"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "aa4ff0f8-bc2a-4623-af67-3589f9aa47f8",
                "destination_uuid": null
              },
              {
                "uuid": "e95a2f03-c05d-424c-b303-7baa16498963",
                "destination_uuid": "98e25315-6a71-4748-b3bf-5a1bfcd17f39"
              },
              {
                "uuid": "f02238b4-7d78-48f5-8233-2f37583815da",
                "destination_uuid": "cd435e08-542c-4a01-b707-94ff6947f0f9"
              }
            ]
          },
          {
            "uuid": "cd435e08-542c-4a01-b707-94ff6947f0f9",
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
                "uuid": "55588850-0040-498c-994a-f415c67a56be"
              }
            ],
            "exits": [
              {
                "uuid": "627b1021-d6ad-4cde-8251-469cc1c762e9",
                "destination_uuid": "9fdfe541-31e0-41b5-bcf2-af0306546d99"
              }
            ]
          },
          {
            "uuid": "9fdfe541-31e0-41b5-bcf2-af0306546d99",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e4326d7d-7bb5-44ab-a64d-52155ba8dbc8",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "b08c8eac-d68d-4b35-97d6-2aefc37af21b",
                  "type": "has_only_phrase",
                  "uuid": "975845a2-f393-477f-9d0f-c38af6da8d8d"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "84fdbee1-0bde-4a9a-bde6-8dfecd6a4e88",
                  "type": "has_only_phrase",
                  "uuid": "be5f1a5d-94ce-4b82-b108-60268568af38"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f422a8c7-83c4-4735-b0b1-385bdf56138d",
                  "name": "All Responses",
                  "uuid": "e4326d7d-7bb5-44ab-a64d-52155ba8dbc8"
                },
                {
                  "exit_uuid": "4c122f49-cc89-4ce8-897e-9b525cc9671a",
                  "name": "Previous",
                  "uuid": "b08c8eac-d68d-4b35-97d6-2aefc37af21b"
                },
                {
                  "exit_uuid": "3cbc9ba9-cce5-4b5c-a63c-96405a3908cc",
                  "name": "Next",
                  "uuid": "84fdbee1-0bde-4a9a-bde6-8dfecd6a4e88"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f422a8c7-83c4-4735-b0b1-385bdf56138d",
                "destination_uuid": null
              },
              {
                "uuid": "4c122f49-cc89-4ce8-897e-9b525cc9671a",
                "destination_uuid": "a3dcec71-057d-42d0-9aae-3d4384cd7f1c"
              },
              {
                "uuid": "3cbc9ba9-cce5-4b5c-a63c-96405a3908cc",
                "destination_uuid": "70e104bb-a216-4035-9755-177744c71257"
              }
            ]
          },
          {
            "uuid": "70e104bb-a216-4035-9755-177744c71257",
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
                "uuid": "76378b08-60b0-436b-8f0e-6dd281f4960a"
              }
            ],
            "exits": [
              {
                "uuid": "d20c1209-de13-488f-8d21-e90a34290232",
                "destination_uuid": "93f315ba-013e-4257-bf94-9ce698192330"
              }
            ]
          },
          {
            "uuid": "93f315ba-013e-4257-bf94-9ce698192330",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ba6d5608-7fae-4303-9741-be28ac0a984d",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "3f4da4d5-5a87-4d0b-a3d4-fd256e8df9d3",
                  "type": "has_only_phrase",
                  "uuid": "4874cd74-b130-4dc2-aa6a-049e7011e089"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "666cf500-607a-4382-86a7-a2a80ebabc89",
                  "type": "has_only_phrase",
                  "uuid": "c4c2d581-967b-4b38-b827-c9271da65209"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "453fc95f-eaf5-4b47-a25a-1f531a9a8b14",
                  "name": "All Responses",
                  "uuid": "ba6d5608-7fae-4303-9741-be28ac0a984d"
                },
                {
                  "exit_uuid": "8f7400e7-0f35-46b5-9590-f2ac2786457b",
                  "name": "Previous",
                  "uuid": "3f4da4d5-5a87-4d0b-a3d4-fd256e8df9d3"
                },
                {
                  "exit_uuid": "7fc6b13c-2a4f-4785-8085-21844bb034e3",
                  "name": "Next",
                  "uuid": "666cf500-607a-4382-86a7-a2a80ebabc89"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "453fc95f-eaf5-4b47-a25a-1f531a9a8b14",
                "destination_uuid": null
              },
              {
                "uuid": "8f7400e7-0f35-46b5-9590-f2ac2786457b",
                "destination_uuid": "cd435e08-542c-4a01-b707-94ff6947f0f9"
              },
              {
                "uuid": "7fc6b13c-2a4f-4785-8085-21844bb034e3",
                "destination_uuid": "fe01ca25-b7cc-4147-8fc5-84e703ecbaa4"
              }
            ]
          },
          {
            "uuid": "fe01ca25-b7cc-4147-8fc5-84e703ecbaa4",
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
                "uuid": "1911e356-b33b-40d8-aa2b-8af00eb3681d"
              }
            ],
            "exits": [
              {
                "uuid": "28834662-ad6a-48ee-8072-a4d07436ba60",
                "destination_uuid": "ac7dd899-622f-49d1-a08f-85f6d4c5e582"
              }
            ]
          },
          {
            "uuid": "ac7dd899-622f-49d1-a08f-85f6d4c5e582",
            "actions": [],
            "exits": [
              {
                "uuid": "133e19e0-7376-4e5c-bd88-431696b5e9d5",
                "destination_uuid": "dbd35176-875c-48f4-aefb-c1d298f47494"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "01ed102e-654d-4bc5-8498-2150fe4934ee",
              "cases": [],
              "categories": [
                {
                  "uuid": "01ed102e-654d-4bc5-8498-2150fe4934ee",
                  "name": "All Responses",
                  "exit_uuid": "133e19e0-7376-4e5c-bd88-431696b5e9d5"
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
            "uuid": "dbd35176-875c-48f4-aefb-c1d298f47494",
            "actions": [
              {
                "uuid": "03060dd7-84f2-46ff-850a-ed33b60e854d",
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
                "uuid": "99bb7576-6d46-4f95-b601-03a57dabb8fd",
                "destination_uuid": "4a3a0cfe-2552-48c8-b772-05b27f8804ec"
              }
            ]
          },
          {
            "uuid": "4a3a0cfe-2552-48c8-b772-05b27f8804ec",
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
                "uuid": "ea2787f0-01de-44d6-b754-9c27c8105cf3"
              }
            ],
            "exits": [
              {
                "uuid": "44f11c72-9714-418c-9ee6-e9d1da1293e7",
                "destination_uuid": "9bf762cf-0266-4f52-811e-465aa4fb34c9"
              }
            ]
          },
          {
            "uuid": "9bf762cf-0266-4f52-811e-465aa4fb34c9",
            "actions": [],
            "exits": [
              {
                "uuid": "506e3f65-238c-4f89-924f-766bc2678db0",
                "destination_uuid": "9f2b8b9b-9015-441e-b12a-be7b917e5f4e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e691b29c-e664-4467-ac99-1cfd24b71ff3",
              "cases": [],
              "categories": [
                {
                  "uuid": "e691b29c-e664-4467-ac99-1cfd24b71ff3",
                  "name": "All Responses",
                  "exit_uuid": "506e3f65-238c-4f89-924f-766bc2678db0"
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
            "uuid": "9f2b8b9b-9015-441e-b12a-be7b917e5f4e",
            "actions": [
              {
                "uuid": "be59a00a-c55f-4fb8-9898-eb7e808c5f1a",
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
                "uuid": "61ed7b86-4fe3-467b-b254-edd1c595785d",
                "destination_uuid": "25b99103-942a-47f1-a144-da28d9c26ed5"
              }
            ]
          },
          {
            "uuid": "25b99103-942a-47f1-a144-da28d9c26ed5",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7c70e684-4a9e-44cf-b8b4-0a248939ace3"
              }
            ],
            "exits": [
              {
                "uuid": "963cd05a-050f-4c58-af58-4ca17b0dde98",
                "destination_uuid": "fee17761-a46c-4c72-9581-d1bf61587f10"
              }
            ]
          },
          {
            "uuid": "fee17761-a46c-4c72-9581-d1bf61587f10",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "d95c3145-37c7-415e-94f0-6e94aaf06bd2"
              }
            ],
            "exits": [
              {
                "uuid": "9da0edc1-c4aa-4c03-b309-890eccac82ee",
                "destination_uuid": "94578ec3-d7ca-442c-b711-e845359a6618"
              }
            ]
          },
          {
            "uuid": "94578ec3-d7ca-442c-b711-e845359a6618",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e38a3132-65b7-4199-85da-fdd568591c69",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "37d973d4-4391-4b92-855a-af6e30e196a3",
                  "type": "has_only_phrase",
                  "uuid": "aa627053-1324-47fe-8e7b-5e6119002da5"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "ee8a09f5-0402-42d2-ab5d-d3b60e9e400b",
                  "type": "has_only_phrase",
                  "uuid": "331a0a2e-f6b6-400e-8458-1f721c6da1fc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "03ef8c97-22c5-4b91-adb2-bf4fb0312cc8",
                  "name": "All Responses",
                  "uuid": "e38a3132-65b7-4199-85da-fdd568591c69"
                },
                {
                  "exit_uuid": "44762297-d3df-4010-b4d2-1563083e70ee",
                  "name": "Take me to Tips",
                  "uuid": "37d973d4-4391-4b92-855a-af6e30e196a3"
                },
                {
                  "exit_uuid": "c4d66010-c212-45e0-a17b-571d694faf3f",
                  "name": "Take me to Homescreen",
                  "uuid": "ee8a09f5-0402-42d2-ab5d-d3b60e9e400b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "03ef8c97-22c5-4b91-adb2-bf4fb0312cc8",
                "destination_uuid": null
              },
              {
                "uuid": "44762297-d3df-4010-b4d2-1563083e70ee",
                "destination_uuid": "c8c70dee-ac2a-4cae-ae59-ab178eebaaa1"
              },
              {
                "uuid": "c4d66010-c212-45e0-a17b-571d694faf3f",
                "destination_uuid": "8340bb73-8232-4cd9-9427-730368a12a25"
              }
            ]
          },
          {
            "uuid": "c8c70dee-ac2a-4cae-ae59-ab178eebaaa1",
            "actions": [
              {
                "uuid": "d5ed6bf4-f208-4f15-bd2a-02e01f95c415",
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
                "uuid": "f30a694a-532b-4d34-883b-035dbdc34d64",
                "destination_uuid": "24a5154d-19e9-4333-8a2c-5cb7c8391526"
              }
            ]
          },
          {
            "uuid": "24a5154d-19e9-4333-8a2c-5cb7c8391526",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "9331ac1b-f206-44d6-8d3d-d74119d7ef22"
                },
                "type": "enter_flow",
                "uuid": "e6d844e7-6ffe-4110-b991-5f5c3196fa03"
              }
            ],
            "exits": [
              {
                "uuid": "74133a94-dd39-41fe-ab38-ae840f41864b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "8340bb73-8232-4cd9-9427-730368a12a25",
            "actions": [
              {
                "uuid": "02c7f066-6074-40df-b46b-50f372ae999a",
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
                "uuid": "b5705b0e-e077-4c17-8a32-5a77821c3b68",
                "destination_uuid": "746961d9-6243-42f1-ac6a-2139bef36e49"
              }
            ]
          },
          {
            "uuid": "746961d9-6243-42f1-ac6a-2139bef36e49",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "48285025-68fe-4053-b908-5e537533f665"
                },
                "type": "enter_flow",
                "uuid": "82801e2e-ee64-43f8-88f6-9605b1009a8f"
              }
            ],
            "exits": [
              {
                "uuid": "d64eaad3-a073-423a-8377-58daec59f36a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "35488666-a1b8-40f9-9edf-4d748a647c88",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3d3d3b9c-6c11-4f75-a959-d05dc2e00436",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "574c4257-8208-4da6-96e4-910aad075ffb"
              }
            ],
            "exits": [
              {
                "uuid": "104c2308-1268-4fca-81ab-ad6cf220e7af",
                "destination_uuid": "ad1350cc-8d5f-4d55-bec5-096b2da3bf3a"
              }
            ]
          },
          {
            "uuid": "ad1350cc-8d5f-4d55-bec5-096b2da3bf3a",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "e1677468-b32d-419d-b242-b4b146ec804a"
              }
            ],
            "exits": [
              {
                "uuid": "d240ae6b-cf3c-4b9b-88df-4c72777893fd",
                "destination_uuid": "acddf475-9a10-4f15-88a7-77481e4a0ce3"
              }
            ]
          },
          {
            "uuid": "acddf475-9a10-4f15-88a7-77481e4a0ce3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ada1e1e1-9e11-4500-a6fc-235e1410a38c",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "edac89f5-6e6d-416d-b917-7158c1e276f2",
                  "type": "has_only_phrase",
                  "uuid": "fcfb73df-0dda-46fa-80b9-adf43d7cbc0e"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "4e94dacb-c5fe-4c46-9563-6d2c77685645",
                  "type": "has_only_phrase",
                  "uuid": "fc0a1471-ef85-461b-92a8-2f4694370a76"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c39973e2-46c1-4e19-8d41-247682f8786c",
                  "name": "All Responses",
                  "uuid": "ada1e1e1-9e11-4500-a6fc-235e1410a38c"
                },
                {
                  "exit_uuid": "69d8ad28-e500-4527-8a7a-80e0624b1761",
                  "name": "Later",
                  "uuid": "edac89f5-6e6d-416d-b917-7158c1e276f2"
                },
                {
                  "exit_uuid": "965a9ff6-65af-47f8-b01d-df14d7504831",
                  "name": "Yes",
                  "uuid": "4e94dacb-c5fe-4c46-9563-6d2c77685645"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c39973e2-46c1-4e19-8d41-247682f8786c",
                "destination_uuid": null
              },
              {
                "uuid": "69d8ad28-e500-4527-8a7a-80e0624b1761",
                "destination_uuid": "29f05273-151e-4fa4-9bdd-d1af6579bc3b"
              },
              {
                "uuid": "965a9ff6-65af-47f8-b01d-df14d7504831",
                "destination_uuid": "3c2266dc-5c7b-4cb9-8d4d-9c21c01a2d68"
              }
            ]
          },
          {
            "uuid": "29f05273-151e-4fa4-9bdd-d1af6579bc3b",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "ecd74f59-f0c4-4f31-be98-95d93bab2057"
                },
                "type": "enter_flow",
                "uuid": "ebd57901-1018-4b4c-827e-d049dd832352"
              }
            ],
            "exits": [
              {
                "uuid": "97904aaf-4f63-4516-8219-11e157fecc15",
                "destination_uuid": null
              },
              {
                "uuid": "0de4234f-404a-40d2-abbd-83ac3a96ee4f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "bb791780-b610-4476-a558-ed7ed7721d8d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4e002272-d742-4941-bdb1-41fe7a9949d9"
                },
                {
                  "uuid": "4b284b44-4637-4340-9720-b40432678891",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "fc9f823e-cfa6-441d-851a-b45167d2fc40"
                }
              ],
              "categories": [
                {
                  "uuid": "4e002272-d742-4941-bdb1-41fe7a9949d9",
                  "name": "Complete",
                  "exit_uuid": "97904aaf-4f63-4516-8219-11e157fecc15"
                },
                {
                  "uuid": "fc9f823e-cfa6-441d-851a-b45167d2fc40",
                  "name": "Expired",
                  "exit_uuid": "0de4234f-404a-40d2-abbd-83ac3a96ee4f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4e002272-d742-4941-bdb1-41fe7a9949d9"
            }
          },
          {
            "uuid": "3c2266dc-5c7b-4cb9-8d4d-9c21c01a2d68",
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
                "uuid": "1fc640b5-601e-4b68-be8a-4c917466ba2a"
              }
            ],
            "exits": [
              {
                "uuid": "9a836e40-15e1-4aad-8a50-da8bbc48b483",
                "destination_uuid": "d7cd3849-2d51-4854-bf55-cc7c59ef8265"
              }
            ]
          },
          {
            "uuid": "d7cd3849-2d51-4854-bf55-cc7c59ef8265",
            "actions": [],
            "exits": [
              {
                "uuid": "4075f77d-0cfa-4b5c-a266-4c35956d2d10",
                "destination_uuid": "bba1cfcc-1961-4507-8c77-aec4e3c98ce4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9820f178-fda3-40f6-8fc0-7b78a9187653",
              "cases": [],
              "categories": [
                {
                  "uuid": "9820f178-fda3-40f6-8fc0-7b78a9187653",
                  "name": "All Responses",
                  "exit_uuid": "4075f77d-0cfa-4b5c-a266-4c35956d2d10"
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
            "uuid": "bba1cfcc-1961-4507-8c77-aec4e3c98ce4",
            "actions": [
              {
                "uuid": "7f448a51-5c18-4c70-b087-29a85ef7e84b",
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
                "uuid": "3d5ea2fa-20ad-4729-9926-e7509a0ae4d4",
                "destination_uuid": "1a4616cf-d7c4-4203-a0e9-ddb9d398c17a"
              }
            ]
          },
          {
            "uuid": "1a4616cf-d7c4-4203-a0e9-ddb9d398c17a",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "a37f4faf-4dc6-4310-a582-56816629b703"
              }
            ],
            "exits": [
              {
                "uuid": "dfc3f36f-56df-43b1-bde7-03ed98c8ee0f",
                "destination_uuid": "9300b21e-43c1-4924-8638-6c288e47694d"
              }
            ]
          },
          {
            "uuid": "9300b21e-43c1-4924-8638-6c288e47694d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5362d76c-15ab-46c8-bb56-a1958eaea53b",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "f402ae8a-095b-4e02-b000-a360f6a0a753",
                  "type": "has_only_phrase",
                  "uuid": "13777889-3f20-49cf-a54a-7e65d765635a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4b42b56c-3f04-405e-ba65-9725cfaab190",
                  "name": "All Responses",
                  "uuid": "5362d76c-15ab-46c8-bb56-a1958eaea53b"
                },
                {
                  "exit_uuid": "4fa14f01-4d6d-4dcb-ae02-3283e9fb2985",
                  "name": "Click here when done",
                  "uuid": "f402ae8a-095b-4e02-b000-a360f6a0a753"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4b42b56c-3f04-405e-ba65-9725cfaab190",
                "destination_uuid": null
              },
              {
                "uuid": "4fa14f01-4d6d-4dcb-ae02-3283e9fb2985",
                "destination_uuid": "5b7e4dcf-f168-4502-8b75-8f529faa8e8b"
              }
            ]
          },
          {
            "uuid": "5b7e4dcf-f168-4502-8b75-8f529faa8e8b",
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
                "uuid": "79d8492a-219d-49e3-aecc-60041fd795cd"
              }
            ],
            "exits": [
              {
                "uuid": "2bb184f0-76dd-489b-bb13-7876932c51df",
                "destination_uuid": "eac71c55-7bd9-4024-b540-6a305c6fda20"
              }
            ]
          },
          {
            "uuid": "eac71c55-7bd9-4024-b540-6a305c6fda20",
            "actions": [],
            "exits": [
              {
                "uuid": "0ad4884a-9648-46bd-80b1-fde75ae577f9",
                "destination_uuid": "dcde1455-b39f-4c96-91a7-336fcf0629d4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "30c92722-2252-4cf4-8651-36d49c5488da",
              "cases": [],
              "categories": [
                {
                  "uuid": "30c92722-2252-4cf4-8651-36d49c5488da",
                  "name": "All Responses",
                  "exit_uuid": "0ad4884a-9648-46bd-80b1-fde75ae577f9"
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
            "uuid": "dcde1455-b39f-4c96-91a7-336fcf0629d4",
            "actions": [
              {
                "uuid": "eb273930-c48b-4b9c-9626-0f603742caee",
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
                "uuid": "2b1145cc-667d-4124-84ae-a474b989f4c9",
                "destination_uuid": "63c5b355-14b3-413e-9ae2-cb8a7f75c407"
              }
            ]
          },
          {
            "uuid": "63c5b355-14b3-413e-9ae2-cb8a7f75c407",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "ce8cf251-c7ee-4c55-9f64-77b398b2bab9"
              }
            ],
            "exits": [
              {
                "uuid": "a6a5da25-2f54-4b18-b00c-0ea0786d85c0",
                "destination_uuid": "68fb2894-f249-4181-8e59-0b2c27883a5d"
              }
            ]
          },
          {
            "uuid": "68fb2894-f249-4181-8e59-0b2c27883a5d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fa41f5e9-6d5a-4e25-a836-c236354ae53d",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "46be1357-6e23-4f85-b8ba-99974d94faf6",
                  "type": "has_only_phrase",
                  "uuid": "11b1bff2-ba55-4b15-a5c9-335b24127239"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cc822ce7-67fe-483a-b498-f004dced6d53",
                  "name": "All Responses",
                  "uuid": "fa41f5e9-6d5a-4e25-a836-c236354ae53d"
                },
                {
                  "exit_uuid": "e22dffd2-a79c-4d1b-ab4f-69712f8d6d32",
                  "name": "Click here when done",
                  "uuid": "46be1357-6e23-4f85-b8ba-99974d94faf6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cc822ce7-67fe-483a-b498-f004dced6d53",
                "destination_uuid": null
              },
              {
                "uuid": "e22dffd2-a79c-4d1b-ab4f-69712f8d6d32",
                "destination_uuid": "39291cd6-8d2c-43d2-9ce9-af48e1cc7a34"
              }
            ]
          },
          {
            "uuid": "39291cd6-8d2c-43d2-9ce9-af48e1cc7a34",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "695fa39d-8435-446a-8890-29ab59237b84"
              }
            ],
            "exits": [
              {
                "uuid": "ec8bbe45-152b-4617-9d47-7f39fe420ea8",
                "destination_uuid": "72039af5-2895-4050-bd02-4b292faf64dc"
              }
            ]
          },
          {
            "uuid": "72039af5-2895-4050-bd02-4b292faf64dc",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3639a9ad-f7d3-4372-ac98-3d0c3274139c"
              }
            ],
            "exits": [
              {
                "uuid": "fdf8c954-7dd8-4901-ac11-b353d5d8b8b2",
                "destination_uuid": "f27674f6-9fce-4148-8d64-3951f1b4f01d"
              }
            ]
          },
          {
            "uuid": "f27674f6-9fce-4148-8d64-3951f1b4f01d",
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
                "uuid": "f79e25ff-f028-4efb-9ef6-77189e1f10e4"
              }
            ],
            "exits": [
              {
                "uuid": "75836d9c-a306-49d2-9a42-1578e17131fa",
                "destination_uuid": "e3b9ce0d-c5ac-43ef-8344-61b26ba91be0"
              }
            ]
          },
          {
            "uuid": "e3b9ce0d-c5ac-43ef-8344-61b26ba91be0",
            "actions": [],
            "exits": [
              {
                "uuid": "324e744d-d5ac-41f2-a812-257e56b0a3bb",
                "destination_uuid": "9479287b-b14d-4e6f-8740-728eb3d0f770"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7af9eee6-2ec6-4d17-9642-81a394cce497",
              "cases": [],
              "categories": [
                {
                  "uuid": "7af9eee6-2ec6-4d17-9642-81a394cce497",
                  "name": "All Responses",
                  "exit_uuid": "324e744d-d5ac-41f2-a812-257e56b0a3bb"
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
            "uuid": "9479287b-b14d-4e6f-8740-728eb3d0f770",
            "actions": [
              {
                "uuid": "dab9a570-fc7d-4bb2-99f3-2035b8bdb2ce",
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
                "uuid": "916c760e-cc8c-4f8f-97ac-c4facead6ede",
                "destination_uuid": "921d66fd-4813-490d-aaac-337b9ea26986"
              }
            ]
          },
          {
            "uuid": "921d66fd-4813-490d-aaac-337b9ea26986",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "6b21e510-afac-4a05-a1a2-b88f8466b0d6"
              }
            ],
            "exits": [
              {
                "uuid": "77436f4a-5735-4de7-bebc-ae770810ffda",
                "destination_uuid": "1d30fad4-d72e-4a82-a282-59e564e4bb4e"
              }
            ]
          },
          {
            "uuid": "1d30fad4-d72e-4a82-a282-59e564e4bb4e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "40b80653-165b-4fc1-99f5-7e24b5d358d5",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "a014215d-8fac-4593-a9a7-737b78b2f5f9",
                  "type": "has_only_phrase",
                  "uuid": "24495cf5-d2ac-4556-912c-4d06c55c86a4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "24e64b27-7276-4375-b42b-f17036eca98d",
                  "name": "All Responses",
                  "uuid": "40b80653-165b-4fc1-99f5-7e24b5d358d5"
                },
                {
                  "exit_uuid": "d3fed611-329d-4472-9b5c-c25119025bc8",
                  "name": "Take me to Homescreen",
                  "uuid": "a014215d-8fac-4593-a9a7-737b78b2f5f9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "24e64b27-7276-4375-b42b-f17036eca98d",
                "destination_uuid": null
              },
              {
                "uuid": "d3fed611-329d-4472-9b5c-c25119025bc8",
                "destination_uuid": "8ae38997-20ab-4690-a913-6c05aa5782db"
              }
            ]
          },
          {
            "uuid": "8ae38997-20ab-4690-a913-6c05aa5782db",
            "actions": [
              {
                "uuid": "0cda3830-a28b-4f74-bc24-083370a76a65",
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
                "uuid": "72e42ab9-65f8-4612-8a05-b1a6a4b8ddff",
                "destination_uuid": "a2a68585-bd45-41c3-939c-a51ce69e279b"
              }
            ]
          },
          {
            "uuid": "a2a68585-bd45-41c3-939c-a51ce69e279b",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "b5311ff9-28d9-49c4-acfc-6bd86225391e"
                },
                "type": "enter_flow",
                "uuid": "bdf2b041-0922-4993-b0fe-4aa493e5ad9b"
              }
            ],
            "exits": [
              {
                "uuid": "dc2de85a-f671-4684-8196-baac89f1ea2e",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c11002ca-42a8-4995-af91-e5425832c99b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d06d0b9c-dded-4106-a523-c3c54cc56f61",
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
                "uuid": "4db89347-962c-4fdf-b2dc-384062cc3a70"
              }
            ],
            "exits": [
              {
                "uuid": "eaf0c5ad-78f9-4f6b-b60c-327481ac87cb",
                "destination_uuid": "7650e03d-ccc4-4002-9a17-6018137be095"
              }
            ]
          },
          {
            "uuid": "7650e03d-ccc4-4002-9a17-6018137be095",
            "actions": [],
            "exits": [
              {
                "uuid": "5350456b-a13d-4d49-bb10-43634f3dc2ec",
                "destination_uuid": "2a0a49d5-9618-4ac0-96f2-84f149a5a64c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a2542885-4e81-4a5c-8f2a-a9ed03fadf2d",
              "cases": [],
              "categories": [
                {
                  "uuid": "a2542885-4e81-4a5c-8f2a-a9ed03fadf2d",
                  "name": "All Responses",
                  "exit_uuid": "5350456b-a13d-4d49-bb10-43634f3dc2ec"
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
            "uuid": "2a0a49d5-9618-4ac0-96f2-84f149a5a64c",
            "actions": [
              {
                "uuid": "f440d3a1-0148-4f30-b6eb-1b3808cf9a9a",
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
                "uuid": "ae380daf-77fe-4feb-83bc-7fb5a8361c90",
                "destination_uuid": "d35b8402-e95f-431b-ae45-a55b82d6b7f0"
              }
            ]
          },
          {
            "uuid": "d35b8402-e95f-431b-ae45-a55b82d6b7f0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a137c208-fce4-42af-9f62-c5d8114b3afa",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "7a823a7e-5ca6-431f-b805-f981b6bf130f",
                  "type": "has_only_phrase",
                  "uuid": "f871c9d2-f1ef-43a4-9948-1dc11accff50"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "66c90728-a42c-482e-a32d-b48c147e8067",
                  "type": "has_only_phrase",
                  "uuid": "5be732d3-3317-4253-bc1d-fd0852591237"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "66c90728-a42c-482e-a32d-b48c147e8067",
                  "type": "has_only_phrase",
                  "uuid": "3c83a097-380a-4391-8618-dd6d27b442ab"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f0257727-75a5-4113-bd10-7ad672aa40d5",
                  "name": "All Responses",
                  "uuid": "a137c208-fce4-42af-9f62-c5d8114b3afa"
                },
                {
                  "exit_uuid": "80a2f285-9284-4d46-b963-41b990896435",
                  "name": "Great",
                  "uuid": "7a823a7e-5ca6-431f-b805-f981b6bf130f"
                },
                {
                  "exit_uuid": "5130b29a-6af2-42ad-a01b-3644ab43ef79",
                  "name": "Neutral; Bad",
                  "uuid": "66c90728-a42c-482e-a32d-b48c147e8067"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "f0257727-75a5-4113-bd10-7ad672aa40d5",
                "destination_uuid": null
              },
              {
                "uuid": "80a2f285-9284-4d46-b963-41b990896435",
                "destination_uuid": "bfb5fd8a-ff70-44c1-a36c-47431e7d87d7"
              },
              {
                "uuid": "5130b29a-6af2-42ad-a01b-3644ab43ef79",
                "destination_uuid": "4a888593-1f2a-49c0-8026-1dcb98b8f81d"
              }
            ]
          },
          {
            "uuid": "bfb5fd8a-ff70-44c1-a36c-47431e7d87d7",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "3cd961b2-f4e7-4d5e-a022-c3a560c42c01"
              }
            ],
            "exits": [
              {
                "uuid": "51a73082-0c2b-4e90-b790-3cc21bb2001a",
                "destination_uuid": "61dc4d25-61ef-4d25-be53-7996a3c28fca"
              }
            ]
          },
          {
            "uuid": "4a888593-1f2a-49c0-8026-1dcb98b8f81d",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "ce111deb-161a-4b99-8a95-9bfac27402eb"
              }
            ],
            "exits": [
              {
                "uuid": "a8af6ec3-d4e9-4ae7-abc3-5e04b45f511b",
                "destination_uuid": "5cad95f8-2f68-4988-b017-9b22b2568a26"
              }
            ]
          },
          {
            "uuid": "5cad95f8-2f68-4988-b017-9b22b2568a26",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "de7129cb-e9d5-41d4-b26d-fc08a59610d0",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "7fd2068f-da0d-4e65-bbff-0d5c9e4a5c3c",
                  "type": "has_only_phrase",
                  "uuid": "745d926f-ee00-453b-bfa8-72f133740239"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "77f049d2-1fc1-4f0b-af66-8b5c22baf320",
                  "type": "has_only_phrase",
                  "uuid": "03a070b9-e316-4921-9d8a-e4af893e0239"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3adf7863-9328-4f88-b281-12664a635eb2",
                  "name": "All Responses",
                  "uuid": "de7129cb-e9d5-41d4-b26d-fc08a59610d0"
                },
                {
                  "exit_uuid": "ddcf20d4-c09b-41f1-813a-55385cc86f00",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "7fd2068f-da0d-4e65-bbff-0d5c9e4a5c3c"
                },
                {
                  "exit_uuid": "071fe7bb-89b8-4ccf-b995-fc44190f1849",
                  "name": "Continue",
                  "uuid": "77f049d2-1fc1-4f0b-af66-8b5c22baf320"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3adf7863-9328-4f88-b281-12664a635eb2",
                "destination_uuid": null
              },
              {
                "uuid": "ddcf20d4-c09b-41f1-813a-55385cc86f00",
                "destination_uuid": "64d2fe72-39b0-460f-bed9-0fe350c4aa05"
              },
              {
                "uuid": "071fe7bb-89b8-4ccf-b995-fc44190f1849",
                "destination_uuid": "237e2931-de63-4292-9121-164a20693d96"
              }
            ]
          },
          {
            "uuid": "64d2fe72-39b0-460f-bed9-0fe350c4aa05",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "17aa1e85-0e8d-4a9c-9ad3-85229a592ab3"
                },
                "type": "enter_flow",
                "uuid": "187ab698-5e66-44d9-b03c-3f58f6f55210"
              }
            ],
            "exits": [
              {
                "uuid": "7185a010-0cef-4c51-bfd4-0522b7bd24f1",
                "destination_uuid": "9e244212-e583-4104-97f4-38b91c1b9e13"
              },
              {
                "uuid": "5509f128-92be-4184-b8f5-3441c5500d7e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "930be3d3-ad75-42ea-bfe1-c4a4d4106a89",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "eca53a96-74ce-4f40-818f-930656560797"
                },
                {
                  "uuid": "ede0fc70-1779-4bad-abab-74376f6646bc",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "4826b2c2-5093-4e1e-97da-f679d5c40f36"
                }
              ],
              "categories": [
                {
                  "uuid": "eca53a96-74ce-4f40-818f-930656560797",
                  "name": "Complete",
                  "exit_uuid": "7185a010-0cef-4c51-bfd4-0522b7bd24f1"
                },
                {
                  "uuid": "4826b2c2-5093-4e1e-97da-f679d5c40f36",
                  "name": "Expired",
                  "exit_uuid": "5509f128-92be-4184-b8f5-3441c5500d7e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "eca53a96-74ce-4f40-818f-930656560797"
            }
          },
          {
            "uuid": "61dc4d25-61ef-4d25-be53-7996a3c28fca",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fff3f5e6-94e8-4189-8dd0-8c7a6e4b151b",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "d2bc263c-9695-4cbc-9b9e-7fd4a3514413",
                  "type": "has_only_phrase",
                  "uuid": "3beacb88-489d-413b-8d26-207d0c92b277"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "86f5d397-9d57-43b6-9e4f-242933f30efb",
                  "name": "All Responses",
                  "uuid": "fff3f5e6-94e8-4189-8dd0-8c7a6e4b151b"
                },
                {
                  "exit_uuid": "a3018e18-7e0c-4004-91cb-a5271d113917",
                  "name": "Go to Praise check-in",
                  "uuid": "d2bc263c-9695-4cbc-9b9e-7fd4a3514413"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "86f5d397-9d57-43b6-9e4f-242933f30efb",
                "destination_uuid": null
              },
              {
                "uuid": "a3018e18-7e0c-4004-91cb-a5271d113917",
                "destination_uuid": "99991f2d-8ffc-4c25-b201-76496b206b0e"
              }
            ]
          },
          {
            "uuid": "99991f2d-8ffc-4c25-b201-76496b206b0e",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "0445ce0a-d48a-43a2-9efe-10b2beb15450"
              }
            ],
            "exits": [
              {
                "uuid": "67ac720c-a4bb-4c47-b452-effc5edf7ed6",
                "destination_uuid": "7c9178e0-8fce-4b4a-aa38-5b8417ca31f8"
              }
            ]
          },
          {
            "uuid": "237e2931-de63-4292-9121-164a20693d96",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "baca9de9-b263-47b2-844d-a28e924ea6ed"
              }
            ],
            "exits": [
              {
                "uuid": "7a0388cd-bed5-412d-a2a7-1a4f329326f7",
                "destination_uuid": "7c9178e0-8fce-4b4a-aa38-5b8417ca31f8"
              }
            ]
          },
          {
            "uuid": "9e244212-e583-4104-97f4-38b91c1b9e13",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "94e14b45-a0e2-4510-a8dd-9c9b55be4875"
              }
            ],
            "exits": [
              {
                "uuid": "d5b985b5-a03d-4b25-9e6e-5f5a3da35664",
                "destination_uuid": "7c9178e0-8fce-4b4a-aa38-5b8417ca31f8"
              }
            ]
          },
          {
            "uuid": "7c9178e0-8fce-4b4a-aa38-5b8417ca31f8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ad7aea39-b149-4699-81ab-e867ff64b1cd",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "eb4e85c4-fa47-4f93-b869-978059d3b6e9",
                  "type": "has_only_phrase",
                  "uuid": "d9ac5c51-a605-4c00-9577-2eefe64da67f"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "a39dec58-a5f5-41ef-bf00-68a7878117b3",
                  "type": "has_only_phrase",
                  "uuid": "fa6bf18e-9233-4a9c-8bb3-ace3ce793e05"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "a0de9762-7e89-48e7-85e0-27c90107ea70",
                  "type": "has_only_phrase",
                  "uuid": "e045b4be-eca4-4f04-8588-8b404bef4bc7"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "41b50837-b596-429b-b3af-4fe5a0512be9",
                  "type": "has_only_phrase",
                  "uuid": "3b8ea037-8545-4437-be22-60cd9653da44"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c55b43a7-7554-4b0d-a02c-b063d8f6d567",
                  "name": "All Responses",
                  "uuid": "ad7aea39-b149-4699-81ab-e867ff64b1cd"
                },
                {
                  "exit_uuid": "77df033a-b4df-4834-b875-20ab86dddda4",
                  "name": "No",
                  "uuid": "eb4e85c4-fa47-4f93-b869-978059d3b6e9"
                },
                {
                  "exit_uuid": "f4c38d3a-83ee-4ea2-b074-0f7ef07d324f",
                  "name": "Yes",
                  "uuid": "a39dec58-a5f5-41ef-bf00-68a7878117b3"
                },
                {
                  "exit_uuid": "0d70637c-2b8d-4f23-bc66-0d21203a10b3",
                  "name": "Yes",
                  "uuid": "a0de9762-7e89-48e7-85e0-27c90107ea70"
                },
                {
                  "exit_uuid": "2c14b4ef-ab39-4890-817a-10632d3855da",
                  "name": "Yes",
                  "uuid": "41b50837-b596-429b-b3af-4fe5a0512be9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c55b43a7-7554-4b0d-a02c-b063d8f6d567",
                "destination_uuid": null
              },
              {
                "uuid": "77df033a-b4df-4834-b875-20ab86dddda4",
                "destination_uuid": "98539af9-3f60-4f8a-b63f-379e1488ba0d"
              },
              {
                "uuid": "f4c38d3a-83ee-4ea2-b074-0f7ef07d324f",
                "destination_uuid": "e000f483-f1e8-42dc-bbbf-53f52f5f61e9"
              },
              {
                "uuid": "0d70637c-2b8d-4f23-bc66-0d21203a10b3",
                "destination_uuid": "e000f483-f1e8-42dc-bbbf-53f52f5f61e9"
              },
              {
                "uuid": "2c14b4ef-ab39-4890-817a-10632d3855da",
                "destination_uuid": "e000f483-f1e8-42dc-bbbf-53f52f5f61e9"
              }
            ]
          },
          {
            "uuid": "98539af9-3f60-4f8a-b63f-379e1488ba0d",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "05dc13ae-ff49-4929-ae91-c5677521afa0"
              }
            ],
            "exits": [
              {
                "uuid": "13390f5a-63ee-444b-85d8-2816829dd8b9",
                "destination_uuid": "19923680-8db3-49f1-a39a-bffa380b7cc0"
              }
            ]
          },
          {
            "uuid": "e000f483-f1e8-42dc-bbbf-53f52f5f61e9",
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
                "uuid": "5d9d302a-aa3e-4322-8ec2-819c7c845f41"
              }
            ],
            "exits": [
              {
                "uuid": "4a26aa79-8939-4737-8401-bc09f3646a75",
                "destination_uuid": "72dfdfe3-54f9-4c81-ad1b-a55c01b0025c"
              }
            ]
          },
          {
            "uuid": "72dfdfe3-54f9-4c81-ad1b-a55c01b0025c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6c12f319-2834-4cc7-93c9-d04e9df4dd9c",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "eaef6fad-8267-47ac-9efb-b843d4a23866",
                  "type": "has_only_phrase",
                  "uuid": "a94658d6-17cf-44cb-9f7c-fd096242986d"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "4db5fb3b-1cfa-4f85-8b5d-67752c16fde9",
                  "type": "has_only_phrase",
                  "uuid": "d306cb89-5810-4be0-96fb-3f133653c15f"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "c153003b-97dd-49aa-9648-117c4e91af94",
                  "type": "has_only_phrase",
                  "uuid": "0007fd88-1c92-4f08-9e77-8d5fba863318"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "81d3cc85-2dfb-4082-b8a1-efe1a1915a72",
                  "type": "has_only_phrase",
                  "uuid": "8376bbf8-f5bd-4a3a-8a6c-ae3a5aeabe1d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d9993516-8792-49ca-af8e-2f9442e1b8d3",
                  "name": "All Responses",
                  "uuid": "6c12f319-2834-4cc7-93c9-d04e9df4dd9c"
                },
                {
                  "exit_uuid": "8d66cf39-0f29-4113-993c-fdb357733184",
                  "name": "Surprised",
                  "uuid": "eaef6fad-8267-47ac-9efb-b843d4a23866"
                },
                {
                  "exit_uuid": "13f01932-8698-4b3a-a65b-eda7a3b2e9c9",
                  "name": "Happy",
                  "uuid": "4db5fb3b-1cfa-4f85-8b5d-67752c16fde9"
                },
                {
                  "exit_uuid": "38bb2e3f-d562-4d86-9b88-0684668d32d7",
                  "name": "My teen did not like it",
                  "uuid": "c153003b-97dd-49aa-9648-117c4e91af94"
                },
                {
                  "exit_uuid": "2b1429c5-1eea-47e3-a158-762cdc66580c",
                  "name": "I don’t know",
                  "uuid": "81d3cc85-2dfb-4082-b8a1-efe1a1915a72"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d9993516-8792-49ca-af8e-2f9442e1b8d3",
                "destination_uuid": null
              },
              {
                "uuid": "8d66cf39-0f29-4113-993c-fdb357733184",
                "destination_uuid": "65af53b3-4728-4f3a-bba7-daf1b7996d3d"
              },
              {
                "uuid": "13f01932-8698-4b3a-a65b-eda7a3b2e9c9",
                "destination_uuid": "477705a4-5af9-49bc-9d72-d314ac03ab97"
              },
              {
                "uuid": "38bb2e3f-d562-4d86-9b88-0684668d32d7",
                "destination_uuid": "59a68f1c-6eff-4be0-af0d-b8a359a259d6"
              },
              {
                "uuid": "2b1429c5-1eea-47e3-a158-762cdc66580c",
                "destination_uuid": "86e9298a-fcfa-47b4-9678-cd0d0bd46190"
              }
            ]
          },
          {
            "uuid": "65af53b3-4728-4f3a-bba7-daf1b7996d3d",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ff046521-c27d-4e1f-968e-5d7539d49ea3"
              }
            ],
            "exits": [
              {
                "uuid": "bf51e057-c3b9-4710-9265-2e272226b202",
                "destination_uuid": "5816cd14-0afe-4799-a395-ae121bec3a92"
              }
            ]
          },
          {
            "uuid": "477705a4-5af9-49bc-9d72-d314ac03ab97",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4646b1dd-39ca-4bc9-89fe-0c19a9dc6464"
              }
            ],
            "exits": [
              {
                "uuid": "e8e3d1fc-97eb-4dff-a709-8f547109a11b",
                "destination_uuid": "5816cd14-0afe-4799-a395-ae121bec3a92"
              }
            ]
          },
          {
            "uuid": "59a68f1c-6eff-4be0-af0d-b8a359a259d6",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0f2ecfc6-2a30-47a3-898c-8a1af7b735aa"
              }
            ],
            "exits": [
              {
                "uuid": "731445c0-3ad1-4b03-9d6d-5c11a96891c1",
                "destination_uuid": "5816cd14-0afe-4799-a395-ae121bec3a92"
              }
            ]
          },
          {
            "uuid": "86e9298a-fcfa-47b4-9678-cd0d0bd46190",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0c7e6641-750e-440c-bc29-0656444bf100"
              }
            ],
            "exits": [
              {
                "uuid": "6e330412-4635-45f5-a083-21e3992de364",
                "destination_uuid": "5816cd14-0afe-4799-a395-ae121bec3a92"
              }
            ]
          },
          {
            "uuid": "5816cd14-0afe-4799-a395-ae121bec3a92",
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
                "uuid": "e775e0aa-227d-4788-b9cb-89e3ff71f433"
              }
            ],
            "exits": [
              {
                "uuid": "0ad599e8-9721-4ee2-bf3a-2d548372a36b",
                "destination_uuid": "0803b6ce-7a65-4ecc-a270-905b2cf5447c"
              }
            ]
          },
          {
            "uuid": "0803b6ce-7a65-4ecc-a270-905b2cf5447c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7c17835b-2358-4c15-94be-cc6e2dc3b883",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "d531d96c-890e-447e-be1d-0a7c8f49021e",
                  "type": "has_only_phrase",
                  "uuid": "c3661b95-09bf-48d6-88ad-f0b597916b4b"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "d531d96c-890e-447e-be1d-0a7c8f49021e",
                  "type": "has_only_phrase",
                  "uuid": "e4f5d37c-4ec3-4aab-a6cd-273e8b702d75"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "b0d6292a-b20e-44e1-b341-f6b83f4c1136",
                  "type": "has_only_phrase",
                  "uuid": "285bea17-99b1-4847-a244-08d2e7f717bd"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "b0d6292a-b20e-44e1-b341-f6b83f4c1136",
                  "type": "has_only_phrase",
                  "uuid": "0964f5e3-bd62-499f-a18c-075fd12f8f8d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c1afe634-e1e3-445c-8a33-a5c2ae2a77ee",
                  "name": "All Responses",
                  "uuid": "7c17835b-2358-4c15-94be-cc6e2dc3b883"
                },
                {
                  "exit_uuid": "f62a6460-d96b-457f-be03-7e0954a0e333",
                  "name": "Every day; Almost every day",
                  "uuid": "d531d96c-890e-447e-be1d-0a7c8f49021e"
                },
                {
                  "exit_uuid": "39f93bd8-7904-428b-a203-b77a25f9e78b",
                  "name": "A few days; Never",
                  "uuid": "b0d6292a-b20e-44e1-b341-f6b83f4c1136"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c1afe634-e1e3-445c-8a33-a5c2ae2a77ee",
                "destination_uuid": null
              },
              {
                "uuid": "f62a6460-d96b-457f-be03-7e0954a0e333",
                "destination_uuid": "08bd236e-da17-4414-8447-558979da356d"
              },
              {
                "uuid": "39f93bd8-7904-428b-a203-b77a25f9e78b",
                "destination_uuid": "c8cd5355-977f-478f-8ef4-5cff797192cf"
              }
            ]
          },
          {
            "uuid": "08bd236e-da17-4414-8447-558979da356d",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1dcad54c-e825-4d60-851f-0766b9db7585"
              }
            ],
            "exits": [
              {
                "uuid": "641f764b-3e30-410c-976d-612d4e4071a3",
                "destination_uuid": "19923680-8db3-49f1-a39a-bffa380b7cc0"
              }
            ]
          },
          {
            "uuid": "c8cd5355-977f-478f-8ef4-5cff797192cf",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "be5f7f91-1a80-4af6-a218-a0843670f935"
              }
            ],
            "exits": [
              {
                "uuid": "14d55f36-7296-46a3-8ab7-469879aafe2e",
                "destination_uuid": "19923680-8db3-49f1-a39a-bffa380b7cc0"
              }
            ]
          },
          {
            "uuid": "19923680-8db3-49f1-a39a-bffa380b7cc0",
            "actions": [
              {
                "uuid": "2afb8d6d-75ed-477d-bc3c-ee57736fd8b2",
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
                "uuid": "dad4b690-3b16-416a-b04f-d2e57a62564c",
                "destination_uuid": "a9c1965b-86ce-4f6d-a745-b32a5961ec83"
              }
            ]
          },
          {
            "uuid": "a9c1965b-86ce-4f6d-a745-b32a5961ec83",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "7659bed6-e41d-467c-ab48-4c9e8b875a88"
                },
                "type": "enter_flow",
                "uuid": "ac341125-b2cb-402f-9fc5-84ffb6c34c6e"
              }
            ],
            "exits": [
              {
                "uuid": "9934a564-e5e0-4628-971e-7ba4cd4729e7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "36fb15b8-1e31-413d-bc63-e3d5bda7bb50",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c9196a29-faee-43b5-8cde-8dc7cc9fc73a",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6c5eff60-ce6f-428d-a519-46ba2022453e"
              }
            ],
            "exits": [
              {
                "uuid": "9d9a5e16-2467-455a-8501-d27e0f0adfba",
                "destination_uuid": "0bcdbc1d-22ee-4ec7-870f-8eccd07de3c5"
              }
            ]
          },
          {
            "uuid": "0bcdbc1d-22ee-4ec7-870f-8eccd07de3c5",
            "actions": [
              {
                "uuid": "996e8cde-1b91-4732-bf19-3df20fc237c5",
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
                "uuid": "3560d575-8fb4-4e5f-b30c-9f1b48513d75",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "27d3d4db-f290-459c-8618-6e3eacd84907",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "19d20e7d-db14-41dc-b761-46c48599a35c",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "811571fa-2661-4d8c-8974-e0523973d4e8"
              }
            ],
            "exits": [
              {
                "uuid": "867033a7-2bb9-4183-95db-efde8534ab1f",
                "destination_uuid": "24303272-cd67-4146-87db-ea1c2b8d9cdb"
              }
            ]
          },
          {
            "uuid": "24303272-cd67-4146-87db-ea1c2b8d9cdb",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8e4d23fa-1671-4484-bcb5-ffe05d8e856c"
              }
            ],
            "exits": [
              {
                "uuid": "c5df699f-b66d-4bc1-839c-21de1dfa521e",
                "destination_uuid": "9063cc21-2c51-4bb3-8f93-0fadcf1ba198"
              }
            ]
          },
          {
            "uuid": "9063cc21-2c51-4bb3-8f93-0fadcf1ba198",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fbd42cda-e169-4206-8985-9424686cd02d"
              }
            ],
            "exits": [
              {
                "uuid": "87a97915-4164-4aa3-8429-8c1368c1fd84",
                "destination_uuid": "32548f29-1e83-4b89-b05a-87761d09bc27"
              }
            ]
          },
          {
            "uuid": "32548f29-1e83-4b89-b05a-87761d09bc27",
            "actions": [
              {
                "uuid": "34fae093-6f8c-4074-b058-8c11a8879e46",
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
                "uuid": "d49d9658-ec2c-4cd4-b746-2486773e24a5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f9b874f1-475f-4010-b7c6-c7b1c8ac5910",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9e61be5c-1019-49be-abef-a1b6ed5fa282",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e6ad318f-7910-464e-8532-b7ca5ae65e71"
              }
            ],
            "exits": [
              {
                "uuid": "dcb436fe-3459-4bb6-9388-1f319bebe974",
                "destination_uuid": "236f0831-d598-4b4e-93c4-416e7edfa355"
              }
            ]
          },
          {
            "uuid": "236f0831-d598-4b4e-93c4-416e7edfa355",
            "actions": [
              {
                "uuid": "c77f839f-fa92-4178-bdb3-d79082c4a3d7",
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
                "uuid": "fe4ce0c8-e2f1-4ca2-a9ff-2e4889dc5d91",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3a5db648-e41d-4f41-8f65-5222f3ec175b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0907a71c-b40f-4c7f-bf31-f86af194f137",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "64d5a251-1f21-40d8-8105-e5ca99fa6b14"
              }
            ],
            "exits": [
              {
                "uuid": "afc0a908-033f-4222-bbe5-f90f62d68124",
                "destination_uuid": "158ea204-6953-4553-a903-37957a193683"
              }
            ]
          },
          {
            "uuid": "158ea204-6953-4553-a903-37957a193683",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0d034134-5127-49eb-befb-054ca4ab52e6"
              }
            ],
            "exits": [
              {
                "uuid": "ac129af3-8b9c-4108-81df-0a61e53e4847",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "e3e76614-2374-4b17-b06a-3074dd1fa0f1",
            "actions": [
              {
                "uuid": "b55384d7-0adc-4560-940a-eb15fcf3171d",
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
                "uuid": "25e95c4e-8d2b-4369-9a76-27d19dc059ca",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c3070abf-6db9-4edf-9124-0862c4f1d0e7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d4f153b7-32bb-41a8-9511-ddfb9de4672e",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c0ccb45b-133c-4f22-b4cb-5c58e009d177"
              }
            ],
            "exits": [
              {
                "uuid": "c5c36b59-016e-4f0e-8893-788af43dddb8",
                "destination_uuid": "73313d02-6799-423d-86d1-2570d9373cf4"
              }
            ]
          },
          {
            "uuid": "73313d02-6799-423d-86d1-2570d9373cf4",
            "actions": [
              {
                "uuid": "d59099c9-a241-4c5f-be6b-b3bd3a032509",
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
                "uuid": "6850389e-e9ba-4dec-b506-0122caf33a6e",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "68ebd783-7e88-405b-a537-0b6c7c7d12ce",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0936e432-b493-478d-94c3-5c2c6d06229b",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "307b0c60-78f2-4b54-95d4-47e27522bfde"
                },
                "type": "enter_flow",
                "uuid": "14551f03-5248-4c5b-b06f-05106a61f77e"
              }
            ],
            "exits": [
              {
                "uuid": "aa71373a-0b12-45a0-b62e-654d848855bf",
                "destination_uuid": "1e1f900e-94cb-4140-83c4-12fe495a8e85"
              },
              {
                "uuid": "b80294bd-8d4a-4e6f-bd14-80c5fb1ed903",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "bc274d1c-372e-4d96-9521-0b33bb676c3a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "3a30bd41-1603-4aa5-b597-641a8c97768c"
                },
                {
                  "uuid": "6c6a028f-7eea-4f0a-a6a0-434ec947ea00",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "68924a23-824c-4021-a9e3-cc56996a9c1f"
                }
              ],
              "categories": [
                {
                  "uuid": "3a30bd41-1603-4aa5-b597-641a8c97768c",
                  "name": "Complete",
                  "exit_uuid": "aa71373a-0b12-45a0-b62e-654d848855bf"
                },
                {
                  "uuid": "68924a23-824c-4021-a9e3-cc56996a9c1f",
                  "name": "Expired",
                  "exit_uuid": "b80294bd-8d4a-4e6f-bd14-80c5fb1ed903"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "3a30bd41-1603-4aa5-b597-641a8c97768c"
            }
          },
          {
            "uuid": "1e1f900e-94cb-4140-83c4-12fe495a8e85",
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
                "uuid": "040099f9-9936-406d-9e3f-cbbb5c2e85f8"
              }
            ],
            "exits": [
              {
                "uuid": "4f3479e0-19fd-4f31-a41e-df9ba1147b5d",
                "destination_uuid": "29127b4a-325d-42a1-a8be-0397697fd309"
              }
            ]
          },
          {
            "uuid": "29127b4a-325d-42a1-a8be-0397697fd309",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c34b6a47-8ed9-4d3c-b813-c04e0d931e43",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "18bb9cff-ac2a-4d32-b767-0b993d1a0e5e",
                  "type": "has_only_phrase",
                  "uuid": "666f3bad-a2ae-4e98-9530-479fd7070b79"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "ba70e322-4779-4d8c-8fcd-bfd0ab8cb1e8",
                  "type": "has_only_phrase",
                  "uuid": "64fb19f1-62a2-491c-b250-17b57cb82923"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "531e483c-a1ec-4512-9300-100ed77fa3f6",
                  "type": "has_only_phrase",
                  "uuid": "0b9c6e5b-3b36-4c74-a5d0-c82678fbbbde"
                },
                {
                  "arguments": [
                    "first app opening"
                  ],
                  "category_uuid": "b25ce31e-f465-4233-a085-d2b0909025c3",
                  "type": "has_only_phrase",
                  "uuid": "ab5751e8-e40f-4af6-af1a-f5c532533d4e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9a0447dd-12a8-4561-bc89-f4fd1d0e995b",
                  "name": "All Responses",
                  "uuid": "c34b6a47-8ed9-4d3c-b813-c04e0d931e43"
                },
                {
                  "exit_uuid": "f37a132d-49b3-4211-99c4-1392a605b394",
                  "name": "welcome",
                  "uuid": "18bb9cff-ac2a-4d32-b767-0b993d1a0e5e"
                },
                {
                  "exit_uuid": "a8986762-c636-46c2-887f-9c7b9146d9d4",
                  "name": "1on1",
                  "uuid": "ba70e322-4779-4d8c-8fcd-bfd0ab8cb1e8"
                },
                {
                  "exit_uuid": "c39aa993-6867-4c40-96f7-680b4e4b5172",
                  "name": "praise",
                  "uuid": "531e483c-a1ec-4512-9300-100ed77fa3f6"
                },
                {
                  "exit_uuid": "47318034-b404-4d89-b70d-9c8fa5118391",
                  "name": "first app opening",
                  "uuid": "b25ce31e-f465-4233-a085-d2b0909025c3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9a0447dd-12a8-4561-bc89-f4fd1d0e995b",
                "destination_uuid": null
              },
              {
                "uuid": "f37a132d-49b3-4211-99c4-1392a605b394",
                "destination_uuid": "78f2506a-0d8c-4b13-9fd4-0629bf606112"
              },
              {
                "uuid": "a8986762-c636-46c2-887f-9c7b9146d9d4",
                "destination_uuid": "9cd14587-39e8-41f9-b895-a2b05a9a508c"
              },
              {
                "uuid": "c39aa993-6867-4c40-96f7-680b4e4b5172",
                "destination_uuid": "b307e79a-db52-4c1a-b2bf-bb127e4b96e4"
              },
              {
                "uuid": "47318034-b404-4d89-b70d-9c8fa5118391",
                "destination_uuid": "81c8efd3-07a9-4a33-af22-3a94bbbcf40b"
              }
            ]
          },
          {
            "uuid": "78f2506a-0d8c-4b13-9fd4-0629bf606112",
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
                "uuid": "4e09be61-f35b-469d-9648-ca50004d54eb"
              }
            ],
            "exits": [
              {
                "uuid": "c5c1e121-601e-4fc9-8534-2afc97170742",
                "destination_uuid": "f44999b7-de35-483d-94d4-2520ee739c20"
              }
            ]
          },
          {
            "uuid": "f44999b7-de35-483d-94d4-2520ee739c20",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bc5457f4-3537-498a-b032-171c551e2452",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "cc1aa732-a907-4543-9212-e713326a3553",
                  "type": "has_only_phrase",
                  "uuid": "ad010adc-56f2-46ae-a924-f9a290fe6b75"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "9b467dab-a84e-43fb-bfcc-1b20f7f254b0",
                  "type": "has_only_phrase",
                  "uuid": "df648b06-7ee0-4ada-b8c9-1d65b7d0161e"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "be53dd31-8339-4fe7-92fc-bed2e31fc206",
                  "type": "has_only_phrase",
                  "uuid": "6ca5f0fe-e06d-48d3-af00-75653c5ad393"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "97a56cee-4c9a-4f1c-9005-bf3e8b03160f",
                  "type": "has_only_phrase",
                  "uuid": "304cb1b6-c603-47fc-80a6-0cf00f0c8397"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "378bb659-6a7e-43ae-8475-10bd08e6b80a",
                  "name": "All Responses",
                  "uuid": "bc5457f4-3537-498a-b032-171c551e2452"
                },
                {
                  "exit_uuid": "b8800963-35c7-448b-a46f-6b2a302fa3a7",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "cc1aa732-a907-4543-9212-e713326a3553"
                },
                {
                  "exit_uuid": "599bab12-9130-4334-bf46-be86f6702bc7",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "9b467dab-a84e-43fb-bfcc-1b20f7f254b0"
                },
                {
                  "exit_uuid": "ceb28852-77af-4d38-8830-614e48820501",
                  "name": "mod_welcome_survey",
                  "uuid": "be53dd31-8339-4fe7-92fc-bed2e31fc206"
                },
                {
                  "exit_uuid": "1afa954b-d9f2-4eba-94be-ce340eb2e1e5",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "97a56cee-4c9a-4f1c-9005-bf3e8b03160f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "378bb659-6a7e-43ae-8475-10bd08e6b80a",
                "destination_uuid": null
              },
              {
                "uuid": "b8800963-35c7-448b-a46f-6b2a302fa3a7",
                "destination_uuid": "45f7c301-d304-455c-9032-cd5440423c10"
              },
              {
                "uuid": "599bab12-9130-4334-bf46-be86f6702bc7",
                "destination_uuid": "c1a980a4-b148-4ade-86af-0f4d0a7021c1"
              },
              {
                "uuid": "ceb28852-77af-4d38-8830-614e48820501",
                "destination_uuid": "64b33f45-1186-449d-978c-f4c67717a151"
              },
              {
                "uuid": "1afa954b-d9f2-4eba-94be-ce340eb2e1e5",
                "destination_uuid": "10467421-dcf6-4dfc-ba2e-f611bd84c2aa"
              }
            ]
          },
          {
            "uuid": "45f7c301-d304-455c-9032-cd5440423c10",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "0edc132d-8207-4227-9066-dfb28dd4a2aa"
                },
                "type": "enter_flow",
                "uuid": "c315f50e-9af4-4714-b350-18e173edda7b"
              }
            ],
            "exits": [
              {
                "uuid": "6ad2ba58-a9b0-4a4a-8245-e2feba994fb9",
                "destination_uuid": null
              },
              {
                "uuid": "9b77e92a-930c-436e-9ff0-fcad5d2ddda2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "a0300cf5-04c8-4828-8bbd-5945140f7dbb",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0bb2c910-9a28-4cf5-bd1a-56d2929efdbc"
                },
                {
                  "uuid": "62bc5ad9-3056-4319-9101-d38f02a65705",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "61683331-82c7-4b70-b0f7-9b3b5a996204"
                }
              ],
              "categories": [
                {
                  "uuid": "0bb2c910-9a28-4cf5-bd1a-56d2929efdbc",
                  "name": "Complete",
                  "exit_uuid": "6ad2ba58-a9b0-4a4a-8245-e2feba994fb9"
                },
                {
                  "uuid": "61683331-82c7-4b70-b0f7-9b3b5a996204",
                  "name": "Expired",
                  "exit_uuid": "9b77e92a-930c-436e-9ff0-fcad5d2ddda2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0bb2c910-9a28-4cf5-bd1a-56d2929efdbc"
            }
          },
          {
            "uuid": "c1a980a4-b148-4ade-86af-0f4d0a7021c1",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "ea14580c-f9c9-4eed-996d-e973171c976b"
                },
                "type": "enter_flow",
                "uuid": "4f1cc127-5c2c-4e1e-8719-05daab9e3183"
              }
            ],
            "exits": [
              {
                "uuid": "eb201d4b-99c2-46b2-8185-f02fce0ec466",
                "destination_uuid": null
              },
              {
                "uuid": "ee9c16e1-d697-41cf-a17d-8eba13ac0ea3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "df19f015-c8be-4dbb-ab24-22b3d8e133e1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "2b5131a2-cb23-4a4d-b5bc-ab816040daf7"
                },
                {
                  "uuid": "724bdddb-7af3-4ff1-b7e9-002e923ef2a7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2091b059-6f40-4c70-b5f9-b513bb855e6d"
                }
              ],
              "categories": [
                {
                  "uuid": "2b5131a2-cb23-4a4d-b5bc-ab816040daf7",
                  "name": "Complete",
                  "exit_uuid": "eb201d4b-99c2-46b2-8185-f02fce0ec466"
                },
                {
                  "uuid": "2091b059-6f40-4c70-b5f9-b513bb855e6d",
                  "name": "Expired",
                  "exit_uuid": "ee9c16e1-d697-41cf-a17d-8eba13ac0ea3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "2b5131a2-cb23-4a4d-b5bc-ab816040daf7"
            }
          },
          {
            "uuid": "64b33f45-1186-449d-978c-f4c67717a151",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "9a4e581d-a9a6-438a-a391-ab042cfcb04b"
                },
                "type": "enter_flow",
                "uuid": "b2e03f69-80d1-429a-857f-ce5df2eaf63f"
              }
            ],
            "exits": [
              {
                "uuid": "9e147331-8acd-4ac1-aeaf-58edb4ae09c9",
                "destination_uuid": null
              },
              {
                "uuid": "299bc64a-846d-407e-b506-9aaeedb252f6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5a554792-9aa0-46f3-9eed-9110e17dcf8d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0fb6d799-76ef-4279-8c67-9e2649e6f584"
                },
                {
                  "uuid": "278e1f55-c26e-4925-8a37-e7204d9e46f1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "addf52f7-b297-4184-a920-6ce6cad9329c"
                }
              ],
              "categories": [
                {
                  "uuid": "0fb6d799-76ef-4279-8c67-9e2649e6f584",
                  "name": "Complete",
                  "exit_uuid": "9e147331-8acd-4ac1-aeaf-58edb4ae09c9"
                },
                {
                  "uuid": "addf52f7-b297-4184-a920-6ce6cad9329c",
                  "name": "Expired",
                  "exit_uuid": "299bc64a-846d-407e-b506-9aaeedb252f6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0fb6d799-76ef-4279-8c67-9e2649e6f584"
            }
          },
          {
            "uuid": "10467421-dcf6-4dfc-ba2e-f611bd84c2aa",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "d2841398-72e5-4f4f-bc2b-f5931affea65"
                },
                "type": "enter_flow",
                "uuid": "de7610a5-18dd-49e0-9b20-b76dcc18fd62"
              }
            ],
            "exits": [
              {
                "uuid": "55554f24-c2c7-4d5e-92d4-c6df59c67abc",
                "destination_uuid": null
              },
              {
                "uuid": "c22510e7-98aa-479f-8893-e8c2b1a746dd",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b2394af1-499f-4b0c-8d21-4a91ed66104d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0f5318e6-4289-4d92-acba-d18e1f9bc769"
                },
                {
                  "uuid": "86d117c7-1429-4c06-a910-e3bdad3ee02a",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b28bd5f0-e02b-420b-82ad-481e509cbd07"
                }
              ],
              "categories": [
                {
                  "uuid": "0f5318e6-4289-4d92-acba-d18e1f9bc769",
                  "name": "Complete",
                  "exit_uuid": "55554f24-c2c7-4d5e-92d4-c6df59c67abc"
                },
                {
                  "uuid": "b28bd5f0-e02b-420b-82ad-481e509cbd07",
                  "name": "Expired",
                  "exit_uuid": "c22510e7-98aa-479f-8893-e8c2b1a746dd"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0f5318e6-4289-4d92-acba-d18e1f9bc769"
            }
          },
          {
            "uuid": "9cd14587-39e8-41f9-b895-a2b05a9a508c",
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
                "uuid": "f5963b4e-ed0f-4881-90fc-1b3b330c2eec"
              }
            ],
            "exits": [
              {
                "uuid": "9eb449f8-a0d3-4acc-9428-e0f8a162bf9f",
                "destination_uuid": "b92a68fb-3b5d-479b-bdc0-7af5c9ee3f6f"
              }
            ]
          },
          {
            "uuid": "b92a68fb-3b5d-479b-bdc0-7af5c9ee3f6f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5dd63cc8-248d-40ae-a21d-374fd4caec19",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "e9f85479-d84c-41ab-a756-5adedea2cf50",
                  "type": "has_only_phrase",
                  "uuid": "37fbea9e-c0e6-4570-b35a-803469777bf0"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "67f2ce4e-a1a9-437c-96e9-b27d6ecd231d",
                  "type": "has_only_phrase",
                  "uuid": "056a7dea-f315-4e60-a0bc-3f4f774483c2"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "ff85550d-7340-49cc-8f6e-98ed2b283702",
                  "type": "has_only_phrase",
                  "uuid": "b3051b5f-0abe-40dd-bc66-32a514c786b9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a76e1a36-5380-40bd-aa2f-f3a9474e964b",
                  "name": "All Responses",
                  "uuid": "5dd63cc8-248d-40ae-a21d-374fd4caec19"
                },
                {
                  "exit_uuid": "529c49d3-4775-4913-b2a7-7fef9f697d0c",
                  "name": "mod_1on1_emo",
                  "uuid": "e9f85479-d84c-41ab-a756-5adedea2cf50"
                },
                {
                  "exit_uuid": "8d6b7f0e-000c-4704-a1a5-f8a19f1e21f0",
                  "name": "mod_1on1_activity",
                  "uuid": "67f2ce4e-a1a9-437c-96e9-b27d6ecd231d"
                },
                {
                  "exit_uuid": "c99e9527-f785-4e75-8c26-bddd9727c6ad",
                  "name": "mod_1on1_activity_review",
                  "uuid": "ff85550d-7340-49cc-8f6e-98ed2b283702"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a76e1a36-5380-40bd-aa2f-f3a9474e964b",
                "destination_uuid": null
              },
              {
                "uuid": "529c49d3-4775-4913-b2a7-7fef9f697d0c",
                "destination_uuid": "62ab241d-da1b-456a-972b-36179f506056"
              },
              {
                "uuid": "8d6b7f0e-000c-4704-a1a5-f8a19f1e21f0",
                "destination_uuid": "993a7418-76b7-4a57-a0fe-73ce5ed0750a"
              },
              {
                "uuid": "c99e9527-f785-4e75-8c26-bddd9727c6ad",
                "destination_uuid": "727aa403-a5a9-4e6b-9950-3ded0a78e370"
              }
            ]
          },
          {
            "uuid": "62ab241d-da1b-456a-972b-36179f506056",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "a34312e1-2e62-4937-961c-301cca7e9917"
                },
                "type": "enter_flow",
                "uuid": "50214fb1-da1d-4bad-ac1e-c5b4e576d28d"
              }
            ],
            "exits": [
              {
                "uuid": "69c9f545-013a-49f3-88a9-dd4164bd720b",
                "destination_uuid": null
              },
              {
                "uuid": "6804ac61-c9be-4a66-a9be-54730901bcc0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5b0e505d-6455-4b9d-8bee-9ed18db84ee8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "63cecc84-c064-4572-8e3c-5cc003291025"
                },
                {
                  "uuid": "8c9bb68f-adaf-491b-8735-6b59bdc63de4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "140753f4-8396-40a6-b9f9-71d49d5bcacb"
                }
              ],
              "categories": [
                {
                  "uuid": "63cecc84-c064-4572-8e3c-5cc003291025",
                  "name": "Complete",
                  "exit_uuid": "69c9f545-013a-49f3-88a9-dd4164bd720b"
                },
                {
                  "uuid": "140753f4-8396-40a6-b9f9-71d49d5bcacb",
                  "name": "Expired",
                  "exit_uuid": "6804ac61-c9be-4a66-a9be-54730901bcc0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "63cecc84-c064-4572-8e3c-5cc003291025"
            }
          },
          {
            "uuid": "993a7418-76b7-4a57-a0fe-73ce5ed0750a",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "141f0fab-6bf1-443e-8ae3-fb4f7b9fdf3d"
                },
                "type": "enter_flow",
                "uuid": "b2e74535-d69f-406f-8063-1aedea3a3ed9"
              }
            ],
            "exits": [
              {
                "uuid": "023d6729-235f-43d7-9098-b949b04cb736",
                "destination_uuid": null
              },
              {
                "uuid": "bbf62183-867a-475c-8a6a-b34938d229cf",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "541960ec-4819-4e4e-b587-2b410245ffaf",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "50046726-9c4f-4c9d-a602-e4ee4e433ea8"
                },
                {
                  "uuid": "aa454543-b523-461a-8c8a-d6b5b572678c",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "fffe784b-5ec5-487f-a6fd-998a0cbb0c07"
                }
              ],
              "categories": [
                {
                  "uuid": "50046726-9c4f-4c9d-a602-e4ee4e433ea8",
                  "name": "Complete",
                  "exit_uuid": "023d6729-235f-43d7-9098-b949b04cb736"
                },
                {
                  "uuid": "fffe784b-5ec5-487f-a6fd-998a0cbb0c07",
                  "name": "Expired",
                  "exit_uuid": "bbf62183-867a-475c-8a6a-b34938d229cf"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "50046726-9c4f-4c9d-a602-e4ee4e433ea8"
            }
          },
          {
            "uuid": "727aa403-a5a9-4e6b-9950-3ded0a78e370",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "455635b3-f395-4516-afaf-b1fe93e6fd64"
                },
                "type": "enter_flow",
                "uuid": "f3236368-8b60-4f69-a137-bfa5916c7238"
              }
            ],
            "exits": [
              {
                "uuid": "4b998189-2860-4b44-bba6-64b436907807",
                "destination_uuid": null
              },
              {
                "uuid": "af939894-78c3-4b3c-93da-739dad23911e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c75663f8-7691-4398-aad1-b654ac5f8b84",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d315ca25-78da-4091-a131-1946ae3268d2"
                },
                {
                  "uuid": "6618bf94-09a9-4b08-ad24-19f1ce6bfbe2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "36e383ec-7f7a-4509-952d-f3444638274d"
                }
              ],
              "categories": [
                {
                  "uuid": "d315ca25-78da-4091-a131-1946ae3268d2",
                  "name": "Complete",
                  "exit_uuid": "4b998189-2860-4b44-bba6-64b436907807"
                },
                {
                  "uuid": "36e383ec-7f7a-4509-952d-f3444638274d",
                  "name": "Expired",
                  "exit_uuid": "af939894-78c3-4b3c-93da-739dad23911e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d315ca25-78da-4091-a131-1946ae3268d2"
            }
          },
          {
            "uuid": "b307e79a-db52-4c1a-b2bf-bb127e4b96e4",
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
                "uuid": "7aa7fa65-e2c6-49e5-a19f-a9fc58e6befd"
              }
            ],
            "exits": [
              {
                "uuid": "ff8935f0-c995-44c1-a3aa-8a93f6a14e4a",
                "destination_uuid": "6c2e4625-c165-4cd9-96f0-0397c52ed591"
              }
            ]
          },
          {
            "uuid": "6c2e4625-c165-4cd9-96f0-0397c52ed591",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "627af67a-c057-4769-b41e-c1705757bf39",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "31b029af-56f9-43ef-9867-88875ddcfa6d",
                  "type": "has_only_phrase",
                  "uuid": "d50bcf31-e265-41b9-8a7f-42b79c80139a"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "3228777d-0a7f-44e3-9892-f81696eed688",
                  "type": "has_only_phrase",
                  "uuid": "2ceed49f-ac9f-4b4e-9c59-8e042b6d8e91"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "ed01cbd3-24e1-4bb1-ade4-95349207ae44",
                  "type": "has_only_phrase",
                  "uuid": "f9fd6ccf-4f86-4d94-a4ce-a72d517a0ff9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9eb008b0-f90d-4a12-8445-7ceab9e391cb",
                  "name": "All Responses",
                  "uuid": "627af67a-c057-4769-b41e-c1705757bf39"
                },
                {
                  "exit_uuid": "d40bd6fe-8f74-4a9d-92cf-41eb1b5e8c04",
                  "name": "mod_praise_intro",
                  "uuid": "31b029af-56f9-43ef-9867-88875ddcfa6d"
                },
                {
                  "exit_uuid": "95d02dd8-b5e1-4ae3-8a19-155fb065d5da",
                  "name": "mod_praise_activity",
                  "uuid": "3228777d-0a7f-44e3-9892-f81696eed688"
                },
                {
                  "exit_uuid": "953c2c68-ac86-42fe-a505-67bab3aeb07d",
                  "name": "mod_praise_activity_review",
                  "uuid": "ed01cbd3-24e1-4bb1-ade4-95349207ae44"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9eb008b0-f90d-4a12-8445-7ceab9e391cb",
                "destination_uuid": null
              },
              {
                "uuid": "d40bd6fe-8f74-4a9d-92cf-41eb1b5e8c04",
                "destination_uuid": "6330c790-0309-4445-9b8e-816965f05966"
              },
              {
                "uuid": "95d02dd8-b5e1-4ae3-8a19-155fb065d5da",
                "destination_uuid": "971784a4-3b91-4620-b096-8b23407d881f"
              },
              {
                "uuid": "953c2c68-ac86-42fe-a505-67bab3aeb07d",
                "destination_uuid": "c7df3073-13ab-448c-a320-44f3d7a401d0"
              }
            ]
          },
          {
            "uuid": "6330c790-0309-4445-9b8e-816965f05966",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "67adc21d-352f-418d-8891-db8b980cd1e0"
                },
                "type": "enter_flow",
                "uuid": "8dd886ad-7ca2-411b-aa9d-bf0fb40457ed"
              }
            ],
            "exits": [
              {
                "uuid": "d426b164-75f2-4da0-a147-ca3cca1d09aa",
                "destination_uuid": null
              },
              {
                "uuid": "626d3217-4cee-469b-9371-8cc4b2b3731d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8e1bf36a-3ae4-47d5-b283-12b826d61783",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0a5883e3-a1ae-470b-a07b-c56620703bdc"
                },
                {
                  "uuid": "b93ecd5b-f6b4-467b-be0e-257eda0255dc",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e506f432-67c6-4316-b623-5da0bd94a4d3"
                }
              ],
              "categories": [
                {
                  "uuid": "0a5883e3-a1ae-470b-a07b-c56620703bdc",
                  "name": "Complete",
                  "exit_uuid": "d426b164-75f2-4da0-a147-ca3cca1d09aa"
                },
                {
                  "uuid": "e506f432-67c6-4316-b623-5da0bd94a4d3",
                  "name": "Expired",
                  "exit_uuid": "626d3217-4cee-469b-9371-8cc4b2b3731d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0a5883e3-a1ae-470b-a07b-c56620703bdc"
            }
          },
          {
            "uuid": "971784a4-3b91-4620-b096-8b23407d881f",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "bcb0cc7f-1ed8-4ebd-abf4-325c43c4b168"
                },
                "type": "enter_flow",
                "uuid": "ccdc64d1-f5d6-4e93-983a-24866d98b41c"
              }
            ],
            "exits": [
              {
                "uuid": "19f18862-4acc-43cc-9683-dd398cf05472",
                "destination_uuid": null
              },
              {
                "uuid": "e778db50-8b69-455b-b68a-48f2a1292abb",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2d62ec69-942c-44a5-9f52-378dbd2eeb8c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "51598596-8121-44a9-ae7f-1258661ae799"
                },
                {
                  "uuid": "0d085d34-31e7-4787-b047-73443be829a7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "22cbb39a-8f98-4aff-aac4-31678d8751ee"
                }
              ],
              "categories": [
                {
                  "uuid": "51598596-8121-44a9-ae7f-1258661ae799",
                  "name": "Complete",
                  "exit_uuid": "19f18862-4acc-43cc-9683-dd398cf05472"
                },
                {
                  "uuid": "22cbb39a-8f98-4aff-aac4-31678d8751ee",
                  "name": "Expired",
                  "exit_uuid": "e778db50-8b69-455b-b68a-48f2a1292abb"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "51598596-8121-44a9-ae7f-1258661ae799"
            }
          },
          {
            "uuid": "c7df3073-13ab-448c-a320-44f3d7a401d0",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "868a9aed-ec58-48c7-bfc3-e477c1dd2cd4"
                },
                "type": "enter_flow",
                "uuid": "f331da7c-d910-4823-ba6e-8611179cc0ad"
              }
            ],
            "exits": [
              {
                "uuid": "58548f1e-2702-480b-a017-01f015ee53a6",
                "destination_uuid": null
              },
              {
                "uuid": "1300e3f7-b762-419a-9414-1fa3f5b19dc7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "6c27c999-ec96-44cf-aeb2-d014e80f1d29",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7b5a5f0f-8053-48da-a891-40f7cafd91d7"
                },
                {
                  "uuid": "a0f6293b-3a4f-48fe-b5a4-f93cba6fc595",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "1a22c245-99bb-4e88-9ccb-ac23b2f45db3"
                }
              ],
              "categories": [
                {
                  "uuid": "7b5a5f0f-8053-48da-a891-40f7cafd91d7",
                  "name": "Complete",
                  "exit_uuid": "58548f1e-2702-480b-a017-01f015ee53a6"
                },
                {
                  "uuid": "1a22c245-99bb-4e88-9ccb-ac23b2f45db3",
                  "name": "Expired",
                  "exit_uuid": "1300e3f7-b762-419a-9414-1fa3f5b19dc7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7b5a5f0f-8053-48da-a891-40f7cafd91d7"
            }
          },
          {
            "uuid": "81c8efd3-07a9-4a33-af22-3a94bbbcf40b",
            "actions": [
              {
                "flow": {
                  "name": "first_app_opening",
                  "uuid": "fab69f6c-6852-494a-bd29-06b51eddef59"
                },
                "type": "enter_flow",
                "uuid": "92c986dc-1c41-4303-970b-0f0413618ff9"
              }
            ],
            "exits": [
              {
                "uuid": "73a1c0d7-41af-42ae-96c6-f52485814da9",
                "destination_uuid": null
              },
              {
                "uuid": "c079a346-5c43-491a-974b-e7d460531903",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "42e783bb-51ff-4269-b74d-f52b17627422",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7762a6b3-62af-494c-8617-a1dfc3f03f7f"
                },
                {
                  "uuid": "aae541af-35cf-461f-a202-88936751c680",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c24380e5-c032-45a9-a966-cd2a0168f22d"
                }
              ],
              "categories": [
                {
                  "uuid": "7762a6b3-62af-494c-8617-a1dfc3f03f7f",
                  "name": "Complete",
                  "exit_uuid": "73a1c0d7-41af-42ae-96c6-f52485814da9"
                },
                {
                  "uuid": "c24380e5-c032-45a9-a966-cd2a0168f22d",
                  "name": "Expired",
                  "exit_uuid": "c079a346-5c43-491a-974b-e7d460531903"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7762a6b3-62af-494c-8617-a1dfc3f03f7f"
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
        "uuid": "81f37d90-ba58-4832-b0ee-0c5013da14c3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "fcb556bc-615d-4b9c-a5d6-4ffea8a3690a",
            "actions": [
              {
                "uuid": "9f9cab8e-307e-4dce-a4c0-949a4f90fa67",
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
                "uuid": "d56f49d9-96d4-4563-830e-6aa5a07a2da9",
                "destination_uuid": "cf58a34c-cf41-4074-8bb3-6c710c5ab8d5"
              }
            ]
          },
          {
            "uuid": "cf58a34c-cf41-4074-8bb3-6c710c5ab8d5",
            "actions": [
              {
                "uuid": "e8994bab-fdc5-410b-96bc-ea5d684e92c4",
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
                "uuid": "502a5fdd-ea05-41c8-8ae3-f2b06296bfd2",
                "destination_uuid": "a73a3cf1-a30e-4694-963e-843fb299efdf"
              }
            ]
          },
          {
            "uuid": "a73a3cf1-a30e-4694-963e-843fb299efdf",
            "actions": [
              {
                "uuid": "1bf31fb0-c746-4d54-bea8-f7e78d832d8e",
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
                "uuid": "b893c39e-594a-4bdc-bb53-42b73cdd89aa",
                "destination_uuid": "d20c9615-0cb6-47bc-b43b-aca730a3ee4d"
              }
            ]
          },
          {
            "uuid": "d20c9615-0cb6-47bc-b43b-aca730a3ee4d",
            "actions": [
              {
                "uuid": "f301a92a-eaa4-4ab7-bdda-76667c6810f0",
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
                "uuid": "f6c031c9-4de8-4b3e-b24e-f3c147b7d230",
                "destination_uuid": "eeb195e5-491b-440c-afd7-1b4705fc2e12"
              }
            ]
          },
          {
            "uuid": "eeb195e5-491b-440c-afd7-1b4705fc2e12",
            "actions": [
              {
                "uuid": "c5b52828-96ea-4ad3-9851-d1119b119b7e",
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
                "uuid": "45002c02-4a31-4abd-b419-1aa7db7c5fac",
                "destination_uuid": "030a5cf3-a79a-4839-a12a-08d5d8d48f43"
              }
            ]
          },
          {
            "uuid": "030a5cf3-a79a-4839-a12a-08d5d8d48f43",
            "actions": [
              {
                "uuid": "54b922dd-5e30-4d96-af4f-2f055de8e696",
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
                "uuid": "39393f79-7d8b-4f81-9c06-297a23b6aa60",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a916d0c9-9aef-4ad4-aa49-74b7dae5aff2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "883287ef-9e31-44ae-952d-ea1ed278522d",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cdd58d9b-1b93-4714-85e9-b67a63fc2a8f"
              }
            ],
            "exits": [
              {
                "uuid": "e30ebc4a-3bc7-418b-b3c7-2f87aa9e893d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6f0925bc-67e0-4854-8990-512f61c57666",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "dd93bf0c-9a3d-467c-86c8-8d5bca28c952",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b7798619-b024-4507-84c7-fadb9da11c59"
              }
            ],
            "exits": [
              {
                "uuid": "e85bf740-e522-4374-b2fe-541e2880c178",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f0aac0ed-22b5-4a2d-a56f-f991d756599c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "79656499-9437-411a-92b2-17cff4b42754",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e4db59e8-b621-40e4-8e88-2a156a6598fb"
              }
            ],
            "exits": [
              {
                "uuid": "034754a6-b29f-43f6-8be8-4217c2381045",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "841974a3-4ae6-486c-8a1e-2a17fd97af36",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a1f4e598-81ce-40c5-ac57-1d59d68d13ba",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1bf41bfd-61bc-4099-bb44-92dbe3f531e4"
              }
            ],
            "exits": [
              {
                "uuid": "c42d81a3-62d8-4575-8c7b-d733b08c5d83",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "dd99648b-ea87-4736-927c-49020b737780",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f94aabbb-83a7-4c62-a763-db250880a492",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "055e612c-970b-45ea-8864-913feced0e1d"
              }
            ],
            "exits": [
              {
                "uuid": "23bd9e30-f6b8-43c1-88e3-62e968caed18",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4c8cb9dd-ff84-4199-ada1-97a774b2705a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d0a54218-7f14-42ec-a205-7d5b69d915c1",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1d8502fe-5f86-453a-be7d-dc3491d24241"
              }
            ],
            "exits": [
              {
                "uuid": "3988b508-8b33-403d-ac8c-7ee248643302",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3140700b-7900-4427-90db-f9c6fed306f9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c8625eb4-7163-48d5-9e0d-6c47e1553fea",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b969280b-ef5c-45d4-a1af-62d007d30bd0"
              }
            ],
            "exits": [
              {
                "uuid": "5289e4a2-f965-473f-9f3a-a6ff9d2a750a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "89749595-06fa-4bbc-81cb-bf20edbe5ebe",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "45dac2e2-4eb9-4887-b8b0-575cfa8727d3",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "73f794b3-e4bf-4699-b18d-865a2ffd1265"
              }
            ],
            "exits": [
              {
                "uuid": "2e5dbac4-6882-4075-aa6e-83913dae2e93",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "37f74687-e681-4da9-a978-c5b51d7901e2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "32c015a6-b5e5-41bf-bbe5-9b5e806f1fdd",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1c3edd9e-c9b2-4046-93ba-987119c5478c"
              }
            ],
            "exits": [
              {
                "uuid": "cb3b04dd-f70d-4c0d-9f72-9ae3ba38d102",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "97d56f43-229c-4e3a-be7a-fbeb52dddc35",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "485c1dc0-2aa6-4e56-853b-06fda9dbeb9d",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2afcb17b-8766-4802-baec-a35448659088"
              }
            ],
            "exits": [
              {
                "uuid": "401280a2-4d3d-4cd8-a929-0db1efd5cb8f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "2582f23d-f06d-442d-9686-9ed865db75f7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "94696d4b-d917-4cdf-b442-c97280f793e0",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2e6adcc5-e6b7-4c77-ba7d-63064ae21159"
              }
            ],
            "exits": [
              {
                "uuid": "308e0937-dc8c-49d1-a87a-dab94a8d2cec",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "026b5f56-9357-4886-a1f9-2614d8fedec9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4d8f5a1d-472b-4276-8ded-25701b0ed0e1",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "87592f35-4475-4a51-a449-4f02a6044dd7"
              }
            ],
            "exits": [
              {
                "uuid": "ba8f10ab-ac6e-46f8-a5be-65bb2a1e2098",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a826c7fc-5561-4efa-8f86-8ed33b646f65",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f5430b3f-a8a9-4d9b-a327-9b742bc054eb",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ddf82aab-9c64-4992-a525-cc8ccc0a9c45"
              }
            ],
            "exits": [
              {
                "uuid": "cca8430d-c6b2-42e6-b97d-ec101198b33e",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "17fe2ea6-66b8-4f93-ad6d-624f04b5aa1d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "52be0f49-1e6e-49db-93aa-62576303c013",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f680e2ee-ddc7-40e1-9116-f6f45c4271ac"
              }
            ],
            "exits": [
              {
                "uuid": "219af3d7-2be1-43cb-8e70-cc059a038586",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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