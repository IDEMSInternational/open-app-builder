/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const conversation: FlowTypes.Conversation[] = [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "b5088e15-5de9-4aa9-8eb3-b5b28aa599b9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "956d987b-702e-4380-8ba6-07e846221eef",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "769e8463-03d5-4d28-93d2-8499d0cc9a71"
              }
            ],
            "exits": [
              {
                "uuid": "50a2ea7a-ae31-42ea-b6ae-dc7b53fba6e6",
                "destination_uuid": "69197f84-e598-47a7-ad03-90d4188907df"
              }
            ]
          },
          {
            "uuid": "69197f84-e598-47a7-ad03-90d4188907df",
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
                "uuid": "96b45009-cfbc-4b45-aa39-d9c5d3eeeb3a"
              }
            ],
            "exits": [
              {
                "uuid": "1f3b3b95-a64e-4cda-b988-a390fbead41b",
                "destination_uuid": "6ecbc858-2ab0-4352-9499-01d21f9f2be3"
              }
            ]
          },
          {
            "uuid": "6ecbc858-2ab0-4352-9499-01d21f9f2be3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d45be56e-3579-4ed7-91e0-bf18ad8a2e01",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "5859d0a8-1340-4e40-a921-9629a88b3129",
                  "type": "has_only_phrase",
                  "uuid": "c2b1b6b5-0bd0-45ea-a809-44276b28c200"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "a2ba95d8-e764-49e4-aaac-8c8a83b913a0",
                  "type": "has_only_phrase",
                  "uuid": "61e55b42-1833-4a7c-a103-a9d38f7125b3"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "d00c17a3-a157-4066-9e67-6181626f27d2",
                  "type": "has_only_phrase",
                  "uuid": "d99d8b42-546b-4119-b0c6-b353203adc8f"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "d134134a-530f-4186-b9b1-31879e7451fa",
                  "type": "has_only_phrase",
                  "uuid": "2d22f4f2-8c2a-4eab-a417-7c35ef7c89dd"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "b3ec0720-e9a2-458c-a154-40dbb7c095ad",
                  "type": "has_only_phrase",
                  "uuid": "d2ba4e70-9190-44e1-a272-eb6966b9c628"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a0de0936-e505-41f4-ac41-02bf4af3d6ea",
                  "name": "All Responses",
                  "uuid": "d45be56e-3579-4ed7-91e0-bf18ad8a2e01"
                },
                {
                  "exit_uuid": "137e5d6c-ea4d-489b-96b5-1911b429d00a",
                  "name": "First option: launch example_media flow",
                  "uuid": "5859d0a8-1340-4e40-a921-9629a88b3129"
                },
                {
                  "exit_uuid": "376ac1d7-44a1-4bb5-be24-0ae72f8ac22f",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "a2ba95d8-e764-49e4-aaac-8c8a83b913a0"
                },
                {
                  "exit_uuid": "19350283-a93f-429a-a19b-1642a47ebb50",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "d00c17a3-a157-4066-9e67-6181626f27d2"
                },
                {
                  "exit_uuid": "3fbd7aea-36ed-40f7-af57-53f0d658d02f",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "d134134a-530f-4186-b9b1-31879e7451fa"
                },
                {
                  "exit_uuid": "42c17920-9423-4526-9883-78372c63fed9",
                  "name": "Stay in this flow.",
                  "uuid": "b3ec0720-e9a2-458c-a154-40dbb7c095ad"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a0de0936-e505-41f4-ac41-02bf4af3d6ea",
                "destination_uuid": null
              },
              {
                "uuid": "137e5d6c-ea4d-489b-96b5-1911b429d00a",
                "destination_uuid": "1b566583-72ed-44e8-b21a-908a2a9bb899"
              },
              {
                "uuid": "376ac1d7-44a1-4bb5-be24-0ae72f8ac22f",
                "destination_uuid": "80fed27f-8d20-4d1a-ba74-7c488b155324"
              },
              {
                "uuid": "19350283-a93f-429a-a19b-1642a47ebb50",
                "destination_uuid": "0757f129-c507-4abb-8023-f712bbb3275a"
              },
              {
                "uuid": "3fbd7aea-36ed-40f7-af57-53f0d658d02f",
                "destination_uuid": "b9d836fe-4076-41b3-a8b6-b19418a0d1a0"
              },
              {
                "uuid": "42c17920-9423-4526-9883-78372c63fed9",
                "destination_uuid": "59e3c796-a7d2-4e9c-9783-6e5c29d28619"
              }
            ]
          },
          {
            "uuid": "1b566583-72ed-44e8-b21a-908a2a9bb899",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "6a465d6a-45fa-4ebe-8a3a-c7745e796d92"
                },
                "type": "enter_flow",
                "uuid": "b18061ca-f1b9-44d4-b65c-8c3bf5265cf8"
              }
            ],
            "exits": [
              {
                "uuid": "9cd698aa-2426-4ba1-b585-6fd40c741f37",
                "destination_uuid": "36e03146-2ba3-4e80-b713-56899ca111a6"
              },
              {
                "uuid": "bfc6e204-0418-48e8-80b5-ee9ffaeff52b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "68cfa4f3-a7ed-414d-9b63-7db44b3cfbe2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "26281a65-0d2b-46cb-aaae-509a4d8f72f1"
                },
                {
                  "uuid": "16298ccb-70f4-4dce-b2f7-70174b989332",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "7f8136f8-e08e-4f16-889e-28c1d366e8d8"
                }
              ],
              "categories": [
                {
                  "uuid": "26281a65-0d2b-46cb-aaae-509a4d8f72f1",
                  "name": "Complete",
                  "exit_uuid": "9cd698aa-2426-4ba1-b585-6fd40c741f37"
                },
                {
                  "uuid": "7f8136f8-e08e-4f16-889e-28c1d366e8d8",
                  "name": "Expired",
                  "exit_uuid": "bfc6e204-0418-48e8-80b5-ee9ffaeff52b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "26281a65-0d2b-46cb-aaae-509a4d8f72f1"
            }
          },
          {
            "uuid": "80fed27f-8d20-4d1a-ba74-7c488b155324",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "c6ff98e1-27f3-4668-b547-a6481a9401c0"
                },
                "type": "enter_flow",
                "uuid": "881891a6-3872-4980-b348-06c44479dc29"
              }
            ],
            "exits": [
              {
                "uuid": "8028ec17-17a0-4a17-84c2-956309f1c680",
                "destination_uuid": "36e03146-2ba3-4e80-b713-56899ca111a6"
              },
              {
                "uuid": "c4bda874-e9a8-414f-8ab3-7653c7aaafc7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c004cb37-c3f8-41f1-8b87-a7c9464b2435",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c09d23ed-b8cf-4d3d-949e-c50c8fcc530f"
                },
                {
                  "uuid": "3adf0a58-4cbf-4c75-b6a9-eac367aaafe4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "8bf6dccf-6dd5-4386-b0db-2cd649911b2d"
                }
              ],
              "categories": [
                {
                  "uuid": "c09d23ed-b8cf-4d3d-949e-c50c8fcc530f",
                  "name": "Complete",
                  "exit_uuid": "8028ec17-17a0-4a17-84c2-956309f1c680"
                },
                {
                  "uuid": "8bf6dccf-6dd5-4386-b0db-2cd649911b2d",
                  "name": "Expired",
                  "exit_uuid": "c4bda874-e9a8-414f-8ab3-7653c7aaafc7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c09d23ed-b8cf-4d3d-949e-c50c8fcc530f"
            }
          },
          {
            "uuid": "0757f129-c507-4abb-8023-f712bbb3275a",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "affd5768-e118-4eac-9a6c-5bd8bcf8af0a"
                },
                "type": "enter_flow",
                "uuid": "21bdf525-5cf8-4b7b-84ae-c658118e23e2"
              }
            ],
            "exits": [
              {
                "uuid": "b898f958-e558-406a-ae61-91e1eef9125f",
                "destination_uuid": "36e03146-2ba3-4e80-b713-56899ca111a6"
              },
              {
                "uuid": "8247f7cb-5867-4a88-b211-b678c33474f6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1d432e40-bb9b-40d3-aaf5-eb9dad9ddd59",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f8503533-9111-4750-88a4-7f89e8e1a454"
                },
                {
                  "uuid": "06f41e2a-7c49-4e4a-9341-a5b8af0d7183",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d75f2daa-df8c-461e-9b1e-9f78431b9db8"
                }
              ],
              "categories": [
                {
                  "uuid": "f8503533-9111-4750-88a4-7f89e8e1a454",
                  "name": "Complete",
                  "exit_uuid": "b898f958-e558-406a-ae61-91e1eef9125f"
                },
                {
                  "uuid": "d75f2daa-df8c-461e-9b1e-9f78431b9db8",
                  "name": "Expired",
                  "exit_uuid": "8247f7cb-5867-4a88-b211-b678c33474f6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f8503533-9111-4750-88a4-7f89e8e1a454"
            }
          },
          {
            "uuid": "b9d836fe-4076-41b3-a8b6-b19418a0d1a0",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "ae9ddaf6-8062-4591-87e1-3d538da7b8bf"
                },
                "type": "enter_flow",
                "uuid": "49571a12-9632-4323-92d0-ee4b485a2fa3"
              }
            ],
            "exits": [
              {
                "uuid": "21b3737f-0b9a-43f1-a00a-ea6c8fac4b42",
                "destination_uuid": "36e03146-2ba3-4e80-b713-56899ca111a6"
              },
              {
                "uuid": "95ee28df-e65a-4c0a-8f9d-a99ed19c9d00",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "790ff6e9-0cd0-4757-8c5d-efe79f441ed7",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "6813552b-bef9-4204-8d19-ffded414449b"
                },
                {
                  "uuid": "aac92a5b-f04c-423c-9d35-331f62d76dd5",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f6aecf4b-d301-48ae-a4d9-74347403fdf9"
                }
              ],
              "categories": [
                {
                  "uuid": "6813552b-bef9-4204-8d19-ffded414449b",
                  "name": "Complete",
                  "exit_uuid": "21b3737f-0b9a-43f1-a00a-ea6c8fac4b42"
                },
                {
                  "uuid": "f6aecf4b-d301-48ae-a4d9-74347403fdf9",
                  "name": "Expired",
                  "exit_uuid": "95ee28df-e65a-4c0a-8f9d-a99ed19c9d00"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "6813552b-bef9-4204-8d19-ffded414449b"
            }
          },
          {
            "uuid": "59e3c796-a7d2-4e9c-9783-6e5c29d28619",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8b158589-9a5b-4030-91ba-e2b5486c8484"
              }
            ],
            "exits": [
              {
                "uuid": "e445767a-20c9-447b-a657-4d3638fc9d62",
                "destination_uuid": "8ebba30f-fcdf-490c-b8e9-d525236a7c0b"
              }
            ]
          },
          {
            "uuid": "36e03146-2ba3-4e80-b713-56899ca111a6",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0e648373-cc36-4dd4-8ee9-4c1701731afd"
              }
            ],
            "exits": [
              {
                "uuid": "b94b42ab-21dd-4de6-9d45-20119c9206aa",
                "destination_uuid": "8ebba30f-fcdf-490c-b8e9-d525236a7c0b"
              }
            ]
          },
          {
            "uuid": "8ebba30f-fcdf-490c-b8e9-d525236a7c0b",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "4eb92fe4-a30a-4f69-a489-f923b6e1809b"
              }
            ],
            "exits": [
              {
                "uuid": "15b13913-18f2-4779-9cb3-379500af351c",
                "destination_uuid": "50b40f88-04b6-472f-b396-79c5ada716fc"
              }
            ]
          },
          {
            "uuid": "50b40f88-04b6-472f-b396-79c5ada716fc",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "38736322-bd44-45e8-b8df-25bbf9acc10d",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "802ff7d3-5543-450b-8afe-55928561f92e",
                  "type": "has_only_phrase",
                  "uuid": "b5c8ed87-dd04-4c96-888a-ceda830d7d0c"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "466b7cbf-9dd1-4526-b8a8-c4dfeaa6d176",
                  "type": "has_only_phrase",
                  "uuid": "1d4e51c5-4877-410b-9278-d9d735a7299d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ae5b40ac-edc4-4de1-9809-85eea43f5dc9",
                  "name": "All Responses",
                  "uuid": "38736322-bd44-45e8-b8df-25bbf9acc10d"
                },
                {
                  "exit_uuid": "a7974740-6d46-4d85-a235-1a1ceb58d20b",
                  "name": "Yes",
                  "uuid": "802ff7d3-5543-450b-8afe-55928561f92e"
                },
                {
                  "exit_uuid": "3598af29-c51c-45af-87c2-f61fa20d0297",
                  "name": "No",
                  "uuid": "466b7cbf-9dd1-4526-b8a8-c4dfeaa6d176"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ae5b40ac-edc4-4de1-9809-85eea43f5dc9",
                "destination_uuid": null
              },
              {
                "uuid": "a7974740-6d46-4d85-a235-1a1ceb58d20b",
                "destination_uuid": "69197f84-e598-47a7-ad03-90d4188907df"
              },
              {
                "uuid": "3598af29-c51c-45af-87c2-f61fa20d0297",
                "destination_uuid": "db04cb0b-cfe2-4118-9c32-0f5d4d9994d8"
              }
            ]
          },
          {
            "uuid": "db04cb0b-cfe2-4118-9c32-0f5d4d9994d8",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e2438534-211d-4db1-944b-9ad018ab1c1a"
              }
            ],
            "exits": [
              {
                "uuid": "fdcac862-34bb-46f0-a616-864f3d99e245",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "440bc419-f010-4bee-8c2c-f3e2edaca231",
            "actions": [
              {
                "uuid": "a2c621cf-6d97-4cef-8c5b-6bd3f34c4382",
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
                "uuid": "340d4254-6ff5-41fc-8ec8-6751d3e5532d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "20313821-0aaf-45fd-b1e7-180e932f7e8f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1886ba6d-275c-4bf2-bb39-362c4756ffd5",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7c1aaafa-923f-4b85-8b24-530fabed8dd0"
              }
            ],
            "exits": [
              {
                "uuid": "dbae7b10-1ff5-4d86-bb94-0ed7464494e4",
                "destination_uuid": "b23febba-3e12-43ad-8863-d90a1a6e0d38"
              }
            ]
          },
          {
            "uuid": "a6ca4643-4b2f-4601-b0f1-283cf494fe40",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "62a6c628-744d-4230-b39f-87c4f3edd6ab"
              }
            ],
            "exits": [
              {
                "uuid": "1565f1bd-d92c-4647-9d97-e4ba04162c52",
                "destination_uuid": "f7f43310-6031-4ceb-9df7-67be62d5efd4"
              }
            ]
          },
          {
            "uuid": "f7f43310-6031-4ceb-9df7-67be62d5efd4",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "7d39bebb-7e52-4c1d-ad6b-e0efdfde029e"
              }
            ],
            "exits": [
              {
                "uuid": "ba055c38-54a1-4d24-adf7-5e5c8a6e304d",
                "destination_uuid": "10fa422f-e207-4202-adc6-0a730cb19c4f"
              }
            ]
          },
          {
            "uuid": "10fa422f-e207-4202-adc6-0a730cb19c4f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0bf888ae-341c-4a5a-8729-1072c3ddc5f0",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "0d048336-a8ff-4297-8ab4-a9da8343405a",
                  "type": "has_only_phrase",
                  "uuid": "7f88d308-e7f8-48a6-899d-7aad984dc96a"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "0d048336-a8ff-4297-8ab4-a9da8343405a",
                  "type": "has_only_phrase",
                  "uuid": "f5c68584-83fb-4a56-ac1f-34c1bc9c6125"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "baf9b08f-5018-4d67-9714-74688eec439a",
                  "name": "All Responses",
                  "uuid": "0bf888ae-341c-4a5a-8729-1072c3ddc5f0"
                },
                {
                  "exit_uuid": "fa82539e-f34a-4a42-b8c7-4edaba27ab85",
                  "name": "image1; image2",
                  "uuid": "0d048336-a8ff-4297-8ab4-a9da8343405a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "baf9b08f-5018-4d67-9714-74688eec439a",
                "destination_uuid": null
              },
              {
                "uuid": "fa82539e-f34a-4a42-b8c7-4edaba27ab85",
                "destination_uuid": "bbda83b0-7bf0-4851-bc76-ffeacc0cc784"
              }
            ]
          },
          {
            "uuid": "bbda83b0-7bf0-4851-bc76-ffeacc0cc784",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "6fb0687f-6c37-49f3-a51d-100189d85428"
              }
            ],
            "exits": [
              {
                "uuid": "21e8f5ab-3397-46c2-84b1-b5045f06f38e",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b23febba-3e12-43ad-8863-d90a1a6e0d38",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9c7e3a4b-28fc-400a-b748-3dd4467f1d94",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "33a59de5-d9f0-4b4f-9db4-65df0ed2ec8c",
                  "type": "has_only_phrase",
                  "uuid": "d598c6ef-3bd6-4994-b8cc-98fe3dfc3b06"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "33a59de5-d9f0-4b4f-9db4-65df0ed2ec8c",
                  "type": "has_only_phrase",
                  "uuid": "f979151e-efd2-4bc2-b849-af28baf25df2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b63c4859-6d81-44e4-b66d-6330316c6926",
                  "name": "All Responses",
                  "uuid": "9c7e3a4b-28fc-400a-b748-3dd4467f1d94"
                },
                {
                  "exit_uuid": "3390a6b8-4f0b-410a-b007-1f9404c1d679",
                  "name": "image1; image2",
                  "uuid": "33a59de5-d9f0-4b4f-9db4-65df0ed2ec8c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b63c4859-6d81-44e4-b66d-6330316c6926",
                "destination_uuid": "a6ca4643-4b2f-4601-b0f1-283cf494fe40"
              },
              {
                "uuid": "3390a6b8-4f0b-410a-b007-1f9404c1d679",
                "destination_uuid": "cd7f3504-0fa6-490b-ab64-b5e81d421bcf"
              }
            ]
          },
          {
            "uuid": "cd7f3504-0fa6-490b-ab64-b5e81d421bcf",
            "actions": [
              {
                "uuid": "fab97f9e-16c7-4db8-98e0-56fd8de45132",
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
                "uuid": "b5ffaea0-55b3-443a-b8f9-fc80b8e4a07c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b24cc26d-3205-40a2-99b3-4d297485b643",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "75c94f71-7b82-4f6c-8a5e-d5826de05d8f",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "157a41c7-e639-47c6-9c09-5def1d468c9d"
              }
            ],
            "exits": [
              {
                "uuid": "9065c352-5e69-42a3-862b-a59554b62f5b",
                "destination_uuid": "6bc5320e-91d3-429a-b567-3a578ee9f572"
              }
            ]
          },
          {
            "uuid": "6bc5320e-91d3-429a-b567-3a578ee9f572",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "deeafda7-5742-4921-bd4b-64d3c894a335",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "28990c47-26d5-4359-9810-4aaacbc4eaec",
                  "type": "has_only_phrase",
                  "uuid": "607f4981-c3b8-4385-af48-0480fa32c5d0"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "92a8e50b-4ead-428e-8047-015e7f94420b",
                  "type": "has_only_phrase",
                  "uuid": "e82f8297-0586-43fd-a34d-1c1fd9016fd9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b11bb266-212e-4359-b2b6-428ef8a56cd4",
                  "name": "All Responses",
                  "uuid": "deeafda7-5742-4921-bd4b-64d3c894a335"
                },
                {
                  "exit_uuid": "b89c8e39-a26b-4ef4-86d8-d8ee4d16d6cc",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "28990c47-26d5-4359-9810-4aaacbc4eaec"
                },
                {
                  "exit_uuid": "cfcb1672-6ff5-4974-a8d6-094f13ef7d8b",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "92a8e50b-4ead-428e-8047-015e7f94420b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b11bb266-212e-4359-b2b6-428ef8a56cd4",
                "destination_uuid": null
              },
              {
                "uuid": "b89c8e39-a26b-4ef4-86d8-d8ee4d16d6cc",
                "destination_uuid": "c1eee9fc-2672-4e3f-863c-40ac98cd994c"
              },
              {
                "uuid": "cfcb1672-6ff5-4974-a8d6-094f13ef7d8b",
                "destination_uuid": "923f7207-c588-4d66-a13b-58ae48045ecf"
              }
            ]
          },
          {
            "uuid": "c1eee9fc-2672-4e3f-863c-40ac98cd994c",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "bf3ef06a-63cd-43b5-bbb3-b5e1c94a140f"
              }
            ],
            "exits": [
              {
                "uuid": "c51d5e2c-d0ea-4ede-acaa-278e5298d8ae",
                "destination_uuid": "2d846be6-9d0e-4eef-8087-1c398097e6ef"
              }
            ]
          },
          {
            "uuid": "923f7207-c588-4d66-a13b-58ae48045ecf",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "57d8cdfb-4514-4b51-be62-737a72bcf83c"
              }
            ],
            "exits": [
              {
                "uuid": "91a2e5b7-59fd-46a7-ae73-4e6b6238ccc2",
                "destination_uuid": "2d846be6-9d0e-4eef-8087-1c398097e6ef"
              }
            ]
          },
          {
            "uuid": "2d846be6-9d0e-4eef-8087-1c398097e6ef",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2e70f2e5-65ed-401c-95ff-dab5481ac7d9",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "bf731688-777a-4d29-9e5e-ae68390ef059",
                  "type": "has_only_phrase",
                  "uuid": "e80702b5-a999-4141-a77f-8aa355e7dda3"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "b663a768-08a8-4820-8e8e-e322d888aeff",
                  "type": "has_only_phrase",
                  "uuid": "98eb579b-a87a-49b3-958a-e8eafa96936b"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "6eb01074-8e40-44d6-bdeb-7daa8ab7f979",
                  "type": "has_only_phrase",
                  "uuid": "b0187a0c-4f98-4567-b205-60b53bbb5399"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cc25cfbd-ad57-49f2-8283-ebc161beef12",
                  "name": "All Responses",
                  "uuid": "2e70f2e5-65ed-401c-95ff-dab5481ac7d9"
                },
                {
                  "exit_uuid": "a66d8276-d14e-4f73-8e5f-fe50b87ed236",
                  "name": "Hello",
                  "uuid": "bf731688-777a-4d29-9e5e-ae68390ef059"
                },
                {
                  "exit_uuid": "6d1db67a-658e-4f87-a705-44b8f69afd63",
                  "name": "Goodbye",
                  "uuid": "b663a768-08a8-4820-8e8e-e322d888aeff"
                },
                {
                  "exit_uuid": "559be620-6d6e-4705-a6a3-f2e078e2c345",
                  "name": "Goodbye",
                  "uuid": "6eb01074-8e40-44d6-bdeb-7daa8ab7f979"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cc25cfbd-ad57-49f2-8283-ebc161beef12",
                "destination_uuid": null
              },
              {
                "uuid": "a66d8276-d14e-4f73-8e5f-fe50b87ed236",
                "destination_uuid": "dedc3d85-83f4-4e29-9335-b8d84d3aad15"
              },
              {
                "uuid": "6d1db67a-658e-4f87-a705-44b8f69afd63",
                "destination_uuid": "9a071661-47db-42ac-a79d-c7eaf960efad"
              },
              {
                "uuid": "559be620-6d6e-4705-a6a3-f2e078e2c345",
                "destination_uuid": "9a071661-47db-42ac-a79d-c7eaf960efad"
              }
            ]
          },
          {
            "uuid": "dedc3d85-83f4-4e29-9335-b8d84d3aad15",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "689ba2fb-ac42-48a1-b4bd-e95a416af337"
              }
            ],
            "exits": [
              {
                "uuid": "e094dc09-dab3-4ae4-b053-4318a2729853",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "9a071661-47db-42ac-a79d-c7eaf960efad",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9bd9e238-8e5c-4beb-856d-278b4867b371"
              }
            ],
            "exits": [
              {
                "uuid": "2cc3ee8e-72d0-41b4-9714-5a69330ba183",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "46725ef8-30e0-4110-bf3b-92f7f17fee24",
            "actions": [
              {
                "uuid": "ccd33653-55de-49d6-b2ae-3b2efe614d6e",
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
                "uuid": "ccd56b9d-f22b-4656-a450-4bb297068837",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8302e6c3-444a-42f1-bd38-b9ceebc1994a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4779270c-68cc-49f4-bee1-99ef1618e5e6",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "12d2ea1a-25d2-444c-8b2a-fa08425c88be"
              }
            ],
            "exits": [
              {
                "uuid": "b27f526a-9500-4916-8993-86f3446613fa",
                "destination_uuid": "7b40d473-1705-4ff6-bd48-5c41da514d50"
              }
            ]
          },
          {
            "uuid": "7b40d473-1705-4ff6-bd48-5c41da514d50",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "461e64d3-79d4-410d-84c8-6b39f78f22f5"
              }
            ],
            "exits": [
              {
                "uuid": "be096180-51d3-4e64-bc69-bb2ab8a2c115",
                "destination_uuid": "4a316bd8-9f1c-438f-b3f3-f1ceccd87d2c"
              }
            ]
          },
          {
            "uuid": "4a316bd8-9f1c-438f-b3f3-f1ceccd87d2c",
            "actions": [],
            "exits": [
              {
                "uuid": "81104fd3-c884-421d-ad7b-69bb059305bb",
                "destination_uuid": "5058db4a-973c-49ae-905c-f69c3b851683"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f3cfd782-4f25-4b28-9463-9e18111b0669",
              "cases": [],
              "categories": [
                {
                  "uuid": "f3cfd782-4f25-4b28-9463-9e18111b0669",
                  "name": "All Responses",
                  "exit_uuid": "81104fd3-c884-421d-ad7b-69bb059305bb"
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
            "uuid": "5058db4a-973c-49ae-905c-f69c3b851683",
            "actions": [
              {
                "uuid": "5c8e2dee-d2a3-4bd1-9bc2-8eb9afbdb60f",
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
                "uuid": "79be211c-c2ed-41a6-a8d1-33efee002055",
                "destination_uuid": "da0535fc-7b7f-405c-a15a-5f1f335b3ec1"
              }
            ]
          },
          {
            "uuid": "da0535fc-7b7f-405c-a15a-5f1f335b3ec1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "05442556-49cb-4731-8218-27ea748897af",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "0dad8c2f-443d-4bbe-9665-f567876ccc35",
                  "type": "has_only_phrase",
                  "uuid": "b9b47ac3-b225-479a-8256-a89bfa039f14"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "90bc2f2e-06bf-4644-a0fb-cbe5c26b96ef",
                  "type": "has_only_phrase",
                  "uuid": "b357d303-f1c8-4054-be01-ba556c76e16a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9dd9e20c-a0bf-443d-ae76-1f75786a0396",
                  "name": "All Responses",
                  "uuid": "05442556-49cb-4731-8218-27ea748897af"
                },
                {
                  "exit_uuid": "478c60a1-1963-47a9-a799-a285dbe12ab6",
                  "name": "1",
                  "uuid": "0dad8c2f-443d-4bbe-9665-f567876ccc35"
                },
                {
                  "exit_uuid": "39a22328-8552-4fbc-a0ff-132cd34467a5",
                  "name": "2",
                  "uuid": "90bc2f2e-06bf-4644-a0fb-cbe5c26b96ef"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "9dd9e20c-a0bf-443d-ae76-1f75786a0396",
                "destination_uuid": "94ceeee4-4752-4611-9eea-626e2359e63f"
              },
              {
                "uuid": "478c60a1-1963-47a9-a799-a285dbe12ab6",
                "destination_uuid": "8b5cb4e7-f733-4aad-bffa-ea9dc21e9ce9"
              },
              {
                "uuid": "39a22328-8552-4fbc-a0ff-132cd34467a5",
                "destination_uuid": "a440db9f-590d-4ed5-bf61-d36db870e3aa"
              }
            ]
          },
          {
            "uuid": "8b5cb4e7-f733-4aad-bffa-ea9dc21e9ce9",
            "actions": [
              {
                "uuid": "f3577d75-a252-469d-8e23-61be8d6014b6",
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
                "uuid": "e249e10f-5130-4a90-9a84-b6b46b214058",
                "destination_uuid": "e44d30b0-113d-48b3-b8bc-bc5d2bc73ec8"
              }
            ]
          },
          {
            "uuid": "a440db9f-590d-4ed5-bf61-d36db870e3aa",
            "actions": [
              {
                "uuid": "ce2885a5-bcf9-43af-9551-0e6ac3d4efa9",
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
                "uuid": "5cc58c2b-98a1-4f62-979f-50e9630e81ce",
                "destination_uuid": "0df2b93a-1f2a-46d0-862e-41cbb3c9caca"
              }
            ]
          },
          {
            "uuid": "94ceeee4-4752-4611-9eea-626e2359e63f",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1819dcab-8bb3-4abf-867f-04e838f5766a"
              }
            ],
            "exits": [
              {
                "uuid": "c47f2616-5150-4baf-b657-ef3adbeaf890",
                "destination_uuid": "63001602-f713-4057-82f8-63e3b3df105d"
              }
            ]
          },
          {
            "uuid": "63001602-f713-4057-82f8-63e3b3df105d",
            "actions": [],
            "exits": [
              {
                "uuid": "063b447e-3884-40f1-bdd4-53fd88087a2e",
                "destination_uuid": "d0835b80-6493-4c13-a54b-d6f51a9fbfe0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c778b243-5a66-4cf8-836f-b06c666c58b5",
              "cases": [],
              "categories": [
                {
                  "uuid": "c778b243-5a66-4cf8-836f-b06c666c58b5",
                  "name": "All Responses",
                  "exit_uuid": "063b447e-3884-40f1-bdd4-53fd88087a2e"
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
            "uuid": "d0835b80-6493-4c13-a54b-d6f51a9fbfe0",
            "actions": [
              {
                "uuid": "7000553b-c066-4e17-a062-0e90291f5e2a",
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
                "uuid": "f3f28b18-bb88-409a-adcc-358071a0dbe0",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "e44d30b0-113d-48b3-b8bc-bc5d2bc73ec8",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b68aaef5-7135-4d22-b9aa-0564335e71af"
              }
            ],
            "exits": [
              {
                "uuid": "6841fa32-ed83-4800-a920-02d427596a4b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "0df2b93a-1f2a-46d0-862e-41cbb3c9caca",
            "actions": [
              {
                "uuid": "d6df721b-e27c-46b7-ad34-6687edb98eae",
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
                "uuid": "4486221a-b0b5-4ebe-aaf5-475b565ec0e5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "40fb6a07-6375-4be9-ad5f-37fb02ccd832",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "51e13ad6-5d74-4388-b7b0-a3205450c3ca",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "ac3ce2d8-1a7e-4fa3-93b0-d2482570d8f6"
              }
            ],
            "exits": [
              {
                "uuid": "8b85c9c3-e429-49c9-be51-7dc93674b8dd",
                "destination_uuid": "50953a8f-15c9-4176-9efb-bf25190ba764"
              }
            ]
          },
          {
            "uuid": "50953a8f-15c9-4176-9efb-bf25190ba764",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "514e9253-40bf-4f3e-b8cd-57d98df3d4d3",
              "cases": [
                {
                  "arguments": [
                    "Go to the story"
                  ],
                  "category_uuid": "baebb25b-a31b-4f6b-a425-97c7c6277a59",
                  "type": "has_only_phrase",
                  "uuid": "d675761e-80bb-446d-a92d-e0816e2c0df7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e7d8ac56-806d-4c81-9aa0-c412926637bc",
                  "name": "All Responses",
                  "uuid": "514e9253-40bf-4f3e-b8cd-57d98df3d4d3"
                },
                {
                  "exit_uuid": "50f26340-c9f9-4b5a-ae96-6829661706d9",
                  "name": "Go to the story",
                  "uuid": "baebb25b-a31b-4f6b-a425-97c7c6277a59"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e7d8ac56-806d-4c81-9aa0-c412926637bc",
                "destination_uuid": null
              },
              {
                "uuid": "50f26340-c9f9-4b5a-ae96-6829661706d9",
                "destination_uuid": "a6065ffc-316a-4c9a-825a-6ce71f327378"
              }
            ]
          },
          {
            "uuid": "a6065ffc-316a-4c9a-825a-6ce71f327378",
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
                "uuid": "11ef1dd7-3460-457c-9214-cdd05a9ac51d"
              }
            ],
            "exits": [
              {
                "uuid": "3f19d75b-40f8-4b9a-bd90-0c400c75fefc",
                "destination_uuid": "c4334795-856b-4b57-8a7d-63ae5734fe2a"
              }
            ]
          },
          {
            "uuid": "c4334795-856b-4b57-8a7d-63ae5734fe2a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1ff2eccc-cbbd-4ca4-bbee-1d19c5622ea6",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "c62bca75-29ba-4f96-bbf2-f4092758ea62",
                  "type": "has_only_phrase",
                  "uuid": "6219630a-e12a-4c7c-ae99-c78fac934355"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "90602058-eaf0-4323-9d30-0c4a782beddb",
                  "name": "All Responses",
                  "uuid": "1ff2eccc-cbbd-4ca4-bbee-1d19c5622ea6"
                },
                {
                  "exit_uuid": "e772f0ba-8c76-4217-8b93-7005d8276bea",
                  "name": "Next",
                  "uuid": "c62bca75-29ba-4f96-bbf2-f4092758ea62"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "90602058-eaf0-4323-9d30-0c4a782beddb",
                "destination_uuid": null
              },
              {
                "uuid": "e772f0ba-8c76-4217-8b93-7005d8276bea",
                "destination_uuid": "5b7eb718-1935-4de7-98a0-9dee7edc6d8b"
              }
            ]
          },
          {
            "uuid": "5b7eb718-1935-4de7-98a0-9dee7edc6d8b",
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
                "uuid": "0431877e-f833-4eab-aa17-b3fe95a3cd96"
              }
            ],
            "exits": [
              {
                "uuid": "c02f25c6-aade-4598-abcf-a69dcd6ce2af",
                "destination_uuid": "7fc73d26-e6a7-4c1c-a361-da11794bb1a7"
              }
            ]
          },
          {
            "uuid": "7fc73d26-e6a7-4c1c-a361-da11794bb1a7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1bbc6015-3ffb-4c98-8802-d52941a63bd9",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "dd55450b-cc3e-413c-a16e-dec566e25701",
                  "type": "has_only_phrase",
                  "uuid": "9c1aef2f-ffdd-4c09-982d-17253b781af9"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9ba6bf62-883f-45b6-84c6-deaacdb40221",
                  "type": "has_only_phrase",
                  "uuid": "55246dd0-8366-4de7-9faf-7b8ab7eb77c0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cc8877a2-cfd8-4ede-9d2b-841c2ef9da91",
                  "name": "All Responses",
                  "uuid": "1bbc6015-3ffb-4c98-8802-d52941a63bd9"
                },
                {
                  "exit_uuid": "da42f0a7-bebd-4199-a777-f7012d0acef6",
                  "name": "Previous",
                  "uuid": "dd55450b-cc3e-413c-a16e-dec566e25701"
                },
                {
                  "exit_uuid": "81330029-fe8e-4293-bbaf-43054c060950",
                  "name": "Next",
                  "uuid": "9ba6bf62-883f-45b6-84c6-deaacdb40221"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cc8877a2-cfd8-4ede-9d2b-841c2ef9da91",
                "destination_uuid": null
              },
              {
                "uuid": "da42f0a7-bebd-4199-a777-f7012d0acef6",
                "destination_uuid": "a6065ffc-316a-4c9a-825a-6ce71f327378"
              },
              {
                "uuid": "81330029-fe8e-4293-bbaf-43054c060950",
                "destination_uuid": "fc725402-a67e-4c03-aef6-6567d844303e"
              }
            ]
          },
          {
            "uuid": "fc725402-a67e-4c03-aef6-6567d844303e",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d442d06d-13c3-462d-bc5b-af8478ee59a8"
              }
            ],
            "exits": [
              {
                "uuid": "fef0507d-c423-4b44-8cbf-c9372b6a1da2",
                "destination_uuid": "c2b2c8d6-c560-4dfd-bd9f-90390655f1f4"
              }
            ]
          },
          {
            "uuid": "c2b2c8d6-c560-4dfd-bd9f-90390655f1f4",
            "actions": [
              {
                "uuid": "3bb10fa3-81b7-4568-b557-23b14f5e944b",
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
                "uuid": "03deff2b-522f-46aa-a1f5-e2edd7545eba",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a1495522-b251-4271-bf48-9587af790d09",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f1bff009-d73c-4b7e-8f0a-e4a8e8781166",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6142b898-eb83-4018-aa8b-ca74db26116b"
              }
            ],
            "exits": [
              {
                "uuid": "fab9b8d6-8a3d-4138-a23d-249504b0d9f0",
                "destination_uuid": "d2d9d957-7c7a-41e9-892f-d083f878a074"
              }
            ]
          },
          {
            "uuid": "d2d9d957-7c7a-41e9-892f-d083f878a074",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "717216a8-c9a8-4189-a649-0014ffd19ac8"
              }
            ],
            "exits": [
              {
                "uuid": "f6bd4cd4-269a-4150-bed2-59aaea1a0a0d",
                "destination_uuid": "37678235-dd77-4dc5-8726-da356c9117c3"
              }
            ]
          },
          {
            "uuid": "37678235-dd77-4dc5-8726-da356c9117c3",
            "actions": [],
            "exits": [
              {
                "uuid": "792fbcbf-fd0f-4205-84ed-d055f36db462",
                "destination_uuid": "1f56407f-8fa0-42f1-9689-bad187b7aff3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0abdb201-38fb-401c-9e2a-f65ce13007d3",
              "cases": [],
              "categories": [
                {
                  "uuid": "0abdb201-38fb-401c-9e2a-f65ce13007d3",
                  "name": "All Responses",
                  "exit_uuid": "792fbcbf-fd0f-4205-84ed-d055f36db462"
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
            "uuid": "1f56407f-8fa0-42f1-9689-bad187b7aff3",
            "actions": [
              {
                "uuid": "4f6e1b9d-f3b8-438b-8b42-32b16b0a6280",
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
                "uuid": "21812206-ab26-4a09-90f7-a8c672b3a2ae",
                "destination_uuid": "07f142bf-8b83-41de-9115-b9ce535bf775"
              }
            ]
          },
          {
            "uuid": "07f142bf-8b83-41de-9115-b9ce535bf775",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "896dd467-e16a-4dff-89eb-27476c52c224"
                },
                "type": "enter_flow",
                "uuid": "95f9be2a-692c-4c9f-acb8-f1c9b7c34a83"
              }
            ],
            "exits": [
              {
                "uuid": "dab98417-a93a-47e4-925f-4829e6797be9",
                "destination_uuid": "8d12d4f2-9d24-4bc1-ac48-724ee748bea2"
              },
              {
                "uuid": "661ef050-db4a-4bce-b274-a8dc6b657466",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8832b492-2d1d-4637-bf00-540e3e3923ce",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "011479e9-c789-4524-9592-e6d1f1e0f673"
                },
                {
                  "uuid": "eb352f23-4108-4504-bc43-42a1325f714d",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a2d3b6c9-83b5-45d6-b6cd-17447c914b65"
                }
              ],
              "categories": [
                {
                  "uuid": "011479e9-c789-4524-9592-e6d1f1e0f673",
                  "name": "Complete",
                  "exit_uuid": "dab98417-a93a-47e4-925f-4829e6797be9"
                },
                {
                  "uuid": "a2d3b6c9-83b5-45d6-b6cd-17447c914b65",
                  "name": "Expired",
                  "exit_uuid": "661ef050-db4a-4bce-b274-a8dc6b657466"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "011479e9-c789-4524-9592-e6d1f1e0f673"
            }
          },
          {
            "uuid": "8d12d4f2-9d24-4bc1-ac48-724ee748bea2",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "14d95c07-2e9b-4612-9175-da93163114a9"
              }
            ],
            "exits": [
              {
                "uuid": "11d92287-fad7-4e69-b5be-9060244ae400",
                "destination_uuid": "f96f082d-c738-42b2-83c7-2eb2b3e54ebc"
              }
            ]
          },
          {
            "uuid": "f96f082d-c738-42b2-83c7-2eb2b3e54ebc",
            "actions": [],
            "exits": [
              {
                "uuid": "512a4198-e380-4b90-ab2b-ab5ba5c9c159",
                "destination_uuid": "4de2d832-4eab-43dc-b890-1bd718176653"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3fc5e2c5-13b9-413e-8524-fbe8e73be0ff",
              "cases": [],
              "categories": [
                {
                  "uuid": "3fc5e2c5-13b9-413e-8524-fbe8e73be0ff",
                  "name": "All Responses",
                  "exit_uuid": "512a4198-e380-4b90-ab2b-ab5ba5c9c159"
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
            "uuid": "4de2d832-4eab-43dc-b890-1bd718176653",
            "actions": [
              {
                "uuid": "7931ee9f-db17-4a49-8e9b-93600b8c1436",
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
                "uuid": "c865d237-4b6a-4252-8a95-7d20feef7833",
                "destination_uuid": "2a5aa863-121a-43ad-9e1c-123e7ec0a4de"
              }
            ]
          },
          {
            "uuid": "2a5aa863-121a-43ad-9e1c-123e7ec0a4de",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cf2c57a8-251a-4bc8-bc70-bddf52b21288",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "5d935755-a1db-43cc-9de9-b44c7befd363",
                  "type": "has_only_phrase",
                  "uuid": "1e4d7768-4d35-419f-a010-1e1732b606e2"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "3b1a5fd3-4d1b-4e7b-8304-04055ed0cef4",
                  "type": "has_only_phrase",
                  "uuid": "dc019313-3979-4f29-833f-fbc902840b42"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8d75a16e-d4c8-4704-9122-f4b4617e9cb6",
                  "name": "All Responses",
                  "uuid": "cf2c57a8-251a-4bc8-bc70-bddf52b21288"
                },
                {
                  "exit_uuid": "47680207-612e-4ea9-bd9d-de0174a59dc0",
                  "name": "guide1",
                  "uuid": "5d935755-a1db-43cc-9de9-b44c7befd363"
                },
                {
                  "exit_uuid": "462db10e-390d-47bb-9350-a25345e335aa",
                  "name": "guide2",
                  "uuid": "3b1a5fd3-4d1b-4e7b-8304-04055ed0cef4"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "8d75a16e-d4c8-4704-9122-f4b4617e9cb6",
                "destination_uuid": null
              },
              {
                "uuid": "47680207-612e-4ea9-bd9d-de0174a59dc0",
                "destination_uuid": "502c8a9c-5746-45a1-bf92-f3f15f5621df"
              },
              {
                "uuid": "462db10e-390d-47bb-9350-a25345e335aa",
                "destination_uuid": "372f4db2-a00a-4196-a1ef-5ee6c5304ad5"
              }
            ]
          },
          {
            "uuid": "502c8a9c-5746-45a1-bf92-f3f15f5621df",
            "actions": [
              {
                "uuid": "7e17e655-cd77-45a2-a53e-bba68c8ef3bb",
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
                "uuid": "38013abb-fcb6-415c-8a2e-66cd135a8a78",
                "destination_uuid": "a56388fb-50fc-4102-8d2c-f47384d38e43"
              }
            ]
          },
          {
            "uuid": "372f4db2-a00a-4196-a1ef-5ee6c5304ad5",
            "actions": [
              {
                "uuid": "49d4fb7c-ec5b-4707-ab1d-483091bd5372",
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
                "uuid": "bd72df19-062f-4063-a7c4-c5597cc9e2c0",
                "destination_uuid": "a56388fb-50fc-4102-8d2c-f47384d38e43"
              }
            ]
          },
          {
            "uuid": "a56388fb-50fc-4102-8d2c-f47384d38e43",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "82e5f9e0-4de6-44c0-9b36-d3fc09b8fd44"
              }
            ],
            "exits": [
              {
                "uuid": "1fe6fc82-3a30-45fa-aa34-cec1305a0b8c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "36b43bd2-2d93-4c93-b66f-55ef406759c9",
            "actions": [
              {
                "uuid": "86bf2621-d98b-4f68-96ad-8f850036982a",
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
                "uuid": "8717469f-c0ea-4ccc-91d3-983c63b960ad",
                "destination_uuid": "ed6fc96e-204f-4ab8-aa03-dd7fbd8eebd6"
              }
            ]
          },
          {
            "uuid": "ed6fc96e-204f-4ab8-aa03-dd7fbd8eebd6",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "2f90b790-f555-437a-9525-6c70039e31ab"
                },
                "type": "enter_flow",
                "uuid": "30b85282-8563-42fa-a757-59d490ec1e30"
              }
            ],
            "exits": [
              {
                "uuid": "9d97995d-5486-43ad-93a2-5a15ccd9451a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3bc75e2e-d63e-417c-8ab1-5c074a17b9cc",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9cee7f74-1742-4477-97da-fc9359bfa05e",
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
                "uuid": "1b315e43-39d3-4cf8-932d-4fa6cd54ed6e"
              }
            ],
            "exits": [
              {
                "uuid": "7db5dc75-eeec-4ac0-8dfd-43351e22bb94",
                "destination_uuid": "a80036a6-e5bd-4581-aaa8-6fbfdcaa8d3f"
              }
            ]
          },
          {
            "uuid": "a80036a6-e5bd-4581-aaa8-6fbfdcaa8d3f",
            "actions": [],
            "exits": [
              {
                "uuid": "fdd0fb8b-6cd6-490f-a56e-eac066b61f33",
                "destination_uuid": "4181072d-1058-46c2-a23d-f299ce47d2fe"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "cc4114d0-e523-4b31-8497-cbbc59f94fa4",
              "cases": [],
              "categories": [
                {
                  "uuid": "cc4114d0-e523-4b31-8497-cbbc59f94fa4",
                  "name": "All Responses",
                  "exit_uuid": "fdd0fb8b-6cd6-490f-a56e-eac066b61f33"
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
            "uuid": "4181072d-1058-46c2-a23d-f299ce47d2fe",
            "actions": [
              {
                "uuid": "c467e48f-b3eb-49dc-ada3-4589cb78144e",
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
                "uuid": "02765742-e84e-4e89-aea1-88d9cf2eda50",
                "destination_uuid": "72ce00cb-ee1f-4275-8828-21cd63c40037"
              }
            ]
          },
          {
            "uuid": "72ce00cb-ee1f-4275-8828-21cd63c40037",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b14f2c9d-c3a5-42c3-a418-6ce052cad6ab"
              }
            ],
            "exits": [
              {
                "uuid": "ac7dcbac-7483-4b0c-96ae-2d2186caf069",
                "destination_uuid": "53aae20b-844b-48e3-af8c-0c8f88bd2f36"
              }
            ]
          },
          {
            "uuid": "53aae20b-844b-48e3-af8c-0c8f88bd2f36",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3d9adf43-99a1-4e8d-beee-8f87b4e243cd"
              }
            ],
            "exits": [
              {
                "uuid": "14ce3996-a617-4124-b7fd-70524671436e",
                "destination_uuid": "acf870e3-370a-4736-9765-7a18edff98e7"
              }
            ]
          },
          {
            "uuid": "acf870e3-370a-4736-9765-7a18edff98e7",
            "actions": [
              {
                "flow": {
                  "name": "calm_5",
                  "uuid": "b388030b-b7dd-456f-81d2-62485c837370"
                },
                "type": "enter_flow",
                "uuid": "4ddddca1-74ab-4b85-824e-f76fede89008"
              }
            ],
            "exits": [
              {
                "uuid": "43c99eba-549a-492a-863a-3d019f7a844d",
                "destination_uuid": "e8459e54-fa09-4c6b-b2ce-e0db69f1634b"
              },
              {
                "uuid": "94961adb-1346-40e8-9b5b-5159fc6867cf",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "cf62215f-19d7-4f21-8108-be74e634561b",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "40456caf-8671-49c4-ab21-3adfc9efe86c"
                },
                {
                  "uuid": "f67a80ba-e35a-44dc-89bd-665a65fd6378",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "87f453c9-d260-4194-a2f3-4cafdd7240e9"
                }
              ],
              "categories": [
                {
                  "uuid": "40456caf-8671-49c4-ab21-3adfc9efe86c",
                  "name": "Complete",
                  "exit_uuid": "43c99eba-549a-492a-863a-3d019f7a844d"
                },
                {
                  "uuid": "87f453c9-d260-4194-a2f3-4cafdd7240e9",
                  "name": "Expired",
                  "exit_uuid": "94961adb-1346-40e8-9b5b-5159fc6867cf"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "40456caf-8671-49c4-ab21-3adfc9efe86c"
            }
          },
          {
            "uuid": "e8459e54-fa09-4c6b-b2ce-e0db69f1634b",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "389c8fca-8659-4e8e-baac-842eea3646c4"
              }
            ],
            "exits": [
              {
                "uuid": "cbc8c652-6b4c-4d3b-856e-ca9745f7083f",
                "destination_uuid": "965ec9e2-5ab8-4eb4-bcb9-abb2a41fa4d5"
              }
            ]
          },
          {
            "uuid": "965ec9e2-5ab8-4eb4-bcb9-abb2a41fa4d5",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "06aa00be-01e0-4092-95a2-dc6cb82b448a"
              }
            ],
            "exits": [
              {
                "uuid": "cba519bd-ba0d-451f-a783-8afbfb72a28f",
                "destination_uuid": "8ab8eafe-ac2c-4474-b871-ec10721caeba"
              }
            ]
          },
          {
            "uuid": "8ab8eafe-ac2c-4474-b871-ec10721caeba",
            "actions": [],
            "exits": [
              {
                "uuid": "9059833c-c3b4-400b-9827-b09e560427b5",
                "destination_uuid": "a7484bdc-7352-4f02-aec2-c51cde8dc681"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "849ef8ab-144a-43b2-894e-44183b368fb8",
              "cases": [],
              "categories": [
                {
                  "uuid": "849ef8ab-144a-43b2-894e-44183b368fb8",
                  "name": "All Responses",
                  "exit_uuid": "9059833c-c3b4-400b-9827-b09e560427b5"
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
            "uuid": "a7484bdc-7352-4f02-aec2-c51cde8dc681",
            "actions": [
              {
                "uuid": "1f2c6ca5-0321-48b1-af53-815dfaeb81d0",
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
                "uuid": "8b1c4efd-84e1-4d7f-92af-7a9a748a86b3",
                "destination_uuid": "ccb76815-7e61-4f9a-bd70-4bb79b57251f"
              }
            ]
          },
          {
            "uuid": "ccb76815-7e61-4f9a-bd70-4bb79b57251f",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e7e1b5b8-f68b-4e86-a869-5bdee9f63cca"
              }
            ],
            "exits": [
              {
                "uuid": "aa7e3ab4-87de-4b89-b457-48c350cb647d",
                "destination_uuid": "c822e5ff-53d4-460e-94a6-beb121ffc661"
              }
            ]
          },
          {
            "uuid": "c822e5ff-53d4-460e-94a6-beb121ffc661",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1202d9ef-d7f1-41d0-aaa9-ed5b7d91817e"
              }
            ],
            "exits": [
              {
                "uuid": "a7906d13-5f85-4648-a1b4-36b3b803fba5",
                "destination_uuid": "a0cfe299-0f28-4adb-83bd-59f65fa7081e"
              }
            ]
          },
          {
            "uuid": "a0cfe299-0f28-4adb-83bd-59f65fa7081e",
            "actions": [
              {
                "uuid": "45bae591-bdb4-431b-98e0-de639e44a491",
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
                "uuid": "885882bf-98cf-4e16-a1d0-54371755da78",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3884f395-69e5-4113-9360-482c465dc204",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "576510e2-f68b-416d-84d0-e81e976d1176",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "eb49bf6a-70c5-4b31-8152-d3dd81af782f"
              }
            ],
            "exits": [
              {
                "uuid": "3760d079-5533-4a3d-b448-1baee810cfc3",
                "destination_uuid": "8a344164-6cb7-417a-b16d-d696d009f4df"
              }
            ]
          },
          {
            "uuid": "8a344164-6cb7-417a-b16d-d696d009f4df",
            "actions": [
              {
                "uuid": "e96d0601-5022-47d7-9718-e6009d75c83b",
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
                "uuid": "5d933fde-0a2c-4894-bdfc-10690c0fb904",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "acc023b6-be59-4301-8564-f7cc89be4357",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "be870239-739e-4ae3-9e9e-deaa3459272b",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ab392a26-6930-4988-b299-5847caff881c"
              }
            ],
            "exits": [
              {
                "uuid": "a554fab9-aeee-48ac-b652-39ea34758f2e",
                "destination_uuid": "186f6d36-9989-4ef6-bece-8d4d93607ac8"
              }
            ]
          },
          {
            "uuid": "186f6d36-9989-4ef6-bece-8d4d93607ac8",
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
                "uuid": "ccf050c0-6256-4b9c-a6b3-292dd097c861"
              }
            ],
            "exits": [
              {
                "uuid": "eb80e1bd-afff-4131-9f8f-8991c8d977e0",
                "destination_uuid": "4919e99d-05f9-470c-8c40-e78c92658aed"
              }
            ]
          },
          {
            "uuid": "4919e99d-05f9-470c-8c40-e78c92658aed",
            "actions": [],
            "exits": [
              {
                "uuid": "78929a5d-1628-4532-be03-44cbb124b6ee",
                "destination_uuid": "57235560-c9b9-45e1-a48b-15a5cdb7ac08"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7700ce14-e941-4e2f-b16c-5e391f59c934",
              "cases": [],
              "categories": [
                {
                  "uuid": "7700ce14-e941-4e2f-b16c-5e391f59c934",
                  "name": "All Responses",
                  "exit_uuid": "78929a5d-1628-4532-be03-44cbb124b6ee"
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
            "uuid": "57235560-c9b9-45e1-a48b-15a5cdb7ac08",
            "actions": [
              {
                "uuid": "8b9f007b-8d72-4d6c-8210-9ac015449e42",
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
                "uuid": "1f236aa1-5f92-4234-a198-b2aad1a3fcc4",
                "destination_uuid": "9bb7e322-21b5-4af9-851a-f75d3d08ba9f"
              }
            ]
          },
          {
            "uuid": "9bb7e322-21b5-4af9-851a-f75d3d08ba9f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "77048b15-b1ce-4400-8e8c-298d1469ecaf",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "ee9e1e0a-99e1-4848-a13c-98a24c2e8e0a",
                  "type": "has_only_phrase",
                  "uuid": "602cc519-ca32-4e2d-a792-53c4b5b60b7e"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "ee9e1e0a-99e1-4848-a13c-98a24c2e8e0a",
                  "type": "has_only_phrase",
                  "uuid": "60610ede-b4d9-4bc2-9a08-8c579a481b25"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "ee9e1e0a-99e1-4848-a13c-98a24c2e8e0a",
                  "type": "has_only_phrase",
                  "uuid": "8f64672d-f0f1-41cc-ae24-3272d291190d"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "ee9e1e0a-99e1-4848-a13c-98a24c2e8e0a",
                  "type": "has_only_phrase",
                  "uuid": "fd87b915-21fa-4713-a93f-5611f2fcc857"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "42ece978-0e2b-4773-8346-5cbcc0d33850",
                  "type": "has_only_phrase",
                  "uuid": "9a9f042b-b939-4420-90f8-2200f4134616"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "42ece978-0e2b-4773-8346-5cbcc0d33850",
                  "type": "has_only_phrase",
                  "uuid": "e0c151f2-d626-4750-b6ee-93d59d30378f"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "42ece978-0e2b-4773-8346-5cbcc0d33850",
                  "type": "has_only_phrase",
                  "uuid": "3e2388d6-74b9-4be3-bf89-80178243a7dc"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "42ece978-0e2b-4773-8346-5cbcc0d33850",
                  "type": "has_only_phrase",
                  "uuid": "91a5cd10-6e0b-447a-b6fb-4c96c3166f64"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "158ac450-d5f2-48cd-89a8-ec010123cea9",
                  "name": "All Responses",
                  "uuid": "77048b15-b1ce-4400-8e8c-298d1469ecaf"
                },
                {
                  "exit_uuid": "625d6c30-293e-4688-b539-bfa9ce166aaf",
                  "name": "0;1;2;3",
                  "uuid": "ee9e1e0a-99e1-4848-a13c-98a24c2e8e0a"
                },
                {
                  "exit_uuid": "697ffaa0-6a70-4c99-bc12-ec402e7a67b8",
                  "name": "4;5;6;7",
                  "uuid": "42ece978-0e2b-4773-8346-5cbcc0d33850"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "158ac450-d5f2-48cd-89a8-ec010123cea9",
                "destination_uuid": null
              },
              {
                "uuid": "625d6c30-293e-4688-b539-bfa9ce166aaf",
                "destination_uuid": "9c90a45d-e546-4dae-9457-43f089074db0"
              },
              {
                "uuid": "697ffaa0-6a70-4c99-bc12-ec402e7a67b8",
                "destination_uuid": "dd349140-48b5-44e4-a4c8-4d25755ff551"
              }
            ]
          },
          {
            "uuid": "9c90a45d-e546-4dae-9457-43f089074db0",
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
                "uuid": "8fb859f3-72ce-445d-9264-41baa7c2e088"
              }
            ],
            "exits": [
              {
                "uuid": "cfee5534-491d-4eaa-bbd1-cdc951ee1ff2",
                "destination_uuid": "97977de6-03b8-45f5-967b-e9850515f802"
              }
            ]
          },
          {
            "uuid": "dd349140-48b5-44e4-a4c8-4d25755ff551",
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
                "uuid": "ccf69e6f-cf5b-4acb-8935-d216493c2d8e"
              }
            ],
            "exits": [
              {
                "uuid": "ba36579d-7651-40ce-9b8a-311b2022af3a",
                "destination_uuid": "97977de6-03b8-45f5-967b-e9850515f802"
              }
            ]
          },
          {
            "uuid": "97977de6-03b8-45f5-967b-e9850515f802",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f7e33830-cf5a-434f-b04d-7fbf40223ac6",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "d53f344b-549a-41dd-bb3f-67f28014c840",
                  "type": "has_only_phrase",
                  "uuid": "1e86fc03-16a3-4931-a9cc-ef6bd7c68f97"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f2a43c31-186e-4991-bc50-1854b6739993",
                  "name": "All Responses",
                  "uuid": "f7e33830-cf5a-434f-b04d-7fbf40223ac6"
                },
                {
                  "exit_uuid": "81fd78c6-21f5-4108-a2d1-217c536ce339",
                  "name": "Next",
                  "uuid": "d53f344b-549a-41dd-bb3f-67f28014c840"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f2a43c31-186e-4991-bc50-1854b6739993",
                "destination_uuid": null
              },
              {
                "uuid": "81fd78c6-21f5-4108-a2d1-217c536ce339",
                "destination_uuid": "61f735ab-cacf-40df-afc6-f252e9f9f77e"
              }
            ]
          },
          {
            "uuid": "61f735ab-cacf-40df-afc6-f252e9f9f77e",
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
                "uuid": "6bbc1c6e-1cd9-4b7e-86be-ae74e70d8515"
              }
            ],
            "exits": [
              {
                "uuid": "38026fed-d341-48a8-ba02-f34022e1ebf5",
                "destination_uuid": "053f64c8-96a1-40a3-8758-b5f37ddcbc07"
              }
            ]
          },
          {
            "uuid": "053f64c8-96a1-40a3-8758-b5f37ddcbc07",
            "actions": [],
            "exits": [
              {
                "uuid": "4a9f459c-9dd7-4c15-b1e6-e392fa8564d8",
                "destination_uuid": "0998d4a1-8c76-4ed2-be4a-6f769e496d5e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e925fbba-c548-446f-b232-bfde6aeb08db",
              "cases": [],
              "categories": [
                {
                  "uuid": "e925fbba-c548-446f-b232-bfde6aeb08db",
                  "name": "All Responses",
                  "exit_uuid": "4a9f459c-9dd7-4c15-b1e6-e392fa8564d8"
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
            "uuid": "0998d4a1-8c76-4ed2-be4a-6f769e496d5e",
            "actions": [
              {
                "uuid": "a48b00fe-934f-4ec4-9b19-9b9f8e2e4de1",
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
                "uuid": "bd953e21-52cc-4151-9b05-93e64cc23790",
                "destination_uuid": "f374d73d-f7da-436c-b088-3292a749ff3d"
              }
            ]
          },
          {
            "uuid": "f374d73d-f7da-436c-b088-3292a749ff3d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8c0f0d62-131a-4ede-87b1-976b68ecc9e7",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "70b483fc-1d5d-499e-a940-52afd9ce6854",
                  "type": "has_only_phrase",
                  "uuid": "9d6b2307-0665-499e-afef-535b4049db72"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "70b483fc-1d5d-499e-a940-52afd9ce6854",
                  "type": "has_only_phrase",
                  "uuid": "92b542f8-e58f-4627-a240-f3d630374882"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "70b483fc-1d5d-499e-a940-52afd9ce6854",
                  "type": "has_only_phrase",
                  "uuid": "dd1fc884-c6e6-4754-8517-1f1a1bb52b50"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "70b483fc-1d5d-499e-a940-52afd9ce6854",
                  "type": "has_only_phrase",
                  "uuid": "514522e9-d35a-4df9-9687-79ba1b120746"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "70b483fc-1d5d-499e-a940-52afd9ce6854",
                  "type": "has_only_phrase",
                  "uuid": "b4143f9d-3353-46d7-81bc-57c8c153638b"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "84925c07-5871-4cc0-b17f-ce174920a10a",
                  "type": "has_only_phrase",
                  "uuid": "d9db4657-71da-4200-82d4-eba23976f710"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "84925c07-5871-4cc0-b17f-ce174920a10a",
                  "type": "has_only_phrase",
                  "uuid": "5921fe98-e614-4ecb-a5e6-1fbed34fcc06"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "84925c07-5871-4cc0-b17f-ce174920a10a",
                  "type": "has_only_phrase",
                  "uuid": "fe311ae6-a676-48cd-88f8-00d43e0513ea"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "84925c07-5871-4cc0-b17f-ce174920a10a",
                  "type": "has_only_phrase",
                  "uuid": "bdbccc5d-b099-4998-8ee3-27f396fdf4f1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7fa1ef9c-a6b0-43dd-aca6-d03c711f8012",
                  "name": "All Responses",
                  "uuid": "8c0f0d62-131a-4ede-87b1-976b68ecc9e7"
                },
                {
                  "exit_uuid": "e9ac24d3-1359-442d-9ad0-44f210fd4c72",
                  "name": "0;1;2;3;4",
                  "uuid": "70b483fc-1d5d-499e-a940-52afd9ce6854"
                },
                {
                  "exit_uuid": "036f3c69-c42e-4c30-8d3c-4bd5c37e0db5",
                  "name": "5;6;7;8",
                  "uuid": "84925c07-5871-4cc0-b17f-ce174920a10a"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "7fa1ef9c-a6b0-43dd-aca6-d03c711f8012",
                "destination_uuid": null
              },
              {
                "uuid": "e9ac24d3-1359-442d-9ad0-44f210fd4c72",
                "destination_uuid": "9d64bc2a-ff56-4a20-bf1a-fa94e6792e59"
              },
              {
                "uuid": "036f3c69-c42e-4c30-8d3c-4bd5c37e0db5",
                "destination_uuid": "7f32d4e1-535c-4e3b-84b3-bdc098ad60f3"
              }
            ]
          },
          {
            "uuid": "9d64bc2a-ff56-4a20-bf1a-fa94e6792e59",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "320ce3ec-cf6f-415d-8142-b866dab8bd37"
              }
            ],
            "exits": [
              {
                "uuid": "49c50f9a-217a-43ba-a748-81a09f27df9c",
                "destination_uuid": "c758dd90-5d55-4bad-b300-d463c2931860"
              }
            ]
          },
          {
            "uuid": "7f32d4e1-535c-4e3b-84b3-bdc098ad60f3",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "e7c7cb65-db45-4afa-89a2-4aeb6a236342"
              }
            ],
            "exits": [
              {
                "uuid": "d5ec2185-eb88-421c-9d34-d09fb5ce8721",
                "destination_uuid": "c758dd90-5d55-4bad-b300-d463c2931860"
              }
            ]
          },
          {
            "uuid": "c758dd90-5d55-4bad-b300-d463c2931860",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "48dc0c4b-6cb6-402c-9250-d31a936fa883",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "7898659b-6b65-4b8c-9cc5-8df802e59d2c",
                  "type": "has_only_phrase",
                  "uuid": "28058598-d2ac-43a3-86f8-734b9abde577"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4be53eb3-f957-44e6-be2e-aa9f2724eb81",
                  "name": "All Responses",
                  "uuid": "48dc0c4b-6cb6-402c-9250-d31a936fa883"
                },
                {
                  "exit_uuid": "ed331cfb-987a-447d-a8e1-2b3b512fba58",
                  "name": "Next",
                  "uuid": "7898659b-6b65-4b8c-9cc5-8df802e59d2c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4be53eb3-f957-44e6-be2e-aa9f2724eb81",
                "destination_uuid": null
              },
              {
                "uuid": "ed331cfb-987a-447d-a8e1-2b3b512fba58",
                "destination_uuid": "833bc66c-d0ff-4710-8a66-03e54c735a8f"
              }
            ]
          },
          {
            "uuid": "833bc66c-d0ff-4710-8a66-03e54c735a8f",
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
                "uuid": "686a43d3-e70c-4dd2-9925-e3147fd8cdf2"
              }
            ],
            "exits": [
              {
                "uuid": "8baac5a6-5047-4997-9adf-c938b94e92f9",
                "destination_uuid": "9b2ca2ff-d9ff-49a3-97eb-bab9a1691fb7"
              }
            ]
          },
          {
            "uuid": "9b2ca2ff-d9ff-49a3-97eb-bab9a1691fb7",
            "actions": [],
            "exits": [
              {
                "uuid": "3dde4266-d228-4ede-8197-140e19a74a47",
                "destination_uuid": "2839e832-f00a-43eb-af71-fa5b3db7102a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9eb2ce44-bebf-4540-b4ad-4b059ce7b106",
              "cases": [],
              "categories": [
                {
                  "uuid": "9eb2ce44-bebf-4540-b4ad-4b059ce7b106",
                  "name": "All Responses",
                  "exit_uuid": "3dde4266-d228-4ede-8197-140e19a74a47"
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
            "uuid": "2839e832-f00a-43eb-af71-fa5b3db7102a",
            "actions": [
              {
                "uuid": "9e0b8402-3e1c-473b-b264-9b76cd856c14",
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
                "uuid": "ce5ee24f-6522-426c-8970-185ba0205a1b",
                "destination_uuid": "785d75ff-72b9-4a68-9c58-98859753bb9e"
              }
            ]
          },
          {
            "uuid": "785d75ff-72b9-4a68-9c58-98859753bb9e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6209f938-2384-4aaf-a89b-c2207b5df492",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "bcd455f4-7c3b-40f8-bb82-d809c4c7fea3",
                  "type": "has_only_phrase",
                  "uuid": "0fe41363-2d77-4f07-b126-55f5f0d9e7be"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "bcd455f4-7c3b-40f8-bb82-d809c4c7fea3",
                  "type": "has_only_phrase",
                  "uuid": "c54dbe17-a567-4119-8a4d-0759d4a84999"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "bcd455f4-7c3b-40f8-bb82-d809c4c7fea3",
                  "type": "has_only_phrase",
                  "uuid": "c3c371ae-7598-4196-83f5-0d78c365288c"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "df9f4c65-d9c2-4337-bf93-7c9aaffcea81",
                  "type": "has_only_phrase",
                  "uuid": "8fb23f7e-d9bd-4c50-84dc-0542d58845b6"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "df9f4c65-d9c2-4337-bf93-7c9aaffcea81",
                  "type": "has_only_phrase",
                  "uuid": "5b0a645c-7ab0-481b-b3ef-0a8f76c1cf71"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "df9f4c65-d9c2-4337-bf93-7c9aaffcea81",
                  "type": "has_only_phrase",
                  "uuid": "95b8c5ef-c271-4eb0-a81f-971e9257f29c"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "df9f4c65-d9c2-4337-bf93-7c9aaffcea81",
                  "type": "has_only_phrase",
                  "uuid": "66ab5057-a63e-4c7d-b144-319c789ee87b"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "df9f4c65-d9c2-4337-bf93-7c9aaffcea81",
                  "type": "has_only_phrase",
                  "uuid": "92de685f-dc73-46c4-946f-cb0c1c08d0bb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d2e91484-f2f9-44c6-8268-8b434474fc60",
                  "name": "All Responses",
                  "uuid": "6209f938-2384-4aaf-a89b-c2207b5df492"
                },
                {
                  "exit_uuid": "799cdb39-bb9d-4c1a-b6a6-dfd3711a075d",
                  "name": "0;1;2",
                  "uuid": "bcd455f4-7c3b-40f8-bb82-d809c4c7fea3"
                },
                {
                  "exit_uuid": "32653a9e-3e11-40f7-a8b2-c2805e75b892",
                  "name": "3;4;5;6;7",
                  "uuid": "df9f4c65-d9c2-4337-bf93-7c9aaffcea81"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "d2e91484-f2f9-44c6-8268-8b434474fc60",
                "destination_uuid": null
              },
              {
                "uuid": "799cdb39-bb9d-4c1a-b6a6-dfd3711a075d",
                "destination_uuid": "f950484c-b637-4a3e-8500-84dab597597c"
              },
              {
                "uuid": "32653a9e-3e11-40f7-a8b2-c2805e75b892",
                "destination_uuid": "03ea7747-e47c-4698-9898-f5b3fb781227"
              }
            ]
          },
          {
            "uuid": "f950484c-b637-4a3e-8500-84dab597597c",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "0cb2ff40-105e-4084-ad84-26906439c5de"
              }
            ],
            "exits": [
              {
                "uuid": "4031251b-7542-4721-8de5-f2f0b4257199",
                "destination_uuid": "61005e87-139f-4093-9680-af509545dff1"
              }
            ]
          },
          {
            "uuid": "03ea7747-e47c-4698-9898-f5b3fb781227",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "02d54325-954c-4299-9e09-f95ef902b09c"
              }
            ],
            "exits": [
              {
                "uuid": "2f7f5f2f-c924-4085-bb8e-bb0d9a691171",
                "destination_uuid": "61005e87-139f-4093-9680-af509545dff1"
              }
            ]
          },
          {
            "uuid": "61005e87-139f-4093-9680-af509545dff1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fa8217a4-3fbe-4507-adbd-8a1fdeb87d17",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "904a6a4c-f983-498e-b107-b13880cdf45b",
                  "type": "has_only_phrase",
                  "uuid": "136762e2-a252-48ba-877b-44c81c11e79d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d0026e2a-4980-4048-b0b6-5b77634ffb9e",
                  "name": "All Responses",
                  "uuid": "fa8217a4-3fbe-4507-adbd-8a1fdeb87d17"
                },
                {
                  "exit_uuid": "96c40363-361b-4459-b003-451f56416fb1",
                  "name": "Next",
                  "uuid": "904a6a4c-f983-498e-b107-b13880cdf45b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d0026e2a-4980-4048-b0b6-5b77634ffb9e",
                "destination_uuid": null
              },
              {
                "uuid": "96c40363-361b-4459-b003-451f56416fb1",
                "destination_uuid": "66c27e5b-ba91-440f-a887-bd2d21479ab1"
              }
            ]
          },
          {
            "uuid": "66c27e5b-ba91-440f-a887-bd2d21479ab1",
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
                "uuid": "d7d2206c-d8ab-4636-ad93-08f55e0cc70d"
              }
            ],
            "exits": [
              {
                "uuid": "fce00417-287f-47a4-b1dc-19e8999abb5b",
                "destination_uuid": "c18d7a02-be8a-4ffc-8573-141d21ae8a2a"
              }
            ]
          },
          {
            "uuid": "c18d7a02-be8a-4ffc-8573-141d21ae8a2a",
            "actions": [],
            "exits": [
              {
                "uuid": "5f9fe8fa-e2cb-4a65-a69f-97e766f173b1",
                "destination_uuid": "e5becc9c-ff8d-4c7d-9b24-01ee14d3d698"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fb8ee1f6-81b4-4b85-b801-3dac3d433b3c",
              "cases": [],
              "categories": [
                {
                  "uuid": "fb8ee1f6-81b4-4b85-b801-3dac3d433b3c",
                  "name": "All Responses",
                  "exit_uuid": "5f9fe8fa-e2cb-4a65-a69f-97e766f173b1"
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
            "uuid": "e5becc9c-ff8d-4c7d-9b24-01ee14d3d698",
            "actions": [
              {
                "uuid": "9772ab65-49f0-40be-be4f-157ab5086cde",
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
                "uuid": "7c5f521f-8720-4dfb-89b9-cae35613fd00",
                "destination_uuid": "1ad84d6f-db74-4d10-8325-90caf74ad28d"
              }
            ]
          },
          {
            "uuid": "1ad84d6f-db74-4d10-8325-90caf74ad28d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6414a457-8d0c-4231-83c0-e6f94f7af342",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "ae291644-b024-4d5a-a8de-2b0941a3aa0c",
                  "type": "has_only_phrase",
                  "uuid": "03dab21b-9a97-44af-8116-f28cef8c0a01"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "ae291644-b024-4d5a-a8de-2b0941a3aa0c",
                  "type": "has_only_phrase",
                  "uuid": "03ddcc0a-8ff2-4aa5-90f0-a96624ba2d2c"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "064607df-dc27-4061-bee0-dded1b569ae2",
                  "type": "has_only_phrase",
                  "uuid": "01d17b63-2270-4d54-8051-f57d7f616b71"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "064607df-dc27-4061-bee0-dded1b569ae2",
                  "type": "has_only_phrase",
                  "uuid": "dd3b0b84-673c-4edd-a5aa-b1aa8c687d31"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "064607df-dc27-4061-bee0-dded1b569ae2",
                  "type": "has_only_phrase",
                  "uuid": "85022cc6-e373-4396-8919-60bb86317290"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "064607df-dc27-4061-bee0-dded1b569ae2",
                  "type": "has_only_phrase",
                  "uuid": "faa2c6a9-7dd2-4862-9931-04c64f622f77"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "064607df-dc27-4061-bee0-dded1b569ae2",
                  "type": "has_only_phrase",
                  "uuid": "2da6bdda-5bd7-46d9-8286-95f07b93698c"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "064607df-dc27-4061-bee0-dded1b569ae2",
                  "type": "has_only_phrase",
                  "uuid": "94c2d4a5-9ee1-45a9-906d-1603ef30c2ba"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d91b5e4b-375f-4eb6-8108-6689b3628a80",
                  "name": "All Responses",
                  "uuid": "6414a457-8d0c-4231-83c0-e6f94f7af342"
                },
                {
                  "exit_uuid": "2220a11c-639d-4390-b90a-dade21cc0945",
                  "name": "0;1",
                  "uuid": "ae291644-b024-4d5a-a8de-2b0941a3aa0c"
                },
                {
                  "exit_uuid": "78f5adee-5b49-49ce-81ce-d74d7b06a67a",
                  "name": "2;3;4;5;6;7",
                  "uuid": "064607df-dc27-4061-bee0-dded1b569ae2"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "d91b5e4b-375f-4eb6-8108-6689b3628a80",
                "destination_uuid": null
              },
              {
                "uuid": "2220a11c-639d-4390-b90a-dade21cc0945",
                "destination_uuid": "9ca9df36-785c-41c4-918e-71c8e4a3ddb7"
              },
              {
                "uuid": "78f5adee-5b49-49ce-81ce-d74d7b06a67a",
                "destination_uuid": "0f2576b1-02d8-4c6f-9cab-e3eb32521910"
              }
            ]
          },
          {
            "uuid": "9ca9df36-785c-41c4-918e-71c8e4a3ddb7",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "b1459607-18cb-4947-8a56-9e35c654ab55"
              }
            ],
            "exits": [
              {
                "uuid": "6b3f59cd-2b2b-41ea-882b-163e2e18b923",
                "destination_uuid": "9d33cd4b-3866-4f37-8070-8319665d151d"
              }
            ]
          },
          {
            "uuid": "0f2576b1-02d8-4c6f-9cab-e3eb32521910",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "3e230a2e-9009-4b92-8a07-14e7aa51e55d"
              }
            ],
            "exits": [
              {
                "uuid": "b71539ae-3e50-4d34-ac08-7ca27e238607",
                "destination_uuid": "9d33cd4b-3866-4f37-8070-8319665d151d"
              }
            ]
          },
          {
            "uuid": "9d33cd4b-3866-4f37-8070-8319665d151d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "03942a4c-588a-4082-8fc7-7d30fccb7446",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "99039f94-7c99-4e1f-bd15-9e96adf37577",
                  "type": "has_only_phrase",
                  "uuid": "50542ef4-7e53-4340-bbaa-9307fc0720f3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "022ae166-b9bc-476c-bcfd-c3cb102a8297",
                  "name": "All Responses",
                  "uuid": "03942a4c-588a-4082-8fc7-7d30fccb7446"
                },
                {
                  "exit_uuid": "0e06a293-39e2-4ae6-94d1-273b3c0b489b",
                  "name": "Next",
                  "uuid": "99039f94-7c99-4e1f-bd15-9e96adf37577"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "022ae166-b9bc-476c-bcfd-c3cb102a8297",
                "destination_uuid": null
              },
              {
                "uuid": "0e06a293-39e2-4ae6-94d1-273b3c0b489b",
                "destination_uuid": "ccdb7e0a-b4a4-4dfa-a05f-4d0717426bde"
              }
            ]
          },
          {
            "uuid": "ccdb7e0a-b4a4-4dfa-a05f-4d0717426bde",
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
                "uuid": "52bf0673-a362-438f-b4a8-9c54c68c1e07"
              }
            ],
            "exits": [
              {
                "uuid": "18ae7e1f-3289-4a5d-ad4d-66b0b96aa669",
                "destination_uuid": "331da1d0-fc41-4dfa-9715-2b353fc6ff74"
              }
            ]
          },
          {
            "uuid": "331da1d0-fc41-4dfa-9715-2b353fc6ff74",
            "actions": [],
            "exits": [
              {
                "uuid": "9db94826-47df-47a5-aab4-1cba57529a94",
                "destination_uuid": "1be028da-c3f4-44f9-b2f4-18224aba8228"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9d332986-5ae6-48a1-8ee8-adf523848f4a",
              "cases": [],
              "categories": [
                {
                  "uuid": "9d332986-5ae6-48a1-8ee8-adf523848f4a",
                  "name": "All Responses",
                  "exit_uuid": "9db94826-47df-47a5-aab4-1cba57529a94"
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
            "uuid": "1be028da-c3f4-44f9-b2f4-18224aba8228",
            "actions": [
              {
                "uuid": "6e003f06-c400-46de-ad28-9075343d760d",
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
                "uuid": "556260b9-57d7-4fd6-8bf5-5dd5b0f37947",
                "destination_uuid": "aff081f7-5585-47f0-be68-a3bba8815d0e"
              }
            ]
          },
          {
            "uuid": "bbef4ac1-82a8-4557-9d9a-ff6aada6e993",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "ef78f8cd-1808-43d7-84ab-544b8c799a07"
              }
            ],
            "exits": [
              {
                "uuid": "bc8f6ef4-c26f-466d-a405-443263814ee4",
                "destination_uuid": "2abf2b0e-ed0c-4fa0-aa20-b98ecf4c73c8"
              }
            ]
          },
          {
            "uuid": "aff081f7-5585-47f0-be68-a3bba8815d0e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3cdfa2e1-caa3-4941-83c4-7da8f73a1cb4",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "73af4374-a2ca-4be8-a22f-061766ebfa56",
                  "type": "has_only_phrase",
                  "uuid": "707f046d-dd90-4f92-8455-c681c8e425b8"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "73af4374-a2ca-4be8-a22f-061766ebfa56",
                  "type": "has_only_phrase",
                  "uuid": "853d0d8d-b23e-456c-806e-48580cd99d4a"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "73af4374-a2ca-4be8-a22f-061766ebfa56",
                  "type": "has_only_phrase",
                  "uuid": "6fc2f1a8-ad14-4c11-9c30-1bb274eda873"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "73af4374-a2ca-4be8-a22f-061766ebfa56",
                  "type": "has_only_phrase",
                  "uuid": "478d4934-50a1-41fe-a4fb-0ab811fb7195"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "73af4374-a2ca-4be8-a22f-061766ebfa56",
                  "type": "has_only_phrase",
                  "uuid": "c7c3604e-c971-4205-8d5f-e164fa8e2ca0"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "73af4374-a2ca-4be8-a22f-061766ebfa56",
                  "type": "has_only_phrase",
                  "uuid": "6eb12b3e-22ba-4e69-b463-7a5f33b14154"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "73af4374-a2ca-4be8-a22f-061766ebfa56",
                  "type": "has_only_phrase",
                  "uuid": "c72d5f36-59b2-453f-99e2-1e25e1c5b79d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d8fb8cb0-dd31-40cc-94e5-7b8d35ba5417",
                  "name": "All Responses",
                  "uuid": "3cdfa2e1-caa3-4941-83c4-7da8f73a1cb4"
                },
                {
                  "exit_uuid": "8007f30e-b2e8-4785-87c9-a2a1afc7293d",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "73af4374-a2ca-4be8-a22f-061766ebfa56"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "d8fb8cb0-dd31-40cc-94e5-7b8d35ba5417",
                "destination_uuid": "bbef4ac1-82a8-4557-9d9a-ff6aada6e993"
              },
              {
                "uuid": "8007f30e-b2e8-4785-87c9-a2a1afc7293d",
                "destination_uuid": "91e7aed0-f54e-45df-812c-0eacc5fc0110"
              }
            ]
          },
          {
            "uuid": "91e7aed0-f54e-45df-812c-0eacc5fc0110",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "736d5654-afad-4376-9eb8-3b7d5b263528"
              }
            ],
            "exits": [
              {
                "uuid": "71ba39d9-9d92-4fb2-81f7-8ea2f33b2ec8",
                "destination_uuid": "2abf2b0e-ed0c-4fa0-aa20-b98ecf4c73c8"
              }
            ]
          },
          {
            "uuid": "2abf2b0e-ed0c-4fa0-aa20-b98ecf4c73c8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "316ac72e-b97d-42f8-905f-8065fc2c6d4b",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "13185373-9fc4-4f28-a107-ec88eb474b12",
                  "type": "has_only_phrase",
                  "uuid": "ab43caee-b762-40fd-bc19-e8bd2c7a17b1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "10be8702-655b-4a04-9790-12acba7e75cd",
                  "name": "All Responses",
                  "uuid": "316ac72e-b97d-42f8-905f-8065fc2c6d4b"
                },
                {
                  "exit_uuid": "127fb8ca-1823-43dd-92e7-5bc0948685c0",
                  "name": "Next",
                  "uuid": "13185373-9fc4-4f28-a107-ec88eb474b12"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "10be8702-655b-4a04-9790-12acba7e75cd",
                "destination_uuid": null
              },
              {
                "uuid": "127fb8ca-1823-43dd-92e7-5bc0948685c0",
                "destination_uuid": "bd6440b0-d46a-44d6-ac3e-8646aaa55219"
              }
            ]
          },
          {
            "uuid": "bd6440b0-d46a-44d6-ac3e-8646aaa55219",
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
                "uuid": "0c4f7b1a-df69-4dd8-b4f9-c090a44cf4f5"
              }
            ],
            "exits": [
              {
                "uuid": "cf0633f9-add1-4cf0-b7bd-b3e7e8da1312",
                "destination_uuid": "de93ed82-d8e9-4e7a-bea7-071beb345aa8"
              }
            ]
          },
          {
            "uuid": "de93ed82-d8e9-4e7a-bea7-071beb345aa8",
            "actions": [],
            "exits": [
              {
                "uuid": "0445e39d-2724-4688-a396-7deb2233fcbd",
                "destination_uuid": "5e8f48af-e7ea-429d-a13e-3e7f42044d2f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f35bcf89-d50c-430e-8a57-b187168f1e4a",
              "cases": [],
              "categories": [
                {
                  "uuid": "f35bcf89-d50c-430e-8a57-b187168f1e4a",
                  "name": "All Responses",
                  "exit_uuid": "0445e39d-2724-4688-a396-7deb2233fcbd"
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
            "uuid": "5e8f48af-e7ea-429d-a13e-3e7f42044d2f",
            "actions": [
              {
                "uuid": "2a6d9600-5351-44b4-bca3-1c8af5b9a562",
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
                "uuid": "a4c5adf4-8017-4f73-b412-86bfdc5d5158",
                "destination_uuid": "87ccb5b9-c152-4db6-b722-ccce69286189"
              }
            ]
          },
          {
            "uuid": "87ccb5b9-c152-4db6-b722-ccce69286189",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "29c6250d-ff7b-4d20-904a-6eef73fcc4d2",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "b566af1f-58d5-4211-85b5-2423ac6f509b",
                  "type": "has_only_phrase",
                  "uuid": "99711802-bab1-411b-9cf1-e5bc28c64cca"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "b566af1f-58d5-4211-85b5-2423ac6f509b",
                  "type": "has_only_phrase",
                  "uuid": "e11f6c10-69ab-4adb-84ec-4fffa8cba04b"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "b566af1f-58d5-4211-85b5-2423ac6f509b",
                  "type": "has_only_phrase",
                  "uuid": "62fc1bf7-2810-49a5-9948-b4bbe1ba4dc7"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "b566af1f-58d5-4211-85b5-2423ac6f509b",
                  "type": "has_only_phrase",
                  "uuid": "638d2c06-5439-4788-bfd2-b34a09ae7953"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "b566af1f-58d5-4211-85b5-2423ac6f509b",
                  "type": "has_only_phrase",
                  "uuid": "c16ebc27-7a00-4380-b5dd-b507c3d29a43"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "9c07efaf-d71e-4f41-826d-1f71aab64010",
                  "type": "has_only_phrase",
                  "uuid": "67d8e69f-f229-46f4-9286-91f0c7d82137"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "9c07efaf-d71e-4f41-826d-1f71aab64010",
                  "type": "has_only_phrase",
                  "uuid": "c6bc6422-6ec6-4e16-8bf8-0dcccf305264"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "9c07efaf-d71e-4f41-826d-1f71aab64010",
                  "type": "has_only_phrase",
                  "uuid": "7e12f289-3c08-47a7-87b3-4e326eb30644"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "9c07efaf-d71e-4f41-826d-1f71aab64010",
                  "type": "has_only_phrase",
                  "uuid": "84da3026-4604-4e0d-98a8-61cb1007dce6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "775fe5b8-f3b7-4d47-b11a-70dbbc365843",
                  "name": "All Responses",
                  "uuid": "29c6250d-ff7b-4d20-904a-6eef73fcc4d2"
                },
                {
                  "exit_uuid": "7e6603a8-7420-4ec9-a97c-b14efe3a490f",
                  "name": "0;1;2;3;4",
                  "uuid": "b566af1f-58d5-4211-85b5-2423ac6f509b"
                },
                {
                  "exit_uuid": "b81b06dc-875c-4a93-ab2a-eb79bce31950",
                  "name": "5;6;7;8",
                  "uuid": "9c07efaf-d71e-4f41-826d-1f71aab64010"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "775fe5b8-f3b7-4d47-b11a-70dbbc365843",
                "destination_uuid": null
              },
              {
                "uuid": "7e6603a8-7420-4ec9-a97c-b14efe3a490f",
                "destination_uuid": "b004cc46-4c6a-4e73-bea5-4ea3e926e6fb"
              },
              {
                "uuid": "b81b06dc-875c-4a93-ab2a-eb79bce31950",
                "destination_uuid": "8ec0176a-d9ad-4e8d-ab8a-37c529e26024"
              }
            ]
          },
          {
            "uuid": "b004cc46-4c6a-4e73-bea5-4ea3e926e6fb",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "b96f194a-b49c-43aa-a0db-18143cf62b69"
              }
            ],
            "exits": [
              {
                "uuid": "bda4aaab-cec7-4b9a-af46-04c27c753e97",
                "destination_uuid": "34aadc79-883d-46e1-b3ff-6601cc3ba9c1"
              }
            ]
          },
          {
            "uuid": "8ec0176a-d9ad-4e8d-ab8a-37c529e26024",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "36f59bfa-e7fb-427f-a651-0748f62574ca"
              }
            ],
            "exits": [
              {
                "uuid": "7b60a3de-ae1c-4dce-85d7-5081cc893d3d",
                "destination_uuid": "34aadc79-883d-46e1-b3ff-6601cc3ba9c1"
              }
            ]
          },
          {
            "uuid": "34aadc79-883d-46e1-b3ff-6601cc3ba9c1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d68f2d97-cb02-4c4f-970e-c2189010701d",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "f288c343-5722-4dba-89a0-cb572718ca0f",
                  "type": "has_only_phrase",
                  "uuid": "5c566e28-7195-47e6-b5c9-b1d47a6ecdc9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d50c4943-ffca-4dd5-ac92-bb92a675e2f3",
                  "name": "All Responses",
                  "uuid": "d68f2d97-cb02-4c4f-970e-c2189010701d"
                },
                {
                  "exit_uuid": "a061057e-47cb-430d-b0e2-0544885a499e",
                  "name": "Next",
                  "uuid": "f288c343-5722-4dba-89a0-cb572718ca0f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d50c4943-ffca-4dd5-ac92-bb92a675e2f3",
                "destination_uuid": null
              },
              {
                "uuid": "a061057e-47cb-430d-b0e2-0544885a499e",
                "destination_uuid": "6ba7c593-c288-4e35-90b3-2ec1b4a0b061"
              }
            ]
          },
          {
            "uuid": "6ba7c593-c288-4e35-90b3-2ec1b4a0b061",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "b091a136-a997-421a-9a81-07215b0703b3"
              }
            ],
            "exits": [
              {
                "uuid": "e165de8a-1faf-49e3-b38a-8528c2e6bce3",
                "destination_uuid": "124bad64-7607-43a7-b1eb-1008a9965a24"
              }
            ]
          },
          {
            "uuid": "124bad64-7607-43a7-b1eb-1008a9965a24",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "90ef8ef3-af19-49d2-bb40-e87295f0bc0b",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "cd91881c-4700-4e26-9d7d-9fd6732b7657",
                  "type": "has_only_phrase",
                  "uuid": "ecc091ff-2da5-4a73-8c92-9b158a3d3d44"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "236e123d-abbc-4632-a994-a5e28d0d1c59",
                  "name": "All Responses",
                  "uuid": "90ef8ef3-af19-49d2-bb40-e87295f0bc0b"
                },
                {
                  "exit_uuid": "a0a5d6e9-1a8f-4151-89a3-e5337527054f",
                  "name": "Next",
                  "uuid": "cd91881c-4700-4e26-9d7d-9fd6732b7657"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "236e123d-abbc-4632-a994-a5e28d0d1c59",
                "destination_uuid": null
              },
              {
                "uuid": "a0a5d6e9-1a8f-4151-89a3-e5337527054f",
                "destination_uuid": "6a89b3e9-3300-4195-8ef7-f98df67f2296"
              }
            ]
          },
          {
            "uuid": "6a89b3e9-3300-4195-8ef7-f98df67f2296",
            "actions": [
              {
                "uuid": "6910c968-4910-474b-9f56-2b3e0be0af7f",
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
                "uuid": "7e4417bb-000d-47ef-a18b-964234d857a9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bb1fe273-df3e-4e96-bfe7-87988996facc",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b35036d2-313b-4a01-b2b2-dfcdd6eac1cf",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "d639a3a3-4d67-40dc-a999-365b980763b3"
              }
            ],
            "exits": [
              {
                "uuid": "c0501416-7aad-4753-b8b0-a7c992c6be3f",
                "destination_uuid": "5e15e893-fb2a-411b-a5fc-501436ce6ec8"
              }
            ]
          },
          {
            "uuid": "5e15e893-fb2a-411b-a5fc-501436ce6ec8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "77923111-8400-446d-8ee8-0a22b1077662",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "3802edf8-a964-4af7-9d80-ace73b6c381b",
                  "type": "has_only_phrase",
                  "uuid": "bd8ca7f7-33a1-4a35-904a-5b039b2a750b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "73bbf322-7f56-449d-976c-bf9d48cbb59e",
                  "name": "All Responses",
                  "uuid": "77923111-8400-446d-8ee8-0a22b1077662"
                },
                {
                  "exit_uuid": "0bea5484-2eac-40d0-acec-2ae0ba856fbb",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "3802edf8-a964-4af7-9d80-ace73b6c381b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "73bbf322-7f56-449d-976c-bf9d48cbb59e",
                "destination_uuid": null
              },
              {
                "uuid": "0bea5484-2eac-40d0-acec-2ae0ba856fbb",
                "destination_uuid": "6c5f40eb-4b46-46d5-a2be-eaf975cdc9ef"
              }
            ]
          },
          {
            "uuid": "6c5f40eb-4b46-46d5-a2be-eaf975cdc9ef",
            "actions": [
              {
                "uuid": "1e838fe2-0510-4779-9e51-9dbf99ab7902",
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
                "uuid": "551d9280-8e52-4a4a-9b24-7ad83c0e34c8",
                "destination_uuid": "62f8f230-ca0f-4a0f-90f6-bdef3f7b505b"
              }
            ]
          },
          {
            "uuid": "62f8f230-ca0f-4a0f-90f6-bdef3f7b505b",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "e1ee4231-c1ac-41ae-a149-669cf9ae68d9"
                },
                "type": "enter_flow",
                "uuid": "e90e443f-da6d-4681-8a67-01f78f46537e"
              }
            ],
            "exits": [
              {
                "uuid": "c26431b0-dcc2-4b4c-89ba-37cbacb6a852",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f21c1dc8-664b-4c1c-b7b4-fd6d0bd79f50",
            "actions": [
              {
                "uuid": "77411730-a310-4ece-99fe-abfe22a7b66a",
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
                "uuid": "e6d9d2cc-c732-4d16-ba16-bc278eef8533",
                "destination_uuid": "97e76af6-7a57-485d-ab8e-65a7f1c9a20b"
              }
            ]
          },
          {
            "uuid": "97e76af6-7a57-485d-ab8e-65a7f1c9a20b",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "45d69568-2266-479d-92a1-4f4fda07bfc8"
                },
                "type": "enter_flow",
                "uuid": "dda3d655-9fd3-48f5-baee-fcf20932b5eb"
              }
            ],
            "exits": [
              {
                "uuid": "cef9b6c3-38ec-4fb0-bd9a-6a0f6f985e9b",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "fd75aed7-624b-491b-8561-8132efa83d25",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "773485ad-c229-4a26-a98f-f8a85d56c0c8",
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
                "uuid": "856761b2-04aa-4cf6-935d-d54c0c0b89d9"
              }
            ],
            "exits": [
              {
                "uuid": "ba1ba03e-e6dd-4571-90ee-a0ebf5277ed3",
                "destination_uuid": "98a2ac19-d6aa-4847-9c53-cfc30248e2e2"
              }
            ]
          },
          {
            "uuid": "98a2ac19-d6aa-4847-9c53-cfc30248e2e2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b6efdc28-b5cc-4ac1-b807-8ae55c3907f1",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "874bb90e-e741-4f78-b0d6-6d2f98e10ff8",
                  "type": "has_only_phrase",
                  "uuid": "3638035d-7e97-475b-bd4a-e8ea131b601f"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "6d865a1d-d0b4-4afd-87a9-3b8795a343ba",
                  "type": "has_only_phrase",
                  "uuid": "5cca5539-6b5f-4d2f-831d-c89603c6eabb"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "6d865a1d-d0b4-4afd-87a9-3b8795a343ba",
                  "type": "has_only_phrase",
                  "uuid": "f78c86fb-488b-4502-a4f7-8c3fb7910155"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f702b7b0-9e7c-4b4c-bb76-5f739cd308d7",
                  "name": "All Responses",
                  "uuid": "b6efdc28-b5cc-4ac1-b807-8ae55c3907f1"
                },
                {
                  "exit_uuid": "db005179-027e-405d-80d6-dc983d2ee47b",
                  "name": "Happy",
                  "uuid": "874bb90e-e741-4f78-b0d6-6d2f98e10ff8"
                },
                {
                  "exit_uuid": "d3c45448-9b8b-449f-8648-697e4501ce86",
                  "name": "Neutral; Sad",
                  "uuid": "6d865a1d-d0b4-4afd-87a9-3b8795a343ba"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f702b7b0-9e7c-4b4c-bb76-5f739cd308d7",
                "destination_uuid": null
              },
              {
                "uuid": "db005179-027e-405d-80d6-dc983d2ee47b",
                "destination_uuid": "e7d7ad13-5af2-496d-b1e8-5169232a8617"
              },
              {
                "uuid": "d3c45448-9b8b-449f-8648-697e4501ce86",
                "destination_uuid": "4d3f7517-36af-4c49-98b2-1f437cb231b2"
              }
            ]
          },
          {
            "uuid": "e7d7ad13-5af2-496d-b1e8-5169232a8617",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "e4e7cc5f-975b-4763-801b-a636326f234f"
              }
            ],
            "exits": [
              {
                "uuid": "0652f42c-642c-4ab7-b1ca-b70fa9590347",
                "destination_uuid": "c9d8855b-4c07-4eb1-b7e5-9251251b2cf2"
              }
            ]
          },
          {
            "uuid": "4d3f7517-36af-4c49-98b2-1f437cb231b2",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "520632fb-5d7f-4f35-bfe6-1cce13daeef8"
              }
            ],
            "exits": [
              {
                "uuid": "8a837a4e-2da5-4fa4-891c-259b2be7045d",
                "destination_uuid": "e75ab594-9b30-4f64-88c7-0f2433d57829"
              }
            ]
          },
          {
            "uuid": "e75ab594-9b30-4f64-88c7-0f2433d57829",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "a6718bc2-6f63-4c5a-8647-4473dcbebb12"
              }
            ],
            "exits": [
              {
                "uuid": "d1ac2049-325c-46e4-baf3-ae9d20a021a9",
                "destination_uuid": "ee6d5ce5-b9d1-4c1b-96b1-de29145becc8"
              }
            ]
          },
          {
            "uuid": "ee6d5ce5-b9d1-4c1b-96b1-de29145becc8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "84747d0a-2521-47e6-aa33-63fe7332fc2c",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "677da848-ce0e-45cb-8a4a-95a0e12566b7",
                  "type": "has_only_phrase",
                  "uuid": "ed4207c7-3ad4-4b31-86f0-8d73d15b9d99"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "ba1fa91a-68f2-4ffc-bd7d-aab764b398a4",
                  "type": "has_only_phrase",
                  "uuid": "1d61a4f5-3265-482c-971d-5e8ac21b496b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ca7bd19a-f543-4f4f-b667-b30db6e4036d",
                  "name": "All Responses",
                  "uuid": "84747d0a-2521-47e6-aa33-63fe7332fc2c"
                },
                {
                  "exit_uuid": "bf958f96-9164-42a6-a36e-e072bb3262ae",
                  "name": "Yes",
                  "uuid": "677da848-ce0e-45cb-8a4a-95a0e12566b7"
                },
                {
                  "exit_uuid": "b45c9453-664c-4947-844e-2ce3a492f9d6",
                  "name": "No",
                  "uuid": "ba1fa91a-68f2-4ffc-bd7d-aab764b398a4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ca7bd19a-f543-4f4f-b667-b30db6e4036d",
                "destination_uuid": null
              },
              {
                "uuid": "bf958f96-9164-42a6-a36e-e072bb3262ae",
                "destination_uuid": "ae07daf1-5e2c-4de6-a41e-23da266c4105"
              },
              {
                "uuid": "b45c9453-664c-4947-844e-2ce3a492f9d6",
                "destination_uuid": "9b640cc7-f188-4493-967d-898d316c4937"
              }
            ]
          },
          {
            "uuid": "ae07daf1-5e2c-4de6-a41e-23da266c4105",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "7f582343-b793-47b9-a76a-a81490bc2c4e"
                },
                "type": "enter_flow",
                "uuid": "60f115fe-2206-424c-b919-1d9d35178715"
              }
            ],
            "exits": [
              {
                "uuid": "1f61c69f-2f99-4342-8e7f-e4f7d702b5fe",
                "destination_uuid": "791e340d-44f9-4b50-b8e0-8b936af66236"
              },
              {
                "uuid": "03b72afc-1dfc-4cf4-ac22-c19c7ca38a2e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "33bb7152-3f7e-4671-b286-efc0e749b124",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "91c533c2-8014-4107-bff4-884ee34d98f7"
                },
                {
                  "uuid": "0b37b7b1-5ab9-41a9-a0b3-87f915b139b5",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c113235f-ab6f-474b-9b9c-efb242c0032d"
                }
              ],
              "categories": [
                {
                  "uuid": "91c533c2-8014-4107-bff4-884ee34d98f7",
                  "name": "Complete",
                  "exit_uuid": "1f61c69f-2f99-4342-8e7f-e4f7d702b5fe"
                },
                {
                  "uuid": "c113235f-ab6f-474b-9b9c-efb242c0032d",
                  "name": "Expired",
                  "exit_uuid": "03b72afc-1dfc-4cf4-ac22-c19c7ca38a2e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "91c533c2-8014-4107-bff4-884ee34d98f7"
            }
          },
          {
            "uuid": "791e340d-44f9-4b50-b8e0-8b936af66236",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "15202ab3-141c-4b0e-8b22-1e56228854c8"
              }
            ],
            "exits": [
              {
                "uuid": "fa9a1b06-e4fb-4f24-8869-99d8d44f1df2",
                "destination_uuid": "e6cccd5d-f8a8-47c1-8335-ce321c3793e8"
              }
            ]
          },
          {
            "uuid": "e6cccd5d-f8a8-47c1-8335-ce321c3793e8",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "09b26e43-89c5-4fba-9024-3e27099f9db4"
              }
            ],
            "exits": [
              {
                "uuid": "bf30086f-d49b-4829-8e91-7d375b6b61de",
                "destination_uuid": "c9d8855b-4c07-4eb1-b7e5-9251251b2cf2"
              }
            ]
          },
          {
            "uuid": "9b640cc7-f188-4493-967d-898d316c4937",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "640fb015-3f07-47ec-9337-8c9d509f9373"
              }
            ],
            "exits": [
              {
                "uuid": "dc6b56a4-9411-43fc-a39b-3ab23d61ee3b",
                "destination_uuid": "c9d8855b-4c07-4eb1-b7e5-9251251b2cf2"
              }
            ]
          },
          {
            "uuid": "c9d8855b-4c07-4eb1-b7e5-9251251b2cf2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "936cba04-f5b7-484a-8bdc-bf6eb1479cea",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "8ce7b439-1876-46f0-bf5e-fc7007014218",
                  "type": "has_only_phrase",
                  "uuid": "4fa7cb3b-e260-4ecb-8eab-27f7722f0452"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "61d62de4-886b-47e5-89a8-427194186760",
                  "name": "All Responses",
                  "uuid": "936cba04-f5b7-484a-8bdc-bf6eb1479cea"
                },
                {
                  "exit_uuid": "8b08ccf0-9ca0-4f27-b2cb-bac44647d539",
                  "name": "Chat to @fields.elder",
                  "uuid": "8ce7b439-1876-46f0-bf5e-fc7007014218"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "61d62de4-886b-47e5-89a8-427194186760",
                "destination_uuid": null
              },
              {
                "uuid": "8b08ccf0-9ca0-4f27-b2cb-bac44647d539",
                "destination_uuid": "5bbec102-0d78-4f0f-928c-ada81209dc9f"
              }
            ]
          },
          {
            "uuid": "5bbec102-0d78-4f0f-928c-ada81209dc9f",
            "actions": [
              {
                "uuid": "0e78ba5d-8be3-4c04-b40f-6fb23fb0c3fa",
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
                "uuid": "cda9b1ce-32fc-472b-9476-e54a8561c118",
                "destination_uuid": "0647cb9a-40f5-4e66-9b22-fc08e170d6bc"
              }
            ]
          },
          {
            "uuid": "0647cb9a-40f5-4e66-9b22-fc08e170d6bc",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "817f896b-b0e5-4177-a6d2-5b884b6d4abb"
                },
                "type": "enter_flow",
                "uuid": "d3c8459d-492a-416d-9da8-4b49f18ec49c"
              }
            ],
            "exits": [
              {
                "uuid": "08c3f37b-3309-472e-b4f8-fd78f5b90c15",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "53a7bcec-9f99-40b7-a676-679b164e12cc",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "74fbbc37-9c48-4330-a8a1-55e5208b93c0",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b3903a56-7421-4054-b4fb-18c339ddf95f"
              }
            ],
            "exits": [
              {
                "uuid": "991b96d3-5df5-42e8-8736-893dff44ae40",
                "destination_uuid": "16797179-e788-4bba-8fe6-b867ea5beb3f"
              }
            ]
          },
          {
            "uuid": "16797179-e788-4bba-8fe6-b867ea5beb3f",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ae7d62bf-4a74-414a-92ea-d5085997f39b"
              }
            ],
            "exits": [
              {
                "uuid": "ee0be3bf-c3c1-432e-8fbb-d1a23ab3e5b2",
                "destination_uuid": "879d9ad3-4b9d-4a73-8115-c64f269420d0"
              }
            ]
          },
          {
            "uuid": "879d9ad3-4b9d-4a73-8115-c64f269420d0",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "93e9655c-d25f-4ce3-9026-cb9039d4afda"
              }
            ],
            "exits": [
              {
                "uuid": "20b66f3c-7ac2-4bf3-89bd-ee80c1461927",
                "destination_uuid": "1acbfaf0-96b3-4276-8ff4-40ab4b7caaee"
              }
            ]
          },
          {
            "uuid": "1acbfaf0-96b3-4276-8ff4-40ab4b7caaee",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "662ef3a4-ae68-42c6-b3a9-60b5ba7dff60",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "da3743a7-aac2-425d-ab4c-75262c1752cc",
                  "type": "has_only_phrase",
                  "uuid": "bbd0dee7-2474-452a-952d-8961f8cc1277"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "8e3799d5-7b6f-464f-bab9-233902190c0a",
                  "type": "has_only_phrase",
                  "uuid": "12f0d17e-9a3a-4101-8997-0b714cee8b30"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f2aadb18-8015-4488-9b3a-5f149164c0a1",
                  "name": "All Responses",
                  "uuid": "662ef3a4-ae68-42c6-b3a9-60b5ba7dff60"
                },
                {
                  "exit_uuid": "8fd2a48d-39a1-4771-896d-d2624b8a728d",
                  "name": "Yes",
                  "uuid": "da3743a7-aac2-425d-ab4c-75262c1752cc"
                },
                {
                  "exit_uuid": "041b780c-1379-4134-853b-8a28156f8612",
                  "name": "No",
                  "uuid": "8e3799d5-7b6f-464f-bab9-233902190c0a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f2aadb18-8015-4488-9b3a-5f149164c0a1",
                "destination_uuid": null
              },
              {
                "uuid": "8fd2a48d-39a1-4771-896d-d2624b8a728d",
                "destination_uuid": "20d7bdc9-5fd0-44a9-8505-cd76ed279e4b"
              },
              {
                "uuid": "041b780c-1379-4134-853b-8a28156f8612",
                "destination_uuid": "18bd668d-896e-4547-89cf-42afe3c3f34a"
              }
            ]
          },
          {
            "uuid": "20d7bdc9-5fd0-44a9-8505-cd76ed279e4b",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b6eeb541-eb98-4ca1-bd9f-57ce5a17233a"
              }
            ],
            "exits": [
              {
                "uuid": "bd1cd745-2fc4-4cf6-901f-fccb55895d73",
                "destination_uuid": "0fae1cc6-7323-4b86-aa67-425f44a493e2"
              }
            ]
          },
          {
            "uuid": "18bd668d-896e-4547-89cf-42afe3c3f34a",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ab6ed2ee-0559-476c-a716-c7a6d5d26478"
              }
            ],
            "exits": [
              {
                "uuid": "c1625ab3-1fc3-46e0-9e8b-6f2a046ab5de",
                "destination_uuid": "0fae1cc6-7323-4b86-aa67-425f44a493e2"
              }
            ]
          },
          {
            "uuid": "0fae1cc6-7323-4b86-aa67-425f44a493e2",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "94f1e4ab-bf37-4a28-a401-28ea0de300b7"
              }
            ],
            "exits": [
              {
                "uuid": "d7765c08-e554-478e-a9a5-98198c670939",
                "destination_uuid": "846b5334-2961-44fc-9b92-1cd5d5daafe7"
              }
            ]
          },
          {
            "uuid": "846b5334-2961-44fc-9b92-1cd5d5daafe7",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "b295915c-b94d-4fcd-9f35-44cb23eab1a1"
              }
            ],
            "exits": [
              {
                "uuid": "89340590-222e-46f2-a565-8b19f43112fd",
                "destination_uuid": "5312dede-9b5e-43e6-9c11-fa4535f708cb"
              }
            ]
          },
          {
            "uuid": "5312dede-9b5e-43e6-9c11-fa4535f708cb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5c3258b5-94bf-469d-ab2a-a277a3612c14",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "e4eb4826-d38e-4ec6-a06b-818fb3f50580",
                  "type": "has_only_phrase",
                  "uuid": "f55d0e54-9420-4dd1-9e45-c56b1528cff9"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "4014bf64-8d5a-4b6a-b00b-bd906443a6a4",
                  "type": "has_only_phrase",
                  "uuid": "f042a957-918f-4ceb-9455-208eb4651ccf"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7010aeb3-881b-4c87-98d5-61360d1643e4",
                  "name": "All Responses",
                  "uuid": "5c3258b5-94bf-469d-ab2a-a277a3612c14"
                },
                {
                  "exit_uuid": "acae40ff-78b1-488d-9439-d838ed1f7acc",
                  "name": "Yes",
                  "uuid": "e4eb4826-d38e-4ec6-a06b-818fb3f50580"
                },
                {
                  "exit_uuid": "286a655c-046b-443d-bb64-20425e2d8f19",
                  "name": "Later",
                  "uuid": "4014bf64-8d5a-4b6a-b00b-bd906443a6a4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7010aeb3-881b-4c87-98d5-61360d1643e4",
                "destination_uuid": null
              },
              {
                "uuid": "acae40ff-78b1-488d-9439-d838ed1f7acc",
                "destination_uuid": "e9e3d1dc-5ae1-42f1-912d-2192d2ef0c31"
              },
              {
                "uuid": "286a655c-046b-443d-bb64-20425e2d8f19",
                "destination_uuid": "2bd2ba62-3621-41bd-aa1e-52f3eb79a49c"
              }
            ]
          },
          {
            "uuid": "e9e3d1dc-5ae1-42f1-912d-2192d2ef0c31",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "223475b3-4bcf-4f49-9b08-5cacdec157e0"
              }
            ],
            "exits": [
              {
                "uuid": "6f7433eb-11cf-4c68-96cf-137593b4d93f",
                "destination_uuid": "6537f572-8d3e-4a86-accb-a72733ccb47f"
              }
            ]
          },
          {
            "uuid": "6537f572-8d3e-4a86-accb-a72733ccb47f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3e98c8c1-fb6a-4aa6-8a06-9e557676787f",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "3efee372-3dbb-4063-9d90-a94eafd699db",
                  "type": "has_only_phrase",
                  "uuid": "dd322b2c-b8a7-4876-96ec-f1a1529223a1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d67123cf-3f3d-4835-9d4b-656261660baf",
                  "name": "All Responses",
                  "uuid": "3e98c8c1-fb6a-4aa6-8a06-9e557676787f"
                },
                {
                  "exit_uuid": "65e4ba04-e95d-41c7-83cf-f7aed0169df6",
                  "name": "Take me to Tips",
                  "uuid": "3efee372-3dbb-4063-9d90-a94eafd699db"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d67123cf-3f3d-4835-9d4b-656261660baf",
                "destination_uuid": null
              },
              {
                "uuid": "65e4ba04-e95d-41c7-83cf-f7aed0169df6",
                "destination_uuid": "96682124-80b9-4e40-b3f0-cf2661e45a6d"
              }
            ]
          },
          {
            "uuid": "96682124-80b9-4e40-b3f0-cf2661e45a6d",
            "actions": [
              {
                "uuid": "722dfc34-b6cd-47b7-b14b-2228c024082e",
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
                "uuid": "274ee189-5628-4f59-be91-839f6a21d778",
                "destination_uuid": "69d29ea2-303c-4b82-916f-d816f26857aa"
              }
            ]
          },
          {
            "uuid": "69d29ea2-303c-4b82-916f-d816f26857aa",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "35fa9224-71ad-4221-8eba-631118d7e88a"
                },
                "type": "enter_flow",
                "uuid": "119b8aa4-d876-4604-ae2c-3c0da2995031"
              }
            ],
            "exits": [
              {
                "uuid": "ca7745f6-bfa7-44ba-bc19-ff74ef82e3f2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "2bd2ba62-3621-41bd-aa1e-52f3eb79a49c",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "8995be64-57e8-4f02-b65e-d85bc4cca391"
              }
            ],
            "exits": [
              {
                "uuid": "555b2d02-1598-46be-b228-4bd2eb9794f1",
                "destination_uuid": "e1a13af5-5b7e-4b66-98e6-961c185ec59f"
              }
            ]
          },
          {
            "uuid": "e1a13af5-5b7e-4b66-98e6-961c185ec59f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "26f5fe6a-1a34-4aa0-a5e2-b35f71cb04c4",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "d298b941-c4b1-4b61-a998-f86ad427b597",
                  "type": "has_only_phrase",
                  "uuid": "4c97c252-0397-4db0-a4dc-56b758020a4f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f8c8cc1a-920f-49c4-bac6-2885d63e5cc8",
                  "name": "All Responses",
                  "uuid": "26f5fe6a-1a34-4aa0-a5e2-b35f71cb04c4"
                },
                {
                  "exit_uuid": "1fa1e32d-bc6b-48a6-acde-539eb7158a83",
                  "name": "Take me to the home screen",
                  "uuid": "d298b941-c4b1-4b61-a998-f86ad427b597"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f8c8cc1a-920f-49c4-bac6-2885d63e5cc8",
                "destination_uuid": null
              },
              {
                "uuid": "1fa1e32d-bc6b-48a6-acde-539eb7158a83",
                "destination_uuid": "31fe8baa-1dc2-442c-8828-8b52002d105d"
              }
            ]
          },
          {
            "uuid": "31fe8baa-1dc2-442c-8828-8b52002d105d",
            "actions": [
              {
                "uuid": "f0f12e4b-9c84-459c-b05e-85fc2746cfbb",
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
                "uuid": "f439eacb-fd14-4ba8-a7ad-638b0f9ac9bd",
                "destination_uuid": "c47ae384-98ed-4f8e-a8a4-5070ebcb2648"
              }
            ]
          },
          {
            "uuid": "c47ae384-98ed-4f8e-a8a4-5070ebcb2648",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "97220a9e-7303-415c-811a-e8eae8a21e83"
                },
                "type": "enter_flow",
                "uuid": "82891571-f631-4948-aff0-80d5ca88bf09"
              }
            ],
            "exits": [
              {
                "uuid": "3aa3c506-ce04-44d6-941f-c8230047a815",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4fd7eb85-315b-40e0-b386-788d651c025c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "dcbcddd3-87de-4b9d-ad5e-77393586f572",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8b6154da-45f0-46cc-8a86-2fe4b9bc5349"
              }
            ],
            "exits": [
              {
                "uuid": "fc4a7f4c-5b19-4211-8320-a592f4c69c09",
                "destination_uuid": "7e7e5f52-eedd-4c16-a9c4-23cd421b06f3"
              }
            ]
          },
          {
            "uuid": "7e7e5f52-eedd-4c16-a9c4-23cd421b06f3",
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
                "uuid": "767c317a-693d-4374-9e84-0dc0f562e32c"
              }
            ],
            "exits": [
              {
                "uuid": "d8ab1d00-8f38-435c-aaf8-b82208c59898",
                "destination_uuid": "3d94d07e-783d-4001-8c84-66d19a297f51"
              }
            ]
          },
          {
            "uuid": "3d94d07e-783d-4001-8c84-66d19a297f51",
            "actions": [],
            "exits": [
              {
                "uuid": "0ecec0dc-3cab-4ecc-82da-fd234f9df57e",
                "destination_uuid": "4083a05d-35ac-453c-ba75-1480091b83ef"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "aa3c2871-d952-41e3-b662-4c86a9882f3f",
              "cases": [],
              "categories": [
                {
                  "uuid": "aa3c2871-d952-41e3-b662-4c86a9882f3f",
                  "name": "All Responses",
                  "exit_uuid": "0ecec0dc-3cab-4ecc-82da-fd234f9df57e"
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
            "uuid": "4083a05d-35ac-453c-ba75-1480091b83ef",
            "actions": [
              {
                "uuid": "22c0b841-4e2e-4686-88ea-be8895642995",
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
                "uuid": "1a47d9d3-cc4f-4f20-b32a-c7ce8f73e6ff",
                "destination_uuid": "553434b9-700c-441d-9363-b0461fdf1289"
              }
            ]
          },
          {
            "uuid": "553434b9-700c-441d-9363-b0461fdf1289",
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
                "uuid": "ea70ad80-4d50-48d2-bf72-f7ff96a55455"
              }
            ],
            "exits": [
              {
                "uuid": "7dd9c2aa-0cff-47d7-9ff8-2d51a3515ec1",
                "destination_uuid": "80bb4530-6cdd-4b8f-8edf-6b3ff44733fc"
              }
            ]
          },
          {
            "uuid": "80bb4530-6cdd-4b8f-8edf-6b3ff44733fc",
            "actions": [],
            "exits": [
              {
                "uuid": "19358344-640d-483d-8a67-e8d5680a6521",
                "destination_uuid": "49722b9a-960a-42b7-b192-9158d7a00d74"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2e6bf6e3-004b-4dee-8994-842b33999590",
              "cases": [],
              "categories": [
                {
                  "uuid": "2e6bf6e3-004b-4dee-8994-842b33999590",
                  "name": "All Responses",
                  "exit_uuid": "19358344-640d-483d-8a67-e8d5680a6521"
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
            "uuid": "49722b9a-960a-42b7-b192-9158d7a00d74",
            "actions": [
              {
                "uuid": "bbce1e88-5ece-4146-86ae-13591d2c0da1",
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
                "uuid": "78ec2c36-3cc1-4714-b496-954e2777287d",
                "destination_uuid": "d802def1-b58a-4e2a-918c-4b4a00dc5430"
              }
            ]
          },
          {
            "uuid": "d802def1-b58a-4e2a-918c-4b4a00dc5430",
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
                "uuid": "53742689-c12e-4d5b-8063-c399bf51d488"
              }
            ],
            "exits": [
              {
                "uuid": "c3332339-fe76-4622-8a8c-a8986421bbd5",
                "destination_uuid": "3f785902-d32f-49ca-9d5a-eebb332f263f"
              }
            ]
          },
          {
            "uuid": "3f785902-d32f-49ca-9d5a-eebb332f263f",
            "actions": [],
            "exits": [
              {
                "uuid": "7493c79a-3f5b-4b81-a7f8-e79d226729c8",
                "destination_uuid": "b0f72ffb-ba82-4623-ae15-340a8d765278"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "154478f7-b2a4-4184-b581-0d7a1990bbad",
              "cases": [],
              "categories": [
                {
                  "uuid": "154478f7-b2a4-4184-b581-0d7a1990bbad",
                  "name": "All Responses",
                  "exit_uuid": "7493c79a-3f5b-4b81-a7f8-e79d226729c8"
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
            "uuid": "b0f72ffb-ba82-4623-ae15-340a8d765278",
            "actions": [
              {
                "uuid": "f11287a8-bec9-4452-b9f7-665e7a211d78",
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
                "uuid": "72cff217-d70e-44c0-8969-5f294eab695d",
                "destination_uuid": "380941f4-9a63-423a-9c80-46757b5752b4"
              }
            ]
          },
          {
            "uuid": "380941f4-9a63-423a-9c80-46757b5752b4",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "e0ef748d-3f30-4504-bb03-60e5efa326d3"
              }
            ],
            "exits": [
              {
                "uuid": "54f8c4d7-d96d-4aad-b057-9b7fc723e3a8",
                "destination_uuid": "d083213e-e565-4340-90ac-386c38390892"
              }
            ]
          },
          {
            "uuid": "d083213e-e565-4340-90ac-386c38390892",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "66cb102f-6e31-4f0a-b2fd-8d3617ce01d7",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "dcec0753-c9ba-4a39-a813-418ce14d5135",
                  "type": "has_only_phrase",
                  "uuid": "c01e858f-9dc0-4b46-9865-e616079d02d7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fd109ab4-1f29-4503-8f15-9a2bea0350a4",
                  "name": "All Responses",
                  "uuid": "66cb102f-6e31-4f0a-b2fd-8d3617ce01d7"
                },
                {
                  "exit_uuid": "002add32-0418-4476-af83-e4b016c936cd",
                  "name": "Take me to Homescreen",
                  "uuid": "dcec0753-c9ba-4a39-a813-418ce14d5135"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fd109ab4-1f29-4503-8f15-9a2bea0350a4",
                "destination_uuid": null
              },
              {
                "uuid": "002add32-0418-4476-af83-e4b016c936cd",
                "destination_uuid": "f8883e93-4848-4c9d-a4e4-e64096ce59f4"
              }
            ]
          },
          {
            "uuid": "f8883e93-4848-4c9d-a4e4-e64096ce59f4",
            "actions": [
              {
                "uuid": "ecb82753-8a24-4e18-87e6-f928d6e4ef8f",
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
                "uuid": "519b80e8-2a2f-4530-9bad-f78636d8b514",
                "destination_uuid": "8b31dc3d-1308-4b8d-9a5f-9168d3da323c"
              }
            ]
          },
          {
            "uuid": "8b31dc3d-1308-4b8d-9a5f-9168d3da323c",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "f236f9d6-3333-474e-b144-5997f89ae2e2"
                },
                "type": "enter_flow",
                "uuid": "d92bee2f-bf2a-494c-927e-70d5c2c4817f"
              }
            ],
            "exits": [
              {
                "uuid": "08318bca-6abc-48f6-b7fb-53947d7aa551",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "22a5b269-6de3-496f-88f1-ec21f2753ffc",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c920e058-820c-4bf4-874e-f10976a06583",
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
                "uuid": "62dbf202-6b26-4819-8200-c841ba40e267"
              }
            ],
            "exits": [
              {
                "uuid": "ef58c9e0-6d50-4f46-9708-97d7cc21723b",
                "destination_uuid": "02a55c82-2b3f-4179-a8b0-b4f899d06a52"
              }
            ]
          },
          {
            "uuid": "02a55c82-2b3f-4179-a8b0-b4f899d06a52",
            "actions": [],
            "exits": [
              {
                "uuid": "9e3b7072-2869-4885-86c9-86570a2bacf8",
                "destination_uuid": "de6b757c-97a9-4da2-9a35-75019767fa23"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6202c97e-8e95-4ef5-a0f4-441d857e1f8e",
              "cases": [],
              "categories": [
                {
                  "uuid": "6202c97e-8e95-4ef5-a0f4-441d857e1f8e",
                  "name": "All Responses",
                  "exit_uuid": "9e3b7072-2869-4885-86c9-86570a2bacf8"
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
            "uuid": "de6b757c-97a9-4da2-9a35-75019767fa23",
            "actions": [
              {
                "uuid": "5a882661-b631-4828-acb1-a52ad39c5e74",
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
                "uuid": "9324b690-5e51-4693-827f-8dd37e21cf9d",
                "destination_uuid": "e5079e99-1409-4e53-9bf8-dfb117a6e9a2"
              }
            ]
          },
          {
            "uuid": "e5079e99-1409-4e53-9bf8-dfb117a6e9a2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "99ca7276-2044-4404-b853-d6038a86fe3c",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "13a41859-725f-4b33-b76d-19848115e3cc",
                  "type": "has_only_phrase",
                  "uuid": "e73d6bf4-dc36-4bd5-9bae-6d49484b6ae6"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "0a921f76-170c-49cf-bfc8-d6b4e1e0d8c1",
                  "type": "has_only_phrase",
                  "uuid": "b561a5c6-0245-40af-b5e0-ea81881eb29c"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "e70f91a8-dc13-4aed-877b-0660e1b22de4",
                  "type": "has_only_phrase",
                  "uuid": "ac80bf72-460c-4401-8ddc-e359ef93ed41"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "87866ed7-3794-4033-b9c3-dca7ee0f0b6b",
                  "name": "All Responses",
                  "uuid": "99ca7276-2044-4404-b853-d6038a86fe3c"
                },
                {
                  "exit_uuid": "67051bc9-1022-4033-8ddc-119fdb637124",
                  "name": "Great",
                  "uuid": "13a41859-725f-4b33-b76d-19848115e3cc"
                },
                {
                  "exit_uuid": "95831427-9805-4a83-9bfa-53869e4f35b6",
                  "name": "Neutral",
                  "uuid": "0a921f76-170c-49cf-bfc8-d6b4e1e0d8c1"
                },
                {
                  "exit_uuid": "46e5eb81-f269-4726-8b4f-441c2988a477",
                  "name": "Bad",
                  "uuid": "e70f91a8-dc13-4aed-877b-0660e1b22de4"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "87866ed7-3794-4033-b9c3-dca7ee0f0b6b",
                "destination_uuid": null
              },
              {
                "uuid": "67051bc9-1022-4033-8ddc-119fdb637124",
                "destination_uuid": "7b155a0d-731d-4f3c-a356-638a6320a2d4"
              },
              {
                "uuid": "95831427-9805-4a83-9bfa-53869e4f35b6",
                "destination_uuid": "f61dc630-1f78-4cf3-8f7a-851f0cef436b"
              },
              {
                "uuid": "46e5eb81-f269-4726-8b4f-441c2988a477",
                "destination_uuid": "96895a9a-1bba-4b8a-8091-3ce64167b8d7"
              }
            ]
          },
          {
            "uuid": "7b155a0d-731d-4f3c-a356-638a6320a2d4",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f4c3bbd9-7f58-45fc-9e92-94a4f28bc82f"
              }
            ],
            "exits": [
              {
                "uuid": "092e5c76-8acb-4b83-8591-1a1a15c005ef",
                "destination_uuid": "80a3ab1b-af58-4141-a80c-8b7425868dea"
              }
            ]
          },
          {
            "uuid": "f61dc630-1f78-4cf3-8f7a-851f0cef436b",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "775bc612-5b33-4ca4-bdfb-91b2ce8ff217"
              }
            ],
            "exits": [
              {
                "uuid": "f332e99d-ad3c-4842-bfd6-10497a3c374c",
                "destination_uuid": "80a3ab1b-af58-4141-a80c-8b7425868dea"
              }
            ]
          },
          {
            "uuid": "80a3ab1b-af58-4141-a80c-8b7425868dea",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "d86df154-0105-446c-820e-3d8accbdbfc4"
                },
                "type": "enter_flow",
                "uuid": "7c8dd931-50c9-47c9-8836-5e8cec2998a5"
              }
            ],
            "exits": [
              {
                "uuid": "3bf1b065-be91-4bf1-9921-ed01bcc667cf",
                "destination_uuid": "26301abb-4e92-48e1-bf75-e476cea348ed"
              },
              {
                "uuid": "5e4b19ff-5d68-46f3-b0ca-252f9518dac2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "16543c0e-604a-48b2-91ca-43c5bb318cf4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4c42a854-dcd3-4be2-8235-5b1156f29552"
                },
                {
                  "uuid": "c8ee3e30-b989-4636-87ab-2ae97f82aaf2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a2a7e7fc-d5af-4da4-8e36-bebaf8cbb1d3"
                }
              ],
              "categories": [
                {
                  "uuid": "4c42a854-dcd3-4be2-8235-5b1156f29552",
                  "name": "Complete",
                  "exit_uuid": "3bf1b065-be91-4bf1-9921-ed01bcc667cf"
                },
                {
                  "uuid": "a2a7e7fc-d5af-4da4-8e36-bebaf8cbb1d3",
                  "name": "Expired",
                  "exit_uuid": "5e4b19ff-5d68-46f3-b0ca-252f9518dac2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4c42a854-dcd3-4be2-8235-5b1156f29552"
            }
          },
          {
            "uuid": "26301abb-4e92-48e1-bf75-e476cea348ed",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "5276ea06-ac86-4ca9-92cc-b533f21dcdab"
                },
                "type": "enter_flow",
                "uuid": "bfe14a7a-8beb-4f5c-8af0-a693ea18a6b9"
              }
            ],
            "exits": [
              {
                "uuid": "c3804a8f-0b17-493c-ad24-a8c7e9d5f2cc",
                "destination_uuid": "6b137a79-fa0c-472a-8493-e930830d45e1"
              },
              {
                "uuid": "b8ddac64-7085-499b-841c-88bac739b0fe",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "024f85d7-1741-4ee5-b90d-91264630ad20",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "5324e9f1-bd8d-4ce3-afb3-d761bf0410e7"
                },
                {
                  "uuid": "12f19fc6-db90-4038-9587-973b43d81d44",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "dc985869-9465-47ca-afd0-689338638bd1"
                }
              ],
              "categories": [
                {
                  "uuid": "5324e9f1-bd8d-4ce3-afb3-d761bf0410e7",
                  "name": "Complete",
                  "exit_uuid": "c3804a8f-0b17-493c-ad24-a8c7e9d5f2cc"
                },
                {
                  "uuid": "dc985869-9465-47ca-afd0-689338638bd1",
                  "name": "Expired",
                  "exit_uuid": "b8ddac64-7085-499b-841c-88bac739b0fe"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "5324e9f1-bd8d-4ce3-afb3-d761bf0410e7"
            }
          },
          {
            "uuid": "96895a9a-1bba-4b8a-8091-3ce64167b8d7",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "893cbdbf-d47e-4f13-8684-df5575fa7949"
              }
            ],
            "exits": [
              {
                "uuid": "9b9722b7-e578-4482-bb97-e7a847b4c106",
                "destination_uuid": "2943b06b-42d9-472b-bb15-4550a8a08fad"
              }
            ]
          },
          {
            "uuid": "2943b06b-42d9-472b-bb15-4550a8a08fad",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "491bf41e-44d4-4ac9-9eee-fc063b18e278"
                },
                "type": "enter_flow",
                "uuid": "600ac560-5801-4a29-a9f0-d39ce4b1a4aa"
              }
            ],
            "exits": [
              {
                "uuid": "55697c96-a7c6-4732-8492-386136debbd5",
                "destination_uuid": "cc3a250d-1490-41ff-acea-6ea217248674"
              },
              {
                "uuid": "0432fb50-e106-41d6-b37c-75e20e77a3c2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "80e49a86-fe9f-4d2b-900b-3931201c2bd8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b6fdfa62-accf-4d13-a58f-3902e31c73bd"
                },
                {
                  "uuid": "2d19b5ce-f5f2-4462-bf29-742c828f0d49",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "65c0b65b-7d73-4c4a-ba63-782aec8de90c"
                }
              ],
              "categories": [
                {
                  "uuid": "b6fdfa62-accf-4d13-a58f-3902e31c73bd",
                  "name": "Complete",
                  "exit_uuid": "55697c96-a7c6-4732-8492-386136debbd5"
                },
                {
                  "uuid": "65c0b65b-7d73-4c4a-ba63-782aec8de90c",
                  "name": "Expired",
                  "exit_uuid": "0432fb50-e106-41d6-b37c-75e20e77a3c2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b6fdfa62-accf-4d13-a58f-3902e31c73bd"
            }
          },
          {
            "uuid": "cc3a250d-1490-41ff-acea-6ea217248674",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "320fe730-1ac4-4772-9917-bc2368bb2caa"
                },
                "type": "enter_flow",
                "uuid": "12a0e526-3057-41c2-b631-99639d1631dc"
              }
            ],
            "exits": [
              {
                "uuid": "f192e967-8205-43c9-9067-7bea2ec39fe0",
                "destination_uuid": "6b137a79-fa0c-472a-8493-e930830d45e1"
              },
              {
                "uuid": "78f149f1-fbc6-4bb9-ab42-b488c946a167",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "372db47a-606e-4864-a17f-f71e38570d83",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "e1420942-4e7f-4388-9a2d-b870ffd5e0eb"
                },
                {
                  "uuid": "7f14d268-88b9-43dd-b9e4-b5d2a9d30f5b",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e6b1c82c-9f9a-4ef9-a24d-c936e1f45410"
                }
              ],
              "categories": [
                {
                  "uuid": "e1420942-4e7f-4388-9a2d-b870ffd5e0eb",
                  "name": "Complete",
                  "exit_uuid": "f192e967-8205-43c9-9067-7bea2ec39fe0"
                },
                {
                  "uuid": "e6b1c82c-9f9a-4ef9-a24d-c936e1f45410",
                  "name": "Expired",
                  "exit_uuid": "78f149f1-fbc6-4bb9-ab42-b488c946a167"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "e1420942-4e7f-4388-9a2d-b870ffd5e0eb"
            }
          },
          {
            "uuid": "6b137a79-fa0c-472a-8493-e930830d45e1",
            "actions": [
              {
                "uuid": "71db0c74-101f-4eb2-9892-4fe29fb54a41",
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
                "uuid": "edd9369b-ed57-450e-b515-89f3258aca32",
                "destination_uuid": "f0d0b4f6-aa56-4d20-95bc-6d5a6e1b1be9"
              }
            ]
          },
          {
            "uuid": "f0d0b4f6-aa56-4d20-95bc-6d5a6e1b1be9",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "2f87c04f-a253-4471-aaa6-3cd95a90f94c"
                },
                "type": "enter_flow",
                "uuid": "5f04e440-c42d-48ee-a03a-ac68b6476ea3"
              }
            ],
            "exits": [
              {
                "uuid": "bd81e393-ade2-4e41-be36-577b2e38c0a3",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a73b2e99-1e69-4f0e-8956-8f15bf7a83b4",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4244ed7f-f3d8-4795-9a68-5f7a43f3d34d",
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
                "uuid": "7fdadffe-c670-45f0-b435-0c71c7386334"
              }
            ],
            "exits": [
              {
                "uuid": "203e9bf4-10ca-4487-a175-eb8e548580c5",
                "destination_uuid": "d252980a-1252-478e-953d-be44451c64c8"
              }
            ]
          },
          {
            "uuid": "d252980a-1252-478e-953d-be44451c64c8",
            "actions": [],
            "exits": [
              {
                "uuid": "18fcdadf-3fe7-4fe7-b4b6-7dbafd4963c2",
                "destination_uuid": "d4796dd2-4a5f-4009-9188-2530fe48e3fa"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d1c67121-6a1a-4b7b-a126-578b3c5650c4",
              "cases": [],
              "categories": [
                {
                  "uuid": "d1c67121-6a1a-4b7b-a126-578b3c5650c4",
                  "name": "All Responses",
                  "exit_uuid": "18fcdadf-3fe7-4fe7-b4b6-7dbafd4963c2"
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
            "uuid": "d4796dd2-4a5f-4009-9188-2530fe48e3fa",
            "actions": [
              {
                "uuid": "53a11568-2667-45ec-9e26-30d2dcd2df84",
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
                "uuid": "f98bf6de-c4cc-4083-8e5a-f314e0571dc1",
                "destination_uuid": "6ec086f9-179e-410d-b3be-9619f34b2211"
              }
            ]
          },
          {
            "uuid": "6ec086f9-179e-410d-b3be-9619f34b2211",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6fea57cf-c9e6-4c0c-a837-f30f44bde084",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "bd8386fa-20c3-4aea-9acd-225def9f5313",
                  "type": "has_only_phrase",
                  "uuid": "223f9218-bdc1-445e-84f5-82f33692ccd0"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "06a958ab-33bf-49b9-be91-dbd59c3b17ca",
                  "type": "has_only_phrase",
                  "uuid": "55ff5fcf-7f56-4cb7-93de-8a73c992d5a9"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "2eb5d15b-96c7-4769-8e10-4d2c72512a96",
                  "type": "has_only_phrase",
                  "uuid": "e870998c-bacd-4931-b324-26d650a919c9"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "7d852494-17fc-433c-8050-7362bb7848f3",
                  "type": "has_only_phrase",
                  "uuid": "027933be-4917-4d77-808b-db3399a29efc"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "71bc7064-3424-457d-bd6c-ad82dd9a3edd",
                  "type": "has_only_phrase",
                  "uuid": "b3f5688a-3d48-4bdb-837f-adc7e0a5ae0b"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "bdb8271b-6b99-4153-bd3a-ca9595beb49f",
                  "type": "has_only_phrase",
                  "uuid": "308a54bb-af55-4279-9db2-540417f6e108"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "e4b12eb6-b854-44a9-9e89-c392d8b96ed1",
                  "type": "has_only_phrase",
                  "uuid": "de250053-285e-4371-9c11-4d7f198709d4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d3a16f1f-b1c4-4d7f-a5fe-88f258760431",
                  "name": "All Responses",
                  "uuid": "6fea57cf-c9e6-4c0c-a837-f30f44bde084"
                },
                {
                  "exit_uuid": "9dc4dff5-f4ea-47fa-92a5-8341f29c32b3",
                  "name": "Do it every day",
                  "uuid": "bd8386fa-20c3-4aea-9acd-225def9f5313"
                },
                {
                  "exit_uuid": "de9e0d5c-3222-42d1-ac3e-2cd3ec9b4ae3",
                  "name": "Let your teen choose the activity",
                  "uuid": "06a958ab-33bf-49b9-be91-dbd59c3b17ca"
                },
                {
                  "exit_uuid": "e2bf664c-14f1-4499-8274-247495045406",
                  "name": "Follow your teen’s lead",
                  "uuid": "2eb5d15b-96c7-4769-8e10-4d2c72512a96"
                },
                {
                  "exit_uuid": "f3fb0895-b374-49ef-adb3-70a3328fa9dd",
                  "name": "Give your teen all of your attention",
                  "uuid": "7d852494-17fc-433c-8050-7362bb7848f3"
                },
                {
                  "exit_uuid": "199f3afb-0ded-4909-9b9e-4bf9964924b2",
                  "name": "Show your teen you are really listening",
                  "uuid": "71bc7064-3424-457d-bd6c-ad82dd9a3edd"
                },
                {
                  "exit_uuid": "9727f599-2b74-4e56-9ac2-6bf17510f1d3",
                  "name": "Have fun!",
                  "uuid": "bdb8271b-6b99-4153-bd3a-ca9595beb49f"
                },
                {
                  "exit_uuid": "e0d1c376-5515-44e6-850b-c9d8c682d4a7",
                  "name": "None ",
                  "uuid": "e4b12eb6-b854-44a9-9e89-c392d8b96ed1"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "d3a16f1f-b1c4-4d7f-a5fe-88f258760431",
                "destination_uuid": null
              },
              {
                "uuid": "9dc4dff5-f4ea-47fa-92a5-8341f29c32b3",
                "destination_uuid": "409c14fa-f8e7-4cab-8871-29f0915a73a7"
              },
              {
                "uuid": "de9e0d5c-3222-42d1-ac3e-2cd3ec9b4ae3",
                "destination_uuid": "e8cdb94c-2eb2-4496-a42a-a192c6963c78"
              },
              {
                "uuid": "e2bf664c-14f1-4499-8274-247495045406",
                "destination_uuid": "22149344-124a-4241-9021-f7083d73d65a"
              },
              {
                "uuid": "f3fb0895-b374-49ef-adb3-70a3328fa9dd",
                "destination_uuid": "26fed1c5-5df1-48d6-8b57-939855ff6ed6"
              },
              {
                "uuid": "199f3afb-0ded-4909-9b9e-4bf9964924b2",
                "destination_uuid": "adb7f9df-b328-41ce-92eb-1ae21905f631"
              },
              {
                "uuid": "9727f599-2b74-4e56-9ac2-6bf17510f1d3",
                "destination_uuid": "08d9cdcf-b580-475a-9af2-60aa8fbedb68"
              },
              {
                "uuid": "e0d1c376-5515-44e6-850b-c9d8c682d4a7",
                "destination_uuid": "1920e84d-bf44-4aa3-b03c-aa705ab53118"
              }
            ]
          },
          {
            "uuid": "409c14fa-f8e7-4cab-8871-29f0915a73a7",
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
                "uuid": "7478de61-527a-4eec-9987-3d389adde7da"
              }
            ],
            "exits": [
              {
                "uuid": "b170ddba-e479-46c7-85b4-1211def47895",
                "destination_uuid": "30254705-c0e1-4094-b4b3-b36d1decdf29"
              }
            ]
          },
          {
            "uuid": "30254705-c0e1-4094-b4b3-b36d1decdf29",
            "actions": [],
            "exits": [
              {
                "uuid": "924be999-c53a-4d79-87eb-f7de9431f6a5",
                "destination_uuid": "8ac7decb-d649-4b3b-884e-d14a915de838"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e73def7f-5115-4c8e-b2ef-709e4cfca49b",
              "cases": [],
              "categories": [
                {
                  "uuid": "e73def7f-5115-4c8e-b2ef-709e4cfca49b",
                  "name": "All Responses",
                  "exit_uuid": "924be999-c53a-4d79-87eb-f7de9431f6a5"
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
            "uuid": "8ac7decb-d649-4b3b-884e-d14a915de838",
            "actions": [
              {
                "uuid": "04b8cf5a-bb13-4e02-bd5c-484e8c87981b",
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
                "uuid": "5a6a7237-2cdd-42a3-b3e1-002de196df5b",
                "destination_uuid": "9de48cc0-5fe1-420c-a694-2e4aaa359894"
              }
            ]
          },
          {
            "uuid": "9de48cc0-5fe1-420c-a694-2e4aaa359894",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "98a6d42b-66ac-4488-9209-d3c64bebf03e"
              }
            ],
            "exits": [
              {
                "uuid": "1d89b963-dff1-40f7-b0f8-33cf1e813b04",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "e8cdb94c-2eb2-4496-a42a-a192c6963c78",
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
                "uuid": "0a059199-b4ff-4d3d-9f5b-a83b6788f835"
              }
            ],
            "exits": [
              {
                "uuid": "f2f86550-bb18-4493-a786-b8ee1fc4860d",
                "destination_uuid": "2b94d37d-1ff1-4697-8c2c-9aaadcdeb624"
              }
            ]
          },
          {
            "uuid": "2b94d37d-1ff1-4697-8c2c-9aaadcdeb624",
            "actions": [],
            "exits": [
              {
                "uuid": "0ec1f9c1-9b71-4925-ab9d-0a2b725445cd",
                "destination_uuid": "63b34c7d-e4d6-43b3-96a5-c477ec4f4357"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d970d9df-b7fa-44fb-a0be-5d8fbf30da9f",
              "cases": [],
              "categories": [
                {
                  "uuid": "d970d9df-b7fa-44fb-a0be-5d8fbf30da9f",
                  "name": "All Responses",
                  "exit_uuid": "0ec1f9c1-9b71-4925-ab9d-0a2b725445cd"
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
            "uuid": "63b34c7d-e4d6-43b3-96a5-c477ec4f4357",
            "actions": [
              {
                "uuid": "19777e06-24b0-40a2-95c9-cff4c5719041",
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
                "uuid": "978587f4-5825-41ae-bb87-a0e8e95fc6ba",
                "destination_uuid": "d56a8cc5-2570-49a9-85d2-0b15149d59ae"
              }
            ]
          },
          {
            "uuid": "d56a8cc5-2570-49a9-85d2-0b15149d59ae",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5413056e-1350-42a0-b1e2-0e88da697ad9"
              }
            ],
            "exits": [
              {
                "uuid": "eb06cd11-303a-4b2c-ac6b-ca633fe048ae",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "22149344-124a-4241-9021-f7083d73d65a",
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
                "uuid": "244c4538-c440-4ffb-8e41-4d19be69d51c"
              }
            ],
            "exits": [
              {
                "uuid": "af2a02ef-1a60-46c8-9f49-c145f6d340f0",
                "destination_uuid": "0fb287b5-8a7d-4647-8c6e-355d21b40f9a"
              }
            ]
          },
          {
            "uuid": "0fb287b5-8a7d-4647-8c6e-355d21b40f9a",
            "actions": [],
            "exits": [
              {
                "uuid": "281005f8-0258-4a04-a8f1-fd8983f5feb1",
                "destination_uuid": "f565bb8b-a9c0-4fa6-b234-197fc820b390"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b13454f8-280b-4764-acf9-5b1267426e9c",
              "cases": [],
              "categories": [
                {
                  "uuid": "b13454f8-280b-4764-acf9-5b1267426e9c",
                  "name": "All Responses",
                  "exit_uuid": "281005f8-0258-4a04-a8f1-fd8983f5feb1"
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
            "uuid": "f565bb8b-a9c0-4fa6-b234-197fc820b390",
            "actions": [
              {
                "uuid": "010bc914-2020-4865-abb4-ca918ebd7b09",
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
                "uuid": "fc79ea34-ac15-4298-8160-ef1bb959440d",
                "destination_uuid": "8dbec0e5-5651-4fbb-b681-05d69eed2a4f"
              }
            ]
          },
          {
            "uuid": "8dbec0e5-5651-4fbb-b681-05d69eed2a4f",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "573dbc3e-62c5-4402-ae11-dbeb46e70026"
              }
            ],
            "exits": [
              {
                "uuid": "88d9e27a-6cb6-4ed9-aae7-d4a80535b1f7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "26fed1c5-5df1-48d6-8b57-939855ff6ed6",
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
                "uuid": "62f4c3a9-5419-46f1-a69b-89f74025cf84"
              }
            ],
            "exits": [
              {
                "uuid": "35fac2b3-5296-46f8-98d4-9eefb415ba94",
                "destination_uuid": "c656d8cf-dd9b-42fb-87d8-5e3787074ed9"
              }
            ]
          },
          {
            "uuid": "c656d8cf-dd9b-42fb-87d8-5e3787074ed9",
            "actions": [],
            "exits": [
              {
                "uuid": "eeb73798-3a65-4609-a2cc-da78af929dd2",
                "destination_uuid": "89c9924c-aabe-4958-9dc5-64246d75a8c2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "96c438e4-54aa-441f-9066-81ff9c257f7b",
              "cases": [],
              "categories": [
                {
                  "uuid": "96c438e4-54aa-441f-9066-81ff9c257f7b",
                  "name": "All Responses",
                  "exit_uuid": "eeb73798-3a65-4609-a2cc-da78af929dd2"
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
            "uuid": "89c9924c-aabe-4958-9dc5-64246d75a8c2",
            "actions": [
              {
                "uuid": "23901ce0-ef3f-4158-9a23-835a3105ab44",
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
                "uuid": "67c32bec-d7a1-4687-bc7d-d6b96e081eb8",
                "destination_uuid": "013333a8-14b1-442e-88f8-11aa9bafa0b4"
              }
            ]
          },
          {
            "uuid": "013333a8-14b1-442e-88f8-11aa9bafa0b4",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "797b6062-85b0-46ff-a141-155493ac9634"
              }
            ],
            "exits": [
              {
                "uuid": "54c82110-5bc8-4b95-96f2-0bffdde72117",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "adb7f9df-b328-41ce-92eb-1ae21905f631",
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
                "uuid": "35cc1472-b445-484e-b40e-7bd5676473cd"
              }
            ],
            "exits": [
              {
                "uuid": "d428f901-5e82-466d-8a55-d1e00db88158",
                "destination_uuid": "1e27cdca-1964-4e50-a141-2785b906ecd4"
              }
            ]
          },
          {
            "uuid": "1e27cdca-1964-4e50-a141-2785b906ecd4",
            "actions": [],
            "exits": [
              {
                "uuid": "dbcda079-7e97-4018-821e-73a402af8af0",
                "destination_uuid": "03ff36ba-a070-4bd8-b6a0-93ad8b61480c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ab955c80-0ea5-48ab-8a48-3430eed95646",
              "cases": [],
              "categories": [
                {
                  "uuid": "ab955c80-0ea5-48ab-8a48-3430eed95646",
                  "name": "All Responses",
                  "exit_uuid": "dbcda079-7e97-4018-821e-73a402af8af0"
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
            "uuid": "03ff36ba-a070-4bd8-b6a0-93ad8b61480c",
            "actions": [
              {
                "uuid": "c12475c2-135f-4247-8787-4e6a0ac85f19",
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
                "uuid": "dbfe68b5-3ce8-4903-9934-3f883e793ffe",
                "destination_uuid": "4a47c01f-7de7-46e8-bedc-fc140e0a0632"
              }
            ]
          },
          {
            "uuid": "4a47c01f-7de7-46e8-bedc-fc140e0a0632",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1fe3655d-62d2-4597-a1a3-13fd3c98d1cc"
              }
            ],
            "exits": [
              {
                "uuid": "8b01b5b6-6400-4386-adcb-27c329889980",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "08d9cdcf-b580-475a-9af2-60aa8fbedb68",
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
                "uuid": "29b8b322-1758-4d2a-86e9-e083b0373df8"
              }
            ],
            "exits": [
              {
                "uuid": "47fe45ac-217e-4bf8-9db7-2eb724538ab2",
                "destination_uuid": "c8a9ce89-154c-4964-8510-fc59c81a8c5a"
              }
            ]
          },
          {
            "uuid": "c8a9ce89-154c-4964-8510-fc59c81a8c5a",
            "actions": [],
            "exits": [
              {
                "uuid": "57c56cca-2771-4236-9c15-f212dfcff143",
                "destination_uuid": "f67cb1c3-f3eb-42f8-99a4-80bbc6d3eefb"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "32411f47-ab06-4a0a-9d90-af8fbc36fbe7",
              "cases": [],
              "categories": [
                {
                  "uuid": "32411f47-ab06-4a0a-9d90-af8fbc36fbe7",
                  "name": "All Responses",
                  "exit_uuid": "57c56cca-2771-4236-9c15-f212dfcff143"
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
            "uuid": "f67cb1c3-f3eb-42f8-99a4-80bbc6d3eefb",
            "actions": [
              {
                "uuid": "3604bbd3-accb-4d13-a890-d1f5ede7d336",
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
                "uuid": "338b976b-fa37-4f8a-947e-ac7bac4edd07",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b9e28d62-65a3-44f9-bb34-53004bbbd8d9",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "02fba13d-409b-4dc2-aa13-1c53436e884d"
              }
            ],
            "exits": [
              {
                "uuid": "836a3019-c44f-4042-a594-28621c445d0b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1920e84d-bf44-4aa3-b03c-aa705ab53118",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "22f10286-25c8-4995-83e2-8703b387593e"
              }
            ],
            "exits": [
              {
                "uuid": "46bbc52d-fc40-4001-a0cb-f54b19983571",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6fbc2d79-0eb3-4d69-b0b9-3ac7eda95419",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5d463ccf-d288-4b1a-aafd-0013f2a333d7",
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
                "uuid": "3474a2bf-c1d1-44a8-b094-40af4a3c4a1f"
              }
            ],
            "exits": [
              {
                "uuid": "9c9592b2-ea62-4333-a76c-2b9a83b750fd",
                "destination_uuid": "ff808599-cc26-4047-8def-34bac239095b"
              }
            ]
          },
          {
            "uuid": "84282ee6-3e2c-47fe-be6a-5f020210e98e",
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
                "uuid": "002240e9-fc1d-4fb1-b90f-06527da49444"
              }
            ],
            "exits": [
              {
                "uuid": "54c16184-ba50-42a2-b93d-d0a0bb6ab7a3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "d1b7d753-92b2-4b28-b7d6-ede9ac571b5b",
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
                "uuid": "7201804f-e3eb-4421-ad3c-38907fb4d821"
              }
            ],
            "exits": [
              {
                "uuid": "87348c84-ba3f-4400-ace6-c97639593345",
                "destination_uuid": "ff808599-cc26-4047-8def-34bac239095b"
              }
            ]
          },
          {
            "uuid": "ff808599-cc26-4047-8def-34bac239095b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0ff3f7ca-05a0-4a7e-b012-b7366864cf99",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "5297dd59-6169-4c37-a354-4e977aac0cd6",
                  "type": "has_only_phrase",
                  "uuid": "8095ac3c-caa8-429c-94dd-50bd1e53d0aa"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "13b20b39-9493-4ccc-bf59-6b8b44983205",
                  "type": "has_only_phrase",
                  "uuid": "836e6e6b-9533-480c-b8c4-570a13c95b84"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "f1775b45-47f3-4160-b8d9-d6fcf0a60119",
                  "type": "has_only_phrase",
                  "uuid": "1a541bc4-f8fd-4a6d-befc-ab383bf19c8c"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "d790ff83-779e-47da-859b-7e1d7d1a90b6",
                  "type": "has_only_phrase",
                  "uuid": "40873fae-ec8b-46c6-baa6-36b5a9679ade"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "07ea7a0c-c39c-4e72-8f55-96c6344a425a",
                  "type": "has_only_phrase",
                  "uuid": "419e9673-ecf4-4863-a9f8-6f89c40f3eb9"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "156b374f-6f5f-48e5-b700-c7b47b77d9f9",
                  "type": "has_only_phrase",
                  "uuid": "cb44054b-8a5f-4565-9099-0ff7743a4ad4"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "31836bf3-7178-4f7f-a118-33abe98e16cc",
                  "type": "has_only_phrase",
                  "uuid": "48f89525-5d24-4895-8f16-a7c18e7b9f12"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "900fed54-9043-4261-a4b4-82aee0fda377",
                  "type": "has_only_phrase",
                  "uuid": "8152bd20-af76-450b-ab6f-8e895dcadb20"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "07454df6-4437-4b81-848a-a075228551eb",
                  "type": "has_only_phrase",
                  "uuid": "fa1fab36-a8d6-408c-a389-958bc77d2777"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "5dc9de85-4821-4562-825d-d7ba09a53318",
                  "type": "has_only_phrase",
                  "uuid": "1efc8356-9d78-4343-a78e-9b4bb7ad4c1b"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "3c2ec14c-6523-4836-adf3-fb224ab99527",
                  "type": "has_only_phrase",
                  "uuid": "4f72cc88-7a61-4ee0-ad25-e56f97e4c2e0"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "1425dce2-d928-4d2a-829a-6960afe559cb",
                  "type": "has_only_phrase",
                  "uuid": "3310806b-6d7b-42cd-9fc9-b16cf3951834"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "7ee804e5-1069-45c0-bcab-529a85c3dfc6",
                  "type": "has_only_phrase",
                  "uuid": "416d2820-5d16-43d1-bc35-4ab1702d2e7b"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "cab04906-f0e7-4dbd-9517-171a2dc597d1",
                  "type": "has_only_phrase",
                  "uuid": "5049504f-dcdf-42a0-93f5-c7b3645f3e37"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "ad51c67d-3b0c-4e10-a39e-b58714469f59",
                  "type": "has_only_phrase",
                  "uuid": "1a781e03-a6d1-4846-8e32-a673706460ac"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "29b7b873-d48d-4b0b-a73d-8d512e9d8769",
                  "name": "All Responses",
                  "uuid": "0ff3f7ca-05a0-4a7e-b012-b7366864cf99"
                },
                {
                  "exit_uuid": "e7cf0ce9-9fbf-4912-bff2-f24ff272e3e8",
                  "name": "I don’t have enough time",
                  "uuid": "5297dd59-6169-4c37-a354-4e977aac0cd6"
                },
                {
                  "exit_uuid": "6e1068f1-3062-4a7c-ad5e-e2e4580ccd7f",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "13b20b39-9493-4ccc-bf59-6b8b44983205"
                },
                {
                  "exit_uuid": "1016261d-ed7e-445f-a569-4d209cebe3c6",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "f1775b45-47f3-4160-b8d9-d6fcf0a60119"
                },
                {
                  "exit_uuid": "92b85baf-f223-44c0-b221-b4f771661117",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "d790ff83-779e-47da-859b-7e1d7d1a90b6"
                },
                {
                  "exit_uuid": "eb65bbf9-e21d-47dc-bca0-d8c86a30b3e7",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "07ea7a0c-c39c-4e72-8f55-96c6344a425a"
                },
                {
                  "exit_uuid": "c08dc077-2208-4995-8aa5-4da56662f30d",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "156b374f-6f5f-48e5-b700-c7b47b77d9f9"
                },
                {
                  "exit_uuid": "b8ed99cf-8c08-4a81-8f16-3d6943a3febf",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "31836bf3-7178-4f7f-a118-33abe98e16cc"
                },
                {
                  "exit_uuid": "71419651-012f-42b7-bfad-81d9ab2dd120",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "900fed54-9043-4261-a4b4-82aee0fda377"
                },
                {
                  "exit_uuid": "02286fa4-db17-4528-9eb9-c39a2bd5043c",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "07454df6-4437-4b81-848a-a075228551eb"
                },
                {
                  "exit_uuid": "107f9fe6-2f81-4561-9802-b8a4bd05f818",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "5dc9de85-4821-4562-825d-d7ba09a53318"
                },
                {
                  "exit_uuid": "41365a9e-3974-4dc1-b895-a99364754955",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "3c2ec14c-6523-4836-adf3-fb224ab99527"
                },
                {
                  "exit_uuid": "8d36b541-b9db-404d-a378-c2d033d7460b",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "1425dce2-d928-4d2a-829a-6960afe559cb"
                },
                {
                  "exit_uuid": "9a3035e3-b04c-44ff-8a88-a026ca5ad367",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "7ee804e5-1069-45c0-bcab-529a85c3dfc6"
                },
                {
                  "exit_uuid": "b61381a1-b7f0-4a98-8572-c3be4aca1f3b",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "cab04906-f0e7-4dbd-9517-171a2dc597d1"
                },
                {
                  "exit_uuid": "87798ab4-caca-4316-836b-0459597a0ff8",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "ad51c67d-3b0c-4e10-a39e-b58714469f59"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "29b7b873-d48d-4b0b-a73d-8d512e9d8769",
                "destination_uuid": null
              },
              {
                "uuid": "e7cf0ce9-9fbf-4912-bff2-f24ff272e3e8",
                "destination_uuid": "1eb7141b-0e51-4185-bfd8-cdc034bd5fa2"
              },
              {
                "uuid": "6e1068f1-3062-4a7c-ad5e-e2e4580ccd7f",
                "destination_uuid": "34d1d5b0-a34b-4809-bd8a-4617fd45fc7b"
              },
              {
                "uuid": "1016261d-ed7e-445f-a569-4d209cebe3c6",
                "destination_uuid": "34d1d5b0-a34b-4809-bd8a-4617fd45fc7b"
              },
              {
                "uuid": "92b85baf-f223-44c0-b221-b4f771661117",
                "destination_uuid": "3cc682b1-da4a-4221-acde-df6920c0dd9b"
              },
              {
                "uuid": "eb65bbf9-e21d-47dc-bca0-d8c86a30b3e7",
                "destination_uuid": "3cc682b1-da4a-4221-acde-df6920c0dd9b"
              },
              {
                "uuid": "c08dc077-2208-4995-8aa5-4da56662f30d",
                "destination_uuid": "8ffbd018-4a94-4162-94b7-ecf6f6fda155"
              },
              {
                "uuid": "b8ed99cf-8c08-4a81-8f16-3d6943a3febf",
                "destination_uuid": "8ffbd018-4a94-4162-94b7-ecf6f6fda155"
              },
              {
                "uuid": "71419651-012f-42b7-bfad-81d9ab2dd120",
                "destination_uuid": "2e34d282-c7dc-4282-acb1-319966633fa1"
              },
              {
                "uuid": "02286fa4-db17-4528-9eb9-c39a2bd5043c",
                "destination_uuid": "2e34d282-c7dc-4282-acb1-319966633fa1"
              },
              {
                "uuid": "107f9fe6-2f81-4561-9802-b8a4bd05f818",
                "destination_uuid": "1d3fa20d-0639-4a95-b3d6-191b2bcbe7ae"
              },
              {
                "uuid": "41365a9e-3974-4dc1-b895-a99364754955",
                "destination_uuid": "1d3fa20d-0639-4a95-b3d6-191b2bcbe7ae"
              },
              {
                "uuid": "8d36b541-b9db-404d-a378-c2d033d7460b",
                "destination_uuid": "b575f5a8-5f5b-4e8b-8452-7e99fc0b1213"
              },
              {
                "uuid": "9a3035e3-b04c-44ff-8a88-a026ca5ad367",
                "destination_uuid": "b575f5a8-5f5b-4e8b-8452-7e99fc0b1213"
              },
              {
                "uuid": "b61381a1-b7f0-4a98-8572-c3be4aca1f3b",
                "destination_uuid": "3905054c-e54d-44d6-a234-d0f5fb53355e"
              },
              {
                "uuid": "87798ab4-caca-4316-836b-0459597a0ff8",
                "destination_uuid": "3905054c-e54d-44d6-a234-d0f5fb53355e"
              }
            ]
          },
          {
            "uuid": "1eb7141b-0e51-4185-bfd8-cdc034bd5fa2",
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
                "uuid": "82461bc7-ad1f-4faf-8cfc-172097f7b375"
              }
            ],
            "exits": [
              {
                "uuid": "ecab45f1-1e29-4fec-951e-89f9c52eb081",
                "destination_uuid": "bc1cf4a7-f684-4ca7-8609-0e2fe3cedf4d"
              }
            ]
          },
          {
            "uuid": "bc1cf4a7-f684-4ca7-8609-0e2fe3cedf4d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "66d517d1-ea6b-47c9-9174-bd89a47f1185",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "b02cb5f1-ca7d-4db1-9ea0-6af16dc32c91",
                  "type": "has_only_phrase",
                  "uuid": "03dfedb5-8053-4dd8-948c-6d1d0fa01641"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "71397480-901f-42ff-8393-38b567346faf",
                  "type": "has_only_phrase",
                  "uuid": "82ef2dd5-d453-4e9f-aa69-9c98820f9dec"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "12ebc51c-48a8-4027-b01d-88a9194cc401",
                  "type": "has_only_phrase",
                  "uuid": "ab66d0b3-4f2a-4914-9add-2bf90c8bf060"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f66f430c-42bb-491f-9729-c6ec509a7105",
                  "name": "All Responses",
                  "uuid": "66d517d1-ea6b-47c9-9174-bd89a47f1185"
                },
                {
                  "exit_uuid": "ece0337a-a955-4e26-881a-d6f93b2055bb",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "b02cb5f1-ca7d-4db1-9ea0-6af16dc32c91"
                },
                {
                  "exit_uuid": "571ccd25-413d-4b4e-842e-1707d3ada1fa",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "71397480-901f-42ff-8393-38b567346faf"
                },
                {
                  "exit_uuid": "ae4504d8-911a-48e6-8c1a-5ab181892ea8",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "12ebc51c-48a8-4027-b01d-88a9194cc401"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f66f430c-42bb-491f-9729-c6ec509a7105",
                "destination_uuid": null
              },
              {
                "uuid": "ece0337a-a955-4e26-881a-d6f93b2055bb",
                "destination_uuid": "4a3546b1-86ab-48d9-ae31-ba4755ac9199"
              },
              {
                "uuid": "571ccd25-413d-4b4e-842e-1707d3ada1fa",
                "destination_uuid": "fd97c4d6-94c1-48ec-9b9b-65f89e14a7fb"
              },
              {
                "uuid": "ae4504d8-911a-48e6-8c1a-5ab181892ea8",
                "destination_uuid": "4d662955-8315-4bcf-b8e8-5731a3feceff"
              }
            ]
          },
          {
            "uuid": "4a3546b1-86ab-48d9-ae31-ba4755ac9199",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "df908a56-8d3f-4a80-9e07-2c0d7060fb49"
              }
            ],
            "exits": [
              {
                "uuid": "2627ff62-d539-4fa4-bad0-f6794c7cac50",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "fd97c4d6-94c1-48ec-9b9b-65f89e14a7fb",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ca793185-6f76-4f1e-9eaf-5e478ee4180d"
              }
            ],
            "exits": [
              {
                "uuid": "c22d6ba8-3e6f-43c6-866e-05ebd67f3545",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "4d662955-8315-4bcf-b8e8-5731a3feceff",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a00593be-32d1-4d04-a055-2c7d38a1f2a2"
              }
            ],
            "exits": [
              {
                "uuid": "779437ce-bec0-4e9d-8c02-e6a00491f2c3",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "34d1d5b0-a34b-4809-bd8a-4617fd45fc7b",
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
                "uuid": "b865180b-f1bd-46bb-b19b-629e33eca566"
              }
            ],
            "exits": [
              {
                "uuid": "a7244fa8-84d9-4a31-98a5-443225056069",
                "destination_uuid": "1a7c9ff6-0f90-473a-9214-f392772a9c4f"
              }
            ]
          },
          {
            "uuid": "1a7c9ff6-0f90-473a-9214-f392772a9c4f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "178e0194-a939-4660-a353-6e12fd2a3eff",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "3fe3f66f-d3e4-4c05-80c8-4c7e2d416f56",
                  "type": "has_only_phrase",
                  "uuid": "7d96aedf-c25e-4bc7-b2dd-f7191d695645"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "9191830d-8bce-43a0-9eaf-8fe97d75d6c0",
                  "type": "has_only_phrase",
                  "uuid": "ea8c3f93-f556-411c-91cf-a40b789c575b"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "303661e2-e171-40f5-b4b0-3f06f0c8e6c1",
                  "type": "has_only_phrase",
                  "uuid": "1719d4f6-2d8e-414e-b815-2207a098c033"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1a7e1a5f-5f9a-44bd-bfe5-a2a84da64922",
                  "name": "All Responses",
                  "uuid": "178e0194-a939-4660-a353-6e12fd2a3eff"
                },
                {
                  "exit_uuid": "9b3e1464-32c5-485e-8c2f-bdfc8b022dae",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "3fe3f66f-d3e4-4c05-80c8-4c7e2d416f56"
                },
                {
                  "exit_uuid": "3d5d3460-e900-45ee-9004-6e0874eefcb3",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "9191830d-8bce-43a0-9eaf-8fe97d75d6c0"
                },
                {
                  "exit_uuid": "33bfabdc-a4c1-4925-8630-91eb922ad185",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "303661e2-e171-40f5-b4b0-3f06f0c8e6c1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1a7e1a5f-5f9a-44bd-bfe5-a2a84da64922",
                "destination_uuid": null
              },
              {
                "uuid": "9b3e1464-32c5-485e-8c2f-bdfc8b022dae",
                "destination_uuid": "1453b515-60fa-4e9b-958f-e59c21400109"
              },
              {
                "uuid": "3d5d3460-e900-45ee-9004-6e0874eefcb3",
                "destination_uuid": "525ea485-9878-4fcb-8a68-c6be11742a2b"
              },
              {
                "uuid": "33bfabdc-a4c1-4925-8630-91eb922ad185",
                "destination_uuid": "5b2ddd5d-f571-4a31-91d4-7070687c133e"
              }
            ]
          },
          {
            "uuid": "1453b515-60fa-4e9b-958f-e59c21400109",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7e6f3939-4d45-4a15-a600-bebb521ba596"
              }
            ],
            "exits": [
              {
                "uuid": "54e6d1e1-513b-4345-8bba-5b9f4931941c",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "525ea485-9878-4fcb-8a68-c6be11742a2b",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "87ad4bd1-cd06-4a16-a61e-4e013248d940"
              }
            ],
            "exits": [
              {
                "uuid": "9f96636e-b396-4b66-a399-45518b885a0a",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "5b2ddd5d-f571-4a31-91d4-7070687c133e",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fd5408e2-2364-41e9-8dc2-338d4d87dc4b"
              }
            ],
            "exits": [
              {
                "uuid": "1f619950-4dc8-4154-8832-c52c4bec41f7",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "3cc682b1-da4a-4221-acde-df6920c0dd9b",
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
                "uuid": "3e55c352-3921-4db7-9d95-b8d97d943866"
              }
            ],
            "exits": [
              {
                "uuid": "d544d3cc-7187-4d47-ba7a-23ee7b105678",
                "destination_uuid": "4565c1ff-ca72-4c0a-9f80-48f981c6a82e"
              }
            ]
          },
          {
            "uuid": "4565c1ff-ca72-4c0a-9f80-48f981c6a82e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a81b6c6b-5fe7-40cb-998c-eb202b6260d9",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "2e21d59c-4aba-4625-aaab-5b1b004d5407",
                  "type": "has_only_phrase",
                  "uuid": "57741642-f0ab-41b5-bff4-e5528e72a7cc"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "31099735-beca-4a68-9cf3-150f3686f86e",
                  "type": "has_only_phrase",
                  "uuid": "e10fe574-a1e3-445a-bb82-3ef822a86659"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "426eb906-20fb-4a37-872f-dc9e17499152",
                  "type": "has_only_phrase",
                  "uuid": "aa1fa21d-2d9d-4b35-a8e2-715eca4d3976"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "87205cfc-156d-49de-bd21-28c20c5c2d8a",
                  "name": "All Responses",
                  "uuid": "a81b6c6b-5fe7-40cb-998c-eb202b6260d9"
                },
                {
                  "exit_uuid": "b461419a-10af-4546-9a30-75369dfee672",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "2e21d59c-4aba-4625-aaab-5b1b004d5407"
                },
                {
                  "exit_uuid": "51a3bfd7-25b4-4cec-86fb-f21d91c837b7",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "31099735-beca-4a68-9cf3-150f3686f86e"
                },
                {
                  "exit_uuid": "51a75ace-ee1a-40d7-9d24-ea6d1b4439b6",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "426eb906-20fb-4a37-872f-dc9e17499152"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "87205cfc-156d-49de-bd21-28c20c5c2d8a",
                "destination_uuid": null
              },
              {
                "uuid": "b461419a-10af-4546-9a30-75369dfee672",
                "destination_uuid": "1a5bbb1b-a9bb-4f4f-b4eb-056f4644ee04"
              },
              {
                "uuid": "51a3bfd7-25b4-4cec-86fb-f21d91c837b7",
                "destination_uuid": "f61fdd4e-fe67-491a-9fe8-572ccb56ac58"
              },
              {
                "uuid": "51a75ace-ee1a-40d7-9d24-ea6d1b4439b6",
                "destination_uuid": "80d93dbe-36d1-4f56-a528-fbb6843b14f7"
              }
            ]
          },
          {
            "uuid": "1a5bbb1b-a9bb-4f4f-b4eb-056f4644ee04",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "437a5fff-cded-4587-9a1c-4e933f8ed608"
              }
            ],
            "exits": [
              {
                "uuid": "6ce4ed8e-1a1a-4a5c-988b-ccd8ff8ac767",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "f61fdd4e-fe67-491a-9fe8-572ccb56ac58",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f895ee92-2aa7-49e4-a25d-9838af2e678d"
              }
            ],
            "exits": [
              {
                "uuid": "2c4ecb21-790b-458a-a5dc-280f36d53cb7",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "80d93dbe-36d1-4f56-a528-fbb6843b14f7",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e7bab595-79d2-4e9b-81c3-d8cf5dc5b22d"
              }
            ],
            "exits": [
              {
                "uuid": "02032ff7-56fe-4678-a08a-360c61337815",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "8ffbd018-4a94-4162-94b7-ecf6f6fda155",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "d5e6d90a-71b7-4f7d-a64a-13b57ee23dfe"
              }
            ],
            "exits": [
              {
                "uuid": "51c2cd78-d4be-4ecd-9708-da49252906be",
                "destination_uuid": "8f0e0b65-8dde-412b-af15-c7a77b5eec75"
              }
            ]
          },
          {
            "uuid": "8f0e0b65-8dde-412b-af15-c7a77b5eec75",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "62a2b45f-b340-4438-ae2d-bd7507214143",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "1c43a16c-9574-4c51-9493-818eed422edf",
                  "type": "has_only_phrase",
                  "uuid": "3264828f-17cf-4a94-9b25-83daacc18521"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "13c4ab1b-8ab6-4659-9dfa-ca25bb908391",
                  "type": "has_only_phrase",
                  "uuid": "bbd2a996-510d-40fe-8d5f-f644cd355fa5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b370075b-13c7-4320-b323-03ef10390e76",
                  "name": "All Responses",
                  "uuid": "62a2b45f-b340-4438-ae2d-bd7507214143"
                },
                {
                  "exit_uuid": "4254ce9f-d79e-4bad-905b-a960185583a1",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "1c43a16c-9574-4c51-9493-818eed422edf"
                },
                {
                  "exit_uuid": "b42a9e64-afcb-435b-a7a8-095f246dbaa8",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "13c4ab1b-8ab6-4659-9dfa-ca25bb908391"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b370075b-13c7-4320-b323-03ef10390e76",
                "destination_uuid": null
              },
              {
                "uuid": "4254ce9f-d79e-4bad-905b-a960185583a1",
                "destination_uuid": "c12bddce-418e-4790-98ba-6652a4215393"
              },
              {
                "uuid": "b42a9e64-afcb-435b-a7a8-095f246dbaa8",
                "destination_uuid": "63bd152c-2a66-4a34-a288-b2f952f703eb"
              }
            ]
          },
          {
            "uuid": "c12bddce-418e-4790-98ba-6652a4215393",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e1d46976-6569-495e-a4fc-fffd610da4bf"
              }
            ],
            "exits": [
              {
                "uuid": "c161aaf6-76b1-4037-b815-1b5de5da401b",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "63bd152c-2a66-4a34-a288-b2f952f703eb",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "35766238-d666-47d8-86ae-7da6df86b242"
              }
            ],
            "exits": [
              {
                "uuid": "2360a5d8-55af-4c6f-beb2-6b61f693ae0e",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "2e34d282-c7dc-4282-acb1-319966633fa1",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "5bb5751d-488b-4e08-9e6c-252812e33de9"
              }
            ],
            "exits": [
              {
                "uuid": "4c2289d8-e525-4b47-994d-26fffeae9629",
                "destination_uuid": "0648c62a-1c09-4eb7-a119-18a69fdb6939"
              }
            ]
          },
          {
            "uuid": "0648c62a-1c09-4eb7-a119-18a69fdb6939",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "eb673924-5b4c-4ca4-b13f-b1645efb15ef",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "7e86417c-f2ec-4fd5-8a94-1a9d0b5d8167",
                  "type": "has_only_phrase",
                  "uuid": "f8258c82-704a-4e07-be52-120dd9a15533"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "2ea46bf1-586b-4ba3-84c0-3487c5d058f9",
                  "type": "has_only_phrase",
                  "uuid": "a9db3b7b-333f-450c-8f62-d5ab233d0aed"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f13f0109-0b7c-4e02-8a33-f189d56d9c8c",
                  "name": "All Responses",
                  "uuid": "eb673924-5b4c-4ca4-b13f-b1645efb15ef"
                },
                {
                  "exit_uuid": "46ce3b05-b323-4ec6-a154-2b684e8f6dcb",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "7e86417c-f2ec-4fd5-8a94-1a9d0b5d8167"
                },
                {
                  "exit_uuid": "190e08b8-ef2d-4f47-a74e-6242fd6a6173",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "2ea46bf1-586b-4ba3-84c0-3487c5d058f9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f13f0109-0b7c-4e02-8a33-f189d56d9c8c",
                "destination_uuid": null
              },
              {
                "uuid": "46ce3b05-b323-4ec6-a154-2b684e8f6dcb",
                "destination_uuid": "a070d042-67f5-4b9e-af6e-ce67e59f48aa"
              },
              {
                "uuid": "190e08b8-ef2d-4f47-a74e-6242fd6a6173",
                "destination_uuid": "43afbec9-9a86-4214-8099-e79a9473b9fd"
              }
            ]
          },
          {
            "uuid": "a070d042-67f5-4b9e-af6e-ce67e59f48aa",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dd7df31b-ce9d-4dc1-95d2-4f06d7060dce"
              }
            ],
            "exits": [
              {
                "uuid": "f62ef7d1-ceac-4589-8686-44d160f9dc15",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "43afbec9-9a86-4214-8099-e79a9473b9fd",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7ac71eac-adaa-442f-9d38-396300046d5f"
              }
            ],
            "exits": [
              {
                "uuid": "a0eeceea-a6eb-462f-a751-1a934f329208",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "1d3fa20d-0639-4a95-b3d6-191b2bcbe7ae",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "25baad95-be26-455c-a008-e523d85365da"
              }
            ],
            "exits": [
              {
                "uuid": "642ad3ae-ce12-4aec-9ed3-1730dd5fc7af",
                "destination_uuid": "4216af1c-967c-4c46-8201-8d1125a3a11d"
              }
            ]
          },
          {
            "uuid": "4216af1c-967c-4c46-8201-8d1125a3a11d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ecb28b7e-8034-41d6-8d19-7ef437ac9765",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "e9271685-99a0-483e-9416-66ddaea4c0ba",
                  "type": "has_only_phrase",
                  "uuid": "fd3aaa5a-035c-454c-97e7-a88e4f78c13a"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "07d8dec7-1086-44e9-a6db-28ce58cded7f",
                  "type": "has_only_phrase",
                  "uuid": "7c37f4a5-ad9e-40c9-ac79-2c43bdc6aefa"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4a49373b-3a33-4a9f-b83e-08f98ee9eb79",
                  "name": "All Responses",
                  "uuid": "ecb28b7e-8034-41d6-8d19-7ef437ac9765"
                },
                {
                  "exit_uuid": "f4b981d5-ec7f-4794-903b-257adbe3e348",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "e9271685-99a0-483e-9416-66ddaea4c0ba"
                },
                {
                  "exit_uuid": "46330359-dc5e-4d1d-94f6-651f5c0b4931",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "07d8dec7-1086-44e9-a6db-28ce58cded7f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4a49373b-3a33-4a9f-b83e-08f98ee9eb79",
                "destination_uuid": null
              },
              {
                "uuid": "f4b981d5-ec7f-4794-903b-257adbe3e348",
                "destination_uuid": "86eedbd6-42ef-4447-841c-c9c5889b5ed5"
              },
              {
                "uuid": "46330359-dc5e-4d1d-94f6-651f5c0b4931",
                "destination_uuid": "d8fb3cb6-d0b7-46ea-965c-2989a8aec368"
              }
            ]
          },
          {
            "uuid": "86eedbd6-42ef-4447-841c-c9c5889b5ed5",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "1b697528-5aad-42cd-9edf-3dea98a6571e"
              }
            ],
            "exits": [
              {
                "uuid": "68c9c003-7d5e-4eaa-8a96-49c43cbe478a",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "d8fb3cb6-d0b7-46ea-965c-2989a8aec368",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "7b931c9c-a6c6-42b6-8047-29b756e9cb22"
              }
            ],
            "exits": [
              {
                "uuid": "86767de1-65bb-406b-8386-49f895829f0d",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "b575f5a8-5f5b-4e8b-8452-7e99fc0b1213",
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
                "uuid": "222699e2-8b73-4d81-9f08-c64e5c893342"
              }
            ],
            "exits": [
              {
                "uuid": "8466147c-dd63-4dea-a3c2-7b2b05a02d2a",
                "destination_uuid": "005edb0e-c26a-46e5-b49e-39e7966ad7e3"
              }
            ]
          },
          {
            "uuid": "005edb0e-c26a-46e5-b49e-39e7966ad7e3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f859ad7f-f76b-4d55-bd24-0dec59b7414a",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "6b5c03f1-daa9-4752-ba04-ba22c7983c44",
                  "type": "has_only_phrase",
                  "uuid": "55c1036b-d0ab-40ef-a209-0e6c59227a29"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "7be9b317-e960-49cd-b3bd-21621aa6f58e",
                  "type": "has_only_phrase",
                  "uuid": "626694c3-c132-4fa5-893a-f49b321f5041"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "ed4c3d43-d48e-4df9-a582-fec552cb2580",
                  "type": "has_only_phrase",
                  "uuid": "008effc4-9c59-4af5-9b7a-a6d984f432d8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b65f066c-172d-4cfd-af4b-a7931074c98b",
                  "name": "All Responses",
                  "uuid": "f859ad7f-f76b-4d55-bd24-0dec59b7414a"
                },
                {
                  "exit_uuid": "1449e098-cb06-4fc8-8c8f-c56e322b0d7b",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "6b5c03f1-daa9-4752-ba04-ba22c7983c44"
                },
                {
                  "exit_uuid": "99cafb1f-5f03-4f15-96ce-35f797520715",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "7be9b317-e960-49cd-b3bd-21621aa6f58e"
                },
                {
                  "exit_uuid": "48f242b4-c854-43b0-b072-515f7d0c3c1a",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "ed4c3d43-d48e-4df9-a582-fec552cb2580"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b65f066c-172d-4cfd-af4b-a7931074c98b",
                "destination_uuid": null
              },
              {
                "uuid": "1449e098-cb06-4fc8-8c8f-c56e322b0d7b",
                "destination_uuid": "559ef990-5a8b-4727-805f-bc717d6c2ac3"
              },
              {
                "uuid": "99cafb1f-5f03-4f15-96ce-35f797520715",
                "destination_uuid": "8c3e8d4f-20d0-43aa-85af-0a64f3acb1df"
              },
              {
                "uuid": "48f242b4-c854-43b0-b072-515f7d0c3c1a",
                "destination_uuid": "8a5c465f-6c87-484a-bbcd-674492b07a8f"
              }
            ]
          },
          {
            "uuid": "559ef990-5a8b-4727-805f-bc717d6c2ac3",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cae666d0-f13d-4687-8a25-fc340b5da96e"
              }
            ],
            "exits": [
              {
                "uuid": "eec1fb21-9360-482f-9691-84274f45d9c0",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "8c3e8d4f-20d0-43aa-85af-0a64f3acb1df",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d7c47162-69e7-4b58-afa3-7a8abd24fc11"
              }
            ],
            "exits": [
              {
                "uuid": "bfdea2aa-1665-41ad-8910-4311df302aae",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "8a5c465f-6c87-484a-bbcd-674492b07a8f",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f30fe266-8788-47b9-999a-af5697de5c6d"
              }
            ],
            "exits": [
              {
                "uuid": "324639dc-8c98-4b18-98d7-bb3bbdabf4f0",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "3905054c-e54d-44d6-a234-d0f5fb53355e",
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
                "uuid": "2779ef4e-4de6-4129-8cd9-f6a3063889ec"
              }
            ],
            "exits": [
              {
                "uuid": "fd0ad019-8bc4-482d-ac80-2538be135bec",
                "destination_uuid": "f30315fc-bb20-44b6-9763-73990c7f2830"
              }
            ]
          },
          {
            "uuid": "f30315fc-bb20-44b6-9763-73990c7f2830",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b5a69f7e-d843-4801-89e4-3a9e5a405e53",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "f3bbf6ae-9bac-4d6c-9bf1-0f2bd508bc20",
                  "type": "has_only_phrase",
                  "uuid": "d528f283-610c-4ded-8da4-e58859033414"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "85bc8e76-d42b-4357-95c6-9f50260c344d",
                  "type": "has_only_phrase",
                  "uuid": "ed13e337-9126-461d-b916-b8d82c07b3b4"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "bedf7d34-37d7-43ad-8c65-395498baad84",
                  "type": "has_only_phrase",
                  "uuid": "69364547-9827-40f7-815a-9c27887a9404"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "624436eb-bc92-4e3b-996c-07532399d114",
                  "name": "All Responses",
                  "uuid": "b5a69f7e-d843-4801-89e4-3a9e5a405e53"
                },
                {
                  "exit_uuid": "db502026-7304-4525-917c-7462778f66c5",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "f3bbf6ae-9bac-4d6c-9bf1-0f2bd508bc20"
                },
                {
                  "exit_uuid": "b141e0a1-244f-43c4-bc00-4dfb839823cd",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "85bc8e76-d42b-4357-95c6-9f50260c344d"
                },
                {
                  "exit_uuid": "76f60d48-0fb0-4e12-bc22-1966d9b83312",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "bedf7d34-37d7-43ad-8c65-395498baad84"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "624436eb-bc92-4e3b-996c-07532399d114",
                "destination_uuid": null
              },
              {
                "uuid": "db502026-7304-4525-917c-7462778f66c5",
                "destination_uuid": "84024591-3154-4daa-9dc0-3857a8cede25"
              },
              {
                "uuid": "b141e0a1-244f-43c4-bc00-4dfb839823cd",
                "destination_uuid": "8b8b7def-b454-4d10-b596-b092f261a9d1"
              },
              {
                "uuid": "76f60d48-0fb0-4e12-bc22-1966d9b83312",
                "destination_uuid": "0fde497a-df3d-42c3-bcab-e7fd7873ac2c"
              }
            ]
          },
          {
            "uuid": "84024591-3154-4daa-9dc0-3857a8cede25",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9fb25fb8-3ff3-4dfb-8c36-d8c55ba91823"
              }
            ],
            "exits": [
              {
                "uuid": "13b2c7b1-9101-4239-a233-d8957188bc89",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "8b8b7def-b454-4d10-b596-b092f261a9d1",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "893a87e5-1fab-4481-b9c4-f0a1d31801d2"
              }
            ],
            "exits": [
              {
                "uuid": "89f86537-a0e6-4e73-8f64-9861d2a3a212",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "0fde497a-df3d-42c3-bcab-e7fd7873ac2c",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "94875c5d-ca05-4f68-b9b8-ba8931770ff9"
              }
            ],
            "exits": [
              {
                "uuid": "d9d4fa01-caf4-4fbf-89cd-0d0756ab5065",
                "destination_uuid": "31653e74-7aeb-4e07-abd4-9166f261c563"
              }
            ]
          },
          {
            "uuid": "31653e74-7aeb-4e07-abd4-9166f261c563",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "947efd3e-210d-414b-8cd7-310f12e7e2ed",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "5b0e4482-f263-45a6-8d45-52b71e8ec794",
                  "type": "has_only_phrase",
                  "uuid": "b12daf6b-4d78-46a4-9ac5-f762d7b71707"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "aee6f24e-33e3-4917-9afb-6f441019eacb",
                  "name": "All Responses",
                  "uuid": "947efd3e-210d-414b-8cd7-310f12e7e2ed"
                },
                {
                  "exit_uuid": "9fb2e800-6d98-4077-8022-9ce57b3cdaf7",
                  "name": "Next",
                  "uuid": "5b0e4482-f263-45a6-8d45-52b71e8ec794"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "aee6f24e-33e3-4917-9afb-6f441019eacb",
                "destination_uuid": null
              },
              {
                "uuid": "9fb2e800-6d98-4077-8022-9ce57b3cdaf7",
                "destination_uuid": "a1280be2-165e-4516-85c2-ea70facc45f9"
              }
            ]
          },
          {
            "uuid": "a1280be2-165e-4516-85c2-ea70facc45f9",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "f8dcf6e3-8ef8-4166-9d77-de0ac2704ec7"
              }
            ],
            "exits": [
              {
                "uuid": "3a89856e-c651-4987-9d65-dc5a530e6aa1",
                "destination_uuid": "dae428c3-6cdf-4daa-a495-28d124338606"
              }
            ]
          },
          {
            "uuid": "dae428c3-6cdf-4daa-a495-28d124338606",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "84acaba1-ba5c-414e-8f98-a436779fe58b",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "a1f0328e-bab5-4839-b4f3-b56ddd60d3c5",
                  "type": "has_only_phrase",
                  "uuid": "b1cf295a-ba82-429c-ab4b-c6adb7593ae3"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "94075fed-ab6c-4a37-b62a-6da54015e81c",
                  "type": "has_only_phrase",
                  "uuid": "754e5790-bfe2-450f-ab26-7ab4e250c24f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f3f091a6-dda0-443e-b770-ba94c8a6631c",
                  "name": "All Responses",
                  "uuid": "84acaba1-ba5c-414e-8f98-a436779fe58b"
                },
                {
                  "exit_uuid": "b6c3743e-5cbe-4878-a7f2-9fb94271ff36",
                  "name": "No",
                  "uuid": "a1f0328e-bab5-4839-b4f3-b56ddd60d3c5"
                },
                {
                  "exit_uuid": "4afc0680-c768-4228-a089-1e24524fe1dc",
                  "name": "Yes",
                  "uuid": "94075fed-ab6c-4a37-b62a-6da54015e81c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f3f091a6-dda0-443e-b770-ba94c8a6631c",
                "destination_uuid": null
              },
              {
                "uuid": "b6c3743e-5cbe-4878-a7f2-9fb94271ff36",
                "destination_uuid": "cdc2cf21-4ae6-475c-a21f-d750c4df0da2"
              },
              {
                "uuid": "4afc0680-c768-4228-a089-1e24524fe1dc",
                "destination_uuid": "af713de9-97ab-43cc-ae82-0baf1f77d60e"
              }
            ]
          },
          {
            "uuid": "cdc2cf21-4ae6-475c-a21f-d750c4df0da2",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "afb8f2c9-a241-4d4e-8445-846de57b4e7c"
              }
            ],
            "exits": [
              {
                "uuid": "041d114d-ff36-40f1-a559-2e16c43e9443",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "af713de9-97ab-43cc-ae82-0baf1f77d60e",
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
                "uuid": "4f7bff2b-f8c6-430a-be02-250942a80973"
              }
            ],
            "exits": [
              {
                "uuid": "cb42e0d6-96e7-41a8-9d58-ceea0a45f612",
                "destination_uuid": "d1301812-1b20-41bf-b63d-f34859f062ad"
              }
            ]
          },
          {
            "uuid": "d1301812-1b20-41bf-b63d-f34859f062ad",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "067db8fe-07c5-4e85-9a38-5dc7acf047fa",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "d9ee7f1f-3197-45f2-a87a-5459d439d2c1",
                  "type": "has_only_phrase",
                  "uuid": "fabd5cc9-db91-4800-ad94-4b3aa4bd4c0a"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "081c3638-2b2a-4e76-a674-ca0d2bc29004",
                  "type": "has_only_phrase",
                  "uuid": "26fee727-0463-4afd-bb09-09f391b0f0ab"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "609b6526-1b99-4a91-838a-2463490f602e",
                  "type": "has_only_phrase",
                  "uuid": "cf7569eb-6aa2-4dc1-8911-cdc623404a5c"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "10598260-5cc3-4a83-ad75-446a9e3fddb2",
                  "type": "has_only_phrase",
                  "uuid": "5369941a-84c1-4599-a3f9-dc71ac93286d"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "0a033894-94a3-4969-bbc3-432e6a7135d4",
                  "type": "has_only_phrase",
                  "uuid": "f285551a-e0f8-4571-b347-0c07ce14ba87"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "51847c5a-9105-46f3-9532-9020461ce4cd",
                  "type": "has_only_phrase",
                  "uuid": "347c9d66-bd83-4f44-81f3-cc6b27ae8c74"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "33aa2343-4afc-45d0-b913-006eb000207c",
                  "type": "has_only_phrase",
                  "uuid": "d2cf6ec1-cde4-42d6-b20f-b20eea879707"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "e1cf7379-8264-4719-97ad-cb85f268805d",
                  "type": "has_only_phrase",
                  "uuid": "ddb401e7-7f33-4625-90b3-9bd4dc888741"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e616715f-739c-485b-8e1d-be79a7eef9b9",
                  "name": "All Responses",
                  "uuid": "067db8fe-07c5-4e85-9a38-5dc7acf047fa"
                },
                {
                  "exit_uuid": "537fa6f4-bce9-40c8-8c29-4422c27a23b7",
                  "name": "I don’t have enough time",
                  "uuid": "d9ee7f1f-3197-45f2-a87a-5459d439d2c1"
                },
                {
                  "exit_uuid": "e9de3c69-d387-4a4f-8ae4-a5ef73204569",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "081c3638-2b2a-4e76-a674-ca0d2bc29004"
                },
                {
                  "exit_uuid": "b9e5c859-9ca2-429c-bb2c-7438db3151e5",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "609b6526-1b99-4a91-838a-2463490f602e"
                },
                {
                  "exit_uuid": "9303a7a7-6880-46d2-a1b8-3c00b0d71685",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "10598260-5cc3-4a83-ad75-446a9e3fddb2"
                },
                {
                  "exit_uuid": "531a7af9-d779-47cb-8280-323c2c84b7d7",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "0a033894-94a3-4969-bbc3-432e6a7135d4"
                },
                {
                  "exit_uuid": "0bb115ee-8c8a-4ac4-80ae-4138c48c29f8",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "51847c5a-9105-46f3-9532-9020461ce4cd"
                },
                {
                  "exit_uuid": "b2e16849-ca6c-475a-a405-2468516e5bcb",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "33aa2343-4afc-45d0-b913-006eb000207c"
                },
                {
                  "exit_uuid": "e3eacc02-30fe-4054-82ec-e23fd75d302d",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "e1cf7379-8264-4719-97ad-cb85f268805d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e616715f-739c-485b-8e1d-be79a7eef9b9",
                "destination_uuid": null
              },
              {
                "uuid": "537fa6f4-bce9-40c8-8c29-4422c27a23b7",
                "destination_uuid": "1eb7141b-0e51-4185-bfd8-cdc034bd5fa2"
              },
              {
                "uuid": "e9de3c69-d387-4a4f-8ae4-a5ef73204569",
                "destination_uuid": "34d1d5b0-a34b-4809-bd8a-4617fd45fc7b"
              },
              {
                "uuid": "b9e5c859-9ca2-429c-bb2c-7438db3151e5",
                "destination_uuid": "3cc682b1-da4a-4221-acde-df6920c0dd9b"
              },
              {
                "uuid": "9303a7a7-6880-46d2-a1b8-3c00b0d71685",
                "destination_uuid": "8ffbd018-4a94-4162-94b7-ecf6f6fda155"
              },
              {
                "uuid": "531a7af9-d779-47cb-8280-323c2c84b7d7",
                "destination_uuid": "2e34d282-c7dc-4282-acb1-319966633fa1"
              },
              {
                "uuid": "0bb115ee-8c8a-4ac4-80ae-4138c48c29f8",
                "destination_uuid": "1d3fa20d-0639-4a95-b3d6-191b2bcbe7ae"
              },
              {
                "uuid": "b2e16849-ca6c-475a-a405-2468516e5bcb",
                "destination_uuid": "b575f5a8-5f5b-4e8b-8452-7e99fc0b1213"
              },
              {
                "uuid": "e3eacc02-30fe-4054-82ec-e23fd75d302d",
                "destination_uuid": "3905054c-e54d-44d6-a234-d0f5fb53355e"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c382f2ed-9322-4802-8ade-62181574ef97",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a265107f-da1d-42c9-9d12-9b107e0dd1ef",
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
                "uuid": "639239c7-25aa-4f8c-a2bd-b1920cf25f3e"
              }
            ],
            "exits": [
              {
                "uuid": "53c51e62-7504-496b-943a-9d20f38c149b",
                "destination_uuid": "42a4f28d-3167-43e9-8bfe-2f25814c4be5"
              }
            ]
          },
          {
            "uuid": "42a4f28d-3167-43e9-8bfe-2f25814c4be5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c474d995-c184-47f1-8fdc-a134c25bda2d",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "ee06a42c-e8cb-441f-912e-f1a8fddaf32b",
                  "type": "has_only_phrase",
                  "uuid": "8fc7204f-e958-4fda-878f-a0949cca2cee"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "c9871221-775d-4d41-a996-64a6a746609d",
                  "type": "has_only_phrase",
                  "uuid": "a08d9ee4-83fb-4bdb-a9d2-3121e82a975f"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "91307571-c114-44aa-896e-a02cde8426da",
                  "type": "has_only_phrase",
                  "uuid": "0a1518d1-a648-47ef-9b84-23ff8a50032c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9649bf1b-eb00-46d7-aaef-918ded666d7b",
                  "name": "All Responses",
                  "uuid": "c474d995-c184-47f1-8fdc-a134c25bda2d"
                },
                {
                  "exit_uuid": "0f845c03-9688-487d-aa0d-32d5b0ad621d",
                  "name": "Great",
                  "uuid": "ee06a42c-e8cb-441f-912e-f1a8fddaf32b"
                },
                {
                  "exit_uuid": "6b1c6db4-905c-472a-9188-da684a1ad30e",
                  "name": "Neutral",
                  "uuid": "c9871221-775d-4d41-a996-64a6a746609d"
                },
                {
                  "exit_uuid": "fe683a0f-163b-4e3a-b53a-b5fdefca99ed",
                  "name": "Bad",
                  "uuid": "91307571-c114-44aa-896e-a02cde8426da"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9649bf1b-eb00-46d7-aaef-918ded666d7b",
                "destination_uuid": null
              },
              {
                "uuid": "0f845c03-9688-487d-aa0d-32d5b0ad621d",
                "destination_uuid": "abef7dba-f124-43aa-b203-04e95cf53ce7"
              },
              {
                "uuid": "6b1c6db4-905c-472a-9188-da684a1ad30e",
                "destination_uuid": "989a73e0-13a9-4650-85e0-e04c85a1ef33"
              },
              {
                "uuid": "fe683a0f-163b-4e3a-b53a-b5fdefca99ed",
                "destination_uuid": "d22864e6-9203-41e7-9cd6-174dc400e830"
              }
            ]
          },
          {
            "uuid": "abef7dba-f124-43aa-b203-04e95cf53ce7",
            "actions": [
              {
                "attachments": [],
                "text": "So good to hear that you and your children are in a good space today. What a wonderful feeling!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "661689a3-15ae-457d-bfea-721f8660d807"
              }
            ],
            "exits": [
              {
                "uuid": "578819c2-5ed8-472f-94ac-8cd2fd8be03b",
                "destination_uuid": "0a68657f-77b5-4655-9715-789e1cda195c"
              }
            ]
          },
          {
            "uuid": "989a73e0-13a9-4650-85e0-e04c85a1ef33",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes things go great. Sometimes they don’t. And sometimes we don't quite know what to think...and that's totally okay! Remember that you are not alone.",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "be5e35ae-455b-44ec-932c-5cb8a4d7dded"
              }
            ],
            "exits": [
              {
                "uuid": "17627d85-0b03-407e-bd7d-1cef83a560f7",
                "destination_uuid": "0a68657f-77b5-4655-9715-789e1cda195c"
              }
            ]
          },
          {
            "uuid": "d22864e6-9203-41e7-9cd6-174dc400e830",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that things are difficult with your children now. It is completely normal to struggle sometimes. Remember that you are not alone!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "ffb2fa82-3617-4b85-918d-129e7985ab50"
              }
            ],
            "exits": [
              {
                "uuid": "c0f15446-5198-42a1-846a-2b8f49895d39",
                "destination_uuid": "d9855d97-3bc1-46f5-b6aa-f2aa992aec0e"
              }
            ]
          },
          {
            "uuid": "0a68657f-77b5-4655-9715-789e1cda195c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cedc4b6b-222d-4f2c-ad2d-2390618d1896",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "eb271f49-6545-40bc-98c5-e38feb523fa3",
                  "type": "has_only_phrase",
                  "uuid": "fa462af4-e187-4b62-ba72-ea91f2948b4e"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "292fbf7d-c604-4bde-8063-7b3b67260e93",
                  "type": "has_only_phrase",
                  "uuid": "21a38abb-5100-4cc4-b9ac-e7e457b3eb59"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "26a3077a-89e2-44d6-b035-ef08f56b6168",
                  "name": "All Responses",
                  "uuid": "cedc4b6b-222d-4f2c-ad2d-2390618d1896"
                },
                {
                  "exit_uuid": "685c700c-d05c-4746-82a7-9b727bc28140",
                  "name": "More tips",
                  "uuid": "eb271f49-6545-40bc-98c5-e38feb523fa3"
                },
                {
                  "exit_uuid": "05fe44e7-437d-475e-9e5a-a6b6b7e1e62d",
                  "name": "Activity to help you relax",
                  "uuid": "292fbf7d-c604-4bde-8063-7b3b67260e93"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "26a3077a-89e2-44d6-b035-ef08f56b6168",
                "destination_uuid": null
              },
              {
                "uuid": "685c700c-d05c-4746-82a7-9b727bc28140",
                "destination_uuid": "6234fb14-8e8f-49bd-80c4-9dcce8f57c22"
              },
              {
                "uuid": "05fe44e7-437d-475e-9e5a-a6b6b7e1e62d",
                "destination_uuid": "59dc0c06-61cb-4ff1-8093-532257f4f7ad"
              }
            ]
          },
          {
            "uuid": "6234fb14-8e8f-49bd-80c4-9dcce8f57c22",
            "actions": [
              {
                "uuid": "3123eca4-9ae8-4e84-bfb7-710c8f151f24",
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
                "uuid": "4d4e0e25-b80d-43c0-aa39-25cb032f7550",
                "destination_uuid": "b7896a19-ef52-4e25-bb7b-930e6603c217"
              }
            ]
          },
          {
            "uuid": "b7896a19-ef52-4e25-bb7b-930e6603c217",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "e7f02f10-37f5-481e-8840-a0a161f8a15b"
                },
                "type": "enter_flow",
                "uuid": "f7915e62-9e8a-4f7f-be90-a8544a73e0a0"
              }
            ],
            "exits": [
              {
                "uuid": "e23e8bdb-20b0-42cc-baaa-339c96afbba6",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "d9855d97-3bc1-46f5-b6aa-f2aa992aec0e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e4c3186a-d44f-4add-b00d-25869deac35d",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "1cb5e8a3-54ee-4e81-8838-efcc1669b9c2",
                  "type": "has_only_phrase",
                  "uuid": "4d6c1f6d-332b-4668-9d5e-4f2ff1a9203d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4c1554d8-70a9-4b02-a580-7591b275639c",
                  "name": "All Responses",
                  "uuid": "e4c3186a-d44f-4add-b00d-25869deac35d"
                },
                {
                  "exit_uuid": "ef9beb1e-62a2-4710-8eba-07b7e20dd043",
                  "name": "Activity to help you relax",
                  "uuid": "1cb5e8a3-54ee-4e81-8838-efcc1669b9c2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4c1554d8-70a9-4b02-a580-7591b275639c",
                "destination_uuid": null
              },
              {
                "uuid": "ef9beb1e-62a2-4710-8eba-07b7e20dd043",
                "destination_uuid": "59dc0c06-61cb-4ff1-8093-532257f4f7ad"
              }
            ]
          },
          {
            "uuid": "59dc0c06-61cb-4ff1-8093-532257f4f7ad",
            "actions": [
              {
                "uuid": "ed48eec7-4852-4dab-83a0-9a5da526037e",
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
                "uuid": "d0464d06-9141-4257-8e80-6c3dbe00ed5e",
                "destination_uuid": "8f12b038-7bce-4d45-9c2b-61e4b70398c8"
              }
            ]
          },
          {
            "uuid": "8f12b038-7bce-4d45-9c2b-61e4b70398c8",
            "actions": [
              {
                "flow": {
                  "name": "calm_2",
                  "uuid": "2a66337f-9ecb-449e-88b9-4c286d335cac"
                },
                "type": "enter_flow",
                "uuid": "2a914947-ad33-4958-b5e6-c140126ca611"
              }
            ],
            "exits": [
              {
                "uuid": "8ce47545-241b-4a26-81f4-e5a5941cd64b",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4649ec6b-26af-4d17-9086-84b59b43acd3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d2c34ef4-be29-43ec-a9e9-b16aa4c89d53",
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
                "uuid": "05859ff3-454d-436d-9453-d4278f1de0ab"
              }
            ],
            "exits": [
              {
                "uuid": "bba7c656-b9fd-48c8-ae8d-d3fb47931512",
                "destination_uuid": "1cdf90c5-75be-489a-b5d5-a7f20fef1dbf"
              }
            ]
          },
          {
            "uuid": "1cdf90c5-75be-489a-b5d5-a7f20fef1dbf",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a2db970d-19e5-4ca1-b39b-162e4d317011",
              "cases": [
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "979963d2-3f3e-40f3-977e-a3a6e58cbc59",
                  "type": "has_only_phrase",
                  "uuid": "a2fa13fe-1344-4cc6-898e-9458aea71b29"
                },
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "771564f4-7c87-4616-9685-fdd8bebb809f",
                  "type": "has_only_phrase",
                  "uuid": "45ae8c20-7ec9-438e-a2a8-c8bd06a22ff0"
                },
                {
                  "arguments": [
                    "Pop stars"
                  ],
                  "category_uuid": "9d384e91-dd4f-41ff-aee6-d85d2d56cdd1",
                  "type": "has_only_phrase",
                  "uuid": "4b960908-4aa3-4105-8344-11fe9f123711"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "eef1129c-807a-4e80-8fe9-407b6b74f5d6",
                  "name": "All Responses",
                  "uuid": "a2db970d-19e5-4ca1-b39b-162e4d317011"
                },
                {
                  "exit_uuid": "0ea49b64-880f-475e-942e-35f8518196e0",
                  "name": "Get active",
                  "uuid": "979963d2-3f3e-40f3-977e-a3a6e58cbc59"
                },
                {
                  "exit_uuid": "2bcaf9ff-60c8-4e3a-9067-91f4ea6e268d",
                  "name": "Chat together",
                  "uuid": "771564f4-7c87-4616-9685-fdd8bebb809f"
                },
                {
                  "exit_uuid": "f1321db3-4f0c-4b52-bc98-a96255aa03ce",
                  "name": "Pop stars",
                  "uuid": "9d384e91-dd4f-41ff-aee6-d85d2d56cdd1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "eef1129c-807a-4e80-8fe9-407b6b74f5d6",
                "destination_uuid": null
              },
              {
                "uuid": "0ea49b64-880f-475e-942e-35f8518196e0",
                "destination_uuid": "a8493fde-2d5c-4eca-b282-ecf92d750b9c"
              },
              {
                "uuid": "2bcaf9ff-60c8-4e3a-9067-91f4ea6e268d",
                "destination_uuid": "e21fa8a6-fd6d-4270-bde0-6f4797e3b55b"
              },
              {
                "uuid": "f1321db3-4f0c-4b52-bc98-a96255aa03ce",
                "destination_uuid": "d4c7d5a6-164b-41e6-aba4-622a4f73c8a5"
              }
            ]
          },
          {
            "uuid": "a8493fde-2d5c-4eca-b282-ecf92d750b9c",
            "actions": [
              {
                "attachments": [],
                "text": "Co-chef\n- Ask your teen what kind of meal they would like to eat. \n- Prepare it together! \n- Let them have a turn at being the head chef – they lead and you follow their instructions \n- You can even help them make a budget for ingredients!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "82b1f041-cc90-41bc-9a61-41cff7b28c70"
              }
            ],
            "exits": [
              {
                "uuid": "d7e85f3e-d137-4ecc-8b65-4e5cdc3d4f51",
                "destination_uuid": "f0d0e326-2eb7-4c44-96dd-dce412db6f05"
              }
            ]
          },
          {
            "uuid": "e21fa8a6-fd6d-4270-bde0-6f4797e3b55b",
            "actions": [
              {
                "attachments": [],
                "text": "Just a friendly chat \n- Have a conversation with your teen about something they like \n- It can be about anything they choose to talk about: sports, friends, music, celebrities… \n- Try to listen to your teen and give them space to talk ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "54ec8371-f172-42f0-8351-6b49e1ac7761"
              }
            ],
            "exits": [
              {
                "uuid": "9bae3e4e-34ca-48e0-9065-c3f6092a4393",
                "destination_uuid": "f0d0e326-2eb7-4c44-96dd-dce412db6f05"
              }
            ]
          },
          {
            "uuid": "d4c7d5a6-164b-41e6-aba4-622a4f73c8a5",
            "actions": [
              {
                "attachments": [],
                "text": "- Ask your teen to choose their favourite song \n- Try to sing it together – do your best pop star impression!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "beb97e15-ad80-4f03-a7f6-8711bd97d22d"
              }
            ],
            "exits": [
              {
                "uuid": "54077f88-0d25-482b-9d03-23dfdeb81f3c",
                "destination_uuid": "f0d0e326-2eb7-4c44-96dd-dce412db6f05"
              }
            ]
          },
          {
            "uuid": "f0d0e326-2eb7-4c44-96dd-dce412db6f05",
            "actions": [
              {
                "attachments": [],
                "text": "Every time you do one-on-one time mark your STAR to track your success",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6ea94b1a-8a49-45ee-9f53-157da08725ff"
              }
            ],
            "exits": [
              {
                "uuid": "a00867f8-e3b7-4882-9b4c-6615b3cebf31",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "d3eb7465-b12c-4192-ad7b-a803c8e1439c",
            "actions": [
              {
                "uuid": "968929e4-39e1-4804-aac9-fe91512f0d48",
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
                "uuid": "9e75ec88-12d4-4de8-aeba-0c879cad6d4c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "10d46e07-2f9a-407c-92f0-32c64e575199",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5494cb91-0836-4f38-a57f-720d9a521497",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "baddd504-1eb0-4962-8ca9-32f289e93368"
              }
            ],
            "exits": [
              {
                "uuid": "f5939a5b-cf6a-45ca-bf31-680737b68745",
                "destination_uuid": "4a56e409-f498-455e-b00c-9c7ce2e6b3f4"
              }
            ]
          },
          {
            "uuid": "4a56e409-f498-455e-b00c-9c7ce2e6b3f4",
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
                "uuid": "56710ffe-3d6a-49d8-8c5b-4440f325fd38"
              }
            ],
            "exits": [
              {
                "uuid": "2bc32eb5-76de-4559-83d8-129289e1b7b1",
                "destination_uuid": "d003b1c7-a837-4d6e-83a6-d2f0730cebb1"
              }
            ]
          },
          {
            "uuid": "d003b1c7-a837-4d6e-83a6-d2f0730cebb1",
            "actions": [],
            "exits": [
              {
                "uuid": "74ffc3f0-e855-4a19-b983-36f82c753819",
                "destination_uuid": "f95b1abe-3a11-4e59-823f-886899c76bf4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "dd502a6f-8346-4ecb-829f-cb308570978d",
              "cases": [],
              "categories": [
                {
                  "uuid": "dd502a6f-8346-4ecb-829f-cb308570978d",
                  "name": "All Responses",
                  "exit_uuid": "74ffc3f0-e855-4a19-b983-36f82c753819"
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
            "uuid": "f95b1abe-3a11-4e59-823f-886899c76bf4",
            "actions": [
              {
                "uuid": "832dc041-111f-422a-93b9-5bc5b2bd3edb",
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
                "uuid": "b2408227-c32e-4629-a1f3-9d675aee5268",
                "destination_uuid": "1692db23-4453-42e4-8350-64e67dccd554"
              }
            ]
          },
          {
            "uuid": "1692db23-4453-42e4-8350-64e67dccd554",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "09424228-3bbc-485d-a4db-d3c13e1bfd30"
              }
            ],
            "exits": [
              {
                "uuid": "fe5ff84e-bd26-4ed2-b867-30ddd24a2ad1",
                "destination_uuid": "96d2a7c6-d577-4dab-9b85-f38d524cd63e"
              }
            ]
          },
          {
            "uuid": "96d2a7c6-d577-4dab-9b85-f38d524cd63e",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a8826662-6f38-4c7d-865d-9ba49aaf410f"
              }
            ],
            "exits": [
              {
                "uuid": "cbb8bacc-d2cd-489f-ad6f-b09ae3918976",
                "destination_uuid": "07e7877f-48ef-4ad3-8894-9d709115a1c0"
              }
            ]
          },
          {
            "uuid": "07e7877f-48ef-4ad3-8894-9d709115a1c0",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "26769587-21b7-49da-959a-69e3b88a9d5b"
              }
            ],
            "exits": [
              {
                "uuid": "0216cf9a-096b-41c5-b149-299534d372cf",
                "destination_uuid": "0efa7752-aaca-4034-8d27-7ba0fafa9022"
              }
            ]
          },
          {
            "uuid": "0efa7752-aaca-4034-8d27-7ba0fafa9022",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "d920131f-005f-493d-8e8c-328f278f83fb"
              }
            ],
            "exits": [
              {
                "uuid": "67515a05-6a0f-40c3-ac98-e0f90647a17c",
                "destination_uuid": "7999e6ab-e0c6-4199-b895-8d17c4d3fcd9"
              }
            ]
          },
          {
            "uuid": "7999e6ab-e0c6-4199-b895-8d17c4d3fcd9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0ee13614-6608-42a8-88eb-1c6037e6f173",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "bdaededa-afdc-4630-98b0-e0fa600a03b9",
                  "type": "has_only_phrase",
                  "uuid": "6dab148c-5474-4599-9f49-58e1bbc72ea6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1750107d-8d21-4ce4-aa72-07e167bc2214",
                  "name": "All Responses",
                  "uuid": "0ee13614-6608-42a8-88eb-1c6037e6f173"
                },
                {
                  "exit_uuid": "92db56e8-39e2-48dd-bbbd-013a259a48cd",
                  "name": "Let me hear your story",
                  "uuid": "bdaededa-afdc-4630-98b0-e0fa600a03b9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1750107d-8d21-4ce4-aa72-07e167bc2214",
                "destination_uuid": null
              },
              {
                "uuid": "92db56e8-39e2-48dd-bbbd-013a259a48cd",
                "destination_uuid": "2bca9cac-5eb8-47c2-a410-3df993b14653"
              }
            ]
          },
          {
            "uuid": "2bca9cac-5eb8-47c2-a410-3df993b14653",
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
                "uuid": "297a94c2-715c-4536-aa7c-7a3fb4715e29"
              }
            ],
            "exits": [
              {
                "uuid": "9f84dd20-289f-4322-b1f7-f779f78472ae",
                "destination_uuid": "fe3df826-b6c9-4fa5-a769-1c61c3a70085"
              }
            ]
          },
          {
            "uuid": "fe3df826-b6c9-4fa5-a769-1c61c3a70085",
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
                "uuid": "52356a3c-0853-4a59-96f1-55c648cfab01"
              }
            ],
            "exits": [
              {
                "uuid": "8c576e5a-3f6b-4add-8620-f009c335d9c5",
                "destination_uuid": "4b412fde-3918-4fe0-9fe2-d6d9d1c1bf30"
              }
            ]
          },
          {
            "uuid": "4b412fde-3918-4fe0-9fe2-d6d9d1c1bf30",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3c72a1b6-e587-4a31-9763-783884e3ad4b",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "11fc4ae9-0362-4386-97cd-0017dfcda790",
                  "type": "has_only_phrase",
                  "uuid": "8c0cbda3-d628-4def-bf02-31303ac6e707"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "1df679c3-b3d6-4ad8-89ce-a2c083116774",
                  "type": "has_only_phrase",
                  "uuid": "484c2ed2-f8ee-4eaf-bfed-c55aa88ba708"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4ffad6fc-0abd-45d6-8fa4-1523f20dc43f",
                  "name": "All Responses",
                  "uuid": "3c72a1b6-e587-4a31-9763-783884e3ad4b"
                },
                {
                  "exit_uuid": "ac14acf1-adda-4814-afce-b01690722e66",
                  "name": "Previous",
                  "uuid": "11fc4ae9-0362-4386-97cd-0017dfcda790"
                },
                {
                  "exit_uuid": "34ca6c25-5681-422e-a24c-9eaa4cf207b9",
                  "name": "Next",
                  "uuid": "1df679c3-b3d6-4ad8-89ce-a2c083116774"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4ffad6fc-0abd-45d6-8fa4-1523f20dc43f",
                "destination_uuid": null
              },
              {
                "uuid": "ac14acf1-adda-4814-afce-b01690722e66",
                "destination_uuid": "2bca9cac-5eb8-47c2-a410-3df993b14653"
              },
              {
                "uuid": "34ca6c25-5681-422e-a24c-9eaa4cf207b9",
                "destination_uuid": "133e6040-93da-4af8-ade0-cd805477c57d"
              }
            ]
          },
          {
            "uuid": "133e6040-93da-4af8-ade0-cd805477c57d",
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
                "uuid": "917aec57-ff02-40e5-be32-7c1673808bfa"
              }
            ],
            "exits": [
              {
                "uuid": "b04c06e2-55ba-4f8b-a224-d378f9cf22a4",
                "destination_uuid": "71975a45-3406-40af-9ed6-d13ed11c3a2d"
              }
            ]
          },
          {
            "uuid": "71975a45-3406-40af-9ed6-d13ed11c3a2d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "352197a6-e61d-4afe-93c5-979898e52cc7",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "ea72e7f5-b5a5-44e7-b110-3f181bffc76e",
                  "type": "has_only_phrase",
                  "uuid": "131edac1-326b-4b15-bae7-6ad73abe46df"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9acfb233-798e-44eb-a3c0-907a0a9d8e07",
                  "type": "has_only_phrase",
                  "uuid": "b8c04ae5-9eb6-40e8-8480-aea21e444721"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a155b85d-d663-4ade-8094-aaf1cab912c1",
                  "name": "All Responses",
                  "uuid": "352197a6-e61d-4afe-93c5-979898e52cc7"
                },
                {
                  "exit_uuid": "afa16beb-452e-4918-82f1-3761b72f1e7f",
                  "name": "Previous",
                  "uuid": "ea72e7f5-b5a5-44e7-b110-3f181bffc76e"
                },
                {
                  "exit_uuid": "9e08e80d-7849-46a0-81ca-b1632b6f6fa6",
                  "name": "Next",
                  "uuid": "9acfb233-798e-44eb-a3c0-907a0a9d8e07"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a155b85d-d663-4ade-8094-aaf1cab912c1",
                "destination_uuid": null
              },
              {
                "uuid": "afa16beb-452e-4918-82f1-3761b72f1e7f",
                "destination_uuid": "fe3df826-b6c9-4fa5-a769-1c61c3a70085"
              },
              {
                "uuid": "9e08e80d-7849-46a0-81ca-b1632b6f6fa6",
                "destination_uuid": "27abef50-06a0-4e6f-92f9-0d0c8ff6c92e"
              }
            ]
          },
          {
            "uuid": "27abef50-06a0-4e6f-92f9-0d0c8ff6c92e",
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
                "uuid": "8b94f31c-c838-40d8-8829-89a79915c768"
              }
            ],
            "exits": [
              {
                "uuid": "aea5b9dc-c979-441e-bad4-807b138c8bb0",
                "destination_uuid": "38d05b3f-51a9-49b3-8f5e-c5899df1894a"
              }
            ]
          },
          {
            "uuid": "38d05b3f-51a9-49b3-8f5e-c5899df1894a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "403818e6-dfba-4ce1-abe2-b58853617805",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "54d32ddb-18a1-4d75-b2d9-7134a0e361bf",
                  "type": "has_only_phrase",
                  "uuid": "52c61d36-355b-4528-9b27-35a89b6859ad"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b5f29675-9c22-482f-b94e-6211585ea294",
                  "type": "has_only_phrase",
                  "uuid": "135944c3-c3f5-4485-9ddf-a5a27ca301c9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0b16a518-272a-44d3-9c58-890800b53d81",
                  "name": "All Responses",
                  "uuid": "403818e6-dfba-4ce1-abe2-b58853617805"
                },
                {
                  "exit_uuid": "ce878edc-020d-4384-9985-f5691728bbc7",
                  "name": "Previous",
                  "uuid": "54d32ddb-18a1-4d75-b2d9-7134a0e361bf"
                },
                {
                  "exit_uuid": "49686258-4630-44e8-bbfb-85e780996769",
                  "name": "Next",
                  "uuid": "b5f29675-9c22-482f-b94e-6211585ea294"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0b16a518-272a-44d3-9c58-890800b53d81",
                "destination_uuid": null
              },
              {
                "uuid": "ce878edc-020d-4384-9985-f5691728bbc7",
                "destination_uuid": "133e6040-93da-4af8-ade0-cd805477c57d"
              },
              {
                "uuid": "49686258-4630-44e8-bbfb-85e780996769",
                "destination_uuid": "261766d2-36ff-44bf-a77d-1d0175c106aa"
              }
            ]
          },
          {
            "uuid": "261766d2-36ff-44bf-a77d-1d0175c106aa",
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
                "uuid": "c729cf64-e8db-4d14-a541-ed69341505df"
              }
            ],
            "exits": [
              {
                "uuid": "98d73c59-ec2a-4619-b782-d852e7690c5a",
                "destination_uuid": "f5bf536f-f7b5-493c-8269-86f0c755e5f9"
              }
            ]
          },
          {
            "uuid": "f5bf536f-f7b5-493c-8269-86f0c755e5f9",
            "actions": [],
            "exits": [
              {
                "uuid": "daa94cef-9d57-4a59-91d7-708e48ae027d",
                "destination_uuid": "bab4f653-299a-4d30-bc5f-8eede6b24adb"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "41c4a673-7871-404f-80d1-78b4d660d34d",
              "cases": [],
              "categories": [
                {
                  "uuid": "41c4a673-7871-404f-80d1-78b4d660d34d",
                  "name": "All Responses",
                  "exit_uuid": "daa94cef-9d57-4a59-91d7-708e48ae027d"
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
            "uuid": "bab4f653-299a-4d30-bc5f-8eede6b24adb",
            "actions": [
              {
                "uuid": "3f9d6919-b5ea-4ea0-a1fa-c3bb68a37578",
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
                "uuid": "438a9d47-3a8b-4972-8f32-c645013fc604",
                "destination_uuid": "c397bb79-f099-4fa9-b6b1-df3af98b7557"
              }
            ]
          },
          {
            "uuid": "c397bb79-f099-4fa9-b6b1-df3af98b7557",
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
                "uuid": "3bf66bc3-9909-4b31-86c3-b97963fe224d"
              }
            ],
            "exits": [
              {
                "uuid": "08b80769-f23a-417f-9a77-58e1d61d1001",
                "destination_uuid": "54a20d6e-e69c-4c53-86ec-38efcca7cc6e"
              }
            ]
          },
          {
            "uuid": "54a20d6e-e69c-4c53-86ec-38efcca7cc6e",
            "actions": [],
            "exits": [
              {
                "uuid": "60fd4194-7096-406d-8959-4ed64bdc354d",
                "destination_uuid": "dd0a85ed-412f-4263-ac23-64263165d74e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d5c8ffd7-f782-49ed-944f-18d66c2bdba8",
              "cases": [],
              "categories": [
                {
                  "uuid": "d5c8ffd7-f782-49ed-944f-18d66c2bdba8",
                  "name": "All Responses",
                  "exit_uuid": "60fd4194-7096-406d-8959-4ed64bdc354d"
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
            "uuid": "dd0a85ed-412f-4263-ac23-64263165d74e",
            "actions": [
              {
                "uuid": "3b482f4c-3447-48a3-ab35-72bbc955c33b",
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
                "uuid": "6588852d-37d6-433a-ab79-03f47a70a4a4",
                "destination_uuid": "474bb664-02a2-41a4-90b0-b67cc35ede8f"
              }
            ]
          },
          {
            "uuid": "474bb664-02a2-41a4-90b0-b67cc35ede8f",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "017dea89-126c-436e-a317-08b5e23da0a8"
              }
            ],
            "exits": [
              {
                "uuid": "339a44a9-88bb-490c-90f8-f1ac937d922a",
                "destination_uuid": "1076638c-0d7e-43b3-b338-edf8f493ab09"
              }
            ]
          },
          {
            "uuid": "1076638c-0d7e-43b3-b338-edf8f493ab09",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "9532cdfe-39cc-4e91-86c5-e93d285fc3be"
              }
            ],
            "exits": [
              {
                "uuid": "1cd64e48-6d58-46cd-a01c-e1851fa0e695",
                "destination_uuid": "77c3b4e6-2bfb-4a8c-a5dd-b0f0be6b3c63"
              }
            ]
          },
          {
            "uuid": "77c3b4e6-2bfb-4a8c-a5dd-b0f0be6b3c63",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5f3f024d-3daf-4116-8a88-a0296ec1b32e",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "0429bed4-7bf2-4f0e-a2f8-86ce93643876",
                  "type": "has_only_phrase",
                  "uuid": "78c4afbc-9f6c-47f1-bbef-f3d07e4b71d2"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "5f516ee1-4be9-4fb4-ab24-3b34b5c8a1a0",
                  "type": "has_only_phrase",
                  "uuid": "19d01ae3-18a7-4899-88a8-e3be9092272c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e804baa3-97c5-46e5-8ad8-c76d4a9c33bd",
                  "name": "All Responses",
                  "uuid": "5f3f024d-3daf-4116-8a88-a0296ec1b32e"
                },
                {
                  "exit_uuid": "6ab77ed8-bbb7-4e8b-ba97-b0005a280e3e",
                  "name": "Take me to Tips",
                  "uuid": "0429bed4-7bf2-4f0e-a2f8-86ce93643876"
                },
                {
                  "exit_uuid": "5bb1836a-b6d0-40a2-8e83-2c3da76bd74c",
                  "name": "Take me to Homescreen",
                  "uuid": "5f516ee1-4be9-4fb4-ab24-3b34b5c8a1a0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e804baa3-97c5-46e5-8ad8-c76d4a9c33bd",
                "destination_uuid": null
              },
              {
                "uuid": "6ab77ed8-bbb7-4e8b-ba97-b0005a280e3e",
                "destination_uuid": "0364e69f-a937-49fa-bb60-22537b2a473e"
              },
              {
                "uuid": "5bb1836a-b6d0-40a2-8e83-2c3da76bd74c",
                "destination_uuid": "2aec89f0-0cbc-41db-95fb-c94b616c5448"
              }
            ]
          },
          {
            "uuid": "0364e69f-a937-49fa-bb60-22537b2a473e",
            "actions": [
              {
                "uuid": "bcf216eb-50e8-4cb9-a28c-175d0a13a113",
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
                "uuid": "f01fa207-74f4-47f6-bed3-28b5f7fff0b6",
                "destination_uuid": "988412dd-083d-4814-b2dc-524571236ab6"
              }
            ]
          },
          {
            "uuid": "988412dd-083d-4814-b2dc-524571236ab6",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "623cb243-157f-4aa2-aab5-96d8c7c70a47"
                },
                "type": "enter_flow",
                "uuid": "e77bd8d8-951c-47f5-a987-cf62b3ec4bb5"
              }
            ],
            "exits": [
              {
                "uuid": "68b261d9-3908-4ffd-8b8d-481017564ba9",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "2aec89f0-0cbc-41db-95fb-c94b616c5448",
            "actions": [
              {
                "uuid": "9bdf219d-5628-4fae-b9c8-53423ed768d1",
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
                "uuid": "e0db849e-01ab-490e-a501-0fc29a9b22bf",
                "destination_uuid": "93ee71c4-a12f-4868-b6e5-c5af6eb35b64"
              }
            ]
          },
          {
            "uuid": "93ee71c4-a12f-4868-b6e5-c5af6eb35b64",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "1c0d8217-0f15-4a23-976a-9264bc9dd32f"
                },
                "type": "enter_flow",
                "uuid": "d484a539-8cfa-4898-9784-f5c14ab7808f"
              }
            ],
            "exits": [
              {
                "uuid": "0cf116e2-b4a9-43b5-8b52-e4335623ef92",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a2ae15fd-6604-436c-9ff5-5b8bf3120a82",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "58b9636c-3dc6-422d-a836-61126f31126c",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "31b9efa6-5252-4771-b208-21e39212ec1e"
              }
            ],
            "exits": [
              {
                "uuid": "e1e110ae-aa23-4707-83f9-23c9b6c88bb6",
                "destination_uuid": "efc716db-4c1d-452b-ae1f-407b482b1a1e"
              }
            ]
          },
          {
            "uuid": "efc716db-4c1d-452b-ae1f-407b482b1a1e",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "9a6c8cea-4d25-427f-95ef-4395479de827"
              }
            ],
            "exits": [
              {
                "uuid": "93077d97-a21f-44fc-b5df-38d5e2c9efed",
                "destination_uuid": "4549be4a-5199-48f8-907e-23204e4cf572"
              }
            ]
          },
          {
            "uuid": "4549be4a-5199-48f8-907e-23204e4cf572",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "007a1267-c7a9-4d90-b9f5-7081648df1da",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "bb729d6d-4077-4654-a501-046236c9e63d",
                  "type": "has_only_phrase",
                  "uuid": "9a657ab9-549d-466a-92d8-b24da14b2b0c"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "8e1ccb7d-62b3-4dd1-9fa1-5cbb1b72c9b5",
                  "type": "has_only_phrase",
                  "uuid": "dd92e514-f69b-4677-867d-208f8a5be54b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fe3e82a8-9376-4de4-a1a0-8a6e554fadc9",
                  "name": "All Responses",
                  "uuid": "007a1267-c7a9-4d90-b9f5-7081648df1da"
                },
                {
                  "exit_uuid": "c9193a5c-4d57-4efd-9834-a5dcb4ababc9",
                  "name": "Later",
                  "uuid": "bb729d6d-4077-4654-a501-046236c9e63d"
                },
                {
                  "exit_uuid": "0bcab89a-76df-434d-816e-594584e980a4",
                  "name": "Yes",
                  "uuid": "8e1ccb7d-62b3-4dd1-9fa1-5cbb1b72c9b5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fe3e82a8-9376-4de4-a1a0-8a6e554fadc9",
                "destination_uuid": null
              },
              {
                "uuid": "c9193a5c-4d57-4efd-9834-a5dcb4ababc9",
                "destination_uuid": "964b1211-9ae3-4fe6-aea0-b5c936ee75f2"
              },
              {
                "uuid": "0bcab89a-76df-434d-816e-594584e980a4",
                "destination_uuid": "9a737cdf-d388-4576-ae70-e284489ebc3b"
              }
            ]
          },
          {
            "uuid": "964b1211-9ae3-4fe6-aea0-b5c936ee75f2",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "a6d790e4-427d-477c-be93-b045cbceed9c"
                },
                "type": "enter_flow",
                "uuid": "08dc8ac4-398b-4150-9de9-6bf53596e861"
              }
            ],
            "exits": [
              {
                "uuid": "f65daeb0-2a7f-4a95-aa72-1d03271c48d9",
                "destination_uuid": null
              },
              {
                "uuid": "a073ec18-7811-4ef2-a16a-5081217d78ff",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e52b73ed-1793-4c6a-85e2-0cba5c89bd70",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "fa19a160-6e0d-4118-a928-d94b9e58e4f2"
                },
                {
                  "uuid": "dc5482d4-508b-4fbf-a394-7acce38573a6",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "3804fe28-1da1-4b34-8dae-b451d475cac9"
                }
              ],
              "categories": [
                {
                  "uuid": "fa19a160-6e0d-4118-a928-d94b9e58e4f2",
                  "name": "Complete",
                  "exit_uuid": "f65daeb0-2a7f-4a95-aa72-1d03271c48d9"
                },
                {
                  "uuid": "3804fe28-1da1-4b34-8dae-b451d475cac9",
                  "name": "Expired",
                  "exit_uuid": "a073ec18-7811-4ef2-a16a-5081217d78ff"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "fa19a160-6e0d-4118-a928-d94b9e58e4f2"
            }
          },
          {
            "uuid": "9a737cdf-d388-4576-ae70-e284489ebc3b",
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
                "uuid": "00bfe04e-228c-411d-b45d-4b257ba8aa79"
              }
            ],
            "exits": [
              {
                "uuid": "18db03aa-fa9a-4dfe-9fbf-3cd1aea81ac1",
                "destination_uuid": "abadeac8-a844-4a8f-b3ca-969151e61622"
              }
            ]
          },
          {
            "uuid": "abadeac8-a844-4a8f-b3ca-969151e61622",
            "actions": [],
            "exits": [
              {
                "uuid": "f5a09194-94fa-42f3-b16c-e97369d53d2c",
                "destination_uuid": "3833330f-3cb0-4dee-bf6f-b68e8834d2d7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6979e777-582a-4496-ab1d-95d33cd604f8",
              "cases": [],
              "categories": [
                {
                  "uuid": "6979e777-582a-4496-ab1d-95d33cd604f8",
                  "name": "All Responses",
                  "exit_uuid": "f5a09194-94fa-42f3-b16c-e97369d53d2c"
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
            "uuid": "3833330f-3cb0-4dee-bf6f-b68e8834d2d7",
            "actions": [
              {
                "uuid": "ec4ec083-0a81-4807-8d23-d0a4a57bcb9d",
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
                "uuid": "4f8cf2ef-98e5-4bd3-a05a-598c2d0b9eae",
                "destination_uuid": "92224775-e96f-4d24-aa0a-55109618c7d0"
              }
            ]
          },
          {
            "uuid": "92224775-e96f-4d24-aa0a-55109618c7d0",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "331ed7b0-8034-4298-8361-f4b94c75b613"
              }
            ],
            "exits": [
              {
                "uuid": "e1e6fb39-da83-4b8d-a687-78e280c46b81",
                "destination_uuid": "9ae69d33-59fa-4c0e-950e-1afe62533d0c"
              }
            ]
          },
          {
            "uuid": "9ae69d33-59fa-4c0e-950e-1afe62533d0c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d600e20b-b165-4145-b388-89ff98314cc4",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "8cc90fe5-202b-4db7-aa26-2bd7a0a2c0c6",
                  "type": "has_only_phrase",
                  "uuid": "33ff2443-f66f-48cb-a0ef-4072815aea12"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "64b1a27b-2e91-4116-aa14-63813be3c1fa",
                  "name": "All Responses",
                  "uuid": "d600e20b-b165-4145-b388-89ff98314cc4"
                },
                {
                  "exit_uuid": "96388797-444c-4e17-9210-688697c709b9",
                  "name": "Click here when done",
                  "uuid": "8cc90fe5-202b-4db7-aa26-2bd7a0a2c0c6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "64b1a27b-2e91-4116-aa14-63813be3c1fa",
                "destination_uuid": null
              },
              {
                "uuid": "96388797-444c-4e17-9210-688697c709b9",
                "destination_uuid": "f0073411-8094-45e3-b424-7929b5ed7684"
              }
            ]
          },
          {
            "uuid": "f0073411-8094-45e3-b424-7929b5ed7684",
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
                "uuid": "1bb30022-b47f-4868-a7c5-740bc36f4743"
              }
            ],
            "exits": [
              {
                "uuid": "7a700a41-3d39-4fdd-b6cf-d64fb9b2083b",
                "destination_uuid": "5939a487-c7dc-48ee-9bbb-a7011f247519"
              }
            ]
          },
          {
            "uuid": "5939a487-c7dc-48ee-9bbb-a7011f247519",
            "actions": [],
            "exits": [
              {
                "uuid": "153c31a7-2da8-4208-8017-db3b95388c98",
                "destination_uuid": "4cf12236-23d1-43c2-a39c-0bf6f1682d63"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0f2c7f5f-96fc-472a-b5ba-a1a763e7a38a",
              "cases": [],
              "categories": [
                {
                  "uuid": "0f2c7f5f-96fc-472a-b5ba-a1a763e7a38a",
                  "name": "All Responses",
                  "exit_uuid": "153c31a7-2da8-4208-8017-db3b95388c98"
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
            "uuid": "4cf12236-23d1-43c2-a39c-0bf6f1682d63",
            "actions": [
              {
                "uuid": "e37a3398-4e79-4c0e-af89-ca47b0fd08ae",
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
                "uuid": "41900d8c-c70f-4c4c-9d9d-e3e45c5d51c9",
                "destination_uuid": "7779d72e-a80e-409e-b2da-e57c650dd449"
              }
            ]
          },
          {
            "uuid": "7779d72e-a80e-409e-b2da-e57c650dd449",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "1c46fb3e-9df0-42b1-89c5-ad45169d1316"
              }
            ],
            "exits": [
              {
                "uuid": "8e4706af-1748-48d7-b049-36f759b45194",
                "destination_uuid": "be7c78cf-24c6-4d72-8021-d28919cf738d"
              }
            ]
          },
          {
            "uuid": "be7c78cf-24c6-4d72-8021-d28919cf738d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "67ec124d-4d7b-4331-9739-4bec702bd8c9",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "f167f07e-5ee9-4c27-bccc-39b72f912e88",
                  "type": "has_only_phrase",
                  "uuid": "a8004879-152d-4d93-b49c-1557e18408af"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "bd822195-62c6-4942-9b15-37d2de7a4558",
                  "name": "All Responses",
                  "uuid": "67ec124d-4d7b-4331-9739-4bec702bd8c9"
                },
                {
                  "exit_uuid": "5f98fc32-f03a-43df-9ac1-561c1dfe52b8",
                  "name": "Click here when done",
                  "uuid": "f167f07e-5ee9-4c27-bccc-39b72f912e88"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "bd822195-62c6-4942-9b15-37d2de7a4558",
                "destination_uuid": null
              },
              {
                "uuid": "5f98fc32-f03a-43df-9ac1-561c1dfe52b8",
                "destination_uuid": "d09411d9-6c12-4998-8099-f952236989aa"
              }
            ]
          },
          {
            "uuid": "d09411d9-6c12-4998-8099-f952236989aa",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "31ff42db-76a9-4b10-8cb8-d6c944e3c2e1"
              }
            ],
            "exits": [
              {
                "uuid": "54d2fb64-c7fe-4cd1-8b95-ecb7fbc4c04c",
                "destination_uuid": "8f4346e0-340b-4497-b0ca-b3591126fe27"
              }
            ]
          },
          {
            "uuid": "8f4346e0-340b-4497-b0ca-b3591126fe27",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "120879e6-47c1-4b83-812a-b8475a6aa11b"
              }
            ],
            "exits": [
              {
                "uuid": "5384cb97-c1db-4f55-abc0-f85a242f4056",
                "destination_uuid": "cf08f857-4d55-4523-8cee-ddde63765407"
              }
            ]
          },
          {
            "uuid": "cf08f857-4d55-4523-8cee-ddde63765407",
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
                "uuid": "09263a0e-e98a-45ac-85d1-244faffcac8e"
              }
            ],
            "exits": [
              {
                "uuid": "0f560de8-e92d-4f11-b2e9-c0a7e8072fa8",
                "destination_uuid": "9f43dbcc-2512-4f29-9d43-8693a10e79a1"
              }
            ]
          },
          {
            "uuid": "9f43dbcc-2512-4f29-9d43-8693a10e79a1",
            "actions": [],
            "exits": [
              {
                "uuid": "e48e8f87-01ef-47eb-afe4-f273d11d211a",
                "destination_uuid": "23e9b9c5-6cff-42f5-a007-555b08ff0114"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c2554d3f-d429-423d-9835-780bd7a4bf73",
              "cases": [],
              "categories": [
                {
                  "uuid": "c2554d3f-d429-423d-9835-780bd7a4bf73",
                  "name": "All Responses",
                  "exit_uuid": "e48e8f87-01ef-47eb-afe4-f273d11d211a"
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
            "uuid": "23e9b9c5-6cff-42f5-a007-555b08ff0114",
            "actions": [
              {
                "uuid": "48aba807-1fb1-4aab-86a4-5978fedf3a1b",
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
                "uuid": "83b07bd0-8b14-421d-bcc8-723d58c8b05b",
                "destination_uuid": "dc99f5f7-db09-4bd7-83b1-60c8e8732050"
              }
            ]
          },
          {
            "uuid": "dc99f5f7-db09-4bd7-83b1-60c8e8732050",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "39c80c7b-6e03-400c-bdce-1df3ef51d9f1"
              }
            ],
            "exits": [
              {
                "uuid": "002465c6-bb2e-4b2d-9cda-f6a4fb567316",
                "destination_uuid": "70bd3474-5501-47a4-815b-4c016652e554"
              }
            ]
          },
          {
            "uuid": "70bd3474-5501-47a4-815b-4c016652e554",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f8a7a00c-b46a-4979-a001-7242c7e7cfd7",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "fae16cdc-1f68-46f5-97d0-14fe7b10128b",
                  "type": "has_only_phrase",
                  "uuid": "3db3493a-f709-4799-8617-a8de30cf6474"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9c2e0d9c-fe11-4d4b-95f7-14792d2abe32",
                  "name": "All Responses",
                  "uuid": "f8a7a00c-b46a-4979-a001-7242c7e7cfd7"
                },
                {
                  "exit_uuid": "dcec678f-65c5-4c5e-b03a-1209271dae90",
                  "name": "Take me to Homescreen",
                  "uuid": "fae16cdc-1f68-46f5-97d0-14fe7b10128b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9c2e0d9c-fe11-4d4b-95f7-14792d2abe32",
                "destination_uuid": null
              },
              {
                "uuid": "dcec678f-65c5-4c5e-b03a-1209271dae90",
                "destination_uuid": "23d3a9d5-d858-4f22-a9ca-c3c9e3bb89e7"
              }
            ]
          },
          {
            "uuid": "23d3a9d5-d858-4f22-a9ca-c3c9e3bb89e7",
            "actions": [
              {
                "uuid": "722a53b1-23b2-4a3d-ab40-01bb23dd7e6e",
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
                "uuid": "ff7ca002-3ca6-4e03-bed4-3768ffc63d2e",
                "destination_uuid": "78cf4b22-b6d1-4671-bbd9-5332ba90e571"
              }
            ]
          },
          {
            "uuid": "78cf4b22-b6d1-4671-bbd9-5332ba90e571",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "1359fc79-b7fb-405a-a2ab-2e07cb5ec241"
                },
                "type": "enter_flow",
                "uuid": "e6190abf-c746-42f2-bfc5-64886ec26efb"
              }
            ],
            "exits": [
              {
                "uuid": "4afa70d3-c672-4697-9504-33ae03f83334",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "08cdca22-98a2-4ba1-8d75-f8ba37885373",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "fdee52c1-a6c0-4d10-acbc-fb44c9169a0f",
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
                "uuid": "ec721c06-479e-4122-b441-99d526337044"
              }
            ],
            "exits": [
              {
                "uuid": "1918bc05-8978-4575-b67c-e6927f5ae893",
                "destination_uuid": "491be1f9-be1f-496e-94f1-d4e014ea64d3"
              }
            ]
          },
          {
            "uuid": "491be1f9-be1f-496e-94f1-d4e014ea64d3",
            "actions": [],
            "exits": [
              {
                "uuid": "71ae6025-8e9a-4504-a979-bcd067eda1b7",
                "destination_uuid": "7a2e5ecd-6f23-419d-b44b-a270a133d0d0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "49f44ef7-062b-4a00-9679-62d38dfcfcc6",
              "cases": [],
              "categories": [
                {
                  "uuid": "49f44ef7-062b-4a00-9679-62d38dfcfcc6",
                  "name": "All Responses",
                  "exit_uuid": "71ae6025-8e9a-4504-a979-bcd067eda1b7"
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
            "uuid": "7a2e5ecd-6f23-419d-b44b-a270a133d0d0",
            "actions": [
              {
                "uuid": "96b3098d-eda2-4f71-9591-68511443a8d7",
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
                "uuid": "f9560d6a-6440-455a-8c95-1cdc2257c36f",
                "destination_uuid": "1b27c0a2-1b44-483f-9089-dfd574958f03"
              }
            ]
          },
          {
            "uuid": "1b27c0a2-1b44-483f-9089-dfd574958f03",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "91ee38de-dabd-43c7-a99f-038428193ab0",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "fd27c95f-cbc9-4308-9bad-a83458204ac2",
                  "type": "has_only_phrase",
                  "uuid": "d1cfa988-ff61-4a7a-b1b4-6cdb5821b139"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "33eabd9a-e8e2-467e-875b-42c1d93a18ab",
                  "type": "has_only_phrase",
                  "uuid": "9377408e-2310-46cc-ba4c-72318706c4b9"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "33eabd9a-e8e2-467e-875b-42c1d93a18ab",
                  "type": "has_only_phrase",
                  "uuid": "c878c86e-26e5-4357-b639-59c8643013b7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e4b8b161-753a-4912-8684-d375805e0525",
                  "name": "All Responses",
                  "uuid": "91ee38de-dabd-43c7-a99f-038428193ab0"
                },
                {
                  "exit_uuid": "79b9392e-6e4e-43d0-af27-63d14032695a",
                  "name": "Great",
                  "uuid": "fd27c95f-cbc9-4308-9bad-a83458204ac2"
                },
                {
                  "exit_uuid": "ee668db3-c372-40a5-936d-00c0fe3d886a",
                  "name": "Neutral; Bad",
                  "uuid": "33eabd9a-e8e2-467e-875b-42c1d93a18ab"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "e4b8b161-753a-4912-8684-d375805e0525",
                "destination_uuid": null
              },
              {
                "uuid": "79b9392e-6e4e-43d0-af27-63d14032695a",
                "destination_uuid": "4590a6d1-c207-4292-8b5a-5e66220ce0cf"
              },
              {
                "uuid": "ee668db3-c372-40a5-936d-00c0fe3d886a",
                "destination_uuid": "4aa79dd9-c01c-4405-b3fb-1790f6bba828"
              }
            ]
          },
          {
            "uuid": "4590a6d1-c207-4292-8b5a-5e66220ce0cf",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "4d955f52-b5f7-4f8e-b6b1-0deb7405ac53"
              }
            ],
            "exits": [
              {
                "uuid": "3721da30-7578-4af4-9889-5986e16414f7",
                "destination_uuid": "d29db4b1-517b-4be8-8fbd-99396d9fa6c2"
              }
            ]
          },
          {
            "uuid": "4aa79dd9-c01c-4405-b3fb-1790f6bba828",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "e994798c-b4c0-48a8-8894-9c082a90ccb3"
              }
            ],
            "exits": [
              {
                "uuid": "39c04002-9df7-4389-ad0a-9c68173ab0a3",
                "destination_uuid": "f0a769f7-985d-4077-a675-dc749b7f9117"
              }
            ]
          },
          {
            "uuid": "f0a769f7-985d-4077-a675-dc749b7f9117",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ef36d2f1-a3f7-4813-9830-0ff1da763f4a",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "d047fc13-4efd-445c-a280-93904bdc7807",
                  "type": "has_only_phrase",
                  "uuid": "49291447-2f3f-4b0b-aa61-cf746b39b73f"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "6de80e0a-27b2-4d92-9c3e-f7ca6180e93d",
                  "type": "has_only_phrase",
                  "uuid": "73a70736-47b6-49b2-a5ad-fce4a841d953"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "73115f38-5d4c-426b-a28c-b72654a5f905",
                  "name": "All Responses",
                  "uuid": "ef36d2f1-a3f7-4813-9830-0ff1da763f4a"
                },
                {
                  "exit_uuid": "8222f61b-4f59-4226-99e7-7156e588e2d5",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "d047fc13-4efd-445c-a280-93904bdc7807"
                },
                {
                  "exit_uuid": "cbdad09e-f1e1-4f04-97f1-43beae9c013f",
                  "name": "Continue",
                  "uuid": "6de80e0a-27b2-4d92-9c3e-f7ca6180e93d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "73115f38-5d4c-426b-a28c-b72654a5f905",
                "destination_uuid": null
              },
              {
                "uuid": "8222f61b-4f59-4226-99e7-7156e588e2d5",
                "destination_uuid": "72eacbe2-85e0-4645-8b22-fb88ce1ffc12"
              },
              {
                "uuid": "cbdad09e-f1e1-4f04-97f1-43beae9c013f",
                "destination_uuid": "32faa08b-402f-4f86-91ec-a1d79bbcb2b9"
              }
            ]
          },
          {
            "uuid": "72eacbe2-85e0-4645-8b22-fb88ce1ffc12",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "cf6ff60c-4184-46f0-9c16-e17e7bc296c0"
                },
                "type": "enter_flow",
                "uuid": "5198bf6d-b4b7-4c83-b92a-772e21fbf517"
              }
            ],
            "exits": [
              {
                "uuid": "97647b6d-7b8d-4f75-89b1-708296c89d14",
                "destination_uuid": "5dd14a85-1d16-47ea-8d2f-a1e275f2f452"
              },
              {
                "uuid": "c23f00ab-44e6-4378-b60f-a2788d391d35",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "951658f7-b663-4cbb-b32f-404f9d2ea451",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "98d69f28-f550-4f5d-b42d-9c6d784d4a33"
                },
                {
                  "uuid": "eaf02270-1e6b-44c2-8f0f-9b2a6e1527a8",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "25a6dd88-1445-4a54-8410-a90b429996a5"
                }
              ],
              "categories": [
                {
                  "uuid": "98d69f28-f550-4f5d-b42d-9c6d784d4a33",
                  "name": "Complete",
                  "exit_uuid": "97647b6d-7b8d-4f75-89b1-708296c89d14"
                },
                {
                  "uuid": "25a6dd88-1445-4a54-8410-a90b429996a5",
                  "name": "Expired",
                  "exit_uuid": "c23f00ab-44e6-4378-b60f-a2788d391d35"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "98d69f28-f550-4f5d-b42d-9c6d784d4a33"
            }
          },
          {
            "uuid": "d29db4b1-517b-4be8-8fbd-99396d9fa6c2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a6897d32-7b60-4a6d-983f-d0f6e1777149",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "9b961bbe-61be-4f06-9530-a65787930e5e",
                  "type": "has_only_phrase",
                  "uuid": "6ddccb12-0f4a-4172-bd8c-74a430e67d80"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7513296b-8804-4ddb-8038-4fe5980ae9be",
                  "name": "All Responses",
                  "uuid": "a6897d32-7b60-4a6d-983f-d0f6e1777149"
                },
                {
                  "exit_uuid": "46635ec9-5728-4ea5-99ba-9f2634109e0a",
                  "name": "Go to Praise check-in",
                  "uuid": "9b961bbe-61be-4f06-9530-a65787930e5e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7513296b-8804-4ddb-8038-4fe5980ae9be",
                "destination_uuid": null
              },
              {
                "uuid": "46635ec9-5728-4ea5-99ba-9f2634109e0a",
                "destination_uuid": "513a9759-918d-4dcb-becd-f3a3290b4400"
              }
            ]
          },
          {
            "uuid": "513a9759-918d-4dcb-becd-f3a3290b4400",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "5afecd95-bd2a-4d68-be49-abfd346bfe68"
              }
            ],
            "exits": [
              {
                "uuid": "cb87716d-8c9b-49f8-91d4-7a508fe49f2a",
                "destination_uuid": "def2d7d9-56fe-4019-9d58-1ca00e078675"
              }
            ]
          },
          {
            "uuid": "32faa08b-402f-4f86-91ec-a1d79bbcb2b9",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "87dcd803-e2a6-4357-b9cd-8fa16d44d778"
              }
            ],
            "exits": [
              {
                "uuid": "29930b3d-ca46-41c6-991c-0a0a70c215aa",
                "destination_uuid": "def2d7d9-56fe-4019-9d58-1ca00e078675"
              }
            ]
          },
          {
            "uuid": "5dd14a85-1d16-47ea-8d2f-a1e275f2f452",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "45362d7b-b533-41e0-972f-82dc0d1e19f9"
              }
            ],
            "exits": [
              {
                "uuid": "1f403cc5-0dad-4ec8-be59-79d8088b4809",
                "destination_uuid": "def2d7d9-56fe-4019-9d58-1ca00e078675"
              }
            ]
          },
          {
            "uuid": "def2d7d9-56fe-4019-9d58-1ca00e078675",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "892ffef7-e894-436f-b89e-7e9772c8da17",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "d2dbf55b-e465-4418-9e7c-d8158bc2594f",
                  "type": "has_only_phrase",
                  "uuid": "bffb9a9c-efb0-4720-a0b3-5e47b7991e68"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "f9ca5185-dd1f-4c81-9608-d1ab9163d756",
                  "type": "has_only_phrase",
                  "uuid": "4abfc3d7-350e-4d20-9663-209e2ac68996"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "480eabf6-15cf-4ef6-843f-0ca365290707",
                  "type": "has_only_phrase",
                  "uuid": "af8ee9f5-4e8f-43e4-b967-4ba9e8054ef4"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "3155fcab-1964-4319-850b-124679f1696f",
                  "type": "has_only_phrase",
                  "uuid": "38b88ae3-ac34-45e2-b9a9-b8bee991eb0d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e6ae81d2-5522-43b0-8790-05ed40687854",
                  "name": "All Responses",
                  "uuid": "892ffef7-e894-436f-b89e-7e9772c8da17"
                },
                {
                  "exit_uuid": "53af794b-cba2-445c-a026-f51301818f85",
                  "name": "No",
                  "uuid": "d2dbf55b-e465-4418-9e7c-d8158bc2594f"
                },
                {
                  "exit_uuid": "4b38bfe2-abe1-45f8-a001-281ff5f31ca4",
                  "name": "Yes",
                  "uuid": "f9ca5185-dd1f-4c81-9608-d1ab9163d756"
                },
                {
                  "exit_uuid": "1ffb4fec-143d-4b69-a8af-73e03ecd1580",
                  "name": "Yes",
                  "uuid": "480eabf6-15cf-4ef6-843f-0ca365290707"
                },
                {
                  "exit_uuid": "79fb6045-fd38-4519-8611-80089a505dec",
                  "name": "Yes",
                  "uuid": "3155fcab-1964-4319-850b-124679f1696f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e6ae81d2-5522-43b0-8790-05ed40687854",
                "destination_uuid": null
              },
              {
                "uuid": "53af794b-cba2-445c-a026-f51301818f85",
                "destination_uuid": "b180feb2-558c-4cbc-a129-0558f0e973fc"
              },
              {
                "uuid": "4b38bfe2-abe1-45f8-a001-281ff5f31ca4",
                "destination_uuid": "89d5c579-8434-436e-9295-792255778d0a"
              },
              {
                "uuid": "1ffb4fec-143d-4b69-a8af-73e03ecd1580",
                "destination_uuid": "89d5c579-8434-436e-9295-792255778d0a"
              },
              {
                "uuid": "79fb6045-fd38-4519-8611-80089a505dec",
                "destination_uuid": "89d5c579-8434-436e-9295-792255778d0a"
              }
            ]
          },
          {
            "uuid": "b180feb2-558c-4cbc-a129-0558f0e973fc",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e25a888a-55d8-4c4b-9d19-680ed0dc3880"
              }
            ],
            "exits": [
              {
                "uuid": "32b8cab1-9800-4222-bdd1-f1c9a1f437b4",
                "destination_uuid": "4a62cb92-d249-4be4-82a5-267a2edd3152"
              }
            ]
          },
          {
            "uuid": "89d5c579-8434-436e-9295-792255778d0a",
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
                "uuid": "10c5d978-7e85-43b6-a004-9ab6eec7a5ee"
              }
            ],
            "exits": [
              {
                "uuid": "b7340d63-83d9-40b7-8383-cbebce2a017a",
                "destination_uuid": "5fa27c10-e4be-4068-9cde-b3040519e309"
              }
            ]
          },
          {
            "uuid": "5fa27c10-e4be-4068-9cde-b3040519e309",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b0b73ace-a09c-4e00-ae84-103905701d35",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "3b894bd7-dc25-4ce6-a3fd-95e2d5831bf8",
                  "type": "has_only_phrase",
                  "uuid": "22b5ae0a-a024-426c-8832-c79c4b1162aa"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "966ac412-eefb-4e1c-9af6-9fec4b5063eb",
                  "type": "has_only_phrase",
                  "uuid": "74265e4a-56d2-4377-9c4c-dcf7ae0e5a2f"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "e06ffd8b-b9e0-4b0b-834e-675a50f52c43",
                  "type": "has_only_phrase",
                  "uuid": "54944436-3336-4eb5-abe3-6312ac444083"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "4d2e4c63-01ce-4cdd-810b-67b660c73aa0",
                  "type": "has_only_phrase",
                  "uuid": "0c05d1d6-1693-469a-9454-1c9923eeb9ad"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5926ef14-177a-4343-ac1d-4b514495e74e",
                  "name": "All Responses",
                  "uuid": "b0b73ace-a09c-4e00-ae84-103905701d35"
                },
                {
                  "exit_uuid": "26a1888b-ffe4-4963-991f-17c37762f84c",
                  "name": "Surprised",
                  "uuid": "3b894bd7-dc25-4ce6-a3fd-95e2d5831bf8"
                },
                {
                  "exit_uuid": "3adb49af-8238-4d37-8d35-f0ccb6070e3c",
                  "name": "Happy",
                  "uuid": "966ac412-eefb-4e1c-9af6-9fec4b5063eb"
                },
                {
                  "exit_uuid": "78cef7b9-fb0d-4ef4-8aad-0126e2e21c12",
                  "name": "My teen did not like it",
                  "uuid": "e06ffd8b-b9e0-4b0b-834e-675a50f52c43"
                },
                {
                  "exit_uuid": "62289b7f-690c-4180-a38a-7117d0200fe6",
                  "name": "I don’t know",
                  "uuid": "4d2e4c63-01ce-4cdd-810b-67b660c73aa0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5926ef14-177a-4343-ac1d-4b514495e74e",
                "destination_uuid": null
              },
              {
                "uuid": "26a1888b-ffe4-4963-991f-17c37762f84c",
                "destination_uuid": "4ef8eb39-1c78-44e4-bfa2-dff6775d5493"
              },
              {
                "uuid": "3adb49af-8238-4d37-8d35-f0ccb6070e3c",
                "destination_uuid": "d43262c0-73d1-471f-bf92-938868cad6d9"
              },
              {
                "uuid": "78cef7b9-fb0d-4ef4-8aad-0126e2e21c12",
                "destination_uuid": "bf0c85b2-3492-4280-b192-52fb8ab2507f"
              },
              {
                "uuid": "62289b7f-690c-4180-a38a-7117d0200fe6",
                "destination_uuid": "358ae0b7-a125-4998-bb7b-9ca224795791"
              }
            ]
          },
          {
            "uuid": "4ef8eb39-1c78-44e4-bfa2-dff6775d5493",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5ae1f2b6-d725-4b01-8fe2-a82a6726bbf6"
              }
            ],
            "exits": [
              {
                "uuid": "3989b86e-231e-49f5-bc01-b61bde7160de",
                "destination_uuid": "252324f2-2fd0-46c8-a85f-6d241480eefb"
              }
            ]
          },
          {
            "uuid": "d43262c0-73d1-471f-bf92-938868cad6d9",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8ccd7785-6251-46b8-a339-93990b8ea662"
              }
            ],
            "exits": [
              {
                "uuid": "04bb811c-470d-432d-9a88-1c859b8884cc",
                "destination_uuid": "252324f2-2fd0-46c8-a85f-6d241480eefb"
              }
            ]
          },
          {
            "uuid": "bf0c85b2-3492-4280-b192-52fb8ab2507f",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0595f688-ac7e-4668-b8ac-ee73399d67f0"
              }
            ],
            "exits": [
              {
                "uuid": "19d03997-6365-4560-b845-877ef19c7163",
                "destination_uuid": "252324f2-2fd0-46c8-a85f-6d241480eefb"
              }
            ]
          },
          {
            "uuid": "358ae0b7-a125-4998-bb7b-9ca224795791",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a72abe1f-2d5f-4881-9546-b6834f7d0545"
              }
            ],
            "exits": [
              {
                "uuid": "142dc221-2b0a-4089-8ee6-6fd05ee42a63",
                "destination_uuid": "252324f2-2fd0-46c8-a85f-6d241480eefb"
              }
            ]
          },
          {
            "uuid": "252324f2-2fd0-46c8-a85f-6d241480eefb",
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
                "uuid": "0f2aede5-ec18-40bd-bca2-99228d83e093"
              }
            ],
            "exits": [
              {
                "uuid": "9643eeac-5fcb-4363-b93f-87e8af18c297",
                "destination_uuid": "a06b46e6-4801-446c-b37a-be7f213883d6"
              }
            ]
          },
          {
            "uuid": "a06b46e6-4801-446c-b37a-be7f213883d6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f806c0a5-db7f-40b9-b825-dbf6bacaedc7",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "6dd4eab5-e4a8-4673-87e9-6a443b5a8d4a",
                  "type": "has_only_phrase",
                  "uuid": "b79fe04c-de47-4624-accd-28182bb25800"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "6dd4eab5-e4a8-4673-87e9-6a443b5a8d4a",
                  "type": "has_only_phrase",
                  "uuid": "6c9b7c2c-4daf-4921-99f6-9e91dbe59518"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "76ece5bd-1454-417a-a406-b2935cf04165",
                  "type": "has_only_phrase",
                  "uuid": "3a592f68-2401-4727-9446-1eff56c6693d"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "76ece5bd-1454-417a-a406-b2935cf04165",
                  "type": "has_only_phrase",
                  "uuid": "9c8d7ab8-06b4-4707-ad7d-e2336381c267"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d8c1646f-d68f-434c-b167-1dbdf466ef41",
                  "name": "All Responses",
                  "uuid": "f806c0a5-db7f-40b9-b825-dbf6bacaedc7"
                },
                {
                  "exit_uuid": "2800b02d-126b-4ac2-a14b-86235b0c8b45",
                  "name": "Every day; Almost every day",
                  "uuid": "6dd4eab5-e4a8-4673-87e9-6a443b5a8d4a"
                },
                {
                  "exit_uuid": "5ec32bee-fe5f-4dd9-8246-1b2db3f12dbb",
                  "name": "A few days; Never",
                  "uuid": "76ece5bd-1454-417a-a406-b2935cf04165"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d8c1646f-d68f-434c-b167-1dbdf466ef41",
                "destination_uuid": null
              },
              {
                "uuid": "2800b02d-126b-4ac2-a14b-86235b0c8b45",
                "destination_uuid": "c7aa27ef-fcc4-47e5-bbb8-f54978699491"
              },
              {
                "uuid": "5ec32bee-fe5f-4dd9-8246-1b2db3f12dbb",
                "destination_uuid": "f9d5d7ff-251d-4ab8-82d1-cf303b924db1"
              }
            ]
          },
          {
            "uuid": "c7aa27ef-fcc4-47e5-bbb8-f54978699491",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7024393d-6620-4184-8d93-d3aaaa44ac56"
              }
            ],
            "exits": [
              {
                "uuid": "8ec0bace-d095-4bde-9e32-a3c10285f2d5",
                "destination_uuid": "4a62cb92-d249-4be4-82a5-267a2edd3152"
              }
            ]
          },
          {
            "uuid": "f9d5d7ff-251d-4ab8-82d1-cf303b924db1",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b7600e4c-05e0-43ae-938a-724bb377e7bc"
              }
            ],
            "exits": [
              {
                "uuid": "085c22c3-c5a6-4628-8876-0d0307de8d83",
                "destination_uuid": "4a62cb92-d249-4be4-82a5-267a2edd3152"
              }
            ]
          },
          {
            "uuid": "4a62cb92-d249-4be4-82a5-267a2edd3152",
            "actions": [
              {
                "uuid": "3b5e1ac3-4285-47fa-8776-ee1cda14d5e0",
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
                "uuid": "f7e13eb2-5eb5-48ac-9068-b831a2757228",
                "destination_uuid": "51f94791-29dc-4846-bdda-840e67c77baa"
              }
            ]
          },
          {
            "uuid": "51f94791-29dc-4846-bdda-840e67c77baa",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "5da16aa1-2525-45df-952e-320496422571"
                },
                "type": "enter_flow",
                "uuid": "90f4af07-2a18-4436-afa6-b13196c2319b"
              }
            ],
            "exits": [
              {
                "uuid": "cc118097-f479-4d87-8d01-3dab485ffa20",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "1e29c433-346f-473f-933f-de4939b6bba6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "89c5a4ba-f784-4ebc-a8de-ad85b7faf1ef",
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
                "uuid": "d747f99d-895a-470e-864c-d46a5547e115"
              }
            ],
            "exits": [
              {
                "uuid": "0038a6ce-3e68-4737-a1dd-c81545c42c81",
                "destination_uuid": "597802b8-f966-4c13-bc8e-af60126bb50f"
              }
            ]
          },
          {
            "uuid": "597802b8-f966-4c13-bc8e-af60126bb50f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7996944c-3949-47a5-93a4-035cd31cf102",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "c677fc77-cd96-4500-9785-999a53919a56",
                  "type": "has_only_phrase",
                  "uuid": "7a6253f8-51b8-4c3f-b68d-9c1ce96d9a62"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "05cad6ae-9fbe-4fae-aa60-a1ebf698aa74",
                  "type": "has_only_phrase",
                  "uuid": "f5d35d2f-7538-4e6d-9e9c-059b7b549d9c"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "dabb91c2-6297-4092-ac58-901bd62a85a5",
                  "type": "has_only_phrase",
                  "uuid": "5c3fc0e4-4654-45b7-8c17-63594e1e813e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "66003d03-51ae-4c88-8aef-689223a461e1",
                  "name": "All Responses",
                  "uuid": "7996944c-3949-47a5-93a4-035cd31cf102"
                },
                {
                  "exit_uuid": "ad60fea3-d7dc-4076-9fae-9bbfb6225745",
                  "name": "Happy",
                  "uuid": "c677fc77-cd96-4500-9785-999a53919a56"
                },
                {
                  "exit_uuid": "1155e991-c7e9-42f9-a723-be43d31b3099",
                  "name": "Neutral",
                  "uuid": "05cad6ae-9fbe-4fae-aa60-a1ebf698aa74"
                },
                {
                  "exit_uuid": "81f71ef3-ae67-4ea3-97f3-12bc2c7032a9",
                  "name": "Sad",
                  "uuid": "dabb91c2-6297-4092-ac58-901bd62a85a5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "66003d03-51ae-4c88-8aef-689223a461e1",
                "destination_uuid": null
              },
              {
                "uuid": "ad60fea3-d7dc-4076-9fae-9bbfb6225745",
                "destination_uuid": "acf2f99c-65b4-413d-9fb7-8f477e6a1a5f"
              },
              {
                "uuid": "1155e991-c7e9-42f9-a723-be43d31b3099",
                "destination_uuid": "71d3394a-6d33-4ac5-ba92-1fdc90bd6cbd"
              },
              {
                "uuid": "81f71ef3-ae67-4ea3-97f3-12bc2c7032a9",
                "destination_uuid": "19af595f-e102-40fb-93bc-02a12c58bda8"
              }
            ]
          },
          {
            "uuid": "acf2f99c-65b4-413d-9fb7-8f477e6a1a5f",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that you are doing well. You are a wonderful parent!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "7f1891a4-ab04-40b9-9ef9-4908a68b846f"
              }
            ],
            "exits": [
              {
                "uuid": "39f83c24-d833-453b-8926-ba48b584e61e",
                "destination_uuid": "28accf99-ef43-41f0-8120-49abb1fb788a"
              }
            ]
          },
          {
            "uuid": "71d3394a-6d33-4ac5-ba92-1fdc90bd6cbd",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that you are not having the best day. Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "a9cf52e7-aa3a-43c3-8b2d-828df75bb65b"
              }
            ],
            "exits": [
              {
                "uuid": "cad6bd68-310f-41e7-967a-2de9396b412c",
                "destination_uuid": "28accf99-ef43-41f0-8120-49abb1fb788a"
              }
            ]
          },
          {
            "uuid": "19af595f-e102-40fb-93bc-02a12c58bda8",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that you are not having a good day. Well done for getting up every morning and trying again, even when you are tired. That is real courage and dedication!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "3aba4fa8-392b-433f-b9da-d13c3392a99d"
              }
            ],
            "exits": [
              {
                "uuid": "9956c568-0f69-424e-90a9-61f9adf1133d",
                "destination_uuid": "43663cf1-8bfe-452d-8c22-e5a062284883"
              }
            ]
          },
          {
            "uuid": "28accf99-ef43-41f0-8120-49abb1fb788a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "088751bf-8181-40ea-ac43-162d0e148b2b",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "9378ee37-6cf1-438f-b970-7282ab55a8e5",
                  "type": "has_only_phrase",
                  "uuid": "9ecb9203-9da2-4d2c-bbf0-e64647d1bbd3"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "6b0ce5e6-97df-4142-ae02-4868c4744c00",
                  "type": "has_only_phrase",
                  "uuid": "548c6010-a682-4cd8-9d79-cc43f3dd631b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "25259c62-3275-44ad-a82c-36dd19a5e51b",
                  "name": "All Responses",
                  "uuid": "088751bf-8181-40ea-ac43-162d0e148b2b"
                },
                {
                  "exit_uuid": "73da8d48-485f-4c17-95a1-0d7f5cb4dcd1",
                  "name": "More tips",
                  "uuid": "9378ee37-6cf1-438f-b970-7282ab55a8e5"
                },
                {
                  "exit_uuid": "5480e7f0-56bb-4abf-b142-d535369d424d",
                  "name": "Activity to help you relax",
                  "uuid": "6b0ce5e6-97df-4142-ae02-4868c4744c00"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "25259c62-3275-44ad-a82c-36dd19a5e51b",
                "destination_uuid": null
              },
              {
                "uuid": "73da8d48-485f-4c17-95a1-0d7f5cb4dcd1",
                "destination_uuid": "e0ac7b43-0c38-4c81-bab2-84212205376c"
              },
              {
                "uuid": "5480e7f0-56bb-4abf-b142-d535369d424d",
                "destination_uuid": "2cb5bf59-71f8-40f4-89a5-d7e0e3f2e66b"
              }
            ]
          },
          {
            "uuid": "e0ac7b43-0c38-4c81-bab2-84212205376c",
            "actions": [
              {
                "uuid": "a7cf7b92-b6fe-4c57-ace7-0d2fa96eb230",
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
                "uuid": "d80f4850-3dd9-4300-8911-0007d321026e",
                "destination_uuid": "e288d18b-28a7-44f2-b9b9-97a3ecdcd202"
              }
            ]
          },
          {
            "uuid": "e288d18b-28a7-44f2-b9b9-97a3ecdcd202",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "47881dd0-9996-405c-a6b9-1f68e61cc4eb"
                },
                "type": "enter_flow",
                "uuid": "145db5b6-c5f7-4d2a-9e01-91f33b9ed6b9"
              }
            ],
            "exits": [
              {
                "uuid": "ab0a3e3f-beca-457a-be01-639f16ca5756",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "43663cf1-8bfe-452d-8c22-e5a062284883",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7d76b8a0-5eee-4664-9174-7d8fca80a339",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "52831b1b-eca6-4266-8777-11851a12642e",
                  "type": "has_only_phrase",
                  "uuid": "e3129441-0a3e-4945-beca-58037e00f312"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d4f66441-37b4-49ed-86b3-8b30a1d9c640",
                  "name": "All Responses",
                  "uuid": "7d76b8a0-5eee-4664-9174-7d8fca80a339"
                },
                {
                  "exit_uuid": "e89cc02b-246e-4aa3-b549-4c1621ca2049",
                  "name": "Activity to help you relax",
                  "uuid": "52831b1b-eca6-4266-8777-11851a12642e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d4f66441-37b4-49ed-86b3-8b30a1d9c640",
                "destination_uuid": null
              },
              {
                "uuid": "e89cc02b-246e-4aa3-b549-4c1621ca2049",
                "destination_uuid": "2cb5bf59-71f8-40f4-89a5-d7e0e3f2e66b"
              }
            ]
          },
          {
            "uuid": "2cb5bf59-71f8-40f4-89a5-d7e0e3f2e66b",
            "actions": [
              {
                "uuid": "6d431fbd-498c-4bc9-be89-5d7524d63b1a",
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
                "uuid": "dfd0e025-500d-4a5f-90c7-d9aa588e7b7e",
                "destination_uuid": "b434ca8e-93eb-4949-88c1-18f5fe71f61a"
              }
            ]
          },
          {
            "uuid": "b434ca8e-93eb-4949-88c1-18f5fe71f61a",
            "actions": [
              {
                "flow": {
                  "name": "calm_3",
                  "uuid": "dee4893f-4cba-4d6d-b68b-fe72b06c80b2"
                },
                "type": "enter_flow",
                "uuid": "1ffdd713-2f22-4978-8774-55122f4535e7"
              }
            ],
            "exits": [
              {
                "uuid": "8d82b5cc-a39c-43b7-b0ca-fb786d4e35ee",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a47b72cf-9ff6-4f43-ab58-e7e3223eda40",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "14e2447e-ebd2-474d-a374-40994df6d1f6",
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
                "uuid": "e0e3ad0f-02b4-459d-8b2d-828d486b4dfb"
              }
            ],
            "exits": [
              {
                "uuid": "fba7c732-5a56-4bf8-9e70-292770783519",
                "destination_uuid": "e2f5ffbe-f31a-4fc2-bee9-af37aa648631"
              }
            ]
          },
          {
            "uuid": "e2f5ffbe-f31a-4fc2-bee9-af37aa648631",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2b97e675-6bf5-4e63-897a-38c65eca4e81",
              "cases": [
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "3273f9cb-a541-4f9e-99b1-be852c2ece09",
                  "type": "has_only_phrase",
                  "uuid": "b5a8f713-e9dc-4a55-bd4a-900ff151549d"
                },
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "3df6ee23-8951-46c3-b48c-893251d1d6cc",
                  "type": "has_only_phrase",
                  "uuid": "893ac053-b92b-4ec4-9e9b-6fc357f6ace9"
                },
                {
                  "arguments": [
                    "Watch & sing"
                  ],
                  "category_uuid": "da749358-7e1d-41a4-b098-61e6a367f028",
                  "type": "has_only_phrase",
                  "uuid": "8ae52df7-4411-4929-8b21-da1160014d84"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9551ae6c-74d7-4cad-9d47-78b9a1607260",
                  "name": "All Responses",
                  "uuid": "2b97e675-6bf5-4e63-897a-38c65eca4e81"
                },
                {
                  "exit_uuid": "43129219-b37a-4edf-9602-5381da8fa8fb",
                  "name": "Chat together",
                  "uuid": "3273f9cb-a541-4f9e-99b1-be852c2ece09"
                },
                {
                  "exit_uuid": "69a9ba31-d85a-4188-a5d9-120811c3074d",
                  "name": "Get active",
                  "uuid": "3df6ee23-8951-46c3-b48c-893251d1d6cc"
                },
                {
                  "exit_uuid": "c67c3199-b1f2-4d0d-a92c-18703ed18eb6",
                  "name": "Watch & sing",
                  "uuid": "da749358-7e1d-41a4-b098-61e6a367f028"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9551ae6c-74d7-4cad-9d47-78b9a1607260",
                "destination_uuid": null
              },
              {
                "uuid": "43129219-b37a-4edf-9602-5381da8fa8fb",
                "destination_uuid": "47e2baba-6e1c-437a-8979-2da6356643f9"
              },
              {
                "uuid": "69a9ba31-d85a-4188-a5d9-120811c3074d",
                "destination_uuid": "af4eb057-e7b3-47e8-9980-19bbdde652eb"
              },
              {
                "uuid": "c67c3199-b1f2-4d0d-a92c-18703ed18eb6",
                "destination_uuid": "c1c5fd1d-e1ce-466b-b236-389cd1d38e64"
              }
            ]
          },
          {
            "uuid": "47e2baba-6e1c-437a-8979-2da6356643f9",
            "actions": [
              {
                "attachments": [],
                "text": "At the End of the Day\n- At the end of each day, take a minute to think about the day.\n- Talk your child about one positive or fun thing they did.\n- Praise yourself for one thing you did well today.\n- Think of one thing that you are grateful for.\n- You are a star!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dde4f196-fc19-4036-9607-c2d7dce8773b"
              }
            ],
            "exits": [
              {
                "uuid": "e042c64c-aec0-4085-b997-52992a74f3a6",
                "destination_uuid": "8296a548-eef7-45cf-a162-ed27b28de133"
              }
            ]
          },
          {
            "uuid": "af4eb057-e7b3-47e8-9980-19bbdde652eb",
            "actions": [
              {
                "attachments": [],
                "text": "What's new?\n- Think of a new skill you could learn together with your teen. For example, keeping a ball in the air or your foot, juggling, making soup?\n- Take turns in trying the new skill out.\n- Make sure to praise each other, and try to learn and play together!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "afeccf69-9139-425f-8f9b-ec7d44319bda"
              }
            ],
            "exits": [
              {
                "uuid": "82964c9c-4637-46f5-b7e8-e9b60beae0ed",
                "destination_uuid": "8296a548-eef7-45cf-a162-ed27b28de133"
              }
            ]
          },
          {
            "uuid": "c1c5fd1d-e1ce-466b-b236-389cd1d38e64",
            "actions": [
              {
                "attachments": [],
                "text": "Song...",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8ce94ea4-526e-4a6b-9730-f60a46c51840"
              }
            ],
            "exits": [
              {
                "uuid": "3295e895-367e-4596-8593-7b8c5fb0bce3",
                "destination_uuid": "8296a548-eef7-45cf-a162-ed27b28de133"
              }
            ]
          },
          {
            "uuid": "8296a548-eef7-45cf-a162-ed27b28de133",
            "actions": [
              {
                "uuid": "b31e6c59-574c-4fc2-b7a9-ec7e0e589bd5",
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
                "uuid": "12ae1679-2232-423a-8b30-d90ada87bfa2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "0f6ee0d1-2ff8-4e49-9d9d-cf741bae4ae8",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "832ff674-7ef0-4878-8605-8ad063bdd148",
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
                "uuid": "57c90774-211f-45e0-aec9-dd9db69791cf"
              }
            ],
            "exits": [
              {
                "uuid": "05d7282d-a94b-4210-954a-dde79ec3dff7",
                "destination_uuid": "b5fd7bd9-34b0-49bf-8c8d-37f7dadf4eae"
              }
            ]
          },
          {
            "uuid": "b5fd7bd9-34b0-49bf-8c8d-37f7dadf4eae",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "841ed910-5696-4cb5-afc9-b40fcd937cc7",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "3d09f53e-6fc9-4b0d-9b49-a0ca928ce6a6",
                  "type": "has_only_phrase",
                  "uuid": "97923e7e-0f75-49d6-a6ac-86b1f4b85318"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "baf5c1e8-3712-40d0-a097-90d42391947d",
                  "type": "has_only_phrase",
                  "uuid": "95bb78de-2231-47d3-9c25-38ef7641c0f1"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "0b7cbaaf-bfa6-4e81-b152-07032458ef60",
                  "type": "has_only_phrase",
                  "uuid": "de81f793-1421-46c9-ba12-a9ef994b7af9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a7a01ad7-98fa-4151-9eda-4a9b1891a322",
                  "name": "All Responses",
                  "uuid": "841ed910-5696-4cb5-afc9-b40fcd937cc7"
                },
                {
                  "exit_uuid": "fc77cb25-04ea-4268-85fb-ac27e15ee8e0",
                  "name": "Happy",
                  "uuid": "3d09f53e-6fc9-4b0d-9b49-a0ca928ce6a6"
                },
                {
                  "exit_uuid": "39469d11-8c18-4af6-9f5c-0bc734c984a5",
                  "name": "Neutral",
                  "uuid": "baf5c1e8-3712-40d0-a097-90d42391947d"
                },
                {
                  "exit_uuid": "f28f8114-129e-49f2-bfa7-4cfcb373f38f",
                  "name": "Sad",
                  "uuid": "0b7cbaaf-bfa6-4e81-b152-07032458ef60"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a7a01ad7-98fa-4151-9eda-4a9b1891a322",
                "destination_uuid": null
              },
              {
                "uuid": "fc77cb25-04ea-4268-85fb-ac27e15ee8e0",
                "destination_uuid": "9dd37074-c5dd-410e-8cd0-baf5f66657f8"
              },
              {
                "uuid": "39469d11-8c18-4af6-9f5c-0bc734c984a5",
                "destination_uuid": "ccdf3c0e-90d9-433a-995a-779ba1272241"
              },
              {
                "uuid": "f28f8114-129e-49f2-bfa7-4cfcb373f38f",
                "destination_uuid": "0034e81e-a819-4d64-9583-49ddcd2ddd2f"
              }
            ]
          },
          {
            "uuid": "9dd37074-c5dd-410e-8cd0-baf5f66657f8",
            "actions": [
              {
                "attachments": [],
                "text": "So good to hear you are feeling well today. You are incredible!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips"
                ],
                "uuid": "67bbce73-ef21-4515-ad82-ced99ce4f41d"
              }
            ],
            "exits": [
              {
                "uuid": "bed47e2a-fbd2-45cf-8aa3-e33ccaac8ebd",
                "destination_uuid": "a1e05935-ed09-4fd1-91fe-cb7e7e8ec6fb"
              }
            ]
          },
          {
            "uuid": "ccdf3c0e-90d9-433a-995a-779ba1272241",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes we are up, sometimes we are down – it’s okay. Remember it’s the small things that make the difference and I am here for you!",
                "type": "send_msg",
                "quick_replies": [
                  "More tips",
                  "Activity to help you relax"
                ],
                "uuid": "2aad92c6-f576-4563-bd51-e99674d27f99"
              }
            ],
            "exits": [
              {
                "uuid": "10d095e4-33d2-4df5-a9b3-37bdd8486797",
                "destination_uuid": "a1e05935-ed09-4fd1-91fe-cb7e7e8ec6fb"
              }
            ]
          },
          {
            "uuid": "0034e81e-a819-4d64-9583-49ddcd2ddd2f",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry that things are difficult right now. Take a deep breath and know that you are valued. We are here to help!",
                "type": "send_msg",
                "quick_replies": [
                  "Activity to help you relax"
                ],
                "uuid": "44d94771-eada-4845-9bdd-c2eb8fd5aeb0"
              }
            ],
            "exits": [
              {
                "uuid": "1f33863b-28b7-44af-9a21-c94357843c53",
                "destination_uuid": "970cfccf-b325-495e-8773-8152afbc6532"
              }
            ]
          },
          {
            "uuid": "a1e05935-ed09-4fd1-91fe-cb7e7e8ec6fb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "02bcc170-c10b-4812-8502-cfabe692975f",
              "cases": [
                {
                  "arguments": [
                    "More tips"
                  ],
                  "category_uuid": "dbc7db08-28ad-4a0d-b7e9-8f49bd401c24",
                  "type": "has_only_phrase",
                  "uuid": "9587c9d2-0919-4dbe-a6d3-fc677d9a59ce"
                },
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "98f10fc6-a184-44a0-b90f-1d4a08640186",
                  "type": "has_only_phrase",
                  "uuid": "efa0699b-af1d-49b2-b75e-88180d0cbf1a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "051d3090-a484-4083-82b6-c096aae2ee53",
                  "name": "All Responses",
                  "uuid": "02bcc170-c10b-4812-8502-cfabe692975f"
                },
                {
                  "exit_uuid": "5bebbeeb-5abd-4527-8e3d-208eed390887",
                  "name": "More tips",
                  "uuid": "dbc7db08-28ad-4a0d-b7e9-8f49bd401c24"
                },
                {
                  "exit_uuid": "4ebc7947-f669-4ad9-93af-bdc344e1c4b2",
                  "name": "Activity to help you relax",
                  "uuid": "98f10fc6-a184-44a0-b90f-1d4a08640186"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "051d3090-a484-4083-82b6-c096aae2ee53",
                "destination_uuid": null
              },
              {
                "uuid": "5bebbeeb-5abd-4527-8e3d-208eed390887",
                "destination_uuid": "d0b12ccd-504a-4fb6-9bb9-2c879dee4561"
              },
              {
                "uuid": "4ebc7947-f669-4ad9-93af-bdc344e1c4b2",
                "destination_uuid": "84f98f43-b340-4ea4-bad3-6028857d4bf1"
              }
            ]
          },
          {
            "uuid": "d0b12ccd-504a-4fb6-9bb9-2c879dee4561",
            "actions": [
              {
                "uuid": "29b1dc28-6404-45e2-b92a-81e0016d17ef",
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
                "uuid": "a7003f8a-b10d-4882-9ea0-4fc6f023a9f0",
                "destination_uuid": "64b96806-1732-406c-a3dd-0b45b47a0739"
              }
            ]
          },
          {
            "uuid": "64b96806-1732-406c-a3dd-0b45b47a0739",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "559a8287-8376-4c6f-9dbe-a7f41693b96d"
                },
                "type": "enter_flow",
                "uuid": "6c14739b-0727-4c4a-a732-8fb9c2a234a8"
              }
            ],
            "exits": [
              {
                "uuid": "ddf442f2-69f5-4323-8741-f7abf72bcdaf",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "970cfccf-b325-495e-8773-8152afbc6532",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8a71e1ba-1ab6-4712-84e3-a14451ef04c4",
              "cases": [
                {
                  "arguments": [
                    "Activity to help you relax"
                  ],
                  "category_uuid": "cbbe5dca-f2e3-4e93-9363-7c9023152f1a",
                  "type": "has_only_phrase",
                  "uuid": "a5235a35-007b-49ba-be25-8e8a423617bb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3b227f09-22e8-4eeb-bc04-119e85841ccf",
                  "name": "All Responses",
                  "uuid": "8a71e1ba-1ab6-4712-84e3-a14451ef04c4"
                },
                {
                  "exit_uuid": "a44daa0f-ea46-49e7-b421-8b39372cee4f",
                  "name": "Activity to help you relax",
                  "uuid": "cbbe5dca-f2e3-4e93-9363-7c9023152f1a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3b227f09-22e8-4eeb-bc04-119e85841ccf",
                "destination_uuid": null
              },
              {
                "uuid": "a44daa0f-ea46-49e7-b421-8b39372cee4f",
                "destination_uuid": "84f98f43-b340-4ea4-bad3-6028857d4bf1"
              }
            ]
          },
          {
            "uuid": "84f98f43-b340-4ea4-bad3-6028857d4bf1",
            "actions": [
              {
                "uuid": "f4a7d968-c0cd-45a6-a1ad-ae3d3c786e44",
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
                "uuid": "3038e81f-bec1-413a-961a-f7d664c55e39",
                "destination_uuid": "46c0e89b-d0ae-4aff-865b-fbe824183383"
              }
            ]
          },
          {
            "uuid": "46c0e89b-d0ae-4aff-865b-fbe824183383",
            "actions": [
              {
                "flow": {
                  "name": "calm_6",
                  "uuid": "fb215aa3-d70a-4f57-95b3-28ffb4400608"
                },
                "type": "enter_flow",
                "uuid": "4f2a2c51-78d0-4e4a-9778-6f19d20519d2"
              }
            ],
            "exits": [
              {
                "uuid": "799412ce-54ff-4da4-9d27-01a0dd4b0b29",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "0e83ec53-77b9-4e0b-a80d-5bdade90ef73",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "98f99cd9-427d-4679-9772-9d405c78c19b",
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
                "uuid": "cf1cead5-69e7-42ed-afff-e701822cc84a"
              }
            ],
            "exits": [
              {
                "uuid": "3b24e13d-72f8-42b9-88b9-6dfab600eae5",
                "destination_uuid": "c35b9504-b2e1-4016-adf9-1268ae1105f9"
              }
            ]
          },
          {
            "uuid": "c35b9504-b2e1-4016-adf9-1268ae1105f9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2da66fd0-a1f3-46d2-82b7-f39528337bf4",
              "cases": [
                {
                  "arguments": [
                    "Chat together"
                  ],
                  "category_uuid": "fc38073e-6dab-4b88-ae1f-3b1ce1f2ec43",
                  "type": "has_only_phrase",
                  "uuid": "18b701d6-b30c-4dbd-951b-fe9cb65b66d3"
                },
                {
                  "arguments": [
                    "Get active"
                  ],
                  "category_uuid": "48990cc2-1004-498f-83e5-c6f337ebbce5",
                  "type": "has_only_phrase",
                  "uuid": "d1bffa30-5489-4a4a-bda4-8a92235da7f8"
                },
                {
                  "arguments": [
                    "Watch & sing"
                  ],
                  "category_uuid": "3237970b-e36b-4b7d-8af0-4a4ad27d3437",
                  "type": "has_only_phrase",
                  "uuid": "00e91c5d-b4bc-4bc8-a763-2068b2e1583b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1e7964d2-5136-4eb9-8caa-eea06dd11482",
                  "name": "All Responses",
                  "uuid": "2da66fd0-a1f3-46d2-82b7-f39528337bf4"
                },
                {
                  "exit_uuid": "58345433-7807-42ec-a254-b3974ad840a6",
                  "name": "Chat together",
                  "uuid": "fc38073e-6dab-4b88-ae1f-3b1ce1f2ec43"
                },
                {
                  "exit_uuid": "8cb2da18-7e56-4597-9adc-4db9fbc6ea9f",
                  "name": "Get active",
                  "uuid": "48990cc2-1004-498f-83e5-c6f337ebbce5"
                },
                {
                  "exit_uuid": "3d3aafb5-d897-4775-a253-12cbbe65cc24",
                  "name": "Watch & sing",
                  "uuid": "3237970b-e36b-4b7d-8af0-4a4ad27d3437"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1e7964d2-5136-4eb9-8caa-eea06dd11482",
                "destination_uuid": null
              },
              {
                "uuid": "58345433-7807-42ec-a254-b3974ad840a6",
                "destination_uuid": "182f7156-927f-42c3-89a7-0b6d64a6e3ff"
              },
              {
                "uuid": "8cb2da18-7e56-4597-9adc-4db9fbc6ea9f",
                "destination_uuid": "618a0fb8-ac41-481c-8ec0-6dc8a5fb849d"
              },
              {
                "uuid": "3d3aafb5-d897-4775-a253-12cbbe65cc24",
                "destination_uuid": "a1c5733a-9b3a-4a55-9b07-22141685f83f"
              }
            ]
          },
          {
            "uuid": "182f7156-927f-42c3-89a7-0b6d64a6e3ff",
            "actions": [
              {
                "attachments": [],
                "text": "Dream Travel \n- You can’t always travel but you can always dream! Ask your teen these questions.\n- Where do you want to travel? How long will you be away? What will you pack? What will you do? What will you see? \n- Look at a map together if you have one. \n- Choose a country that they’ve never heard of and find out about it.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4a49fbf8-79ba-444b-b3c5-331442c62da5"
              }
            ],
            "exits": [
              {
                "uuid": "abdd822b-a767-4027-9b1d-1b491698899a",
                "destination_uuid": "258c8f4d-49e8-4184-a341-159bbf418f47"
              }
            ]
          },
          {
            "uuid": "618a0fb8-ac41-481c-8ec0-6dc8a5fb849d",
            "actions": [
              {
                "attachments": [],
                "text": "Dance moves \n- Create a set of dance moves to your teen's favourite songs.\n- First person does a dance move and everyone else copies.\n- Everyone takes turns being the leader.\n- Perform it for the household!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5cdb0313-f492-471f-aecf-fbfb1c1b94bc"
              }
            ],
            "exits": [
              {
                "uuid": "07521019-7cfc-44ac-92be-43206cf2b486",
                "destination_uuid": "258c8f4d-49e8-4184-a341-159bbf418f47"
              }
            ]
          },
          {
            "uuid": "a1c5733a-9b3a-4a55-9b07-22141685f83f",
            "actions": [
              {
                "attachments": [],
                "text": "Song...",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9fd08607-d190-442f-a5fe-b275eb0260ee"
              }
            ],
            "exits": [
              {
                "uuid": "53c2e19d-5e3a-43be-8d7a-d54a8c9b0f16",
                "destination_uuid": "258c8f4d-49e8-4184-a341-159bbf418f47"
              }
            ]
          },
          {
            "uuid": "258c8f4d-49e8-4184-a341-159bbf418f47",
            "actions": [
              {
                "uuid": "697adf9f-6a69-4436-836a-8a2f70538e4f",
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
                "uuid": "331e70b1-e93c-4478-8215-41ac8265aef8",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ccbc7bcb-7ef7-45e7-9b12-58bf02061148",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "862a8d6b-8059-4ec9-9cf3-3a2244ce7698",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "94689c88-69bd-4989-83bb-90cdc82e791a"
              }
            ],
            "exits": [
              {
                "uuid": "c00c9056-76de-4cfc-ad86-b9e95edba18e",
                "destination_uuid": "aa2d15a8-4ac0-4914-95be-bd40b25dc4b5"
              }
            ]
          },
          {
            "uuid": "aa2d15a8-4ac0-4914-95be-bd40b25dc4b5",
            "actions": [
              {
                "uuid": "7d35df90-61f3-41f1-afc0-46c479b55422",
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
                "uuid": "7c2342b0-e35e-4e73-beb0-e6817c878b9f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "72ad1007-c0c0-4abe-ab43-5bc18ceafb5c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5e057786-5e46-4f6c-a752-e6b994902869",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a45442b0-f748-4bcd-8e54-cc30c3b1efe0"
              }
            ],
            "exits": [
              {
                "uuid": "3724e59c-3828-4d5d-8c33-6fe34d057243",
                "destination_uuid": "a0dc9dde-8485-4e0c-b455-7ae0aecaba61"
              }
            ]
          },
          {
            "uuid": "a0dc9dde-8485-4e0c-b455-7ae0aecaba61",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "55c771c4-2ff7-4b53-b5ac-25ba984d0485"
              }
            ],
            "exits": [
              {
                "uuid": "56ae7bb2-017e-46a6-b8b5-db991d5516c3",
                "destination_uuid": "ed43c892-6b6a-4a1a-a60b-7f25d5f805d2"
              }
            ]
          },
          {
            "uuid": "ed43c892-6b6a-4a1a-a60b-7f25d5f805d2",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e85f8921-e94e-4a34-8370-c2b20259c8c5"
              }
            ],
            "exits": [
              {
                "uuid": "3660366b-e9b9-40de-9fd0-3367c41d2178",
                "destination_uuid": "826a26ee-c851-4a19-a85e-9e0fd22f50d6"
              }
            ]
          },
          {
            "uuid": "826a26ee-c851-4a19-a85e-9e0fd22f50d6",
            "actions": [
              {
                "uuid": "b07c445e-3c92-4944-8b0d-76afd86a5bb7",
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
                "uuid": "7e80a675-9a00-44f9-b605-4c579f40edee",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f7ca1f48-3b9c-4836-ba34-713cee943eb0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "65e83309-b48e-4a43-827d-4b9e22040e08",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5485516c-8787-4cc4-92f0-ba92e421e96f"
              }
            ],
            "exits": [
              {
                "uuid": "ae3a00cd-6f59-4011-846a-7af3db52b368",
                "destination_uuid": "766fd847-f9c4-49d3-93db-811637c8cce5"
              }
            ]
          },
          {
            "uuid": "766fd847-f9c4-49d3-93db-811637c8cce5",
            "actions": [
              {
                "uuid": "6f0f57f2-4dd2-4dc3-8b65-51a08dbeaeac",
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
                "uuid": "9572d355-f683-4d12-9549-c8bb56cd17cb",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4219484c-57be-474d-9f0b-c9f3b644c10f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "32d3ec69-283d-49a2-adfd-e7c9e0f2b1b7",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8e8f9fbe-b42b-4cc7-b867-b3e103205442"
              }
            ],
            "exits": [
              {
                "uuid": "e6fc56b2-f327-46a0-85cd-cd00278f2d3e",
                "destination_uuid": "c696fd38-4376-46a6-926b-3ce3598efc9f"
              }
            ]
          },
          {
            "uuid": "c696fd38-4376-46a6-926b-3ce3598efc9f",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ce6d77e9-8b7a-4d21-a873-3c6a24df7852"
              }
            ],
            "exits": [
              {
                "uuid": "aca58bd6-4127-4ff5-ac66-31c06c9c291b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "69ac91a1-f576-4091-8de1-e667a703d89a",
            "actions": [
              {
                "uuid": "b7a24cde-af26-4f25-9178-5f1ab74db5f9",
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
                "uuid": "0fc10b91-9903-496c-88e2-c48fb11c6fa1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5a22b096-aa1c-4c2e-a8c6-37c52c61f369",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "714b2c83-e2b3-4ef1-bbcc-2cf16cf6331a",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "150e821a-d3a8-4370-9abc-efb389af4c21"
              }
            ],
            "exits": [
              {
                "uuid": "26b7ebff-b4dc-47ac-b7d3-d46d47e0778e",
                "destination_uuid": "8ce90a8a-f8bc-4bbd-be19-f195ab0d5150"
              }
            ]
          },
          {
            "uuid": "8ce90a8a-f8bc-4bbd-be19-f195ab0d5150",
            "actions": [
              {
                "uuid": "58575b20-47c6-451d-b60e-2d9d06abd036",
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
                "uuid": "92a88800-4bbb-43f4-81d9-c2e7f3fbdbb4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "924a7a91-4e75-4c51-b337-3fab2551cfd6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e9f81948-6ee1-4893-8445-c4f82064c721",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "1274eb7e-a5ed-40eb-834b-a5ce3a4c3ec1"
                },
                "type": "enter_flow",
                "uuid": "b38f038d-218a-40ed-a7e1-48dee7fe6ae4"
              }
            ],
            "exits": [
              {
                "uuid": "c87f3026-bcd5-4cea-9e0d-7cb132c2da6d",
                "destination_uuid": "ab3c350d-b90b-4670-bceb-f96c8982effb"
              },
              {
                "uuid": "f3ef50ea-f68e-486b-803c-74b8bbe00a38",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e9d2475d-ba64-4d0f-ae83-968dadbcb5ed",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "95ee0b36-3f64-4e10-b586-1d0bdfb3d870"
                },
                {
                  "uuid": "6809f234-2fbe-4f75-b995-5f720c2e765b",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e0f3acd4-6779-436e-8329-d43ea3742aec"
                }
              ],
              "categories": [
                {
                  "uuid": "95ee0b36-3f64-4e10-b586-1d0bdfb3d870",
                  "name": "Complete",
                  "exit_uuid": "c87f3026-bcd5-4cea-9e0d-7cb132c2da6d"
                },
                {
                  "uuid": "e0f3acd4-6779-436e-8329-d43ea3742aec",
                  "name": "Expired",
                  "exit_uuid": "f3ef50ea-f68e-486b-803c-74b8bbe00a38"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "95ee0b36-3f64-4e10-b586-1d0bdfb3d870"
            }
          },
          {
            "uuid": "ab3c350d-b90b-4670-bceb-f96c8982effb",
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
                "uuid": "be67e3c4-81c8-4e83-913c-4c98bfa5e29a"
              }
            ],
            "exits": [
              {
                "uuid": "4ddefc97-3939-48cd-bb3d-9d0707930cb2",
                "destination_uuid": "ef29aa43-2ca8-4d8a-b5d7-15d3da12cdad"
              }
            ]
          },
          {
            "uuid": "ef29aa43-2ca8-4d8a-b5d7-15d3da12cdad",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d4e41280-4ccc-425f-bb08-35f136d21232",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "36a1a2c2-419d-4eea-a80b-932c8d737d17",
                  "type": "has_only_phrase",
                  "uuid": "7a2ffec2-78d3-4577-b333-24ab434d3004"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "90bdf7a5-6a36-4c9d-af84-f0b46c4ed763",
                  "type": "has_only_phrase",
                  "uuid": "f0c5782b-7589-4f32-b1e4-f19c73816e83"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "6cf77888-8f30-47b3-b7f0-9f2bcc41d876",
                  "type": "has_only_phrase",
                  "uuid": "0f167023-6715-44bc-b1af-98049a233f0a"
                },
                {
                  "arguments": [
                    "first app opening"
                  ],
                  "category_uuid": "ba3abbd1-846e-49d8-ace7-ff55fd1a128d",
                  "type": "has_only_phrase",
                  "uuid": "a3e3c139-ef7a-4c2d-9cfa-052887fddb71"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "682cacce-96aa-4719-998a-151de9e51dbc",
                  "name": "All Responses",
                  "uuid": "d4e41280-4ccc-425f-bb08-35f136d21232"
                },
                {
                  "exit_uuid": "464482d9-578e-43f5-a702-a2b00a1c2424",
                  "name": "welcome",
                  "uuid": "36a1a2c2-419d-4eea-a80b-932c8d737d17"
                },
                {
                  "exit_uuid": "2e81db17-46b4-4679-bfb3-89febddc5fba",
                  "name": "1on1",
                  "uuid": "90bdf7a5-6a36-4c9d-af84-f0b46c4ed763"
                },
                {
                  "exit_uuid": "05da315d-417f-4125-87c2-23e0f2a674d4",
                  "name": "praise",
                  "uuid": "6cf77888-8f30-47b3-b7f0-9f2bcc41d876"
                },
                {
                  "exit_uuid": "c407f82b-4e7f-4a40-be2a-566d7abd948d",
                  "name": "first app opening",
                  "uuid": "ba3abbd1-846e-49d8-ace7-ff55fd1a128d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "682cacce-96aa-4719-998a-151de9e51dbc",
                "destination_uuid": null
              },
              {
                "uuid": "464482d9-578e-43f5-a702-a2b00a1c2424",
                "destination_uuid": "52d52c83-a5cf-483d-9ffd-940e5d2ee416"
              },
              {
                "uuid": "2e81db17-46b4-4679-bfb3-89febddc5fba",
                "destination_uuid": "e94932c0-9461-48a3-a36d-b3459beb5f11"
              },
              {
                "uuid": "05da315d-417f-4125-87c2-23e0f2a674d4",
                "destination_uuid": "690855b2-7344-417b-a576-1699922eb6bf"
              },
              {
                "uuid": "c407f82b-4e7f-4a40-be2a-566d7abd948d",
                "destination_uuid": "f44da0a1-03c9-497e-9dde-b58133568e9c"
              }
            ]
          },
          {
            "uuid": "52d52c83-a5cf-483d-9ffd-940e5d2ee416",
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
                "uuid": "777f3036-71cd-4bc7-8233-56d898ef9028"
              }
            ],
            "exits": [
              {
                "uuid": "ba8e0508-e4fe-4da3-a536-e6a68c277e0f",
                "destination_uuid": "4bae34bb-be69-415b-b619-2841f1648494"
              }
            ]
          },
          {
            "uuid": "4bae34bb-be69-415b-b619-2841f1648494",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0bec0310-e58d-46ea-91a8-f0c1472fedee",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "21b32372-ecba-4f68-92e9-61e14123f4d6",
                  "type": "has_only_phrase",
                  "uuid": "b64f8083-14cb-474c-8076-d5a099204d3f"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "8f92ad7b-d0f6-403e-ad1d-d7ee98fd10f8",
                  "type": "has_only_phrase",
                  "uuid": "cf444cd2-7a0f-4990-a234-2f6f51f40d16"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "66513b02-fed4-49e5-9952-4bc613ab960a",
                  "type": "has_only_phrase",
                  "uuid": "a7fa9e4f-831c-40fd-87ff-5854b170c010"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "bec5b2c2-0f78-4414-a84e-ea59a5255116",
                  "type": "has_only_phrase",
                  "uuid": "c02dbd97-b81f-44e4-86b6-6db1d5aabebd"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c607c768-9a40-40b2-9b8b-bd41316a7f0c",
                  "name": "All Responses",
                  "uuid": "0bec0310-e58d-46ea-91a8-f0c1472fedee"
                },
                {
                  "exit_uuid": "14ec82fc-b62e-4bf3-b546-f89fd92d996f",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "21b32372-ecba-4f68-92e9-61e14123f4d6"
                },
                {
                  "exit_uuid": "55a31404-6ac6-4a13-8fd3-bef3ba9ba65f",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "8f92ad7b-d0f6-403e-ad1d-d7ee98fd10f8"
                },
                {
                  "exit_uuid": "76a14883-0a8a-4fa8-9643-8fce20bfae63",
                  "name": "mod_welcome_survey",
                  "uuid": "66513b02-fed4-49e5-9952-4bc613ab960a"
                },
                {
                  "exit_uuid": "3d3b4467-9db0-4394-a851-bf83503106de",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "bec5b2c2-0f78-4414-a84e-ea59a5255116"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c607c768-9a40-40b2-9b8b-bd41316a7f0c",
                "destination_uuid": null
              },
              {
                "uuid": "14ec82fc-b62e-4bf3-b546-f89fd92d996f",
                "destination_uuid": "fa4e28e7-ae28-4d1a-9e5e-3561f30ebd57"
              },
              {
                "uuid": "55a31404-6ac6-4a13-8fd3-bef3ba9ba65f",
                "destination_uuid": "d1f465f0-1014-4851-ab2e-289e62aed986"
              },
              {
                "uuid": "76a14883-0a8a-4fa8-9643-8fce20bfae63",
                "destination_uuid": "e2e03aa5-0c1f-4da2-8467-024d8e13cb15"
              },
              {
                "uuid": "3d3b4467-9db0-4394-a851-bf83503106de",
                "destination_uuid": "8b91af9a-c87b-4afa-a8cd-ea54983a1d55"
              }
            ]
          },
          {
            "uuid": "fa4e28e7-ae28-4d1a-9e5e-3561f30ebd57",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "b91a27f3-b1b6-4f31-aeb7-bce9f88685a7"
                },
                "type": "enter_flow",
                "uuid": "c2e72033-d976-4e69-9fd1-c8df469d98a9"
              }
            ],
            "exits": [
              {
                "uuid": "65d00887-b98c-4471-b3df-ab7ff46145b6",
                "destination_uuid": null
              },
              {
                "uuid": "d1de20ae-11e4-4516-a50b-b91c948d8d87",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "a028d8c7-a6f5-4f89-8926-4ee548f73685",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "54a852c6-44f7-43f5-84f4-34f7f0451f1f"
                },
                {
                  "uuid": "72ea36b0-e013-4668-bb39-2ee133e1aaf0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "40ffd87e-7096-4610-a380-b39acfa81250"
                }
              ],
              "categories": [
                {
                  "uuid": "54a852c6-44f7-43f5-84f4-34f7f0451f1f",
                  "name": "Complete",
                  "exit_uuid": "65d00887-b98c-4471-b3df-ab7ff46145b6"
                },
                {
                  "uuid": "40ffd87e-7096-4610-a380-b39acfa81250",
                  "name": "Expired",
                  "exit_uuid": "d1de20ae-11e4-4516-a50b-b91c948d8d87"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "54a852c6-44f7-43f5-84f4-34f7f0451f1f"
            }
          },
          {
            "uuid": "d1f465f0-1014-4851-ab2e-289e62aed986",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "923393b6-2aa7-4999-a13e-72429f49e53e"
                },
                "type": "enter_flow",
                "uuid": "7fd36344-b2ca-4a23-b1a5-60cf855138f5"
              }
            ],
            "exits": [
              {
                "uuid": "490de40f-2156-4199-b4b1-15420124c07e",
                "destination_uuid": null
              },
              {
                "uuid": "ed7b2eb8-578c-40dd-adae-04cebed36b6f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b245c3d1-dd32-4976-a660-bd150f4e77c5",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "097e6848-6c0d-4fc5-a785-210e11cda4e0"
                },
                {
                  "uuid": "bd1dfc93-ef99-47a0-b5a0-576b375c5064",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2f183bd5-ee5a-44df-b062-c00c8a41ff25"
                }
              ],
              "categories": [
                {
                  "uuid": "097e6848-6c0d-4fc5-a785-210e11cda4e0",
                  "name": "Complete",
                  "exit_uuid": "490de40f-2156-4199-b4b1-15420124c07e"
                },
                {
                  "uuid": "2f183bd5-ee5a-44df-b062-c00c8a41ff25",
                  "name": "Expired",
                  "exit_uuid": "ed7b2eb8-578c-40dd-adae-04cebed36b6f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "097e6848-6c0d-4fc5-a785-210e11cda4e0"
            }
          },
          {
            "uuid": "e2e03aa5-0c1f-4da2-8467-024d8e13cb15",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "16a1269b-0e39-4a0b-8061-b1baa62b690e"
                },
                "type": "enter_flow",
                "uuid": "326695a6-02a9-47d0-adc9-857e1cf84ff8"
              }
            ],
            "exits": [
              {
                "uuid": "08b311bd-b75e-457d-a6c4-d74e9231ff96",
                "destination_uuid": null
              },
              {
                "uuid": "b9bf4c3e-219d-4644-8539-e8572e1a1f3c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "09b1739c-67ef-4654-84fd-64baa317aba4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "78a1fe96-abfa-43df-883e-1b1a240946ba"
                },
                {
                  "uuid": "9657b032-928e-48b0-bf58-363e82683931",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f3c04a47-5cf7-44ca-90b2-54408186ca8c"
                }
              ],
              "categories": [
                {
                  "uuid": "78a1fe96-abfa-43df-883e-1b1a240946ba",
                  "name": "Complete",
                  "exit_uuid": "08b311bd-b75e-457d-a6c4-d74e9231ff96"
                },
                {
                  "uuid": "f3c04a47-5cf7-44ca-90b2-54408186ca8c",
                  "name": "Expired",
                  "exit_uuid": "b9bf4c3e-219d-4644-8539-e8572e1a1f3c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "78a1fe96-abfa-43df-883e-1b1a240946ba"
            }
          },
          {
            "uuid": "8b91af9a-c87b-4afa-a8cd-ea54983a1d55",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "ac296df4-ec30-45cf-9e1a-02f0fff15535"
                },
                "type": "enter_flow",
                "uuid": "e5d83997-dcd3-4505-a9ca-3e9e5e694f50"
              }
            ],
            "exits": [
              {
                "uuid": "e49e2bbd-e0af-41e0-b957-2d68d730bf8c",
                "destination_uuid": null
              },
              {
                "uuid": "957c6095-b544-4dcd-b424-b9663af939a6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b44dac88-401b-4e20-b667-9305efafcd40",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "84cf3594-24e2-4702-8351-a1881fa7248b"
                },
                {
                  "uuid": "cd76ba06-8a3d-472f-8c3c-982cb19eeb8e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "fe2aa765-3bf8-49d6-bdf7-a86f28c684ed"
                }
              ],
              "categories": [
                {
                  "uuid": "84cf3594-24e2-4702-8351-a1881fa7248b",
                  "name": "Complete",
                  "exit_uuid": "e49e2bbd-e0af-41e0-b957-2d68d730bf8c"
                },
                {
                  "uuid": "fe2aa765-3bf8-49d6-bdf7-a86f28c684ed",
                  "name": "Expired",
                  "exit_uuid": "957c6095-b544-4dcd-b424-b9663af939a6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "84cf3594-24e2-4702-8351-a1881fa7248b"
            }
          },
          {
            "uuid": "e94932c0-9461-48a3-a36d-b3459beb5f11",
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
                "uuid": "803ee8ab-a172-47c9-b242-8d0f275ea676"
              }
            ],
            "exits": [
              {
                "uuid": "989f10fc-ae8a-41cf-b9c5-29be871a00f7",
                "destination_uuid": "3d94e878-d3de-4003-9006-a6b5274f8d3f"
              }
            ]
          },
          {
            "uuid": "3d94e878-d3de-4003-9006-a6b5274f8d3f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b3eacc4b-3956-4d42-ba35-b7a3d404f8c9",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "b197750f-f804-4d5a-828a-e92cb5de9f4a",
                  "type": "has_only_phrase",
                  "uuid": "a89ce30e-0928-48e3-b906-66a917835626"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "7b5c2c45-ee7f-4dd5-8b5c-bbe70e855450",
                  "type": "has_only_phrase",
                  "uuid": "29c69dd8-8354-4368-bb7f-410bff325632"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "7b42f6fd-e282-4944-9ee3-c471d504d1af",
                  "type": "has_only_phrase",
                  "uuid": "94e3a901-1219-4aab-a779-ccc8524fb93e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4fa0c9ad-d83f-4ff1-9970-b4b4ed876f69",
                  "name": "All Responses",
                  "uuid": "b3eacc4b-3956-4d42-ba35-b7a3d404f8c9"
                },
                {
                  "exit_uuid": "2a57890b-50a9-44f3-a136-c23a73e2ff25",
                  "name": "mod_1on1_emo",
                  "uuid": "b197750f-f804-4d5a-828a-e92cb5de9f4a"
                },
                {
                  "exit_uuid": "f92f0bd0-170c-4a9f-ac3b-55eabd261313",
                  "name": "mod_1on1_activity",
                  "uuid": "7b5c2c45-ee7f-4dd5-8b5c-bbe70e855450"
                },
                {
                  "exit_uuid": "aaa71922-604d-41b7-a458-44dfa3ff8351",
                  "name": "mod_1on1_activity_review",
                  "uuid": "7b42f6fd-e282-4944-9ee3-c471d504d1af"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4fa0c9ad-d83f-4ff1-9970-b4b4ed876f69",
                "destination_uuid": null
              },
              {
                "uuid": "2a57890b-50a9-44f3-a136-c23a73e2ff25",
                "destination_uuid": "a286a024-5ff5-4414-b3c1-fd062e6a286f"
              },
              {
                "uuid": "f92f0bd0-170c-4a9f-ac3b-55eabd261313",
                "destination_uuid": "44abeed9-bdf2-4a82-9687-ffd3160fbb63"
              },
              {
                "uuid": "aaa71922-604d-41b7-a458-44dfa3ff8351",
                "destination_uuid": "6d1ebb53-c47a-4948-bc0c-4ac41912a4b3"
              }
            ]
          },
          {
            "uuid": "a286a024-5ff5-4414-b3c1-fd062e6a286f",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "bf14692c-8993-4b09-a027-92eccd29c003"
                },
                "type": "enter_flow",
                "uuid": "2ba17d53-12e4-41ea-832e-4f123b600912"
              }
            ],
            "exits": [
              {
                "uuid": "c2c8737a-7a09-41a6-9395-0975c5628c37",
                "destination_uuid": null
              },
              {
                "uuid": "bdd4fb99-6db0-489b-ae4d-eb52846631ec",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ed454a5c-f15f-407e-b3d6-caf995f864b2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "5188929d-01d9-4dd9-8600-1bc394371ba5"
                },
                {
                  "uuid": "31bc9314-f34e-4550-bac6-a6962c426c3e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "95abe3e1-13bf-43c4-aad5-69a66f5b9c74"
                }
              ],
              "categories": [
                {
                  "uuid": "5188929d-01d9-4dd9-8600-1bc394371ba5",
                  "name": "Complete",
                  "exit_uuid": "c2c8737a-7a09-41a6-9395-0975c5628c37"
                },
                {
                  "uuid": "95abe3e1-13bf-43c4-aad5-69a66f5b9c74",
                  "name": "Expired",
                  "exit_uuid": "bdd4fb99-6db0-489b-ae4d-eb52846631ec"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "5188929d-01d9-4dd9-8600-1bc394371ba5"
            }
          },
          {
            "uuid": "44abeed9-bdf2-4a82-9687-ffd3160fbb63",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "f5892b10-ee90-4cd3-9f04-59d6e1946c43"
                },
                "type": "enter_flow",
                "uuid": "831a52dd-80be-44c3-994d-2359377066a2"
              }
            ],
            "exits": [
              {
                "uuid": "63118735-482c-4c87-b038-2ad3147218b9",
                "destination_uuid": null
              },
              {
                "uuid": "53ea27a7-0999-45e4-8358-2b94cf4c2fcf",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "3fd71f45-b8d8-4acd-be0b-31573d71cb6c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "73e87125-7cde-4479-af24-ab721cbfb798"
                },
                {
                  "uuid": "305f8736-b966-4c11-9b51-dbb98e684dd3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c7eff928-2eec-43e4-8024-11c2d8c5a895"
                }
              ],
              "categories": [
                {
                  "uuid": "73e87125-7cde-4479-af24-ab721cbfb798",
                  "name": "Complete",
                  "exit_uuid": "63118735-482c-4c87-b038-2ad3147218b9"
                },
                {
                  "uuid": "c7eff928-2eec-43e4-8024-11c2d8c5a895",
                  "name": "Expired",
                  "exit_uuid": "53ea27a7-0999-45e4-8358-2b94cf4c2fcf"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "73e87125-7cde-4479-af24-ab721cbfb798"
            }
          },
          {
            "uuid": "6d1ebb53-c47a-4948-bc0c-4ac41912a4b3",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "9cbc2cc2-8c4d-41fc-ac65-affaf8c41afa"
                },
                "type": "enter_flow",
                "uuid": "033fd130-6212-4dec-8f81-0c5ea460af5e"
              }
            ],
            "exits": [
              {
                "uuid": "01d98b45-c7f5-4b20-8774-7ad9d4eb25df",
                "destination_uuid": null
              },
              {
                "uuid": "ff848849-d5b8-4eaf-b169-d3975d3037a3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8f0f759e-f58d-4a24-bd82-647bd4ec5ba9",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0ba4e610-ac48-4d49-9070-f600d21a3350"
                },
                {
                  "uuid": "754a855a-ec33-4be3-b49d-d10f8e9e57b7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "aca2e240-d756-4682-aad8-066c4c6918ef"
                }
              ],
              "categories": [
                {
                  "uuid": "0ba4e610-ac48-4d49-9070-f600d21a3350",
                  "name": "Complete",
                  "exit_uuid": "01d98b45-c7f5-4b20-8774-7ad9d4eb25df"
                },
                {
                  "uuid": "aca2e240-d756-4682-aad8-066c4c6918ef",
                  "name": "Expired",
                  "exit_uuid": "ff848849-d5b8-4eaf-b169-d3975d3037a3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0ba4e610-ac48-4d49-9070-f600d21a3350"
            }
          },
          {
            "uuid": "690855b2-7344-417b-a576-1699922eb6bf",
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
                "uuid": "e53c340c-41c4-4533-9c44-5ff61b393416"
              }
            ],
            "exits": [
              {
                "uuid": "cd517392-cfe0-4e22-89c8-1af94d56030b",
                "destination_uuid": "2050ff6f-7f13-4ce5-b63d-c31a8c807611"
              }
            ]
          },
          {
            "uuid": "2050ff6f-7f13-4ce5-b63d-c31a8c807611",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4dcc69a3-5582-4942-b85d-3f3a38f2077b",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "e8a5d3ab-c242-4c1d-bd23-b2865a6afe6c",
                  "type": "has_only_phrase",
                  "uuid": "e1616b7b-346b-4dbd-9cf9-12b64d168377"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "0f0c9285-c710-4186-a707-8e3c66acec98",
                  "type": "has_only_phrase",
                  "uuid": "53b93c86-62a0-4890-8c15-8a3c1f8acd43"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "c47ad07b-4a92-467d-ac81-22189e767fb5",
                  "type": "has_only_phrase",
                  "uuid": "4b0f4c45-3e4f-41b3-b031-8f7edd4116ef"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "45fa41fd-ecc8-46b6-b27c-8368694247d0",
                  "name": "All Responses",
                  "uuid": "4dcc69a3-5582-4942-b85d-3f3a38f2077b"
                },
                {
                  "exit_uuid": "f67179ec-177e-4cd1-9e20-f48046f12a11",
                  "name": "mod_praise_intro",
                  "uuid": "e8a5d3ab-c242-4c1d-bd23-b2865a6afe6c"
                },
                {
                  "exit_uuid": "a8463f0b-2916-4d47-8bad-b2dd66c445d6",
                  "name": "mod_praise_activity",
                  "uuid": "0f0c9285-c710-4186-a707-8e3c66acec98"
                },
                {
                  "exit_uuid": "b9d1f1fb-4668-49ac-9588-cf9723267489",
                  "name": "mod_praise_activity_review",
                  "uuid": "c47ad07b-4a92-467d-ac81-22189e767fb5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "45fa41fd-ecc8-46b6-b27c-8368694247d0",
                "destination_uuid": null
              },
              {
                "uuid": "f67179ec-177e-4cd1-9e20-f48046f12a11",
                "destination_uuid": "cb193667-e8ce-45e1-af9c-90a37a56f493"
              },
              {
                "uuid": "a8463f0b-2916-4d47-8bad-b2dd66c445d6",
                "destination_uuid": "542379f4-29db-4f31-9024-026b5211a892"
              },
              {
                "uuid": "b9d1f1fb-4668-49ac-9588-cf9723267489",
                "destination_uuid": "4654ffdf-23ae-4398-a4ab-4e5bf11e6f7f"
              }
            ]
          },
          {
            "uuid": "cb193667-e8ce-45e1-af9c-90a37a56f493",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "de1f8257-d326-4c16-9592-54a14a5b3bd2"
                },
                "type": "enter_flow",
                "uuid": "d1f0ac3a-0e9e-4394-a51d-aee4089cba80"
              }
            ],
            "exits": [
              {
                "uuid": "8ed9e53e-3fd3-4884-82f3-483af7172bc2",
                "destination_uuid": null
              },
              {
                "uuid": "b66391b7-a96d-4d9e-b19c-da4d63cae543",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8e1ed769-7490-4822-bc4c-1963a68851ad",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7a679dea-ebf4-4b3b-b603-4fa522b39aa3"
                },
                {
                  "uuid": "c32acbff-5796-4914-a2b8-6bc2dcabf6f2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "290d71d7-2689-41ef-86f0-5cc35e9613e8"
                }
              ],
              "categories": [
                {
                  "uuid": "7a679dea-ebf4-4b3b-b603-4fa522b39aa3",
                  "name": "Complete",
                  "exit_uuid": "8ed9e53e-3fd3-4884-82f3-483af7172bc2"
                },
                {
                  "uuid": "290d71d7-2689-41ef-86f0-5cc35e9613e8",
                  "name": "Expired",
                  "exit_uuid": "b66391b7-a96d-4d9e-b19c-da4d63cae543"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7a679dea-ebf4-4b3b-b603-4fa522b39aa3"
            }
          },
          {
            "uuid": "542379f4-29db-4f31-9024-026b5211a892",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "8a0f9d44-ad17-4d6a-b7da-b7d661506103"
                },
                "type": "enter_flow",
                "uuid": "ed41968e-f45a-4256-ab43-5f7c890de72d"
              }
            ],
            "exits": [
              {
                "uuid": "bfef0b0c-7576-4dc3-874d-e6424b68853d",
                "destination_uuid": null
              },
              {
                "uuid": "8c52b947-4ca8-43a0-95f6-df7c54aa72ec",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "22bb3a7f-a81c-4ecb-a137-e00890559ac9",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "aa6f1b21-7d36-452f-b109-7725baae8e68"
                },
                {
                  "uuid": "5ee47924-394e-4953-a64c-91855fb158bd",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "eb66a1bc-aed5-46c6-ac34-e0f768f9ab82"
                }
              ],
              "categories": [
                {
                  "uuid": "aa6f1b21-7d36-452f-b109-7725baae8e68",
                  "name": "Complete",
                  "exit_uuid": "bfef0b0c-7576-4dc3-874d-e6424b68853d"
                },
                {
                  "uuid": "eb66a1bc-aed5-46c6-ac34-e0f768f9ab82",
                  "name": "Expired",
                  "exit_uuid": "8c52b947-4ca8-43a0-95f6-df7c54aa72ec"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "aa6f1b21-7d36-452f-b109-7725baae8e68"
            }
          },
          {
            "uuid": "4654ffdf-23ae-4398-a4ab-4e5bf11e6f7f",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "aad3cc1a-cf9d-4801-a439-f5c3bfb26834"
                },
                "type": "enter_flow",
                "uuid": "19cf6242-0411-424b-b596-05497c65b56f"
              }
            ],
            "exits": [
              {
                "uuid": "a53ad8d1-ab73-4a7d-9933-8531ed71bb7a",
                "destination_uuid": null
              },
              {
                "uuid": "b1a85fc7-379e-4f7b-9cf9-8947dbc3f7e4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "361e3a93-4a93-4c46-9439-9b72c9f76270",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "66b94e02-d208-43cd-88b1-729ac065037f"
                },
                {
                  "uuid": "d66acf31-2e5d-411c-8c89-b7b16a73a1fe",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a598b7e2-b99d-48b4-a865-1ea7fb480dac"
                }
              ],
              "categories": [
                {
                  "uuid": "66b94e02-d208-43cd-88b1-729ac065037f",
                  "name": "Complete",
                  "exit_uuid": "a53ad8d1-ab73-4a7d-9933-8531ed71bb7a"
                },
                {
                  "uuid": "a598b7e2-b99d-48b4-a865-1ea7fb480dac",
                  "name": "Expired",
                  "exit_uuid": "b1a85fc7-379e-4f7b-9cf9-8947dbc3f7e4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "66b94e02-d208-43cd-88b1-729ac065037f"
            }
          },
          {
            "uuid": "f44da0a1-03c9-497e-9dde-b58133568e9c",
            "actions": [
              {
                "flow": {
                  "name": "first_app_opening",
                  "uuid": "4c373a7a-8256-4ee9-a12e-e7a6ed376331"
                },
                "type": "enter_flow",
                "uuid": "469b6c86-1bb6-4da7-8d7b-d244cd6458a9"
              }
            ],
            "exits": [
              {
                "uuid": "ba6bea41-45f8-442a-a4a0-fa2266d8f0a2",
                "destination_uuid": null
              },
              {
                "uuid": "6e216172-46be-4219-825c-0ecadd2915e5",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "79b362bc-7126-4403-a600-51271bb33e8e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ef21f1dd-f120-4708-bb2d-116fb6df7854"
                },
                {
                  "uuid": "1b3eda6e-5f72-4a09-8fa4-0421d1e4f6d9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b48d1e47-67a5-4874-b43e-e128f6bf6db0"
                }
              ],
              "categories": [
                {
                  "uuid": "ef21f1dd-f120-4708-bb2d-116fb6df7854",
                  "name": "Complete",
                  "exit_uuid": "ba6bea41-45f8-442a-a4a0-fa2266d8f0a2"
                },
                {
                  "uuid": "b48d1e47-67a5-4874-b43e-e128f6bf6db0",
                  "name": "Expired",
                  "exit_uuid": "6e216172-46be-4219-825c-0ecadd2915e5"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ef21f1dd-f120-4708-bb2d-116fb6df7854"
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
        "uuid": "dd268664-7e86-4a2b-b2ec-e49fc6d95fc3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3a1104d1-a041-402e-8add-3aa81aa83d1a",
            "actions": [
              {
                "uuid": "c9b2a4b3-e280-4f5c-815f-2494a59577e8",
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
                "uuid": "15d37d84-e09b-47ce-a15a-a157810e0f6f",
                "destination_uuid": "9a64d0e8-370f-41a5-9bdb-91167b8da725"
              }
            ]
          },
          {
            "uuid": "9a64d0e8-370f-41a5-9bdb-91167b8da725",
            "actions": [
              {
                "uuid": "2e9d50c3-86ff-45b9-8950-b57bf14814b8",
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
                "uuid": "1d6a3a3e-1c36-4c4d-acdd-5a4095c46ab6",
                "destination_uuid": "24fa80ab-e601-4206-b63e-309fb73ba68e"
              }
            ]
          },
          {
            "uuid": "24fa80ab-e601-4206-b63e-309fb73ba68e",
            "actions": [
              {
                "uuid": "468b6f51-3529-4668-bea5-0dbaba766836",
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
                "uuid": "0be5bd0c-be2c-4f92-a921-42834130658f",
                "destination_uuid": "eed13920-a7bc-43f4-8105-ff678d39e8c8"
              }
            ]
          },
          {
            "uuid": "eed13920-a7bc-43f4-8105-ff678d39e8c8",
            "actions": [
              {
                "uuid": "6fb4fe99-a834-42f8-9ca3-139992ec82b2",
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
                "uuid": "314da925-7079-4c4d-af66-703eefd3c4a6",
                "destination_uuid": "46811840-1f8b-4728-b76a-67eb41fa3490"
              }
            ]
          },
          {
            "uuid": "46811840-1f8b-4728-b76a-67eb41fa3490",
            "actions": [
              {
                "uuid": "72616375-7b53-4e29-b75a-1f89009b1c1f",
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
                "uuid": "0b8a2b16-7866-41d0-a087-16e6f75018ad",
                "destination_uuid": "663d9517-aad8-4a09-9540-ca0081ef5e07"
              }
            ]
          },
          {
            "uuid": "663d9517-aad8-4a09-9540-ca0081ef5e07",
            "actions": [
              {
                "uuid": "12f7f99d-149a-42f3-82ca-c19df108d064",
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
                "uuid": "7dab4970-a91c-41e5-9e99-68690b28b0fd",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f2e944c4-d049-405b-8ec5-990899971f67",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a85fd970-92c1-4dfa-9ff3-737b807e91c7",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "db0ce952-0296-42fe-85ff-3231fd38804b"
              }
            ],
            "exits": [
              {
                "uuid": "ec7ffc9d-32a7-4157-8d79-d7fae7891426",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "99f08be9-a5dd-4b99-b203-145fe6fafa86",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c964a9c5-907c-4f64-9ef2-43319730e875",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f57a7113-acb9-4e6a-96fd-945124ad24bb"
              }
            ],
            "exits": [
              {
                "uuid": "f21a4eb5-5359-4421-bb52-928eea11446c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "42a244b6-1bd3-433e-a396-3529dd93d1e6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d14b3cc1-5ba5-4be9-8c4d-0aad7d840678",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d190f283-f7d7-4f7f-81d3-0099934f2212"
              }
            ],
            "exits": [
              {
                "uuid": "302e286d-c598-48e5-b55e-481939b6b609",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "759b8ce5-4251-4452-bec0-b8217e386ed8",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "166b4979-0d2c-44b8-a70d-33e2dae273ba",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "784af01b-f591-400d-942f-944c4612bfa8"
              }
            ],
            "exits": [
              {
                "uuid": "f2d95c7a-2853-44b2-85c2-a78ab003e0b9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "7ee3cc30-1bad-4f3d-91aa-3e641bde52df",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f631290b-9674-4996-a626-9c874e574cc7",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7771da63-0a06-474c-8782-5acfdc2f4c4c"
              }
            ],
            "exits": [
              {
                "uuid": "220a49fd-e455-4f9b-ad45-0176a4168ffa",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f32b5df8-9340-446b-b17b-71194f60638f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c39022d1-cf00-4381-8ed7-5c50469b6b17",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e4d3915a-4825-445f-9eb5-0bb1076056b2"
              }
            ],
            "exits": [
              {
                "uuid": "0ff6f486-5ae9-43f5-8a85-c68129f14f42",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "63d6b7d6-bd53-4c68-81d0-61cdbf0302d6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b92f396c-26a4-4abf-87d0-8f8f13bf2bcf",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5e7c93b9-eb35-476d-982b-c8859eabfa95"
              }
            ],
            "exits": [
              {
                "uuid": "2b20fad4-3572-4372-a9f3-8586dfd66077",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "dacf449e-d4b4-47dd-9f2a-c40717e1dee5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "571dfc60-a482-4aac-b376-6895f2044ecf",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "75244890-0542-4152-a477-a1ec8cf559cf"
              }
            ],
            "exits": [
              {
                "uuid": "bcd2ff59-88ad-4830-9a62-603d402ea643",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "644c242e-84ab-4861-ae88-57c42c37e55d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9d9a9354-4f9b-4221-987d-cc5b655b82f5",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "908636d0-f003-4f56-9979-0cc82b196c95"
              }
            ],
            "exits": [
              {
                "uuid": "54ca53fb-3df3-4b1e-a064-716f9650db4c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f4f6a3c2-a13d-44b4-a8e0-444eb097820f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "60f704d0-896a-40ee-ad2d-27855d757225",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4a7230d0-736f-4de5-b42c-d5a8c71dc22b"
              }
            ],
            "exits": [
              {
                "uuid": "fe85c5ff-d5e6-413b-815b-81d560dd7517",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d1ef6df9-3244-47e1-bae6-093da3d8bb86",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0173b074-6af1-46bc-8c65-805194b693c2",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ebac95dc-25d1-45c1-b488-1e1a11c51443"
              }
            ],
            "exits": [
              {
                "uuid": "f3b48ece-8c85-45ca-9bb0-a111cda4e10f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5a33aeee-c683-4415-ba03-e0d7ba1ee68e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4558597c-4558-4774-a7de-fbbabf5e9651",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d1f0ff86-5a02-445f-984b-e6ebd4f3910a"
              }
            ],
            "exits": [
              {
                "uuid": "b561e4aa-1293-4b71-b220-9863dade0102",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "61357747-e186-4382-b462-4143dbeefb62",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "dd28315d-8b1c-44e5-9802-200c23aab083",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7c80c935-8e6d-44ae-9e17-8a30cae0d10a"
              }
            ],
            "exits": [
              {
                "uuid": "7624de4a-e00d-4295-8f43-9afbd2e6104a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c51bceb2-50d0-4953-b562-a4398ba364e3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "cda9f74c-8984-4e67-b81c-76c06f8e58b9",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "393f9d55-40fd-4248-b924-2af929b6db49"
              }
            ],
            "exits": [
              {
                "uuid": "8ac38caf-f078-4cf6-b4b1-a4336fcd6427",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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