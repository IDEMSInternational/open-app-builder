export default [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "aac02d3c-42be-4dfd-bc16-15e1536f6c04",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8fa12ad1-573b-42e7-8d51-d5d239d47c8d",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "60ad0457-3c7c-40be-b3c0-f7130d4b823d"
              }
            ],
            "exits": [
              {
                "uuid": "402b829c-c92a-4431-8c40-7d545f7cdde5",
                "destination_uuid": "3d7de069-c70d-41e3-a202-608b696a9367"
              }
            ]
          },
          {
            "uuid": "3d7de069-c70d-41e3-a202-608b696a9367",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question.",
                "type": "send_msg",
                "quick_replies": [
                  "First option: launch example_media flow",
                  "Second option: launch example_tickbox flow",
                  "Third option: launch example_variables flow",
                  "Stay in this flow."
                ],
                "uuid": "ec7eec45-2742-4f8c-8762-b5ebca02b28c"
              }
            ],
            "exits": [
              {
                "uuid": "9c227e1e-210b-4a4f-b414-0d4f5121ef8c",
                "destination_uuid": "6780693f-1c14-4450-90c2-bf6c90564cc6"
              }
            ]
          },
          {
            "uuid": "6780693f-1c14-4450-90c2-bf6c90564cc6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5267fe45-abe3-4985-bc18-9a990c68be4d",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "0f47e872-514f-4dbc-9cf7-5fcc78d8fc04",
                  "type": "has_only_phrase",
                  "uuid": "eec6f640-b3a3-4060-ada9-788490629de1"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "26ef2c63-b86a-43a0-8273-731aa94da84f",
                  "type": "has_only_phrase",
                  "uuid": "e7358fc6-87e7-4e10-a05f-78c9c2074bb4"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "77e0bcb0-d7de-4055-9d67-c852e767aa66",
                  "type": "has_only_phrase",
                  "uuid": "9ace808c-d394-406a-bc81-172d154237cc"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "2045fd60-5cf4-445d-a2bf-d21a72215344",
                  "type": "has_only_phrase",
                  "uuid": "642472a4-fa27-48d7-8103-47731357885d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "17d9ad07-32f8-450b-a35f-9d269a309e73",
                  "name": "All Responses",
                  "uuid": "5267fe45-abe3-4985-bc18-9a990c68be4d"
                },
                {
                  "exit_uuid": "16020766-c323-47f9-be2c-c80116148e4e",
                  "name": "First option: launch example_media flow",
                  "uuid": "0f47e872-514f-4dbc-9cf7-5fcc78d8fc04"
                },
                {
                  "exit_uuid": "01746360-856b-4d2a-ba79-9b34752a4a5f",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "26ef2c63-b86a-43a0-8273-731aa94da84f"
                },
                {
                  "exit_uuid": "69ade712-ac71-4f2e-a2ff-5670632ad09a",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "77e0bcb0-d7de-4055-9d67-c852e767aa66"
                },
                {
                  "exit_uuid": "7bfa275b-970e-4be2-8bef-08682274bf18",
                  "name": "Stay in this flow.",
                  "uuid": "2045fd60-5cf4-445d-a2bf-d21a72215344"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "17d9ad07-32f8-450b-a35f-9d269a309e73",
                "destination_uuid": null
              },
              {
                "uuid": "16020766-c323-47f9-be2c-c80116148e4e",
                "destination_uuid": "1e30fb14-6462-47df-875e-c66f7d6dea34"
              },
              {
                "uuid": "01746360-856b-4d2a-ba79-9b34752a4a5f",
                "destination_uuid": "401e25d9-cbe6-4d7a-98e3-3fa11ddaf4be"
              },
              {
                "uuid": "69ade712-ac71-4f2e-a2ff-5670632ad09a",
                "destination_uuid": "9fd47e7c-8577-40c4-a18b-036da93d6150"
              },
              {
                "uuid": "7bfa275b-970e-4be2-8bef-08682274bf18",
                "destination_uuid": "2bcef2cc-b0e6-418a-9f8e-b5d8a16f1f1a"
              }
            ]
          },
          {
            "uuid": "1e30fb14-6462-47df-875e-c66f7d6dea34",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "9f20a695-3389-474d-b4a0-d20b203288a6"
                },
                "type": "enter_flow",
                "uuid": "6aa5b108-47bf-4c0c-8030-de395e20a495"
              }
            ],
            "exits": [
              {
                "uuid": "0ec59fca-5258-401c-a228-8b802db2d491",
                "destination_uuid": "656eec1a-3ec3-41e8-a58c-968ab8f4f1a2"
              },
              {
                "uuid": "9971a007-931d-4494-8267-73a6d8d1c66e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7ff034ec-0916-4b80-8d57-4d7981820f10",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "1b180bbb-6c55-4ca0-bbf6-8e384e4cbdcd"
                },
                {
                  "uuid": "fa858ea6-e481-42cb-9af1-d761ccab8a98",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "077431c3-d591-466e-a5ba-4ce92c05ed7f"
                }
              ],
              "categories": [
                {
                  "uuid": "1b180bbb-6c55-4ca0-bbf6-8e384e4cbdcd",
                  "name": "Complete",
                  "exit_uuid": "0ec59fca-5258-401c-a228-8b802db2d491"
                },
                {
                  "uuid": "077431c3-d591-466e-a5ba-4ce92c05ed7f",
                  "name": "Expired",
                  "exit_uuid": "9971a007-931d-4494-8267-73a6d8d1c66e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "1b180bbb-6c55-4ca0-bbf6-8e384e4cbdcd"
            }
          },
          {
            "uuid": "401e25d9-cbe6-4d7a-98e3-3fa11ddaf4be",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "0651e59c-c025-4922-9aa0-5d2924083480"
                },
                "type": "enter_flow",
                "uuid": "bddc1a0f-7abe-4139-859f-48cf147a1671"
              }
            ],
            "exits": [
              {
                "uuid": "1664083f-822e-46d8-bc03-0fe294048907",
                "destination_uuid": "656eec1a-3ec3-41e8-a58c-968ab8f4f1a2"
              },
              {
                "uuid": "77810412-2618-4358-82ed-cb3cfe61b8a1",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2ed0bfe8-82b5-4d82-8992-919bf53f8314",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f04d6852-ae29-428c-a528-7542a466e0f2"
                },
                {
                  "uuid": "58640af9-343d-442c-9454-4f0e99ca859e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "93cd6d77-700f-4290-8f0f-782ad5552126"
                }
              ],
              "categories": [
                {
                  "uuid": "f04d6852-ae29-428c-a528-7542a466e0f2",
                  "name": "Complete",
                  "exit_uuid": "1664083f-822e-46d8-bc03-0fe294048907"
                },
                {
                  "uuid": "93cd6d77-700f-4290-8f0f-782ad5552126",
                  "name": "Expired",
                  "exit_uuid": "77810412-2618-4358-82ed-cb3cfe61b8a1"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f04d6852-ae29-428c-a528-7542a466e0f2"
            }
          },
          {
            "uuid": "9fd47e7c-8577-40c4-a18b-036da93d6150",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "db7e3f2c-c792-451a-86b6-ab80067bdd42"
                },
                "type": "enter_flow",
                "uuid": "a0a3f7f6-03e3-4129-a010-68dc71393511"
              }
            ],
            "exits": [
              {
                "uuid": "ab07dd77-9c60-4f20-8828-fa76b9aab86d",
                "destination_uuid": "656eec1a-3ec3-41e8-a58c-968ab8f4f1a2"
              },
              {
                "uuid": "ca16288a-e6bb-474f-b15e-53413ab4d234",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "3457db8e-c179-4c6f-85c7-f4c9b4b302c7",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "308f8fd6-f1f3-494c-8131-75b69fed2d08"
                },
                {
                  "uuid": "db998ef1-b078-493e-b945-5108075fb9e9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "806c29ad-80e3-4929-90b0-69234e9cff6a"
                }
              ],
              "categories": [
                {
                  "uuid": "308f8fd6-f1f3-494c-8131-75b69fed2d08",
                  "name": "Complete",
                  "exit_uuid": "ab07dd77-9c60-4f20-8828-fa76b9aab86d"
                },
                {
                  "uuid": "806c29ad-80e3-4929-90b0-69234e9cff6a",
                  "name": "Expired",
                  "exit_uuid": "ca16288a-e6bb-474f-b15e-53413ab4d234"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "308f8fd6-f1f3-494c-8131-75b69fed2d08"
            }
          },
          {
            "uuid": "2bcef2cc-b0e6-418a-9f8e-b5d8a16f1f1a",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fcb06d47-c22a-4bd8-8a3e-8961ab24830c"
              }
            ],
            "exits": [
              {
                "uuid": "833146eb-265d-4627-bcd3-14287ede13a9",
                "destination_uuid": "279ec301-d762-4866-b7ee-06f3a7959458"
              }
            ]
          },
          {
            "uuid": "656eec1a-3ec3-41e8-a58c-968ab8f4f1a2",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8aea7e98-f066-4107-b8d1-bec01ef6aea5"
              }
            ],
            "exits": [
              {
                "uuid": "2482a0bd-c160-4b6e-ae4d-3376462e5cee",
                "destination_uuid": "279ec301-d762-4866-b7ee-06f3a7959458"
              }
            ]
          },
          {
            "uuid": "279ec301-d762-4866-b7ee-06f3a7959458",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "dd9b036c-0cc2-4690-9a4b-71489751887c"
              }
            ],
            "exits": [
              {
                "uuid": "6d8fe0dc-111d-418d-8e19-d542798c067c",
                "destination_uuid": "781dc6fc-effc-4f03-a26d-209b6e074c9e"
              }
            ]
          },
          {
            "uuid": "781dc6fc-effc-4f03-a26d-209b6e074c9e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6229e8ff-3fc0-4e57-87e3-3698562c2d5b",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "9760df93-186e-4c22-b766-46642fda8a2e",
                  "type": "has_only_phrase",
                  "uuid": "3657b34b-4e2f-430c-9378-fadb92671bae"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "2714728c-47b4-450f-88dd-c6af2c658328",
                  "type": "has_only_phrase",
                  "uuid": "caaf0e6e-b01d-4bf1-99ce-bffe250db5df"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "566f624d-67f0-401d-a31b-041638b2d2ba",
                  "name": "All Responses",
                  "uuid": "6229e8ff-3fc0-4e57-87e3-3698562c2d5b"
                },
                {
                  "exit_uuid": "58910718-c9b8-4eb6-b811-6f0378f337b6",
                  "name": "Yes",
                  "uuid": "9760df93-186e-4c22-b766-46642fda8a2e"
                },
                {
                  "exit_uuid": "2b1d855d-11ae-4939-a389-708b3d42939c",
                  "name": "No",
                  "uuid": "2714728c-47b4-450f-88dd-c6af2c658328"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "566f624d-67f0-401d-a31b-041638b2d2ba",
                "destination_uuid": null
              },
              {
                "uuid": "58910718-c9b8-4eb6-b811-6f0378f337b6",
                "destination_uuid": "3d7de069-c70d-41e3-a202-608b696a9367"
              },
              {
                "uuid": "2b1d855d-11ae-4939-a389-708b3d42939c",
                "destination_uuid": "0db18199-f495-4b47-ba46-edd2ba6d5183"
              }
            ]
          },
          {
            "uuid": "0db18199-f495-4b47-ba46-edd2ba6d5183",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b9addbd0-874e-4e63-8ff0-b65f75b1bf02"
              }
            ],
            "exits": [
              {
                "uuid": "21e9e596-483c-4e46-a33e-7e15bcb084af",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ee4b0512-2a43-41ef-9a15-6afb9f3ac78b",
            "actions": [
              {
                "uuid": "d6243f85-86fc-4153-be86-c727d0fc06e9",
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
                "uuid": "5d395bd6-8bb3-4dcf-92b4-e274fa25975d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5b13ddaa-fac0-41b4-a73c-3b120fb79091",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "38969e90-7d26-4ed0-b578-9c60bacfc8cd",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8d58c262-b888-42a4-994a-c826cbd88138"
              }
            ],
            "exits": [
              {
                "uuid": "fbca8336-7ef4-4644-9419-5de5d978f967",
                "destination_uuid": "aa3800a6-2385-405c-afc1-65587814b1ee"
              }
            ]
          },
          {
            "uuid": "3efcd0c9-f6e6-4328-a64f-4bfb63a3c19a",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5ddc1ea1-7043-41f1-9af5-c94aecad2391"
              }
            ],
            "exits": [
              {
                "uuid": "5b1875ee-9ed3-4647-9bcb-54751cf18195",
                "destination_uuid": "874ae0c5-6c60-453e-81b5-9fbe6e9a751b"
              }
            ]
          },
          {
            "uuid": "874ae0c5-6c60-453e-81b5-9fbe6e9a751b",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "00d80937-395b-4520-bdde-bea6a68b04ab"
              }
            ],
            "exits": [
              {
                "uuid": "87bf4e14-5176-4004-9801-adaaacd2d5b3",
                "destination_uuid": "f7d57d2a-4849-404c-b9e7-828e52300e3a"
              }
            ]
          },
          {
            "uuid": "f7d57d2a-4849-404c-b9e7-828e52300e3a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d5f1d67b-315a-46c0-a8d3-1f9ebbae0bd5",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "10028013-e53c-4c2f-912e-d46eeec8f093",
                  "type": "has_only_phrase",
                  "uuid": "fbb59445-07bf-43c2-b056-2cad6edbe667"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "10028013-e53c-4c2f-912e-d46eeec8f093",
                  "type": "has_only_phrase",
                  "uuid": "1dad4076-09ff-4ca7-8f7b-209ca449f321"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1e2d9faa-95eb-4df5-bdda-65bb83e96602",
                  "name": "All Responses",
                  "uuid": "d5f1d67b-315a-46c0-a8d3-1f9ebbae0bd5"
                },
                {
                  "exit_uuid": "602ae9ea-ac4b-427d-96b5-fc93c25f5abb",
                  "name": "image1; image2",
                  "uuid": "10028013-e53c-4c2f-912e-d46eeec8f093"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1e2d9faa-95eb-4df5-bdda-65bb83e96602",
                "destination_uuid": null
              },
              {
                "uuid": "602ae9ea-ac4b-427d-96b5-fc93c25f5abb",
                "destination_uuid": "4a9e084f-1b4e-4a43-8958-c888f7953bd5"
              }
            ]
          },
          {
            "uuid": "4a9e084f-1b4e-4a43-8958-c888f7953bd5",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "3658e47b-267d-4285-86f2-ee60e9d9cd91"
              }
            ],
            "exits": [
              {
                "uuid": "d115baf6-d98a-4f6b-b56d-2590a07c41e9",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "aa3800a6-2385-405c-afc1-65587814b1ee",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "26ab8e97-7c5c-4dad-8316-61eb44e6f3a4",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "b5312e80-64f6-47d0-9bca-9b72a666cdd5",
                  "type": "has_only_phrase",
                  "uuid": "c93d9cb1-2089-46d2-ad5f-55246bf77c5b"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "b5312e80-64f6-47d0-9bca-9b72a666cdd5",
                  "type": "has_only_phrase",
                  "uuid": "a54549bf-9148-4bf3-96f2-2b431007e192"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6c8b0a4a-667a-42b7-9ae6-8ef0babe3890",
                  "name": "All Responses",
                  "uuid": "26ab8e97-7c5c-4dad-8316-61eb44e6f3a4"
                },
                {
                  "exit_uuid": "0fa1457e-12c1-4a46-ab59-8a8b6f81184b",
                  "name": "image1; image2",
                  "uuid": "b5312e80-64f6-47d0-9bca-9b72a666cdd5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6c8b0a4a-667a-42b7-9ae6-8ef0babe3890",
                "destination_uuid": "3efcd0c9-f6e6-4328-a64f-4bfb63a3c19a"
              },
              {
                "uuid": "0fa1457e-12c1-4a46-ab59-8a8b6f81184b",
                "destination_uuid": "b89f25f2-3944-4b16-8799-730cfa0b4368"
              }
            ]
          },
          {
            "uuid": "b89f25f2-3944-4b16-8799-730cfa0b4368",
            "actions": [
              {
                "uuid": "c4feb525-209f-4ee4-9ed2-70832c34a2c9",
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
                "uuid": "b9aed02e-fd87-4a0c-a050-11fc2b6e7a4d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "2ef74e35-08b2-4117-9d81-9a2ed086f541",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "15814046-3f17-4d8e-967e-1659d7456718",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "84e5ffa8-528c-4f8e-9577-a8d0b9d7ef88"
              }
            ],
            "exits": [
              {
                "uuid": "2bfed00f-8e4e-40b7-89be-7c034f0de846",
                "destination_uuid": "3614f92d-5a1a-4c51-b591-97f9ae4a2333"
              }
            ]
          },
          {
            "uuid": "3614f92d-5a1a-4c51-b591-97f9ae4a2333",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a5fc6cc1-b284-49fc-afaa-9dc16dd2e207",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "f1ce2ebb-4b58-452c-b6ff-73bbd24eb58a",
                  "type": "has_only_phrase",
                  "uuid": "1c774a17-47c3-4622-9b5f-8831da2ad14c"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "c69d6a36-7284-48ba-83fe-3b0920b26c0f",
                  "type": "has_only_phrase",
                  "uuid": "30de1856-d5c3-49fe-ad67-fc23f3326ebe"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a4085437-3956-49d7-9796-73270c4fc318",
                  "name": "All Responses",
                  "uuid": "a5fc6cc1-b284-49fc-afaa-9dc16dd2e207"
                },
                {
                  "exit_uuid": "edcb5f24-d380-4f7f-abfb-d3a668a7ddd3",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "f1ce2ebb-4b58-452c-b6ff-73bbd24eb58a"
                },
                {
                  "exit_uuid": "b464c269-eaec-47b0-be2d-d23199f4b67c",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "c69d6a36-7284-48ba-83fe-3b0920b26c0f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a4085437-3956-49d7-9796-73270c4fc318",
                "destination_uuid": null
              },
              {
                "uuid": "edcb5f24-d380-4f7f-abfb-d3a668a7ddd3",
                "destination_uuid": "f7876bec-3178-4ede-b578-0c80a65aecfd"
              },
              {
                "uuid": "b464c269-eaec-47b0-be2d-d23199f4b67c",
                "destination_uuid": "8ec962f1-122d-4c87-9e2b-bf21a76b10b9"
              }
            ]
          },
          {
            "uuid": "f7876bec-3178-4ede-b578-0c80a65aecfd",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "6bd9976a-bcdc-4f94-a4e0-2a236cc33f73"
              }
            ],
            "exits": [
              {
                "uuid": "ccde6074-a84c-43bf-8a47-91f9c527a955",
                "destination_uuid": "80cdc502-a62c-4f89-b321-799b92a00adf"
              }
            ]
          },
          {
            "uuid": "8ec962f1-122d-4c87-9e2b-bf21a76b10b9",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "87ad8a79-5195-4a3c-81a5-daa4ca2b2a7c"
              }
            ],
            "exits": [
              {
                "uuid": "01f9d0e7-aec2-45d3-b4e2-3765a7e6f1ec",
                "destination_uuid": "80cdc502-a62c-4f89-b321-799b92a00adf"
              }
            ]
          },
          {
            "uuid": "80cdc502-a62c-4f89-b321-799b92a00adf",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "18c1aabe-291c-477d-aa80-4f67509de56f",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "368d58d5-ef5a-4d1c-9498-bbeff5d58f50",
                  "type": "has_only_phrase",
                  "uuid": "a66fef36-6a24-48f3-8b50-a78e5f9c3dd2"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "4ea41bb2-98db-4347-bd91-07b893164834",
                  "type": "has_only_phrase",
                  "uuid": "90f3a356-4bf4-4874-8a21-e9f42973dba1"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "7f065ddf-deb4-497e-a629-e10e0f7ad015",
                  "type": "has_only_phrase",
                  "uuid": "4b9d85f5-cd9e-46c5-84c6-238c302d8676"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4ffa1416-6948-4757-b1d9-2b8ef7fd7ff3",
                  "name": "All Responses",
                  "uuid": "18c1aabe-291c-477d-aa80-4f67509de56f"
                },
                {
                  "exit_uuid": "d981c2ac-a669-45ec-a715-7c81bcb473ad",
                  "name": "Hello",
                  "uuid": "368d58d5-ef5a-4d1c-9498-bbeff5d58f50"
                },
                {
                  "exit_uuid": "caf6b662-b8b4-4055-be65-c75fcb8bf0c7",
                  "name": "Goodbye",
                  "uuid": "4ea41bb2-98db-4347-bd91-07b893164834"
                },
                {
                  "exit_uuid": "286b9c43-0d81-42dc-92b3-6d5524d7b71d",
                  "name": "Goodbye",
                  "uuid": "7f065ddf-deb4-497e-a629-e10e0f7ad015"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4ffa1416-6948-4757-b1d9-2b8ef7fd7ff3",
                "destination_uuid": null
              },
              {
                "uuid": "d981c2ac-a669-45ec-a715-7c81bcb473ad",
                "destination_uuid": "856e937b-03ed-463a-8b4c-4f97d458aeb4"
              },
              {
                "uuid": "caf6b662-b8b4-4055-be65-c75fcb8bf0c7",
                "destination_uuid": "0fbc5e35-83df-4786-91da-81b23e251c6c"
              },
              {
                "uuid": "286b9c43-0d81-42dc-92b3-6d5524d7b71d",
                "destination_uuid": "0fbc5e35-83df-4786-91da-81b23e251c6c"
              }
            ]
          },
          {
            "uuid": "856e937b-03ed-463a-8b4c-4f97d458aeb4",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e9cdc158-9844-4a16-98bd-1d91b516c835"
              }
            ],
            "exits": [
              {
                "uuid": "e205c15d-a54e-40a2-b3f1-559bc0020422",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "0fbc5e35-83df-4786-91da-81b23e251c6c",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "72f79b24-5f9c-43e3-9789-944daa9f6236"
              }
            ],
            "exits": [
              {
                "uuid": "2ce05492-0229-46ca-a2ad-8ac57ffc7424",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "607ab859-6ef7-4071-9f70-92d5899ec9d2",
            "actions": [
              {
                "uuid": "afa50c16-9305-4e4d-ae3b-2acf6d27133c",
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
                "uuid": "5ab26292-05ef-4053-aae5-5b9b5d684b6d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "29cc8f44-39da-41e9-a2f2-161c57ac54d5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "84174f6b-2177-4849-8a38-5a17065eee5e",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f0c332f0-2c74-4f46-8853-307128978ae9"
              }
            ],
            "exits": [
              {
                "uuid": "38f786a7-f400-4af3-98f4-93211f74d16f",
                "destination_uuid": "b36390e1-3a80-48b7-a642-2ff0922e39f3"
              }
            ]
          },
          {
            "uuid": "b36390e1-3a80-48b7-a642-2ff0922e39f3",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "8075eb5f-c730-4092-b35b-5ca0ecf6fca9"
              }
            ],
            "exits": [
              {
                "uuid": "f27ef507-2147-4ac5-bed9-51d9749d0beb",
                "destination_uuid": "5f7e1263-fcad-4406-9b65-7605687f2cf3"
              }
            ]
          },
          {
            "uuid": "5f7e1263-fcad-4406-9b65-7605687f2cf3",
            "actions": [],
            "exits": [
              {
                "uuid": "8e4d219a-70ed-4f18-b211-88eb9ee0852e",
                "destination_uuid": "e3ea012a-a414-4509-86fc-df379e33fc71"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2ef2ddcc-5457-43e3-9e80-b6b810e68a06",
              "cases": [],
              "categories": [
                {
                  "uuid": "2ef2ddcc-5457-43e3-9e80-b6b810e68a06",
                  "name": "All Responses",
                  "exit_uuid": "8e4d219a-70ed-4f18-b211-88eb9ee0852e"
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
            "uuid": "e3ea012a-a414-4509-86fc-df379e33fc71",
            "actions": [
              {
                "uuid": "860e0fdd-c522-44e7-a675-7a381d64fe3a",
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
                "uuid": "e25fae5b-d22c-448d-97a9-262155be645e",
                "destination_uuid": "fc4e0e59-98b7-4d55-beba-3c777e031472"
              }
            ]
          },
          {
            "uuid": "fc4e0e59-98b7-4d55-beba-3c777e031472",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "dcc1ebc6-e5e3-491a-b894-f8861aa570e8",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "3334e979-0a68-4b2c-8460-8fe65fc4e625",
                  "type": "has_only_phrase",
                  "uuid": "3921c2d8-08d7-40d9-99c0-40ca293bbfff"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "1a2f1e30-2587-4701-96f7-3a52a73a19a6",
                  "type": "has_only_phrase",
                  "uuid": "2b3d4613-0066-436b-a041-2d5d05c89d2f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "33340a60-1f23-4e81-a0da-7990e6a22f16",
                  "name": "All Responses",
                  "uuid": "dcc1ebc6-e5e3-491a-b894-f8861aa570e8"
                },
                {
                  "exit_uuid": "2b3f5c35-3a40-492b-88ce-23dec465b41d",
                  "name": "1",
                  "uuid": "3334e979-0a68-4b2c-8460-8fe65fc4e625"
                },
                {
                  "exit_uuid": "2472ee55-ffbc-45dd-aac1-bf689ed705c9",
                  "name": "2",
                  "uuid": "1a2f1e30-2587-4701-96f7-3a52a73a19a6"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "33340a60-1f23-4e81-a0da-7990e6a22f16",
                "destination_uuid": "85abd927-5932-4bae-b110-700b2d05c257"
              },
              {
                "uuid": "2b3f5c35-3a40-492b-88ce-23dec465b41d",
                "destination_uuid": "015eba50-d423-4127-9731-8258e3faaaf1"
              },
              {
                "uuid": "2472ee55-ffbc-45dd-aac1-bf689ed705c9",
                "destination_uuid": "3e757683-d1c5-4615-a2a1-74314f443b58"
              }
            ]
          },
          {
            "uuid": "015eba50-d423-4127-9731-8258e3faaaf1",
            "actions": [
              {
                "uuid": "4e5ada3c-18e2-47c1-988c-0f77f97f07eb",
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
                "uuid": "3a503986-3519-448a-afbb-0f7fe4a054a2",
                "destination_uuid": "62aaf995-5e4a-4f41-b4e3-3c3b15804bc0"
              }
            ]
          },
          {
            "uuid": "3e757683-d1c5-4615-a2a1-74314f443b58",
            "actions": [
              {
                "uuid": "943bcee5-9799-498f-a90f-d45ecc87e9ee",
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
                "uuid": "8017283e-4238-414c-a1d5-cdaf8735406f",
                "destination_uuid": "4659619e-15ed-43f9-af48-26f8a70acb51"
              }
            ]
          },
          {
            "uuid": "85abd927-5932-4bae-b110-700b2d05c257",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8c4ee112-c81a-4663-a771-702446d48b9d"
              }
            ],
            "exits": [
              {
                "uuid": "4eae5213-8e21-4096-be5c-028d52c57e1f",
                "destination_uuid": "c0a97b05-0f4e-42ca-989f-99ba74a58045"
              }
            ]
          },
          {
            "uuid": "c0a97b05-0f4e-42ca-989f-99ba74a58045",
            "actions": [],
            "exits": [
              {
                "uuid": "95add954-8496-447b-b2e9-b557ca8d6b92",
                "destination_uuid": "c18516ef-930a-4a4c-971b-e855ba6f12f0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "442b7682-79cb-4bdd-b9d1-55a0e2330adc",
              "cases": [],
              "categories": [
                {
                  "uuid": "442b7682-79cb-4bdd-b9d1-55a0e2330adc",
                  "name": "All Responses",
                  "exit_uuid": "95add954-8496-447b-b2e9-b557ca8d6b92"
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
            "uuid": "c18516ef-930a-4a4c-971b-e855ba6f12f0",
            "actions": [
              {
                "uuid": "8e4b3462-e877-4736-8408-4cf06bc9c106",
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
                "uuid": "594eada8-9115-4ee7-a6d3-5cc8783c5187",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "62aaf995-5e4a-4f41-b4e3-3c3b15804bc0",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d4cff8c5-8439-4074-b1da-30c35b7da9c7"
              }
            ],
            "exits": [
              {
                "uuid": "34ae6723-5e14-4ebf-b3f9-a425ae2fa0ac",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "4659619e-15ed-43f9-af48-26f8a70acb51",
            "actions": [
              {
                "uuid": "ae57e944-60fa-40ad-ab4b-814edbcb4744",
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
                "uuid": "a5347865-11c8-4e67-9801-a06deab2a38f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "74060412-0ee1-4cca-b466-f3cd476876c6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e77ccd53-537a-4218-847b-8215bbc25b4c",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "28ea24b3-6536-4ff1-9e27-a2e1dd5b78dd"
              }
            ],
            "exits": [
              {
                "uuid": "1f985dfb-72df-469b-b613-ca352fe21f6c",
                "destination_uuid": "c8007299-6a01-41fa-bcd3-2f4c9a75d41d"
              }
            ]
          },
          {
            "uuid": "c8007299-6a01-41fa-bcd3-2f4c9a75d41d",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "782ad618-7dfe-47bb-ae69-7017a7efb27f"
              }
            ],
            "exits": [
              {
                "uuid": "290b8c97-a8bb-47bc-9dd3-0c04e6df9d45",
                "destination_uuid": "bf65f4d7-2065-485e-b91f-9a63209947ac"
              }
            ]
          },
          {
            "uuid": "bf65f4d7-2065-485e-b91f-9a63209947ac",
            "actions": [],
            "exits": [
              {
                "uuid": "41733d94-9bb4-4b79-ba77-9cc1c85c3b61",
                "destination_uuid": "6aa52d91-5fe8-4b68-8a26-66b3df5a32b8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2226060b-8f70-4498-88fc-7ff4f6f8f23a",
              "cases": [],
              "categories": [
                {
                  "uuid": "2226060b-8f70-4498-88fc-7ff4f6f8f23a",
                  "name": "All Responses",
                  "exit_uuid": "41733d94-9bb4-4b79-ba77-9cc1c85c3b61"
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
            "uuid": "6aa52d91-5fe8-4b68-8a26-66b3df5a32b8",
            "actions": [
              {
                "uuid": "61c303d8-8bcb-4850-8ee7-4ea4e5a484e4",
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
                "uuid": "1bdcfdae-cf02-43ac-8c74-92266fdcc442",
                "destination_uuid": "a3b943e3-3316-4b13-bc9a-a642f2a1e970"
              }
            ]
          },
          {
            "uuid": "a3b943e3-3316-4b13-bc9a-a642f2a1e970",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "07f151dd-6b3b-445c-875c-8c04179446f5"
                },
                "type": "enter_flow",
                "uuid": "6a04d618-e0f1-46d0-b52d-39f37375dd04"
              }
            ],
            "exits": [
              {
                "uuid": "d7e2b004-5b7a-44ef-bc0b-bf557142499e",
                "destination_uuid": "66a66953-fbe7-4a72-8253-1e302227e3db"
              },
              {
                "uuid": "b7aa593c-9140-47cb-8333-55bbdc302f25",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2a25d3dc-04f8-49f7-a58d-7d905458d975",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "cc7f03a6-5057-47f3-b7ac-3f3bad23bcca"
                },
                {
                  "uuid": "a6ffd6b7-e67f-49f5-8061-f15320e82459",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "3037ebd0-ef69-4897-aba1-15753d70418a"
                }
              ],
              "categories": [
                {
                  "uuid": "cc7f03a6-5057-47f3-b7ac-3f3bad23bcca",
                  "name": "Complete",
                  "exit_uuid": "d7e2b004-5b7a-44ef-bc0b-bf557142499e"
                },
                {
                  "uuid": "3037ebd0-ef69-4897-aba1-15753d70418a",
                  "name": "Expired",
                  "exit_uuid": "b7aa593c-9140-47cb-8333-55bbdc302f25"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "cc7f03a6-5057-47f3-b7ac-3f3bad23bcca"
            }
          },
          {
            "uuid": "66a66953-fbe7-4a72-8253-1e302227e3db",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "899ce061-cfe2-4521-8f79-aa2856a84a01"
              }
            ],
            "exits": [
              {
                "uuid": "76423ab2-c408-4def-810f-3b122789316c",
                "destination_uuid": "d1f23e99-b5f7-42b1-a91b-72bfbbe140aa"
              }
            ]
          },
          {
            "uuid": "d1f23e99-b5f7-42b1-a91b-72bfbbe140aa",
            "actions": [],
            "exits": [
              {
                "uuid": "07529f73-b87d-47d9-a10f-bca405d1a9eb",
                "destination_uuid": "7b845e27-f8b1-4fb7-91a5-80d855a264d4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "845040b9-6fd3-43d9-84f7-21df04052759",
              "cases": [],
              "categories": [
                {
                  "uuid": "845040b9-6fd3-43d9-84f7-21df04052759",
                  "name": "All Responses",
                  "exit_uuid": "07529f73-b87d-47d9-a10f-bca405d1a9eb"
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
            "uuid": "7b845e27-f8b1-4fb7-91a5-80d855a264d4",
            "actions": [
              {
                "uuid": "38ea36e8-86c9-415e-848b-8aaebd8942be",
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
                "uuid": "365dd84c-816f-4863-8176-0ee7a5b6dc29",
                "destination_uuid": "97057f8d-b0a7-4d92-ab95-a107886d968e"
              }
            ]
          },
          {
            "uuid": "97057f8d-b0a7-4d92-ab95-a107886d968e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ff9f2570-dea5-426e-8e3e-e07faf78115a",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "8ca96e8f-0e01-4403-983c-3ab9acf0af98",
                  "type": "has_only_phrase",
                  "uuid": "ca79ff66-3325-4f53-903f-9b302a0f1346"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "ac081bbb-baa7-4456-8fa4-44241571429a",
                  "type": "has_only_phrase",
                  "uuid": "9e518210-f623-4acd-9ebb-1ab02f91bae8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6be151fa-5462-447f-a8b0-955c07eaa6f9",
                  "name": "All Responses",
                  "uuid": "ff9f2570-dea5-426e-8e3e-e07faf78115a"
                },
                {
                  "exit_uuid": "828999a7-cdd4-4aa2-b8a5-a4b98dfb130e",
                  "name": "guide1",
                  "uuid": "8ca96e8f-0e01-4403-983c-3ab9acf0af98"
                },
                {
                  "exit_uuid": "8289324a-85a4-4738-a60c-c90388fab6f3",
                  "name": "guide2",
                  "uuid": "ac081bbb-baa7-4456-8fa4-44241571429a"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "6be151fa-5462-447f-a8b0-955c07eaa6f9",
                "destination_uuid": null
              },
              {
                "uuid": "828999a7-cdd4-4aa2-b8a5-a4b98dfb130e",
                "destination_uuid": "ac0e1233-5579-4a35-b7e1-60c60eb634fb"
              },
              {
                "uuid": "8289324a-85a4-4738-a60c-c90388fab6f3",
                "destination_uuid": "6c2a4f92-7573-453c-b564-cf4ad216f991"
              }
            ]
          },
          {
            "uuid": "ac0e1233-5579-4a35-b7e1-60c60eb634fb",
            "actions": [
              {
                "uuid": "c40d7a3f-b445-4359-af2f-7a470da87333",
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
                "uuid": "d3222a6c-c7b6-448f-804e-3f1160d76af0",
                "destination_uuid": "856862bc-3e1f-4d30-94ab-7acf600b9174"
              }
            ]
          },
          {
            "uuid": "6c2a4f92-7573-453c-b564-cf4ad216f991",
            "actions": [
              {
                "uuid": "557aaaf0-7c11-4afb-97c7-c1be03c984b5",
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
                "uuid": "9c4d0241-be5a-46a0-8a69-8d5f923bcb4b",
                "destination_uuid": "856862bc-3e1f-4d30-94ab-7acf600b9174"
              }
            ]
          },
          {
            "uuid": "856862bc-3e1f-4d30-94ab-7acf600b9174",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "34dcd2ba-17e1-4c7f-a228-baba0d09a331"
              }
            ],
            "exits": [
              {
                "uuid": "b2afa69d-5912-4fe2-9f0d-620a4665f53e",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "45794696-a595-4201-aa82-a8ef964690f6",
            "actions": [
              {
                "uuid": "d15a429d-bfd5-4562-9b56-ce4ed59edd3b",
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
                "uuid": "a1e44254-df59-4961-89c6-fe33ef0efc66",
                "destination_uuid": "0f2e2f03-9352-41a9-b79a-091c09d30546"
              }
            ]
          },
          {
            "uuid": "0f2e2f03-9352-41a9-b79a-091c09d30546",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "3c59d9f4-bcd8-4bbd-9501-1b92f2a3de13"
                },
                "type": "enter_flow",
                "uuid": "66c039ab-5dd5-4676-94bd-759236e1fb51"
              }
            ],
            "exits": [
              {
                "uuid": "4df8da8b-4ddb-4d99-9c5a-c84d93175480",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "477525dd-3317-4fe3-8862-b7357c848f52",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2491c211-58bb-4869-8163-e1fdfea7f0ad",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f7252df1-a875-4502-b906-0401dc69045d"
              }
            ],
            "exits": [
              {
                "uuid": "72e18039-5ee6-4c8a-8b93-73083c7fa167",
                "destination_uuid": "8091aefb-b2a5-4e62-abdb-36d2ef790ce4"
              }
            ]
          },
          {
            "uuid": "8091aefb-b2a5-4e62-abdb-36d2ef790ce4",
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
                "uuid": "bab15a87-805f-448d-a455-a3a5e35c22d9"
              }
            ],
            "exits": [
              {
                "uuid": "c6fee0fa-b764-4051-b2f5-cc5f772b658e",
                "destination_uuid": "fc1bbc54-17ef-455c-b0c3-d2c7fe1b8e29"
              }
            ]
          },
          {
            "uuid": "fc1bbc54-17ef-455c-b0c3-d2c7fe1b8e29",
            "actions": [],
            "exits": [
              {
                "uuid": "7a8bb9e1-f498-45e6-8ed4-d3f8866d2366",
                "destination_uuid": "53ae95d4-c85c-44a6-b2a9-aa136bbdcc68"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9bd1cf7e-c247-4aee-a907-d3062850d68b",
              "cases": [],
              "categories": [
                {
                  "uuid": "9bd1cf7e-c247-4aee-a907-d3062850d68b",
                  "name": "All Responses",
                  "exit_uuid": "7a8bb9e1-f498-45e6-8ed4-d3f8866d2366"
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
            "uuid": "53ae95d4-c85c-44a6-b2a9-aa136bbdcc68",
            "actions": [
              {
                "uuid": "6b3c6279-3028-4623-871f-e0170e253318",
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
                "uuid": "ffb82abc-7854-4052-a75c-c66b7d8c24a1",
                "destination_uuid": "99b4ef01-d043-4f85-b502-ae694fbbab1b"
              }
            ]
          },
          {
            "uuid": "99b4ef01-d043-4f85-b502-ae694fbbab1b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2dd44ad0-6d4b-4968-b4f5-86d2c4a6325f",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "e35006d9-3123-49b8-b186-2f6d600d1ca8",
                  "type": "has_only_phrase",
                  "uuid": "f347ad73-9e3c-4ab8-8e93-e06e24d32eb7"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "e35006d9-3123-49b8-b186-2f6d600d1ca8",
                  "type": "has_only_phrase",
                  "uuid": "b724808b-d437-408d-a465-ea70bb48bdb1"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "e35006d9-3123-49b8-b186-2f6d600d1ca8",
                  "type": "has_only_phrase",
                  "uuid": "7037e87d-0eca-4fd3-8371-b24cc524e852"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "e35006d9-3123-49b8-b186-2f6d600d1ca8",
                  "type": "has_only_phrase",
                  "uuid": "cb5ae1f7-8663-46ea-bf89-076b22138265"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "114c73e9-a089-4a98-b55a-50f9d780b800",
                  "type": "has_only_phrase",
                  "uuid": "fcebdffe-ac72-4034-ad2f-d64c7fde71ab"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "114c73e9-a089-4a98-b55a-50f9d780b800",
                  "type": "has_only_phrase",
                  "uuid": "a34ad00d-e21e-46f0-8176-24d71eddf59f"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "114c73e9-a089-4a98-b55a-50f9d780b800",
                  "type": "has_only_phrase",
                  "uuid": "8280327c-03e1-4fe3-97ce-697fdba96064"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "114c73e9-a089-4a98-b55a-50f9d780b800",
                  "type": "has_only_phrase",
                  "uuid": "84d9922b-d0ea-4a03-a5a1-8fe053e56b55"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c88c254e-f373-4679-981a-603cc43528af",
                  "name": "All Responses",
                  "uuid": "2dd44ad0-6d4b-4968-b4f5-86d2c4a6325f"
                },
                {
                  "exit_uuid": "22b42e3a-67b7-4bf5-846c-d1b02fdc6e95",
                  "name": "0;1;2;3",
                  "uuid": "e35006d9-3123-49b8-b186-2f6d600d1ca8"
                },
                {
                  "exit_uuid": "c5bf8712-502c-43f5-9531-974a464bf835",
                  "name": "4;5;6;7",
                  "uuid": "114c73e9-a089-4a98-b55a-50f9d780b800"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "c88c254e-f373-4679-981a-603cc43528af",
                "destination_uuid": null
              },
              {
                "uuid": "22b42e3a-67b7-4bf5-846c-d1b02fdc6e95",
                "destination_uuid": "16fb84c0-e262-46d8-b82c-ff31f9661c24"
              },
              {
                "uuid": "c5bf8712-502c-43f5-9531-974a464bf835",
                "destination_uuid": "8e0fb355-72cc-4e65-a892-bb469e440c66"
              }
            ]
          },
          {
            "uuid": "16fb84c0-e262-46d8-b82c-ff31f9661c24",
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
                "uuid": "32ae6293-c95b-4727-afb3-88c7d93c19eb"
              }
            ],
            "exits": [
              {
                "uuid": "c5b26454-5698-470c-8cfb-d85ff0061d88",
                "destination_uuid": "d0fa45ca-a8d7-4962-97e9-530b6a2b7d18"
              }
            ]
          },
          {
            "uuid": "8e0fb355-72cc-4e65-a892-bb469e440c66",
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
                "uuid": "3d252926-1718-4e1b-aabe-03838ff2cc4e"
              }
            ],
            "exits": [
              {
                "uuid": "95bc0f45-40a5-45cd-b1ab-a104893089e0",
                "destination_uuid": "d0fa45ca-a8d7-4962-97e9-530b6a2b7d18"
              }
            ]
          },
          {
            "uuid": "d0fa45ca-a8d7-4962-97e9-530b6a2b7d18",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8f7ea1f0-7e07-4612-ab1e-e59799431ea5",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "87a170ef-0dc9-4b19-ae32-3f5481b7bfbc",
                  "type": "has_only_phrase",
                  "uuid": "f64d4d10-0413-4e59-962e-08ae744309d9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a0282a90-aff6-413c-b4a8-022aef4d998c",
                  "name": "All Responses",
                  "uuid": "8f7ea1f0-7e07-4612-ab1e-e59799431ea5"
                },
                {
                  "exit_uuid": "e1560a59-a61d-489f-a36c-f6c8fcfed434",
                  "name": "Next",
                  "uuid": "87a170ef-0dc9-4b19-ae32-3f5481b7bfbc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a0282a90-aff6-413c-b4a8-022aef4d998c",
                "destination_uuid": null
              },
              {
                "uuid": "e1560a59-a61d-489f-a36c-f6c8fcfed434",
                "destination_uuid": "26d7ba31-3acb-436a-ac97-7ee8d86b6c97"
              }
            ]
          },
          {
            "uuid": "26d7ba31-3acb-436a-ac97-7ee8d86b6c97",
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
                "uuid": "adf54e73-4f02-43ed-92cb-fba49b3e08a2"
              }
            ],
            "exits": [
              {
                "uuid": "986a79cd-88f5-43f6-97f5-f06d2ffdede3",
                "destination_uuid": "408296a2-bb69-4a35-8775-0fa483caa00f"
              }
            ]
          },
          {
            "uuid": "408296a2-bb69-4a35-8775-0fa483caa00f",
            "actions": [],
            "exits": [
              {
                "uuid": "379fd16d-2e8e-4683-9ba2-c606dea7a014",
                "destination_uuid": "c44ff7de-bd97-4de0-8ba9-24560fc8c795"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "17f3c0e2-223e-405b-a6c5-7cce62fab35e",
              "cases": [],
              "categories": [
                {
                  "uuid": "17f3c0e2-223e-405b-a6c5-7cce62fab35e",
                  "name": "All Responses",
                  "exit_uuid": "379fd16d-2e8e-4683-9ba2-c606dea7a014"
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
            "uuid": "c44ff7de-bd97-4de0-8ba9-24560fc8c795",
            "actions": [
              {
                "uuid": "4e0e5c30-6645-4143-a851-b2d91b586171",
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
                "uuid": "274fe4fc-ed83-4625-a43c-8eabc0dc0ecf",
                "destination_uuid": "3ce08b25-651f-45b1-8e50-ec395f2ee5e0"
              }
            ]
          },
          {
            "uuid": "3ce08b25-651f-45b1-8e50-ec395f2ee5e0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f437fd27-38a7-42e6-9729-44300441d2c7",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "d9e79673-d9e1-458f-ad29-8c1fed7f867a",
                  "type": "has_only_phrase",
                  "uuid": "8674ca63-25b8-46c7-9f71-de83a0ef43d3"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "d9e79673-d9e1-458f-ad29-8c1fed7f867a",
                  "type": "has_only_phrase",
                  "uuid": "07452cf4-3e40-47f2-955c-c7190087828f"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "d9e79673-d9e1-458f-ad29-8c1fed7f867a",
                  "type": "has_only_phrase",
                  "uuid": "fea81724-8646-43e0-bdbc-266b66389f3f"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "d9e79673-d9e1-458f-ad29-8c1fed7f867a",
                  "type": "has_only_phrase",
                  "uuid": "bf0604e2-d923-4b99-a06e-ebb5b5967394"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "d9e79673-d9e1-458f-ad29-8c1fed7f867a",
                  "type": "has_only_phrase",
                  "uuid": "3f2c1621-9d43-4453-9302-1852716280c2"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "4d84359d-0946-428c-b1aa-2d49e5c2785d",
                  "type": "has_only_phrase",
                  "uuid": "63b883b4-bf3f-4c8e-b75f-e9720ffd9eef"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "4d84359d-0946-428c-b1aa-2d49e5c2785d",
                  "type": "has_only_phrase",
                  "uuid": "c79a1892-3edd-4775-bda4-e23e689101ed"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "4d84359d-0946-428c-b1aa-2d49e5c2785d",
                  "type": "has_only_phrase",
                  "uuid": "3eb59b45-4520-4735-8cea-f37ed6114d91"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "4d84359d-0946-428c-b1aa-2d49e5c2785d",
                  "type": "has_only_phrase",
                  "uuid": "51507d93-f326-4041-a9d2-45a15f770bd8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ce7ceb1d-11c7-4434-8d7b-2dd06142d81e",
                  "name": "All Responses",
                  "uuid": "f437fd27-38a7-42e6-9729-44300441d2c7"
                },
                {
                  "exit_uuid": "60dc6f7c-72a0-4c5e-84af-6b2698c76f9a",
                  "name": "0;1;2;3;4",
                  "uuid": "d9e79673-d9e1-458f-ad29-8c1fed7f867a"
                },
                {
                  "exit_uuid": "17c49cbc-da87-449c-832e-7e4be8bc9d0a",
                  "name": "5;6;7;8",
                  "uuid": "4d84359d-0946-428c-b1aa-2d49e5c2785d"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "ce7ceb1d-11c7-4434-8d7b-2dd06142d81e",
                "destination_uuid": null
              },
              {
                "uuid": "60dc6f7c-72a0-4c5e-84af-6b2698c76f9a",
                "destination_uuid": "43ef6308-bfed-4812-9fdb-78d77c8376bc"
              },
              {
                "uuid": "17c49cbc-da87-449c-832e-7e4be8bc9d0a",
                "destination_uuid": "764826ca-140b-4632-9175-0f9bcf84746a"
              }
            ]
          },
          {
            "uuid": "43ef6308-bfed-4812-9fdb-78d77c8376bc",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "87a2fb3f-aae1-41b2-b6b7-8193edf9c339"
              }
            ],
            "exits": [
              {
                "uuid": "b688989c-90e0-4e3a-832d-1690b1aa1182",
                "destination_uuid": "26202646-2734-43a1-a15f-2cba2306c46f"
              }
            ]
          },
          {
            "uuid": "764826ca-140b-4632-9175-0f9bcf84746a",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "060dc69a-3ae7-4444-8d8a-814cadc71e90"
              }
            ],
            "exits": [
              {
                "uuid": "57db69e9-830c-4caf-89f7-5fdc5041b915",
                "destination_uuid": "26202646-2734-43a1-a15f-2cba2306c46f"
              }
            ]
          },
          {
            "uuid": "26202646-2734-43a1-a15f-2cba2306c46f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1c35c423-e7e2-4a1e-8942-83add50caed3",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "e1c85239-8c86-4d1a-a31e-616c063f80d4",
                  "type": "has_only_phrase",
                  "uuid": "76e1fc80-1e88-4e0b-a0c8-7d2cae11f324"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "188eb68a-eb3e-4e62-a091-5b4a4fbdcca2",
                  "name": "All Responses",
                  "uuid": "1c35c423-e7e2-4a1e-8942-83add50caed3"
                },
                {
                  "exit_uuid": "a8429bfc-8efc-4434-b4dd-616bb3c45a83",
                  "name": "Next",
                  "uuid": "e1c85239-8c86-4d1a-a31e-616c063f80d4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "188eb68a-eb3e-4e62-a091-5b4a4fbdcca2",
                "destination_uuid": null
              },
              {
                "uuid": "a8429bfc-8efc-4434-b4dd-616bb3c45a83",
                "destination_uuid": "44b2af3e-fd7f-4f83-9fe1-fdd879013346"
              }
            ]
          },
          {
            "uuid": "44b2af3e-fd7f-4f83-9fe1-fdd879013346",
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
                "uuid": "3dfa6902-dcf7-4218-b676-ffb51772b43d"
              }
            ],
            "exits": [
              {
                "uuid": "bda4042e-ad01-4aa5-b6a7-235a13b20786",
                "destination_uuid": "2be93d42-e168-4c19-9791-cc159e917f63"
              }
            ]
          },
          {
            "uuid": "2be93d42-e168-4c19-9791-cc159e917f63",
            "actions": [],
            "exits": [
              {
                "uuid": "c3aaa73c-ec27-498f-8df0-3c13d04de01a",
                "destination_uuid": "07fed491-0f63-4c52-87dc-b23b66526e47"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d8a47bf7-5256-414e-8652-64c4632ed9d6",
              "cases": [],
              "categories": [
                {
                  "uuid": "d8a47bf7-5256-414e-8652-64c4632ed9d6",
                  "name": "All Responses",
                  "exit_uuid": "c3aaa73c-ec27-498f-8df0-3c13d04de01a"
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
            "uuid": "07fed491-0f63-4c52-87dc-b23b66526e47",
            "actions": [
              {
                "uuid": "1241289d-8991-49b1-a0e5-5a39bb7d0260",
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
                "uuid": "5885d41f-8be7-405e-8d00-67d29dcc7746",
                "destination_uuid": "c5d5d6ac-0b69-4e13-ae58-620ed2382f71"
              }
            ]
          },
          {
            "uuid": "c5d5d6ac-0b69-4e13-ae58-620ed2382f71",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4aaf7e5a-1acf-4519-9450-da2bbd5e12e5",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "bf26ad08-e4a2-4305-9f61-fdac0fc60d35",
                  "type": "has_only_phrase",
                  "uuid": "60fd1a1e-1f0e-4a96-b93f-d8d7faa95ef9"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "bf26ad08-e4a2-4305-9f61-fdac0fc60d35",
                  "type": "has_only_phrase",
                  "uuid": "a8bc498a-c432-419d-81a6-55c1880e33f4"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "bf26ad08-e4a2-4305-9f61-fdac0fc60d35",
                  "type": "has_only_phrase",
                  "uuid": "15b7a996-ef13-4c11-953c-bf45db51533c"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "819c1711-a163-4ef8-a842-56d7387f8508",
                  "type": "has_only_phrase",
                  "uuid": "413cddc2-a1db-4cf5-b632-55f474660fc0"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "819c1711-a163-4ef8-a842-56d7387f8508",
                  "type": "has_only_phrase",
                  "uuid": "1306cfc5-e015-4fc8-a41f-873137b07f87"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "819c1711-a163-4ef8-a842-56d7387f8508",
                  "type": "has_only_phrase",
                  "uuid": "72198cb3-a859-4d36-b087-6bb610584f92"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "819c1711-a163-4ef8-a842-56d7387f8508",
                  "type": "has_only_phrase",
                  "uuid": "81009df3-a91c-4678-9802-ab3c52363106"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "819c1711-a163-4ef8-a842-56d7387f8508",
                  "type": "has_only_phrase",
                  "uuid": "ac8e0b16-7666-4185-8936-d625c674cb72"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c6f40f7d-3606-4a76-9b90-fc25297a4b47",
                  "name": "All Responses",
                  "uuid": "4aaf7e5a-1acf-4519-9450-da2bbd5e12e5"
                },
                {
                  "exit_uuid": "5b6b1d62-d05a-4057-aba5-f767612e7721",
                  "name": "0;1;2",
                  "uuid": "bf26ad08-e4a2-4305-9f61-fdac0fc60d35"
                },
                {
                  "exit_uuid": "8ba41476-fcce-4e1e-8d49-49c333fe5021",
                  "name": "3;4;5;6;7",
                  "uuid": "819c1711-a163-4ef8-a842-56d7387f8508"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "c6f40f7d-3606-4a76-9b90-fc25297a4b47",
                "destination_uuid": null
              },
              {
                "uuid": "5b6b1d62-d05a-4057-aba5-f767612e7721",
                "destination_uuid": "779ee74e-bca2-4320-96e5-b6ee9a13b46a"
              },
              {
                "uuid": "8ba41476-fcce-4e1e-8d49-49c333fe5021",
                "destination_uuid": "8c47ac20-072d-48f9-baa1-8af5de08bd3e"
              }
            ]
          },
          {
            "uuid": "779ee74e-bca2-4320-96e5-b6ee9a13b46a",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "81acfa92-09c5-4ebe-b291-219a77195864"
              }
            ],
            "exits": [
              {
                "uuid": "ab130b69-1362-43d0-9dea-03970d910958",
                "destination_uuid": "04b5a5fb-262b-40ce-931a-10ddfa4bdece"
              }
            ]
          },
          {
            "uuid": "8c47ac20-072d-48f9-baa1-8af5de08bd3e",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6c9552f3-2eca-4c35-b57b-dbabec0c51ad"
              }
            ],
            "exits": [
              {
                "uuid": "bec30dd1-9247-4e59-9819-1bdb581846b2",
                "destination_uuid": "04b5a5fb-262b-40ce-931a-10ddfa4bdece"
              }
            ]
          },
          {
            "uuid": "04b5a5fb-262b-40ce-931a-10ddfa4bdece",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5a7ea534-acba-43e7-9efa-b331cb7d3e9e",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "3c6f2309-5e04-49e6-bef3-983b410f9f6d",
                  "type": "has_only_phrase",
                  "uuid": "9d63db15-a9de-4599-8a91-1eab8d089e27"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7d22df3c-58d1-42af-bf7f-b1ac878c287a",
                  "name": "All Responses",
                  "uuid": "5a7ea534-acba-43e7-9efa-b331cb7d3e9e"
                },
                {
                  "exit_uuid": "1d5451f6-cfa7-4eeb-b685-9135c94581e6",
                  "name": "Next",
                  "uuid": "3c6f2309-5e04-49e6-bef3-983b410f9f6d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7d22df3c-58d1-42af-bf7f-b1ac878c287a",
                "destination_uuid": null
              },
              {
                "uuid": "1d5451f6-cfa7-4eeb-b685-9135c94581e6",
                "destination_uuid": "7df4aeda-e85f-4972-9b27-9c7a509050b0"
              }
            ]
          },
          {
            "uuid": "7df4aeda-e85f-4972-9b27-9c7a509050b0",
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
                "uuid": "5dca1c13-5b89-4f5b-b093-55f67f34cb71"
              }
            ],
            "exits": [
              {
                "uuid": "66138ac0-6abd-45d4-8390-9bed218ccb08",
                "destination_uuid": "04f6e587-8f85-4ca3-8bae-cd9df3b4ed41"
              }
            ]
          },
          {
            "uuid": "04f6e587-8f85-4ca3-8bae-cd9df3b4ed41",
            "actions": [],
            "exits": [
              {
                "uuid": "5b255469-23ad-4cb5-9cab-08eaba73871c",
                "destination_uuid": "bd94d752-b8c5-401b-a013-9552973d1616"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "956218a5-6be5-4fd1-a5ad-b05c7e3967cf",
              "cases": [],
              "categories": [
                {
                  "uuid": "956218a5-6be5-4fd1-a5ad-b05c7e3967cf",
                  "name": "All Responses",
                  "exit_uuid": "5b255469-23ad-4cb5-9cab-08eaba73871c"
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
            "uuid": "bd94d752-b8c5-401b-a013-9552973d1616",
            "actions": [
              {
                "uuid": "a06ebced-55b4-4cec-9a39-27e42314d432",
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
                "uuid": "3e57d5a8-7deb-47b1-a463-248c458de9b3",
                "destination_uuid": "02ac82bf-02d4-4a2b-8f2f-7e109d994c78"
              }
            ]
          },
          {
            "uuid": "02ac82bf-02d4-4a2b-8f2f-7e109d994c78",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0389c7f5-af35-4810-827b-c232651b83dd",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "0c70362d-1dde-407e-b5a8-d495fc51a1e1",
                  "type": "has_only_phrase",
                  "uuid": "ca0767a1-d2af-4a99-b74d-c7f25c1e8173"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "0c70362d-1dde-407e-b5a8-d495fc51a1e1",
                  "type": "has_only_phrase",
                  "uuid": "0e0db02d-4177-4709-a5a0-0158c0460db4"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "b2887fba-d640-4a81-b9e8-5955a9e10c67",
                  "type": "has_only_phrase",
                  "uuid": "43f7c6bb-a2f2-4a94-a942-d1410b2e4604"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "b2887fba-d640-4a81-b9e8-5955a9e10c67",
                  "type": "has_only_phrase",
                  "uuid": "2dfaaa77-df23-43e1-8796-72865ef85c8e"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "b2887fba-d640-4a81-b9e8-5955a9e10c67",
                  "type": "has_only_phrase",
                  "uuid": "4b0061c6-db29-4d3e-9979-a9a6c1d540b6"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "b2887fba-d640-4a81-b9e8-5955a9e10c67",
                  "type": "has_only_phrase",
                  "uuid": "36c772c7-70bf-4eb2-8884-696b7773b0dc"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "b2887fba-d640-4a81-b9e8-5955a9e10c67",
                  "type": "has_only_phrase",
                  "uuid": "e69670fa-b374-4703-a612-347b013cdae9"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "b2887fba-d640-4a81-b9e8-5955a9e10c67",
                  "type": "has_only_phrase",
                  "uuid": "619187aa-3989-4c11-acc3-8fad873bc5d0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cddd5133-1e93-4a81-94c5-9bcfad0c5764",
                  "name": "All Responses",
                  "uuid": "0389c7f5-af35-4810-827b-c232651b83dd"
                },
                {
                  "exit_uuid": "02365987-6860-44cf-9405-09d7b2c23c98",
                  "name": "0;1",
                  "uuid": "0c70362d-1dde-407e-b5a8-d495fc51a1e1"
                },
                {
                  "exit_uuid": "850ca298-9365-42ee-9577-f97b68d82ff1",
                  "name": "2;3;4;5;6;7",
                  "uuid": "b2887fba-d640-4a81-b9e8-5955a9e10c67"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "cddd5133-1e93-4a81-94c5-9bcfad0c5764",
                "destination_uuid": null
              },
              {
                "uuid": "02365987-6860-44cf-9405-09d7b2c23c98",
                "destination_uuid": "dbee803a-dec3-45ce-b4e1-6099dcc6cef9"
              },
              {
                "uuid": "850ca298-9365-42ee-9577-f97b68d82ff1",
                "destination_uuid": "442f9273-31cf-4d7f-9df9-cdfd5eaa8317"
              }
            ]
          },
          {
            "uuid": "dbee803a-dec3-45ce-b4e1-6099dcc6cef9",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "2d556008-7309-4ec5-bbd0-0053beea25a2"
              }
            ],
            "exits": [
              {
                "uuid": "919d8cec-a677-4005-9f71-f3bcdda939ec",
                "destination_uuid": "8ddee5ba-f035-4b0d-8e65-a36593a4c724"
              }
            ]
          },
          {
            "uuid": "442f9273-31cf-4d7f-9df9-cdfd5eaa8317",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "07b51c32-cfb3-4501-ab59-baab1a380281"
              }
            ],
            "exits": [
              {
                "uuid": "5272b072-ff61-4767-810b-9983608be705",
                "destination_uuid": "8ddee5ba-f035-4b0d-8e65-a36593a4c724"
              }
            ]
          },
          {
            "uuid": "8ddee5ba-f035-4b0d-8e65-a36593a4c724",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "eef39beb-ce56-4622-a331-8d57a906a8a9",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "934de86f-e388-48ea-9ee9-85517f7164b1",
                  "type": "has_only_phrase",
                  "uuid": "04021738-995a-4b53-9e53-403fec1b6754"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "12ed7d28-93ae-48c9-898e-0b939b5267fa",
                  "name": "All Responses",
                  "uuid": "eef39beb-ce56-4622-a331-8d57a906a8a9"
                },
                {
                  "exit_uuid": "e6b6a32d-c340-45d3-8abc-07c55948a976",
                  "name": "Next",
                  "uuid": "934de86f-e388-48ea-9ee9-85517f7164b1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "12ed7d28-93ae-48c9-898e-0b939b5267fa",
                "destination_uuid": null
              },
              {
                "uuid": "e6b6a32d-c340-45d3-8abc-07c55948a976",
                "destination_uuid": "113bdec9-bb34-453a-bdca-b39d27a59059"
              }
            ]
          },
          {
            "uuid": "113bdec9-bb34-453a-bdca-b39d27a59059",
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
                "uuid": "232cf29b-417d-4f4d-a7fa-c33f956c371d"
              }
            ],
            "exits": [
              {
                "uuid": "dc03427b-5393-4074-bd9c-1a9302b64127",
                "destination_uuid": "daef559f-1fe1-41df-b65a-a635e1ca337d"
              }
            ]
          },
          {
            "uuid": "daef559f-1fe1-41df-b65a-a635e1ca337d",
            "actions": [],
            "exits": [
              {
                "uuid": "c5f66d61-215c-4d7c-a8df-b2651d8c1eb1",
                "destination_uuid": "6f1abbfd-2436-463f-afd8-803a332d5c50"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e1bd8720-9284-40d7-84ba-01d68d45d8cc",
              "cases": [],
              "categories": [
                {
                  "uuid": "e1bd8720-9284-40d7-84ba-01d68d45d8cc",
                  "name": "All Responses",
                  "exit_uuid": "c5f66d61-215c-4d7c-a8df-b2651d8c1eb1"
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
            "uuid": "6f1abbfd-2436-463f-afd8-803a332d5c50",
            "actions": [
              {
                "uuid": "f29289e7-e582-46b2-a12b-f4a1dc9d76bb",
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
                "uuid": "563631a7-09db-4bd3-9931-88d85b6944bf",
                "destination_uuid": "b7cb5399-bb52-479c-92de-19d7e1d0d99a"
              }
            ]
          },
          {
            "uuid": "f4ce8510-1ac9-441e-a067-5e24dd51e70f",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "a70a96c2-2d22-43a5-a27e-c1c908b08f37"
              }
            ],
            "exits": [
              {
                "uuid": "c2e4f64f-c6df-414b-bd4b-051827e3ea2f",
                "destination_uuid": "cefffa89-11ab-4fe5-9539-f3dd6ac4b9f8"
              }
            ]
          },
          {
            "uuid": "b7cb5399-bb52-479c-92de-19d7e1d0d99a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "eb503607-47e4-4de9-9331-ce84e1aee7d4",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "0151b281-c3ba-44ba-a940-347aab705031",
                  "type": "has_only_phrase",
                  "uuid": "31f9ab06-2842-434a-b98e-3206daaadc4c"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "0151b281-c3ba-44ba-a940-347aab705031",
                  "type": "has_only_phrase",
                  "uuid": "41c4f6c8-9aa9-440f-8345-2276b1eacc3d"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "0151b281-c3ba-44ba-a940-347aab705031",
                  "type": "has_only_phrase",
                  "uuid": "0f972c46-539d-49cf-882d-097627612eeb"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "0151b281-c3ba-44ba-a940-347aab705031",
                  "type": "has_only_phrase",
                  "uuid": "ac74a306-0753-4f73-b760-41b32ff78270"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "0151b281-c3ba-44ba-a940-347aab705031",
                  "type": "has_only_phrase",
                  "uuid": "f1ba3d98-2863-4652-8401-48457cbeadb6"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "0151b281-c3ba-44ba-a940-347aab705031",
                  "type": "has_only_phrase",
                  "uuid": "0b283d45-4cad-480d-b12a-a3e2b0c654b4"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "0151b281-c3ba-44ba-a940-347aab705031",
                  "type": "has_only_phrase",
                  "uuid": "e8dfbaab-71bd-4b46-8d20-0a5d384a1df7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dcdd8f24-0ec6-41f9-95ca-65809c27e5b8",
                  "name": "All Responses",
                  "uuid": "eb503607-47e4-4de9-9331-ce84e1aee7d4"
                },
                {
                  "exit_uuid": "de35b94f-dca4-44a4-9ca5-c6d8326f1dde",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "0151b281-c3ba-44ba-a940-347aab705031"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "dcdd8f24-0ec6-41f9-95ca-65809c27e5b8",
                "destination_uuid": "f4ce8510-1ac9-441e-a067-5e24dd51e70f"
              },
              {
                "uuid": "de35b94f-dca4-44a4-9ca5-c6d8326f1dde",
                "destination_uuid": "361da2b0-b611-4156-a9c2-6396ab1d72a8"
              }
            ]
          },
          {
            "uuid": "361da2b0-b611-4156-a9c2-6396ab1d72a8",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "ef1f9e4f-a965-452e-8fca-b7c04cc1e2d2"
              }
            ],
            "exits": [
              {
                "uuid": "b9d9d832-43a1-4d9b-a540-bd68d41e5024",
                "destination_uuid": "cefffa89-11ab-4fe5-9539-f3dd6ac4b9f8"
              }
            ]
          },
          {
            "uuid": "cefffa89-11ab-4fe5-9539-f3dd6ac4b9f8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f33f17a3-b6eb-4f74-90ed-1e3cf7ce0f3a",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "bfd8bc98-cedc-4bf0-8343-722757bb732a",
                  "type": "has_only_phrase",
                  "uuid": "316049f4-2b1a-4519-851d-b54c81d10117"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "89fcb1c3-2488-4db3-aae0-c8efec048e77",
                  "name": "All Responses",
                  "uuid": "f33f17a3-b6eb-4f74-90ed-1e3cf7ce0f3a"
                },
                {
                  "exit_uuid": "e29e2ecd-2915-4a78-b4ad-5094c057f104",
                  "name": "Next",
                  "uuid": "bfd8bc98-cedc-4bf0-8343-722757bb732a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "89fcb1c3-2488-4db3-aae0-c8efec048e77",
                "destination_uuid": null
              },
              {
                "uuid": "e29e2ecd-2915-4a78-b4ad-5094c057f104",
                "destination_uuid": "ce1ef2e2-90ea-4f9b-8048-2ea3c1888226"
              }
            ]
          },
          {
            "uuid": "ce1ef2e2-90ea-4f9b-8048-2ea3c1888226",
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
                "uuid": "9ffdc6b7-a0d6-4b4c-a050-2fda60fd2249"
              }
            ],
            "exits": [
              {
                "uuid": "b11399a4-2ffb-483e-aeda-e3c10765a8bc",
                "destination_uuid": "8e747523-dab0-4437-8845-f325725d63d7"
              }
            ]
          },
          {
            "uuid": "8e747523-dab0-4437-8845-f325725d63d7",
            "actions": [],
            "exits": [
              {
                "uuid": "d7ca41ff-98db-4888-b521-e9837e0a06cf",
                "destination_uuid": "aac3367f-ce2b-4fc7-94cb-5f32edcbfbfc"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e61c445e-7437-4637-9ef6-84d17ecaddd1",
              "cases": [],
              "categories": [
                {
                  "uuid": "e61c445e-7437-4637-9ef6-84d17ecaddd1",
                  "name": "All Responses",
                  "exit_uuid": "d7ca41ff-98db-4888-b521-e9837e0a06cf"
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
            "uuid": "aac3367f-ce2b-4fc7-94cb-5f32edcbfbfc",
            "actions": [
              {
                "uuid": "c5af2079-bb8f-44a0-a350-c8fe444f8e85",
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
                "uuid": "8e9f4d83-5472-4de6-a2e4-667d57963225",
                "destination_uuid": "434b3f42-38fb-49bb-b44e-9792594b9068"
              }
            ]
          },
          {
            "uuid": "434b3f42-38fb-49bb-b44e-9792594b9068",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b2f3e61b-a443-41d9-bd86-17b11683bfac",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "e906ad6f-16dc-4cb3-92e7-2f335ebb92f0",
                  "type": "has_only_phrase",
                  "uuid": "9155a907-a934-4e34-8690-68450ecb7aa1"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "e906ad6f-16dc-4cb3-92e7-2f335ebb92f0",
                  "type": "has_only_phrase",
                  "uuid": "f157f6fd-4bfe-4ab8-89b1-da838422fb88"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "e906ad6f-16dc-4cb3-92e7-2f335ebb92f0",
                  "type": "has_only_phrase",
                  "uuid": "187ae976-8bdd-425a-b079-ec0b1a88ae58"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "e906ad6f-16dc-4cb3-92e7-2f335ebb92f0",
                  "type": "has_only_phrase",
                  "uuid": "fbbe7269-c6c1-49cb-9f5d-84d629897d91"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "e906ad6f-16dc-4cb3-92e7-2f335ebb92f0",
                  "type": "has_only_phrase",
                  "uuid": "8f8f9a20-7cef-4833-a351-f449ccc49518"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "94ab49e4-e6d7-4de8-9f89-4fb16a2e65bd",
                  "type": "has_only_phrase",
                  "uuid": "9ce5d932-6c1e-4c3c-8376-510de37c3d8a"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "94ab49e4-e6d7-4de8-9f89-4fb16a2e65bd",
                  "type": "has_only_phrase",
                  "uuid": "f999c6de-0be9-40ae-a409-8a24edef2a8b"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "94ab49e4-e6d7-4de8-9f89-4fb16a2e65bd",
                  "type": "has_only_phrase",
                  "uuid": "16e5650a-2ab3-49c9-8994-fc7f3dbbb698"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "94ab49e4-e6d7-4de8-9f89-4fb16a2e65bd",
                  "type": "has_only_phrase",
                  "uuid": "e1e81540-8aaf-495a-b2b1-7526fd5039e1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6a38785c-5891-4b07-8784-422b808a38b3",
                  "name": "All Responses",
                  "uuid": "b2f3e61b-a443-41d9-bd86-17b11683bfac"
                },
                {
                  "exit_uuid": "0cc67c2e-6a71-4a8a-832d-6f8e259d34a8",
                  "name": "0;1;2;3;4",
                  "uuid": "e906ad6f-16dc-4cb3-92e7-2f335ebb92f0"
                },
                {
                  "exit_uuid": "c3d7a77c-97d8-4db8-a4d2-3a982008b46b",
                  "name": "5;6;7;8",
                  "uuid": "94ab49e4-e6d7-4de8-9f89-4fb16a2e65bd"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "6a38785c-5891-4b07-8784-422b808a38b3",
                "destination_uuid": null
              },
              {
                "uuid": "0cc67c2e-6a71-4a8a-832d-6f8e259d34a8",
                "destination_uuid": "8d99c77d-a44f-49bb-a85d-6ebd741fa266"
              },
              {
                "uuid": "c3d7a77c-97d8-4db8-a4d2-3a982008b46b",
                "destination_uuid": "5bac9374-aff7-46c7-9957-b253382f803f"
              }
            ]
          },
          {
            "uuid": "8d99c77d-a44f-49bb-a85d-6ebd741fa266",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "e9567e71-60f6-4c73-9f30-1d3382f7aadb"
              }
            ],
            "exits": [
              {
                "uuid": "2d0b03aa-8069-4d34-b899-409f76ee3b33",
                "destination_uuid": "d0df47ae-0eca-40d2-85cd-2cbef1d91260"
              }
            ]
          },
          {
            "uuid": "5bac9374-aff7-46c7-9957-b253382f803f",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "14bb8d02-c4cd-4593-b135-44f9e5843353"
              }
            ],
            "exits": [
              {
                "uuid": "b03ac264-9c67-478a-bc81-8a958695c985",
                "destination_uuid": "d0df47ae-0eca-40d2-85cd-2cbef1d91260"
              }
            ]
          },
          {
            "uuid": "d0df47ae-0eca-40d2-85cd-2cbef1d91260",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a91acf9d-a565-40cb-869f-7a0a6eb40602",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "1d34d458-3f9e-49aa-a25f-f5ae91f95d81",
                  "type": "has_only_phrase",
                  "uuid": "faa1ef7f-7c37-4f25-8a81-d0e9fa85bbb7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "efe12d7b-01a9-4757-8ff2-d0bba5950cc1",
                  "name": "All Responses",
                  "uuid": "a91acf9d-a565-40cb-869f-7a0a6eb40602"
                },
                {
                  "exit_uuid": "7f475c02-316e-4e12-a6f4-371e2cf0f0d6",
                  "name": "Next",
                  "uuid": "1d34d458-3f9e-49aa-a25f-f5ae91f95d81"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "efe12d7b-01a9-4757-8ff2-d0bba5950cc1",
                "destination_uuid": null
              },
              {
                "uuid": "7f475c02-316e-4e12-a6f4-371e2cf0f0d6",
                "destination_uuid": "b969ee9a-b78b-4726-a44b-6fcd05350743"
              }
            ]
          },
          {
            "uuid": "b969ee9a-b78b-4726-a44b-6fcd05350743",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "0da141d3-0cfc-4f36-bc5d-1007dcfac2f5"
              }
            ],
            "exits": [
              {
                "uuid": "5acb0fe8-c468-479a-abed-be1b5f8f1bfe",
                "destination_uuid": "be67e41d-b91c-4d63-a97f-f53c0bb96070"
              }
            ]
          },
          {
            "uuid": "be67e41d-b91c-4d63-a97f-f53c0bb96070",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c76fba42-00b4-4f45-b006-4989b6443a64",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "6a15afc6-36cf-4c2c-b275-7fa0123aab4f",
                  "type": "has_only_phrase",
                  "uuid": "6929db07-0a59-47ac-b9f2-a201077aada4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6101d88e-9b22-4f04-839e-f0591d40879f",
                  "name": "All Responses",
                  "uuid": "c76fba42-00b4-4f45-b006-4989b6443a64"
                },
                {
                  "exit_uuid": "f53968d5-9116-4477-9734-b82404fee349",
                  "name": "Next",
                  "uuid": "6a15afc6-36cf-4c2c-b275-7fa0123aab4f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6101d88e-9b22-4f04-839e-f0591d40879f",
                "destination_uuid": null
              },
              {
                "uuid": "f53968d5-9116-4477-9734-b82404fee349",
                "destination_uuid": "2073c37d-5638-421f-be9a-545809d76177"
              }
            ]
          },
          {
            "uuid": "2073c37d-5638-421f-be9a-545809d76177",
            "actions": [
              {
                "uuid": "25d037e3-4b05-40a2-9e47-c1e5582f7573",
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
                "uuid": "cce04021-39fb-461b-93a3-9299f289fdd7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bf91beaa-f95d-4956-96f1-4c6f7472302e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "56c757b6-feaf-44e9-9a3d-98a7c9aade4b",
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
                "uuid": "5f193503-952c-4435-b536-328aae8cfeb2"
              }
            ],
            "exits": [
              {
                "uuid": "5c853e26-2bba-48b3-a7a5-8b5eda1b6cae",
                "destination_uuid": "0d3d895e-9be6-44ed-8bbf-7a4f867bc0fe"
              }
            ]
          },
          {
            "uuid": "0d3d895e-9be6-44ed-8bbf-7a4f867bc0fe",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "230c5c2b-eddb-490b-8fee-9709f193dbe6",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "ccfbf85e-416d-4d47-bbb3-5f6c3e28fd0d",
                  "type": "has_only_phrase",
                  "uuid": "eaae04ca-f55b-4d77-930f-06c1b9e21af2"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "656c1159-a5fb-42b2-8069-90521e2e8ebd",
                  "type": "has_only_phrase",
                  "uuid": "453f75a2-edb5-44bd-92b7-a24bd85f74a8"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "656c1159-a5fb-42b2-8069-90521e2e8ebd",
                  "type": "has_only_phrase",
                  "uuid": "bb463a23-4d0d-4593-bfc7-2d2ebd3ab0c1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6d24695a-fc97-4aab-a23b-fe6648bded8c",
                  "name": "All Responses",
                  "uuid": "230c5c2b-eddb-490b-8fee-9709f193dbe6"
                },
                {
                  "exit_uuid": "c9b03e16-7aa7-4264-981c-9557102d0f02",
                  "name": "Happy",
                  "uuid": "ccfbf85e-416d-4d47-bbb3-5f6c3e28fd0d"
                },
                {
                  "exit_uuid": "abcc5d3f-cc99-4896-8aba-0281e3f60092",
                  "name": "Neutral; Sad",
                  "uuid": "656c1159-a5fb-42b2-8069-90521e2e8ebd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6d24695a-fc97-4aab-a23b-fe6648bded8c",
                "destination_uuid": null
              },
              {
                "uuid": "c9b03e16-7aa7-4264-981c-9557102d0f02",
                "destination_uuid": "8a47dc58-c617-46b9-9b41-3bf4967f65a2"
              },
              {
                "uuid": "abcc5d3f-cc99-4896-8aba-0281e3f60092",
                "destination_uuid": "e71d2c47-3341-4088-9554-72f2bce720e5"
              }
            ]
          },
          {
            "uuid": "8a47dc58-c617-46b9-9b41-3bf4967f65a2",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "05e6aac5-04ac-4063-bb41-c0a1555d4a5b"
              }
            ],
            "exits": [
              {
                "uuid": "f0d6fe40-ce52-4992-a199-93af4979b487",
                "destination_uuid": "2f3b2b38-9172-4154-8d79-bdee002927a5"
              }
            ]
          },
          {
            "uuid": "e71d2c47-3341-4088-9554-72f2bce720e5",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6a74d48a-821f-4672-9114-be202583478a"
              }
            ],
            "exits": [
              {
                "uuid": "153d35c0-f02c-4f0c-aa55-91a08a1bd55f",
                "destination_uuid": "eb18d012-dad4-497b-a50a-fd0af7e422b9"
              }
            ]
          },
          {
            "uuid": "eb18d012-dad4-497b-a50a-fd0af7e422b9",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "06cc5f7d-63a1-4512-aa0d-1a4bcea4d4b3"
              }
            ],
            "exits": [
              {
                "uuid": "d21ff0cb-8035-4d7d-9d86-a66f6f458f91",
                "destination_uuid": "7a94376e-8fbc-4e75-94e0-8bd84c4b01b4"
              }
            ]
          },
          {
            "uuid": "7a94376e-8fbc-4e75-94e0-8bd84c4b01b4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "941fecd4-0f6f-4922-b686-c40f97519f8b",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "746b52cd-3564-493a-bc2e-cd356897c178",
                  "type": "has_only_phrase",
                  "uuid": "17c83ee7-22d6-4be9-a779-568c2775357f"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "80e0cb93-3da6-407e-afca-28b15efa54d8",
                  "type": "has_only_phrase",
                  "uuid": "8eac7562-f03c-4bdd-902f-74f2b9ec20fb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3eb11c89-ac36-4cb3-a4ad-765c3316bf26",
                  "name": "All Responses",
                  "uuid": "941fecd4-0f6f-4922-b686-c40f97519f8b"
                },
                {
                  "exit_uuid": "77f9a21e-8ea2-437e-a76c-eed31b47461e",
                  "name": "Yes",
                  "uuid": "746b52cd-3564-493a-bc2e-cd356897c178"
                },
                {
                  "exit_uuid": "9b085a52-752e-4d21-9b00-118abd4512be",
                  "name": "No",
                  "uuid": "80e0cb93-3da6-407e-afca-28b15efa54d8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3eb11c89-ac36-4cb3-a4ad-765c3316bf26",
                "destination_uuid": null
              },
              {
                "uuid": "77f9a21e-8ea2-437e-a76c-eed31b47461e",
                "destination_uuid": "2d6f8c84-d522-483e-b42e-66ab367a3492"
              },
              {
                "uuid": "9b085a52-752e-4d21-9b00-118abd4512be",
                "destination_uuid": "afd07a47-601f-4cc2-b0ac-b956277779bd"
              }
            ]
          },
          {
            "uuid": "2d6f8c84-d522-483e-b42e-66ab367a3492",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "0efada08-8ec2-4f89-94f4-d9d3f37d6667"
                },
                "type": "enter_flow",
                "uuid": "dc338ac5-892d-4ae7-8272-6eb3c2db18a4"
              }
            ],
            "exits": [
              {
                "uuid": "8fdf0ce5-22d2-48d7-b80e-d271f85d79b5",
                "destination_uuid": "33339acf-d86b-42d4-a793-aead709b83ff"
              },
              {
                "uuid": "8514bd25-9604-43e1-a88f-77c804ceb017",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8af2f619-da74-4bff-9f64-d9003cdb8356",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ba473577-55d2-421d-a6f4-a48efa1260ff"
                },
                {
                  "uuid": "cc07cb85-2801-46ce-8120-fc676cdbc874",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "17bc6ec8-5348-4a01-820f-2c5838de3e66"
                }
              ],
              "categories": [
                {
                  "uuid": "ba473577-55d2-421d-a6f4-a48efa1260ff",
                  "name": "Complete",
                  "exit_uuid": "8fdf0ce5-22d2-48d7-b80e-d271f85d79b5"
                },
                {
                  "uuid": "17bc6ec8-5348-4a01-820f-2c5838de3e66",
                  "name": "Expired",
                  "exit_uuid": "8514bd25-9604-43e1-a88f-77c804ceb017"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ba473577-55d2-421d-a6f4-a48efa1260ff"
            }
          },
          {
            "uuid": "33339acf-d86b-42d4-a793-aead709b83ff",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ecc9e391-8b48-415a-9b8a-7683e64ecac9"
              }
            ],
            "exits": [
              {
                "uuid": "a096a686-6a7c-4e05-aa0d-48f531ddd8a7",
                "destination_uuid": "fcff5d00-5af7-4aef-9297-ce1385f04ba3"
              }
            ]
          },
          {
            "uuid": "fcff5d00-5af7-4aef-9297-ce1385f04ba3",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "497bb7e3-ea7a-483d-ba7f-4ec09ec75c64"
              }
            ],
            "exits": [
              {
                "uuid": "c4fbfffb-52cf-4e0d-9c8e-c48458d52c01",
                "destination_uuid": "2f3b2b38-9172-4154-8d79-bdee002927a5"
              }
            ]
          },
          {
            "uuid": "afd07a47-601f-4cc2-b0ac-b956277779bd",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "ff403822-d76f-475d-8430-fdd1252bf83a"
              }
            ],
            "exits": [
              {
                "uuid": "24b12313-1f32-4eaf-a97a-ca8bfc7229fd",
                "destination_uuid": "2f3b2b38-9172-4154-8d79-bdee002927a5"
              }
            ]
          },
          {
            "uuid": "2f3b2b38-9172-4154-8d79-bdee002927a5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "03047c38-7a52-4014-924e-2d00ba43029f",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "557139e9-24ad-4570-9c61-14dca2aae595",
                  "type": "has_only_phrase",
                  "uuid": "04fda9af-a35f-4d05-ac44-4b9b2f721af5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "72911225-d73f-4aba-93ce-bac92a8b386b",
                  "name": "All Responses",
                  "uuid": "03047c38-7a52-4014-924e-2d00ba43029f"
                },
                {
                  "exit_uuid": "2599b2f1-8204-4098-90f9-4bc887d813da",
                  "name": "Chat to @fields.elder",
                  "uuid": "557139e9-24ad-4570-9c61-14dca2aae595"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "72911225-d73f-4aba-93ce-bac92a8b386b",
                "destination_uuid": null
              },
              {
                "uuid": "2599b2f1-8204-4098-90f9-4bc887d813da",
                "destination_uuid": "4dc2e246-ced5-4653-a9d1-c2115c27c965"
              }
            ]
          },
          {
            "uuid": "4dc2e246-ced5-4653-a9d1-c2115c27c965",
            "actions": [
              {
                "uuid": "b43298fb-c859-43ca-abbe-84a40608f9b6",
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
                "uuid": "2d811a72-973e-4cea-b55c-ee1c98c418d3",
                "destination_uuid": "fc3664dc-7c49-4568-95a1-292bb1300fb3"
              }
            ]
          },
          {
            "uuid": "fc3664dc-7c49-4568-95a1-292bb1300fb3",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "92a11c21-7f48-45d6-b175-7e96eb48861b"
                },
                "type": "enter_flow",
                "uuid": "616c397b-91d1-46df-8119-12c86267e81e"
              }
            ],
            "exits": [
              {
                "uuid": "ee5d64ae-f77a-4df6-b33e-9f6136c2ce1a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b12c1288-5e07-4afa-a3be-278fa1a5b451",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5b67307f-95b7-4f60-b959-28776484765c",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d32073b9-2185-4d52-b774-75b5a7042708"
              }
            ],
            "exits": [
              {
                "uuid": "c2cb28cf-36e0-4b47-8ebd-6ecaf8e4f4cc",
                "destination_uuid": "c07ab9eb-3791-4682-b84d-58bda3a32d45"
              }
            ]
          },
          {
            "uuid": "c07ab9eb-3791-4682-b84d-58bda3a32d45",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0c3cabc8-22ef-489f-ae8d-c02b5318f5f5"
              }
            ],
            "exits": [
              {
                "uuid": "df482298-74ff-462b-bd33-56faab93256c",
                "destination_uuid": "be107fd5-7e53-4a9f-9a15-8c59a884876f"
              }
            ]
          },
          {
            "uuid": "be107fd5-7e53-4a9f-9a15-8c59a884876f",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "3dd1d925-659b-4a55-820e-823b2431d9b7"
              }
            ],
            "exits": [
              {
                "uuid": "29766b55-8fb4-44b1-99ac-5aadb446d0b3",
                "destination_uuid": "5980214e-9e96-4575-b8e4-a5d5afe47dfb"
              }
            ]
          },
          {
            "uuid": "5980214e-9e96-4575-b8e4-a5d5afe47dfb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5b3c6995-e28a-4188-926f-9aa28bac5696",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "91a445b2-f54f-4225-841b-fb307021391c",
                  "type": "has_only_phrase",
                  "uuid": "c58f7fe3-36b1-47da-961e-1d7905757075"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "2d866462-7e35-45ed-8385-dd86fbfe1e4f",
                  "type": "has_only_phrase",
                  "uuid": "1650bf25-b5d6-441b-8ba4-9fd57562d9b5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "010d3f02-9776-4b02-be71-1b6c5d5389d5",
                  "name": "All Responses",
                  "uuid": "5b3c6995-e28a-4188-926f-9aa28bac5696"
                },
                {
                  "exit_uuid": "9f7f0ecf-30e1-496e-9408-9e677beae850",
                  "name": "Yes",
                  "uuid": "91a445b2-f54f-4225-841b-fb307021391c"
                },
                {
                  "exit_uuid": "6d0010e3-5dce-4e62-8a42-c285f82ad775",
                  "name": "No",
                  "uuid": "2d866462-7e35-45ed-8385-dd86fbfe1e4f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "010d3f02-9776-4b02-be71-1b6c5d5389d5",
                "destination_uuid": null
              },
              {
                "uuid": "9f7f0ecf-30e1-496e-9408-9e677beae850",
                "destination_uuid": "3a8600a5-b8b6-44af-ae43-58f493988d94"
              },
              {
                "uuid": "6d0010e3-5dce-4e62-8a42-c285f82ad775",
                "destination_uuid": "b76c90e7-f4f2-421b-bd55-9d943a9cbda6"
              }
            ]
          },
          {
            "uuid": "3a8600a5-b8b6-44af-ae43-58f493988d94",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4cd057d7-ecdd-49be-9eb6-176b3a39c1de"
              }
            ],
            "exits": [
              {
                "uuid": "68b70fe2-1c8a-4b4e-9017-c296344ce97a",
                "destination_uuid": "5d8018c4-bc34-4fc7-a7ad-249f91bd447a"
              }
            ]
          },
          {
            "uuid": "b76c90e7-f4f2-421b-bd55-9d943a9cbda6",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c6208eb8-f0ff-4e73-90d9-63547605a5cd"
              }
            ],
            "exits": [
              {
                "uuid": "ad9a12d1-ac7f-407c-b794-e5cf9154626b",
                "destination_uuid": "5d8018c4-bc34-4fc7-a7ad-249f91bd447a"
              }
            ]
          },
          {
            "uuid": "5d8018c4-bc34-4fc7-a7ad-249f91bd447a",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b11b1707-a4b0-49f0-bb46-a19e07b1a98e"
              }
            ],
            "exits": [
              {
                "uuid": "41b5d54d-f257-458b-a6ed-e654e98b1e76",
                "destination_uuid": "fdaad901-aad6-4e9a-bf7f-b72f0a45b21a"
              }
            ]
          },
          {
            "uuid": "fdaad901-aad6-4e9a-bf7f-b72f0a45b21a",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "166c9d63-db58-453c-8a1e-dc646587c692"
              }
            ],
            "exits": [
              {
                "uuid": "60b585ce-0162-43ff-8025-d11a23b71688",
                "destination_uuid": "8a94dc14-e34a-49b8-8903-4626ff7bfe30"
              }
            ]
          },
          {
            "uuid": "8a94dc14-e34a-49b8-8903-4626ff7bfe30",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "39834bf3-1e32-4bcb-990f-bb1b232f80cd",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "0f3ddc20-cfaf-4d2f-b488-da2fd6551849",
                  "type": "has_only_phrase",
                  "uuid": "f0c2592a-d593-4421-a0e1-a49ec51fe2af"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "d2a0d6a4-8a73-43ce-b049-be0660c7b40d",
                  "type": "has_only_phrase",
                  "uuid": "5ac2ff6c-2804-439c-b71e-791ed46ef9b7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f44a256d-7952-4ebe-9018-d9d6ed9e022f",
                  "name": "All Responses",
                  "uuid": "39834bf3-1e32-4bcb-990f-bb1b232f80cd"
                },
                {
                  "exit_uuid": "e1ea4df3-7fad-4e77-8505-6a5cfc1bf4f6",
                  "name": "Yes",
                  "uuid": "0f3ddc20-cfaf-4d2f-b488-da2fd6551849"
                },
                {
                  "exit_uuid": "25e8bf52-6835-42fd-892a-0059bdb0d635",
                  "name": "Later",
                  "uuid": "d2a0d6a4-8a73-43ce-b049-be0660c7b40d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f44a256d-7952-4ebe-9018-d9d6ed9e022f",
                "destination_uuid": null
              },
              {
                "uuid": "e1ea4df3-7fad-4e77-8505-6a5cfc1bf4f6",
                "destination_uuid": "f097b29d-f3f0-4ab5-9f89-dc8801932a7f"
              },
              {
                "uuid": "25e8bf52-6835-42fd-892a-0059bdb0d635",
                "destination_uuid": "5b242c57-a36b-4a5c-9e1f-551e2e5374b4"
              }
            ]
          },
          {
            "uuid": "f097b29d-f3f0-4ab5-9f89-dc8801932a7f",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "c1c2696c-03f2-46a5-a0ff-9d05bf2a1d96"
              }
            ],
            "exits": [
              {
                "uuid": "6a83177f-cbcf-44a4-a5a5-f60a35284391",
                "destination_uuid": "a836b390-09e4-445d-b9a8-034dacd52f3b"
              }
            ]
          },
          {
            "uuid": "a836b390-09e4-445d-b9a8-034dacd52f3b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3d8677b4-05a0-4b05-b95f-5ab46763f441",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "cf0cd953-f2c5-465e-9e70-82e0b1767508",
                  "type": "has_only_phrase",
                  "uuid": "cddd52cf-b48d-452c-942c-5a1266a9c682"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "85ecd492-fc93-4918-b2b2-1094c008d9ea",
                  "name": "All Responses",
                  "uuid": "3d8677b4-05a0-4b05-b95f-5ab46763f441"
                },
                {
                  "exit_uuid": "2a5fe568-4653-494d-825c-fcd693af7b69",
                  "name": "Take me to Tips",
                  "uuid": "cf0cd953-f2c5-465e-9e70-82e0b1767508"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "85ecd492-fc93-4918-b2b2-1094c008d9ea",
                "destination_uuid": null
              },
              {
                "uuid": "2a5fe568-4653-494d-825c-fcd693af7b69",
                "destination_uuid": "a4fdeca0-01a0-468e-b03c-f51ff0751dd7"
              }
            ]
          },
          {
            "uuid": "a4fdeca0-01a0-468e-b03c-f51ff0751dd7",
            "actions": [
              {
                "uuid": "842af13e-b88c-4508-99d0-8efbbd976952",
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
                "uuid": "77bbe2ce-e6d9-430c-8b6a-36d9f162b10a",
                "destination_uuid": "b1af64ae-7d12-4628-b8f4-d9653fd5af19"
              }
            ]
          },
          {
            "uuid": "b1af64ae-7d12-4628-b8f4-d9653fd5af19",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "29375751-44b0-471b-bea3-e5d2e9532764"
                },
                "type": "enter_flow",
                "uuid": "e36f1e1b-7d76-4e41-bfa4-891b0216df9a"
              }
            ],
            "exits": [
              {
                "uuid": "bd746f54-f443-4a17-b8dc-0888ed8963b9",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "5b242c57-a36b-4a5c-9e1f-551e2e5374b4",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "99129ade-5442-4c2e-a7b4-0c3b20d23403"
              }
            ],
            "exits": [
              {
                "uuid": "03b1e070-d2ba-41d5-91f2-f970b136732a",
                "destination_uuid": "36be5439-06ec-4691-8b8e-e922d8d88f7d"
              }
            ]
          },
          {
            "uuid": "36be5439-06ec-4691-8b8e-e922d8d88f7d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5170badd-dc07-4474-b0ca-2d623d750c81",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "65fb87ca-270f-451f-88fb-09dc514dab1a",
                  "type": "has_only_phrase",
                  "uuid": "0d14f32e-5984-4eb1-903b-24b040171704"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a384d0b8-8e52-4df9-9b94-7740319762fa",
                  "name": "All Responses",
                  "uuid": "5170badd-dc07-4474-b0ca-2d623d750c81"
                },
                {
                  "exit_uuid": "22b94967-386d-4833-bbcb-503566505801",
                  "name": "Take me to the home screen",
                  "uuid": "65fb87ca-270f-451f-88fb-09dc514dab1a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a384d0b8-8e52-4df9-9b94-7740319762fa",
                "destination_uuid": null
              },
              {
                "uuid": "22b94967-386d-4833-bbcb-503566505801",
                "destination_uuid": "9ae2bfe0-5e66-4242-b34a-1e151e0e7936"
              }
            ]
          },
          {
            "uuid": "9ae2bfe0-5e66-4242-b34a-1e151e0e7936",
            "actions": [
              {
                "uuid": "d987d8c4-f88c-41a2-a90b-4084465b7f02",
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
                "uuid": "a1dc9ade-c0b2-408c-be31-e7ae4acbf148",
                "destination_uuid": "532e8a78-665a-4252-b92f-ab3e87b7b2b2"
              }
            ]
          },
          {
            "uuid": "532e8a78-665a-4252-b92f-ab3e87b7b2b2",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "f5e766c8-f7ed-4b79-a464-1d3f282db2b1"
                },
                "type": "enter_flow",
                "uuid": "17559a44-396e-4d26-82e2-a89e0d58dbb5"
              }
            ],
            "exits": [
              {
                "uuid": "c73a3f57-7f47-40f6-8f05-46330f1472aa",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "14041d27-5093-44e9-8ed0-2407a73bb06e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ec35301e-bf52-468b-a73d-edfbf767be18",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cf506312-762f-41ae-a19e-d991b95179c2"
              }
            ],
            "exits": [
              {
                "uuid": "b2b4bbf5-ec62-401f-b3a4-b7b9e5e12d42",
                "destination_uuid": "e05aa977-1c1b-4562-b3b9-75412b62af4b"
              }
            ]
          },
          {
            "uuid": "e05aa977-1c1b-4562-b3b9-75412b62af4b",
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
                "uuid": "620ea0e8-fadf-423e-91e9-926015929162"
              }
            ],
            "exits": [
              {
                "uuid": "e3f9301e-26c9-4f0e-8949-ffa1b0adca47",
                "destination_uuid": "258ab74b-f91f-4d7b-9bc7-843ae63b8f2d"
              }
            ]
          },
          {
            "uuid": "258ab74b-f91f-4d7b-9bc7-843ae63b8f2d",
            "actions": [],
            "exits": [
              {
                "uuid": "b85ea599-6bd7-485d-8ada-82afb4a28dd9",
                "destination_uuid": "aae430fb-9051-4fd6-bd7c-55ed5c72e1eb"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "763bb0d9-4ace-4d77-ac86-451f7658c842",
              "cases": [],
              "categories": [
                {
                  "uuid": "763bb0d9-4ace-4d77-ac86-451f7658c842",
                  "name": "All Responses",
                  "exit_uuid": "b85ea599-6bd7-485d-8ada-82afb4a28dd9"
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
            "uuid": "aae430fb-9051-4fd6-bd7c-55ed5c72e1eb",
            "actions": [
              {
                "uuid": "0c810d79-1742-4c9b-8398-d6aa9f90fd3c",
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
                "uuid": "b7597e75-045d-4a9d-a827-1883d7105ae5",
                "destination_uuid": "c482b7c6-3183-4de0-9f47-a2469bfdc6e5"
              }
            ]
          },
          {
            "uuid": "c482b7c6-3183-4de0-9f47-a2469bfdc6e5",
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
                "uuid": "823957c0-0938-4e12-bb80-a529e44f3850"
              }
            ],
            "exits": [
              {
                "uuid": "21f4bf66-fd27-49cd-aff0-702fbed1c65e",
                "destination_uuid": "1e9eeb50-d095-419d-893f-0233edaac20d"
              }
            ]
          },
          {
            "uuid": "1e9eeb50-d095-419d-893f-0233edaac20d",
            "actions": [],
            "exits": [
              {
                "uuid": "e04b78e1-75ff-45a6-81b3-08546e19bdaa",
                "destination_uuid": "85144b59-03b0-4756-a414-a85a97b83cc3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "256a7c1b-8cb3-45af-b244-14f2677f4f1f",
              "cases": [],
              "categories": [
                {
                  "uuid": "256a7c1b-8cb3-45af-b244-14f2677f4f1f",
                  "name": "All Responses",
                  "exit_uuid": "e04b78e1-75ff-45a6-81b3-08546e19bdaa"
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
            "uuid": "85144b59-03b0-4756-a414-a85a97b83cc3",
            "actions": [
              {
                "uuid": "8ea65db1-0b98-4f4b-8934-2f7b43bed969",
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
                "uuid": "38438350-ac07-40a5-b018-7b7633549380",
                "destination_uuid": "273e6a5f-cdd8-4f22-a80d-a17d5a5177a5"
              }
            ]
          },
          {
            "uuid": "273e6a5f-cdd8-4f22-a80d-a17d5a5177a5",
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
                "uuid": "75e8f3d9-5684-414b-92e3-3ca76581658c"
              }
            ],
            "exits": [
              {
                "uuid": "35244133-c098-4a94-b692-798de20de58a",
                "destination_uuid": "d33e00dd-c711-417a-b6b9-95d287042bce"
              }
            ]
          },
          {
            "uuid": "d33e00dd-c711-417a-b6b9-95d287042bce",
            "actions": [],
            "exits": [
              {
                "uuid": "77121c73-a8c4-4a7d-be4d-199030b30a1f",
                "destination_uuid": "177262e4-68ac-4b05-be67-ec8f1d6fa4f0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "548d6486-8dde-4477-9428-b550dd0a2048",
              "cases": [],
              "categories": [
                {
                  "uuid": "548d6486-8dde-4477-9428-b550dd0a2048",
                  "name": "All Responses",
                  "exit_uuid": "77121c73-a8c4-4a7d-be4d-199030b30a1f"
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
            "uuid": "177262e4-68ac-4b05-be67-ec8f1d6fa4f0",
            "actions": [
              {
                "uuid": "987f611d-b9e5-467a-b84a-6443c1354c4e",
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
                "uuid": "c4d20ac9-3bd4-4fd6-b9e7-682bc583b3dc",
                "destination_uuid": "f4325edf-4a09-4769-a0c1-3a5122c2cd87"
              }
            ]
          },
          {
            "uuid": "f4325edf-4a09-4769-a0c1-3a5122c2cd87",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "8e511a97-1d37-4011-ab3c-2a34ced5151f"
              }
            ],
            "exits": [
              {
                "uuid": "7a32d9ab-28e9-4d13-8782-b4418f76fa68",
                "destination_uuid": "4bb1b358-7a07-4bba-bd6a-62ab984745eb"
              }
            ]
          },
          {
            "uuid": "4bb1b358-7a07-4bba-bd6a-62ab984745eb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "43271517-0405-4610-b597-2061dc346817",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "b440dc8d-9193-432d-9c53-38cd14fcd194",
                  "type": "has_only_phrase",
                  "uuid": "60f03422-d7b5-4d57-8a9a-f7c319612c44"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3a5dd6e0-c958-4234-9b87-266de9589abc",
                  "name": "All Responses",
                  "uuid": "43271517-0405-4610-b597-2061dc346817"
                },
                {
                  "exit_uuid": "cdc6e957-2b03-46c4-9262-0d1e7507859e",
                  "name": "Take me to Homescreen",
                  "uuid": "b440dc8d-9193-432d-9c53-38cd14fcd194"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3a5dd6e0-c958-4234-9b87-266de9589abc",
                "destination_uuid": null
              },
              {
                "uuid": "cdc6e957-2b03-46c4-9262-0d1e7507859e",
                "destination_uuid": "787df45f-a7cf-44f2-9509-e612d0b29dac"
              }
            ]
          },
          {
            "uuid": "787df45f-a7cf-44f2-9509-e612d0b29dac",
            "actions": [
              {
                "uuid": "ebc42bac-3f54-486f-91c9-55ca56211c9a",
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
                "uuid": "1aee8c21-fc90-42bf-88a4-e5d821886cfd",
                "destination_uuid": "f8d2e514-c3ad-4241-8cfa-2e176427bef0"
              }
            ]
          },
          {
            "uuid": "f8d2e514-c3ad-4241-8cfa-2e176427bef0",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "d3e89950-c030-4123-984e-2495791accb2"
                },
                "type": "enter_flow",
                "uuid": "909fcb3f-8296-4066-870b-e5742d768ca6"
              }
            ],
            "exits": [
              {
                "uuid": "c14eac2f-e974-44ad-a7c5-844a1f75089f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ce5ecb0e-e727-4818-ae80-9d2c292e3897",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "51436897-9bc0-425d-aa29-1cb0e436f028",
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
                "uuid": "a7ef628d-9e05-4d36-8018-d03d6e922b44"
              }
            ],
            "exits": [
              {
                "uuid": "e1f1cb9b-5773-4f9b-8d25-50f28c8ab8c9",
                "destination_uuid": "8be6a6ff-6aea-4b8f-b38f-401dd5fb7d9f"
              }
            ]
          },
          {
            "uuid": "8be6a6ff-6aea-4b8f-b38f-401dd5fb7d9f",
            "actions": [],
            "exits": [
              {
                "uuid": "0d8885a4-418f-4bba-b178-f982c02773fa",
                "destination_uuid": "dfcee08f-4a30-4e66-94b1-58b906cfa1ab"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "da7f19ff-e56c-4e67-8fb8-8bdb106c16d9",
              "cases": [],
              "categories": [
                {
                  "uuid": "da7f19ff-e56c-4e67-8fb8-8bdb106c16d9",
                  "name": "All Responses",
                  "exit_uuid": "0d8885a4-418f-4bba-b178-f982c02773fa"
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
            "uuid": "dfcee08f-4a30-4e66-94b1-58b906cfa1ab",
            "actions": [
              {
                "uuid": "fca39c28-d544-4f8a-a486-975a58ce08b6",
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
                "uuid": "6637d4e2-e1f5-42ae-905a-6f21531ade75",
                "destination_uuid": "f7dff8fa-97c3-4910-9784-11952357a7af"
              }
            ]
          },
          {
            "uuid": "f7dff8fa-97c3-4910-9784-11952357a7af",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cd58d292-e784-4f33-b24e-8447a1d3cf69",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "9b58f9f3-803a-4130-9acc-207c8038a18d",
                  "type": "has_only_phrase",
                  "uuid": "c3634e05-1efa-4cd7-9dd3-1d98331d3e21"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "6abcd4a6-92d2-4c2e-a0d8-c583f76a0868",
                  "type": "has_only_phrase",
                  "uuid": "b762c4ce-eb23-4290-8862-cbbb7737a48b"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "fb9753d2-e124-4051-84e5-81000531962b",
                  "type": "has_only_phrase",
                  "uuid": "b77a4ee5-36aa-4071-be4c-2eece4b2b8e3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "54ceef77-ce97-481b-891f-833ac1c2f966",
                  "name": "All Responses",
                  "uuid": "cd58d292-e784-4f33-b24e-8447a1d3cf69"
                },
                {
                  "exit_uuid": "8a71fcbc-d896-4845-a4b8-1969d286c30c",
                  "name": "Great",
                  "uuid": "9b58f9f3-803a-4130-9acc-207c8038a18d"
                },
                {
                  "exit_uuid": "053ca666-180d-4532-ba70-ab4dfeb7d0d3",
                  "name": "Neutral",
                  "uuid": "6abcd4a6-92d2-4c2e-a0d8-c583f76a0868"
                },
                {
                  "exit_uuid": "c4b8ce0a-074b-4563-98b3-9aeaa55740d2",
                  "name": "Bad",
                  "uuid": "fb9753d2-e124-4051-84e5-81000531962b"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "54ceef77-ce97-481b-891f-833ac1c2f966",
                "destination_uuid": null
              },
              {
                "uuid": "8a71fcbc-d896-4845-a4b8-1969d286c30c",
                "destination_uuid": "a2d643f4-367f-4024-b4e8-3c687fd6edb4"
              },
              {
                "uuid": "053ca666-180d-4532-ba70-ab4dfeb7d0d3",
                "destination_uuid": "daf320f9-4a3a-43e7-8053-0301c7720100"
              },
              {
                "uuid": "c4b8ce0a-074b-4563-98b3-9aeaa55740d2",
                "destination_uuid": "f9ffc390-6d76-45a1-a431-2b318dce9dd2"
              }
            ]
          },
          {
            "uuid": "a2d643f4-367f-4024-b4e8-3c687fd6edb4",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6ce76ef4-2fa1-4381-b728-0be550ca758b"
              }
            ],
            "exits": [
              {
                "uuid": "8bcada94-26f0-42a0-8511-fe727c34452c",
                "destination_uuid": "2e444858-9834-4920-bfce-1c5288ed9da0"
              }
            ]
          },
          {
            "uuid": "daf320f9-4a3a-43e7-8053-0301c7720100",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c03c13c8-487c-4dda-befc-6499f866baa4"
              }
            ],
            "exits": [
              {
                "uuid": "81777189-1448-4d74-9e06-f2207849f44d",
                "destination_uuid": "2e444858-9834-4920-bfce-1c5288ed9da0"
              }
            ]
          },
          {
            "uuid": "2e444858-9834-4920-bfce-1c5288ed9da0",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "53268e77-764f-4ce3-a69e-270465255f71"
                },
                "type": "enter_flow",
                "uuid": "49d0c88a-705d-481f-aeff-e5a78b1c9792"
              }
            ],
            "exits": [
              {
                "uuid": "7c0b4364-63a0-4e8b-b114-8d9fe25d6b1a",
                "destination_uuid": "54e4f496-9da6-417d-94b3-4976b3ac2a68"
              },
              {
                "uuid": "f384b219-1e52-4d47-97b4-1aca70563440",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "4f7eb6a5-06f0-4dae-9a09-7ab2c2a27b5d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "5a9f5f11-cf24-4087-868a-d4dc118f1801"
                },
                {
                  "uuid": "e9e28824-b38f-439d-bcde-cd2b60a47660",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "94a6541a-e5d4-47a9-b903-2b4672fb4108"
                }
              ],
              "categories": [
                {
                  "uuid": "5a9f5f11-cf24-4087-868a-d4dc118f1801",
                  "name": "Complete",
                  "exit_uuid": "7c0b4364-63a0-4e8b-b114-8d9fe25d6b1a"
                },
                {
                  "uuid": "94a6541a-e5d4-47a9-b903-2b4672fb4108",
                  "name": "Expired",
                  "exit_uuid": "f384b219-1e52-4d47-97b4-1aca70563440"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "5a9f5f11-cf24-4087-868a-d4dc118f1801"
            }
          },
          {
            "uuid": "54e4f496-9da6-417d-94b3-4976b3ac2a68",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "aa1ac6e7-3757-4325-a8c0-9843577804ba"
                },
                "type": "enter_flow",
                "uuid": "13bdf5a1-3475-4d05-8791-de1ee30b0014"
              }
            ],
            "exits": [
              {
                "uuid": "6a143bbe-8a62-46f9-aefe-6b779f6fc763",
                "destination_uuid": "88c83ba6-9ae6-44cb-ada5-a3af3d2820a4"
              },
              {
                "uuid": "8fc7b7f4-542d-435c-85ee-1466242e4955",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "d15d3da3-a506-401c-85a5-dc632cb1afb6",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "46dabccf-ac00-4d9e-a445-b12cac9dc244"
                },
                {
                  "uuid": "82c7ecdd-f4dd-4e4c-b8c6-1ab6473498ec",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "880ed3b4-da06-440b-a761-d60de99e78f3"
                }
              ],
              "categories": [
                {
                  "uuid": "46dabccf-ac00-4d9e-a445-b12cac9dc244",
                  "name": "Complete",
                  "exit_uuid": "6a143bbe-8a62-46f9-aefe-6b779f6fc763"
                },
                {
                  "uuid": "880ed3b4-da06-440b-a761-d60de99e78f3",
                  "name": "Expired",
                  "exit_uuid": "8fc7b7f4-542d-435c-85ee-1466242e4955"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "46dabccf-ac00-4d9e-a445-b12cac9dc244"
            }
          },
          {
            "uuid": "f9ffc390-6d76-45a1-a431-2b318dce9dd2",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c2593abf-a7ab-490b-a21f-715ea9e2af70"
              }
            ],
            "exits": [
              {
                "uuid": "c170fa53-3b9e-4342-9484-ff86ca6fcc6e",
                "destination_uuid": "c201599d-d49b-498f-b202-2ef713354bfd"
              }
            ]
          },
          {
            "uuid": "c201599d-d49b-498f-b202-2ef713354bfd",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "63ce77ca-3fe0-4aef-a873-4d1edae90fd2"
                },
                "type": "enter_flow",
                "uuid": "fcba1d43-8c98-4bb3-868a-78a1c79b5060"
              }
            ],
            "exits": [
              {
                "uuid": "dca996b9-df20-4941-84b2-89a0a83948c1",
                "destination_uuid": "7b70ece2-7ee5-43cd-993e-a79080543ebb"
              },
              {
                "uuid": "d817c606-2da7-44ed-94b9-269acb07a443",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "acf5408f-3471-44fc-8033-f1d79b7900b3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "202741b2-d02a-4c9c-a23c-d7d8161962ef"
                },
                {
                  "uuid": "efc855a9-639f-48ec-85a7-507937942697",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "711dcbb5-bd6d-483c-87ae-fb04581547d7"
                }
              ],
              "categories": [
                {
                  "uuid": "202741b2-d02a-4c9c-a23c-d7d8161962ef",
                  "name": "Complete",
                  "exit_uuid": "dca996b9-df20-4941-84b2-89a0a83948c1"
                },
                {
                  "uuid": "711dcbb5-bd6d-483c-87ae-fb04581547d7",
                  "name": "Expired",
                  "exit_uuid": "d817c606-2da7-44ed-94b9-269acb07a443"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "202741b2-d02a-4c9c-a23c-d7d8161962ef"
            }
          },
          {
            "uuid": "7b70ece2-7ee5-43cd-993e-a79080543ebb",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "9dc06f47-b2d3-4fce-9a04-316416e74256"
                },
                "type": "enter_flow",
                "uuid": "cc7c2417-cc23-4e44-a464-059dc01fbd5a"
              }
            ],
            "exits": [
              {
                "uuid": "0fcf29dc-0c56-4774-85e8-82c3825df99b",
                "destination_uuid": "88c83ba6-9ae6-44cb-ada5-a3af3d2820a4"
              },
              {
                "uuid": "cdf36a5a-a7eb-4eee-b0ec-8a04430b6cfd",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7ad4ae67-6063-4553-b4cd-1bc9b90c1a7c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "655e5c54-0591-41bd-a664-51847f91bdd8"
                },
                {
                  "uuid": "1f493124-4fe9-491a-b576-394f4b72a43c",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "92fa18b1-37ed-407e-92e0-c1d615aaa499"
                }
              ],
              "categories": [
                {
                  "uuid": "655e5c54-0591-41bd-a664-51847f91bdd8",
                  "name": "Complete",
                  "exit_uuid": "0fcf29dc-0c56-4774-85e8-82c3825df99b"
                },
                {
                  "uuid": "92fa18b1-37ed-407e-92e0-c1d615aaa499",
                  "name": "Expired",
                  "exit_uuid": "cdf36a5a-a7eb-4eee-b0ec-8a04430b6cfd"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "655e5c54-0591-41bd-a664-51847f91bdd8"
            }
          },
          {
            "uuid": "88c83ba6-9ae6-44cb-ada5-a3af3d2820a4",
            "actions": [
              {
                "uuid": "875a5e69-a725-4054-b8bd-72feeb14cfe0",
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
                "uuid": "2190bbba-1200-4c53-80cc-d4f1326cafc6",
                "destination_uuid": "cdafe061-4ecf-4616-8841-b87715fbe039"
              }
            ]
          },
          {
            "uuid": "cdafe061-4ecf-4616-8841-b87715fbe039",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "74938570-3a5c-4e4c-98c0-9f9eed372955"
                },
                "type": "enter_flow",
                "uuid": "8486504f-0cbf-4fad-9ace-2da2375cae00"
              }
            ],
            "exits": [
              {
                "uuid": "176e421b-b1fa-4219-8c7c-13a78e06d012",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "2f113c41-60d8-4b99-9309-a91f41346f6c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a7ddd1da-52dd-44ff-919e-76ad42b01741",
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
                "uuid": "bfa157e2-890e-419a-b4bf-638daec50833"
              }
            ],
            "exits": [
              {
                "uuid": "0e203080-df21-4e2d-8fe6-ac42f894435a",
                "destination_uuid": "cd0880f4-8133-4e1b-9cdc-9f1cea3b90c0"
              }
            ]
          },
          {
            "uuid": "cd0880f4-8133-4e1b-9cdc-9f1cea3b90c0",
            "actions": [],
            "exits": [
              {
                "uuid": "a570e7ec-a05d-4344-b52e-d23e03546c61",
                "destination_uuid": "c48fc409-26d8-4c44-a507-2912900fc3ff"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7dc329c8-7d67-418a-9747-abf0d2718b37",
              "cases": [],
              "categories": [
                {
                  "uuid": "7dc329c8-7d67-418a-9747-abf0d2718b37",
                  "name": "All Responses",
                  "exit_uuid": "a570e7ec-a05d-4344-b52e-d23e03546c61"
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
            "uuid": "c48fc409-26d8-4c44-a507-2912900fc3ff",
            "actions": [
              {
                "uuid": "e3bf47c3-7316-4939-8e24-d745c886535a",
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
                "uuid": "20eb5ac3-1c43-471d-9201-6b909a59e26b",
                "destination_uuid": "4d0a6889-68f8-455b-9bc1-6bb958317b25"
              }
            ]
          },
          {
            "uuid": "4d0a6889-68f8-455b-9bc1-6bb958317b25",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3ed13667-a3f7-4992-8aaa-17ae0f34ab9a",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "1051b6e4-07c1-45f7-88d5-7eb291c09182",
                  "type": "has_only_phrase",
                  "uuid": "703429a8-3745-4433-aaf0-e1b82aa77b3c"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "1ebbfe1b-4ce1-4f42-a268-3156b57d8717",
                  "type": "has_only_phrase",
                  "uuid": "ca243755-febf-45e1-a4b9-7952143021e7"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "ada728c8-624e-4729-9ea0-02b519e2df5e",
                  "type": "has_only_phrase",
                  "uuid": "82f0fdf7-053c-4d8c-be6f-40c144341899"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "a3e2f9b3-50c9-4182-888f-c69e6ea633e8",
                  "type": "has_only_phrase",
                  "uuid": "5b3ae82c-b21b-44f8-b409-d4627a8d3b06"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "db901a94-3067-44c1-8d12-df3d54ca833f",
                  "type": "has_only_phrase",
                  "uuid": "c617f731-121b-4302-b747-3c6c625b8ba7"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "27f5e042-de85-4c09-ab0e-f6457f2e9f12",
                  "type": "has_only_phrase",
                  "uuid": "5ca5928e-fc60-4140-bc83-2e829da6d966"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "c38e46d9-c663-4e94-b925-b06c2fd71c00",
                  "type": "has_only_phrase",
                  "uuid": "c5cc9dc5-597f-4f5b-bbf7-34704d8fa91c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "29c804a3-2c0d-429f-9b93-a341e968ba1d",
                  "name": "All Responses",
                  "uuid": "3ed13667-a3f7-4992-8aaa-17ae0f34ab9a"
                },
                {
                  "exit_uuid": "a6728f02-8a72-4bc3-819f-025988f5fe27",
                  "name": "Do it every day",
                  "uuid": "1051b6e4-07c1-45f7-88d5-7eb291c09182"
                },
                {
                  "exit_uuid": "12c0d869-8428-40d2-9c9e-b1c24e44734e",
                  "name": "Let your teen choose the activity",
                  "uuid": "1ebbfe1b-4ce1-4f42-a268-3156b57d8717"
                },
                {
                  "exit_uuid": "9d7fd226-a2fe-4c6c-993e-461153b7de19",
                  "name": "Follow your teen’s lead",
                  "uuid": "ada728c8-624e-4729-9ea0-02b519e2df5e"
                },
                {
                  "exit_uuid": "4c11436f-a5fd-4d01-aec9-2eceb5c877db",
                  "name": "Give your teen all of your attention",
                  "uuid": "a3e2f9b3-50c9-4182-888f-c69e6ea633e8"
                },
                {
                  "exit_uuid": "e77c5ca0-4f7f-420f-a909-82ca29c88f6b",
                  "name": "Show your teen you are really listening",
                  "uuid": "db901a94-3067-44c1-8d12-df3d54ca833f"
                },
                {
                  "exit_uuid": "13cb784b-0747-4e15-81de-ef0c9823c545",
                  "name": "Have fun!",
                  "uuid": "27f5e042-de85-4c09-ab0e-f6457f2e9f12"
                },
                {
                  "exit_uuid": "59a68daa-866c-4951-88b5-33955855b6d0",
                  "name": "None ",
                  "uuid": "c38e46d9-c663-4e94-b925-b06c2fd71c00"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "29c804a3-2c0d-429f-9b93-a341e968ba1d",
                "destination_uuid": null
              },
              {
                "uuid": "a6728f02-8a72-4bc3-819f-025988f5fe27",
                "destination_uuid": "c67bd67b-5310-40e3-8d2b-efd87bbaaa03"
              },
              {
                "uuid": "12c0d869-8428-40d2-9c9e-b1c24e44734e",
                "destination_uuid": "fa04303d-4fd2-438a-9cfd-f83a5e48684f"
              },
              {
                "uuid": "9d7fd226-a2fe-4c6c-993e-461153b7de19",
                "destination_uuid": "557cd45d-2037-43e8-91c5-0d730462fe6a"
              },
              {
                "uuid": "4c11436f-a5fd-4d01-aec9-2eceb5c877db",
                "destination_uuid": "a6e553cb-8900-4f4d-a254-241ce9f71f3d"
              },
              {
                "uuid": "e77c5ca0-4f7f-420f-a909-82ca29c88f6b",
                "destination_uuid": "c5387412-fcdb-4e8e-83e3-73da4dd5aeb5"
              },
              {
                "uuid": "13cb784b-0747-4e15-81de-ef0c9823c545",
                "destination_uuid": "a1635d7a-1bf8-48e0-acf9-7cc4b4978f79"
              },
              {
                "uuid": "59a68daa-866c-4951-88b5-33955855b6d0",
                "destination_uuid": "8f014758-b3a6-4f2c-861d-3629e75185f9"
              }
            ]
          },
          {
            "uuid": "c67bd67b-5310-40e3-8d2b-efd87bbaaa03",
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
                "uuid": "d632b475-a574-4555-8259-201c05a1a5ef"
              }
            ],
            "exits": [
              {
                "uuid": "00af46c0-a57d-4e74-81fe-8369f24da278",
                "destination_uuid": "d4c19fff-d047-477a-88fd-fb9f3b6f3caa"
              }
            ]
          },
          {
            "uuid": "d4c19fff-d047-477a-88fd-fb9f3b6f3caa",
            "actions": [],
            "exits": [
              {
                "uuid": "4893f46a-f50a-47a4-8824-79b9ef7c27b3",
                "destination_uuid": "c2874364-e87e-4ccb-a511-9e23e36dddcb"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "45f393eb-4e41-4cca-b8d7-cb4f1231cd9a",
              "cases": [],
              "categories": [
                {
                  "uuid": "45f393eb-4e41-4cca-b8d7-cb4f1231cd9a",
                  "name": "All Responses",
                  "exit_uuid": "4893f46a-f50a-47a4-8824-79b9ef7c27b3"
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
            "uuid": "c2874364-e87e-4ccb-a511-9e23e36dddcb",
            "actions": [
              {
                "uuid": "18a33f4d-f6e5-44eb-bd57-c69efb9ed75c",
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
                "uuid": "d7a0d205-b401-4df0-93bd-a87bcfbe6055",
                "destination_uuid": "f4acc1a2-596a-475c-a3d0-d4fa634d56ea"
              }
            ]
          },
          {
            "uuid": "f4acc1a2-596a-475c-a3d0-d4fa634d56ea",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5b5d007d-5bb7-4275-8d48-75e1df03f62c"
              }
            ],
            "exits": [
              {
                "uuid": "8c36b5f8-2583-4a6f-a3ba-68ee5faf8cdf",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "fa04303d-4fd2-438a-9cfd-f83a5e48684f",
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
                "uuid": "ab631ef0-7620-4a00-bc99-707c2a3a92cf"
              }
            ],
            "exits": [
              {
                "uuid": "39ce4c1a-ee5b-40e7-9615-4a39c31af28f",
                "destination_uuid": "092a1d33-7db1-406c-8304-b4947891dc93"
              }
            ]
          },
          {
            "uuid": "092a1d33-7db1-406c-8304-b4947891dc93",
            "actions": [],
            "exits": [
              {
                "uuid": "99c88bbb-b638-4e91-bdf9-4581f1ea2a56",
                "destination_uuid": "006391d2-087c-4746-a6c3-fcb11a6e3744"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "90e8054b-c320-4615-ba99-5b8ab0128fff",
              "cases": [],
              "categories": [
                {
                  "uuid": "90e8054b-c320-4615-ba99-5b8ab0128fff",
                  "name": "All Responses",
                  "exit_uuid": "99c88bbb-b638-4e91-bdf9-4581f1ea2a56"
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
            "uuid": "006391d2-087c-4746-a6c3-fcb11a6e3744",
            "actions": [
              {
                "uuid": "a7422086-0f4a-4e93-8340-bd75d6c31a90",
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
                "uuid": "025bf238-e61e-414f-9abe-3fe37b1b7eb8",
                "destination_uuid": "5d3c3b09-a068-4c7a-9fa7-bfd527046c53"
              }
            ]
          },
          {
            "uuid": "5d3c3b09-a068-4c7a-9fa7-bfd527046c53",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8b10c393-72db-4d2b-9bc9-d903a3d3d516"
              }
            ],
            "exits": [
              {
                "uuid": "5a6f9984-5ef5-4feb-8c2c-a99f28b6703d",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "557cd45d-2037-43e8-91c5-0d730462fe6a",
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
                "uuid": "2795e224-69ea-48b4-bb0d-658ff96ba2bc"
              }
            ],
            "exits": [
              {
                "uuid": "0e0dea41-472e-45cb-955c-b652d1397d4d",
                "destination_uuid": "91e2c784-f4a4-4e59-97ab-3a6331c042af"
              }
            ]
          },
          {
            "uuid": "91e2c784-f4a4-4e59-97ab-3a6331c042af",
            "actions": [],
            "exits": [
              {
                "uuid": "9c846e62-97a1-4e3c-8c4e-08b29d198da6",
                "destination_uuid": "362bdd39-820b-4c6e-8946-87e28ef9e577"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b8b43905-75cd-4174-97e8-9545b4d3f4bd",
              "cases": [],
              "categories": [
                {
                  "uuid": "b8b43905-75cd-4174-97e8-9545b4d3f4bd",
                  "name": "All Responses",
                  "exit_uuid": "9c846e62-97a1-4e3c-8c4e-08b29d198da6"
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
            "uuid": "362bdd39-820b-4c6e-8946-87e28ef9e577",
            "actions": [
              {
                "uuid": "4081a9e5-2deb-4fc4-a42b-2a03793238c3",
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
                "uuid": "dbbbddf2-3940-413b-b8f8-c5b9e957e3aa",
                "destination_uuid": "d4fa9dfb-7094-4189-9c65-d5a37851a527"
              }
            ]
          },
          {
            "uuid": "d4fa9dfb-7094-4189-9c65-d5a37851a527",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "aa307a14-620c-4981-8568-077cdbc22a59"
              }
            ],
            "exits": [
              {
                "uuid": "cd990852-ea02-4ac7-9362-3d6247e1b4b5",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "a6e553cb-8900-4f4d-a254-241ce9f71f3d",
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
                "uuid": "bfd133b2-bea0-4e63-9848-f333f16d93c2"
              }
            ],
            "exits": [
              {
                "uuid": "279fed33-6d12-437b-ba52-c9aaf5c8d65d",
                "destination_uuid": "991836be-2f10-49ff-b08e-0f349066f194"
              }
            ]
          },
          {
            "uuid": "991836be-2f10-49ff-b08e-0f349066f194",
            "actions": [],
            "exits": [
              {
                "uuid": "6c37b224-1186-440d-8adb-1ea4c5cb8724",
                "destination_uuid": "062074a6-54b6-450c-8c85-d49adfd09e05"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c80a6803-3cb4-471a-bc4d-8fa473c78617",
              "cases": [],
              "categories": [
                {
                  "uuid": "c80a6803-3cb4-471a-bc4d-8fa473c78617",
                  "name": "All Responses",
                  "exit_uuid": "6c37b224-1186-440d-8adb-1ea4c5cb8724"
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
            "uuid": "062074a6-54b6-450c-8c85-d49adfd09e05",
            "actions": [
              {
                "uuid": "cb9d16e5-6dca-49a4-bf8b-74c7bf374801",
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
                "uuid": "ff76fd98-bb1c-4d91-9464-083426169a3a",
                "destination_uuid": "35f20c53-1fae-4366-9fd1-39730c4b5303"
              }
            ]
          },
          {
            "uuid": "35f20c53-1fae-4366-9fd1-39730c4b5303",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "19b46e1c-f42e-4d7b-86fd-ea41151053a9"
              }
            ],
            "exits": [
              {
                "uuid": "1557a498-578a-4767-bbc3-24f96d86509a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "c5387412-fcdb-4e8e-83e3-73da4dd5aeb5",
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
                "uuid": "4771eeb9-7150-4e18-817c-7aef55fd8bfa"
              }
            ],
            "exits": [
              {
                "uuid": "803df0a6-a870-4233-825e-a6fc8df7c08c",
                "destination_uuid": "077e42f5-3770-4c02-886d-3a852372c945"
              }
            ]
          },
          {
            "uuid": "077e42f5-3770-4c02-886d-3a852372c945",
            "actions": [],
            "exits": [
              {
                "uuid": "154ff1b8-b532-4298-b496-8a2bbf69ef4a",
                "destination_uuid": "d6b44e55-cb6b-44f3-adb3-c0570574e147"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e5f909fc-4920-4d17-8d45-28bdfa190fa0",
              "cases": [],
              "categories": [
                {
                  "uuid": "e5f909fc-4920-4d17-8d45-28bdfa190fa0",
                  "name": "All Responses",
                  "exit_uuid": "154ff1b8-b532-4298-b496-8a2bbf69ef4a"
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
            "uuid": "d6b44e55-cb6b-44f3-adb3-c0570574e147",
            "actions": [
              {
                "uuid": "aa9fe39d-69b9-4d83-99c6-b10d1911ea8d",
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
                "uuid": "d6536a1e-7b4f-4d09-8ed7-fd6392455246",
                "destination_uuid": "a174b1ad-30a0-4795-90bc-7b94bcb84640"
              }
            ]
          },
          {
            "uuid": "a174b1ad-30a0-4795-90bc-7b94bcb84640",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3723381d-ab9c-4785-b35c-9e3e1b1214e8"
              }
            ],
            "exits": [
              {
                "uuid": "edf66dc1-d6b1-4e1e-9f15-e72cdf8e2d89",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "a1635d7a-1bf8-48e0-acf9-7cc4b4978f79",
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
                "uuid": "935d21d4-d329-4147-8439-e29a78ae84d7"
              }
            ],
            "exits": [
              {
                "uuid": "97cae3ae-01db-4647-bb83-5d1306e4d395",
                "destination_uuid": "e824fdf7-6e3f-4a82-9eee-e0e851cabc74"
              }
            ]
          },
          {
            "uuid": "e824fdf7-6e3f-4a82-9eee-e0e851cabc74",
            "actions": [],
            "exits": [
              {
                "uuid": "0eee0fa8-d7cc-4b6b-8337-c36d3887d006",
                "destination_uuid": "72c831c4-1e32-4c33-9200-5a859a5bf58e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "5ee2b5db-8f3a-4f35-b2b6-b26980238a17",
              "cases": [],
              "categories": [
                {
                  "uuid": "5ee2b5db-8f3a-4f35-b2b6-b26980238a17",
                  "name": "All Responses",
                  "exit_uuid": "0eee0fa8-d7cc-4b6b-8337-c36d3887d006"
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
            "uuid": "72c831c4-1e32-4c33-9200-5a859a5bf58e",
            "actions": [
              {
                "uuid": "cf444000-eb2b-42ff-b1ed-dd7dd6f30392",
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
                "uuid": "890ae5f8-a8c3-4b81-bb4c-3482049c433f",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "4568a78f-9cf0-4a8f-a68a-8afb336ea571",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2a35eb36-ea32-43fa-8951-fd9a62a8ea1e"
              }
            ],
            "exits": [
              {
                "uuid": "16e0f2fd-0ce9-44ca-ba16-0cd56d03f786",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "8f014758-b3a6-4f2c-861d-3629e75185f9",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "760e995b-3535-4b2d-a61c-6ef3f5449876"
              }
            ],
            "exits": [
              {
                "uuid": "a90170ac-a41f-401f-b38e-e0701ec05853",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3855b37d-5ab6-4e0b-8967-9396b62ae700",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "907c6a11-cf1f-4e69-8e5c-e2a9b2bc69a0",
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
                "uuid": "a1cc8fcf-5c51-49b8-94cb-11eed7773cd0"
              }
            ],
            "exits": [
              {
                "uuid": "324e468d-e274-4757-a774-8d59fc1f351e",
                "destination_uuid": "c2cd7eb5-2adb-457f-a230-4cd8b9dbd16d"
              }
            ]
          },
          {
            "uuid": "cfecc9f5-c099-47b7-912b-fef733ceeea2",
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
                "uuid": "ac127c2a-5a39-4547-9bfb-7722fcf31482"
              }
            ],
            "exits": [
              {
                "uuid": "8f5b8bc0-637b-4775-a7d0-74a367385bfb",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "2052c585-af35-43ae-82c1-212811cb1fa0",
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
                "uuid": "6e5cfedc-3637-43ef-9841-9b6dfa8b347d"
              }
            ],
            "exits": [
              {
                "uuid": "06d0fe09-0262-4f22-bc25-d7536708549a",
                "destination_uuid": "c2cd7eb5-2adb-457f-a230-4cd8b9dbd16d"
              }
            ]
          },
          {
            "uuid": "c2cd7eb5-2adb-457f-a230-4cd8b9dbd16d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e0ae47a6-34ab-4d6d-93b7-baa974bbc352",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "26e5bb11-bae4-4148-989e-bf6c019f4c4b",
                  "type": "has_only_phrase",
                  "uuid": "0814d765-c215-4d1e-a216-b44a40911414"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "3c283bac-0b04-4d69-855e-accee528b5da",
                  "type": "has_only_phrase",
                  "uuid": "b9f2b6f3-9906-4637-8180-756ee19dece5"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "f7812983-becc-4e58-9ba4-a3dc9eaae021",
                  "type": "has_only_phrase",
                  "uuid": "61c7d010-7076-4b56-bd5c-77df2509de8a"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "e9d68e1e-f293-45a8-a756-1538c3b6196c",
                  "type": "has_only_phrase",
                  "uuid": "8bb885a2-c16a-43a3-9d55-adab42a8c6bb"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "35ae99ad-f24c-4206-b0f0-11bf3ca5a820",
                  "type": "has_only_phrase",
                  "uuid": "151cc5ae-25ee-4bbe-95f0-fbb23484e135"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "c8bbf4ac-267f-46c0-b5d5-27464de56e4a",
                  "type": "has_only_phrase",
                  "uuid": "b43e0359-8355-4f20-8872-27e23fb7f1dc"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "f153c76c-285e-4939-979d-2d64c2568840",
                  "type": "has_only_phrase",
                  "uuid": "09bf1277-221c-40b8-b7d6-072da802a00e"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "f42dc3d3-402b-4338-8ee6-7c6898fa8504",
                  "type": "has_only_phrase",
                  "uuid": "4e11f1f4-6ff6-4d08-a790-d7f90c5cc8ab"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "804cab21-dd82-4c6a-ae7e-9eb71ea3c581",
                  "type": "has_only_phrase",
                  "uuid": "d4e5de37-5e1b-4c1d-9d6e-249001b1cd44"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "a9a23742-ddca-4d33-962f-56d7e867ab86",
                  "type": "has_only_phrase",
                  "uuid": "cccc8151-628d-4bb1-99c8-fc1eabf3db5e"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "f6391f2e-f5ad-42b5-9ca5-82aa40319159",
                  "type": "has_only_phrase",
                  "uuid": "9cabd225-78d4-4678-b8d7-78b3bf6d4e50"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "524d241e-1fc5-4c76-b132-c1d7d2c0f13a",
                  "type": "has_only_phrase",
                  "uuid": "2edad4d7-a046-409e-a7ac-a78e45e3b441"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "42c9747a-ac2e-4dd2-a463-e730afbd9601",
                  "type": "has_only_phrase",
                  "uuid": "257c6842-9b5d-4c29-a15a-8f35fc69fced"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "dd1d8c8b-7f39-4c83-9465-8a48994fc019",
                  "type": "has_only_phrase",
                  "uuid": "6314f97b-1f21-4728-af0d-eb51614d96ca"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "f2c44793-a41c-45dc-841d-02b747e719c5",
                  "type": "has_only_phrase",
                  "uuid": "16d812a0-0e70-4143-9f3e-5984ceef249a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b3fba76c-83e6-4b3c-be53-f761da27ea4f",
                  "name": "All Responses",
                  "uuid": "e0ae47a6-34ab-4d6d-93b7-baa974bbc352"
                },
                {
                  "exit_uuid": "c52f614f-2b22-49b9-9804-d1aa3ed9d9a7",
                  "name": "I don’t have enough time",
                  "uuid": "26e5bb11-bae4-4148-989e-bf6c019f4c4b"
                },
                {
                  "exit_uuid": "7fb7dc50-a1b1-4a5b-90b6-d57faf94222e",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "3c283bac-0b04-4d69-855e-accee528b5da"
                },
                {
                  "exit_uuid": "eb65538f-06a6-4861-b518-71c03fc5afb4",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "f7812983-becc-4e58-9ba4-a3dc9eaae021"
                },
                {
                  "exit_uuid": "9fd33c2c-152a-42c4-9053-06347baba92a",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "e9d68e1e-f293-45a8-a756-1538c3b6196c"
                },
                {
                  "exit_uuid": "e76dcf34-65b7-4ff7-acc6-73e8083a0f28",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "35ae99ad-f24c-4206-b0f0-11bf3ca5a820"
                },
                {
                  "exit_uuid": "84ddffd9-1a9a-48b1-a5e7-552f0f8b29e2",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "c8bbf4ac-267f-46c0-b5d5-27464de56e4a"
                },
                {
                  "exit_uuid": "c058626e-644a-4eb6-b256-413bbbd1bdb1",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "f153c76c-285e-4939-979d-2d64c2568840"
                },
                {
                  "exit_uuid": "a669a40f-4b30-4c43-8022-6fa59c4870d4",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "f42dc3d3-402b-4338-8ee6-7c6898fa8504"
                },
                {
                  "exit_uuid": "b8c3bcb0-0ff1-4f17-9ade-a80a0169ddeb",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "804cab21-dd82-4c6a-ae7e-9eb71ea3c581"
                },
                {
                  "exit_uuid": "8581a93b-d44c-4aba-8b54-782cd1c12bd3",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "a9a23742-ddca-4d33-962f-56d7e867ab86"
                },
                {
                  "exit_uuid": "13b6958c-b9f0-440f-9166-de9994368b68",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "f6391f2e-f5ad-42b5-9ca5-82aa40319159"
                },
                {
                  "exit_uuid": "1cc5e8b1-a4d1-45cd-b3fd-6f9fc1e56037",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "524d241e-1fc5-4c76-b132-c1d7d2c0f13a"
                },
                {
                  "exit_uuid": "38316459-1758-44e2-b0ce-863541ef93ad",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "42c9747a-ac2e-4dd2-a463-e730afbd9601"
                },
                {
                  "exit_uuid": "2e2022fa-8ed4-4152-9645-30add56f237d",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "dd1d8c8b-7f39-4c83-9465-8a48994fc019"
                },
                {
                  "exit_uuid": "cfe09b63-ceab-4f6f-aea3-3df6658d0b71",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "f2c44793-a41c-45dc-841d-02b747e719c5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b3fba76c-83e6-4b3c-be53-f761da27ea4f",
                "destination_uuid": null
              },
              {
                "uuid": "c52f614f-2b22-49b9-9804-d1aa3ed9d9a7",
                "destination_uuid": "334eae66-36ad-4a75-930f-817e5ebd085e"
              },
              {
                "uuid": "7fb7dc50-a1b1-4a5b-90b6-d57faf94222e",
                "destination_uuid": "51d94d36-80b6-41f9-89a4-7e0a16f28e31"
              },
              {
                "uuid": "eb65538f-06a6-4861-b518-71c03fc5afb4",
                "destination_uuid": "51d94d36-80b6-41f9-89a4-7e0a16f28e31"
              },
              {
                "uuid": "9fd33c2c-152a-42c4-9053-06347baba92a",
                "destination_uuid": "91c42fa3-431a-47d1-892c-522991ef265a"
              },
              {
                "uuid": "e76dcf34-65b7-4ff7-acc6-73e8083a0f28",
                "destination_uuid": "91c42fa3-431a-47d1-892c-522991ef265a"
              },
              {
                "uuid": "84ddffd9-1a9a-48b1-a5e7-552f0f8b29e2",
                "destination_uuid": "b24d973b-b07a-42a8-aaef-53374272384e"
              },
              {
                "uuid": "c058626e-644a-4eb6-b256-413bbbd1bdb1",
                "destination_uuid": "b24d973b-b07a-42a8-aaef-53374272384e"
              },
              {
                "uuid": "a669a40f-4b30-4c43-8022-6fa59c4870d4",
                "destination_uuid": "1d560449-2f22-4325-8926-4037e1584bc6"
              },
              {
                "uuid": "b8c3bcb0-0ff1-4f17-9ade-a80a0169ddeb",
                "destination_uuid": "1d560449-2f22-4325-8926-4037e1584bc6"
              },
              {
                "uuid": "8581a93b-d44c-4aba-8b54-782cd1c12bd3",
                "destination_uuid": "695eacb4-2bff-4f0e-acc3-3c9a5a3e9660"
              },
              {
                "uuid": "13b6958c-b9f0-440f-9166-de9994368b68",
                "destination_uuid": "695eacb4-2bff-4f0e-acc3-3c9a5a3e9660"
              },
              {
                "uuid": "1cc5e8b1-a4d1-45cd-b3fd-6f9fc1e56037",
                "destination_uuid": "0309ef42-a42e-427a-b7ec-0bfcd18000c0"
              },
              {
                "uuid": "38316459-1758-44e2-b0ce-863541ef93ad",
                "destination_uuid": "0309ef42-a42e-427a-b7ec-0bfcd18000c0"
              },
              {
                "uuid": "2e2022fa-8ed4-4152-9645-30add56f237d",
                "destination_uuid": "5f8fa130-9c76-4297-a9b1-af091060feb6"
              },
              {
                "uuid": "cfe09b63-ceab-4f6f-aea3-3df6658d0b71",
                "destination_uuid": "5f8fa130-9c76-4297-a9b1-af091060feb6"
              }
            ]
          },
          {
            "uuid": "334eae66-36ad-4a75-930f-817e5ebd085e",
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
                "uuid": "36fb6eb5-8669-4183-9517-034b8d07c247"
              }
            ],
            "exits": [
              {
                "uuid": "76b952cb-de6d-4d5b-9d09-2a61e7f2505b",
                "destination_uuid": "2cd24e29-b77b-4547-a501-34a864ae4fa9"
              }
            ]
          },
          {
            "uuid": "2cd24e29-b77b-4547-a501-34a864ae4fa9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6ba4c6fa-a067-4383-bebc-2492b47185e4",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "98a56856-f494-4222-b787-afb95bb4120d",
                  "type": "has_only_phrase",
                  "uuid": "c5a03e00-d0f8-4034-80cf-04f729eeff7f"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "346e3a32-f624-41b4-a119-75254da45cd6",
                  "type": "has_only_phrase",
                  "uuid": "ea265605-3e19-4ede-9125-08ee9b56bff7"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "a16d8923-c7a1-485e-ae74-81ca6b6da4a5",
                  "type": "has_only_phrase",
                  "uuid": "e8648afe-4fde-4fb1-aa49-b2daa315f57f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b5c66152-b89d-4c4b-8094-738a6b7c1cd1",
                  "name": "All Responses",
                  "uuid": "6ba4c6fa-a067-4383-bebc-2492b47185e4"
                },
                {
                  "exit_uuid": "b1ebc40f-2730-4504-bb58-acb942ba5ca0",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "98a56856-f494-4222-b787-afb95bb4120d"
                },
                {
                  "exit_uuid": "e46fbd3d-2dcf-4c1f-87a1-1757bcda7cdd",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "346e3a32-f624-41b4-a119-75254da45cd6"
                },
                {
                  "exit_uuid": "d1a702c4-915e-4350-b7b9-6f606a7b04c6",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "a16d8923-c7a1-485e-ae74-81ca6b6da4a5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b5c66152-b89d-4c4b-8094-738a6b7c1cd1",
                "destination_uuid": null
              },
              {
                "uuid": "b1ebc40f-2730-4504-bb58-acb942ba5ca0",
                "destination_uuid": "06aa8702-ad29-467f-a5f6-82655854882f"
              },
              {
                "uuid": "e46fbd3d-2dcf-4c1f-87a1-1757bcda7cdd",
                "destination_uuid": "603388c2-c497-48a1-b6dd-6490bafea7c8"
              },
              {
                "uuid": "d1a702c4-915e-4350-b7b9-6f606a7b04c6",
                "destination_uuid": "61a3bdd2-a443-40e6-b86c-5069c91328b3"
              }
            ]
          },
          {
            "uuid": "06aa8702-ad29-467f-a5f6-82655854882f",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3a0250f8-d6cd-4add-85ec-d91d0d9ec050"
              }
            ],
            "exits": [
              {
                "uuid": "81fe4127-ea03-4167-915e-1b7e0e0d504f",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "603388c2-c497-48a1-b6dd-6490bafea7c8",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6f2d50d8-20de-4edf-8ee5-5f68a839995b"
              }
            ],
            "exits": [
              {
                "uuid": "bef66731-808d-4613-b4b2-9067c1dea70b",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "61a3bdd2-a443-40e6-b86c-5069c91328b3",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0a88e0f3-2443-4adf-8a94-5b137a5737f4"
              }
            ],
            "exits": [
              {
                "uuid": "97c45419-c0e1-4683-ad21-acc6bdcb9fe2",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "51d94d36-80b6-41f9-89a4-7e0a16f28e31",
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
                "uuid": "d5da3773-dc42-486c-bdea-6e9c887a6d87"
              }
            ],
            "exits": [
              {
                "uuid": "f9a5b83e-4062-4da8-989c-55fc9896f833",
                "destination_uuid": "0593214e-bdf0-4d2d-92d5-2fd72674ce53"
              }
            ]
          },
          {
            "uuid": "0593214e-bdf0-4d2d-92d5-2fd72674ce53",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a6ceef42-1b09-4d32-be41-2ace357157b8",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "29196ccc-b239-4e06-9cd3-c4e8e1403d39",
                  "type": "has_only_phrase",
                  "uuid": "4754bcac-6faa-45c2-bf42-c694f5d4dbf0"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "e37dec3b-3e67-4229-966a-7ad918ae1735",
                  "type": "has_only_phrase",
                  "uuid": "b9bb4fff-9860-4a07-92ac-4368c84501b7"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "f880ac46-6b4d-48df-9f8e-a2fbea03d228",
                  "type": "has_only_phrase",
                  "uuid": "2d6c8ce8-01a7-4cec-875f-f7a3ef26099a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "875cf886-4582-4a39-9821-4b14043bfe3e",
                  "name": "All Responses",
                  "uuid": "a6ceef42-1b09-4d32-be41-2ace357157b8"
                },
                {
                  "exit_uuid": "e878deab-5d57-43e6-904d-212eac562ee7",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "29196ccc-b239-4e06-9cd3-c4e8e1403d39"
                },
                {
                  "exit_uuid": "23fe2856-c615-4ae8-82e8-39eace65b734",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "e37dec3b-3e67-4229-966a-7ad918ae1735"
                },
                {
                  "exit_uuid": "5d4297d4-b5a0-415a-835d-cd682dcd36f3",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "f880ac46-6b4d-48df-9f8e-a2fbea03d228"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "875cf886-4582-4a39-9821-4b14043bfe3e",
                "destination_uuid": null
              },
              {
                "uuid": "e878deab-5d57-43e6-904d-212eac562ee7",
                "destination_uuid": "ab6951d0-0840-41b6-8772-250dcd9d8742"
              },
              {
                "uuid": "23fe2856-c615-4ae8-82e8-39eace65b734",
                "destination_uuid": "7f123f86-8622-4392-a379-6f7bf5f2e987"
              },
              {
                "uuid": "5d4297d4-b5a0-415a-835d-cd682dcd36f3",
                "destination_uuid": "cebcba12-21f1-46e4-8dcf-6ddc2a3e08e0"
              }
            ]
          },
          {
            "uuid": "ab6951d0-0840-41b6-8772-250dcd9d8742",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "41a5d8b1-2992-47c8-a7a8-1f117b1febc0"
              }
            ],
            "exits": [
              {
                "uuid": "add94749-3bef-4c5d-a23f-609e0900a1b9",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "7f123f86-8622-4392-a379-6f7bf5f2e987",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bc76822e-9d7e-4778-a7a8-e7b800afe3c0"
              }
            ],
            "exits": [
              {
                "uuid": "3b114a3b-b578-475d-be83-c37aa5c2cf4d",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "cebcba12-21f1-46e4-8dcf-6ddc2a3e08e0",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "898b0d79-e85c-4e95-9d5b-42ccea7a58d1"
              }
            ],
            "exits": [
              {
                "uuid": "6482d6ea-2045-4737-90c4-d0a13ce0cdef",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "91c42fa3-431a-47d1-892c-522991ef265a",
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
                "uuid": "5c3722d9-1e55-425c-b349-70d689bc8371"
              }
            ],
            "exits": [
              {
                "uuid": "f7c53584-e3ff-4805-a4c8-2b473ed2efdc",
                "destination_uuid": "7905412d-cf08-4377-b0de-f0ddc498d50a"
              }
            ]
          },
          {
            "uuid": "7905412d-cf08-4377-b0de-f0ddc498d50a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "78fe246d-35b8-4ee3-99ca-51686d1672f4",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "db2945bb-cee7-484f-8547-33111f67bf9e",
                  "type": "has_only_phrase",
                  "uuid": "d2d7b7d4-423f-45da-b1ed-46b9c915a999"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "f50a916b-f152-42ac-a1a3-2a92cb9eaf43",
                  "type": "has_only_phrase",
                  "uuid": "331389d9-39e9-4a9f-ac40-6454d6edcc8f"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "9f1ad665-eee2-4cc6-9eb5-bf373938c3fd",
                  "type": "has_only_phrase",
                  "uuid": "12c79be0-9167-4e68-ab0e-28483daaf4ad"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f5142579-8723-4f95-b1a9-c43048c72e30",
                  "name": "All Responses",
                  "uuid": "78fe246d-35b8-4ee3-99ca-51686d1672f4"
                },
                {
                  "exit_uuid": "a56b2845-89a9-49cc-8850-6f153ec995cf",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "db2945bb-cee7-484f-8547-33111f67bf9e"
                },
                {
                  "exit_uuid": "41d38da0-b607-4b86-8f53-310f6587a599",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "f50a916b-f152-42ac-a1a3-2a92cb9eaf43"
                },
                {
                  "exit_uuid": "db337b9d-9788-4ef0-bd3b-48c1ceb71fdb",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "9f1ad665-eee2-4cc6-9eb5-bf373938c3fd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f5142579-8723-4f95-b1a9-c43048c72e30",
                "destination_uuid": null
              },
              {
                "uuid": "a56b2845-89a9-49cc-8850-6f153ec995cf",
                "destination_uuid": "ac5151ea-dc6a-4679-afdb-b1875c364b42"
              },
              {
                "uuid": "41d38da0-b607-4b86-8f53-310f6587a599",
                "destination_uuid": "457856c3-80ff-4a1e-a306-5169b40a528b"
              },
              {
                "uuid": "db337b9d-9788-4ef0-bd3b-48c1ceb71fdb",
                "destination_uuid": "b027552a-1e3d-4a81-a718-1dbad4c1ccb7"
              }
            ]
          },
          {
            "uuid": "ac5151ea-dc6a-4679-afdb-b1875c364b42",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "40e5fda4-cd62-4629-b209-2029a30dfcb0"
              }
            ],
            "exits": [
              {
                "uuid": "385eb3b3-44e8-4c4a-b40c-127cf174dfd3",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "457856c3-80ff-4a1e-a306-5169b40a528b",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c302c704-2ac1-479b-8458-7c8c4b55a0c6"
              }
            ],
            "exits": [
              {
                "uuid": "ab9648d0-4fa0-4771-9493-6f4b4e6e267a",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "b027552a-1e3d-4a81-a718-1dbad4c1ccb7",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "faf962a4-f651-49ab-8a17-ab321d76882d"
              }
            ],
            "exits": [
              {
                "uuid": "8cbab51c-7811-4105-a897-5d481c99423f",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "b24d973b-b07a-42a8-aaef-53374272384e",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "8483d64b-8264-4ca6-9952-b4b1c7492426"
              }
            ],
            "exits": [
              {
                "uuid": "210be03d-8309-49ee-9eb9-71e87398ddd1",
                "destination_uuid": "32d973a2-cee2-40da-bfed-487a3c701983"
              }
            ]
          },
          {
            "uuid": "32d973a2-cee2-40da-bfed-487a3c701983",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "511b3117-17d3-483e-9f38-339fb48b79ce",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "d54a6a76-e3fe-4e4c-bac5-2ee7000a5d1c",
                  "type": "has_only_phrase",
                  "uuid": "8e6f9dda-acc8-4bcd-9b84-d769b911071c"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "ae5d5411-0879-43be-aa03-54800265683f",
                  "type": "has_only_phrase",
                  "uuid": "d4ba3be5-65fb-4aaf-b918-51c1ab3eecd3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f358c8bd-f8b0-4f51-92a3-12adfbb7e558",
                  "name": "All Responses",
                  "uuid": "511b3117-17d3-483e-9f38-339fb48b79ce"
                },
                {
                  "exit_uuid": "33e94166-304b-40f7-8987-c38c9730daf4",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "d54a6a76-e3fe-4e4c-bac5-2ee7000a5d1c"
                },
                {
                  "exit_uuid": "6e8675b4-6ce0-4b1b-aeae-505a0559c71b",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "ae5d5411-0879-43be-aa03-54800265683f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f358c8bd-f8b0-4f51-92a3-12adfbb7e558",
                "destination_uuid": null
              },
              {
                "uuid": "33e94166-304b-40f7-8987-c38c9730daf4",
                "destination_uuid": "3efed94e-329e-427b-9c4d-f0000f9cfb4d"
              },
              {
                "uuid": "6e8675b4-6ce0-4b1b-aeae-505a0559c71b",
                "destination_uuid": "ad51e265-bf83-4acb-8af9-7cccd3d9f05f"
              }
            ]
          },
          {
            "uuid": "3efed94e-329e-427b-9c4d-f0000f9cfb4d",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e4249923-c542-4f2b-8141-126d38a6c09e"
              }
            ],
            "exits": [
              {
                "uuid": "96cff46b-c096-4296-8437-bc0ee7373752",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "ad51e265-bf83-4acb-8af9-7cccd3d9f05f",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "10f7e131-8d42-481b-a334-b55a38a26abf"
              }
            ],
            "exits": [
              {
                "uuid": "df9aa51d-bf84-4e0a-a858-0878c1152b05",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "1d560449-2f22-4325-8926-4037e1584bc6",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "5659481f-8fb5-4451-ac8a-16c272504457"
              }
            ],
            "exits": [
              {
                "uuid": "b2bbd4dc-e829-4568-b187-4b2f39e354b7",
                "destination_uuid": "9dd27f9d-3608-4563-b158-288023ff79f4"
              }
            ]
          },
          {
            "uuid": "9dd27f9d-3608-4563-b158-288023ff79f4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d4199489-23fd-4f1b-a978-b25d4999f7f1",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "137ee572-a97c-45a4-85e1-a7cc7f905f47",
                  "type": "has_only_phrase",
                  "uuid": "2b2fffb3-8cff-43d3-b13c-96c237323518"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "e521ff6b-bb6c-4e58-80c0-a7a9dc24ee77",
                  "type": "has_only_phrase",
                  "uuid": "f11db72d-2106-46c7-b937-e3e80b6038fa"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "032e6f25-752a-41d2-8bb7-d8b887b5a0a5",
                  "name": "All Responses",
                  "uuid": "d4199489-23fd-4f1b-a978-b25d4999f7f1"
                },
                {
                  "exit_uuid": "4461722f-300b-46c9-b960-953b37dd7f90",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "137ee572-a97c-45a4-85e1-a7cc7f905f47"
                },
                {
                  "exit_uuid": "94696fd8-94e1-4535-a561-80a65b01aa5d",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "e521ff6b-bb6c-4e58-80c0-a7a9dc24ee77"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "032e6f25-752a-41d2-8bb7-d8b887b5a0a5",
                "destination_uuid": null
              },
              {
                "uuid": "4461722f-300b-46c9-b960-953b37dd7f90",
                "destination_uuid": "d77e2296-1dbd-4dfa-b573-10bc8148f6c1"
              },
              {
                "uuid": "94696fd8-94e1-4535-a561-80a65b01aa5d",
                "destination_uuid": "56ea02f7-ebd3-4269-8768-696865178f7b"
              }
            ]
          },
          {
            "uuid": "d77e2296-1dbd-4dfa-b573-10bc8148f6c1",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5bb3278c-bd6f-47ae-a061-433afc8e27b4"
              }
            ],
            "exits": [
              {
                "uuid": "be5db22a-5f06-4fa5-975d-c229c248b464",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "56ea02f7-ebd3-4269-8768-696865178f7b",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "03e02fca-87fb-472e-8ebe-fe9d0fbba039"
              }
            ],
            "exits": [
              {
                "uuid": "b1b07d1b-824a-484f-84df-b71006bca04b",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "695eacb4-2bff-4f0e-acc3-3c9a5a3e9660",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "fcea2fff-2430-4907-99cc-af7d7359d514"
              }
            ],
            "exits": [
              {
                "uuid": "c8e30868-e846-4ebf-89ba-437b1ad9d940",
                "destination_uuid": "f0744dc8-15a0-4ed0-ab9b-08bceab5e19d"
              }
            ]
          },
          {
            "uuid": "f0744dc8-15a0-4ed0-ab9b-08bceab5e19d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cb9ac0e4-0b48-44c2-8b14-bba5a10cdbe1",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "3c344861-5518-4529-ace7-6f03d1ab6e46",
                  "type": "has_only_phrase",
                  "uuid": "e1387377-a7fc-402f-9921-499c10111f1a"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "7c9526e2-8bba-4387-bd45-6124ed06888d",
                  "type": "has_only_phrase",
                  "uuid": "cdbd89c4-e31c-4f4f-9e75-a7a4a63a440a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f87ca5b4-5611-4ad2-aa1b-ee234bf0edb2",
                  "name": "All Responses",
                  "uuid": "cb9ac0e4-0b48-44c2-8b14-bba5a10cdbe1"
                },
                {
                  "exit_uuid": "dcc7e6dc-8997-482e-aef4-0fee46f15de9",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "3c344861-5518-4529-ace7-6f03d1ab6e46"
                },
                {
                  "exit_uuid": "54d89e57-83f9-4b65-bab5-1a7643f93f43",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "7c9526e2-8bba-4387-bd45-6124ed06888d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f87ca5b4-5611-4ad2-aa1b-ee234bf0edb2",
                "destination_uuid": null
              },
              {
                "uuid": "dcc7e6dc-8997-482e-aef4-0fee46f15de9",
                "destination_uuid": "e5fed90b-9ea8-4de4-9d40-730f24f3fbec"
              },
              {
                "uuid": "54d89e57-83f9-4b65-bab5-1a7643f93f43",
                "destination_uuid": "d8a1ddce-2cf0-4773-8d04-10d94ee9d516"
              }
            ]
          },
          {
            "uuid": "e5fed90b-9ea8-4de4-9d40-730f24f3fbec",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "8e622c5e-fe22-47e8-8384-4eec1eef733e"
              }
            ],
            "exits": [
              {
                "uuid": "4473c69f-659c-48d8-a06c-b02741562a4d",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "d8a1ddce-2cf0-4773-8d04-10d94ee9d516",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6102713a-99ef-4252-af3b-ee6ed6c77f4b"
              }
            ],
            "exits": [
              {
                "uuid": "9c25ee90-6d5f-4165-b979-65ee11d00f2c",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "0309ef42-a42e-427a-b7ec-0bfcd18000c0",
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
                "uuid": "f822d40a-d1b6-40be-ae61-0116411a9a07"
              }
            ],
            "exits": [
              {
                "uuid": "4df5d347-f531-44ea-a1a3-781e7928f142",
                "destination_uuid": "27a65911-b2f9-47f7-a2a4-4e1eabff6934"
              }
            ]
          },
          {
            "uuid": "27a65911-b2f9-47f7-a2a4-4e1eabff6934",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "01bdb4ca-47ac-44df-af61-c786fe953112",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "a8cf3c35-3ba6-4e70-a2e3-8354609a505d",
                  "type": "has_only_phrase",
                  "uuid": "9f50e779-60a8-4b58-a33f-1b2e690d652d"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "fbb4a82b-d46b-49c9-8081-8693fd8fb61c",
                  "type": "has_only_phrase",
                  "uuid": "9851b3f9-be7c-4b81-b6e2-b36c4e9f1dce"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "68ef09b4-68f4-49bf-8721-ecb032198e79",
                  "type": "has_only_phrase",
                  "uuid": "47740b4e-934f-4dd2-930e-879b173ae21d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b807acce-b046-4ed7-b6f2-e6c7fb1800b2",
                  "name": "All Responses",
                  "uuid": "01bdb4ca-47ac-44df-af61-c786fe953112"
                },
                {
                  "exit_uuid": "4bfb3bd3-1401-4970-a512-2785eb9c3ad5",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "a8cf3c35-3ba6-4e70-a2e3-8354609a505d"
                },
                {
                  "exit_uuid": "bff854cd-c44f-4fab-aced-2495b2a56815",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "fbb4a82b-d46b-49c9-8081-8693fd8fb61c"
                },
                {
                  "exit_uuid": "9d406034-0716-40e4-8451-e14e9a12ccba",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "68ef09b4-68f4-49bf-8721-ecb032198e79"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b807acce-b046-4ed7-b6f2-e6c7fb1800b2",
                "destination_uuid": null
              },
              {
                "uuid": "4bfb3bd3-1401-4970-a512-2785eb9c3ad5",
                "destination_uuid": "6513c6a0-9a5a-4248-9fa8-b8791c7142a3"
              },
              {
                "uuid": "bff854cd-c44f-4fab-aced-2495b2a56815",
                "destination_uuid": "e4d4a00f-939a-4d1e-a36e-f3b85d8ce239"
              },
              {
                "uuid": "9d406034-0716-40e4-8451-e14e9a12ccba",
                "destination_uuid": "3f0c55d5-493e-48e9-8fbb-cd2126c7c0bc"
              }
            ]
          },
          {
            "uuid": "6513c6a0-9a5a-4248-9fa8-b8791c7142a3",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "96baea8b-cbd8-461b-a548-f8d86bb478e1"
              }
            ],
            "exits": [
              {
                "uuid": "f6f520e7-1955-4afc-b0ae-abbca6d885bd",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "e4d4a00f-939a-4d1e-a36e-f3b85d8ce239",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "640027b9-abd8-43e8-a569-6dde9b3f3651"
              }
            ],
            "exits": [
              {
                "uuid": "beea8698-f75e-4ce1-8fc9-d7ba4b410ba0",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "3f0c55d5-493e-48e9-8fbb-cd2126c7c0bc",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f10d904b-8765-4337-b2dd-abc80a56ec68"
              }
            ],
            "exits": [
              {
                "uuid": "9ad9e552-1bf4-4758-b192-b9b24658f566",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "5f8fa130-9c76-4297-a9b1-af091060feb6",
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
                "uuid": "7ce4d70f-0125-4344-84c8-6e00f9230b73"
              }
            ],
            "exits": [
              {
                "uuid": "989b626d-c942-439a-8cc2-a63f46f71602",
                "destination_uuid": "043024f0-e16c-402d-a252-ba6c178ea554"
              }
            ]
          },
          {
            "uuid": "043024f0-e16c-402d-a252-ba6c178ea554",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "77b3fc46-41ec-4e16-ac53-8ecefe9f28ad",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "c05fe7f4-b034-4b32-9d56-070cd33afdc2",
                  "type": "has_only_phrase",
                  "uuid": "76c3ffda-1e33-4614-bf41-eb5f309f6afe"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "f64abb80-6d82-4a6e-a75b-5629be2baa18",
                  "type": "has_only_phrase",
                  "uuid": "c0643621-43c0-4983-880c-1cfcbdca4779"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "7f45c6e7-1d08-4bad-993d-775078f1cf37",
                  "type": "has_only_phrase",
                  "uuid": "1692219b-9d4b-44ed-bea7-5c4d4ef7e399"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9cafca43-a000-4bc5-bb24-ba65b4e17eb8",
                  "name": "All Responses",
                  "uuid": "77b3fc46-41ec-4e16-ac53-8ecefe9f28ad"
                },
                {
                  "exit_uuid": "7de063cf-5909-4108-ab57-fb124a2593fa",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "c05fe7f4-b034-4b32-9d56-070cd33afdc2"
                },
                {
                  "exit_uuid": "436e9e40-edef-43a3-80e6-80a8045ad699",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "f64abb80-6d82-4a6e-a75b-5629be2baa18"
                },
                {
                  "exit_uuid": "72e8219c-62c4-400d-83cb-7b3a501aba91",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "7f45c6e7-1d08-4bad-993d-775078f1cf37"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9cafca43-a000-4bc5-bb24-ba65b4e17eb8",
                "destination_uuid": null
              },
              {
                "uuid": "7de063cf-5909-4108-ab57-fb124a2593fa",
                "destination_uuid": "ad6bf351-0ea7-4be2-88e8-cc21e1de985c"
              },
              {
                "uuid": "436e9e40-edef-43a3-80e6-80a8045ad699",
                "destination_uuid": "78b71277-46b3-49a4-a7e5-27a164fd5fd9"
              },
              {
                "uuid": "72e8219c-62c4-400d-83cb-7b3a501aba91",
                "destination_uuid": "cc03f391-3d76-481b-93d1-3f30696aa554"
              }
            ]
          },
          {
            "uuid": "ad6bf351-0ea7-4be2-88e8-cc21e1de985c",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "74dcdffd-3b66-4d58-b6d2-48a6b204380e"
              }
            ],
            "exits": [
              {
                "uuid": "98ab8bb6-ef45-49fb-9b37-edf321f5b2dd",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "78b71277-46b3-49a4-a7e5-27a164fd5fd9",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "110ec504-4535-4ea1-bfd9-459d2811edc8"
              }
            ],
            "exits": [
              {
                "uuid": "b220d9a8-5750-4f9c-b38a-39b72c38606c",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "cc03f391-3d76-481b-93d1-3f30696aa554",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2b707dc0-d6cc-4269-bb10-a1d0c7e35b3b"
              }
            ],
            "exits": [
              {
                "uuid": "86335af5-0eb4-43ab-ab66-21cfa4ed3bc4",
                "destination_uuid": "079ae185-72ce-4242-b5f3-47df26ab6315"
              }
            ]
          },
          {
            "uuid": "079ae185-72ce-4242-b5f3-47df26ab6315",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ce2b877b-15a3-4b40-b0fe-ea1ad58a33f9",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "1d5969cb-7bf6-4ebe-86e8-717760a573dd",
                  "type": "has_only_phrase",
                  "uuid": "bfa87392-57c8-4849-82be-9e51c4962847"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a0c7d7ff-a067-4390-a5d4-d0ff1792cd87",
                  "name": "All Responses",
                  "uuid": "ce2b877b-15a3-4b40-b0fe-ea1ad58a33f9"
                },
                {
                  "exit_uuid": "3fda41c6-0043-49a2-aaa2-8b44e25fcd2c",
                  "name": "Next",
                  "uuid": "1d5969cb-7bf6-4ebe-86e8-717760a573dd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a0c7d7ff-a067-4390-a5d4-d0ff1792cd87",
                "destination_uuid": null
              },
              {
                "uuid": "3fda41c6-0043-49a2-aaa2-8b44e25fcd2c",
                "destination_uuid": "55d828e8-9f6d-464c-8325-f0ac3c33f33d"
              }
            ]
          },
          {
            "uuid": "55d828e8-9f6d-464c-8325-f0ac3c33f33d",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "9d28e6d3-d89c-4ed4-9429-cca5a899836e"
              }
            ],
            "exits": [
              {
                "uuid": "047039f0-eca9-4ff2-9a0f-028c04d874a6",
                "destination_uuid": "f6050ede-1731-48e0-b75c-565bf900eb6e"
              }
            ]
          },
          {
            "uuid": "f6050ede-1731-48e0-b75c-565bf900eb6e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3a70876d-4d33-45de-ac7c-a1893d3dcd37",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "6060c0da-8312-4874-a57c-e988ade6acbb",
                  "type": "has_only_phrase",
                  "uuid": "c89ae7c8-2608-401b-ae20-f119f19f4c37"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "6cd4bbd1-52dd-43b6-a278-d30c1c248e53",
                  "type": "has_only_phrase",
                  "uuid": "8d5b82bb-b7ba-4d13-b101-ce78a4f8dd3a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8e14574f-e59d-4a81-9b2e-b06b2a8b0448",
                  "name": "All Responses",
                  "uuid": "3a70876d-4d33-45de-ac7c-a1893d3dcd37"
                },
                {
                  "exit_uuid": "ca454b5d-7030-4222-8bf4-d45a23f7148e",
                  "name": "No",
                  "uuid": "6060c0da-8312-4874-a57c-e988ade6acbb"
                },
                {
                  "exit_uuid": "bec12838-87d5-4310-a1b3-826c1e487b63",
                  "name": "Yes",
                  "uuid": "6cd4bbd1-52dd-43b6-a278-d30c1c248e53"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8e14574f-e59d-4a81-9b2e-b06b2a8b0448",
                "destination_uuid": null
              },
              {
                "uuid": "ca454b5d-7030-4222-8bf4-d45a23f7148e",
                "destination_uuid": "5d5f3900-ccad-4af7-98f7-8b5a9b30a5d2"
              },
              {
                "uuid": "bec12838-87d5-4310-a1b3-826c1e487b63",
                "destination_uuid": "66d3a075-75dc-40cb-9e0f-60f176ce69d1"
              }
            ]
          },
          {
            "uuid": "5d5f3900-ccad-4af7-98f7-8b5a9b30a5d2",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d7c22f4e-8bac-48fe-96e3-cd6fd58f7bc9"
              }
            ],
            "exits": [
              {
                "uuid": "b42bce77-9ec4-46c7-85b3-46366ac01901",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "66d3a075-75dc-40cb-9e0f-60f176ce69d1",
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
                "uuid": "f0dd3d08-3a8a-4c1d-8ea0-d5bf7c794099"
              }
            ],
            "exits": [
              {
                "uuid": "b772bc14-2b15-4cf7-999b-f57100ad4d6a",
                "destination_uuid": "60d2f838-ff1f-40f4-a001-22662715dc91"
              }
            ]
          },
          {
            "uuid": "60d2f838-ff1f-40f4-a001-22662715dc91",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d30df6e2-6881-4c85-b6eb-0771ae2d8b84",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "c79d8e55-880b-44b6-9393-0b26593d4f8b",
                  "type": "has_only_phrase",
                  "uuid": "ac68fdd9-6480-4255-ae1a-7dfc01b460a3"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "5258c0c3-2db3-4b2d-b385-f7d1aeadae10",
                  "type": "has_only_phrase",
                  "uuid": "7c1b2132-3aa9-4912-80bd-f000a7956d26"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "24696558-a3b7-4bed-8c24-6c3237c4f199",
                  "type": "has_only_phrase",
                  "uuid": "18b30356-10af-49ee-a721-5097ff8ffe19"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "15d7c3a8-b1bc-4825-832b-7c64564a2815",
                  "type": "has_only_phrase",
                  "uuid": "406bf645-8c85-4165-8067-c53f958de63b"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "5e9297bb-4e7f-4f11-9a59-f77a60864e0a",
                  "type": "has_only_phrase",
                  "uuid": "3d192396-b132-4381-a90d-8166c4d289bc"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "43c305ab-7907-4992-b509-1ef18c92fee1",
                  "type": "has_only_phrase",
                  "uuid": "5b8ac723-9000-492f-91cb-eaab86c9e5be"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "99158aa2-aa12-4e7b-9bb3-38a4f673bcf0",
                  "type": "has_only_phrase",
                  "uuid": "be74a14d-13b9-45c6-aaf5-3de1607456e1"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "2a687ccd-4dc3-416a-9bae-11fc4f1c32e9",
                  "type": "has_only_phrase",
                  "uuid": "4cfd1a0c-0c06-462f-8cf6-617aed574610"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7c6a155e-828f-4b55-b78a-dd18a747deb3",
                  "name": "All Responses",
                  "uuid": "d30df6e2-6881-4c85-b6eb-0771ae2d8b84"
                },
                {
                  "exit_uuid": "b5dc8ef6-23bd-49ad-b138-383d9b36e924",
                  "name": "I don’t have enough time",
                  "uuid": "c79d8e55-880b-44b6-9393-0b26593d4f8b"
                },
                {
                  "exit_uuid": "02a65af2-2650-4e12-8d2a-41d948acfba4",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "5258c0c3-2db3-4b2d-b385-f7d1aeadae10"
                },
                {
                  "exit_uuid": "1b8dcbb6-016b-41fe-b10b-c115796984ad",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "24696558-a3b7-4bed-8c24-6c3237c4f199"
                },
                {
                  "exit_uuid": "4b0418ef-b036-4885-ad07-566ea0c2f022",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "15d7c3a8-b1bc-4825-832b-7c64564a2815"
                },
                {
                  "exit_uuid": "849b0e90-aafc-4456-9c77-2da7e266e7bb",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "5e9297bb-4e7f-4f11-9a59-f77a60864e0a"
                },
                {
                  "exit_uuid": "1f0645cf-5710-4712-a4fe-3b74307b392d",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "43c305ab-7907-4992-b509-1ef18c92fee1"
                },
                {
                  "exit_uuid": "c9a0e84a-b8a3-4aed-a653-4d4b9b66dcb2",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "99158aa2-aa12-4e7b-9bb3-38a4f673bcf0"
                },
                {
                  "exit_uuid": "7e2c8290-cd4f-4ac9-a069-b550a2ae22ef",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "2a687ccd-4dc3-416a-9bae-11fc4f1c32e9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7c6a155e-828f-4b55-b78a-dd18a747deb3",
                "destination_uuid": null
              },
              {
                "uuid": "b5dc8ef6-23bd-49ad-b138-383d9b36e924",
                "destination_uuid": "334eae66-36ad-4a75-930f-817e5ebd085e"
              },
              {
                "uuid": "02a65af2-2650-4e12-8d2a-41d948acfba4",
                "destination_uuid": "51d94d36-80b6-41f9-89a4-7e0a16f28e31"
              },
              {
                "uuid": "1b8dcbb6-016b-41fe-b10b-c115796984ad",
                "destination_uuid": "91c42fa3-431a-47d1-892c-522991ef265a"
              },
              {
                "uuid": "4b0418ef-b036-4885-ad07-566ea0c2f022",
                "destination_uuid": "b24d973b-b07a-42a8-aaef-53374272384e"
              },
              {
                "uuid": "849b0e90-aafc-4456-9c77-2da7e266e7bb",
                "destination_uuid": "1d560449-2f22-4325-8926-4037e1584bc6"
              },
              {
                "uuid": "1f0645cf-5710-4712-a4fe-3b74307b392d",
                "destination_uuid": "695eacb4-2bff-4f0e-acc3-3c9a5a3e9660"
              },
              {
                "uuid": "c9a0e84a-b8a3-4aed-a653-4d4b9b66dcb2",
                "destination_uuid": "0309ef42-a42e-427a-b7ec-0bfcd18000c0"
              },
              {
                "uuid": "7e2c8290-cd4f-4ac9-a069-b550a2ae22ef",
                "destination_uuid": "5f8fa130-9c76-4297-a9b1-af091060feb6"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "509b9cda-c18c-46d5-b94d-fbb593e00e6a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e66dea1b-d062-48b3-85c8-4e9d2da94ac2",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "79ee482e-b8d1-4cc1-a9b8-b17133a28d9c"
              }
            ],
            "exits": [
              {
                "uuid": "972e82d4-bf5f-4af3-8345-8c3c9e4745c6",
                "destination_uuid": "0336e53f-c2ce-4729-b205-2d344d03f516"
              }
            ]
          },
          {
            "uuid": "0336e53f-c2ce-4729-b205-2d344d03f516",
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
                "uuid": "1e77a48c-887f-41ca-9bf7-80a749d1ac5a"
              }
            ],
            "exits": [
              {
                "uuid": "0c9beb39-134d-4dce-ad27-b828dee8ebe9",
                "destination_uuid": "d6f842fe-a624-4dab-a69e-3a30cb2807a5"
              }
            ]
          },
          {
            "uuid": "d6f842fe-a624-4dab-a69e-3a30cb2807a5",
            "actions": [],
            "exits": [
              {
                "uuid": "7053207b-4ee0-4203-9af6-3478ca9a3526",
                "destination_uuid": "b48d20b3-df04-48cc-abbb-5f1b0f22f68a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0c43797c-4962-4fab-8c35-8b43f9ebbeef",
              "cases": [],
              "categories": [
                {
                  "uuid": "0c43797c-4962-4fab-8c35-8b43f9ebbeef",
                  "name": "All Responses",
                  "exit_uuid": "7053207b-4ee0-4203-9af6-3478ca9a3526"
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
            "uuid": "b48d20b3-df04-48cc-abbb-5f1b0f22f68a",
            "actions": [
              {
                "uuid": "30adda04-12ba-42ee-b816-3273bd602c6a",
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
                "uuid": "fddf7fcc-a813-44d5-afd0-16a16080652b",
                "destination_uuid": "720d137d-5299-433b-a018-211d7cff4106"
              }
            ]
          },
          {
            "uuid": "720d137d-5299-433b-a018-211d7cff4106",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1c99bbb0-0ab4-46ac-9ba1-c654d7918692"
              }
            ],
            "exits": [
              {
                "uuid": "c015d314-23dc-49a2-ac2c-b04af2e49df4",
                "destination_uuid": "d92f176b-9459-4f59-a115-f1944dd53997"
              }
            ]
          },
          {
            "uuid": "d92f176b-9459-4f59-a115-f1944dd53997",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "84817a95-7045-4b1b-9cbd-c2aff8049c5b"
              }
            ],
            "exits": [
              {
                "uuid": "60c4ed11-5efb-4cc5-9ef2-547d4632af3a",
                "destination_uuid": "cd2e7ff6-2b57-4fb8-bb1c-22c073c7d64c"
              }
            ]
          },
          {
            "uuid": "cd2e7ff6-2b57-4fb8-bb1c-22c073c7d64c",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f00b4456-937e-4792-adb4-7c1188b89337"
              }
            ],
            "exits": [
              {
                "uuid": "9730937c-1264-4ce6-91b4-aa97f4104b03",
                "destination_uuid": "42e8ddc7-1834-444f-a240-fb09d9ba06d0"
              }
            ]
          },
          {
            "uuid": "42e8ddc7-1834-444f-a240-fb09d9ba06d0",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "403c1840-cf3b-41a9-be46-591450be1e34"
              }
            ],
            "exits": [
              {
                "uuid": "9eba74ba-e2ad-4e6f-8570-2ea6668f1a86",
                "destination_uuid": "7c74d51a-414a-4854-8dab-53c04afeeae3"
              }
            ]
          },
          {
            "uuid": "7c74d51a-414a-4854-8dab-53c04afeeae3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b67776aa-4486-4b02-aa27-ce9839736774",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "15add77c-b862-409a-8098-6f5605139ddf",
                  "type": "has_only_phrase",
                  "uuid": "c3bd9c03-ba80-4f45-87b7-e851d8c2d7ce"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a2f54c59-571b-4d87-953b-d4a2908409b4",
                  "name": "All Responses",
                  "uuid": "b67776aa-4486-4b02-aa27-ce9839736774"
                },
                {
                  "exit_uuid": "7a80e42f-7880-49eb-b96d-71a4b94500eb",
                  "name": "Let me hear your story",
                  "uuid": "15add77c-b862-409a-8098-6f5605139ddf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a2f54c59-571b-4d87-953b-d4a2908409b4",
                "destination_uuid": null
              },
              {
                "uuid": "7a80e42f-7880-49eb-b96d-71a4b94500eb",
                "destination_uuid": "d08d0ce7-56ae-4b8c-a874-01055d4ef05d"
              }
            ]
          },
          {
            "uuid": "d08d0ce7-56ae-4b8c-a874-01055d4ef05d",
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
                "uuid": "3de62750-615f-4be8-b2cd-fee70f576900"
              }
            ],
            "exits": [
              {
                "uuid": "4e74a707-1eda-4b39-b8f3-a014e893c71a",
                "destination_uuid": "0431f4a8-b495-4ae3-a864-f939ceacaadf"
              }
            ]
          },
          {
            "uuid": "0431f4a8-b495-4ae3-a864-f939ceacaadf",
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
                "uuid": "4d6b6dd8-4754-499a-a550-2341f67d76b1"
              }
            ],
            "exits": [
              {
                "uuid": "ca256439-9749-46d2-9f59-47493e85831a",
                "destination_uuid": "b28549db-6107-49a4-88fb-14b36cab1d98"
              }
            ]
          },
          {
            "uuid": "b28549db-6107-49a4-88fb-14b36cab1d98",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "455df339-657c-449e-b792-9fbb9285ff18",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "050b6ce6-6766-411c-aba3-0b1fb9838fa0",
                  "type": "has_only_phrase",
                  "uuid": "1167378c-924f-47a5-a88a-cca433c9fcbb"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "2eeb3013-c83b-49c0-8ca0-4e2468e1ca8a",
                  "type": "has_only_phrase",
                  "uuid": "91be298b-8408-4066-9105-49de5f70c623"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "39296e10-2eae-41a1-8c12-82236d125c60",
                  "name": "All Responses",
                  "uuid": "455df339-657c-449e-b792-9fbb9285ff18"
                },
                {
                  "exit_uuid": "29c36159-3114-420b-9f0e-b03a9e7a314e",
                  "name": "Previous",
                  "uuid": "050b6ce6-6766-411c-aba3-0b1fb9838fa0"
                },
                {
                  "exit_uuid": "1740210e-e439-43e9-82cb-49bc96c63cc4",
                  "name": "Next",
                  "uuid": "2eeb3013-c83b-49c0-8ca0-4e2468e1ca8a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "39296e10-2eae-41a1-8c12-82236d125c60",
                "destination_uuid": null
              },
              {
                "uuid": "29c36159-3114-420b-9f0e-b03a9e7a314e",
                "destination_uuid": "d08d0ce7-56ae-4b8c-a874-01055d4ef05d"
              },
              {
                "uuid": "1740210e-e439-43e9-82cb-49bc96c63cc4",
                "destination_uuid": "c813c09f-a398-4013-bd21-b31b870d947a"
              }
            ]
          },
          {
            "uuid": "c813c09f-a398-4013-bd21-b31b870d947a",
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
                "uuid": "ff18ce10-a3d6-44b8-aa19-79e237d87aeb"
              }
            ],
            "exits": [
              {
                "uuid": "3ef83f08-29fa-4611-bee9-abbc7b1bdec8",
                "destination_uuid": "d8caa00e-ffa1-4ec0-8593-067bb41925f3"
              }
            ]
          },
          {
            "uuid": "d8caa00e-ffa1-4ec0-8593-067bb41925f3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "241ed87b-6228-489c-8002-0f7a09184599",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "822f8893-3846-45f5-8da0-86c7a1fe8b1b",
                  "type": "has_only_phrase",
                  "uuid": "2f4cb54b-4cf4-4635-a9d1-85ed5a1b3728"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b3c0b4ee-08ec-4693-b206-10426c6d51ae",
                  "type": "has_only_phrase",
                  "uuid": "018f3441-9e68-4563-8c69-81f56983bd97"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "aeea5750-4cf6-4e31-a073-22b19c022a95",
                  "name": "All Responses",
                  "uuid": "241ed87b-6228-489c-8002-0f7a09184599"
                },
                {
                  "exit_uuid": "5200baf2-0a6d-4011-92ad-5b56ce642247",
                  "name": "Previous",
                  "uuid": "822f8893-3846-45f5-8da0-86c7a1fe8b1b"
                },
                {
                  "exit_uuid": "32575539-820b-45f5-89b0-053bbe6ee352",
                  "name": "Next",
                  "uuid": "b3c0b4ee-08ec-4693-b206-10426c6d51ae"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "aeea5750-4cf6-4e31-a073-22b19c022a95",
                "destination_uuid": null
              },
              {
                "uuid": "5200baf2-0a6d-4011-92ad-5b56ce642247",
                "destination_uuid": "0431f4a8-b495-4ae3-a864-f939ceacaadf"
              },
              {
                "uuid": "32575539-820b-45f5-89b0-053bbe6ee352",
                "destination_uuid": "a695f678-8f21-409d-a089-e063d89b7282"
              }
            ]
          },
          {
            "uuid": "a695f678-8f21-409d-a089-e063d89b7282",
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
                "uuid": "238feefe-da47-45f6-b351-ebc4868d7f26"
              }
            ],
            "exits": [
              {
                "uuid": "cacb9c26-c466-41a2-ac3c-bc5a37acecf0",
                "destination_uuid": "015b2060-1da6-47e2-b7b8-eb9790192ff1"
              }
            ]
          },
          {
            "uuid": "015b2060-1da6-47e2-b7b8-eb9790192ff1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c27c62fc-fb22-4b76-a74e-8500ea45dadb",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "3096ec60-ac71-49bb-acb2-031840229a09",
                  "type": "has_only_phrase",
                  "uuid": "2b79b2e1-1950-4f64-92dc-3a998f0e7c9a"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "fddcefb8-6892-4351-b8ce-427c0fff1169",
                  "type": "has_only_phrase",
                  "uuid": "c1e031c7-59e8-4a33-b525-d69ad4627604"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2970ece1-05ed-4586-b802-202ecf08eda1",
                  "name": "All Responses",
                  "uuid": "c27c62fc-fb22-4b76-a74e-8500ea45dadb"
                },
                {
                  "exit_uuid": "dc7b8e7b-73e5-435d-b487-44d50bfd1b5f",
                  "name": "Previous",
                  "uuid": "3096ec60-ac71-49bb-acb2-031840229a09"
                },
                {
                  "exit_uuid": "f0c3984d-2d1a-425e-9a4f-d23df4cc895a",
                  "name": "Next",
                  "uuid": "fddcefb8-6892-4351-b8ce-427c0fff1169"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2970ece1-05ed-4586-b802-202ecf08eda1",
                "destination_uuid": null
              },
              {
                "uuid": "dc7b8e7b-73e5-435d-b487-44d50bfd1b5f",
                "destination_uuid": "c813c09f-a398-4013-bd21-b31b870d947a"
              },
              {
                "uuid": "f0c3984d-2d1a-425e-9a4f-d23df4cc895a",
                "destination_uuid": "3de833ef-fa05-4678-a8b4-604df7a9f853"
              }
            ]
          },
          {
            "uuid": "3de833ef-fa05-4678-a8b4-604df7a9f853",
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
                "uuid": "d5922f83-b6ae-40e9-b732-849e04333fef"
              }
            ],
            "exits": [
              {
                "uuid": "4dbed546-3567-4b6f-8877-d3539b979feb",
                "destination_uuid": "c0a67927-cd63-4329-90e7-bec61f75fffd"
              }
            ]
          },
          {
            "uuid": "c0a67927-cd63-4329-90e7-bec61f75fffd",
            "actions": [],
            "exits": [
              {
                "uuid": "978985e7-e460-4462-8a73-2c3da6cf7d5a",
                "destination_uuid": "9c76bb8e-628a-4b98-a3c2-752e61ac7979"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "06f4438b-c8f2-48e3-9013-0853917d4603",
              "cases": [],
              "categories": [
                {
                  "uuid": "06f4438b-c8f2-48e3-9013-0853917d4603",
                  "name": "All Responses",
                  "exit_uuid": "978985e7-e460-4462-8a73-2c3da6cf7d5a"
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
            "uuid": "9c76bb8e-628a-4b98-a3c2-752e61ac7979",
            "actions": [
              {
                "uuid": "337d5de1-ea0f-4aca-af97-0ab50200480e",
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
                "uuid": "72045d19-238c-4c3a-88a1-6548f643bbb9",
                "destination_uuid": "b5a8ec21-d3aa-4cdd-b85e-713c2deb8772"
              }
            ]
          },
          {
            "uuid": "b5a8ec21-d3aa-4cdd-b85e-713c2deb8772",
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
                "uuid": "561c890a-d7bc-4512-a2e4-19353d558803"
              }
            ],
            "exits": [
              {
                "uuid": "09255d3d-443b-42f3-b1ea-72339a44679d",
                "destination_uuid": "e03ab2b0-8cc4-4263-a883-ba30d8db665f"
              }
            ]
          },
          {
            "uuid": "e03ab2b0-8cc4-4263-a883-ba30d8db665f",
            "actions": [],
            "exits": [
              {
                "uuid": "9908e1b7-c1fb-4254-bd50-b54c9b9f959d",
                "destination_uuid": "632e607e-dc15-4ce8-a907-32cecac2a63c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "97c4a159-03c0-4280-ad2b-3ec31e33c15f",
              "cases": [],
              "categories": [
                {
                  "uuid": "97c4a159-03c0-4280-ad2b-3ec31e33c15f",
                  "name": "All Responses",
                  "exit_uuid": "9908e1b7-c1fb-4254-bd50-b54c9b9f959d"
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
            "uuid": "632e607e-dc15-4ce8-a907-32cecac2a63c",
            "actions": [
              {
                "uuid": "0bed86e1-84bb-4486-8db3-41725adf3b86",
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
                "uuid": "3ca00a09-f0a0-4e94-b006-b9ce3dd33cea",
                "destination_uuid": "55a9a7e7-ae99-4c05-91ef-ea77281472d0"
              }
            ]
          },
          {
            "uuid": "55a9a7e7-ae99-4c05-91ef-ea77281472d0",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1dc9b4f8-5700-4835-83d7-325f9a69a567"
              }
            ],
            "exits": [
              {
                "uuid": "52d3a53e-1797-4b0d-aeab-f729d908b673",
                "destination_uuid": "a921ba65-02da-499f-aa96-7cfc14c56a35"
              }
            ]
          },
          {
            "uuid": "a921ba65-02da-499f-aa96-7cfc14c56a35",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "0a89e4c4-2dcc-4e30-943a-21395ed5d61b"
              }
            ],
            "exits": [
              {
                "uuid": "ea1405dc-fc64-4422-a699-8ce730e5db99",
                "destination_uuid": "3627ae27-5bb0-4d53-977d-8467bfc3d439"
              }
            ]
          },
          {
            "uuid": "3627ae27-5bb0-4d53-977d-8467bfc3d439",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b27ccf9f-e632-419f-a883-a7939554b30a",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "b274bdd2-703c-44d6-9ff1-f7a2f9afd6fd",
                  "type": "has_only_phrase",
                  "uuid": "c7c11699-4e5f-4968-bb65-8bc08045831f"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "8d06333d-fd33-4d70-aed1-95e5c8038954",
                  "type": "has_only_phrase",
                  "uuid": "c1f9b6b0-f5e4-4338-9c6e-c892b46de63b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f5c70476-5fb2-4b72-a9f9-5de404d3e38c",
                  "name": "All Responses",
                  "uuid": "b27ccf9f-e632-419f-a883-a7939554b30a"
                },
                {
                  "exit_uuid": "70c4d726-e31c-4764-a40e-495444e72e5e",
                  "name": "Take me to Tips",
                  "uuid": "b274bdd2-703c-44d6-9ff1-f7a2f9afd6fd"
                },
                {
                  "exit_uuid": "121c8b3f-37a2-466f-8065-f89272f6a9f4",
                  "name": "Take me to Homescreen",
                  "uuid": "8d06333d-fd33-4d70-aed1-95e5c8038954"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f5c70476-5fb2-4b72-a9f9-5de404d3e38c",
                "destination_uuid": null
              },
              {
                "uuid": "70c4d726-e31c-4764-a40e-495444e72e5e",
                "destination_uuid": "449362cb-2d05-4db1-ba53-9fbdc7640e10"
              },
              {
                "uuid": "121c8b3f-37a2-466f-8065-f89272f6a9f4",
                "destination_uuid": "cadd7b85-4982-427c-83e0-ed3676447bed"
              }
            ]
          },
          {
            "uuid": "449362cb-2d05-4db1-ba53-9fbdc7640e10",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "892b5d39-8cd8-4913-894a-6ae4141bf529"
                },
                "type": "enter_flow",
                "uuid": "b0c771f7-fc4f-4744-8432-d4ef69ca1d42"
              }
            ],
            "exits": [
              {
                "uuid": "6b0ce183-9d20-45d7-8d6b-936fc8248057",
                "destination_uuid": null
              },
              {
                "uuid": "980a3be1-2e4f-4308-ad8e-23902c2a3180",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "9963b5b2-89a1-4422-a0c9-4051c4b2e06d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "fe5ff8cd-4c45-48af-99ff-3be19d873761"
                },
                {
                  "uuid": "a723461c-5541-4f73-b3f9-4f1cefe28502",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b33281c7-3400-4eb1-8b64-a9724e7b107a"
                }
              ],
              "categories": [
                {
                  "uuid": "fe5ff8cd-4c45-48af-99ff-3be19d873761",
                  "name": "Complete",
                  "exit_uuid": "6b0ce183-9d20-45d7-8d6b-936fc8248057"
                },
                {
                  "uuid": "b33281c7-3400-4eb1-8b64-a9724e7b107a",
                  "name": "Expired",
                  "exit_uuid": "980a3be1-2e4f-4308-ad8e-23902c2a3180"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "fe5ff8cd-4c45-48af-99ff-3be19d873761"
            }
          },
          {
            "uuid": "cadd7b85-4982-427c-83e0-ed3676447bed",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "468ee1aa-2f52-4d5c-b8f4-12370b3b5114"
                },
                "type": "enter_flow",
                "uuid": "e24f1f7b-c094-4cbb-9835-8ce66e48cbde"
              }
            ],
            "exits": [
              {
                "uuid": "05e279a3-88b5-4330-9403-5d6891036e2a",
                "destination_uuid": null
              },
              {
                "uuid": "3ebe1378-bdb1-4cfc-9558-4b0166a36f3d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e3667476-56d3-475e-8e20-3aa488590f75",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "813a901a-aa53-4445-9b6a-6556e724a6e2"
                },
                {
                  "uuid": "4285312c-c531-473e-a3f3-a6d904bbcff9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "09acfbd7-40ab-479b-ab81-042c26d6614b"
                }
              ],
              "categories": [
                {
                  "uuid": "813a901a-aa53-4445-9b6a-6556e724a6e2",
                  "name": "Complete",
                  "exit_uuid": "05e279a3-88b5-4330-9403-5d6891036e2a"
                },
                {
                  "uuid": "09acfbd7-40ab-479b-ab81-042c26d6614b",
                  "name": "Expired",
                  "exit_uuid": "3ebe1378-bdb1-4cfc-9558-4b0166a36f3d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "813a901a-aa53-4445-9b6a-6556e724a6e2"
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
        "name": "mod_praise_activity",
        "uuid": "86db06ce-bcbc-4495-8a93-00bde8844099",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ff020581-ba27-44b7-a400-471cf986d92f",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ef7ad57c-d6ec-4e9d-9889-0b9351884bc7"
              }
            ],
            "exits": [
              {
                "uuid": "a66a6e74-1cbe-4aa8-b8c7-1da93bf098a8",
                "destination_uuid": "29e90597-a1fe-4c44-879f-89c538a71873"
              }
            ]
          },
          {
            "uuid": "29e90597-a1fe-4c44-879f-89c538a71873",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "abdd7539-55bc-4c18-9b74-2239cd9bf3f1"
              }
            ],
            "exits": [
              {
                "uuid": "0b836f8d-bdd7-43e5-bfa2-550357466db6",
                "destination_uuid": "e3833b10-5c08-4e04-b918-71af1568ac38"
              }
            ]
          },
          {
            "uuid": "e3833b10-5c08-4e04-b918-71af1568ac38",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "25a5455c-beeb-4acc-aff6-902bcf199b41",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "b00f56bc-c631-47bd-900f-d78c77ece8e8",
                  "type": "has_only_phrase",
                  "uuid": "6de5c9e1-7102-4a41-8e26-897bd7790b48"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "c78929ce-5543-44b1-a627-d77bc3c79d3b",
                  "type": "has_only_phrase",
                  "uuid": "b818002b-c4c5-4076-8898-6e94be1a529d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "059b6033-a2b6-48d9-bbb6-47227dcfe52a",
                  "name": "All Responses",
                  "uuid": "25a5455c-beeb-4acc-aff6-902bcf199b41"
                },
                {
                  "exit_uuid": "0e1af168-6a0b-47bd-a42b-f7683d780ef0",
                  "name": "Later",
                  "uuid": "b00f56bc-c631-47bd-900f-d78c77ece8e8"
                },
                {
                  "exit_uuid": "e4bcb9a6-a49c-44cf-bf40-0639a5c4a5dd",
                  "name": "Yes",
                  "uuid": "c78929ce-5543-44b1-a627-d77bc3c79d3b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "059b6033-a2b6-48d9-bbb6-47227dcfe52a",
                "destination_uuid": null
              },
              {
                "uuid": "0e1af168-6a0b-47bd-a42b-f7683d780ef0",
                "destination_uuid": "1fcd8d62-2b29-45b1-a0f7-163cbea51562"
              },
              {
                "uuid": "e4bcb9a6-a49c-44cf-bf40-0639a5c4a5dd",
                "destination_uuid": "efa0f1f2-ac2e-44c3-b8bc-e5be3d7aea08"
              }
            ]
          },
          {
            "uuid": "1fcd8d62-2b29-45b1-a0f7-163cbea51562",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "e7fb4234-1f90-40db-85a7-cad75edb0cd4"
                },
                "type": "enter_flow",
                "uuid": "39120ccd-bb6a-447c-a957-a4e00497b9b4"
              }
            ],
            "exits": [
              {
                "uuid": "67777324-0cc6-41d6-a165-dd566ab1d057",
                "destination_uuid": null
              },
              {
                "uuid": "02d30bc9-fc8b-4daa-81c1-cbfe013f3be6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "f8c4a7c5-190a-49d0-b818-faa729354c6a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7a0202bf-a986-4e18-af0a-284828bd5f6d"
                },
                {
                  "uuid": "8d275d29-b9f3-4583-9b7b-4e6ebb14b4de",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "44b23718-7ea5-4871-a285-43aedd5ccf98"
                }
              ],
              "categories": [
                {
                  "uuid": "7a0202bf-a986-4e18-af0a-284828bd5f6d",
                  "name": "Complete",
                  "exit_uuid": "67777324-0cc6-41d6-a165-dd566ab1d057"
                },
                {
                  "uuid": "44b23718-7ea5-4871-a285-43aedd5ccf98",
                  "name": "Expired",
                  "exit_uuid": "02d30bc9-fc8b-4daa-81c1-cbfe013f3be6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7a0202bf-a986-4e18-af0a-284828bd5f6d"
            }
          },
          {
            "uuid": "efa0f1f2-ac2e-44c3-b8bc-e5be3d7aea08",
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
                "uuid": "5479eb70-d2a0-4ea1-9fab-b41951d6db45"
              }
            ],
            "exits": [
              {
                "uuid": "d11b097e-0fa5-4303-ba98-217189948146",
                "destination_uuid": "0fd37b68-91e9-4786-9b72-b65c138c6dcc"
              }
            ]
          },
          {
            "uuid": "0fd37b68-91e9-4786-9b72-b65c138c6dcc",
            "actions": [],
            "exits": [
              {
                "uuid": "a3bb75a3-a51c-4c44-bda7-c3bc434439f9",
                "destination_uuid": "0d7bd76a-cddc-4e36-8a14-957be855c81a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9eb1c521-a139-42fa-a7fa-30d1811655de",
              "cases": [],
              "categories": [
                {
                  "uuid": "9eb1c521-a139-42fa-a7fa-30d1811655de",
                  "name": "All Responses",
                  "exit_uuid": "a3bb75a3-a51c-4c44-bda7-c3bc434439f9"
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
            "uuid": "0d7bd76a-cddc-4e36-8a14-957be855c81a",
            "actions": [
              {
                "uuid": "d5bc5a56-3b15-477d-9e84-6929f7ff21cb",
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
                "uuid": "e8e59fd7-644b-4581-bb36-9e9606fa90b3",
                "destination_uuid": "7b9150bb-843d-49ab-8379-7e9b5320a0a2"
              }
            ]
          },
          {
            "uuid": "7b9150bb-843d-49ab-8379-7e9b5320a0a2",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "ae8e4950-9810-46ab-844e-5bf23e752f53"
              }
            ],
            "exits": [
              {
                "uuid": "cc171b54-ed3e-4cc4-8d22-4194056bc843",
                "destination_uuid": "f96dab18-c3ed-4046-bf3c-b5b5924529de"
              }
            ]
          },
          {
            "uuid": "f96dab18-c3ed-4046-bf3c-b5b5924529de",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "42b10db5-6df1-488e-a988-0787009efc28",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "8953f241-4aa7-45e1-90ec-6ebc3d462ffe",
                  "type": "has_only_phrase",
                  "uuid": "49f3b1da-11f5-407a-873c-7bf3673ddf83"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "689a3bb6-26e1-48fa-86eb-6cf066ebc657",
                  "name": "All Responses",
                  "uuid": "42b10db5-6df1-488e-a988-0787009efc28"
                },
                {
                  "exit_uuid": "da544bf7-f77e-4c7b-8b48-44e74b4fc286",
                  "name": "Click here when done",
                  "uuid": "8953f241-4aa7-45e1-90ec-6ebc3d462ffe"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "689a3bb6-26e1-48fa-86eb-6cf066ebc657",
                "destination_uuid": null
              },
              {
                "uuid": "da544bf7-f77e-4c7b-8b48-44e74b4fc286",
                "destination_uuid": "a532bb85-76cf-4f22-aa3e-8a4d347af2da"
              }
            ]
          },
          {
            "uuid": "a532bb85-76cf-4f22-aa3e-8a4d347af2da",
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
                "uuid": "064f18c0-dd79-447d-9ff0-dae1b2e59dfa"
              }
            ],
            "exits": [
              {
                "uuid": "057e4294-ed66-4bed-b1f4-e8de29507e81",
                "destination_uuid": "41e24f69-653e-490f-9902-168db6fd3518"
              }
            ]
          },
          {
            "uuid": "41e24f69-653e-490f-9902-168db6fd3518",
            "actions": [],
            "exits": [
              {
                "uuid": "e0325534-d413-4d0c-a04d-27671b119ed3",
                "destination_uuid": "5b916403-7e12-4130-b602-9de56cb597f4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8cfe603e-02ab-4ac5-8547-983c91903860",
              "cases": [],
              "categories": [
                {
                  "uuid": "8cfe603e-02ab-4ac5-8547-983c91903860",
                  "name": "All Responses",
                  "exit_uuid": "e0325534-d413-4d0c-a04d-27671b119ed3"
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
            "uuid": "5b916403-7e12-4130-b602-9de56cb597f4",
            "actions": [
              {
                "uuid": "e51af0cc-023f-4e54-aaea-cf5cd923ebb6",
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
                "uuid": "2b88ba91-f125-4494-91c9-ce01572e28ea",
                "destination_uuid": "e7fd0084-1f86-4c99-b80e-d8b87deff51a"
              }
            ]
          },
          {
            "uuid": "e7fd0084-1f86-4c99-b80e-d8b87deff51a",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "c6686741-3c60-496a-bff2-d8ad4abc62c2"
              }
            ],
            "exits": [
              {
                "uuid": "480025e9-629c-4439-85c7-60df33f5c1e6",
                "destination_uuid": "311c602d-3263-4b7d-b2eb-6a8a3bc78bcf"
              }
            ]
          },
          {
            "uuid": "311c602d-3263-4b7d-b2eb-6a8a3bc78bcf",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5b47dfe9-f067-431e-990c-9f7fdff6bbc4",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "fac04cb5-d8b6-4ee0-91ec-d8b768bc890b",
                  "type": "has_only_phrase",
                  "uuid": "b3ab2499-f854-46dc-b6f2-319f919f8df4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "38522bb3-d3c0-4375-b6cb-a6bedbd353ac",
                  "name": "All Responses",
                  "uuid": "5b47dfe9-f067-431e-990c-9f7fdff6bbc4"
                },
                {
                  "exit_uuid": "05ca7d50-2c60-4a49-bb27-5caf3467dc9a",
                  "name": "Click here when done",
                  "uuid": "fac04cb5-d8b6-4ee0-91ec-d8b768bc890b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "38522bb3-d3c0-4375-b6cb-a6bedbd353ac",
                "destination_uuid": null
              },
              {
                "uuid": "05ca7d50-2c60-4a49-bb27-5caf3467dc9a",
                "destination_uuid": "11465ff3-f31f-4b4b-af80-8ee63a91d910"
              }
            ]
          },
          {
            "uuid": "11465ff3-f31f-4b4b-af80-8ee63a91d910",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ad8927bd-f21b-4b37-a7bd-a7b0b4f5a310"
              }
            ],
            "exits": [
              {
                "uuid": "6db6b73b-d67e-4393-91bc-ab0c8e2220ba",
                "destination_uuid": "0fc6c651-7708-40f4-9463-b01cba4d2c1d"
              }
            ]
          },
          {
            "uuid": "0fc6c651-7708-40f4-9463-b01cba4d2c1d",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b4524915-dbf3-4377-8e61-3c6ed15adbb6"
              }
            ],
            "exits": [
              {
                "uuid": "df3660ff-d23c-4542-94c3-e0e1cfc9824f",
                "destination_uuid": "8eb0dbd1-b647-401f-9035-331471e98158"
              }
            ]
          },
          {
            "uuid": "8eb0dbd1-b647-401f-9035-331471e98158",
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
                "uuid": "2f8b88a0-2abd-4eea-8880-9fe9e243de36"
              }
            ],
            "exits": [
              {
                "uuid": "8d701ae1-17a1-45fc-9353-fddc5d9be785",
                "destination_uuid": "9d1cbeed-ef9d-4597-99f6-fccd6bb7aea4"
              }
            ]
          },
          {
            "uuid": "9d1cbeed-ef9d-4597-99f6-fccd6bb7aea4",
            "actions": [],
            "exits": [
              {
                "uuid": "0b8d073e-03a1-4cff-9c6e-a7318de91833",
                "destination_uuid": "6bcb767c-38bf-4a25-98fb-276e2e55183f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "dc8d0189-aa16-4ecb-a2a7-ff22bb8dec17",
              "cases": [],
              "categories": [
                {
                  "uuid": "dc8d0189-aa16-4ecb-a2a7-ff22bb8dec17",
                  "name": "All Responses",
                  "exit_uuid": "0b8d073e-03a1-4cff-9c6e-a7318de91833"
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
            "uuid": "6bcb767c-38bf-4a25-98fb-276e2e55183f",
            "actions": [
              {
                "uuid": "c3542503-f45b-4dc5-b496-13ddd834d906",
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
                "uuid": "80febd4a-908e-4961-9a00-3e939b94ed5a",
                "destination_uuid": "4ed3ab90-657f-456d-9432-2cb3dbdb6463"
              }
            ]
          },
          {
            "uuid": "4ed3ab90-657f-456d-9432-2cb3dbdb6463",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "3567b734-996b-4997-9f08-7b58ab011404"
              }
            ],
            "exits": [
              {
                "uuid": "a2fc5548-0bff-4f72-9f1f-f1be759d9626",
                "destination_uuid": "ee9bcb18-c74e-4cb2-a8a4-695477476c46"
              }
            ]
          },
          {
            "uuid": "ee9bcb18-c74e-4cb2-a8a4-695477476c46",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6fd89d6f-e4f8-4187-8464-76b41164ef72",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "9b56ddca-d418-49e5-91fa-92ee2706a035",
                  "type": "has_only_phrase",
                  "uuid": "fbe91b72-e36b-4cdb-8d7e-67709a1271fd"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0241527b-748a-4142-8331-f92b225da281",
                  "name": "All Responses",
                  "uuid": "6fd89d6f-e4f8-4187-8464-76b41164ef72"
                },
                {
                  "exit_uuid": "76d3da24-894f-47be-a546-3202fd3f9c0a",
                  "name": "Take me to Homescreen",
                  "uuid": "9b56ddca-d418-49e5-91fa-92ee2706a035"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0241527b-748a-4142-8331-f92b225da281",
                "destination_uuid": null
              },
              {
                "uuid": "76d3da24-894f-47be-a546-3202fd3f9c0a",
                "destination_uuid": "9cf1d75d-abec-4886-95d4-1d809c6afd2f"
              }
            ]
          },
          {
            "uuid": "9cf1d75d-abec-4886-95d4-1d809c6afd2f",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "a750d6d7-ff79-4292-8e46-f13d83046b81"
                },
                "type": "enter_flow",
                "uuid": "f4be2c1f-3114-4192-bce1-729a87c86170"
              }
            ],
            "exits": [
              {
                "uuid": "faa752a5-b66e-41f7-80ff-9b7f8e09aa23",
                "destination_uuid": null
              },
              {
                "uuid": "3809a3c7-965b-419b-859b-7d43a0b66adb",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "96406d8d-8eba-4202-b03e-8708b517539c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b4a07962-87ad-49c4-a361-c14770abcf95"
                },
                {
                  "uuid": "28400bfa-1cab-45e2-8920-b683e2fda16a",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "74fa6afc-c061-493c-8c10-0dcc3152d5ba"
                }
              ],
              "categories": [
                {
                  "uuid": "b4a07962-87ad-49c4-a361-c14770abcf95",
                  "name": "Complete",
                  "exit_uuid": "faa752a5-b66e-41f7-80ff-9b7f8e09aa23"
                },
                {
                  "uuid": "74fa6afc-c061-493c-8c10-0dcc3152d5ba",
                  "name": "Expired",
                  "exit_uuid": "3809a3c7-965b-419b-859b-7d43a0b66adb"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b4a07962-87ad-49c4-a361-c14770abcf95"
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
        "name": "mod_praise_activity_review",
        "uuid": "b4a693db-fd91-4b3f-9311-13c43f89c0eb",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5564e601-b4d3-4556-b35c-14f479988315",
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
                "uuid": "7d28eeee-9d2e-4bed-9e73-f3837d4cc526"
              }
            ],
            "exits": [
              {
                "uuid": "6837dea9-e5ca-40ab-9af0-5c1778dc5c69",
                "destination_uuid": "14f49395-4fe2-4fcd-ac0c-3920a7181044"
              }
            ]
          },
          {
            "uuid": "14f49395-4fe2-4fcd-ac0c-3920a7181044",
            "actions": [],
            "exits": [
              {
                "uuid": "45c53a46-d7da-4bd0-b2ed-633c1386a913",
                "destination_uuid": "e3e84f5b-6f4a-4574-a103-7566047dd43e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "406835ff-5844-4fb2-a4ea-e2153e873f8c",
              "cases": [],
              "categories": [
                {
                  "uuid": "406835ff-5844-4fb2-a4ea-e2153e873f8c",
                  "name": "All Responses",
                  "exit_uuid": "45c53a46-d7da-4bd0-b2ed-633c1386a913"
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
            "uuid": "e3e84f5b-6f4a-4574-a103-7566047dd43e",
            "actions": [
              {
                "uuid": "821add52-28c2-4a03-b7ee-cecf9ca39a26",
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
                "uuid": "28b12d45-bad4-4aa3-9e1d-3548b618a7ed",
                "destination_uuid": "3ac82552-8909-4fb2-8286-36b3915df0f3"
              }
            ]
          },
          {
            "uuid": "3ac82552-8909-4fb2-8286-36b3915df0f3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "25d0ff14-a3f9-43cf-9cce-82656ca86009",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "dc07f612-f576-43e9-abfc-bf16cb812ea2",
                  "type": "has_only_phrase",
                  "uuid": "383d0004-f632-4d88-9213-3453f8849353"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "97063a46-fff3-4b85-b8c4-e2ee29b906c9",
                  "type": "has_only_phrase",
                  "uuid": "ae5a4aba-5292-4fdb-b51c-79aedec5268e"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "97063a46-fff3-4b85-b8c4-e2ee29b906c9",
                  "type": "has_only_phrase",
                  "uuid": "0e445ec0-109d-4308-a43d-9c7a7ee50210"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7a9800bc-6253-4863-a028-e8764e9e6672",
                  "name": "All Responses",
                  "uuid": "25d0ff14-a3f9-43cf-9cce-82656ca86009"
                },
                {
                  "exit_uuid": "1a7875f0-c7f3-41c2-9350-267cdc48a3d2",
                  "name": "Great",
                  "uuid": "dc07f612-f576-43e9-abfc-bf16cb812ea2"
                },
                {
                  "exit_uuid": "0bdd06e4-b726-46db-96d9-b78b52fe35f0",
                  "name": "Neutral; Bad",
                  "uuid": "97063a46-fff3-4b85-b8c4-e2ee29b906c9"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "7a9800bc-6253-4863-a028-e8764e9e6672",
                "destination_uuid": null
              },
              {
                "uuid": "1a7875f0-c7f3-41c2-9350-267cdc48a3d2",
                "destination_uuid": "8fca7ff5-9780-470e-ac56-cc2f05af7ac3"
              },
              {
                "uuid": "0bdd06e4-b726-46db-96d9-b78b52fe35f0",
                "destination_uuid": "75a787cb-d55f-4056-b101-1991c3ad0c87"
              }
            ]
          },
          {
            "uuid": "8fca7ff5-9780-470e-ac56-cc2f05af7ac3",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "153c25e8-dcc1-4b3a-9d74-e7c163ed312a"
              }
            ],
            "exits": [
              {
                "uuid": "cd0884a4-4ae9-4c3d-b29d-6594da949e40",
                "destination_uuid": "d05d7ca3-9f42-46d2-b23e-645039ec5fb3"
              }
            ]
          },
          {
            "uuid": "75a787cb-d55f-4056-b101-1991c3ad0c87",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "1c66f964-ece3-4903-b587-1f048c77dfa3"
              }
            ],
            "exits": [
              {
                "uuid": "d6c8d438-ebd9-4874-a250-839b748f6aff",
                "destination_uuid": "a99e6361-b62a-4be0-b52f-8ffaf4c3fc89"
              }
            ]
          },
          {
            "uuid": "a99e6361-b62a-4be0-b52f-8ffaf4c3fc89",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9e14468d-4cc4-4d5b-969f-c9e04768eeeb",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "69dd12f2-506b-45db-b7d9-de0f8ffef891",
                  "type": "has_only_phrase",
                  "uuid": "b5c6b24e-14fa-479a-af8a-bd56148a6b8c"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "1ba5204a-8c20-418f-b69a-e197ffbc85e0",
                  "type": "has_only_phrase",
                  "uuid": "e2434a16-288c-4c5d-a9f8-369c226a724f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a825a6f2-1dac-4cca-95d8-d9f67b293a24",
                  "name": "All Responses",
                  "uuid": "9e14468d-4cc4-4d5b-969f-c9e04768eeeb"
                },
                {
                  "exit_uuid": "37618c3e-26bd-4041-9fb8-4af7e2e66483",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "69dd12f2-506b-45db-b7d9-de0f8ffef891"
                },
                {
                  "exit_uuid": "617bde97-9d91-4f94-802b-966d9d4d6854",
                  "name": "Continue",
                  "uuid": "1ba5204a-8c20-418f-b69a-e197ffbc85e0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a825a6f2-1dac-4cca-95d8-d9f67b293a24",
                "destination_uuid": null
              },
              {
                "uuid": "37618c3e-26bd-4041-9fb8-4af7e2e66483",
                "destination_uuid": "42da6644-5e07-4fa7-b3c0-067b76f26c9f"
              },
              {
                "uuid": "617bde97-9d91-4f94-802b-966d9d4d6854",
                "destination_uuid": "8a8f10cb-022d-4389-8b04-98649cd0fdc8"
              }
            ]
          },
          {
            "uuid": "42da6644-5e07-4fa7-b3c0-067b76f26c9f",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "16ae8f85-9156-4ac9-be6a-d761fb4cdc48"
                },
                "type": "enter_flow",
                "uuid": "bf901027-3d25-4cc4-8455-818c3bfaa95b"
              }
            ],
            "exits": [
              {
                "uuid": "0fac5e71-142d-4e65-ad97-4fea97c08fb1",
                "destination_uuid": "b923bb7b-a0bc-415f-a17d-abb5ca34f08e"
              },
              {
                "uuid": "828a1b73-1545-4438-82fc-a8c548e26cab",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2ee33d6e-1406-4c74-bcfd-ace6c748e28e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "dde0d017-b050-423f-99d6-467e33613d7e"
                },
                {
                  "uuid": "07067143-b427-4063-b1ce-5671e7322fb8",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f9de4af0-a431-4f0b-a22c-5d7553903473"
                }
              ],
              "categories": [
                {
                  "uuid": "dde0d017-b050-423f-99d6-467e33613d7e",
                  "name": "Complete",
                  "exit_uuid": "0fac5e71-142d-4e65-ad97-4fea97c08fb1"
                },
                {
                  "uuid": "f9de4af0-a431-4f0b-a22c-5d7553903473",
                  "name": "Expired",
                  "exit_uuid": "828a1b73-1545-4438-82fc-a8c548e26cab"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "dde0d017-b050-423f-99d6-467e33613d7e"
            }
          },
          {
            "uuid": "d05d7ca3-9f42-46d2-b23e-645039ec5fb3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a34bbef7-acf5-48ea-9d31-6b847b5c5c41",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "a100b2a4-e4c3-4219-b21e-b31a10f3f281",
                  "type": "has_only_phrase",
                  "uuid": "5cd0235f-92a0-4a0a-970c-491930d65938"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c1d48149-c68c-4a11-bed8-339c4f547056",
                  "name": "All Responses",
                  "uuid": "a34bbef7-acf5-48ea-9d31-6b847b5c5c41"
                },
                {
                  "exit_uuid": "d02f74f9-9ba2-42e3-8fb7-e48ff802ff4e",
                  "name": "Go to Praise check-in",
                  "uuid": "a100b2a4-e4c3-4219-b21e-b31a10f3f281"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c1d48149-c68c-4a11-bed8-339c4f547056",
                "destination_uuid": null
              },
              {
                "uuid": "d02f74f9-9ba2-42e3-8fb7-e48ff802ff4e",
                "destination_uuid": "536eb0de-b09d-4274-a9ad-9f0dbb35cdaf"
              }
            ]
          },
          {
            "uuid": "536eb0de-b09d-4274-a9ad-9f0dbb35cdaf",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c2a62d97-c0ca-4e46-a7af-8f0851cb32d4"
              }
            ],
            "exits": [
              {
                "uuid": "c86df1a8-85ff-44ff-9465-e5439bd632e7",
                "destination_uuid": "8d90210b-966b-4cbd-b48b-a40fbddf0727"
              }
            ]
          },
          {
            "uuid": "8a8f10cb-022d-4389-8b04-98649cd0fdc8",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "5e886b56-7af2-4866-a8a3-1526f9bb8eef"
              }
            ],
            "exits": [
              {
                "uuid": "cb14b299-bdcc-413f-ae0f-3e4483e756d8",
                "destination_uuid": "8d90210b-966b-4cbd-b48b-a40fbddf0727"
              }
            ]
          },
          {
            "uuid": "b923bb7b-a0bc-415f-a17d-abb5ca34f08e",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "79e4a1ce-49c5-4d6c-be10-7d6eee2a3453"
              }
            ],
            "exits": [
              {
                "uuid": "effa96eb-1213-4587-a053-2b6ddf90c9f4",
                "destination_uuid": "8d90210b-966b-4cbd-b48b-a40fbddf0727"
              }
            ]
          },
          {
            "uuid": "8d90210b-966b-4cbd-b48b-a40fbddf0727",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c33c0fbe-096a-4f23-8d5c-7c873f7e7a56",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "0ba16472-9d12-4399-9935-ecb61dfce1af",
                  "type": "has_only_phrase",
                  "uuid": "a500e8dc-972e-43ec-9106-02d5f5a367cf"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "9ac7287d-102b-41b7-a22e-618ca3d182f2",
                  "type": "has_only_phrase",
                  "uuid": "a79657e5-3481-451f-ac91-09d159e31853"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "ee04601d-1d00-4553-af3f-2d8c1bd5a658",
                  "type": "has_only_phrase",
                  "uuid": "afc65c99-b41e-46f0-9ab3-a280193aad98"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "fd1e0696-34d2-443c-93ff-72320dcfcc12",
                  "type": "has_only_phrase",
                  "uuid": "56fe69bb-e62d-4020-a3a2-508d76117a71"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9bc8013f-bf1a-46ec-98fb-780dd9970630",
                  "name": "All Responses",
                  "uuid": "c33c0fbe-096a-4f23-8d5c-7c873f7e7a56"
                },
                {
                  "exit_uuid": "4fe1f9a2-5860-4646-b822-1b799a6ce8b3",
                  "name": "No",
                  "uuid": "0ba16472-9d12-4399-9935-ecb61dfce1af"
                },
                {
                  "exit_uuid": "098b0644-825a-4e36-8846-1db269b60603",
                  "name": "Yes",
                  "uuid": "9ac7287d-102b-41b7-a22e-618ca3d182f2"
                },
                {
                  "exit_uuid": "8242a6d4-f418-4da1-ac51-40e90cbe247d",
                  "name": "Yes",
                  "uuid": "ee04601d-1d00-4553-af3f-2d8c1bd5a658"
                },
                {
                  "exit_uuid": "e2f8d2a2-1718-4186-8ea0-6f5085340834",
                  "name": "Yes",
                  "uuid": "fd1e0696-34d2-443c-93ff-72320dcfcc12"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9bc8013f-bf1a-46ec-98fb-780dd9970630",
                "destination_uuid": null
              },
              {
                "uuid": "4fe1f9a2-5860-4646-b822-1b799a6ce8b3",
                "destination_uuid": "3935b3b6-57d3-48a3-b477-f4d0bf735d67"
              },
              {
                "uuid": "098b0644-825a-4e36-8846-1db269b60603",
                "destination_uuid": "b8cc22fd-5a2b-4b0f-9e8f-95e658c96801"
              },
              {
                "uuid": "8242a6d4-f418-4da1-ac51-40e90cbe247d",
                "destination_uuid": "b8cc22fd-5a2b-4b0f-9e8f-95e658c96801"
              },
              {
                "uuid": "e2f8d2a2-1718-4186-8ea0-6f5085340834",
                "destination_uuid": "b8cc22fd-5a2b-4b0f-9e8f-95e658c96801"
              }
            ]
          },
          {
            "uuid": "3935b3b6-57d3-48a3-b477-f4d0bf735d67",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e375d804-2e1e-4b6d-8886-cc863fd79909"
              }
            ],
            "exits": [
              {
                "uuid": "9eb55d0d-8644-4528-ac68-9c0285a6c147",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b8cc22fd-5a2b-4b0f-9e8f-95e658c96801",
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
                "uuid": "d3b62920-ba4b-479c-87ef-c7266d08df0e"
              }
            ],
            "exits": [
              {
                "uuid": "1762257c-97c5-46f2-a70d-1af96604d3de",
                "destination_uuid": "63a9efa9-d8c0-491c-a70f-f65a3cb33087"
              }
            ]
          },
          {
            "uuid": "63a9efa9-d8c0-491c-a70f-f65a3cb33087",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "890363c7-3e8e-4181-9b8f-402fa9313885",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "d93f6f40-5da6-4f66-b5d9-8fe1453225d5",
                  "type": "has_only_phrase",
                  "uuid": "6407aac3-c277-4662-a2dd-9061b206177a"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "c38cff0f-74b8-4129-a74f-ed21938a1b98",
                  "type": "has_only_phrase",
                  "uuid": "5a6d91ed-3697-44d6-a478-da629e5bd7ee"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "2079496a-3220-4df6-844c-efecbdf8fb97",
                  "type": "has_only_phrase",
                  "uuid": "bf123cca-5e53-42d6-8d35-420c999cff8f"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "d4079678-5eab-4d52-9a2f-31cde4e1600d",
                  "type": "has_only_phrase",
                  "uuid": "b5ff2063-06f6-40aa-abbd-c6cc8650cad0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "004903af-e0ab-4413-9850-727cdef8393f",
                  "name": "All Responses",
                  "uuid": "890363c7-3e8e-4181-9b8f-402fa9313885"
                },
                {
                  "exit_uuid": "cbc51034-5e72-4168-8428-2dca6b21f499",
                  "name": "Surprised",
                  "uuid": "d93f6f40-5da6-4f66-b5d9-8fe1453225d5"
                },
                {
                  "exit_uuid": "b775aa81-3dc0-498f-9fa6-221855be86f5",
                  "name": "Happy",
                  "uuid": "c38cff0f-74b8-4129-a74f-ed21938a1b98"
                },
                {
                  "exit_uuid": "f7e7a995-b959-4608-86ac-2c2ff840341f",
                  "name": "My teen did not like it",
                  "uuid": "2079496a-3220-4df6-844c-efecbdf8fb97"
                },
                {
                  "exit_uuid": "a2d8d7ea-116f-4736-8a72-55212dc1cfeb",
                  "name": "I don’t know",
                  "uuid": "d4079678-5eab-4d52-9a2f-31cde4e1600d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "004903af-e0ab-4413-9850-727cdef8393f",
                "destination_uuid": null
              },
              {
                "uuid": "cbc51034-5e72-4168-8428-2dca6b21f499",
                "destination_uuid": "e2c93914-88bf-483c-9221-e92558b9bc6a"
              },
              {
                "uuid": "b775aa81-3dc0-498f-9fa6-221855be86f5",
                "destination_uuid": "26586bd0-6f6f-47a8-8054-4225a3c5c054"
              },
              {
                "uuid": "f7e7a995-b959-4608-86ac-2c2ff840341f",
                "destination_uuid": "9edd88ff-c280-4c20-9301-d28dc65c0a0b"
              },
              {
                "uuid": "a2d8d7ea-116f-4736-8a72-55212dc1cfeb",
                "destination_uuid": "82051dc5-19bc-4f9e-a648-1fec7d269c66"
              }
            ]
          },
          {
            "uuid": "e2c93914-88bf-483c-9221-e92558b9bc6a",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b7e2c392-f5f7-4914-b86e-5b077269675a"
              }
            ],
            "exits": [
              {
                "uuid": "e52e4138-ac01-484c-9183-5a7189e01839",
                "destination_uuid": "dd746a5f-6b6d-46a7-abb9-374c1432fa00"
              }
            ]
          },
          {
            "uuid": "26586bd0-6f6f-47a8-8054-4225a3c5c054",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ccf2b040-8269-450f-a9de-a4514c810bd9"
              }
            ],
            "exits": [
              {
                "uuid": "ce4a258e-e0a3-4a83-9e44-b08d99acb377",
                "destination_uuid": "dd746a5f-6b6d-46a7-abb9-374c1432fa00"
              }
            ]
          },
          {
            "uuid": "9edd88ff-c280-4c20-9301-d28dc65c0a0b",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a88e1381-45f9-4a07-bdad-67cd16787bac"
              }
            ],
            "exits": [
              {
                "uuid": "67f1f21c-6b19-4adb-91c6-0f87ffa7779c",
                "destination_uuid": "dd746a5f-6b6d-46a7-abb9-374c1432fa00"
              }
            ]
          },
          {
            "uuid": "82051dc5-19bc-4f9e-a648-1fec7d269c66",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "48b2fa6f-1f92-40de-8b26-85742a7db655"
              }
            ],
            "exits": [
              {
                "uuid": "fb4b2830-c0cb-4324-8350-a4c7770798d9",
                "destination_uuid": "dd746a5f-6b6d-46a7-abb9-374c1432fa00"
              }
            ]
          },
          {
            "uuid": "dd746a5f-6b6d-46a7-abb9-374c1432fa00",
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
                "uuid": "ebf4a8fc-6cd0-40dd-ae9e-f8517b0246ea"
              }
            ],
            "exits": [
              {
                "uuid": "b5b715fd-f977-443a-95b5-08d086a7fa58",
                "destination_uuid": "99ad9a11-2b24-43bb-b595-a866be9d5470"
              }
            ]
          },
          {
            "uuid": "99ad9a11-2b24-43bb-b595-a866be9d5470",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d47539ce-e7b8-45f0-87a2-c2db497fd964",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "eb93465f-1f4d-4acb-9a75-5825c594dd3b",
                  "type": "has_only_phrase",
                  "uuid": "0ecda286-9827-479d-b02e-1e9ecbd9d335"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "eb93465f-1f4d-4acb-9a75-5825c594dd3b",
                  "type": "has_only_phrase",
                  "uuid": "a36bdaf4-4d10-43a3-a7ba-e4d90dd013ab"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "7332b487-3594-4e0a-b9f2-70c6ded3cbc2",
                  "type": "has_only_phrase",
                  "uuid": "fa1a375a-0657-42b5-9e7d-f0507f6e0e0b"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "7332b487-3594-4e0a-b9f2-70c6ded3cbc2",
                  "type": "has_only_phrase",
                  "uuid": "bb8bb24a-1392-4b7c-9aa5-ec8c11a590be"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "58ad7bf7-64c6-4a24-9a77-898d85e9f4b1",
                  "name": "All Responses",
                  "uuid": "d47539ce-e7b8-45f0-87a2-c2db497fd964"
                },
                {
                  "exit_uuid": "32d8337a-24de-43ca-bb92-0debb689afa4",
                  "name": "Every day; Almost every day",
                  "uuid": "eb93465f-1f4d-4acb-9a75-5825c594dd3b"
                },
                {
                  "exit_uuid": "a9e78453-69f4-4346-b841-49647f6053b2",
                  "name": "A few days; Never",
                  "uuid": "7332b487-3594-4e0a-b9f2-70c6ded3cbc2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "58ad7bf7-64c6-4a24-9a77-898d85e9f4b1",
                "destination_uuid": null
              },
              {
                "uuid": "32d8337a-24de-43ca-bb92-0debb689afa4",
                "destination_uuid": "1a0e36df-a0fd-41f8-bdbf-45a64b26d522"
              },
              {
                "uuid": "a9e78453-69f4-4346-b841-49647f6053b2",
                "destination_uuid": "dd205930-03d8-4f12-9ee4-79c346c5fa87"
              }
            ]
          },
          {
            "uuid": "1a0e36df-a0fd-41f8-bdbf-45a64b26d522",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "eaf1defa-2130-4a42-bdfd-61802c0fe749"
              }
            ],
            "exits": [
              {
                "uuid": "726c3cbd-5a3f-417c-9fe6-dbdec90d241f",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "dd205930-03d8-4f12-9ee4-79c346c5fa87",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e0052077-4b44-49c4-9f7c-0dac8b2a968e"
              }
            ],
            "exits": [
              {
                "uuid": "90e99141-b9c3-4406-aa9c-ca162d0a12fd",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5f735132-c635-4bc2-af4e-e9da360a4b74",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7d25f197-4120-4049-84ed-0151ac547418",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "05c8c685-7fda-452d-96ad-32a031c79b33"
              }
            ],
            "exits": [
              {
                "uuid": "e80a7fcc-5d2a-4ece-803e-89674648acdd",
                "destination_uuid": "ee0a9d72-afb3-45fe-a2e3-a9a9674e8bc3"
              }
            ]
          },
          {
            "uuid": "ee0a9d72-afb3-45fe-a2e3-a9a9674e8bc3",
            "actions": [
              {
                "uuid": "3c31b555-9c69-4b25-82b7-e3ee6826f949",
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
                "uuid": "fb6d184f-e5c8-4fd9-b193-d62704ffe749",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e5cfbd9b-e259-41b6-aa90-89e4912e27bd",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f0ace0c0-55bd-4d06-9bd8-bd87b4740d12",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "95174087-9b13-48e2-ba95-e64ad0052681"
                },
                "type": "enter_flow",
                "uuid": "d676be91-2e68-439d-adbb-9cfa2ebe49f2"
              }
            ],
            "exits": [
              {
                "uuid": "1925104a-f0bc-4179-8301-acd2bea0a349",
                "destination_uuid": "529fa53a-5494-4614-8439-655b268d3d88"
              },
              {
                "uuid": "feae5818-576d-40cc-aad5-758cc08e1463",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1c868f82-5bd8-40e7-a706-7889bd3172ce",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d47db501-ae22-414a-abff-bb8198ce5e0f"
                },
                {
                  "uuid": "62ba154c-4612-4b58-9ede-191e34966f39",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "8756098f-626b-4d98-beee-03eebf6111fd"
                }
              ],
              "categories": [
                {
                  "uuid": "d47db501-ae22-414a-abff-bb8198ce5e0f",
                  "name": "Complete",
                  "exit_uuid": "1925104a-f0bc-4179-8301-acd2bea0a349"
                },
                {
                  "uuid": "8756098f-626b-4d98-beee-03eebf6111fd",
                  "name": "Expired",
                  "exit_uuid": "feae5818-576d-40cc-aad5-758cc08e1463"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d47db501-ae22-414a-abff-bb8198ce5e0f"
            }
          },
          {
            "uuid": "529fa53a-5494-4614-8439-655b268d3d88",
            "actions": [
              {
                "attachments": [],
                "text": "Which flow would you like to launch?",
                "type": "send_msg",
                "quick_replies": [
                  "mod_1on1_emo",
                  "mod_1on1_activity",
                  "mod_1on1_activity_review",
                  "praise_activity"
                ],
                "uuid": "33ccdaf7-217b-4a11-84c6-c2aa1e16feef"
              }
            ],
            "exits": [
              {
                "uuid": "5c359f0b-13cd-48cc-8179-d64520ab419e",
                "destination_uuid": "ca84f926-6f95-49fa-8e0b-7e90c1356aac"
              }
            ]
          },
          {
            "uuid": "ca84f926-6f95-49fa-8e0b-7e90c1356aac",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "636052f1-4ca4-452e-bb95-d5682cfad046",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "15c9cbd7-f665-42a9-b6f3-855cb282e643",
                  "type": "has_only_phrase",
                  "uuid": "00b40c2c-5205-47a4-86ad-dc142c6e81c3"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "24feae8b-d39d-4a0a-b3bf-6091bfc95d22",
                  "type": "has_only_phrase",
                  "uuid": "9ba647fa-3936-44a7-8ba0-55fa0a68feb7"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "a1582c6d-c502-446e-8282-5cf1c676e531",
                  "type": "has_only_phrase",
                  "uuid": "2f48c5d6-7904-4379-9191-9b3d5468b683"
                },
                {
                  "arguments": [
                    "praise_activity"
                  ],
                  "category_uuid": "3333c3ab-2230-4e10-a0e2-21f5da949bda",
                  "type": "has_only_phrase",
                  "uuid": "7cb00dd1-76e7-431f-946e-bec99cb3011f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8a43cbf0-1531-49db-91bc-a7d01ef357c6",
                  "name": "All Responses",
                  "uuid": "636052f1-4ca4-452e-bb95-d5682cfad046"
                },
                {
                  "exit_uuid": "14a21cf8-1b5d-44fc-99bf-a2334dc1d82b",
                  "name": "mod_1on1_emo",
                  "uuid": "15c9cbd7-f665-42a9-b6f3-855cb282e643"
                },
                {
                  "exit_uuid": "c49e078a-e04d-4e88-930c-278e34359e87",
                  "name": "mod_1on1_activity",
                  "uuid": "24feae8b-d39d-4a0a-b3bf-6091bfc95d22"
                },
                {
                  "exit_uuid": "055837a1-bccb-4c9e-9dbf-12ef92ae2593",
                  "name": "mod_1on1_activity_review",
                  "uuid": "a1582c6d-c502-446e-8282-5cf1c676e531"
                },
                {
                  "exit_uuid": "8f7b4e1b-34e6-47fc-8502-5bd989b54fc1",
                  "name": "praise_activity",
                  "uuid": "3333c3ab-2230-4e10-a0e2-21f5da949bda"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8a43cbf0-1531-49db-91bc-a7d01ef357c6",
                "destination_uuid": null
              },
              {
                "uuid": "14a21cf8-1b5d-44fc-99bf-a2334dc1d82b",
                "destination_uuid": "5dd153cf-c75b-4d52-9356-eaf01b85db1d"
              },
              {
                "uuid": "c49e078a-e04d-4e88-930c-278e34359e87",
                "destination_uuid": "b34c4937-0c84-414a-820f-457caae07242"
              },
              {
                "uuid": "055837a1-bccb-4c9e-9dbf-12ef92ae2593",
                "destination_uuid": "8e624d57-99cb-4422-a05c-02f0fa10d019"
              },
              {
                "uuid": "8f7b4e1b-34e6-47fc-8502-5bd989b54fc1",
                "destination_uuid": "26400d17-b774-427b-81bf-88c675290715"
              }
            ]
          },
          {
            "uuid": "5dd153cf-c75b-4d52-9356-eaf01b85db1d",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "87bbfcf3-b2e0-4816-94e6-8d07b0f7ff1c"
                },
                "type": "enter_flow",
                "uuid": "0b24c9fa-1e77-4e42-b568-98921ae41c27"
              }
            ],
            "exits": [
              {
                "uuid": "d77f577c-fee7-47c4-b5bb-3a8d852dffe9",
                "destination_uuid": null
              },
              {
                "uuid": "d4de96fb-a526-4710-983c-f58317ca5c82",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5de86a87-91ab-492a-9267-d5c48ba85bc1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ee07acb1-031c-41af-96b1-c97a1d892a91"
                },
                {
                  "uuid": "d4e3198a-91fe-49c3-ae0c-ffd1d7e93f3f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d4ea763d-1ceb-49bc-85e3-cac584f019df"
                }
              ],
              "categories": [
                {
                  "uuid": "ee07acb1-031c-41af-96b1-c97a1d892a91",
                  "name": "Complete",
                  "exit_uuid": "d77f577c-fee7-47c4-b5bb-3a8d852dffe9"
                },
                {
                  "uuid": "d4ea763d-1ceb-49bc-85e3-cac584f019df",
                  "name": "Expired",
                  "exit_uuid": "d4de96fb-a526-4710-983c-f58317ca5c82"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ee07acb1-031c-41af-96b1-c97a1d892a91"
            }
          },
          {
            "uuid": "b34c4937-0c84-414a-820f-457caae07242",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "23c3f4b7-3b29-440d-97c4-e30853a50544"
                },
                "type": "enter_flow",
                "uuid": "38d3d1ce-3dde-4f76-a676-0e5a1a6f9846"
              }
            ],
            "exits": [
              {
                "uuid": "f1de2b2c-cac9-4e0e-85f1-1e2361a5543c",
                "destination_uuid": null
              },
              {
                "uuid": "a7f81b3c-6747-40d7-b01d-9e5a9ad5a2dc",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "04e34af0-673a-4fbd-976f-25d144c997d2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0bdedcd8-2e2a-4e00-b032-d97003cc0e43"
                },
                {
                  "uuid": "1f1c56dd-79de-4e75-8b59-4a7742aa0dca",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e6fff281-9272-4d73-b72c-8c1eee879047"
                }
              ],
              "categories": [
                {
                  "uuid": "0bdedcd8-2e2a-4e00-b032-d97003cc0e43",
                  "name": "Complete",
                  "exit_uuid": "f1de2b2c-cac9-4e0e-85f1-1e2361a5543c"
                },
                {
                  "uuid": "e6fff281-9272-4d73-b72c-8c1eee879047",
                  "name": "Expired",
                  "exit_uuid": "a7f81b3c-6747-40d7-b01d-9e5a9ad5a2dc"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0bdedcd8-2e2a-4e00-b032-d97003cc0e43"
            }
          },
          {
            "uuid": "8e624d57-99cb-4422-a05c-02f0fa10d019",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "0ec1ae15-a87e-4719-aa9d-47e09fe963e0"
                },
                "type": "enter_flow",
                "uuid": "04d7a087-1e5e-4c4b-b6d7-e21a7e5b702b"
              }
            ],
            "exits": [
              {
                "uuid": "84c78219-14de-4d13-99ba-b05cd21c9e60",
                "destination_uuid": null
              },
              {
                "uuid": "e10889d9-8a3c-4eb5-8603-357ebf5ec6c6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "0ede69a8-0685-4e79-afc5-13268f3ff2e6",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "6f33caa8-4a3c-4818-b286-de5c49cf9341"
                },
                {
                  "uuid": "e6fa992b-1499-491e-a222-9cccee01787e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "9a6d6cab-1643-413c-a1b0-fb216da92cd1"
                }
              ],
              "categories": [
                {
                  "uuid": "6f33caa8-4a3c-4818-b286-de5c49cf9341",
                  "name": "Complete",
                  "exit_uuid": "84c78219-14de-4d13-99ba-b05cd21c9e60"
                },
                {
                  "uuid": "9a6d6cab-1643-413c-a1b0-fb216da92cd1",
                  "name": "Expired",
                  "exit_uuid": "e10889d9-8a3c-4eb5-8603-357ebf5ec6c6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "6f33caa8-4a3c-4818-b286-de5c49cf9341"
            }
          },
          {
            "uuid": "26400d17-b774-427b-81bf-88c675290715",
            "actions": [
              {
                "flow": {
                  "name": "praise_activity",
                  "uuid": "86c3d14f-d57c-4501-b911-ea7ec55f8795"
                },
                "type": "enter_flow",
                "uuid": "e140bc82-349f-4826-8ea3-cb2b1a745245"
              }
            ],
            "exits": [
              {
                "uuid": "dd452852-d590-4c7f-a899-a538684d0e96",
                "destination_uuid": null
              },
              {
                "uuid": "46b0f497-b3cd-4e99-9ff9-2900ceb1ec81",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8ab67d5f-1956-4004-b725-db42a7a03d6d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "30c896e7-45f9-435b-889c-045c5e36fa60"
                },
                {
                  "uuid": "471470ff-a367-41d8-983a-5e6a931ac807",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e3ab4f0c-55f3-43aa-ab93-d81c46e6021f"
                }
              ],
              "categories": [
                {
                  "uuid": "30c896e7-45f9-435b-889c-045c5e36fa60",
                  "name": "Complete",
                  "exit_uuid": "dd452852-d590-4c7f-a899-a538684d0e96"
                },
                {
                  "uuid": "e3ab4f0c-55f3-43aa-ab93-d81c46e6021f",
                  "name": "Expired",
                  "exit_uuid": "46b0f497-b3cd-4e99-9ff9-2900ceb1ec81"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "30c896e7-45f9-435b-889c-045c5e36fa60"
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
        "uuid": "0d48263f-43d3-433e-998e-67358b6974f7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "fc80c204-397d-4ba1-89b0-3698bf6d940f",
            "actions": [
              {
                "uuid": "8312dcbf-2883-42b8-b93d-dddaf5c370f0",
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
                "uuid": "25fb0473-6f24-4c61-a44b-383882e5038c",
                "destination_uuid": "9ddd0f1c-19cd-43a3-9ca7-0b4d545055c2"
              }
            ]
          },
          {
            "uuid": "9ddd0f1c-19cd-43a3-9ca7-0b4d545055c2",
            "actions": [
              {
                "uuid": "2ca63858-ee50-47fe-9c15-c3256aaad4eb",
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
                "uuid": "52317c40-8673-4192-891a-eeffc8e9a090",
                "destination_uuid": "96da4abd-c5cc-4657-8e41-f082456677a8"
              }
            ]
          },
          {
            "uuid": "96da4abd-c5cc-4657-8e41-f082456677a8",
            "actions": [
              {
                "uuid": "2ad42eae-6a08-4ed8-a627-ad5857a9e9c1",
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
                "uuid": "f391d0bb-f122-46f8-bba6-1f6d3e210cc0",
                "destination_uuid": "993df6f0-985a-4025-b473-64aac01cb5a8"
              }
            ]
          },
          {
            "uuid": "993df6f0-985a-4025-b473-64aac01cb5a8",
            "actions": [
              {
                "uuid": "e5a8df06-db3f-4ec2-bf7e-c30aea1e2c0c",
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
                "uuid": "8da0616e-9993-47a6-8893-ff007d16b1c1",
                "destination_uuid": "b91c18b1-bbde-4e79-995f-9d80b2a6cf49"
              }
            ]
          },
          {
            "uuid": "b91c18b1-bbde-4e79-995f-9d80b2a6cf49",
            "actions": [
              {
                "uuid": "8128c056-e3e5-4933-adc7-5956b222db14",
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
                "uuid": "fbeacc96-8e8a-432f-ba16-c441a11908a4",
                "destination_uuid": "28f4ca83-a03c-4ebf-be62-28a5822626ce"
              }
            ]
          },
          {
            "uuid": "28f4ca83-a03c-4ebf-be62-28a5822626ce",
            "actions": [
              {
                "uuid": "6c1b9b2f-0432-45c3-8e13-883fc6c6be07",
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
                "uuid": "505073b3-a7c0-4074-b0d5-3792577a5f45",
                "destination_uuid": "e9b46e78-85e8-455b-9b17-52194095d4bf"
              }
            ]
          },
          {
            "uuid": "e9b46e78-85e8-455b-9b17-52194095d4bf",
            "actions": [
              {
                "uuid": "e21bce80-9f8c-450d-9cfd-14306ff9b8d0",
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
                "uuid": "a32a0d31-24bd-43bf-b662-74b323bebf03",
                "destination_uuid": "ab37fa21-2962-4788-8128-50a10337c95e"
              }
            ]
          },
          {
            "uuid": "ab37fa21-2962-4788-8128-50a10337c95e",
            "actions": [
              {
                "uuid": "77c1810a-f008-454b-badd-225a584fafbe",
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
                "uuid": "b649a9b5-90e7-4654-9ab6-25c480788ad2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "41b7f7a7-8b84-4d2c-81aa-1986e5e35819",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b4f2423b-4764-4d4c-a5c5-b5192ce3f934",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f7787a3d-64bb-4ca6-882b-b5334a160fd1"
              }
            ],
            "exits": [
              {
                "uuid": "6ec12e40-b7bf-4112-9ea4-66415c058df8",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4d8e92b4-21ea-42f9-b777-7591a11fe279",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a78190a3-f50e-43f7-abe2-ca94add829e4",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "eaf58fc0-cc83-4be1-8716-71c8ad0264ff"
              }
            ],
            "exits": [
              {
                "uuid": "cf58f636-1c14-452f-bba8-6e5efe4ba097",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d5b8a3d0-87d1-4f5e-bbff-74113e7f82a5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9f2c305b-a99b-4633-8ae9-c985a19be667",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6dd16f7e-0b19-4e36-8a9d-2a886e9df87f"
              }
            ],
            "exits": [
              {
                "uuid": "c45a74f2-2907-4316-a655-a81e85108b48",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "fcac1caa-61bd-440b-a5f2-84b5f90ae6b2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0e50a173-48c0-4501-b249-4ae533ca2c24",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ac00bb14-82c1-4116-b7e1-11f37ad7355d"
              }
            ],
            "exits": [
              {
                "uuid": "769e0da3-23ca-41fe-9b99-c9c3c42f322d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "9723b597-ae34-4275-b2f2-1bdbe4ee2407",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0772d0cd-85a9-467f-8796-164f9a8047bc",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "eaea1659-e2b9-4813-80d5-02b825d4a755"
              }
            ],
            "exits": [
              {
                "uuid": "2f406800-2849-4f1e-90f4-d007f8d3ebd4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e06e2048-e291-496a-9169-e0c67cc5e3fa",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "598061d3-0d2a-458a-8d12-210be9ceee86",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6fb173f1-103d-4e74-870b-9126d93dcdf8"
              }
            ],
            "exits": [
              {
                "uuid": "122a8866-a5d8-4807-8993-f4cba6409233",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4eab5dfe-1fe1-4d07-898e-7c59f833a32c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1c26b16f-80c0-4fef-93d6-7a1d41115657",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "32a638de-8b31-4a24-9223-4d8d40f95b74"
              }
            ],
            "exits": [
              {
                "uuid": "476446fa-7f15-417e-958f-8e09f740bb3c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8eb81082-5fec-4b40-9a0b-dd55eb4cf42f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "08591a44-0215-43e9-9c77-7d5a288feb33",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b6fd005c-9e96-4836-b36b-f6299735b555"
              }
            ],
            "exits": [
              {
                "uuid": "e8924711-06d1-4635-b9cd-b8450fdbf3e1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4e16e39b-9464-4b8a-a1e7-edbc250896f0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8bfe95a4-b7da-443c-b823-47c6473b878f",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "712697b9-5f7f-48fb-a16b-f817f46e87f5"
              }
            ],
            "exits": [
              {
                "uuid": "c1245dd0-24be-412f-acfa-6376c16ed460",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e91e5554-a07a-4dbe-9ae8-eb3ec29fe6df",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2f6c1d12-1670-4cfc-b96b-eb554a8628c4",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "45d5fc2e-f091-4703-a95e-0fecbe8aafdc"
              }
            ],
            "exits": [
              {
                "uuid": "90f69710-d385-450f-9e39-5ecfc6b0baf5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3d23e48c-d37b-4231-bf53-e3e49e4ecf6f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "93ad605d-6718-4c7e-a124-4dd015be4c24",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "afb890d4-126c-4137-b1e4-952280c0a762"
              }
            ],
            "exits": [
              {
                "uuid": "6ed9f901-7b38-4575-9271-921385636bc6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "35f9b0c3-0a3d-4e7a-8b2e-ea962c082aac",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f5357739-a0b6-4ac9-b020-b0c3bcb3cc94",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5e90e722-e638-41de-b589-39db8d3b4283"
              }
            ],
            "exits": [
              {
                "uuid": "be5b2081-6650-49db-8800-f4ca21a4450e",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "561f4857-621e-45ff-8659-b39e45b53f7e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c70a0b24-5fda-490c-b9de-01e7759fcc2f",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c35b3e71-3f97-4ffe-aa65-aca8c4e4d00d"
              }
            ],
            "exits": [
              {
                "uuid": "9cd08812-2bef-4c09-8ca0-65c71da97eb0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b663c9f3-77cc-4300-8624-54588e7a9cf0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0b86ee86-1638-44d9-bdee-6411bcc15156",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dcbcae79-1ffb-430c-a4a6-fdc7d87eb55f"
              }
            ],
            "exits": [
              {
                "uuid": "6dd85a93-8d68-4cc0-bf93-a38087769192",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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