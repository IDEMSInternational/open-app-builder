/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const conversation: FlowTypes.Conversation[] = [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "66700e13-0fb8-430d-9319-4540db0d3e9f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b1dc94d3-4201-4c44-b6c7-0429c2fe19c5",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f708ba2d-bc48-40dd-ac8b-ad844c2183de"
              }
            ],
            "exits": [
              {
                "uuid": "9f41423d-a2cd-4717-a379-43036f351d25",
                "destination_uuid": "848f4201-8451-4174-9173-6aaffc4bf9e3"
              }
            ]
          },
          {
            "uuid": "848f4201-8451-4174-9173-6aaffc4bf9e3",
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
                "uuid": "3f2f5b93-ea3f-49a0-8fbd-35206bbea4b6"
              }
            ],
            "exits": [
              {
                "uuid": "ae59e2da-7a63-4cff-a00f-c6adaf2820cc",
                "destination_uuid": "f76ed1d1-490f-4019-ae18-f7992526c830"
              }
            ]
          },
          {
            "uuid": "f76ed1d1-490f-4019-ae18-f7992526c830",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "44b76279-a98d-4bc6-9859-a23c653c7654",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "ae98d037-c7b8-44c0-8920-c0f02153f448",
                  "type": "has_only_phrase",
                  "uuid": "84aa6070-9e74-4fe0-b172-6b0f00cecbc0"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "155fc884-fc6c-40da-88f1-96bc92e5229d",
                  "type": "has_only_phrase",
                  "uuid": "afdaac9e-5e1b-4936-bf8a-7efd10c49e57"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "2eefb48c-ac93-4c8b-b5d2-2335b47fbb37",
                  "type": "has_only_phrase",
                  "uuid": "061c1d32-3e3b-4d2f-8d0a-90f0e3accb39"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "49934525-15f6-4af0-a33d-684ae87ae025",
                  "type": "has_only_phrase",
                  "uuid": "c09ba421-f7bb-49ad-9f0e-1d1a43dac0fb"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "baf7df5d-21e6-4cd0-80bc-0553dc6a23e3",
                  "type": "has_only_phrase",
                  "uuid": "dd60f94e-1067-4602-bae0-080666610be2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5deb3c7d-42a3-4233-a6e2-5b176d157958",
                  "name": "All Responses",
                  "uuid": "44b76279-a98d-4bc6-9859-a23c653c7654"
                },
                {
                  "exit_uuid": "60786467-de4b-4f90-b47a-bdc4c17ef8b3",
                  "name": "First option: launch example_media flow",
                  "uuid": "ae98d037-c7b8-44c0-8920-c0f02153f448"
                },
                {
                  "exit_uuid": "7d2a0d86-71ef-469d-9080-fa745f699534",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "155fc884-fc6c-40da-88f1-96bc92e5229d"
                },
                {
                  "exit_uuid": "bf8fd392-78ae-4967-870d-1bd54fb4480c",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "2eefb48c-ac93-4c8b-b5d2-2335b47fbb37"
                },
                {
                  "exit_uuid": "3a7c952f-932a-4227-997c-69be3473f3a4",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "49934525-15f6-4af0-a33d-684ae87ae025"
                },
                {
                  "exit_uuid": "97a4263d-75e3-49a5-8e1d-88253de135de",
                  "name": "Stay in this flow.",
                  "uuid": "baf7df5d-21e6-4cd0-80bc-0553dc6a23e3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5deb3c7d-42a3-4233-a6e2-5b176d157958",
                "destination_uuid": null
              },
              {
                "uuid": "60786467-de4b-4f90-b47a-bdc4c17ef8b3",
                "destination_uuid": "f5674e90-ddf5-4425-8c41-41da5a839d41"
              },
              {
                "uuid": "7d2a0d86-71ef-469d-9080-fa745f699534",
                "destination_uuid": "7e53614e-69c2-4ed1-991a-f40a91f89a32"
              },
              {
                "uuid": "bf8fd392-78ae-4967-870d-1bd54fb4480c",
                "destination_uuid": "c716e79f-5043-4055-b502-efb54add3510"
              },
              {
                "uuid": "3a7c952f-932a-4227-997c-69be3473f3a4",
                "destination_uuid": "626b2f38-83bf-42d8-a346-cdbc04c358cf"
              },
              {
                "uuid": "97a4263d-75e3-49a5-8e1d-88253de135de",
                "destination_uuid": "91f1804f-647f-4bbb-9364-80d215093695"
              }
            ]
          },
          {
            "uuid": "f5674e90-ddf5-4425-8c41-41da5a839d41",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "d41301a7-a90d-4443-a792-68b7c6263fe1"
                },
                "type": "enter_flow",
                "uuid": "2e6aedac-68b7-485c-9b0e-1d987a34a1ad"
              }
            ],
            "exits": [
              {
                "uuid": "2a81844a-f0fe-4ee4-b29d-6aace535e44f",
                "destination_uuid": "c90ff51e-dc83-4557-9ce4-85ba17647d3f"
              },
              {
                "uuid": "d031a715-701a-4935-ba8b-951011fa9cfe",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2c7a89e9-c522-4d50-a8c2-993f36356483",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f4985b17-8a4a-4183-b00b-c9094bc866b9"
                },
                {
                  "uuid": "db2d40a3-b8a9-4c0b-99c9-e3c1285374a7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f46305ae-5db8-4a1a-aabb-ad1da8a46577"
                }
              ],
              "categories": [
                {
                  "uuid": "f4985b17-8a4a-4183-b00b-c9094bc866b9",
                  "name": "Complete",
                  "exit_uuid": "2a81844a-f0fe-4ee4-b29d-6aace535e44f"
                },
                {
                  "uuid": "f46305ae-5db8-4a1a-aabb-ad1da8a46577",
                  "name": "Expired",
                  "exit_uuid": "d031a715-701a-4935-ba8b-951011fa9cfe"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f4985b17-8a4a-4183-b00b-c9094bc866b9"
            }
          },
          {
            "uuid": "7e53614e-69c2-4ed1-991a-f40a91f89a32",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "f8a7f026-0295-47c7-8ab2-e8118e4d4cf0"
                },
                "type": "enter_flow",
                "uuid": "cf4ea471-f74b-4d63-bc91-c1897636bcb2"
              }
            ],
            "exits": [
              {
                "uuid": "b1de962d-5137-4797-aa5d-b72c9d8b12f3",
                "destination_uuid": "c90ff51e-dc83-4557-9ce4-85ba17647d3f"
              },
              {
                "uuid": "72412253-034c-41e1-b01d-d20fab26acce",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "9d99ea75-3d4e-46ff-81df-8ad8f75b523a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "1f25e98d-4be3-45e9-a6a8-e6f3d6a2dfac"
                },
                {
                  "uuid": "dedc21f5-ce91-4d9b-bc00-ce95e2834dff",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "aa016b76-9315-472e-9557-68e02fb1d68c"
                }
              ],
              "categories": [
                {
                  "uuid": "1f25e98d-4be3-45e9-a6a8-e6f3d6a2dfac",
                  "name": "Complete",
                  "exit_uuid": "b1de962d-5137-4797-aa5d-b72c9d8b12f3"
                },
                {
                  "uuid": "aa016b76-9315-472e-9557-68e02fb1d68c",
                  "name": "Expired",
                  "exit_uuid": "72412253-034c-41e1-b01d-d20fab26acce"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "1f25e98d-4be3-45e9-a6a8-e6f3d6a2dfac"
            }
          },
          {
            "uuid": "c716e79f-5043-4055-b502-efb54add3510",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "e99f60f9-2959-443c-8eec-da942ece39c1"
                },
                "type": "enter_flow",
                "uuid": "a6f15d26-ef87-4948-8bc8-ea9a754e701a"
              }
            ],
            "exits": [
              {
                "uuid": "af271052-a706-4ebf-88f2-cda9d20b3937",
                "destination_uuid": "c90ff51e-dc83-4557-9ce4-85ba17647d3f"
              },
              {
                "uuid": "4da502ab-eb0d-466a-b06f-0b1ba77e6825",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e6ee9242-a6f6-4a08-b8d9-1c81f44ec7e3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "fc73023e-9061-4cec-8ab8-18529df43f8e"
                },
                {
                  "uuid": "7d8c1a16-3f67-4156-919b-b12e45f32770",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0e66dd9c-feec-420a-85c8-74e8e562cf17"
                }
              ],
              "categories": [
                {
                  "uuid": "fc73023e-9061-4cec-8ab8-18529df43f8e",
                  "name": "Complete",
                  "exit_uuid": "af271052-a706-4ebf-88f2-cda9d20b3937"
                },
                {
                  "uuid": "0e66dd9c-feec-420a-85c8-74e8e562cf17",
                  "name": "Expired",
                  "exit_uuid": "4da502ab-eb0d-466a-b06f-0b1ba77e6825"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "fc73023e-9061-4cec-8ab8-18529df43f8e"
            }
          },
          {
            "uuid": "626b2f38-83bf-42d8-a346-cdbc04c358cf",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "c7bd20f4-cff4-4d0e-bf4e-881617d34db3"
                },
                "type": "enter_flow",
                "uuid": "e4aced28-b490-4823-afbc-79f4be995d06"
              }
            ],
            "exits": [
              {
                "uuid": "43171255-5701-4ff3-9931-0572d09edbde",
                "destination_uuid": "c90ff51e-dc83-4557-9ce4-85ba17647d3f"
              },
              {
                "uuid": "5155e9bc-c85d-41ac-9310-a1a9b1a886e7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c4223fd1-b253-4cef-b819-b0e4ea34f15e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "1fa7cfab-0284-498c-b8d4-8c59ab413830"
                },
                {
                  "uuid": "f3676874-ff61-4c6d-8049-82c2e43d99f7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "41c5aafe-7de2-4ba4-841f-7a74295810b5"
                }
              ],
              "categories": [
                {
                  "uuid": "1fa7cfab-0284-498c-b8d4-8c59ab413830",
                  "name": "Complete",
                  "exit_uuid": "43171255-5701-4ff3-9931-0572d09edbde"
                },
                {
                  "uuid": "41c5aafe-7de2-4ba4-841f-7a74295810b5",
                  "name": "Expired",
                  "exit_uuid": "5155e9bc-c85d-41ac-9310-a1a9b1a886e7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "1fa7cfab-0284-498c-b8d4-8c59ab413830"
            }
          },
          {
            "uuid": "91f1804f-647f-4bbb-9364-80d215093695",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "799e75c5-1d3f-4020-8654-7a9dd5402373"
              }
            ],
            "exits": [
              {
                "uuid": "3b5488ee-668e-4b79-9b41-ce7b464f8362",
                "destination_uuid": "577a01ef-f9b2-42ce-9a5d-a1a9368ea5d1"
              }
            ]
          },
          {
            "uuid": "c90ff51e-dc83-4557-9ce4-85ba17647d3f",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dff9f98b-f9f5-4f8a-bc4b-07fe568e89cd"
              }
            ],
            "exits": [
              {
                "uuid": "e44b91d8-df58-4729-81ec-a95d856f929b",
                "destination_uuid": "577a01ef-f9b2-42ce-9a5d-a1a9368ea5d1"
              }
            ]
          },
          {
            "uuid": "577a01ef-f9b2-42ce-9a5d-a1a9368ea5d1",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "4c2f3ac6-c893-4e4b-a15a-0d5f62e8c474"
              }
            ],
            "exits": [
              {
                "uuid": "36aa1022-a54c-4c79-9e02-35d5599f7e66",
                "destination_uuid": "3a39d896-e8e0-4398-8424-3f8bc52aca7c"
              }
            ]
          },
          {
            "uuid": "3a39d896-e8e0-4398-8424-3f8bc52aca7c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "38318607-8930-47fa-a5ec-7ecf3db0904c",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "c6de062a-b129-4bc0-8763-7106f9dfbfe6",
                  "type": "has_only_phrase",
                  "uuid": "82580e53-c3ca-4405-b591-301f435c7d57"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "3cdc8436-0723-428d-b4f3-eafcae5cdee3",
                  "type": "has_only_phrase",
                  "uuid": "2c3744c4-6c6c-4318-a55f-fe6c89df55f2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "60ef37b4-c394-4920-93de-a437c5a0bc8f",
                  "name": "All Responses",
                  "uuid": "38318607-8930-47fa-a5ec-7ecf3db0904c"
                },
                {
                  "exit_uuid": "38b3e0d2-eb0e-4ffc-8f25-7102392d8247",
                  "name": "Yes",
                  "uuid": "c6de062a-b129-4bc0-8763-7106f9dfbfe6"
                },
                {
                  "exit_uuid": "d5e28315-f631-4df2-9ae4-283406580621",
                  "name": "No",
                  "uuid": "3cdc8436-0723-428d-b4f3-eafcae5cdee3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "60ef37b4-c394-4920-93de-a437c5a0bc8f",
                "destination_uuid": null
              },
              {
                "uuid": "38b3e0d2-eb0e-4ffc-8f25-7102392d8247",
                "destination_uuid": "848f4201-8451-4174-9173-6aaffc4bf9e3"
              },
              {
                "uuid": "d5e28315-f631-4df2-9ae4-283406580621",
                "destination_uuid": "59bc2044-5cac-48e7-954f-555401fcea22"
              }
            ]
          },
          {
            "uuid": "59bc2044-5cac-48e7-954f-555401fcea22",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f7a88059-ef00-4e3d-829e-c7a5bf61573e"
              }
            ],
            "exits": [
              {
                "uuid": "eac3587e-8d4e-429f-bd96-5515663b9b94",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7a7780ed-9c27-4645-a7c0-ae08757736ac",
            "actions": [
              {
                "uuid": "3ac23727-6782-4622-ab0d-57cc0aa989c3",
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
                "uuid": "3ee6557a-e598-474d-a4a9-b0f77eef3f07",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "abb21d91-57b2-4e77-b9b3-bfb83beff88c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4177dba8-40b7-4e83-a0a8-275a4ca931f2",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4a276777-4a30-484c-b8f8-6b064d2b2bcb"
              }
            ],
            "exits": [
              {
                "uuid": "76490048-78f3-46fe-a3b5-879178362daa",
                "destination_uuid": "f14fc1f4-04a2-465f-9980-337893c03dff"
              }
            ]
          },
          {
            "uuid": "e549afb6-ffc3-4425-9436-669e9cc98775",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4336a000-0407-42c8-90ec-8391d18a2d2c"
              }
            ],
            "exits": [
              {
                "uuid": "d7c5bf0b-adf4-4c00-be68-b4987fcaae49",
                "destination_uuid": "666985c2-1ca8-4a7f-bf4a-6c13db54e24a"
              }
            ]
          },
          {
            "uuid": "666985c2-1ca8-4a7f-bf4a-6c13db54e24a",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "c7bed8a7-6f1d-4251-b0c4-2f4d0ac6ad90"
              }
            ],
            "exits": [
              {
                "uuid": "a9964154-d176-4e0c-9a5b-3dfe2813b99e",
                "destination_uuid": "b70c2a7c-df84-4084-a683-89f29e4ad606"
              }
            ]
          },
          {
            "uuid": "b70c2a7c-df84-4084-a683-89f29e4ad606",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a5d6783b-a8f9-4950-907d-4f4e892a8a46",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "3221a860-596f-4703-879e-67dfbf34215f",
                  "type": "has_only_phrase",
                  "uuid": "7c8e7504-8b42-4832-b087-3b41c519ebea"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "3221a860-596f-4703-879e-67dfbf34215f",
                  "type": "has_only_phrase",
                  "uuid": "4e7ed082-e5b2-454a-982c-3db7c115e163"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5ffb7dc7-a609-4e99-b5bf-d333c660e38d",
                  "name": "All Responses",
                  "uuid": "a5d6783b-a8f9-4950-907d-4f4e892a8a46"
                },
                {
                  "exit_uuid": "0ea972d1-c13b-4c87-975a-c7e0bb9c5d46",
                  "name": "image1; image2",
                  "uuid": "3221a860-596f-4703-879e-67dfbf34215f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5ffb7dc7-a609-4e99-b5bf-d333c660e38d",
                "destination_uuid": null
              },
              {
                "uuid": "0ea972d1-c13b-4c87-975a-c7e0bb9c5d46",
                "destination_uuid": "18e74ab7-ec6c-4dfb-8b96-de2c39c7936f"
              }
            ]
          },
          {
            "uuid": "18e74ab7-ec6c-4dfb-8b96-de2c39c7936f",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "28f42f23-d528-40f7-a61f-aa0ce9c3d407"
              }
            ],
            "exits": [
              {
                "uuid": "969c45fc-6f65-49f8-ab19-1aa822e51587",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f14fc1f4-04a2-465f-9980-337893c03dff",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "271c6ee2-d90e-4f91-80a5-c3400b72f83f",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "3081aaa6-19c1-419c-a30f-a85db37962cf",
                  "type": "has_only_phrase",
                  "uuid": "881eae79-9063-4ce4-84f6-381221cbe38d"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "3081aaa6-19c1-419c-a30f-a85db37962cf",
                  "type": "has_only_phrase",
                  "uuid": "7144d0d8-45cb-4b5a-b692-08634e06c76c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "52a3987d-cb78-4d91-8d80-a391fe6191b7",
                  "name": "All Responses",
                  "uuid": "271c6ee2-d90e-4f91-80a5-c3400b72f83f"
                },
                {
                  "exit_uuid": "b5ad1a79-d18d-4078-826f-cc9b0670c3da",
                  "name": "image1; image2",
                  "uuid": "3081aaa6-19c1-419c-a30f-a85db37962cf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "52a3987d-cb78-4d91-8d80-a391fe6191b7",
                "destination_uuid": "e549afb6-ffc3-4425-9436-669e9cc98775"
              },
              {
                "uuid": "b5ad1a79-d18d-4078-826f-cc9b0670c3da",
                "destination_uuid": "834cbed5-df7c-4cc8-add4-825e99bd87a7"
              }
            ]
          },
          {
            "uuid": "834cbed5-df7c-4cc8-add4-825e99bd87a7",
            "actions": [
              {
                "uuid": "f46b881d-a600-44b2-abe4-1b9c2d21e2c5",
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
                "uuid": "197b226a-72cd-4242-af3c-f7e151edcad0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ce6ae4c7-1685-41ff-9c09-936cd7b1af66",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9008b1ce-774f-4ca3-b525-984d834e4484",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "6eae651a-bf40-4419-ae74-fc4c0b2767bf"
              }
            ],
            "exits": [
              {
                "uuid": "50dba0ba-a2c9-4067-879e-ec12fddebdce",
                "destination_uuid": "3b4aae6b-8aae-4807-bb93-e90be8ed8efa"
              }
            ]
          },
          {
            "uuid": "3b4aae6b-8aae-4807-bb93-e90be8ed8efa",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9990c07d-ccf1-4295-b08f-b324fa20b898",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "4f0a3974-b3f5-4cd2-aef4-b6bed2e4645c",
                  "type": "has_only_phrase",
                  "uuid": "0c077612-2845-4db4-a3ed-1af3beee5ca9"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "319ccc9e-a344-40b3-83d5-0102c919d8a1",
                  "type": "has_only_phrase",
                  "uuid": "3ab7dc5e-fb29-4530-a5ad-9f092a4d3d2e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3696e356-2029-4d5a-a63e-6d7c66a312ab",
                  "name": "All Responses",
                  "uuid": "9990c07d-ccf1-4295-b08f-b324fa20b898"
                },
                {
                  "exit_uuid": "5bc6b6ad-f178-4a9c-bcfe-b68022c5e584",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "4f0a3974-b3f5-4cd2-aef4-b6bed2e4645c"
                },
                {
                  "exit_uuid": "f1a69ba9-31c3-48c3-a358-8448b5a8d98c",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "319ccc9e-a344-40b3-83d5-0102c919d8a1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3696e356-2029-4d5a-a63e-6d7c66a312ab",
                "destination_uuid": null
              },
              {
                "uuid": "5bc6b6ad-f178-4a9c-bcfe-b68022c5e584",
                "destination_uuid": "52f6ac69-5b98-486e-bcde-3302f2c366d3"
              },
              {
                "uuid": "f1a69ba9-31c3-48c3-a358-8448b5a8d98c",
                "destination_uuid": "65a502d6-3a58-4acd-913b-da11684bbdac"
              }
            ]
          },
          {
            "uuid": "52f6ac69-5b98-486e-bcde-3302f2c366d3",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "793a3afb-7997-46ca-8bf8-d97b702e7123"
              }
            ],
            "exits": [
              {
                "uuid": "470fa4ff-0151-495d-af26-534c8af7aa4a",
                "destination_uuid": "052a9190-e555-483f-8f9b-c8b66a50d23c"
              }
            ]
          },
          {
            "uuid": "65a502d6-3a58-4acd-913b-da11684bbdac",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "25222b21-403a-4784-bf40-1f6c95f10b58"
              }
            ],
            "exits": [
              {
                "uuid": "f7b2f04c-ec19-4c31-b4b6-cd29cadeeda7",
                "destination_uuid": "052a9190-e555-483f-8f9b-c8b66a50d23c"
              }
            ]
          },
          {
            "uuid": "052a9190-e555-483f-8f9b-c8b66a50d23c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9418273e-8219-4ef8-ac53-2ca4dfb19a0a",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "e3ecbd2d-ecb5-49eb-9fe7-d788248194b2",
                  "type": "has_only_phrase",
                  "uuid": "293319f9-1f7f-4358-9ea8-73ca55e42f32"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "c7d25671-bbb4-4809-8451-930cbb7dc817",
                  "type": "has_only_phrase",
                  "uuid": "ae7c8757-d50f-4ad5-9872-88de869d5fa8"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "c1175124-51f2-4eb0-85dc-90727413627a",
                  "type": "has_only_phrase",
                  "uuid": "2335ae0b-5f5d-4d72-a1a7-30a195574570"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1e5959ca-6c04-43dc-a13c-c0396f232528",
                  "name": "All Responses",
                  "uuid": "9418273e-8219-4ef8-ac53-2ca4dfb19a0a"
                },
                {
                  "exit_uuid": "dec84885-d50e-4d6a-824c-a016de26a355",
                  "name": "Hello",
                  "uuid": "e3ecbd2d-ecb5-49eb-9fe7-d788248194b2"
                },
                {
                  "exit_uuid": "5b76dac8-14b1-4260-b316-8b6bfba6fe86",
                  "name": "Goodbye",
                  "uuid": "c7d25671-bbb4-4809-8451-930cbb7dc817"
                },
                {
                  "exit_uuid": "417cddc1-258a-4986-bcaa-d2744b6011f6",
                  "name": "Goodbye",
                  "uuid": "c1175124-51f2-4eb0-85dc-90727413627a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1e5959ca-6c04-43dc-a13c-c0396f232528",
                "destination_uuid": null
              },
              {
                "uuid": "dec84885-d50e-4d6a-824c-a016de26a355",
                "destination_uuid": "ef538cef-9331-476e-aa10-af21e091c3cc"
              },
              {
                "uuid": "5b76dac8-14b1-4260-b316-8b6bfba6fe86",
                "destination_uuid": "b0a01724-69a2-4ef6-8937-a13eade8a4e6"
              },
              {
                "uuid": "417cddc1-258a-4986-bcaa-d2744b6011f6",
                "destination_uuid": "b0a01724-69a2-4ef6-8937-a13eade8a4e6"
              }
            ]
          },
          {
            "uuid": "ef538cef-9331-476e-aa10-af21e091c3cc",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f1423222-aaba-4b48-bde3-5355ce9718ca"
              }
            ],
            "exits": [
              {
                "uuid": "880ae9d6-9dad-4684-a836-df1b7468cf49",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b0a01724-69a2-4ef6-8937-a13eade8a4e6",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4845d36d-2bd0-4a5a-a694-dcfc3fb614b2"
              }
            ],
            "exits": [
              {
                "uuid": "3f55ee5b-cacc-40cc-bba7-01a4fbadd01a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "da03dc4d-58dc-43fd-abeb-247eeb6068e5",
            "actions": [
              {
                "uuid": "b4b4e0c8-8d55-4d2c-b669-717143a0658c",
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
                "uuid": "ac818173-b10e-441c-a359-73ef0e7d4750",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6bdfbe28-6c81-40b2-9905-78c0e2fcfea5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "913b40ed-f886-4d01-86c7-1d91a290f2df",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fc7447d5-104a-4f87-b4c6-169439fafdf1"
              }
            ],
            "exits": [
              {
                "uuid": "91c01aa5-4b4f-4c87-82ec-ad93091a4b11",
                "destination_uuid": "a8b9b246-bf02-4265-8da5-285e81187ffd"
              }
            ]
          },
          {
            "uuid": "a8b9b246-bf02-4265-8da5-285e81187ffd",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "d06c61c0-9dc3-48c1-98ea-0da64dc50142"
              }
            ],
            "exits": [
              {
                "uuid": "dd9812c6-8435-4ce6-af2a-e7e8699394df",
                "destination_uuid": "9986f39a-462b-49fa-9c7f-268b05bb6705"
              }
            ]
          },
          {
            "uuid": "9986f39a-462b-49fa-9c7f-268b05bb6705",
            "actions": [],
            "exits": [
              {
                "uuid": "66da5d5b-e32b-4b0b-9b9f-2b1dc0589032",
                "destination_uuid": "901b5db6-6c05-4e59-ba14-90cb5f7fbf7c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e1917f9a-77b4-432b-b654-aded4b055fdd",
              "cases": [],
              "categories": [
                {
                  "uuid": "e1917f9a-77b4-432b-b654-aded4b055fdd",
                  "name": "All Responses",
                  "exit_uuid": "66da5d5b-e32b-4b0b-9b9f-2b1dc0589032"
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
            "uuid": "901b5db6-6c05-4e59-ba14-90cb5f7fbf7c",
            "actions": [
              {
                "uuid": "a881ffdf-e5b3-4d81-b231-3787068346f9",
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
                "uuid": "c1a504cd-bdea-45ac-8bf1-f84b3b794ddb",
                "destination_uuid": "b26867ed-581f-4a40-bb57-3c0bb89d7305"
              }
            ]
          },
          {
            "uuid": "b26867ed-581f-4a40-bb57-3c0bb89d7305",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4f3ad2c5-6e55-4bf9-90e1-abd0353bb19c",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "6b0900a5-cac3-44a3-956f-1841df82fe56",
                  "type": "has_only_phrase",
                  "uuid": "2c5d90e8-04e6-4c71-af8b-84d221615d26"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "439b3f7a-c222-418f-81dc-205bd8c2febf",
                  "type": "has_only_phrase",
                  "uuid": "15b55837-c5df-404d-b60a-45dff3bd99e9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3770343f-46ab-41a9-8609-45e8552685ac",
                  "name": "All Responses",
                  "uuid": "4f3ad2c5-6e55-4bf9-90e1-abd0353bb19c"
                },
                {
                  "exit_uuid": "fc77e22c-1b99-49f9-bacc-b891fa7a9769",
                  "name": "1",
                  "uuid": "6b0900a5-cac3-44a3-956f-1841df82fe56"
                },
                {
                  "exit_uuid": "6d0c8555-355d-4a23-92c2-ba5ac5865304",
                  "name": "2",
                  "uuid": "439b3f7a-c222-418f-81dc-205bd8c2febf"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "3770343f-46ab-41a9-8609-45e8552685ac",
                "destination_uuid": "b23974d6-9d58-4127-b4ce-fe542f5de968"
              },
              {
                "uuid": "fc77e22c-1b99-49f9-bacc-b891fa7a9769",
                "destination_uuid": "be73a09b-2ab4-44c1-a486-da380b9e51d1"
              },
              {
                "uuid": "6d0c8555-355d-4a23-92c2-ba5ac5865304",
                "destination_uuid": "6cae756a-03d1-4e8d-92a3-f829a6b1562c"
              }
            ]
          },
          {
            "uuid": "be73a09b-2ab4-44c1-a486-da380b9e51d1",
            "actions": [
              {
                "uuid": "3783bc28-8ba4-4f70-8db9-d84aa28951a4",
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
                "uuid": "d1dc17a7-f506-48b6-a7e2-59d7b6f3b4ed",
                "destination_uuid": "e0ca6a1b-b4dd-48ab-8118-b904c191e9d9"
              }
            ]
          },
          {
            "uuid": "6cae756a-03d1-4e8d-92a3-f829a6b1562c",
            "actions": [
              {
                "uuid": "3a1ea812-ffe5-49f7-8cac-08f77cdcb5f9",
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
                "uuid": "09afb502-396b-4a2a-9b76-31accbe5f10f",
                "destination_uuid": "66dc0063-82a1-421e-afa0-dc2ce47b992d"
              }
            ]
          },
          {
            "uuid": "b23974d6-9d58-4127-b4ce-fe542f5de968",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9eec3498-897d-40fb-a2b4-78b80c36d1de"
              }
            ],
            "exits": [
              {
                "uuid": "a64af21b-13cb-4864-95c2-f5b93d19af11",
                "destination_uuid": "0d4146d4-a42b-4bb1-85b5-93d7b68d6fd1"
              }
            ]
          },
          {
            "uuid": "0d4146d4-a42b-4bb1-85b5-93d7b68d6fd1",
            "actions": [],
            "exits": [
              {
                "uuid": "1ed5c2bd-ed8a-499d-85f7-3cb1c5828252",
                "destination_uuid": "550db1b3-4f9f-46e3-823e-4bfa2c270707"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "478701c6-2253-4019-9786-2b0faa7ceb19",
              "cases": [],
              "categories": [
                {
                  "uuid": "478701c6-2253-4019-9786-2b0faa7ceb19",
                  "name": "All Responses",
                  "exit_uuid": "1ed5c2bd-ed8a-499d-85f7-3cb1c5828252"
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
            "uuid": "550db1b3-4f9f-46e3-823e-4bfa2c270707",
            "actions": [
              {
                "uuid": "b5134f5c-88d3-439b-b900-0099b3c72be4",
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
                "uuid": "7920f77e-3db2-44a0-9f10-8dbc12559b55",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "e0ca6a1b-b4dd-48ab-8118-b904c191e9d9",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "894b9928-7253-40df-8c21-ef08e292e689"
              }
            ],
            "exits": [
              {
                "uuid": "779b181b-1680-47bf-a4e2-365eea78545b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "66dc0063-82a1-421e-afa0-dc2ce47b992d",
            "actions": [
              {
                "uuid": "413faca2-436f-42fc-945a-576b6fff7a97",
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
                "uuid": "c21c64ee-2d5a-421f-91d1-ea521e4c7157",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5d6ba10d-94f1-459f-8a16-99bc00a3198f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "33d5a78f-3259-4fcb-86c5-9383da806859",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "f6265918-5ba2-4e17-9e1c-8b6e239d7da2"
              }
            ],
            "exits": [
              {
                "uuid": "746e9e37-2607-43e2-bc5c-e3c49292d5fe",
                "destination_uuid": "10679437-1b49-477c-adc9-44bd370c8947"
              }
            ]
          },
          {
            "uuid": "10679437-1b49-477c-adc9-44bd370c8947",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9311aae2-01a4-41c7-862e-9c7b8d353293",
              "cases": [
                {
                  "arguments": [
                    "Go to the story"
                  ],
                  "category_uuid": "0f0bc5e5-760a-470d-94a1-ea70b2fe9679",
                  "type": "has_only_phrase",
                  "uuid": "32d02940-d493-4e53-a44c-79353f3362d7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fac26539-649b-42e1-b267-f24a91fa119c",
                  "name": "All Responses",
                  "uuid": "9311aae2-01a4-41c7-862e-9c7b8d353293"
                },
                {
                  "exit_uuid": "b7126947-b50b-4ef7-ba68-92132a976456",
                  "name": "Go to the story",
                  "uuid": "0f0bc5e5-760a-470d-94a1-ea70b2fe9679"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fac26539-649b-42e1-b267-f24a91fa119c",
                "destination_uuid": null
              },
              {
                "uuid": "b7126947-b50b-4ef7-ba68-92132a976456",
                "destination_uuid": "d6553a89-fb43-467f-b7b0-3f9a5dcba4fd"
              }
            ]
          },
          {
            "uuid": "d6553a89-fb43-467f-b7b0-3f9a5dcba4fd",
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
                "uuid": "3ac1cec0-c6d7-4dfa-9540-430a2d2bde3e"
              }
            ],
            "exits": [
              {
                "uuid": "5423ce4e-0869-4cc7-b8a9-77f85b2bfa12",
                "destination_uuid": "0834353f-282c-49d8-b5e9-0e5685638c37"
              }
            ]
          },
          {
            "uuid": "0834353f-282c-49d8-b5e9-0e5685638c37",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "eaac4451-0edd-4f6f-829c-2c0aa213e49d",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "47a83723-d8da-45c6-989e-eedf5a991770",
                  "type": "has_only_phrase",
                  "uuid": "0adc783f-0d39-41a0-80cb-75b8e07e95f7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5d800c34-18dd-470d-9f4b-9e7ec3482958",
                  "name": "All Responses",
                  "uuid": "eaac4451-0edd-4f6f-829c-2c0aa213e49d"
                },
                {
                  "exit_uuid": "11d4b530-acbc-4743-8f7b-77f8944c4e81",
                  "name": "Next",
                  "uuid": "47a83723-d8da-45c6-989e-eedf5a991770"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5d800c34-18dd-470d-9f4b-9e7ec3482958",
                "destination_uuid": null
              },
              {
                "uuid": "11d4b530-acbc-4743-8f7b-77f8944c4e81",
                "destination_uuid": "96bc081f-628e-4fbe-b0e6-8cfce84bb7e2"
              }
            ]
          },
          {
            "uuid": "96bc081f-628e-4fbe-b0e6-8cfce84bb7e2",
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
                "uuid": "fc41d6d7-da27-4908-b64a-9311b194b124"
              }
            ],
            "exits": [
              {
                "uuid": "021a4881-1252-4ead-9eab-9bfb90edabbe",
                "destination_uuid": "8e15a9e2-df65-4457-a0c4-da70395e6544"
              }
            ]
          },
          {
            "uuid": "8e15a9e2-df65-4457-a0c4-da70395e6544",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e1580548-dd18-45fb-8da8-46e02e35a8d1",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "973d980e-2094-49a8-8427-16e24919e65f",
                  "type": "has_only_phrase",
                  "uuid": "7086966b-95e4-465e-a5dd-ac0beb5b32df"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "94c8ad56-8dca-4cf3-ba98-3574f49feb88",
                  "type": "has_only_phrase",
                  "uuid": "8ec8423e-5b55-4f47-aad1-bb307026e9fc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b445989c-cb2a-44f4-b225-1170bbf3e655",
                  "name": "All Responses",
                  "uuid": "e1580548-dd18-45fb-8da8-46e02e35a8d1"
                },
                {
                  "exit_uuid": "dd3a9699-2550-4255-a341-b69a98e495fa",
                  "name": "Previous",
                  "uuid": "973d980e-2094-49a8-8427-16e24919e65f"
                },
                {
                  "exit_uuid": "ee2a1276-e9a2-4a1e-a26b-42e7d9a45b1e",
                  "name": "Next",
                  "uuid": "94c8ad56-8dca-4cf3-ba98-3574f49feb88"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b445989c-cb2a-44f4-b225-1170bbf3e655",
                "destination_uuid": null
              },
              {
                "uuid": "dd3a9699-2550-4255-a341-b69a98e495fa",
                "destination_uuid": "d6553a89-fb43-467f-b7b0-3f9a5dcba4fd"
              },
              {
                "uuid": "ee2a1276-e9a2-4a1e-a26b-42e7d9a45b1e",
                "destination_uuid": "5c625dd8-8d9d-48d6-9f4c-c2c82e2dd9f7"
              }
            ]
          },
          {
            "uuid": "5c625dd8-8d9d-48d6-9f4c-c2c82e2dd9f7",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ea015d98-47cc-4d71-8609-3413dda73195"
              }
            ],
            "exits": [
              {
                "uuid": "f00da4e6-6a47-4026-a549-46f88437bc16",
                "destination_uuid": "7ef14851-9c69-4791-a4f8-188ea319c5ef"
              }
            ]
          },
          {
            "uuid": "7ef14851-9c69-4791-a4f8-188ea319c5ef",
            "actions": [
              {
                "uuid": "6abe5cf0-12bc-4d71-96da-9c652c5f8a68",
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
                "uuid": "92bab9bf-859d-4ccf-bf0d-084103315095",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "50b85db3-3265-410e-8d15-d917c2f84c29",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8ea24590-58c7-458d-951a-8ee634ca4eac",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d9a6ce3f-d92a-489e-b090-4aa78a33ae00"
              }
            ],
            "exits": [
              {
                "uuid": "7116b73f-acc9-4ecd-88bb-8c1434ec5947",
                "destination_uuid": "118c5e23-0ddd-4b58-8f4b-c9953ec6357d"
              }
            ]
          },
          {
            "uuid": "118c5e23-0ddd-4b58-8f4b-c9953ec6357d",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "43faeba2-c03a-4748-8e1d-f4e44daeec6f"
              }
            ],
            "exits": [
              {
                "uuid": "eb8825fa-5521-4e9e-8b85-67d18a95333b",
                "destination_uuid": "55b3ca32-98d5-4c58-b9ea-17184f4bbc69"
              }
            ]
          },
          {
            "uuid": "55b3ca32-98d5-4c58-b9ea-17184f4bbc69",
            "actions": [],
            "exits": [
              {
                "uuid": "a086a44f-c4a1-41bb-80fb-500d5c9d8b98",
                "destination_uuid": "2c464bbe-8ce2-4cef-8d6d-4bde42f888d0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b87ce89f-ca4d-42d7-90a9-9685308172a1",
              "cases": [],
              "categories": [
                {
                  "uuid": "b87ce89f-ca4d-42d7-90a9-9685308172a1",
                  "name": "All Responses",
                  "exit_uuid": "a086a44f-c4a1-41bb-80fb-500d5c9d8b98"
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
            "uuid": "2c464bbe-8ce2-4cef-8d6d-4bde42f888d0",
            "actions": [
              {
                "uuid": "550bd022-acec-4e5f-a54c-eafffdab1634",
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
                "uuid": "72d4c8f9-abb2-4b0f-a98b-0dd0938237d1",
                "destination_uuid": "03832810-fed4-4be9-b866-7e11a37246e6"
              }
            ]
          },
          {
            "uuid": "03832810-fed4-4be9-b866-7e11a37246e6",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "d0d2c6bc-53af-4359-8b7b-e8415fb0efeb"
                },
                "type": "enter_flow",
                "uuid": "ee890608-aafd-43ce-8782-11096df843c1"
              }
            ],
            "exits": [
              {
                "uuid": "162089dc-2205-4206-9d61-f94cb6624431",
                "destination_uuid": "a76e363b-cb3e-44ef-9c34-0bd5850e2ad8"
              },
              {
                "uuid": "41c83e8b-5699-47ec-ab53-59dd72dbfad0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "50849d30-cf65-4c71-9e8d-a356ae444c19",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "bb547144-e8ff-4595-9707-cf237a84f953"
                },
                {
                  "uuid": "24085b17-ac98-4ef4-8b20-1ae19c4db02e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e43dcff5-8b4c-42f1-9198-84f1a603100f"
                }
              ],
              "categories": [
                {
                  "uuid": "bb547144-e8ff-4595-9707-cf237a84f953",
                  "name": "Complete",
                  "exit_uuid": "162089dc-2205-4206-9d61-f94cb6624431"
                },
                {
                  "uuid": "e43dcff5-8b4c-42f1-9198-84f1a603100f",
                  "name": "Expired",
                  "exit_uuid": "41c83e8b-5699-47ec-ab53-59dd72dbfad0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "bb547144-e8ff-4595-9707-cf237a84f953"
            }
          },
          {
            "uuid": "a76e363b-cb3e-44ef-9c34-0bd5850e2ad8",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "ec700902-6ee7-4309-8c27-43409b5ece71"
              }
            ],
            "exits": [
              {
                "uuid": "2b698717-0f40-4a45-bab3-e47b8969dfe4",
                "destination_uuid": "92727b19-39c9-408d-9e99-d26f17a20f06"
              }
            ]
          },
          {
            "uuid": "92727b19-39c9-408d-9e99-d26f17a20f06",
            "actions": [],
            "exits": [
              {
                "uuid": "4b75e06c-8201-43b5-8c26-52b430ae785b",
                "destination_uuid": "5b983b63-f8f3-41cc-b538-bf6e5aeb5e85"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b404bf48-78d4-490c-bd86-7f7a676f881a",
              "cases": [],
              "categories": [
                {
                  "uuid": "b404bf48-78d4-490c-bd86-7f7a676f881a",
                  "name": "All Responses",
                  "exit_uuid": "4b75e06c-8201-43b5-8c26-52b430ae785b"
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
            "uuid": "5b983b63-f8f3-41cc-b538-bf6e5aeb5e85",
            "actions": [
              {
                "uuid": "11e3ad6f-428e-46c4-a718-68479ecea37c",
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
                "uuid": "6ab0e8f2-d6f1-4ec0-9cba-3fae528fa9e1",
                "destination_uuid": "0a79b886-f986-437c-b953-6d3a43504fa5"
              }
            ]
          },
          {
            "uuid": "0a79b886-f986-437c-b953-6d3a43504fa5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d04e6fde-cafb-4cf3-8775-2a80a362aabb",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "a52dda8d-48bb-449e-9c47-7f2c94ad24b1",
                  "type": "has_only_phrase",
                  "uuid": "c1df4da7-30bd-45cb-ad37-d9a10e04dcf2"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "4ef93741-fa7e-480b-a3d9-7f9fbedc491e",
                  "type": "has_only_phrase",
                  "uuid": "56ad3467-8c90-4270-9a8d-d00261f679a1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "474fa8e4-96d6-434d-8f19-1438b5ba22ea",
                  "name": "All Responses",
                  "uuid": "d04e6fde-cafb-4cf3-8775-2a80a362aabb"
                },
                {
                  "exit_uuid": "a0ed9acc-6faf-479d-8f95-701f0f47c478",
                  "name": "guide1",
                  "uuid": "a52dda8d-48bb-449e-9c47-7f2c94ad24b1"
                },
                {
                  "exit_uuid": "9a90acad-a86d-4085-a086-f260073f9bfd",
                  "name": "guide2",
                  "uuid": "4ef93741-fa7e-480b-a3d9-7f9fbedc491e"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "474fa8e4-96d6-434d-8f19-1438b5ba22ea",
                "destination_uuid": null
              },
              {
                "uuid": "a0ed9acc-6faf-479d-8f95-701f0f47c478",
                "destination_uuid": "92bfd9a8-9fb7-4218-8de9-34e7f471e95d"
              },
              {
                "uuid": "9a90acad-a86d-4085-a086-f260073f9bfd",
                "destination_uuid": "7fb184db-ad58-4c9d-80a1-c7663ba358f0"
              }
            ]
          },
          {
            "uuid": "92bfd9a8-9fb7-4218-8de9-34e7f471e95d",
            "actions": [
              {
                "uuid": "d96f984f-a664-4168-9e16-ac5a46e88ff0",
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
                "uuid": "9fb61430-58eb-4ef3-b288-698b47100967",
                "destination_uuid": "6c930c9d-b56c-4def-a587-ea8796fa2a58"
              }
            ]
          },
          {
            "uuid": "7fb184db-ad58-4c9d-80a1-c7663ba358f0",
            "actions": [
              {
                "uuid": "e1a19a23-1b3c-4013-9927-24b4614675c4",
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
                "uuid": "9dbb5dc0-327f-43fb-91e4-66f25a6898b5",
                "destination_uuid": "6c930c9d-b56c-4def-a587-ea8796fa2a58"
              }
            ]
          },
          {
            "uuid": "6c930c9d-b56c-4def-a587-ea8796fa2a58",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "24c99b7f-7e91-4ec7-8982-153a972a9996"
              }
            ],
            "exits": [
              {
                "uuid": "f29b6c02-9f04-400b-ac9e-7923bca5b175",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "5f2ac4e5-0c4b-44c4-a6b9-58062442f97f",
            "actions": [
              {
                "uuid": "fea07c6b-1ada-4947-ae64-78248e1d4d7e",
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
                "uuid": "e864f801-955c-4f19-be5f-a2072b60291f",
                "destination_uuid": "4050e652-7818-4144-b3a1-c0d497c9de0b"
              }
            ]
          },
          {
            "uuid": "4050e652-7818-4144-b3a1-c0d497c9de0b",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "32299aa5-d115-475e-977a-b0f888f6d056"
                },
                "type": "enter_flow",
                "uuid": "c63f6221-b77d-488d-93cf-3d5e42b1bebb"
              }
            ],
            "exits": [
              {
                "uuid": "bf3fcd47-33ce-40c3-b00e-d268aca3b7d7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ce581f8f-edd9-46ba-86d5-9e5e156fb744",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3de30905-77cc-4892-a267-863db9087a0c",
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
                "uuid": "c7d4731a-a0e4-4511-be86-7b5f41cc132d"
              }
            ],
            "exits": [
              {
                "uuid": "e947855e-6ef3-4dca-b786-1c10f183b87f",
                "destination_uuid": "2e104fe2-730d-42f8-915d-cce9bc34e108"
              }
            ]
          },
          {
            "uuid": "2e104fe2-730d-42f8-915d-cce9bc34e108",
            "actions": [],
            "exits": [
              {
                "uuid": "211dd076-7a97-4716-8c9c-ed6611ab51cb",
                "destination_uuid": "dc23a7a3-a168-4960-b546-4be04b587963"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "5fcff349-30be-4886-80f2-c51ea54bad14",
              "cases": [],
              "categories": [
                {
                  "uuid": "5fcff349-30be-4886-80f2-c51ea54bad14",
                  "name": "All Responses",
                  "exit_uuid": "211dd076-7a97-4716-8c9c-ed6611ab51cb"
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
            "uuid": "dc23a7a3-a168-4960-b546-4be04b587963",
            "actions": [
              {
                "uuid": "1ac69616-6946-44cf-b5af-7aa49a26002b",
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
                "uuid": "b364759a-c7fa-44ff-8b51-9062c14d01f9",
                "destination_uuid": "3d31aa5a-f3b5-4c62-8d5f-8285269f8e73"
              }
            ]
          },
          {
            "uuid": "3d31aa5a-f3b5-4c62-8d5f-8285269f8e73",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "79f3431d-36b2-4776-be82-8218f7d16b1e"
              }
            ],
            "exits": [
              {
                "uuid": "8e6cc39f-49f0-46b7-a412-fb411f9f6cc5",
                "destination_uuid": "342edea9-ce69-420b-946d-3d4857aa282e"
              }
            ]
          },
          {
            "uuid": "342edea9-ce69-420b-946d-3d4857aa282e",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "681f766e-5afe-4550-a523-ecffdc951e3b"
              }
            ],
            "exits": [
              {
                "uuid": "7f98df9f-ad08-4487-bed4-4c05b46c49ab",
                "destination_uuid": "26bf10e5-8eb5-4964-974b-f8a831daf8f2"
              }
            ]
          },
          {
            "uuid": "26bf10e5-8eb5-4964-974b-f8a831daf8f2",
            "actions": [
              {
                "flow": {
                  "name": "calm_5",
                  "uuid": "cd00e018-0f7c-4236-9754-f4d02af53654"
                },
                "type": "enter_flow",
                "uuid": "f66848fe-5579-4d21-8eb4-c7405f454f34"
              }
            ],
            "exits": [
              {
                "uuid": "0b5afa93-923c-4537-8a84-20460306b558",
                "destination_uuid": "1b3f543b-7bbc-466e-85d4-ef14e26b70e9"
              },
              {
                "uuid": "21c9102d-c91c-43c7-ab9d-ed61be214273",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "dc299f67-81d1-4e78-bc18-080e835f9983",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4182a7a1-f9f1-4b7a-9d05-3217aa0680c0"
                },
                {
                  "uuid": "bf8885ea-ad69-4cfa-9da5-c1a9ca999f07",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "92f8cdd0-2cb3-4991-9c3a-4b567709672d"
                }
              ],
              "categories": [
                {
                  "uuid": "4182a7a1-f9f1-4b7a-9d05-3217aa0680c0",
                  "name": "Complete",
                  "exit_uuid": "0b5afa93-923c-4537-8a84-20460306b558"
                },
                {
                  "uuid": "92f8cdd0-2cb3-4991-9c3a-4b567709672d",
                  "name": "Expired",
                  "exit_uuid": "21c9102d-c91c-43c7-ab9d-ed61be214273"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4182a7a1-f9f1-4b7a-9d05-3217aa0680c0"
            }
          },
          {
            "uuid": "1b3f543b-7bbc-466e-85d4-ef14e26b70e9",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ccd2ccfd-5cae-43b8-a299-37401102b17a"
              }
            ],
            "exits": [
              {
                "uuid": "7f120042-d459-4981-835d-d25ada7eeed7",
                "destination_uuid": "887e5491-de49-4edb-9435-eaa23e8f0942"
              }
            ]
          },
          {
            "uuid": "887e5491-de49-4edb-9435-eaa23e8f0942",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "d870e708-4405-4fe8-9487-abddea1eeabb"
              }
            ],
            "exits": [
              {
                "uuid": "c8f9fb0e-4262-4fb1-a6b1-3b5323e06e99",
                "destination_uuid": "fb9a2466-7163-4089-bde4-856f9d246df9"
              }
            ]
          },
          {
            "uuid": "fb9a2466-7163-4089-bde4-856f9d246df9",
            "actions": [],
            "exits": [
              {
                "uuid": "06f03660-36e3-49e7-a34e-404c359d72d2",
                "destination_uuid": "ece81e1d-26aa-44ea-a73f-c93bcbdcbf3f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "049e1dd6-9fae-4445-a535-c99cf8a66c6d",
              "cases": [],
              "categories": [
                {
                  "uuid": "049e1dd6-9fae-4445-a535-c99cf8a66c6d",
                  "name": "All Responses",
                  "exit_uuid": "06f03660-36e3-49e7-a34e-404c359d72d2"
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
            "uuid": "ece81e1d-26aa-44ea-a73f-c93bcbdcbf3f",
            "actions": [
              {
                "uuid": "c5f70e9b-c1f1-4b08-800c-ac670e935b4c",
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
                "uuid": "0627d250-ec3c-4edf-a8dd-878763b8ac2e",
                "destination_uuid": "81d450dd-69d5-4bce-81c3-311b161584ae"
              }
            ]
          },
          {
            "uuid": "81d450dd-69d5-4bce-81c3-311b161584ae",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c8c75033-dae5-4f74-97fc-af198b9dc1ee"
              }
            ],
            "exits": [
              {
                "uuid": "73651819-083c-4dff-9db9-5d65dbf96466",
                "destination_uuid": "eaa72a99-3daf-4ebd-a926-20d1aa76b543"
              }
            ]
          },
          {
            "uuid": "eaa72a99-3daf-4ebd-a926-20d1aa76b543",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ffa141ce-eaf0-4d37-80a4-7363d4cdd729"
              }
            ],
            "exits": [
              {
                "uuid": "6f9ee32e-f622-4e7e-a45d-e389a4483e15",
                "destination_uuid": "e3eeedf3-3895-422a-9df9-3819aafc74ec"
              }
            ]
          },
          {
            "uuid": "e3eeedf3-3895-422a-9df9-3819aafc74ec",
            "actions": [
              {
                "uuid": "5fca414a-a766-4be9-b49d-8175245fb567",
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
                "uuid": "3bf4c252-5fcd-4863-ab9e-5dec591eafe3",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e7fbba49-f769-4460-8859-2dfda7162216",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d02109d3-e58a-4b10-9b38-aa2bf66ce579",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "02e6f61b-1360-43ce-b7cc-49cfa70b96dc"
              }
            ],
            "exits": [
              {
                "uuid": "9ad3a617-c970-4cd6-8773-ccfe0d1d3701",
                "destination_uuid": "e1545165-0301-44eb-83db-b4684e45bdbe"
              }
            ]
          },
          {
            "uuid": "e1545165-0301-44eb-83db-b4684e45bdbe",
            "actions": [
              {
                "uuid": "6bfd7669-0dc6-4b8c-b552-bf1efb3f1d6e",
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
                "uuid": "599bc800-b615-4e01-806e-e42ba5e774a0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "9c582053-cc34-4219-a118-71d1f29e10a0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7e2461de-29c3-46af-97ea-a331fbc34504",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "85de7c74-3705-4c72-bd39-52106e8ba77e"
              }
            ],
            "exits": [
              {
                "uuid": "88782fc7-1b99-42e7-a3b2-687330fa9d3c",
                "destination_uuid": "f61decb3-a481-4aef-9a85-041376dc4ea9"
              }
            ]
          },
          {
            "uuid": "f61decb3-a481-4aef-9a85-041376dc4ea9",
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
                "uuid": "658a5132-759a-451c-80f7-c71b0cae8b0f"
              }
            ],
            "exits": [
              {
                "uuid": "8ac68c8e-a8c8-42b9-91ce-08ca54cee4af",
                "destination_uuid": "c85ac7a2-bc79-46cb-bfb7-80d514f1e050"
              }
            ]
          },
          {
            "uuid": "c85ac7a2-bc79-46cb-bfb7-80d514f1e050",
            "actions": [],
            "exits": [
              {
                "uuid": "336a6c1e-eae4-4fa6-9074-13cd5f86a154",
                "destination_uuid": "016803d9-a957-4034-9288-93088ef13fee"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9d999857-072d-484a-8250-c256a18144e9",
              "cases": [],
              "categories": [
                {
                  "uuid": "9d999857-072d-484a-8250-c256a18144e9",
                  "name": "All Responses",
                  "exit_uuid": "336a6c1e-eae4-4fa6-9074-13cd5f86a154"
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
            "uuid": "016803d9-a957-4034-9288-93088ef13fee",
            "actions": [
              {
                "uuid": "b941ff96-9547-436a-9e39-943f2de36091",
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
                "uuid": "5e8fe856-1c61-482b-8b12-75ea99c264a1",
                "destination_uuid": "5aa9b094-9c0f-46c8-a143-be56f1d671cc"
              }
            ]
          },
          {
            "uuid": "5aa9b094-9c0f-46c8-a143-be56f1d671cc",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bb48c73d-e159-4db1-a707-32f4e5f2d4aa",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "dfa61cee-2c56-45fa-9694-e277d9c3508d",
                  "type": "has_only_phrase",
                  "uuid": "7cef5f43-5cdd-4179-894c-71ca6a567ceb"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "dfa61cee-2c56-45fa-9694-e277d9c3508d",
                  "type": "has_only_phrase",
                  "uuid": "35c1b952-0c07-45ca-a051-07eab8690549"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "dfa61cee-2c56-45fa-9694-e277d9c3508d",
                  "type": "has_only_phrase",
                  "uuid": "4eff27fd-9513-4ac2-be79-b360e54cfb60"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "dfa61cee-2c56-45fa-9694-e277d9c3508d",
                  "type": "has_only_phrase",
                  "uuid": "99476a13-1805-4b83-aade-b0480509854e"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "0dd777f3-dbb4-4e8c-bff8-dc67f148a0b5",
                  "type": "has_only_phrase",
                  "uuid": "caa2980f-9bad-438d-9a71-b3e56887cb2b"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "0dd777f3-dbb4-4e8c-bff8-dc67f148a0b5",
                  "type": "has_only_phrase",
                  "uuid": "251c6f89-449d-47ab-ae20-a61627eb0eb2"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "0dd777f3-dbb4-4e8c-bff8-dc67f148a0b5",
                  "type": "has_only_phrase",
                  "uuid": "c255c418-9b22-46df-93bb-e37a9a89dca7"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "0dd777f3-dbb4-4e8c-bff8-dc67f148a0b5",
                  "type": "has_only_phrase",
                  "uuid": "b94c161b-2907-4f9b-9a9b-f09ae642aa8c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dd2676d9-f0e9-4d81-b898-b68a077d4ee3",
                  "name": "All Responses",
                  "uuid": "bb48c73d-e159-4db1-a707-32f4e5f2d4aa"
                },
                {
                  "exit_uuid": "446d5a8f-03e4-42ba-858e-16a6717d8d1b",
                  "name": "0;1;2;3",
                  "uuid": "dfa61cee-2c56-45fa-9694-e277d9c3508d"
                },
                {
                  "exit_uuid": "76919817-2099-44cf-9787-a4bdb263612b",
                  "name": "4;5;6;7",
                  "uuid": "0dd777f3-dbb4-4e8c-bff8-dc67f148a0b5"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "dd2676d9-f0e9-4d81-b898-b68a077d4ee3",
                "destination_uuid": null
              },
              {
                "uuid": "446d5a8f-03e4-42ba-858e-16a6717d8d1b",
                "destination_uuid": "805d60a9-dbfa-4b30-8a05-dacf21b2fafd"
              },
              {
                "uuid": "76919817-2099-44cf-9787-a4bdb263612b",
                "destination_uuid": "89d2f4fe-341c-4494-937c-32b609bbe21b"
              }
            ]
          },
          {
            "uuid": "805d60a9-dbfa-4b30-8a05-dacf21b2fafd",
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
                "uuid": "f9898c3a-b55b-4741-aecd-37739e86e7f9"
              }
            ],
            "exits": [
              {
                "uuid": "b3f6d88f-caa7-43b4-8fb0-e48b7d681c44",
                "destination_uuid": "12918f38-7241-497d-a243-cfcf7715d6b3"
              }
            ]
          },
          {
            "uuid": "89d2f4fe-341c-4494-937c-32b609bbe21b",
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
                "uuid": "91c722a4-ae47-4932-88c9-0664b187cfb7"
              }
            ],
            "exits": [
              {
                "uuid": "14199068-7b93-4880-8e49-97dcd961cf49",
                "destination_uuid": "12918f38-7241-497d-a243-cfcf7715d6b3"
              }
            ]
          },
          {
            "uuid": "12918f38-7241-497d-a243-cfcf7715d6b3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f16828ee-014d-4810-a97c-d0ebc90cb63e",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "932c9420-8101-4376-80c1-1c9a7920db93",
                  "type": "has_only_phrase",
                  "uuid": "785ca712-e141-439f-bf57-5c12f75d13eb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "82c37ee5-7337-4dec-a620-a98c886296ed",
                  "name": "All Responses",
                  "uuid": "f16828ee-014d-4810-a97c-d0ebc90cb63e"
                },
                {
                  "exit_uuid": "b8353db4-60a9-4a9d-8f39-78f1677ee3a3",
                  "name": "Next",
                  "uuid": "932c9420-8101-4376-80c1-1c9a7920db93"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "82c37ee5-7337-4dec-a620-a98c886296ed",
                "destination_uuid": null
              },
              {
                "uuid": "b8353db4-60a9-4a9d-8f39-78f1677ee3a3",
                "destination_uuid": "e667dd35-bba4-4d3d-8325-f942e6bc5261"
              }
            ]
          },
          {
            "uuid": "e667dd35-bba4-4d3d-8325-f942e6bc5261",
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
                "uuid": "0752152b-638b-4ee8-ab47-27a803698514"
              }
            ],
            "exits": [
              {
                "uuid": "93f43a0a-0e8e-4966-8b11-cd462fa623b8",
                "destination_uuid": "69afabc1-5963-4f37-a69a-848f2d5bd8c9"
              }
            ]
          },
          {
            "uuid": "69afabc1-5963-4f37-a69a-848f2d5bd8c9",
            "actions": [],
            "exits": [
              {
                "uuid": "1919c03a-aaee-4b72-8a43-8074523756c4",
                "destination_uuid": "e293198a-1621-47a5-ab20-62f087d8c527"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "1b1ddf7e-c568-4808-9ee8-508a6dac3809",
              "cases": [],
              "categories": [
                {
                  "uuid": "1b1ddf7e-c568-4808-9ee8-508a6dac3809",
                  "name": "All Responses",
                  "exit_uuid": "1919c03a-aaee-4b72-8a43-8074523756c4"
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
            "uuid": "e293198a-1621-47a5-ab20-62f087d8c527",
            "actions": [
              {
                "uuid": "1c8b7504-20cb-422a-9911-72d2215b6232",
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
                "uuid": "4293e3b1-f89a-40ca-896b-6e4e3953b35b",
                "destination_uuid": "e6ea4e2a-ce00-47f1-869b-42a44731359d"
              }
            ]
          },
          {
            "uuid": "e6ea4e2a-ce00-47f1-869b-42a44731359d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a7d0ee44-0a5e-4ecc-9aea-9dc857983d32",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "997d960f-841f-420c-8294-08d02a1096c4",
                  "type": "has_only_phrase",
                  "uuid": "fc6cfa8b-b256-43cb-80b6-ca1806bfab2f"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "997d960f-841f-420c-8294-08d02a1096c4",
                  "type": "has_only_phrase",
                  "uuid": "06f358df-7eac-4018-b794-be8f6161ca04"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "997d960f-841f-420c-8294-08d02a1096c4",
                  "type": "has_only_phrase",
                  "uuid": "5c4fe1bc-e38c-4fa2-bf04-a23222520732"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "997d960f-841f-420c-8294-08d02a1096c4",
                  "type": "has_only_phrase",
                  "uuid": "628d80b9-19bc-43af-a95f-5ab02c651490"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "997d960f-841f-420c-8294-08d02a1096c4",
                  "type": "has_only_phrase",
                  "uuid": "75035ce7-f1aa-4579-8f9e-478ef478ae97"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "b37a7fe3-1204-4443-9434-a46964aa94de",
                  "type": "has_only_phrase",
                  "uuid": "83110b5b-2e98-4ad4-8e27-d94c8428f0d5"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "b37a7fe3-1204-4443-9434-a46964aa94de",
                  "type": "has_only_phrase",
                  "uuid": "87f7fff4-0774-4af2-8323-0146183535d5"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "b37a7fe3-1204-4443-9434-a46964aa94de",
                  "type": "has_only_phrase",
                  "uuid": "94442dfd-5b04-4817-9832-a59685b96a0a"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "b37a7fe3-1204-4443-9434-a46964aa94de",
                  "type": "has_only_phrase",
                  "uuid": "eb35166c-4ba7-4d83-9001-a1eaee990ed2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c80e3d15-9d6f-4c11-a674-62fff0e01236",
                  "name": "All Responses",
                  "uuid": "a7d0ee44-0a5e-4ecc-9aea-9dc857983d32"
                },
                {
                  "exit_uuid": "fdb91af1-8883-4869-be34-c54bed2c8b4a",
                  "name": "0;1;2;3;4",
                  "uuid": "997d960f-841f-420c-8294-08d02a1096c4"
                },
                {
                  "exit_uuid": "b1910839-2a2c-4672-a2fe-872fec4c64fb",
                  "name": "5;6;7;8",
                  "uuid": "b37a7fe3-1204-4443-9434-a46964aa94de"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "c80e3d15-9d6f-4c11-a674-62fff0e01236",
                "destination_uuid": null
              },
              {
                "uuid": "fdb91af1-8883-4869-be34-c54bed2c8b4a",
                "destination_uuid": "527d2378-5f91-41ef-89f5-7e6eafabd92f"
              },
              {
                "uuid": "b1910839-2a2c-4672-a2fe-872fec4c64fb",
                "destination_uuid": "95b5b009-f1bf-4ba2-b09a-9305826afbc5"
              }
            ]
          },
          {
            "uuid": "527d2378-5f91-41ef-89f5-7e6eafabd92f",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "ffe3fc91-ca36-4100-a297-048cb6599ce2"
              }
            ],
            "exits": [
              {
                "uuid": "d73cf09e-cbc1-467d-aea2-4d2c58eca743",
                "destination_uuid": "cc0e9088-1de2-45aa-a07c-99681ef0e6c8"
              }
            ]
          },
          {
            "uuid": "95b5b009-f1bf-4ba2-b09a-9305826afbc5",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "671fd1d8-97fc-47a3-b3a7-13053df231bb"
              }
            ],
            "exits": [
              {
                "uuid": "3817407d-7c93-47c4-895c-8bcad3b95763",
                "destination_uuid": "cc0e9088-1de2-45aa-a07c-99681ef0e6c8"
              }
            ]
          },
          {
            "uuid": "cc0e9088-1de2-45aa-a07c-99681ef0e6c8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7c9514aa-29fd-4fee-9ee9-d54f760ce2c4",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "f7ada9e9-50be-4d04-bf0d-16d398a4e812",
                  "type": "has_only_phrase",
                  "uuid": "4b84d64b-019f-42a1-9c2d-4ab27447a890"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a8a183e1-af45-43b3-9930-17182c56e66f",
                  "name": "All Responses",
                  "uuid": "7c9514aa-29fd-4fee-9ee9-d54f760ce2c4"
                },
                {
                  "exit_uuid": "d054f771-876f-45c6-9084-47719ede84fd",
                  "name": "Next",
                  "uuid": "f7ada9e9-50be-4d04-bf0d-16d398a4e812"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a8a183e1-af45-43b3-9930-17182c56e66f",
                "destination_uuid": null
              },
              {
                "uuid": "d054f771-876f-45c6-9084-47719ede84fd",
                "destination_uuid": "092be901-bbe7-42c9-a5be-cb4bd512a0b7"
              }
            ]
          },
          {
            "uuid": "092be901-bbe7-42c9-a5be-cb4bd512a0b7",
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
                "uuid": "2600cccc-c7cf-4417-bf17-373aecc956c0"
              }
            ],
            "exits": [
              {
                "uuid": "bc7ea935-d9ae-422c-b273-3e9bdabdf009",
                "destination_uuid": "240725c1-dfe6-4443-b07f-717e18027504"
              }
            ]
          },
          {
            "uuid": "240725c1-dfe6-4443-b07f-717e18027504",
            "actions": [],
            "exits": [
              {
                "uuid": "5121955f-fcc8-446d-87eb-5479076dd05a",
                "destination_uuid": "41816733-c663-4835-996e-2aab89ea6b29"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a177e7bc-4834-440e-8f9c-d7a8eeef63db",
              "cases": [],
              "categories": [
                {
                  "uuid": "a177e7bc-4834-440e-8f9c-d7a8eeef63db",
                  "name": "All Responses",
                  "exit_uuid": "5121955f-fcc8-446d-87eb-5479076dd05a"
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
            "uuid": "41816733-c663-4835-996e-2aab89ea6b29",
            "actions": [
              {
                "uuid": "2ecc9043-ea5c-4582-ab27-69943bc8bbd3",
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
                "uuid": "d2fe6da1-1384-4572-a801-af795a5d996a",
                "destination_uuid": "3bf748d0-2f7f-474d-8f57-82508d9d8d0d"
              }
            ]
          },
          {
            "uuid": "3bf748d0-2f7f-474d-8f57-82508d9d8d0d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c9c4f04a-15ae-4f7e-9624-c6c8685e8794",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "41176bff-a6b3-421a-bd22-a4f7b701fa28",
                  "type": "has_only_phrase",
                  "uuid": "5ba5f59f-b675-4eb6-b5de-b9c88c9c2a05"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "41176bff-a6b3-421a-bd22-a4f7b701fa28",
                  "type": "has_only_phrase",
                  "uuid": "2fa953eb-c9de-40e7-9306-8a75bbcec789"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "41176bff-a6b3-421a-bd22-a4f7b701fa28",
                  "type": "has_only_phrase",
                  "uuid": "0979d885-f495-4ac3-a356-4d0394f53cec"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "2da6ed21-5875-49f2-acd2-2d7ae3299aeb",
                  "type": "has_only_phrase",
                  "uuid": "ea1d8368-2e5b-40d5-a47d-30322e66d800"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "2da6ed21-5875-49f2-acd2-2d7ae3299aeb",
                  "type": "has_only_phrase",
                  "uuid": "d86d9ae6-0d3a-48d3-8488-15ccd2f47f74"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "2da6ed21-5875-49f2-acd2-2d7ae3299aeb",
                  "type": "has_only_phrase",
                  "uuid": "9a2cb571-8abe-4111-9238-cf218b378a31"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "2da6ed21-5875-49f2-acd2-2d7ae3299aeb",
                  "type": "has_only_phrase",
                  "uuid": "1038593f-9706-440c-be7e-bf62436f1f6a"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "2da6ed21-5875-49f2-acd2-2d7ae3299aeb",
                  "type": "has_only_phrase",
                  "uuid": "84ab93f0-d8e9-44bd-b321-f136b8273560"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f6dfbbeb-e614-4f20-8b1f-83cd489ceef7",
                  "name": "All Responses",
                  "uuid": "c9c4f04a-15ae-4f7e-9624-c6c8685e8794"
                },
                {
                  "exit_uuid": "4e7b3451-7d3d-4aa7-ad70-e10fddd9b73f",
                  "name": "0;1;2",
                  "uuid": "41176bff-a6b3-421a-bd22-a4f7b701fa28"
                },
                {
                  "exit_uuid": "d9db3841-7c4b-492f-bf40-f9d3a0e4023f",
                  "name": "3;4;5;6;7",
                  "uuid": "2da6ed21-5875-49f2-acd2-2d7ae3299aeb"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "f6dfbbeb-e614-4f20-8b1f-83cd489ceef7",
                "destination_uuid": null
              },
              {
                "uuid": "4e7b3451-7d3d-4aa7-ad70-e10fddd9b73f",
                "destination_uuid": "92ea36e5-461a-4b43-8978-fa65edb3d118"
              },
              {
                "uuid": "d9db3841-7c4b-492f-bf40-f9d3a0e4023f",
                "destination_uuid": "b4b1898e-acd2-43d9-8234-02f095aba4c2"
              }
            ]
          },
          {
            "uuid": "92ea36e5-461a-4b43-8978-fa65edb3d118",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "4372ae6b-57f9-400a-8a6f-c54e0d97f553"
              }
            ],
            "exits": [
              {
                "uuid": "241f1f85-0ad3-4dae-bd6e-22fc8237f8f7",
                "destination_uuid": "4e802ef7-6e86-4ab7-983d-d6c133822c8b"
              }
            ]
          },
          {
            "uuid": "b4b1898e-acd2-43d9-8234-02f095aba4c2",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "f863a9a4-eb1a-4529-a24f-1f2c48d49779"
              }
            ],
            "exits": [
              {
                "uuid": "c81ebccd-59df-4772-b0e5-f0dddb168211",
                "destination_uuid": "4e802ef7-6e86-4ab7-983d-d6c133822c8b"
              }
            ]
          },
          {
            "uuid": "4e802ef7-6e86-4ab7-983d-d6c133822c8b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4f72fc68-9e05-4d47-bdc6-06b34dcf3774",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "ae7013c7-3175-4537-85e6-79c2b2f5a9ae",
                  "type": "has_only_phrase",
                  "uuid": "6da84960-5b1c-4f3d-9ae0-ad82eafeed5d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a37c3fba-3083-4c48-bc1c-742fff82fa22",
                  "name": "All Responses",
                  "uuid": "4f72fc68-9e05-4d47-bdc6-06b34dcf3774"
                },
                {
                  "exit_uuid": "13e97a97-f423-4cf9-b3fd-9e9ed96d2aef",
                  "name": "Next",
                  "uuid": "ae7013c7-3175-4537-85e6-79c2b2f5a9ae"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a37c3fba-3083-4c48-bc1c-742fff82fa22",
                "destination_uuid": null
              },
              {
                "uuid": "13e97a97-f423-4cf9-b3fd-9e9ed96d2aef",
                "destination_uuid": "4f469840-e76a-4b75-8d61-d28dcf310cae"
              }
            ]
          },
          {
            "uuid": "4f469840-e76a-4b75-8d61-d28dcf310cae",
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
                "uuid": "d576e0c7-5860-45c0-a885-d00d24acde81"
              }
            ],
            "exits": [
              {
                "uuid": "1c7a5a9e-f36b-41fd-8e45-e80812d2a37e",
                "destination_uuid": "52057b2d-0487-42ac-946c-76ff746cfadb"
              }
            ]
          },
          {
            "uuid": "52057b2d-0487-42ac-946c-76ff746cfadb",
            "actions": [],
            "exits": [
              {
                "uuid": "e0329994-99f6-4d04-a420-37786b309a0a",
                "destination_uuid": "b05d45e9-8f24-485e-bd71-b7b94e5736f0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "03d08468-7fe9-4ac9-8dcb-bd3551421d10",
              "cases": [],
              "categories": [
                {
                  "uuid": "03d08468-7fe9-4ac9-8dcb-bd3551421d10",
                  "name": "All Responses",
                  "exit_uuid": "e0329994-99f6-4d04-a420-37786b309a0a"
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
            "uuid": "b05d45e9-8f24-485e-bd71-b7b94e5736f0",
            "actions": [
              {
                "uuid": "65f4630e-05b5-4928-90db-9fff440589e5",
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
                "uuid": "759350df-7040-4b23-9fd9-c5068efdd6f7",
                "destination_uuid": "05eac3b0-e39a-486b-86bd-3e6759ba2216"
              }
            ]
          },
          {
            "uuid": "05eac3b0-e39a-486b-86bd-3e6759ba2216",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "94dadc2c-77f6-468d-a6c5-a9010ff87cec",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "540d5303-6f0e-4d00-8037-379fed928beb",
                  "type": "has_only_phrase",
                  "uuid": "3ee9857b-511e-4984-a5b6-a5201f20040d"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "540d5303-6f0e-4d00-8037-379fed928beb",
                  "type": "has_only_phrase",
                  "uuid": "c1795301-de4b-4289-ae55-537df9fd6b97"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "9fdf1743-a601-4107-b2b4-5746d418153f",
                  "type": "has_only_phrase",
                  "uuid": "40b7cdb4-a8fd-4b7d-9e73-04de590b4226"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "9fdf1743-a601-4107-b2b4-5746d418153f",
                  "type": "has_only_phrase",
                  "uuid": "d654f3d9-daaa-47e6-a5c1-defe579c8f98"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "9fdf1743-a601-4107-b2b4-5746d418153f",
                  "type": "has_only_phrase",
                  "uuid": "9e68d239-5d50-4868-a689-619cac9bbb3a"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "9fdf1743-a601-4107-b2b4-5746d418153f",
                  "type": "has_only_phrase",
                  "uuid": "0cb41ff6-0d8e-4caf-8e0c-48592ea01743"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "9fdf1743-a601-4107-b2b4-5746d418153f",
                  "type": "has_only_phrase",
                  "uuid": "74d14222-8714-4d45-9387-3a6a76f61e7d"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "9fdf1743-a601-4107-b2b4-5746d418153f",
                  "type": "has_only_phrase",
                  "uuid": "d00d583c-99d2-43ee-93dd-12f822146179"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ff902138-ca96-4f31-b083-5cd8f568bdb1",
                  "name": "All Responses",
                  "uuid": "94dadc2c-77f6-468d-a6c5-a9010ff87cec"
                },
                {
                  "exit_uuid": "efe2fc73-c0a0-4812-b9d6-18e1e3b09fdf",
                  "name": "0;1",
                  "uuid": "540d5303-6f0e-4d00-8037-379fed928beb"
                },
                {
                  "exit_uuid": "fbe54146-31d0-442b-bd8a-5e5e9ad06eb6",
                  "name": "2;3;4;5;6;7",
                  "uuid": "9fdf1743-a601-4107-b2b4-5746d418153f"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "ff902138-ca96-4f31-b083-5cd8f568bdb1",
                "destination_uuid": null
              },
              {
                "uuid": "efe2fc73-c0a0-4812-b9d6-18e1e3b09fdf",
                "destination_uuid": "dbe1b33a-bbc1-4034-a61d-0e5d00e272d1"
              },
              {
                "uuid": "fbe54146-31d0-442b-bd8a-5e5e9ad06eb6",
                "destination_uuid": "cb53ed71-6093-4409-a12d-b666e2a05ef0"
              }
            ]
          },
          {
            "uuid": "dbe1b33a-bbc1-4034-a61d-0e5d00e272d1",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "b6a21c1f-d93d-48c3-b554-0feb45ef0656"
              }
            ],
            "exits": [
              {
                "uuid": "43b2e8c5-e424-480c-93c2-99be4ed4cfcc",
                "destination_uuid": "d576ee83-b971-42a8-88cc-f564e61b125f"
              }
            ]
          },
          {
            "uuid": "cb53ed71-6093-4409-a12d-b666e2a05ef0",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6d0c6d70-7b16-4492-87bc-ffab4da0c185"
              }
            ],
            "exits": [
              {
                "uuid": "fd3611f5-475e-44ef-8b5c-d9fa381bae49",
                "destination_uuid": "d576ee83-b971-42a8-88cc-f564e61b125f"
              }
            ]
          },
          {
            "uuid": "d576ee83-b971-42a8-88cc-f564e61b125f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fc27ae68-bcb9-439e-8a70-4632bb4c215f",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "a19401b3-b424-436e-925a-3b9768558f4e",
                  "type": "has_only_phrase",
                  "uuid": "cabc494b-5260-4f4d-8621-dfd8805c27a9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "98e0a5eb-ddaf-4c98-a3e2-74fd6b4fa68a",
                  "name": "All Responses",
                  "uuid": "fc27ae68-bcb9-439e-8a70-4632bb4c215f"
                },
                {
                  "exit_uuid": "20cc86bc-6e70-4b29-9bfd-b206c835d004",
                  "name": "Next",
                  "uuid": "a19401b3-b424-436e-925a-3b9768558f4e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "98e0a5eb-ddaf-4c98-a3e2-74fd6b4fa68a",
                "destination_uuid": null
              },
              {
                "uuid": "20cc86bc-6e70-4b29-9bfd-b206c835d004",
                "destination_uuid": "04590890-8276-4e99-8004-d380f1fae69d"
              }
            ]
          },
          {
            "uuid": "04590890-8276-4e99-8004-d380f1fae69d",
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
                "uuid": "ea0b4fd3-c521-4db5-8c08-66fba6590780"
              }
            ],
            "exits": [
              {
                "uuid": "19420eee-6db8-4478-8297-3e4c656c12a3",
                "destination_uuid": "441bb24a-57f6-4171-aab6-63b3ecfae88f"
              }
            ]
          },
          {
            "uuid": "441bb24a-57f6-4171-aab6-63b3ecfae88f",
            "actions": [],
            "exits": [
              {
                "uuid": "9f87f2fa-0850-49bc-bb01-fb9387ee1c13",
                "destination_uuid": "9f45829a-8a1b-4292-8910-6036a720e1cd"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f907ffc0-81ba-46a1-b929-eb080774dcb0",
              "cases": [],
              "categories": [
                {
                  "uuid": "f907ffc0-81ba-46a1-b929-eb080774dcb0",
                  "name": "All Responses",
                  "exit_uuid": "9f87f2fa-0850-49bc-bb01-fb9387ee1c13"
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
            "uuid": "9f45829a-8a1b-4292-8910-6036a720e1cd",
            "actions": [
              {
                "uuid": "2110f244-a820-4dee-9765-3b5eea754d40",
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
                "uuid": "2fc9833a-445b-40cf-9e52-8eec9dc9471c",
                "destination_uuid": "92eb51b8-9372-483d-abd9-b58eaca45a4d"
              }
            ]
          },
          {
            "uuid": "c1a10353-d6c2-4d13-8340-bb771853923a",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "305d7cd3-aa6e-4a71-8af7-b042a75a8485"
              }
            ],
            "exits": [
              {
                "uuid": "011116c7-461f-4a91-b888-d73ed22d55f2",
                "destination_uuid": "bdd5be22-f1c2-45bf-81f3-fd2cc549e6ac"
              }
            ]
          },
          {
            "uuid": "92eb51b8-9372-483d-abd9-b58eaca45a4d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "da90c881-79c6-4d33-b529-f5c3cd03d4f7",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "61ab1e95-e4e2-4598-84d7-fe34c624b16d",
                  "type": "has_only_phrase",
                  "uuid": "e36d1924-9cf3-4f59-8477-dd4fba750d0d"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "61ab1e95-e4e2-4598-84d7-fe34c624b16d",
                  "type": "has_only_phrase",
                  "uuid": "ea045069-5468-4071-a6f3-7ae5099840d3"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "61ab1e95-e4e2-4598-84d7-fe34c624b16d",
                  "type": "has_only_phrase",
                  "uuid": "a6e4e4d9-21f6-4c86-b0a4-3d99f91b00b2"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "61ab1e95-e4e2-4598-84d7-fe34c624b16d",
                  "type": "has_only_phrase",
                  "uuid": "1236c98e-9d00-47bf-b2b4-84b7b22f11ae"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "61ab1e95-e4e2-4598-84d7-fe34c624b16d",
                  "type": "has_only_phrase",
                  "uuid": "62278ff0-37a9-4376-a100-2e0ba4ffe6e7"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "61ab1e95-e4e2-4598-84d7-fe34c624b16d",
                  "type": "has_only_phrase",
                  "uuid": "25da2664-ad68-4298-9478-9e7d7f2adc74"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "61ab1e95-e4e2-4598-84d7-fe34c624b16d",
                  "type": "has_only_phrase",
                  "uuid": "91e40ce7-c505-448e-83e0-d93433b61b96"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3d0a74a3-25de-4e73-84ae-e8528057c06d",
                  "name": "All Responses",
                  "uuid": "da90c881-79c6-4d33-b529-f5c3cd03d4f7"
                },
                {
                  "exit_uuid": "f00bca1e-78d1-4ab3-85b4-f5e52d1af34c",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "61ab1e95-e4e2-4598-84d7-fe34c624b16d"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "3d0a74a3-25de-4e73-84ae-e8528057c06d",
                "destination_uuid": "c1a10353-d6c2-4d13-8340-bb771853923a"
              },
              {
                "uuid": "f00bca1e-78d1-4ab3-85b4-f5e52d1af34c",
                "destination_uuid": "83a18e49-9713-4188-ba09-bb2129e128eb"
              }
            ]
          },
          {
            "uuid": "83a18e49-9713-4188-ba09-bb2129e128eb",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "94a45a48-5d73-49dc-8d2a-910679d9d7c7"
              }
            ],
            "exits": [
              {
                "uuid": "9cfea846-3499-491b-a96e-185bc4e3ea58",
                "destination_uuid": "bdd5be22-f1c2-45bf-81f3-fd2cc549e6ac"
              }
            ]
          },
          {
            "uuid": "bdd5be22-f1c2-45bf-81f3-fd2cc549e6ac",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2643444c-bbeb-4e89-ac9e-8654cdf3491a",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "97eb28c3-7809-4847-bcc0-010fbfb254fb",
                  "type": "has_only_phrase",
                  "uuid": "69c4cf8f-0421-465c-87d2-58cd8ea2e0f9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3b8da565-7382-4dfb-8d69-ccd1106a5684",
                  "name": "All Responses",
                  "uuid": "2643444c-bbeb-4e89-ac9e-8654cdf3491a"
                },
                {
                  "exit_uuid": "5765dc5d-36f4-447f-9978-7e8255b995ef",
                  "name": "Next",
                  "uuid": "97eb28c3-7809-4847-bcc0-010fbfb254fb"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3b8da565-7382-4dfb-8d69-ccd1106a5684",
                "destination_uuid": null
              },
              {
                "uuid": "5765dc5d-36f4-447f-9978-7e8255b995ef",
                "destination_uuid": "20aafcfd-e7ec-4ff0-9600-b5132335c68b"
              }
            ]
          },
          {
            "uuid": "20aafcfd-e7ec-4ff0-9600-b5132335c68b",
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
                "uuid": "1282e35c-25f9-4481-9df1-aab54ade15a2"
              }
            ],
            "exits": [
              {
                "uuid": "d7ad424c-3065-42c0-bedc-b3646371dde9",
                "destination_uuid": "22bf5abe-8af5-42bd-a7cc-4b38448905e9"
              }
            ]
          },
          {
            "uuid": "22bf5abe-8af5-42bd-a7cc-4b38448905e9",
            "actions": [],
            "exits": [
              {
                "uuid": "0f0a1c5b-bffe-4e39-8b87-e7d1a66a70b3",
                "destination_uuid": "024f9b26-3f48-4ac0-bdd4-1f6657094eaf"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "41f877c1-6cc7-4a9a-ad72-bb0c78543a7c",
              "cases": [],
              "categories": [
                {
                  "uuid": "41f877c1-6cc7-4a9a-ad72-bb0c78543a7c",
                  "name": "All Responses",
                  "exit_uuid": "0f0a1c5b-bffe-4e39-8b87-e7d1a66a70b3"
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
            "uuid": "024f9b26-3f48-4ac0-bdd4-1f6657094eaf",
            "actions": [
              {
                "uuid": "81bd3c1f-7cb4-438a-8374-5e6b969f41f1",
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
                "uuid": "399c5d07-ac5c-42ba-9836-03ad2c182c10",
                "destination_uuid": "dc388f97-5ed0-431f-b625-57b0910a1214"
              }
            ]
          },
          {
            "uuid": "dc388f97-5ed0-431f-b625-57b0910a1214",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "91ec2fce-b750-4dbc-b694-d264fadfb7de",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "c856fa5a-cccc-4cdc-81d2-ccc111adb9f3",
                  "type": "has_only_phrase",
                  "uuid": "6d99c670-4f07-476d-b863-100218a89a4d"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "c856fa5a-cccc-4cdc-81d2-ccc111adb9f3",
                  "type": "has_only_phrase",
                  "uuid": "4844dab2-7263-4575-bbd2-4f904a258c0c"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "c856fa5a-cccc-4cdc-81d2-ccc111adb9f3",
                  "type": "has_only_phrase",
                  "uuid": "59ad2e22-95e7-4da6-8b85-a30471accf2c"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "c856fa5a-cccc-4cdc-81d2-ccc111adb9f3",
                  "type": "has_only_phrase",
                  "uuid": "8005becc-87fc-4fb2-9e8e-f935d9b2c4ae"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "c856fa5a-cccc-4cdc-81d2-ccc111adb9f3",
                  "type": "has_only_phrase",
                  "uuid": "5d040e2b-426f-4486-b06e-ffb3e120aeaf"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "1bfb18f5-25ef-4d93-903b-749eac25d7ac",
                  "type": "has_only_phrase",
                  "uuid": "ae00386e-1750-4bcd-8604-6346365208af"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "1bfb18f5-25ef-4d93-903b-749eac25d7ac",
                  "type": "has_only_phrase",
                  "uuid": "833a1992-c620-41d3-8ee6-b50f4cc00c6b"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "1bfb18f5-25ef-4d93-903b-749eac25d7ac",
                  "type": "has_only_phrase",
                  "uuid": "59447e0a-8d59-43ba-b6ca-cf11a95bfe57"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "1bfb18f5-25ef-4d93-903b-749eac25d7ac",
                  "type": "has_only_phrase",
                  "uuid": "014cfafa-fc48-4105-b8cf-866539ffa78f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "818d4a25-516e-4200-926d-f99e2b413a8b",
                  "name": "All Responses",
                  "uuid": "91ec2fce-b750-4dbc-b694-d264fadfb7de"
                },
                {
                  "exit_uuid": "db382a48-3525-4f3f-91a5-eea5fc6f2229",
                  "name": "0;1;2;3;4",
                  "uuid": "c856fa5a-cccc-4cdc-81d2-ccc111adb9f3"
                },
                {
                  "exit_uuid": "214189ef-c6b2-4745-8564-4ba1984f5c9f",
                  "name": "5;6;7;8",
                  "uuid": "1bfb18f5-25ef-4d93-903b-749eac25d7ac"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "818d4a25-516e-4200-926d-f99e2b413a8b",
                "destination_uuid": null
              },
              {
                "uuid": "db382a48-3525-4f3f-91a5-eea5fc6f2229",
                "destination_uuid": "dc7c96e6-2885-4658-8b86-b28389e07fbc"
              },
              {
                "uuid": "214189ef-c6b2-4745-8564-4ba1984f5c9f",
                "destination_uuid": "27a4b252-aa46-4f87-8d68-ea002401d199"
              }
            ]
          },
          {
            "uuid": "dc7c96e6-2885-4658-8b86-b28389e07fbc",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6718d759-eed7-4ef8-b60c-1abd2aaa7471"
              }
            ],
            "exits": [
              {
                "uuid": "a023d2dc-051e-4397-9a94-e6ab059340f6",
                "destination_uuid": "d20aaef9-7ab0-4410-8a4d-3d14bc586c87"
              }
            ]
          },
          {
            "uuid": "27a4b252-aa46-4f87-8d68-ea002401d199",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "7f1813cc-134f-40db-b58a-463dd4d071ac"
              }
            ],
            "exits": [
              {
                "uuid": "1958d696-62dc-41fd-9508-303c40515335",
                "destination_uuid": "d20aaef9-7ab0-4410-8a4d-3d14bc586c87"
              }
            ]
          },
          {
            "uuid": "d20aaef9-7ab0-4410-8a4d-3d14bc586c87",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0732ee98-b4b0-4e98-b4a3-71b831cb7b9d",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "2425837b-5739-401b-9500-e9a167c5757c",
                  "type": "has_only_phrase",
                  "uuid": "595fb7f7-eee5-4fa7-b99d-fedef36fea64"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "aa817176-63ae-4803-8cd1-52cb6ef41a8d",
                  "name": "All Responses",
                  "uuid": "0732ee98-b4b0-4e98-b4a3-71b831cb7b9d"
                },
                {
                  "exit_uuid": "d731ed72-2bd0-4e27-a55c-22354ffd2f22",
                  "name": "Next",
                  "uuid": "2425837b-5739-401b-9500-e9a167c5757c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "aa817176-63ae-4803-8cd1-52cb6ef41a8d",
                "destination_uuid": null
              },
              {
                "uuid": "d731ed72-2bd0-4e27-a55c-22354ffd2f22",
                "destination_uuid": "0a307cdb-32f1-476b-bf9a-53bcfd8403e6"
              }
            ]
          },
          {
            "uuid": "0a307cdb-32f1-476b-bf9a-53bcfd8403e6",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "9da8bb42-eda9-435f-9af8-4fd20d7c02b2"
              }
            ],
            "exits": [
              {
                "uuid": "2785159a-8770-4a34-aef7-cf6f0e0b7dce",
                "destination_uuid": "27c2095a-0d5f-48ec-976b-50b17f5bc81c"
              }
            ]
          },
          {
            "uuid": "27c2095a-0d5f-48ec-976b-50b17f5bc81c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e823d0b0-ac86-494d-82b9-50028be1dcbd",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9e8393c6-ed8f-4b21-a32d-4cb58ee313ba",
                  "type": "has_only_phrase",
                  "uuid": "ff303d74-edb5-4bb6-93e3-a640bd6c952d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "017316fa-8062-49f0-8300-ab2502932322",
                  "name": "All Responses",
                  "uuid": "e823d0b0-ac86-494d-82b9-50028be1dcbd"
                },
                {
                  "exit_uuid": "b0c7aa59-5663-4263-a7eb-08011914d860",
                  "name": "Next",
                  "uuid": "9e8393c6-ed8f-4b21-a32d-4cb58ee313ba"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "017316fa-8062-49f0-8300-ab2502932322",
                "destination_uuid": null
              },
              {
                "uuid": "b0c7aa59-5663-4263-a7eb-08011914d860",
                "destination_uuid": "bd0963f4-a2eb-41d5-a5e3-7280b4d66bcf"
              }
            ]
          },
          {
            "uuid": "bd0963f4-a2eb-41d5-a5e3-7280b4d66bcf",
            "actions": [
              {
                "uuid": "282f10b3-7b96-4e28-882c-ee502a40c3d1",
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
                "uuid": "a89940ad-5266-4f60-9a17-7408a539b8c6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d3aa1bb0-9450-413d-92ba-b6be530b8d95",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7ceb0127-1df3-4002-af43-a685ba8b62eb",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "e41daa85-d768-496f-8e38-714d7d2a2b89"
              }
            ],
            "exits": [
              {
                "uuid": "30a7526f-0561-4253-8963-7ef2ca1a98ae",
                "destination_uuid": "39f96b40-455e-4bff-985e-d28f5c26c1a0"
              }
            ]
          },
          {
            "uuid": "39f96b40-455e-4bff-985e-d28f5c26c1a0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8ea2c2c4-874b-4ca0-8dd3-c587237562e9",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "0fe431fe-6b8b-435d-8fb6-c271eedbbb1e",
                  "type": "has_only_phrase",
                  "uuid": "fb99e08d-ccbc-4ea5-b8f8-b608ef069e35"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "94602db4-ca28-4245-a3e8-c45869ebe40d",
                  "name": "All Responses",
                  "uuid": "8ea2c2c4-874b-4ca0-8dd3-c587237562e9"
                },
                {
                  "exit_uuid": "a46bb6f5-ab60-462d-8fd8-c62ae8ee0a0e",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "0fe431fe-6b8b-435d-8fb6-c271eedbbb1e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "94602db4-ca28-4245-a3e8-c45869ebe40d",
                "destination_uuid": null
              },
              {
                "uuid": "a46bb6f5-ab60-462d-8fd8-c62ae8ee0a0e",
                "destination_uuid": "89856ca0-d374-4b46-a12f-9d3493bd830e"
              }
            ]
          },
          {
            "uuid": "89856ca0-d374-4b46-a12f-9d3493bd830e",
            "actions": [
              {
                "uuid": "cf6a4d34-2c0b-43ad-8fc7-ad67c58690b1",
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
                "uuid": "ebaf08ff-23d6-42b7-83c7-8df037e37329",
                "destination_uuid": "add72aba-0441-4fb8-bab3-ba166d91e813"
              }
            ]
          },
          {
            "uuid": "add72aba-0441-4fb8-bab3-ba166d91e813",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "a0a4e21b-3761-4249-afed-d3a92fcd407d"
                },
                "type": "enter_flow",
                "uuid": "9e5bc800-9831-4f29-bcc6-b4f27f1cc15e"
              }
            ],
            "exits": [
              {
                "uuid": "ee753c94-3ed6-489c-bafa-99c91149efcc",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "2ae93e5d-a284-465d-aa0b-af07b2cd4328",
            "actions": [
              {
                "uuid": "0fbafb74-f7b9-4ca9-902e-7e0aef1d03d0",
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
                "uuid": "6a8c9db2-bc0e-4cd2-9d74-7d1c4f4a88da",
                "destination_uuid": "b238c6c2-0605-451a-aa57-5bd3aecf1d1d"
              }
            ]
          },
          {
            "uuid": "b238c6c2-0605-451a-aa57-5bd3aecf1d1d",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "a12ccd46-4470-4828-bebb-c434ee9db8e3"
                },
                "type": "enter_flow",
                "uuid": "e1e18991-681b-4fd9-b941-db5c307aa302"
              }
            ],
            "exits": [
              {
                "uuid": "5a61a179-26a9-4dad-bbb6-03e6e64cb38f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ed5b381a-e3e1-4cd7-9deb-1859ac256664",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "18c29c48-6cf5-48a7-82cf-3061d7965a98",
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
                "uuid": "3f859eb6-dda8-4132-8d6d-436127462aba"
              }
            ],
            "exits": [
              {
                "uuid": "9a6fff83-9912-4a10-9cc5-d8ee233b746c",
                "destination_uuid": "05349121-8a50-4b84-8657-776401f90411"
              }
            ]
          },
          {
            "uuid": "05349121-8a50-4b84-8657-776401f90411",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b2b80b6c-2347-408e-bec7-1d711ca2c5e1",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "bd84878c-04d3-4f84-9e92-6e3a3f7c4671",
                  "type": "has_only_phrase",
                  "uuid": "7225b16a-6a76-4533-bbda-5bb759a9d9de"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "04ee73a6-fe28-4167-902f-ad3de39ce452",
                  "type": "has_only_phrase",
                  "uuid": "afa37152-d3cc-4a14-89cd-0a86abaac768"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "04ee73a6-fe28-4167-902f-ad3de39ce452",
                  "type": "has_only_phrase",
                  "uuid": "aed40c8f-ab63-4690-a931-7626c35921e9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "db8a57b3-47ab-4f8f-9cdc-098966204cdf",
                  "name": "All Responses",
                  "uuid": "b2b80b6c-2347-408e-bec7-1d711ca2c5e1"
                },
                {
                  "exit_uuid": "344b92ff-48da-4b8d-a456-4114d3610c4a",
                  "name": "Happy",
                  "uuid": "bd84878c-04d3-4f84-9e92-6e3a3f7c4671"
                },
                {
                  "exit_uuid": "1e486eed-3aa4-4b59-8d66-fd0fe24ffe8c",
                  "name": "Neutral; Sad",
                  "uuid": "04ee73a6-fe28-4167-902f-ad3de39ce452"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "db8a57b3-47ab-4f8f-9cdc-098966204cdf",
                "destination_uuid": null
              },
              {
                "uuid": "344b92ff-48da-4b8d-a456-4114d3610c4a",
                "destination_uuid": "8067684c-fde8-4ba1-870b-4e7a6d752d35"
              },
              {
                "uuid": "1e486eed-3aa4-4b59-8d66-fd0fe24ffe8c",
                "destination_uuid": "303619fa-5fdf-4e35-9556-de74460b805c"
              }
            ]
          },
          {
            "uuid": "8067684c-fde8-4ba1-870b-4e7a6d752d35",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "a4f18892-3dbc-4a4a-8ceb-c24927f80803"
              }
            ],
            "exits": [
              {
                "uuid": "eb0bc6f7-1616-4e2a-8ae0-c371b90388f4",
                "destination_uuid": "703969f5-45cc-4720-8e02-63f044aee7c3"
              }
            ]
          },
          {
            "uuid": "303619fa-5fdf-4e35-9556-de74460b805c",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9d4fcb1d-0994-43a8-9ce6-c31b90a70f36"
              }
            ],
            "exits": [
              {
                "uuid": "a9db1cee-be0e-409b-aafc-1e96d6f6201d",
                "destination_uuid": "d6e5ba49-8569-4744-8cd0-38c4187495df"
              }
            ]
          },
          {
            "uuid": "d6e5ba49-8569-4744-8cd0-38c4187495df",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "566f0fbe-99ac-4d2b-b9e8-9634af3d7eaf"
              }
            ],
            "exits": [
              {
                "uuid": "3522ec1b-b613-44c2-ac44-e6db504165e9",
                "destination_uuid": "2968564a-52a6-483c-b539-4d87631bba49"
              }
            ]
          },
          {
            "uuid": "2968564a-52a6-483c-b539-4d87631bba49",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "999795e5-474f-4752-9a23-be8a9783d497",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "c07938e4-03c4-4891-be7a-bad584d6c45a",
                  "type": "has_only_phrase",
                  "uuid": "5f8a3c13-6202-4108-95b0-90fe2fac1487"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "4249ea4d-f2f3-4a6d-a3d3-aed386a88d16",
                  "type": "has_only_phrase",
                  "uuid": "3597225f-da65-4fe4-ba0c-ef06e3483fb7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "08003be0-7b66-4c7c-938b-0df290fa388f",
                  "name": "All Responses",
                  "uuid": "999795e5-474f-4752-9a23-be8a9783d497"
                },
                {
                  "exit_uuid": "38119356-3f72-4fcc-add4-b3b6e3df78e5",
                  "name": "Yes",
                  "uuid": "c07938e4-03c4-4891-be7a-bad584d6c45a"
                },
                {
                  "exit_uuid": "b11c1fd9-bed1-4f98-b2d2-c3b171655f32",
                  "name": "No",
                  "uuid": "4249ea4d-f2f3-4a6d-a3d3-aed386a88d16"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "08003be0-7b66-4c7c-938b-0df290fa388f",
                "destination_uuid": null
              },
              {
                "uuid": "38119356-3f72-4fcc-add4-b3b6e3df78e5",
                "destination_uuid": "fccfc7e0-1b08-484b-9157-b4f486c6bbe6"
              },
              {
                "uuid": "b11c1fd9-bed1-4f98-b2d2-c3b171655f32",
                "destination_uuid": "f0a39050-c168-4425-b820-8a2099bf72dc"
              }
            ]
          },
          {
            "uuid": "fccfc7e0-1b08-484b-9157-b4f486c6bbe6",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "941f76a8-445e-4d16-907c-cd51450b92ed"
                },
                "type": "enter_flow",
                "uuid": "637dcf98-d262-4817-ae0e-16e2f1a9bd6c"
              }
            ],
            "exits": [
              {
                "uuid": "e30ac106-bdbc-4032-8f0a-3d9c5b295570",
                "destination_uuid": "a6ca02dd-8459-462e-9dc0-7ba32335fc37"
              },
              {
                "uuid": "7a6ab0b9-1c11-4d0c-9479-e0f830a7c651",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "21f46ef4-e37b-4b13-9814-fd8b7a581608",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "60e1b4db-d964-4565-a329-f8b2f7e13ac0"
                },
                {
                  "uuid": "8af9e849-3de8-4b75-873d-40e9aad4b446",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "1f85c19e-fe29-47c2-b328-83cbb779ae21"
                }
              ],
              "categories": [
                {
                  "uuid": "60e1b4db-d964-4565-a329-f8b2f7e13ac0",
                  "name": "Complete",
                  "exit_uuid": "e30ac106-bdbc-4032-8f0a-3d9c5b295570"
                },
                {
                  "uuid": "1f85c19e-fe29-47c2-b328-83cbb779ae21",
                  "name": "Expired",
                  "exit_uuid": "7a6ab0b9-1c11-4d0c-9479-e0f830a7c651"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "60e1b4db-d964-4565-a329-f8b2f7e13ac0"
            }
          },
          {
            "uuid": "a6ca02dd-8459-462e-9dc0-7ba32335fc37",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bbd400ac-176c-4d12-944a-a605b4e4421d"
              }
            ],
            "exits": [
              {
                "uuid": "1a06830d-656f-4bc1-8490-ea63a0304374",
                "destination_uuid": "7213dd53-5002-4aec-b7d5-859f8a901e33"
              }
            ]
          },
          {
            "uuid": "7213dd53-5002-4aec-b7d5-859f8a901e33",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "438d1160-c20e-46da-87fa-276f1f6c83be"
              }
            ],
            "exits": [
              {
                "uuid": "2e0ba6cd-3376-4e01-bc0a-53abc215f299",
                "destination_uuid": "703969f5-45cc-4720-8e02-63f044aee7c3"
              }
            ]
          },
          {
            "uuid": "f0a39050-c168-4425-b820-8a2099bf72dc",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "848e008a-0032-45f1-a5af-c7e7007f0847"
              }
            ],
            "exits": [
              {
                "uuid": "c51404ac-6167-4cb6-8bd6-24909971baea",
                "destination_uuid": "703969f5-45cc-4720-8e02-63f044aee7c3"
              }
            ]
          },
          {
            "uuid": "703969f5-45cc-4720-8e02-63f044aee7c3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "460fdb7b-dde1-4841-84fc-537bc8bc1135",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "22661ee9-e9df-4b7b-a268-0c1b9dfb6cfb",
                  "type": "has_only_phrase",
                  "uuid": "5d5900a3-8d5e-47bf-803d-05b31d07ac1f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "158e3dc7-bf45-44c9-97a1-ea48c36b9d93",
                  "name": "All Responses",
                  "uuid": "460fdb7b-dde1-4841-84fc-537bc8bc1135"
                },
                {
                  "exit_uuid": "d342b6bb-5ef8-4474-985c-307d582817c5",
                  "name": "Chat to @fields.elder",
                  "uuid": "22661ee9-e9df-4b7b-a268-0c1b9dfb6cfb"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "158e3dc7-bf45-44c9-97a1-ea48c36b9d93",
                "destination_uuid": null
              },
              {
                "uuid": "d342b6bb-5ef8-4474-985c-307d582817c5",
                "destination_uuid": "6764f16f-26f7-4181-83cb-0803dbd7315a"
              }
            ]
          },
          {
            "uuid": "6764f16f-26f7-4181-83cb-0803dbd7315a",
            "actions": [
              {
                "uuid": "144dbcdf-1c09-4044-98e5-51e4f32400de",
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
                "uuid": "a78f85a5-3554-472f-ac6c-8c3146748766",
                "destination_uuid": "28b6ff00-2651-4f63-aeb9-b41e2384d0cf"
              }
            ]
          },
          {
            "uuid": "28b6ff00-2651-4f63-aeb9-b41e2384d0cf",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "3815bee2-7f9e-4fed-81ec-3a7e62031bc9"
                },
                "type": "enter_flow",
                "uuid": "64723f3d-b60c-4a5b-ad97-831efdd0f1d7"
              }
            ],
            "exits": [
              {
                "uuid": "2f84752c-7c57-4ffc-ab05-d8072e0ac25a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ae4cfe63-9ce0-4859-b01c-d40f9fefb0fc",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "26c3811c-8485-4e6d-9b21-43355363fb1a",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d4604a42-b670-45dc-a926-934d91223bb6"
              }
            ],
            "exits": [
              {
                "uuid": "bd0c72ac-cffc-420c-b0c8-9b6fc7772d3e",
                "destination_uuid": "47695068-5a8a-42a5-8742-bb8bc053992b"
              }
            ]
          },
          {
            "uuid": "47695068-5a8a-42a5-8742-bb8bc053992b",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d6930952-3850-4189-89c4-1985ffb36392"
              }
            ],
            "exits": [
              {
                "uuid": "a19271de-9439-4398-b959-5d8753bb5ca7",
                "destination_uuid": "2d91b17b-ed4a-47c2-b612-071d75fb29d4"
              }
            ]
          },
          {
            "uuid": "2d91b17b-ed4a-47c2-b612-071d75fb29d4",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "84b65aff-860f-4be9-88e6-35adbca6395a"
              }
            ],
            "exits": [
              {
                "uuid": "ff2ca2cc-ca25-4430-b599-0d72dc470d2f",
                "destination_uuid": "0e59c92f-3dec-4530-90d4-d6bd56a92c1a"
              }
            ]
          },
          {
            "uuid": "0e59c92f-3dec-4530-90d4-d6bd56a92c1a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6e2d0c76-d0ff-4b8e-8528-00f1d3da7ecc",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "3e262ebc-d108-4a5c-a136-6f17487351d1",
                  "type": "has_only_phrase",
                  "uuid": "33e39eea-295c-4a6e-8caf-14e6f74e16cb"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "238f5bd4-614b-4f9a-a128-3cb849d3d7ec",
                  "type": "has_only_phrase",
                  "uuid": "162c83eb-1c3f-49cd-a824-23e9030604e8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "229b14be-3589-4f31-9d16-89a5a7ea6c72",
                  "name": "All Responses",
                  "uuid": "6e2d0c76-d0ff-4b8e-8528-00f1d3da7ecc"
                },
                {
                  "exit_uuid": "c3474124-7299-499c-96fa-5164a0bb4d24",
                  "name": "Yes",
                  "uuid": "3e262ebc-d108-4a5c-a136-6f17487351d1"
                },
                {
                  "exit_uuid": "917e7671-5ed7-41a2-a751-0be55a83fb40",
                  "name": "No",
                  "uuid": "238f5bd4-614b-4f9a-a128-3cb849d3d7ec"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "229b14be-3589-4f31-9d16-89a5a7ea6c72",
                "destination_uuid": null
              },
              {
                "uuid": "c3474124-7299-499c-96fa-5164a0bb4d24",
                "destination_uuid": "593da526-12cd-452f-81b9-d529f18678b5"
              },
              {
                "uuid": "917e7671-5ed7-41a2-a751-0be55a83fb40",
                "destination_uuid": "dcaac24b-951f-4e38-b38f-b82b949ecdf7"
              }
            ]
          },
          {
            "uuid": "593da526-12cd-452f-81b9-d529f18678b5",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "db9ddff5-3fac-4641-80f0-61b3ba923613"
              }
            ],
            "exits": [
              {
                "uuid": "a7dee1c8-71f7-4266-b15f-655e2684b42c",
                "destination_uuid": "9456a227-30ef-4f59-a1e4-6d0e0c6077d1"
              }
            ]
          },
          {
            "uuid": "dcaac24b-951f-4e38-b38f-b82b949ecdf7",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6c2dc21e-e46c-4b0b-b4bf-b2b2387f68fb"
              }
            ],
            "exits": [
              {
                "uuid": "df487299-c4a5-4e07-9bd5-aa6a20986f0c",
                "destination_uuid": "9456a227-30ef-4f59-a1e4-6d0e0c6077d1"
              }
            ]
          },
          {
            "uuid": "9456a227-30ef-4f59-a1e4-6d0e0c6077d1",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9a24e24d-7c46-40cb-b2c6-3cd344e9bf26"
              }
            ],
            "exits": [
              {
                "uuid": "83e56096-9e6c-4d5d-b99b-ab45f9433d69",
                "destination_uuid": "36f2703e-b1c7-4aa2-acf8-8e9161d500df"
              }
            ]
          },
          {
            "uuid": "36f2703e-b1c7-4aa2-acf8-8e9161d500df",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "797e6ddd-0ae3-4b1f-98f7-990e2f29dd76"
              }
            ],
            "exits": [
              {
                "uuid": "e807195e-4635-4afe-ad17-35a33423cc1e",
                "destination_uuid": "5cf418e9-f3a4-4129-a0ec-965eba10de25"
              }
            ]
          },
          {
            "uuid": "5cf418e9-f3a4-4129-a0ec-965eba10de25",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8f0127e5-4006-4c1d-9616-29499ed3926a",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "b529be0d-e853-491b-a6c8-25f9b0e2c9c2",
                  "type": "has_only_phrase",
                  "uuid": "83d54894-dd64-47a8-8ee0-a67fbb49ae9e"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "73723e07-e54e-429b-9a3b-356e7b49b4e2",
                  "type": "has_only_phrase",
                  "uuid": "da89a970-7a30-46a8-8220-c637e75eebee"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d869dbea-c14f-4b07-a9ec-eed14259d290",
                  "name": "All Responses",
                  "uuid": "8f0127e5-4006-4c1d-9616-29499ed3926a"
                },
                {
                  "exit_uuid": "ac1e1fdc-3b65-4696-a647-ead5701e6314",
                  "name": "Yes",
                  "uuid": "b529be0d-e853-491b-a6c8-25f9b0e2c9c2"
                },
                {
                  "exit_uuid": "8f1d7ee3-c548-4ed1-9a07-77ff0e2a4259",
                  "name": "Later",
                  "uuid": "73723e07-e54e-429b-9a3b-356e7b49b4e2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d869dbea-c14f-4b07-a9ec-eed14259d290",
                "destination_uuid": null
              },
              {
                "uuid": "ac1e1fdc-3b65-4696-a647-ead5701e6314",
                "destination_uuid": "3e59fd80-c214-4077-b904-6c8a6f67af5e"
              },
              {
                "uuid": "8f1d7ee3-c548-4ed1-9a07-77ff0e2a4259",
                "destination_uuid": "95a27d3a-5ce8-401b-a034-07f6c8411a19"
              }
            ]
          },
          {
            "uuid": "3e59fd80-c214-4077-b904-6c8a6f67af5e",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "a35486fa-b4d0-455e-a114-a744923fa6c9"
              }
            ],
            "exits": [
              {
                "uuid": "c72eb703-1802-4232-8e6c-4438f972562d",
                "destination_uuid": "abc6cffe-f96a-4cbf-ab8f-d3376c011f13"
              }
            ]
          },
          {
            "uuid": "abc6cffe-f96a-4cbf-ab8f-d3376c011f13",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5e312b5e-51a9-4c3e-b475-031f1166b623",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "4609b1c1-868a-4d71-ab28-1fe096911660",
                  "type": "has_only_phrase",
                  "uuid": "08648b03-6972-4ff9-ac61-856448ab6c44"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "07389eac-2003-4643-b8be-d01cb15e8f49",
                  "name": "All Responses",
                  "uuid": "5e312b5e-51a9-4c3e-b475-031f1166b623"
                },
                {
                  "exit_uuid": "1a31acf7-3809-4ee9-8ce7-f4e9e8a47ecc",
                  "name": "Take me to Tips",
                  "uuid": "4609b1c1-868a-4d71-ab28-1fe096911660"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "07389eac-2003-4643-b8be-d01cb15e8f49",
                "destination_uuid": null
              },
              {
                "uuid": "1a31acf7-3809-4ee9-8ce7-f4e9e8a47ecc",
                "destination_uuid": "27fd8fbb-09fe-4dd4-8668-b7dc9a606551"
              }
            ]
          },
          {
            "uuid": "27fd8fbb-09fe-4dd4-8668-b7dc9a606551",
            "actions": [
              {
                "uuid": "a617a1d5-eaf2-4912-b5c8-97648c5fcf7f",
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
                "uuid": "3e945501-010c-4c84-ac9b-ebd4c77f4b37",
                "destination_uuid": "41080c1a-6708-4f91-b3da-fedae878805c"
              }
            ]
          },
          {
            "uuid": "41080c1a-6708-4f91-b3da-fedae878805c",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "44873249-67c3-467d-8033-17b88e511395"
                },
                "type": "enter_flow",
                "uuid": "b5c165fe-cbc7-487c-b3cf-a0b703394b72"
              }
            ],
            "exits": [
              {
                "uuid": "5bbae769-e81b-44fb-8c1b-6c8d0a99b531",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "95a27d3a-5ce8-401b-a034-07f6c8411a19",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "c81b38f0-6e43-4a42-a21b-62d21d399c30"
              }
            ],
            "exits": [
              {
                "uuid": "58e10d48-9007-40c4-819b-e73b0a4df7b4",
                "destination_uuid": "91a60dd3-2105-4c5d-ad4a-e66156268a32"
              }
            ]
          },
          {
            "uuid": "91a60dd3-2105-4c5d-ad4a-e66156268a32",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7724a3bc-0e07-4e7b-a562-abbebd030d45",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "89bc47c8-364a-419d-9cbe-ad2bd5f3f7b1",
                  "type": "has_only_phrase",
                  "uuid": "5a1d67c2-ed89-4705-bf01-acb56a672daf"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1aaf3dbe-6f1b-4cdd-8862-9de4963c2c3f",
                  "name": "All Responses",
                  "uuid": "7724a3bc-0e07-4e7b-a562-abbebd030d45"
                },
                {
                  "exit_uuid": "1f4ea90e-387a-4222-89b6-bfee392d27b0",
                  "name": "Take me to the home screen",
                  "uuid": "89bc47c8-364a-419d-9cbe-ad2bd5f3f7b1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1aaf3dbe-6f1b-4cdd-8862-9de4963c2c3f",
                "destination_uuid": null
              },
              {
                "uuid": "1f4ea90e-387a-4222-89b6-bfee392d27b0",
                "destination_uuid": "62809061-c699-482f-a253-45f5437f0ade"
              }
            ]
          },
          {
            "uuid": "62809061-c699-482f-a253-45f5437f0ade",
            "actions": [
              {
                "uuid": "6cf3e2ed-ec20-4740-aa49-4e24d856ca86",
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
                "uuid": "4fdb4eda-207e-4ba5-9441-84782b04945f",
                "destination_uuid": "d306da8a-191e-4c10-9d74-1b4b8bb3c094"
              }
            ]
          },
          {
            "uuid": "d306da8a-191e-4c10-9d74-1b4b8bb3c094",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "547c32f6-6a30-4c1c-8d91-1c9ce84f723f"
                },
                "type": "enter_flow",
                "uuid": "448ece7c-13b6-415f-9945-6b40b5e755f0"
              }
            ],
            "exits": [
              {
                "uuid": "5d5c325d-cd87-435f-811c-e34998332635",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "03048b34-da88-4c5d-ab50-b2d0a3be0e78",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e7d5bb76-1ddf-4d95-b529-926855ce485c",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6c8886b0-287e-4bdb-b47d-de1f703e8014"
              }
            ],
            "exits": [
              {
                "uuid": "90c0d8c8-1c87-4dd3-b748-2fb351934308",
                "destination_uuid": "876ad41d-b8bb-46d4-b6c8-49923e9240e1"
              }
            ]
          },
          {
            "uuid": "876ad41d-b8bb-46d4-b6c8-49923e9240e1",
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
                "uuid": "0bd2e456-f718-41a0-80bb-55315f39b2da"
              }
            ],
            "exits": [
              {
                "uuid": "acb33643-0058-432e-81d0-25a492904434",
                "destination_uuid": "d044f18b-5bfd-43aa-bf63-d074e8e2a491"
              }
            ]
          },
          {
            "uuid": "d044f18b-5bfd-43aa-bf63-d074e8e2a491",
            "actions": [],
            "exits": [
              {
                "uuid": "5d3b99bd-a52a-4f15-8c34-4cb589a3c20f",
                "destination_uuid": "7e30ea84-c306-4fd1-a410-6143bcc6dd25"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "25fee414-f0a9-4044-a7f1-254a963e30d6",
              "cases": [],
              "categories": [
                {
                  "uuid": "25fee414-f0a9-4044-a7f1-254a963e30d6",
                  "name": "All Responses",
                  "exit_uuid": "5d3b99bd-a52a-4f15-8c34-4cb589a3c20f"
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
            "uuid": "7e30ea84-c306-4fd1-a410-6143bcc6dd25",
            "actions": [
              {
                "uuid": "15b43c24-50ff-40d7-9036-2b7e62426c3c",
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
                "uuid": "ae66ee79-7b2a-4494-afc9-7fd2996e4b38",
                "destination_uuid": "499d45e8-ce2c-4ccb-8d62-3417351987c8"
              }
            ]
          },
          {
            "uuid": "499d45e8-ce2c-4ccb-8d62-3417351987c8",
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
                "uuid": "2d134ad2-7043-4aa6-8da1-078566e415c9"
              }
            ],
            "exits": [
              {
                "uuid": "44ebcd4c-55ec-4c80-9b85-a0a43e2f95aa",
                "destination_uuid": "3e9b819e-9a2c-41ae-9080-e59694c7886d"
              }
            ]
          },
          {
            "uuid": "3e9b819e-9a2c-41ae-9080-e59694c7886d",
            "actions": [],
            "exits": [
              {
                "uuid": "21216c20-c849-4b19-8883-87047b1b47e4",
                "destination_uuid": "ecd4f658-ee6c-4c13-b581-f507818d31b7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "cc95bf83-7b6f-4071-926b-b172d76a0a16",
              "cases": [],
              "categories": [
                {
                  "uuid": "cc95bf83-7b6f-4071-926b-b172d76a0a16",
                  "name": "All Responses",
                  "exit_uuid": "21216c20-c849-4b19-8883-87047b1b47e4"
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
            "uuid": "ecd4f658-ee6c-4c13-b581-f507818d31b7",
            "actions": [
              {
                "uuid": "7753cc75-7825-427a-bfa8-641492cd4bcc",
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
                "uuid": "32174df5-4aa8-46b0-b995-8044e7214f83",
                "destination_uuid": "60aac2f6-deff-408f-ab1d-54170ea5b894"
              }
            ]
          },
          {
            "uuid": "60aac2f6-deff-408f-ab1d-54170ea5b894",
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
                "uuid": "e105ca11-8b79-4d4b-9584-5e635ea769f5"
              }
            ],
            "exits": [
              {
                "uuid": "11bc0836-02f0-4d22-bf21-23772966b81a",
                "destination_uuid": "a6b155d4-cd22-494e-bc71-afedd4192bea"
              }
            ]
          },
          {
            "uuid": "a6b155d4-cd22-494e-bc71-afedd4192bea",
            "actions": [],
            "exits": [
              {
                "uuid": "695c89e3-80ea-4e1e-9654-8c5628903172",
                "destination_uuid": "d3b56af8-0eea-4e2a-b5ff-e8f20d5b1c74"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9488092e-d8da-42e8-b9f9-74c61e22c89c",
              "cases": [],
              "categories": [
                {
                  "uuid": "9488092e-d8da-42e8-b9f9-74c61e22c89c",
                  "name": "All Responses",
                  "exit_uuid": "695c89e3-80ea-4e1e-9654-8c5628903172"
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
            "uuid": "d3b56af8-0eea-4e2a-b5ff-e8f20d5b1c74",
            "actions": [
              {
                "uuid": "a2ed6840-22a0-4a32-ab2d-6aea86b2ad09",
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
                "uuid": "a769f3e0-9776-4f39-bd60-6844dee0e12d",
                "destination_uuid": "194cca5a-1e9f-4a4d-8929-6f75dd9adce9"
              }
            ]
          },
          {
            "uuid": "194cca5a-1e9f-4a4d-8929-6f75dd9adce9",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "67a5ee06-fc87-4581-a50f-774e1f8fe46a"
              }
            ],
            "exits": [
              {
                "uuid": "c687b605-debb-47a1-aef1-0e9abd80e8a7",
                "destination_uuid": "684e90f0-3e0f-47d8-a09a-7dd9bee8e2eb"
              }
            ]
          },
          {
            "uuid": "684e90f0-3e0f-47d8-a09a-7dd9bee8e2eb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f96b87c4-571c-4e34-abe7-80cf5470cce7",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "a79065a8-8f01-479e-b77b-f0b881a5f408",
                  "type": "has_only_phrase",
                  "uuid": "017d85ad-9dd6-4bdf-9858-b1255c5c695a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7e64c73e-6831-4137-9f95-9aaf80c69782",
                  "name": "All Responses",
                  "uuid": "f96b87c4-571c-4e34-abe7-80cf5470cce7"
                },
                {
                  "exit_uuid": "bb7b52d7-a16c-4ee1-b563-d669f77acc4f",
                  "name": "Take me to Homescreen",
                  "uuid": "a79065a8-8f01-479e-b77b-f0b881a5f408"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7e64c73e-6831-4137-9f95-9aaf80c69782",
                "destination_uuid": null
              },
              {
                "uuid": "bb7b52d7-a16c-4ee1-b563-d669f77acc4f",
                "destination_uuid": "59704ac0-ff96-446c-abec-a83f0b48091f"
              }
            ]
          },
          {
            "uuid": "59704ac0-ff96-446c-abec-a83f0b48091f",
            "actions": [
              {
                "uuid": "bcc8c30e-1fe8-4449-89e3-837aaf9b7bf9",
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
                "uuid": "f6fc2446-fac9-4387-a050-de52a8d5284c",
                "destination_uuid": "b8fdf632-3305-44ac-85e2-48346a1f1a62"
              }
            ]
          },
          {
            "uuid": "b8fdf632-3305-44ac-85e2-48346a1f1a62",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "cef91219-478c-4c31-8ef6-211ab8007614"
                },
                "type": "enter_flow",
                "uuid": "59ad4c1e-493a-41d2-b02d-d5e651a68146"
              }
            ],
            "exits": [
              {
                "uuid": "bf11b434-102f-42f7-9fa2-ff3098c81017",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "cfd724d7-43cf-484d-98cc-28641a0b39a6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "bd2ab9c2-bf0e-472c-8687-7728c2aa7189",
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
                "uuid": "c34f1ce3-b732-45ad-adb0-ca57d2ed373f"
              }
            ],
            "exits": [
              {
                "uuid": "7a6c2268-dcaf-481b-b9cd-05b045adbc01",
                "destination_uuid": "e66ced4c-ddba-4596-82e7-c4245b46048c"
              }
            ]
          },
          {
            "uuid": "e66ced4c-ddba-4596-82e7-c4245b46048c",
            "actions": [],
            "exits": [
              {
                "uuid": "43f232c1-1896-467e-885a-c146bef25076",
                "destination_uuid": "a80ca104-78e9-42f1-aa9c-52548103b107"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "97a9189f-203a-4612-9ce0-c637cfa5066d",
              "cases": [],
              "categories": [
                {
                  "uuid": "97a9189f-203a-4612-9ce0-c637cfa5066d",
                  "name": "All Responses",
                  "exit_uuid": "43f232c1-1896-467e-885a-c146bef25076"
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
            "uuid": "a80ca104-78e9-42f1-aa9c-52548103b107",
            "actions": [
              {
                "uuid": "0953d7fd-7625-4dfd-977f-9670567069b3",
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
                "uuid": "4b771b0a-3229-4452-9f5b-952075771dbd",
                "destination_uuid": "c6df8e47-c170-4cff-8fcb-fb3295890a96"
              }
            ]
          },
          {
            "uuid": "c6df8e47-c170-4cff-8fcb-fb3295890a96",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d7fb2cc6-f560-4b09-93e2-ac557e23ebec",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "af840845-d9b5-43ce-a9c1-b86d74a167c2",
                  "type": "has_only_phrase",
                  "uuid": "11469dc9-4c1d-4f4d-8ec8-938a2c87beec"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "96752448-7b18-4d48-b273-5687526ebd4e",
                  "type": "has_only_phrase",
                  "uuid": "589171d9-2cfe-4e32-b744-8d1891c9ed40"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "76ce7e99-f7dc-4645-9255-fd4f651ba959",
                  "type": "has_only_phrase",
                  "uuid": "9ac10071-03f7-4f03-adbc-1261e2192587"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d5811b39-ae37-423d-a675-00172419f44f",
                  "name": "All Responses",
                  "uuid": "d7fb2cc6-f560-4b09-93e2-ac557e23ebec"
                },
                {
                  "exit_uuid": "3e6e395e-6e12-47f1-b490-e50aae4f3fd5",
                  "name": "Great",
                  "uuid": "af840845-d9b5-43ce-a9c1-b86d74a167c2"
                },
                {
                  "exit_uuid": "13a8fa5d-fba4-49e0-a661-9d40a3b7adb9",
                  "name": "Neutral",
                  "uuid": "96752448-7b18-4d48-b273-5687526ebd4e"
                },
                {
                  "exit_uuid": "83cd30d9-824f-4f9e-95a5-14714f3edee3",
                  "name": "Bad",
                  "uuid": "76ce7e99-f7dc-4645-9255-fd4f651ba959"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "d5811b39-ae37-423d-a675-00172419f44f",
                "destination_uuid": null
              },
              {
                "uuid": "3e6e395e-6e12-47f1-b490-e50aae4f3fd5",
                "destination_uuid": "a1402ce7-20f4-4232-bef9-d0fac793a145"
              },
              {
                "uuid": "13a8fa5d-fba4-49e0-a661-9d40a3b7adb9",
                "destination_uuid": "52e1365d-b642-4029-b850-61c884c6b920"
              },
              {
                "uuid": "83cd30d9-824f-4f9e-95a5-14714f3edee3",
                "destination_uuid": "1b0c8b9f-011b-4432-a8cb-dd64313aab4c"
              }
            ]
          },
          {
            "uuid": "a1402ce7-20f4-4232-bef9-d0fac793a145",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9ac083fa-4fb4-4992-ba5b-c8cd7040bf7f"
              }
            ],
            "exits": [
              {
                "uuid": "0ae2cd49-727f-42ce-bdde-2bf0fdaaec3c",
                "destination_uuid": "3a1b8e54-f27a-40ba-bb2e-591814b373f0"
              }
            ]
          },
          {
            "uuid": "52e1365d-b642-4029-b850-61c884c6b920",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f03dcceb-c08f-4c15-b99c-48ff3c78d94a"
              }
            ],
            "exits": [
              {
                "uuid": "afb2060b-6e31-4a36-a137-aedcf10add40",
                "destination_uuid": "3a1b8e54-f27a-40ba-bb2e-591814b373f0"
              }
            ]
          },
          {
            "uuid": "3a1b8e54-f27a-40ba-bb2e-591814b373f0",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "42170393-df6f-4ed5-9905-49a04a5df6c4"
                },
                "type": "enter_flow",
                "uuid": "338a5101-59f3-4e1e-a02d-0f6bea6522bf"
              }
            ],
            "exits": [
              {
                "uuid": "6fa2ce43-73e0-4c86-b7d4-137559b2fa2b",
                "destination_uuid": "17af159b-e4a5-4812-a07c-b13de8668195"
              },
              {
                "uuid": "a97c26cd-12b7-4d19-a796-fa8ca1d1475c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "685cc8fe-81e3-4f69-8000-1e67ca29bad9",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "773bd4c1-5cf8-43f3-8f4f-ecde8cfa233d"
                },
                {
                  "uuid": "026a6b95-ba7b-4033-9f72-d8ab06dddc85",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0f08d87f-4364-4930-9b75-18838473538f"
                }
              ],
              "categories": [
                {
                  "uuid": "773bd4c1-5cf8-43f3-8f4f-ecde8cfa233d",
                  "name": "Complete",
                  "exit_uuid": "6fa2ce43-73e0-4c86-b7d4-137559b2fa2b"
                },
                {
                  "uuid": "0f08d87f-4364-4930-9b75-18838473538f",
                  "name": "Expired",
                  "exit_uuid": "a97c26cd-12b7-4d19-a796-fa8ca1d1475c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "773bd4c1-5cf8-43f3-8f4f-ecde8cfa233d"
            }
          },
          {
            "uuid": "17af159b-e4a5-4812-a07c-b13de8668195",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "497fdd4d-5e03-401f-beba-e53eb261ca64"
                },
                "type": "enter_flow",
                "uuid": "81b293f3-162d-4d8e-b5cb-4e05ea7245e7"
              }
            ],
            "exits": [
              {
                "uuid": "61cdb685-9029-40f5-aec2-06234edb1eeb",
                "destination_uuid": "8b96918c-0454-4021-89ca-a02333a73638"
              },
              {
                "uuid": "ba229fcf-d970-469e-bb0f-5ad80f01587f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "cceddb5c-bb3a-4694-be81-5776505ef54d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c953066c-a93d-4ab8-a079-5a3abdafeb53"
                },
                {
                  "uuid": "5c5c70c5-f0f6-4426-91f0-cbb196fe5744",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "780439e1-5bc6-4085-96ae-66aad22a6d94"
                }
              ],
              "categories": [
                {
                  "uuid": "c953066c-a93d-4ab8-a079-5a3abdafeb53",
                  "name": "Complete",
                  "exit_uuid": "61cdb685-9029-40f5-aec2-06234edb1eeb"
                },
                {
                  "uuid": "780439e1-5bc6-4085-96ae-66aad22a6d94",
                  "name": "Expired",
                  "exit_uuid": "ba229fcf-d970-469e-bb0f-5ad80f01587f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c953066c-a93d-4ab8-a079-5a3abdafeb53"
            }
          },
          {
            "uuid": "1b0c8b9f-011b-4432-a8cb-dd64313aab4c",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6b769a75-1fac-4b5a-b7d9-bf9895a7f57b"
              }
            ],
            "exits": [
              {
                "uuid": "1cf4b65f-dbe4-43df-9308-d1f0d1bb6e90",
                "destination_uuid": "8ff6aa1d-d34f-4f08-adff-af492b4624a1"
              }
            ]
          },
          {
            "uuid": "8ff6aa1d-d34f-4f08-adff-af492b4624a1",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "7849265e-526c-411b-9c2c-e4c85a0649fa"
                },
                "type": "enter_flow",
                "uuid": "641b2e27-186b-4d6b-ab12-3058662cc7bf"
              }
            ],
            "exits": [
              {
                "uuid": "ea099392-bd67-432e-a4c4-5ce11243d07c",
                "destination_uuid": "437454ac-06fd-4059-a7f5-ffa0ff8587d2"
              },
              {
                "uuid": "7018c6e4-f1e1-40f4-a625-ecca2659c4e8",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "46b659b8-28de-4527-8afa-daa113cc356c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7cf2c0f7-06b1-4b1f-9cdb-0a5e76963041"
                },
                {
                  "uuid": "eef44a7b-bc31-41c3-97dc-b561398e13f1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "4ceafec2-4cf2-4c69-a801-778c1bffff5f"
                }
              ],
              "categories": [
                {
                  "uuid": "7cf2c0f7-06b1-4b1f-9cdb-0a5e76963041",
                  "name": "Complete",
                  "exit_uuid": "ea099392-bd67-432e-a4c4-5ce11243d07c"
                },
                {
                  "uuid": "4ceafec2-4cf2-4c69-a801-778c1bffff5f",
                  "name": "Expired",
                  "exit_uuid": "7018c6e4-f1e1-40f4-a625-ecca2659c4e8"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7cf2c0f7-06b1-4b1f-9cdb-0a5e76963041"
            }
          },
          {
            "uuid": "437454ac-06fd-4059-a7f5-ffa0ff8587d2",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "0c198ca1-259a-458b-ace1-4a42f6f47505"
                },
                "type": "enter_flow",
                "uuid": "9bd1cbdd-eb34-4233-ba23-2566633febb7"
              }
            ],
            "exits": [
              {
                "uuid": "8952cc59-229a-452a-b4bd-dd753ba76255",
                "destination_uuid": "8b96918c-0454-4021-89ca-a02333a73638"
              },
              {
                "uuid": "4fcee405-9e8b-4bb9-ab23-e26a996b4633",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7bff7ad2-8c59-4756-b003-76c0ed816457",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a2fc1049-70b3-47fa-ba12-b8f0b1e77131"
                },
                {
                  "uuid": "7deb01e4-2b94-42f1-b0a5-6915dca15814",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "06044588-0f21-4bf2-a215-047f9a1afedc"
                }
              ],
              "categories": [
                {
                  "uuid": "a2fc1049-70b3-47fa-ba12-b8f0b1e77131",
                  "name": "Complete",
                  "exit_uuid": "8952cc59-229a-452a-b4bd-dd753ba76255"
                },
                {
                  "uuid": "06044588-0f21-4bf2-a215-047f9a1afedc",
                  "name": "Expired",
                  "exit_uuid": "4fcee405-9e8b-4bb9-ab23-e26a996b4633"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a2fc1049-70b3-47fa-ba12-b8f0b1e77131"
            }
          },
          {
            "uuid": "8b96918c-0454-4021-89ca-a02333a73638",
            "actions": [
              {
                "uuid": "44f308e8-d589-4b38-96c2-4524df771e99",
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
                "uuid": "8453c5e7-0d3d-42c6-b7f4-3381df433d7d",
                "destination_uuid": "ccbbb28a-0adc-4ac8-99db-f7893696ceb1"
              }
            ]
          },
          {
            "uuid": "ccbbb28a-0adc-4ac8-99db-f7893696ceb1",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "13489f5d-4fee-46a8-9665-16ce7499f547"
                },
                "type": "enter_flow",
                "uuid": "056c48c9-eb22-47cc-8d26-838db4c9340e"
              }
            ],
            "exits": [
              {
                "uuid": "a1fd7159-a594-4b23-9aba-9e7edbd52389",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c2784239-ef4e-4a8e-97fb-50d525cd35f7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b7cdedee-a35f-4d65-93ec-46094436a985",
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
                "uuid": "f2f3b621-c419-4237-98c8-c68bc1011c06"
              }
            ],
            "exits": [
              {
                "uuid": "ced51a85-4932-48bc-bb13-568cbdb5c5bf",
                "destination_uuid": "ff8f0e6c-bb30-4ee1-a198-22fa4055fde5"
              }
            ]
          },
          {
            "uuid": "ff8f0e6c-bb30-4ee1-a198-22fa4055fde5",
            "actions": [],
            "exits": [
              {
                "uuid": "a93f5845-b6f1-4dfa-bfc5-153d9ba9f44b",
                "destination_uuid": "a78c30c3-134b-4808-8706-4c49434e8557"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "82500bd1-73d4-41a7-9c04-854651c13896",
              "cases": [],
              "categories": [
                {
                  "uuid": "82500bd1-73d4-41a7-9c04-854651c13896",
                  "name": "All Responses",
                  "exit_uuid": "a93f5845-b6f1-4dfa-bfc5-153d9ba9f44b"
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
            "uuid": "a78c30c3-134b-4808-8706-4c49434e8557",
            "actions": [
              {
                "uuid": "cb7a0081-539e-4d04-94a2-da258fc78ebc",
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
                "uuid": "5a3ce5c0-f5d4-46f1-84e3-0cf36c362e79",
                "destination_uuid": "2648df17-986e-4284-97a0-d5aa1f10dcbf"
              }
            ]
          },
          {
            "uuid": "2648df17-986e-4284-97a0-d5aa1f10dcbf",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0346e611-60ef-4b15-a25a-ded0698edab0",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "a4ffb686-46e1-4137-a79d-2a7c45eb0760",
                  "type": "has_only_phrase",
                  "uuid": "71042010-c86f-42a7-914a-dbb8f0f2dc10"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "5a726c40-286d-453e-b79b-7b44587e5487",
                  "type": "has_only_phrase",
                  "uuid": "24e4b588-d992-4fee-b040-077987be8b26"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "daf0c56b-2b2c-4fe7-a925-7f2bb698c9ba",
                  "type": "has_only_phrase",
                  "uuid": "93b35152-d3f8-4767-9d87-eea514fe711c"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "38ea79f5-7364-455a-ba42-010b066436bf",
                  "type": "has_only_phrase",
                  "uuid": "c42da500-dbce-4152-a30a-45ccc2f11be4"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "ee9d653c-a763-4962-99bc-4d42639ec53e",
                  "type": "has_only_phrase",
                  "uuid": "49c6a5cb-ff85-4943-a1c0-4b0f2fba3a64"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "af7189d4-499c-4391-9e40-885a6978d90a",
                  "type": "has_only_phrase",
                  "uuid": "5aba2ce6-580c-4dcb-a3f7-497a973d2c5b"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "5faf1980-011a-45d5-a1ae-132041dd1b41",
                  "type": "has_only_phrase",
                  "uuid": "37027e7d-4f41-47f1-9db5-34b31deb34b1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f822163b-05b5-4405-81df-e0fc2cc59afe",
                  "name": "All Responses",
                  "uuid": "0346e611-60ef-4b15-a25a-ded0698edab0"
                },
                {
                  "exit_uuid": "9ad84453-1cff-4c1e-a72e-814ba3cd31a0",
                  "name": "Do it every day",
                  "uuid": "a4ffb686-46e1-4137-a79d-2a7c45eb0760"
                },
                {
                  "exit_uuid": "e5daed45-1f81-4f74-beab-34fac8451ed6",
                  "name": "Let your teen choose the activity",
                  "uuid": "5a726c40-286d-453e-b79b-7b44587e5487"
                },
                {
                  "exit_uuid": "fe922610-4890-4055-8802-b9c2c2350d45",
                  "name": "Follow your teen’s lead",
                  "uuid": "daf0c56b-2b2c-4fe7-a925-7f2bb698c9ba"
                },
                {
                  "exit_uuid": "1149ee68-c36b-42cd-907d-20bf605379df",
                  "name": "Give your teen all of your attention",
                  "uuid": "38ea79f5-7364-455a-ba42-010b066436bf"
                },
                {
                  "exit_uuid": "eb499cc5-a906-49ef-ab6e-dfcdd9a494d7",
                  "name": "Show your teen you are really listening",
                  "uuid": "ee9d653c-a763-4962-99bc-4d42639ec53e"
                },
                {
                  "exit_uuid": "4fa8fc3c-7a2e-4250-9bf2-7bc93176540d",
                  "name": "Have fun!",
                  "uuid": "af7189d4-499c-4391-9e40-885a6978d90a"
                },
                {
                  "exit_uuid": "8224170b-7011-45e7-8255-303e17d76968",
                  "name": "None ",
                  "uuid": "5faf1980-011a-45d5-a1ae-132041dd1b41"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "f822163b-05b5-4405-81df-e0fc2cc59afe",
                "destination_uuid": null
              },
              {
                "uuid": "9ad84453-1cff-4c1e-a72e-814ba3cd31a0",
                "destination_uuid": "94db886d-2088-485e-a265-4bbf7996408b"
              },
              {
                "uuid": "e5daed45-1f81-4f74-beab-34fac8451ed6",
                "destination_uuid": "de8440c2-bfa6-41d8-b085-7a30dd9e8655"
              },
              {
                "uuid": "fe922610-4890-4055-8802-b9c2c2350d45",
                "destination_uuid": "804d07eb-cba6-4099-9462-85d445d7b30b"
              },
              {
                "uuid": "1149ee68-c36b-42cd-907d-20bf605379df",
                "destination_uuid": "8c7a421f-3bbc-4807-b592-a549c93fa9e4"
              },
              {
                "uuid": "eb499cc5-a906-49ef-ab6e-dfcdd9a494d7",
                "destination_uuid": "27c24d4c-7ec4-4c73-83a2-5c7a342a325a"
              },
              {
                "uuid": "4fa8fc3c-7a2e-4250-9bf2-7bc93176540d",
                "destination_uuid": "6fb2fbbc-edb4-4015-9799-5c73e2c560e0"
              },
              {
                "uuid": "8224170b-7011-45e7-8255-303e17d76968",
                "destination_uuid": "862fde17-c816-4c71-8446-cf433a1b1d1e"
              }
            ]
          },
          {
            "uuid": "94db886d-2088-485e-a265-4bbf7996408b",
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
                "uuid": "0f3e68f7-3c7a-4464-9723-ccc1769ad3f7"
              }
            ],
            "exits": [
              {
                "uuid": "b87af265-6f06-49a4-940f-aac86daed3f3",
                "destination_uuid": "47f7c0eb-d10e-46ab-bcb1-d28ec72b8f2c"
              }
            ]
          },
          {
            "uuid": "47f7c0eb-d10e-46ab-bcb1-d28ec72b8f2c",
            "actions": [],
            "exits": [
              {
                "uuid": "5f5c5614-95e8-471e-a772-90fb3b005996",
                "destination_uuid": "61ae8baa-b778-49f9-9e17-c29b8d4913dc"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "78358e11-abf6-47fc-9758-8d758274f880",
              "cases": [],
              "categories": [
                {
                  "uuid": "78358e11-abf6-47fc-9758-8d758274f880",
                  "name": "All Responses",
                  "exit_uuid": "5f5c5614-95e8-471e-a772-90fb3b005996"
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
            "uuid": "61ae8baa-b778-49f9-9e17-c29b8d4913dc",
            "actions": [
              {
                "uuid": "d6052f38-135b-457b-a09b-7e35e7099221",
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
                "uuid": "388e66b5-5cd0-4bdc-bee7-9830cdb293e3",
                "destination_uuid": "03316865-f446-4909-a96e-27188d0d6392"
              }
            ]
          },
          {
            "uuid": "03316865-f446-4909-a96e-27188d0d6392",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "46a51f93-b793-4538-8332-8286d3979953"
              }
            ],
            "exits": [
              {
                "uuid": "31e68671-7388-4fa5-9ac7-6b924a6a4bac",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "de8440c2-bfa6-41d8-b085-7a30dd9e8655",
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
                "uuid": "55dbda05-396b-414a-9491-8c6038d356b1"
              }
            ],
            "exits": [
              {
                "uuid": "49b99717-529b-4eec-a04e-bade401d60d9",
                "destination_uuid": "b2a9b726-5fa8-469b-b6d5-074866683862"
              }
            ]
          },
          {
            "uuid": "b2a9b726-5fa8-469b-b6d5-074866683862",
            "actions": [],
            "exits": [
              {
                "uuid": "54f757a4-dc19-4ef6-977e-96214f16ea90",
                "destination_uuid": "75ecd7c3-d470-4e1c-b297-a6ddd03619d8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "565daa55-6548-4e04-9e4c-f0bcd1cde587",
              "cases": [],
              "categories": [
                {
                  "uuid": "565daa55-6548-4e04-9e4c-f0bcd1cde587",
                  "name": "All Responses",
                  "exit_uuid": "54f757a4-dc19-4ef6-977e-96214f16ea90"
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
            "uuid": "75ecd7c3-d470-4e1c-b297-a6ddd03619d8",
            "actions": [
              {
                "uuid": "ac5a0545-2744-41b0-9891-d94b3175c491",
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
                "uuid": "3aa687e0-c795-41e9-b92b-8a5f5d2560b7",
                "destination_uuid": "1ba6dd98-2214-4c36-9650-abc07e2ff41f"
              }
            ]
          },
          {
            "uuid": "1ba6dd98-2214-4c36-9650-abc07e2ff41f",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ba39eba8-b6fd-45b5-8b5b-cabb1cd808d1"
              }
            ],
            "exits": [
              {
                "uuid": "33334aad-d42d-49a0-9db1-e8b8850565b7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "804d07eb-cba6-4099-9462-85d445d7b30b",
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
                "uuid": "b815a77c-6f1b-42d6-bd7f-e16359974bf1"
              }
            ],
            "exits": [
              {
                "uuid": "2c5230e8-a335-452f-8a02-17a2f6df6d91",
                "destination_uuid": "763f7a27-66a6-48bc-8c4d-fa420bfbea0c"
              }
            ]
          },
          {
            "uuid": "763f7a27-66a6-48bc-8c4d-fa420bfbea0c",
            "actions": [],
            "exits": [
              {
                "uuid": "59d513d4-3d2a-4f93-94de-01aa6fa42b8b",
                "destination_uuid": "b5857de7-b8aa-48d0-8c70-04bcc1ec85d3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e9b3be91-8361-4cb2-b92d-34135abe4d42",
              "cases": [],
              "categories": [
                {
                  "uuid": "e9b3be91-8361-4cb2-b92d-34135abe4d42",
                  "name": "All Responses",
                  "exit_uuid": "59d513d4-3d2a-4f93-94de-01aa6fa42b8b"
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
            "uuid": "b5857de7-b8aa-48d0-8c70-04bcc1ec85d3",
            "actions": [
              {
                "uuid": "ba67d9fb-a751-4dbf-934a-283f1bfaef83",
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
                "uuid": "a48e19a3-97ab-4e95-a916-925a68a74a9c",
                "destination_uuid": "c03b61bc-9f7f-4220-8e3a-e829c32b81f1"
              }
            ]
          },
          {
            "uuid": "c03b61bc-9f7f-4220-8e3a-e829c32b81f1",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5f9f060a-982e-435a-893a-2d1a5f977af7"
              }
            ],
            "exits": [
              {
                "uuid": "38fedc1f-2f8e-44a7-9d61-10a170cf0369",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "8c7a421f-3bbc-4807-b592-a549c93fa9e4",
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
                "uuid": "198622bb-a36f-49b8-9756-1cccbfed8526"
              }
            ],
            "exits": [
              {
                "uuid": "9445606b-ce71-4236-8791-3a0a76280a8c",
                "destination_uuid": "9226b278-3414-4369-a112-b83a3c2b4aec"
              }
            ]
          },
          {
            "uuid": "9226b278-3414-4369-a112-b83a3c2b4aec",
            "actions": [],
            "exits": [
              {
                "uuid": "e70fe623-d6a0-493c-aa02-4ac826aee398",
                "destination_uuid": "c1b8ddb5-1597-4739-bc6f-5a9af1d284c7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c1fc92d2-a022-4ce2-98b6-1582ec9505ed",
              "cases": [],
              "categories": [
                {
                  "uuid": "c1fc92d2-a022-4ce2-98b6-1582ec9505ed",
                  "name": "All Responses",
                  "exit_uuid": "e70fe623-d6a0-493c-aa02-4ac826aee398"
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
            "uuid": "c1b8ddb5-1597-4739-bc6f-5a9af1d284c7",
            "actions": [
              {
                "uuid": "299af60f-359e-4d94-abbd-a16e468fda7b",
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
                "uuid": "607e0cca-6dcf-4033-b0c7-9d3669a4f7d1",
                "destination_uuid": "2d3f2261-6fe5-4fa9-be9c-9dbcdb4cc8cd"
              }
            ]
          },
          {
            "uuid": "2d3f2261-6fe5-4fa9-be9c-9dbcdb4cc8cd",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ea3992c1-1ef3-4aa7-bb38-696a4787657b"
              }
            ],
            "exits": [
              {
                "uuid": "5017afb5-93b4-411b-b60a-b7ab57c248a2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "27c24d4c-7ec4-4c73-83a2-5c7a342a325a",
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
                "uuid": "e0f70493-0044-4415-95b3-ebeb0db83d17"
              }
            ],
            "exits": [
              {
                "uuid": "222ee37f-c125-441b-b248-934ba02f5682",
                "destination_uuid": "37d23aec-2784-47f5-a4f1-f3c9ba3cfcb7"
              }
            ]
          },
          {
            "uuid": "37d23aec-2784-47f5-a4f1-f3c9ba3cfcb7",
            "actions": [],
            "exits": [
              {
                "uuid": "1a4862a9-61be-4547-94cf-c6e6a8f2a955",
                "destination_uuid": "3c3d7c73-8301-4440-844e-65d3449418e8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2ba5bb2c-0c2f-419f-aec2-efc4ea7c987a",
              "cases": [],
              "categories": [
                {
                  "uuid": "2ba5bb2c-0c2f-419f-aec2-efc4ea7c987a",
                  "name": "All Responses",
                  "exit_uuid": "1a4862a9-61be-4547-94cf-c6e6a8f2a955"
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
            "uuid": "3c3d7c73-8301-4440-844e-65d3449418e8",
            "actions": [
              {
                "uuid": "bd3c39b9-7ec1-40e1-8358-462d564e5879",
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
                "uuid": "97adbd11-6af2-4fd2-9225-e10c46c2ccb4",
                "destination_uuid": "27574562-a8fd-4d8d-850c-4e44a4da5349"
              }
            ]
          },
          {
            "uuid": "27574562-a8fd-4d8d-850c-4e44a4da5349",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8c84bc00-fa36-4e6a-8ee1-7a4bccfa18cb"
              }
            ],
            "exits": [
              {
                "uuid": "ca929c97-b4a5-41ff-a73b-8487330f257d",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "6fb2fbbc-edb4-4015-9799-5c73e2c560e0",
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
                "uuid": "b7acb66c-ab3f-4d00-aaa0-65e91f99f092"
              }
            ],
            "exits": [
              {
                "uuid": "7a00aa94-2ec2-427e-9b23-470f0dc38bb2",
                "destination_uuid": "eb997f73-3204-499c-aea9-3dce631462c9"
              }
            ]
          },
          {
            "uuid": "eb997f73-3204-499c-aea9-3dce631462c9",
            "actions": [],
            "exits": [
              {
                "uuid": "11edd00d-b45a-46c6-9240-9e731495b677",
                "destination_uuid": "010625e9-9c5d-48c7-8539-4c773955cc35"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6b5fd4da-665c-4711-b1f8-83b75a01a3c7",
              "cases": [],
              "categories": [
                {
                  "uuid": "6b5fd4da-665c-4711-b1f8-83b75a01a3c7",
                  "name": "All Responses",
                  "exit_uuid": "11edd00d-b45a-46c6-9240-9e731495b677"
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
            "uuid": "010625e9-9c5d-48c7-8539-4c773955cc35",
            "actions": [
              {
                "uuid": "e0a2b8cb-c59d-4866-a345-07d7462ccc31",
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
                "uuid": "f8bea889-9ac4-4ed1-b4c5-9709e2c19e53",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "652dbabf-6a99-4720-8cb2-ff1a438a0661",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9d9dbd5c-d98c-470b-96e0-c8e78bb57357"
              }
            ],
            "exits": [
              {
                "uuid": "ac4c4640-5cc5-47d6-a85b-e9e57f2a47d1",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "862fde17-c816-4c71-8446-cf433a1b1d1e",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6eb95293-563f-4cf0-a920-8ecdb14937f6"
              }
            ],
            "exits": [
              {
                "uuid": "2010f025-35fc-49f8-9dde-a1205a84905e",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "2dd7d8d9-94d8-41fb-b812-47a5c91a167d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "dc4a9870-bf77-4c3e-9f49-17512e61e0f6",
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
                "uuid": "f6f440dd-ebd3-46c0-9e8a-324b930c9365"
              }
            ],
            "exits": [
              {
                "uuid": "8db380f8-5afd-4607-a2b9-bcc31af3f229",
                "destination_uuid": "c3dda164-239d-4450-9e78-0750a8980c72"
              }
            ]
          },
          {
            "uuid": "ba0d97d8-f806-45e9-a65c-2605026fe0ac",
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
                "uuid": "32b8021a-2a77-4936-9e3a-1bba501fa960"
              }
            ],
            "exits": [
              {
                "uuid": "67f384ac-5369-45f5-8508-1a04c8f9b416",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1b8d44b3-7fc3-4391-96de-1357fc05fdeb",
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
                "uuid": "231ac6b6-745c-4dbc-ac24-72a91b76a391"
              }
            ],
            "exits": [
              {
                "uuid": "a83404f7-403d-4c68-86c9-b1cd30719344",
                "destination_uuid": "c3dda164-239d-4450-9e78-0750a8980c72"
              }
            ]
          },
          {
            "uuid": "c3dda164-239d-4450-9e78-0750a8980c72",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "25cd7a63-a82a-434c-a4d0-cac5c52e6d72",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "de127f6a-199f-4886-857e-9be146f300a9",
                  "type": "has_only_phrase",
                  "uuid": "ad230473-3c20-45e9-be9e-44055a2493e5"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "73801d9e-18db-46e3-99e4-8777a7a33ba3",
                  "type": "has_only_phrase",
                  "uuid": "2dc9fb4d-55f5-4522-a7b2-8938d85b6900"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "17a97d09-2047-4964-8c45-92a05d79ce5e",
                  "type": "has_only_phrase",
                  "uuid": "216a4d2c-41de-4d71-bf8b-17e48778b25e"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "594bb405-6c62-47fb-985d-7515c1ce9165",
                  "type": "has_only_phrase",
                  "uuid": "706e5aa5-fc00-4e03-a51a-336b18dc52f0"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "8415529f-a4df-4aee-ba9c-704137121c39",
                  "type": "has_only_phrase",
                  "uuid": "4ef1cb33-7349-4592-b1c1-39332ad05bea"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "fbddcafe-894d-4624-a2d7-2e3e4eb6348b",
                  "type": "has_only_phrase",
                  "uuid": "2deb7aed-b421-4d34-abad-9ed5aaaf8768"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "0f038384-ca70-4b7c-9a74-dcfe4ea151b4",
                  "type": "has_only_phrase",
                  "uuid": "70c16fb4-c965-4049-8729-8cbf881f9ca8"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "ba1073eb-45b7-46af-b279-3ef72e2ccef3",
                  "type": "has_only_phrase",
                  "uuid": "551fca3c-c7f9-43c7-88f5-83b7fbb1fd1a"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "bcc67230-612b-4951-abce-60971b82c9f1",
                  "type": "has_only_phrase",
                  "uuid": "516f98f4-f02d-4336-a2d5-81bd8ceb4c27"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "e455736e-62e2-49c8-bf48-af5fc73b0600",
                  "type": "has_only_phrase",
                  "uuid": "0e7a1a27-5579-4b14-9188-3d34146ea564"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "6e127a06-3a47-478e-b57c-f2e7ee8bf72d",
                  "type": "has_only_phrase",
                  "uuid": "62ef3dd3-5ff0-468c-bc34-08d1a0f62dc1"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "30246d68-0696-478b-a268-feea97a83d33",
                  "type": "has_only_phrase",
                  "uuid": "7d89d980-e857-4c19-bf74-8a3d7151e0d9"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "0cba7152-f1d3-46cc-b029-d65834210717",
                  "type": "has_only_phrase",
                  "uuid": "db1fe21f-0faf-4628-8782-b4ab0a40207c"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "9bd0f3c0-4811-40f5-ab1d-650b05ae4e69",
                  "type": "has_only_phrase",
                  "uuid": "bd1d696f-b48b-45bf-8350-03fc61c3549f"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "3d2f4faa-9b07-48ba-901c-4ba61e972484",
                  "type": "has_only_phrase",
                  "uuid": "53e2cf2f-c7c2-456f-afda-dcdd875834fc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c65721ab-dcd7-4f29-8870-e1fe5179e86d",
                  "name": "All Responses",
                  "uuid": "25cd7a63-a82a-434c-a4d0-cac5c52e6d72"
                },
                {
                  "exit_uuid": "29667713-6616-4dc1-a9de-f9cb72b18cd0",
                  "name": "I don’t have enough time",
                  "uuid": "de127f6a-199f-4886-857e-9be146f300a9"
                },
                {
                  "exit_uuid": "9db7c405-ee14-445e-9981-af3d1512292a",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "73801d9e-18db-46e3-99e4-8777a7a33ba3"
                },
                {
                  "exit_uuid": "51fde72c-bc9a-40a3-acee-d1c1f432d81e",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "17a97d09-2047-4964-8c45-92a05d79ce5e"
                },
                {
                  "exit_uuid": "692674c7-1634-47c5-a879-09bd9c8547b6",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "594bb405-6c62-47fb-985d-7515c1ce9165"
                },
                {
                  "exit_uuid": "415e4005-fdaa-443c-8191-94c51db71cd2",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "8415529f-a4df-4aee-ba9c-704137121c39"
                },
                {
                  "exit_uuid": "6401aaae-7a00-4a67-bede-bba14fd8b19f",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "fbddcafe-894d-4624-a2d7-2e3e4eb6348b"
                },
                {
                  "exit_uuid": "5607f023-b14b-4418-907f-e3aeacc49a19",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "0f038384-ca70-4b7c-9a74-dcfe4ea151b4"
                },
                {
                  "exit_uuid": "470c6a9f-896b-4e10-b7cc-2049233a1c79",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "ba1073eb-45b7-46af-b279-3ef72e2ccef3"
                },
                {
                  "exit_uuid": "aa6b496b-0981-41ab-89b5-f19592e018e0",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "bcc67230-612b-4951-abce-60971b82c9f1"
                },
                {
                  "exit_uuid": "1cd9ffc0-a769-43e4-9947-200c9e942441",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "e455736e-62e2-49c8-bf48-af5fc73b0600"
                },
                {
                  "exit_uuid": "8814e06d-c5f1-4a23-8df0-9167c7be299c",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "6e127a06-3a47-478e-b57c-f2e7ee8bf72d"
                },
                {
                  "exit_uuid": "c85fa0d8-f211-441f-961c-32ff6da9f3db",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "30246d68-0696-478b-a268-feea97a83d33"
                },
                {
                  "exit_uuid": "f82c5862-5f6b-44b6-95ef-e3d4344ad0e4",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "0cba7152-f1d3-46cc-b029-d65834210717"
                },
                {
                  "exit_uuid": "60738c83-625f-4fa3-a740-e9f5159619c4",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "9bd0f3c0-4811-40f5-ab1d-650b05ae4e69"
                },
                {
                  "exit_uuid": "5d9b18d6-39a8-43ef-9330-a4eb3b5b4a55",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "3d2f4faa-9b07-48ba-901c-4ba61e972484"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c65721ab-dcd7-4f29-8870-e1fe5179e86d",
                "destination_uuid": null
              },
              {
                "uuid": "29667713-6616-4dc1-a9de-f9cb72b18cd0",
                "destination_uuid": "0053fabf-e95d-4759-af16-d4ce9cc8c686"
              },
              {
                "uuid": "9db7c405-ee14-445e-9981-af3d1512292a",
                "destination_uuid": "2c6ded49-a7d5-4b48-912b-f13336e516b5"
              },
              {
                "uuid": "51fde72c-bc9a-40a3-acee-d1c1f432d81e",
                "destination_uuid": "2c6ded49-a7d5-4b48-912b-f13336e516b5"
              },
              {
                "uuid": "692674c7-1634-47c5-a879-09bd9c8547b6",
                "destination_uuid": "af4cf139-9f6b-4f74-8c92-0d78ef327750"
              },
              {
                "uuid": "415e4005-fdaa-443c-8191-94c51db71cd2",
                "destination_uuid": "af4cf139-9f6b-4f74-8c92-0d78ef327750"
              },
              {
                "uuid": "6401aaae-7a00-4a67-bede-bba14fd8b19f",
                "destination_uuid": "107f4cd1-58a6-4341-b67d-b290e7eeffe9"
              },
              {
                "uuid": "5607f023-b14b-4418-907f-e3aeacc49a19",
                "destination_uuid": "107f4cd1-58a6-4341-b67d-b290e7eeffe9"
              },
              {
                "uuid": "470c6a9f-896b-4e10-b7cc-2049233a1c79",
                "destination_uuid": "fd371db3-6b84-4498-9399-42b242cca170"
              },
              {
                "uuid": "aa6b496b-0981-41ab-89b5-f19592e018e0",
                "destination_uuid": "fd371db3-6b84-4498-9399-42b242cca170"
              },
              {
                "uuid": "1cd9ffc0-a769-43e4-9947-200c9e942441",
                "destination_uuid": "7b8536e9-dc41-4891-a272-f77a572701e9"
              },
              {
                "uuid": "8814e06d-c5f1-4a23-8df0-9167c7be299c",
                "destination_uuid": "7b8536e9-dc41-4891-a272-f77a572701e9"
              },
              {
                "uuid": "c85fa0d8-f211-441f-961c-32ff6da9f3db",
                "destination_uuid": "56185780-b53b-4a68-947d-3ee319112e3c"
              },
              {
                "uuid": "f82c5862-5f6b-44b6-95ef-e3d4344ad0e4",
                "destination_uuid": "56185780-b53b-4a68-947d-3ee319112e3c"
              },
              {
                "uuid": "60738c83-625f-4fa3-a740-e9f5159619c4",
                "destination_uuid": "d86a9b5e-7e78-42ed-a069-73b3f43af6be"
              },
              {
                "uuid": "5d9b18d6-39a8-43ef-9330-a4eb3b5b4a55",
                "destination_uuid": "d86a9b5e-7e78-42ed-a069-73b3f43af6be"
              }
            ]
          },
          {
            "uuid": "0053fabf-e95d-4759-af16-d4ce9cc8c686",
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
                "uuid": "54faec6e-f723-4f9c-bd8e-d0e635b9332a"
              }
            ],
            "exits": [
              {
                "uuid": "f27c46df-f774-4d85-a334-6ce89f6bd30e",
                "destination_uuid": "c21bd34f-f4df-46fe-99ee-b8a1b490dc10"
              }
            ]
          },
          {
            "uuid": "c21bd34f-f4df-46fe-99ee-b8a1b490dc10",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6e9e828e-f310-4f65-b190-042d2c1df71a",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "d0aeed67-2c79-4617-bc11-3a4fc8047020",
                  "type": "has_only_phrase",
                  "uuid": "bb69ed4e-8fdb-4f55-985e-8d2b1c9d5622"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "aa90d7e0-3b9f-407a-b98b-9506dbf10e64",
                  "type": "has_only_phrase",
                  "uuid": "e1bae0cc-61ed-4a7f-9e8e-1d238cd7982b"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "fca93b55-6666-4b7f-862c-c358ac022339",
                  "type": "has_only_phrase",
                  "uuid": "969ca0c9-b88f-4c25-a792-51d0f765351a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e6ffb631-88c5-4dd0-9285-36e6dced0216",
                  "name": "All Responses",
                  "uuid": "6e9e828e-f310-4f65-b190-042d2c1df71a"
                },
                {
                  "exit_uuid": "a74eb0b7-772a-4dbf-826f-82dc78ca61a4",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "d0aeed67-2c79-4617-bc11-3a4fc8047020"
                },
                {
                  "exit_uuid": "6225c896-89cc-46ed-a9dc-55f17967b4fb",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "aa90d7e0-3b9f-407a-b98b-9506dbf10e64"
                },
                {
                  "exit_uuid": "6291c44d-88a9-41db-914f-bcbae53f5f43",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "fca93b55-6666-4b7f-862c-c358ac022339"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e6ffb631-88c5-4dd0-9285-36e6dced0216",
                "destination_uuid": null
              },
              {
                "uuid": "a74eb0b7-772a-4dbf-826f-82dc78ca61a4",
                "destination_uuid": "910841cd-9729-40ff-9020-27d8cf6e38ba"
              },
              {
                "uuid": "6225c896-89cc-46ed-a9dc-55f17967b4fb",
                "destination_uuid": "988f9b20-8902-4a68-b5d6-aef91a5ef884"
              },
              {
                "uuid": "6291c44d-88a9-41db-914f-bcbae53f5f43",
                "destination_uuid": "d329f362-9347-4c4e-9321-5f260bdb77a5"
              }
            ]
          },
          {
            "uuid": "910841cd-9729-40ff-9020-27d8cf6e38ba",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2d20cb3a-81fc-4d8d-a0eb-0e7d973d0ece"
              }
            ],
            "exits": [
              {
                "uuid": "53a315f1-bc25-49bc-9ad0-9df56d455aa8",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "988f9b20-8902-4a68-b5d6-aef91a5ef884",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "16da95f9-764a-4182-84a3-74c74e3119bb"
              }
            ],
            "exits": [
              {
                "uuid": "0854a68a-3b13-4935-aed4-9d3b93eef32e",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "d329f362-9347-4c4e-9321-5f260bdb77a5",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d980f174-e937-40f0-98cc-4a5742bc02e2"
              }
            ],
            "exits": [
              {
                "uuid": "e03f1dbf-6002-4789-bf33-0b2fda40f9ad",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "2c6ded49-a7d5-4b48-912b-f13336e516b5",
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
                "uuid": "ae6e440e-7271-4164-8ac9-bdec83cb1640"
              }
            ],
            "exits": [
              {
                "uuid": "519a5b8f-937e-41fb-88fa-5b363dd92f4e",
                "destination_uuid": "25f80b83-9b64-4c53-9ccd-1e8bc8be060d"
              }
            ]
          },
          {
            "uuid": "25f80b83-9b64-4c53-9ccd-1e8bc8be060d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "aa9155c7-2155-4c66-b9a7-e37f6289b2c6",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "7c0fac5c-7a27-411e-8a2e-fa1c0b7bc4f6",
                  "type": "has_only_phrase",
                  "uuid": "cd0548e2-f184-4177-9774-3716a5b6b603"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "4a024b74-e688-4d13-a9d3-a950dedcbaa6",
                  "type": "has_only_phrase",
                  "uuid": "fa4d834b-acf2-49b8-ac08-6ccacd77a103"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "e5c2fd6c-288f-4bf7-91ad-3f07d19e365d",
                  "type": "has_only_phrase",
                  "uuid": "627b7e26-aed6-43ce-bd59-18572ec0c086"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b2c69fc6-d5c5-4a06-aa4f-45d6a3603ebc",
                  "name": "All Responses",
                  "uuid": "aa9155c7-2155-4c66-b9a7-e37f6289b2c6"
                },
                {
                  "exit_uuid": "092bd9b0-997a-4978-9715-29e93f75ac74",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "7c0fac5c-7a27-411e-8a2e-fa1c0b7bc4f6"
                },
                {
                  "exit_uuid": "83483c84-b8b6-4752-a9d5-bec0ea1a9d59",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "4a024b74-e688-4d13-a9d3-a950dedcbaa6"
                },
                {
                  "exit_uuid": "3529544c-b306-498f-baba-79c93b8f3d10",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "e5c2fd6c-288f-4bf7-91ad-3f07d19e365d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b2c69fc6-d5c5-4a06-aa4f-45d6a3603ebc",
                "destination_uuid": null
              },
              {
                "uuid": "092bd9b0-997a-4978-9715-29e93f75ac74",
                "destination_uuid": "26202706-6b10-4c46-b173-20500930e8b3"
              },
              {
                "uuid": "83483c84-b8b6-4752-a9d5-bec0ea1a9d59",
                "destination_uuid": "3a512aa5-c8f3-4dd6-8265-b4a7394d3bc0"
              },
              {
                "uuid": "3529544c-b306-498f-baba-79c93b8f3d10",
                "destination_uuid": "740bd379-6441-422d-bbd6-33ada637bc41"
              }
            ]
          },
          {
            "uuid": "26202706-6b10-4c46-b173-20500930e8b3",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2ca75f24-269d-4e91-96c4-5f7a12d2aa40"
              }
            ],
            "exits": [
              {
                "uuid": "fba5b0e7-936c-4895-a348-0ba39c80fa0f",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "3a512aa5-c8f3-4dd6-8265-b4a7394d3bc0",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6ec8dba1-62f1-4e2e-b06b-961e9d51165f"
              }
            ],
            "exits": [
              {
                "uuid": "f273ddfe-ab4d-4df3-a77e-feb693449212",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "740bd379-6441-422d-bbd6-33ada637bc41",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cdf4f12c-1d31-4ebf-baf7-c1555f023b38"
              }
            ],
            "exits": [
              {
                "uuid": "5c1cc02e-bed9-4e2c-9a3a-067c77684bc6",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "af4cf139-9f6b-4f74-8c92-0d78ef327750",
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
                "uuid": "762862bc-7fd1-46f5-9d59-f4fe9855d4ef"
              }
            ],
            "exits": [
              {
                "uuid": "196b8d8f-f945-421d-b73d-d7a9ddd7c441",
                "destination_uuid": "19e231b2-ce2e-4bfe-a241-eeb509c0eb8a"
              }
            ]
          },
          {
            "uuid": "19e231b2-ce2e-4bfe-a241-eeb509c0eb8a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "afe0df32-9e86-49db-8883-3006f9faaa8e",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "68812aef-60fd-4865-bfeb-ae79a37c05c6",
                  "type": "has_only_phrase",
                  "uuid": "ae043ecf-95d4-4c8c-89c6-2b07aac574e5"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "863b1684-bd3d-49b0-9073-f978a8399bf8",
                  "type": "has_only_phrase",
                  "uuid": "329d31a8-6d34-48bb-b149-76c58a18f29b"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "9ec26b14-d9ce-469b-9bc6-5f43bda60e0e",
                  "type": "has_only_phrase",
                  "uuid": "62538360-40d0-45fd-ba10-aceadd473bd0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3ab06607-6aa6-4cc6-977e-6c11ef4a8629",
                  "name": "All Responses",
                  "uuid": "afe0df32-9e86-49db-8883-3006f9faaa8e"
                },
                {
                  "exit_uuid": "78cc4087-23c3-4019-bad7-df13ff37fce0",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "68812aef-60fd-4865-bfeb-ae79a37c05c6"
                },
                {
                  "exit_uuid": "cad85026-5a42-48df-b701-ba5e778a9304",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "863b1684-bd3d-49b0-9073-f978a8399bf8"
                },
                {
                  "exit_uuid": "b4b8026d-f8cb-4dca-8395-b74ba3148691",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "9ec26b14-d9ce-469b-9bc6-5f43bda60e0e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3ab06607-6aa6-4cc6-977e-6c11ef4a8629",
                "destination_uuid": null
              },
              {
                "uuid": "78cc4087-23c3-4019-bad7-df13ff37fce0",
                "destination_uuid": "defa32a4-a997-47cd-808e-d0203fb19e10"
              },
              {
                "uuid": "cad85026-5a42-48df-b701-ba5e778a9304",
                "destination_uuid": "70fe497f-215c-46d7-9e82-8444acd92ecb"
              },
              {
                "uuid": "b4b8026d-f8cb-4dca-8395-b74ba3148691",
                "destination_uuid": "81928a1e-97d1-46f2-9b6b-d4418c346c2d"
              }
            ]
          },
          {
            "uuid": "defa32a4-a997-47cd-808e-d0203fb19e10",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2db3d3a3-3dcf-4653-af97-4ac844fe7a54"
              }
            ],
            "exits": [
              {
                "uuid": "c565f046-8730-42ca-a6a5-9286f22cffda",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "70fe497f-215c-46d7-9e82-8444acd92ecb",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b658b2bf-d840-4c1d-a086-1cfab682dd28"
              }
            ],
            "exits": [
              {
                "uuid": "743c94c2-12ec-4993-91a5-160ca90ae76b",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "81928a1e-97d1-46f2-9b6b-d4418c346c2d",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dd5c567b-db04-4dc1-9223-614a8246c9b2"
              }
            ],
            "exits": [
              {
                "uuid": "72ae43b5-8886-435e-b576-5fb704096659",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "107f4cd1-58a6-4341-b67d-b290e7eeffe9",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "83fdb9fd-2d5f-4a8a-99c1-041753fd3753"
              }
            ],
            "exits": [
              {
                "uuid": "db57b505-d87c-4c01-b989-70ed562727fe",
                "destination_uuid": "73b71e5d-8730-473a-b7ac-b00244692585"
              }
            ]
          },
          {
            "uuid": "73b71e5d-8730-473a-b7ac-b00244692585",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "46668cfd-1a60-4b79-8c84-9ed9940042af",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "d1330942-9d9a-428d-8415-c0a7da8749af",
                  "type": "has_only_phrase",
                  "uuid": "e9e3c32f-381a-4e60-8d4a-45bee08e5668"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "050bdd08-ef34-493a-8c07-f0da2789d3fb",
                  "type": "has_only_phrase",
                  "uuid": "a322e4d2-2457-426b-9c60-62342301288d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e0f7e3f0-f8f1-46a7-94e3-a418f4c1134f",
                  "name": "All Responses",
                  "uuid": "46668cfd-1a60-4b79-8c84-9ed9940042af"
                },
                {
                  "exit_uuid": "ddaadce6-be12-40e1-9433-be18f80e3f71",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "d1330942-9d9a-428d-8415-c0a7da8749af"
                },
                {
                  "exit_uuid": "9a5cf1db-1506-4b08-a96d-caba3c0df9fa",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "050bdd08-ef34-493a-8c07-f0da2789d3fb"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e0f7e3f0-f8f1-46a7-94e3-a418f4c1134f",
                "destination_uuid": null
              },
              {
                "uuid": "ddaadce6-be12-40e1-9433-be18f80e3f71",
                "destination_uuid": "e3f583f3-fa26-494f-8bf7-15796bc16cbd"
              },
              {
                "uuid": "9a5cf1db-1506-4b08-a96d-caba3c0df9fa",
                "destination_uuid": "93536feb-256a-4550-9ad2-716fb27d27da"
              }
            ]
          },
          {
            "uuid": "e3f583f3-fa26-494f-8bf7-15796bc16cbd",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "62d58924-32c5-44b8-80ea-a43c098843c9"
              }
            ],
            "exits": [
              {
                "uuid": "1026ceaf-cde8-4704-8840-c9166e3f2a72",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "93536feb-256a-4550-9ad2-716fb27d27da",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "040e894e-6ac8-469e-adf0-ab5195e304d0"
              }
            ],
            "exits": [
              {
                "uuid": "5bc5b155-432d-40c2-94d8-62618caac304",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "fd371db3-6b84-4498-9399-42b242cca170",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "2096d452-6cd4-4622-895a-e31d2d43043d"
              }
            ],
            "exits": [
              {
                "uuid": "01f5f56f-05c6-4c50-89c0-0a4b6b1f6f9d",
                "destination_uuid": "85f5e1a6-babc-497e-b88d-326cd1838cae"
              }
            ]
          },
          {
            "uuid": "85f5e1a6-babc-497e-b88d-326cd1838cae",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9b0885f1-0bb1-4d5c-879e-e0803279bf10",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "f4d2545d-6adb-4078-b740-b19d9cc838f8",
                  "type": "has_only_phrase",
                  "uuid": "a769ada6-5b5c-4b5c-b60a-5795ee4b7264"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "8b8f9fa1-f25a-4ded-a212-039ee16fb2cd",
                  "type": "has_only_phrase",
                  "uuid": "ce2ad97e-6492-4879-8205-15a1e86eaf52"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "65d7d62e-4b5f-46e3-9462-16308e9ba577",
                  "name": "All Responses",
                  "uuid": "9b0885f1-0bb1-4d5c-879e-e0803279bf10"
                },
                {
                  "exit_uuid": "1901bef4-9a07-46bc-8df3-4be4d57329dd",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "f4d2545d-6adb-4078-b740-b19d9cc838f8"
                },
                {
                  "exit_uuid": "3b878665-5a81-4844-b392-821a82a5c4c5",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "8b8f9fa1-f25a-4ded-a212-039ee16fb2cd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "65d7d62e-4b5f-46e3-9462-16308e9ba577",
                "destination_uuid": null
              },
              {
                "uuid": "1901bef4-9a07-46bc-8df3-4be4d57329dd",
                "destination_uuid": "1d6995f4-f7d6-4dd5-9067-10526dedd018"
              },
              {
                "uuid": "3b878665-5a81-4844-b392-821a82a5c4c5",
                "destination_uuid": "0298972a-6f48-4e11-8d13-5bdd803f80bd"
              }
            ]
          },
          {
            "uuid": "1d6995f4-f7d6-4dd5-9067-10526dedd018",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d1d43fda-5c68-4f64-a9e0-19b9d0e43391"
              }
            ],
            "exits": [
              {
                "uuid": "30462581-0371-4c13-aa12-f0afd650b580",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "0298972a-6f48-4e11-8d13-5bdd803f80bd",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "92656d16-ece6-4da6-a5fc-4b055a52d7ab"
              }
            ],
            "exits": [
              {
                "uuid": "ebeed961-e35b-49d9-a64b-029df02f0b5f",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "7b8536e9-dc41-4891-a272-f77a572701e9",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "7c6d138d-70ea-40f8-8daf-588190685ed7"
              }
            ],
            "exits": [
              {
                "uuid": "a072cdf7-1959-4c3c-b6f3-41edfe91108e",
                "destination_uuid": "3e07aca6-3598-4b76-acaa-7dffcdbf98eb"
              }
            ]
          },
          {
            "uuid": "3e07aca6-3598-4b76-acaa-7dffcdbf98eb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7878b881-0483-455f-a8e6-f7c327a5f38d",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "a6fd4207-a066-492d-a049-9a922d465c47",
                  "type": "has_only_phrase",
                  "uuid": "c3179102-f824-41e3-95d0-4cb9b34c0fef"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "1975175b-95b2-4ec2-98f7-d297dea05abe",
                  "type": "has_only_phrase",
                  "uuid": "90e0d2eb-46ef-40ef-b172-82c3dcb06695"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fb72e21e-1425-4254-b72e-ff3afe1473f5",
                  "name": "All Responses",
                  "uuid": "7878b881-0483-455f-a8e6-f7c327a5f38d"
                },
                {
                  "exit_uuid": "ee9f600b-c60d-47fc-be88-9c41967ee9cd",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "a6fd4207-a066-492d-a049-9a922d465c47"
                },
                {
                  "exit_uuid": "86c11ef2-c920-43a9-80da-def830816557",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "1975175b-95b2-4ec2-98f7-d297dea05abe"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fb72e21e-1425-4254-b72e-ff3afe1473f5",
                "destination_uuid": null
              },
              {
                "uuid": "ee9f600b-c60d-47fc-be88-9c41967ee9cd",
                "destination_uuid": "ed4bbb41-0ddb-4cd0-a179-d53fbf33e314"
              },
              {
                "uuid": "86c11ef2-c920-43a9-80da-def830816557",
                "destination_uuid": "17c6ffd6-d2c9-4cef-9a74-dcd49b06b426"
              }
            ]
          },
          {
            "uuid": "ed4bbb41-0ddb-4cd0-a179-d53fbf33e314",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6a64734d-be1f-4e67-82a7-702e03a9188d"
              }
            ],
            "exits": [
              {
                "uuid": "3506abc2-6b96-4591-966a-76a390322536",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "17c6ffd6-d2c9-4cef-9a74-dcd49b06b426",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "42fdbf76-ee89-42b3-836a-b5faa723ddad"
              }
            ],
            "exits": [
              {
                "uuid": "4d445c49-5122-454c-845f-ecd69a0cd225",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "56185780-b53b-4a68-947d-3ee319112e3c",
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
                "uuid": "4c1caf6a-583d-4885-91e0-3f2c32a45b89"
              }
            ],
            "exits": [
              {
                "uuid": "006700c1-04da-4416-9ced-2b6c3be982ac",
                "destination_uuid": "531ed399-afa3-48d7-9874-2a9ddebda9b8"
              }
            ]
          },
          {
            "uuid": "531ed399-afa3-48d7-9874-2a9ddebda9b8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4c5de725-825f-4c59-824a-ae7d3e4caa6c",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "b52f4539-c8fe-47a8-90d7-eba62e556f69",
                  "type": "has_only_phrase",
                  "uuid": "6f798aca-d74b-47ff-8467-3f74024a93d1"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "c8be8187-3df8-46f5-bf3a-667f80301fa5",
                  "type": "has_only_phrase",
                  "uuid": "443137b5-2552-43d3-a7b1-5cab78e34eae"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "ad2201a2-0538-4973-be82-76e7b0523f37",
                  "type": "has_only_phrase",
                  "uuid": "aa244dca-ee35-44c8-b470-7ce7a455963b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7fb9f979-eb90-4692-bfcd-837c03727576",
                  "name": "All Responses",
                  "uuid": "4c5de725-825f-4c59-824a-ae7d3e4caa6c"
                },
                {
                  "exit_uuid": "e269c053-68d3-4e38-908f-e9bc25eec9ee",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "b52f4539-c8fe-47a8-90d7-eba62e556f69"
                },
                {
                  "exit_uuid": "8b2192af-7025-4de0-b33b-aa557d396d99",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "c8be8187-3df8-46f5-bf3a-667f80301fa5"
                },
                {
                  "exit_uuid": "abacaaad-cc2c-4958-bf92-7719912ae9af",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "ad2201a2-0538-4973-be82-76e7b0523f37"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7fb9f979-eb90-4692-bfcd-837c03727576",
                "destination_uuid": null
              },
              {
                "uuid": "e269c053-68d3-4e38-908f-e9bc25eec9ee",
                "destination_uuid": "824b883b-5632-4bdd-b87b-ea69308be019"
              },
              {
                "uuid": "8b2192af-7025-4de0-b33b-aa557d396d99",
                "destination_uuid": "d8d96ce0-0b58-4dd7-b417-2b46074a5f02"
              },
              {
                "uuid": "abacaaad-cc2c-4958-bf92-7719912ae9af",
                "destination_uuid": "393eab7d-e1cd-4fa3-83ab-7debcfee94e6"
              }
            ]
          },
          {
            "uuid": "824b883b-5632-4bdd-b87b-ea69308be019",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6d77753b-eff0-48c1-9aa9-b1ad875e893b"
              }
            ],
            "exits": [
              {
                "uuid": "b439f9e9-97c4-4f58-b8d0-3b748e89d5dc",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "d8d96ce0-0b58-4dd7-b417-2b46074a5f02",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1a4737ac-30da-4ae2-bc35-1ff161c7f1a7"
              }
            ],
            "exits": [
              {
                "uuid": "e9eb17a9-6c91-4c29-8da8-83b529b3c25d",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "393eab7d-e1cd-4fa3-83ab-7debcfee94e6",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d67d5479-b046-4666-b862-5cbe8a4c5f2c"
              }
            ],
            "exits": [
              {
                "uuid": "5a6a1da9-2bb8-4819-8261-da5d44a5ce76",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "d86a9b5e-7e78-42ed-a069-73b3f43af6be",
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
                "uuid": "21125a47-5b25-49b6-a1ec-a6382dbeafa3"
              }
            ],
            "exits": [
              {
                "uuid": "983f4f31-a3d0-42f0-9217-696e689b184f",
                "destination_uuid": "3b143b96-49a8-4679-b215-b49316461438"
              }
            ]
          },
          {
            "uuid": "3b143b96-49a8-4679-b215-b49316461438",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e08335d4-c99d-42a7-a6b5-7bbeb49877da",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "730bcf26-b4a6-43fc-81b7-cdf15c70b40d",
                  "type": "has_only_phrase",
                  "uuid": "75b313b7-492e-4074-aabd-30272b887a04"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "e1d4dca5-0b15-41f3-9385-0d74ebe504c2",
                  "type": "has_only_phrase",
                  "uuid": "9050e922-c2d2-41e0-99bc-b5485d959e52"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "b98047fd-c415-4c92-b65c-e8e075d52699",
                  "type": "has_only_phrase",
                  "uuid": "c5fff784-9966-4215-a9ce-c4386b9406f3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fbeeeb20-25e2-4d69-9444-23a9f6a1760b",
                  "name": "All Responses",
                  "uuid": "e08335d4-c99d-42a7-a6b5-7bbeb49877da"
                },
                {
                  "exit_uuid": "0020dd34-2799-4b13-9639-86a9d22b0c55",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "730bcf26-b4a6-43fc-81b7-cdf15c70b40d"
                },
                {
                  "exit_uuid": "acb44cfd-3938-4165-9ac3-d18e729f6784",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "e1d4dca5-0b15-41f3-9385-0d74ebe504c2"
                },
                {
                  "exit_uuid": "0e43abcb-b802-46e7-a67e-9e3af7558a3b",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "b98047fd-c415-4c92-b65c-e8e075d52699"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fbeeeb20-25e2-4d69-9444-23a9f6a1760b",
                "destination_uuid": null
              },
              {
                "uuid": "0020dd34-2799-4b13-9639-86a9d22b0c55",
                "destination_uuid": "4524393c-5e19-49fb-9690-7a6286109d49"
              },
              {
                "uuid": "acb44cfd-3938-4165-9ac3-d18e729f6784",
                "destination_uuid": "3f652c1f-342f-4402-b99b-7e9e1edcf3bf"
              },
              {
                "uuid": "0e43abcb-b802-46e7-a67e-9e3af7558a3b",
                "destination_uuid": "719454a2-7b8a-487d-af04-f46409b2a90f"
              }
            ]
          },
          {
            "uuid": "4524393c-5e19-49fb-9690-7a6286109d49",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e2e6f1ed-c120-420c-aec3-89912f65572d"
              }
            ],
            "exits": [
              {
                "uuid": "d167eb6b-ed33-4dba-8bbf-4d3f3c5dd75c",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "3f652c1f-342f-4402-b99b-7e9e1edcf3bf",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "56e2944d-2b1d-4d40-891d-843adaccc799"
              }
            ],
            "exits": [
              {
                "uuid": "de88f5ed-426a-41cc-b67e-036a7035a70d",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "719454a2-7b8a-487d-af04-f46409b2a90f",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2fd175db-a7e2-44eb-b579-6c44ec4b21c3"
              }
            ],
            "exits": [
              {
                "uuid": "532f5224-542c-4835-bcc1-7ed32032aaae",
                "destination_uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7"
              }
            ]
          },
          {
            "uuid": "5784b8b2-ad5f-4738-a8d8-dc92542c92c7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a5cd8135-13b7-47a2-a784-91dd29f04711",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "60d02ed7-178d-4dca-af67-6a4d9602540d",
                  "type": "has_only_phrase",
                  "uuid": "a9cc20d8-2c88-4017-9319-57541467cd2f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b65d4eb5-ea95-4032-8181-00fc2022ce6e",
                  "name": "All Responses",
                  "uuid": "a5cd8135-13b7-47a2-a784-91dd29f04711"
                },
                {
                  "exit_uuid": "0d955201-263d-477e-9a69-5ea26e91008d",
                  "name": "Next",
                  "uuid": "60d02ed7-178d-4dca-af67-6a4d9602540d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b65d4eb5-ea95-4032-8181-00fc2022ce6e",
                "destination_uuid": null
              },
              {
                "uuid": "0d955201-263d-477e-9a69-5ea26e91008d",
                "destination_uuid": "4cb52e5f-d763-4450-a64d-08c44fe7a889"
              }
            ]
          },
          {
            "uuid": "4cb52e5f-d763-4450-a64d-08c44fe7a889",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "adbb2ca6-77e7-4a02-866c-30aa1401cebb"
              }
            ],
            "exits": [
              {
                "uuid": "d0f414d6-ce46-427b-a0e1-14f35a364e8d",
                "destination_uuid": "36cba71b-f0b3-4585-bb1c-851cc9cc80e3"
              }
            ]
          },
          {
            "uuid": "36cba71b-f0b3-4585-bb1c-851cc9cc80e3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ab779103-4881-463a-a63d-26547bd5b1f0",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "89bf02e6-90c3-4c45-85b0-cfd8ee3101c3",
                  "type": "has_only_phrase",
                  "uuid": "ee424d38-6a4c-4488-856c-635d6f0fe726"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "f7348351-5a26-4d54-a222-11574a178665",
                  "type": "has_only_phrase",
                  "uuid": "8e98a772-bf8f-42cd-a8da-bf4fa22f36e9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "81556c2e-cde5-4f31-86ee-9e0b0e827848",
                  "name": "All Responses",
                  "uuid": "ab779103-4881-463a-a63d-26547bd5b1f0"
                },
                {
                  "exit_uuid": "20577255-1cf4-4fd3-8897-c1f00ab84b34",
                  "name": "No",
                  "uuid": "89bf02e6-90c3-4c45-85b0-cfd8ee3101c3"
                },
                {
                  "exit_uuid": "ae166424-9b3e-4ea8-a432-a2949dddaae7",
                  "name": "Yes",
                  "uuid": "f7348351-5a26-4d54-a222-11574a178665"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "81556c2e-cde5-4f31-86ee-9e0b0e827848",
                "destination_uuid": null
              },
              {
                "uuid": "20577255-1cf4-4fd3-8897-c1f00ab84b34",
                "destination_uuid": "b9e5d1ab-b212-4ced-947d-e9f813d0ad78"
              },
              {
                "uuid": "ae166424-9b3e-4ea8-a432-a2949dddaae7",
                "destination_uuid": "a3ec10f5-9390-4ef2-8477-5c9c960f947e"
              }
            ]
          },
          {
            "uuid": "b9e5d1ab-b212-4ced-947d-e9f813d0ad78",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "700c4876-8289-4cfe-ab42-98a994f0fcb3"
              }
            ],
            "exits": [
              {
                "uuid": "3abf7999-ea81-4b83-9d2d-d10ad4c1781b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "a3ec10f5-9390-4ef2-8477-5c9c960f947e",
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
                "uuid": "9901ec61-8642-4946-b8cb-2b36db5f79ad"
              }
            ],
            "exits": [
              {
                "uuid": "e76a5a38-756f-4a13-8b0d-c42b8bfe3bee",
                "destination_uuid": "ce9e2406-e75b-4c43-9164-9fc16d49f04f"
              }
            ]
          },
          {
            "uuid": "ce9e2406-e75b-4c43-9164-9fc16d49f04f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6924d5d7-5248-4635-b7a7-7afaae9f41e9",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "f213b2f8-99a3-4bb8-bba4-9a7bca4c21c4",
                  "type": "has_only_phrase",
                  "uuid": "e65172b6-becf-47bb-8424-ee80c6d8520f"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "6bb6dc01-f32a-4938-af0a-588699c26742",
                  "type": "has_only_phrase",
                  "uuid": "94acb2e1-5305-4aa5-8bf8-68d4f9c099c5"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "81d164df-cdf6-402e-9ec6-69810ca09980",
                  "type": "has_only_phrase",
                  "uuid": "62039b3e-9ae0-42d9-8d28-32d373beecf3"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "0e0cd0d0-ac3c-4162-b944-74e774230642",
                  "type": "has_only_phrase",
                  "uuid": "8e986f7b-f3e8-4a54-a8c0-7f0ffb8fd1ca"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "c2f346cf-b3c3-421a-8d7e-948cc920e5cc",
                  "type": "has_only_phrase",
                  "uuid": "5847dea0-669c-45d1-a412-a390eea8f527"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "56123f6d-de44-4e0d-92dc-8dc7c2915bc7",
                  "type": "has_only_phrase",
                  "uuid": "72bda4d8-914a-4324-8d50-d4f567362bdf"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "7eab193a-389d-4cf7-a433-416c563e762f",
                  "type": "has_only_phrase",
                  "uuid": "eb545105-2b84-4227-97ce-160380efbbc8"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "da92c360-aeb2-4d21-be9e-d655c514a0c5",
                  "type": "has_only_phrase",
                  "uuid": "50593dbb-d5a2-4233-9e0d-863d6aaeefd0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0eb785a0-c2e8-481a-8e13-d0845cae3fa4",
                  "name": "All Responses",
                  "uuid": "6924d5d7-5248-4635-b7a7-7afaae9f41e9"
                },
                {
                  "exit_uuid": "061813b7-5146-41f0-b401-163622bd619b",
                  "name": "I don’t have enough time",
                  "uuid": "f213b2f8-99a3-4bb8-bba4-9a7bca4c21c4"
                },
                {
                  "exit_uuid": "a9eba1d5-8a6c-474f-9c35-0368390d5900",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "6bb6dc01-f32a-4938-af0a-588699c26742"
                },
                {
                  "exit_uuid": "de535327-771a-421d-ad4c-f81999188bcf",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "81d164df-cdf6-402e-9ec6-69810ca09980"
                },
                {
                  "exit_uuid": "a8e9b765-d8a3-4ad6-9a72-c678829c8bdd",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "0e0cd0d0-ac3c-4162-b944-74e774230642"
                },
                {
                  "exit_uuid": "5f1bb075-462a-45b0-a7e9-82fa7178523a",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "c2f346cf-b3c3-421a-8d7e-948cc920e5cc"
                },
                {
                  "exit_uuid": "bbb26210-4ff3-4d6a-ba45-3bb1a9fd01f9",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "56123f6d-de44-4e0d-92dc-8dc7c2915bc7"
                },
                {
                  "exit_uuid": "65046fe0-de2c-4ada-bac7-45abfd2481c0",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "7eab193a-389d-4cf7-a433-416c563e762f"
                },
                {
                  "exit_uuid": "583fdc26-7f27-4034-b188-9cf8c78a84f8",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "da92c360-aeb2-4d21-be9e-d655c514a0c5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0eb785a0-c2e8-481a-8e13-d0845cae3fa4",
                "destination_uuid": null
              },
              {
                "uuid": "061813b7-5146-41f0-b401-163622bd619b",
                "destination_uuid": "0053fabf-e95d-4759-af16-d4ce9cc8c686"
              },
              {
                "uuid": "a9eba1d5-8a6c-474f-9c35-0368390d5900",
                "destination_uuid": "2c6ded49-a7d5-4b48-912b-f13336e516b5"
              },
              {
                "uuid": "de535327-771a-421d-ad4c-f81999188bcf",
                "destination_uuid": "af4cf139-9f6b-4f74-8c92-0d78ef327750"
              },
              {
                "uuid": "a8e9b765-d8a3-4ad6-9a72-c678829c8bdd",
                "destination_uuid": "107f4cd1-58a6-4341-b67d-b290e7eeffe9"
              },
              {
                "uuid": "5f1bb075-462a-45b0-a7e9-82fa7178523a",
                "destination_uuid": "fd371db3-6b84-4498-9399-42b242cca170"
              },
              {
                "uuid": "bbb26210-4ff3-4d6a-ba45-3bb1a9fd01f9",
                "destination_uuid": "7b8536e9-dc41-4891-a272-f77a572701e9"
              },
              {
                "uuid": "65046fe0-de2c-4ada-bac7-45abfd2481c0",
                "destination_uuid": "56185780-b53b-4a68-947d-3ee319112e3c"
              },
              {
                "uuid": "583fdc26-7f27-4034-b188-9cf8c78a84f8",
                "destination_uuid": "d86a9b5e-7e78-42ed-a069-73b3f43af6be"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8bc27087-d8de-4b93-9436-de2addb4e70d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4643af59-380a-4cb5-9c04-ecc1ed206742",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "821bd26e-769d-44e3-939c-2ec8c81d0df2"
              }
            ],
            "exits": [
              {
                "uuid": "f760e121-3440-44f6-8570-909a2b3ca459",
                "destination_uuid": "2313d803-4dae-481d-b298-a1b7ba3f3a47"
              }
            ]
          },
          {
            "uuid": "2313d803-4dae-481d-b298-a1b7ba3f3a47",
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
                "uuid": "54ee0d91-2a8c-41d8-8b55-0c8ea7d4d17a"
              }
            ],
            "exits": [
              {
                "uuid": "76d190b8-9b00-4403-b7ce-3932ff4a4c51",
                "destination_uuid": "445619bc-8240-43c4-a211-96c532937dd7"
              }
            ]
          },
          {
            "uuid": "445619bc-8240-43c4-a211-96c532937dd7",
            "actions": [],
            "exits": [
              {
                "uuid": "b8790e61-a52b-445d-8230-124135e645a7",
                "destination_uuid": "13962ae1-f4c5-4b77-9dbc-4f46f775f773"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f163dcf9-8587-4694-a0b7-8a90513d66d9",
              "cases": [],
              "categories": [
                {
                  "uuid": "f163dcf9-8587-4694-a0b7-8a90513d66d9",
                  "name": "All Responses",
                  "exit_uuid": "b8790e61-a52b-445d-8230-124135e645a7"
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
            "uuid": "13962ae1-f4c5-4b77-9dbc-4f46f775f773",
            "actions": [
              {
                "uuid": "e0a5d8c8-7052-41b3-b1fc-af62170ca9d6",
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
                "uuid": "647858f8-cf79-4283-8224-d029a918209e",
                "destination_uuid": "fefaf69e-c480-448d-a21e-204d502487c5"
              }
            ]
          },
          {
            "uuid": "fefaf69e-c480-448d-a21e-204d502487c5",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "81ad2521-e522-40a7-9b08-57beb6f9e30d"
              }
            ],
            "exits": [
              {
                "uuid": "5dd00c06-1852-4c9e-b90c-0361cbdcaffd",
                "destination_uuid": "bdbea64e-ae78-49ef-a588-1b6f0a344e1b"
              }
            ]
          },
          {
            "uuid": "bdbea64e-ae78-49ef-a588-1b6f0a344e1b",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2bc4d2ec-122f-4b49-a3be-56640ba60a02"
              }
            ],
            "exits": [
              {
                "uuid": "0cdc0398-0522-4dc1-a74a-127217cf1394",
                "destination_uuid": "9f7b068e-c789-4ab8-8720-50fbc2474838"
              }
            ]
          },
          {
            "uuid": "9f7b068e-c789-4ab8-8720-50fbc2474838",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "71841e22-e712-488f-8cd4-3fa75dccacba"
              }
            ],
            "exits": [
              {
                "uuid": "cd213021-4764-46a6-9663-086eafb929ee",
                "destination_uuid": "fb5ea61a-a2a2-4141-9eb0-db9381b93a41"
              }
            ]
          },
          {
            "uuid": "fb5ea61a-a2a2-4141-9eb0-db9381b93a41",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "1ec7dada-cd6d-4795-bedb-005c4f760b5a"
              }
            ],
            "exits": [
              {
                "uuid": "b23c1411-876d-4065-80a3-78fad00bf536",
                "destination_uuid": "9d55f58f-9c38-462d-a779-69945abeb9b4"
              }
            ]
          },
          {
            "uuid": "9d55f58f-9c38-462d-a779-69945abeb9b4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "84269cbb-037b-467e-9ed1-33d5cb60da69",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "acc7305e-908d-4948-94b0-473a4e26333e",
                  "type": "has_only_phrase",
                  "uuid": "ecc5439c-06de-4fbf-a3f7-bebce11498b0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "77113c65-c730-43d9-b5b5-3657c7c2d860",
                  "name": "All Responses",
                  "uuid": "84269cbb-037b-467e-9ed1-33d5cb60da69"
                },
                {
                  "exit_uuid": "2911d649-72cd-42d4-8cd3-dd35a8c3df72",
                  "name": "Let me hear your story",
                  "uuid": "acc7305e-908d-4948-94b0-473a4e26333e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "77113c65-c730-43d9-b5b5-3657c7c2d860",
                "destination_uuid": null
              },
              {
                "uuid": "2911d649-72cd-42d4-8cd3-dd35a8c3df72",
                "destination_uuid": "c4f54c53-f3f1-46df-ae51-414d4868c02f"
              }
            ]
          },
          {
            "uuid": "c4f54c53-f3f1-46df-ae51-414d4868c02f",
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
                "uuid": "b0bab419-825e-4e78-988b-ce51ed8d2682"
              }
            ],
            "exits": [
              {
                "uuid": "c705bfb3-259a-4477-82c5-75b9f5382624",
                "destination_uuid": "9f3ac927-65d8-4686-8009-a7045c319293"
              }
            ]
          },
          {
            "uuid": "9f3ac927-65d8-4686-8009-a7045c319293",
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
                "uuid": "f61fa9e7-0eb4-4e9d-b4d9-d42bc25fd030"
              }
            ],
            "exits": [
              {
                "uuid": "6a7a819a-a6c2-43a0-b004-da6d2a3fee7f",
                "destination_uuid": "619eb39a-cb77-4b79-ae39-8186e76b4a1f"
              }
            ]
          },
          {
            "uuid": "619eb39a-cb77-4b79-ae39-8186e76b4a1f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a50f65fe-065b-49a4-9274-b32b815935f7",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "ec840c39-d6b4-4435-b757-4e872d343d60",
                  "type": "has_only_phrase",
                  "uuid": "1ec925f6-785c-465b-a654-f8b624dc47e6"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "1795d955-5e05-4bd5-bf66-be6d713b255d",
                  "type": "has_only_phrase",
                  "uuid": "2ef71f9e-f35c-4706-8467-1ecc7f00495e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9c860f9d-f284-453e-a17c-855c0e56a097",
                  "name": "All Responses",
                  "uuid": "a50f65fe-065b-49a4-9274-b32b815935f7"
                },
                {
                  "exit_uuid": "6d8d1abf-287b-4e6e-b378-f7528ad8e328",
                  "name": "Previous",
                  "uuid": "ec840c39-d6b4-4435-b757-4e872d343d60"
                },
                {
                  "exit_uuid": "e4baeb45-834c-4259-8c58-438aadff2909",
                  "name": "Next",
                  "uuid": "1795d955-5e05-4bd5-bf66-be6d713b255d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9c860f9d-f284-453e-a17c-855c0e56a097",
                "destination_uuid": null
              },
              {
                "uuid": "6d8d1abf-287b-4e6e-b378-f7528ad8e328",
                "destination_uuid": "c4f54c53-f3f1-46df-ae51-414d4868c02f"
              },
              {
                "uuid": "e4baeb45-834c-4259-8c58-438aadff2909",
                "destination_uuid": "8b739aca-1edc-4a5b-8142-a1d83cefc5bb"
              }
            ]
          },
          {
            "uuid": "8b739aca-1edc-4a5b-8142-a1d83cefc5bb",
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
                "uuid": "25689940-3204-46cd-a3a1-572c03f06991"
              }
            ],
            "exits": [
              {
                "uuid": "84ed6793-3bdc-4ad9-9b3a-c5680200ef33",
                "destination_uuid": "b6d0ae7a-7ccd-4dd6-b1fe-6fa6792964c4"
              }
            ]
          },
          {
            "uuid": "b6d0ae7a-7ccd-4dd6-b1fe-6fa6792964c4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3faed375-c804-4d40-bc75-38fc8ae4fbc6",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "603301d7-88b8-4538-bfd3-a91d104922f1",
                  "type": "has_only_phrase",
                  "uuid": "38addd1f-f22c-4c34-b1a5-a1ab3c15e40b"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "130e86b9-41c2-4778-9145-a832caa5d8a8",
                  "type": "has_only_phrase",
                  "uuid": "c6887c2e-d28e-4119-86f9-bdaa8205d4dc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fb3934ce-ae58-4a57-bbee-eb5115dfffe6",
                  "name": "All Responses",
                  "uuid": "3faed375-c804-4d40-bc75-38fc8ae4fbc6"
                },
                {
                  "exit_uuid": "745ff8b1-3e68-463f-8647-1cbe6cee2684",
                  "name": "Previous",
                  "uuid": "603301d7-88b8-4538-bfd3-a91d104922f1"
                },
                {
                  "exit_uuid": "66a6ee7b-70a3-41e6-b85e-f6413d53c0c2",
                  "name": "Next",
                  "uuid": "130e86b9-41c2-4778-9145-a832caa5d8a8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fb3934ce-ae58-4a57-bbee-eb5115dfffe6",
                "destination_uuid": null
              },
              {
                "uuid": "745ff8b1-3e68-463f-8647-1cbe6cee2684",
                "destination_uuid": "9f3ac927-65d8-4686-8009-a7045c319293"
              },
              {
                "uuid": "66a6ee7b-70a3-41e6-b85e-f6413d53c0c2",
                "destination_uuid": "5cb1d211-2c8b-4d12-903b-db33a61f3413"
              }
            ]
          },
          {
            "uuid": "5cb1d211-2c8b-4d12-903b-db33a61f3413",
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
                "uuid": "d8355a0c-7bac-4219-9334-ceedc9b661b5"
              }
            ],
            "exits": [
              {
                "uuid": "cab0f761-953f-4a5b-bc4e-159156380a2d",
                "destination_uuid": "ed895cfd-5d79-4f6c-ae3e-d011f23f0377"
              }
            ]
          },
          {
            "uuid": "ed895cfd-5d79-4f6c-ae3e-d011f23f0377",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2103c8df-3757-40af-8ffb-81241e6c7113",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "371ad76d-af8d-438c-ba56-4f2cd67947a8",
                  "type": "has_only_phrase",
                  "uuid": "f9efc8b7-4a3d-497d-a60f-ccdc63d179dd"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "c43da79c-0d5b-4d3f-ae0c-544d2e762bfe",
                  "type": "has_only_phrase",
                  "uuid": "86128569-c65e-4f69-8635-f59126538d30"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c44354ee-d984-4875-89b0-f6c50779674c",
                  "name": "All Responses",
                  "uuid": "2103c8df-3757-40af-8ffb-81241e6c7113"
                },
                {
                  "exit_uuid": "c347ea21-f73e-49fd-9a87-50269d5d2d99",
                  "name": "Previous",
                  "uuid": "371ad76d-af8d-438c-ba56-4f2cd67947a8"
                },
                {
                  "exit_uuid": "08575752-8f9b-4b8e-b205-b884b9a36626",
                  "name": "Next",
                  "uuid": "c43da79c-0d5b-4d3f-ae0c-544d2e762bfe"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c44354ee-d984-4875-89b0-f6c50779674c",
                "destination_uuid": null
              },
              {
                "uuid": "c347ea21-f73e-49fd-9a87-50269d5d2d99",
                "destination_uuid": "8b739aca-1edc-4a5b-8142-a1d83cefc5bb"
              },
              {
                "uuid": "08575752-8f9b-4b8e-b205-b884b9a36626",
                "destination_uuid": "7f73ac03-a012-4d3c-b234-71583e947eb7"
              }
            ]
          },
          {
            "uuid": "7f73ac03-a012-4d3c-b234-71583e947eb7",
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
                "uuid": "25b8a1d0-2525-46b8-b916-f370adedd740"
              }
            ],
            "exits": [
              {
                "uuid": "96b07aa7-0bd6-46f7-a9d5-dcce271c8cd9",
                "destination_uuid": "d526e75f-ddfb-42a3-9fa3-fb0ada20379c"
              }
            ]
          },
          {
            "uuid": "d526e75f-ddfb-42a3-9fa3-fb0ada20379c",
            "actions": [],
            "exits": [
              {
                "uuid": "d8ba156a-4b42-489b-a0c2-c998c8c8042f",
                "destination_uuid": "f893a2dd-85c6-4287-b56c-26355482c27a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "1bb5d5cb-ffa4-4c6c-be1f-f9febbeb8168",
              "cases": [],
              "categories": [
                {
                  "uuid": "1bb5d5cb-ffa4-4c6c-be1f-f9febbeb8168",
                  "name": "All Responses",
                  "exit_uuid": "d8ba156a-4b42-489b-a0c2-c998c8c8042f"
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
            "uuid": "f893a2dd-85c6-4287-b56c-26355482c27a",
            "actions": [
              {
                "uuid": "2393e659-5b88-4a08-a716-64cbc9773d80",
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
                "uuid": "14d3283c-3770-4952-86d8-0073b03e07d1",
                "destination_uuid": "cf64c02e-f7e9-4364-b5ea-e086a780e49c"
              }
            ]
          },
          {
            "uuid": "cf64c02e-f7e9-4364-b5ea-e086a780e49c",
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
                "uuid": "209c5550-f99c-4b5f-a4aa-50523e512af6"
              }
            ],
            "exits": [
              {
                "uuid": "daf13332-5844-44ed-99aa-0088c07b9f50",
                "destination_uuid": "a0f24960-b5ec-4b60-a1d5-b650d39401b7"
              }
            ]
          },
          {
            "uuid": "a0f24960-b5ec-4b60-a1d5-b650d39401b7",
            "actions": [],
            "exits": [
              {
                "uuid": "656d1d29-b60f-4240-8c13-f31c16f3be71",
                "destination_uuid": "e6e8b35c-7cb5-4b76-b311-8b44ada7f7d4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "47b70ff1-5448-4b5d-8b43-46a421c75de9",
              "cases": [],
              "categories": [
                {
                  "uuid": "47b70ff1-5448-4b5d-8b43-46a421c75de9",
                  "name": "All Responses",
                  "exit_uuid": "656d1d29-b60f-4240-8c13-f31c16f3be71"
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
            "uuid": "e6e8b35c-7cb5-4b76-b311-8b44ada7f7d4",
            "actions": [
              {
                "uuid": "9add0316-f2fb-4292-a5f7-9b13e0aeb8f8",
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
                "uuid": "7e879527-1ed3-4152-8bb7-495d16b1b79f",
                "destination_uuid": "44d27dd7-4081-4a3b-9416-83ed9fe0edd1"
              }
            ]
          },
          {
            "uuid": "44d27dd7-4081-4a3b-9416-83ed9fe0edd1",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fed873d7-85b3-470f-9789-97f6cd15a7fb"
              }
            ],
            "exits": [
              {
                "uuid": "c908556e-a4d6-4567-91fa-23bdbcc9d09e",
                "destination_uuid": "db50416c-3a60-4800-9fdc-fa9f154c394f"
              }
            ]
          },
          {
            "uuid": "db50416c-3a60-4800-9fdc-fa9f154c394f",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "bcadf26c-a00c-4974-86c6-0747e57c2091"
              }
            ],
            "exits": [
              {
                "uuid": "039f384b-b5a3-4f3a-b465-6cec5b289105",
                "destination_uuid": "e898de14-ae94-4f6e-b793-8b24f41c255c"
              }
            ]
          },
          {
            "uuid": "e898de14-ae94-4f6e-b793-8b24f41c255c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "87da4c6f-bc9d-475d-ae19-dae1f8f40e00",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "95f17935-3a95-4551-afc7-562464d62b1f",
                  "type": "has_only_phrase",
                  "uuid": "4a28b029-97b8-4778-b426-b0927ba5b99f"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "678b3412-1ae2-4a74-b31b-148b78479a00",
                  "type": "has_only_phrase",
                  "uuid": "6dc50a45-2413-448e-bf9b-58d4f68048e7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0ad2c3b1-1ba3-4ece-bd4e-fb4975a286f2",
                  "name": "All Responses",
                  "uuid": "87da4c6f-bc9d-475d-ae19-dae1f8f40e00"
                },
                {
                  "exit_uuid": "2457aaab-bab6-4455-b6d0-45269c6717d7",
                  "name": "Take me to Tips",
                  "uuid": "95f17935-3a95-4551-afc7-562464d62b1f"
                },
                {
                  "exit_uuid": "ddb96950-b3ad-43a9-aa22-3842085093ff",
                  "name": "Take me to Homescreen",
                  "uuid": "678b3412-1ae2-4a74-b31b-148b78479a00"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0ad2c3b1-1ba3-4ece-bd4e-fb4975a286f2",
                "destination_uuid": null
              },
              {
                "uuid": "2457aaab-bab6-4455-b6d0-45269c6717d7",
                "destination_uuid": "54cc9196-fb1f-45ab-803f-72b66638f619"
              },
              {
                "uuid": "ddb96950-b3ad-43a9-aa22-3842085093ff",
                "destination_uuid": "7bbf459f-c5a7-42af-8e55-546cbdaaad8f"
              }
            ]
          },
          {
            "uuid": "54cc9196-fb1f-45ab-803f-72b66638f619",
            "actions": [
              {
                "uuid": "eeb6b09f-00bd-4b96-a82f-9b1cbafca02a",
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
                "uuid": "fbdc70b1-a3d8-4bec-89e0-86471ad5fa16",
                "destination_uuid": "20d8155b-99dd-4a5f-9c7b-899084185ca3"
              }
            ]
          },
          {
            "uuid": "20d8155b-99dd-4a5f-9c7b-899084185ca3",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "c41d83f9-cb8b-4f96-bda4-d9424a3afc17"
                },
                "type": "enter_flow",
                "uuid": "dd7e5e1a-1d18-4b33-8c99-cb37737ce9af"
              }
            ],
            "exits": [
              {
                "uuid": "be924366-33bc-4fa9-b6b1-1349481e66c5",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7bbf459f-c5a7-42af-8e55-546cbdaaad8f",
            "actions": [
              {
                "uuid": "8162f67b-bebf-46ff-8800-12cfdc6006d8",
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
                "uuid": "25f5e6bb-a5d7-4213-8381-74587d05ad36",
                "destination_uuid": "0072fab6-f42f-43fc-9ccf-8430201e7388"
              }
            ]
          },
          {
            "uuid": "0072fab6-f42f-43fc-9ccf-8430201e7388",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "65f6f014-337e-4606-9b58-5b2986975705"
                },
                "type": "enter_flow",
                "uuid": "a82df2d0-1f91-43b3-860c-65bf98f25beb"
              }
            ],
            "exits": [
              {
                "uuid": "02921fd9-bd85-43f3-9c31-4cc470987a32",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3c87102d-63f4-424d-8add-22f77e4ec05e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "506489f7-43de-4b4b-beb9-4116562180f6",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "09d972e1-fd44-4d3e-9d61-ba731fd0387c"
              }
            ],
            "exits": [
              {
                "uuid": "765d1adf-c71b-46b8-b249-8baf1e696686",
                "destination_uuid": "8a045e04-890d-4cdd-86ac-9c6f68ec297d"
              }
            ]
          },
          {
            "uuid": "8a045e04-890d-4cdd-86ac-9c6f68ec297d",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "843afb09-bed4-4140-b47d-864ecd37d013"
              }
            ],
            "exits": [
              {
                "uuid": "7c4e76ad-08aa-43b9-b252-ea9aba988841",
                "destination_uuid": "1f48ec9f-4d96-4d94-82be-2249d02c8765"
              }
            ]
          },
          {
            "uuid": "1f48ec9f-4d96-4d94-82be-2249d02c8765",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "88f5a803-66f3-47ed-80bb-aa1eeae86193",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "77e55b29-a242-4644-bfc1-6af9c24ca596",
                  "type": "has_only_phrase",
                  "uuid": "19454d3a-8aee-4a4c-95ef-72fa89c35b61"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "117c38cb-85ac-4fe3-9095-b6bd864c7842",
                  "type": "has_only_phrase",
                  "uuid": "8304b730-f6c2-4098-8921-24345a5911f6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "87a6a8a6-cabc-4eb5-adeb-a8c70dc560d1",
                  "name": "All Responses",
                  "uuid": "88f5a803-66f3-47ed-80bb-aa1eeae86193"
                },
                {
                  "exit_uuid": "d286ac6c-1f6b-4ce4-9631-a6c79cbd90be",
                  "name": "Later",
                  "uuid": "77e55b29-a242-4644-bfc1-6af9c24ca596"
                },
                {
                  "exit_uuid": "26957b45-bc73-461a-b6bd-072237baf36e",
                  "name": "Yes",
                  "uuid": "117c38cb-85ac-4fe3-9095-b6bd864c7842"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "87a6a8a6-cabc-4eb5-adeb-a8c70dc560d1",
                "destination_uuid": null
              },
              {
                "uuid": "d286ac6c-1f6b-4ce4-9631-a6c79cbd90be",
                "destination_uuid": "29817796-ab45-4b3c-a9af-9049e5494825"
              },
              {
                "uuid": "26957b45-bc73-461a-b6bd-072237baf36e",
                "destination_uuid": "248de8bf-8965-4f11-8754-3d46358f0c1b"
              }
            ]
          },
          {
            "uuid": "29817796-ab45-4b3c-a9af-9049e5494825",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "b6ca2bb1-2091-4338-a999-df76bc712aec"
                },
                "type": "enter_flow",
                "uuid": "a09a3481-17ce-4e8e-b99e-5401446f3a6d"
              }
            ],
            "exits": [
              {
                "uuid": "1b6a9d1a-0507-4e5f-98a4-b734a4d62f30",
                "destination_uuid": null
              },
              {
                "uuid": "2d632f9f-ba66-42ba-aeb4-4a8dd221129a",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "44d1bbb5-b992-4647-a47c-cfbf044f88f9",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "49b4bc6f-189c-4050-b096-692c5f8a9b38"
                },
                {
                  "uuid": "27e1e05f-5c0e-4084-9406-fb8bd27862ac",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "6270d773-bc4d-4012-bfc1-8423a23a4a78"
                }
              ],
              "categories": [
                {
                  "uuid": "49b4bc6f-189c-4050-b096-692c5f8a9b38",
                  "name": "Complete",
                  "exit_uuid": "1b6a9d1a-0507-4e5f-98a4-b734a4d62f30"
                },
                {
                  "uuid": "6270d773-bc4d-4012-bfc1-8423a23a4a78",
                  "name": "Expired",
                  "exit_uuid": "2d632f9f-ba66-42ba-aeb4-4a8dd221129a"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "49b4bc6f-189c-4050-b096-692c5f8a9b38"
            }
          },
          {
            "uuid": "248de8bf-8965-4f11-8754-3d46358f0c1b",
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
                "uuid": "ce2d07d3-c251-4516-af76-53255c88170c"
              }
            ],
            "exits": [
              {
                "uuid": "73a52057-a69d-40f4-9853-2b7dad844024",
                "destination_uuid": "331da8e5-555d-4997-a770-d6799efb410b"
              }
            ]
          },
          {
            "uuid": "331da8e5-555d-4997-a770-d6799efb410b",
            "actions": [],
            "exits": [
              {
                "uuid": "25dee333-7b9a-480f-8fcd-2be905510572",
                "destination_uuid": "9c2485cd-698f-4d68-8999-78fff0238244"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "25aee0e2-1420-4570-a26a-3690d6eba934",
              "cases": [],
              "categories": [
                {
                  "uuid": "25aee0e2-1420-4570-a26a-3690d6eba934",
                  "name": "All Responses",
                  "exit_uuid": "25dee333-7b9a-480f-8fcd-2be905510572"
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
            "uuid": "9c2485cd-698f-4d68-8999-78fff0238244",
            "actions": [
              {
                "uuid": "80b66b68-808c-4af5-b2ba-0828de38552d",
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
                "uuid": "efe2a4a0-d8dd-4ac9-93d7-c2b8b1d0d716",
                "destination_uuid": "b3fd2250-f4ef-45ba-9581-fa4c52a10496"
              }
            ]
          },
          {
            "uuid": "b3fd2250-f4ef-45ba-9581-fa4c52a10496",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "7699df87-4e72-4e07-b8d7-c73bd32c3194"
              }
            ],
            "exits": [
              {
                "uuid": "dba237d4-603b-4a57-a762-0ba568cc1221",
                "destination_uuid": "63bbef73-6643-4f3b-b45f-b7c1c843cda4"
              }
            ]
          },
          {
            "uuid": "63bbef73-6643-4f3b-b45f-b7c1c843cda4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "50ddf209-9ac4-44e0-a7c1-96ffaa39cb61",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "ebe51ced-59dd-4968-a95b-e42d06c9d555",
                  "type": "has_only_phrase",
                  "uuid": "a511499d-3eb0-49e7-90ee-72666f3880d7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "adf461c4-5de8-4b23-9daf-22899127a2da",
                  "name": "All Responses",
                  "uuid": "50ddf209-9ac4-44e0-a7c1-96ffaa39cb61"
                },
                {
                  "exit_uuid": "47b3d942-842b-416e-bba1-eabbdb0f2946",
                  "name": "Click here when done",
                  "uuid": "ebe51ced-59dd-4968-a95b-e42d06c9d555"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "adf461c4-5de8-4b23-9daf-22899127a2da",
                "destination_uuid": null
              },
              {
                "uuid": "47b3d942-842b-416e-bba1-eabbdb0f2946",
                "destination_uuid": "9016b657-e13f-4363-9cbf-56c59c366a26"
              }
            ]
          },
          {
            "uuid": "9016b657-e13f-4363-9cbf-56c59c366a26",
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
                "uuid": "be478a3b-92d7-470b-9d58-a4e259dc2d7e"
              }
            ],
            "exits": [
              {
                "uuid": "ff363f5f-0a08-4f84-b994-d3e9efc71c9c",
                "destination_uuid": "ccf77957-4eb7-4e5b-882c-74500ba32615"
              }
            ]
          },
          {
            "uuid": "ccf77957-4eb7-4e5b-882c-74500ba32615",
            "actions": [],
            "exits": [
              {
                "uuid": "4e8f09e8-4731-471c-aca2-be577aeacf40",
                "destination_uuid": "099d5490-064c-445a-a463-9b90aed54d10"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9c51b979-08fe-4576-bf11-5350925d0022",
              "cases": [],
              "categories": [
                {
                  "uuid": "9c51b979-08fe-4576-bf11-5350925d0022",
                  "name": "All Responses",
                  "exit_uuid": "4e8f09e8-4731-471c-aca2-be577aeacf40"
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
            "uuid": "099d5490-064c-445a-a463-9b90aed54d10",
            "actions": [
              {
                "uuid": "67d78287-8c2b-40ac-b065-8b778fc23d0b",
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
                "uuid": "f7f7a2e8-d559-4ba7-9dfb-b27e8e83d261",
                "destination_uuid": "2ce8a394-2909-433d-a5c8-61a58341561e"
              }
            ]
          },
          {
            "uuid": "2ce8a394-2909-433d-a5c8-61a58341561e",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "c0e6b2fd-ac1b-469c-b60b-30e99b70ce2c"
              }
            ],
            "exits": [
              {
                "uuid": "5453c61e-f750-4aea-bd80-c15f8912fe68",
                "destination_uuid": "dcfd8120-de43-4433-a8d4-d09c873df1f0"
              }
            ]
          },
          {
            "uuid": "dcfd8120-de43-4433-a8d4-d09c873df1f0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c75aa542-46d6-47ba-8702-58a61322bc79",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "1cd4692d-50ce-4e68-9834-e4b11e4935c1",
                  "type": "has_only_phrase",
                  "uuid": "a3752905-1883-4bb2-8aef-70f752c19171"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "993a4f08-0629-422b-b6f0-77e39947903e",
                  "name": "All Responses",
                  "uuid": "c75aa542-46d6-47ba-8702-58a61322bc79"
                },
                {
                  "exit_uuid": "4ce4b5b4-ab53-4265-9f89-0af1f7436808",
                  "name": "Click here when done",
                  "uuid": "1cd4692d-50ce-4e68-9834-e4b11e4935c1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "993a4f08-0629-422b-b6f0-77e39947903e",
                "destination_uuid": null
              },
              {
                "uuid": "4ce4b5b4-ab53-4265-9f89-0af1f7436808",
                "destination_uuid": "2b507c8d-2f6f-454c-a542-ad1045d4240a"
              }
            ]
          },
          {
            "uuid": "2b507c8d-2f6f-454c-a542-ad1045d4240a",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "19363293-c904-47ab-b2d8-99ccbe2e9b37"
              }
            ],
            "exits": [
              {
                "uuid": "b086b2de-02d3-446e-a7a8-5a773f59c3b5",
                "destination_uuid": "9d295ce4-00a4-499e-8201-921b3d795b7f"
              }
            ]
          },
          {
            "uuid": "9d295ce4-00a4-499e-8201-921b3d795b7f",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cc5c3237-3e61-481f-bcc2-059d0980cc39"
              }
            ],
            "exits": [
              {
                "uuid": "bc4ea3fc-5705-475a-bd66-e8a8a75efd10",
                "destination_uuid": "ab18ea6e-bb3e-4a9d-b9b9-fbb76010106e"
              }
            ]
          },
          {
            "uuid": "ab18ea6e-bb3e-4a9d-b9b9-fbb76010106e",
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
                "uuid": "2ca49660-9867-4c13-82a4-f6083a551208"
              }
            ],
            "exits": [
              {
                "uuid": "ce6ee6e9-7291-4ea9-930f-c5ccaa4fd0ac",
                "destination_uuid": "dbef2d9f-c5bd-4d8c-835c-07bf58224737"
              }
            ]
          },
          {
            "uuid": "dbef2d9f-c5bd-4d8c-835c-07bf58224737",
            "actions": [],
            "exits": [
              {
                "uuid": "2f4324e9-41bd-4ecf-a2e1-ab4c8ff74b1e",
                "destination_uuid": "0733b8db-c206-436e-b3ad-761bcae591e6"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7c589e5e-10c6-4813-88e4-c728b44a3a90",
              "cases": [],
              "categories": [
                {
                  "uuid": "7c589e5e-10c6-4813-88e4-c728b44a3a90",
                  "name": "All Responses",
                  "exit_uuid": "2f4324e9-41bd-4ecf-a2e1-ab4c8ff74b1e"
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
            "uuid": "0733b8db-c206-436e-b3ad-761bcae591e6",
            "actions": [
              {
                "uuid": "c2e7d837-6109-4355-b7de-0b2cf25dc7f3",
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
                "uuid": "4b8fa90d-df35-414f-a738-b51cfe5888d5",
                "destination_uuid": "a204a69c-82e2-4a46-bb14-ad4f647620d2"
              }
            ]
          },
          {
            "uuid": "a204a69c-82e2-4a46-bb14-ad4f647620d2",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "a41c3ebe-260f-417d-bbfb-4e348bfc5e9d"
              }
            ],
            "exits": [
              {
                "uuid": "a3172773-f4ae-49bd-884e-4266d9b67b5a",
                "destination_uuid": "1dbc2cb1-09bf-47c5-aa9f-a4b503165f31"
              }
            ]
          },
          {
            "uuid": "1dbc2cb1-09bf-47c5-aa9f-a4b503165f31",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6c55fd3f-5883-465c-837a-161f1ad4db2b",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "da60f6d9-8528-455a-9248-364640c5ce49",
                  "type": "has_only_phrase",
                  "uuid": "053acdf3-1199-4faf-9c01-adf04a8c0610"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2646c6d4-420f-4767-9ee3-9be8fb70d30f",
                  "name": "All Responses",
                  "uuid": "6c55fd3f-5883-465c-837a-161f1ad4db2b"
                },
                {
                  "exit_uuid": "80217454-334b-4899-be6e-6e6fa0d25552",
                  "name": "Take me to Homescreen",
                  "uuid": "da60f6d9-8528-455a-9248-364640c5ce49"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2646c6d4-420f-4767-9ee3-9be8fb70d30f",
                "destination_uuid": null
              },
              {
                "uuid": "80217454-334b-4899-be6e-6e6fa0d25552",
                "destination_uuid": "7b2a2b51-29c0-4bab-a986-407d2f8b00aa"
              }
            ]
          },
          {
            "uuid": "7b2a2b51-29c0-4bab-a986-407d2f8b00aa",
            "actions": [
              {
                "uuid": "28159fbb-21c5-48ce-9d05-598a15b8be56",
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
                "uuid": "2b476ce8-e36f-4398-a998-d1120387595e",
                "destination_uuid": "d18824ab-1407-4e75-be3d-a24ee4843855"
              }
            ]
          },
          {
            "uuid": "d18824ab-1407-4e75-be3d-a24ee4843855",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "64690889-5b69-4641-8cb9-6f3a9fc74fe4"
                },
                "type": "enter_flow",
                "uuid": "afff9c44-6562-4326-b26c-07e84710faa6"
              }
            ],
            "exits": [
              {
                "uuid": "805c4216-738e-4c66-a065-6bf18857ed6e",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "063c02b6-e590-4e50-8555-355905e6564e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2cfc5dbc-7d0e-4175-a0ca-052a99104b04",
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
                "uuid": "95182299-b1da-4c7d-a538-c29e61b169fa"
              }
            ],
            "exits": [
              {
                "uuid": "637088d8-d1d1-4aae-8218-f39df940add5",
                "destination_uuid": "b77c3ab3-fb47-4bfa-8cf3-c04c63796b95"
              }
            ]
          },
          {
            "uuid": "b77c3ab3-fb47-4bfa-8cf3-c04c63796b95",
            "actions": [],
            "exits": [
              {
                "uuid": "e93ebc77-6ef3-4ac3-aded-9bf3aedc75ee",
                "destination_uuid": "bb6483f3-1a63-4a57-a176-abe3133c7ec5"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "78175786-8499-4840-a3ff-eed792b76670",
              "cases": [],
              "categories": [
                {
                  "uuid": "78175786-8499-4840-a3ff-eed792b76670",
                  "name": "All Responses",
                  "exit_uuid": "e93ebc77-6ef3-4ac3-aded-9bf3aedc75ee"
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
            "uuid": "bb6483f3-1a63-4a57-a176-abe3133c7ec5",
            "actions": [
              {
                "uuid": "cc4e0eca-5990-4004-ad71-a4c01ecf5301",
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
                "uuid": "aec241de-be11-466a-9068-c4949016df71",
                "destination_uuid": "e20f2c06-5f92-48f2-b829-edee102b93a0"
              }
            ]
          },
          {
            "uuid": "e20f2c06-5f92-48f2-b829-edee102b93a0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1ca1ea9c-8cb7-4d15-b47a-23ff9871091b",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "709d1fe9-5c96-4555-8e6c-2a7569e6a3eb",
                  "type": "has_only_phrase",
                  "uuid": "7e403db6-d175-4094-85ee-5e299eb10621"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "0baafbaa-f145-4bdb-a4d7-cd77d1601f85",
                  "type": "has_only_phrase",
                  "uuid": "449e096f-a451-4042-be34-c89b1e13052f"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "0baafbaa-f145-4bdb-a4d7-cd77d1601f85",
                  "type": "has_only_phrase",
                  "uuid": "403f56b0-a5c3-45ee-b101-4091fb54c98e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "50923e0d-a04c-445f-ae9b-f5b56074ee82",
                  "name": "All Responses",
                  "uuid": "1ca1ea9c-8cb7-4d15-b47a-23ff9871091b"
                },
                {
                  "exit_uuid": "bbdcd7a4-f93e-4b53-aa91-c46b319489b1",
                  "name": "Great",
                  "uuid": "709d1fe9-5c96-4555-8e6c-2a7569e6a3eb"
                },
                {
                  "exit_uuid": "3710cad5-0ab5-49b4-8383-9ab0719c4e03",
                  "name": "Neutral; Bad",
                  "uuid": "0baafbaa-f145-4bdb-a4d7-cd77d1601f85"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "50923e0d-a04c-445f-ae9b-f5b56074ee82",
                "destination_uuid": null
              },
              {
                "uuid": "bbdcd7a4-f93e-4b53-aa91-c46b319489b1",
                "destination_uuid": "7d085546-d5da-4dc6-80ef-a41c3a9a11fe"
              },
              {
                "uuid": "3710cad5-0ab5-49b4-8383-9ab0719c4e03",
                "destination_uuid": "bb01d99a-035a-47cd-9593-96cda4544b4f"
              }
            ]
          },
          {
            "uuid": "7d085546-d5da-4dc6-80ef-a41c3a9a11fe",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "ff085fbd-4132-4783-9031-e38f74b1722a"
              }
            ],
            "exits": [
              {
                "uuid": "cd6d91ce-a302-4998-80aa-80cbad74cec9",
                "destination_uuid": "023e4737-6345-4ec2-af3a-008c7ae25a61"
              }
            ]
          },
          {
            "uuid": "bb01d99a-035a-47cd-9593-96cda4544b4f",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "d4d38775-7245-4b57-9185-953e3d0b83d4"
              }
            ],
            "exits": [
              {
                "uuid": "b7e409df-ab1c-4c9e-bd42-71574ac0e328",
                "destination_uuid": "2920398e-59b4-42d0-983e-25598814ad2c"
              }
            ]
          },
          {
            "uuid": "2920398e-59b4-42d0-983e-25598814ad2c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c5d83bb3-5bf5-4c1c-a9b8-4bd6815a7cde",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "0c713bb4-b6b4-44ea-8661-3b08d20e6b7d",
                  "type": "has_only_phrase",
                  "uuid": "bf09b1b0-e98a-410d-be9c-6acbee45b378"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "1c5ffafc-f2ec-4ca6-aa8c-acec124bc4ac",
                  "type": "has_only_phrase",
                  "uuid": "154b7b48-6fe4-4bbb-9d51-c945c57dd9f1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e7c31243-559c-4831-aea3-4dd58c94b977",
                  "name": "All Responses",
                  "uuid": "c5d83bb3-5bf5-4c1c-a9b8-4bd6815a7cde"
                },
                {
                  "exit_uuid": "164df48a-ca20-4a9e-97f7-c9988aebdedf",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "0c713bb4-b6b4-44ea-8661-3b08d20e6b7d"
                },
                {
                  "exit_uuid": "4f024614-6f1f-4f01-9b8e-c439299d2fe8",
                  "name": "Continue",
                  "uuid": "1c5ffafc-f2ec-4ca6-aa8c-acec124bc4ac"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e7c31243-559c-4831-aea3-4dd58c94b977",
                "destination_uuid": null
              },
              {
                "uuid": "164df48a-ca20-4a9e-97f7-c9988aebdedf",
                "destination_uuid": "2e4d0b32-49dd-4d23-9022-e718114edd62"
              },
              {
                "uuid": "4f024614-6f1f-4f01-9b8e-c439299d2fe8",
                "destination_uuid": "69af5a68-0ca4-4b03-bca2-3a63fa1f05d8"
              }
            ]
          },
          {
            "uuid": "2e4d0b32-49dd-4d23-9022-e718114edd62",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "2e45ad2d-ec4c-4a15-b642-3b93d76ef99f"
                },
                "type": "enter_flow",
                "uuid": "1ebc425a-4dd1-4d42-be5e-8ca5e0914d1e"
              }
            ],
            "exits": [
              {
                "uuid": "dddb8e62-0bb4-4fa1-8001-d25fbab8d387",
                "destination_uuid": "f7c4e030-04c9-494d-ba58-f2c8047f3c8c"
              },
              {
                "uuid": "428a9f97-2642-44f9-8f47-b6791a0164ef",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "edcb6367-f21b-4316-95ca-146eb0f68074",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0e9eb66a-3bbb-4de4-b3aa-17f6a6e334c8"
                },
                {
                  "uuid": "c11b00cd-d8be-468f-9326-e72cb33550ee",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "abb513b9-ba76-4214-8c7d-a8548064f1fe"
                }
              ],
              "categories": [
                {
                  "uuid": "0e9eb66a-3bbb-4de4-b3aa-17f6a6e334c8",
                  "name": "Complete",
                  "exit_uuid": "dddb8e62-0bb4-4fa1-8001-d25fbab8d387"
                },
                {
                  "uuid": "abb513b9-ba76-4214-8c7d-a8548064f1fe",
                  "name": "Expired",
                  "exit_uuid": "428a9f97-2642-44f9-8f47-b6791a0164ef"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0e9eb66a-3bbb-4de4-b3aa-17f6a6e334c8"
            }
          },
          {
            "uuid": "023e4737-6345-4ec2-af3a-008c7ae25a61",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6b274fa1-debe-4d13-8d02-900300c189da",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "8d086c23-d7b5-4fdd-b74b-07f28890e764",
                  "type": "has_only_phrase",
                  "uuid": "96e2ae45-d4cb-4226-bf1a-1756070ef069"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c5f92520-901d-4ed3-97a8-18e662072a45",
                  "name": "All Responses",
                  "uuid": "6b274fa1-debe-4d13-8d02-900300c189da"
                },
                {
                  "exit_uuid": "33bbc75c-ec65-4103-8107-68963b1286b7",
                  "name": "Go to Praise check-in",
                  "uuid": "8d086c23-d7b5-4fdd-b74b-07f28890e764"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c5f92520-901d-4ed3-97a8-18e662072a45",
                "destination_uuid": null
              },
              {
                "uuid": "33bbc75c-ec65-4103-8107-68963b1286b7",
                "destination_uuid": "f2a228ee-1465-4095-befa-3308d923a2b2"
              }
            ]
          },
          {
            "uuid": "f2a228ee-1465-4095-befa-3308d923a2b2",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "7f688a7b-b858-40f2-b723-b1b3d5a21f7b"
              }
            ],
            "exits": [
              {
                "uuid": "e38f2a55-5ed9-4430-89c0-749a08ced113",
                "destination_uuid": "84c6b777-e101-4521-b7db-eb803388bb8d"
              }
            ]
          },
          {
            "uuid": "69af5a68-0ca4-4b03-bca2-3a63fa1f05d8",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "59352681-4ff9-48c4-9561-770f0043afef"
              }
            ],
            "exits": [
              {
                "uuid": "68a182a0-78b9-41cb-a5c9-e7ba6e55150d",
                "destination_uuid": "84c6b777-e101-4521-b7db-eb803388bb8d"
              }
            ]
          },
          {
            "uuid": "f7c4e030-04c9-494d-ba58-f2c8047f3c8c",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "4fed958a-f259-4f76-ae25-f01858427961"
              }
            ],
            "exits": [
              {
                "uuid": "83f5efd9-de16-4a08-82c4-286474ac77c0",
                "destination_uuid": "84c6b777-e101-4521-b7db-eb803388bb8d"
              }
            ]
          },
          {
            "uuid": "84c6b777-e101-4521-b7db-eb803388bb8d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "54da750c-bb05-4b47-8109-f16df1d47aac",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "bd69fae2-e795-4ad3-a460-e43c80ea19e4",
                  "type": "has_only_phrase",
                  "uuid": "e69b7601-2fc9-4339-83c0-70930f71b753"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "c8386254-958e-4a92-821d-afd0704aab13",
                  "type": "has_only_phrase",
                  "uuid": "d5fd70ff-78f5-4c62-a2a3-500a31cd5144"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "3730d48c-cacd-4ec7-9255-1e5afe56a6f1",
                  "type": "has_only_phrase",
                  "uuid": "d2b1cd73-2152-4afc-bf27-f9461db2d516"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "67562f26-ce47-4497-83ea-b9aee76d3d4f",
                  "type": "has_only_phrase",
                  "uuid": "2cb78550-3d31-4c43-801a-6b1d5b1c4077"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ae3056d6-4200-47be-afc8-821a770834f2",
                  "name": "All Responses",
                  "uuid": "54da750c-bb05-4b47-8109-f16df1d47aac"
                },
                {
                  "exit_uuid": "dcebebda-87b9-4587-821c-c030bc361441",
                  "name": "No",
                  "uuid": "bd69fae2-e795-4ad3-a460-e43c80ea19e4"
                },
                {
                  "exit_uuid": "055e0831-3038-4965-871c-7e7384615d2d",
                  "name": "Yes",
                  "uuid": "c8386254-958e-4a92-821d-afd0704aab13"
                },
                {
                  "exit_uuid": "b057af19-bf48-4b76-a905-98a434d08b73",
                  "name": "Yes",
                  "uuid": "3730d48c-cacd-4ec7-9255-1e5afe56a6f1"
                },
                {
                  "exit_uuid": "0ed6b5c9-7a4a-4d88-9e65-f0909ce5469a",
                  "name": "Yes",
                  "uuid": "67562f26-ce47-4497-83ea-b9aee76d3d4f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ae3056d6-4200-47be-afc8-821a770834f2",
                "destination_uuid": null
              },
              {
                "uuid": "dcebebda-87b9-4587-821c-c030bc361441",
                "destination_uuid": "5ec4ae38-985d-49bb-9c6e-d12a603c3fd1"
              },
              {
                "uuid": "055e0831-3038-4965-871c-7e7384615d2d",
                "destination_uuid": "8d0f5195-902a-4f00-b04a-9010fba49938"
              },
              {
                "uuid": "b057af19-bf48-4b76-a905-98a434d08b73",
                "destination_uuid": "8d0f5195-902a-4f00-b04a-9010fba49938"
              },
              {
                "uuid": "0ed6b5c9-7a4a-4d88-9e65-f0909ce5469a",
                "destination_uuid": "8d0f5195-902a-4f00-b04a-9010fba49938"
              }
            ]
          },
          {
            "uuid": "5ec4ae38-985d-49bb-9c6e-d12a603c3fd1",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2f8cf8b5-b7ac-4fe6-825a-fe5a6850ac80"
              }
            ],
            "exits": [
              {
                "uuid": "f903d119-34cd-41f7-9926-543837aa2153",
                "destination_uuid": "c172d5fc-aba6-438d-a423-8c70b11aa6ef"
              }
            ]
          },
          {
            "uuid": "8d0f5195-902a-4f00-b04a-9010fba49938",
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
                "uuid": "6e427b76-3c64-47f3-aa49-2507253a1f81"
              }
            ],
            "exits": [
              {
                "uuid": "6a66d0b6-129d-485a-ba9f-c4692b9b3f7c",
                "destination_uuid": "32a70ff5-81a5-4009-8907-db1ac0949494"
              }
            ]
          },
          {
            "uuid": "32a70ff5-81a5-4009-8907-db1ac0949494",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "afb69c03-451a-4927-84ca-ba561122788e",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "f47cf42d-5122-431f-ab38-14cff3830926",
                  "type": "has_only_phrase",
                  "uuid": "86c32774-3ba2-4dac-8fab-c6a30796ea04"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "5ae02786-72db-4b29-bec8-67883e272e65",
                  "type": "has_only_phrase",
                  "uuid": "9eba9f3d-b163-487c-8f68-77ab11658410"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "ae229ae5-6bb4-4b91-85ab-a0312225b078",
                  "type": "has_only_phrase",
                  "uuid": "8749d3ec-0a47-40cc-9daf-2aea8c858fa2"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "b3f545df-d19c-4364-b117-481fec5839bf",
                  "type": "has_only_phrase",
                  "uuid": "3b0c2e67-6f2c-4220-800a-6c2e65b16d93"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0ab38e60-6457-42b4-887a-f9f78a6907d7",
                  "name": "All Responses",
                  "uuid": "afb69c03-451a-4927-84ca-ba561122788e"
                },
                {
                  "exit_uuid": "b5514479-7c00-4d27-97e0-31dbf37177cb",
                  "name": "Surprised",
                  "uuid": "f47cf42d-5122-431f-ab38-14cff3830926"
                },
                {
                  "exit_uuid": "b3b0bd81-1ffd-41c1-bcb2-aef433fa990f",
                  "name": "Happy",
                  "uuid": "5ae02786-72db-4b29-bec8-67883e272e65"
                },
                {
                  "exit_uuid": "dbda8b5f-1652-418a-8dcd-4ead0e473c00",
                  "name": "My teen did not like it",
                  "uuid": "ae229ae5-6bb4-4b91-85ab-a0312225b078"
                },
                {
                  "exit_uuid": "8c8fa969-dbce-4a93-a94e-83c80e0551bc",
                  "name": "I don’t know",
                  "uuid": "b3f545df-d19c-4364-b117-481fec5839bf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0ab38e60-6457-42b4-887a-f9f78a6907d7",
                "destination_uuid": null
              },
              {
                "uuid": "b5514479-7c00-4d27-97e0-31dbf37177cb",
                "destination_uuid": "3708c0b7-0873-4111-92b0-6e957e5ffa0b"
              },
              {
                "uuid": "b3b0bd81-1ffd-41c1-bcb2-aef433fa990f",
                "destination_uuid": "018831d5-600d-45e1-9eea-a1da13f2e6d2"
              },
              {
                "uuid": "dbda8b5f-1652-418a-8dcd-4ead0e473c00",
                "destination_uuid": "acdc6b48-6d1b-4209-9dc2-bf618d0b855c"
              },
              {
                "uuid": "8c8fa969-dbce-4a93-a94e-83c80e0551bc",
                "destination_uuid": "700249a2-0633-4e5f-ad0b-5717751b6dab"
              }
            ]
          },
          {
            "uuid": "3708c0b7-0873-4111-92b0-6e957e5ffa0b",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c57011aa-a714-4f26-923b-ab828706d5bd"
              }
            ],
            "exits": [
              {
                "uuid": "e9349131-d6ab-4a87-9d1c-0457c64bbaaa",
                "destination_uuid": "23db92de-032d-4a30-85ff-97857820ff2c"
              }
            ]
          },
          {
            "uuid": "018831d5-600d-45e1-9eea-a1da13f2e6d2",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fe23e6c8-4687-48e2-9316-aaf7cc3fcc07"
              }
            ],
            "exits": [
              {
                "uuid": "c12700e1-2935-4a85-82e6-9219513850ca",
                "destination_uuid": "23db92de-032d-4a30-85ff-97857820ff2c"
              }
            ]
          },
          {
            "uuid": "acdc6b48-6d1b-4209-9dc2-bf618d0b855c",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3f3459f2-ed10-44ec-8d85-0a5185c38f82"
              }
            ],
            "exits": [
              {
                "uuid": "3d72562c-1a0b-46ea-87fe-a7c61f8ee112",
                "destination_uuid": "23db92de-032d-4a30-85ff-97857820ff2c"
              }
            ]
          },
          {
            "uuid": "700249a2-0633-4e5f-ad0b-5717751b6dab",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d10b215f-2741-49b3-8b6c-9cde8dd498ee"
              }
            ],
            "exits": [
              {
                "uuid": "4fc3ff98-10d3-4a87-ae97-3ba728b5407c",
                "destination_uuid": "23db92de-032d-4a30-85ff-97857820ff2c"
              }
            ]
          },
          {
            "uuid": "23db92de-032d-4a30-85ff-97857820ff2c",
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
                "uuid": "43fd84b9-f271-4b13-b2a0-b01db1377eeb"
              }
            ],
            "exits": [
              {
                "uuid": "968c5fc2-141f-4d50-b124-c4afcab2b4ce",
                "destination_uuid": "6e48474f-89d2-4e0e-95a6-b8b215199706"
              }
            ]
          },
          {
            "uuid": "6e48474f-89d2-4e0e-95a6-b8b215199706",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9e0654e2-8f0b-40e3-9ff1-c08efe62de3d",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "b4051d0c-7fa6-4a7a-8bb3-8c033539d025",
                  "type": "has_only_phrase",
                  "uuid": "85abfa08-589b-4d4d-bda6-8ad52054a727"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "b4051d0c-7fa6-4a7a-8bb3-8c033539d025",
                  "type": "has_only_phrase",
                  "uuid": "d060c742-580f-4428-a698-4eaefdf13926"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "627165f0-5736-4400-a9a7-b647dad814a5",
                  "type": "has_only_phrase",
                  "uuid": "53f2022d-bef5-49fe-98e4-920fa6a37ab7"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "627165f0-5736-4400-a9a7-b647dad814a5",
                  "type": "has_only_phrase",
                  "uuid": "e08daa4e-c0a9-4569-84b3-57b06e57104d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ee89796d-a82d-4cb5-9c5c-84f02997a185",
                  "name": "All Responses",
                  "uuid": "9e0654e2-8f0b-40e3-9ff1-c08efe62de3d"
                },
                {
                  "exit_uuid": "3adfb8b0-ba79-488c-bbf2-92554ef86250",
                  "name": "Every day; Almost every day",
                  "uuid": "b4051d0c-7fa6-4a7a-8bb3-8c033539d025"
                },
                {
                  "exit_uuid": "9a247cd0-df88-4de9-a909-96e2fc5e389f",
                  "name": "A few days; Never",
                  "uuid": "627165f0-5736-4400-a9a7-b647dad814a5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ee89796d-a82d-4cb5-9c5c-84f02997a185",
                "destination_uuid": null
              },
              {
                "uuid": "3adfb8b0-ba79-488c-bbf2-92554ef86250",
                "destination_uuid": "b1716a93-4209-4805-8537-62fd3fb4a0ef"
              },
              {
                "uuid": "9a247cd0-df88-4de9-a909-96e2fc5e389f",
                "destination_uuid": "3005c175-4ae1-4044-87df-449a675bb1e4"
              }
            ]
          },
          {
            "uuid": "b1716a93-4209-4805-8537-62fd3fb4a0ef",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a55df065-c6bb-413e-9775-23aa59197a18"
              }
            ],
            "exits": [
              {
                "uuid": "3f0ba53d-8fc1-40f0-bc92-94e1ae242dba",
                "destination_uuid": "c172d5fc-aba6-438d-a423-8c70b11aa6ef"
              }
            ]
          },
          {
            "uuid": "3005c175-4ae1-4044-87df-449a675bb1e4",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "711c1057-0872-4c96-a2c1-45330006e24e"
              }
            ],
            "exits": [
              {
                "uuid": "e4854d76-2870-4ada-9416-ed7d18e73cef",
                "destination_uuid": "c172d5fc-aba6-438d-a423-8c70b11aa6ef"
              }
            ]
          },
          {
            "uuid": "c172d5fc-aba6-438d-a423-8c70b11aa6ef",
            "actions": [
              {
                "uuid": "35a73249-d44f-437e-9cf7-990686ef3a3a",
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
                "uuid": "b8ba85ad-01fe-4e9b-9623-1d0fc3a167fe",
                "destination_uuid": "290d2fd4-9ea4-4302-bb19-4915a349d679"
              }
            ]
          },
          {
            "uuid": "290d2fd4-9ea4-4302-bb19-4915a349d679",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "d971007d-31f4-478e-8704-1ae0a4debdaa"
                },
                "type": "enter_flow",
                "uuid": "227788ca-ad2f-4115-94cf-cee61236d646"
              }
            ],
            "exits": [
              {
                "uuid": "ddeb1570-0551-4a4c-baf8-3befd5702f0c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "2de13775-be81-414c-8a98-1b05ccb34c87",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c757a95f-f5ef-492a-a283-bda4ecfba1dc",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1faf7256-8720-4dbf-a278-a6042d1acf02"
              }
            ],
            "exits": [
              {
                "uuid": "440f01cf-5af0-45d4-8689-c13b2f9f91e4",
                "destination_uuid": "5746352c-9d59-40fd-bd7a-e9fca3b9486e"
              }
            ]
          },
          {
            "uuid": "5746352c-9d59-40fd-bd7a-e9fca3b9486e",
            "actions": [
              {
                "uuid": "855da84b-bc39-489e-8460-e5e57f21c051",
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
                "uuid": "ae0ea798-1f20-46c8-b4e2-2a28339865b4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "69e235f3-e5eb-4754-8068-9f2bf0b4ca76",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "216e9836-1841-4bdd-a78d-85aed6fdc1cf",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6e4fac8e-2957-49ad-bf5f-510a188f3718"
              }
            ],
            "exits": [
              {
                "uuid": "468146d8-2de0-4946-8449-f5e21efa54e3",
                "destination_uuid": "c5baab94-85d6-47e3-9970-051d3fca6f4f"
              }
            ]
          },
          {
            "uuid": "c5baab94-85d6-47e3-9970-051d3fca6f4f",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "68d423a8-363f-4fad-8fc3-eef3077c97aa"
              }
            ],
            "exits": [
              {
                "uuid": "0743ac24-2e21-44b9-922c-217763ed9f4c",
                "destination_uuid": "e9b21687-bc55-4832-918d-40137d0a95aa"
              }
            ]
          },
          {
            "uuid": "e9b21687-bc55-4832-918d-40137d0a95aa",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8f52afa8-f0fc-46ba-853b-9d84c0a614c3"
              }
            ],
            "exits": [
              {
                "uuid": "9598f737-3918-4bd9-8278-1f98aae3b5ef",
                "destination_uuid": "06dc1811-079f-4a31-b9e1-b263e4796abb"
              }
            ]
          },
          {
            "uuid": "06dc1811-079f-4a31-b9e1-b263e4796abb",
            "actions": [
              {
                "uuid": "acfe8c61-898a-4f34-9e18-2d402e80a996",
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
                "uuid": "e1bc5458-44b5-413e-9da2-2e990ea56510",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4fabb82b-347d-469d-aa44-a3fe5963ab0f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "99f696e2-637c-49c4-a9da-7a78f9f600c3",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f8ea5661-dfa3-4e62-a718-92da5276e74b"
              }
            ],
            "exits": [
              {
                "uuid": "0bf62020-4aef-41f3-9c55-96e67a5bf225",
                "destination_uuid": "a916940a-0613-4513-affd-430a0c567ee5"
              }
            ]
          },
          {
            "uuid": "a916940a-0613-4513-affd-430a0c567ee5",
            "actions": [
              {
                "uuid": "2c216ab4-7140-443f-b120-e356b372b3d2",
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
                "uuid": "e1f8cf6b-225b-4f88-8698-b05915617e1c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8f21f625-4b2c-4c51-87d3-680a51bd0dfd",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "dceddf7a-3143-4e75-b5af-3544fb00292a",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "91d2470f-0da0-4ee7-9d10-e034f13aae57"
              }
            ],
            "exits": [
              {
                "uuid": "d67e4967-013d-4cc2-b817-9638b1720392",
                "destination_uuid": "2d64e686-fa59-4c73-8167-42cf46a34273"
              }
            ]
          },
          {
            "uuid": "2d64e686-fa59-4c73-8167-42cf46a34273",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ac6e739c-8ffd-482e-bb60-dc23a48a7870"
              }
            ],
            "exits": [
              {
                "uuid": "846b0398-3488-4307-a6f7-014a3d3acb0c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f27dde40-1bba-4cc9-877c-72a1f413cee5",
            "actions": [
              {
                "uuid": "22610556-8f41-40be-bf34-12e2958d5f88",
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
                "uuid": "f03546f6-9ed6-4f4c-82f9-f0fa20da0367",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4c63167a-c30c-42d8-80f4-55870838f47d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "56ff7f66-6971-4b24-8e1b-9332bc31c98e",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e88a46a3-9047-41f9-b85c-d769ad73d826"
              }
            ],
            "exits": [
              {
                "uuid": "991d04b4-5a5c-4626-94f1-19f955a4f461",
                "destination_uuid": "7e1f0c24-c8fc-41c5-a8fa-1f4f270be3fd"
              }
            ]
          },
          {
            "uuid": "7e1f0c24-c8fc-41c5-a8fa-1f4f270be3fd",
            "actions": [
              {
                "uuid": "b966e588-3c6b-469b-a531-4b2354c37fc0",
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
                "uuid": "55580d79-667d-4715-aeac-7040a55f0fc7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6be104e1-6498-4743-bf7f-a47b7d4227ed",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "391634ed-9a8f-4e88-a8cc-af57a46d98a5",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "fcf78859-f288-45ae-b780-a598136fe29a"
                },
                "type": "enter_flow",
                "uuid": "379feec3-33b9-48d7-9a2b-2420497f6c49"
              }
            ],
            "exits": [
              {
                "uuid": "12b03794-4aa6-4bed-8169-8e0c9be1a203",
                "destination_uuid": "368c1e05-1cd2-4bc4-8df7-4ca01401165a"
              },
              {
                "uuid": "8531d8a0-dfc8-4e1b-b3af-ee4d8443531b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "d41fe3b6-42c7-405d-b059-ab0fdf117635",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f6a23aa0-4872-4633-a9a5-fdc03c828e4a"
                },
                {
                  "uuid": "ed78c567-38ba-4ec4-ae6f-ec075aff5008",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "6f60781e-9014-4b6b-a3ca-8535f0daeb37"
                }
              ],
              "categories": [
                {
                  "uuid": "f6a23aa0-4872-4633-a9a5-fdc03c828e4a",
                  "name": "Complete",
                  "exit_uuid": "12b03794-4aa6-4bed-8169-8e0c9be1a203"
                },
                {
                  "uuid": "6f60781e-9014-4b6b-a3ca-8535f0daeb37",
                  "name": "Expired",
                  "exit_uuid": "8531d8a0-dfc8-4e1b-b3af-ee4d8443531b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f6a23aa0-4872-4633-a9a5-fdc03c828e4a"
            }
          },
          {
            "uuid": "368c1e05-1cd2-4bc4-8df7-4ca01401165a",
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
                "uuid": "3cd672d9-8c6e-4819-9abd-66b80be6e2ad"
              }
            ],
            "exits": [
              {
                "uuid": "990122c0-3ed3-4766-b35b-5629af0dc687",
                "destination_uuid": "f08bed5b-248e-4cba-9ff6-c80d2edd4c84"
              }
            ]
          },
          {
            "uuid": "f08bed5b-248e-4cba-9ff6-c80d2edd4c84",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ba2f9ecb-56a7-40f9-8f92-6ebb600ce163",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "e5e9fb26-2d63-443e-a545-5ae29bfa1fae",
                  "type": "has_only_phrase",
                  "uuid": "a748be58-c15c-4a2a-974a-94d676a2992e"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "58650850-fc18-4be3-97eb-33b5f992ecb9",
                  "type": "has_only_phrase",
                  "uuid": "c2820c78-7ab2-4879-995f-f682deb83f3d"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "f7188d24-6f51-4314-bb90-a4499cd10124",
                  "type": "has_only_phrase",
                  "uuid": "a52c0fac-eeb6-408e-9da9-3f56f21b8a8a"
                },
                {
                  "arguments": [
                    "first app opening"
                  ],
                  "category_uuid": "8a00034d-b401-44ac-9eee-fa90f26ee2af",
                  "type": "has_only_phrase",
                  "uuid": "c1b3b389-c2ae-426b-90b5-4c62f1f3ab29"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "41ebae90-11a0-4d0d-8c11-db68c2b4284b",
                  "name": "All Responses",
                  "uuid": "ba2f9ecb-56a7-40f9-8f92-6ebb600ce163"
                },
                {
                  "exit_uuid": "f5263da8-6cc6-4c68-a7cb-12d75d6625a6",
                  "name": "welcome",
                  "uuid": "e5e9fb26-2d63-443e-a545-5ae29bfa1fae"
                },
                {
                  "exit_uuid": "819e4657-ac0b-46ff-84d1-ce39ec8d9f70",
                  "name": "1on1",
                  "uuid": "58650850-fc18-4be3-97eb-33b5f992ecb9"
                },
                {
                  "exit_uuid": "b153815e-bb9d-45b4-873f-65bb1618cfbb",
                  "name": "praise",
                  "uuid": "f7188d24-6f51-4314-bb90-a4499cd10124"
                },
                {
                  "exit_uuid": "46ba72ea-7a00-4e97-82d3-f1abbf7690e0",
                  "name": "first app opening",
                  "uuid": "8a00034d-b401-44ac-9eee-fa90f26ee2af"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "41ebae90-11a0-4d0d-8c11-db68c2b4284b",
                "destination_uuid": null
              },
              {
                "uuid": "f5263da8-6cc6-4c68-a7cb-12d75d6625a6",
                "destination_uuid": "60f2e9be-c1d2-4340-9864-08275e2cae57"
              },
              {
                "uuid": "819e4657-ac0b-46ff-84d1-ce39ec8d9f70",
                "destination_uuid": "a3a291c7-9a11-4321-9f1c-593cc8c2e46b"
              },
              {
                "uuid": "b153815e-bb9d-45b4-873f-65bb1618cfbb",
                "destination_uuid": "fd3301b6-bc86-4de8-a3ff-88cf42b53a7f"
              },
              {
                "uuid": "46ba72ea-7a00-4e97-82d3-f1abbf7690e0",
                "destination_uuid": "deafddd1-a85c-42ce-8151-17ba6b898b23"
              }
            ]
          },
          {
            "uuid": "60f2e9be-c1d2-4340-9864-08275e2cae57",
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
                "uuid": "c4d02f08-044d-4032-90bd-58046312fdc9"
              }
            ],
            "exits": [
              {
                "uuid": "4eb0a7cf-8f48-43af-9336-4b0d2bf83eb5",
                "destination_uuid": "4509f01c-43d8-4453-a8c5-572e3c4680ac"
              }
            ]
          },
          {
            "uuid": "4509f01c-43d8-4453-a8c5-572e3c4680ac",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3c921af3-e3b6-4c84-8086-7a5919cec4d3",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "d1a577f4-ef28-4da9-a1aa-77cfc9215eb4",
                  "type": "has_only_phrase",
                  "uuid": "6ffb9685-f080-45e7-b4ff-0819cd2764d3"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "139b0416-b23a-4c76-87ac-3513f4f142bc",
                  "type": "has_only_phrase",
                  "uuid": "976deee1-1d3a-4cad-8663-a1312cabb503"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "91bb8f7c-2424-4ff3-8c09-a6da9e2dfdec",
                  "type": "has_only_phrase",
                  "uuid": "94eeabf4-1127-4fd2-a61f-f6b929430155"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "f049e09d-6df8-4100-816d-cf2276c13dd5",
                  "type": "has_only_phrase",
                  "uuid": "9abe6245-a4b7-4db0-ade1-9e7ba3cbe7a6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b95d856f-3b66-4a52-a3de-78f04d7dfc03",
                  "name": "All Responses",
                  "uuid": "3c921af3-e3b6-4c84-8086-7a5919cec4d3"
                },
                {
                  "exit_uuid": "84f305fd-abd3-4a49-95b0-612bdde4061a",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "d1a577f4-ef28-4da9-a1aa-77cfc9215eb4"
                },
                {
                  "exit_uuid": "8f3aa55b-a010-4b8b-98f4-20ce7f8291a2",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "139b0416-b23a-4c76-87ac-3513f4f142bc"
                },
                {
                  "exit_uuid": "cbdb4296-5820-4493-ac73-65b654536c61",
                  "name": "mod_welcome_survey",
                  "uuid": "91bb8f7c-2424-4ff3-8c09-a6da9e2dfdec"
                },
                {
                  "exit_uuid": "af5abc48-9001-43f5-859e-e6f20327385c",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "f049e09d-6df8-4100-816d-cf2276c13dd5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b95d856f-3b66-4a52-a3de-78f04d7dfc03",
                "destination_uuid": null
              },
              {
                "uuid": "84f305fd-abd3-4a49-95b0-612bdde4061a",
                "destination_uuid": "87476d28-35aa-42c8-af29-d0fa54889e29"
              },
              {
                "uuid": "8f3aa55b-a010-4b8b-98f4-20ce7f8291a2",
                "destination_uuid": "a4e16867-797e-4667-b3c1-7d37a4288945"
              },
              {
                "uuid": "cbdb4296-5820-4493-ac73-65b654536c61",
                "destination_uuid": "b66949a8-306d-4f54-ac3a-ee7fb12a428c"
              },
              {
                "uuid": "af5abc48-9001-43f5-859e-e6f20327385c",
                "destination_uuid": "59dc3cdf-de7d-42d4-a87c-00d3752983cd"
              }
            ]
          },
          {
            "uuid": "87476d28-35aa-42c8-af29-d0fa54889e29",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "c29ba4ab-9d15-4304-b99f-d7a0feb6dded"
                },
                "type": "enter_flow",
                "uuid": "fd6ece29-dfec-4eb8-b88e-32c888d1234d"
              }
            ],
            "exits": [
              {
                "uuid": "d06bbf18-230c-4c7e-ab3c-8f994ac87bff",
                "destination_uuid": null
              },
              {
                "uuid": "2933e552-48df-4076-a417-cf32537398e9",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1f6e1730-f725-442f-8eb0-cc0fd21d925f",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0adfcf0c-17b2-4525-be86-6f564e24ee7c"
                },
                {
                  "uuid": "10019cda-9dc5-4528-82c1-d201c36e35a9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "be52ff56-e290-4eac-8e23-3ec92a9361d0"
                }
              ],
              "categories": [
                {
                  "uuid": "0adfcf0c-17b2-4525-be86-6f564e24ee7c",
                  "name": "Complete",
                  "exit_uuid": "d06bbf18-230c-4c7e-ab3c-8f994ac87bff"
                },
                {
                  "uuid": "be52ff56-e290-4eac-8e23-3ec92a9361d0",
                  "name": "Expired",
                  "exit_uuid": "2933e552-48df-4076-a417-cf32537398e9"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0adfcf0c-17b2-4525-be86-6f564e24ee7c"
            }
          },
          {
            "uuid": "a4e16867-797e-4667-b3c1-7d37a4288945",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "b7a75cea-97c9-476d-ad8f-f64dd8706b8a"
                },
                "type": "enter_flow",
                "uuid": "7cddf51b-2c19-40f7-af90-0553d879bcd4"
              }
            ],
            "exits": [
              {
                "uuid": "156da31e-5521-4b94-a01c-32cdf739167d",
                "destination_uuid": null
              },
              {
                "uuid": "ba4395f4-4b66-4cf1-a6c2-774a2cdd33de",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "a9452ced-e39a-42a8-a09c-c855d8f7fca7",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "148854b6-4003-4bab-b598-7b383c1106d1"
                },
                {
                  "uuid": "01e73ebc-79a7-44bc-8485-00d751120fb8",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "86e6cbc4-4f9a-4f4f-bef3-9c19146bc3f4"
                }
              ],
              "categories": [
                {
                  "uuid": "148854b6-4003-4bab-b598-7b383c1106d1",
                  "name": "Complete",
                  "exit_uuid": "156da31e-5521-4b94-a01c-32cdf739167d"
                },
                {
                  "uuid": "86e6cbc4-4f9a-4f4f-bef3-9c19146bc3f4",
                  "name": "Expired",
                  "exit_uuid": "ba4395f4-4b66-4cf1-a6c2-774a2cdd33de"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "148854b6-4003-4bab-b598-7b383c1106d1"
            }
          },
          {
            "uuid": "b66949a8-306d-4f54-ac3a-ee7fb12a428c",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "64c465d9-b686-44d9-9087-f0d66c439b90"
                },
                "type": "enter_flow",
                "uuid": "0b60e9e6-17dd-49ee-bcd3-84e136dda064"
              }
            ],
            "exits": [
              {
                "uuid": "2907698e-9b3b-4e7a-b011-5d90fa6c2bd6",
                "destination_uuid": null
              },
              {
                "uuid": "8e9f453c-2dd0-478a-8826-6014baa7de82",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "d45f31eb-70b2-4536-8743-29ac3a9a3fcd",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "154400a4-a99e-4a07-bbfc-8957ff8e3679"
                },
                {
                  "uuid": "e9920ae9-df89-43ee-90c5-41271c70563a",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b2a8ded0-80aa-499d-8f55-eacefbceff92"
                }
              ],
              "categories": [
                {
                  "uuid": "154400a4-a99e-4a07-bbfc-8957ff8e3679",
                  "name": "Complete",
                  "exit_uuid": "2907698e-9b3b-4e7a-b011-5d90fa6c2bd6"
                },
                {
                  "uuid": "b2a8ded0-80aa-499d-8f55-eacefbceff92",
                  "name": "Expired",
                  "exit_uuid": "8e9f453c-2dd0-478a-8826-6014baa7de82"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "154400a4-a99e-4a07-bbfc-8957ff8e3679"
            }
          },
          {
            "uuid": "59dc3cdf-de7d-42d4-a87c-00d3752983cd",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "a72d0d37-403b-4bd1-a1d2-9da94a273154"
                },
                "type": "enter_flow",
                "uuid": "b58a67a9-f2ec-44a7-ac55-8dddbe78ad89"
              }
            ],
            "exits": [
              {
                "uuid": "ceae05d1-a18e-413d-8984-6e04f29424af",
                "destination_uuid": null
              },
              {
                "uuid": "b1190c7c-d273-4759-9f7e-819273b3a580",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "9c166dc0-d742-4873-bd93-8e35b4b0bbed",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8653a2b6-6e0c-4381-ba62-8e401dd8afbc"
                },
                {
                  "uuid": "96b448bd-66c8-436c-b2d4-304eb04c1774",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "db6217e7-2278-4984-b84d-12df2f83177c"
                }
              ],
              "categories": [
                {
                  "uuid": "8653a2b6-6e0c-4381-ba62-8e401dd8afbc",
                  "name": "Complete",
                  "exit_uuid": "ceae05d1-a18e-413d-8984-6e04f29424af"
                },
                {
                  "uuid": "db6217e7-2278-4984-b84d-12df2f83177c",
                  "name": "Expired",
                  "exit_uuid": "b1190c7c-d273-4759-9f7e-819273b3a580"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8653a2b6-6e0c-4381-ba62-8e401dd8afbc"
            }
          },
          {
            "uuid": "a3a291c7-9a11-4321-9f1c-593cc8c2e46b",
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
                "uuid": "d740c560-705e-4ab5-b636-b63a103bcc38"
              }
            ],
            "exits": [
              {
                "uuid": "f2296fb7-5d97-44e1-b807-1972d76eb4b0",
                "destination_uuid": "c54ab9cd-1d4b-4c5f-9bb1-e92a5410120d"
              }
            ]
          },
          {
            "uuid": "c54ab9cd-1d4b-4c5f-9bb1-e92a5410120d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2a8ca310-8ed5-4fa1-866e-ae8aec6f1392",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "0ec68804-e8cd-424f-be9e-031df74a0295",
                  "type": "has_only_phrase",
                  "uuid": "8cd0c223-17fd-4665-b33b-2b99c3d27794"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "7616e575-fcef-4ba7-93ff-44fc699a80b4",
                  "type": "has_only_phrase",
                  "uuid": "ce2b7f32-e4a5-4ad1-906f-b83b01aaf971"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "c9efc996-7443-4d49-b67b-40e0e10d77a8",
                  "type": "has_only_phrase",
                  "uuid": "2d65a5ab-cdfd-4cd8-91b5-29b2b81537bf"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cfdbfca3-5472-417d-8a8e-9a30360fce38",
                  "name": "All Responses",
                  "uuid": "2a8ca310-8ed5-4fa1-866e-ae8aec6f1392"
                },
                {
                  "exit_uuid": "c97feb1b-c9d6-4857-841b-c14cc43bce6e",
                  "name": "mod_1on1_emo",
                  "uuid": "0ec68804-e8cd-424f-be9e-031df74a0295"
                },
                {
                  "exit_uuid": "50f3adcf-f06f-48d9-8c0d-a60cbdcdf965",
                  "name": "mod_1on1_activity",
                  "uuid": "7616e575-fcef-4ba7-93ff-44fc699a80b4"
                },
                {
                  "exit_uuid": "42511a80-3379-42fe-a4b5-4af697095a70",
                  "name": "mod_1on1_activity_review",
                  "uuid": "c9efc996-7443-4d49-b67b-40e0e10d77a8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cfdbfca3-5472-417d-8a8e-9a30360fce38",
                "destination_uuid": null
              },
              {
                "uuid": "c97feb1b-c9d6-4857-841b-c14cc43bce6e",
                "destination_uuid": "1d7d590b-dbde-4269-a605-eb644752a85f"
              },
              {
                "uuid": "50f3adcf-f06f-48d9-8c0d-a60cbdcdf965",
                "destination_uuid": "b96fe658-358d-4e38-a3e8-663b871ae186"
              },
              {
                "uuid": "42511a80-3379-42fe-a4b5-4af697095a70",
                "destination_uuid": "26d6c132-ecad-4cd2-bc17-53ba70502b8d"
              }
            ]
          },
          {
            "uuid": "1d7d590b-dbde-4269-a605-eb644752a85f",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "8591fa73-d09a-42c5-9273-0fc5c90c5aac"
                },
                "type": "enter_flow",
                "uuid": "4e068e19-a0f0-463b-9720-a944dce27c24"
              }
            ],
            "exits": [
              {
                "uuid": "85edafc4-919a-43c2-95a4-1025d0649b38",
                "destination_uuid": null
              },
              {
                "uuid": "6f6d9dc2-26f2-443f-9be9-9106aa452630",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1bf44869-10bc-4b16-a116-33ea16984c81",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "69a66afb-f1c6-47a7-b9a5-95310ea70b87"
                },
                {
                  "uuid": "7ed56e4d-98ba-46ac-86af-719f75f19735",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "36860412-d050-4b40-8ba5-e7c4d1066710"
                }
              ],
              "categories": [
                {
                  "uuid": "69a66afb-f1c6-47a7-b9a5-95310ea70b87",
                  "name": "Complete",
                  "exit_uuid": "85edafc4-919a-43c2-95a4-1025d0649b38"
                },
                {
                  "uuid": "36860412-d050-4b40-8ba5-e7c4d1066710",
                  "name": "Expired",
                  "exit_uuid": "6f6d9dc2-26f2-443f-9be9-9106aa452630"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "69a66afb-f1c6-47a7-b9a5-95310ea70b87"
            }
          },
          {
            "uuid": "b96fe658-358d-4e38-a3e8-663b871ae186",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "50dd9db9-0c38-4e27-89a6-a816d1c0b622"
                },
                "type": "enter_flow",
                "uuid": "0bd2409a-7564-4ca9-8869-52fcc3d2201f"
              }
            ],
            "exits": [
              {
                "uuid": "b642789c-ff71-4f02-98f9-18cc0d9752f8",
                "destination_uuid": null
              },
              {
                "uuid": "87d2e56c-f57f-42d5-84a4-421a2a3e536c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "79df563b-a837-4b55-8bef-36e6f8bf3c54",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7f058d70-758f-4288-b64a-52b998bae9ea"
                },
                {
                  "uuid": "b10887ea-f4b0-4003-832f-ca3d46029c50",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "fb878c08-1c22-48c6-9db5-3115d8585c67"
                }
              ],
              "categories": [
                {
                  "uuid": "7f058d70-758f-4288-b64a-52b998bae9ea",
                  "name": "Complete",
                  "exit_uuid": "b642789c-ff71-4f02-98f9-18cc0d9752f8"
                },
                {
                  "uuid": "fb878c08-1c22-48c6-9db5-3115d8585c67",
                  "name": "Expired",
                  "exit_uuid": "87d2e56c-f57f-42d5-84a4-421a2a3e536c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7f058d70-758f-4288-b64a-52b998bae9ea"
            }
          },
          {
            "uuid": "26d6c132-ecad-4cd2-bc17-53ba70502b8d",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "0938e206-9635-4b21-b32c-0fa6beb691d0"
                },
                "type": "enter_flow",
                "uuid": "ab302db8-e787-493c-a365-ffd8f1a170d4"
              }
            ],
            "exits": [
              {
                "uuid": "c5fb7999-7e42-498e-9f78-98c69aca4099",
                "destination_uuid": null
              },
              {
                "uuid": "aaf84c6c-5223-4ff6-b06b-ca3fc201adb1",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8761cd2d-01de-4d5d-a574-eead3830c23b",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "130732c6-2123-4e6c-a7fb-a7285c04dd08"
                },
                {
                  "uuid": "266d28d9-1aa9-4e35-9aef-2264c74ec71e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "bb47af6a-5681-4cc9-a66e-9ff7e4e02b05"
                }
              ],
              "categories": [
                {
                  "uuid": "130732c6-2123-4e6c-a7fb-a7285c04dd08",
                  "name": "Complete",
                  "exit_uuid": "c5fb7999-7e42-498e-9f78-98c69aca4099"
                },
                {
                  "uuid": "bb47af6a-5681-4cc9-a66e-9ff7e4e02b05",
                  "name": "Expired",
                  "exit_uuid": "aaf84c6c-5223-4ff6-b06b-ca3fc201adb1"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "130732c6-2123-4e6c-a7fb-a7285c04dd08"
            }
          },
          {
            "uuid": "fd3301b6-bc86-4de8-a3ff-88cf42b53a7f",
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
                "uuid": "f73ebefc-dd97-4d57-aebe-af4a4792d8e8"
              }
            ],
            "exits": [
              {
                "uuid": "75d1f01e-c0da-4177-95b9-0c0e40548bcb",
                "destination_uuid": "ab6ff6d0-2af2-4c9d-87b2-3a02ee3aeac8"
              }
            ]
          },
          {
            "uuid": "ab6ff6d0-2af2-4c9d-87b2-3a02ee3aeac8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "94fd067c-7bbc-4e9f-9fd8-1ff00686106b",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "84712520-15fd-49c2-9243-0a332be6abb8",
                  "type": "has_only_phrase",
                  "uuid": "504738a3-54eb-458c-8e05-5c25da913eea"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "0701be73-cd36-4ded-871c-2d298cc81963",
                  "type": "has_only_phrase",
                  "uuid": "5e3e22ed-564b-4121-b2ac-ffbacbfe43aa"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "ad2f0da4-31c7-45f2-b03e-3598d3f9dde2",
                  "type": "has_only_phrase",
                  "uuid": "fe9fdcb8-fc19-48d0-aa33-9ab2b982b789"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f8fbacd9-b009-408c-9f39-755b8186d399",
                  "name": "All Responses",
                  "uuid": "94fd067c-7bbc-4e9f-9fd8-1ff00686106b"
                },
                {
                  "exit_uuid": "ab5ff142-0464-49bb-bc16-3abbad48c083",
                  "name": "mod_praise_intro",
                  "uuid": "84712520-15fd-49c2-9243-0a332be6abb8"
                },
                {
                  "exit_uuid": "a86581ef-866c-4768-8634-e2db4cc11550",
                  "name": "mod_praise_activity",
                  "uuid": "0701be73-cd36-4ded-871c-2d298cc81963"
                },
                {
                  "exit_uuid": "890a2380-7a3c-43c9-92ac-6db44703922d",
                  "name": "mod_praise_activity_review",
                  "uuid": "ad2f0da4-31c7-45f2-b03e-3598d3f9dde2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f8fbacd9-b009-408c-9f39-755b8186d399",
                "destination_uuid": null
              },
              {
                "uuid": "ab5ff142-0464-49bb-bc16-3abbad48c083",
                "destination_uuid": "189160b8-a6a3-4584-90b0-669ebdc2a546"
              },
              {
                "uuid": "a86581ef-866c-4768-8634-e2db4cc11550",
                "destination_uuid": "c7e51da8-d478-4ad0-b89d-8af70eaf0777"
              },
              {
                "uuid": "890a2380-7a3c-43c9-92ac-6db44703922d",
                "destination_uuid": "c66035fc-52bf-484c-bccf-454ca64ded36"
              }
            ]
          },
          {
            "uuid": "189160b8-a6a3-4584-90b0-669ebdc2a546",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "415a1d71-19ca-444b-afda-21d92fa62506"
                },
                "type": "enter_flow",
                "uuid": "8215f913-66bb-4e6f-8615-073957955d85"
              }
            ],
            "exits": [
              {
                "uuid": "08453b3c-dc10-46ce-86e6-41d09d928682",
                "destination_uuid": null
              },
              {
                "uuid": "50a97a65-42ef-427e-b31e-ef883a0fb7c7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "91f4b73d-b401-4029-a415-638646f6460a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d59b8739-06b0-4e13-b464-db0dfc5deb65"
                },
                {
                  "uuid": "5981f564-5630-442e-8304-1e28a43fdfe0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "491030d9-4fbb-431e-b1a7-7a7bd3c9476f"
                }
              ],
              "categories": [
                {
                  "uuid": "d59b8739-06b0-4e13-b464-db0dfc5deb65",
                  "name": "Complete",
                  "exit_uuid": "08453b3c-dc10-46ce-86e6-41d09d928682"
                },
                {
                  "uuid": "491030d9-4fbb-431e-b1a7-7a7bd3c9476f",
                  "name": "Expired",
                  "exit_uuid": "50a97a65-42ef-427e-b31e-ef883a0fb7c7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d59b8739-06b0-4e13-b464-db0dfc5deb65"
            }
          },
          {
            "uuid": "c7e51da8-d478-4ad0-b89d-8af70eaf0777",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "b9990fdc-0f97-468d-8ea8-343a97bd5065"
                },
                "type": "enter_flow",
                "uuid": "c28112c7-fa6e-4541-b84b-b41fd50dbb1e"
              }
            ],
            "exits": [
              {
                "uuid": "7f1be4ee-9fd4-43ba-951d-3403a1c1e3a9",
                "destination_uuid": null
              },
              {
                "uuid": "182372b8-d268-4079-bd84-e2765064de2a",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "67083381-a7c9-404a-8b96-4599807a8be8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ab3469c0-5fe5-4328-a779-9b5c9eec4171"
                },
                {
                  "uuid": "0439dce5-3ba9-44a5-886e-aa2424093668",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "45c0e1eb-dadd-49ed-bd33-d85cff84c73c"
                }
              ],
              "categories": [
                {
                  "uuid": "ab3469c0-5fe5-4328-a779-9b5c9eec4171",
                  "name": "Complete",
                  "exit_uuid": "7f1be4ee-9fd4-43ba-951d-3403a1c1e3a9"
                },
                {
                  "uuid": "45c0e1eb-dadd-49ed-bd33-d85cff84c73c",
                  "name": "Expired",
                  "exit_uuid": "182372b8-d268-4079-bd84-e2765064de2a"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ab3469c0-5fe5-4328-a779-9b5c9eec4171"
            }
          },
          {
            "uuid": "c66035fc-52bf-484c-bccf-454ca64ded36",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "ea05e78e-702d-47c0-9197-0baa6cb9b74d"
                },
                "type": "enter_flow",
                "uuid": "b4359d2f-fa0e-40bd-aa31-c7968990d1e7"
              }
            ],
            "exits": [
              {
                "uuid": "2bfbb759-8188-4d05-853d-b42dcf7fb843",
                "destination_uuid": null
              },
              {
                "uuid": "551c520f-e970-412c-b1c5-209f33a228c2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "dd178b3a-af1b-497d-bc1a-f8aa17c08680",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "628e264b-b6fb-4197-bdd4-b68e05ff2d0a"
                },
                {
                  "uuid": "c73aabf9-27bd-45a3-bc59-3439cab263c7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c0d08645-3bd5-49ce-ab3b-20f8a3b2c6ef"
                }
              ],
              "categories": [
                {
                  "uuid": "628e264b-b6fb-4197-bdd4-b68e05ff2d0a",
                  "name": "Complete",
                  "exit_uuid": "2bfbb759-8188-4d05-853d-b42dcf7fb843"
                },
                {
                  "uuid": "c0d08645-3bd5-49ce-ab3b-20f8a3b2c6ef",
                  "name": "Expired",
                  "exit_uuid": "551c520f-e970-412c-b1c5-209f33a228c2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "628e264b-b6fb-4197-bdd4-b68e05ff2d0a"
            }
          },
          {
            "uuid": "deafddd1-a85c-42ce-8151-17ba6b898b23",
            "actions": [
              {
                "flow": {
                  "name": "first_app_opening",
                  "uuid": "457c2012-9b77-4796-90ff-d791f4f01fd1"
                },
                "type": "enter_flow",
                "uuid": "90ef551b-a36e-458a-8e50-6e38e98dee2d"
              }
            ],
            "exits": [
              {
                "uuid": "afd4cb22-d532-4585-8171-0fcc30b6b7af",
                "destination_uuid": null
              },
              {
                "uuid": "497356fc-d5f8-4d06-911b-77f6d9eb99c6",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5e8e0abf-e9b3-4dc8-a9ba-934807c5fa84",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7d0d505b-6bd1-49c0-b174-da66f5757f2f"
                },
                {
                  "uuid": "56d1ea34-cdbe-4535-9139-ed3afd4d43a9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "86b5c42f-19f2-407e-b395-d7c2a838484f"
                }
              ],
              "categories": [
                {
                  "uuid": "7d0d505b-6bd1-49c0-b174-da66f5757f2f",
                  "name": "Complete",
                  "exit_uuid": "afd4cb22-d532-4585-8171-0fcc30b6b7af"
                },
                {
                  "uuid": "86b5c42f-19f2-407e-b395-d7c2a838484f",
                  "name": "Expired",
                  "exit_uuid": "497356fc-d5f8-4d06-911b-77f6d9eb99c6"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7d0d505b-6bd1-49c0-b174-da66f5757f2f"
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
        "uuid": "26f747db-1ea6-47e0-955a-2ce1cf5a9a8a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "be6bd6d2-29d2-4cb1-bd55-ef9489d55250",
            "actions": [
              {
                "uuid": "c011b72d-f705-47f9-b1dc-bad2783087b4",
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
                "uuid": "8201bda3-0951-48f9-b247-595000ec264f",
                "destination_uuid": "befac6a3-dfab-47ff-a806-cf2a297e4c79"
              }
            ]
          },
          {
            "uuid": "befac6a3-dfab-47ff-a806-cf2a297e4c79",
            "actions": [
              {
                "uuid": "0d0854d9-1f80-4419-b581-a84710d404f5",
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
                "uuid": "f3fb2f11-991e-400e-bc8e-7ebb2f213124",
                "destination_uuid": "0d388226-aba1-4b5c-94a5-294454bce919"
              }
            ]
          },
          {
            "uuid": "0d388226-aba1-4b5c-94a5-294454bce919",
            "actions": [
              {
                "uuid": "6889dff0-adfe-4d6c-b59a-f4e6c3c740d0",
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
                "uuid": "2837df1c-242f-4f22-a3d5-6d6d80db8444",
                "destination_uuid": "f34443a3-71a0-480e-8b88-f6ae15e537b0"
              }
            ]
          },
          {
            "uuid": "f34443a3-71a0-480e-8b88-f6ae15e537b0",
            "actions": [
              {
                "uuid": "eb7cab25-cf55-4c27-a3a6-0158d837bee4",
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
                "uuid": "b318b554-46b3-4231-878f-0314738411d2",
                "destination_uuid": "c33aedd9-c5f5-4632-aacc-cc0ed19c280f"
              }
            ]
          },
          {
            "uuid": "c33aedd9-c5f5-4632-aacc-cc0ed19c280f",
            "actions": [
              {
                "uuid": "138f0268-7442-41df-835c-dd8035aad8f0",
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
                "uuid": "df68fedb-fd4d-45a7-a9cd-96bce292b0ac",
                "destination_uuid": "ca2a28f2-e048-46c5-9abf-35694b1aaf84"
              }
            ]
          },
          {
            "uuid": "ca2a28f2-e048-46c5-9abf-35694b1aaf84",
            "actions": [
              {
                "uuid": "0c389188-91b1-4daf-a2e4-b3618876496d",
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
                "uuid": "e2e98fd9-4038-4112-a562-e0e11de4453d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "96cf269d-9d97-49ef-b851-307a323e3900",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6aefd70c-56ce-4910-aa90-574219722f5f",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "03a32916-0906-444d-8faa-ce316342a2e4"
              }
            ],
            "exits": [
              {
                "uuid": "dc90949b-6226-4772-bfa6-1a7bdbd2da65",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d19ac530-7879-44ed-a9fa-ed258860c88e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7e8ba568-845e-4328-9382-6f72b4e33dc1",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8bbf41fb-0c7a-4524-aef6-8867b887a77e"
              }
            ],
            "exits": [
              {
                "uuid": "31cfdd61-7876-4866-b9e7-792d8ffaba3a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8d549b55-27b8-4a09-8030-98cba9ed2e8b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b84cf4f5-5106-4476-96e2-ab3bfa251a39",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "87a2ae15-5c92-4e00-b030-093a175cd2ea"
              }
            ],
            "exits": [
              {
                "uuid": "540188ff-8941-4b7b-8829-42c1ff3b607d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "543836cb-8c95-4596-a987-eb6991198687",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "11d04aa0-6de1-4bf2-b55f-ae805bd0f617",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3028c0cd-cc95-4966-9398-fac367240bd8"
              }
            ],
            "exits": [
              {
                "uuid": "30816792-a687-47cf-a66d-00729504e9ef",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "7c330234-86e6-4bff-9771-c8e424ce203e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "356ad716-c8fb-4884-a657-fb40e8848da4",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "54980895-c1c2-4259-a6ce-7d1160b8b003"
              }
            ],
            "exits": [
              {
                "uuid": "19f117ab-80df-430a-bcf3-ffcc13a9f826",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "cd724d24-0e87-4acc-a6dd-136e4b1962b5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "eeafe094-7cfd-4489-bf34-675b8e697045",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b141054e-1917-4653-972e-44c8bbbb7d41"
              }
            ],
            "exits": [
              {
                "uuid": "2c1aad10-e195-42ab-b723-fc7e34fb1247",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "edbd4ba3-22a8-4b57-ad2e-6915267648ea",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a4bd2661-b716-4297-91fa-2dd20c772f2e",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d7a866f8-9a4e-4b6a-ab00-1a8d29f2d636"
              }
            ],
            "exits": [
              {
                "uuid": "bab6e4f4-f4fe-4aee-a066-48e8dc5de707",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "0b901ff2-2023-4974-8a45-0d336c253376",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "64ee5302-63dc-4e10-bec8-cc2bf1175a4d",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "483a4a0b-c0e4-4d32-9e40-4f3d3b7b3cca"
              }
            ],
            "exits": [
              {
                "uuid": "a19f74ec-a876-4217-91e6-77c907f140f6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a1be1a98-0c4d-4fe5-9920-30e205f92eb9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "cafb8129-f192-44af-96e9-e701b201c2ae",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f0a6cdc6-7228-4c3e-b0ab-410e21642ba1"
              }
            ],
            "exits": [
              {
                "uuid": "7d598b9a-aa2c-48a3-bca7-1ed739558ff6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e559e964-ff0e-4314-9e74-e19b26f167db",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c996b8aa-f537-46d2-b8f1-d24bb4ce7ece",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2625f95c-a3f1-48d3-a21f-1af152cc4b1b"
              }
            ],
            "exits": [
              {
                "uuid": "58674db4-d965-4bab-9cea-4c8600b08092",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "365b2eaf-d3e6-4432-a48a-9000274da457",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5da439af-a9c1-4f35-9df2-9998f550048f",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e2e7d151-afa0-4213-aa31-a91702556101"
              }
            ],
            "exits": [
              {
                "uuid": "ada28af8-b938-4b5b-b6f7-5eb2db6900ad",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "344b5782-01d5-4f5c-ac3b-d8c3367c2eb5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c0bbc2c9-ee85-4b6f-ad9e-48fe7845642a",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "66fd87f0-d0ce-4e44-b2ff-6b8e18998af7"
              }
            ],
            "exits": [
              {
                "uuid": "e053dac9-957b-4a1c-9494-44cda1c19c1c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "0f6dc19b-8ca8-4011-ae3e-934b3d488817",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "561805b4-206f-49aa-8a9b-62123140270e",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2bc94d9a-8e1b-4758-ad43-8929e66cb959"
              }
            ],
            "exits": [
              {
                "uuid": "ad9a30c8-b526-42da-a108-62918493cab9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b275ae8d-afed-48f1-a5c2-4e1bd5cdd1fc",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c43c663d-f2d8-496a-90fe-cb796d0357f0",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "40f29785-97cd-4743-a740-f380eca0b259"
              }
            ],
            "exits": [
              {
                "uuid": "1400bdbc-2fa6-4391-933c-f35668852832",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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