export default [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "f26be5ac-4e7c-4b5a-8d03-b9aee0d0a2ba",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a8c08178-9db1-43f1-96f2-7c7b40692d03",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "70aed798-e4cf-4350-8402-3ebe8352506d"
              }
            ],
            "exits": [
              {
                "uuid": "4d316544-e636-4e5e-9607-5b0bcecfefc2",
                "destination_uuid": "de29813e-28b1-46ad-82d0-3a60c39f6e62"
              }
            ]
          },
          {
            "uuid": "de29813e-28b1-46ad-82d0-3a60c39f6e62",
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
                "uuid": "3d676621-38e1-43d7-ab2b-fdd97da336b2"
              }
            ],
            "exits": [
              {
                "uuid": "3db688df-d2dd-4f9b-b689-4fee3b3d76da",
                "destination_uuid": "16924cdc-5bf0-4a44-99b3-86e1607d5502"
              }
            ]
          },
          {
            "uuid": "16924cdc-5bf0-4a44-99b3-86e1607d5502",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "355f3c90-3aa4-4626-a1df-ba888842d0e4",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "e800a825-9dbb-4975-97b0-d840c4b5dc81",
                  "type": "has_only_phrase",
                  "uuid": "1c61ca62-48af-4855-a3a4-acad716d946a"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "f164bbef-1d33-461f-8dd2-2bd29b532c5c",
                  "type": "has_only_phrase",
                  "uuid": "1576dbbc-c807-47d5-8f73-6945d9f94e37"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "d537d901-5cc6-4171-ae43-ef8c702ed2dc",
                  "type": "has_only_phrase",
                  "uuid": "f15e7289-3670-438b-9472-0d4348152e81"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "6c279fa0-00ae-4904-a4e6-d29837eb4367",
                  "type": "has_only_phrase",
                  "uuid": "722775ad-02cd-4d0b-b221-1f53fbc3a807"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a2191131-3b40-44cf-b8da-ea1976f150c3",
                  "name": "All Responses",
                  "uuid": "355f3c90-3aa4-4626-a1df-ba888842d0e4"
                },
                {
                  "exit_uuid": "8db6eaa1-53a5-4099-85ae-8e3d8f9c9f39",
                  "name": "First option: launch example_media flow",
                  "uuid": "e800a825-9dbb-4975-97b0-d840c4b5dc81"
                },
                {
                  "exit_uuid": "f91b1772-f905-4558-adf0-245ba3a9bf3b",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "f164bbef-1d33-461f-8dd2-2bd29b532c5c"
                },
                {
                  "exit_uuid": "6cf5f60a-6454-48d2-9215-dadb0e0d2dd6",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "d537d901-5cc6-4171-ae43-ef8c702ed2dc"
                },
                {
                  "exit_uuid": "d630ea64-b848-48cf-89b2-668ace00ed70",
                  "name": "Stay in this flow.",
                  "uuid": "6c279fa0-00ae-4904-a4e6-d29837eb4367"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a2191131-3b40-44cf-b8da-ea1976f150c3",
                "destination_uuid": null
              },
              {
                "uuid": "8db6eaa1-53a5-4099-85ae-8e3d8f9c9f39",
                "destination_uuid": "1a202994-131a-434f-94d4-f0857bc787c0"
              },
              {
                "uuid": "f91b1772-f905-4558-adf0-245ba3a9bf3b",
                "destination_uuid": "4b0705c9-571f-4159-ae92-bbb6a7830b10"
              },
              {
                "uuid": "6cf5f60a-6454-48d2-9215-dadb0e0d2dd6",
                "destination_uuid": "104d836c-61d8-43ea-b59e-06c645158186"
              },
              {
                "uuid": "d630ea64-b848-48cf-89b2-668ace00ed70",
                "destination_uuid": "5ecb907b-ab21-46fa-bbbe-e2a239af571e"
              }
            ]
          },
          {
            "uuid": "1a202994-131a-434f-94d4-f0857bc787c0",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "8a8a771e-177c-45ed-84d2-cef066002bea"
                },
                "type": "enter_flow",
                "uuid": "546c00bd-a228-4604-91cf-2980e154b6be"
              }
            ],
            "exits": [
              {
                "uuid": "b63f9262-1337-4509-8512-8bc9732cf19a",
                "destination_uuid": "de0322da-db8d-4c5b-8157-12f8e773b1be"
              },
              {
                "uuid": "9f5629a2-a690-42d5-af85-0a4d07f01579",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "a9e4cbbc-ae5b-4c46-8289-3acf13a1a26d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "cbe31ce3-1a43-4ac1-9476-e31369f9d3b2"
                },
                {
                  "uuid": "e234eab2-98c3-4287-bd99-84b9fb94d0f0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d7d07e70-5a59-472d-ac39-18b9cc1eacc7"
                }
              ],
              "categories": [
                {
                  "uuid": "cbe31ce3-1a43-4ac1-9476-e31369f9d3b2",
                  "name": "Complete",
                  "exit_uuid": "b63f9262-1337-4509-8512-8bc9732cf19a"
                },
                {
                  "uuid": "d7d07e70-5a59-472d-ac39-18b9cc1eacc7",
                  "name": "Expired",
                  "exit_uuid": "9f5629a2-a690-42d5-af85-0a4d07f01579"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "cbe31ce3-1a43-4ac1-9476-e31369f9d3b2"
            }
          },
          {
            "uuid": "4b0705c9-571f-4159-ae92-bbb6a7830b10",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "00a9cc17-9a5e-438e-bde6-add3776c9b9c"
                },
                "type": "enter_flow",
                "uuid": "57980757-ec49-4329-aca4-21d0d7c2ff09"
              }
            ],
            "exits": [
              {
                "uuid": "98b1e7bd-1629-4927-97c2-be24b467d73e",
                "destination_uuid": "de0322da-db8d-4c5b-8157-12f8e773b1be"
              },
              {
                "uuid": "485729af-f883-45af-a99e-1ccaf8a2fd4d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "161ea2fb-809a-419d-a0a4-3a29c464316d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "fca73c79-872a-417d-9bd7-0a2cd5fb4369"
                },
                {
                  "uuid": "1301addb-4e33-495f-aa23-b603d893f6de",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a5bc5e27-3f1c-487b-b73b-cf8be16642db"
                }
              ],
              "categories": [
                {
                  "uuid": "fca73c79-872a-417d-9bd7-0a2cd5fb4369",
                  "name": "Complete",
                  "exit_uuid": "98b1e7bd-1629-4927-97c2-be24b467d73e"
                },
                {
                  "uuid": "a5bc5e27-3f1c-487b-b73b-cf8be16642db",
                  "name": "Expired",
                  "exit_uuid": "485729af-f883-45af-a99e-1ccaf8a2fd4d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "fca73c79-872a-417d-9bd7-0a2cd5fb4369"
            }
          },
          {
            "uuid": "104d836c-61d8-43ea-b59e-06c645158186",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "38148068-a47b-4669-a8f4-7ffb6d9cc70a"
                },
                "type": "enter_flow",
                "uuid": "290dc5da-c6f3-4601-965b-04e504883fc4"
              }
            ],
            "exits": [
              {
                "uuid": "3a8dd5cf-ba48-4f23-b466-547d43e7ee5d",
                "destination_uuid": "de0322da-db8d-4c5b-8157-12f8e773b1be"
              },
              {
                "uuid": "044678ca-a7e0-4789-b461-385166dadde6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8039a0fb-9c40-41f9-8b14-8c08cdd2f7c1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b0cbcb16-a1dd-4eb1-a5ae-77e02678736a"
                },
                {
                  "uuid": "079ca3aa-7b56-437d-8f3e-3ba4ec32c952",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "00571353-e0d8-44af-8ab3-8c7fad401a22"
                }
              ],
              "categories": [
                {
                  "uuid": "b0cbcb16-a1dd-4eb1-a5ae-77e02678736a",
                  "name": "Complete",
                  "exit_uuid": "3a8dd5cf-ba48-4f23-b466-547d43e7ee5d"
                },
                {
                  "uuid": "00571353-e0d8-44af-8ab3-8c7fad401a22",
                  "name": "Expired",
                  "exit_uuid": "044678ca-a7e0-4789-b461-385166dadde6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b0cbcb16-a1dd-4eb1-a5ae-77e02678736a"
            }
          },
          {
            "uuid": "5ecb907b-ab21-46fa-bbbe-e2a239af571e",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bc92608e-3a9a-4c41-8768-50f4b3fc355a"
              }
            ],
            "exits": [
              {
                "uuid": "2f825333-fba6-438a-8f7e-e968436b0ee4",
                "destination_uuid": "69636017-be9f-4f5a-b7ee-1de800cd6e8e"
              }
            ]
          },
          {
            "uuid": "de0322da-db8d-4c5b-8157-12f8e773b1be",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f7dbb0cb-58cb-49fe-9119-66f68d799460"
              }
            ],
            "exits": [
              {
                "uuid": "9b5e7d9c-d0f4-43eb-9ce5-49ff3c555b90",
                "destination_uuid": "69636017-be9f-4f5a-b7ee-1de800cd6e8e"
              }
            ]
          },
          {
            "uuid": "69636017-be9f-4f5a-b7ee-1de800cd6e8e",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "384d4a6d-3675-43ec-9640-bb6b38a71665"
              }
            ],
            "exits": [
              {
                "uuid": "c1598200-b8eb-4380-84ba-b6bd22c14238",
                "destination_uuid": "57c16be9-1b19-4ae0-801b-4920f52f2d08"
              }
            ]
          },
          {
            "uuid": "57c16be9-1b19-4ae0-801b-4920f52f2d08",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "82d8d1d4-4752-4843-92be-d3bb3157c1c3",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "da6f1cd5-1f88-4573-b6a8-e3c5091b21c3",
                  "type": "has_only_phrase",
                  "uuid": "43bc7a65-4f42-4ff5-8edc-183d43c422fb"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "9c66745c-235e-4e8e-ae74-0a6b2375acd4",
                  "type": "has_only_phrase",
                  "uuid": "648909a3-248e-40dd-8210-4761a58404c2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1c56ef08-d846-4906-b8fb-35bddac5d2d2",
                  "name": "All Responses",
                  "uuid": "82d8d1d4-4752-4843-92be-d3bb3157c1c3"
                },
                {
                  "exit_uuid": "54d1df1d-0456-4997-b640-11ce0e6fac72",
                  "name": "Yes",
                  "uuid": "da6f1cd5-1f88-4573-b6a8-e3c5091b21c3"
                },
                {
                  "exit_uuid": "98d56457-f23f-4397-9b7e-a1d6018e987b",
                  "name": "No",
                  "uuid": "9c66745c-235e-4e8e-ae74-0a6b2375acd4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1c56ef08-d846-4906-b8fb-35bddac5d2d2",
                "destination_uuid": null
              },
              {
                "uuid": "54d1df1d-0456-4997-b640-11ce0e6fac72",
                "destination_uuid": "de29813e-28b1-46ad-82d0-3a60c39f6e62"
              },
              {
                "uuid": "98d56457-f23f-4397-9b7e-a1d6018e987b",
                "destination_uuid": "48424c90-c9d6-413a-82ca-808a8490c0e2"
              }
            ]
          },
          {
            "uuid": "48424c90-c9d6-413a-82ca-808a8490c0e2",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "31b2542b-6952-413e-927f-0fc07011fe97"
              }
            ],
            "exits": [
              {
                "uuid": "a43a5313-e05f-45a8-b11c-b5b24b3fcb4a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "bfe5bf39-e053-4e22-99d6-1cce4068ac7e",
            "actions": [
              {
                "uuid": "84ea2014-e430-4faf-a6ea-09d6def88b77",
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
                "uuid": "ff37934b-82fe-435a-84e9-356708c83703",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ebfb4818-aa7e-439b-af18-5691fcd52258",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2da60e61-f691-4a15-a290-6448e61aa093",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "90f5299b-2985-4c0b-ac2c-66aa73ecfb32"
              }
            ],
            "exits": [
              {
                "uuid": "4f58715e-83c1-4543-8611-1b8aa45ffb76",
                "destination_uuid": "40b57736-faa2-49a1-bbfc-ebd0eac1e136"
              }
            ]
          },
          {
            "uuid": "a72bb4fa-d1eb-4805-9beb-6122258a33af",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d1c6fac7-a6e9-4160-aed9-88b17835d10e"
              }
            ],
            "exits": [
              {
                "uuid": "018d3fae-24cd-4235-9579-fe05601ee076",
                "destination_uuid": "87444b09-e2b5-4c72-bede-653bed092e27"
              }
            ]
          },
          {
            "uuid": "87444b09-e2b5-4c72-bede-653bed092e27",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "18afc7a5-0652-417f-ad10-d7949d8693dd"
              }
            ],
            "exits": [
              {
                "uuid": "69715fde-0b94-4e51-b62f-accdb17b1180",
                "destination_uuid": "cc7f77bf-f9e8-4c8f-a725-3ecd9c399945"
              }
            ]
          },
          {
            "uuid": "cc7f77bf-f9e8-4c8f-a725-3ecd9c399945",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5dac3c88-d521-44f0-8009-0a012e4d454e",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "02f3e689-ee2a-4bee-b362-671cd0e4162d",
                  "type": "has_only_phrase",
                  "uuid": "9602a2e6-9bcd-419b-b4ed-b479dc68f53b"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "02f3e689-ee2a-4bee-b362-671cd0e4162d",
                  "type": "has_only_phrase",
                  "uuid": "dcd95c1e-eaef-4463-8508-06527f4ec566"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3ad913b8-3621-4439-bb8f-2727f1a57dfb",
                  "name": "All Responses",
                  "uuid": "5dac3c88-d521-44f0-8009-0a012e4d454e"
                },
                {
                  "exit_uuid": "cdbae3cb-176f-463f-945b-db133351772e",
                  "name": "image1; image2",
                  "uuid": "02f3e689-ee2a-4bee-b362-671cd0e4162d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3ad913b8-3621-4439-bb8f-2727f1a57dfb",
                "destination_uuid": null
              },
              {
                "uuid": "cdbae3cb-176f-463f-945b-db133351772e",
                "destination_uuid": "07e8d5b1-4629-4fa1-be44-8ebbb2b7d8b9"
              }
            ]
          },
          {
            "uuid": "07e8d5b1-4629-4fa1-be44-8ebbb2b7d8b9",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "e2c20ffc-71fe-4a2a-bdfc-d5ffa3214060"
              }
            ],
            "exits": [
              {
                "uuid": "0ae080e2-39b2-4d0a-9d2f-ec8834c88772",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "40b57736-faa2-49a1-bbfc-ebd0eac1e136",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bc07e713-0bb0-449f-9ae8-3fb2c1d8cbb4",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "24ece107-a634-42d9-a3f9-af359aec15e5",
                  "type": "has_only_phrase",
                  "uuid": "86f95088-ee91-4d0e-b43c-2588903bca0f"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "24ece107-a634-42d9-a3f9-af359aec15e5",
                  "type": "has_only_phrase",
                  "uuid": "f1d76db0-5a36-4cab-9111-ce2e461196de"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e32460bf-843f-44e4-b9d0-f11050f0e11f",
                  "name": "All Responses",
                  "uuid": "bc07e713-0bb0-449f-9ae8-3fb2c1d8cbb4"
                },
                {
                  "exit_uuid": "440a0d40-f64a-4aa0-b2a9-a54d2f0a25d4",
                  "name": "image1; image2",
                  "uuid": "24ece107-a634-42d9-a3f9-af359aec15e5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e32460bf-843f-44e4-b9d0-f11050f0e11f",
                "destination_uuid": "a72bb4fa-d1eb-4805-9beb-6122258a33af"
              },
              {
                "uuid": "440a0d40-f64a-4aa0-b2a9-a54d2f0a25d4",
                "destination_uuid": "e7ad90fc-91f9-4a0e-a5c4-b201aeac2c1d"
              }
            ]
          },
          {
            "uuid": "e7ad90fc-91f9-4a0e-a5c4-b201aeac2c1d",
            "actions": [
              {
                "uuid": "f1eb4427-0ef2-4ebc-94f4-ea0651defc99",
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
                "uuid": "79e100d5-430a-4b4e-99fb-106fec542b55",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3df38aed-f0e4-466d-bfff-cd75d9ea8c9a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "99ad391d-4525-4ffd-9ebf-6b4ab76e84a0",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "87464b80-7785-400f-8d9e-b3bf892b2f28"
              }
            ],
            "exits": [
              {
                "uuid": "3af52d52-b05c-4861-8bf8-5bef74af769a",
                "destination_uuid": "73f14647-d436-4909-8534-2da7ac0590a5"
              }
            ]
          },
          {
            "uuid": "73f14647-d436-4909-8534-2da7ac0590a5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "60c184a9-fa2e-423c-8e3a-6e2c4b53268f",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "df09c583-85c4-459b-a45f-7d92da2ea6f0",
                  "type": "has_only_phrase",
                  "uuid": "02c626c3-5b36-4d25-8bc1-63c6fe148b2d"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "745dbaff-05da-4f7e-b66e-81300cc329e0",
                  "type": "has_only_phrase",
                  "uuid": "46c460fd-b670-41b9-8efd-1a3ff234eeb3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d9a5f66e-d295-4ffc-94c8-32299dd63b60",
                  "name": "All Responses",
                  "uuid": "60c184a9-fa2e-423c-8e3a-6e2c4b53268f"
                },
                {
                  "exit_uuid": "f015f57c-5eac-49f4-b31e-3177dc2ae2dc",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "df09c583-85c4-459b-a45f-7d92da2ea6f0"
                },
                {
                  "exit_uuid": "4cce9cb2-4b5e-4ff2-9d50-02f39cd8c60d",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "745dbaff-05da-4f7e-b66e-81300cc329e0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d9a5f66e-d295-4ffc-94c8-32299dd63b60",
                "destination_uuid": null
              },
              {
                "uuid": "f015f57c-5eac-49f4-b31e-3177dc2ae2dc",
                "destination_uuid": "56cf8ad2-9dfa-4e37-92e1-d3b1fcf02ae9"
              },
              {
                "uuid": "4cce9cb2-4b5e-4ff2-9d50-02f39cd8c60d",
                "destination_uuid": "a8921f3b-1176-4aab-bc6d-758c5691134f"
              }
            ]
          },
          {
            "uuid": "56cf8ad2-9dfa-4e37-92e1-d3b1fcf02ae9",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "3f0346ee-1b6c-4ac0-8929-80b78e12becb"
              }
            ],
            "exits": [
              {
                "uuid": "9bc886d4-5fef-41ce-b7f9-a9dd8296fbd7",
                "destination_uuid": "b505a66b-0a62-4dd1-8fc0-2614f3b587da"
              }
            ]
          },
          {
            "uuid": "a8921f3b-1176-4aab-bc6d-758c5691134f",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "07205f77-257b-4e76-b302-3ced7f422da9"
              }
            ],
            "exits": [
              {
                "uuid": "cf39e3d6-4655-4440-9b9e-abc6751ae60b",
                "destination_uuid": "b505a66b-0a62-4dd1-8fc0-2614f3b587da"
              }
            ]
          },
          {
            "uuid": "b505a66b-0a62-4dd1-8fc0-2614f3b587da",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0a5f9a85-1d9b-4f2d-ab11-b5a03b13b156",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "80b6a029-fe37-4903-b82a-6a2341da6f4e",
                  "type": "has_only_phrase",
                  "uuid": "3d772dda-fab4-4af0-a942-2b1472cb11c1"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "35b1163b-18e1-411e-991c-b5800bf4db70",
                  "type": "has_only_phrase",
                  "uuid": "d4763051-9c89-49b1-b6b1-f7ddc8bd0ad2"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "f8c114a3-36cf-4440-ba51-2a0fa883bafd",
                  "type": "has_only_phrase",
                  "uuid": "675eff67-7361-48e0-b88f-c68a9ad072af"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7c49499b-7d67-4e91-b693-f45a03455554",
                  "name": "All Responses",
                  "uuid": "0a5f9a85-1d9b-4f2d-ab11-b5a03b13b156"
                },
                {
                  "exit_uuid": "b35c60c5-f244-4560-907e-1ea9f8827b71",
                  "name": "Hello",
                  "uuid": "80b6a029-fe37-4903-b82a-6a2341da6f4e"
                },
                {
                  "exit_uuid": "6c84ebef-15cf-43a3-9a9f-cc0460613268",
                  "name": "Goodbye",
                  "uuid": "35b1163b-18e1-411e-991c-b5800bf4db70"
                },
                {
                  "exit_uuid": "a2f032b5-2bae-438b-b5e0-c9fdd1a2a01a",
                  "name": "Goodbye",
                  "uuid": "f8c114a3-36cf-4440-ba51-2a0fa883bafd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7c49499b-7d67-4e91-b693-f45a03455554",
                "destination_uuid": null
              },
              {
                "uuid": "b35c60c5-f244-4560-907e-1ea9f8827b71",
                "destination_uuid": "798d5c94-539c-44cd-abc8-8103b54b9001"
              },
              {
                "uuid": "6c84ebef-15cf-43a3-9a9f-cc0460613268",
                "destination_uuid": "fe8996b8-922a-4e61-99f7-dde8f01c1fb9"
              },
              {
                "uuid": "a2f032b5-2bae-438b-b5e0-c9fdd1a2a01a",
                "destination_uuid": "fe8996b8-922a-4e61-99f7-dde8f01c1fb9"
              }
            ]
          },
          {
            "uuid": "798d5c94-539c-44cd-abc8-8103b54b9001",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5b03d1b1-d34e-4b1b-bbcc-c1fb25bdefe9"
              }
            ],
            "exits": [
              {
                "uuid": "20659832-44b7-44ce-af55-db8cc5d0e75f",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "fe8996b8-922a-4e61-99f7-dde8f01c1fb9",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9498e1da-9780-4828-a81c-2b2de9f99b22"
              }
            ],
            "exits": [
              {
                "uuid": "b6d2d080-f481-43f8-9daa-b9680e20c607",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f91a93f8-80aa-4340-96bc-f1f570e27e6f",
            "actions": [
              {
                "uuid": "ce3ebe8d-e768-4581-8d04-7cf5bb0aa3e6",
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
                "uuid": "eed6d302-bdd9-4a7f-a1c6-03912802cff5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5f6e0c33-76d9-4f66-8c06-92753baa63e4",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e028f102-859f-4a23-a81c-9a74977883e9",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7f69f647-896e-450e-8704-6a453d353f0c"
              }
            ],
            "exits": [
              {
                "uuid": "4d36d508-0ca2-4d53-8e29-e570450137ed",
                "destination_uuid": "1e144d5e-5b3a-4720-8893-b0f088c98f93"
              }
            ]
          },
          {
            "uuid": "1e144d5e-5b3a-4720-8893-b0f088c98f93",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "a20c159f-9f23-46bb-950e-940415abe9af"
              }
            ],
            "exits": [
              {
                "uuid": "dce72fb8-87f7-44aa-ba13-1fab6d0d9132",
                "destination_uuid": "0225b59b-c63a-48b4-b9d8-2feba4d20b12"
              }
            ]
          },
          {
            "uuid": "0225b59b-c63a-48b4-b9d8-2feba4d20b12",
            "actions": [],
            "exits": [
              {
                "uuid": "5a521109-431c-452c-af6a-0e3a1f0fbd41",
                "destination_uuid": "51899afc-0455-40ba-9f82-15bb9f3f89c7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "de9862e7-4af6-4a23-899e-f893236a1081",
              "cases": [],
              "categories": [
                {
                  "uuid": "de9862e7-4af6-4a23-899e-f893236a1081",
                  "name": "All Responses",
                  "exit_uuid": "5a521109-431c-452c-af6a-0e3a1f0fbd41"
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
            "uuid": "51899afc-0455-40ba-9f82-15bb9f3f89c7",
            "actions": [
              {
                "uuid": "3a7f87b1-8c39-459d-8fa8-91e200a9520e",
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
                "uuid": "d1081d3d-b989-4f75-9661-349437443229",
                "destination_uuid": "5e36d8dc-9f5b-48ba-9c04-6ace2fcbcea4"
              }
            ]
          },
          {
            "uuid": "5e36d8dc-9f5b-48ba-9c04-6ace2fcbcea4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7f667669-9afa-4e6f-98b6-28cf130c2e04",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "6a02738d-5189-4d4a-aff6-fc4847f95cf4",
                  "type": "has_only_phrase",
                  "uuid": "f9bc3000-05d2-4b98-852a-d7acb9548e5d"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "9db0a1a3-2e2f-434a-8035-4081e02b1ebc",
                  "type": "has_only_phrase",
                  "uuid": "e9f967bd-3fa9-4b43-b4de-ac0d985dd778"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1c32f9b5-bec4-4f74-81ec-480a0b48aef8",
                  "name": "All Responses",
                  "uuid": "7f667669-9afa-4e6f-98b6-28cf130c2e04"
                },
                {
                  "exit_uuid": "687c32a6-86a8-4061-91af-4d392c063951",
                  "name": "1",
                  "uuid": "6a02738d-5189-4d4a-aff6-fc4847f95cf4"
                },
                {
                  "exit_uuid": "02d24b04-3fde-40d1-8492-b3d9d238df1a",
                  "name": "2",
                  "uuid": "9db0a1a3-2e2f-434a-8035-4081e02b1ebc"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "1c32f9b5-bec4-4f74-81ec-480a0b48aef8",
                "destination_uuid": "aa0fc363-a4e4-4826-ae5d-11c966cde7e0"
              },
              {
                "uuid": "687c32a6-86a8-4061-91af-4d392c063951",
                "destination_uuid": "8a672ca0-0a9f-4c32-b227-3635933322b6"
              },
              {
                "uuid": "02d24b04-3fde-40d1-8492-b3d9d238df1a",
                "destination_uuid": "96a51490-6624-44ba-afc6-8f39e49dd91c"
              }
            ]
          },
          {
            "uuid": "8a672ca0-0a9f-4c32-b227-3635933322b6",
            "actions": [
              {
                "uuid": "a1447e04-1b83-4d58-a69b-3e6c6a7a1957",
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
                "uuid": "8d43b40a-f4b2-42f6-ab3d-7a23e9f6d754",
                "destination_uuid": "3a118f2e-3d5f-44d5-917a-b980a01d2a8e"
              }
            ]
          },
          {
            "uuid": "96a51490-6624-44ba-afc6-8f39e49dd91c",
            "actions": [
              {
                "uuid": "7f905247-8b46-4217-9398-0055e25d4385",
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
                "uuid": "704f8254-94f4-4588-aa19-9e98e9b61c6d",
                "destination_uuid": "fba38fba-b758-4bc1-ae66-1a3a7d403d48"
              }
            ]
          },
          {
            "uuid": "aa0fc363-a4e4-4826-ae5d-11c966cde7e0",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5a88fd44-e500-44c1-9d5b-8cc0c36414db"
              }
            ],
            "exits": [
              {
                "uuid": "7627a919-7daf-4ee9-8a2f-05c7b0f97756",
                "destination_uuid": "64b83f64-db3a-4838-a12d-490e18b08914"
              }
            ]
          },
          {
            "uuid": "64b83f64-db3a-4838-a12d-490e18b08914",
            "actions": [],
            "exits": [
              {
                "uuid": "4a87da31-ee42-426f-8fb4-70a219c9af23",
                "destination_uuid": "8de0c2f7-773b-4618-9f5e-ffb3e5954e6e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7487aa6c-4e4a-4df0-933a-7fa39616687c",
              "cases": [],
              "categories": [
                {
                  "uuid": "7487aa6c-4e4a-4df0-933a-7fa39616687c",
                  "name": "All Responses",
                  "exit_uuid": "4a87da31-ee42-426f-8fb4-70a219c9af23"
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
            "uuid": "8de0c2f7-773b-4618-9f5e-ffb3e5954e6e",
            "actions": [
              {
                "uuid": "387f6875-fd3c-4245-9aba-fa1083827ab1",
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
                "uuid": "155c23e6-ac7a-4792-ab84-37b814053230",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "3a118f2e-3d5f-44d5-917a-b980a01d2a8e",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "533cccaf-5ec5-4171-9320-7acf0f359311"
              }
            ],
            "exits": [
              {
                "uuid": "1bba933e-2779-42f9-8dc0-0e07c0990400",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "fba38fba-b758-4bc1-ae66-1a3a7d403d48",
            "actions": [
              {
                "uuid": "a86b4711-1ea1-42a4-bcb8-2b70fe525ec3",
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
                "uuid": "36b0b40e-bf18-400d-ba52-c62e9e6919a9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "1c02ee65-5d70-46b2-803a-e4358dd8db2a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "fc8393ca-7d12-47f1-8633-274dbf7c5074",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "edca94ce-098e-424d-abd3-039678369aa9"
              }
            ],
            "exits": [
              {
                "uuid": "badd1e35-419f-4e9d-bc32-6791a6094add",
                "destination_uuid": "ed0d6cd1-1028-45a1-bfb2-3c83e0fc1041"
              }
            ]
          },
          {
            "uuid": "ed0d6cd1-1028-45a1-bfb2-3c83e0fc1041",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "eeb3240c-0e03-4728-a044-9be3cf4adbf6"
              }
            ],
            "exits": [
              {
                "uuid": "33759e36-d55b-4d90-bd29-be3eb94102bc",
                "destination_uuid": "ab9781d8-98ae-4ff7-a5f4-5feca0672deb"
              }
            ]
          },
          {
            "uuid": "ab9781d8-98ae-4ff7-a5f4-5feca0672deb",
            "actions": [],
            "exits": [
              {
                "uuid": "0d221040-eec1-4992-b92e-2b47baafa48b",
                "destination_uuid": "ecd6f5aa-5034-45c1-9a0b-dbebcefde647"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "831fff57-b49b-4dec-9cf8-76cdc935d345",
              "cases": [],
              "categories": [
                {
                  "uuid": "831fff57-b49b-4dec-9cf8-76cdc935d345",
                  "name": "All Responses",
                  "exit_uuid": "0d221040-eec1-4992-b92e-2b47baafa48b"
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
            "uuid": "ecd6f5aa-5034-45c1-9a0b-dbebcefde647",
            "actions": [
              {
                "uuid": "8e1b1c44-069a-422c-a618-82b572313ee4",
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
                "uuid": "12bd651e-842d-4a28-82d2-beb439a40520",
                "destination_uuid": "72c9f9af-742c-463f-a293-24a2df95568a"
              }
            ]
          },
          {
            "uuid": "72c9f9af-742c-463f-a293-24a2df95568a",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "09cd39c4-cc76-4cf0-ac9c-0736bb5ca85e"
                },
                "type": "enter_flow",
                "uuid": "7e67880b-fe10-488e-81f5-96b918bb1ddd"
              }
            ],
            "exits": [
              {
                "uuid": "27a4e00b-46d0-4ee1-969a-4155c4e39a4d",
                "destination_uuid": "a9646ec3-3f34-4116-9ce4-28c0057d5a3f"
              },
              {
                "uuid": "898d3f7a-e965-4148-9806-794fdcf331de",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "4a7d05ea-b592-48a4-8b2e-814d211076ae",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f13c3338-d571-4ae4-93f6-4a26dbdd53ad"
                },
                {
                  "uuid": "f8581bc8-337b-43f8-9f39-54816fefd400",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f4de7d10-8290-445e-b56f-8f10999f9427"
                }
              ],
              "categories": [
                {
                  "uuid": "f13c3338-d571-4ae4-93f6-4a26dbdd53ad",
                  "name": "Complete",
                  "exit_uuid": "27a4e00b-46d0-4ee1-969a-4155c4e39a4d"
                },
                {
                  "uuid": "f4de7d10-8290-445e-b56f-8f10999f9427",
                  "name": "Expired",
                  "exit_uuid": "898d3f7a-e965-4148-9806-794fdcf331de"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f13c3338-d571-4ae4-93f6-4a26dbdd53ad"
            }
          },
          {
            "uuid": "a9646ec3-3f34-4116-9ce4-28c0057d5a3f",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "05002078-1657-47ad-9180-e4edc9c173ff"
              }
            ],
            "exits": [
              {
                "uuid": "32f78706-b39c-4b64-98b5-edb4ecafd9d5",
                "destination_uuid": "20265823-d622-4ef4-a4b6-71abf0671ad3"
              }
            ]
          },
          {
            "uuid": "20265823-d622-4ef4-a4b6-71abf0671ad3",
            "actions": [],
            "exits": [
              {
                "uuid": "c6c10611-1cd7-4246-bb33-3f868766c45c",
                "destination_uuid": "562d643c-edf6-44ce-b526-4be6010aded7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fc719d6d-530d-4fc6-b020-07d5f20c2ace",
              "cases": [],
              "categories": [
                {
                  "uuid": "fc719d6d-530d-4fc6-b020-07d5f20c2ace",
                  "name": "All Responses",
                  "exit_uuid": "c6c10611-1cd7-4246-bb33-3f868766c45c"
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
            "uuid": "562d643c-edf6-44ce-b526-4be6010aded7",
            "actions": [
              {
                "uuid": "67b21d0a-ec86-4330-b224-6e73ff7e039a",
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
                "uuid": "a4b0c994-1371-4fbf-9f72-377cd4b427c0",
                "destination_uuid": "63af47a4-5aec-4ace-ae6b-73f0f699e8bd"
              }
            ]
          },
          {
            "uuid": "63af47a4-5aec-4ace-ae6b-73f0f699e8bd",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8f70db7a-2fe1-4b4f-80e7-a5138638581c",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "29bea904-8cc6-4a7b-85ef-42a5604c6fe2",
                  "type": "has_only_phrase",
                  "uuid": "71b771f5-cdc1-417d-b8b5-e6275a913522"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "1723c032-369f-4c2a-b9ae-48d4750170f5",
                  "type": "has_only_phrase",
                  "uuid": "f7fe2113-8917-48ce-bd89-29df9dbbcbb5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cd5c00f2-b713-4e90-b3df-47fe5dad661a",
                  "name": "All Responses",
                  "uuid": "8f70db7a-2fe1-4b4f-80e7-a5138638581c"
                },
                {
                  "exit_uuid": "01d6f567-9fe9-4bf0-8cf5-3c9be17c9f87",
                  "name": "guide1",
                  "uuid": "29bea904-8cc6-4a7b-85ef-42a5604c6fe2"
                },
                {
                  "exit_uuid": "29601585-02bb-4c25-a8ba-b922dc1c45ff",
                  "name": "guide2",
                  "uuid": "1723c032-369f-4c2a-b9ae-48d4750170f5"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "cd5c00f2-b713-4e90-b3df-47fe5dad661a",
                "destination_uuid": null
              },
              {
                "uuid": "01d6f567-9fe9-4bf0-8cf5-3c9be17c9f87",
                "destination_uuid": "b2880bad-6642-4c21-8a44-38d13ac2fe5f"
              },
              {
                "uuid": "29601585-02bb-4c25-a8ba-b922dc1c45ff",
                "destination_uuid": "0d7ed2b0-a0b6-482e-a4be-0e78538628a8"
              }
            ]
          },
          {
            "uuid": "b2880bad-6642-4c21-8a44-38d13ac2fe5f",
            "actions": [
              {
                "uuid": "6122d984-c1aa-4939-9e3f-6427b3d1a7f5",
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
                "uuid": "70dd315c-2827-4803-b910-3f03beeb2ffc",
                "destination_uuid": "1c3aa55a-bcb4-45cf-9e29-77741a801cb2"
              }
            ]
          },
          {
            "uuid": "0d7ed2b0-a0b6-482e-a4be-0e78538628a8",
            "actions": [
              {
                "uuid": "28925745-61ec-4eb0-8735-085f64864477",
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
                "uuid": "cdacf53d-7ae1-4ac4-90a9-2ad1ec0b7d54",
                "destination_uuid": "1c3aa55a-bcb4-45cf-9e29-77741a801cb2"
              }
            ]
          },
          {
            "uuid": "1c3aa55a-bcb4-45cf-9e29-77741a801cb2",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "75f80935-0f43-455d-8bc5-226a13c20675"
              }
            ],
            "exits": [
              {
                "uuid": "d944e4d6-41a5-4dbf-9e42-96f3e2c8449c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "10f4440e-b881-46f2-a60a-74ddd242a6ff",
            "actions": [
              {
                "uuid": "f1b72ff0-0b78-43c9-86e5-b0dd75fe6a45",
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
                "uuid": "9cbee6d3-8f11-412d-99b5-98fd502537a6",
                "destination_uuid": "4ccfa337-a952-4932-945a-1287ce8ff89c"
              }
            ]
          },
          {
            "uuid": "4ccfa337-a952-4932-945a-1287ce8ff89c",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "d7ffa1d3-2588-4e37-bd06-30490c0e6dce"
                },
                "type": "enter_flow",
                "uuid": "1c975139-c00a-48b2-9b0b-bd68794af2a3"
              }
            ],
            "exits": [
              {
                "uuid": "4d51a3a2-46ed-4df1-9c94-37ffde56c54f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "59ec0b92-4726-4201-b2f0-da5ae8e08d1c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a9e728fd-a69d-4fd7-970c-7b42f6912358",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c246945b-1619-46bc-9940-4446905a8376"
              }
            ],
            "exits": [
              {
                "uuid": "fd7c09c9-9ccd-4044-8d62-6ff9807ee81b",
                "destination_uuid": "d31f0256-ec93-413a-b231-77efd193dd14"
              }
            ]
          },
          {
            "uuid": "d31f0256-ec93-413a-b231-77efd193dd14",
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
                "uuid": "74ea2dcf-2460-4ebf-a0ff-2745c97c9bec"
              }
            ],
            "exits": [
              {
                "uuid": "c4655cf4-bbbf-4b4f-abe4-760cbbadcb5e",
                "destination_uuid": "2d2581da-974c-4470-8b73-1940bae9727b"
              }
            ]
          },
          {
            "uuid": "2d2581da-974c-4470-8b73-1940bae9727b",
            "actions": [],
            "exits": [
              {
                "uuid": "26ee54e0-f0f2-4652-86be-7f99a55fb316",
                "destination_uuid": "423ff2ff-b4a5-4258-a3d1-237dc8b82b0a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "5dea5e02-5bb8-4836-bf09-4cc24c11833a",
              "cases": [],
              "categories": [
                {
                  "uuid": "5dea5e02-5bb8-4836-bf09-4cc24c11833a",
                  "name": "All Responses",
                  "exit_uuid": "26ee54e0-f0f2-4652-86be-7f99a55fb316"
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
            "uuid": "423ff2ff-b4a5-4258-a3d1-237dc8b82b0a",
            "actions": [
              {
                "uuid": "7769fe76-a452-4859-aafb-4061e318bfef",
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
                "uuid": "90a78209-8d18-4df1-a023-21d1159252ea",
                "destination_uuid": "57392a4a-7d9e-433f-b742-dff607d87b4e"
              }
            ]
          },
          {
            "uuid": "57392a4a-7d9e-433f-b742-dff607d87b4e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "aaa5851e-a47e-4420-9716-5e5da17fc61e",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "fbf9bafc-e0f5-48e7-a976-f86f9ae0a88b",
                  "type": "has_only_phrase",
                  "uuid": "c9886678-3d30-4734-a039-fdacb6fe34f2"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "fbf9bafc-e0f5-48e7-a976-f86f9ae0a88b",
                  "type": "has_only_phrase",
                  "uuid": "4d64b458-f275-4304-886f-81f23b1c036d"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "fbf9bafc-e0f5-48e7-a976-f86f9ae0a88b",
                  "type": "has_only_phrase",
                  "uuid": "1f80b311-6b59-45aa-8347-991afd1fb5c3"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "fbf9bafc-e0f5-48e7-a976-f86f9ae0a88b",
                  "type": "has_only_phrase",
                  "uuid": "bc70ce99-1f1c-4a65-a945-ff9ad79ad489"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "37450286-8b26-41ff-bc19-341d21fdabe4",
                  "type": "has_only_phrase",
                  "uuid": "658fc173-48e5-4040-aeb3-d59125c4162a"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "37450286-8b26-41ff-bc19-341d21fdabe4",
                  "type": "has_only_phrase",
                  "uuid": "8efba55e-c6ac-4e57-bd63-4efe64325f5f"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "37450286-8b26-41ff-bc19-341d21fdabe4",
                  "type": "has_only_phrase",
                  "uuid": "492e3129-9cdf-4eeb-bbca-5889c650a0ad"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "37450286-8b26-41ff-bc19-341d21fdabe4",
                  "type": "has_only_phrase",
                  "uuid": "f3c28e92-4244-4e7e-99f5-390cea4c174e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b830133a-d687-487f-ab65-afee4edd5a5b",
                  "name": "All Responses",
                  "uuid": "aaa5851e-a47e-4420-9716-5e5da17fc61e"
                },
                {
                  "exit_uuid": "0a70dfbc-036f-4c33-99d8-374487769093",
                  "name": "0;1;2;3",
                  "uuid": "fbf9bafc-e0f5-48e7-a976-f86f9ae0a88b"
                },
                {
                  "exit_uuid": "f30fb7e2-8559-47c5-bf4a-07a5edfbd0db",
                  "name": "4;5;6;7",
                  "uuid": "37450286-8b26-41ff-bc19-341d21fdabe4"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "b830133a-d687-487f-ab65-afee4edd5a5b",
                "destination_uuid": null
              },
              {
                "uuid": "0a70dfbc-036f-4c33-99d8-374487769093",
                "destination_uuid": "371c68fc-edf4-4598-acac-5513527e0992"
              },
              {
                "uuid": "f30fb7e2-8559-47c5-bf4a-07a5edfbd0db",
                "destination_uuid": "881d0181-7c81-4b16-9ff8-8b3d8e218965"
              }
            ]
          },
          {
            "uuid": "371c68fc-edf4-4598-acac-5513527e0992",
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
                "uuid": "16ed3d3d-ae80-4912-86a8-658b2226335f"
              }
            ],
            "exits": [
              {
                "uuid": "680d0684-1c00-4ae7-a785-d93e968a9b98",
                "destination_uuid": "20e8d943-53a3-4aad-bca9-522e21637722"
              }
            ]
          },
          {
            "uuid": "881d0181-7c81-4b16-9ff8-8b3d8e218965",
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
                "uuid": "4978440c-87d2-461d-b588-c1132bee21f8"
              }
            ],
            "exits": [
              {
                "uuid": "635c57d2-1d22-4322-8c05-486bc3fefb16",
                "destination_uuid": "20e8d943-53a3-4aad-bca9-522e21637722"
              }
            ]
          },
          {
            "uuid": "20e8d943-53a3-4aad-bca9-522e21637722",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "462427d8-901d-4b9d-9967-8b3328ec9d9d",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "4eb4607e-e31c-44d2-872a-225c4a981573",
                  "type": "has_only_phrase",
                  "uuid": "4c5d3aea-cc42-442f-8823-60ee9f58d2e2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8da84096-8d5a-4116-8b33-d2f6e50b7e8d",
                  "name": "All Responses",
                  "uuid": "462427d8-901d-4b9d-9967-8b3328ec9d9d"
                },
                {
                  "exit_uuid": "a68b35f8-499b-4a76-bb4b-17b59cc00570",
                  "name": "Next",
                  "uuid": "4eb4607e-e31c-44d2-872a-225c4a981573"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8da84096-8d5a-4116-8b33-d2f6e50b7e8d",
                "destination_uuid": null
              },
              {
                "uuid": "a68b35f8-499b-4a76-bb4b-17b59cc00570",
                "destination_uuid": "b075611e-a17b-4bb7-83f6-1741eec4b02e"
              }
            ]
          },
          {
            "uuid": "b075611e-a17b-4bb7-83f6-1741eec4b02e",
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
                "uuid": "152b8181-79cc-4637-bfa4-e20443ada15d"
              }
            ],
            "exits": [
              {
                "uuid": "31dfb32e-9c97-4663-88a0-e98697840808",
                "destination_uuid": "57412d4e-cf4b-4e3e-9ae5-cf4848ba9cb4"
              }
            ]
          },
          {
            "uuid": "57412d4e-cf4b-4e3e-9ae5-cf4848ba9cb4",
            "actions": [],
            "exits": [
              {
                "uuid": "19e6c90b-3de1-496b-a0de-996f7c0b8ec1",
                "destination_uuid": "b632e9d3-5fd1-44ff-8228-3115de2dd594"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "756c2b03-49f0-4179-bbd6-0266b39216b8",
              "cases": [],
              "categories": [
                {
                  "uuid": "756c2b03-49f0-4179-bbd6-0266b39216b8",
                  "name": "All Responses",
                  "exit_uuid": "19e6c90b-3de1-496b-a0de-996f7c0b8ec1"
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
            "uuid": "b632e9d3-5fd1-44ff-8228-3115de2dd594",
            "actions": [
              {
                "uuid": "c63d4af9-c30d-4406-be08-c3ffaf1bc6f0",
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
                "uuid": "9caf9f86-eb87-4743-8d62-32b74076a910",
                "destination_uuid": "bcb9b922-84c7-4402-9a97-c2ed1e7136e6"
              }
            ]
          },
          {
            "uuid": "bcb9b922-84c7-4402-9a97-c2ed1e7136e6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "746c3ba1-2f9d-41e3-bff5-0e1ff434f79f",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "f0f4021c-ed0b-4a4e-8314-64033e9070b5",
                  "type": "has_only_phrase",
                  "uuid": "9bbbfe2d-a02a-43f6-922b-50384901e828"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "f0f4021c-ed0b-4a4e-8314-64033e9070b5",
                  "type": "has_only_phrase",
                  "uuid": "8e66d86a-97b2-44a4-a1ca-23c78deaee6a"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "f0f4021c-ed0b-4a4e-8314-64033e9070b5",
                  "type": "has_only_phrase",
                  "uuid": "4084c069-04eb-4847-84b3-ad5b86a7144b"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "f0f4021c-ed0b-4a4e-8314-64033e9070b5",
                  "type": "has_only_phrase",
                  "uuid": "7f7c7c6f-ba14-4e79-81c7-ac0b039360cd"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "f0f4021c-ed0b-4a4e-8314-64033e9070b5",
                  "type": "has_only_phrase",
                  "uuid": "0471b324-4c9d-409c-b151-06e4bcf7223c"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "0a65a5d3-3e96-4634-9a10-ba853ca1f941",
                  "type": "has_only_phrase",
                  "uuid": "93ff1ee1-92fc-4a1f-8165-da0975385e28"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "0a65a5d3-3e96-4634-9a10-ba853ca1f941",
                  "type": "has_only_phrase",
                  "uuid": "4a3a715e-53c4-4e4b-acf1-e5265b7e11a7"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "0a65a5d3-3e96-4634-9a10-ba853ca1f941",
                  "type": "has_only_phrase",
                  "uuid": "7cfca02b-a3ef-489d-8af5-4fab0e4ac9de"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "0a65a5d3-3e96-4634-9a10-ba853ca1f941",
                  "type": "has_only_phrase",
                  "uuid": "01b64d35-cde1-4a4d-99ad-8a92ea6b6231"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b1e29003-0c76-4af5-83d6-23ea8ee5dfe4",
                  "name": "All Responses",
                  "uuid": "746c3ba1-2f9d-41e3-bff5-0e1ff434f79f"
                },
                {
                  "exit_uuid": "bf7d2c5f-ef40-4b76-873a-2d9949c4720f",
                  "name": "0;1;2;3;4",
                  "uuid": "f0f4021c-ed0b-4a4e-8314-64033e9070b5"
                },
                {
                  "exit_uuid": "1f89fc86-dc5b-46c9-ad4e-bbb7691c58bf",
                  "name": "5;6;7;8",
                  "uuid": "0a65a5d3-3e96-4634-9a10-ba853ca1f941"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "b1e29003-0c76-4af5-83d6-23ea8ee5dfe4",
                "destination_uuid": null
              },
              {
                "uuid": "bf7d2c5f-ef40-4b76-873a-2d9949c4720f",
                "destination_uuid": "a6c7b4f6-a1e8-417c-8c3f-ed713526a2df"
              },
              {
                "uuid": "1f89fc86-dc5b-46c9-ad4e-bbb7691c58bf",
                "destination_uuid": "840dd327-8070-4149-8ba4-82144cafda70"
              }
            ]
          },
          {
            "uuid": "a6c7b4f6-a1e8-417c-8c3f-ed713526a2df",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "3e51fe87-95ab-4ef5-9db1-73507206fdee"
              }
            ],
            "exits": [
              {
                "uuid": "a166ac87-e863-463a-9008-ec8de92c7acb",
                "destination_uuid": "c00ffdc2-447a-44b2-8493-847dc8aad0b4"
              }
            ]
          },
          {
            "uuid": "840dd327-8070-4149-8ba4-82144cafda70",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "a1992aa4-3eb1-4826-b661-2bab6775ae29"
              }
            ],
            "exits": [
              {
                "uuid": "ddb8d80a-ec5a-4028-b92b-775c0eba60b5",
                "destination_uuid": "c00ffdc2-447a-44b2-8493-847dc8aad0b4"
              }
            ]
          },
          {
            "uuid": "c00ffdc2-447a-44b2-8493-847dc8aad0b4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "81bc3b63-822a-4620-a2c2-10871fe1d5fa",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "abbeab86-8893-4192-a212-ad1ae09f6909",
                  "type": "has_only_phrase",
                  "uuid": "26cd6441-be4c-44cf-a711-569cf1c997b1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4d3d9061-9f38-4bb4-8ce0-ec98d34fcfcf",
                  "name": "All Responses",
                  "uuid": "81bc3b63-822a-4620-a2c2-10871fe1d5fa"
                },
                {
                  "exit_uuid": "8968ad22-8d1b-4ee2-87eb-64a34a3f0184",
                  "name": "Next",
                  "uuid": "abbeab86-8893-4192-a212-ad1ae09f6909"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4d3d9061-9f38-4bb4-8ce0-ec98d34fcfcf",
                "destination_uuid": null
              },
              {
                "uuid": "8968ad22-8d1b-4ee2-87eb-64a34a3f0184",
                "destination_uuid": "3a489b7f-22aa-4e3d-910a-52ae8cac396f"
              }
            ]
          },
          {
            "uuid": "3a489b7f-22aa-4e3d-910a-52ae8cac396f",
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
                "uuid": "4b9c4154-3711-4677-9a3d-a710878e92b8"
              }
            ],
            "exits": [
              {
                "uuid": "a584f816-47be-44c9-b9fc-246f07c869ee",
                "destination_uuid": "0fb25277-ada5-4b54-96ba-a1030624141f"
              }
            ]
          },
          {
            "uuid": "0fb25277-ada5-4b54-96ba-a1030624141f",
            "actions": [],
            "exits": [
              {
                "uuid": "85a9a46f-a44e-4af9-983f-c01eeb3bd32d",
                "destination_uuid": "8b8b0f23-bba2-4997-9a25-df080892bd69"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c89a9557-37a1-4145-9462-f022caed244e",
              "cases": [],
              "categories": [
                {
                  "uuid": "c89a9557-37a1-4145-9462-f022caed244e",
                  "name": "All Responses",
                  "exit_uuid": "85a9a46f-a44e-4af9-983f-c01eeb3bd32d"
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
            "uuid": "8b8b0f23-bba2-4997-9a25-df080892bd69",
            "actions": [
              {
                "uuid": "5d0dbac2-b3f5-49c6-b6d1-52a1ed5d287e",
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
                "uuid": "192ad5a7-a422-4b2d-b9dd-cc46b3518085",
                "destination_uuid": "f1c6d2f5-1402-4194-8ddc-31e933e7b266"
              }
            ]
          },
          {
            "uuid": "f1c6d2f5-1402-4194-8ddc-31e933e7b266",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ca00e0ed-6e17-46cc-b082-ef9fcf7f5ff9",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "c49d1e51-c42e-4bd7-b7fb-0ac7adf4d648",
                  "type": "has_only_phrase",
                  "uuid": "cec06d21-b71f-436d-bd11-581bb7054699"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "c49d1e51-c42e-4bd7-b7fb-0ac7adf4d648",
                  "type": "has_only_phrase",
                  "uuid": "1d357209-ab34-4c25-8d30-445e5aa5be6e"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "c49d1e51-c42e-4bd7-b7fb-0ac7adf4d648",
                  "type": "has_only_phrase",
                  "uuid": "3cb665e8-7c2b-483a-827e-3d5b9d649c4f"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "ee06459f-6168-4e19-8202-6d3a8e5d1076",
                  "type": "has_only_phrase",
                  "uuid": "26686739-f601-40cc-890f-812661a6bab1"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "ee06459f-6168-4e19-8202-6d3a8e5d1076",
                  "type": "has_only_phrase",
                  "uuid": "ae7ee5b6-6c17-4e6b-befb-9f25cacfda2b"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "ee06459f-6168-4e19-8202-6d3a8e5d1076",
                  "type": "has_only_phrase",
                  "uuid": "eb102b26-9581-41ee-a67d-a458683d90e2"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "ee06459f-6168-4e19-8202-6d3a8e5d1076",
                  "type": "has_only_phrase",
                  "uuid": "a358652f-e3b4-468a-8907-90bd45e3b2fe"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "ee06459f-6168-4e19-8202-6d3a8e5d1076",
                  "type": "has_only_phrase",
                  "uuid": "d12de537-dcda-4986-923a-1f385070a7a8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "66724f14-a6d7-4515-9eca-5285787cfdca",
                  "name": "All Responses",
                  "uuid": "ca00e0ed-6e17-46cc-b082-ef9fcf7f5ff9"
                },
                {
                  "exit_uuid": "d87dcbfa-96d8-4d72-a1e8-cfdbfbfe3769",
                  "name": "0;1;2",
                  "uuid": "c49d1e51-c42e-4bd7-b7fb-0ac7adf4d648"
                },
                {
                  "exit_uuid": "21a06a6d-fd55-4f83-b108-736005f678b9",
                  "name": "3;4;5;6;7",
                  "uuid": "ee06459f-6168-4e19-8202-6d3a8e5d1076"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "66724f14-a6d7-4515-9eca-5285787cfdca",
                "destination_uuid": null
              },
              {
                "uuid": "d87dcbfa-96d8-4d72-a1e8-cfdbfbfe3769",
                "destination_uuid": "0ebba118-0171-42ea-9727-e227beb12e29"
              },
              {
                "uuid": "21a06a6d-fd55-4f83-b108-736005f678b9",
                "destination_uuid": "e564294b-5f4e-48bc-b29c-a0922ab4d594"
              }
            ]
          },
          {
            "uuid": "0ebba118-0171-42ea-9727-e227beb12e29",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "863a1cc3-7783-4279-8e22-b5139ecff8ff"
              }
            ],
            "exits": [
              {
                "uuid": "0998180d-8d88-4437-afa4-9f3c7ddc8cd3",
                "destination_uuid": "5825092a-30af-4a42-b20a-793a9c62a7e4"
              }
            ]
          },
          {
            "uuid": "e564294b-5f4e-48bc-b29c-a0922ab4d594",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "16348a64-d648-4d7f-a901-00a9e2564a2e"
              }
            ],
            "exits": [
              {
                "uuid": "16a28a70-3f29-4604-b10a-8af80a6f2d43",
                "destination_uuid": "5825092a-30af-4a42-b20a-793a9c62a7e4"
              }
            ]
          },
          {
            "uuid": "5825092a-30af-4a42-b20a-793a9c62a7e4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d11ee3f1-0109-4240-9cb3-5aef57f14e4a",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "1f1129fe-786e-4677-a810-7ebfdadb9868",
                  "type": "has_only_phrase",
                  "uuid": "43b926f9-8f98-4b08-a80c-f64ca60626e4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d0c25f10-e0ef-4061-8df9-1d65344d021d",
                  "name": "All Responses",
                  "uuid": "d11ee3f1-0109-4240-9cb3-5aef57f14e4a"
                },
                {
                  "exit_uuid": "3881fcaf-7f10-4982-95ce-fcfa8a813518",
                  "name": "Next",
                  "uuid": "1f1129fe-786e-4677-a810-7ebfdadb9868"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d0c25f10-e0ef-4061-8df9-1d65344d021d",
                "destination_uuid": null
              },
              {
                "uuid": "3881fcaf-7f10-4982-95ce-fcfa8a813518",
                "destination_uuid": "72b47893-698c-4088-9ff4-f93a852f0ead"
              }
            ]
          },
          {
            "uuid": "72b47893-698c-4088-9ff4-f93a852f0ead",
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
                "uuid": "569695c7-67d9-4d0b-8160-7f5c0fb30e0a"
              }
            ],
            "exits": [
              {
                "uuid": "762da131-d48f-4d1c-9363-047cd469149a",
                "destination_uuid": "05ec2ec2-ec61-420d-ac26-7780411d74da"
              }
            ]
          },
          {
            "uuid": "05ec2ec2-ec61-420d-ac26-7780411d74da",
            "actions": [],
            "exits": [
              {
                "uuid": "ca7bd666-0582-44bc-8998-f4c1dbf900a5",
                "destination_uuid": "4934e9ff-d19f-4caa-b630-f2a912716e2b"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3274af77-f010-48a7-98e0-fcce9dbc501a",
              "cases": [],
              "categories": [
                {
                  "uuid": "3274af77-f010-48a7-98e0-fcce9dbc501a",
                  "name": "All Responses",
                  "exit_uuid": "ca7bd666-0582-44bc-8998-f4c1dbf900a5"
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
            "uuid": "4934e9ff-d19f-4caa-b630-f2a912716e2b",
            "actions": [
              {
                "uuid": "3cef1cc3-c5b5-4124-8c86-8647536b9700",
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
                "uuid": "a97aa234-3c10-4f5c-a452-c89b052c8b3a",
                "destination_uuid": "b0cee2ed-c827-4158-adf7-17b23ba14be7"
              }
            ]
          },
          {
            "uuid": "b0cee2ed-c827-4158-adf7-17b23ba14be7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "27d011e1-2f84-4e4a-aca4-567efe1444d3",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "0a2bfd38-85cf-4dc8-a243-a623b661fdc0",
                  "type": "has_only_phrase",
                  "uuid": "181a8fdc-605d-415e-a24d-374f0518cb2a"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "0a2bfd38-85cf-4dc8-a243-a623b661fdc0",
                  "type": "has_only_phrase",
                  "uuid": "4fc50679-e569-4070-b469-e5fb323d2482"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "a52671b1-89c8-41ae-bb1e-ebb9c09f9ec8",
                  "type": "has_only_phrase",
                  "uuid": "9432d375-229d-456d-a219-06119e380abd"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "a52671b1-89c8-41ae-bb1e-ebb9c09f9ec8",
                  "type": "has_only_phrase",
                  "uuid": "54405b94-2f0a-4904-b551-6f5f4fedef19"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "a52671b1-89c8-41ae-bb1e-ebb9c09f9ec8",
                  "type": "has_only_phrase",
                  "uuid": "65e45c22-9617-421c-9724-02cdf2b86744"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "a52671b1-89c8-41ae-bb1e-ebb9c09f9ec8",
                  "type": "has_only_phrase",
                  "uuid": "c1361ee5-bd6a-48f7-9c90-ff74b018a605"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "a52671b1-89c8-41ae-bb1e-ebb9c09f9ec8",
                  "type": "has_only_phrase",
                  "uuid": "21eb950f-d37b-460b-9c7b-b211d3f937da"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "a52671b1-89c8-41ae-bb1e-ebb9c09f9ec8",
                  "type": "has_only_phrase",
                  "uuid": "d1ffd83a-c0a1-4159-ae06-93e61b0847ca"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7dfb9d6e-58c9-4fe1-95aa-3d673a16f8e8",
                  "name": "All Responses",
                  "uuid": "27d011e1-2f84-4e4a-aca4-567efe1444d3"
                },
                {
                  "exit_uuid": "88fba575-011f-4c38-a26d-d83357196298",
                  "name": "0;1",
                  "uuid": "0a2bfd38-85cf-4dc8-a243-a623b661fdc0"
                },
                {
                  "exit_uuid": "598981b4-0613-4b09-b0a0-0660699706cc",
                  "name": "2;3;4;5;6;7",
                  "uuid": "a52671b1-89c8-41ae-bb1e-ebb9c09f9ec8"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "7dfb9d6e-58c9-4fe1-95aa-3d673a16f8e8",
                "destination_uuid": null
              },
              {
                "uuid": "88fba575-011f-4c38-a26d-d83357196298",
                "destination_uuid": "d6037b58-b958-42a7-8e06-43b29c98607b"
              },
              {
                "uuid": "598981b4-0613-4b09-b0a0-0660699706cc",
                "destination_uuid": "991d1f2c-68e2-4dd7-8d54-da2847c183d4"
              }
            ]
          },
          {
            "uuid": "d6037b58-b958-42a7-8e06-43b29c98607b",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "ca939e34-9134-48e4-8f33-16e3b5b64077"
              }
            ],
            "exits": [
              {
                "uuid": "2d45e695-5afd-485d-987d-80a1b98ae411",
                "destination_uuid": "ed587b76-5cae-4b1b-bbf9-6a19584f2101"
              }
            ]
          },
          {
            "uuid": "991d1f2c-68e2-4dd7-8d54-da2847c183d4",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "b3721bfc-52c1-497b-af99-1aec52f48f56"
              }
            ],
            "exits": [
              {
                "uuid": "02496f88-971b-4441-8fac-fda9d5a9d27d",
                "destination_uuid": "ed587b76-5cae-4b1b-bbf9-6a19584f2101"
              }
            ]
          },
          {
            "uuid": "ed587b76-5cae-4b1b-bbf9-6a19584f2101",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a5b33d45-e3bc-4e61-a10e-7a504f842bf0",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "a40359aa-7d7f-4e5a-8080-aed50a1d4a12",
                  "type": "has_only_phrase",
                  "uuid": "91f6d57f-7b3e-496c-badc-9d7d2408ee46"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3627b821-35f3-46fc-9eea-d3625aee56a3",
                  "name": "All Responses",
                  "uuid": "a5b33d45-e3bc-4e61-a10e-7a504f842bf0"
                },
                {
                  "exit_uuid": "67d7eda4-5d04-443e-a68d-07eb5105de3d",
                  "name": "Next",
                  "uuid": "a40359aa-7d7f-4e5a-8080-aed50a1d4a12"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3627b821-35f3-46fc-9eea-d3625aee56a3",
                "destination_uuid": null
              },
              {
                "uuid": "67d7eda4-5d04-443e-a68d-07eb5105de3d",
                "destination_uuid": "3f922f80-f7a7-4b6c-9154-5991726111d2"
              }
            ]
          },
          {
            "uuid": "3f922f80-f7a7-4b6c-9154-5991726111d2",
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
                "uuid": "394f89ed-ffac-4b03-960f-d70b7dcd04ae"
              }
            ],
            "exits": [
              {
                "uuid": "d790e97f-1bde-423c-8699-283acecb8c49",
                "destination_uuid": "959fc446-41a0-4e4d-9bf8-39cea6d9d954"
              }
            ]
          },
          {
            "uuid": "959fc446-41a0-4e4d-9bf8-39cea6d9d954",
            "actions": [],
            "exits": [
              {
                "uuid": "7bebd412-6b31-40de-82dd-1a4d576307d7",
                "destination_uuid": "a3a299b6-bb48-4c50-b76f-2debb3d36c87"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8b211b77-30a0-43af-a2d4-9fed00fa1275",
              "cases": [],
              "categories": [
                {
                  "uuid": "8b211b77-30a0-43af-a2d4-9fed00fa1275",
                  "name": "All Responses",
                  "exit_uuid": "7bebd412-6b31-40de-82dd-1a4d576307d7"
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
            "uuid": "a3a299b6-bb48-4c50-b76f-2debb3d36c87",
            "actions": [
              {
                "uuid": "2a065ae7-f32c-4353-a792-1221d5063b44",
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
                "uuid": "1ca3cc08-7da6-41dc-bef2-cdba7fdd692a",
                "destination_uuid": "37328e22-8221-441a-9430-4a5044f73264"
              }
            ]
          },
          {
            "uuid": "2c249785-e7e8-4e96-b0e5-0694b7706df9",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "a388db25-a404-49db-bca4-9904fcdaa6f1"
              }
            ],
            "exits": [
              {
                "uuid": "8c04ddf2-6a0e-4088-aad8-b77379adce76",
                "destination_uuid": "407271d6-d81e-429a-8d35-8c7277890b73"
              }
            ]
          },
          {
            "uuid": "37328e22-8221-441a-9430-4a5044f73264",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "860f0b4f-4f30-4366-8327-bb9bfeed7e2d",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "94a14658-d246-45d3-a936-a97a200b3370",
                  "type": "has_only_phrase",
                  "uuid": "6fe9c411-7ad0-43df-a8ed-a0888dcedd3a"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "94a14658-d246-45d3-a936-a97a200b3370",
                  "type": "has_only_phrase",
                  "uuid": "73b617ea-32e0-4800-9576-fc9f2c0ac3cf"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "94a14658-d246-45d3-a936-a97a200b3370",
                  "type": "has_only_phrase",
                  "uuid": "47f960fe-756a-44ba-b374-81fd43851f64"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "94a14658-d246-45d3-a936-a97a200b3370",
                  "type": "has_only_phrase",
                  "uuid": "e17f44a8-a29a-41bb-a16e-a790765d9379"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "94a14658-d246-45d3-a936-a97a200b3370",
                  "type": "has_only_phrase",
                  "uuid": "36016640-a09b-4aff-810d-4276a14adfc5"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "94a14658-d246-45d3-a936-a97a200b3370",
                  "type": "has_only_phrase",
                  "uuid": "32e5a550-0838-44ba-a2d0-d2e3602e6082"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "94a14658-d246-45d3-a936-a97a200b3370",
                  "type": "has_only_phrase",
                  "uuid": "e050a014-363d-49b9-9f8b-f737aaa01805"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9b6468cc-9ddf-4e01-9ff2-bc87f94c634e",
                  "name": "All Responses",
                  "uuid": "860f0b4f-4f30-4366-8327-bb9bfeed7e2d"
                },
                {
                  "exit_uuid": "989be140-bbc3-4e45-8345-76e68386f071",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "94a14658-d246-45d3-a936-a97a200b3370"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "9b6468cc-9ddf-4e01-9ff2-bc87f94c634e",
                "destination_uuid": "2c249785-e7e8-4e96-b0e5-0694b7706df9"
              },
              {
                "uuid": "989be140-bbc3-4e45-8345-76e68386f071",
                "destination_uuid": "7c5b24ca-6096-4633-8957-1d738b57428b"
              }
            ]
          },
          {
            "uuid": "7c5b24ca-6096-4633-8957-1d738b57428b",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6e8da369-7ecb-420b-9ea0-89be1abc78b5"
              }
            ],
            "exits": [
              {
                "uuid": "9fb1077e-be29-4411-acbb-2ed27e14b982",
                "destination_uuid": "407271d6-d81e-429a-8d35-8c7277890b73"
              }
            ]
          },
          {
            "uuid": "407271d6-d81e-429a-8d35-8c7277890b73",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "47d9f4d8-9a8f-4ad0-aac2-4920ca7e2b34",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b5e1bc5e-28d9-45a6-8ffb-57e4777462db",
                  "type": "has_only_phrase",
                  "uuid": "a7d832e5-83e4-4614-a988-c7c0dd4de2cc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d2fa9829-4fb8-42ea-b91e-3b73023cb4c1",
                  "name": "All Responses",
                  "uuid": "47d9f4d8-9a8f-4ad0-aac2-4920ca7e2b34"
                },
                {
                  "exit_uuid": "20072342-7183-40c0-91cc-505d99eabcd3",
                  "name": "Next",
                  "uuid": "b5e1bc5e-28d9-45a6-8ffb-57e4777462db"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d2fa9829-4fb8-42ea-b91e-3b73023cb4c1",
                "destination_uuid": null
              },
              {
                "uuid": "20072342-7183-40c0-91cc-505d99eabcd3",
                "destination_uuid": "06ddaf21-f6e1-42bd-b2d3-c7f5797ce4dd"
              }
            ]
          },
          {
            "uuid": "06ddaf21-f6e1-42bd-b2d3-c7f5797ce4dd",
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
                "uuid": "aaf81787-9bfb-45ee-a541-677710e0d2ca"
              }
            ],
            "exits": [
              {
                "uuid": "f27b4359-cf85-4457-8a89-4a6cc385d3c3",
                "destination_uuid": "7d68fa4c-c04b-4fcf-8b35-d563b7e1d910"
              }
            ]
          },
          {
            "uuid": "7d68fa4c-c04b-4fcf-8b35-d563b7e1d910",
            "actions": [],
            "exits": [
              {
                "uuid": "638839a5-0c58-4595-b483-5e3279678bf9",
                "destination_uuid": "994c5595-2451-495a-addf-53059b4b55ff"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b1703fb5-f16e-4451-bb61-e854cf3953e2",
              "cases": [],
              "categories": [
                {
                  "uuid": "b1703fb5-f16e-4451-bb61-e854cf3953e2",
                  "name": "All Responses",
                  "exit_uuid": "638839a5-0c58-4595-b483-5e3279678bf9"
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
            "uuid": "994c5595-2451-495a-addf-53059b4b55ff",
            "actions": [
              {
                "uuid": "aecbd83e-c23c-49ce-b68f-ce0bf42395dc",
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
                "uuid": "0a52a20f-69cb-49cb-a662-2d2a011362d1",
                "destination_uuid": "40c2452d-fe07-4586-9afd-40f1489bcf91"
              }
            ]
          },
          {
            "uuid": "40c2452d-fe07-4586-9afd-40f1489bcf91",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "50f116e3-f639-4ce3-a43e-9c661fcbcd92",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "534f0caf-cd16-403e-8538-61e69e23df60",
                  "type": "has_only_phrase",
                  "uuid": "d14672c6-e287-4fbc-b209-db10ee9cd51b"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "534f0caf-cd16-403e-8538-61e69e23df60",
                  "type": "has_only_phrase",
                  "uuid": "138ad3c0-c842-484a-921a-66637c9b62d2"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "534f0caf-cd16-403e-8538-61e69e23df60",
                  "type": "has_only_phrase",
                  "uuid": "3f0b4e08-03aa-4b9c-b372-12de403f4544"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "534f0caf-cd16-403e-8538-61e69e23df60",
                  "type": "has_only_phrase",
                  "uuid": "63bdc32e-bcb3-41b7-a169-a6963ffa521a"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "534f0caf-cd16-403e-8538-61e69e23df60",
                  "type": "has_only_phrase",
                  "uuid": "e83e6b6a-04ab-466e-8543-85cd32d74c55"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "f06e0e93-d60b-43ba-aa6b-3149396c2858",
                  "type": "has_only_phrase",
                  "uuid": "f0af78a2-52e7-48b7-bfeb-070ea97399cf"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "f06e0e93-d60b-43ba-aa6b-3149396c2858",
                  "type": "has_only_phrase",
                  "uuid": "8475b835-d0a7-43a0-bb02-3e6469ecb785"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "f06e0e93-d60b-43ba-aa6b-3149396c2858",
                  "type": "has_only_phrase",
                  "uuid": "c0aa2cc7-f4cf-4bad-9d67-81d1cbd44283"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "f06e0e93-d60b-43ba-aa6b-3149396c2858",
                  "type": "has_only_phrase",
                  "uuid": "c855449e-79ec-439d-b48b-dca37a765713"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "63efc1f6-73fe-4b60-b579-c9eb4a3cad0a",
                  "name": "All Responses",
                  "uuid": "50f116e3-f639-4ce3-a43e-9c661fcbcd92"
                },
                {
                  "exit_uuid": "a78cb50e-2d8a-497f-8f7f-3e201e4efb08",
                  "name": "0;1;2;3;4",
                  "uuid": "534f0caf-cd16-403e-8538-61e69e23df60"
                },
                {
                  "exit_uuid": "ba164026-bb75-450a-a8bd-ded51f0589e4",
                  "name": "5;6;7;8",
                  "uuid": "f06e0e93-d60b-43ba-aa6b-3149396c2858"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "63efc1f6-73fe-4b60-b579-c9eb4a3cad0a",
                "destination_uuid": null
              },
              {
                "uuid": "a78cb50e-2d8a-497f-8f7f-3e201e4efb08",
                "destination_uuid": "a46bd461-d0ae-4adf-bc14-9d8c50ddc7b2"
              },
              {
                "uuid": "ba164026-bb75-450a-a8bd-ded51f0589e4",
                "destination_uuid": "bae75954-e9e3-4fa9-b9a2-29a2b1b56089"
              }
            ]
          },
          {
            "uuid": "a46bd461-d0ae-4adf-bc14-9d8c50ddc7b2",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "1b303779-e44b-49f2-9a3e-ab6a9aea149c"
              }
            ],
            "exits": [
              {
                "uuid": "bff39f60-4146-4363-9319-d1dc4bb8ac86",
                "destination_uuid": "93c1a8cf-a547-4d2e-b26a-257d3cee7668"
              }
            ]
          },
          {
            "uuid": "bae75954-e9e3-4fa9-b9a2-29a2b1b56089",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "20c0df1c-5e71-41a0-beed-20a03dcfeb93"
              }
            ],
            "exits": [
              {
                "uuid": "1feaa967-46bb-41c4-9f5b-ff98401bda0b",
                "destination_uuid": "93c1a8cf-a547-4d2e-b26a-257d3cee7668"
              }
            ]
          },
          {
            "uuid": "93c1a8cf-a547-4d2e-b26a-257d3cee7668",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "89b9cd46-6c00-47b9-935f-83c4210a03cc",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "145e6230-7c89-443e-9755-b8d6dfe32320",
                  "type": "has_only_phrase",
                  "uuid": "10c063d2-b2f9-4e0a-bd03-9ceffe2657d4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3d564448-3830-4b29-8764-9d3128c5facd",
                  "name": "All Responses",
                  "uuid": "89b9cd46-6c00-47b9-935f-83c4210a03cc"
                },
                {
                  "exit_uuid": "cacd3710-e42c-4c79-b8d4-a808f80f386f",
                  "name": "Next",
                  "uuid": "145e6230-7c89-443e-9755-b8d6dfe32320"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3d564448-3830-4b29-8764-9d3128c5facd",
                "destination_uuid": null
              },
              {
                "uuid": "cacd3710-e42c-4c79-b8d4-a808f80f386f",
                "destination_uuid": "1ffa66f6-642e-4afa-b524-686367a607f3"
              }
            ]
          },
          {
            "uuid": "1ffa66f6-642e-4afa-b524-686367a607f3",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "2e4ba040-7dd3-44c9-b9b4-71abf36148cc"
              }
            ],
            "exits": [
              {
                "uuid": "623bd2e9-2460-4d55-8db6-481b5052cc44",
                "destination_uuid": "3cc3b158-2c39-4abf-8d33-71460a5d36ff"
              }
            ]
          },
          {
            "uuid": "3cc3b158-2c39-4abf-8d33-71460a5d36ff",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "caee6df4-af22-4199-a2dd-462181d39a08",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "dd1d7101-4789-4320-932c-0623fffe51e1",
                  "type": "has_only_phrase",
                  "uuid": "4b959924-f53e-423b-b17b-ae5bc23fa5ad"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "587250af-916c-412b-ad4c-d8f45f99489e",
                  "name": "All Responses",
                  "uuid": "caee6df4-af22-4199-a2dd-462181d39a08"
                },
                {
                  "exit_uuid": "412c677e-e46e-443a-b685-8850d28fdbcf",
                  "name": "Next",
                  "uuid": "dd1d7101-4789-4320-932c-0623fffe51e1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "587250af-916c-412b-ad4c-d8f45f99489e",
                "destination_uuid": null
              },
              {
                "uuid": "412c677e-e46e-443a-b685-8850d28fdbcf",
                "destination_uuid": "f82256d9-9679-4f98-b9dc-c9eb310ab032"
              }
            ]
          },
          {
            "uuid": "f82256d9-9679-4f98-b9dc-c9eb310ab032",
            "actions": [
              {
                "uuid": "c29aa45a-0734-48c6-a3d2-693f5e5f7f47",
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
                "uuid": "7592f820-9580-4a74-89c8-92d52b630084",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d36ee118-95d6-43ac-a339-672c8d1e9157",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1ebdce17-de13-4516-aea1-8cef5bbb4ce4",
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
                "uuid": "61490205-3121-4101-8b2f-46e448baab58"
              }
            ],
            "exits": [
              {
                "uuid": "6e7ba8d8-4089-49ea-aba5-b1cf784d3201",
                "destination_uuid": "d0869625-5b17-4dd4-99b3-a39f7cb333ae"
              }
            ]
          },
          {
            "uuid": "d0869625-5b17-4dd4-99b3-a39f7cb333ae",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f1e8f7d1-d022-4090-86fb-e6b768812771",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "72e6ef31-b2e8-4e80-b3b4-c41b2c3331d1",
                  "type": "has_only_phrase",
                  "uuid": "db62f4e3-6e60-444d-8513-5b7c5d441198"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "735b4d4b-8d72-418b-9ea8-1b2570918422",
                  "type": "has_only_phrase",
                  "uuid": "c9cfcc17-44f6-4afe-a463-9c973c5c33c5"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "735b4d4b-8d72-418b-9ea8-1b2570918422",
                  "type": "has_only_phrase",
                  "uuid": "e1492af9-4ac0-4eb6-8181-dafd79e5e680"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9c58c288-bcc8-4c32-9bd8-ae1428845a5d",
                  "name": "All Responses",
                  "uuid": "f1e8f7d1-d022-4090-86fb-e6b768812771"
                },
                {
                  "exit_uuid": "7da6759b-9331-4973-b52b-6f890d126dd7",
                  "name": "Happy",
                  "uuid": "72e6ef31-b2e8-4e80-b3b4-c41b2c3331d1"
                },
                {
                  "exit_uuid": "df603b70-350c-4819-a7d1-8def0e746010",
                  "name": "Neutral; Sad",
                  "uuid": "735b4d4b-8d72-418b-9ea8-1b2570918422"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9c58c288-bcc8-4c32-9bd8-ae1428845a5d",
                "destination_uuid": null
              },
              {
                "uuid": "7da6759b-9331-4973-b52b-6f890d126dd7",
                "destination_uuid": "5d98cbc5-53da-441e-9c3b-ccdd23dc6215"
              },
              {
                "uuid": "df603b70-350c-4819-a7d1-8def0e746010",
                "destination_uuid": "0ac9e343-ee10-4015-a598-427d53056b9b"
              }
            ]
          },
          {
            "uuid": "5d98cbc5-53da-441e-9c3b-ccdd23dc6215",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "6fc7635c-d694-4401-90b6-5a77132f7238"
              }
            ],
            "exits": [
              {
                "uuid": "db55cec4-4922-462f-9ae9-cb2d32f9e3da",
                "destination_uuid": "290bdf42-1c1e-4c84-ad78-6947b6ce7b50"
              }
            ]
          },
          {
            "uuid": "0ac9e343-ee10-4015-a598-427d53056b9b",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0cd5e5bb-ce8a-4a19-a904-f9668a0000c6"
              }
            ],
            "exits": [
              {
                "uuid": "829395f2-8357-4824-8204-72b4245bd1b7",
                "destination_uuid": "a113e7bf-777f-4bc1-a89e-814705143ae0"
              }
            ]
          },
          {
            "uuid": "a113e7bf-777f-4bc1-a89e-814705143ae0",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "1e1f824c-0001-4536-909a-4555fa355dff"
              }
            ],
            "exits": [
              {
                "uuid": "f8f1de06-52d8-4c8f-a972-8a7aef2557b8",
                "destination_uuid": "4db6cc26-2849-4ec0-b332-24489f60e98f"
              }
            ]
          },
          {
            "uuid": "4db6cc26-2849-4ec0-b332-24489f60e98f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3c8938ac-5d0e-4076-9310-0aaf1826c709",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "bd686b11-4305-419b-a716-65e15636b6ec",
                  "type": "has_only_phrase",
                  "uuid": "82be8e36-06c3-461a-ad3a-5760e42065fa"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "fc95de30-1169-4f6f-931e-724724efd4bc",
                  "type": "has_only_phrase",
                  "uuid": "dffb19f4-bea0-4329-a0cb-696497e6c0f1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e9d70660-9e28-4213-9c15-dcdd378b095b",
                  "name": "All Responses",
                  "uuid": "3c8938ac-5d0e-4076-9310-0aaf1826c709"
                },
                {
                  "exit_uuid": "628bf014-8374-421d-ad7d-35af60b6beb0",
                  "name": "Yes",
                  "uuid": "bd686b11-4305-419b-a716-65e15636b6ec"
                },
                {
                  "exit_uuid": "dc80d031-d136-442f-9635-ccb37840a6b2",
                  "name": "No",
                  "uuid": "fc95de30-1169-4f6f-931e-724724efd4bc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e9d70660-9e28-4213-9c15-dcdd378b095b",
                "destination_uuid": null
              },
              {
                "uuid": "628bf014-8374-421d-ad7d-35af60b6beb0",
                "destination_uuid": "e7c5a589-cd90-40ff-b822-12287f8cae92"
              },
              {
                "uuid": "dc80d031-d136-442f-9635-ccb37840a6b2",
                "destination_uuid": "dfec92fb-f4f0-480f-9b6a-9dda77e1e01f"
              }
            ]
          },
          {
            "uuid": "e7c5a589-cd90-40ff-b822-12287f8cae92",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "afe40b96-7a28-4703-a54a-390601961fdd"
                },
                "type": "enter_flow",
                "uuid": "cde8e25c-6dcd-4e83-a889-5d91ed5c3184"
              }
            ],
            "exits": [
              {
                "uuid": "ad807031-6892-40e2-9155-40be5b07da7d",
                "destination_uuid": "18ec128b-5f63-4470-a139-d54c5d347a41"
              },
              {
                "uuid": "1bd8f136-b07b-45fc-996b-76c75fba01dd",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "476a3fe6-133b-4bd7-8b3f-eed3b3d553f8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a79fbb62-63f7-4be7-8b25-5da280a154d4"
                },
                {
                  "uuid": "2b53bd0d-7815-416b-b939-7f14b1469990",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "82842e96-ae92-4be9-b94f-8c0812b31718"
                }
              ],
              "categories": [
                {
                  "uuid": "a79fbb62-63f7-4be7-8b25-5da280a154d4",
                  "name": "Complete",
                  "exit_uuid": "ad807031-6892-40e2-9155-40be5b07da7d"
                },
                {
                  "uuid": "82842e96-ae92-4be9-b94f-8c0812b31718",
                  "name": "Expired",
                  "exit_uuid": "1bd8f136-b07b-45fc-996b-76c75fba01dd"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a79fbb62-63f7-4be7-8b25-5da280a154d4"
            }
          },
          {
            "uuid": "18ec128b-5f63-4470-a139-d54c5d347a41",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "47eb8812-7dd9-481c-970f-a365696d2a68"
              }
            ],
            "exits": [
              {
                "uuid": "7c5fc587-ac37-4a94-823b-dd9491282ebd",
                "destination_uuid": "fcc805b6-9ace-4a48-999c-0ec2d8b94176"
              }
            ]
          },
          {
            "uuid": "fcc805b6-9ace-4a48-999c-0ec2d8b94176",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "66f1aa04-8cc1-42fd-bb30-b1e679155847"
              }
            ],
            "exits": [
              {
                "uuid": "eed406bb-1e95-4f37-955a-194c0e28c0d7",
                "destination_uuid": "290bdf42-1c1e-4c84-ad78-6947b6ce7b50"
              }
            ]
          },
          {
            "uuid": "dfec92fb-f4f0-480f-9b6a-9dda77e1e01f",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "0de8aaab-965c-4acb-83d2-a888fa8cc306"
              }
            ],
            "exits": [
              {
                "uuid": "58ebf6d6-3d60-4c75-a6fb-a56d13e8fbed",
                "destination_uuid": "290bdf42-1c1e-4c84-ad78-6947b6ce7b50"
              }
            ]
          },
          {
            "uuid": "290bdf42-1c1e-4c84-ad78-6947b6ce7b50",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9b592b65-13fd-4267-a9ff-0e970266e4b1",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "76f386c5-237d-468a-9d62-c5f45309bcf2",
                  "type": "has_only_phrase",
                  "uuid": "1d5271e6-a8a9-4629-84b2-3af457899b95"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c5c16b45-12c2-42fd-9476-03a675042602",
                  "name": "All Responses",
                  "uuid": "9b592b65-13fd-4267-a9ff-0e970266e4b1"
                },
                {
                  "exit_uuid": "ebe8deeb-ff33-4735-9922-158c9d0e9cb5",
                  "name": "Chat to @fields.elder",
                  "uuid": "76f386c5-237d-468a-9d62-c5f45309bcf2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c5c16b45-12c2-42fd-9476-03a675042602",
                "destination_uuid": null
              },
              {
                "uuid": "ebe8deeb-ff33-4735-9922-158c9d0e9cb5",
                "destination_uuid": "766b4d2c-f97a-41f1-8187-19062fa26f84"
              }
            ]
          },
          {
            "uuid": "766b4d2c-f97a-41f1-8187-19062fa26f84",
            "actions": [
              {
                "uuid": "0726bfb4-633f-45cd-877c-3b6536ceea2e",
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
                "uuid": "4a5e9204-9b8f-4c45-8104-0ab26aed2f8d",
                "destination_uuid": "16c2caea-7885-46da-bd67-c952c89c3d12"
              }
            ]
          },
          {
            "uuid": "16c2caea-7885-46da-bd67-c952c89c3d12",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "0ca83815-79f5-4134-a26e-cf44c565c746"
                },
                "type": "enter_flow",
                "uuid": "494b2969-7fb9-4645-a79d-4085483209a0"
              }
            ],
            "exits": [
              {
                "uuid": "beae40e1-e0ae-4cb4-b304-68ca726b8339",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8ffad6aa-3b4f-4272-b967-a68b8744a669",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "592d35f4-94b2-4700-9957-c0c9bbc87f26",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "898e84d2-feac-459c-a5ab-99b848c792ee"
              }
            ],
            "exits": [
              {
                "uuid": "823e6502-892e-4527-ae9c-ed546c3ef7cf",
                "destination_uuid": "fe96d6b5-de21-4153-92e8-8610d552c1c2"
              }
            ]
          },
          {
            "uuid": "fe96d6b5-de21-4153-92e8-8610d552c1c2",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ebf50202-3af2-49c4-9065-53b91ce60e45"
              }
            ],
            "exits": [
              {
                "uuid": "d6f5e4c7-991c-449a-8b0e-f0d5ce23f77e",
                "destination_uuid": "a7632092-8cda-4aaf-a46b-e0e17f23557b"
              }
            ]
          },
          {
            "uuid": "a7632092-8cda-4aaf-a46b-e0e17f23557b",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c47902a6-9771-4b41-b83a-31734a845179"
              }
            ],
            "exits": [
              {
                "uuid": "a85a0908-6b57-492b-88cf-42a59f0ba886",
                "destination_uuid": "95c5f5b1-8ae6-4e0e-80c4-5f0c57ed9126"
              }
            ]
          },
          {
            "uuid": "95c5f5b1-8ae6-4e0e-80c4-5f0c57ed9126",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "83580631-9834-4fc9-8c76-a01642decef0",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "01ddc7e9-34bd-4f43-80d9-73bbf034dd75",
                  "type": "has_only_phrase",
                  "uuid": "3ffd306c-f4ff-4596-bb75-c9ef8bcf8b43"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "4aeb4862-5053-4ed0-8e78-c478e53ff9c1",
                  "type": "has_only_phrase",
                  "uuid": "d2ed67ec-f879-41fa-a6b2-3860cf451bda"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c82654ed-08d1-4928-9a66-183dbc8256f6",
                  "name": "All Responses",
                  "uuid": "83580631-9834-4fc9-8c76-a01642decef0"
                },
                {
                  "exit_uuid": "41551326-7d5b-4386-bf68-b3b26d3c4abb",
                  "name": "Yes",
                  "uuid": "01ddc7e9-34bd-4f43-80d9-73bbf034dd75"
                },
                {
                  "exit_uuid": "aa8976da-db2b-4694-9030-96ca0948bfc3",
                  "name": "No",
                  "uuid": "4aeb4862-5053-4ed0-8e78-c478e53ff9c1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c82654ed-08d1-4928-9a66-183dbc8256f6",
                "destination_uuid": null
              },
              {
                "uuid": "41551326-7d5b-4386-bf68-b3b26d3c4abb",
                "destination_uuid": "153073b2-e68b-4189-9525-59f82ba7795e"
              },
              {
                "uuid": "aa8976da-db2b-4694-9030-96ca0948bfc3",
                "destination_uuid": "6d061202-6c3a-4f16-b074-d36b976f6cdc"
              }
            ]
          },
          {
            "uuid": "153073b2-e68b-4189-9525-59f82ba7795e",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6f453a9a-9c1b-429b-b88d-9d32ebe42bda"
              }
            ],
            "exits": [
              {
                "uuid": "9e212a52-1f4d-43a6-94b6-e5dc024def33",
                "destination_uuid": "7acb73d8-15c9-4e72-b357-7722a0fb2930"
              }
            ]
          },
          {
            "uuid": "6d061202-6c3a-4f16-b074-d36b976f6cdc",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ab1797c0-abcf-4097-a76c-fed78663082d"
              }
            ],
            "exits": [
              {
                "uuid": "8a4dea60-c39c-4410-976c-a9305e51897a",
                "destination_uuid": "7acb73d8-15c9-4e72-b357-7722a0fb2930"
              }
            ]
          },
          {
            "uuid": "7acb73d8-15c9-4e72-b357-7722a0fb2930",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ca441131-83b6-474d-a16a-e24e4a4372a3"
              }
            ],
            "exits": [
              {
                "uuid": "05151225-3e7d-4020-96b5-ac581fa3dcf5",
                "destination_uuid": "a908465b-4f13-44d3-b49a-33ce250f43b6"
              }
            ]
          },
          {
            "uuid": "a908465b-4f13-44d3-b49a-33ce250f43b6",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "a36e87d5-b2be-4490-9608-4df480db2374"
              }
            ],
            "exits": [
              {
                "uuid": "8905dccc-cb56-4151-b82a-d1fcccce5a71",
                "destination_uuid": "5d639e72-8e45-499b-9dba-dd8389a03386"
              }
            ]
          },
          {
            "uuid": "5d639e72-8e45-499b-9dba-dd8389a03386",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d0d24b68-9583-4eeb-83c7-e06764255267",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "8cae37a6-ac3b-4611-9ad7-c02ec6af45f2",
                  "type": "has_only_phrase",
                  "uuid": "6a1f3661-5113-4709-b2f8-63a9736fdd0e"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "da83e299-1db9-415e-8133-c5d6f395a665",
                  "type": "has_only_phrase",
                  "uuid": "7908c588-d4b8-4998-8ce6-145e7e3c635d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "258e0c19-f496-4183-a8b5-255bdce77ebe",
                  "name": "All Responses",
                  "uuid": "d0d24b68-9583-4eeb-83c7-e06764255267"
                },
                {
                  "exit_uuid": "9f852089-23b5-4954-854f-63b91489caee",
                  "name": "Yes",
                  "uuid": "8cae37a6-ac3b-4611-9ad7-c02ec6af45f2"
                },
                {
                  "exit_uuid": "cbd7e953-cd28-4b81-a14a-f621afd29484",
                  "name": "Later",
                  "uuid": "da83e299-1db9-415e-8133-c5d6f395a665"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "258e0c19-f496-4183-a8b5-255bdce77ebe",
                "destination_uuid": null
              },
              {
                "uuid": "9f852089-23b5-4954-854f-63b91489caee",
                "destination_uuid": "b3caf309-09ba-482b-ac87-bc718a121188"
              },
              {
                "uuid": "cbd7e953-cd28-4b81-a14a-f621afd29484",
                "destination_uuid": "5760a5c2-2499-4671-941e-b1e716a8a416"
              }
            ]
          },
          {
            "uuid": "b3caf309-09ba-482b-ac87-bc718a121188",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "0d58d3f0-bc2a-47fa-b073-acf6e937fca6"
              }
            ],
            "exits": [
              {
                "uuid": "88bf5cdd-f5c7-4a44-be7d-ab9a8600023e",
                "destination_uuid": "d6d5329e-37eb-4458-9d8c-0dbcb21b6f6f"
              }
            ]
          },
          {
            "uuid": "d6d5329e-37eb-4458-9d8c-0dbcb21b6f6f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "abaee386-2f2e-474a-9aba-dd73e35daaed",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "293ff2b2-9112-4eab-9055-95fd51e87c64",
                  "type": "has_only_phrase",
                  "uuid": "0cb856a7-1875-491e-95ea-c05a327f1e06"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "37cab908-dee0-4a1f-94ba-9d8c42b38389",
                  "name": "All Responses",
                  "uuid": "abaee386-2f2e-474a-9aba-dd73e35daaed"
                },
                {
                  "exit_uuid": "f9acc29d-0399-42cb-ba9a-55ad637a7b60",
                  "name": "Take me to Tips",
                  "uuid": "293ff2b2-9112-4eab-9055-95fd51e87c64"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "37cab908-dee0-4a1f-94ba-9d8c42b38389",
                "destination_uuid": null
              },
              {
                "uuid": "f9acc29d-0399-42cb-ba9a-55ad637a7b60",
                "destination_uuid": "d71f56bc-8b6f-46b7-a038-cb6f70c23237"
              }
            ]
          },
          {
            "uuid": "d71f56bc-8b6f-46b7-a038-cb6f70c23237",
            "actions": [
              {
                "uuid": "973f6b42-74bc-4931-bda6-b039f0abcd54",
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
                "uuid": "a7cb4b8f-6770-4b3c-be0c-1a3f260710aa",
                "destination_uuid": "a0a8b603-8e35-4ac8-b218-53714ae178f6"
              }
            ]
          },
          {
            "uuid": "a0a8b603-8e35-4ac8-b218-53714ae178f6",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "0f9fe486-e440-413c-8389-a4bf9d1e0630"
                },
                "type": "enter_flow",
                "uuid": "9a97a2da-e85f-4f30-988a-8dfd32da8345"
              }
            ],
            "exits": [
              {
                "uuid": "f8f00ffc-91f1-42fd-9240-e09c52337cc9",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "5760a5c2-2499-4671-941e-b1e716a8a416",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "de0b9f3b-9fcb-43e5-b911-33b7f3228d9e"
              }
            ],
            "exits": [
              {
                "uuid": "83ebffdb-18c8-43e8-93c2-b29d089303d1",
                "destination_uuid": "f322f11f-588a-42e9-8b76-5e9abeca43e6"
              }
            ]
          },
          {
            "uuid": "f322f11f-588a-42e9-8b76-5e9abeca43e6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ae9ceee2-5a5a-432e-bdb4-059548abdd49",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "9cfce04f-aac0-4b9b-8812-cb89e7fa5122",
                  "type": "has_only_phrase",
                  "uuid": "e3fcaa69-32e9-4750-8ff2-35e9ea52c843"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6deab712-c686-49c0-b461-335571bfd11a",
                  "name": "All Responses",
                  "uuid": "ae9ceee2-5a5a-432e-bdb4-059548abdd49"
                },
                {
                  "exit_uuid": "10ffb4eb-e25f-4297-a2e5-be9a80740931",
                  "name": "Take me to the home screen",
                  "uuid": "9cfce04f-aac0-4b9b-8812-cb89e7fa5122"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6deab712-c686-49c0-b461-335571bfd11a",
                "destination_uuid": null
              },
              {
                "uuid": "10ffb4eb-e25f-4297-a2e5-be9a80740931",
                "destination_uuid": "b443315b-d295-4f10-921f-9fc3d7e543d8"
              }
            ]
          },
          {
            "uuid": "b443315b-d295-4f10-921f-9fc3d7e543d8",
            "actions": [
              {
                "uuid": "f3aa593d-d0c3-4b15-9700-16851317d579",
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
                "uuid": "978c7549-4e52-46b2-927b-79ec680ce0b9",
                "destination_uuid": "58be6ef6-048b-434e-8324-5a5767751c6d"
              }
            ]
          },
          {
            "uuid": "58be6ef6-048b-434e-8324-5a5767751c6d",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "1034afb7-adbf-4054-9e31-f1def90de33c"
                },
                "type": "enter_flow",
                "uuid": "29f5b57a-325b-44bf-8151-ea1b3c2401a7"
              }
            ],
            "exits": [
              {
                "uuid": "96e91369-c279-4f97-86a7-c968554ec08f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "052c4d2e-eac0-48f0-ba1b-bb7e81eaf419",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b04ea31c-e8f4-4d4e-ae8a-5b5b156db8ff",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cf2371fa-d27f-40b4-9226-db7c0d62e1db"
              }
            ],
            "exits": [
              {
                "uuid": "3b39611d-118f-412e-95a9-1139c8c891ad",
                "destination_uuid": "27fa8fd8-d309-49db-9da5-40d6684b5c51"
              }
            ]
          },
          {
            "uuid": "27fa8fd8-d309-49db-9da5-40d6684b5c51",
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
                "uuid": "d76ae8f2-e31d-46cd-aef7-b42d74c31642"
              }
            ],
            "exits": [
              {
                "uuid": "4414ef99-a4dc-401f-85dc-444424d418b2",
                "destination_uuid": "80a3da8f-fd36-4b3a-a0ed-05b1e2a3b963"
              }
            ]
          },
          {
            "uuid": "80a3da8f-fd36-4b3a-a0ed-05b1e2a3b963",
            "actions": [],
            "exits": [
              {
                "uuid": "80fe14e4-a22d-425e-8030-7a756ca1e4ab",
                "destination_uuid": "f77ec1d6-f72e-4ef5-af24-01a3ab2ec9fa"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "5f2f2136-14a1-46c4-a802-52327596a4f6",
              "cases": [],
              "categories": [
                {
                  "uuid": "5f2f2136-14a1-46c4-a802-52327596a4f6",
                  "name": "All Responses",
                  "exit_uuid": "80fe14e4-a22d-425e-8030-7a756ca1e4ab"
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
            "uuid": "f77ec1d6-f72e-4ef5-af24-01a3ab2ec9fa",
            "actions": [
              {
                "uuid": "33ec3aec-f340-4a74-b153-0cff70d32c9b",
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
                "uuid": "ee58c2f9-de0b-4abc-9560-6c1b44cef34c",
                "destination_uuid": "4f08bc42-6184-4901-8e55-56312246bef1"
              }
            ]
          },
          {
            "uuid": "4f08bc42-6184-4901-8e55-56312246bef1",
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
                "uuid": "15f43e10-b4ae-4f38-a98e-fd94c4d2917f"
              }
            ],
            "exits": [
              {
                "uuid": "5acbf52d-13d7-4019-9f6a-22743e3ee39b",
                "destination_uuid": "35c1fd6f-0a23-44ee-b6de-45e99537a0e5"
              }
            ]
          },
          {
            "uuid": "35c1fd6f-0a23-44ee-b6de-45e99537a0e5",
            "actions": [],
            "exits": [
              {
                "uuid": "33d45d64-36ed-4079-a322-5a122c5c9d9e",
                "destination_uuid": "c2332301-f27f-4722-8de1-674c8d01f32c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "456cd7b7-f376-4e16-92d1-01f87956c352",
              "cases": [],
              "categories": [
                {
                  "uuid": "456cd7b7-f376-4e16-92d1-01f87956c352",
                  "name": "All Responses",
                  "exit_uuid": "33d45d64-36ed-4079-a322-5a122c5c9d9e"
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
            "uuid": "c2332301-f27f-4722-8de1-674c8d01f32c",
            "actions": [
              {
                "uuid": "d680468f-8b14-41b8-ba06-218e278eddc4",
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
                "uuid": "908c8ac1-1065-466d-b4b9-dd8b20cdfd34",
                "destination_uuid": "3c22d54c-746e-4260-88f4-0dc09045d4fb"
              }
            ]
          },
          {
            "uuid": "3c22d54c-746e-4260-88f4-0dc09045d4fb",
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
                "uuid": "7446e19d-87cf-4b2a-a7b1-bcb5f092f0ae"
              }
            ],
            "exits": [
              {
                "uuid": "fe0c1925-dad4-4f8d-8506-4a7868c13204",
                "destination_uuid": "4612f1f4-ca97-488e-90fb-01565598a425"
              }
            ]
          },
          {
            "uuid": "4612f1f4-ca97-488e-90fb-01565598a425",
            "actions": [],
            "exits": [
              {
                "uuid": "16f3c3fe-63ab-492f-9d69-1d8f8c90f4d4",
                "destination_uuid": "e6828cc5-4b7b-4ba3-8a38-c613b3ac3c37"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7c2adb25-707f-4558-b170-463eab58f244",
              "cases": [],
              "categories": [
                {
                  "uuid": "7c2adb25-707f-4558-b170-463eab58f244",
                  "name": "All Responses",
                  "exit_uuid": "16f3c3fe-63ab-492f-9d69-1d8f8c90f4d4"
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
            "uuid": "e6828cc5-4b7b-4ba3-8a38-c613b3ac3c37",
            "actions": [
              {
                "uuid": "4491f811-eb73-497a-a1b9-b6bfef64d6de",
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
                "uuid": "89cb0b3e-5dba-4d48-82d5-99527a46610e",
                "destination_uuid": "0f16efea-185c-4a4f-a5dc-b32e09c72170"
              }
            ]
          },
          {
            "uuid": "0f16efea-185c-4a4f-a5dc-b32e09c72170",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "02571ab7-3282-4e11-b917-e2d1bf89c58e"
              }
            ],
            "exits": [
              {
                "uuid": "f6d54c76-1d41-47f5-8bb2-2d240bb2e565",
                "destination_uuid": "5edf8da6-5008-452d-b1a5-ce603a32b952"
              }
            ]
          },
          {
            "uuid": "5edf8da6-5008-452d-b1a5-ce603a32b952",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3bb07015-be24-42a2-877d-2acd7d8b8f1f",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "7016b9a4-9fe9-41a0-b422-9575d05d6b85",
                  "type": "has_only_phrase",
                  "uuid": "c7ef963c-1c82-4fd1-99f5-223f3bd5b332"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6e555b36-ae2b-46c6-8205-ad17b236b4da",
                  "name": "All Responses",
                  "uuid": "3bb07015-be24-42a2-877d-2acd7d8b8f1f"
                },
                {
                  "exit_uuid": "0fa55847-5bcf-4eb0-886d-f206cf3753d1",
                  "name": "Take me to Homescreen",
                  "uuid": "7016b9a4-9fe9-41a0-b422-9575d05d6b85"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6e555b36-ae2b-46c6-8205-ad17b236b4da",
                "destination_uuid": null
              },
              {
                "uuid": "0fa55847-5bcf-4eb0-886d-f206cf3753d1",
                "destination_uuid": "079bf178-3113-4fa2-ad9c-6a445899ad9c"
              }
            ]
          },
          {
            "uuid": "079bf178-3113-4fa2-ad9c-6a445899ad9c",
            "actions": [
              {
                "uuid": "c638e5d6-faaa-413e-8980-e836d20a967e",
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
                "uuid": "45194253-17ff-4e02-8b58-6aebdb816998",
                "destination_uuid": "1c25043c-9a0d-4bfe-bccc-ae38918bd4ab"
              }
            ]
          },
          {
            "uuid": "1c25043c-9a0d-4bfe-bccc-ae38918bd4ab",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "e39052fb-fe3f-4761-a985-5ddb6e88ba1f"
                },
                "type": "enter_flow",
                "uuid": "3bcecc93-9031-44d1-986f-b86d187f8b0c"
              }
            ],
            "exits": [
              {
                "uuid": "255c0b41-33c6-4de3-9f84-75fea9c847d4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "68742f9f-744a-4bf5-a799-37867b45afc6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9c3cc1fd-f3a9-4213-a919-8a0dfb342295",
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
                "uuid": "71def0d1-3c4c-4e01-8878-b19630d084ad"
              }
            ],
            "exits": [
              {
                "uuid": "bec66263-dab2-464d-aab9-8a9cee3f54b9",
                "destination_uuid": "cdf92cf3-e552-4f0b-a4c7-79fd008fb0f4"
              }
            ]
          },
          {
            "uuid": "cdf92cf3-e552-4f0b-a4c7-79fd008fb0f4",
            "actions": [],
            "exits": [
              {
                "uuid": "ba1a1b3e-5dc9-49a2-9b44-752b72a56146",
                "destination_uuid": "405444e8-6b9c-4216-b69f-09a31b422fcb"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "605e1e94-97c5-48a8-8f2c-e4db69f10dcb",
              "cases": [],
              "categories": [
                {
                  "uuid": "605e1e94-97c5-48a8-8f2c-e4db69f10dcb",
                  "name": "All Responses",
                  "exit_uuid": "ba1a1b3e-5dc9-49a2-9b44-752b72a56146"
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
            "uuid": "405444e8-6b9c-4216-b69f-09a31b422fcb",
            "actions": [
              {
                "uuid": "85c19d9b-4e5a-4cbc-9168-4228964af3ba",
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
                "uuid": "2db0a0ac-e8bf-46fd-8072-3f8db0dc5a50",
                "destination_uuid": "6267e3d2-ee25-46b5-acd6-de4a5db9b9c4"
              }
            ]
          },
          {
            "uuid": "6267e3d2-ee25-46b5-acd6-de4a5db9b9c4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "38ad05cc-2eed-4508-b6ff-9a79eb4e7d1a",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "7280dc67-5c7a-4acc-9fb3-dfce6fd9e2b1",
                  "type": "has_only_phrase",
                  "uuid": "79e30e42-4209-4ec3-8944-cd2ffd7f15d1"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "8e99ed22-dcd2-4bda-a1e5-3151dc6e3098",
                  "type": "has_only_phrase",
                  "uuid": "73897998-ce04-4176-9d36-b4b3762f75ec"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "17abd2cd-ef46-428c-bb05-1b85f1a90b2f",
                  "type": "has_only_phrase",
                  "uuid": "199703a1-26cb-4cef-8afb-b4ca8261b0ad"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7472672e-bd4a-4867-b83b-cb7c9ed8ed8e",
                  "name": "All Responses",
                  "uuid": "38ad05cc-2eed-4508-b6ff-9a79eb4e7d1a"
                },
                {
                  "exit_uuid": "d2c4563f-74cd-4adf-a58b-77dd8eec4d6d",
                  "name": "Great",
                  "uuid": "7280dc67-5c7a-4acc-9fb3-dfce6fd9e2b1"
                },
                {
                  "exit_uuid": "b6876e4d-0e21-43c8-bc42-7157a4d810ed",
                  "name": "Neutral",
                  "uuid": "8e99ed22-dcd2-4bda-a1e5-3151dc6e3098"
                },
                {
                  "exit_uuid": "876d23c7-bf3c-4ff4-be0e-ea17a648071c",
                  "name": "Bad",
                  "uuid": "17abd2cd-ef46-428c-bb05-1b85f1a90b2f"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "7472672e-bd4a-4867-b83b-cb7c9ed8ed8e",
                "destination_uuid": null
              },
              {
                "uuid": "d2c4563f-74cd-4adf-a58b-77dd8eec4d6d",
                "destination_uuid": "41fc5bf9-d1ab-4c8d-a50e-5957f252315c"
              },
              {
                "uuid": "b6876e4d-0e21-43c8-bc42-7157a4d810ed",
                "destination_uuid": "7d7d57c0-dbe3-4950-bcc1-867a0fff7e14"
              },
              {
                "uuid": "876d23c7-bf3c-4ff4-be0e-ea17a648071c",
                "destination_uuid": "c26b0328-f2eb-43e1-a6c7-5eb51aca12a9"
              }
            ]
          },
          {
            "uuid": "41fc5bf9-d1ab-4c8d-a50e-5957f252315c",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bae47bfa-d3b9-4d66-9502-a5002267aabf"
              }
            ],
            "exits": [
              {
                "uuid": "04f191db-89ce-4346-8aea-3a2fff55aa9e",
                "destination_uuid": "8e11b3d4-fec0-4ecc-b2bc-f81d0d378bf1"
              }
            ]
          },
          {
            "uuid": "7d7d57c0-dbe3-4950-bcc1-867a0fff7e14",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "44489633-00a8-412b-9c13-b1fb056fef30"
              }
            ],
            "exits": [
              {
                "uuid": "bb4ef534-42de-4ed7-b58f-2a6d34341e3a",
                "destination_uuid": "8e11b3d4-fec0-4ecc-b2bc-f81d0d378bf1"
              }
            ]
          },
          {
            "uuid": "8e11b3d4-fec0-4ecc-b2bc-f81d0d378bf1",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "76775140-0737-4ff0-9f02-0bc02a07a339"
                },
                "type": "enter_flow",
                "uuid": "72bd198a-80e6-4690-a5d0-44caae4bfdae"
              }
            ],
            "exits": [
              {
                "uuid": "f01f87fc-80a6-40f6-b664-ee323995bc6a",
                "destination_uuid": "28978d94-a257-4d2c-8d90-9837c6b50835"
              },
              {
                "uuid": "bf5012ff-efa9-40aa-9e88-1fdb21011ea3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "0815ada8-66b5-4aa7-b162-434849f7d601",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "9d458eb4-4832-4aa9-af5c-268167284349"
                },
                {
                  "uuid": "6a2a2e02-45d2-42f9-b578-612745204616",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "411d6e7d-1231-4c89-ba0a-2b2337e6a5fc"
                }
              ],
              "categories": [
                {
                  "uuid": "9d458eb4-4832-4aa9-af5c-268167284349",
                  "name": "Complete",
                  "exit_uuid": "f01f87fc-80a6-40f6-b664-ee323995bc6a"
                },
                {
                  "uuid": "411d6e7d-1231-4c89-ba0a-2b2337e6a5fc",
                  "name": "Expired",
                  "exit_uuid": "bf5012ff-efa9-40aa-9e88-1fdb21011ea3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "9d458eb4-4832-4aa9-af5c-268167284349"
            }
          },
          {
            "uuid": "28978d94-a257-4d2c-8d90-9837c6b50835",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "e6e909af-ee54-4b20-bf22-b4c0045cb4a7"
                },
                "type": "enter_flow",
                "uuid": "1ead806c-8db2-4513-aea4-cbdcff87442b"
              }
            ],
            "exits": [
              {
                "uuid": "cfbf0d4d-d285-439c-bbc8-64a2162f6121",
                "destination_uuid": "b4a5cc72-2b2d-47d2-a9d2-c8e83167f03a"
              },
              {
                "uuid": "bed1fa02-3072-4d9b-9c81-6d657267d156",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "24acb55f-a605-4513-a75c-530bf517f170",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b156257f-841d-492f-a9a9-03aea61da6e7"
                },
                {
                  "uuid": "05cd9117-a84c-4107-b824-04533b26aab9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "60edade3-6938-46bb-87b6-f482b02ec447"
                }
              ],
              "categories": [
                {
                  "uuid": "b156257f-841d-492f-a9a9-03aea61da6e7",
                  "name": "Complete",
                  "exit_uuid": "cfbf0d4d-d285-439c-bbc8-64a2162f6121"
                },
                {
                  "uuid": "60edade3-6938-46bb-87b6-f482b02ec447",
                  "name": "Expired",
                  "exit_uuid": "bed1fa02-3072-4d9b-9c81-6d657267d156"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b156257f-841d-492f-a9a9-03aea61da6e7"
            }
          },
          {
            "uuid": "c26b0328-f2eb-43e1-a6c7-5eb51aca12a9",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "26f4ae4e-ca74-459e-bc86-4f9ea5a63185"
              }
            ],
            "exits": [
              {
                "uuid": "b042510f-fbca-4c66-9984-db0bc178179b",
                "destination_uuid": "5aeced48-00d6-4f24-85a3-24d8c00d3b95"
              }
            ]
          },
          {
            "uuid": "5aeced48-00d6-4f24-85a3-24d8c00d3b95",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "3dedf64d-c0fa-4285-bd68-261c92ed37cb"
                },
                "type": "enter_flow",
                "uuid": "4283b860-47c2-42b3-8b0c-3ec3c094f841"
              }
            ],
            "exits": [
              {
                "uuid": "555a5e98-4ace-4788-8e70-3d7135c253de",
                "destination_uuid": "f11168db-0d69-4c32-b0a0-6647e5bbb395"
              },
              {
                "uuid": "f1d22d48-764f-4b18-9981-cd10da2c5e6a",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8adf8e5b-5124-46a5-98de-d0484959a91a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "94ef8b41-4d8f-44cb-9a9c-1d38e419d4af"
                },
                {
                  "uuid": "e582a50c-9590-43c0-a205-e11a76005d2c",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "9a668497-ed3d-424c-ad36-f7ecf92a945f"
                }
              ],
              "categories": [
                {
                  "uuid": "94ef8b41-4d8f-44cb-9a9c-1d38e419d4af",
                  "name": "Complete",
                  "exit_uuid": "555a5e98-4ace-4788-8e70-3d7135c253de"
                },
                {
                  "uuid": "9a668497-ed3d-424c-ad36-f7ecf92a945f",
                  "name": "Expired",
                  "exit_uuid": "f1d22d48-764f-4b18-9981-cd10da2c5e6a"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "94ef8b41-4d8f-44cb-9a9c-1d38e419d4af"
            }
          },
          {
            "uuid": "f11168db-0d69-4c32-b0a0-6647e5bbb395",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "56bfd89d-67cc-4884-b913-3f6a9b828a84"
                },
                "type": "enter_flow",
                "uuid": "33bd5ea6-7bcb-4636-a631-fea32625b6ff"
              }
            ],
            "exits": [
              {
                "uuid": "6c6e2c17-1419-44fd-9fa1-db37fdc1c921",
                "destination_uuid": "b4a5cc72-2b2d-47d2-a9d2-c8e83167f03a"
              },
              {
                "uuid": "8ae3e472-0885-4b39-afd5-c7253f1df0d5",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "bd5d22fb-6c02-4cb2-a0b1-75ed1b712d43",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "981fecbd-8e44-4fbd-a12e-dde012d20f81"
                },
                {
                  "uuid": "72a1f8ef-4f9f-47d8-8f91-bcc353cb140d",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "749b55f2-3631-4525-8af5-303969fd9e6d"
                }
              ],
              "categories": [
                {
                  "uuid": "981fecbd-8e44-4fbd-a12e-dde012d20f81",
                  "name": "Complete",
                  "exit_uuid": "6c6e2c17-1419-44fd-9fa1-db37fdc1c921"
                },
                {
                  "uuid": "749b55f2-3631-4525-8af5-303969fd9e6d",
                  "name": "Expired",
                  "exit_uuid": "8ae3e472-0885-4b39-afd5-c7253f1df0d5"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "981fecbd-8e44-4fbd-a12e-dde012d20f81"
            }
          },
          {
            "uuid": "b4a5cc72-2b2d-47d2-a9d2-c8e83167f03a",
            "actions": [
              {
                "uuid": "de293806-e790-4c7c-9aa1-a5eaefebffbd",
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
                "uuid": "85a8f626-5104-4c87-9e7f-f5b2adcaa630",
                "destination_uuid": "c53891d7-fef0-4f73-a9e1-615f466952a6"
              }
            ]
          },
          {
            "uuid": "c53891d7-fef0-4f73-a9e1-615f466952a6",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "6a01184e-fe6d-48fe-bf1c-e9c2747f0a8e"
                },
                "type": "enter_flow",
                "uuid": "f8bfffb5-8f8a-44e8-9111-c2d8f5d59c72"
              }
            ],
            "exits": [
              {
                "uuid": "4db6992b-e963-4e8f-a1c7-eb660cb28246",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "121afe84-48b7-4e78-bf12-f3dc9b745eb8",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d92485a8-125d-4d87-9c3d-1fd72978df16",
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
                "uuid": "9bb26823-a078-490b-92a2-9959380af05d"
              }
            ],
            "exits": [
              {
                "uuid": "17b033d3-4014-4085-8739-8242746187ea",
                "destination_uuid": "75d0c350-6786-405b-ac15-c13956904a50"
              }
            ]
          },
          {
            "uuid": "75d0c350-6786-405b-ac15-c13956904a50",
            "actions": [],
            "exits": [
              {
                "uuid": "a452094b-ea7d-426d-b31a-06a380097866",
                "destination_uuid": "453836b8-b648-4c9b-9329-6927f70022b5"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ad42faf4-051a-4a2f-95cf-5f4809551f0c",
              "cases": [],
              "categories": [
                {
                  "uuid": "ad42faf4-051a-4a2f-95cf-5f4809551f0c",
                  "name": "All Responses",
                  "exit_uuid": "a452094b-ea7d-426d-b31a-06a380097866"
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
            "uuid": "453836b8-b648-4c9b-9329-6927f70022b5",
            "actions": [
              {
                "uuid": "164c8e6c-c14e-423d-96ab-080e52b9b43b",
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
                "uuid": "afd505a9-de17-4436-93b7-12c7e2a29899",
                "destination_uuid": "ac8fd6e1-51fc-49bb-8147-c46cf026f19c"
              }
            ]
          },
          {
            "uuid": "ac8fd6e1-51fc-49bb-8147-c46cf026f19c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ff98205b-49df-4fb1-b137-d243561b4059",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "6f39352d-1d55-4b35-b54d-f58555bf1cb2",
                  "type": "has_only_phrase",
                  "uuid": "62d333b0-e682-4911-956e-7edf1f195f71"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "375bc908-187e-471f-8afe-a6b2b2cdedc3",
                  "type": "has_only_phrase",
                  "uuid": "38ba27c3-6f00-4a61-8044-5fc14fff829b"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "323528e5-d5fb-4315-8c1a-ff5c9e800d2e",
                  "type": "has_only_phrase",
                  "uuid": "7d3b36be-afef-464e-a4c5-fac7ade1a997"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "cd058734-ea42-4456-a419-ffc82a2ebaa5",
                  "type": "has_only_phrase",
                  "uuid": "279d0f29-5dbb-4d36-acfd-428d7da65ce9"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "f8c9284b-f69b-45be-9c82-7d1b829cf7f2",
                  "type": "has_only_phrase",
                  "uuid": "e2594b3b-21ab-48fe-805d-1121de241034"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "b8ab13c1-71db-4ea0-85b5-b66cd25ad26a",
                  "type": "has_only_phrase",
                  "uuid": "79fdad43-a3fc-4b4a-bd31-e32bbe9d542e"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "6c5970c0-2cbb-41a9-80ef-af02b8d09fd9",
                  "type": "has_only_phrase",
                  "uuid": "bf1c4a66-c74b-4bb7-aa12-173a4f16417b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f3039aa1-679e-4120-a262-613d27ab5e3b",
                  "name": "All Responses",
                  "uuid": "ff98205b-49df-4fb1-b137-d243561b4059"
                },
                {
                  "exit_uuid": "0c4eb18e-72fa-4fec-9fb2-fe9e1e598aa3",
                  "name": "Do it every day",
                  "uuid": "6f39352d-1d55-4b35-b54d-f58555bf1cb2"
                },
                {
                  "exit_uuid": "6f5ccbdd-2481-49b7-a3e8-32175a1c60b6",
                  "name": "Let your teen choose the activity",
                  "uuid": "375bc908-187e-471f-8afe-a6b2b2cdedc3"
                },
                {
                  "exit_uuid": "40497e73-a99b-4312-a962-51af12c867a5",
                  "name": "Follow your teen’s lead",
                  "uuid": "323528e5-d5fb-4315-8c1a-ff5c9e800d2e"
                },
                {
                  "exit_uuid": "ad38ebf0-73a1-40ef-9aee-13507713a112",
                  "name": "Give your teen all of your attention",
                  "uuid": "cd058734-ea42-4456-a419-ffc82a2ebaa5"
                },
                {
                  "exit_uuid": "6b208191-ad5b-4896-acb6-bb8c36918341",
                  "name": "Show your teen you are really listening",
                  "uuid": "f8c9284b-f69b-45be-9c82-7d1b829cf7f2"
                },
                {
                  "exit_uuid": "ade499a7-5aa5-4dd2-baf8-24c9268d1dfb",
                  "name": "Have fun!",
                  "uuid": "b8ab13c1-71db-4ea0-85b5-b66cd25ad26a"
                },
                {
                  "exit_uuid": "2a7798a1-54a7-44e8-9789-576cbc4875bd",
                  "name": "None ",
                  "uuid": "6c5970c0-2cbb-41a9-80ef-af02b8d09fd9"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "f3039aa1-679e-4120-a262-613d27ab5e3b",
                "destination_uuid": null
              },
              {
                "uuid": "0c4eb18e-72fa-4fec-9fb2-fe9e1e598aa3",
                "destination_uuid": "73330e33-72d0-4154-b55c-c161ded5a311"
              },
              {
                "uuid": "6f5ccbdd-2481-49b7-a3e8-32175a1c60b6",
                "destination_uuid": "03db4d8c-bf8d-4fed-8d39-e7c40f3f8324"
              },
              {
                "uuid": "40497e73-a99b-4312-a962-51af12c867a5",
                "destination_uuid": "ea16925d-4e79-4e6a-82e3-4f2b32bf75dc"
              },
              {
                "uuid": "ad38ebf0-73a1-40ef-9aee-13507713a112",
                "destination_uuid": "ab483c23-1e24-464f-99d0-a655a7e5e3db"
              },
              {
                "uuid": "6b208191-ad5b-4896-acb6-bb8c36918341",
                "destination_uuid": "98ddd4e5-3888-4a02-b649-200abc570b3f"
              },
              {
                "uuid": "ade499a7-5aa5-4dd2-baf8-24c9268d1dfb",
                "destination_uuid": "bafe88b8-1862-4465-a89d-0514a734540f"
              },
              {
                "uuid": "2a7798a1-54a7-44e8-9789-576cbc4875bd",
                "destination_uuid": "b630f29e-7354-4852-b639-edf772f225e3"
              }
            ]
          },
          {
            "uuid": "73330e33-72d0-4154-b55c-c161ded5a311",
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
                "uuid": "bf305970-3b34-400c-99db-efd59d11d93e"
              }
            ],
            "exits": [
              {
                "uuid": "4832c8fc-95fa-4578-ad3e-476b85d66576",
                "destination_uuid": "a477ce8a-0947-4427-99e6-f88380baf829"
              }
            ]
          },
          {
            "uuid": "a477ce8a-0947-4427-99e6-f88380baf829",
            "actions": [],
            "exits": [
              {
                "uuid": "c1adb0b8-d44a-4dfc-9254-6222e7057148",
                "destination_uuid": "be1f793b-045d-4333-bf80-e89c01fa660d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "67f18aa7-a50e-4028-988a-8d1867eed10e",
              "cases": [],
              "categories": [
                {
                  "uuid": "67f18aa7-a50e-4028-988a-8d1867eed10e",
                  "name": "All Responses",
                  "exit_uuid": "c1adb0b8-d44a-4dfc-9254-6222e7057148"
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
            "uuid": "be1f793b-045d-4333-bf80-e89c01fa660d",
            "actions": [
              {
                "uuid": "4d61fb7d-f864-451b-a4db-c390e7ac50e3",
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
                "uuid": "40e0030a-85ce-4eff-8dd0-21d96aede5f5",
                "destination_uuid": "cc03bfe8-58e9-474e-8a76-312c6fdb1ad9"
              }
            ]
          },
          {
            "uuid": "cc03bfe8-58e9-474e-8a76-312c6fdb1ad9",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5b0b222e-e832-4288-acae-49006d23f64d"
              }
            ],
            "exits": [
              {
                "uuid": "e7a31aef-8b49-4e5c-a6a3-0a98129bf5e1",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "03db4d8c-bf8d-4fed-8d39-e7c40f3f8324",
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
                "uuid": "ffa29cd2-3d50-46e6-a01d-398f4a20ac3f"
              }
            ],
            "exits": [
              {
                "uuid": "6618542c-8481-49a9-8884-e748d08fb3f8",
                "destination_uuid": "56b5b4f9-5371-4ef5-92ed-bf6219716735"
              }
            ]
          },
          {
            "uuid": "56b5b4f9-5371-4ef5-92ed-bf6219716735",
            "actions": [],
            "exits": [
              {
                "uuid": "c41dd192-7734-4254-b817-2d630880b52b",
                "destination_uuid": "5eed2a7e-f31d-4840-849b-443190b83caf"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "378072d8-7c6f-4cce-aef7-40435a718b73",
              "cases": [],
              "categories": [
                {
                  "uuid": "378072d8-7c6f-4cce-aef7-40435a718b73",
                  "name": "All Responses",
                  "exit_uuid": "c41dd192-7734-4254-b817-2d630880b52b"
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
            "uuid": "5eed2a7e-f31d-4840-849b-443190b83caf",
            "actions": [
              {
                "uuid": "db50d8bc-0167-46c1-b0e2-9b313ce15d9e",
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
                "uuid": "7e3accdf-ebdb-49d5-bbc0-bd4f7218362d",
                "destination_uuid": "35e77b0f-83dc-4827-a8bd-91fc840073db"
              }
            ]
          },
          {
            "uuid": "35e77b0f-83dc-4827-a8bd-91fc840073db",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fef980bc-4a68-4d51-94c1-49f21248a779"
              }
            ],
            "exits": [
              {
                "uuid": "eddc5493-acc4-4601-92e3-dafb2a2401af",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ea16925d-4e79-4e6a-82e3-4f2b32bf75dc",
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
                "uuid": "a79b72bc-ce07-403a-87d4-8963a2ba5cad"
              }
            ],
            "exits": [
              {
                "uuid": "94ee4980-7f36-4653-8911-75f5024f3904",
                "destination_uuid": "972b805e-1833-4ac5-bd2a-c22de41542ef"
              }
            ]
          },
          {
            "uuid": "972b805e-1833-4ac5-bd2a-c22de41542ef",
            "actions": [],
            "exits": [
              {
                "uuid": "9a0035b0-f286-4f72-af9a-c5fd4e03604d",
                "destination_uuid": "2798a3d2-290e-40e0-8d69-0f8c5851d074"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "dcada93e-34de-4f09-9832-cb1e0401c958",
              "cases": [],
              "categories": [
                {
                  "uuid": "dcada93e-34de-4f09-9832-cb1e0401c958",
                  "name": "All Responses",
                  "exit_uuid": "9a0035b0-f286-4f72-af9a-c5fd4e03604d"
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
            "uuid": "2798a3d2-290e-40e0-8d69-0f8c5851d074",
            "actions": [
              {
                "uuid": "f574bcac-d775-4531-98ee-d74a272a92ce",
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
                "uuid": "d56c835f-514f-446d-ae71-fec75b102f9e",
                "destination_uuid": "9fbe6d84-d223-4e7f-bd1f-4e0798603525"
              }
            ]
          },
          {
            "uuid": "9fbe6d84-d223-4e7f-bd1f-4e0798603525",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f6e0ca04-3a12-42f5-8e8d-a2208fdbbea1"
              }
            ],
            "exits": [
              {
                "uuid": "54c8ff99-3c91-41a7-ad88-555a832849f3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ab483c23-1e24-464f-99d0-a655a7e5e3db",
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
                "uuid": "c2561278-43a2-4571-9469-804ac997127b"
              }
            ],
            "exits": [
              {
                "uuid": "76188aca-fbbc-4c58-87d3-d65e01065b1d",
                "destination_uuid": "c33fa0b0-eb37-48cd-8572-f691f09ce010"
              }
            ]
          },
          {
            "uuid": "c33fa0b0-eb37-48cd-8572-f691f09ce010",
            "actions": [],
            "exits": [
              {
                "uuid": "44f49d3b-7f5b-45bb-a07d-54353a9dfd90",
                "destination_uuid": "79ec1e16-24bf-4453-9cd1-a1dceee41883"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fc03cfe4-786c-4955-9b5c-4524fdd7508b",
              "cases": [],
              "categories": [
                {
                  "uuid": "fc03cfe4-786c-4955-9b5c-4524fdd7508b",
                  "name": "All Responses",
                  "exit_uuid": "44f49d3b-7f5b-45bb-a07d-54353a9dfd90"
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
            "uuid": "79ec1e16-24bf-4453-9cd1-a1dceee41883",
            "actions": [
              {
                "uuid": "409b24ee-352c-4f8d-ae0e-7610c4c13c9b",
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
                "uuid": "c3f6cb35-23e2-4d7b-b986-bd6e920dc5c2",
                "destination_uuid": "9ffccb80-737b-4085-9f87-9965151bc4ee"
              }
            ]
          },
          {
            "uuid": "9ffccb80-737b-4085-9f87-9965151bc4ee",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "02fda551-ca7f-491a-85e7-e8a8c44aa900"
              }
            ],
            "exits": [
              {
                "uuid": "e20b6581-4cf5-49be-943d-091024c522c1",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "98ddd4e5-3888-4a02-b649-200abc570b3f",
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
                "uuid": "2e7e15a6-5158-4619-8aea-03cfe98bf628"
              }
            ],
            "exits": [
              {
                "uuid": "b6ea0ae6-3401-4548-95fc-d75a708247a6",
                "destination_uuid": "1b7bd796-5bd3-4237-8f5a-35b2e6557c91"
              }
            ]
          },
          {
            "uuid": "1b7bd796-5bd3-4237-8f5a-35b2e6557c91",
            "actions": [],
            "exits": [
              {
                "uuid": "90318c13-90bd-4847-a190-157ed88e1be2",
                "destination_uuid": "790890bf-e3b3-470e-b003-74a08d1f4bba"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a30b7a35-9d0a-4ae2-80dd-b0f12d39ebc9",
              "cases": [],
              "categories": [
                {
                  "uuid": "a30b7a35-9d0a-4ae2-80dd-b0f12d39ebc9",
                  "name": "All Responses",
                  "exit_uuid": "90318c13-90bd-4847-a190-157ed88e1be2"
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
            "uuid": "790890bf-e3b3-470e-b003-74a08d1f4bba",
            "actions": [
              {
                "uuid": "5b6c6bfe-fa6a-49cf-aa84-60ba34325a88",
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
                "uuid": "06f5aad0-c1d0-4aaa-af35-c60a770c6692",
                "destination_uuid": "4bf4b99c-704e-427d-98e8-f9f27e45d9c5"
              }
            ]
          },
          {
            "uuid": "4bf4b99c-704e-427d-98e8-f9f27e45d9c5",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "da8c83ac-7a8e-472c-b9f1-6fd550393243"
              }
            ],
            "exits": [
              {
                "uuid": "281e09bb-f842-4869-9803-c4a79849688d",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "bafe88b8-1862-4465-a89d-0514a734540f",
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
                "uuid": "955a7464-8543-4b9f-b1fd-b85886590f38"
              }
            ],
            "exits": [
              {
                "uuid": "f2c833ac-f8b6-4b42-b151-59ac147c0ecd",
                "destination_uuid": "49aec657-66f2-44d1-b083-35106bf91448"
              }
            ]
          },
          {
            "uuid": "49aec657-66f2-44d1-b083-35106bf91448",
            "actions": [],
            "exits": [
              {
                "uuid": "e2ae954a-a562-44a2-8121-929496c45192",
                "destination_uuid": "ecbaf80b-cabe-43d0-ba48-df749d995395"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "bbff923a-1b9f-4ce9-ab29-6feca3b5bd63",
              "cases": [],
              "categories": [
                {
                  "uuid": "bbff923a-1b9f-4ce9-ab29-6feca3b5bd63",
                  "name": "All Responses",
                  "exit_uuid": "e2ae954a-a562-44a2-8121-929496c45192"
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
            "uuid": "ecbaf80b-cabe-43d0-ba48-df749d995395",
            "actions": [
              {
                "uuid": "e8703b44-6cfd-490e-a75c-3da676de5e10",
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
                "uuid": "22e732b8-9219-4bab-84b9-a25171ed1603",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "d2e4012c-2a29-41f5-a320-4f6ab3db89f2",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8c7ca5c5-9215-479e-a47e-e4f34866b0e5"
              }
            ],
            "exits": [
              {
                "uuid": "2049247a-2db3-4d54-9669-689743ccb703",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b630f29e-7354-4852-b639-edf772f225e3",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "29ba85a1-fe42-4c05-9a3c-bc84b8ffd7d7"
              }
            ],
            "exits": [
              {
                "uuid": "bfe1f9e7-b648-481e-a304-43d8df6ebcd5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3415810b-e2b8-4e75-90c9-260b4a5152f0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "af75f97e-1f2b-4c6a-8ffa-054ef3ca6136",
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
                "uuid": "fde646b6-fe5c-42c1-a143-badbc8e2c0f5"
              }
            ],
            "exits": [
              {
                "uuid": "d95f123d-5413-4673-8f7e-4a12154aad68",
                "destination_uuid": "0584f777-20e8-4775-9004-7006806a868e"
              }
            ]
          },
          {
            "uuid": "7841aace-bab0-483d-964e-f9368795621f",
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
                "uuid": "f904f1c6-91c5-41fe-a5d7-92d25f6ce722"
              }
            ],
            "exits": [
              {
                "uuid": "6a3dadc0-a32f-4d80-8c6e-da8e5db5ba7b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7214ead0-b5ef-4d99-a68e-3c576b79c707",
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
                "uuid": "67e09677-2551-45cc-8a54-d7fc984e84b9"
              }
            ],
            "exits": [
              {
                "uuid": "e236db9c-07b0-4986-88d7-428ea6c48eb8",
                "destination_uuid": "0584f777-20e8-4775-9004-7006806a868e"
              }
            ]
          },
          {
            "uuid": "0584f777-20e8-4775-9004-7006806a868e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fec47c41-4df0-493f-bc5f-5ad470d76fd7",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "d331da8e-74b3-4b25-b7ac-bc00b8f003f7",
                  "type": "has_only_phrase",
                  "uuid": "60f43673-978c-4118-8b9d-3578e960ed75"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "eadf228e-4134-401f-b3ca-62a44b2ad821",
                  "type": "has_only_phrase",
                  "uuid": "a133a163-c75b-486a-b9f7-cc81110aecfd"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "baa2c36c-416d-4c84-ae22-c5c77e6eb082",
                  "type": "has_only_phrase",
                  "uuid": "fdffdca4-a8d6-4646-8541-279c71036a16"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "4a490c31-d0eb-4c24-8905-31c0a634f79e",
                  "type": "has_only_phrase",
                  "uuid": "f6acdfff-8aae-4973-b905-051a41e0b2ff"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "c0504c98-5129-4cb3-a4d4-d191cf6a9c46",
                  "type": "has_only_phrase",
                  "uuid": "88235b9c-6e12-4f06-ba87-76ab747cb113"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "6555a4ca-7257-430b-b4ed-3a85e91adaa4",
                  "type": "has_only_phrase",
                  "uuid": "261fef35-c872-421a-8d5f-15cf439cf037"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "621eb383-5469-4ca4-a886-50b34e4d265a",
                  "type": "has_only_phrase",
                  "uuid": "891234da-4272-4eb0-ade5-eae5f6b7dfbb"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "c0dc42a7-bc6f-46fc-8d7a-5dbed0b61756",
                  "type": "has_only_phrase",
                  "uuid": "78e48dce-3736-4637-ac8e-40c9121c4572"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "47264613-cb95-4814-b132-ab684045e89d",
                  "type": "has_only_phrase",
                  "uuid": "8f73af1c-2504-495b-945f-d3b8079a3f30"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "73d78695-34a1-4089-bc3e-4d11935f0875",
                  "type": "has_only_phrase",
                  "uuid": "bd81e5f9-861b-4ac1-aeaf-3cb2130603d9"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "c7220e81-a522-4b48-8bdb-4fb75f37b358",
                  "type": "has_only_phrase",
                  "uuid": "29fff563-ff33-4b34-8775-e8423c36bbf1"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "1d6f3e96-3afa-4296-bb47-0e3c6c2cf335",
                  "type": "has_only_phrase",
                  "uuid": "6bf511c0-3d39-4b22-83af-b2e6df85d28b"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "759852c6-8606-4ea3-9f11-fc3f3c531aad",
                  "type": "has_only_phrase",
                  "uuid": "83a5918e-6af4-49f5-b2c6-b719c9d3f867"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "22fec7d5-855a-4f21-987e-74d07ca5a04b",
                  "type": "has_only_phrase",
                  "uuid": "f8c13887-316d-493c-bb59-7bd8a4ecbff1"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "b2334b02-7ffe-4733-81c3-9c1ba18f87a4",
                  "type": "has_only_phrase",
                  "uuid": "a5ed79c8-b98e-4d24-bfd6-145a2ee911df"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f72ba4d0-e190-431e-80a3-434fdb3ca401",
                  "name": "All Responses",
                  "uuid": "fec47c41-4df0-493f-bc5f-5ad470d76fd7"
                },
                {
                  "exit_uuid": "cfb62f01-ec30-472f-b060-bc87f9e7b732",
                  "name": "I don’t have enough time",
                  "uuid": "d331da8e-74b3-4b25-b7ac-bc00b8f003f7"
                },
                {
                  "exit_uuid": "a23c925f-90cb-4852-ada7-3ba32f591208",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "eadf228e-4134-401f-b3ca-62a44b2ad821"
                },
                {
                  "exit_uuid": "309e1ea8-332c-49e8-9c55-9e1a668e30f1",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "baa2c36c-416d-4c84-ae22-c5c77e6eb082"
                },
                {
                  "exit_uuid": "06d36d4f-bec7-4b71-9a3e-23b4744130a6",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "4a490c31-d0eb-4c24-8905-31c0a634f79e"
                },
                {
                  "exit_uuid": "3755e1e8-a2c5-495e-884d-c57a35691a14",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "c0504c98-5129-4cb3-a4d4-d191cf6a9c46"
                },
                {
                  "exit_uuid": "ea025165-1031-4ab7-bbc3-615af504b3c2",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "6555a4ca-7257-430b-b4ed-3a85e91adaa4"
                },
                {
                  "exit_uuid": "8bcc052d-0ba2-495d-ab74-90c56c4a8bb4",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "621eb383-5469-4ca4-a886-50b34e4d265a"
                },
                {
                  "exit_uuid": "ef057660-99b9-4d78-9506-82db732e0856",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "c0dc42a7-bc6f-46fc-8d7a-5dbed0b61756"
                },
                {
                  "exit_uuid": "8a3fc55b-3892-4b75-8f97-f4589b5c3963",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "47264613-cb95-4814-b132-ab684045e89d"
                },
                {
                  "exit_uuid": "7221b2a1-29db-40f0-8656-c02345b88ea5",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "73d78695-34a1-4089-bc3e-4d11935f0875"
                },
                {
                  "exit_uuid": "7bd50388-7f3b-4c66-98f9-27a40b3986ee",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "c7220e81-a522-4b48-8bdb-4fb75f37b358"
                },
                {
                  "exit_uuid": "5f34b0ed-6b95-4b05-9aa3-8fd0216e9bd6",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "1d6f3e96-3afa-4296-bb47-0e3c6c2cf335"
                },
                {
                  "exit_uuid": "8d9288f8-9ee1-4582-aeb0-ac1b18d45a90",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "759852c6-8606-4ea3-9f11-fc3f3c531aad"
                },
                {
                  "exit_uuid": "27d99002-3f9b-449a-b86a-937418140305",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "22fec7d5-855a-4f21-987e-74d07ca5a04b"
                },
                {
                  "exit_uuid": "3e076966-d35b-4333-b433-e4375560bfd0",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "b2334b02-7ffe-4733-81c3-9c1ba18f87a4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f72ba4d0-e190-431e-80a3-434fdb3ca401",
                "destination_uuid": null
              },
              {
                "uuid": "cfb62f01-ec30-472f-b060-bc87f9e7b732",
                "destination_uuid": "9c347c81-4786-4bd3-a716-45d0ed334913"
              },
              {
                "uuid": "a23c925f-90cb-4852-ada7-3ba32f591208",
                "destination_uuid": "3add9444-18a3-4f8d-b1d4-35fa1df4423b"
              },
              {
                "uuid": "309e1ea8-332c-49e8-9c55-9e1a668e30f1",
                "destination_uuid": "3add9444-18a3-4f8d-b1d4-35fa1df4423b"
              },
              {
                "uuid": "06d36d4f-bec7-4b71-9a3e-23b4744130a6",
                "destination_uuid": "eecc898c-ae90-4997-8977-ca8cac325902"
              },
              {
                "uuid": "3755e1e8-a2c5-495e-884d-c57a35691a14",
                "destination_uuid": "eecc898c-ae90-4997-8977-ca8cac325902"
              },
              {
                "uuid": "ea025165-1031-4ab7-bbc3-615af504b3c2",
                "destination_uuid": "34e2d98f-98cb-40e1-b0aa-8fedb1ce6c87"
              },
              {
                "uuid": "8bcc052d-0ba2-495d-ab74-90c56c4a8bb4",
                "destination_uuid": "34e2d98f-98cb-40e1-b0aa-8fedb1ce6c87"
              },
              {
                "uuid": "ef057660-99b9-4d78-9506-82db732e0856",
                "destination_uuid": "d9a890c9-279c-4c79-b2e3-8bf5f6c51ba5"
              },
              {
                "uuid": "8a3fc55b-3892-4b75-8f97-f4589b5c3963",
                "destination_uuid": "d9a890c9-279c-4c79-b2e3-8bf5f6c51ba5"
              },
              {
                "uuid": "7221b2a1-29db-40f0-8656-c02345b88ea5",
                "destination_uuid": "ba645da2-1f0a-4409-a6f1-299cd6ebde6a"
              },
              {
                "uuid": "7bd50388-7f3b-4c66-98f9-27a40b3986ee",
                "destination_uuid": "ba645da2-1f0a-4409-a6f1-299cd6ebde6a"
              },
              {
                "uuid": "5f34b0ed-6b95-4b05-9aa3-8fd0216e9bd6",
                "destination_uuid": "8e8ebb9b-a7b3-4ac4-aa03-e3ee87052a0b"
              },
              {
                "uuid": "8d9288f8-9ee1-4582-aeb0-ac1b18d45a90",
                "destination_uuid": "8e8ebb9b-a7b3-4ac4-aa03-e3ee87052a0b"
              },
              {
                "uuid": "27d99002-3f9b-449a-b86a-937418140305",
                "destination_uuid": "ac61dd12-54e4-4efc-bee0-9a90bbdaeb15"
              },
              {
                "uuid": "3e076966-d35b-4333-b433-e4375560bfd0",
                "destination_uuid": "ac61dd12-54e4-4efc-bee0-9a90bbdaeb15"
              }
            ]
          },
          {
            "uuid": "9c347c81-4786-4bd3-a716-45d0ed334913",
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
                "uuid": "d7411d8f-5878-476f-b894-02a6d604cedb"
              }
            ],
            "exits": [
              {
                "uuid": "4c7cc746-03e9-46e0-8885-b4e0a1ea2958",
                "destination_uuid": "e02678db-5568-4c36-9840-9450cf8fd4c4"
              }
            ]
          },
          {
            "uuid": "e02678db-5568-4c36-9840-9450cf8fd4c4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f60ea5df-94fb-42fa-a3a6-16522360aeea",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "2417ca79-e49f-4129-85e1-fa85e74f990b",
                  "type": "has_only_phrase",
                  "uuid": "902a2382-e670-4a07-9583-c4d382c80e5b"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "5e8ff6f7-c634-4ff6-9292-b06f3f561693",
                  "type": "has_only_phrase",
                  "uuid": "b2d99025-5a53-4e73-b7b0-8e814b5d12a2"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "ebb0dce3-b72f-494e-9892-4a49f554fd68",
                  "type": "has_only_phrase",
                  "uuid": "388cd638-330e-4624-a285-7154b0b42759"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5c143757-bacc-418a-a292-ef20c6af7be6",
                  "name": "All Responses",
                  "uuid": "f60ea5df-94fb-42fa-a3a6-16522360aeea"
                },
                {
                  "exit_uuid": "c8bb8e13-4f4b-4b7a-aa15-a3ea873f7683",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "2417ca79-e49f-4129-85e1-fa85e74f990b"
                },
                {
                  "exit_uuid": "b1988a06-1882-48b3-abea-e938a1897727",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "5e8ff6f7-c634-4ff6-9292-b06f3f561693"
                },
                {
                  "exit_uuid": "102af2ba-afbb-4915-b933-6b6189de08e4",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "ebb0dce3-b72f-494e-9892-4a49f554fd68"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5c143757-bacc-418a-a292-ef20c6af7be6",
                "destination_uuid": null
              },
              {
                "uuid": "c8bb8e13-4f4b-4b7a-aa15-a3ea873f7683",
                "destination_uuid": "00dc7ad3-fb29-4124-bd9c-a722b34aaa1e"
              },
              {
                "uuid": "b1988a06-1882-48b3-abea-e938a1897727",
                "destination_uuid": "df8a6432-7761-47af-84b0-167118b27cda"
              },
              {
                "uuid": "102af2ba-afbb-4915-b933-6b6189de08e4",
                "destination_uuid": "75d05f4f-1569-41bc-98be-c478e0752891"
              }
            ]
          },
          {
            "uuid": "00dc7ad3-fb29-4124-bd9c-a722b34aaa1e",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c99d5cbe-3967-4eca-bde4-3cad42746989"
              }
            ],
            "exits": [
              {
                "uuid": "fbe77411-ee08-4f3e-9099-66ecb05ee156",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "df8a6432-7761-47af-84b0-167118b27cda",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ef18de1e-afe5-4bdd-936c-541e7b4c0470"
              }
            ],
            "exits": [
              {
                "uuid": "356d3b84-c8c2-4208-ad70-21533e17d656",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "75d05f4f-1569-41bc-98be-c478e0752891",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3b63702d-2e67-4d70-9ee1-e08183e54fc2"
              }
            ],
            "exits": [
              {
                "uuid": "21d48d4a-7e30-427a-9aab-27816a62fd0a",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "3add9444-18a3-4f8d-b1d4-35fa1df4423b",
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
                "uuid": "67c3543b-b1dc-47d1-b481-578820377c79"
              }
            ],
            "exits": [
              {
                "uuid": "32d45f9a-ef8a-4a91-8976-1bbba0ceee04",
                "destination_uuid": "f57405fd-923e-4171-8b14-112d81ec71dc"
              }
            ]
          },
          {
            "uuid": "f57405fd-923e-4171-8b14-112d81ec71dc",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4c9855e8-61e7-482d-b425-6569010b1f8f",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "639a4be0-a557-4d92-b1ad-6bc114f4755d",
                  "type": "has_only_phrase",
                  "uuid": "a431a091-861b-460a-8634-b0ab702a3bac"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "b4eb7998-002c-4cd9-8692-39b815d6464c",
                  "type": "has_only_phrase",
                  "uuid": "cb2e6b39-0cd6-4ed6-b15c-63dd80c641ae"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "1294ab17-d32a-4e9b-9e98-789bd6e48d1b",
                  "type": "has_only_phrase",
                  "uuid": "e9566ace-f103-431f-9c14-08b93055f9f2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "36ae94df-2911-492e-935c-c24c31de678a",
                  "name": "All Responses",
                  "uuid": "4c9855e8-61e7-482d-b425-6569010b1f8f"
                },
                {
                  "exit_uuid": "454bf21c-b417-4987-a9e8-1136225353a9",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "639a4be0-a557-4d92-b1ad-6bc114f4755d"
                },
                {
                  "exit_uuid": "cba71ff5-d018-4676-89da-d2d6cf2091ab",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "b4eb7998-002c-4cd9-8692-39b815d6464c"
                },
                {
                  "exit_uuid": "a8ccf624-0411-4239-8c3e-9ea0b1c62157",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "1294ab17-d32a-4e9b-9e98-789bd6e48d1b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "36ae94df-2911-492e-935c-c24c31de678a",
                "destination_uuid": null
              },
              {
                "uuid": "454bf21c-b417-4987-a9e8-1136225353a9",
                "destination_uuid": "5161247f-d5c0-4196-a272-a47f41f31faf"
              },
              {
                "uuid": "cba71ff5-d018-4676-89da-d2d6cf2091ab",
                "destination_uuid": "d73b2105-73e2-4d40-89ce-827aa1db4d34"
              },
              {
                "uuid": "a8ccf624-0411-4239-8c3e-9ea0b1c62157",
                "destination_uuid": "9714afaa-a6e0-4e1c-bc60-f6ff5841ed0a"
              }
            ]
          },
          {
            "uuid": "5161247f-d5c0-4196-a272-a47f41f31faf",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ffb84f17-cdb1-4499-b99e-83a2a49b2896"
              }
            ],
            "exits": [
              {
                "uuid": "58f4c845-f22d-4e9a-af34-808aee20189d",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "d73b2105-73e2-4d40-89ce-827aa1db4d34",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f4917ad2-8743-48a3-af88-239267d07ecd"
              }
            ],
            "exits": [
              {
                "uuid": "bd784765-108b-47c7-87e7-83c84329f8cd",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "9714afaa-a6e0-4e1c-bc60-f6ff5841ed0a",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fbe1943d-2c2e-4be7-91e5-8bfd4fd919d2"
              }
            ],
            "exits": [
              {
                "uuid": "4023cb6d-e5c3-4bfc-8a5a-f820050b7027",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "eecc898c-ae90-4997-8977-ca8cac325902",
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
                "uuid": "64b0c934-54b8-4522-b20d-b147b8eef347"
              }
            ],
            "exits": [
              {
                "uuid": "ac0c8741-69a4-4868-8d1e-6c6e0bca3856",
                "destination_uuid": "67d336fb-b02b-44a8-8e66-3c0c3c11b853"
              }
            ]
          },
          {
            "uuid": "67d336fb-b02b-44a8-8e66-3c0c3c11b853",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5177ebb4-5dd4-4486-9447-a215fdb94493",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "846489af-c86d-4dfb-be24-d53d333cdeb1",
                  "type": "has_only_phrase",
                  "uuid": "b9d29dc2-9815-4404-879d-f757c0a3933d"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "a8a8ae60-8e29-4b2a-8d99-828614ffbe88",
                  "type": "has_only_phrase",
                  "uuid": "1722ad23-a204-4aeb-8b69-bd718937a4e9"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "f3ba8410-9a9c-49d0-9a09-5737583ace3e",
                  "type": "has_only_phrase",
                  "uuid": "2aae182d-add2-405f-b95c-0250ee95a4c9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f725a996-6e94-475b-b24f-4a2398ca6ce0",
                  "name": "All Responses",
                  "uuid": "5177ebb4-5dd4-4486-9447-a215fdb94493"
                },
                {
                  "exit_uuid": "062dee49-bed5-41ad-8698-3f8142b2bafd",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "846489af-c86d-4dfb-be24-d53d333cdeb1"
                },
                {
                  "exit_uuid": "4541b835-2ec0-4dc0-a3a1-90189b78a85b",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "a8a8ae60-8e29-4b2a-8d99-828614ffbe88"
                },
                {
                  "exit_uuid": "e26bc3b4-e64d-4e00-8f89-1f7d0ee37da9",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "f3ba8410-9a9c-49d0-9a09-5737583ace3e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f725a996-6e94-475b-b24f-4a2398ca6ce0",
                "destination_uuid": null
              },
              {
                "uuid": "062dee49-bed5-41ad-8698-3f8142b2bafd",
                "destination_uuid": "b7cb5ee4-4e08-4bbd-940e-5e8a3e96f474"
              },
              {
                "uuid": "4541b835-2ec0-4dc0-a3a1-90189b78a85b",
                "destination_uuid": "87c11b75-f970-4eab-aa1c-072c82731385"
              },
              {
                "uuid": "e26bc3b4-e64d-4e00-8f89-1f7d0ee37da9",
                "destination_uuid": "491d8d95-8a10-44c7-af6a-cda8b21145bf"
              }
            ]
          },
          {
            "uuid": "b7cb5ee4-4e08-4bbd-940e-5e8a3e96f474",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "31a55aca-6e5a-416f-9ed2-d760c60c30a8"
              }
            ],
            "exits": [
              {
                "uuid": "4fabce39-62cb-4062-8f20-27f598ccacfb",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "87c11b75-f970-4eab-aa1c-072c82731385",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6da2e90e-c772-4d0a-be28-3c386b01e15f"
              }
            ],
            "exits": [
              {
                "uuid": "f6dce378-c101-4c97-af09-adaac5e8956c",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "491d8d95-8a10-44c7-af6a-cda8b21145bf",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "58ae1112-5925-46ad-b3fc-f4a287e1bf4f"
              }
            ],
            "exits": [
              {
                "uuid": "158eb152-2885-4f89-96a4-f36e3137a6b9",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "34e2d98f-98cb-40e1-b0aa-8fedb1ce6c87",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "fb16c3bd-9474-429e-a529-e22661acef66"
              }
            ],
            "exits": [
              {
                "uuid": "03294f93-c690-4c07-ba1c-b78e1f2425bf",
                "destination_uuid": "bd9f4365-44c4-447e-9039-8c5351c12205"
              }
            ]
          },
          {
            "uuid": "bd9f4365-44c4-447e-9039-8c5351c12205",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9af326d5-8de1-4c51-9f44-ab0ead6c06fe",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "077b597b-c8a3-49ee-8d03-aa594f7fc52a",
                  "type": "has_only_phrase",
                  "uuid": "b4732b6b-0045-478a-bccc-dbe9910ee318"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "2b92cdb4-1f8f-4100-a1d1-fc7049951976",
                  "type": "has_only_phrase",
                  "uuid": "41753e66-a463-465e-b6c4-e782e3bdb965"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "34c54219-aa70-4d25-8e79-60bc4d3e55a6",
                  "name": "All Responses",
                  "uuid": "9af326d5-8de1-4c51-9f44-ab0ead6c06fe"
                },
                {
                  "exit_uuid": "eb37ef09-5ba6-4f6f-a1bf-d86b5b6e2c29",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "077b597b-c8a3-49ee-8d03-aa594f7fc52a"
                },
                {
                  "exit_uuid": "009bcc68-0013-4989-99df-2a391c38532b",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "2b92cdb4-1f8f-4100-a1d1-fc7049951976"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "34c54219-aa70-4d25-8e79-60bc4d3e55a6",
                "destination_uuid": null
              },
              {
                "uuid": "eb37ef09-5ba6-4f6f-a1bf-d86b5b6e2c29",
                "destination_uuid": "5755ac08-ab7e-42d5-8ef8-31e79f28a1f3"
              },
              {
                "uuid": "009bcc68-0013-4989-99df-2a391c38532b",
                "destination_uuid": "06140d2a-060f-4399-a201-2b1a1baa1868"
              }
            ]
          },
          {
            "uuid": "5755ac08-ab7e-42d5-8ef8-31e79f28a1f3",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9831fc01-a711-4108-ac4c-b9770e4e2f17"
              }
            ],
            "exits": [
              {
                "uuid": "80bd12aa-30db-4034-bfdd-422bbb8ed313",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "06140d2a-060f-4399-a201-2b1a1baa1868",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6bd4f7b5-16ad-4097-8176-c988e052e255"
              }
            ],
            "exits": [
              {
                "uuid": "2f4e6e6f-39e5-45eb-9972-b07ca00f9933",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "d9a890c9-279c-4c79-b2e3-8bf5f6c51ba5",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "30d81cb4-a761-41bd-91ec-a0aa2355d998"
              }
            ],
            "exits": [
              {
                "uuid": "2b828c00-2365-498a-bd37-cd3d5b6a03f6",
                "destination_uuid": "4920cbc0-8c7c-4da5-bb39-2e55f234220e"
              }
            ]
          },
          {
            "uuid": "4920cbc0-8c7c-4da5-bb39-2e55f234220e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "50a5823a-6f48-4105-b221-e7193ea64065",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "056f924e-130d-4aa2-a435-8eb50438383a",
                  "type": "has_only_phrase",
                  "uuid": "c7bfac5d-2e4a-4058-9165-f71759b1d37b"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "9b9e7c10-3e22-4e24-9a84-17266f0e6734",
                  "type": "has_only_phrase",
                  "uuid": "7dd52780-cc48-4ca3-b3dd-bf57b0c99ff8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2154feb1-b9d0-44ce-9e85-9bdb2b7d3e75",
                  "name": "All Responses",
                  "uuid": "50a5823a-6f48-4105-b221-e7193ea64065"
                },
                {
                  "exit_uuid": "bb26a4a7-379a-4167-9e1f-3f7813a255a6",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "056f924e-130d-4aa2-a435-8eb50438383a"
                },
                {
                  "exit_uuid": "f807bf15-39bf-4b46-abf1-e40f1b89d9f4",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "9b9e7c10-3e22-4e24-9a84-17266f0e6734"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2154feb1-b9d0-44ce-9e85-9bdb2b7d3e75",
                "destination_uuid": null
              },
              {
                "uuid": "bb26a4a7-379a-4167-9e1f-3f7813a255a6",
                "destination_uuid": "09167f27-cd87-4cf2-b95f-5c941c8e85f0"
              },
              {
                "uuid": "f807bf15-39bf-4b46-abf1-e40f1b89d9f4",
                "destination_uuid": "b80e1658-e049-46d1-8683-2436a3734d05"
              }
            ]
          },
          {
            "uuid": "09167f27-cd87-4cf2-b95f-5c941c8e85f0",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "754d46b1-5098-4238-8232-7bb35117a949"
              }
            ],
            "exits": [
              {
                "uuid": "41efef6b-1ddc-4b63-9551-dd57adf79903",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "b80e1658-e049-46d1-8683-2436a3734d05",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7130b9dc-2e78-4c3f-964c-ebdda2466033"
              }
            ],
            "exits": [
              {
                "uuid": "82968fae-7847-47e7-a397-500ee949d9f7",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "ba645da2-1f0a-4409-a6f1-299cd6ebde6a",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "4a0c7d75-bb19-47ef-859a-d24bd081ca7c"
              }
            ],
            "exits": [
              {
                "uuid": "f457e532-2e27-4c2b-a64a-3871d022e9c2",
                "destination_uuid": "6d4f8973-0276-407d-be4f-21e2408ce8a6"
              }
            ]
          },
          {
            "uuid": "6d4f8973-0276-407d-be4f-21e2408ce8a6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4af6fbc3-d280-4c1e-9aac-69f1923dc749",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "620adab2-5a40-4e26-aec9-77c8344aa8b2",
                  "type": "has_only_phrase",
                  "uuid": "5dc722a0-662e-44e6-8567-dcc8bf0ab10f"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "e0983be1-27a0-45bf-9a6e-607f73a28d17",
                  "type": "has_only_phrase",
                  "uuid": "70a37870-ecca-483a-8d58-dfede4e6d246"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a2ca0362-4734-444d-9c70-ba9c498a80c8",
                  "name": "All Responses",
                  "uuid": "4af6fbc3-d280-4c1e-9aac-69f1923dc749"
                },
                {
                  "exit_uuid": "beec4542-4019-4071-ba9f-22ac167e8b59",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "620adab2-5a40-4e26-aec9-77c8344aa8b2"
                },
                {
                  "exit_uuid": "232dfbdc-0c99-4e19-8923-34c0dc31b9f7",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "e0983be1-27a0-45bf-9a6e-607f73a28d17"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a2ca0362-4734-444d-9c70-ba9c498a80c8",
                "destination_uuid": null
              },
              {
                "uuid": "beec4542-4019-4071-ba9f-22ac167e8b59",
                "destination_uuid": "df89f498-531c-44a3-b80d-11476180570f"
              },
              {
                "uuid": "232dfbdc-0c99-4e19-8923-34c0dc31b9f7",
                "destination_uuid": "027328bc-d35e-422c-a95e-9d08fc7081e0"
              }
            ]
          },
          {
            "uuid": "df89f498-531c-44a3-b80d-11476180570f",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "e00b93be-cf3d-4c19-810c-9f6daaea4369"
              }
            ],
            "exits": [
              {
                "uuid": "575483f9-3ad8-4124-9507-07c982cae07b",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "027328bc-d35e-422c-a95e-9d08fc7081e0",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "74200fb5-3ed3-48c3-9663-e5cdd629266b"
              }
            ],
            "exits": [
              {
                "uuid": "f653360b-ddc3-4aa7-95ff-22c09abf02de",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "8e8ebb9b-a7b3-4ac4-aa03-e3ee87052a0b",
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
                "uuid": "7516b391-8cf6-4a63-8a93-788764d42bc1"
              }
            ],
            "exits": [
              {
                "uuid": "a41da791-315a-4f47-865e-089e7e15241f",
                "destination_uuid": "4636cbad-6780-428f-8adb-41c93acc715f"
              }
            ]
          },
          {
            "uuid": "4636cbad-6780-428f-8adb-41c93acc715f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7698ddaa-0e94-4c87-9021-05ac0fa9f932",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "eb670e50-b145-4cf5-b903-18eaea58d1d4",
                  "type": "has_only_phrase",
                  "uuid": "6adbcd7d-4d87-404c-b672-3a1954bfc13a"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "5c19c4cb-31e5-44c2-a66e-6c2aaf674b01",
                  "type": "has_only_phrase",
                  "uuid": "0800da8d-856d-4aaf-93a3-13c66394e595"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "816f2513-6cd3-486d-b00e-45ecafdd2aa6",
                  "type": "has_only_phrase",
                  "uuid": "5ac19b10-fcaa-418a-a086-ecac73768ca8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "75e22d21-bec9-4e99-ba8c-a60db514e99d",
                  "name": "All Responses",
                  "uuid": "7698ddaa-0e94-4c87-9021-05ac0fa9f932"
                },
                {
                  "exit_uuid": "dd2ea95f-4924-48e0-b8a7-38083bbff9d1",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "eb670e50-b145-4cf5-b903-18eaea58d1d4"
                },
                {
                  "exit_uuid": "d709a229-05cf-40a0-b511-949a5c32c45e",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "5c19c4cb-31e5-44c2-a66e-6c2aaf674b01"
                },
                {
                  "exit_uuid": "8d6ef944-a00b-460a-8a13-fa9329d74f53",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "816f2513-6cd3-486d-b00e-45ecafdd2aa6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "75e22d21-bec9-4e99-ba8c-a60db514e99d",
                "destination_uuid": null
              },
              {
                "uuid": "dd2ea95f-4924-48e0-b8a7-38083bbff9d1",
                "destination_uuid": "540ffe45-d322-4e1a-ab4f-13708a91fd60"
              },
              {
                "uuid": "d709a229-05cf-40a0-b511-949a5c32c45e",
                "destination_uuid": "3d91f99b-f6c8-44ce-85b9-c539389d7b5e"
              },
              {
                "uuid": "8d6ef944-a00b-460a-8a13-fa9329d74f53",
                "destination_uuid": "e32e7f07-41dd-406f-b756-7eec7462be2d"
              }
            ]
          },
          {
            "uuid": "540ffe45-d322-4e1a-ab4f-13708a91fd60",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "635ae455-63fc-408a-b37e-4f82ae84016f"
              }
            ],
            "exits": [
              {
                "uuid": "9947fe20-f386-4db9-ac7c-00d37b24432e",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "3d91f99b-f6c8-44ce-85b9-c539389d7b5e",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "27fb166e-6a1f-4952-946f-96c5c0d60f98"
              }
            ],
            "exits": [
              {
                "uuid": "b86a89ff-3118-41c6-b2f6-0305529f046c",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "e32e7f07-41dd-406f-b756-7eec7462be2d",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "70b97b52-d28c-49c9-915e-65a4f7f2c6a2"
              }
            ],
            "exits": [
              {
                "uuid": "098db5fa-b581-4827-9fbe-0d09ab99a51b",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "ac61dd12-54e4-4efc-bee0-9a90bbdaeb15",
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
                "uuid": "117d9857-700b-4c72-864b-cb712817d546"
              }
            ],
            "exits": [
              {
                "uuid": "611336fe-8ee5-4d41-91c5-c0172ad89687",
                "destination_uuid": "5a899672-4670-4d20-9e8b-94d34bb207c3"
              }
            ]
          },
          {
            "uuid": "5a899672-4670-4d20-9e8b-94d34bb207c3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "39a8a843-dbc2-42b7-babc-d1589b1833f7",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "9dc06f82-5162-4056-a15f-1d74da115657",
                  "type": "has_only_phrase",
                  "uuid": "1f039242-36dc-403c-9b8c-ac075201984e"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "fd82aed1-ec36-4edc-8c19-e91b76c748a6",
                  "type": "has_only_phrase",
                  "uuid": "dd9274f7-c1be-42e9-8081-8c91ecaf42d5"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "1204f8dd-238f-4d68-b975-2a8118b385c5",
                  "type": "has_only_phrase",
                  "uuid": "148d31cc-9380-4b1d-8d25-e94300c93e72"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a612f792-bb37-4f2b-adb2-513f46f35c1c",
                  "name": "All Responses",
                  "uuid": "39a8a843-dbc2-42b7-babc-d1589b1833f7"
                },
                {
                  "exit_uuid": "888814cd-fe57-49d5-93a8-93351acd7dbf",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "9dc06f82-5162-4056-a15f-1d74da115657"
                },
                {
                  "exit_uuid": "7f741074-7d0c-418f-b6c6-66681b60107f",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "fd82aed1-ec36-4edc-8c19-e91b76c748a6"
                },
                {
                  "exit_uuid": "35310b0e-2e37-4d6a-960b-0370e8d638b0",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "1204f8dd-238f-4d68-b975-2a8118b385c5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a612f792-bb37-4f2b-adb2-513f46f35c1c",
                "destination_uuid": null
              },
              {
                "uuid": "888814cd-fe57-49d5-93a8-93351acd7dbf",
                "destination_uuid": "3e5bdc1a-f2df-4d32-a442-dfecff9f3738"
              },
              {
                "uuid": "7f741074-7d0c-418f-b6c6-66681b60107f",
                "destination_uuid": "e093c556-8fdb-47e1-a91d-bca6d45cee71"
              },
              {
                "uuid": "35310b0e-2e37-4d6a-960b-0370e8d638b0",
                "destination_uuid": "c1d673cf-dc17-4792-a8df-6169230e71c3"
              }
            ]
          },
          {
            "uuid": "3e5bdc1a-f2df-4d32-a442-dfecff9f3738",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "993b663a-956d-4782-b440-ada02f7f09cb"
              }
            ],
            "exits": [
              {
                "uuid": "5e27e147-8c21-46c3-8201-25050733ed53",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "e093c556-8fdb-47e1-a91d-bca6d45cee71",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cab972d5-033e-4312-a7a1-dd13e0664af6"
              }
            ],
            "exits": [
              {
                "uuid": "f54ded90-4cd8-45d6-adb5-929e53d2ad36",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "c1d673cf-dc17-4792-a8df-6169230e71c3",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ed110dbf-274f-461e-aeb6-ae37b4408436"
              }
            ],
            "exits": [
              {
                "uuid": "1116804e-f363-4d64-b8f8-88ce5ddf79e6",
                "destination_uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382"
              }
            ]
          },
          {
            "uuid": "ef14baf1-85d4-4dc1-9d07-9d16a11bd382",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f15c3fbc-f6d0-47a5-bd17-720431464938",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "2af8e44d-f2f3-4146-81bc-bfabad6b9da0",
                  "type": "has_only_phrase",
                  "uuid": "6e146d37-fcfb-4ff9-ac5c-0c837dc65e4e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "aadb3bf8-7ca6-4e92-b0c2-207f5e8975c3",
                  "name": "All Responses",
                  "uuid": "f15c3fbc-f6d0-47a5-bd17-720431464938"
                },
                {
                  "exit_uuid": "d6c3cf7f-5733-4b31-9562-8d65dd1ed67d",
                  "name": "Next",
                  "uuid": "2af8e44d-f2f3-4146-81bc-bfabad6b9da0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "aadb3bf8-7ca6-4e92-b0c2-207f5e8975c3",
                "destination_uuid": null
              },
              {
                "uuid": "d6c3cf7f-5733-4b31-9562-8d65dd1ed67d",
                "destination_uuid": "2d4e131b-6bd6-46b9-95ec-31ac304650b6"
              }
            ]
          },
          {
            "uuid": "2d4e131b-6bd6-46b9-95ec-31ac304650b6",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "3ae05dda-d786-4cab-b4be-42929a02ba36"
              }
            ],
            "exits": [
              {
                "uuid": "2620cb4f-e7cd-4c5f-84b0-691a69abfbdb",
                "destination_uuid": "6fd0599c-3603-48e2-ac0c-f28c983343cc"
              }
            ]
          },
          {
            "uuid": "6fd0599c-3603-48e2-ac0c-f28c983343cc",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "78e65c83-0506-4b7b-be60-1a585a44a10e",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "6de6e3cb-e858-4d0c-9cfd-11a526217e15",
                  "type": "has_only_phrase",
                  "uuid": "0c20e572-d282-4041-8dfa-e9c78116e2ad"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "a61dd85f-6d10-420b-aa43-abe38a558476",
                  "type": "has_only_phrase",
                  "uuid": "20a40cc7-8bbb-4734-a220-58064d789dd1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ffb334ec-ef36-4484-bdc5-95d03e877f34",
                  "name": "All Responses",
                  "uuid": "78e65c83-0506-4b7b-be60-1a585a44a10e"
                },
                {
                  "exit_uuid": "402b5a53-74c3-42df-9922-985581d0d38e",
                  "name": "No",
                  "uuid": "6de6e3cb-e858-4d0c-9cfd-11a526217e15"
                },
                {
                  "exit_uuid": "a37ab159-ce32-4312-b910-eab5bb5b2f29",
                  "name": "Yes",
                  "uuid": "a61dd85f-6d10-420b-aa43-abe38a558476"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ffb334ec-ef36-4484-bdc5-95d03e877f34",
                "destination_uuid": null
              },
              {
                "uuid": "402b5a53-74c3-42df-9922-985581d0d38e",
                "destination_uuid": "db3a412e-27bb-47b2-a264-9c9bf587adab"
              },
              {
                "uuid": "a37ab159-ce32-4312-b910-eab5bb5b2f29",
                "destination_uuid": "97ed3629-0a99-4eb0-bd17-3855e33e9d53"
              }
            ]
          },
          {
            "uuid": "db3a412e-27bb-47b2-a264-9c9bf587adab",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b33d89d8-0372-4125-94d4-3abe562b29ac"
              }
            ],
            "exits": [
              {
                "uuid": "9e18b190-fad4-401f-98c6-676f581e2911",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "97ed3629-0a99-4eb0-bd17-3855e33e9d53",
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
                "uuid": "488155b2-b226-4512-af58-ae49f673ee5d"
              }
            ],
            "exits": [
              {
                "uuid": "4e3f1c2a-8cd6-490e-a06c-e138d2b9109d",
                "destination_uuid": "1f554a9f-ce42-439b-bb05-69dc297f155a"
              }
            ]
          },
          {
            "uuid": "1f554a9f-ce42-439b-bb05-69dc297f155a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "eba9abb5-d21e-44f8-9fa9-e881822d56ff",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "31ee8beb-92b0-470e-852a-8b1928e15e12",
                  "type": "has_only_phrase",
                  "uuid": "eba77a25-b9b7-4182-bb84-b9424766a2e7"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "196eb153-742c-45a5-afa1-f875afdb83ac",
                  "type": "has_only_phrase",
                  "uuid": "8e6046cb-f653-43ae-894f-94b9570f8f1e"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "d849868c-6497-4f2a-b622-ba8b43446364",
                  "type": "has_only_phrase",
                  "uuid": "29e59c40-fda0-4271-9364-7d0d485f0585"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "8f0116ad-1783-4133-9401-4369249c1545",
                  "type": "has_only_phrase",
                  "uuid": "17a79640-708b-4d73-b4a9-4b9964c31b5c"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "d9c42f1f-6c25-4322-bb57-98f883067a76",
                  "type": "has_only_phrase",
                  "uuid": "a559b21d-3039-418d-804f-063a3d87b467"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "0db015f2-dbe9-4ad6-ba49-053e5ad35390",
                  "type": "has_only_phrase",
                  "uuid": "47e931c8-0f5b-42f7-b0e5-62827ec353c1"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "61788350-0465-4b0b-bcfc-a63139dbc67b",
                  "type": "has_only_phrase",
                  "uuid": "1ccaa00e-c696-41a6-be26-01e0c70b3b8a"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "0f0a6694-c0d1-45d6-8583-15332d8e8a0e",
                  "type": "has_only_phrase",
                  "uuid": "747afed8-221f-4c98-ac93-e36e82ea3cb7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f572130d-6e1f-41f2-a9a7-91f6a9893690",
                  "name": "All Responses",
                  "uuid": "eba9abb5-d21e-44f8-9fa9-e881822d56ff"
                },
                {
                  "exit_uuid": "6f62e880-d7e0-404a-a5f7-53c04af2e1d1",
                  "name": "I don’t have enough time",
                  "uuid": "31ee8beb-92b0-470e-852a-8b1928e15e12"
                },
                {
                  "exit_uuid": "3e8e2218-06cb-44a6-944f-1eff44829e91",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "196eb153-742c-45a5-afa1-f875afdb83ac"
                },
                {
                  "exit_uuid": "8f4aced4-276f-46bc-bcc5-996a2de8c259",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "d849868c-6497-4f2a-b622-ba8b43446364"
                },
                {
                  "exit_uuid": "0d8f9957-d97b-4d5f-8104-e5b6b1141038",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "8f0116ad-1783-4133-9401-4369249c1545"
                },
                {
                  "exit_uuid": "66aaee24-cb64-48bd-a3d6-a03e53fc843f",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "d9c42f1f-6c25-4322-bb57-98f883067a76"
                },
                {
                  "exit_uuid": "db2749a4-70fb-42f8-bc7c-22afb5ed507f",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "0db015f2-dbe9-4ad6-ba49-053e5ad35390"
                },
                {
                  "exit_uuid": "6b7189b0-f873-4b36-b7dc-963c1095c896",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "61788350-0465-4b0b-bcfc-a63139dbc67b"
                },
                {
                  "exit_uuid": "0f669613-67ba-4b5c-b02b-350cc0491632",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "0f0a6694-c0d1-45d6-8583-15332d8e8a0e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f572130d-6e1f-41f2-a9a7-91f6a9893690",
                "destination_uuid": null
              },
              {
                "uuid": "6f62e880-d7e0-404a-a5f7-53c04af2e1d1",
                "destination_uuid": "9c347c81-4786-4bd3-a716-45d0ed334913"
              },
              {
                "uuid": "3e8e2218-06cb-44a6-944f-1eff44829e91",
                "destination_uuid": "3add9444-18a3-4f8d-b1d4-35fa1df4423b"
              },
              {
                "uuid": "8f4aced4-276f-46bc-bcc5-996a2de8c259",
                "destination_uuid": "eecc898c-ae90-4997-8977-ca8cac325902"
              },
              {
                "uuid": "0d8f9957-d97b-4d5f-8104-e5b6b1141038",
                "destination_uuid": "34e2d98f-98cb-40e1-b0aa-8fedb1ce6c87"
              },
              {
                "uuid": "66aaee24-cb64-48bd-a3d6-a03e53fc843f",
                "destination_uuid": "d9a890c9-279c-4c79-b2e3-8bf5f6c51ba5"
              },
              {
                "uuid": "db2749a4-70fb-42f8-bc7c-22afb5ed507f",
                "destination_uuid": "ba645da2-1f0a-4409-a6f1-299cd6ebde6a"
              },
              {
                "uuid": "6b7189b0-f873-4b36-b7dc-963c1095c896",
                "destination_uuid": "8e8ebb9b-a7b3-4ac4-aa03-e3ee87052a0b"
              },
              {
                "uuid": "0f669613-67ba-4b5c-b02b-350cc0491632",
                "destination_uuid": "ac61dd12-54e4-4efc-bee0-9a90bbdaeb15"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "41ad1ac5-da51-4777-9564-a1b01f21989e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ade4ed9b-b287-4fa4-a3ce-4dd126b992f3",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4e3c256b-9563-4bf5-a544-c9169078c944"
              }
            ],
            "exits": [
              {
                "uuid": "cac0c5eb-5274-489e-976d-7aeec18dced4",
                "destination_uuid": "1f5aa3e2-707b-402d-bbdb-55a46d4a5521"
              }
            ]
          },
          {
            "uuid": "1f5aa3e2-707b-402d-bbdb-55a46d4a5521",
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
                "uuid": "659735b8-acb8-4b70-a890-9b6c37bebd15"
              }
            ],
            "exits": [
              {
                "uuid": "ab31c385-8210-4dfe-b07a-a7837b600415",
                "destination_uuid": "bfc5db59-b7b2-4245-baa9-340f6919c824"
              }
            ]
          },
          {
            "uuid": "bfc5db59-b7b2-4245-baa9-340f6919c824",
            "actions": [],
            "exits": [
              {
                "uuid": "b74fa35d-ffa6-448c-9725-c95ec5186fc1",
                "destination_uuid": "eee905a1-944f-4c0e-bb40-aeca15a749ab"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "dd4b0e19-ff9b-4bd7-98d2-44bd683bdca9",
              "cases": [],
              "categories": [
                {
                  "uuid": "dd4b0e19-ff9b-4bd7-98d2-44bd683bdca9",
                  "name": "All Responses",
                  "exit_uuid": "b74fa35d-ffa6-448c-9725-c95ec5186fc1"
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
            "uuid": "eee905a1-944f-4c0e-bb40-aeca15a749ab",
            "actions": [
              {
                "uuid": "814c7368-02a5-4f72-b85b-a1c067e0a158",
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
                "uuid": "c2faa597-69fd-4c2d-a731-ac827cb62086",
                "destination_uuid": "a61b2f16-1468-4e11-9c7f-1a38dbefa960"
              }
            ]
          },
          {
            "uuid": "a61b2f16-1468-4e11-9c7f-1a38dbefa960",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bf39e310-26ab-42ec-9494-d00edadec4e2"
              }
            ],
            "exits": [
              {
                "uuid": "bdf05921-4d5b-4388-8cba-30cb005da07d",
                "destination_uuid": "29237471-6e07-49dd-8be6-96d1ac05143f"
              }
            ]
          },
          {
            "uuid": "29237471-6e07-49dd-8be6-96d1ac05143f",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7f9b7c38-4cbd-4861-af61-21fffbae466e"
              }
            ],
            "exits": [
              {
                "uuid": "5574a27f-cce8-4a5b-9109-c1ac5debc4b5",
                "destination_uuid": "5872bc26-0784-45f5-b7c5-0f528dc879ab"
              }
            ]
          },
          {
            "uuid": "5872bc26-0784-45f5-b7c5-0f528dc879ab",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5c3ca952-adeb-4a6f-b385-a8b9c13971f3"
              }
            ],
            "exits": [
              {
                "uuid": "81a3d950-4447-4db2-8c63-3403123649cc",
                "destination_uuid": "cc61dd6b-a2c4-4df1-9e0b-554a1972cf96"
              }
            ]
          },
          {
            "uuid": "cc61dd6b-a2c4-4df1-9e0b-554a1972cf96",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "580d6090-2277-4935-bf52-f973cc34a51e"
              }
            ],
            "exits": [
              {
                "uuid": "88a8be60-c39b-4cdb-866d-d8e43d50fb8c",
                "destination_uuid": "f317dc3c-59e2-4c08-9eb7-6a028e482370"
              }
            ]
          },
          {
            "uuid": "f317dc3c-59e2-4c08-9eb7-6a028e482370",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fd5a456a-0bb9-4f42-b85a-22fbec1e46d5",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "b627b214-cf74-4aa6-acf2-3c056d355ec0",
                  "type": "has_only_phrase",
                  "uuid": "d5ce5bc7-27d6-464e-b9c5-29182a7f72f5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "09b45dec-9737-436a-9050-e44d00590da3",
                  "name": "All Responses",
                  "uuid": "fd5a456a-0bb9-4f42-b85a-22fbec1e46d5"
                },
                {
                  "exit_uuid": "d0a1b181-5408-4e38-893e-66f467ff66a7",
                  "name": "Let me hear your story",
                  "uuid": "b627b214-cf74-4aa6-acf2-3c056d355ec0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "09b45dec-9737-436a-9050-e44d00590da3",
                "destination_uuid": null
              },
              {
                "uuid": "d0a1b181-5408-4e38-893e-66f467ff66a7",
                "destination_uuid": "3d16f53e-d9bb-4e3c-9d1c-49779fea2d58"
              }
            ]
          },
          {
            "uuid": "3d16f53e-d9bb-4e3c-9d1c-49779fea2d58",
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
                "uuid": "9b71f244-cf76-4ec9-a18d-3e3b98077f5e"
              }
            ],
            "exits": [
              {
                "uuid": "30a9ca59-d506-4543-a96a-5a0325f72e6d",
                "destination_uuid": "fc7863fc-347d-4c27-82f5-cb262843a558"
              }
            ]
          },
          {
            "uuid": "fc7863fc-347d-4c27-82f5-cb262843a558",
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
                "uuid": "d3072c2a-1c60-4743-ada4-9232b0b3c60a"
              }
            ],
            "exits": [
              {
                "uuid": "d1717912-a636-47d2-9fd4-fb917f227fa7",
                "destination_uuid": "13acb467-05e6-4a52-8f20-ade4716e0e23"
              }
            ]
          },
          {
            "uuid": "13acb467-05e6-4a52-8f20-ade4716e0e23",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ada58f58-58a5-41c0-9f34-1813cc253d7e",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "4e27d528-482b-4e85-87a1-d61ed6f0c4ec",
                  "type": "has_only_phrase",
                  "uuid": "f3ad3e7e-0547-4b8d-8b26-30d0e85555bd"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "01efb8e6-73c3-4fae-83be-632958a3e0be",
                  "type": "has_only_phrase",
                  "uuid": "17e80622-06cd-483c-bb5b-57fc7d01ce5b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c7ff47a2-41fe-4d23-99ce-cb702ac38740",
                  "name": "All Responses",
                  "uuid": "ada58f58-58a5-41c0-9f34-1813cc253d7e"
                },
                {
                  "exit_uuid": "96b9490a-5658-4939-abdc-cff2f77e3be4",
                  "name": "Previous",
                  "uuid": "4e27d528-482b-4e85-87a1-d61ed6f0c4ec"
                },
                {
                  "exit_uuid": "cec3776a-754f-4cbb-827e-c27f924dcb61",
                  "name": "Next",
                  "uuid": "01efb8e6-73c3-4fae-83be-632958a3e0be"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c7ff47a2-41fe-4d23-99ce-cb702ac38740",
                "destination_uuid": null
              },
              {
                "uuid": "96b9490a-5658-4939-abdc-cff2f77e3be4",
                "destination_uuid": "3d16f53e-d9bb-4e3c-9d1c-49779fea2d58"
              },
              {
                "uuid": "cec3776a-754f-4cbb-827e-c27f924dcb61",
                "destination_uuid": "87a07443-9b77-4c3b-a91a-5457396721e9"
              }
            ]
          },
          {
            "uuid": "87a07443-9b77-4c3b-a91a-5457396721e9",
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
                "uuid": "30845d48-a882-4ed6-af39-da164517a762"
              }
            ],
            "exits": [
              {
                "uuid": "544b6953-6479-408e-938e-c5977fef5209",
                "destination_uuid": "5242485d-9886-4abd-b8c1-3bb4dfeb0667"
              }
            ]
          },
          {
            "uuid": "5242485d-9886-4abd-b8c1-3bb4dfeb0667",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b6a31af7-7b98-47c9-80be-9a99778e00d6",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "9d27ffdf-7dc2-4cbe-9ab1-3c2e38d7ff9e",
                  "type": "has_only_phrase",
                  "uuid": "efde1f6f-e951-45d0-9876-7cf995968cfa"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "93cd6448-b773-441a-b823-1cc1f3482e25",
                  "type": "has_only_phrase",
                  "uuid": "84337d82-0ab5-4ef8-a6d9-a59431a5d6e5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e6045753-931f-47b9-9821-417414b012c8",
                  "name": "All Responses",
                  "uuid": "b6a31af7-7b98-47c9-80be-9a99778e00d6"
                },
                {
                  "exit_uuid": "f5b638bb-d95a-42b5-873b-a86f332ab5b5",
                  "name": "Previous",
                  "uuid": "9d27ffdf-7dc2-4cbe-9ab1-3c2e38d7ff9e"
                },
                {
                  "exit_uuid": "9e8b36cb-308a-46c2-9849-a64e40e0c244",
                  "name": "Next",
                  "uuid": "93cd6448-b773-441a-b823-1cc1f3482e25"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e6045753-931f-47b9-9821-417414b012c8",
                "destination_uuid": null
              },
              {
                "uuid": "f5b638bb-d95a-42b5-873b-a86f332ab5b5",
                "destination_uuid": "fc7863fc-347d-4c27-82f5-cb262843a558"
              },
              {
                "uuid": "9e8b36cb-308a-46c2-9849-a64e40e0c244",
                "destination_uuid": "012ab45a-1544-4895-b202-7cdc083732f5"
              }
            ]
          },
          {
            "uuid": "012ab45a-1544-4895-b202-7cdc083732f5",
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
                "uuid": "a792f3f5-2218-4a13-88b8-9a702745d8bc"
              }
            ],
            "exits": [
              {
                "uuid": "17e09134-1d7d-4015-b12f-fcb155d35e48",
                "destination_uuid": "4f770c6f-c537-42a3-a299-1c401c788feb"
              }
            ]
          },
          {
            "uuid": "4f770c6f-c537-42a3-a299-1c401c788feb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8f6f9cc5-5286-4ec5-a42e-2abfb3dce1d7",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "2c117ac0-7ff4-40e2-bac4-80bc7d9c17b6",
                  "type": "has_only_phrase",
                  "uuid": "c899503b-d118-4acb-aa7b-2f899a274399"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "4ab51d68-cfcc-4c9b-8558-03664fc3c597",
                  "type": "has_only_phrase",
                  "uuid": "1532f2e2-5eb0-41f6-92d0-5e3de72b42dc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "34ad6a4d-8756-4bf7-aef3-03f21d04769b",
                  "name": "All Responses",
                  "uuid": "8f6f9cc5-5286-4ec5-a42e-2abfb3dce1d7"
                },
                {
                  "exit_uuid": "ee3bffe4-073e-4e8c-b3ea-899f6049a8c2",
                  "name": "Previous",
                  "uuid": "2c117ac0-7ff4-40e2-bac4-80bc7d9c17b6"
                },
                {
                  "exit_uuid": "0addeb3f-e91a-4f4b-b6c3-0219107aa53b",
                  "name": "Next",
                  "uuid": "4ab51d68-cfcc-4c9b-8558-03664fc3c597"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "34ad6a4d-8756-4bf7-aef3-03f21d04769b",
                "destination_uuid": null
              },
              {
                "uuid": "ee3bffe4-073e-4e8c-b3ea-899f6049a8c2",
                "destination_uuid": "87a07443-9b77-4c3b-a91a-5457396721e9"
              },
              {
                "uuid": "0addeb3f-e91a-4f4b-b6c3-0219107aa53b",
                "destination_uuid": "531a787c-7052-4723-9c99-b26f57bd2251"
              }
            ]
          },
          {
            "uuid": "531a787c-7052-4723-9c99-b26f57bd2251",
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
                "uuid": "8a35b916-eb77-4db4-a5a6-70fb7dc3d5d6"
              }
            ],
            "exits": [
              {
                "uuid": "91187cf8-0a42-4d0c-a871-11f13990749b",
                "destination_uuid": "026b7249-a762-4860-ad6a-83d8cc080c7a"
              }
            ]
          },
          {
            "uuid": "026b7249-a762-4860-ad6a-83d8cc080c7a",
            "actions": [],
            "exits": [
              {
                "uuid": "2b1d0cfd-c6ed-4597-be2c-7ece48466a49",
                "destination_uuid": "60f869b2-5b76-420e-a058-d9ff3f03d434"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "03edfc8f-9306-435a-a12e-7d9f3404ddeb",
              "cases": [],
              "categories": [
                {
                  "uuid": "03edfc8f-9306-435a-a12e-7d9f3404ddeb",
                  "name": "All Responses",
                  "exit_uuid": "2b1d0cfd-c6ed-4597-be2c-7ece48466a49"
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
            "uuid": "60f869b2-5b76-420e-a058-d9ff3f03d434",
            "actions": [
              {
                "uuid": "2f654eb7-447c-4c91-9fc7-47f832c7a12c",
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
                "uuid": "3ded82d9-4889-4f4d-b042-44a030ed217d",
                "destination_uuid": "05058bf5-8468-4365-bcee-3aa2b9a92afc"
              }
            ]
          },
          {
            "uuid": "05058bf5-8468-4365-bcee-3aa2b9a92afc",
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
                "uuid": "3f6a58d8-ad96-4117-bcf7-a2facd1bb5c4"
              }
            ],
            "exits": [
              {
                "uuid": "5a96166d-f742-4552-b71b-cec438f3a258",
                "destination_uuid": "453fc5e8-3a32-465e-b123-ac2a7e2f3070"
              }
            ]
          },
          {
            "uuid": "453fc5e8-3a32-465e-b123-ac2a7e2f3070",
            "actions": [],
            "exits": [
              {
                "uuid": "214a9f14-acec-456c-acb3-350b381a772c",
                "destination_uuid": "a60dccb5-ee58-4551-a75a-63363de70b1d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c77380d4-11af-4bd6-8e86-1fbf839cd39c",
              "cases": [],
              "categories": [
                {
                  "uuid": "c77380d4-11af-4bd6-8e86-1fbf839cd39c",
                  "name": "All Responses",
                  "exit_uuid": "214a9f14-acec-456c-acb3-350b381a772c"
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
            "uuid": "a60dccb5-ee58-4551-a75a-63363de70b1d",
            "actions": [
              {
                "uuid": "c6917af4-c37a-4e7d-9592-696cdb5e63d8",
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
                "uuid": "ef967512-96fa-4b38-89be-bf151f6d45a0",
                "destination_uuid": "c03b22bf-4fef-4c7d-9a00-d9622c8e0add"
              }
            ]
          },
          {
            "uuid": "c03b22bf-4fef-4c7d-9a00-d9622c8e0add",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "36f7af03-ec14-47f3-b6da-9f31f3ce0cf0"
              }
            ],
            "exits": [
              {
                "uuid": "212c6499-83ae-49a1-b864-40dec6980e54",
                "destination_uuid": "6355a701-ece0-4664-91cd-43d28b9cf9cf"
              }
            ]
          },
          {
            "uuid": "6355a701-ece0-4664-91cd-43d28b9cf9cf",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "f9a58e7f-36bd-4dd0-8afd-7fd1a05a6879"
              }
            ],
            "exits": [
              {
                "uuid": "08bdd97b-dfbc-4e59-8463-09e098ab7b0e",
                "destination_uuid": "0842bfd4-7365-435d-8d12-efd66a18ea52"
              }
            ]
          },
          {
            "uuid": "0842bfd4-7365-435d-8d12-efd66a18ea52",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d44f9d7d-dbe4-4d66-8542-382c1d5247ec",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "d9525b43-f08d-4d83-9734-4cc41d866caa",
                  "type": "has_only_phrase",
                  "uuid": "55054e11-b365-4d7f-a1c3-27338441edc8"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "1771b2f0-c86f-4d5b-b7a0-e53531b93558",
                  "type": "has_only_phrase",
                  "uuid": "79b4826b-9d48-4fb4-b6f6-77079d330e55"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "74fc060f-e781-4b3c-a9f2-51f20711e667",
                  "name": "All Responses",
                  "uuid": "d44f9d7d-dbe4-4d66-8542-382c1d5247ec"
                },
                {
                  "exit_uuid": "b2870698-bf2c-480b-8a09-d0a07a2ba9b4",
                  "name": "Take me to Tips",
                  "uuid": "d9525b43-f08d-4d83-9734-4cc41d866caa"
                },
                {
                  "exit_uuid": "b69ea6d2-463f-40bd-bb0b-15dae1b29078",
                  "name": "Take me to Homescreen",
                  "uuid": "1771b2f0-c86f-4d5b-b7a0-e53531b93558"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "74fc060f-e781-4b3c-a9f2-51f20711e667",
                "destination_uuid": null
              },
              {
                "uuid": "b2870698-bf2c-480b-8a09-d0a07a2ba9b4",
                "destination_uuid": "ab002d93-3c79-4df2-82a2-6a818f85da85"
              },
              {
                "uuid": "b69ea6d2-463f-40bd-bb0b-15dae1b29078",
                "destination_uuid": "eeae4f48-1f4c-4a5d-ba1c-6cf550c4fcdc"
              }
            ]
          },
          {
            "uuid": "ab002d93-3c79-4df2-82a2-6a818f85da85",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "b61d8612-1bd1-42cb-bd5c-d6081eddda22"
                },
                "type": "enter_flow",
                "uuid": "7080d145-1e58-4143-8b43-605a54560972"
              }
            ],
            "exits": [
              {
                "uuid": "4ae04993-be20-441f-8862-36332b5fdadd",
                "destination_uuid": null
              },
              {
                "uuid": "180ff99f-0ba4-4c7a-a01d-11399e97a2fc",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "23dcb246-014a-4b7a-9f8f-9728e628a1a4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "165b6987-cf96-4b85-975b-93c6f0711d74"
                },
                {
                  "uuid": "eca1475e-c7ee-434a-b122-9390cd3e6680",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "40dd672a-100b-4201-b29b-884bca1ebe97"
                }
              ],
              "categories": [
                {
                  "uuid": "165b6987-cf96-4b85-975b-93c6f0711d74",
                  "name": "Complete",
                  "exit_uuid": "4ae04993-be20-441f-8862-36332b5fdadd"
                },
                {
                  "uuid": "40dd672a-100b-4201-b29b-884bca1ebe97",
                  "name": "Expired",
                  "exit_uuid": "180ff99f-0ba4-4c7a-a01d-11399e97a2fc"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "165b6987-cf96-4b85-975b-93c6f0711d74"
            }
          },
          {
            "uuid": "eeae4f48-1f4c-4a5d-ba1c-6cf550c4fcdc",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "1541bfb4-4b57-4c37-a053-cd65803046d7"
                },
                "type": "enter_flow",
                "uuid": "22c44309-1f7d-44c3-a7e6-fb1740e46dcc"
              }
            ],
            "exits": [
              {
                "uuid": "048e8ac7-91b2-4064-831d-58a36b038436",
                "destination_uuid": null
              },
              {
                "uuid": "a428b8ad-cfc9-43f9-971d-41be8ed3ff68",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "11d20e57-abe8-4bd5-a038-db9a741a498d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "625f3f72-e476-4e70-bf86-37cd147722a8"
                },
                {
                  "uuid": "fdfb5aaf-9814-46c2-a3b6-584426335647",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "980d7898-a82f-41fb-8bad-c487cf42aa76"
                }
              ],
              "categories": [
                {
                  "uuid": "625f3f72-e476-4e70-bf86-37cd147722a8",
                  "name": "Complete",
                  "exit_uuid": "048e8ac7-91b2-4064-831d-58a36b038436"
                },
                {
                  "uuid": "980d7898-a82f-41fb-8bad-c487cf42aa76",
                  "name": "Expired",
                  "exit_uuid": "a428b8ad-cfc9-43f9-971d-41be8ed3ff68"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "625f3f72-e476-4e70-bf86-37cd147722a8"
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
        "uuid": "56fa601e-68ff-412e-a2e6-a94d33eeffa0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b8085149-adfe-4409-ba82-eda2f1505f3b",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "49405ed0-2c85-4cb4-bdcf-b0b1ffa312cb"
              }
            ],
            "exits": [
              {
                "uuid": "f6c1a607-7ee2-4c14-b885-3e0432e068fd",
                "destination_uuid": "8a7ee571-7fd9-4c3f-a231-10260c28f1bd"
              }
            ]
          },
          {
            "uuid": "8a7ee571-7fd9-4c3f-a231-10260c28f1bd",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "a01ad8e4-1a3e-46c2-9226-ea60c503ce1b"
              }
            ],
            "exits": [
              {
                "uuid": "06370c49-b113-45a8-973d-6206ea8e4f98",
                "destination_uuid": "353ff731-9ac2-4518-9d87-b3a31ceb2d80"
              }
            ]
          },
          {
            "uuid": "353ff731-9ac2-4518-9d87-b3a31ceb2d80",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "36e89251-6b58-4d2d-b2c5-61708016c138",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "6630d73c-1692-493e-a34d-0ee8a923279c",
                  "type": "has_only_phrase",
                  "uuid": "313ab746-50d6-4b2c-aabd-d85fe2c9c515"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "5ab33d16-c07a-4e8b-b6b8-6f60bc6affe0",
                  "type": "has_only_phrase",
                  "uuid": "27c2012b-560c-4b13-a1a9-2bf263096f3e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "18ca3105-1778-496a-9a19-d91ece744fa3",
                  "name": "All Responses",
                  "uuid": "36e89251-6b58-4d2d-b2c5-61708016c138"
                },
                {
                  "exit_uuid": "15e0828d-580d-4cad-8b63-9a6e5890f484",
                  "name": "Later",
                  "uuid": "6630d73c-1692-493e-a34d-0ee8a923279c"
                },
                {
                  "exit_uuid": "523fde65-34c8-45df-8627-e015ba79f456",
                  "name": "Yes",
                  "uuid": "5ab33d16-c07a-4e8b-b6b8-6f60bc6affe0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "18ca3105-1778-496a-9a19-d91ece744fa3",
                "destination_uuid": null
              },
              {
                "uuid": "15e0828d-580d-4cad-8b63-9a6e5890f484",
                "destination_uuid": "5d0250df-6825-4bf4-a5cc-366b2f574753"
              },
              {
                "uuid": "523fde65-34c8-45df-8627-e015ba79f456",
                "destination_uuid": "a5abc37c-b05c-4027-b541-f648ee120222"
              }
            ]
          },
          {
            "uuid": "5d0250df-6825-4bf4-a5cc-366b2f574753",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "dc27f4e1-731c-4958-8541-4d3dbfcd3df3"
                },
                "type": "enter_flow",
                "uuid": "f87f9370-3b7b-4644-b846-71126d0ec551"
              }
            ],
            "exits": [
              {
                "uuid": "4fd1c30f-44d6-4272-8766-90115fffa086",
                "destination_uuid": null
              },
              {
                "uuid": "c188c1a2-cd73-4013-915b-9e33e3ad32b1",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "449be2c0-167a-484a-adfc-ac4cd4877047",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a4292098-47a8-4097-9d65-be140bf2dbbd"
                },
                {
                  "uuid": "2c69096e-2276-4b4f-b5e5-58e770a6b0e7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2f022ff3-5e96-468d-9dce-abd1d9389114"
                }
              ],
              "categories": [
                {
                  "uuid": "a4292098-47a8-4097-9d65-be140bf2dbbd",
                  "name": "Complete",
                  "exit_uuid": "4fd1c30f-44d6-4272-8766-90115fffa086"
                },
                {
                  "uuid": "2f022ff3-5e96-468d-9dce-abd1d9389114",
                  "name": "Expired",
                  "exit_uuid": "c188c1a2-cd73-4013-915b-9e33e3ad32b1"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a4292098-47a8-4097-9d65-be140bf2dbbd"
            }
          },
          {
            "uuid": "a5abc37c-b05c-4027-b541-f648ee120222",
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
                "uuid": "266d5c81-9690-4a49-be3b-2bb9932b66f1"
              }
            ],
            "exits": [
              {
                "uuid": "6093518a-e959-494c-805e-55192232ca03",
                "destination_uuid": "d5e2d3e7-d84a-48c6-bf7f-1b068600a697"
              }
            ]
          },
          {
            "uuid": "d5e2d3e7-d84a-48c6-bf7f-1b068600a697",
            "actions": [],
            "exits": [
              {
                "uuid": "c372169d-e623-429f-9e12-dc5634699bdb",
                "destination_uuid": "d05baae7-aa2a-4a77-a538-2f2d62e422a1"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "141ff6c0-706d-400c-b52f-cf1e79e56e40",
              "cases": [],
              "categories": [
                {
                  "uuid": "141ff6c0-706d-400c-b52f-cf1e79e56e40",
                  "name": "All Responses",
                  "exit_uuid": "c372169d-e623-429f-9e12-dc5634699bdb"
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
            "uuid": "d05baae7-aa2a-4a77-a538-2f2d62e422a1",
            "actions": [
              {
                "uuid": "828f8640-156b-4d4b-8f95-9512c9c6ca67",
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
                "uuid": "bb9d4965-9898-4c17-a23f-8a5b9bcd14d7",
                "destination_uuid": "89076e32-79d0-471a-ae02-6960bcb10ac3"
              }
            ]
          },
          {
            "uuid": "89076e32-79d0-471a-ae02-6960bcb10ac3",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "a92ffc16-2af1-4111-8045-ae5bb96a5413"
              }
            ],
            "exits": [
              {
                "uuid": "9032704a-69a9-4305-b8f7-efaab8fd5035",
                "destination_uuid": "2b638267-d193-4e3d-87ac-d3dd1dd11774"
              }
            ]
          },
          {
            "uuid": "2b638267-d193-4e3d-87ac-d3dd1dd11774",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3bb1b94d-34c7-4e70-abec-c7c32b20f7a7",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "d45e2fd2-4718-4a65-bc84-31cf8ed532fd",
                  "type": "has_only_phrase",
                  "uuid": "beddcf1f-4b26-45fa-a55b-d0deef7cd2b2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d9f3a085-4895-4d73-ac9e-bab06b6e3bb6",
                  "name": "All Responses",
                  "uuid": "3bb1b94d-34c7-4e70-abec-c7c32b20f7a7"
                },
                {
                  "exit_uuid": "b2fbdb10-1527-446f-a25b-f04606a75506",
                  "name": "Click here when done",
                  "uuid": "d45e2fd2-4718-4a65-bc84-31cf8ed532fd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d9f3a085-4895-4d73-ac9e-bab06b6e3bb6",
                "destination_uuid": null
              },
              {
                "uuid": "b2fbdb10-1527-446f-a25b-f04606a75506",
                "destination_uuid": "f297ac16-18b7-43c4-ae9b-8403128746e6"
              }
            ]
          },
          {
            "uuid": "f297ac16-18b7-43c4-ae9b-8403128746e6",
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
                "uuid": "06d9487f-8e61-4683-b9c7-6abe9800a761"
              }
            ],
            "exits": [
              {
                "uuid": "b39711d5-3149-425d-b565-64b7c0de38e8",
                "destination_uuid": "10cd6459-52fb-4843-bf54-b30bfd7f228a"
              }
            ]
          },
          {
            "uuid": "10cd6459-52fb-4843-bf54-b30bfd7f228a",
            "actions": [],
            "exits": [
              {
                "uuid": "fe57e4c1-a6ee-4210-94d1-261daf2a3565",
                "destination_uuid": "120c7165-9047-47ee-98e6-542e5c9d2c9c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ee8f7ec3-04a1-40f8-bd90-cbd1d740feb3",
              "cases": [],
              "categories": [
                {
                  "uuid": "ee8f7ec3-04a1-40f8-bd90-cbd1d740feb3",
                  "name": "All Responses",
                  "exit_uuid": "fe57e4c1-a6ee-4210-94d1-261daf2a3565"
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
            "uuid": "120c7165-9047-47ee-98e6-542e5c9d2c9c",
            "actions": [
              {
                "uuid": "75d344e5-e5e9-49f9-a30a-d433e8826c92",
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
                "uuid": "3de97968-f8e3-484d-b600-4ebb7e319549",
                "destination_uuid": "1ff35b5e-e352-47f5-8070-b874a01440d1"
              }
            ]
          },
          {
            "uuid": "1ff35b5e-e352-47f5-8070-b874a01440d1",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "12493957-f756-4d35-95b9-b2e489b8946a"
              }
            ],
            "exits": [
              {
                "uuid": "5a6e070b-4416-44c7-b3ed-2167c23d4483",
                "destination_uuid": "36e13f2b-ea22-4d8e-a430-bd6161594730"
              }
            ]
          },
          {
            "uuid": "36e13f2b-ea22-4d8e-a430-bd6161594730",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "af0fd29d-2cf4-4041-800e-304f4ddcc51e",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "456b927f-afec-463a-a775-99ea98fb9a4a",
                  "type": "has_only_phrase",
                  "uuid": "c0c538ba-67ce-44bc-beac-9a3e15674745"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c8e9a80b-b17d-491d-a2e0-58e2846ade86",
                  "name": "All Responses",
                  "uuid": "af0fd29d-2cf4-4041-800e-304f4ddcc51e"
                },
                {
                  "exit_uuid": "c5f93802-40cc-4810-bc56-9b0722b6b8dc",
                  "name": "Click here when done",
                  "uuid": "456b927f-afec-463a-a775-99ea98fb9a4a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c8e9a80b-b17d-491d-a2e0-58e2846ade86",
                "destination_uuid": null
              },
              {
                "uuid": "c5f93802-40cc-4810-bc56-9b0722b6b8dc",
                "destination_uuid": "a370a0ac-b8b4-4371-9790-aab8703ae8f0"
              }
            ]
          },
          {
            "uuid": "a370a0ac-b8b4-4371-9790-aab8703ae8f0",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "588aa0eb-8527-4a25-87f0-986d3438837b"
              }
            ],
            "exits": [
              {
                "uuid": "1d6e1905-280a-4ae8-9ec0-a15767f09b5f",
                "destination_uuid": "de3bacae-e87a-4430-aab7-2e3d49b4f4e2"
              }
            ]
          },
          {
            "uuid": "de3bacae-e87a-4430-aab7-2e3d49b4f4e2",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "daa058c2-994e-44e6-b474-9db966122f10"
              }
            ],
            "exits": [
              {
                "uuid": "ffc02d41-7a58-468b-8c91-d38351cd31e8",
                "destination_uuid": "442ab89d-9d4e-4fe4-b44a-11a15b1eafd4"
              }
            ]
          },
          {
            "uuid": "442ab89d-9d4e-4fe4-b44a-11a15b1eafd4",
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
                "uuid": "06de7e33-117c-48dd-8c54-c749a176a489"
              }
            ],
            "exits": [
              {
                "uuid": "c5c8fb0f-610c-4e23-9bf9-e15ce31ee0c8",
                "destination_uuid": "f4609b97-3f59-4628-bb11-a84d7fc5cf82"
              }
            ]
          },
          {
            "uuid": "f4609b97-3f59-4628-bb11-a84d7fc5cf82",
            "actions": [],
            "exits": [
              {
                "uuid": "3053e539-4fe0-46b2-9b95-8f7ba3bdb138",
                "destination_uuid": "e46a245b-1288-4334-be23-5d428a9a094a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0489a0dc-18dd-4709-98a1-f0abd2b797dd",
              "cases": [],
              "categories": [
                {
                  "uuid": "0489a0dc-18dd-4709-98a1-f0abd2b797dd",
                  "name": "All Responses",
                  "exit_uuid": "3053e539-4fe0-46b2-9b95-8f7ba3bdb138"
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
            "uuid": "e46a245b-1288-4334-be23-5d428a9a094a",
            "actions": [
              {
                "uuid": "7b22e1f0-72c4-43f4-9c07-1c93c92b12a5",
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
                "uuid": "4b963fdc-f288-47af-81ba-66497b72c5c1",
                "destination_uuid": "2d6e26da-f59d-4aa9-a79f-78f9b6fd566a"
              }
            ]
          },
          {
            "uuid": "2d6e26da-f59d-4aa9-a79f-78f9b6fd566a",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "90c66647-1855-4ffb-81fc-f3201492b8ff"
              }
            ],
            "exits": [
              {
                "uuid": "f9e6f87f-2fab-4113-b45a-cb41e3865580",
                "destination_uuid": "5529c28b-5d62-40e5-ba60-cd3a24f33fd8"
              }
            ]
          },
          {
            "uuid": "5529c28b-5d62-40e5-ba60-cd3a24f33fd8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "001dc309-82e5-46a5-8d08-2a399f44d1f2",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "1e1ab670-b389-479c-bd4c-61019f446814",
                  "type": "has_only_phrase",
                  "uuid": "1e1aa06c-8681-4b30-b186-ae9c60d6265d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5379994d-4415-43da-bc81-c4ae21c818f8",
                  "name": "All Responses",
                  "uuid": "001dc309-82e5-46a5-8d08-2a399f44d1f2"
                },
                {
                  "exit_uuid": "db280537-adfe-4678-bb5c-7674c2354c98",
                  "name": "Take me to Homescreen",
                  "uuid": "1e1ab670-b389-479c-bd4c-61019f446814"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5379994d-4415-43da-bc81-c4ae21c818f8",
                "destination_uuid": null
              },
              {
                "uuid": "db280537-adfe-4678-bb5c-7674c2354c98",
                "destination_uuid": "ac0fb83d-29ca-42b3-af40-76f7ea0d5537"
              }
            ]
          },
          {
            "uuid": "ac0fb83d-29ca-42b3-af40-76f7ea0d5537",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "a26dd1af-f9dd-4e7b-96e0-951c6863829c"
                },
                "type": "enter_flow",
                "uuid": "3194fd05-18ed-4278-abf5-56889990cc8b"
              }
            ],
            "exits": [
              {
                "uuid": "532cec82-feab-47fc-9569-1fd8f3b14793",
                "destination_uuid": null
              },
              {
                "uuid": "0a4504e5-91a2-4e63-bdf3-73c1e0c27032",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c8cd45eb-35c9-4636-809b-9bad61528b71",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c2c94a39-5437-4fd2-ae10-23b533a959ac"
                },
                {
                  "uuid": "85253dac-4c49-495f-8789-fffc04b1a34f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0b7292ab-e3ca-4113-8395-d47e573b5bef"
                }
              ],
              "categories": [
                {
                  "uuid": "c2c94a39-5437-4fd2-ae10-23b533a959ac",
                  "name": "Complete",
                  "exit_uuid": "532cec82-feab-47fc-9569-1fd8f3b14793"
                },
                {
                  "uuid": "0b7292ab-e3ca-4113-8395-d47e573b5bef",
                  "name": "Expired",
                  "exit_uuid": "0a4504e5-91a2-4e63-bdf3-73c1e0c27032"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c2c94a39-5437-4fd2-ae10-23b533a959ac"
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
        "uuid": "1ec981cc-809e-4116-8d61-42712398963b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c44c8a1d-e721-45af-9e06-eac4fc8da1a4",
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
                "uuid": "461f3400-6336-4780-b168-bb4cbac42384"
              }
            ],
            "exits": [
              {
                "uuid": "cacf6778-62cd-4e23-881e-6dba1c55a802",
                "destination_uuid": "09d43dc0-ce70-4758-9275-cee0f816e519"
              }
            ]
          },
          {
            "uuid": "09d43dc0-ce70-4758-9275-cee0f816e519",
            "actions": [],
            "exits": [
              {
                "uuid": "c91064ce-5349-4d84-a7ae-9b2173ece08b",
                "destination_uuid": "761a9939-dd54-4cca-897c-d890f57a7dd5"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b120d280-283c-43c5-8743-8392c76983f7",
              "cases": [],
              "categories": [
                {
                  "uuid": "b120d280-283c-43c5-8743-8392c76983f7",
                  "name": "All Responses",
                  "exit_uuid": "c91064ce-5349-4d84-a7ae-9b2173ece08b"
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
            "uuid": "761a9939-dd54-4cca-897c-d890f57a7dd5",
            "actions": [
              {
                "uuid": "800a985f-4008-42b0-8bd7-b763f3f13a39",
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
                "uuid": "0af1b361-0d97-4222-a884-f985b4e97894",
                "destination_uuid": "7ae10427-05e5-4f4a-ab85-daa528b2ca4d"
              }
            ]
          },
          {
            "uuid": "7ae10427-05e5-4f4a-ab85-daa528b2ca4d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ac5abb79-af2c-46e5-ad69-3ff062dc678c",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "78f4c968-33b1-4df6-927f-adc158d8a603",
                  "type": "has_only_phrase",
                  "uuid": "ef4b00bb-6878-4006-9411-7d86a3c46916"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "9586ad65-f7e5-4f22-aeed-c13288aba778",
                  "type": "has_only_phrase",
                  "uuid": "1397cf5a-0538-4d55-ad21-d45fb82ab76d"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "9586ad65-f7e5-4f22-aeed-c13288aba778",
                  "type": "has_only_phrase",
                  "uuid": "b5e2930f-fc43-4a57-9a14-916827ab761c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1c922e6a-2cc9-49eb-aed0-aaa2373c7528",
                  "name": "All Responses",
                  "uuid": "ac5abb79-af2c-46e5-ad69-3ff062dc678c"
                },
                {
                  "exit_uuid": "9fa5080d-fe04-4b22-831d-de10d46ed30f",
                  "name": "Great",
                  "uuid": "78f4c968-33b1-4df6-927f-adc158d8a603"
                },
                {
                  "exit_uuid": "9edddcc6-aaac-44cc-a2ba-54d92c32721d",
                  "name": "Neutral; Bad",
                  "uuid": "9586ad65-f7e5-4f22-aeed-c13288aba778"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "1c922e6a-2cc9-49eb-aed0-aaa2373c7528",
                "destination_uuid": null
              },
              {
                "uuid": "9fa5080d-fe04-4b22-831d-de10d46ed30f",
                "destination_uuid": "e7d10359-2abd-4e4d-8d0e-6410c4fc95e5"
              },
              {
                "uuid": "9edddcc6-aaac-44cc-a2ba-54d92c32721d",
                "destination_uuid": "24c17384-949b-434c-b841-462be9be04fb"
              }
            ]
          },
          {
            "uuid": "e7d10359-2abd-4e4d-8d0e-6410c4fc95e5",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "c43c8816-abb6-46be-a38c-133a6c962d8a"
              }
            ],
            "exits": [
              {
                "uuid": "0735b25b-4538-41e7-8679-dcc902823170",
                "destination_uuid": "c9b8b34b-857d-4761-bad0-b322e44f7bb8"
              }
            ]
          },
          {
            "uuid": "24c17384-949b-434c-b841-462be9be04fb",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "2924eab8-2320-4657-ab29-863511fdc35c"
              }
            ],
            "exits": [
              {
                "uuid": "abe5f4a3-044f-4010-935c-08358f9a5883",
                "destination_uuid": "93cc0021-29f2-48ed-8a24-a8f8f07f72b7"
              }
            ]
          },
          {
            "uuid": "93cc0021-29f2-48ed-8a24-a8f8f07f72b7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "73e7f426-d196-422e-927f-e282540c070a",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "696276ad-120f-4124-94a6-1ec5b4c7f8bf",
                  "type": "has_only_phrase",
                  "uuid": "f0e16787-13ea-43ba-8d32-14b461537cfd"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "de848d50-6aec-4c73-8ab6-095329ba0987",
                  "type": "has_only_phrase",
                  "uuid": "f4998c10-ebcf-4ec8-98f5-a7bd9a44755d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8555a459-c278-4434-8c70-27dbcc9955e9",
                  "name": "All Responses",
                  "uuid": "73e7f426-d196-422e-927f-e282540c070a"
                },
                {
                  "exit_uuid": "5ce033a1-89e1-440d-92e9-1ddd61e6b4cf",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "696276ad-120f-4124-94a6-1ec5b4c7f8bf"
                },
                {
                  "exit_uuid": "020afc0c-ae87-4ebd-9537-95b26e5fc49e",
                  "name": "Continue",
                  "uuid": "de848d50-6aec-4c73-8ab6-095329ba0987"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8555a459-c278-4434-8c70-27dbcc9955e9",
                "destination_uuid": null
              },
              {
                "uuid": "5ce033a1-89e1-440d-92e9-1ddd61e6b4cf",
                "destination_uuid": "7063f1e2-c69b-4aa8-a0ed-6efe2995a7c8"
              },
              {
                "uuid": "020afc0c-ae87-4ebd-9537-95b26e5fc49e",
                "destination_uuid": "776af2cc-1dd4-4617-ab1b-0be3c07f2d56"
              }
            ]
          },
          {
            "uuid": "7063f1e2-c69b-4aa8-a0ed-6efe2995a7c8",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "4f00132c-9a9c-4d56-89ee-c530b0c94aab"
                },
                "type": "enter_flow",
                "uuid": "296d3a5a-a9b7-4d5b-a60c-2c869696fd80"
              }
            ],
            "exits": [
              {
                "uuid": "71519418-8ff8-4609-b5c7-b2f25db4ff97",
                "destination_uuid": "556bfb63-9474-4518-aeaa-c91835682975"
              },
              {
                "uuid": "2c79c53e-d76e-4a55-beed-8613b74198fd",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "dc8e23c8-cb38-42bc-82cf-bd7c610907f0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "cc927cb7-fbda-4850-a068-809916892364"
                },
                {
                  "uuid": "adeedcff-02b2-417a-b31b-1c064cabfe81",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "19ceb296-59a3-4e79-893e-2e75711edd18"
                }
              ],
              "categories": [
                {
                  "uuid": "cc927cb7-fbda-4850-a068-809916892364",
                  "name": "Complete",
                  "exit_uuid": "71519418-8ff8-4609-b5c7-b2f25db4ff97"
                },
                {
                  "uuid": "19ceb296-59a3-4e79-893e-2e75711edd18",
                  "name": "Expired",
                  "exit_uuid": "2c79c53e-d76e-4a55-beed-8613b74198fd"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "cc927cb7-fbda-4850-a068-809916892364"
            }
          },
          {
            "uuid": "c9b8b34b-857d-4761-bad0-b322e44f7bb8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "eb2d4f89-40d9-4be2-9e55-89a4538c7d63",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "41e3980b-32f6-4246-ab7d-876efd4de765",
                  "type": "has_only_phrase",
                  "uuid": "cffd684c-b415-4b2f-8a57-9a63951dc0b7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dc21f7ff-1cd2-4b23-af89-4a8cf8b49cbf",
                  "name": "All Responses",
                  "uuid": "eb2d4f89-40d9-4be2-9e55-89a4538c7d63"
                },
                {
                  "exit_uuid": "f23b3189-7f71-4325-9bdb-b7b1c86714ee",
                  "name": "Go to Praise check-in",
                  "uuid": "41e3980b-32f6-4246-ab7d-876efd4de765"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "dc21f7ff-1cd2-4b23-af89-4a8cf8b49cbf",
                "destination_uuid": null
              },
              {
                "uuid": "f23b3189-7f71-4325-9bdb-b7b1c86714ee",
                "destination_uuid": "3503fef2-067c-4821-8a8d-a3f936b89fe5"
              }
            ]
          },
          {
            "uuid": "3503fef2-067c-4821-8a8d-a3f936b89fe5",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "92f5d1bc-dc49-4dd7-8dee-f7acb9484d15"
              }
            ],
            "exits": [
              {
                "uuid": "9ed39eda-3098-4465-8c95-795bede41b25",
                "destination_uuid": "032ce908-4ac7-4106-8a26-71d1e467e0ad"
              }
            ]
          },
          {
            "uuid": "776af2cc-1dd4-4617-ab1b-0be3c07f2d56",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "f34004ce-21b2-4f67-a8e7-24651bddc122"
              }
            ],
            "exits": [
              {
                "uuid": "17e2b0c5-502e-42e8-b740-8ccc54422fc4",
                "destination_uuid": "032ce908-4ac7-4106-8a26-71d1e467e0ad"
              }
            ]
          },
          {
            "uuid": "556bfb63-9474-4518-aeaa-c91835682975",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c76a31cc-7df9-48e9-bcbb-fa4af482a59e"
              }
            ],
            "exits": [
              {
                "uuid": "70edf8cd-6272-4194-94e7-13464312d61b",
                "destination_uuid": "032ce908-4ac7-4106-8a26-71d1e467e0ad"
              }
            ]
          },
          {
            "uuid": "032ce908-4ac7-4106-8a26-71d1e467e0ad",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c0319f8d-b6b9-486f-a339-11a6deecae35",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "09cb2ef1-f43f-4e5c-bfec-7fcbd51023ea",
                  "type": "has_only_phrase",
                  "uuid": "0fed90e4-59ce-4832-812e-bdc37a1bf3a7"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "544af65b-bde0-485e-a457-8040d8018c0c",
                  "type": "has_only_phrase",
                  "uuid": "9e125aa0-479e-480e-a967-197570f7b81a"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "494f0d9a-20f5-42eb-9295-e821b38254e3",
                  "type": "has_only_phrase",
                  "uuid": "c4f1710c-1f66-4024-8cde-aaad30d045e5"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "4589398d-921a-49ef-89bb-896aaf0b68a9",
                  "type": "has_only_phrase",
                  "uuid": "1e9f27c4-a60b-426b-92c3-774d1f7f9f80"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "bb716097-a014-4ffe-8c8d-7b76187b9895",
                  "name": "All Responses",
                  "uuid": "c0319f8d-b6b9-486f-a339-11a6deecae35"
                },
                {
                  "exit_uuid": "2ae251ca-f06a-46a6-b313-e114897808dc",
                  "name": "No",
                  "uuid": "09cb2ef1-f43f-4e5c-bfec-7fcbd51023ea"
                },
                {
                  "exit_uuid": "bfddfcaa-d8b2-4d92-8ef8-354e02e2421e",
                  "name": "Yes",
                  "uuid": "544af65b-bde0-485e-a457-8040d8018c0c"
                },
                {
                  "exit_uuid": "2a96e45e-52b0-49ea-ba47-bc1e1957cca1",
                  "name": "Yes",
                  "uuid": "494f0d9a-20f5-42eb-9295-e821b38254e3"
                },
                {
                  "exit_uuid": "a8467652-8613-4b0e-91f0-93371fdf8756",
                  "name": "Yes",
                  "uuid": "4589398d-921a-49ef-89bb-896aaf0b68a9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "bb716097-a014-4ffe-8c8d-7b76187b9895",
                "destination_uuid": null
              },
              {
                "uuid": "2ae251ca-f06a-46a6-b313-e114897808dc",
                "destination_uuid": "405743f0-4be2-4492-8dd7-f4f3e0727222"
              },
              {
                "uuid": "bfddfcaa-d8b2-4d92-8ef8-354e02e2421e",
                "destination_uuid": "41d77135-933b-4c1b-9ed8-ad94550b795b"
              },
              {
                "uuid": "2a96e45e-52b0-49ea-ba47-bc1e1957cca1",
                "destination_uuid": "41d77135-933b-4c1b-9ed8-ad94550b795b"
              },
              {
                "uuid": "a8467652-8613-4b0e-91f0-93371fdf8756",
                "destination_uuid": "41d77135-933b-4c1b-9ed8-ad94550b795b"
              }
            ]
          },
          {
            "uuid": "405743f0-4be2-4492-8dd7-f4f3e0727222",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "233fb9df-497a-4fda-a3ad-0b2797a5d48d"
              }
            ],
            "exits": [
              {
                "uuid": "d3143393-2b79-4c56-9efb-7295578c9ff8",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "41d77135-933b-4c1b-9ed8-ad94550b795b",
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
                "uuid": "c3520792-f1cf-422e-8271-86fece1bd4c5"
              }
            ],
            "exits": [
              {
                "uuid": "a744fda7-9f71-49d0-8f90-525417bc7190",
                "destination_uuid": "3c3de1e3-399b-43ae-b57c-59f5d7704235"
              }
            ]
          },
          {
            "uuid": "3c3de1e3-399b-43ae-b57c-59f5d7704235",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8463b434-e8c4-4b8a-b1fb-0cc9b883547c",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "3ed1e140-a3f2-467e-bd61-47b7c5177294",
                  "type": "has_only_phrase",
                  "uuid": "f532c37f-7782-4e82-9546-aa116196cedb"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "30ff18ee-61eb-4aa3-b577-e90710f325ce",
                  "type": "has_only_phrase",
                  "uuid": "7c48f23f-b6ca-4adc-9a87-515133919189"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "d14da446-e6a2-4e9c-bb1e-f0ece91e2f28",
                  "type": "has_only_phrase",
                  "uuid": "eaa184c5-8b30-4832-99d1-cad97a5295dd"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "6b1dd9ca-5139-4c60-b3af-da607d37fac3",
                  "type": "has_only_phrase",
                  "uuid": "2a2974c5-4ce6-47da-a6a5-898359a58464"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e61f3071-9969-4a08-878e-2245da88b727",
                  "name": "All Responses",
                  "uuid": "8463b434-e8c4-4b8a-b1fb-0cc9b883547c"
                },
                {
                  "exit_uuid": "1db8e87a-28fb-4d50-94ab-c1a0b650644d",
                  "name": "Surprised",
                  "uuid": "3ed1e140-a3f2-467e-bd61-47b7c5177294"
                },
                {
                  "exit_uuid": "22b127fb-038e-429f-a89c-6ea328e543ba",
                  "name": "Happy",
                  "uuid": "30ff18ee-61eb-4aa3-b577-e90710f325ce"
                },
                {
                  "exit_uuid": "19797336-ad57-403d-b865-9b6e814fe302",
                  "name": "My teen did not like it",
                  "uuid": "d14da446-e6a2-4e9c-bb1e-f0ece91e2f28"
                },
                {
                  "exit_uuid": "c4a916bd-916e-4737-af17-1d9a21349371",
                  "name": "I don’t know",
                  "uuid": "6b1dd9ca-5139-4c60-b3af-da607d37fac3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e61f3071-9969-4a08-878e-2245da88b727",
                "destination_uuid": null
              },
              {
                "uuid": "1db8e87a-28fb-4d50-94ab-c1a0b650644d",
                "destination_uuid": "ad74ac77-0944-4ed5-9308-5688316d9841"
              },
              {
                "uuid": "22b127fb-038e-429f-a89c-6ea328e543ba",
                "destination_uuid": "fcc473cc-ab35-42cf-a4d7-b3b1e098c4b5"
              },
              {
                "uuid": "19797336-ad57-403d-b865-9b6e814fe302",
                "destination_uuid": "f3829362-dd5a-4ca2-8e3e-b467ed19644b"
              },
              {
                "uuid": "c4a916bd-916e-4737-af17-1d9a21349371",
                "destination_uuid": "5a358c2a-e0df-4358-85b0-b6866b57a928"
              }
            ]
          },
          {
            "uuid": "ad74ac77-0944-4ed5-9308-5688316d9841",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4f3161f2-9550-4d77-925e-7cfc7686ee84"
              }
            ],
            "exits": [
              {
                "uuid": "4891540d-26e7-4832-a943-a539ed4bc26e",
                "destination_uuid": "4b889d64-83a6-4945-b2e8-ef7ed9544b8a"
              }
            ]
          },
          {
            "uuid": "fcc473cc-ab35-42cf-a4d7-b3b1e098c4b5",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "377f8721-4801-428d-b7f9-e7916932cd8f"
              }
            ],
            "exits": [
              {
                "uuid": "8f5b82d2-72fe-46e1-84f2-3102fd60190e",
                "destination_uuid": "4b889d64-83a6-4945-b2e8-ef7ed9544b8a"
              }
            ]
          },
          {
            "uuid": "f3829362-dd5a-4ca2-8e3e-b467ed19644b",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bb3211ca-3328-4325-b3ce-6a2252df20e6"
              }
            ],
            "exits": [
              {
                "uuid": "fcfe2a3d-69c7-4d2c-b227-94fd98df70eb",
                "destination_uuid": "4b889d64-83a6-4945-b2e8-ef7ed9544b8a"
              }
            ]
          },
          {
            "uuid": "5a358c2a-e0df-4358-85b0-b6866b57a928",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3c38f68e-ba07-46ff-a0ef-752ff63c8c21"
              }
            ],
            "exits": [
              {
                "uuid": "01bc4f53-b3c2-4e58-88ba-574a6e310b63",
                "destination_uuid": "4b889d64-83a6-4945-b2e8-ef7ed9544b8a"
              }
            ]
          },
          {
            "uuid": "4b889d64-83a6-4945-b2e8-ef7ed9544b8a",
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
                "uuid": "a689502a-a63c-4f88-b948-8b500665e384"
              }
            ],
            "exits": [
              {
                "uuid": "5da38b4c-6b1a-497f-b668-e7b1679d9107",
                "destination_uuid": "b5237107-e666-4881-9d9a-9d9e2d5a569e"
              }
            ]
          },
          {
            "uuid": "b5237107-e666-4881-9d9a-9d9e2d5a569e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "42b101ef-c078-4b00-91c1-5f11ec3d3e03",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "b317efa6-a3e0-4e08-af13-cfd5b737933e",
                  "type": "has_only_phrase",
                  "uuid": "ec1ad1f4-6f6d-4d87-bae5-8906f8149e63"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "b317efa6-a3e0-4e08-af13-cfd5b737933e",
                  "type": "has_only_phrase",
                  "uuid": "fb39428a-f362-4b9c-bae5-dda16384022d"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "f8e6f3f5-7fa8-4132-8569-7b2fe50ef03c",
                  "type": "has_only_phrase",
                  "uuid": "c2a40a8a-1ea6-458a-b09b-adacb15a8cff"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "f8e6f3f5-7fa8-4132-8569-7b2fe50ef03c",
                  "type": "has_only_phrase",
                  "uuid": "6c6efdc9-a623-4208-a21c-3534da5f4391"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "36ef51be-0ac0-4543-ade7-d5f2c0af2cd2",
                  "name": "All Responses",
                  "uuid": "42b101ef-c078-4b00-91c1-5f11ec3d3e03"
                },
                {
                  "exit_uuid": "e062ce7c-681a-4559-9816-1738f2c05939",
                  "name": "Every day; Almost every day",
                  "uuid": "b317efa6-a3e0-4e08-af13-cfd5b737933e"
                },
                {
                  "exit_uuid": "57d29123-b7cf-4b69-8252-aacb806356a8",
                  "name": "A few days; Never",
                  "uuid": "f8e6f3f5-7fa8-4132-8569-7b2fe50ef03c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "36ef51be-0ac0-4543-ade7-d5f2c0af2cd2",
                "destination_uuid": null
              },
              {
                "uuid": "e062ce7c-681a-4559-9816-1738f2c05939",
                "destination_uuid": "0569ec91-10e4-4e80-a617-d19a18e33d7b"
              },
              {
                "uuid": "57d29123-b7cf-4b69-8252-aacb806356a8",
                "destination_uuid": "96c0e492-cd8f-47e0-9da5-a48218fb817c"
              }
            ]
          },
          {
            "uuid": "0569ec91-10e4-4e80-a617-d19a18e33d7b",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3e91240b-104d-4d80-ac3e-e51471c3a4f2"
              }
            ],
            "exits": [
              {
                "uuid": "2751431d-5fb8-4a0f-b576-a0eff15dbffa",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "96c0e492-cd8f-47e0-9da5-a48218fb817c",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f79163a4-71e5-45da-ac39-c632bd4bd797"
              }
            ],
            "exits": [
              {
                "uuid": "0959f0a2-abdf-4ab7-88af-3078703931a1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5c651d11-938e-4b8a-9bda-6a204ce530da",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "847c5a38-d3dc-4b2f-bab0-551ec4df9543",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d67f130b-84bf-46da-9c07-c5e84c2acae3"
              }
            ],
            "exits": [
              {
                "uuid": "5eda09d0-955c-4728-ae07-6c61fd1c0be2",
                "destination_uuid": "7414ef44-8c62-4fa9-94ce-be8f0ef2a739"
              }
            ]
          },
          {
            "uuid": "7414ef44-8c62-4fa9-94ce-be8f0ef2a739",
            "actions": [
              {
                "uuid": "34f9e7a8-22b3-488e-844f-49fc25f47728",
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
                "uuid": "1fde4355-0c25-476f-b7d8-666e1d4640c6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "763437e3-531d-42d0-8f3f-be23ce07e5cb",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "923bcec6-165d-40a7-addd-149c5547a024",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "b6642fe5-8657-40d1-b8e3-a909f6f4616f"
                },
                "type": "enter_flow",
                "uuid": "1ac6308a-53df-46e0-bfd6-7df1a5e8d266"
              }
            ],
            "exits": [
              {
                "uuid": "f56c2ce0-7acc-49fe-979d-3bf47b4bd724",
                "destination_uuid": "405aa9a2-1857-4463-8407-d46f30b4fe5f"
              },
              {
                "uuid": "1a62b1cf-93f5-4d37-af8f-2e2c031468f3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "f7e76ce3-86b6-45ad-8aa4-8e296336fc88",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b5bc1597-7014-4172-9429-4875c6104867"
                },
                {
                  "uuid": "ff414006-88c7-4727-9102-b5e489d0d7eb",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2e413ae9-3080-410f-9bc9-049acc91da4d"
                }
              ],
              "categories": [
                {
                  "uuid": "b5bc1597-7014-4172-9429-4875c6104867",
                  "name": "Complete",
                  "exit_uuid": "f56c2ce0-7acc-49fe-979d-3bf47b4bd724"
                },
                {
                  "uuid": "2e413ae9-3080-410f-9bc9-049acc91da4d",
                  "name": "Expired",
                  "exit_uuid": "1a62b1cf-93f5-4d37-af8f-2e2c031468f3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b5bc1597-7014-4172-9429-4875c6104867"
            }
          },
          {
            "uuid": "405aa9a2-1857-4463-8407-d46f30b4fe5f",
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
                "uuid": "dd900b96-d738-48bd-9e27-2a528079e955"
              }
            ],
            "exits": [
              {
                "uuid": "0899efa7-93c8-47a6-8485-82c2bb9b6cdf",
                "destination_uuid": "fc9f89f9-2cce-4420-90e8-fac85a1a3c76"
              }
            ]
          },
          {
            "uuid": "fc9f89f9-2cce-4420-90e8-fac85a1a3c76",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bba13084-9b1e-48a7-92dd-50c5fa06fbbb",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "cea039a2-f5b8-41eb-b96a-d7add6f99411",
                  "type": "has_only_phrase",
                  "uuid": "7a481d94-1af8-4510-a5ed-57c35c3f0db8"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "2cef305f-44dd-4aa4-a4c1-682c99792031",
                  "type": "has_only_phrase",
                  "uuid": "df79ebb9-1896-4fee-bb53-d3bf4a4b87c7"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "1cc5482c-29e0-46c7-bb83-d63db8c9a6cf",
                  "type": "has_only_phrase",
                  "uuid": "68794fe7-8b5c-4a5f-a140-328a2ba5939f"
                },
                {
                  "arguments": [
                    "praise_activity"
                  ],
                  "category_uuid": "13bf8847-840f-40d3-824b-aad169c34949",
                  "type": "has_only_phrase",
                  "uuid": "65b92319-9067-4821-9525-904113f64c21"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7ae822f7-913c-4d35-991e-adb8c03098b9",
                  "name": "All Responses",
                  "uuid": "bba13084-9b1e-48a7-92dd-50c5fa06fbbb"
                },
                {
                  "exit_uuid": "3e2aac39-bede-4e4f-a8a3-f30c6f93e763",
                  "name": "mod_1on1_emo",
                  "uuid": "cea039a2-f5b8-41eb-b96a-d7add6f99411"
                },
                {
                  "exit_uuid": "8c32e41c-fc5f-4846-bcd7-232463b6cab3",
                  "name": "mod_1on1_activity",
                  "uuid": "2cef305f-44dd-4aa4-a4c1-682c99792031"
                },
                {
                  "exit_uuid": "0de76d20-0cc7-4c8c-adac-03be9d5c2916",
                  "name": "mod_1on1_activity_review",
                  "uuid": "1cc5482c-29e0-46c7-bb83-d63db8c9a6cf"
                },
                {
                  "exit_uuid": "78711c58-274a-4a78-83a5-a56d85c36282",
                  "name": "praise_activity",
                  "uuid": "13bf8847-840f-40d3-824b-aad169c34949"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7ae822f7-913c-4d35-991e-adb8c03098b9",
                "destination_uuid": null
              },
              {
                "uuid": "3e2aac39-bede-4e4f-a8a3-f30c6f93e763",
                "destination_uuid": "771f0531-5a87-44a7-a049-24e2d3353e37"
              },
              {
                "uuid": "8c32e41c-fc5f-4846-bcd7-232463b6cab3",
                "destination_uuid": "35c33513-7da0-41b5-a152-5b32326df4ec"
              },
              {
                "uuid": "0de76d20-0cc7-4c8c-adac-03be9d5c2916",
                "destination_uuid": "8aa46fac-9430-44be-af76-5e84ba1a174a"
              },
              {
                "uuid": "78711c58-274a-4a78-83a5-a56d85c36282",
                "destination_uuid": "3ac16bc9-9534-4a0b-ad72-eb1c3d11d76c"
              }
            ]
          },
          {
            "uuid": "771f0531-5a87-44a7-a049-24e2d3353e37",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "84847e03-ed08-4669-a49f-75691443bdd5"
                },
                "type": "enter_flow",
                "uuid": "8c9a821c-83aa-42af-b1d6-575c0f24fe6f"
              }
            ],
            "exits": [
              {
                "uuid": "4473f101-b5d3-445c-90e7-e4ed6de5e590",
                "destination_uuid": null
              },
              {
                "uuid": "dbb43a8c-d509-4864-9c6b-a7bf53f28b2c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ec023826-30d3-4a82-8f33-5d4d9611202f",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c4e276f4-973f-4f98-a1f4-82260ba4219d"
                },
                {
                  "uuid": "8dd03ce2-5c8f-4e5a-996f-bab7fdf77beb",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "95625db1-d144-493e-9d94-2f48bf156430"
                }
              ],
              "categories": [
                {
                  "uuid": "c4e276f4-973f-4f98-a1f4-82260ba4219d",
                  "name": "Complete",
                  "exit_uuid": "4473f101-b5d3-445c-90e7-e4ed6de5e590"
                },
                {
                  "uuid": "95625db1-d144-493e-9d94-2f48bf156430",
                  "name": "Expired",
                  "exit_uuid": "dbb43a8c-d509-4864-9c6b-a7bf53f28b2c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c4e276f4-973f-4f98-a1f4-82260ba4219d"
            }
          },
          {
            "uuid": "35c33513-7da0-41b5-a152-5b32326df4ec",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "528198bc-398f-4225-aba1-bd52f3a52775"
                },
                "type": "enter_flow",
                "uuid": "18a8534a-c62c-4fbc-bbbc-6435be3538d5"
              }
            ],
            "exits": [
              {
                "uuid": "0c7a64dd-3f8a-41a0-939b-5089a0611c42",
                "destination_uuid": null
              },
              {
                "uuid": "f57af69e-ce61-43fc-9d59-9036af8c88a6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "494fd5e6-6d89-449d-a379-ec9f83c7f7cb",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4606d87f-b1c0-426d-9cc9-e1f47afc4d31"
                },
                {
                  "uuid": "901507fb-e61d-4396-ac0b-4b4dbdc45b96",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "7c0e4547-ce58-4983-82d9-2dbd3e17eeed"
                }
              ],
              "categories": [
                {
                  "uuid": "4606d87f-b1c0-426d-9cc9-e1f47afc4d31",
                  "name": "Complete",
                  "exit_uuid": "0c7a64dd-3f8a-41a0-939b-5089a0611c42"
                },
                {
                  "uuid": "7c0e4547-ce58-4983-82d9-2dbd3e17eeed",
                  "name": "Expired",
                  "exit_uuid": "f57af69e-ce61-43fc-9d59-9036af8c88a6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4606d87f-b1c0-426d-9cc9-e1f47afc4d31"
            }
          },
          {
            "uuid": "8aa46fac-9430-44be-af76-5e84ba1a174a",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "a9c8a1d2-ffc0-4323-8eea-f90e652811c6"
                },
                "type": "enter_flow",
                "uuid": "e42dec8b-aa51-4feb-81d6-0bfe5e7f0932"
              }
            ],
            "exits": [
              {
                "uuid": "76861a02-6c8d-4299-a8fb-753cdd5ed4ce",
                "destination_uuid": null
              },
              {
                "uuid": "8e08a85e-5eee-447a-8df8-00e777aa6c2a",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c3df705e-9ee5-4250-931f-9e453980b9e4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "5f6363f1-d42e-42e4-9d07-3ee68ac7c4fe"
                },
                {
                  "uuid": "053fe6e0-8b89-4614-b2a2-9d8bc4a97766",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "67da3456-a00d-4c84-b073-c153ca15af91"
                }
              ],
              "categories": [
                {
                  "uuid": "5f6363f1-d42e-42e4-9d07-3ee68ac7c4fe",
                  "name": "Complete",
                  "exit_uuid": "76861a02-6c8d-4299-a8fb-753cdd5ed4ce"
                },
                {
                  "uuid": "67da3456-a00d-4c84-b073-c153ca15af91",
                  "name": "Expired",
                  "exit_uuid": "8e08a85e-5eee-447a-8df8-00e777aa6c2a"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "5f6363f1-d42e-42e4-9d07-3ee68ac7c4fe"
            }
          },
          {
            "uuid": "3ac16bc9-9534-4a0b-ad72-eb1c3d11d76c",
            "actions": [
              {
                "flow": {
                  "name": "praise_activity",
                  "uuid": "03be20af-baac-4000-8a26-0a7d5849e512"
                },
                "type": "enter_flow",
                "uuid": "6d013fe5-5650-4cf1-ac62-b6c7ebc56ad4"
              }
            ],
            "exits": [
              {
                "uuid": "e5b0e1e1-397e-41e8-b00c-08baae49696f",
                "destination_uuid": null
              },
              {
                "uuid": "0bc8019d-5862-48ec-8eb3-1a4a0457905d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7845ac1d-b535-44fc-b354-28078140ab47",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "89668609-1ae8-4a9a-bc7b-747e9027662b"
                },
                {
                  "uuid": "7372e05b-c38b-45a4-bf64-a37312f56a83",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "11d46dda-e711-4af2-9d32-aa7ecdbcec7d"
                }
              ],
              "categories": [
                {
                  "uuid": "89668609-1ae8-4a9a-bc7b-747e9027662b",
                  "name": "Complete",
                  "exit_uuid": "e5b0e1e1-397e-41e8-b00c-08baae49696f"
                },
                {
                  "uuid": "11d46dda-e711-4af2-9d32-aa7ecdbcec7d",
                  "name": "Expired",
                  "exit_uuid": "0bc8019d-5862-48ec-8eb3-1a4a0457905d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "89668609-1ae8-4a9a-bc7b-747e9027662b"
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
        "uuid": "cca211a3-ad51-4de0-82a8-43e724df3e86",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "21c48fd5-0dda-4520-9dc9-70869708f79a",
            "actions": [
              {
                "uuid": "a253b509-fb38-4a27-a9d5-f2aba74ee8f1",
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
                "uuid": "4cdf443e-8371-48d7-ade8-f0c8d281dc12",
                "destination_uuid": "47ebec9f-dfb4-43b0-b8f0-6c5ef2c7f84a"
              }
            ]
          },
          {
            "uuid": "47ebec9f-dfb4-43b0-b8f0-6c5ef2c7f84a",
            "actions": [
              {
                "uuid": "291d7730-eb70-4b9a-8cf8-7e838e1d0d72",
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
                "uuid": "e2ed0c01-bc40-443e-a698-98a061e4b978",
                "destination_uuid": "43ce0986-4f88-4eff-85b0-56632bf00656"
              }
            ]
          },
          {
            "uuid": "43ce0986-4f88-4eff-85b0-56632bf00656",
            "actions": [
              {
                "uuid": "84462ae6-f4ea-4165-b94e-08454b615291",
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
                "uuid": "76ad8c51-1d90-4f00-9050-e15c57bc071c",
                "destination_uuid": "1f2958a0-eff1-4a3b-94ca-e6045a45afff"
              }
            ]
          },
          {
            "uuid": "1f2958a0-eff1-4a3b-94ca-e6045a45afff",
            "actions": [
              {
                "uuid": "c9e55461-3dda-49fc-ac8c-a31a8c8f48ca",
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
                "uuid": "44e2e446-cdb8-4599-845f-527f210c3d11",
                "destination_uuid": "1aa18daf-1ab8-4885-91da-db10acb2a2ef"
              }
            ]
          },
          {
            "uuid": "1aa18daf-1ab8-4885-91da-db10acb2a2ef",
            "actions": [
              {
                "uuid": "30d924bf-c4f6-4a1f-adf3-c46280fc36e8",
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
                "uuid": "0793ccd8-f322-4bd3-bc7a-163eba2a7e55",
                "destination_uuid": "1ce959d1-c3e1-40a0-b768-defeaeebe496"
              }
            ]
          },
          {
            "uuid": "1ce959d1-c3e1-40a0-b768-defeaeebe496",
            "actions": [
              {
                "uuid": "49fd0a7c-1052-42a9-9673-f498c6744eda",
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
                "uuid": "1968eeb2-af0b-47c6-91b0-9a85e0dc1b9b",
                "destination_uuid": "e89fe581-17e4-4c9c-9ee8-3bc150064f9f"
              }
            ]
          },
          {
            "uuid": "e89fe581-17e4-4c9c-9ee8-3bc150064f9f",
            "actions": [
              {
                "uuid": "bedcd09d-3d58-4d66-bb2d-dd8ec383cd56",
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
                "uuid": "c067c051-de72-4a2f-81db-960586aac7a3",
                "destination_uuid": "9bf01de3-ce71-4707-afac-1479967ed24c"
              }
            ]
          },
          {
            "uuid": "9bf01de3-ce71-4707-afac-1479967ed24c",
            "actions": [
              {
                "uuid": "6442fdb6-8c67-4f40-bbc4-2918f84e373d",
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
                "uuid": "5b1d08a4-d351-4bf8-b8a8-76e210528e65",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b8cb1e6e-6401-40e8-9c17-040708bd057f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5362083b-a9e8-41c0-b584-c6be8905d648",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2042492e-d09a-430d-8944-7d0116b92ea5"
              }
            ],
            "exits": [
              {
                "uuid": "79cf9a5e-b160-4bf7-8b01-1eb80130ad11",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ebce2b55-626e-4cec-bd36-af6ca8de1a93",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a1ec2728-b15d-4896-9a60-c3b19eb4bb0f",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3ad4c3b0-dbc0-4547-874c-10c1a40f6ff1"
              }
            ],
            "exits": [
              {
                "uuid": "a2a29860-b8c0-431e-bcb0-aac75ecb53a2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b1cd46f4-2225-499c-b3a5-080d7b5cc56e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "aacaccab-a6cd-4c0d-9b05-9ead3e64091d",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b23e4b94-81d7-43da-a9ab-61f62be8d466"
              }
            ],
            "exits": [
              {
                "uuid": "2f9014f1-71ee-4407-8f42-069cc048ebf7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e51b8f75-0ce7-49e9-8714-ad4cdf648c39",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3d02bfd3-db31-45a2-8624-51f6ca27745b",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "432dd0d7-ecad-41a4-87cb-462118c85e74"
              }
            ],
            "exits": [
              {
                "uuid": "71d349e0-da6b-4746-9cd1-13af9c4ec03d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b917094c-6af7-4590-b338-5140f2e67b88",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f896f581-fd5e-4656-90a6-4e56cb4dcbbf",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "20b63db7-6bc9-4dc4-a1a8-b14ff99a8f3a"
              }
            ],
            "exits": [
              {
                "uuid": "9c0d8ede-df6c-46de-ab5a-9f1191af4acc",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "807ac2d7-e593-4316-856d-e82218bf887a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "72f4f47b-ecde-4650-b495-1fa1a549e102",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4a2655ab-c808-40d0-ab69-d73d0c65f0be"
              }
            ],
            "exits": [
              {
                "uuid": "cfe8c409-86e3-48ac-95fd-d2a9c330590f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ee0e5e92-e4ad-4433-afaa-45b5ba35339d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "46f8633c-793f-4935-b4e3-1f2433ea7f17",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ed8dafff-2fd2-4dc3-8eb6-266df3bb6370"
              }
            ],
            "exits": [
              {
                "uuid": "d2d1b1f2-0b4e-4131-bf54-b39f5292e9da",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d93466d3-212d-48b1-9284-71332a22a97f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7f5b47aa-a443-4eab-9128-8804026d83db",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "13977e15-8b60-4a7b-82ff-73476db68916"
              }
            ],
            "exits": [
              {
                "uuid": "360e5f2a-b22a-4c72-91ba-493f793e154d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "02996f67-9536-4237-babb-64f819e5cf5b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5ae66979-6d98-450b-995b-ec42516c310b",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "25f14860-5d32-4dc0-8848-c93af1a863f8"
              }
            ],
            "exits": [
              {
                "uuid": "56c0b2d8-fc21-4cf5-bd43-f91ae74f44fa",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c5ad5b21-57dc-4e7f-bd50-0bf02042d502",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "38034316-c770-47fd-8b6f-500c87404738",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "67daeaab-558a-4041-8d27-061a50acdb46"
              }
            ],
            "exits": [
              {
                "uuid": "2c771eba-e9a0-4abb-a953-67f270d0aa3e",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6b8e7750-be8a-4d92-89a7-f78124d15814",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "af1e1c4e-d93d-461c-941c-9d38d39820a9",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a1b3f954-af67-4d3b-b4c3-5c3fb19a6018"
              }
            ],
            "exits": [
              {
                "uuid": "5c0211b9-6e2b-4e6d-9649-5107b9603e64",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "45e87e70-9db8-49b1-b4e7-e51ecf6fcd3e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "aac0008c-0e5e-458e-a97a-6cb4be807cb6",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cb9f7a04-173c-4267-9965-b2055eb11102"
              }
            ],
            "exits": [
              {
                "uuid": "0a09e1e9-dc62-46fb-bbbe-c07ad2466fdf",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "be921ca5-ae36-4b1b-8b2e-7de424f9e2ac",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d63ccd81-40f9-4975-8b51-b8ad1eb263eb",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "96df560d-aa90-4027-993b-902c66b31b76"
              }
            ],
            "exits": [
              {
                "uuid": "cb25136e-a745-4ddb-b24e-0a117e0824f7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e89b1736-af4a-42be-b793-1a8f852a9238",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "188e25aa-aed2-4f4b-87e0-4f6335fa2052",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "90617386-48ea-437b-a433-074c271c941a"
              }
            ],
            "exits": [
              {
                "uuid": "35e4b665-b99b-4948-a073-492be9bd2fae",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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