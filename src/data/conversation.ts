export default [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "30820915-113c-48ad-b369-789c1dcaac11",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ba5e42c7-5856-429e-be2c-140a1cabce52",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c6d8f57e-42b7-4b61-a54e-4d695e38dd6e"
              }
            ],
            "exits": [
              {
                "uuid": "4a31e054-441d-4fc0-8b01-c6ad50522728",
                "destination_uuid": "9cc79815-b6ee-46b0-ba75-cd9e63e8336b"
              }
            ]
          },
          {
            "uuid": "9cc79815-b6ee-46b0-ba75-cd9e63e8336b",
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
                "uuid": "4f9d3435-9c08-4854-916d-2ea99551072b"
              }
            ],
            "exits": [
              {
                "uuid": "564b7127-b885-4a63-9046-1934ac1c0edd",
                "destination_uuid": "f2a5e3e7-8305-49de-9122-f4bba90de0b1"
              }
            ]
          },
          {
            "uuid": "f2a5e3e7-8305-49de-9122-f4bba90de0b1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "657e051d-36b1-4d21-bdd5-4e452488d0d1",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "55692c29-642f-4a82-b6ca-d873bed713c6",
                  "type": "has_only_phrase",
                  "uuid": "80b4428a-750b-46ec-8eb2-9de8012aa889"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "cec805c0-e25d-408d-8659-e33d139f03b6",
                  "type": "has_only_phrase",
                  "uuid": "43299409-dcd9-4568-9beb-83bad20089fc"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "192370b6-cfb9-423d-9f42-0f01f54b24b9",
                  "type": "has_only_phrase",
                  "uuid": "30dcda96-ba68-451b-bab7-44c7b1d81609"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "fe6adf88-e286-4d5d-9f55-f26472e50275",
                  "type": "has_only_phrase",
                  "uuid": "23e953a5-186f-4f84-8923-dad1f49c2694"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "d53809bf-9a04-45b3-aabf-024a65adfd6c",
                  "type": "has_only_phrase",
                  "uuid": "5603d05b-fbae-433c-9ad2-3bc55cf70ab8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1edec9e9-2acd-4111-8e79-0db630589eae",
                  "name": "All Responses",
                  "uuid": "657e051d-36b1-4d21-bdd5-4e452488d0d1"
                },
                {
                  "exit_uuid": "fb7a50a6-3a30-49ad-ad4e-79a82cbcea48",
                  "name": "First option: launch example_media flow",
                  "uuid": "55692c29-642f-4a82-b6ca-d873bed713c6"
                },
                {
                  "exit_uuid": "3785ea4b-c87b-4268-b468-ea597840d68a",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "cec805c0-e25d-408d-8659-e33d139f03b6"
                },
                {
                  "exit_uuid": "2f418837-c29b-4d51-883b-ed2add04d498",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "192370b6-cfb9-423d-9f42-0f01f54b24b9"
                },
                {
                  "exit_uuid": "7bae766a-b862-486e-b702-26efc8d587ce",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "fe6adf88-e286-4d5d-9f55-f26472e50275"
                },
                {
                  "exit_uuid": "7e34e22a-61e3-4b00-90a6-81636893d9a4",
                  "name": "Stay in this flow.",
                  "uuid": "d53809bf-9a04-45b3-aabf-024a65adfd6c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1edec9e9-2acd-4111-8e79-0db630589eae",
                "destination_uuid": null
              },
              {
                "uuid": "fb7a50a6-3a30-49ad-ad4e-79a82cbcea48",
                "destination_uuid": "9c7081df-07a3-4706-a481-f7fd08e3229e"
              },
              {
                "uuid": "3785ea4b-c87b-4268-b468-ea597840d68a",
                "destination_uuid": "4c31850f-19d6-400d-baaf-82246e18ec51"
              },
              {
                "uuid": "2f418837-c29b-4d51-883b-ed2add04d498",
                "destination_uuid": "b0c357a8-1a64-4bb6-a518-9f2d4cac87af"
              },
              {
                "uuid": "7bae766a-b862-486e-b702-26efc8d587ce",
                "destination_uuid": "88b30c92-7067-4317-8a93-e6247c6c2d28"
              },
              {
                "uuid": "7e34e22a-61e3-4b00-90a6-81636893d9a4",
                "destination_uuid": "6310487a-b560-4946-9f77-652afe884d9c"
              }
            ]
          },
          {
            "uuid": "9c7081df-07a3-4706-a481-f7fd08e3229e",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "90634bfc-fef6-4dfe-a437-a4f349375b97"
                },
                "type": "enter_flow",
                "uuid": "0ffcf0e5-1172-4213-b716-d9f1067f3d51"
              }
            ],
            "exits": [
              {
                "uuid": "6c683a00-6c35-4dbb-b766-bb0eeb1fbaaa",
                "destination_uuid": "70c5feee-fac2-43d3-ad4d-05084a54abcc"
              },
              {
                "uuid": "a84450f2-71b9-430f-b98c-6921e8b795a0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8c1857b5-b240-48fb-a130-2f8cdebcbfad",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8af31a7f-f3c0-4c23-998e-6785b50f2cd8"
                },
                {
                  "uuid": "e4431331-7599-4aa0-b8e6-c16b02d371e0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b3157793-9fe5-4752-8172-d1073217d63e"
                }
              ],
              "categories": [
                {
                  "uuid": "8af31a7f-f3c0-4c23-998e-6785b50f2cd8",
                  "name": "Complete",
                  "exit_uuid": "6c683a00-6c35-4dbb-b766-bb0eeb1fbaaa"
                },
                {
                  "uuid": "b3157793-9fe5-4752-8172-d1073217d63e",
                  "name": "Expired",
                  "exit_uuid": "a84450f2-71b9-430f-b98c-6921e8b795a0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8af31a7f-f3c0-4c23-998e-6785b50f2cd8"
            }
          },
          {
            "uuid": "4c31850f-19d6-400d-baaf-82246e18ec51",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "abcbd5c4-5728-47f3-b485-c8736d2da6a7"
                },
                "type": "enter_flow",
                "uuid": "3d7488bc-3fe5-4820-a16a-ccfae16e85e7"
              }
            ],
            "exits": [
              {
                "uuid": "2c46d2c2-0ded-4367-8a22-082674ca539c",
                "destination_uuid": "70c5feee-fac2-43d3-ad4d-05084a54abcc"
              },
              {
                "uuid": "47ff11e5-fa4e-43a4-8e33-ecad2b6854e9",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "cfdd989c-8c9a-4670-a4f9-0d4e6757cc70",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ff5968a0-fcab-4992-b19b-9cfc35b33e70"
                },
                {
                  "uuid": "c69b3603-f099-4f38-b513-a9cc22912191",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "844484d9-c4b1-4370-8735-67425fd125aa"
                }
              ],
              "categories": [
                {
                  "uuid": "ff5968a0-fcab-4992-b19b-9cfc35b33e70",
                  "name": "Complete",
                  "exit_uuid": "2c46d2c2-0ded-4367-8a22-082674ca539c"
                },
                {
                  "uuid": "844484d9-c4b1-4370-8735-67425fd125aa",
                  "name": "Expired",
                  "exit_uuid": "47ff11e5-fa4e-43a4-8e33-ecad2b6854e9"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ff5968a0-fcab-4992-b19b-9cfc35b33e70"
            }
          },
          {
            "uuid": "b0c357a8-1a64-4bb6-a518-9f2d4cac87af",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "b2c810f9-f521-41dd-8750-53e9b57fe1b0"
                },
                "type": "enter_flow",
                "uuid": "fb359b28-efa9-4c5a-acfb-31594019fd03"
              }
            ],
            "exits": [
              {
                "uuid": "302c6e8e-e4eb-4364-b037-54547830fd7c",
                "destination_uuid": "70c5feee-fac2-43d3-ad4d-05084a54abcc"
              },
              {
                "uuid": "893cbdc1-d6b1-4498-b8db-839cb30576d5",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5e32a3fa-d78b-40a7-8838-cea61ba5044a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "2c831a71-902f-4600-bba3-cc59536119e6"
                },
                {
                  "uuid": "8977991d-7e8b-4962-aa02-36c3fd3005b2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "3103f944-7c1b-49b8-b4eb-e4af254722ae"
                }
              ],
              "categories": [
                {
                  "uuid": "2c831a71-902f-4600-bba3-cc59536119e6",
                  "name": "Complete",
                  "exit_uuid": "302c6e8e-e4eb-4364-b037-54547830fd7c"
                },
                {
                  "uuid": "3103f944-7c1b-49b8-b4eb-e4af254722ae",
                  "name": "Expired",
                  "exit_uuid": "893cbdc1-d6b1-4498-b8db-839cb30576d5"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "2c831a71-902f-4600-bba3-cc59536119e6"
            }
          },
          {
            "uuid": "88b30c92-7067-4317-8a93-e6247c6c2d28",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "c709e843-74e4-4c00-9504-a2768ac9e71f"
                },
                "type": "enter_flow",
                "uuid": "83dec280-e62a-4b0e-98a4-9da850fc39b3"
              }
            ],
            "exits": [
              {
                "uuid": "51cf1379-f400-4b68-961d-76026febdda7",
                "destination_uuid": "70c5feee-fac2-43d3-ad4d-05084a54abcc"
              },
              {
                "uuid": "e3ba3069-e8b5-4fe0-91d0-ec352f3a5074",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "6c512eaf-ea10-4287-a420-7176d0b8b311",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "3ede765d-ff26-4290-9d9f-c6f56562c6ab"
                },
                {
                  "uuid": "c0ffb497-007b-49b9-8803-a34d1f16b6d4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "4ecdc720-7e68-418a-a3a3-f5e451da6797"
                }
              ],
              "categories": [
                {
                  "uuid": "3ede765d-ff26-4290-9d9f-c6f56562c6ab",
                  "name": "Complete",
                  "exit_uuid": "51cf1379-f400-4b68-961d-76026febdda7"
                },
                {
                  "uuid": "4ecdc720-7e68-418a-a3a3-f5e451da6797",
                  "name": "Expired",
                  "exit_uuid": "e3ba3069-e8b5-4fe0-91d0-ec352f3a5074"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "3ede765d-ff26-4290-9d9f-c6f56562c6ab"
            }
          },
          {
            "uuid": "6310487a-b560-4946-9f77-652afe884d9c",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ad2db8c6-4782-49d8-ad48-d5f601081dfa"
              }
            ],
            "exits": [
              {
                "uuid": "6eba9416-e689-453f-94ab-856058dbddcb",
                "destination_uuid": "f7dda652-83d5-489b-b474-97357651ed74"
              }
            ]
          },
          {
            "uuid": "70c5feee-fac2-43d3-ad4d-05084a54abcc",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2936dfc4-c794-4c1c-a8ef-cb670847ae03"
              }
            ],
            "exits": [
              {
                "uuid": "9f074183-0991-4200-b00f-b801797d07fd",
                "destination_uuid": "f7dda652-83d5-489b-b474-97357651ed74"
              }
            ]
          },
          {
            "uuid": "f7dda652-83d5-489b-b474-97357651ed74",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c169d75b-066b-4722-aa78-d83058f5d084"
              }
            ],
            "exits": [
              {
                "uuid": "0992944e-a349-4dd0-9df5-d8b4e444f587",
                "destination_uuid": "d4c4e36a-4bb8-4897-ad85-2b860fa9cbc1"
              }
            ]
          },
          {
            "uuid": "d4c4e36a-4bb8-4897-ad85-2b860fa9cbc1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e90b8c8d-4cfb-403e-9c93-4eec17522717",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "13218ef6-265f-4ef8-a93a-5af0e1293711",
                  "type": "has_only_phrase",
                  "uuid": "60cf5c9f-a26a-481b-b8b2-ad239bacf3bc"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "5e67e732-70ca-4b59-8395-b543af5e37e5",
                  "type": "has_only_phrase",
                  "uuid": "c3469e72-96d6-45c3-ac9e-b8bb358a3079"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f940e7c8-d121-4634-9502-77ea92892395",
                  "name": "All Responses",
                  "uuid": "e90b8c8d-4cfb-403e-9c93-4eec17522717"
                },
                {
                  "exit_uuid": "e5ff2324-f13d-4d07-b152-87f78f903e55",
                  "name": "Yes",
                  "uuid": "13218ef6-265f-4ef8-a93a-5af0e1293711"
                },
                {
                  "exit_uuid": "3b515917-a06d-444d-b5b5-41e917c946a9",
                  "name": "No",
                  "uuid": "5e67e732-70ca-4b59-8395-b543af5e37e5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f940e7c8-d121-4634-9502-77ea92892395",
                "destination_uuid": null
              },
              {
                "uuid": "e5ff2324-f13d-4d07-b152-87f78f903e55",
                "destination_uuid": "9cc79815-b6ee-46b0-ba75-cd9e63e8336b"
              },
              {
                "uuid": "3b515917-a06d-444d-b5b5-41e917c946a9",
                "destination_uuid": "6cd23f6e-a650-4cc2-8ead-1f282acc4681"
              }
            ]
          },
          {
            "uuid": "6cd23f6e-a650-4cc2-8ead-1f282acc4681",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "92a8a881-3d0d-44e2-bd28-c9ca6a4ca5e1"
              }
            ],
            "exits": [
              {
                "uuid": "325d4328-a7b4-4e06-bc68-3823fcbbbec2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "66cc77c0-0e74-4b63-9599-ba1ab14fdd38",
            "actions": [
              {
                "uuid": "ea020220-6159-43e8-8884-1b5a77550483",
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
                "uuid": "cdd52add-efec-4bd4-b406-0858b5e15d6f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "7eb49225-fa95-4b18-91f3-ad6af2ef0a83",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "862230f3-ea49-4bb0-aacb-849682f204c6",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1ff4e609-47a5-446e-9a3b-1aae4d3ad491"
              }
            ],
            "exits": [
              {
                "uuid": "ec667aa6-61e8-469a-9208-a6f4f39d2eb8",
                "destination_uuid": "0f23cfab-1280-408b-a7d9-44f3dcdf404c"
              }
            ]
          },
          {
            "uuid": "af820aba-b65b-4559-9236-e0c1e3344e44",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5b7b3a16-ced7-41ec-aca0-72e0ab0914f7"
              }
            ],
            "exits": [
              {
                "uuid": "551cff75-f327-492e-8b74-e7ca66ba6276",
                "destination_uuid": "d31e87d2-5cb2-4abb-9093-639261c842f3"
              }
            ]
          },
          {
            "uuid": "d31e87d2-5cb2-4abb-9093-639261c842f3",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "7ce74411-ca67-454e-85cd-a73fa6e50b36"
              }
            ],
            "exits": [
              {
                "uuid": "04c52016-9a40-46f2-b47a-2ccba532e13a",
                "destination_uuid": "9a1a0366-b669-4c0a-8120-1cca8792d4a6"
              }
            ]
          },
          {
            "uuid": "9a1a0366-b669-4c0a-8120-1cca8792d4a6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f29c2a71-bbf2-4ea9-80cf-e44706edddf2",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "58815fc8-3cbf-475f-8c83-a063415c5733",
                  "type": "has_only_phrase",
                  "uuid": "268f504d-3e3b-4651-ae34-87addf7981f8"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "58815fc8-3cbf-475f-8c83-a063415c5733",
                  "type": "has_only_phrase",
                  "uuid": "467d549a-a287-4859-a87f-3fc5f1f33563"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cf7108de-d753-4edb-98f3-27e4b0ce54cf",
                  "name": "All Responses",
                  "uuid": "f29c2a71-bbf2-4ea9-80cf-e44706edddf2"
                },
                {
                  "exit_uuid": "febd94af-66bb-404a-9d88-49d853cc7819",
                  "name": "image1; image2",
                  "uuid": "58815fc8-3cbf-475f-8c83-a063415c5733"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cf7108de-d753-4edb-98f3-27e4b0ce54cf",
                "destination_uuid": null
              },
              {
                "uuid": "febd94af-66bb-404a-9d88-49d853cc7819",
                "destination_uuid": "0823b70c-6252-4cef-9a3b-e11cfe648e09"
              }
            ]
          },
          {
            "uuid": "0823b70c-6252-4cef-9a3b-e11cfe648e09",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "229e2a6b-1b1a-47ea-b4bb-fb9dbb6d4190"
              }
            ],
            "exits": [
              {
                "uuid": "243fab3d-68b6-4f1d-80e4-fb8524114475",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "0f23cfab-1280-408b-a7d9-44f3dcdf404c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "49865e7c-e7f9-4468-93ce-6a3bd161132d",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "05a7fa4b-79a7-48c0-aad0-548ff461dd91",
                  "type": "has_only_phrase",
                  "uuid": "59a5cf1f-0530-4904-a3c4-7a92e8b074ec"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "05a7fa4b-79a7-48c0-aad0-548ff461dd91",
                  "type": "has_only_phrase",
                  "uuid": "ec2629b1-36df-4c60-ae29-cf2a62dd9e85"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1e09eb7f-7b34-4ff4-a1aa-b8e0cb1e0a3f",
                  "name": "All Responses",
                  "uuid": "49865e7c-e7f9-4468-93ce-6a3bd161132d"
                },
                {
                  "exit_uuid": "01d70409-b1f3-42cf-a651-d7869b405510",
                  "name": "image1; image2",
                  "uuid": "05a7fa4b-79a7-48c0-aad0-548ff461dd91"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1e09eb7f-7b34-4ff4-a1aa-b8e0cb1e0a3f",
                "destination_uuid": "af820aba-b65b-4559-9236-e0c1e3344e44"
              },
              {
                "uuid": "01d70409-b1f3-42cf-a651-d7869b405510",
                "destination_uuid": "ad9585ca-7040-42f0-a30a-ba641e4fd5ce"
              }
            ]
          },
          {
            "uuid": "ad9585ca-7040-42f0-a30a-ba641e4fd5ce",
            "actions": [
              {
                "uuid": "1ba942a6-daae-4afc-9610-0ce1c07a263b",
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
                "uuid": "6b42e3c1-96a4-4675-83b3-2c1135034bd5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "107a2781-9972-4588-9569-1d5b0432065c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "154f08e5-1c31-4483-ad3c-2ffdc0d842e9",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "75dfb7df-a573-4939-941e-8ebf35848962"
              }
            ],
            "exits": [
              {
                "uuid": "f0979ce3-491c-4394-ab76-92de91111158",
                "destination_uuid": "258ffc9c-fdfc-4064-a9d6-f4b12bb48612"
              }
            ]
          },
          {
            "uuid": "258ffc9c-fdfc-4064-a9d6-f4b12bb48612",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ec8936cc-d932-45b1-aff9-e5c3ecdfac44",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "8068ef06-90e5-46eb-b63c-bb7088bccb59",
                  "type": "has_only_phrase",
                  "uuid": "16a3e594-e59a-4bd6-9961-02acc4d7d252"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "88a5c75c-e7e9-47f3-ba06-e4d8f11df595",
                  "type": "has_only_phrase",
                  "uuid": "f8dc3bec-2e8f-4ed3-983d-50a90a103927"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "40a374c5-12ec-4e62-b58b-c1627c81996d",
                  "name": "All Responses",
                  "uuid": "ec8936cc-d932-45b1-aff9-e5c3ecdfac44"
                },
                {
                  "exit_uuid": "0c6f54c9-682c-4c96-b9f7-31c1334327bb",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "8068ef06-90e5-46eb-b63c-bb7088bccb59"
                },
                {
                  "exit_uuid": "cd69b41a-ae3d-4c69-aa9f-4b3bcd1f68dd",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "88a5c75c-e7e9-47f3-ba06-e4d8f11df595"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "40a374c5-12ec-4e62-b58b-c1627c81996d",
                "destination_uuid": null
              },
              {
                "uuid": "0c6f54c9-682c-4c96-b9f7-31c1334327bb",
                "destination_uuid": "f17aef3c-cf0a-4e65-beb8-2ce3579d4c49"
              },
              {
                "uuid": "cd69b41a-ae3d-4c69-aa9f-4b3bcd1f68dd",
                "destination_uuid": "5cd7d7eb-7d5c-43e1-88d9-5ac155237b12"
              }
            ]
          },
          {
            "uuid": "f17aef3c-cf0a-4e65-beb8-2ce3579d4c49",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "2a5c2439-c70b-4ffb-85cf-26d3424bc8f9"
              }
            ],
            "exits": [
              {
                "uuid": "e483abdd-fe8f-44d7-8800-f578ba728f2a",
                "destination_uuid": "92254b38-eae6-4699-9e21-33847529a653"
              }
            ]
          },
          {
            "uuid": "5cd7d7eb-7d5c-43e1-88d9-5ac155237b12",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "9ac48107-89ef-456b-b7d2-ba6d63c2c425"
              }
            ],
            "exits": [
              {
                "uuid": "194d2531-41c3-4555-8ec1-b5663acaabdb",
                "destination_uuid": "92254b38-eae6-4699-9e21-33847529a653"
              }
            ]
          },
          {
            "uuid": "92254b38-eae6-4699-9e21-33847529a653",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a1818eb3-45e0-4852-bab5-80d3922a432d",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "22178708-1286-42c7-9d49-b883969ce864",
                  "type": "has_only_phrase",
                  "uuid": "dbcfbda8-3076-485d-84f6-2e174d01f9aa"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "813a1a32-dcec-4401-8a89-6c7375d911dc",
                  "type": "has_only_phrase",
                  "uuid": "fc79ef28-5b71-4ea4-9173-90fd0e659c02"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "d5061930-39a5-4330-bde9-b9134bda2c58",
                  "type": "has_only_phrase",
                  "uuid": "2f7988d5-13b5-4259-ad17-325d2087f9b8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e20576b9-aa44-4fa3-b1e9-69c5ffb68984",
                  "name": "All Responses",
                  "uuid": "a1818eb3-45e0-4852-bab5-80d3922a432d"
                },
                {
                  "exit_uuid": "de8ede6b-54f5-4a32-b372-1169b41b258c",
                  "name": "Hello",
                  "uuid": "22178708-1286-42c7-9d49-b883969ce864"
                },
                {
                  "exit_uuid": "98637d14-95db-4abe-98c0-7ebaf88ea8a9",
                  "name": "Goodbye",
                  "uuid": "813a1a32-dcec-4401-8a89-6c7375d911dc"
                },
                {
                  "exit_uuid": "598b2d23-b71a-42a1-8a62-b398bdf86e90",
                  "name": "Goodbye",
                  "uuid": "d5061930-39a5-4330-bde9-b9134bda2c58"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e20576b9-aa44-4fa3-b1e9-69c5ffb68984",
                "destination_uuid": null
              },
              {
                "uuid": "de8ede6b-54f5-4a32-b372-1169b41b258c",
                "destination_uuid": "6e2c1f40-f30f-4b53-b895-e9ffb1b9a5c3"
              },
              {
                "uuid": "98637d14-95db-4abe-98c0-7ebaf88ea8a9",
                "destination_uuid": "87890fb3-71b8-447a-80e3-dd5666e31814"
              },
              {
                "uuid": "598b2d23-b71a-42a1-8a62-b398bdf86e90",
                "destination_uuid": "87890fb3-71b8-447a-80e3-dd5666e31814"
              }
            ]
          },
          {
            "uuid": "6e2c1f40-f30f-4b53-b895-e9ffb1b9a5c3",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "96546c8b-ad72-4c0e-a9dc-ff65813460c2"
              }
            ],
            "exits": [
              {
                "uuid": "e01d6e11-881e-40f5-a8db-075ef674d2e1",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "87890fb3-71b8-447a-80e3-dd5666e31814",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4b53d010-8399-4529-9ab0-838bea8ae6cf"
              }
            ],
            "exits": [
              {
                "uuid": "c74a7759-9ff1-4e49-bd57-a565100bacc5",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f35e5630-c440-4e59-a1ba-c18d58f09927",
            "actions": [
              {
                "uuid": "2b49c6bd-659a-46c4-a188-fdbcd3c4d338",
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
                "uuid": "9d316725-e4fc-4c8d-b53c-3c3dc2e18591",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c1456328-3a5f-4133-b7ba-f1afcaf81d48",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2d2a10a0-ec7c-4302-93ae-3582bb2eb675",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2331dab7-feab-42a8-b4f5-79ed6db3abfe"
              }
            ],
            "exits": [
              {
                "uuid": "9defda1a-4b10-4b8d-bdae-219d806c26b0",
                "destination_uuid": "c14999f3-7e2d-430d-b83d-6637110bbe61"
              }
            ]
          },
          {
            "uuid": "c14999f3-7e2d-430d-b83d-6637110bbe61",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "dfe28845-5542-498c-9d0c-38cd0501858c"
              }
            ],
            "exits": [
              {
                "uuid": "fd755a32-1b0b-4492-8362-846b4342938c",
                "destination_uuid": "7c1555f4-8e6d-460a-84a6-92389ab44d45"
              }
            ]
          },
          {
            "uuid": "7c1555f4-8e6d-460a-84a6-92389ab44d45",
            "actions": [],
            "exits": [
              {
                "uuid": "668d23d5-36e3-4041-9d7c-e7d73a53ba94",
                "destination_uuid": "ac6c5366-e725-44fb-9303-9657a0e622ef"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2ae1a8d4-7e37-4268-828d-f980a12ee545",
              "cases": [],
              "categories": [
                {
                  "uuid": "2ae1a8d4-7e37-4268-828d-f980a12ee545",
                  "name": "All Responses",
                  "exit_uuid": "668d23d5-36e3-4041-9d7c-e7d73a53ba94"
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
            "uuid": "ac6c5366-e725-44fb-9303-9657a0e622ef",
            "actions": [
              {
                "uuid": "9b8ebb18-e2d2-476d-99d1-b8e84273df03",
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
                "uuid": "28851a8a-1d70-4f88-834c-6bb20aee951e",
                "destination_uuid": "d77d7d03-2536-4758-853b-f07b60b5bd22"
              }
            ]
          },
          {
            "uuid": "d77d7d03-2536-4758-853b-f07b60b5bd22",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ea9ae19a-5240-4fb6-a8a9-afb2f8808ff7",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "7ebee2a2-4300-4fbb-a4f9-fa2d29247d0b",
                  "type": "has_only_phrase",
                  "uuid": "f883522a-db50-42a5-a1f7-8b629607e0fe"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "d5c83598-592c-41df-87b5-907936dffbec",
                  "type": "has_only_phrase",
                  "uuid": "6b89940b-04e9-411c-9aa8-e52081c79b35"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a516e400-efb9-4725-ac40-2ca7d9db2ba3",
                  "name": "All Responses",
                  "uuid": "ea9ae19a-5240-4fb6-a8a9-afb2f8808ff7"
                },
                {
                  "exit_uuid": "3eecfc2a-d665-4526-90b6-cdd1f74d0fc0",
                  "name": "1",
                  "uuid": "7ebee2a2-4300-4fbb-a4f9-fa2d29247d0b"
                },
                {
                  "exit_uuid": "531e5f8d-880f-4a04-a266-8c43778320b7",
                  "name": "2",
                  "uuid": "d5c83598-592c-41df-87b5-907936dffbec"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "a516e400-efb9-4725-ac40-2ca7d9db2ba3",
                "destination_uuid": "45a5509a-89b6-4960-bb45-a7bbec9952a9"
              },
              {
                "uuid": "3eecfc2a-d665-4526-90b6-cdd1f74d0fc0",
                "destination_uuid": "13b88143-cd19-4977-957a-f1cc7b9c7074"
              },
              {
                "uuid": "531e5f8d-880f-4a04-a266-8c43778320b7",
                "destination_uuid": "669f22ed-704c-47aa-b265-4d82305d011d"
              }
            ]
          },
          {
            "uuid": "13b88143-cd19-4977-957a-f1cc7b9c7074",
            "actions": [
              {
                "uuid": "257d4d7f-99e1-4588-b940-e0b6fdc02e85",
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
                "uuid": "c48be837-e444-4002-9b47-cf42e6821bc1",
                "destination_uuid": "73ba51ef-7dd5-4fd4-a5ed-8cf0eb306ed3"
              }
            ]
          },
          {
            "uuid": "669f22ed-704c-47aa-b265-4d82305d011d",
            "actions": [
              {
                "uuid": "c105bff2-b70f-43cd-ba38-50161f55d102",
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
                "uuid": "666fa91c-c2b6-4b41-a077-af21a0628c8e",
                "destination_uuid": "150dbb30-b6ac-4b09-a35c-643d6f00f0f6"
              }
            ]
          },
          {
            "uuid": "45a5509a-89b6-4960-bb45-a7bbec9952a9",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "20a66474-edef-4f68-aa17-ea5c7b34abd3"
              }
            ],
            "exits": [
              {
                "uuid": "5a1345f1-dc7f-4e34-8176-72b2aeac8056",
                "destination_uuid": "9e6007b4-22fc-4b29-8180-0cc51202b5b5"
              }
            ]
          },
          {
            "uuid": "9e6007b4-22fc-4b29-8180-0cc51202b5b5",
            "actions": [],
            "exits": [
              {
                "uuid": "4fcfafdd-6a14-4575-8294-8dabc7fa0261",
                "destination_uuid": "4eaa6ad9-1d3c-4005-9ece-dbe3023eba54"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "315d8aaf-184f-4772-a1fe-d3f05080a847",
              "cases": [],
              "categories": [
                {
                  "uuid": "315d8aaf-184f-4772-a1fe-d3f05080a847",
                  "name": "All Responses",
                  "exit_uuid": "4fcfafdd-6a14-4575-8294-8dabc7fa0261"
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
            "uuid": "4eaa6ad9-1d3c-4005-9ece-dbe3023eba54",
            "actions": [
              {
                "uuid": "fe3c2f22-1e0d-4edd-a4e5-97704748d1b7",
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
                "uuid": "6c9c63eb-f632-4e12-af80-eae00bacd35f",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "73ba51ef-7dd5-4fd4-a5ed-8cf0eb306ed3",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "179e92b5-c26f-41ef-a298-72f891d87b6f"
              }
            ],
            "exits": [
              {
                "uuid": "d8e4e1e2-f38d-40c5-ac6b-e9626241d3a2",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "150dbb30-b6ac-4b09-a35c-643d6f00f0f6",
            "actions": [
              {
                "uuid": "d06bcfbd-5d58-4c9a-99cd-4baac8ebaf4b",
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
                "uuid": "bfa2cf25-bef7-4673-9a1e-82dbace67133",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "513bd05d-298b-4715-9d70-e9e05f33d552",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d83e1dd5-f9f4-4562-855f-c0d394235b82",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "c1043863-b11d-4535-a75b-9f3c3cf8b515"
              }
            ],
            "exits": [
              {
                "uuid": "79374c2f-3b23-417a-b0af-db316b11cf7f",
                "destination_uuid": "3d206fdd-d11e-4acc-bb62-05cfe469b744"
              }
            ]
          },
          {
            "uuid": "3d206fdd-d11e-4acc-bb62-05cfe469b744",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3549f075-d11c-4293-b1d9-0961f4bfabe8",
              "cases": [
                {
                  "arguments": [
                    "Go to the story"
                  ],
                  "category_uuid": "7a6d5d22-f8e5-43f2-a146-bc400b7b3360",
                  "type": "has_only_phrase",
                  "uuid": "96fb2bcd-4e84-4960-8852-06ff34716cb1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6dc2772e-3686-4dda-a702-0a8fd1f51a6f",
                  "name": "All Responses",
                  "uuid": "3549f075-d11c-4293-b1d9-0961f4bfabe8"
                },
                {
                  "exit_uuid": "18f5a216-efcc-4c7a-9a9d-27cc68c814f5",
                  "name": "Go to the story",
                  "uuid": "7a6d5d22-f8e5-43f2-a146-bc400b7b3360"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6dc2772e-3686-4dda-a702-0a8fd1f51a6f",
                "destination_uuid": null
              },
              {
                "uuid": "18f5a216-efcc-4c7a-9a9d-27cc68c814f5",
                "destination_uuid": "ce398316-d542-46c3-ba80-772bdced32a8"
              }
            ]
          },
          {
            "uuid": "ce398316-d542-46c3-ba80-772bdced32a8",
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
                "uuid": "80eeda19-f5cf-4012-aeab-ec5352d94896"
              }
            ],
            "exits": [
              {
                "uuid": "91e2ec71-88a7-41c2-a422-11f169c3ef57",
                "destination_uuid": "b758e344-e602-4b35-9316-38537113e758"
              }
            ]
          },
          {
            "uuid": "b758e344-e602-4b35-9316-38537113e758",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "38235901-3d63-4a77-bb35-3d6a019d24c9",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "99ac04b4-36d2-48a6-9a2d-7d3fc200793d",
                  "type": "has_only_phrase",
                  "uuid": "63b538b5-12ae-4c60-b033-a8f66366404d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "712dcd18-fea4-47c7-a494-f291478e691e",
                  "name": "All Responses",
                  "uuid": "38235901-3d63-4a77-bb35-3d6a019d24c9"
                },
                {
                  "exit_uuid": "f5965aa9-65a7-4cd7-b073-f1d6614d8365",
                  "name": "Next",
                  "uuid": "99ac04b4-36d2-48a6-9a2d-7d3fc200793d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "712dcd18-fea4-47c7-a494-f291478e691e",
                "destination_uuid": null
              },
              {
                "uuid": "f5965aa9-65a7-4cd7-b073-f1d6614d8365",
                "destination_uuid": "8b63e6a9-7781-4ddb-abdc-3e8204809592"
              }
            ]
          },
          {
            "uuid": "8b63e6a9-7781-4ddb-abdc-3e8204809592",
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
                "uuid": "cbd788eb-2061-4402-aa0a-2f32a222f7a3"
              }
            ],
            "exits": [
              {
                "uuid": "fecc3b47-0800-4294-98bf-bf66a4edcdb1",
                "destination_uuid": "b8a8d04e-9ebb-4f7d-8199-4f4f64f5b715"
              }
            ]
          },
          {
            "uuid": "b8a8d04e-9ebb-4f7d-8199-4f4f64f5b715",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9e915f21-3af5-496c-a32f-9134dce1ec00",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "95c2e52a-7e57-4668-9961-123b3fe798f1",
                  "type": "has_only_phrase",
                  "uuid": "252f3b01-36b0-4054-a701-24c8a53bcf55"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "a2122656-d2b7-461f-a167-b318cef5c4a0",
                  "type": "has_only_phrase",
                  "uuid": "eab2367e-a72b-49ec-94a5-8d0004b86812"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b739095d-8509-442f-8983-9c1132634795",
                  "name": "All Responses",
                  "uuid": "9e915f21-3af5-496c-a32f-9134dce1ec00"
                },
                {
                  "exit_uuid": "b6035bd0-4083-432a-bcf4-cbdfd6fbe663",
                  "name": "Previous",
                  "uuid": "95c2e52a-7e57-4668-9961-123b3fe798f1"
                },
                {
                  "exit_uuid": "22a53cb3-d731-42d3-b509-be0ca7c47e75",
                  "name": "Next",
                  "uuid": "a2122656-d2b7-461f-a167-b318cef5c4a0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b739095d-8509-442f-8983-9c1132634795",
                "destination_uuid": null
              },
              {
                "uuid": "b6035bd0-4083-432a-bcf4-cbdfd6fbe663",
                "destination_uuid": "ce398316-d542-46c3-ba80-772bdced32a8"
              },
              {
                "uuid": "22a53cb3-d731-42d3-b509-be0ca7c47e75",
                "destination_uuid": "653559c6-996d-4181-b4c0-956fbe7f2e04"
              }
            ]
          },
          {
            "uuid": "653559c6-996d-4181-b4c0-956fbe7f2e04",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6b191610-e765-46c9-b0ac-7a2015f6a443"
              }
            ],
            "exits": [
              {
                "uuid": "3e33b609-6022-4c75-866d-c6a4ca8bbd1a",
                "destination_uuid": "d991b8ef-7387-42fa-872c-502517380f0e"
              }
            ]
          },
          {
            "uuid": "d991b8ef-7387-42fa-872c-502517380f0e",
            "actions": [
              {
                "uuid": "2b08648d-7c95-4a4a-b3a8-577ee4c05e8c",
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
                "uuid": "6540e007-569c-44ad-8638-a9d5e38fc68c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "966be505-330e-4f1f-a86a-8d6c82fffba7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6caf314f-5691-471d-b817-b6a4cd14c603",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dc47fdfa-4db2-434b-bd2d-238e691ef416"
              }
            ],
            "exits": [
              {
                "uuid": "c343ba1f-38a6-4931-b52d-49919690df1c",
                "destination_uuid": "8c6d5b2a-8329-405b-b838-94eb1667cff4"
              }
            ]
          },
          {
            "uuid": "8c6d5b2a-8329-405b-b838-94eb1667cff4",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "5fe93974-2e96-4a58-b7b8-d2a685322e20"
              }
            ],
            "exits": [
              {
                "uuid": "2a23a74b-c6b0-4f27-b6f6-5633fd19aaf3",
                "destination_uuid": "d553389f-a674-4be4-b511-c78c9dec41c2"
              }
            ]
          },
          {
            "uuid": "d553389f-a674-4be4-b511-c78c9dec41c2",
            "actions": [],
            "exits": [
              {
                "uuid": "e358b508-b1f0-457a-aafb-6b4f7def0b3b",
                "destination_uuid": "d4212425-f23e-45aa-8c3b-b300d0143710"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f090338f-1d50-4fd8-8fd5-a6f3ac1628a4",
              "cases": [],
              "categories": [
                {
                  "uuid": "f090338f-1d50-4fd8-8fd5-a6f3ac1628a4",
                  "name": "All Responses",
                  "exit_uuid": "e358b508-b1f0-457a-aafb-6b4f7def0b3b"
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
            "uuid": "d4212425-f23e-45aa-8c3b-b300d0143710",
            "actions": [
              {
                "uuid": "3d47f2fb-a957-4e92-90c6-b2d50679cef1",
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
                "uuid": "c91da7e1-cb51-4d23-b679-08b16d88b320",
                "destination_uuid": "4da4dca5-6efc-443d-bdfd-6ef6cbd0ffa0"
              }
            ]
          },
          {
            "uuid": "4da4dca5-6efc-443d-bdfd-6ef6cbd0ffa0",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "ddee7ee9-b8d0-4143-823f-5f8596434984"
                },
                "type": "enter_flow",
                "uuid": "5e9fdd5e-4d99-4c0e-ac7c-b443c46c0b2f"
              }
            ],
            "exits": [
              {
                "uuid": "57707c21-f8de-45a7-a62c-2844bafedb95",
                "destination_uuid": "984a2d2a-e77c-450f-8e48-ab2b28ebb761"
              },
              {
                "uuid": "b4d8f501-520c-49f6-bad8-c62c930d70c8",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "fc6afe21-7eba-4c9f-a878-fc53669a0494",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d160eda6-6075-478e-937d-45f2ea652030"
                },
                {
                  "uuid": "faf883b7-c5e1-440f-99c0-500d12219e59",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "3d29eb99-fa1c-49d3-83ad-0bd45b50e9ae"
                }
              ],
              "categories": [
                {
                  "uuid": "d160eda6-6075-478e-937d-45f2ea652030",
                  "name": "Complete",
                  "exit_uuid": "57707c21-f8de-45a7-a62c-2844bafedb95"
                },
                {
                  "uuid": "3d29eb99-fa1c-49d3-83ad-0bd45b50e9ae",
                  "name": "Expired",
                  "exit_uuid": "b4d8f501-520c-49f6-bad8-c62c930d70c8"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d160eda6-6075-478e-937d-45f2ea652030"
            }
          },
          {
            "uuid": "984a2d2a-e77c-450f-8e48-ab2b28ebb761",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "b6d93f0b-9c9c-4a87-93a6-fc01abba80d2"
              }
            ],
            "exits": [
              {
                "uuid": "4766a8f3-c4ff-4e3f-89da-6556c97792f8",
                "destination_uuid": "6986522d-a4dd-4b71-b969-50482a85682c"
              }
            ]
          },
          {
            "uuid": "6986522d-a4dd-4b71-b969-50482a85682c",
            "actions": [],
            "exits": [
              {
                "uuid": "d29364a2-6f59-4981-a97a-c632fc130e89",
                "destination_uuid": "34663e9a-8a60-4191-b924-a2075dbd4f7d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "69e3bce8-f3b6-4400-8777-d313b973dad5",
              "cases": [],
              "categories": [
                {
                  "uuid": "69e3bce8-f3b6-4400-8777-d313b973dad5",
                  "name": "All Responses",
                  "exit_uuid": "d29364a2-6f59-4981-a97a-c632fc130e89"
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
            "uuid": "34663e9a-8a60-4191-b924-a2075dbd4f7d",
            "actions": [
              {
                "uuid": "1c73c353-c4c5-472b-85c8-0c25470f158d",
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
                "uuid": "f2448784-e2e4-43df-8f3c-10a29a1111af",
                "destination_uuid": "2c483d36-c801-4d53-9689-769ac597c77f"
              }
            ]
          },
          {
            "uuid": "2c483d36-c801-4d53-9689-769ac597c77f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "374725fd-2656-4f5c-88d9-9d18bec03e06",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "ecbb5475-0ec7-432c-ace9-8f567fcf905c",
                  "type": "has_only_phrase",
                  "uuid": "af82011c-a01d-4d38-80df-081f10704038"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "fd325ca7-0342-4a09-9619-9ae2fb72499f",
                  "type": "has_only_phrase",
                  "uuid": "a9483fdb-6820-4bda-9f62-79a66cbcdfca"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ca58ed24-8eb5-430a-a71c-fc137379857e",
                  "name": "All Responses",
                  "uuid": "374725fd-2656-4f5c-88d9-9d18bec03e06"
                },
                {
                  "exit_uuid": "07d06424-477a-4316-8ac9-5a9244646781",
                  "name": "guide1",
                  "uuid": "ecbb5475-0ec7-432c-ace9-8f567fcf905c"
                },
                {
                  "exit_uuid": "dd8c9664-8f34-4415-a125-1f3e867ca0e6",
                  "name": "guide2",
                  "uuid": "fd325ca7-0342-4a09-9619-9ae2fb72499f"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "ca58ed24-8eb5-430a-a71c-fc137379857e",
                "destination_uuid": null
              },
              {
                "uuid": "07d06424-477a-4316-8ac9-5a9244646781",
                "destination_uuid": "e9e54497-d15e-4655-b726-4cdaec1398da"
              },
              {
                "uuid": "dd8c9664-8f34-4415-a125-1f3e867ca0e6",
                "destination_uuid": "dbe14477-7ee3-43e1-ae5e-de669daa9efb"
              }
            ]
          },
          {
            "uuid": "e9e54497-d15e-4655-b726-4cdaec1398da",
            "actions": [
              {
                "uuid": "9b60d361-5ff7-4612-97e2-ed923d32801a",
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
                "uuid": "934fc65b-dfa5-4372-8a21-6c06f1b70165",
                "destination_uuid": "6a7bba79-08e5-42bf-9aae-95e751d0e059"
              }
            ]
          },
          {
            "uuid": "dbe14477-7ee3-43e1-ae5e-de669daa9efb",
            "actions": [
              {
                "uuid": "d18245c7-b43b-4612-97fa-6926aa12a247",
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
                "uuid": "c2fdbff6-c28a-4cc3-a40c-e6045f8b7ffb",
                "destination_uuid": "6a7bba79-08e5-42bf-9aae-95e751d0e059"
              }
            ]
          },
          {
            "uuid": "6a7bba79-08e5-42bf-9aae-95e751d0e059",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "70a40581-ba2d-43af-9e13-8cf58fecc8f1"
              }
            ],
            "exits": [
              {
                "uuid": "4045cf60-590c-432f-883c-1a120780d2df",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "c209f552-376a-44d8-a84f-754a343df3d2",
            "actions": [
              {
                "uuid": "dff7ce4e-ba10-4a7a-987d-6945158df9ca",
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
                "uuid": "7f102ac3-1415-4108-94a0-41ceb63507d9",
                "destination_uuid": "5d528c71-24c6-4325-8183-49f7e63b99d2"
              }
            ]
          },
          {
            "uuid": "5d528c71-24c6-4325-8183-49f7e63b99d2",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "5dcb1e51-604c-4e8c-ab02-dd592f335797"
                },
                "type": "enter_flow",
                "uuid": "de38cbf5-44ce-4885-b85b-33044b1caa86"
              }
            ],
            "exits": [
              {
                "uuid": "4677f2d9-98cd-466b-94b2-9fb2bb61ffe4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a5d48089-33f5-42a7-bf13-9235f789d90d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f05b43ad-c6fd-40a0-9fa9-b25c06cf4fd5",
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
                "uuid": "cb550c58-f946-40f9-91d7-fc0b6ad69b15"
              }
            ],
            "exits": [
              {
                "uuid": "6cb2f137-31a5-471e-91fb-38bc09085c86",
                "destination_uuid": "4e243c81-5024-4422-9a88-dfd9c152e081"
              }
            ]
          },
          {
            "uuid": "4e243c81-5024-4422-9a88-dfd9c152e081",
            "actions": [],
            "exits": [
              {
                "uuid": "0c2ce044-e11b-4028-9a04-0f0f4a8e776f",
                "destination_uuid": "9ea3f9dd-9ac8-4872-9308-9df994043ace"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6802f68b-855e-4c3f-b7c5-e4124beeb1be",
              "cases": [],
              "categories": [
                {
                  "uuid": "6802f68b-855e-4c3f-b7c5-e4124beeb1be",
                  "name": "All Responses",
                  "exit_uuid": "0c2ce044-e11b-4028-9a04-0f0f4a8e776f"
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
            "uuid": "9ea3f9dd-9ac8-4872-9308-9df994043ace",
            "actions": [
              {
                "uuid": "3abe6d82-ec5f-4211-8f2b-9f31a7a009d6",
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
                "uuid": "36c79244-50a0-4e6d-a9b2-2ef84178afb9",
                "destination_uuid": "f8ea280e-2de0-4efe-9f82-fec0f30cb1e2"
              }
            ]
          },
          {
            "uuid": "f8ea280e-2de0-4efe-9f82-fec0f30cb1e2",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c35de237-b296-40e0-952c-53115b412ce9"
              }
            ],
            "exits": [
              {
                "uuid": "317df003-26d7-4022-aff6-1a6212831626",
                "destination_uuid": "8c7d4854-96e9-48fc-8fa5-a0cf88c7dbad"
              }
            ]
          },
          {
            "uuid": "8c7d4854-96e9-48fc-8fa5-a0cf88c7dbad",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0aac7774-1a64-4d2a-bfa0-81534de29aa9"
              }
            ],
            "exits": [
              {
                "uuid": "e4eec3ca-6264-4f2f-9e72-9caf8ccd787b",
                "destination_uuid": "87ec5ba7-96b4-4caf-9c93-8f0c009ad53e"
              }
            ]
          },
          {
            "uuid": "87ec5ba7-96b4-4caf-9c93-8f0c009ad53e",
            "actions": [
              {
                "flow": {
                  "name": "calm_5",
                  "uuid": "72e428c9-4a6d-4da4-9c36-36801be19e21"
                },
                "type": "enter_flow",
                "uuid": "e81ebd1e-5e2a-4d9e-8c28-436fb4017f0b"
              }
            ],
            "exits": [
              {
                "uuid": "9fbf4fe3-ff43-43e7-b8a6-349d97c42da2",
                "destination_uuid": null
              },
              {
                "uuid": "07f23061-9a57-48f3-9e71-5fcf6f6e82c2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c357f6b0-55d7-4b85-bcaf-8ffbb886f38a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "13581ae3-9c33-465c-9a06-8b1779342fd5"
                },
                {
                  "uuid": "75302880-ea66-4635-9ea9-f69ca66c74b0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e19c7bc5-e39b-4e7a-a688-4949d83d686d"
                }
              ],
              "categories": [
                {
                  "uuid": "13581ae3-9c33-465c-9a06-8b1779342fd5",
                  "name": "Complete",
                  "exit_uuid": "9fbf4fe3-ff43-43e7-b8a6-349d97c42da2"
                },
                {
                  "uuid": "e19c7bc5-e39b-4e7a-a688-4949d83d686d",
                  "name": "Expired",
                  "exit_uuid": "07f23061-9a57-48f3-9e71-5fcf6f6e82c2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "13581ae3-9c33-465c-9a06-8b1779342fd5"
            }
          },
          {
            "uuid": "ada7b62d-9801-4246-b3fa-6e7ac58d8f8f",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "63b791b9-c8b9-41e6-9196-51f5921c061d"
              }
            ],
            "exits": [
              {
                "uuid": "021b6ef8-912c-46a4-81d0-39f849402cdc",
                "destination_uuid": "4a74c6e3-5309-4945-b1e1-78faff948764"
              }
            ]
          },
          {
            "uuid": "4a74c6e3-5309-4945-b1e1-78faff948764",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "2ef83994-8af7-4144-ae12-1126dc9a697a"
              }
            ],
            "exits": [
              {
                "uuid": "0b8985d6-5f85-4e52-9707-f7ba7b060761",
                "destination_uuid": "bf0d83c9-48fa-4f2f-b73d-910058d3b2d0"
              }
            ]
          },
          {
            "uuid": "bf0d83c9-48fa-4f2f-b73d-910058d3b2d0",
            "actions": [],
            "exits": [
              {
                "uuid": "1ef57bc7-2404-4162-84b2-1a8e39442a17",
                "destination_uuid": "762c200b-1bdd-46d1-be00-b50a1077322a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "13617d4b-4b69-46be-ab0d-6e5f3fc935f8",
              "cases": [],
              "categories": [
                {
                  "uuid": "13617d4b-4b69-46be-ab0d-6e5f3fc935f8",
                  "name": "All Responses",
                  "exit_uuid": "1ef57bc7-2404-4162-84b2-1a8e39442a17"
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
            "uuid": "762c200b-1bdd-46d1-be00-b50a1077322a",
            "actions": [
              {
                "uuid": "2cae9857-c479-4bef-92ce-40cdc26385b5",
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
                "uuid": "fa16acc3-6392-4fd8-9664-4f43d332edd9",
                "destination_uuid": "297a95ad-b96e-4b7c-92e8-95fd54aa076d"
              }
            ]
          },
          {
            "uuid": "297a95ad-b96e-4b7c-92e8-95fd54aa076d",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "783e5a10-aaed-4296-8445-04be6b22b575"
              }
            ],
            "exits": [
              {
                "uuid": "dd15152e-8a8b-4b19-ad0b-bedeaed39618",
                "destination_uuid": "72e8ac29-cc94-4a20-b219-db352e3ac85e"
              }
            ]
          },
          {
            "uuid": "72e8ac29-cc94-4a20-b219-db352e3ac85e",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4cfffd78-0b8f-48c0-8080-8537a5178d94"
              }
            ],
            "exits": [
              {
                "uuid": "2e253a63-06ef-44b3-a19a-31be87b85c0d",
                "destination_uuid": "06d35c5d-dc22-4666-9cf4-e6ee492271e6"
              }
            ]
          },
          {
            "uuid": "06d35c5d-dc22-4666-9cf4-e6ee492271e6",
            "actions": [
              {
                "uuid": "cf1b904e-6a6b-4962-9589-0d5e07b65ffe",
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
                "uuid": "64f50b36-deb5-431a-ae59-668432be4151",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "98d6d9ef-2488-4e13-91eb-a52f23721d06",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "68a5a1df-15f9-42eb-9979-cedb26fae6e9",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9392e6e8-a2aa-4311-b54d-c3a63f10ff64"
              }
            ],
            "exits": [
              {
                "uuid": "b7106dd9-4828-4214-9192-25df655ec58a",
                "destination_uuid": "b765f7cb-a56e-4bb4-8413-c844badafd63"
              }
            ]
          },
          {
            "uuid": "b765f7cb-a56e-4bb4-8413-c844badafd63",
            "actions": [
              {
                "uuid": "5a2c6804-b867-42d3-9a73-f8f7898ce552",
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
                "uuid": "f85ccd57-d795-4c47-9ed9-987ec6b20807",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "87129d0b-3c56-40fd-8610-9edff3720cb3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c1e2551d-b257-403b-95ea-bf941f6d931e",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a8fdcd0a-937e-4d28-afcd-8b4c0ece97a1"
              }
            ],
            "exits": [
              {
                "uuid": "ec5ee840-b554-4e1d-816e-09710c282f57",
                "destination_uuid": "e2b2e96a-d4da-4ec3-b699-4fbd1c9ba1ea"
              }
            ]
          },
          {
            "uuid": "e2b2e96a-d4da-4ec3-b699-4fbd1c9ba1ea",
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
                "uuid": "ff0c3d86-80b0-429a-82b0-12452f67e881"
              }
            ],
            "exits": [
              {
                "uuid": "8f154639-6638-4b1e-b591-bcb7a2ae3672",
                "destination_uuid": "bf5bfc4d-6801-47ad-9aa9-9e274733c7bb"
              }
            ]
          },
          {
            "uuid": "bf5bfc4d-6801-47ad-9aa9-9e274733c7bb",
            "actions": [],
            "exits": [
              {
                "uuid": "ef911a90-e2b8-41c8-bb3b-9569e5fefe3c",
                "destination_uuid": "104b16ad-7b1b-4463-b6c1-e6db14ce577d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f8f2110e-4f2a-4217-8e3c-4dd29798d3f8",
              "cases": [],
              "categories": [
                {
                  "uuid": "f8f2110e-4f2a-4217-8e3c-4dd29798d3f8",
                  "name": "All Responses",
                  "exit_uuid": "ef911a90-e2b8-41c8-bb3b-9569e5fefe3c"
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
            "uuid": "104b16ad-7b1b-4463-b6c1-e6db14ce577d",
            "actions": [
              {
                "uuid": "89df4d26-ed0e-41d5-a463-9d630bc0a283",
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
                "uuid": "2fa04591-60b1-4941-a8dd-0687e8ee9a78",
                "destination_uuid": "b7c09cec-51a9-4206-b2b9-d559d7174564"
              }
            ]
          },
          {
            "uuid": "b7c09cec-51a9-4206-b2b9-d559d7174564",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f32e7d6f-ecf3-4c9d-8c4a-5db7adcc1033",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "a38c1419-2743-4265-8378-04e2fdcd04d8",
                  "type": "has_only_phrase",
                  "uuid": "93afb67e-b4e9-47fa-ab51-ff77fceb4b90"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "a38c1419-2743-4265-8378-04e2fdcd04d8",
                  "type": "has_only_phrase",
                  "uuid": "c0102ba8-a710-4389-b5aa-84a0935cdba7"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "a38c1419-2743-4265-8378-04e2fdcd04d8",
                  "type": "has_only_phrase",
                  "uuid": "afd32ba4-8899-4207-b3f1-ed1cdd7bdb26"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "a38c1419-2743-4265-8378-04e2fdcd04d8",
                  "type": "has_only_phrase",
                  "uuid": "90096532-9329-45db-82bd-8e9d51991822"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "d6d7a572-1ba6-4948-a03a-299310abec2f",
                  "type": "has_only_phrase",
                  "uuid": "c9cc364c-cfa3-456f-a303-6cd34ee9b552"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "d6d7a572-1ba6-4948-a03a-299310abec2f",
                  "type": "has_only_phrase",
                  "uuid": "60ef37ba-e10f-49f8-9a69-d74654e50203"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "d6d7a572-1ba6-4948-a03a-299310abec2f",
                  "type": "has_only_phrase",
                  "uuid": "c0c53895-8edd-42eb-b450-22f5a97090a1"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "d6d7a572-1ba6-4948-a03a-299310abec2f",
                  "type": "has_only_phrase",
                  "uuid": "9ecbf99a-6db1-484a-9ae9-ed0332e7bc5f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6732e6b1-77e4-477c-ac47-4a99171dede6",
                  "name": "All Responses",
                  "uuid": "f32e7d6f-ecf3-4c9d-8c4a-5db7adcc1033"
                },
                {
                  "exit_uuid": "f7d91a45-8d02-4e79-9bbb-589c224552e8",
                  "name": "0;1;2;3",
                  "uuid": "a38c1419-2743-4265-8378-04e2fdcd04d8"
                },
                {
                  "exit_uuid": "66c86fc0-88ff-4a32-8c60-396c4973f187",
                  "name": "4;5;6;7",
                  "uuid": "d6d7a572-1ba6-4948-a03a-299310abec2f"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "6732e6b1-77e4-477c-ac47-4a99171dede6",
                "destination_uuid": null
              },
              {
                "uuid": "f7d91a45-8d02-4e79-9bbb-589c224552e8",
                "destination_uuid": "11bccb8d-a306-4e77-bb80-d3eef22ec3a0"
              },
              {
                "uuid": "66c86fc0-88ff-4a32-8c60-396c4973f187",
                "destination_uuid": "9121dc86-5fad-4c2e-8d51-7267778cc78e"
              }
            ]
          },
          {
            "uuid": "11bccb8d-a306-4e77-bb80-d3eef22ec3a0",
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
                "uuid": "daf00ece-198c-499f-b0f6-d44750150c58"
              }
            ],
            "exits": [
              {
                "uuid": "2d44dbca-6c22-41e6-be55-c776b4e98544",
                "destination_uuid": "48a4b009-e37c-48d5-92a8-8f37fcc3b42d"
              }
            ]
          },
          {
            "uuid": "9121dc86-5fad-4c2e-8d51-7267778cc78e",
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
                "uuid": "7bbdb337-03ea-41fa-8462-1d92b6196390"
              }
            ],
            "exits": [
              {
                "uuid": "7fa103c4-3eea-4406-9ea9-708fe60afc8c",
                "destination_uuid": "48a4b009-e37c-48d5-92a8-8f37fcc3b42d"
              }
            ]
          },
          {
            "uuid": "48a4b009-e37c-48d5-92a8-8f37fcc3b42d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e4a035d6-ca72-457c-afda-6b1bffbf2b9f",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "c7ab26ff-8f92-4322-8062-976aedd125e3",
                  "type": "has_only_phrase",
                  "uuid": "c6ab5ebc-f064-4494-9099-7028f0491f6c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2099b1ef-b955-4fed-b2c9-50aa40e4fb65",
                  "name": "All Responses",
                  "uuid": "e4a035d6-ca72-457c-afda-6b1bffbf2b9f"
                },
                {
                  "exit_uuid": "18e4131f-548b-424b-a7db-d9c72a9f595b",
                  "name": "Next",
                  "uuid": "c7ab26ff-8f92-4322-8062-976aedd125e3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2099b1ef-b955-4fed-b2c9-50aa40e4fb65",
                "destination_uuid": null
              },
              {
                "uuid": "18e4131f-548b-424b-a7db-d9c72a9f595b",
                "destination_uuid": "100c5c0e-c27d-423e-af64-97a4d877567b"
              }
            ]
          },
          {
            "uuid": "100c5c0e-c27d-423e-af64-97a4d877567b",
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
                "uuid": "03459fe2-c637-45ce-9f7d-2eae4a14ebcc"
              }
            ],
            "exits": [
              {
                "uuid": "d61712b8-f3dc-429b-882b-5d1cfc8d7f29",
                "destination_uuid": "a48eccc9-300b-4f9d-a85d-50ae3e6d510f"
              }
            ]
          },
          {
            "uuid": "a48eccc9-300b-4f9d-a85d-50ae3e6d510f",
            "actions": [],
            "exits": [
              {
                "uuid": "6e188f96-2957-4b4f-b5de-dfecb9e4a495",
                "destination_uuid": "b01aeb5e-8600-4abd-9112-775d1e4026a1"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ef6c3bbe-a154-4d25-87c3-ec8c2a5a4897",
              "cases": [],
              "categories": [
                {
                  "uuid": "ef6c3bbe-a154-4d25-87c3-ec8c2a5a4897",
                  "name": "All Responses",
                  "exit_uuid": "6e188f96-2957-4b4f-b5de-dfecb9e4a495"
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
            "uuid": "b01aeb5e-8600-4abd-9112-775d1e4026a1",
            "actions": [
              {
                "uuid": "840edbb8-7178-43a6-a5ee-e71b0f4ee67a",
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
                "uuid": "7959e343-3ece-4522-9ff0-62fbf77b01e9",
                "destination_uuid": "353637cb-20e5-4e4b-b44c-bbed274d794a"
              }
            ]
          },
          {
            "uuid": "353637cb-20e5-4e4b-b44c-bbed274d794a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a398b53f-13ae-44e2-86e3-21611e2860cf",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "72b686a1-99b6-4676-bccf-ab5994c11e50",
                  "type": "has_only_phrase",
                  "uuid": "3997da4a-ffe6-43cb-ac98-92cf9a3d70e3"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "72b686a1-99b6-4676-bccf-ab5994c11e50",
                  "type": "has_only_phrase",
                  "uuid": "38cdfec0-c8bc-43e0-ac54-a4737595fcfe"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "72b686a1-99b6-4676-bccf-ab5994c11e50",
                  "type": "has_only_phrase",
                  "uuid": "7d581bfa-58a3-42a6-9f34-69d4bfe4c62c"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "72b686a1-99b6-4676-bccf-ab5994c11e50",
                  "type": "has_only_phrase",
                  "uuid": "d3048379-53ee-4846-9e41-08f532a6ce7c"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "72b686a1-99b6-4676-bccf-ab5994c11e50",
                  "type": "has_only_phrase",
                  "uuid": "1a0b5d97-0ffb-415b-ad00-41ff5be8de9a"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "8b0ebbc9-abec-4f5e-b507-005888cb4659",
                  "type": "has_only_phrase",
                  "uuid": "58c9d7a9-12d8-4ba5-995a-c8d10276e2e7"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "8b0ebbc9-abec-4f5e-b507-005888cb4659",
                  "type": "has_only_phrase",
                  "uuid": "91c5f630-92ce-4c1d-ae36-0dffd7799f55"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "8b0ebbc9-abec-4f5e-b507-005888cb4659",
                  "type": "has_only_phrase",
                  "uuid": "af8f2da0-d811-4522-87f8-dc7bfb5e7d9e"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "8b0ebbc9-abec-4f5e-b507-005888cb4659",
                  "type": "has_only_phrase",
                  "uuid": "03f4edd9-eb3a-46d9-afb1-316f3f117ef2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f8a42ea6-6f81-4566-8aea-f81d9e930d8f",
                  "name": "All Responses",
                  "uuid": "a398b53f-13ae-44e2-86e3-21611e2860cf"
                },
                {
                  "exit_uuid": "82b0212a-ba7d-404a-a1a3-53862d56303e",
                  "name": "0;1;2;3;4",
                  "uuid": "72b686a1-99b6-4676-bccf-ab5994c11e50"
                },
                {
                  "exit_uuid": "05629273-d222-422e-b3f0-40abef9ab9f3",
                  "name": "5;6;7;8",
                  "uuid": "8b0ebbc9-abec-4f5e-b507-005888cb4659"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "f8a42ea6-6f81-4566-8aea-f81d9e930d8f",
                "destination_uuid": null
              },
              {
                "uuid": "82b0212a-ba7d-404a-a1a3-53862d56303e",
                "destination_uuid": "a6bb89bb-c36f-4178-b04d-6125e23bba3c"
              },
              {
                "uuid": "05629273-d222-422e-b3f0-40abef9ab9f3",
                "destination_uuid": "b8d617c4-e3a8-4f21-a966-08d0f71676bc"
              }
            ]
          },
          {
            "uuid": "a6bb89bb-c36f-4178-b04d-6125e23bba3c",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "00709374-b1c6-442a-8e51-dbea678aa354"
              }
            ],
            "exits": [
              {
                "uuid": "81aa71f7-39d2-4a36-976f-297a2398bea0",
                "destination_uuid": "f6b64130-0db9-48a0-a8f7-0b12c743df85"
              }
            ]
          },
          {
            "uuid": "b8d617c4-e3a8-4f21-a966-08d0f71676bc",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c05807fd-cafe-494e-b18b-3ff1e4a93314"
              }
            ],
            "exits": [
              {
                "uuid": "76db5617-8f8a-4709-8b4d-e2e2cf749add",
                "destination_uuid": "f6b64130-0db9-48a0-a8f7-0b12c743df85"
              }
            ]
          },
          {
            "uuid": "f6b64130-0db9-48a0-a8f7-0b12c743df85",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b4897fd3-91ba-440c-8c81-73bdfc424e6d",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "5914c447-64a0-43e5-b8bc-72325b4e396d",
                  "type": "has_only_phrase",
                  "uuid": "05ede85d-5b7f-45e3-85f9-f698d439dfac"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4b561060-c07a-4858-80c0-07153edf0c28",
                  "name": "All Responses",
                  "uuid": "b4897fd3-91ba-440c-8c81-73bdfc424e6d"
                },
                {
                  "exit_uuid": "48c3d33e-d289-4678-b5c4-790ac53b400d",
                  "name": "Next",
                  "uuid": "5914c447-64a0-43e5-b8bc-72325b4e396d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4b561060-c07a-4858-80c0-07153edf0c28",
                "destination_uuid": null
              },
              {
                "uuid": "48c3d33e-d289-4678-b5c4-790ac53b400d",
                "destination_uuid": "e4f32259-88a4-4765-a586-167f715eb3c2"
              }
            ]
          },
          {
            "uuid": "e4f32259-88a4-4765-a586-167f715eb3c2",
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
                "uuid": "f0583f7e-559e-4b9a-aaa0-99eb8f4fa128"
              }
            ],
            "exits": [
              {
                "uuid": "070e0504-9e14-4eaa-967a-4785561b1c99",
                "destination_uuid": "07445ee2-0ad0-441a-bae2-e0a314de62c4"
              }
            ]
          },
          {
            "uuid": "07445ee2-0ad0-441a-bae2-e0a314de62c4",
            "actions": [],
            "exits": [
              {
                "uuid": "4bcf3051-734f-47e8-8107-d7a320894656",
                "destination_uuid": "c9262255-28c3-4f59-9f76-8b3e5df44073"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a69c8495-f96e-44b7-8738-89e4827de523",
              "cases": [],
              "categories": [
                {
                  "uuid": "a69c8495-f96e-44b7-8738-89e4827de523",
                  "name": "All Responses",
                  "exit_uuid": "4bcf3051-734f-47e8-8107-d7a320894656"
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
            "uuid": "c9262255-28c3-4f59-9f76-8b3e5df44073",
            "actions": [
              {
                "uuid": "24d0d616-3a96-4e32-b6cc-d7d6b4d3752d",
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
                "uuid": "03ea8625-ddcb-4aa7-9907-6a387c16e4e0",
                "destination_uuid": "45753582-fcbb-4ca8-926b-c4e8b7af3b0c"
              }
            ]
          },
          {
            "uuid": "45753582-fcbb-4ca8-926b-c4e8b7af3b0c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "75c8d52c-f41a-4367-b613-e757f567c0fb",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "c88244d4-e9b4-41bc-b221-9bd6aae3bb38",
                  "type": "has_only_phrase",
                  "uuid": "59addb53-787f-443b-88be-ef5455e15d85"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "c88244d4-e9b4-41bc-b221-9bd6aae3bb38",
                  "type": "has_only_phrase",
                  "uuid": "82fb5508-28a1-43e2-a74e-23b6ec0c7678"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "c88244d4-e9b4-41bc-b221-9bd6aae3bb38",
                  "type": "has_only_phrase",
                  "uuid": "3244bcea-920c-4afa-b0c9-33ad320d9f26"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "3d51e92f-e2f2-42ea-9538-485b713d3c3d",
                  "type": "has_only_phrase",
                  "uuid": "52511d46-d132-45ef-8e24-da0862324e7f"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "3d51e92f-e2f2-42ea-9538-485b713d3c3d",
                  "type": "has_only_phrase",
                  "uuid": "0e1fe33a-a1ea-431c-8e54-4e4b18608423"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "3d51e92f-e2f2-42ea-9538-485b713d3c3d",
                  "type": "has_only_phrase",
                  "uuid": "69c85229-d5a5-4ccd-85a1-8a711aab45fc"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "3d51e92f-e2f2-42ea-9538-485b713d3c3d",
                  "type": "has_only_phrase",
                  "uuid": "8d766865-df27-4235-8fb9-7b23b2cdd4ae"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "3d51e92f-e2f2-42ea-9538-485b713d3c3d",
                  "type": "has_only_phrase",
                  "uuid": "eba55315-30f2-4d22-b916-122fd1e9e898"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b3e00269-4d8f-4dd8-8397-022b493b5548",
                  "name": "All Responses",
                  "uuid": "75c8d52c-f41a-4367-b613-e757f567c0fb"
                },
                {
                  "exit_uuid": "112008b0-5721-4a7e-a5ff-b008b7792263",
                  "name": "0;1;2",
                  "uuid": "c88244d4-e9b4-41bc-b221-9bd6aae3bb38"
                },
                {
                  "exit_uuid": "ec01c11f-b62c-4690-8b73-51f032fa8ee8",
                  "name": "3;4;5;6;7",
                  "uuid": "3d51e92f-e2f2-42ea-9538-485b713d3c3d"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "b3e00269-4d8f-4dd8-8397-022b493b5548",
                "destination_uuid": null
              },
              {
                "uuid": "112008b0-5721-4a7e-a5ff-b008b7792263",
                "destination_uuid": "c4e2db0e-065e-400c-8fc7-fba9331042e3"
              },
              {
                "uuid": "ec01c11f-b62c-4690-8b73-51f032fa8ee8",
                "destination_uuid": "549c9de5-c9f9-4143-b4cf-6f0aab1b7c69"
              }
            ]
          },
          {
            "uuid": "c4e2db0e-065e-400c-8fc7-fba9331042e3",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "5545b41b-9c83-4704-b948-a7bfb50aa4e4"
              }
            ],
            "exits": [
              {
                "uuid": "672f3c4d-38dd-4b7d-b118-36f5752fc825",
                "destination_uuid": "a2bea6df-f424-475f-8063-14f0ffe63121"
              }
            ]
          },
          {
            "uuid": "549c9de5-c9f9-4143-b4cf-6f0aab1b7c69",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "3d736fae-763c-4816-ad3b-e8798688b987"
              }
            ],
            "exits": [
              {
                "uuid": "5367cbb6-47b4-4047-a09a-722b41aae45e",
                "destination_uuid": "a2bea6df-f424-475f-8063-14f0ffe63121"
              }
            ]
          },
          {
            "uuid": "a2bea6df-f424-475f-8063-14f0ffe63121",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "adcef70a-f11e-4afa-b185-9173ea0fac00",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "2fbe22cb-f183-4848-ae30-6ec32d40075c",
                  "type": "has_only_phrase",
                  "uuid": "56f04848-7aa0-45e9-8074-955b6b42989f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ed22d44d-7a5f-456b-8fba-593a6b3d7f6f",
                  "name": "All Responses",
                  "uuid": "adcef70a-f11e-4afa-b185-9173ea0fac00"
                },
                {
                  "exit_uuid": "a2829499-0d3b-4b2d-aea2-06d592156bcd",
                  "name": "Next",
                  "uuid": "2fbe22cb-f183-4848-ae30-6ec32d40075c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ed22d44d-7a5f-456b-8fba-593a6b3d7f6f",
                "destination_uuid": null
              },
              {
                "uuid": "a2829499-0d3b-4b2d-aea2-06d592156bcd",
                "destination_uuid": "7101cdf7-3a62-4678-ba74-eb3794c6a2a8"
              }
            ]
          },
          {
            "uuid": "7101cdf7-3a62-4678-ba74-eb3794c6a2a8",
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
                "uuid": "ea5197d3-a138-479e-bd2b-9b3ea71526bc"
              }
            ],
            "exits": [
              {
                "uuid": "0da3b5b7-fbd6-471e-84ea-970a4c9c5677",
                "destination_uuid": "a8278599-7af8-4402-9245-23f598b34252"
              }
            ]
          },
          {
            "uuid": "a8278599-7af8-4402-9245-23f598b34252",
            "actions": [],
            "exits": [
              {
                "uuid": "df041521-4964-4a9a-8163-eb4cf869a651",
                "destination_uuid": "29527282-8720-4c67-b78e-c779423e9167"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "696d6673-b406-49e3-bcbd-b4eb3a91427b",
              "cases": [],
              "categories": [
                {
                  "uuid": "696d6673-b406-49e3-bcbd-b4eb3a91427b",
                  "name": "All Responses",
                  "exit_uuid": "df041521-4964-4a9a-8163-eb4cf869a651"
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
            "uuid": "29527282-8720-4c67-b78e-c779423e9167",
            "actions": [
              {
                "uuid": "ccae712e-e6ac-4431-a40b-865e19012efd",
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
                "uuid": "3edc5294-e715-4751-858f-59f4ca0bdc4f",
                "destination_uuid": "439cb6f4-7f76-4604-8d54-f8db000bedbe"
              }
            ]
          },
          {
            "uuid": "439cb6f4-7f76-4604-8d54-f8db000bedbe",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "36e4ae18-9e34-49be-83a3-cf437fc17dba",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "0951c70d-054e-49ad-8fe2-7e42adcb2c08",
                  "type": "has_only_phrase",
                  "uuid": "d4333dfb-e590-4f34-a40a-e5b6347184ed"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "0951c70d-054e-49ad-8fe2-7e42adcb2c08",
                  "type": "has_only_phrase",
                  "uuid": "1e9234a3-e4b9-48b5-bcbf-bb1cc6b18647"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "3cb74dc3-d7a3-4124-850d-0c9b6e03ea41",
                  "type": "has_only_phrase",
                  "uuid": "7d18e206-6aeb-4af3-985d-200fc0edd139"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "3cb74dc3-d7a3-4124-850d-0c9b6e03ea41",
                  "type": "has_only_phrase",
                  "uuid": "f25a0c3d-7641-4554-a7d3-80b53ed46e74"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "3cb74dc3-d7a3-4124-850d-0c9b6e03ea41",
                  "type": "has_only_phrase",
                  "uuid": "2ae223a6-b368-4b15-85e0-4af5154a2a60"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "3cb74dc3-d7a3-4124-850d-0c9b6e03ea41",
                  "type": "has_only_phrase",
                  "uuid": "da14214f-4614-49c3-9ac1-1aff007c8f99"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "3cb74dc3-d7a3-4124-850d-0c9b6e03ea41",
                  "type": "has_only_phrase",
                  "uuid": "eaf73259-49ba-446d-bf8c-f569eab93e0d"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "3cb74dc3-d7a3-4124-850d-0c9b6e03ea41",
                  "type": "has_only_phrase",
                  "uuid": "4f1a3adf-ea64-46c2-a3d4-b4d0a42cd0d4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8cadcf45-f97d-4027-ae2b-1c4f2160690c",
                  "name": "All Responses",
                  "uuid": "36e4ae18-9e34-49be-83a3-cf437fc17dba"
                },
                {
                  "exit_uuid": "c5c05117-8b93-4341-99b2-dd56fd7d1771",
                  "name": "0;1",
                  "uuid": "0951c70d-054e-49ad-8fe2-7e42adcb2c08"
                },
                {
                  "exit_uuid": "2ba96550-cd48-4ca1-af6c-6c759199bbf5",
                  "name": "2;3;4;5;6;7",
                  "uuid": "3cb74dc3-d7a3-4124-850d-0c9b6e03ea41"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "8cadcf45-f97d-4027-ae2b-1c4f2160690c",
                "destination_uuid": null
              },
              {
                "uuid": "c5c05117-8b93-4341-99b2-dd56fd7d1771",
                "destination_uuid": "78721cff-ebe6-4413-a23c-19a0cf41b482"
              },
              {
                "uuid": "2ba96550-cd48-4ca1-af6c-6c759199bbf5",
                "destination_uuid": "ff001947-7d96-4aac-81e3-e41227dc9ae3"
              }
            ]
          },
          {
            "uuid": "78721cff-ebe6-4413-a23c-19a0cf41b482",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "5643b54a-2eae-4729-bbc7-f211ccc64dff"
              }
            ],
            "exits": [
              {
                "uuid": "1b6dc697-7c05-4974-9d19-23b7cfbc30f2",
                "destination_uuid": "d92b1379-e071-4796-81d9-db8a6821fb85"
              }
            ]
          },
          {
            "uuid": "ff001947-7d96-4aac-81e3-e41227dc9ae3",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "67b689e4-33c3-4f65-b987-55519d9fc6b8"
              }
            ],
            "exits": [
              {
                "uuid": "d42a90e1-39e3-41ac-a2b7-85dcd6260940",
                "destination_uuid": "d92b1379-e071-4796-81d9-db8a6821fb85"
              }
            ]
          },
          {
            "uuid": "d92b1379-e071-4796-81d9-db8a6821fb85",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3d668afe-7ee3-4a2a-8460-29db737796e9",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "ad55534a-99ea-4cb6-a8f0-c90c41a7f4ec",
                  "type": "has_only_phrase",
                  "uuid": "890f178c-2134-4361-b766-c71bcd27baf3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "175d2d5a-04f0-42fd-b7ad-990388032358",
                  "name": "All Responses",
                  "uuid": "3d668afe-7ee3-4a2a-8460-29db737796e9"
                },
                {
                  "exit_uuid": "e232b4df-6aa9-42c0-bd08-ada9a06ffd74",
                  "name": "Next",
                  "uuid": "ad55534a-99ea-4cb6-a8f0-c90c41a7f4ec"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "175d2d5a-04f0-42fd-b7ad-990388032358",
                "destination_uuid": null
              },
              {
                "uuid": "e232b4df-6aa9-42c0-bd08-ada9a06ffd74",
                "destination_uuid": "f53c304d-4848-477c-afd8-5ccc2a426712"
              }
            ]
          },
          {
            "uuid": "f53c304d-4848-477c-afd8-5ccc2a426712",
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
                "uuid": "a900ca32-c69d-425d-962d-d0a35d1e117c"
              }
            ],
            "exits": [
              {
                "uuid": "908f5081-e1eb-42b9-95ee-7de1192edc36",
                "destination_uuid": "ef9c8d97-2e66-4d66-8513-0a59994333d9"
              }
            ]
          },
          {
            "uuid": "ef9c8d97-2e66-4d66-8513-0a59994333d9",
            "actions": [],
            "exits": [
              {
                "uuid": "c17b3ce0-298f-44ce-807d-b36233bc3bf4",
                "destination_uuid": "b9a9f410-f697-47fc-8e52-d173b6891065"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "bf50a380-affa-4bcf-9138-752b8d09485e",
              "cases": [],
              "categories": [
                {
                  "uuid": "bf50a380-affa-4bcf-9138-752b8d09485e",
                  "name": "All Responses",
                  "exit_uuid": "c17b3ce0-298f-44ce-807d-b36233bc3bf4"
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
            "uuid": "b9a9f410-f697-47fc-8e52-d173b6891065",
            "actions": [
              {
                "uuid": "ca3e124c-edd6-4d04-a29e-ced6d03ff19f",
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
                "uuid": "427b4bf1-2e8d-40ca-95a0-e46c1c6857de",
                "destination_uuid": "5fb76380-0036-4ab0-bf2e-18c352be3bec"
              }
            ]
          },
          {
            "uuid": "a63ce985-aab1-4755-b188-0a34ac544b3a",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "5ce439c9-b50d-49f2-8693-7c6f82bbf24b"
              }
            ],
            "exits": [
              {
                "uuid": "ebf5967b-f3a6-4e40-ad6a-be35eb5fc337",
                "destination_uuid": "d136dea3-040f-4996-8fa3-8cb88a8f2cb5"
              }
            ]
          },
          {
            "uuid": "5fb76380-0036-4ab0-bf2e-18c352be3bec",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9905c654-a2c3-4b6e-b1dd-668927ada7f4",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "a8103db0-5c14-4090-a5a6-6765c0f63043",
                  "type": "has_only_phrase",
                  "uuid": "a6163360-cc40-4ea8-9607-d6f6dab66a6c"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "a8103db0-5c14-4090-a5a6-6765c0f63043",
                  "type": "has_only_phrase",
                  "uuid": "c11fa8e2-203a-4d2d-8ab2-3a8826f91a5e"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "a8103db0-5c14-4090-a5a6-6765c0f63043",
                  "type": "has_only_phrase",
                  "uuid": "9aec2741-8621-4e8f-a9c2-b1e5cc9d03d9"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "a8103db0-5c14-4090-a5a6-6765c0f63043",
                  "type": "has_only_phrase",
                  "uuid": "0ad4113c-2111-41aa-8053-3f64416e3325"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "a8103db0-5c14-4090-a5a6-6765c0f63043",
                  "type": "has_only_phrase",
                  "uuid": "83317a68-a08d-41e1-a0e5-37f9c835b345"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "a8103db0-5c14-4090-a5a6-6765c0f63043",
                  "type": "has_only_phrase",
                  "uuid": "acb5edae-15e2-452b-962a-5438c7e83306"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "a8103db0-5c14-4090-a5a6-6765c0f63043",
                  "type": "has_only_phrase",
                  "uuid": "90cb71d9-d73b-426e-9dd4-fde6573c456e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1e569629-6edd-4dd7-bdb3-7e8ae8c23fc9",
                  "name": "All Responses",
                  "uuid": "9905c654-a2c3-4b6e-b1dd-668927ada7f4"
                },
                {
                  "exit_uuid": "06de50b5-93b7-4b00-87bc-c506c445f73b",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "a8103db0-5c14-4090-a5a6-6765c0f63043"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "1e569629-6edd-4dd7-bdb3-7e8ae8c23fc9",
                "destination_uuid": "a63ce985-aab1-4755-b188-0a34ac544b3a"
              },
              {
                "uuid": "06de50b5-93b7-4b00-87bc-c506c445f73b",
                "destination_uuid": "58003023-ef56-4ab4-b46d-d74826722906"
              }
            ]
          },
          {
            "uuid": "58003023-ef56-4ab4-b46d-d74826722906",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "458b1b02-02c3-4389-9eae-7420647351a3"
              }
            ],
            "exits": [
              {
                "uuid": "b1b0a13b-6328-4efd-a3c5-e40d060bb962",
                "destination_uuid": "d136dea3-040f-4996-8fa3-8cb88a8f2cb5"
              }
            ]
          },
          {
            "uuid": "d136dea3-040f-4996-8fa3-8cb88a8f2cb5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "54908cd1-0a4e-4b38-ae9a-be7cde9e0c28",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b0557a1f-04c9-4a25-bf1e-6b959e202ebc",
                  "type": "has_only_phrase",
                  "uuid": "79c71667-6fcd-49e7-b435-71337e069037"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9508c571-5ead-4d45-868c-f2678e48ebdf",
                  "name": "All Responses",
                  "uuid": "54908cd1-0a4e-4b38-ae9a-be7cde9e0c28"
                },
                {
                  "exit_uuid": "723424db-aac0-44de-b252-9e0333d41824",
                  "name": "Next",
                  "uuid": "b0557a1f-04c9-4a25-bf1e-6b959e202ebc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9508c571-5ead-4d45-868c-f2678e48ebdf",
                "destination_uuid": null
              },
              {
                "uuid": "723424db-aac0-44de-b252-9e0333d41824",
                "destination_uuid": "980b5c97-876f-4457-8d8f-adad0189e412"
              }
            ]
          },
          {
            "uuid": "980b5c97-876f-4457-8d8f-adad0189e412",
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
                "uuid": "de21c4b3-37fa-4802-aeaa-5af05113510d"
              }
            ],
            "exits": [
              {
                "uuid": "33bd614e-0104-4cd0-9f2a-58fe0b1dc692",
                "destination_uuid": "e20d32dd-808b-4871-b9f2-e85c9cd5e652"
              }
            ]
          },
          {
            "uuid": "e20d32dd-808b-4871-b9f2-e85c9cd5e652",
            "actions": [],
            "exits": [
              {
                "uuid": "346e3d06-6f94-4ee7-9579-8ee0761a27cf",
                "destination_uuid": "67f711a3-e91f-4f1f-b873-517986447b81"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "1bafcd10-8e81-452c-84bf-c6660767945b",
              "cases": [],
              "categories": [
                {
                  "uuid": "1bafcd10-8e81-452c-84bf-c6660767945b",
                  "name": "All Responses",
                  "exit_uuid": "346e3d06-6f94-4ee7-9579-8ee0761a27cf"
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
            "uuid": "67f711a3-e91f-4f1f-b873-517986447b81",
            "actions": [
              {
                "uuid": "8bc99376-25aa-4027-af1f-1e96b3281017",
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
                "uuid": "e29f5f0f-f1d0-4d21-95e1-2af051e145c7",
                "destination_uuid": "a0656e22-e590-4fc4-93b3-3cceb840d3cf"
              }
            ]
          },
          {
            "uuid": "a0656e22-e590-4fc4-93b3-3cceb840d3cf",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "00093cd1-7945-41de-9c27-ea07a5812c53",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "5b2e9adb-004e-41db-b388-2e2418267234",
                  "type": "has_only_phrase",
                  "uuid": "b9b8d125-750d-48f8-8de9-234a1b395537"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "5b2e9adb-004e-41db-b388-2e2418267234",
                  "type": "has_only_phrase",
                  "uuid": "eb902e56-de44-475d-8774-6e161445f86e"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "5b2e9adb-004e-41db-b388-2e2418267234",
                  "type": "has_only_phrase",
                  "uuid": "07783814-0157-4e14-bd6f-bda335ccf8f8"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "5b2e9adb-004e-41db-b388-2e2418267234",
                  "type": "has_only_phrase",
                  "uuid": "a72d6851-95c1-4b4b-9ff9-788ad63850e8"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "5b2e9adb-004e-41db-b388-2e2418267234",
                  "type": "has_only_phrase",
                  "uuid": "8678243c-91d4-4330-b69c-4286e09c8c47"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "13c6c52f-dbba-4b59-9021-25c6172e26ed",
                  "type": "has_only_phrase",
                  "uuid": "b234518c-485b-4f5e-ba18-f25fa8453439"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "13c6c52f-dbba-4b59-9021-25c6172e26ed",
                  "type": "has_only_phrase",
                  "uuid": "8109ff1c-99c7-4e69-b2a2-1f4bf175652f"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "13c6c52f-dbba-4b59-9021-25c6172e26ed",
                  "type": "has_only_phrase",
                  "uuid": "cc6929a6-c6f9-4a95-93bb-17cb801ca139"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "13c6c52f-dbba-4b59-9021-25c6172e26ed",
                  "type": "has_only_phrase",
                  "uuid": "5c2377e2-b56d-4de4-8ecb-fcb4c0079757"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5b2e5244-1f3d-4aa9-9645-638eac0a66d4",
                  "name": "All Responses",
                  "uuid": "00093cd1-7945-41de-9c27-ea07a5812c53"
                },
                {
                  "exit_uuid": "da641c28-b8e4-4cdc-9c38-f85de4b5c015",
                  "name": "0;1;2;3;4",
                  "uuid": "5b2e9adb-004e-41db-b388-2e2418267234"
                },
                {
                  "exit_uuid": "92cb7480-82bf-4157-aacc-153d2da09db2",
                  "name": "5;6;7;8",
                  "uuid": "13c6c52f-dbba-4b59-9021-25c6172e26ed"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "5b2e5244-1f3d-4aa9-9645-638eac0a66d4",
                "destination_uuid": null
              },
              {
                "uuid": "da641c28-b8e4-4cdc-9c38-f85de4b5c015",
                "destination_uuid": "bb1cb5b9-c49d-4666-8edd-771504aed161"
              },
              {
                "uuid": "92cb7480-82bf-4157-aacc-153d2da09db2",
                "destination_uuid": "e12d3ab9-c9b1-4ebe-ba2b-e5bd3d9a6bdb"
              }
            ]
          },
          {
            "uuid": "bb1cb5b9-c49d-4666-8edd-771504aed161",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "e0eaacba-f035-4aa5-895b-ba16bc0df554"
              }
            ],
            "exits": [
              {
                "uuid": "1baa279c-6e93-4b3c-bde8-9581d9b9d3ce",
                "destination_uuid": "4187a04a-4e6a-4a00-87ea-a1c0eef3ef66"
              }
            ]
          },
          {
            "uuid": "e12d3ab9-c9b1-4ebe-ba2b-e5bd3d9a6bdb",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "ab4643a7-21f8-45cc-b10a-f3a3025761ac"
              }
            ],
            "exits": [
              {
                "uuid": "bde2a572-a0c9-4086-af0e-c95319226ded",
                "destination_uuid": "4187a04a-4e6a-4a00-87ea-a1c0eef3ef66"
              }
            ]
          },
          {
            "uuid": "4187a04a-4e6a-4a00-87ea-a1c0eef3ef66",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "54f0bd06-a18a-488a-9ff4-cfbc7b4313c5",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "e8e3e065-2c7d-4df2-a998-382f54f15f03",
                  "type": "has_only_phrase",
                  "uuid": "e1d7a784-c099-4d5d-9573-021cf8a1b32f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "88817f3a-99f8-4265-ba33-72266b99dac5",
                  "name": "All Responses",
                  "uuid": "54f0bd06-a18a-488a-9ff4-cfbc7b4313c5"
                },
                {
                  "exit_uuid": "a0b32701-acd8-49b2-bea7-6bb4c748d708",
                  "name": "Next",
                  "uuid": "e8e3e065-2c7d-4df2-a998-382f54f15f03"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "88817f3a-99f8-4265-ba33-72266b99dac5",
                "destination_uuid": null
              },
              {
                "uuid": "a0b32701-acd8-49b2-bea7-6bb4c748d708",
                "destination_uuid": "e8b88621-fac0-41c2-8b4f-0a2437d3ed18"
              }
            ]
          },
          {
            "uuid": "e8b88621-fac0-41c2-8b4f-0a2437d3ed18",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "2cf4c042-ee0a-4d74-87a6-705372677568"
              }
            ],
            "exits": [
              {
                "uuid": "29d3d2e8-f32a-4d61-89c9-4dd98ff2d340",
                "destination_uuid": "dcb290b2-e04e-4bd1-9417-1a5a5cac5b5c"
              }
            ]
          },
          {
            "uuid": "dcb290b2-e04e-4bd1-9417-1a5a5cac5b5c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1c50b555-cebe-4706-8478-40cfcdb232d9",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "65dc17c8-50d7-4131-bfeb-9b20716e7e3c",
                  "type": "has_only_phrase",
                  "uuid": "17586f34-642f-4979-9c5b-8de6c61f894b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a67fc571-9b11-44dc-9795-0e26963a350b",
                  "name": "All Responses",
                  "uuid": "1c50b555-cebe-4706-8478-40cfcdb232d9"
                },
                {
                  "exit_uuid": "8dac31cd-b8ea-41da-ac2f-4b7f249af29a",
                  "name": "Next",
                  "uuid": "65dc17c8-50d7-4131-bfeb-9b20716e7e3c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a67fc571-9b11-44dc-9795-0e26963a350b",
                "destination_uuid": null
              },
              {
                "uuid": "8dac31cd-b8ea-41da-ac2f-4b7f249af29a",
                "destination_uuid": "8ba2b0a1-5366-473d-a4e2-75f668d1f3db"
              }
            ]
          },
          {
            "uuid": "8ba2b0a1-5366-473d-a4e2-75f668d1f3db",
            "actions": [
              {
                "uuid": "e73f4638-0dd4-4375-bf14-f207c650d539",
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
                "uuid": "aa77c15b-6509-417b-bb81-276f591f4864",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a5c63d60-eb42-44b4-a914-3cce326b356a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "fb00f860-c7d6-4510-8f04-75488d7a08b2",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "29a2d184-791c-48f0-a7b9-f369e58af2ac"
              }
            ],
            "exits": [
              {
                "uuid": "9b80349a-10ad-499a-9f3c-be4216ec03ac",
                "destination_uuid": "0fe2acc0-4eb8-4cf4-a905-b4af052fd44f"
              }
            ]
          },
          {
            "uuid": "0fe2acc0-4eb8-4cf4-a905-b4af052fd44f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9f98ec4b-cb71-45d4-9af5-894fd616f833",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "7402f73a-94a9-46fd-bfe6-0370fcd31394",
                  "type": "has_only_phrase",
                  "uuid": "5d656688-345e-45bd-95bf-1c5d065bd6ec"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a17504ab-92cf-4205-8e36-e56419291843",
                  "name": "All Responses",
                  "uuid": "9f98ec4b-cb71-45d4-9af5-894fd616f833"
                },
                {
                  "exit_uuid": "2070e8ce-52ed-4897-9b9f-af78fd6234c3",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "7402f73a-94a9-46fd-bfe6-0370fcd31394"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a17504ab-92cf-4205-8e36-e56419291843",
                "destination_uuid": null
              },
              {
                "uuid": "2070e8ce-52ed-4897-9b9f-af78fd6234c3",
                "destination_uuid": "302c36c4-299c-4771-8244-a7eb1278b14f"
              }
            ]
          },
          {
            "uuid": "302c36c4-299c-4771-8244-a7eb1278b14f",
            "actions": [
              {
                "uuid": "6e41e92a-01e9-4b94-8892-2e82fd9e5d1d",
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
                "uuid": "f5d169ef-81fc-49f2-a986-83aae22237ad",
                "destination_uuid": "65159221-0921-4d1d-a640-6e228e0ce8ad"
              }
            ]
          },
          {
            "uuid": "65159221-0921-4d1d-a640-6e228e0ce8ad",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "a2750f19-83ea-4279-ab5c-7abc467ef924"
                },
                "type": "enter_flow",
                "uuid": "02d9d7c8-0adb-4897-966f-5a54b86b41d5"
              }
            ],
            "exits": [
              {
                "uuid": "81250117-0f1c-4dc3-8a31-c7b7fb78825c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "6435b1cd-436d-441a-863a-2630ac2b3af2",
            "actions": [
              {
                "uuid": "71154eb6-6eb7-4d0b-a116-2c7b490c0ad6",
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
                "uuid": "74583f20-9c46-4b5d-a340-b30f6f46f2a9",
                "destination_uuid": "9cda0309-accd-454d-aec0-81f8a6a6bab5"
              }
            ]
          },
          {
            "uuid": "9cda0309-accd-454d-aec0-81f8a6a6bab5",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "67ff5933-2bec-4e65-b627-1dde0d1a01e1"
                },
                "type": "enter_flow",
                "uuid": "245cfcb6-6260-48b8-9e18-042d9c5a6062"
              }
            ],
            "exits": [
              {
                "uuid": "7ca18251-3acb-440e-98bb-15c22919cdd3",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a7d6ff2a-ba1f-46ad-83bb-f62a87469411",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4d5e6979-77ab-4590-8d69-4f631fd3097e",
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
                "uuid": "de6482d8-0a42-49d9-a19d-2e071dd619ce"
              }
            ],
            "exits": [
              {
                "uuid": "3cd748a5-5a12-404a-8f8a-63f36ed1cb3e",
                "destination_uuid": "bf5325c6-f63d-4814-8894-c04e374f56a1"
              }
            ]
          },
          {
            "uuid": "bf5325c6-f63d-4814-8894-c04e374f56a1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d2007283-27b4-4780-b28c-77af7a778b97",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "ecb6e629-7bd9-46b8-b2d4-5e65fe8efbe9",
                  "type": "has_only_phrase",
                  "uuid": "f4104adc-0f8e-40d5-8b99-3501aad59e89"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "b4dc65ea-a9d4-49c1-a9e9-bb13c07793ea",
                  "type": "has_only_phrase",
                  "uuid": "f2b24754-38c9-4e13-86b8-7235de064f50"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "b4dc65ea-a9d4-49c1-a9e9-bb13c07793ea",
                  "type": "has_only_phrase",
                  "uuid": "1554a1a2-e3e3-4edc-9df1-1006d5b5ab69"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5e688acb-ef53-45e2-a097-69063ff3f7ec",
                  "name": "All Responses",
                  "uuid": "d2007283-27b4-4780-b28c-77af7a778b97"
                },
                {
                  "exit_uuid": "97c6885d-c2c1-4c3d-917e-b3d7ad36eae9",
                  "name": "Happy",
                  "uuid": "ecb6e629-7bd9-46b8-b2d4-5e65fe8efbe9"
                },
                {
                  "exit_uuid": "30815c7d-bb2f-4f45-abdc-1c1c439f0260",
                  "name": "Neutral; Sad",
                  "uuid": "b4dc65ea-a9d4-49c1-a9e9-bb13c07793ea"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5e688acb-ef53-45e2-a097-69063ff3f7ec",
                "destination_uuid": null
              },
              {
                "uuid": "97c6885d-c2c1-4c3d-917e-b3d7ad36eae9",
                "destination_uuid": "4fe022ac-d1cd-4ca8-b2e4-d22a47fffa99"
              },
              {
                "uuid": "30815c7d-bb2f-4f45-abdc-1c1c439f0260",
                "destination_uuid": "15e42997-89de-4323-986b-a7cce5214f24"
              }
            ]
          },
          {
            "uuid": "4fe022ac-d1cd-4ca8-b2e4-d22a47fffa99",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "eb3f572a-a492-45ea-bf92-84458cfb6a5e"
              }
            ],
            "exits": [
              {
                "uuid": "c1b3d4df-0556-44d5-92c1-f28548919d7c",
                "destination_uuid": "c4dc6227-8f45-4bc9-9525-37c79997f7b8"
              }
            ]
          },
          {
            "uuid": "15e42997-89de-4323-986b-a7cce5214f24",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c74472c8-3276-4a6f-ab17-787fd131da0a"
              }
            ],
            "exits": [
              {
                "uuid": "5a750c28-87fc-44a6-b518-afccf6d3f9a3",
                "destination_uuid": "69abff4d-6d72-4670-b57f-845474ba475d"
              }
            ]
          },
          {
            "uuid": "69abff4d-6d72-4670-b57f-845474ba475d",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "81f97909-27cd-40e3-856e-d83623f362e4"
              }
            ],
            "exits": [
              {
                "uuid": "80433861-e086-42f1-9d29-c7c34a6cf709",
                "destination_uuid": "783f606b-bc3b-4c99-be82-f82c5b8f4950"
              }
            ]
          },
          {
            "uuid": "783f606b-bc3b-4c99-be82-f82c5b8f4950",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e594a3cc-0604-4d51-b82b-ac1f6ac586fe",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "fb38f456-6049-4122-82a5-04781c70f06f",
                  "type": "has_only_phrase",
                  "uuid": "a7951869-084e-43f0-b32a-342038d95bef"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "15215d2e-342e-487c-b055-c3a5b66775f4",
                  "type": "has_only_phrase",
                  "uuid": "329c1c60-d893-403e-8c03-395d13294434"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "efe24d94-b826-43db-a48b-018269fc6915",
                  "name": "All Responses",
                  "uuid": "e594a3cc-0604-4d51-b82b-ac1f6ac586fe"
                },
                {
                  "exit_uuid": "6cbf9bdd-b8f1-4acb-91ee-1edd54f8ab40",
                  "name": "Yes",
                  "uuid": "fb38f456-6049-4122-82a5-04781c70f06f"
                },
                {
                  "exit_uuid": "c1423f6e-dd38-46f8-9ca0-6cc4e270b4d7",
                  "name": "No",
                  "uuid": "15215d2e-342e-487c-b055-c3a5b66775f4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "efe24d94-b826-43db-a48b-018269fc6915",
                "destination_uuid": null
              },
              {
                "uuid": "6cbf9bdd-b8f1-4acb-91ee-1edd54f8ab40",
                "destination_uuid": "be94c294-60ff-44b5-a5b0-0fb9de0e0b4e"
              },
              {
                "uuid": "c1423f6e-dd38-46f8-9ca0-6cc4e270b4d7",
                "destination_uuid": "77c3fb8c-4f1f-4a67-a62e-2d49aba58870"
              }
            ]
          },
          {
            "uuid": "be94c294-60ff-44b5-a5b0-0fb9de0e0b4e",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "84ee8142-c482-4282-ab4b-57ddabf13c9f"
                },
                "type": "enter_flow",
                "uuid": "624dfed6-91dc-4078-bcd4-6d89d7c4e47a"
              }
            ],
            "exits": [
              {
                "uuid": "177621bc-9c05-42b6-816d-1af84417a40f",
                "destination_uuid": "12bcd01b-d0cd-4bca-9722-a351cb789395"
              },
              {
                "uuid": "aaef64e2-5638-4421-8922-a83f5c67c7a2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "83abb63a-ea87-48e5-a654-e961c5df9e28",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c39b2257-01bf-412c-9d8a-0ca3393ea106"
                },
                {
                  "uuid": "a282282e-2197-4b66-bc2f-c427df0e9a9d",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "80867956-56ec-45e7-8688-9318ed1dfef9"
                }
              ],
              "categories": [
                {
                  "uuid": "c39b2257-01bf-412c-9d8a-0ca3393ea106",
                  "name": "Complete",
                  "exit_uuid": "177621bc-9c05-42b6-816d-1af84417a40f"
                },
                {
                  "uuid": "80867956-56ec-45e7-8688-9318ed1dfef9",
                  "name": "Expired",
                  "exit_uuid": "aaef64e2-5638-4421-8922-a83f5c67c7a2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c39b2257-01bf-412c-9d8a-0ca3393ea106"
            }
          },
          {
            "uuid": "12bcd01b-d0cd-4bca-9722-a351cb789395",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "88e13b21-4c97-4af8-a576-d4fc21270409"
              }
            ],
            "exits": [
              {
                "uuid": "89f790ea-b41d-49f8-8d16-20b3862a037e",
                "destination_uuid": "025ca971-1cd8-431e-8e71-01dc445aa893"
              }
            ]
          },
          {
            "uuid": "025ca971-1cd8-431e-8e71-01dc445aa893",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "95f38a45-19b3-4b83-a292-743281708bf1"
              }
            ],
            "exits": [
              {
                "uuid": "22470397-d4eb-43be-9caa-5902f7ae0451",
                "destination_uuid": "c4dc6227-8f45-4bc9-9525-37c79997f7b8"
              }
            ]
          },
          {
            "uuid": "77c3fb8c-4f1f-4a67-a62e-2d49aba58870",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "ed3966e1-0cec-4a4b-ac53-bc4338a5e057"
              }
            ],
            "exits": [
              {
                "uuid": "13b339a0-e142-41aa-a9a4-d9485fd1db5a",
                "destination_uuid": "c4dc6227-8f45-4bc9-9525-37c79997f7b8"
              }
            ]
          },
          {
            "uuid": "c4dc6227-8f45-4bc9-9525-37c79997f7b8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0ba85901-02a6-4748-85aa-00afb64f7b49",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "5e3681e6-84fe-45c0-9cec-4f63cf3cd1c0",
                  "type": "has_only_phrase",
                  "uuid": "0946cffc-ecf7-471d-9dcd-831ae03dd33c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "60207a79-b534-4015-adc4-beec763458d9",
                  "name": "All Responses",
                  "uuid": "0ba85901-02a6-4748-85aa-00afb64f7b49"
                },
                {
                  "exit_uuid": "390b272b-3e54-4bf2-835a-984fce89527b",
                  "name": "Chat to @fields.elder",
                  "uuid": "5e3681e6-84fe-45c0-9cec-4f63cf3cd1c0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "60207a79-b534-4015-adc4-beec763458d9",
                "destination_uuid": null
              },
              {
                "uuid": "390b272b-3e54-4bf2-835a-984fce89527b",
                "destination_uuid": "fa5d6f95-fb8b-4da1-a765-7eb7d81af1e5"
              }
            ]
          },
          {
            "uuid": "fa5d6f95-fb8b-4da1-a765-7eb7d81af1e5",
            "actions": [
              {
                "uuid": "4c6e77e7-19cc-4848-aa34-9ae02b812eab",
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
                "uuid": "f6cc5657-b781-4c4b-89e5-a703c0950a1b",
                "destination_uuid": "560e7305-f971-4f4e-9baa-2c1204337672"
              }
            ]
          },
          {
            "uuid": "560e7305-f971-4f4e-9baa-2c1204337672",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "dbbdfa2c-27ca-4aef-9028-c579569cb178"
                },
                "type": "enter_flow",
                "uuid": "0e087fe0-cc14-4b17-84f8-49049e46cbe3"
              }
            ],
            "exits": [
              {
                "uuid": "664f728a-49f5-4882-b93a-034f8a22c491",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e6ed6b04-d0ee-41d4-a18a-7f57eeb42228",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9c0d19de-f896-401b-90e7-3e677d8bbe33",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "81734b54-cf7c-47c1-b56a-3a3c355647b3"
              }
            ],
            "exits": [
              {
                "uuid": "03fd5074-2f87-4fed-8267-1ac878549e31",
                "destination_uuid": "3159b725-a970-4b64-8a02-adce1969cd88"
              }
            ]
          },
          {
            "uuid": "3159b725-a970-4b64-8a02-adce1969cd88",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3a90d594-fecb-426a-842f-24f570d65ebd"
              }
            ],
            "exits": [
              {
                "uuid": "1547f434-b731-42f4-b1be-aa4c715f8e62",
                "destination_uuid": "807b2f67-dd66-43d3-8d0c-1f0a44f590c3"
              }
            ]
          },
          {
            "uuid": "807b2f67-dd66-43d3-8d0c-1f0a44f590c3",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "65965470-8ec3-4da2-8fd1-181aa0541474"
              }
            ],
            "exits": [
              {
                "uuid": "c4e0aa25-cfb2-49b6-8891-84f96184a352",
                "destination_uuid": "599dbb6c-55bf-46f2-b6d5-15bdb26adbb2"
              }
            ]
          },
          {
            "uuid": "599dbb6c-55bf-46f2-b6d5-15bdb26adbb2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1392498b-d2ca-4b99-8e10-71bea0488c15",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "5e8161dc-03c4-465e-94f2-64faf324a897",
                  "type": "has_only_phrase",
                  "uuid": "8affd544-2884-4a1b-9a65-594edea44074"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "36b5950c-e58c-488e-b970-3c55f249ff32",
                  "type": "has_only_phrase",
                  "uuid": "68113264-5433-4da5-96e8-903652a80793"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "35796fad-4a06-44d8-8894-5eba3948ff58",
                  "name": "All Responses",
                  "uuid": "1392498b-d2ca-4b99-8e10-71bea0488c15"
                },
                {
                  "exit_uuid": "324fab80-89d9-4ffe-a5d5-02cccd2da0fe",
                  "name": "Yes",
                  "uuid": "5e8161dc-03c4-465e-94f2-64faf324a897"
                },
                {
                  "exit_uuid": "c62be625-e29f-4c59-9485-59dcad860061",
                  "name": "No",
                  "uuid": "36b5950c-e58c-488e-b970-3c55f249ff32"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "35796fad-4a06-44d8-8894-5eba3948ff58",
                "destination_uuid": null
              },
              {
                "uuid": "324fab80-89d9-4ffe-a5d5-02cccd2da0fe",
                "destination_uuid": "9fa08842-1bde-4bb9-b370-1836da12c6f9"
              },
              {
                "uuid": "c62be625-e29f-4c59-9485-59dcad860061",
                "destination_uuid": "e06f907a-7b8c-4390-a6c6-ca6859efe986"
              }
            ]
          },
          {
            "uuid": "9fa08842-1bde-4bb9-b370-1836da12c6f9",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e1d031c8-da90-4781-b02b-d9c9a654ef3b"
              }
            ],
            "exits": [
              {
                "uuid": "f881b113-4d13-4bed-bb8f-f2efa8c0fe66",
                "destination_uuid": "07408b85-e414-40da-b098-75699ac18b32"
              }
            ]
          },
          {
            "uuid": "e06f907a-7b8c-4390-a6c6-ca6859efe986",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c3e72c35-f502-48f6-b398-dc7825aa18e5"
              }
            ],
            "exits": [
              {
                "uuid": "4b520361-745d-4b56-bb91-b41359bc0805",
                "destination_uuid": "07408b85-e414-40da-b098-75699ac18b32"
              }
            ]
          },
          {
            "uuid": "07408b85-e414-40da-b098-75699ac18b32",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1bf909ea-6795-4cdd-854a-0b9317a0dbef"
              }
            ],
            "exits": [
              {
                "uuid": "9febd5b5-e99d-4a7a-9ba5-e67de4c3e3ea",
                "destination_uuid": "75996046-b641-41bb-a75d-647ccc83a429"
              }
            ]
          },
          {
            "uuid": "75996046-b641-41bb-a75d-647ccc83a429",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "c8e417f2-ef7c-4ff7-bd0e-bee2529c83f4"
              }
            ],
            "exits": [
              {
                "uuid": "ef10c1ff-2103-4278-8600-e8ae604e5f79",
                "destination_uuid": "62179a0b-f9ba-4878-9ba8-6956134e9529"
              }
            ]
          },
          {
            "uuid": "62179a0b-f9ba-4878-9ba8-6956134e9529",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "535deea8-44aa-407c-a3cb-bcb58df511aa",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "7512f570-29df-4dec-b68c-b79c879b4c2e",
                  "type": "has_only_phrase",
                  "uuid": "08d3d0ee-eee4-4737-b53f-e297d3c05f8a"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "0234434a-0615-4fba-98f5-9b450aa563ec",
                  "type": "has_only_phrase",
                  "uuid": "cc6d6776-960d-46d4-942b-3de20d040e59"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e3c901df-8974-459d-bd88-88eb648bf652",
                  "name": "All Responses",
                  "uuid": "535deea8-44aa-407c-a3cb-bcb58df511aa"
                },
                {
                  "exit_uuid": "5c6daf9c-acad-4e48-85f9-b2f9def49532",
                  "name": "Yes",
                  "uuid": "7512f570-29df-4dec-b68c-b79c879b4c2e"
                },
                {
                  "exit_uuid": "a8b34f36-8a58-481b-bba4-7e2760b43d02",
                  "name": "Later",
                  "uuid": "0234434a-0615-4fba-98f5-9b450aa563ec"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e3c901df-8974-459d-bd88-88eb648bf652",
                "destination_uuid": null
              },
              {
                "uuid": "5c6daf9c-acad-4e48-85f9-b2f9def49532",
                "destination_uuid": "28947eb1-af61-453f-ae85-7dfafd032520"
              },
              {
                "uuid": "a8b34f36-8a58-481b-bba4-7e2760b43d02",
                "destination_uuid": "93babe78-6ac4-4928-9ca2-d787166622ef"
              }
            ]
          },
          {
            "uuid": "28947eb1-af61-453f-ae85-7dfafd032520",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "97a4a4ba-61c7-4efd-8928-fdbb9e37bec2"
              }
            ],
            "exits": [
              {
                "uuid": "c77c75c8-b7f8-4b20-8787-e96233c4d04f",
                "destination_uuid": "026ef817-c4f4-4c0d-b60b-c352048bb736"
              }
            ]
          },
          {
            "uuid": "026ef817-c4f4-4c0d-b60b-c352048bb736",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2e2f3e10-c3b7-466a-9b66-1241e6c27814",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "3694adfe-2c49-40eb-afbc-896e14966613",
                  "type": "has_only_phrase",
                  "uuid": "46e81722-e64c-4655-95f8-241dfbd067a0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "41029603-f9af-46b4-8762-fa707e9721be",
                  "name": "All Responses",
                  "uuid": "2e2f3e10-c3b7-466a-9b66-1241e6c27814"
                },
                {
                  "exit_uuid": "2f2eb650-781b-4fba-97a4-02d74ebfeda1",
                  "name": "Take me to Tips",
                  "uuid": "3694adfe-2c49-40eb-afbc-896e14966613"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "41029603-f9af-46b4-8762-fa707e9721be",
                "destination_uuid": null
              },
              {
                "uuid": "2f2eb650-781b-4fba-97a4-02d74ebfeda1",
                "destination_uuid": "17ca4782-a70a-4717-957b-7bd2719333c9"
              }
            ]
          },
          {
            "uuid": "17ca4782-a70a-4717-957b-7bd2719333c9",
            "actions": [
              {
                "uuid": "943f98a1-c203-4986-a4d7-6738a7e3145d",
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
                "uuid": "1da948ff-3728-44ff-8886-f034d5679bed",
                "destination_uuid": "a6e90a60-47ef-40b4-937d-c2c60b3db4a7"
              }
            ]
          },
          {
            "uuid": "a6e90a60-47ef-40b4-937d-c2c60b3db4a7",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "9ccb9dbf-9b20-4391-89d1-c9f5585c1c00"
                },
                "type": "enter_flow",
                "uuid": "042b0048-6a16-452f-83c6-9408f11c5ac2"
              }
            ],
            "exits": [
              {
                "uuid": "3569d7d5-5701-4575-a4e7-e3434fa0cb55",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "93babe78-6ac4-4928-9ca2-d787166622ef",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "61885f1a-58bd-4b7f-9c07-3af0efb4dae9"
              }
            ],
            "exits": [
              {
                "uuid": "26916006-8351-48fe-ad8a-66298f871419",
                "destination_uuid": "e239c1df-bc70-40ba-bb6b-0bec12126c0e"
              }
            ]
          },
          {
            "uuid": "e239c1df-bc70-40ba-bb6b-0bec12126c0e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d201cef5-3164-4f8e-90fd-444b3e4a7572",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "3bcf8293-9ca3-43a5-8293-f1d9be5885ca",
                  "type": "has_only_phrase",
                  "uuid": "00ef90c1-53b3-4ff2-a5ea-c1c16bb76774"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fd046bf2-afd7-4d50-83eb-16d172413d0e",
                  "name": "All Responses",
                  "uuid": "d201cef5-3164-4f8e-90fd-444b3e4a7572"
                },
                {
                  "exit_uuid": "25352b55-9395-4477-86f7-bd918b697776",
                  "name": "Take me to the home screen",
                  "uuid": "3bcf8293-9ca3-43a5-8293-f1d9be5885ca"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fd046bf2-afd7-4d50-83eb-16d172413d0e",
                "destination_uuid": null
              },
              {
                "uuid": "25352b55-9395-4477-86f7-bd918b697776",
                "destination_uuid": "855fecdb-33d0-4293-9ec8-82bc881185e0"
              }
            ]
          },
          {
            "uuid": "855fecdb-33d0-4293-9ec8-82bc881185e0",
            "actions": [
              {
                "uuid": "28a82396-a3ad-4bcd-952c-50f1a29b8987",
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
                "uuid": "fdd80ba7-f84c-406a-aa32-d62fa236df8e",
                "destination_uuid": "807b6a3b-3c83-4290-96e6-96a591f5ec81"
              }
            ]
          },
          {
            "uuid": "807b6a3b-3c83-4290-96e6-96a591f5ec81",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "3de91460-7fe4-4448-b435-bf8a6ec309b8"
                },
                "type": "enter_flow",
                "uuid": "92c29cba-14b4-4b3f-9402-fc4dc9c460cc"
              }
            ],
            "exits": [
              {
                "uuid": "6eb69374-b8c3-47da-94b6-0459eedcf453",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "1a8cc3d4-f066-4030-b74d-3986b80bb9ee",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7b56535b-e859-4b7b-8e72-c81eb676b1c1",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "55e6c551-a930-4b74-8fd8-b1c237aec2b8"
              }
            ],
            "exits": [
              {
                "uuid": "1b09c555-f904-4373-968f-f4ad8a52edcf",
                "destination_uuid": "b02c2e08-e513-43b5-87cd-afc62a720b1c"
              }
            ]
          },
          {
            "uuid": "b02c2e08-e513-43b5-87cd-afc62a720b1c",
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
                "uuid": "247c1e70-ffaa-4d18-b0bb-7719d3f48730"
              }
            ],
            "exits": [
              {
                "uuid": "5e2187b1-3bd2-4a3d-9418-e4d212aebd89",
                "destination_uuid": "2acd0659-a2fc-4f82-b456-a201722933a3"
              }
            ]
          },
          {
            "uuid": "2acd0659-a2fc-4f82-b456-a201722933a3",
            "actions": [],
            "exits": [
              {
                "uuid": "99348e9d-5e7f-4788-a3b3-664e430deaa4",
                "destination_uuid": "4e0f45d7-e19f-4412-872a-d0520c2014ad"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "63439ce9-f82e-4177-951f-4a07c332ed69",
              "cases": [],
              "categories": [
                {
                  "uuid": "63439ce9-f82e-4177-951f-4a07c332ed69",
                  "name": "All Responses",
                  "exit_uuid": "99348e9d-5e7f-4788-a3b3-664e430deaa4"
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
            "uuid": "4e0f45d7-e19f-4412-872a-d0520c2014ad",
            "actions": [
              {
                "uuid": "0918485d-e4ba-4d11-8d3b-bc1680b5fd9e",
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
                "uuid": "3143ab36-3b30-4196-b815-463edd016bdc",
                "destination_uuid": "bae0f579-a2a2-41d8-8eee-339aef92ca1d"
              }
            ]
          },
          {
            "uuid": "bae0f579-a2a2-41d8-8eee-339aef92ca1d",
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
                "uuid": "33351d05-c143-40a4-a0ad-b797bebedf00"
              }
            ],
            "exits": [
              {
                "uuid": "600be743-a909-4608-ab20-cddc73d31368",
                "destination_uuid": "05987cdd-34f6-4e8a-b056-0fb7e66f23e9"
              }
            ]
          },
          {
            "uuid": "05987cdd-34f6-4e8a-b056-0fb7e66f23e9",
            "actions": [],
            "exits": [
              {
                "uuid": "97fad4dd-4610-4da4-8f72-6e150d301d91",
                "destination_uuid": "b2702c15-ae53-429a-9221-f95f49fdb5da"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f9966f0f-63e9-44d3-b927-8d4ac8a8c193",
              "cases": [],
              "categories": [
                {
                  "uuid": "f9966f0f-63e9-44d3-b927-8d4ac8a8c193",
                  "name": "All Responses",
                  "exit_uuid": "97fad4dd-4610-4da4-8f72-6e150d301d91"
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
            "uuid": "b2702c15-ae53-429a-9221-f95f49fdb5da",
            "actions": [
              {
                "uuid": "b9aca33c-110d-4093-bcb0-e7910b48e745",
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
                "uuid": "506fb0a6-4e5b-494a-b3a2-15c390eb3050",
                "destination_uuid": "ca798eba-4250-4830-b2bc-2ca910cc6711"
              }
            ]
          },
          {
            "uuid": "ca798eba-4250-4830-b2bc-2ca910cc6711",
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
                "uuid": "8188a607-75c4-467c-bb37-fbdf801d29de"
              }
            ],
            "exits": [
              {
                "uuid": "b9c1f4fe-dd86-4ac7-bde8-787968128c0f",
                "destination_uuid": "a1fcfd66-ebeb-4611-9239-8f29bf10beb8"
              }
            ]
          },
          {
            "uuid": "a1fcfd66-ebeb-4611-9239-8f29bf10beb8",
            "actions": [],
            "exits": [
              {
                "uuid": "befd5e95-597f-4b14-b2ba-4f82c8173034",
                "destination_uuid": "3d0bee64-3e99-4ad1-aeb8-ea2b90c6b89c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "42023c2e-37b0-4b69-93fb-6f2851f609fc",
              "cases": [],
              "categories": [
                {
                  "uuid": "42023c2e-37b0-4b69-93fb-6f2851f609fc",
                  "name": "All Responses",
                  "exit_uuid": "befd5e95-597f-4b14-b2ba-4f82c8173034"
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
            "uuid": "3d0bee64-3e99-4ad1-aeb8-ea2b90c6b89c",
            "actions": [
              {
                "uuid": "38a79c37-3d00-4c01-bd16-396d492e4994",
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
                "uuid": "3f6d5581-febf-4ebb-b6bc-d412dfb61742",
                "destination_uuid": "cab265bb-18db-42e3-b0f9-fbd1c5a3c14f"
              }
            ]
          },
          {
            "uuid": "cab265bb-18db-42e3-b0f9-fbd1c5a3c14f",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "4bfd1a1f-8404-4039-a778-99cd4aa70cc4"
              }
            ],
            "exits": [
              {
                "uuid": "3f7619ac-fc3e-4779-9b0e-1658ffea58c4",
                "destination_uuid": "f516a7e7-b02c-4294-9ea1-dde9dc685934"
              }
            ]
          },
          {
            "uuid": "f516a7e7-b02c-4294-9ea1-dde9dc685934",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8608e614-6268-4dae-8bf5-ff035a448505",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "17611403-cb1a-48eb-8641-d0b3ab9f83be",
                  "type": "has_only_phrase",
                  "uuid": "be52474c-cb6d-48c6-8d1e-c6846426eca4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9dfc051e-3a84-4c4e-b577-3a51da1b8ea5",
                  "name": "All Responses",
                  "uuid": "8608e614-6268-4dae-8bf5-ff035a448505"
                },
                {
                  "exit_uuid": "3d25fc2d-b6c5-4bfb-a8ec-c6ede6bffaa3",
                  "name": "Take me to Homescreen",
                  "uuid": "17611403-cb1a-48eb-8641-d0b3ab9f83be"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9dfc051e-3a84-4c4e-b577-3a51da1b8ea5",
                "destination_uuid": null
              },
              {
                "uuid": "3d25fc2d-b6c5-4bfb-a8ec-c6ede6bffaa3",
                "destination_uuid": "9054af32-b205-4cba-88fa-81dcc2e9a5dd"
              }
            ]
          },
          {
            "uuid": "9054af32-b205-4cba-88fa-81dcc2e9a5dd",
            "actions": [
              {
                "uuid": "74e74d8f-c07e-441f-a8dc-789375911c46",
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
                "uuid": "e252fa60-7d34-4f29-b8c9-cfa68e5e730d",
                "destination_uuid": "269e58b7-038e-4810-8af3-de6585186aa4"
              }
            ]
          },
          {
            "uuid": "269e58b7-038e-4810-8af3-de6585186aa4",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "b6778cfc-98df-4663-b469-f8fbfddfed9a"
                },
                "type": "enter_flow",
                "uuid": "9bc80dbb-8da9-4218-a512-94b4f2b30cc1"
              }
            ],
            "exits": [
              {
                "uuid": "35e9ec20-3e19-49a0-a81c-37037577f09b",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a24db584-503a-4e43-ab46-b4af25e91352",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b7e08865-1b9a-4e5f-9440-2b324d3ffb4b",
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
                "uuid": "2eebe009-3258-4f27-97cd-c57afea17692"
              }
            ],
            "exits": [
              {
                "uuid": "72947dc6-1bdb-49a7-9ca9-ecb30c233ade",
                "destination_uuid": "e8aca172-c0f6-4c79-86d6-b6389329df34"
              }
            ]
          },
          {
            "uuid": "e8aca172-c0f6-4c79-86d6-b6389329df34",
            "actions": [],
            "exits": [
              {
                "uuid": "2ba79c53-9966-489a-a512-abf21fb65bdf",
                "destination_uuid": "5e01f2c4-56c7-4d47-9bc8-52161f32f329"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "eb724397-f37c-4413-9e59-8b4492fda003",
              "cases": [],
              "categories": [
                {
                  "uuid": "eb724397-f37c-4413-9e59-8b4492fda003",
                  "name": "All Responses",
                  "exit_uuid": "2ba79c53-9966-489a-a512-abf21fb65bdf"
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
            "uuid": "5e01f2c4-56c7-4d47-9bc8-52161f32f329",
            "actions": [
              {
                "uuid": "af875253-2008-4305-9d7e-bdd0f748d0fb",
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
                "uuid": "0dfc45cc-b699-4dcd-9698-d18774a946af",
                "destination_uuid": "20559424-1229-4471-970f-26f7e919f951"
              }
            ]
          },
          {
            "uuid": "20559424-1229-4471-970f-26f7e919f951",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b9b8e602-efcb-4418-b206-b2378b4e91e7",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "faf2b4ba-7fb9-4af5-a33f-b9815cbdeeba",
                  "type": "has_only_phrase",
                  "uuid": "cf855eed-b76c-44f5-880a-1223bcaff306"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "5850c816-f4fd-4e8e-a0b1-5a040abb13de",
                  "type": "has_only_phrase",
                  "uuid": "7db20e88-0e3a-4844-81a7-2c1d6968b2b4"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "a107ba7a-eda8-464f-a0a2-f1e0d351a111",
                  "type": "has_only_phrase",
                  "uuid": "e1936f15-c01f-4d8e-8eb0-37338b8ff3ba"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e15bdfe3-14b4-4dce-8423-600d31889c9d",
                  "name": "All Responses",
                  "uuid": "b9b8e602-efcb-4418-b206-b2378b4e91e7"
                },
                {
                  "exit_uuid": "61066561-212c-4f2c-9c2e-71e95d1513bd",
                  "name": "Great",
                  "uuid": "faf2b4ba-7fb9-4af5-a33f-b9815cbdeeba"
                },
                {
                  "exit_uuid": "73451317-cac8-42ea-baa3-630908215f01",
                  "name": "Neutral",
                  "uuid": "5850c816-f4fd-4e8e-a0b1-5a040abb13de"
                },
                {
                  "exit_uuid": "93b22861-69cf-4ed1-987f-5d6c15312025",
                  "name": "Bad",
                  "uuid": "a107ba7a-eda8-464f-a0a2-f1e0d351a111"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "e15bdfe3-14b4-4dce-8423-600d31889c9d",
                "destination_uuid": null
              },
              {
                "uuid": "61066561-212c-4f2c-9c2e-71e95d1513bd",
                "destination_uuid": "a346a919-c546-4269-b21f-7caf7e1ea89a"
              },
              {
                "uuid": "73451317-cac8-42ea-baa3-630908215f01",
                "destination_uuid": "a666c087-54c3-4e6f-ae5f-f556a9474c8c"
              },
              {
                "uuid": "93b22861-69cf-4ed1-987f-5d6c15312025",
                "destination_uuid": "c2faf0c2-e83e-449d-a9e1-54003e8df11f"
              }
            ]
          },
          {
            "uuid": "a346a919-c546-4269-b21f-7caf7e1ea89a",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "aa276488-8bde-4977-b278-e08bfb9db8db"
              }
            ],
            "exits": [
              {
                "uuid": "65da197a-a3a5-4c30-84ec-388835562a6f",
                "destination_uuid": "971f65fd-53b0-40c0-b3da-c099c69c0423"
              }
            ]
          },
          {
            "uuid": "a666c087-54c3-4e6f-ae5f-f556a9474c8c",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b4f64278-76fe-44dd-89d3-d15fe553f376"
              }
            ],
            "exits": [
              {
                "uuid": "b7127577-9d35-41c0-9844-5af13414c6be",
                "destination_uuid": "971f65fd-53b0-40c0-b3da-c099c69c0423"
              }
            ]
          },
          {
            "uuid": "971f65fd-53b0-40c0-b3da-c099c69c0423",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "d55148ee-84d3-437b-8b91-e4ed48286e93"
                },
                "type": "enter_flow",
                "uuid": "e47ae3be-bd6c-4bd3-8536-c6f1bebe5734"
              }
            ],
            "exits": [
              {
                "uuid": "d98ce5b5-316f-4f3b-8fe4-76d6cbe46c54",
                "destination_uuid": "44f2f22f-0820-488f-9a6f-eb85d81619c8"
              },
              {
                "uuid": "bdc17d52-991b-43c2-9a1a-6866ba7d0596",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "265ddd9a-2bfa-44c0-8600-406b98b2d582",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a458f5e9-ca96-402f-bc7b-559e2e193bd0"
                },
                {
                  "uuid": "e32aaeb8-7e2f-4e23-b154-bd375dd6615b",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "6469c9f1-c67e-4c67-a7f0-d8402358e8f3"
                }
              ],
              "categories": [
                {
                  "uuid": "a458f5e9-ca96-402f-bc7b-559e2e193bd0",
                  "name": "Complete",
                  "exit_uuid": "d98ce5b5-316f-4f3b-8fe4-76d6cbe46c54"
                },
                {
                  "uuid": "6469c9f1-c67e-4c67-a7f0-d8402358e8f3",
                  "name": "Expired",
                  "exit_uuid": "bdc17d52-991b-43c2-9a1a-6866ba7d0596"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a458f5e9-ca96-402f-bc7b-559e2e193bd0"
            }
          },
          {
            "uuid": "44f2f22f-0820-488f-9a6f-eb85d81619c8",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "e0743806-6cb8-4834-a593-f93d9f14a9e6"
                },
                "type": "enter_flow",
                "uuid": "8b523b9c-7e16-4bd6-b27b-5a6e9b933eeb"
              }
            ],
            "exits": [
              {
                "uuid": "5c9a59b9-ae6b-409b-a1f1-8e17dd284fe3",
                "destination_uuid": "6545456b-72c8-4766-92a1-074369e92a79"
              },
              {
                "uuid": "d5d76792-b685-4e5f-9ce7-b865c1b67591",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b04445d1-8694-4c8d-a3ae-9bf8c9fca3b8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "5c249655-7127-4085-9ff5-c6909eb991ec"
                },
                {
                  "uuid": "30279870-db19-42d1-a8f6-70281423ba14",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "087c3d64-9c60-4af0-8bb1-554e85a65794"
                }
              ],
              "categories": [
                {
                  "uuid": "5c249655-7127-4085-9ff5-c6909eb991ec",
                  "name": "Complete",
                  "exit_uuid": "5c9a59b9-ae6b-409b-a1f1-8e17dd284fe3"
                },
                {
                  "uuid": "087c3d64-9c60-4af0-8bb1-554e85a65794",
                  "name": "Expired",
                  "exit_uuid": "d5d76792-b685-4e5f-9ce7-b865c1b67591"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "5c249655-7127-4085-9ff5-c6909eb991ec"
            }
          },
          {
            "uuid": "c2faf0c2-e83e-449d-a9e1-54003e8df11f",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b3e39a9d-3dc7-48de-a6c6-d94e1980d438"
              }
            ],
            "exits": [
              {
                "uuid": "6bac1de5-e7ba-4852-9407-d8df6446c132",
                "destination_uuid": "03e69e44-13ac-4bb8-bada-df85c491a26c"
              }
            ]
          },
          {
            "uuid": "03e69e44-13ac-4bb8-bada-df85c491a26c",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "ccca8ffc-268b-4c0e-bd23-1d6e66aeabc6"
                },
                "type": "enter_flow",
                "uuid": "91c1c839-1343-4739-8748-a676d79c30ea"
              }
            ],
            "exits": [
              {
                "uuid": "e80c9bd5-7459-4015-8c23-8ffe168318e9",
                "destination_uuid": "48e6d09c-8bee-4429-a3d5-f530580770d5"
              },
              {
                "uuid": "8f4c1151-7a7f-4eba-9a3a-889b93346a19",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e4aba864-27f3-4962-87c3-621e7e399e11",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0bf9aa42-2740-471f-9680-50d79f9c0093"
                },
                {
                  "uuid": "2af24404-8fa8-4a29-af73-4e4bb2e8baa1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "00be9862-04dd-4f17-805f-cdcafb183b0f"
                }
              ],
              "categories": [
                {
                  "uuid": "0bf9aa42-2740-471f-9680-50d79f9c0093",
                  "name": "Complete",
                  "exit_uuid": "e80c9bd5-7459-4015-8c23-8ffe168318e9"
                },
                {
                  "uuid": "00be9862-04dd-4f17-805f-cdcafb183b0f",
                  "name": "Expired",
                  "exit_uuid": "8f4c1151-7a7f-4eba-9a3a-889b93346a19"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0bf9aa42-2740-471f-9680-50d79f9c0093"
            }
          },
          {
            "uuid": "48e6d09c-8bee-4429-a3d5-f530580770d5",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "d77cabff-52b6-4286-afa9-d7d4c25ea68b"
                },
                "type": "enter_flow",
                "uuid": "de297c6d-bd75-4406-8264-4d9c2276799f"
              }
            ],
            "exits": [
              {
                "uuid": "85e2d972-d969-4d86-9360-ccc2f154441c",
                "destination_uuid": "6545456b-72c8-4766-92a1-074369e92a79"
              },
              {
                "uuid": "d26b81b3-f878-4b07-992a-73d6f562efa8",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7b10f3a2-26e3-4c60-8243-b4c31a0ec2b1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "dcb5abd3-4317-44ef-9be1-589d423a79e2"
                },
                {
                  "uuid": "1a579f6a-5b8c-418e-8a6f-94c3975893ad",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "841decfd-8d24-41dd-bbc8-09f1cde91d14"
                }
              ],
              "categories": [
                {
                  "uuid": "dcb5abd3-4317-44ef-9be1-589d423a79e2",
                  "name": "Complete",
                  "exit_uuid": "85e2d972-d969-4d86-9360-ccc2f154441c"
                },
                {
                  "uuid": "841decfd-8d24-41dd-bbc8-09f1cde91d14",
                  "name": "Expired",
                  "exit_uuid": "d26b81b3-f878-4b07-992a-73d6f562efa8"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "dcb5abd3-4317-44ef-9be1-589d423a79e2"
            }
          },
          {
            "uuid": "6545456b-72c8-4766-92a1-074369e92a79",
            "actions": [
              {
                "uuid": "22371487-17d1-4ba6-bc92-ff405d886071",
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
                "uuid": "54c7a32e-5dd7-441e-a580-4ff2bef48c8d",
                "destination_uuid": "6e6ee9f0-a05a-47a4-9d09-8a3dacfb8888"
              }
            ]
          },
          {
            "uuid": "6e6ee9f0-a05a-47a4-9d09-8a3dacfb8888",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "f338cba2-272c-42c6-b3c7-8a175434e25b"
                },
                "type": "enter_flow",
                "uuid": "fff3d26e-56dd-406b-bb58-91d6185b09cf"
              }
            ],
            "exits": [
              {
                "uuid": "21f80461-e434-4396-bd09-7d8420ad932d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6a91adfa-7fa0-42f2-9019-fd88bfdffc58",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "68c6b917-0ab7-4967-8bf1-c2384d60e674",
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
                "uuid": "52ed6202-c168-4579-89f7-7a2771f07f24"
              }
            ],
            "exits": [
              {
                "uuid": "f8673232-e711-423c-a81e-b7681bd15e65",
                "destination_uuid": "ef983a51-f226-4a88-9b23-b22d403acf07"
              }
            ]
          },
          {
            "uuid": "ef983a51-f226-4a88-9b23-b22d403acf07",
            "actions": [],
            "exits": [
              {
                "uuid": "583c36af-262b-4067-a6c7-bd74f75e27c1",
                "destination_uuid": "3f365112-1afd-4918-a322-4811d27c34d1"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fe577570-912e-4c37-9297-7bcb2034bf9c",
              "cases": [],
              "categories": [
                {
                  "uuid": "fe577570-912e-4c37-9297-7bcb2034bf9c",
                  "name": "All Responses",
                  "exit_uuid": "583c36af-262b-4067-a6c7-bd74f75e27c1"
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
            "uuid": "3f365112-1afd-4918-a322-4811d27c34d1",
            "actions": [
              {
                "uuid": "0ce49129-f51c-439c-87df-c4e2ef9e75b0",
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
                "uuid": "9223d5bb-fcf6-4c57-b8a7-21e448267af4",
                "destination_uuid": "289bd7de-254b-4563-857c-200080455243"
              }
            ]
          },
          {
            "uuid": "289bd7de-254b-4563-857c-200080455243",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7779cf6b-4c16-453c-94db-ff915269fa5a",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "4188838d-f5a1-4454-9f78-7c9e18e036f2",
                  "type": "has_only_phrase",
                  "uuid": "acfcbc96-5a62-4f58-ba64-93cb8a1aace7"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "8cd0c680-bed1-4b28-800a-33523b6fff78",
                  "type": "has_only_phrase",
                  "uuid": "64215383-9138-449b-accb-2e2cc5519fe7"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "aba887dc-9216-4fae-814b-b688e6878dd6",
                  "type": "has_only_phrase",
                  "uuid": "8c8c10ca-7afc-4b95-a420-76f0355f5560"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "38106fb1-761c-445c-92ca-af50809bab7b",
                  "type": "has_only_phrase",
                  "uuid": "7527ce5c-25cc-4d6a-adad-bc3e49de06c5"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "fec7d0ca-e063-4114-bf73-3052ad9b0f7b",
                  "type": "has_only_phrase",
                  "uuid": "88d58332-fa6b-4ba8-a45d-eadc9d8e3443"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "4a27c42e-b9bd-401e-b0e6-8b25592e4f6b",
                  "type": "has_only_phrase",
                  "uuid": "98d359e3-a67c-4276-af3b-20cb35d3c7dd"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "b430a5c1-879a-471b-a8ee-a169673dd1c4",
                  "type": "has_only_phrase",
                  "uuid": "3564b049-2073-43f3-a5cc-e490a2de522d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7b385cf6-d5f4-49c9-894a-9ec476b44e8b",
                  "name": "All Responses",
                  "uuid": "7779cf6b-4c16-453c-94db-ff915269fa5a"
                },
                {
                  "exit_uuid": "88759d5c-f672-4e91-8f97-f14b3ff711b4",
                  "name": "Do it every day",
                  "uuid": "4188838d-f5a1-4454-9f78-7c9e18e036f2"
                },
                {
                  "exit_uuid": "36fd093a-f4ab-4460-b228-220ec4a6f399",
                  "name": "Let your teen choose the activity",
                  "uuid": "8cd0c680-bed1-4b28-800a-33523b6fff78"
                },
                {
                  "exit_uuid": "76cff3c0-6c39-47c2-8868-f98bde0543d1",
                  "name": "Follow your teen’s lead",
                  "uuid": "aba887dc-9216-4fae-814b-b688e6878dd6"
                },
                {
                  "exit_uuid": "8ba8b50c-31f9-48c2-8727-e7ae4675c913",
                  "name": "Give your teen all of your attention",
                  "uuid": "38106fb1-761c-445c-92ca-af50809bab7b"
                },
                {
                  "exit_uuid": "815942b1-7dbc-4f48-8244-4da604038ae5",
                  "name": "Show your teen you are really listening",
                  "uuid": "fec7d0ca-e063-4114-bf73-3052ad9b0f7b"
                },
                {
                  "exit_uuid": "538e2573-a17c-4aed-b5b9-4bb0f5f505b3",
                  "name": "Have fun!",
                  "uuid": "4a27c42e-b9bd-401e-b0e6-8b25592e4f6b"
                },
                {
                  "exit_uuid": "5aad2f38-2e58-4027-9b84-641e5748220e",
                  "name": "None ",
                  "uuid": "b430a5c1-879a-471b-a8ee-a169673dd1c4"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "7b385cf6-d5f4-49c9-894a-9ec476b44e8b",
                "destination_uuid": null
              },
              {
                "uuid": "88759d5c-f672-4e91-8f97-f14b3ff711b4",
                "destination_uuid": "e3ae1779-827f-47af-b136-f2e14bff2e2e"
              },
              {
                "uuid": "36fd093a-f4ab-4460-b228-220ec4a6f399",
                "destination_uuid": "fbc77fe5-9792-4bba-ad47-0e889897b827"
              },
              {
                "uuid": "76cff3c0-6c39-47c2-8868-f98bde0543d1",
                "destination_uuid": "7a67d318-eacb-446b-a29b-5573b25bbaa1"
              },
              {
                "uuid": "8ba8b50c-31f9-48c2-8727-e7ae4675c913",
                "destination_uuid": "b710b766-36cf-46d8-a961-7ac31ced9316"
              },
              {
                "uuid": "815942b1-7dbc-4f48-8244-4da604038ae5",
                "destination_uuid": "07d1181f-8b6f-43ef-8969-da07b4b412f1"
              },
              {
                "uuid": "538e2573-a17c-4aed-b5b9-4bb0f5f505b3",
                "destination_uuid": "06fdbe42-8fe7-4e5d-9db3-95fc80cb26f6"
              },
              {
                "uuid": "5aad2f38-2e58-4027-9b84-641e5748220e",
                "destination_uuid": "19143019-39e8-4e8a-870e-b28dfb298b2d"
              }
            ]
          },
          {
            "uuid": "e3ae1779-827f-47af-b136-f2e14bff2e2e",
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
                "uuid": "8c1de796-7e29-4c8b-abdf-5519d668265e"
              }
            ],
            "exits": [
              {
                "uuid": "1bf7172d-f284-49ce-9095-a8236c137fd4",
                "destination_uuid": "96d5695e-8c3f-46c5-ba47-d9e531d851c5"
              }
            ]
          },
          {
            "uuid": "96d5695e-8c3f-46c5-ba47-d9e531d851c5",
            "actions": [],
            "exits": [
              {
                "uuid": "64ef2f87-0c0e-4e8d-baf3-f2e467a03bbb",
                "destination_uuid": "139836ca-0b83-4966-bdfb-ae455aa53736"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "24cfe9af-031a-43fa-8c84-a53c0b1402c3",
              "cases": [],
              "categories": [
                {
                  "uuid": "24cfe9af-031a-43fa-8c84-a53c0b1402c3",
                  "name": "All Responses",
                  "exit_uuid": "64ef2f87-0c0e-4e8d-baf3-f2e467a03bbb"
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
            "uuid": "139836ca-0b83-4966-bdfb-ae455aa53736",
            "actions": [
              {
                "uuid": "4ca16ee2-d3e8-482c-9f17-d4804b39e607",
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
                "uuid": "c8950573-0f31-43cb-a5f7-0e90019ae33b",
                "destination_uuid": "882698b2-82f8-4400-bf7f-b1f495cc931f"
              }
            ]
          },
          {
            "uuid": "882698b2-82f8-4400-bf7f-b1f495cc931f",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f4ef6961-23c4-4d61-8ec2-0d8fc1ccc6fe"
              }
            ],
            "exits": [
              {
                "uuid": "b069105d-bc4c-4b66-a7f3-2201f0b04992",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "fbc77fe5-9792-4bba-ad47-0e889897b827",
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
                "uuid": "7d0b8d39-5b91-423d-b99c-7ca0db50cc91"
              }
            ],
            "exits": [
              {
                "uuid": "2c6b0289-98a9-4f4c-85b6-d2f6907790fb",
                "destination_uuid": "f61985ac-d968-4cf7-8cd6-9d135c7d2d16"
              }
            ]
          },
          {
            "uuid": "f61985ac-d968-4cf7-8cd6-9d135c7d2d16",
            "actions": [],
            "exits": [
              {
                "uuid": "09c9e6ce-632d-4ab4-95bd-85663a843876",
                "destination_uuid": "eb5e29e7-de83-43a5-b5f4-b5808d7dfa4e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c95a0c81-3b99-4917-a6f7-7340cdad614c",
              "cases": [],
              "categories": [
                {
                  "uuid": "c95a0c81-3b99-4917-a6f7-7340cdad614c",
                  "name": "All Responses",
                  "exit_uuid": "09c9e6ce-632d-4ab4-95bd-85663a843876"
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
            "uuid": "eb5e29e7-de83-43a5-b5f4-b5808d7dfa4e",
            "actions": [
              {
                "uuid": "e474f83f-cb83-49b3-8c36-a4a6becdc124",
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
                "uuid": "829accbb-5ca4-40cf-80a6-81e867f2292f",
                "destination_uuid": "e0613806-e8c1-4e7b-b778-0eacc6ec2e05"
              }
            ]
          },
          {
            "uuid": "e0613806-e8c1-4e7b-b778-0eacc6ec2e05",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e55e8408-f1b2-4f73-9b96-26d773d47d81"
              }
            ],
            "exits": [
              {
                "uuid": "a830b619-755f-4a4e-b6d4-bf13e7c08f67",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7a67d318-eacb-446b-a29b-5573b25bbaa1",
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
                "uuid": "412d7222-3ccc-47f4-9642-78fd873b1ffb"
              }
            ],
            "exits": [
              {
                "uuid": "83830cde-47c0-493e-8527-3b539ac69cbd",
                "destination_uuid": "0a28273c-f443-4e2a-b173-76726775b58c"
              }
            ]
          },
          {
            "uuid": "0a28273c-f443-4e2a-b173-76726775b58c",
            "actions": [],
            "exits": [
              {
                "uuid": "f2fc3f9f-b173-442f-936c-b9124fc77cb8",
                "destination_uuid": "e4661042-a515-491e-89b6-035b90ae76e9"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8cd64d3c-f8b6-4377-ac11-92d588be6f72",
              "cases": [],
              "categories": [
                {
                  "uuid": "8cd64d3c-f8b6-4377-ac11-92d588be6f72",
                  "name": "All Responses",
                  "exit_uuid": "f2fc3f9f-b173-442f-936c-b9124fc77cb8"
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
            "uuid": "e4661042-a515-491e-89b6-035b90ae76e9",
            "actions": [
              {
                "uuid": "ec17cb4a-3695-46f7-acbf-ac15243a8835",
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
                "uuid": "ccef7d0f-a7d4-4c62-a035-5222e8b06fdb",
                "destination_uuid": "e41e93c1-2838-4ee2-b1e9-2e2711643be0"
              }
            ]
          },
          {
            "uuid": "e41e93c1-2838-4ee2-b1e9-2e2711643be0",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bce7ebee-db3c-42cf-804e-05abb926ba95"
              }
            ],
            "exits": [
              {
                "uuid": "1cfc727f-5bc1-434d-a404-157fd184e8d4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b710b766-36cf-46d8-a961-7ac31ced9316",
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
                "uuid": "280a597a-6fe6-485b-9c14-6b498f425b46"
              }
            ],
            "exits": [
              {
                "uuid": "2cd036e3-4391-4623-89cd-c46c9a98b1f7",
                "destination_uuid": "0996fa5b-4071-46dc-bbda-49beb0e37e84"
              }
            ]
          },
          {
            "uuid": "0996fa5b-4071-46dc-bbda-49beb0e37e84",
            "actions": [],
            "exits": [
              {
                "uuid": "981f0286-d7e6-471c-b389-20732f5e67b5",
                "destination_uuid": "9ae48f14-470b-4cb6-9317-bc362f60dc57"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9e15f987-27ee-4658-88cf-6fea6af73ac2",
              "cases": [],
              "categories": [
                {
                  "uuid": "9e15f987-27ee-4658-88cf-6fea6af73ac2",
                  "name": "All Responses",
                  "exit_uuid": "981f0286-d7e6-471c-b389-20732f5e67b5"
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
            "uuid": "9ae48f14-470b-4cb6-9317-bc362f60dc57",
            "actions": [
              {
                "uuid": "6cb65bb0-9302-44d6-8277-a38de8356628",
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
                "uuid": "ea9f79f5-23a4-4f0a-856d-503196438b6f",
                "destination_uuid": "8331274c-6620-4c25-873e-33b935053c71"
              }
            ]
          },
          {
            "uuid": "8331274c-6620-4c25-873e-33b935053c71",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "20287ba1-7039-4f8d-94be-a173a38d1f43"
              }
            ],
            "exits": [
              {
                "uuid": "98af03d8-2ad3-47be-96dd-8077ec3c5bd4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "07d1181f-8b6f-43ef-8969-da07b4b412f1",
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
                "uuid": "5f439884-58f8-44d2-988e-91c3bdcf73b7"
              }
            ],
            "exits": [
              {
                "uuid": "92ef4025-ef11-45fa-ae41-b963b89c8e34",
                "destination_uuid": "c3dccc7c-6dcf-49a2-9326-8f39f9444aa5"
              }
            ]
          },
          {
            "uuid": "c3dccc7c-6dcf-49a2-9326-8f39f9444aa5",
            "actions": [],
            "exits": [
              {
                "uuid": "470d892a-27d0-45eb-ae23-db60305a871f",
                "destination_uuid": "b82f708e-55a9-43b3-82bb-2ee1e3a2289b"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2d3c08a0-28b0-465a-b9a2-a3d69e1365de",
              "cases": [],
              "categories": [
                {
                  "uuid": "2d3c08a0-28b0-465a-b9a2-a3d69e1365de",
                  "name": "All Responses",
                  "exit_uuid": "470d892a-27d0-45eb-ae23-db60305a871f"
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
            "uuid": "b82f708e-55a9-43b3-82bb-2ee1e3a2289b",
            "actions": [
              {
                "uuid": "6d1756b2-4968-4843-a7c8-cb8fd0fb6319",
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
                "uuid": "072bd5a8-6109-4c66-becd-877f300ea4e1",
                "destination_uuid": "e816d596-9870-46e8-b3db-b7db57f6d91c"
              }
            ]
          },
          {
            "uuid": "e816d596-9870-46e8-b3db-b7db57f6d91c",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "204db099-f91c-4ea0-a209-1bb97b75ab67"
              }
            ],
            "exits": [
              {
                "uuid": "be73a862-5360-4915-b36e-28f10fe81489",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "06fdbe42-8fe7-4e5d-9db3-95fc80cb26f6",
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
                "uuid": "3c96a3da-764e-4e78-8ce5-64673f76e51b"
              }
            ],
            "exits": [
              {
                "uuid": "2cd19e44-81f7-4c69-8233-afd9e05c8156",
                "destination_uuid": "f079896c-8960-4cec-8331-367b2965895b"
              }
            ]
          },
          {
            "uuid": "f079896c-8960-4cec-8331-367b2965895b",
            "actions": [],
            "exits": [
              {
                "uuid": "37a34ca5-127b-426d-a85c-b7a3a65b184f",
                "destination_uuid": "62a441dd-bdaf-42e4-9a4e-4e6760f8aca4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "38c03bc0-a885-498c-837e-f5d3932edb27",
              "cases": [],
              "categories": [
                {
                  "uuid": "38c03bc0-a885-498c-837e-f5d3932edb27",
                  "name": "All Responses",
                  "exit_uuid": "37a34ca5-127b-426d-a85c-b7a3a65b184f"
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
            "uuid": "62a441dd-bdaf-42e4-9a4e-4e6760f8aca4",
            "actions": [
              {
                "uuid": "78f70a08-927f-4bcf-95ba-19299466452d",
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
                "uuid": "f7b846f8-4b27-405f-ac89-929e7ccc1b84",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "369b8955-a8ab-4941-bbf2-4be5ffb3e3c0",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8e2c5d74-22fc-4c1c-8004-9652cdb10a71"
              }
            ],
            "exits": [
              {
                "uuid": "7c9f4882-f20d-42d6-8461-8a69db585966",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "19143019-39e8-4e8a-870e-b28dfb298b2d",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fab8f6a8-1558-4a00-9977-2b2f00fda8b5"
              }
            ],
            "exits": [
              {
                "uuid": "4a19436c-35fa-437e-9545-7bca570d2a65",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d2797c69-7987-40f9-85b5-8ae191888c87",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1ff258ca-9de5-4486-afd2-5689ec6ee853",
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
                "uuid": "f2f59c7e-835e-40ce-b540-89e5b0a7e231"
              }
            ],
            "exits": [
              {
                "uuid": "3bc2cdee-1753-4ddf-8a65-3e75fa98f01f",
                "destination_uuid": "1cf1eafb-8dec-4644-8697-8f6ef68732b0"
              }
            ]
          },
          {
            "uuid": "d67b6477-ef00-4e5c-a29a-bcaf617c0a9c",
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
                "uuid": "c245a024-c3f5-4b9b-bbc5-4ead420ce992"
              }
            ],
            "exits": [
              {
                "uuid": "73182afe-04cf-48d1-adef-65a8a8e5f75d",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "04567075-d262-4f2f-9c69-53cd0a7beb2b",
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
                "uuid": "442710de-e313-485c-9e6c-007e461cb415"
              }
            ],
            "exits": [
              {
                "uuid": "39a39aaf-1ccd-4468-9272-0e5543fa5fce",
                "destination_uuid": "1cf1eafb-8dec-4644-8697-8f6ef68732b0"
              }
            ]
          },
          {
            "uuid": "1cf1eafb-8dec-4644-8697-8f6ef68732b0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "367ff032-e5d3-45de-a3e2-d644559318db",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "647d36f5-f557-42f2-8271-99f1f6f2e938",
                  "type": "has_only_phrase",
                  "uuid": "3e35dd7e-57ea-47a7-9d4c-5f0fe394fc8f"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "7e8aff71-543d-4448-beb3-63cddc4adc1b",
                  "type": "has_only_phrase",
                  "uuid": "cfc113a7-f149-436a-ad90-84868a7dbc60"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "7f4886dd-2131-4323-b6c2-aa38e592a6d8",
                  "type": "has_only_phrase",
                  "uuid": "2009ad64-d960-4972-9de0-3e0d306fc622"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "78e917d5-b8f5-40ff-9b67-ecc6ccce46c1",
                  "type": "has_only_phrase",
                  "uuid": "20a1dfff-68a7-46f0-a0ec-ef62d6b26eda"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "49a42867-d7d8-4603-8a61-6c2edc6fa1d5",
                  "type": "has_only_phrase",
                  "uuid": "5bbc5ed7-cb02-4037-add3-06652e793df6"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "797268e8-de4c-465a-beb3-bd511cff4004",
                  "type": "has_only_phrase",
                  "uuid": "b5fd0429-499f-4d84-9c56-a0e4e147c672"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "5d952233-1d00-4211-ba5b-99c8f280a021",
                  "type": "has_only_phrase",
                  "uuid": "9e02c4da-96f8-4c2f-89c8-b1ce0cd33909"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "fbe81dec-4461-43e8-956a-f21b7c2d9ec5",
                  "type": "has_only_phrase",
                  "uuid": "a4d0b73b-195a-41c8-8949-be739fcfef7d"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "d8298a43-93bb-4c11-8bef-66cb7019a795",
                  "type": "has_only_phrase",
                  "uuid": "85e869bb-eafb-46df-8799-09ce485eaac3"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "e0f522e9-84e5-494a-b594-ba4afa02897f",
                  "type": "has_only_phrase",
                  "uuid": "59cd3978-77e0-4f88-800b-b043f709aab8"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "93175cc8-5152-4e1a-bdec-dfbc5578051b",
                  "type": "has_only_phrase",
                  "uuid": "cceae45c-962e-4fb0-a5de-0164b3ed387a"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "968b3473-5f6a-422b-99a6-f68685ee4e02",
                  "type": "has_only_phrase",
                  "uuid": "f8ef49a4-d625-4011-9f1a-fba74451f95a"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "cdaa4041-a613-4f39-920b-4928be8a3d05",
                  "type": "has_only_phrase",
                  "uuid": "46cf9714-49f0-4a1c-a882-06d1d703ead9"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "b3444da0-01c9-412c-9a85-5167961bd708",
                  "type": "has_only_phrase",
                  "uuid": "3f384a20-9894-41e5-a661-8efd60e1486c"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "f98b5022-94c2-435f-9788-9b7fbe3fe6d5",
                  "type": "has_only_phrase",
                  "uuid": "6dc72838-51a7-4635-95bc-d4f55cb7ebdd"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c1f297cc-f2d7-423e-8222-277e9e6e126f",
                  "name": "All Responses",
                  "uuid": "367ff032-e5d3-45de-a3e2-d644559318db"
                },
                {
                  "exit_uuid": "2e56a05c-6adb-49e5-9166-96f5cd626aeb",
                  "name": "I don’t have enough time",
                  "uuid": "647d36f5-f557-42f2-8271-99f1f6f2e938"
                },
                {
                  "exit_uuid": "05d5a6de-edf2-494e-9ca1-821fe06d0f33",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "7e8aff71-543d-4448-beb3-63cddc4adc1b"
                },
                {
                  "exit_uuid": "ce7d4b68-d136-4d95-bb33-d46b24b0b5aa",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "7f4886dd-2131-4323-b6c2-aa38e592a6d8"
                },
                {
                  "exit_uuid": "b712b7b5-3b59-4ef5-a2c3-e757f573d0ab",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "78e917d5-b8f5-40ff-9b67-ecc6ccce46c1"
                },
                {
                  "exit_uuid": "ba3311e8-4187-46dc-a73b-9f55e6eb4c78",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "49a42867-d7d8-4603-8a61-6c2edc6fa1d5"
                },
                {
                  "exit_uuid": "d12367f4-6266-441e-a713-3ce94a3e9369",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "797268e8-de4c-465a-beb3-bd511cff4004"
                },
                {
                  "exit_uuid": "add54e77-4773-4203-b897-bb38300b383e",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "5d952233-1d00-4211-ba5b-99c8f280a021"
                },
                {
                  "exit_uuid": "12b20087-46d5-498a-80d7-31f4f8b36e3a",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "fbe81dec-4461-43e8-956a-f21b7c2d9ec5"
                },
                {
                  "exit_uuid": "3c15852f-0a6f-4105-802a-e2886a54d949",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "d8298a43-93bb-4c11-8bef-66cb7019a795"
                },
                {
                  "exit_uuid": "1194209d-8488-45e7-9d43-644308c6c25a",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "e0f522e9-84e5-494a-b594-ba4afa02897f"
                },
                {
                  "exit_uuid": "547fdd72-837a-49b2-a1d7-50f60d013fd1",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "93175cc8-5152-4e1a-bdec-dfbc5578051b"
                },
                {
                  "exit_uuid": "42b929bc-4d18-4711-acfa-a7293c316822",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "968b3473-5f6a-422b-99a6-f68685ee4e02"
                },
                {
                  "exit_uuid": "a8a35ab8-549b-4065-9599-8f6e36f79298",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "cdaa4041-a613-4f39-920b-4928be8a3d05"
                },
                {
                  "exit_uuid": "1201af97-21af-43ef-82c0-240f89c2cce9",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "b3444da0-01c9-412c-9a85-5167961bd708"
                },
                {
                  "exit_uuid": "e0d0da29-eb9a-477c-a9f6-2defad0e0b99",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "f98b5022-94c2-435f-9788-9b7fbe3fe6d5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c1f297cc-f2d7-423e-8222-277e9e6e126f",
                "destination_uuid": null
              },
              {
                "uuid": "2e56a05c-6adb-49e5-9166-96f5cd626aeb",
                "destination_uuid": "1f375f33-bbc2-4a6b-bfff-54e65f09ac98"
              },
              {
                "uuid": "05d5a6de-edf2-494e-9ca1-821fe06d0f33",
                "destination_uuid": "c3703670-a580-4646-83bd-54b80d3093db"
              },
              {
                "uuid": "ce7d4b68-d136-4d95-bb33-d46b24b0b5aa",
                "destination_uuid": "c3703670-a580-4646-83bd-54b80d3093db"
              },
              {
                "uuid": "b712b7b5-3b59-4ef5-a2c3-e757f573d0ab",
                "destination_uuid": "fdd2f533-d682-41c5-b940-96c816f0ede8"
              },
              {
                "uuid": "ba3311e8-4187-46dc-a73b-9f55e6eb4c78",
                "destination_uuid": "fdd2f533-d682-41c5-b940-96c816f0ede8"
              },
              {
                "uuid": "d12367f4-6266-441e-a713-3ce94a3e9369",
                "destination_uuid": "1ae863cf-37a2-4fac-b395-061bb72bc657"
              },
              {
                "uuid": "add54e77-4773-4203-b897-bb38300b383e",
                "destination_uuid": "1ae863cf-37a2-4fac-b395-061bb72bc657"
              },
              {
                "uuid": "12b20087-46d5-498a-80d7-31f4f8b36e3a",
                "destination_uuid": "e8b5c7cd-5445-499a-888a-94f337065dfe"
              },
              {
                "uuid": "3c15852f-0a6f-4105-802a-e2886a54d949",
                "destination_uuid": "e8b5c7cd-5445-499a-888a-94f337065dfe"
              },
              {
                "uuid": "1194209d-8488-45e7-9d43-644308c6c25a",
                "destination_uuid": "14277e09-7451-46ba-aa4e-878489d8be3d"
              },
              {
                "uuid": "547fdd72-837a-49b2-a1d7-50f60d013fd1",
                "destination_uuid": "14277e09-7451-46ba-aa4e-878489d8be3d"
              },
              {
                "uuid": "42b929bc-4d18-4711-acfa-a7293c316822",
                "destination_uuid": "c281d3de-859a-4b86-9ebd-ad00727e430f"
              },
              {
                "uuid": "a8a35ab8-549b-4065-9599-8f6e36f79298",
                "destination_uuid": "c281d3de-859a-4b86-9ebd-ad00727e430f"
              },
              {
                "uuid": "1201af97-21af-43ef-82c0-240f89c2cce9",
                "destination_uuid": "5233566c-21ad-40b2-a5ae-819d62a2fa3d"
              },
              {
                "uuid": "e0d0da29-eb9a-477c-a9f6-2defad0e0b99",
                "destination_uuid": "5233566c-21ad-40b2-a5ae-819d62a2fa3d"
              }
            ]
          },
          {
            "uuid": "1f375f33-bbc2-4a6b-bfff-54e65f09ac98",
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
                "uuid": "3f08f2da-9dbb-416c-9366-ae61a35071da"
              }
            ],
            "exits": [
              {
                "uuid": "2c786c1a-3495-4b49-b826-a0b6a30868da",
                "destination_uuid": "83f22aeb-c6cd-4d7e-bb00-226c60295971"
              }
            ]
          },
          {
            "uuid": "83f22aeb-c6cd-4d7e-bb00-226c60295971",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "faedde95-fe54-4806-bb7c-f8343a65d1dd",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "9d2b6e86-e388-477c-9c8b-e80f0f136774",
                  "type": "has_only_phrase",
                  "uuid": "85ea8561-9dbf-429d-baff-0a58d858652d"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "6e1e18c8-b266-44f1-96be-0841ac058109",
                  "type": "has_only_phrase",
                  "uuid": "5621052e-61dd-4387-84aa-c82cb595fda6"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "5eb42421-d4a0-4a66-9344-6a46f2e5b317",
                  "type": "has_only_phrase",
                  "uuid": "09850f27-74ec-4022-9499-929b7bb9a760"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1835ddd1-eb4d-4f53-b50e-bafcd862abbe",
                  "name": "All Responses",
                  "uuid": "faedde95-fe54-4806-bb7c-f8343a65d1dd"
                },
                {
                  "exit_uuid": "fe5dec54-7eed-4d4f-afc1-48095f47600b",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "9d2b6e86-e388-477c-9c8b-e80f0f136774"
                },
                {
                  "exit_uuid": "78e8c2d8-3b20-4b59-82db-b701abf85bbd",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "6e1e18c8-b266-44f1-96be-0841ac058109"
                },
                {
                  "exit_uuid": "07162e62-9989-4d6e-a687-75958fabafec",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "5eb42421-d4a0-4a66-9344-6a46f2e5b317"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1835ddd1-eb4d-4f53-b50e-bafcd862abbe",
                "destination_uuid": null
              },
              {
                "uuid": "fe5dec54-7eed-4d4f-afc1-48095f47600b",
                "destination_uuid": "f8df0d6a-8622-4b73-96e6-af0e621a138e"
              },
              {
                "uuid": "78e8c2d8-3b20-4b59-82db-b701abf85bbd",
                "destination_uuid": "fef21c29-dced-45c9-839f-731bb112cb63"
              },
              {
                "uuid": "07162e62-9989-4d6e-a687-75958fabafec",
                "destination_uuid": "c2d5639c-834b-4d56-aecb-415ddb09c9a1"
              }
            ]
          },
          {
            "uuid": "f8df0d6a-8622-4b73-96e6-af0e621a138e",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2fc37037-2b77-47ad-9142-2bff1245393b"
              }
            ],
            "exits": [
              {
                "uuid": "f567436d-2b60-46ad-a3c5-da782b6506e6",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "fef21c29-dced-45c9-839f-731bb112cb63",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d8de8b20-598a-426c-ba8c-d29a08d07784"
              }
            ],
            "exits": [
              {
                "uuid": "5c6d8271-0768-465c-b838-8c262b33d3af",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "c2d5639c-834b-4d56-aecb-415ddb09c9a1",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0871fb1a-7966-42b9-b3f5-2bd56c1e57a6"
              }
            ],
            "exits": [
              {
                "uuid": "142d87fc-5f57-4f31-a70b-300df0a2dc39",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "c3703670-a580-4646-83bd-54b80d3093db",
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
                "uuid": "8bd550e7-b401-4252-9850-2de4932dad34"
              }
            ],
            "exits": [
              {
                "uuid": "7bf343d7-de10-46ae-b5b3-fa371fac36f5",
                "destination_uuid": "3c66b325-0892-4eca-a575-b3e2363f7b82"
              }
            ]
          },
          {
            "uuid": "3c66b325-0892-4eca-a575-b3e2363f7b82",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a44adae4-855f-4902-8a9c-4f0b445a3580",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "ef3a74bf-beb4-41bf-a3c5-35a4f7e0b7ce",
                  "type": "has_only_phrase",
                  "uuid": "2c64ea7b-b717-4fd3-b9fb-97b694d53666"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "d3d0de08-2e62-4750-8d3b-8690e94e4cbe",
                  "type": "has_only_phrase",
                  "uuid": "c9a14f2e-7ca9-4e18-8552-52325953026d"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "ba6e5f66-ee67-4cef-8647-7e46260800e2",
                  "type": "has_only_phrase",
                  "uuid": "e1a72216-b6d8-4974-ab93-6b130bc027bc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9deda688-9121-4b93-b98e-b9dade8f67e8",
                  "name": "All Responses",
                  "uuid": "a44adae4-855f-4902-8a9c-4f0b445a3580"
                },
                {
                  "exit_uuid": "bd5e0265-4e36-45f0-9f77-9cdd08d0d731",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "ef3a74bf-beb4-41bf-a3c5-35a4f7e0b7ce"
                },
                {
                  "exit_uuid": "a0f130eb-b5bc-4cd3-a6c2-9e35f2a2a0e7",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "d3d0de08-2e62-4750-8d3b-8690e94e4cbe"
                },
                {
                  "exit_uuid": "d494aa8f-faea-4779-861a-91d1eadf578c",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "ba6e5f66-ee67-4cef-8647-7e46260800e2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9deda688-9121-4b93-b98e-b9dade8f67e8",
                "destination_uuid": null
              },
              {
                "uuid": "bd5e0265-4e36-45f0-9f77-9cdd08d0d731",
                "destination_uuid": "8c309185-b34a-4ebf-9078-58b826efbefe"
              },
              {
                "uuid": "a0f130eb-b5bc-4cd3-a6c2-9e35f2a2a0e7",
                "destination_uuid": "db7f9eec-a723-43dd-b11c-792ca4fb7c9e"
              },
              {
                "uuid": "d494aa8f-faea-4779-861a-91d1eadf578c",
                "destination_uuid": "9860e21c-8e25-4f7a-8f87-dd6eb87075b5"
              }
            ]
          },
          {
            "uuid": "8c309185-b34a-4ebf-9078-58b826efbefe",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f7e0104e-21ea-492d-aea6-4404474ec859"
              }
            ],
            "exits": [
              {
                "uuid": "aa0a5762-c9d1-4afd-9a56-a8b94cfddbbe",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "db7f9eec-a723-43dd-b11c-792ca4fb7c9e",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "edf5d76c-bcf3-4ef9-bd84-d8bc20224cb0"
              }
            ],
            "exits": [
              {
                "uuid": "c402d6c5-1aa6-4d16-9d5f-34aa10066b14",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "9860e21c-8e25-4f7a-8f87-dd6eb87075b5",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c25f7eda-5950-43cf-a47c-64c1cc5d642a"
              }
            ],
            "exits": [
              {
                "uuid": "e582a833-9ce5-4521-9c35-615daf6bcb84",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "fdd2f533-d682-41c5-b940-96c816f0ede8",
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
                "uuid": "250bdb52-815e-4f4d-8ff8-51806ffc1a47"
              }
            ],
            "exits": [
              {
                "uuid": "d9cf4408-be04-4065-93c1-c46852d748ea",
                "destination_uuid": "446269f5-b02e-436e-8e9e-4fc8f8d32951"
              }
            ]
          },
          {
            "uuid": "446269f5-b02e-436e-8e9e-4fc8f8d32951",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "446dbed1-45a2-4ebe-ba1d-325a1f3b297f",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "b6a3515c-72d9-431e-b408-4732266cca64",
                  "type": "has_only_phrase",
                  "uuid": "1ca0fc10-b97d-47e4-8200-becb53225698"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "77eb14e8-a452-4110-bed4-eeaa459becc8",
                  "type": "has_only_phrase",
                  "uuid": "d7d84fb3-3146-4a3c-97f2-45c7f416623f"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "feefe424-a7bb-4ffd-8758-228e5a8f4cfd",
                  "type": "has_only_phrase",
                  "uuid": "963d1679-0104-46fd-9f63-bf7124e4327e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "611dc19d-e580-40f9-a4c1-2aa5564c4746",
                  "name": "All Responses",
                  "uuid": "446dbed1-45a2-4ebe-ba1d-325a1f3b297f"
                },
                {
                  "exit_uuid": "7665e591-2166-4de6-a151-a5709f182545",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "b6a3515c-72d9-431e-b408-4732266cca64"
                },
                {
                  "exit_uuid": "a40d39d3-d299-4bb7-8991-5fc3d2ca800f",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "77eb14e8-a452-4110-bed4-eeaa459becc8"
                },
                {
                  "exit_uuid": "95a9531a-7104-45ae-a8b9-4b7e95ea1e31",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "feefe424-a7bb-4ffd-8758-228e5a8f4cfd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "611dc19d-e580-40f9-a4c1-2aa5564c4746",
                "destination_uuid": null
              },
              {
                "uuid": "7665e591-2166-4de6-a151-a5709f182545",
                "destination_uuid": "c181fdc4-46c4-4be0-9df6-4e5667e1bcee"
              },
              {
                "uuid": "a40d39d3-d299-4bb7-8991-5fc3d2ca800f",
                "destination_uuid": "9eb123b7-549d-41ad-bf6b-ba06acfd3640"
              },
              {
                "uuid": "95a9531a-7104-45ae-a8b9-4b7e95ea1e31",
                "destination_uuid": "9a1e6365-fed2-437a-a978-a394a0503ff5"
              }
            ]
          },
          {
            "uuid": "c181fdc4-46c4-4be0-9df6-4e5667e1bcee",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "341a1968-39e2-458c-8241-99bfdaba987f"
              }
            ],
            "exits": [
              {
                "uuid": "9690ddfc-0c3d-4c0d-8e50-b8118f44cbc1",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "9eb123b7-549d-41ad-bf6b-ba06acfd3640",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "32db15a0-eefa-49dd-a043-906a71ef8d3e"
              }
            ],
            "exits": [
              {
                "uuid": "4e581db8-31aa-42c5-a17c-045145507580",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "9a1e6365-fed2-437a-a978-a394a0503ff5",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "96c78ad0-bdb3-49c8-a3f8-694e5a86f935"
              }
            ],
            "exits": [
              {
                "uuid": "c2288fcb-eb00-46a5-a12e-30ce325a9931",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "1ae863cf-37a2-4fac-b395-061bb72bc657",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "fbf33c6f-634c-42b8-90ae-3f384aa5d98f"
              }
            ],
            "exits": [
              {
                "uuid": "54a83a41-0768-4c83-afd9-b960fa74b15a",
                "destination_uuid": "a8598eef-b805-4ce3-aab7-eaba4d0e7159"
              }
            ]
          },
          {
            "uuid": "a8598eef-b805-4ce3-aab7-eaba4d0e7159",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cbf1be75-e746-4665-8541-df6243bf2996",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "6ac641c1-36fd-48ef-988c-bccc23e3e568",
                  "type": "has_only_phrase",
                  "uuid": "4b090c34-8273-4357-a0b1-e5612430c5ad"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "685a32f1-0b75-4d36-a49e-8874ff6a1c6a",
                  "type": "has_only_phrase",
                  "uuid": "f72d962d-26fb-4d57-8438-e87c0d04731c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b4b5a05e-a4b6-4207-bb10-8bc5d090b7fd",
                  "name": "All Responses",
                  "uuid": "cbf1be75-e746-4665-8541-df6243bf2996"
                },
                {
                  "exit_uuid": "2b55d6e4-9aae-4be8-bc9e-0cf82fa4ba68",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "6ac641c1-36fd-48ef-988c-bccc23e3e568"
                },
                {
                  "exit_uuid": "9b630481-33ab-465a-ae52-8791ca392ece",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "685a32f1-0b75-4d36-a49e-8874ff6a1c6a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b4b5a05e-a4b6-4207-bb10-8bc5d090b7fd",
                "destination_uuid": null
              },
              {
                "uuid": "2b55d6e4-9aae-4be8-bc9e-0cf82fa4ba68",
                "destination_uuid": "14ebe14e-a9cf-4098-850a-d2c79bee944d"
              },
              {
                "uuid": "9b630481-33ab-465a-ae52-8791ca392ece",
                "destination_uuid": "501e17cf-e0e1-4b5d-ba90-595c3cd5fa89"
              }
            ]
          },
          {
            "uuid": "14ebe14e-a9cf-4098-850a-d2c79bee944d",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e85426d2-5260-4be3-9d44-cdade7d756f6"
              }
            ],
            "exits": [
              {
                "uuid": "5faf8446-1b47-416f-92c7-b16c261ea8f6",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "501e17cf-e0e1-4b5d-ba90-595c3cd5fa89",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5abe1392-079e-4864-8ab6-6ef680744816"
              }
            ],
            "exits": [
              {
                "uuid": "5fb9f80a-1d74-468a-83db-99c43964664a",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "e8b5c7cd-5445-499a-888a-94f337065dfe",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "17b1eded-b6a1-4718-b6fe-62af13578654"
              }
            ],
            "exits": [
              {
                "uuid": "f2ae84ca-fea2-4f44-be4f-cb426041fc0a",
                "destination_uuid": "d7f27abf-1ae0-485a-b1a2-de35674f6d92"
              }
            ]
          },
          {
            "uuid": "d7f27abf-1ae0-485a-b1a2-de35674f6d92",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0f4ea323-d882-493b-b76a-b62f49a7a64b",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "82b34865-67a6-4f99-b7d7-d4940c1a51a3",
                  "type": "has_only_phrase",
                  "uuid": "2cd90199-87ee-4e81-b9f2-62715e5c8c93"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "8f909086-c2a2-4d6d-a5ca-199b78f978c2",
                  "type": "has_only_phrase",
                  "uuid": "c15f6f9d-7dd2-46b9-942d-4a55ff24e72f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "51e34c02-0090-4ea4-a051-3fa128682362",
                  "name": "All Responses",
                  "uuid": "0f4ea323-d882-493b-b76a-b62f49a7a64b"
                },
                {
                  "exit_uuid": "0a467ba8-f4f3-47aa-bf07-e92d9732a2b6",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "82b34865-67a6-4f99-b7d7-d4940c1a51a3"
                },
                {
                  "exit_uuid": "c75fa91c-9663-462a-9327-29830f72a657",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "8f909086-c2a2-4d6d-a5ca-199b78f978c2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "51e34c02-0090-4ea4-a051-3fa128682362",
                "destination_uuid": null
              },
              {
                "uuid": "0a467ba8-f4f3-47aa-bf07-e92d9732a2b6",
                "destination_uuid": "f9cb24aa-5895-4d7e-bb67-432829f9c4a8"
              },
              {
                "uuid": "c75fa91c-9663-462a-9327-29830f72a657",
                "destination_uuid": "6d98a81b-55dc-46d1-9bc1-5510871f34b0"
              }
            ]
          },
          {
            "uuid": "f9cb24aa-5895-4d7e-bb67-432829f9c4a8",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e97e6bbf-239a-4e75-87e8-bfd1f125b931"
              }
            ],
            "exits": [
              {
                "uuid": "61738836-1f71-496b-83f0-2e637feb5e57",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "6d98a81b-55dc-46d1-9bc1-5510871f34b0",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d73ed8c4-75f9-40a0-99cc-953e60e7bdb2"
              }
            ],
            "exits": [
              {
                "uuid": "34a6de76-cf84-415b-80e2-013cef8ab725",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "14277e09-7451-46ba-aa4e-878489d8be3d",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "2fb07683-a80f-4724-a5df-468ba9e74087"
              }
            ],
            "exits": [
              {
                "uuid": "9141b2a1-452c-4a86-85f4-0c8bb6c99294",
                "destination_uuid": "1a6e35bb-423a-4434-8318-c390c364fb50"
              }
            ]
          },
          {
            "uuid": "1a6e35bb-423a-4434-8318-c390c364fb50",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fe68e35c-54f2-47c3-8c52-44d3a3849350",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "d23f1352-f24a-42dd-9934-e72290045a93",
                  "type": "has_only_phrase",
                  "uuid": "77f363c8-9f8a-43d6-83f6-8164ed8b90bd"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "cc3a1e18-9368-4ceb-beef-512ff62c89be",
                  "type": "has_only_phrase",
                  "uuid": "5244a275-e615-4f52-8aa8-0c68bd02d327"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ad9eb76a-8038-4632-9f27-49b9bcb40117",
                  "name": "All Responses",
                  "uuid": "fe68e35c-54f2-47c3-8c52-44d3a3849350"
                },
                {
                  "exit_uuid": "5244f59c-6b94-4264-93c9-cbf76ca39b94",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "d23f1352-f24a-42dd-9934-e72290045a93"
                },
                {
                  "exit_uuid": "d7156961-310e-4fdb-8050-b501155ac092",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "cc3a1e18-9368-4ceb-beef-512ff62c89be"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ad9eb76a-8038-4632-9f27-49b9bcb40117",
                "destination_uuid": null
              },
              {
                "uuid": "5244f59c-6b94-4264-93c9-cbf76ca39b94",
                "destination_uuid": "bb23daac-dd61-45b4-a5b5-c60c5441bdb3"
              },
              {
                "uuid": "d7156961-310e-4fdb-8050-b501155ac092",
                "destination_uuid": "2e473f74-ad85-4020-b9a8-2a5d73979087"
              }
            ]
          },
          {
            "uuid": "bb23daac-dd61-45b4-a5b5-c60c5441bdb3",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "a264b4b6-a0b9-4d64-9a10-3a805b34c022"
              }
            ],
            "exits": [
              {
                "uuid": "ca330d66-267f-4a7c-95cc-e9345ff3d097",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "2e473f74-ad85-4020-b9a8-2a5d73979087",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "53b665a7-1ee1-4965-8c4d-725b86222792"
              }
            ],
            "exits": [
              {
                "uuid": "a526fb30-6644-4eeb-9bd2-8c56fc4b955f",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "c281d3de-859a-4b86-9ebd-ad00727e430f",
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
                "uuid": "0a8170af-6d2b-4d66-8267-7e0ad51c1f21"
              }
            ],
            "exits": [
              {
                "uuid": "8a918074-864f-45fa-b77b-7bd7f68df063",
                "destination_uuid": "5fb9119f-e908-4415-a606-d4cadff80035"
              }
            ]
          },
          {
            "uuid": "5fb9119f-e908-4415-a606-d4cadff80035",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "050fc64d-76d3-485d-95cc-c266e0edaa16",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "11f17d57-c995-451b-9863-7f2482b43d41",
                  "type": "has_only_phrase",
                  "uuid": "50988348-4214-4a7f-bf69-267b3f847d88"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "152e8a37-6002-42af-97bc-55e9f44a29b1",
                  "type": "has_only_phrase",
                  "uuid": "d9941a8c-4f59-4a82-a51e-f4d5771911d7"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "1c23240d-6f54-4fbd-9141-1195f277936a",
                  "type": "has_only_phrase",
                  "uuid": "20e7d293-4bce-4fd4-bf65-ee23ccff117f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "58b32e2e-688d-459c-8118-e2edc96cb296",
                  "name": "All Responses",
                  "uuid": "050fc64d-76d3-485d-95cc-c266e0edaa16"
                },
                {
                  "exit_uuid": "0f79392c-e768-4de3-a1e3-1b3c3d0b02d0",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "11f17d57-c995-451b-9863-7f2482b43d41"
                },
                {
                  "exit_uuid": "9f7d008a-1528-4e3b-a9ed-64eb05650fc5",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "152e8a37-6002-42af-97bc-55e9f44a29b1"
                },
                {
                  "exit_uuid": "6fd76695-af1c-4258-9abb-14c45de3c7b2",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "1c23240d-6f54-4fbd-9141-1195f277936a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "58b32e2e-688d-459c-8118-e2edc96cb296",
                "destination_uuid": null
              },
              {
                "uuid": "0f79392c-e768-4de3-a1e3-1b3c3d0b02d0",
                "destination_uuid": "72dfa8bd-780e-4581-ae83-e02f519e43d0"
              },
              {
                "uuid": "9f7d008a-1528-4e3b-a9ed-64eb05650fc5",
                "destination_uuid": "4d7ac8dc-f25f-456b-b612-283e7bdf3a64"
              },
              {
                "uuid": "6fd76695-af1c-4258-9abb-14c45de3c7b2",
                "destination_uuid": "ce974075-fdaa-4f6b-a004-5036de10bede"
              }
            ]
          },
          {
            "uuid": "72dfa8bd-780e-4581-ae83-e02f519e43d0",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "87b1e6ab-b5b9-4b2d-9e42-1c820c905e86"
              }
            ],
            "exits": [
              {
                "uuid": "98ac0a70-ab61-4e76-a5d9-0b75bb6472a0",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "4d7ac8dc-f25f-456b-b612-283e7bdf3a64",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d164176a-94df-4fc5-ac02-a221be0ba9ba"
              }
            ],
            "exits": [
              {
                "uuid": "42739a19-640c-415e-95a4-1d0266a6d300",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "ce974075-fdaa-4f6b-a004-5036de10bede",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fe793083-bebd-4339-9f41-4d3008e1d574"
              }
            ],
            "exits": [
              {
                "uuid": "1cd0c6cc-4ada-4071-b201-cd1353e798dc",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "5233566c-21ad-40b2-a5ae-819d62a2fa3d",
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
                "uuid": "c3e293eb-51fa-4e49-8085-0172778cda8b"
              }
            ],
            "exits": [
              {
                "uuid": "ce4a3b1a-0f85-4085-8cbf-b374914e76d6",
                "destination_uuid": "ffa49b35-4ae7-4718-9f82-ca0c8bed3f95"
              }
            ]
          },
          {
            "uuid": "ffa49b35-4ae7-4718-9f82-ca0c8bed3f95",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7885e77b-dc73-4eb5-9a57-6bf03e2edee8",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "799a0bb1-928b-4883-acc3-95ff956c21ce",
                  "type": "has_only_phrase",
                  "uuid": "376b7fee-9fc2-41f5-855b-7c436d3af19e"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "293a31a7-587c-4384-809d-fd32bbc08df9",
                  "type": "has_only_phrase",
                  "uuid": "8f31f266-6c7f-497d-92da-8acf2b2eab95"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "3f49b38a-411b-4eed-b93f-f0f6fc3ed067",
                  "type": "has_only_phrase",
                  "uuid": "006f4e42-2a07-4600-8017-2b908b4520bb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0ceac3fe-331f-461d-94e4-7c6cf8950134",
                  "name": "All Responses",
                  "uuid": "7885e77b-dc73-4eb5-9a57-6bf03e2edee8"
                },
                {
                  "exit_uuid": "35a15793-4ae6-4a0d-9dd4-12aff11a5ebf",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "799a0bb1-928b-4883-acc3-95ff956c21ce"
                },
                {
                  "exit_uuid": "8b5c3f8c-dfe0-4026-b7bd-3e65972f4f5e",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "293a31a7-587c-4384-809d-fd32bbc08df9"
                },
                {
                  "exit_uuid": "f0ba0977-7a05-4748-b12a-204c6e2e0637",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "3f49b38a-411b-4eed-b93f-f0f6fc3ed067"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0ceac3fe-331f-461d-94e4-7c6cf8950134",
                "destination_uuid": null
              },
              {
                "uuid": "35a15793-4ae6-4a0d-9dd4-12aff11a5ebf",
                "destination_uuid": "06ed5085-4dad-45f7-9933-a0ca10bb68af"
              },
              {
                "uuid": "8b5c3f8c-dfe0-4026-b7bd-3e65972f4f5e",
                "destination_uuid": "7d8f3daf-0942-4c27-b3fd-d4aff9d9cd97"
              },
              {
                "uuid": "f0ba0977-7a05-4748-b12a-204c6e2e0637",
                "destination_uuid": "7fc1e8ed-fe77-48e4-aab4-4b97e8e564ab"
              }
            ]
          },
          {
            "uuid": "06ed5085-4dad-45f7-9933-a0ca10bb68af",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a3c62ec2-a157-4de2-a432-5fccafa5bd6f"
              }
            ],
            "exits": [
              {
                "uuid": "ff441fe7-f238-42ef-8f7c-068a8f8eaabb",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "7d8f3daf-0942-4c27-b3fd-d4aff9d9cd97",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "981031f8-1166-492d-89a4-78294b318c1f"
              }
            ],
            "exits": [
              {
                "uuid": "0f0dca27-2be8-4641-9f21-99b7c563079d",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "7fc1e8ed-fe77-48e4-aab4-4b97e8e564ab",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7d4be33c-ec29-4c04-9643-74b7f45fc092"
              }
            ],
            "exits": [
              {
                "uuid": "82f6151d-c77e-4324-8d8d-98ad14823ec1",
                "destination_uuid": "3531919d-0d74-4f36-bc3b-2862394a0765"
              }
            ]
          },
          {
            "uuid": "3531919d-0d74-4f36-bc3b-2862394a0765",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b8006365-a92c-4f4b-aece-8c4332fa6297",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "ca84e4a7-fcdc-4359-bd43-8635503d26f6",
                  "type": "has_only_phrase",
                  "uuid": "65289403-51ab-4486-8952-7b85fe65ed2e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0787f49b-130e-4245-939c-6a5bb9af5a7d",
                  "name": "All Responses",
                  "uuid": "b8006365-a92c-4f4b-aece-8c4332fa6297"
                },
                {
                  "exit_uuid": "d9130b1e-d79e-4add-a369-6ce5854d6332",
                  "name": "Next",
                  "uuid": "ca84e4a7-fcdc-4359-bd43-8635503d26f6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0787f49b-130e-4245-939c-6a5bb9af5a7d",
                "destination_uuid": null
              },
              {
                "uuid": "d9130b1e-d79e-4add-a369-6ce5854d6332",
                "destination_uuid": "5baed162-fe9a-4dc7-92ed-03b5aaaf5ce9"
              }
            ]
          },
          {
            "uuid": "5baed162-fe9a-4dc7-92ed-03b5aaaf5ce9",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "46b55ae1-3148-43e9-87e5-9072077a762d"
              }
            ],
            "exits": [
              {
                "uuid": "b31755f3-7b00-4c53-b747-dc7d42d3ab59",
                "destination_uuid": "a00e4097-cd3a-4d93-bfbf-99299d94d60a"
              }
            ]
          },
          {
            "uuid": "a00e4097-cd3a-4d93-bfbf-99299d94d60a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "737dcea7-ddb4-4576-8720-52a0c4745ef3",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "f66d2765-054d-461d-bbf2-1b2a59aa9f1f",
                  "type": "has_only_phrase",
                  "uuid": "16aed647-30dd-459e-b394-c1dfe1898d45"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "8004884e-f598-4ff5-bd37-ee81204638a0",
                  "type": "has_only_phrase",
                  "uuid": "7086ca80-ebb5-49d6-aae4-b6218fbfcbd5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "99b9782d-34f4-4ab8-aab8-6924996f64f2",
                  "name": "All Responses",
                  "uuid": "737dcea7-ddb4-4576-8720-52a0c4745ef3"
                },
                {
                  "exit_uuid": "599ff6f2-0648-4d35-ba9e-c1594dfae04a",
                  "name": "No",
                  "uuid": "f66d2765-054d-461d-bbf2-1b2a59aa9f1f"
                },
                {
                  "exit_uuid": "ab1887a0-7a03-489a-bc4d-f12c56047384",
                  "name": "Yes",
                  "uuid": "8004884e-f598-4ff5-bd37-ee81204638a0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "99b9782d-34f4-4ab8-aab8-6924996f64f2",
                "destination_uuid": null
              },
              {
                "uuid": "599ff6f2-0648-4d35-ba9e-c1594dfae04a",
                "destination_uuid": "6eeaee81-2191-43e7-a6ea-8eaadc7c2eae"
              },
              {
                "uuid": "ab1887a0-7a03-489a-bc4d-f12c56047384",
                "destination_uuid": "739ebb37-ed74-44d0-b0bd-7feb405992d6"
              }
            ]
          },
          {
            "uuid": "6eeaee81-2191-43e7-a6ea-8eaadc7c2eae",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2fda668d-e643-4067-a92b-65d652b11903"
              }
            ],
            "exits": [
              {
                "uuid": "a72a070e-b19f-45fe-846d-2461273e9dd4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "739ebb37-ed74-44d0-b0bd-7feb405992d6",
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
                "uuid": "fb131756-eb37-40ae-955a-03ce63cb4db8"
              }
            ],
            "exits": [
              {
                "uuid": "fafabce2-3a69-45c7-ba0b-a90bc9d22c25",
                "destination_uuid": "240b7172-6616-4f11-9357-5d2e433e8be8"
              }
            ]
          },
          {
            "uuid": "240b7172-6616-4f11-9357-5d2e433e8be8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3e5374e9-d334-40aa-9bf7-2571c91b7732",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "e165e68d-5069-4b4f-81d8-811d428921e6",
                  "type": "has_only_phrase",
                  "uuid": "858c42e6-86d7-474d-929a-347d4bb9ee68"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "a061f34e-ae06-41f2-8543-fee882897a8f",
                  "type": "has_only_phrase",
                  "uuid": "19790cd1-4f83-4b3c-af3e-9561da2c04b9"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "818f498d-d3e2-40d1-a3fe-e76ba50b5e3a",
                  "type": "has_only_phrase",
                  "uuid": "429079d8-86f5-4f4d-a773-82dcf43f066b"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "d0357002-481e-428f-945e-762a06de9dc3",
                  "type": "has_only_phrase",
                  "uuid": "960552f5-46d1-43a3-9373-31104795ebd8"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "7fa879a9-b8c3-4191-b254-4d22661cc24f",
                  "type": "has_only_phrase",
                  "uuid": "b6a3c7db-1a0b-4c5b-8a51-db55a12c01f5"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "d1776d55-4781-464b-9fe5-05759a49305d",
                  "type": "has_only_phrase",
                  "uuid": "2d266d17-6719-4188-bf87-fba2100cf953"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "8ce09f76-c11c-4917-a478-67dad76e35c2",
                  "type": "has_only_phrase",
                  "uuid": "17695ca8-a2e5-4cf8-b840-7adfe4ce1d4c"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "56d59db9-789b-4d92-9206-735f2795da6f",
                  "type": "has_only_phrase",
                  "uuid": "d8637b1c-ac83-4301-9290-81f848aa33e2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ab338eac-c774-4056-8e4b-a1df8a0afdb0",
                  "name": "All Responses",
                  "uuid": "3e5374e9-d334-40aa-9bf7-2571c91b7732"
                },
                {
                  "exit_uuid": "ad4a8a2c-10cf-450a-8135-0c7347cf9fb2",
                  "name": "I don’t have enough time",
                  "uuid": "e165e68d-5069-4b4f-81d8-811d428921e6"
                },
                {
                  "exit_uuid": "c3e2fa8d-e769-4d6f-afad-d044539e6481",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "a061f34e-ae06-41f2-8543-fee882897a8f"
                },
                {
                  "exit_uuid": "9d8492a7-5c14-4bd5-b1dc-88d594efe5eb",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "818f498d-d3e2-40d1-a3fe-e76ba50b5e3a"
                },
                {
                  "exit_uuid": "dbface33-e746-4bc2-8423-d3aaa47ce6bd",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "d0357002-481e-428f-945e-762a06de9dc3"
                },
                {
                  "exit_uuid": "5e61a9f9-c840-453e-9e03-222f86fc10e9",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "7fa879a9-b8c3-4191-b254-4d22661cc24f"
                },
                {
                  "exit_uuid": "fb5a7bc6-03ec-49fd-bec5-8ef631251c0c",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "d1776d55-4781-464b-9fe5-05759a49305d"
                },
                {
                  "exit_uuid": "f19c6e7e-98ba-4c7e-8b17-80240bbda8e0",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "8ce09f76-c11c-4917-a478-67dad76e35c2"
                },
                {
                  "exit_uuid": "c55e1eaa-a4bf-446e-8a2c-afc2e5cb53ab",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "56d59db9-789b-4d92-9206-735f2795da6f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ab338eac-c774-4056-8e4b-a1df8a0afdb0",
                "destination_uuid": null
              },
              {
                "uuid": "ad4a8a2c-10cf-450a-8135-0c7347cf9fb2",
                "destination_uuid": "1f375f33-bbc2-4a6b-bfff-54e65f09ac98"
              },
              {
                "uuid": "c3e2fa8d-e769-4d6f-afad-d044539e6481",
                "destination_uuid": "c3703670-a580-4646-83bd-54b80d3093db"
              },
              {
                "uuid": "9d8492a7-5c14-4bd5-b1dc-88d594efe5eb",
                "destination_uuid": "fdd2f533-d682-41c5-b940-96c816f0ede8"
              },
              {
                "uuid": "dbface33-e746-4bc2-8423-d3aaa47ce6bd",
                "destination_uuid": "1ae863cf-37a2-4fac-b395-061bb72bc657"
              },
              {
                "uuid": "5e61a9f9-c840-453e-9e03-222f86fc10e9",
                "destination_uuid": "e8b5c7cd-5445-499a-888a-94f337065dfe"
              },
              {
                "uuid": "fb5a7bc6-03ec-49fd-bec5-8ef631251c0c",
                "destination_uuid": "14277e09-7451-46ba-aa4e-878489d8be3d"
              },
              {
                "uuid": "f19c6e7e-98ba-4c7e-8b17-80240bbda8e0",
                "destination_uuid": "c281d3de-859a-4b86-9ebd-ad00727e430f"
              },
              {
                "uuid": "c55e1eaa-a4bf-446e-8a2c-afc2e5cb53ab",
                "destination_uuid": "5233566c-21ad-40b2-a5ae-819d62a2fa3d"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bd8dd1fc-0a55-4547-bd9b-97d857e8ff21",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "28b67702-0840-49b4-9332-92b7aaa95ee1",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "975e5fa9-c629-4e64-9a69-8912b438e840"
              }
            ],
            "exits": [
              {
                "uuid": "21e384d3-cd81-4809-8034-464383023ab5",
                "destination_uuid": "48cc3f77-1ef7-4821-bd44-d5324fd59333"
              }
            ]
          },
          {
            "uuid": "48cc3f77-1ef7-4821-bd44-d5324fd59333",
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
                "uuid": "ea35f47b-db1c-4154-973c-c73709a7cb6a"
              }
            ],
            "exits": [
              {
                "uuid": "d8238202-50ec-4176-9780-ad566ed0de7e",
                "destination_uuid": "f0011d8c-c0ea-47eb-84c2-50aa53ce6cfa"
              }
            ]
          },
          {
            "uuid": "f0011d8c-c0ea-47eb-84c2-50aa53ce6cfa",
            "actions": [],
            "exits": [
              {
                "uuid": "d84b7421-a266-4d3c-b977-14436dfaa3ba",
                "destination_uuid": "95056ec3-4d1e-4b18-8c99-23d73bd771d3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a08963cb-6787-4cbf-adb1-b3961d1e551f",
              "cases": [],
              "categories": [
                {
                  "uuid": "a08963cb-6787-4cbf-adb1-b3961d1e551f",
                  "name": "All Responses",
                  "exit_uuid": "d84b7421-a266-4d3c-b977-14436dfaa3ba"
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
            "uuid": "95056ec3-4d1e-4b18-8c99-23d73bd771d3",
            "actions": [
              {
                "uuid": "2f613992-ddee-4917-b809-c57bdfb23c48",
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
                "uuid": "70ea7454-63a8-43ff-95c6-26d5e34f7698",
                "destination_uuid": "0b37445d-9b7d-41de-b6cd-b3b35be6dc61"
              }
            ]
          },
          {
            "uuid": "0b37445d-9b7d-41de-b6cd-b3b35be6dc61",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "701fe606-0d46-4242-a40b-b7ad7f675e22"
              }
            ],
            "exits": [
              {
                "uuid": "041d2dab-5021-4aae-a841-d9f7bbd23fbf",
                "destination_uuid": "4ffba763-acde-4173-8876-9fa9b58ee5b2"
              }
            ]
          },
          {
            "uuid": "4ffba763-acde-4173-8876-9fa9b58ee5b2",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f5f94664-0833-4c75-a953-04c3e9861875"
              }
            ],
            "exits": [
              {
                "uuid": "e784520a-2e27-47ba-9963-af69a2e19b35",
                "destination_uuid": "f5ac3e68-bf76-4756-b6b8-6cf7015d6d27"
              }
            ]
          },
          {
            "uuid": "f5ac3e68-bf76-4756-b6b8-6cf7015d6d27",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3703ee1c-8587-4de9-ba29-e3ba2c2dfeba"
              }
            ],
            "exits": [
              {
                "uuid": "d2e6e2fd-2ecc-4082-af66-854323588b83",
                "destination_uuid": "0fbb261b-b870-4e34-a69e-b1195ca768fd"
              }
            ]
          },
          {
            "uuid": "0fbb261b-b870-4e34-a69e-b1195ca768fd",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "e84230fe-d7f4-4080-8b3c-8409621d05f8"
              }
            ],
            "exits": [
              {
                "uuid": "6325335c-4bf4-4f37-b31c-9580e041f0d2",
                "destination_uuid": "38e5daed-1516-46db-8131-4e973e435a6a"
              }
            ]
          },
          {
            "uuid": "38e5daed-1516-46db-8131-4e973e435a6a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "88471f43-b699-4380-954e-00d203d97570",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "bd883915-9a7b-47ce-84b9-aab3559cae4d",
                  "type": "has_only_phrase",
                  "uuid": "10249587-5f44-432d-9534-f1178a8118bb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "527c554f-48ab-4310-b51f-9b78e709680e",
                  "name": "All Responses",
                  "uuid": "88471f43-b699-4380-954e-00d203d97570"
                },
                {
                  "exit_uuid": "6c23a023-b232-4476-b9e1-5a34b8324c0c",
                  "name": "Let me hear your story",
                  "uuid": "bd883915-9a7b-47ce-84b9-aab3559cae4d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "527c554f-48ab-4310-b51f-9b78e709680e",
                "destination_uuid": null
              },
              {
                "uuid": "6c23a023-b232-4476-b9e1-5a34b8324c0c",
                "destination_uuid": "1ad6e719-dd9d-4bd6-89fa-e9b755c281cc"
              }
            ]
          },
          {
            "uuid": "1ad6e719-dd9d-4bd6-89fa-e9b755c281cc",
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
                "uuid": "b236e5aa-1781-4d9a-8558-5ddf70ce8915"
              }
            ],
            "exits": [
              {
                "uuid": "748907e2-d4d2-4358-80b0-032e7af71fcb",
                "destination_uuid": "db982841-ab8f-4be9-8ad7-23f87e95d14c"
              }
            ]
          },
          {
            "uuid": "db982841-ab8f-4be9-8ad7-23f87e95d14c",
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
                "uuid": "ad5f11c4-c950-4107-ab6d-a4bda5636ae2"
              }
            ],
            "exits": [
              {
                "uuid": "5bacef43-d6f7-4acd-bbd3-4dff90c9c40d",
                "destination_uuid": "5531330b-3add-4efe-b455-22cf5eaa05a3"
              }
            ]
          },
          {
            "uuid": "5531330b-3add-4efe-b455-22cf5eaa05a3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0b917979-479d-4e62-aa9b-0d7bf80b9905",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "df2736ac-dfc0-43a9-98f7-482bbf3adaff",
                  "type": "has_only_phrase",
                  "uuid": "4b79b8ce-a903-4fa3-8919-0f7912b6d8d2"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "1bde9cd3-6ca9-446b-a324-95d02f684894",
                  "type": "has_only_phrase",
                  "uuid": "bb5ba46a-7d80-4496-a787-a4dcc1cfaba0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "248bd9b0-8f3e-4c54-9c9a-fe65acc4babc",
                  "name": "All Responses",
                  "uuid": "0b917979-479d-4e62-aa9b-0d7bf80b9905"
                },
                {
                  "exit_uuid": "d6a08053-aec6-46ad-af0c-804b9d71431a",
                  "name": "Previous",
                  "uuid": "df2736ac-dfc0-43a9-98f7-482bbf3adaff"
                },
                {
                  "exit_uuid": "9e1b04fd-17a2-4d4f-bd8c-ebebe38fab61",
                  "name": "Next",
                  "uuid": "1bde9cd3-6ca9-446b-a324-95d02f684894"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "248bd9b0-8f3e-4c54-9c9a-fe65acc4babc",
                "destination_uuid": null
              },
              {
                "uuid": "d6a08053-aec6-46ad-af0c-804b9d71431a",
                "destination_uuid": "1ad6e719-dd9d-4bd6-89fa-e9b755c281cc"
              },
              {
                "uuid": "9e1b04fd-17a2-4d4f-bd8c-ebebe38fab61",
                "destination_uuid": "77907d15-2ac2-46cc-b7cb-7111759fc67d"
              }
            ]
          },
          {
            "uuid": "77907d15-2ac2-46cc-b7cb-7111759fc67d",
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
                "uuid": "8e433d3e-d45e-4926-a1dd-73ca3b38c24c"
              }
            ],
            "exits": [
              {
                "uuid": "da504500-bdab-49f9-9b75-7e70e7b748d4",
                "destination_uuid": "0e1525bb-00e1-4aa7-866f-ebe6f7b340e5"
              }
            ]
          },
          {
            "uuid": "0e1525bb-00e1-4aa7-866f-ebe6f7b340e5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a8cab9fb-c240-49f9-a2e7-627a2729c66f",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "84ae1fc5-a992-484f-ba89-af0f86dc9c15",
                  "type": "has_only_phrase",
                  "uuid": "94de26e0-e2d2-45a7-b1e7-64ae23165b91"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "dfc984de-b478-4a0d-956c-eeeb8a55d69f",
                  "type": "has_only_phrase",
                  "uuid": "e3d30312-9c1c-433e-b01f-6c1651320e9f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6cf04b91-f9c9-4ba1-9ca9-4bd1834a7462",
                  "name": "All Responses",
                  "uuid": "a8cab9fb-c240-49f9-a2e7-627a2729c66f"
                },
                {
                  "exit_uuid": "e59807dc-e836-4659-8a87-94b9da7c31f7",
                  "name": "Previous",
                  "uuid": "84ae1fc5-a992-484f-ba89-af0f86dc9c15"
                },
                {
                  "exit_uuid": "b2f64555-1d3f-49f5-8970-9b1e6711136b",
                  "name": "Next",
                  "uuid": "dfc984de-b478-4a0d-956c-eeeb8a55d69f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6cf04b91-f9c9-4ba1-9ca9-4bd1834a7462",
                "destination_uuid": null
              },
              {
                "uuid": "e59807dc-e836-4659-8a87-94b9da7c31f7",
                "destination_uuid": "db982841-ab8f-4be9-8ad7-23f87e95d14c"
              },
              {
                "uuid": "b2f64555-1d3f-49f5-8970-9b1e6711136b",
                "destination_uuid": "9fd27d2e-7268-4edc-843d-713de9f25306"
              }
            ]
          },
          {
            "uuid": "9fd27d2e-7268-4edc-843d-713de9f25306",
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
                "uuid": "7373b49e-170c-473f-8622-47b0ea2e1531"
              }
            ],
            "exits": [
              {
                "uuid": "99773817-7c65-4c32-8345-9ce71f5c9881",
                "destination_uuid": "89f6e3f6-d9f6-4556-a97f-82f93401b79d"
              }
            ]
          },
          {
            "uuid": "89f6e3f6-d9f6-4556-a97f-82f93401b79d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "dc9093c0-0098-4427-b2c6-bb1648e3fbf0",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "c8c80c76-11bf-4d0c-9645-53e04764f414",
                  "type": "has_only_phrase",
                  "uuid": "ca1f7942-f731-4f43-b2d2-1cb1a94f004a"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "58469c3c-8d71-4bea-9367-94c665651a6b",
                  "type": "has_only_phrase",
                  "uuid": "d1781644-aeb3-45d0-bac1-eb2ad5d25a45"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0a687d67-e7b2-45be-a407-9d5e9c624cdd",
                  "name": "All Responses",
                  "uuid": "dc9093c0-0098-4427-b2c6-bb1648e3fbf0"
                },
                {
                  "exit_uuid": "462eeebb-3b7c-452e-a17b-9d985778c5bb",
                  "name": "Previous",
                  "uuid": "c8c80c76-11bf-4d0c-9645-53e04764f414"
                },
                {
                  "exit_uuid": "1702286c-c2a4-4eb9-87f7-012c225b7da1",
                  "name": "Next",
                  "uuid": "58469c3c-8d71-4bea-9367-94c665651a6b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0a687d67-e7b2-45be-a407-9d5e9c624cdd",
                "destination_uuid": null
              },
              {
                "uuid": "462eeebb-3b7c-452e-a17b-9d985778c5bb",
                "destination_uuid": "77907d15-2ac2-46cc-b7cb-7111759fc67d"
              },
              {
                "uuid": "1702286c-c2a4-4eb9-87f7-012c225b7da1",
                "destination_uuid": "8b91e15c-45c9-4501-89c4-ab024f2d33b4"
              }
            ]
          },
          {
            "uuid": "8b91e15c-45c9-4501-89c4-ab024f2d33b4",
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
                "uuid": "0494e073-6ad1-46c3-811c-420fa7e739f0"
              }
            ],
            "exits": [
              {
                "uuid": "4d2c7d49-0474-4206-94d0-0a2d7df7d529",
                "destination_uuid": "f90fd504-8e23-4acb-97e8-03d37d7f3095"
              }
            ]
          },
          {
            "uuid": "f90fd504-8e23-4acb-97e8-03d37d7f3095",
            "actions": [],
            "exits": [
              {
                "uuid": "7cae7148-9106-4113-b071-567402e3f017",
                "destination_uuid": "52c2df32-ca83-4789-95a5-0405756a4e87"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b77461fc-6901-4d93-8685-b1276708a32a",
              "cases": [],
              "categories": [
                {
                  "uuid": "b77461fc-6901-4d93-8685-b1276708a32a",
                  "name": "All Responses",
                  "exit_uuid": "7cae7148-9106-4113-b071-567402e3f017"
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
            "uuid": "52c2df32-ca83-4789-95a5-0405756a4e87",
            "actions": [
              {
                "uuid": "a5badb96-1974-4dac-9cf1-d4b37bfd7815",
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
                "uuid": "908d06f4-793c-4ada-ae0a-3c8b1b84765b",
                "destination_uuid": "259623e5-814e-4800-a40d-58081000a695"
              }
            ]
          },
          {
            "uuid": "259623e5-814e-4800-a40d-58081000a695",
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
                "uuid": "38684838-348f-4580-8d70-2d95477068c9"
              }
            ],
            "exits": [
              {
                "uuid": "4dde0a7f-22ae-4dcc-8525-c2a3d79cda46",
                "destination_uuid": "c525b252-3a48-4726-9068-6c5b6c054f1e"
              }
            ]
          },
          {
            "uuid": "c525b252-3a48-4726-9068-6c5b6c054f1e",
            "actions": [],
            "exits": [
              {
                "uuid": "4371a5a2-e6ee-474e-868b-8121f096a111",
                "destination_uuid": "6e282554-5149-445d-88dc-897124866ec2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6adb8676-dd0b-4154-876f-a4de7d4d0011",
              "cases": [],
              "categories": [
                {
                  "uuid": "6adb8676-dd0b-4154-876f-a4de7d4d0011",
                  "name": "All Responses",
                  "exit_uuid": "4371a5a2-e6ee-474e-868b-8121f096a111"
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
            "uuid": "6e282554-5149-445d-88dc-897124866ec2",
            "actions": [
              {
                "uuid": "8a7cd7d5-8cdc-4de8-9186-aee9b25fddaa",
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
                "uuid": "1a3f7d21-b85c-4f55-90d6-4c218aa10606",
                "destination_uuid": "dda82279-a65c-4f25-8685-ce1ad22bb99d"
              }
            ]
          },
          {
            "uuid": "dda82279-a65c-4f25-8685-ce1ad22bb99d",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c8f9a18b-7f0e-4331-8c83-deb678307761"
              }
            ],
            "exits": [
              {
                "uuid": "e609907c-8eeb-47ba-8993-c21e9229a0ae",
                "destination_uuid": "21edc170-d67d-4c82-863e-409376a84cad"
              }
            ]
          },
          {
            "uuid": "21edc170-d67d-4c82-863e-409376a84cad",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "e22c85ee-cf27-452e-a1e9-f6b57ac77cc5"
              }
            ],
            "exits": [
              {
                "uuid": "b277c3f6-534c-4ad9-928c-c62fc605ed10",
                "destination_uuid": "b7bf2724-5161-487b-901e-0a9197753c6a"
              }
            ]
          },
          {
            "uuid": "b7bf2724-5161-487b-901e-0a9197753c6a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "18bee75f-40f5-4df3-ba84-cbc2bb3ddde2",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "aa392a08-c503-4f00-bcfa-53cdd1e41120",
                  "type": "has_only_phrase",
                  "uuid": "08cf7b9c-2b29-4bdc-a85e-42051cf25e07"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "cb852e01-1d93-4634-b413-6ea80aa2e578",
                  "type": "has_only_phrase",
                  "uuid": "50c822ac-1611-47b3-8300-edb9f2bf6eea"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fee71f1f-16ec-4de3-8c97-299fc2e3517d",
                  "name": "All Responses",
                  "uuid": "18bee75f-40f5-4df3-ba84-cbc2bb3ddde2"
                },
                {
                  "exit_uuid": "66c2cb58-0241-4d2e-a329-478ed7a19ee5",
                  "name": "Take me to Tips",
                  "uuid": "aa392a08-c503-4f00-bcfa-53cdd1e41120"
                },
                {
                  "exit_uuid": "519b16a2-a686-4347-a849-460c5bba0c25",
                  "name": "Take me to Homescreen",
                  "uuid": "cb852e01-1d93-4634-b413-6ea80aa2e578"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fee71f1f-16ec-4de3-8c97-299fc2e3517d",
                "destination_uuid": null
              },
              {
                "uuid": "66c2cb58-0241-4d2e-a329-478ed7a19ee5",
                "destination_uuid": "497793cb-5956-4239-bf41-fe373bca727a"
              },
              {
                "uuid": "519b16a2-a686-4347-a849-460c5bba0c25",
                "destination_uuid": "01a242a6-b62d-4e0f-9d55-c65c65b0c88f"
              }
            ]
          },
          {
            "uuid": "497793cb-5956-4239-bf41-fe373bca727a",
            "actions": [
              {
                "uuid": "1a24eb4a-bb5d-4223-b12f-40c9db730d44",
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
                "uuid": "521eb4ec-d731-4503-a133-11e0b21d8fc8",
                "destination_uuid": "67ca6c4e-d165-4368-b8c2-d2de7a44b163"
              }
            ]
          },
          {
            "uuid": "67ca6c4e-d165-4368-b8c2-d2de7a44b163",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "97dd43d7-14b7-4626-8125-428bf8f39036"
                },
                "type": "enter_flow",
                "uuid": "9ade8333-c323-49a2-9ace-6fc628df5ab6"
              }
            ],
            "exits": [
              {
                "uuid": "a8987423-b843-42bf-a481-4920c2e06a65",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "01a242a6-b62d-4e0f-9d55-c65c65b0c88f",
            "actions": [
              {
                "uuid": "a2950327-c6f4-43c1-9a57-424d8d8dbe9e",
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
                "uuid": "e931fb98-8028-4688-a1dc-cf7765514957",
                "destination_uuid": "f5001d11-4ef0-41c4-8e18-9079fa8b5cc9"
              }
            ]
          },
          {
            "uuid": "f5001d11-4ef0-41c4-8e18-9079fa8b5cc9",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "8b20aa57-bbb3-4ff8-8048-5112a445b719"
                },
                "type": "enter_flow",
                "uuid": "e6af5843-91f4-44b0-bf40-7c9f96afc18e"
              }
            ],
            "exits": [
              {
                "uuid": "539dd9e1-a369-4e98-ac9e-d02badc91d08",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a884367c-af16-44d1-9d82-da9151aa6575",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3d0f2b52-54ee-49a0-9a8b-d8b93e438727",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "853d8413-a73a-4ad9-acf6-95320f559ab9"
              }
            ],
            "exits": [
              {
                "uuid": "008991ff-d69a-45eb-a5d7-b16026a59e83",
                "destination_uuid": "b0819fec-596d-4ebf-ba62-4f4474d30b9d"
              }
            ]
          },
          {
            "uuid": "b0819fec-596d-4ebf-ba62-4f4474d30b9d",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "caf021d3-442c-4622-bdb7-235da17d42dc"
              }
            ],
            "exits": [
              {
                "uuid": "4da42036-47c4-45a8-861b-b0901e6e76d1",
                "destination_uuid": "45182f9f-806f-49a3-9f71-1432ffa9cb6a"
              }
            ]
          },
          {
            "uuid": "45182f9f-806f-49a3-9f71-1432ffa9cb6a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "10fa07ab-b8b9-434c-a159-db7102863721",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "6cead0f3-9c99-4b35-b3fc-0d1b6ee36189",
                  "type": "has_only_phrase",
                  "uuid": "691c42f6-8dcf-4861-bc9a-6f732d712560"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "7a95b175-3490-4e44-91e2-779ac4b3ccf2",
                  "type": "has_only_phrase",
                  "uuid": "e56ea1ec-3e34-446f-9153-28cd4070be45"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e3a6e9f8-7be8-47d4-99f7-0297410a57d1",
                  "name": "All Responses",
                  "uuid": "10fa07ab-b8b9-434c-a159-db7102863721"
                },
                {
                  "exit_uuid": "2320d28b-607d-4459-a3a0-209fe90c0cda",
                  "name": "Later",
                  "uuid": "6cead0f3-9c99-4b35-b3fc-0d1b6ee36189"
                },
                {
                  "exit_uuid": "fcdc6319-2ad7-4d9a-9671-be780b5d714f",
                  "name": "Yes",
                  "uuid": "7a95b175-3490-4e44-91e2-779ac4b3ccf2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e3a6e9f8-7be8-47d4-99f7-0297410a57d1",
                "destination_uuid": null
              },
              {
                "uuid": "2320d28b-607d-4459-a3a0-209fe90c0cda",
                "destination_uuid": "2c6e3658-56dc-48dc-82de-c8cf9a420328"
              },
              {
                "uuid": "fcdc6319-2ad7-4d9a-9671-be780b5d714f",
                "destination_uuid": "4ed635ec-37af-47e6-b3a6-a46730715360"
              }
            ]
          },
          {
            "uuid": "2c6e3658-56dc-48dc-82de-c8cf9a420328",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "2d86806a-457d-4fc5-994c-fe7dc75c6e03"
                },
                "type": "enter_flow",
                "uuid": "4952c5bf-10a7-4505-ad11-aa8cf00cf0e6"
              }
            ],
            "exits": [
              {
                "uuid": "f39bb10a-e152-4843-ac2f-0cd8b9ce7625",
                "destination_uuid": null
              },
              {
                "uuid": "8843aae6-1cb0-4387-9ced-27f793c5bcff",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b4663b83-cfe3-423d-a1d0-4346f7c0a209",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "10110f88-2402-4b7f-8325-7b705e6bb71c"
                },
                {
                  "uuid": "2e30cc31-122b-4c2f-82fb-31d5e0bccf08",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0482ef25-75d1-40f5-80a8-11166d6e1277"
                }
              ],
              "categories": [
                {
                  "uuid": "10110f88-2402-4b7f-8325-7b705e6bb71c",
                  "name": "Complete",
                  "exit_uuid": "f39bb10a-e152-4843-ac2f-0cd8b9ce7625"
                },
                {
                  "uuid": "0482ef25-75d1-40f5-80a8-11166d6e1277",
                  "name": "Expired",
                  "exit_uuid": "8843aae6-1cb0-4387-9ced-27f793c5bcff"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "10110f88-2402-4b7f-8325-7b705e6bb71c"
            }
          },
          {
            "uuid": "4ed635ec-37af-47e6-b3a6-a46730715360",
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
                "uuid": "398ae85d-ceea-4345-b801-5871125ffa07"
              }
            ],
            "exits": [
              {
                "uuid": "1e3ccc2f-9d83-42e2-8e97-4568f00c14db",
                "destination_uuid": "26d4170c-a62a-4cb0-be98-7dd712155dc8"
              }
            ]
          },
          {
            "uuid": "26d4170c-a62a-4cb0-be98-7dd712155dc8",
            "actions": [],
            "exits": [
              {
                "uuid": "0282e7ff-7bbf-49f1-b37a-0a2bf4ba6bfa",
                "destination_uuid": "90d30106-d39b-42b6-9450-bd0c7003b16b"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9fe07f32-8c4d-4787-81ab-e7da11b875e4",
              "cases": [],
              "categories": [
                {
                  "uuid": "9fe07f32-8c4d-4787-81ab-e7da11b875e4",
                  "name": "All Responses",
                  "exit_uuid": "0282e7ff-7bbf-49f1-b37a-0a2bf4ba6bfa"
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
            "uuid": "90d30106-d39b-42b6-9450-bd0c7003b16b",
            "actions": [
              {
                "uuid": "85bd2c15-502b-4913-a55a-7e0b1b468d25",
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
                "uuid": "6baab457-f3df-42df-9e58-1cb911ae8381",
                "destination_uuid": "d108f93f-f423-4c72-8057-f2a349f9f69a"
              }
            ]
          },
          {
            "uuid": "d108f93f-f423-4c72-8057-f2a349f9f69a",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "535f04a5-3ece-4f97-a600-64cce0567d6f"
              }
            ],
            "exits": [
              {
                "uuid": "fab96729-0f5e-4ea6-b487-dc9d6e06a1e0",
                "destination_uuid": "63c9aeb2-39b5-4766-8096-e2e09e59aa07"
              }
            ]
          },
          {
            "uuid": "63c9aeb2-39b5-4766-8096-e2e09e59aa07",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "61633711-22b0-4a25-8dbc-0631f26e7a50",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "593bc282-dc07-4232-868c-6d695187ce88",
                  "type": "has_only_phrase",
                  "uuid": "d7c8c6e8-b068-41ad-8e7e-4145e7c2029c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d47b8865-4743-4791-aa4e-88f9127688e8",
                  "name": "All Responses",
                  "uuid": "61633711-22b0-4a25-8dbc-0631f26e7a50"
                },
                {
                  "exit_uuid": "d307f424-4a27-4706-8391-f3cf04a7b6cc",
                  "name": "Click here when done",
                  "uuid": "593bc282-dc07-4232-868c-6d695187ce88"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d47b8865-4743-4791-aa4e-88f9127688e8",
                "destination_uuid": null
              },
              {
                "uuid": "d307f424-4a27-4706-8391-f3cf04a7b6cc",
                "destination_uuid": "aa219129-559e-4d8c-898f-3a05e172d3f8"
              }
            ]
          },
          {
            "uuid": "aa219129-559e-4d8c-898f-3a05e172d3f8",
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
                "uuid": "bdca0132-67e6-417a-bfb2-440ab5633ece"
              }
            ],
            "exits": [
              {
                "uuid": "e622aafb-e1f5-4045-8c06-4e31a09ec59a",
                "destination_uuid": "a9f9f3bb-e355-4fee-a1c5-2d4e7c8556cf"
              }
            ]
          },
          {
            "uuid": "a9f9f3bb-e355-4fee-a1c5-2d4e7c8556cf",
            "actions": [],
            "exits": [
              {
                "uuid": "9b2bc069-0e3b-4968-b891-7165cd96fcf2",
                "destination_uuid": "310a8066-b8c8-4dc7-b8ec-db644edec52c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6099a2ef-1cb1-40d8-8ceb-1727a2815716",
              "cases": [],
              "categories": [
                {
                  "uuid": "6099a2ef-1cb1-40d8-8ceb-1727a2815716",
                  "name": "All Responses",
                  "exit_uuid": "9b2bc069-0e3b-4968-b891-7165cd96fcf2"
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
            "uuid": "310a8066-b8c8-4dc7-b8ec-db644edec52c",
            "actions": [
              {
                "uuid": "72632ca0-e1c0-4f77-be4a-9c722f34eb60",
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
                "uuid": "0761157f-6f63-466d-821e-376c77854a53",
                "destination_uuid": "6ae03db3-4c33-4261-bc96-428ee40fd52e"
              }
            ]
          },
          {
            "uuid": "6ae03db3-4c33-4261-bc96-428ee40fd52e",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "4433a4ee-094d-4a00-bc81-6c0ca44e7512"
              }
            ],
            "exits": [
              {
                "uuid": "2094d817-edcb-4f21-9bcc-a3a123323652",
                "destination_uuid": "db0cf201-7bbc-4736-b8ee-ef0014c9de7a"
              }
            ]
          },
          {
            "uuid": "db0cf201-7bbc-4736-b8ee-ef0014c9de7a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bfcec8c4-4617-4b5c-b3da-e6a740bac2af",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "18176a77-2638-4245-ad30-42626d352de6",
                  "type": "has_only_phrase",
                  "uuid": "a1fe8df2-3158-4e9a-bf3f-cca883e462e1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "de0570d7-5e6b-4a1d-b12b-ef81cec4f590",
                  "name": "All Responses",
                  "uuid": "bfcec8c4-4617-4b5c-b3da-e6a740bac2af"
                },
                {
                  "exit_uuid": "57223d0c-f589-42f6-b14d-d9dd4786ca72",
                  "name": "Click here when done",
                  "uuid": "18176a77-2638-4245-ad30-42626d352de6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "de0570d7-5e6b-4a1d-b12b-ef81cec4f590",
                "destination_uuid": null
              },
              {
                "uuid": "57223d0c-f589-42f6-b14d-d9dd4786ca72",
                "destination_uuid": "cdf140a7-43a3-4787-b350-94febd6ff1c8"
              }
            ]
          },
          {
            "uuid": "cdf140a7-43a3-4787-b350-94febd6ff1c8",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "81310bfb-8219-47b4-a8cc-eee2f9415519"
              }
            ],
            "exits": [
              {
                "uuid": "484b80f6-3aa9-4bab-ac13-88c1f2e5804c",
                "destination_uuid": "51e3475e-1aab-44e8-8b3b-4be3b85e5299"
              }
            ]
          },
          {
            "uuid": "51e3475e-1aab-44e8-8b3b-4be3b85e5299",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1ed879fd-8c0c-49a2-b261-84e9487f96cc"
              }
            ],
            "exits": [
              {
                "uuid": "5e1e5b35-2808-4583-ba28-cff161dfb852",
                "destination_uuid": "9f6d1790-04ae-4343-a7b6-522a8dc07e47"
              }
            ]
          },
          {
            "uuid": "9f6d1790-04ae-4343-a7b6-522a8dc07e47",
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
                "uuid": "cd70c7a6-1e2c-42e2-8eb1-06288efcc621"
              }
            ],
            "exits": [
              {
                "uuid": "dd89ee38-ffc5-4d82-9979-d753510b2725",
                "destination_uuid": "13395d3e-2bd0-4776-8883-a3afadb8e2f2"
              }
            ]
          },
          {
            "uuid": "13395d3e-2bd0-4776-8883-a3afadb8e2f2",
            "actions": [],
            "exits": [
              {
                "uuid": "cd219ff6-19af-4dee-910f-df1244ac902d",
                "destination_uuid": "f22597e4-8c15-4a50-b2b3-6523b5048d70"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "45757a88-a774-4dd1-9817-039da4cbbdd7",
              "cases": [],
              "categories": [
                {
                  "uuid": "45757a88-a774-4dd1-9817-039da4cbbdd7",
                  "name": "All Responses",
                  "exit_uuid": "cd219ff6-19af-4dee-910f-df1244ac902d"
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
            "uuid": "f22597e4-8c15-4a50-b2b3-6523b5048d70",
            "actions": [
              {
                "uuid": "52bc3efe-0a43-4b00-9448-95f027e8f781",
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
                "uuid": "ffb1f215-00ab-4101-a71f-730d3221c960",
                "destination_uuid": "8b42f5dd-839a-4023-91a1-e1f712348468"
              }
            ]
          },
          {
            "uuid": "8b42f5dd-839a-4023-91a1-e1f712348468",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "9e1aba11-9953-496f-bbfc-a4e4a54cf08a"
              }
            ],
            "exits": [
              {
                "uuid": "13f41341-ce5b-41de-be55-e848f7a11f73",
                "destination_uuid": "645fb66f-18f8-4024-8897-b92b4cb177ac"
              }
            ]
          },
          {
            "uuid": "645fb66f-18f8-4024-8897-b92b4cb177ac",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ce9b6ea9-8f4c-4bf4-9a84-9d7bc70863e4",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "eaa0c2e7-77b8-4212-a458-79439b77299c",
                  "type": "has_only_phrase",
                  "uuid": "e2f07dff-d3fd-475b-a6a0-bef47ccdeb88"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dd55844f-7c88-4cfd-ab53-c537dece02a4",
                  "name": "All Responses",
                  "uuid": "ce9b6ea9-8f4c-4bf4-9a84-9d7bc70863e4"
                },
                {
                  "exit_uuid": "d3c18074-5356-460c-b8c6-7473c2d5bad9",
                  "name": "Take me to Homescreen",
                  "uuid": "eaa0c2e7-77b8-4212-a458-79439b77299c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "dd55844f-7c88-4cfd-ab53-c537dece02a4",
                "destination_uuid": null
              },
              {
                "uuid": "d3c18074-5356-460c-b8c6-7473c2d5bad9",
                "destination_uuid": "6cf35a1a-bf58-49e1-80b4-0e8f418f75b9"
              }
            ]
          },
          {
            "uuid": "6cf35a1a-bf58-49e1-80b4-0e8f418f75b9",
            "actions": [
              {
                "uuid": "58ed7ce8-3dc9-4ed8-8b05-492d3ace373a",
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
                "uuid": "84cf413b-9a48-4618-9ec5-acda9f35a86e",
                "destination_uuid": "2c84d1b1-2ec4-4e15-9cec-3283dc7312fc"
              }
            ]
          },
          {
            "uuid": "2c84d1b1-2ec4-4e15-9cec-3283dc7312fc",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "8960f161-5a3d-41f1-a2b3-4ffce2659a92"
                },
                "type": "enter_flow",
                "uuid": "ef153c29-fcbf-4d0f-9841-2ca99394381b"
              }
            ],
            "exits": [
              {
                "uuid": "bbcc8ed2-08a8-4321-8cc2-667f04aa77db",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "2912f1b4-e56c-4952-8776-5cf2e9d8522a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2e5034a3-980b-43b9-8825-4db61d4087b6",
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
                "uuid": "580b150b-9944-4c30-b79a-b3a198fc07e2"
              }
            ],
            "exits": [
              {
                "uuid": "57f730fa-8033-443d-80ca-3be48c274e9d",
                "destination_uuid": "c2d30f43-f300-499a-89cb-b5e9bbb5efac"
              }
            ]
          },
          {
            "uuid": "c2d30f43-f300-499a-89cb-b5e9bbb5efac",
            "actions": [],
            "exits": [
              {
                "uuid": "7f6d0c13-566d-4ad0-aae2-247cef3da9e1",
                "destination_uuid": "5456cfbe-4565-4723-a47f-d4718834232f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c33e5f54-bc3d-4250-a0f1-237789f35d9b",
              "cases": [],
              "categories": [
                {
                  "uuid": "c33e5f54-bc3d-4250-a0f1-237789f35d9b",
                  "name": "All Responses",
                  "exit_uuid": "7f6d0c13-566d-4ad0-aae2-247cef3da9e1"
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
            "uuid": "5456cfbe-4565-4723-a47f-d4718834232f",
            "actions": [
              {
                "uuid": "ba58aa97-c6bf-4847-bf7e-01e6721d06b1",
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
                "uuid": "6dfbca63-9ed0-4266-92d1-a097e4815e40",
                "destination_uuid": "3e2a2a24-2382-46e1-8386-48785e7c4e62"
              }
            ]
          },
          {
            "uuid": "3e2a2a24-2382-46e1-8386-48785e7c4e62",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4f95e275-ceaf-4d42-acae-b18898980069",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "a1b021ef-6d21-4de9-a9e2-ba646fd49981",
                  "type": "has_only_phrase",
                  "uuid": "d5b4fef1-7efc-4099-a001-cca1a0eeb5a0"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "1b9e5817-772f-4977-abb2-23d2a7e74a0a",
                  "type": "has_only_phrase",
                  "uuid": "0b26a8ed-612e-4d97-8e43-3727f47fd603"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "1b9e5817-772f-4977-abb2-23d2a7e74a0a",
                  "type": "has_only_phrase",
                  "uuid": "195f1729-4e85-475b-9f63-86aebabeb924"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "79d28059-caa0-45f5-a16c-9771842f1cce",
                  "name": "All Responses",
                  "uuid": "4f95e275-ceaf-4d42-acae-b18898980069"
                },
                {
                  "exit_uuid": "11d0db7b-7676-4772-be80-e59d27b6032a",
                  "name": "Great",
                  "uuid": "a1b021ef-6d21-4de9-a9e2-ba646fd49981"
                },
                {
                  "exit_uuid": "c9e24531-836d-4527-8511-d2a6fcd5d2ee",
                  "name": "Neutral; Bad",
                  "uuid": "1b9e5817-772f-4977-abb2-23d2a7e74a0a"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "79d28059-caa0-45f5-a16c-9771842f1cce",
                "destination_uuid": null
              },
              {
                "uuid": "11d0db7b-7676-4772-be80-e59d27b6032a",
                "destination_uuid": "9f0955d4-7dff-425d-b347-3e5378f13b0e"
              },
              {
                "uuid": "c9e24531-836d-4527-8511-d2a6fcd5d2ee",
                "destination_uuid": "eab32b97-5ff2-47be-ab05-c8a427041030"
              }
            ]
          },
          {
            "uuid": "9f0955d4-7dff-425d-b347-3e5378f13b0e",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "bfe9d69e-45b7-43de-8939-4a26cfda2ca8"
              }
            ],
            "exits": [
              {
                "uuid": "02c007a6-413e-4be6-9b52-4b5c643eb5bf",
                "destination_uuid": "71031966-fbaf-4cf2-bb83-def737e9d74a"
              }
            ]
          },
          {
            "uuid": "eab32b97-5ff2-47be-ab05-c8a427041030",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "6ada7d60-620b-4dc6-926d-c6038b35a141"
              }
            ],
            "exits": [
              {
                "uuid": "8ef90fad-f38f-4ff2-a855-948d1d6d9047",
                "destination_uuid": "c74d33e5-1628-4340-aa3c-130a46b0b4bb"
              }
            ]
          },
          {
            "uuid": "c74d33e5-1628-4340-aa3c-130a46b0b4bb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "388d3b89-38bd-469d-8896-e21dcd7cd5d9",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "b267ef51-e035-4886-a7d4-016a129842dd",
                  "type": "has_only_phrase",
                  "uuid": "93dc7046-bbfb-402d-9ffd-9eb260e4d2aa"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "0944e31e-1d3e-4db6-853b-6532e5d1d227",
                  "type": "has_only_phrase",
                  "uuid": "317b4d88-6a74-47cc-bcbb-5476b9daed43"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "87e96f4b-9442-47fb-b732-cb18e4521d65",
                  "name": "All Responses",
                  "uuid": "388d3b89-38bd-469d-8896-e21dcd7cd5d9"
                },
                {
                  "exit_uuid": "447b9543-b98c-46ee-8dba-28911c2b7198",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "b267ef51-e035-4886-a7d4-016a129842dd"
                },
                {
                  "exit_uuid": "7373d3fd-f7f0-4399-8f0a-fe18a39087f5",
                  "name": "Continue",
                  "uuid": "0944e31e-1d3e-4db6-853b-6532e5d1d227"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "87e96f4b-9442-47fb-b732-cb18e4521d65",
                "destination_uuid": null
              },
              {
                "uuid": "447b9543-b98c-46ee-8dba-28911c2b7198",
                "destination_uuid": "48b2f4e6-6228-43d7-a3eb-480afc6ba299"
              },
              {
                "uuid": "7373d3fd-f7f0-4399-8f0a-fe18a39087f5",
                "destination_uuid": "60ac2039-62cc-4aaa-a17e-d9a6c769c477"
              }
            ]
          },
          {
            "uuid": "48b2f4e6-6228-43d7-a3eb-480afc6ba299",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "8473efbd-5a8b-4ede-a937-318945dc288a"
                },
                "type": "enter_flow",
                "uuid": "f745c7c8-dae3-4804-a8e3-1e05ca35003c"
              }
            ],
            "exits": [
              {
                "uuid": "21f00810-ebda-413f-b47b-952eeeec2133",
                "destination_uuid": "4ceff013-88cf-48f0-878f-6d0e2190bbd3"
              },
              {
                "uuid": "b2332fc2-8599-4f25-81dc-e0a35ced3659",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "3ddda9a4-6d5f-478f-908b-1199c0aa2615",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "60036128-f9c4-47d2-b0df-9de0c05c7314"
                },
                {
                  "uuid": "1333422e-a79e-4405-a4ad-044351ae6a73",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d9b553f1-235e-4b3a-9ffe-87aa248fde23"
                }
              ],
              "categories": [
                {
                  "uuid": "60036128-f9c4-47d2-b0df-9de0c05c7314",
                  "name": "Complete",
                  "exit_uuid": "21f00810-ebda-413f-b47b-952eeeec2133"
                },
                {
                  "uuid": "d9b553f1-235e-4b3a-9ffe-87aa248fde23",
                  "name": "Expired",
                  "exit_uuid": "b2332fc2-8599-4f25-81dc-e0a35ced3659"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "60036128-f9c4-47d2-b0df-9de0c05c7314"
            }
          },
          {
            "uuid": "71031966-fbaf-4cf2-bb83-def737e9d74a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cf90ef2d-83f9-424d-9882-01274eac58a8",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "7221eff6-d942-41fc-9054-fced90a29164",
                  "type": "has_only_phrase",
                  "uuid": "3fab7141-b050-429b-aac7-d5062ed676c7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b1e2989e-982c-4ca0-89da-636bf679992d",
                  "name": "All Responses",
                  "uuid": "cf90ef2d-83f9-424d-9882-01274eac58a8"
                },
                {
                  "exit_uuid": "13605bed-ccaa-405d-9712-13f553c64d01",
                  "name": "Go to Praise check-in",
                  "uuid": "7221eff6-d942-41fc-9054-fced90a29164"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b1e2989e-982c-4ca0-89da-636bf679992d",
                "destination_uuid": null
              },
              {
                "uuid": "13605bed-ccaa-405d-9712-13f553c64d01",
                "destination_uuid": "96578310-c419-428d-8420-1a1bbc390302"
              }
            ]
          },
          {
            "uuid": "96578310-c419-428d-8420-1a1bbc390302",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "ef26093c-e787-4971-afc1-d5ff7ef625f5"
              }
            ],
            "exits": [
              {
                "uuid": "db83578f-083f-4112-837f-df8c54ba91fb",
                "destination_uuid": "573d0da8-d10c-45f1-876a-5c54f58775bd"
              }
            ]
          },
          {
            "uuid": "60ac2039-62cc-4aaa-a17e-d9a6c769c477",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "cfe86f6e-ebb0-4603-a38d-0928a243c29e"
              }
            ],
            "exits": [
              {
                "uuid": "93950026-ea68-43f9-b9c6-0e2c0b3a5d26",
                "destination_uuid": "573d0da8-d10c-45f1-876a-5c54f58775bd"
              }
            ]
          },
          {
            "uuid": "4ceff013-88cf-48f0-878f-6d0e2190bbd3",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "3ca3719f-6189-47af-9837-0eba1aa19f1a"
              }
            ],
            "exits": [
              {
                "uuid": "ec48417b-bb29-4761-97f6-82987c180e28",
                "destination_uuid": "573d0da8-d10c-45f1-876a-5c54f58775bd"
              }
            ]
          },
          {
            "uuid": "573d0da8-d10c-45f1-876a-5c54f58775bd",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c4789ce1-f008-4c90-8f3d-f9bed204145d",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "c6d9e432-de0c-4ee8-b651-7b2963b3b4ae",
                  "type": "has_only_phrase",
                  "uuid": "ef19fd20-7f1c-48c6-8640-bec82a81e3f4"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "c77b2609-fc22-49ff-ad03-75158583f5e4",
                  "type": "has_only_phrase",
                  "uuid": "67410416-10a5-497c-9906-dcb434c64fa4"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "cd553221-d3ef-4db7-9001-671826b3ab71",
                  "type": "has_only_phrase",
                  "uuid": "5c5ac754-5c49-42be-b2ca-1f51ab124bbe"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "7b042b31-02f8-4777-a6f4-0bf6c8a1bbd4",
                  "type": "has_only_phrase",
                  "uuid": "f5f0516d-d249-4d0a-bc1d-ffecf28efcbb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7553168b-990f-4cad-8322-ef6a065fd365",
                  "name": "All Responses",
                  "uuid": "c4789ce1-f008-4c90-8f3d-f9bed204145d"
                },
                {
                  "exit_uuid": "aef0697a-e78f-46cd-a28c-524fbf44df97",
                  "name": "No",
                  "uuid": "c6d9e432-de0c-4ee8-b651-7b2963b3b4ae"
                },
                {
                  "exit_uuid": "70df7bd7-13b4-49c1-88a4-106d5d1e7058",
                  "name": "Yes",
                  "uuid": "c77b2609-fc22-49ff-ad03-75158583f5e4"
                },
                {
                  "exit_uuid": "592c979e-2714-4de8-87c9-5e619ba151db",
                  "name": "Yes",
                  "uuid": "cd553221-d3ef-4db7-9001-671826b3ab71"
                },
                {
                  "exit_uuid": "7abc611c-7da4-4038-a693-bf4ed0561086",
                  "name": "Yes",
                  "uuid": "7b042b31-02f8-4777-a6f4-0bf6c8a1bbd4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7553168b-990f-4cad-8322-ef6a065fd365",
                "destination_uuid": null
              },
              {
                "uuid": "aef0697a-e78f-46cd-a28c-524fbf44df97",
                "destination_uuid": "81c825a4-2359-4b87-a6ae-8e044d6b5427"
              },
              {
                "uuid": "70df7bd7-13b4-49c1-88a4-106d5d1e7058",
                "destination_uuid": "120a6427-1587-4fb0-8d86-150dd55c7787"
              },
              {
                "uuid": "592c979e-2714-4de8-87c9-5e619ba151db",
                "destination_uuid": "120a6427-1587-4fb0-8d86-150dd55c7787"
              },
              {
                "uuid": "7abc611c-7da4-4038-a693-bf4ed0561086",
                "destination_uuid": "120a6427-1587-4fb0-8d86-150dd55c7787"
              }
            ]
          },
          {
            "uuid": "81c825a4-2359-4b87-a6ae-8e044d6b5427",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5837f473-62a6-4ec4-ad66-acb888e3355f"
              }
            ],
            "exits": [
              {
                "uuid": "adfd8037-8acd-4410-b01e-6254f8ed6772",
                "destination_uuid": "7a7cfd47-37ae-4251-bdff-e8c9e2cf6348"
              }
            ]
          },
          {
            "uuid": "120a6427-1587-4fb0-8d86-150dd55c7787",
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
                "uuid": "69363af9-f9ae-42d3-aeb6-33087d644f74"
              }
            ],
            "exits": [
              {
                "uuid": "1902290b-e447-42c0-b7da-417b9bd20b0d",
                "destination_uuid": "8f9dd2ec-9597-4c1a-b26a-eb8cf36e4d86"
              }
            ]
          },
          {
            "uuid": "8f9dd2ec-9597-4c1a-b26a-eb8cf36e4d86",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "69cabd8d-1dc6-4505-9c9e-269067461fbc",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "ff3a61e1-21cc-44e2-b20e-2622bb0992f6",
                  "type": "has_only_phrase",
                  "uuid": "06cc5f28-fd00-4707-b512-3453e6336310"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "d00913a4-7abd-4f0d-8d94-588937f0f21f",
                  "type": "has_only_phrase",
                  "uuid": "649c1d0c-f9f6-4675-8d98-41ee89d6b9fc"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "098a0c8f-640f-4fc9-be74-ffd208fe11a1",
                  "type": "has_only_phrase",
                  "uuid": "42718310-db04-4545-89c6-cb2071cfd63d"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "ef5a0a1a-1a4f-4a98-8571-4bbbaf339c4a",
                  "type": "has_only_phrase",
                  "uuid": "9c202ca4-cca0-4449-adc9-fcf7d23b6c7f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0cf5da9a-472d-4a7a-8678-ca5d134661a0",
                  "name": "All Responses",
                  "uuid": "69cabd8d-1dc6-4505-9c9e-269067461fbc"
                },
                {
                  "exit_uuid": "331ea070-2e44-4444-959b-7f119885eb3b",
                  "name": "Surprised",
                  "uuid": "ff3a61e1-21cc-44e2-b20e-2622bb0992f6"
                },
                {
                  "exit_uuid": "599f4930-c580-48d2-a43b-392d4416bff9",
                  "name": "Happy",
                  "uuid": "d00913a4-7abd-4f0d-8d94-588937f0f21f"
                },
                {
                  "exit_uuid": "a6f463aa-39f6-447c-ab4b-8dc60267094f",
                  "name": "My teen did not like it",
                  "uuid": "098a0c8f-640f-4fc9-be74-ffd208fe11a1"
                },
                {
                  "exit_uuid": "36ce5e24-40bd-45c0-a930-bd82ebc3b6c0",
                  "name": "I don’t know",
                  "uuid": "ef5a0a1a-1a4f-4a98-8571-4bbbaf339c4a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0cf5da9a-472d-4a7a-8678-ca5d134661a0",
                "destination_uuid": null
              },
              {
                "uuid": "331ea070-2e44-4444-959b-7f119885eb3b",
                "destination_uuid": "9c366e37-db41-4ca9-a86f-d5176b5a43ce"
              },
              {
                "uuid": "599f4930-c580-48d2-a43b-392d4416bff9",
                "destination_uuid": "f13d8083-0eeb-40c2-aca7-86e6beff305f"
              },
              {
                "uuid": "a6f463aa-39f6-447c-ab4b-8dc60267094f",
                "destination_uuid": "3bf709fd-9301-469e-9ba6-7da1db9429a5"
              },
              {
                "uuid": "36ce5e24-40bd-45c0-a930-bd82ebc3b6c0",
                "destination_uuid": "964f96ea-e0e2-4790-936e-abaff4d3eded"
              }
            ]
          },
          {
            "uuid": "9c366e37-db41-4ca9-a86f-d5176b5a43ce",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9073e8c1-08be-44f4-b5cb-937c22073c76"
              }
            ],
            "exits": [
              {
                "uuid": "1864e59c-472e-4d57-acd9-19e59cbdba11",
                "destination_uuid": "fed7db99-b656-4249-af90-44d3137c3b4e"
              }
            ]
          },
          {
            "uuid": "f13d8083-0eeb-40c2-aca7-86e6beff305f",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "326e88ec-8890-49d2-986a-858e9cdcf89a"
              }
            ],
            "exits": [
              {
                "uuid": "c4ea8c0c-fa87-4b1e-a2c2-21bc29b0ede1",
                "destination_uuid": "fed7db99-b656-4249-af90-44d3137c3b4e"
              }
            ]
          },
          {
            "uuid": "3bf709fd-9301-469e-9ba6-7da1db9429a5",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "51da852b-cfee-4198-9a2d-648f57a100ce"
              }
            ],
            "exits": [
              {
                "uuid": "01ce6f1d-43ed-426c-90a5-aba5541575e4",
                "destination_uuid": "fed7db99-b656-4249-af90-44d3137c3b4e"
              }
            ]
          },
          {
            "uuid": "964f96ea-e0e2-4790-936e-abaff4d3eded",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "47d0af6c-7d6a-4607-bd34-a80c8f333677"
              }
            ],
            "exits": [
              {
                "uuid": "ca90c5ac-efbd-4a5e-894a-7ad5f6dba51c",
                "destination_uuid": "fed7db99-b656-4249-af90-44d3137c3b4e"
              }
            ]
          },
          {
            "uuid": "fed7db99-b656-4249-af90-44d3137c3b4e",
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
                "uuid": "1fa0cc8e-63c1-4b4d-8ee4-99cfd7fbd978"
              }
            ],
            "exits": [
              {
                "uuid": "e6c2631f-bec2-41ab-9364-d0f0defc48dd",
                "destination_uuid": "57175da8-fd9c-4018-ba40-60f4834e7723"
              }
            ]
          },
          {
            "uuid": "57175da8-fd9c-4018-ba40-60f4834e7723",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e98e1d66-9f08-4195-9c9e-9f2c03dba48a",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "73713b64-02c8-4cc3-a9ed-da771ba6ccf8",
                  "type": "has_only_phrase",
                  "uuid": "c18932f7-7752-4b79-957c-6ed14daf35c7"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "73713b64-02c8-4cc3-a9ed-da771ba6ccf8",
                  "type": "has_only_phrase",
                  "uuid": "91b9d21e-6dbc-4da4-a9fd-ef45fc0397ec"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "bbd32f77-1319-4754-b914-0bbf6122d570",
                  "type": "has_only_phrase",
                  "uuid": "7d12aec2-148a-45cc-a6dc-1dbe00445a25"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "bbd32f77-1319-4754-b914-0bbf6122d570",
                  "type": "has_only_phrase",
                  "uuid": "8af55ddd-8d0e-4ad9-899f-54c20c684a01"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ddcc4c5b-d1f8-41ad-8bb3-194f04b8935a",
                  "name": "All Responses",
                  "uuid": "e98e1d66-9f08-4195-9c9e-9f2c03dba48a"
                },
                {
                  "exit_uuid": "d8c47dba-213b-4f4b-8545-59cbfc5d0ed4",
                  "name": "Every day; Almost every day",
                  "uuid": "73713b64-02c8-4cc3-a9ed-da771ba6ccf8"
                },
                {
                  "exit_uuid": "73544f37-54cd-40e0-a094-100c0f63f009",
                  "name": "A few days; Never",
                  "uuid": "bbd32f77-1319-4754-b914-0bbf6122d570"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ddcc4c5b-d1f8-41ad-8bb3-194f04b8935a",
                "destination_uuid": null
              },
              {
                "uuid": "d8c47dba-213b-4f4b-8545-59cbfc5d0ed4",
                "destination_uuid": "1cdd9fec-9adf-4d0c-a511-c879efa5aa9f"
              },
              {
                "uuid": "73544f37-54cd-40e0-a094-100c0f63f009",
                "destination_uuid": "0c58d94b-e8a6-41d6-a4e4-97d1bbb8489b"
              }
            ]
          },
          {
            "uuid": "1cdd9fec-9adf-4d0c-a511-c879efa5aa9f",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "89fc9311-d862-4a99-abe4-a2c1477610d3"
              }
            ],
            "exits": [
              {
                "uuid": "f8735836-e7b1-4581-91e6-9369ab40e4dd",
                "destination_uuid": "7a7cfd47-37ae-4251-bdff-e8c9e2cf6348"
              }
            ]
          },
          {
            "uuid": "0c58d94b-e8a6-41d6-a4e4-97d1bbb8489b",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4d72dd9f-8c89-49ff-83f4-ab83a0e45e8b"
              }
            ],
            "exits": [
              {
                "uuid": "c9786ba5-ee5d-4468-9049-d0f3239dd7a2",
                "destination_uuid": "7a7cfd47-37ae-4251-bdff-e8c9e2cf6348"
              }
            ]
          },
          {
            "uuid": "7a7cfd47-37ae-4251-bdff-e8c9e2cf6348",
            "actions": [
              {
                "uuid": "8edea143-d554-4dfa-98ca-59111c86d54e",
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
                "uuid": "d9451a62-93e1-4a24-9974-d77f54d1f97d",
                "destination_uuid": "a9f84b23-271c-4afb-b163-a1420b97f863"
              }
            ]
          },
          {
            "uuid": "a9f84b23-271c-4afb-b163-a1420b97f863",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "fb334ec2-f3b2-4bd1-a964-9c34628c6df0"
                },
                "type": "enter_flow",
                "uuid": "b963bd79-fd84-416d-95d0-b6c551849052"
              }
            ],
            "exits": [
              {
                "uuid": "4c1da4e4-d657-49b3-985e-dffd42c22149",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4ac3ffe7-a302-47e8-ae98-382c6a75cd84",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "57b09d3b-0890-49fb-a0ff-af950d6f1225",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "92f9a10c-cea6-4ef0-bd14-6918594024cb"
              }
            ],
            "exits": [
              {
                "uuid": "f56377f0-749d-44c4-802e-b138c08c9329",
                "destination_uuid": "9073d62b-477c-4b54-ad0f-02dd5dc18068"
              }
            ]
          },
          {
            "uuid": "9073d62b-477c-4b54-ad0f-02dd5dc18068",
            "actions": [
              {
                "uuid": "ba551c12-e1bf-4105-9066-9dfaddd1e737",
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
                "uuid": "b9da91c3-9102-4a7d-9442-e30288e31327",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "831c6541-8d6c-40bd-96e6-80a29a1a12e6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "39550faa-eaa5-4990-bce1-7e51e884b233",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b533c32e-f96b-45c1-af4a-b9273b36637c"
              }
            ],
            "exits": [
              {
                "uuid": "64e1f73b-e4c8-4bf7-b9f8-f03d117d19ae",
                "destination_uuid": "e798a48c-8f82-425d-8334-fe4290cb934a"
              }
            ]
          },
          {
            "uuid": "e798a48c-8f82-425d-8334-fe4290cb934a",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "98c574e3-3431-4291-bbf7-4539f3c3869d"
              }
            ],
            "exits": [
              {
                "uuid": "f68c568b-f9d8-46bb-b8a9-e29cf7019e9b",
                "destination_uuid": "5f0962e8-9c6a-41ed-acfb-e124daf568a2"
              }
            ]
          },
          {
            "uuid": "5f0962e8-9c6a-41ed-acfb-e124daf568a2",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "96138158-8ac2-457e-a100-ff7280b11c22"
              }
            ],
            "exits": [
              {
                "uuid": "fd903c71-5f27-4e29-afc7-c45fb43af46b",
                "destination_uuid": "724852e2-d163-4f06-a5dc-b7a362c745bb"
              }
            ]
          },
          {
            "uuid": "724852e2-d163-4f06-a5dc-b7a362c745bb",
            "actions": [
              {
                "uuid": "1635c604-25fe-41e3-a4b9-9e9a824b76ff",
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
                "uuid": "6082029a-d7e5-4267-8951-02f5ade9d64e",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "af511734-519c-4775-a78a-7b563417e142",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "af13fd44-590d-4387-b790-c3136b7c2299",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "39526e59-007d-420e-a99e-e17fc69ab1a8"
              }
            ],
            "exits": [
              {
                "uuid": "e159a83a-12f2-48db-8126-6960cd9e95a5",
                "destination_uuid": "10a9493d-4d79-4845-acd2-4c1cd566b809"
              }
            ]
          },
          {
            "uuid": "10a9493d-4d79-4845-acd2-4c1cd566b809",
            "actions": [
              {
                "uuid": "ec2db25c-da43-4a8c-8c66-9964501ad0cb",
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
                "uuid": "34442d7f-c908-48ce-b32c-ac987cb6ae87",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "84cf4041-dc93-4730-b61a-86ccfb127185",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f22e73a1-f66b-4711-8425-e7fc62d2b70c",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3c08e774-59da-4cd4-bb9b-705d70b91adb"
              }
            ],
            "exits": [
              {
                "uuid": "f1eb101b-b2d0-4ebe-8323-e3d92380bf31",
                "destination_uuid": "b08e099b-d7c5-44d5-9e4a-2f55aa84aef8"
              }
            ]
          },
          {
            "uuid": "b08e099b-d7c5-44d5-9e4a-2f55aa84aef8",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c9f5cdd4-d9c2-42ca-9200-5a53a059f3a5"
              }
            ],
            "exits": [
              {
                "uuid": "d8beab86-7795-4da5-a4df-d814d45ff5f3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ef8aadb7-7c46-44cb-9f66-101481167fb8",
            "actions": [
              {
                "uuid": "ee3acddb-4ea3-4e10-b736-12f4841df27e",
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
                "uuid": "3387e058-6035-48fb-befc-c8482cddad19",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "80535a51-a97f-4b23-865b-1aaa9dcbacd6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9ef3b2ea-4852-4a5f-9fcf-eb3b0d1c1979",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "60f95772-5586-4865-a070-dd001e1ce278"
              }
            ],
            "exits": [
              {
                "uuid": "8141c6c0-3ef9-4df6-b671-cc10fa9fee76",
                "destination_uuid": "535375dd-6b8b-411f-9ea6-9a0cdf5ebf6b"
              }
            ]
          },
          {
            "uuid": "535375dd-6b8b-411f-9ea6-9a0cdf5ebf6b",
            "actions": [
              {
                "uuid": "0ab23dca-4c9c-423b-b8c6-34a81ed01ebc",
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
                "uuid": "c44bc0f2-ff35-41c5-8681-ff730be71900",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "acf49cde-9a2c-4488-8741-39f0e850a58a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "733b4251-e734-4895-bfac-6c95cbf6786c",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "6b8a7f4d-5e09-4af8-950a-e5123336b090"
                },
                "type": "enter_flow",
                "uuid": "68fae4f3-3f2c-432d-b5de-3cc6962e8521"
              }
            ],
            "exits": [
              {
                "uuid": "25a7a070-ac3d-42df-96e4-afe16dc852a3",
                "destination_uuid": "208a1f4e-878b-4fac-a021-de344314d428"
              },
              {
                "uuid": "3954f88b-f196-4591-a619-9f7ef048fc42",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b5d80e03-cd55-4694-b438-f2c09299d0f6",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "92789b03-486b-4e8c-9b1f-bc656f7c8c95"
                },
                {
                  "uuid": "e59df53d-079c-4fb0-bae3-6459db4a44c7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "669edd72-3286-4441-bf9b-70de87238935"
                }
              ],
              "categories": [
                {
                  "uuid": "92789b03-486b-4e8c-9b1f-bc656f7c8c95",
                  "name": "Complete",
                  "exit_uuid": "25a7a070-ac3d-42df-96e4-afe16dc852a3"
                },
                {
                  "uuid": "669edd72-3286-4441-bf9b-70de87238935",
                  "name": "Expired",
                  "exit_uuid": "3954f88b-f196-4591-a619-9f7ef048fc42"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "92789b03-486b-4e8c-9b1f-bc656f7c8c95"
            }
          },
          {
            "uuid": "208a1f4e-878b-4fac-a021-de344314d428",
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
                "uuid": "4642e3d4-5a57-42ec-812d-ba0576728d1b"
              }
            ],
            "exits": [
              {
                "uuid": "21ae8f92-40e2-460a-b111-fbf4cb4c309a",
                "destination_uuid": "8f57251e-d10c-4230-9ad4-3e7187d335a4"
              }
            ]
          },
          {
            "uuid": "8f57251e-d10c-4230-9ad4-3e7187d335a4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b9ae7f42-37c5-423c-afa5-1a1191d478e4",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "0099fa0c-1b23-4a0f-b5b5-124a0b3af27a",
                  "type": "has_only_phrase",
                  "uuid": "406b7408-ef4f-462c-8210-5beebf70926d"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "0cee6d97-ad68-4e20-8b6c-b69d6010a2d2",
                  "type": "has_only_phrase",
                  "uuid": "dc690cea-6e4f-4557-87f1-619007689ee7"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "aca06bae-cc1e-4fd7-aaf8-6a2c3d438afc",
                  "type": "has_only_phrase",
                  "uuid": "a0100a93-211f-4179-9ebc-9a8979edc348"
                },
                {
                  "arguments": [
                    "first app opening"
                  ],
                  "category_uuid": "0b1ed5ff-b804-4b13-9fa5-873a266673fa",
                  "type": "has_only_phrase",
                  "uuid": "66677a33-5a7c-4ead-b740-f65c2342d8fa"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8bdec0b5-e88d-4f5b-81ca-4527e46362b3",
                  "name": "All Responses",
                  "uuid": "b9ae7f42-37c5-423c-afa5-1a1191d478e4"
                },
                {
                  "exit_uuid": "2c319bc9-ce08-4426-9e34-4210dd246acb",
                  "name": "welcome",
                  "uuid": "0099fa0c-1b23-4a0f-b5b5-124a0b3af27a"
                },
                {
                  "exit_uuid": "52eaba97-5161-47da-ae51-24724267383d",
                  "name": "1on1",
                  "uuid": "0cee6d97-ad68-4e20-8b6c-b69d6010a2d2"
                },
                {
                  "exit_uuid": "4eeee1d9-ff3f-4f38-a37b-7a9a0dc6287d",
                  "name": "praise",
                  "uuid": "aca06bae-cc1e-4fd7-aaf8-6a2c3d438afc"
                },
                {
                  "exit_uuid": "8fc37d03-323f-4f33-9c01-9c44d9a38b60",
                  "name": "first app opening",
                  "uuid": "0b1ed5ff-b804-4b13-9fa5-873a266673fa"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8bdec0b5-e88d-4f5b-81ca-4527e46362b3",
                "destination_uuid": null
              },
              {
                "uuid": "2c319bc9-ce08-4426-9e34-4210dd246acb",
                "destination_uuid": "b9eb2081-1629-4935-b7ce-e01169037d47"
              },
              {
                "uuid": "52eaba97-5161-47da-ae51-24724267383d",
                "destination_uuid": "b37bc498-6a80-4bae-bc20-72983828018c"
              },
              {
                "uuid": "4eeee1d9-ff3f-4f38-a37b-7a9a0dc6287d",
                "destination_uuid": "75ae13ef-8193-48ee-a32c-33539b2b701a"
              },
              {
                "uuid": "8fc37d03-323f-4f33-9c01-9c44d9a38b60",
                "destination_uuid": "1b98613b-02ef-4e18-9e66-c1c5c12ecde9"
              }
            ]
          },
          {
            "uuid": "b9eb2081-1629-4935-b7ce-e01169037d47",
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
                "uuid": "53875930-acc0-4b0f-b14b-e64cd5d751f9"
              }
            ],
            "exits": [
              {
                "uuid": "d893fa68-9ad6-4711-8860-9a400db2eddf",
                "destination_uuid": "bf31e0a8-7276-4232-9993-42a126c1696c"
              }
            ]
          },
          {
            "uuid": "bf31e0a8-7276-4232-9993-42a126c1696c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4a242672-2ca0-4ac4-8b9d-438f730d4587",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "093be4ea-4a73-496d-a3a0-1ea8955bcbe7",
                  "type": "has_only_phrase",
                  "uuid": "b65daff7-85ba-4050-93d7-312bf6497ee8"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "c5450340-b62f-485a-826e-1eb86aa0f718",
                  "type": "has_only_phrase",
                  "uuid": "af929ffb-7f23-4662-ac8d-ca7c9d9d6884"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "f46d03b2-9af2-4474-9336-c5de3de7f265",
                  "type": "has_only_phrase",
                  "uuid": "a1a387a7-1f4a-4727-8c2f-989f6b0b2af1"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "ede4e6ae-8f44-4033-ae2f-a407ea204948",
                  "type": "has_only_phrase",
                  "uuid": "c1e70978-5ff5-4bfc-ab22-395109b63a7e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "74f68b4f-2cba-40a5-8887-c2fca91f3817",
                  "name": "All Responses",
                  "uuid": "4a242672-2ca0-4ac4-8b9d-438f730d4587"
                },
                {
                  "exit_uuid": "9ce28a6b-cbdb-49b0-ac0e-3065b18d0e23",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "093be4ea-4a73-496d-a3a0-1ea8955bcbe7"
                },
                {
                  "exit_uuid": "c748502a-a226-4afd-a913-bbad2fb7386d",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "c5450340-b62f-485a-826e-1eb86aa0f718"
                },
                {
                  "exit_uuid": "ff402844-7e7a-492d-91e4-f9f6bb0dfc6c",
                  "name": "mod_welcome_survey",
                  "uuid": "f46d03b2-9af2-4474-9336-c5de3de7f265"
                },
                {
                  "exit_uuid": "3c562d05-4416-445d-a874-b0af40a65893",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "ede4e6ae-8f44-4033-ae2f-a407ea204948"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "74f68b4f-2cba-40a5-8887-c2fca91f3817",
                "destination_uuid": null
              },
              {
                "uuid": "9ce28a6b-cbdb-49b0-ac0e-3065b18d0e23",
                "destination_uuid": "9309fe91-0b71-46aa-ac08-b8aee70c9c98"
              },
              {
                "uuid": "c748502a-a226-4afd-a913-bbad2fb7386d",
                "destination_uuid": "4e393550-98d1-4e24-859f-77a2963abe00"
              },
              {
                "uuid": "ff402844-7e7a-492d-91e4-f9f6bb0dfc6c",
                "destination_uuid": "4879d829-9f87-4dea-8f71-cc5735b36309"
              },
              {
                "uuid": "3c562d05-4416-445d-a874-b0af40a65893",
                "destination_uuid": "0b361f76-c8bb-4553-ac36-0f39a83317dd"
              }
            ]
          },
          {
            "uuid": "9309fe91-0b71-46aa-ac08-b8aee70c9c98",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "107f1482-90aa-41a7-8a92-f5cbe74ff16c"
                },
                "type": "enter_flow",
                "uuid": "98530630-b7c4-45a2-8980-aa854044e212"
              }
            ],
            "exits": [
              {
                "uuid": "9e3f2f3d-0079-44e4-a782-2035a4b66431",
                "destination_uuid": null
              },
              {
                "uuid": "37add219-69d6-4803-891f-4966a4e9983b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "81bf2d19-3398-43db-8e0f-731182a92bd6",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f9e5228a-d62f-4742-bcf4-f0edf38979c6"
                },
                {
                  "uuid": "71a302ea-77c9-4b80-9f9a-27554aa3e923",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c247026c-d31e-4aea-8e96-8ef440c63008"
                }
              ],
              "categories": [
                {
                  "uuid": "f9e5228a-d62f-4742-bcf4-f0edf38979c6",
                  "name": "Complete",
                  "exit_uuid": "9e3f2f3d-0079-44e4-a782-2035a4b66431"
                },
                {
                  "uuid": "c247026c-d31e-4aea-8e96-8ef440c63008",
                  "name": "Expired",
                  "exit_uuid": "37add219-69d6-4803-891f-4966a4e9983b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f9e5228a-d62f-4742-bcf4-f0edf38979c6"
            }
          },
          {
            "uuid": "4e393550-98d1-4e24-859f-77a2963abe00",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "76f69185-72b2-4d06-9795-75141fe5bec9"
                },
                "type": "enter_flow",
                "uuid": "cf407c09-f336-4849-b48c-22915a808f4c"
              }
            ],
            "exits": [
              {
                "uuid": "339fc2fd-9cda-4698-9354-d1eada25e76f",
                "destination_uuid": null
              },
              {
                "uuid": "1fcf386b-c30b-4e63-8efd-778a8c603dd4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "529fb2bb-727f-4cb7-bb02-0bce15cefbfd",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "768a7922-534f-47d1-b198-d0ecb794291b"
                },
                {
                  "uuid": "77719ec5-b03a-4659-8deb-0dc4b823d105",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "496788c4-cd91-4819-bcdd-6c62eecd736b"
                }
              ],
              "categories": [
                {
                  "uuid": "768a7922-534f-47d1-b198-d0ecb794291b",
                  "name": "Complete",
                  "exit_uuid": "339fc2fd-9cda-4698-9354-d1eada25e76f"
                },
                {
                  "uuid": "496788c4-cd91-4819-bcdd-6c62eecd736b",
                  "name": "Expired",
                  "exit_uuid": "1fcf386b-c30b-4e63-8efd-778a8c603dd4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "768a7922-534f-47d1-b198-d0ecb794291b"
            }
          },
          {
            "uuid": "4879d829-9f87-4dea-8f71-cc5735b36309",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "1caf2265-ed49-4f2a-adda-ccd68821726a"
                },
                "type": "enter_flow",
                "uuid": "b434357d-1c6b-4bf1-931c-210a3a6ebe26"
              }
            ],
            "exits": [
              {
                "uuid": "6c325383-daf0-4726-85be-40f6646d238c",
                "destination_uuid": null
              },
              {
                "uuid": "46e24cd1-0ad3-4e89-aa82-cacebda704c1",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2b0b460d-2b5c-4ac3-8f99-fde45f4d53d7",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "70fd903b-72d8-479d-b246-3b4410a34796"
                },
                {
                  "uuid": "60b4c37b-cbb6-4bb4-91a8-5e9f8ff36dd7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "59cf3447-21dd-49e6-8fb0-8b5973598d05"
                }
              ],
              "categories": [
                {
                  "uuid": "70fd903b-72d8-479d-b246-3b4410a34796",
                  "name": "Complete",
                  "exit_uuid": "6c325383-daf0-4726-85be-40f6646d238c"
                },
                {
                  "uuid": "59cf3447-21dd-49e6-8fb0-8b5973598d05",
                  "name": "Expired",
                  "exit_uuid": "46e24cd1-0ad3-4e89-aa82-cacebda704c1"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "70fd903b-72d8-479d-b246-3b4410a34796"
            }
          },
          {
            "uuid": "0b361f76-c8bb-4553-ac36-0f39a83317dd",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "68c81348-062f-44dc-b16a-140db3d44fae"
                },
                "type": "enter_flow",
                "uuid": "7d1c0f77-2543-44a3-a698-eb66e5be1cc0"
              }
            ],
            "exits": [
              {
                "uuid": "51f78894-1578-4220-a73c-9f2cb0f227fb",
                "destination_uuid": null
              },
              {
                "uuid": "2fe410b3-7128-4776-8acf-8b8e4156b9ae",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "943ecaff-164e-4630-983e-d2fd0a2c4f0c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "af1d52b0-bf9a-4635-b26e-ae0be387eebf"
                },
                {
                  "uuid": "1b45ee65-53c3-43ca-aed9-7b472703ba4f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e47cc446-813d-4924-9f13-f6eceb19b19d"
                }
              ],
              "categories": [
                {
                  "uuid": "af1d52b0-bf9a-4635-b26e-ae0be387eebf",
                  "name": "Complete",
                  "exit_uuid": "51f78894-1578-4220-a73c-9f2cb0f227fb"
                },
                {
                  "uuid": "e47cc446-813d-4924-9f13-f6eceb19b19d",
                  "name": "Expired",
                  "exit_uuid": "2fe410b3-7128-4776-8acf-8b8e4156b9ae"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "af1d52b0-bf9a-4635-b26e-ae0be387eebf"
            }
          },
          {
            "uuid": "b37bc498-6a80-4bae-bc20-72983828018c",
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
                "uuid": "1b9617f8-e8fc-41e2-b19e-18f0f33af776"
              }
            ],
            "exits": [
              {
                "uuid": "bc1839cc-5a7c-4c9a-93e6-7bbf476d41d1",
                "destination_uuid": "545e1e31-0b64-47fc-813d-5275db793aef"
              }
            ]
          },
          {
            "uuid": "545e1e31-0b64-47fc-813d-5275db793aef",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "40790ff2-99e3-4971-8666-81c0c9f7fdbb",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "91fd1bfc-f3c6-4443-bf2b-7736e0117227",
                  "type": "has_only_phrase",
                  "uuid": "b88c4668-692e-4745-aa92-2ccb2b092eb1"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "e99bf0bb-a65b-49ae-a628-7581e6cd5b05",
                  "type": "has_only_phrase",
                  "uuid": "1da8b96d-3afa-4e5b-a207-b9c6e26f9577"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "4e4f26e5-42e0-4a57-8612-ac658e5a5190",
                  "type": "has_only_phrase",
                  "uuid": "714a8b0a-2d4d-4dda-8595-bb4bbcd7dc41"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e33c4d63-5215-45dc-8c3e-cc869d073cd4",
                  "name": "All Responses",
                  "uuid": "40790ff2-99e3-4971-8666-81c0c9f7fdbb"
                },
                {
                  "exit_uuid": "b6ffd889-f17c-4015-a067-e4ec1371857f",
                  "name": "mod_1on1_emo",
                  "uuid": "91fd1bfc-f3c6-4443-bf2b-7736e0117227"
                },
                {
                  "exit_uuid": "e7cea7f4-2424-4e7b-b39e-b965e5e6bae1",
                  "name": "mod_1on1_activity",
                  "uuid": "e99bf0bb-a65b-49ae-a628-7581e6cd5b05"
                },
                {
                  "exit_uuid": "b45e8d1a-d48f-45f9-8ee7-f4023047b1e9",
                  "name": "mod_1on1_activity_review",
                  "uuid": "4e4f26e5-42e0-4a57-8612-ac658e5a5190"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e33c4d63-5215-45dc-8c3e-cc869d073cd4",
                "destination_uuid": null
              },
              {
                "uuid": "b6ffd889-f17c-4015-a067-e4ec1371857f",
                "destination_uuid": "776be116-e44d-4dc7-985e-963b26e32342"
              },
              {
                "uuid": "e7cea7f4-2424-4e7b-b39e-b965e5e6bae1",
                "destination_uuid": "82359dc4-ab32-4e36-95ba-630b7cddba2e"
              },
              {
                "uuid": "b45e8d1a-d48f-45f9-8ee7-f4023047b1e9",
                "destination_uuid": "aa6d1ebe-e4d0-4222-ac97-65a610b3abc7"
              }
            ]
          },
          {
            "uuid": "776be116-e44d-4dc7-985e-963b26e32342",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "cf418ed8-dd5f-4a29-88ba-4a8f4eff8843"
                },
                "type": "enter_flow",
                "uuid": "8e974fde-be54-4f5a-ad04-ca128120d5af"
              }
            ],
            "exits": [
              {
                "uuid": "9bbf9c7a-8683-4308-ab4e-713ba3e6c5a9",
                "destination_uuid": null
              },
              {
                "uuid": "5b257018-cc4a-4c4d-9536-86ca12197c1d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "6167c2d1-f010-4aa1-a5c9-3bfdf1b81ebe",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0f824c0a-c0a5-416a-9abe-08af00a9868b"
                },
                {
                  "uuid": "2ba2321a-b26f-4825-9246-590034eff080",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e8c4ba38-a26c-4927-8b86-bd409a7dbe0b"
                }
              ],
              "categories": [
                {
                  "uuid": "0f824c0a-c0a5-416a-9abe-08af00a9868b",
                  "name": "Complete",
                  "exit_uuid": "9bbf9c7a-8683-4308-ab4e-713ba3e6c5a9"
                },
                {
                  "uuid": "e8c4ba38-a26c-4927-8b86-bd409a7dbe0b",
                  "name": "Expired",
                  "exit_uuid": "5b257018-cc4a-4c4d-9536-86ca12197c1d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0f824c0a-c0a5-416a-9abe-08af00a9868b"
            }
          },
          {
            "uuid": "82359dc4-ab32-4e36-95ba-630b7cddba2e",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "610be683-ac6b-4018-9974-658e94d47bfb"
                },
                "type": "enter_flow",
                "uuid": "ee59aafe-a8e9-4b0c-9541-050f5730d737"
              }
            ],
            "exits": [
              {
                "uuid": "1723d2a6-22cf-40c1-821b-4a7c795a2d9c",
                "destination_uuid": null
              },
              {
                "uuid": "5b3a655e-1bce-4d52-9fc6-d5f1c6b79d11",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "fc4509af-5d3f-49ab-b414-15ffc3a588bd",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "01cc208b-165c-4a46-92bf-a62d42b6ac82"
                },
                {
                  "uuid": "b429d413-0016-455c-8ac0-9628fe7d7663",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "332aaf50-1a56-434a-a20d-f8376dd60e78"
                }
              ],
              "categories": [
                {
                  "uuid": "01cc208b-165c-4a46-92bf-a62d42b6ac82",
                  "name": "Complete",
                  "exit_uuid": "1723d2a6-22cf-40c1-821b-4a7c795a2d9c"
                },
                {
                  "uuid": "332aaf50-1a56-434a-a20d-f8376dd60e78",
                  "name": "Expired",
                  "exit_uuid": "5b3a655e-1bce-4d52-9fc6-d5f1c6b79d11"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "01cc208b-165c-4a46-92bf-a62d42b6ac82"
            }
          },
          {
            "uuid": "aa6d1ebe-e4d0-4222-ac97-65a610b3abc7",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "dc10ad48-ccf0-4c29-9c72-f80b000abf28"
                },
                "type": "enter_flow",
                "uuid": "4a93ea52-594a-4adc-aa94-9bde097b471c"
              }
            ],
            "exits": [
              {
                "uuid": "1c9cebd1-1fce-4c5c-a8e6-6f68d5c0fe0c",
                "destination_uuid": null
              },
              {
                "uuid": "ed92f4a0-b652-4984-a71d-a04412f5c4d1",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "aa73ffd4-6a2a-4366-92f3-fd6b4d680f29",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "1d9f315a-bd42-4aed-847d-6f32edcd7875"
                },
                {
                  "uuid": "22f27aad-08b6-4c50-9a7e-60c805b13932",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "665d3289-7635-44a1-aafc-321e5b7f7ba7"
                }
              ],
              "categories": [
                {
                  "uuid": "1d9f315a-bd42-4aed-847d-6f32edcd7875",
                  "name": "Complete",
                  "exit_uuid": "1c9cebd1-1fce-4c5c-a8e6-6f68d5c0fe0c"
                },
                {
                  "uuid": "665d3289-7635-44a1-aafc-321e5b7f7ba7",
                  "name": "Expired",
                  "exit_uuid": "ed92f4a0-b652-4984-a71d-a04412f5c4d1"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "1d9f315a-bd42-4aed-847d-6f32edcd7875"
            }
          },
          {
            "uuid": "75ae13ef-8193-48ee-a32c-33539b2b701a",
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
                "uuid": "8f944268-b205-4470-96b5-be89c9c9f445"
              }
            ],
            "exits": [
              {
                "uuid": "a5e0e793-0f97-4e2f-8d5c-e2c4182aebd9",
                "destination_uuid": "19cd7f6d-ec16-40ce-b60c-b842bb1695f7"
              }
            ]
          },
          {
            "uuid": "19cd7f6d-ec16-40ce-b60c-b842bb1695f7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "699042ea-ae1f-4784-82ea-542b8c020930",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "b626e7ae-ce64-4e9a-9b31-28037157bbb1",
                  "type": "has_only_phrase",
                  "uuid": "98c1cc49-ad18-49e3-a05b-613d832dfcf8"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "c80e7332-ee69-4ec2-a879-851318f41e5a",
                  "type": "has_only_phrase",
                  "uuid": "e67ee97e-3588-49a4-b5d8-7f2e7cfff016"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "ce7333b4-4810-4239-8c01-6803c29d35ed",
                  "type": "has_only_phrase",
                  "uuid": "d1f8c9de-2595-4b68-9efb-3414eaeddb5a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3bc44c1b-a453-469e-920a-13a9d313944e",
                  "name": "All Responses",
                  "uuid": "699042ea-ae1f-4784-82ea-542b8c020930"
                },
                {
                  "exit_uuid": "b4b6e0f4-e5d0-475f-8f63-89581a1299f4",
                  "name": "mod_praise_intro",
                  "uuid": "b626e7ae-ce64-4e9a-9b31-28037157bbb1"
                },
                {
                  "exit_uuid": "67acb6ea-44e4-47b3-9b9b-622dc6395d39",
                  "name": "mod_praise_activity",
                  "uuid": "c80e7332-ee69-4ec2-a879-851318f41e5a"
                },
                {
                  "exit_uuid": "2774b3b8-1c16-414a-9790-5f6f59b58167",
                  "name": "mod_praise_activity_review",
                  "uuid": "ce7333b4-4810-4239-8c01-6803c29d35ed"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3bc44c1b-a453-469e-920a-13a9d313944e",
                "destination_uuid": null
              },
              {
                "uuid": "b4b6e0f4-e5d0-475f-8f63-89581a1299f4",
                "destination_uuid": "8536debc-92c6-45a2-9667-eab1d5038337"
              },
              {
                "uuid": "67acb6ea-44e4-47b3-9b9b-622dc6395d39",
                "destination_uuid": "94897976-7fa1-447e-b64a-f1d5e92b8849"
              },
              {
                "uuid": "2774b3b8-1c16-414a-9790-5f6f59b58167",
                "destination_uuid": "a7c6ed6f-1819-4591-8fda-8c7266ca5dde"
              }
            ]
          },
          {
            "uuid": "8536debc-92c6-45a2-9667-eab1d5038337",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "d6d30c07-b237-4c01-9768-3b7876be8a72"
                },
                "type": "enter_flow",
                "uuid": "3e842776-d490-420a-9ba6-f10ecf9c1d7f"
              }
            ],
            "exits": [
              {
                "uuid": "4aa2dd84-e86a-4ddd-995b-94ec43596d9b",
                "destination_uuid": null
              },
              {
                "uuid": "b1597db9-5e02-439e-aba7-93d8bc66e69d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "4dbfd71e-9430-4b9e-a259-efc9f27a2067",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ec20d457-c610-43e3-8f22-2248f852ca8b"
                },
                {
                  "uuid": "ea6dbdd2-d16e-43d7-8cb7-7550bdfbf6ef",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "785e95b3-910a-4476-a3ce-941f62eae4eb"
                }
              ],
              "categories": [
                {
                  "uuid": "ec20d457-c610-43e3-8f22-2248f852ca8b",
                  "name": "Complete",
                  "exit_uuid": "4aa2dd84-e86a-4ddd-995b-94ec43596d9b"
                },
                {
                  "uuid": "785e95b3-910a-4476-a3ce-941f62eae4eb",
                  "name": "Expired",
                  "exit_uuid": "b1597db9-5e02-439e-aba7-93d8bc66e69d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ec20d457-c610-43e3-8f22-2248f852ca8b"
            }
          },
          {
            "uuid": "94897976-7fa1-447e-b64a-f1d5e92b8849",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "02306958-a91c-4259-be1b-a560a7a29b83"
                },
                "type": "enter_flow",
                "uuid": "3d738668-4472-4350-b8b8-5a0d84b6ac6f"
              }
            ],
            "exits": [
              {
                "uuid": "c1b79808-62c3-43e7-bd34-f75808919cde",
                "destination_uuid": null
              },
              {
                "uuid": "8c69f8fa-06a4-44a1-add8-be6280b6e65d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "04e2043f-1a38-4e9a-b564-7745dc726433",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "2f9fd400-0c61-4aa3-bad5-c611aeeb895c"
                },
                {
                  "uuid": "437543be-9d0c-4208-b45c-9700b8886eca",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "145d898f-d8f9-4c84-ad10-a060ee13d141"
                }
              ],
              "categories": [
                {
                  "uuid": "2f9fd400-0c61-4aa3-bad5-c611aeeb895c",
                  "name": "Complete",
                  "exit_uuid": "c1b79808-62c3-43e7-bd34-f75808919cde"
                },
                {
                  "uuid": "145d898f-d8f9-4c84-ad10-a060ee13d141",
                  "name": "Expired",
                  "exit_uuid": "8c69f8fa-06a4-44a1-add8-be6280b6e65d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "2f9fd400-0c61-4aa3-bad5-c611aeeb895c"
            }
          },
          {
            "uuid": "a7c6ed6f-1819-4591-8fda-8c7266ca5dde",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "2d377c96-bebb-4ed5-840a-49690107c254"
                },
                "type": "enter_flow",
                "uuid": "38d9911e-86c4-419b-af0e-44f5db55c45b"
              }
            ],
            "exits": [
              {
                "uuid": "154bb3e8-8ed8-4816-afe6-5e6d132d9670",
                "destination_uuid": null
              },
              {
                "uuid": "d1014d94-ec95-4308-a568-5dad3db25f2e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7911ac4e-1052-47c0-aca3-c44ace9abee0",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4c2142b5-04de-4943-9cd4-ea4f78d8fa99"
                },
                {
                  "uuid": "a3ba7594-4015-4a8f-b7b2-007ba821d1a6",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "6a9518dc-f9f2-4adb-8f98-5fcc5c6b2885"
                }
              ],
              "categories": [
                {
                  "uuid": "4c2142b5-04de-4943-9cd4-ea4f78d8fa99",
                  "name": "Complete",
                  "exit_uuid": "154bb3e8-8ed8-4816-afe6-5e6d132d9670"
                },
                {
                  "uuid": "6a9518dc-f9f2-4adb-8f98-5fcc5c6b2885",
                  "name": "Expired",
                  "exit_uuid": "d1014d94-ec95-4308-a568-5dad3db25f2e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4c2142b5-04de-4943-9cd4-ea4f78d8fa99"
            }
          },
          {
            "uuid": "1b98613b-02ef-4e18-9e66-c1c5c12ecde9",
            "actions": [
              {
                "flow": {
                  "name": "first_app_opening",
                  "uuid": "b55af486-5742-449d-8545-af2798c99fb4"
                },
                "type": "enter_flow",
                "uuid": "5981d4f8-db2b-4910-8f59-7b93c5280a92"
              }
            ],
            "exits": [
              {
                "uuid": "65f3e794-353b-4024-8ac2-3ae6093174fd",
                "destination_uuid": null
              },
              {
                "uuid": "da970f4f-52d9-4a56-ac38-633180653d93",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "9c06e9f4-fc19-4a66-9ba0-104c815ab4b2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "33386f33-f4f5-4985-8ae2-768a219d1d4d"
                },
                {
                  "uuid": "11bcdb51-7eb3-4f2a-b7c2-60453178b5fa",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "1702b305-d2f3-4693-b8e8-610e0c96022f"
                }
              ],
              "categories": [
                {
                  "uuid": "33386f33-f4f5-4985-8ae2-768a219d1d4d",
                  "name": "Complete",
                  "exit_uuid": "65f3e794-353b-4024-8ac2-3ae6093174fd"
                },
                {
                  "uuid": "1702b305-d2f3-4693-b8e8-610e0c96022f",
                  "name": "Expired",
                  "exit_uuid": "da970f4f-52d9-4a56-ac38-633180653d93"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "33386f33-f4f5-4985-8ae2-768a219d1d4d"
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
        "uuid": "41ee2725-23a2-4a9f-9aa7-3a26859b8ed5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b5c02fc2-e5de-417a-bb35-7d9a170ae3e4",
            "actions": [
              {
                "uuid": "0f12ce38-d26d-43c4-b41a-cd5218b7a302",
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
                "uuid": "3c1980ae-bda8-4eec-bc4e-bc555f49fba0",
                "destination_uuid": "6fc1bfcf-8057-4b77-b306-242866764c32"
              }
            ]
          },
          {
            "uuid": "6fc1bfcf-8057-4b77-b306-242866764c32",
            "actions": [
              {
                "uuid": "f3836541-32a1-4c87-b588-09923eb4829a",
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
                "uuid": "bd42d0c6-f43e-47ea-9fd0-c06ede1261b2",
                "destination_uuid": "bc175bc8-6358-42da-be0f-79a090823497"
              }
            ]
          },
          {
            "uuid": "bc175bc8-6358-42da-be0f-79a090823497",
            "actions": [
              {
                "uuid": "740cb63f-8b39-4494-898a-81b5037dbb88",
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
                "uuid": "f63fcaa5-394d-47aa-b616-0f8250c1e0ec",
                "destination_uuid": "eb202efb-c6b1-4114-99ad-898f06b1b34f"
              }
            ]
          },
          {
            "uuid": "eb202efb-c6b1-4114-99ad-898f06b1b34f",
            "actions": [
              {
                "uuid": "f5b51e07-71a0-4fd4-acd8-db67a05bddc7",
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
                "uuid": "4cf25b84-297b-4121-a205-14fd7851c62a",
                "destination_uuid": "53895e03-a1a0-47e7-90de-8e6b75639875"
              }
            ]
          },
          {
            "uuid": "53895e03-a1a0-47e7-90de-8e6b75639875",
            "actions": [
              {
                "uuid": "e9d5fe6c-356d-4359-886b-479f1645b62c",
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
                "uuid": "d5c428cd-abb9-40f4-8718-1283b4696e4b",
                "destination_uuid": "ca4448df-9219-4998-832e-976b2821ebb2"
              }
            ]
          },
          {
            "uuid": "ca4448df-9219-4998-832e-976b2821ebb2",
            "actions": [
              {
                "uuid": "3094c55f-9968-4b4b-9182-99ccfc10c690",
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
                "uuid": "b50bf8d3-4655-4e1d-9dcc-5632906bc825",
                "destination_uuid": "6ec0d881-7ddd-4d4a-81e9-ada1735e4d48"
              }
            ]
          },
          {
            "uuid": "6ec0d881-7ddd-4d4a-81e9-ada1735e4d48",
            "actions": [
              {
                "uuid": "caf71b8f-18cf-4e38-a6f3-7eaa3dd45d6a",
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
                "uuid": "7f7fa114-2fbd-4f25-973c-0992e80e840f",
                "destination_uuid": "5ea1d9f4-7d4e-4ce4-89bf-b79db35b5469"
              }
            ]
          },
          {
            "uuid": "5ea1d9f4-7d4e-4ce4-89bf-b79db35b5469",
            "actions": [
              {
                "uuid": "e2915389-9805-4d65-a374-825df0420353",
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
                "uuid": "824f80ab-9454-4580-9e46-c38ca6576309",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5a962b1d-e0b9-47b4-8c86-ef309b22a4a2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7f28fd07-673f-4fdc-a51e-6d1ce74504ce",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1ecc4ccd-33a5-4e70-be7a-e519396a783a"
              }
            ],
            "exits": [
              {
                "uuid": "6eba7353-06bb-496f-b7e2-9d99f10c8953",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "73e2d067-0547-45d3-90f3-11a826e19d88",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f6ab2135-9edc-4320-88f7-f0525e85fd5f",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f03bbb20-6652-4f5c-90fa-4aac3ac80a68"
              }
            ],
            "exits": [
              {
                "uuid": "db4a8f8c-7176-43b3-a5f8-380dd7a92171",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e98cbec9-da07-46d5-ae5d-4c291575ba47",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "027990ee-d5bf-4b22-844a-d3a78d069ed0",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "394a7960-a7ca-4c6d-ac52-3695448a537f"
              }
            ],
            "exits": [
              {
                "uuid": "8d56e5bd-df7e-40d5-af68-d16aec466c62",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "771a025f-0095-4573-8e5c-6872cefd666c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a694d930-5d71-461c-a45b-dd7d8ebbef32",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ff311505-1cc5-4aca-976f-044af5ef3fc5"
              }
            ],
            "exits": [
              {
                "uuid": "df0f3222-ecc1-40e3-90e8-20730ab68d1b",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "07025c3f-d69a-4f31-ace3-29f7fda1502f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "50cd17c0-0d6f-424d-8936-c45df7088c47",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "57654bfb-77bd-4cbd-9b81-d9f1e8f2688f"
              }
            ],
            "exits": [
              {
                "uuid": "987e4be2-cec3-42d1-b8b2-4e486e7f10d3",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5c2dfa27-996d-4a83-9e55-cb77046f140f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c65a99d3-4ab2-4b65-8ce5-e75198932c64",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bbb26fc6-95ec-40e9-bebf-e7020d27c241"
              }
            ],
            "exits": [
              {
                "uuid": "a5c1234f-363d-44e3-a9fc-6fc380f35183",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8c2d8384-b767-4773-8994-a033150e2c44",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "11d6750a-b692-4bae-9749-5066b1390766",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "88440a6e-a51b-4dc6-828a-855117688192"
              }
            ],
            "exits": [
              {
                "uuid": "4720942f-c039-4c29-90d4-2656eb5a2bf2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8c45c004-7f0f-410d-956e-01e4f0ba1f5d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b71b6803-14d0-4693-9a08-071107c9aaee",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "71fddbb6-c846-4d78-8152-ce59f2199381"
              }
            ],
            "exits": [
              {
                "uuid": "ff44d9d3-82c1-40bb-897f-0e116875e417",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6b65dd37-18f6-413b-9b81-e5a6cbfc80da",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5591b254-16cd-4443-b023-c35b8d762937",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3ecab7c2-dbfa-47b8-bb37-7954155adccc"
              }
            ],
            "exits": [
              {
                "uuid": "d721220b-99a4-42e7-a46a-b8fe47092305",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f7d4925e-7f73-4158-8790-0e752bb0db4c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "afedef93-33d8-4f57-b263-ddcc20c13967",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "56b3ffb1-d63f-4db6-894d-c0d4322c941e"
              }
            ],
            "exits": [
              {
                "uuid": "18af61b1-3a34-4313-803c-a44d96ef31ce",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "47fb37d4-c9f7-407f-8fe1-aa06dbfc4e0a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f3a47b64-937f-4fe6-a8af-0ec400e58e79",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6d66e70d-12e0-4b03-977b-fca82bb710c7"
              }
            ],
            "exits": [
              {
                "uuid": "3b669a03-6ab7-4ad9-b3aa-94c7f322f070",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "554c79e5-1578-4159-bb11-676c9a5810d7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "da7e1644-fa8e-44ef-b30e-c1f6a2e5698f",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f0128d06-6d39-4097-8bc2-8e38a78751c1"
              }
            ],
            "exits": [
              {
                "uuid": "70b4d137-e28c-4e26-af3d-e988a1137d09",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "28698fc7-0f64-43dc-92bd-251e8a5c37c9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f5127710-001c-4ff0-9c8e-ed100a7d4f3d",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a0440269-6056-4fc6-8b57-682894114e5a"
              }
            ],
            "exits": [
              {
                "uuid": "4c436c37-ea6a-4982-a8c2-9352efde715f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a6d792e6-8d2a-4fa6-b6c6-3da587cd5d30",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d8080fea-3a1c-4046-ae4e-d73564447feb",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "34706b0a-be8b-4819-bbd1-f25b5f085ef6"
              }
            ],
            "exits": [
              {
                "uuid": "fc37f538-3704-415e-8202-0b2f2cfae644",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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