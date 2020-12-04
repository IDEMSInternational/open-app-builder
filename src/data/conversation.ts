export default [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "e53ce4f5-0397-4953-8f6d-9c5c62229bf4",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b4327a79-3a73-4d88-a34a-5bb09f9b78ab",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bc154bea-a8f6-46cf-bccb-091d87486521"
              }
            ],
            "exits": [
              {
                "uuid": "24ee6df8-5887-4784-9426-41a9a615f331",
                "destination_uuid": "e8f76b4c-ce03-4039-901d-1a190a4e3bbe"
              }
            ]
          },
          {
            "uuid": "e8f76b4c-ce03-4039-901d-1a190a4e3bbe",
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
                "uuid": "36ed49ab-477e-4f09-86fd-c319b475c111"
              }
            ],
            "exits": [
              {
                "uuid": "d4fe2db1-8a93-47e5-9323-1a5539a24f1f",
                "destination_uuid": "17f24242-f0c8-423a-ab93-a3c992810c4e"
              }
            ]
          },
          {
            "uuid": "17f24242-f0c8-423a-ab93-a3c992810c4e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5f8b91f7-f39a-4336-922f-65882d707f36",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "bb2a55bc-8a6b-4738-ab54-0a680d569210",
                  "type": "has_only_phrase",
                  "uuid": "104b0af7-c4c8-4c02-a8b1-6c278d28fbc7"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "a94032c0-41d2-4dc3-a693-d1bf8dc0add1",
                  "type": "has_only_phrase",
                  "uuid": "1a54cdcd-80ac-4673-93aa-30d8faea1b90"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "9581f08b-4c9e-4fd0-8600-6b0f2a4de8a8",
                  "type": "has_only_phrase",
                  "uuid": "7c9418e2-5fa4-4b3d-b442-6a53e58e0d33"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "ec6039d3-58ff-468a-8070-1142b7edd26a",
                  "type": "has_only_phrase",
                  "uuid": "b3112470-c8a1-4612-a225-99c7a0d35551"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "be2b48fb-50f7-4756-86ed-0bfa66f104ea",
                  "type": "has_only_phrase",
                  "uuid": "14271c8a-8438-42b5-9378-df4b4d3f71b5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dd5cfa5c-fb00-4a65-a28e-1f65c2e0e291",
                  "name": "All Responses",
                  "uuid": "5f8b91f7-f39a-4336-922f-65882d707f36"
                },
                {
                  "exit_uuid": "4779a28d-c889-45e2-a5d6-dba20eb42012",
                  "name": "First option: launch example_media flow",
                  "uuid": "bb2a55bc-8a6b-4738-ab54-0a680d569210"
                },
                {
                  "exit_uuid": "f69a605e-5b30-44b0-a556-6828c3e5a0c8",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "a94032c0-41d2-4dc3-a693-d1bf8dc0add1"
                },
                {
                  "exit_uuid": "a7683a87-157e-43f6-ab5d-67b74b1e715c",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "9581f08b-4c9e-4fd0-8600-6b0f2a4de8a8"
                },
                {
                  "exit_uuid": "f4d3a977-ae05-45b6-96b8-8678e90c3451",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "ec6039d3-58ff-468a-8070-1142b7edd26a"
                },
                {
                  "exit_uuid": "87c4d5fd-9587-42fa-947b-8d829f1efe95",
                  "name": "Stay in this flow.",
                  "uuid": "be2b48fb-50f7-4756-86ed-0bfa66f104ea"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "dd5cfa5c-fb00-4a65-a28e-1f65c2e0e291",
                "destination_uuid": null
              },
              {
                "uuid": "4779a28d-c889-45e2-a5d6-dba20eb42012",
                "destination_uuid": "33574712-727f-48f3-9466-37f8e570ddba"
              },
              {
                "uuid": "f69a605e-5b30-44b0-a556-6828c3e5a0c8",
                "destination_uuid": "39bb8bb5-b177-43c4-b625-7e8ec4c23a10"
              },
              {
                "uuid": "a7683a87-157e-43f6-ab5d-67b74b1e715c",
                "destination_uuid": "ca7646fd-cbda-4831-9d13-b8ba19c60091"
              },
              {
                "uuid": "f4d3a977-ae05-45b6-96b8-8678e90c3451",
                "destination_uuid": "07fa84f1-28d7-431b-919b-5e132be82265"
              },
              {
                "uuid": "87c4d5fd-9587-42fa-947b-8d829f1efe95",
                "destination_uuid": "d46ff541-7c1f-48c4-88ad-51f575a5f7c3"
              }
            ]
          },
          {
            "uuid": "33574712-727f-48f3-9466-37f8e570ddba",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "5438e763-a578-4950-b8b8-fa09910a9a6f"
                },
                "type": "enter_flow",
                "uuid": "e5b9f6e2-d8d5-4d5b-91f9-9625ee92c416"
              }
            ],
            "exits": [
              {
                "uuid": "bf05fc68-7e99-404f-ba49-754651945bbb",
                "destination_uuid": "6a75f0d2-6d83-4a33-94ae-c1ae398ad3a5"
              },
              {
                "uuid": "a065314f-d446-4660-b81d-ad80895a3625",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b25e202a-4db0-4a9c-8178-c89dd4fae9ee",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "32d96266-f7fb-4713-9e41-ab0f939792ee"
                },
                {
                  "uuid": "9bf14426-da1e-4488-b195-1354a1efbabe",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "29ccc7c7-8c37-429f-861c-e88c1c98f566"
                }
              ],
              "categories": [
                {
                  "uuid": "32d96266-f7fb-4713-9e41-ab0f939792ee",
                  "name": "Complete",
                  "exit_uuid": "bf05fc68-7e99-404f-ba49-754651945bbb"
                },
                {
                  "uuid": "29ccc7c7-8c37-429f-861c-e88c1c98f566",
                  "name": "Expired",
                  "exit_uuid": "a065314f-d446-4660-b81d-ad80895a3625"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "32d96266-f7fb-4713-9e41-ab0f939792ee"
            }
          },
          {
            "uuid": "39bb8bb5-b177-43c4-b625-7e8ec4c23a10",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "32bba1fd-e9d0-4d57-b49a-7a580fb05d1d"
                },
                "type": "enter_flow",
                "uuid": "a0bfc70b-fbc6-4933-9e48-ab768533c1b9"
              }
            ],
            "exits": [
              {
                "uuid": "b11051d8-2523-43dd-b334-44b9e770e24f",
                "destination_uuid": "6a75f0d2-6d83-4a33-94ae-c1ae398ad3a5"
              },
              {
                "uuid": "299cb356-6bca-4ffe-af45-9a48b1da13e2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "69db4912-8ae1-4da5-a2e0-4891bae910a5",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "59553028-b1e4-4559-b9a8-2fb10c9765a8"
                },
                {
                  "uuid": "b8221a51-eebb-4d8d-9ab7-ed0b5c3657b8",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0ff450a9-732f-401c-a89b-ef32545a0c78"
                }
              ],
              "categories": [
                {
                  "uuid": "59553028-b1e4-4559-b9a8-2fb10c9765a8",
                  "name": "Complete",
                  "exit_uuid": "b11051d8-2523-43dd-b334-44b9e770e24f"
                },
                {
                  "uuid": "0ff450a9-732f-401c-a89b-ef32545a0c78",
                  "name": "Expired",
                  "exit_uuid": "299cb356-6bca-4ffe-af45-9a48b1da13e2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "59553028-b1e4-4559-b9a8-2fb10c9765a8"
            }
          },
          {
            "uuid": "ca7646fd-cbda-4831-9d13-b8ba19c60091",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "94782210-463e-47bb-81ad-1d5b9261ebbb"
                },
                "type": "enter_flow",
                "uuid": "72076aad-91e1-4e3a-bdd5-56611acc4686"
              }
            ],
            "exits": [
              {
                "uuid": "0801485b-a051-4c22-ad63-796dd96fd001",
                "destination_uuid": "6a75f0d2-6d83-4a33-94ae-c1ae398ad3a5"
              },
              {
                "uuid": "2e88d8ff-8460-4c9c-b1b3-c0e9f68b500d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5d84e9a1-fd19-47c1-8de2-f651a274c524",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "862321e5-f3fc-4794-8250-6b9848212925"
                },
                {
                  "uuid": "478a4390-92dd-4dac-aedd-e9f78fef23fd",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "1687cc6e-3b79-4349-8451-c2677702aeec"
                }
              ],
              "categories": [
                {
                  "uuid": "862321e5-f3fc-4794-8250-6b9848212925",
                  "name": "Complete",
                  "exit_uuid": "0801485b-a051-4c22-ad63-796dd96fd001"
                },
                {
                  "uuid": "1687cc6e-3b79-4349-8451-c2677702aeec",
                  "name": "Expired",
                  "exit_uuid": "2e88d8ff-8460-4c9c-b1b3-c0e9f68b500d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "862321e5-f3fc-4794-8250-6b9848212925"
            }
          },
          {
            "uuid": "07fa84f1-28d7-431b-919b-5e132be82265",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "4aa0a6d2-7e5d-4650-a47d-44106195e401"
                },
                "type": "enter_flow",
                "uuid": "6db0214a-f02b-4e8d-bfa4-f53498df4e7e"
              }
            ],
            "exits": [
              {
                "uuid": "caad0c90-f33f-4446-a177-8c53618208f8",
                "destination_uuid": "6a75f0d2-6d83-4a33-94ae-c1ae398ad3a5"
              },
              {
                "uuid": "33fbc09f-f6a4-4196-922c-de080085686f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "a3646f87-3081-4ba0-8cea-4cbd8959e83b",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "65fdb638-1c80-4ba2-8016-1b713d1f216b"
                },
                {
                  "uuid": "addd13ad-5312-4878-9449-2d0d9a6d5337",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "ce75dcd5-ade7-4a50-b5fe-d4fe15711c34"
                }
              ],
              "categories": [
                {
                  "uuid": "65fdb638-1c80-4ba2-8016-1b713d1f216b",
                  "name": "Complete",
                  "exit_uuid": "caad0c90-f33f-4446-a177-8c53618208f8"
                },
                {
                  "uuid": "ce75dcd5-ade7-4a50-b5fe-d4fe15711c34",
                  "name": "Expired",
                  "exit_uuid": "33fbc09f-f6a4-4196-922c-de080085686f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "65fdb638-1c80-4ba2-8016-1b713d1f216b"
            }
          },
          {
            "uuid": "d46ff541-7c1f-48c4-88ad-51f575a5f7c3",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b7cf56c4-9abd-4f69-8217-7a1256f62d5b"
              }
            ],
            "exits": [
              {
                "uuid": "c5ff7481-b7a3-48c2-9d32-7fdab9d9e954",
                "destination_uuid": "b167b8a7-312b-4804-bd57-694e128141e5"
              }
            ]
          },
          {
            "uuid": "6a75f0d2-6d83-4a33-94ae-c1ae398ad3a5",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6209d215-1c02-4a79-8715-ae3bacc1007d"
              }
            ],
            "exits": [
              {
                "uuid": "f56bb6fe-2acb-4606-a4b5-5101fd6585b0",
                "destination_uuid": "b167b8a7-312b-4804-bd57-694e128141e5"
              }
            ]
          },
          {
            "uuid": "b167b8a7-312b-4804-bd57-694e128141e5",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "4e787f01-6c15-454b-b2b4-0914b211f209"
              }
            ],
            "exits": [
              {
                "uuid": "b0145a1f-c34c-4bed-8691-bfa13e4ddf04",
                "destination_uuid": "faa34ff4-33db-470c-8d51-f1b236af3dc1"
              }
            ]
          },
          {
            "uuid": "faa34ff4-33db-470c-8d51-f1b236af3dc1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f7dc7070-a3d9-4e6a-ad98-aaa3451ab668",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "74769bc9-f02d-4585-a78a-2c2201192a2b",
                  "type": "has_only_phrase",
                  "uuid": "f987b6c0-61a7-4a4b-9bab-f981855f034c"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "56d13c1f-880c-4082-8d94-af0ffb2a63f4",
                  "type": "has_only_phrase",
                  "uuid": "080ab7b7-e08b-4a2b-bb9f-c92919a24c3b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "40a27733-5404-4dd8-b101-984634f319f3",
                  "name": "All Responses",
                  "uuid": "f7dc7070-a3d9-4e6a-ad98-aaa3451ab668"
                },
                {
                  "exit_uuid": "7e3e9a3c-5fde-487c-88ef-b6f6107a39e7",
                  "name": "Yes",
                  "uuid": "74769bc9-f02d-4585-a78a-2c2201192a2b"
                },
                {
                  "exit_uuid": "56dc6311-b6a5-413c-ac2e-9b9d5942ab5c",
                  "name": "No",
                  "uuid": "56d13c1f-880c-4082-8d94-af0ffb2a63f4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "40a27733-5404-4dd8-b101-984634f319f3",
                "destination_uuid": null
              },
              {
                "uuid": "7e3e9a3c-5fde-487c-88ef-b6f6107a39e7",
                "destination_uuid": "e8f76b4c-ce03-4039-901d-1a190a4e3bbe"
              },
              {
                "uuid": "56dc6311-b6a5-413c-ac2e-9b9d5942ab5c",
                "destination_uuid": "4064e045-fd01-4770-8aa5-597f3940d181"
              }
            ]
          },
          {
            "uuid": "4064e045-fd01-4770-8aa5-597f3940d181",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bd8d526e-f6a9-444a-ac6c-e4ae03f66dbd"
              }
            ],
            "exits": [
              {
                "uuid": "2c99ad35-6e0c-4872-b820-66a2145f5620",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1001ab32-439f-4ea5-be62-f5ac5e8536d3",
            "actions": [
              {
                "uuid": "1c1d2286-7926-4e0e-9ee6-7f2b796ff155",
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
                "uuid": "984b8202-43f3-4c54-a131-34434932110b",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "82bf46cb-bbfc-4829-8f03-ad2bf568b9e0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "60535dfb-0d69-46e1-8416-ade63aed9a42",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "379de4bd-89f5-4223-b7d7-17d238400347"
              }
            ],
            "exits": [
              {
                "uuid": "c0ef2409-5d61-44c9-859f-c734946ae9fb",
                "destination_uuid": "82c678eb-989b-4755-ac3a-16f8e6a8f7cc"
              }
            ]
          },
          {
            "uuid": "41d49365-5a5e-418e-9274-441c8afec0f2",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "94cee093-e5d1-4b55-ab83-24d91ad6c395"
              }
            ],
            "exits": [
              {
                "uuid": "b2c4ebed-a4db-40f1-a95a-ec2c9fd87c9d",
                "destination_uuid": "bec6dfe6-60d1-4297-b2f1-fdbcf7f704bb"
              }
            ]
          },
          {
            "uuid": "bec6dfe6-60d1-4297-b2f1-fdbcf7f704bb",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "10e9b997-751e-4b53-80fb-c5743786e8aa"
              }
            ],
            "exits": [
              {
                "uuid": "916db12a-9fc1-40d4-a03d-a483cc798e1a",
                "destination_uuid": "f3284ae9-bd77-4257-b36e-7c753a39792f"
              }
            ]
          },
          {
            "uuid": "f3284ae9-bd77-4257-b36e-7c753a39792f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "888c0086-9ae5-47fc-b990-d09f54accc42",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "c77ca8da-5dcf-4d9a-857b-8fad54f83b24",
                  "type": "has_only_phrase",
                  "uuid": "f870cbf5-a55c-4b4a-bf53-32a2a2f7e411"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "c77ca8da-5dcf-4d9a-857b-8fad54f83b24",
                  "type": "has_only_phrase",
                  "uuid": "24a2da15-0d27-4038-bd87-3042f3bee868"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "01151435-4ad9-44cd-9323-4a93d2f91b5d",
                  "name": "All Responses",
                  "uuid": "888c0086-9ae5-47fc-b990-d09f54accc42"
                },
                {
                  "exit_uuid": "c0a9e8aa-52b9-4eb2-8191-f01af12383d1",
                  "name": "image1; image2",
                  "uuid": "c77ca8da-5dcf-4d9a-857b-8fad54f83b24"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "01151435-4ad9-44cd-9323-4a93d2f91b5d",
                "destination_uuid": null
              },
              {
                "uuid": "c0a9e8aa-52b9-4eb2-8191-f01af12383d1",
                "destination_uuid": "844ee052-beed-4ab5-b185-5e6e90c9f3bc"
              }
            ]
          },
          {
            "uuid": "844ee052-beed-4ab5-b185-5e6e90c9f3bc",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "f00cf275-45a7-4387-8f57-f659700c02b6"
              }
            ],
            "exits": [
              {
                "uuid": "e997f5c7-b100-4296-abe4-a7f9af673546",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "82c678eb-989b-4755-ac3a-16f8e6a8f7cc",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "01937cca-9903-447c-a99d-52a9244fa1c8",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "7c1dd6b4-263a-441d-a3b2-6d35fd149a78",
                  "type": "has_only_phrase",
                  "uuid": "353f2431-eb1f-40ed-8ae3-a5b5d248b55c"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "7c1dd6b4-263a-441d-a3b2-6d35fd149a78",
                  "type": "has_only_phrase",
                  "uuid": "7776066f-a978-48f8-aa56-6fe439774fdc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ce9b3832-252b-40af-b796-6e89bf52da1a",
                  "name": "All Responses",
                  "uuid": "01937cca-9903-447c-a99d-52a9244fa1c8"
                },
                {
                  "exit_uuid": "161556c1-06ac-4b44-a459-9fa35931997a",
                  "name": "image1; image2",
                  "uuid": "7c1dd6b4-263a-441d-a3b2-6d35fd149a78"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ce9b3832-252b-40af-b796-6e89bf52da1a",
                "destination_uuid": "41d49365-5a5e-418e-9274-441c8afec0f2"
              },
              {
                "uuid": "161556c1-06ac-4b44-a459-9fa35931997a",
                "destination_uuid": "f50c7147-c53f-4b03-a6c6-bfb591f8de62"
              }
            ]
          },
          {
            "uuid": "f50c7147-c53f-4b03-a6c6-bfb591f8de62",
            "actions": [
              {
                "uuid": "1ee4b1cc-6c49-4ed6-9e88-54c9619002bc",
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
                "uuid": "6856c3bf-a839-467a-9645-1be19b2a2c8c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "dd558c0b-4f62-4f67-86ef-4d11e4e75ff8",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "10a17d5e-2807-4508-b29d-f8b6e80ac4c1",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "fd71c693-2f43-40ad-84be-1443a3854214"
              }
            ],
            "exits": [
              {
                "uuid": "c28afc2d-514f-4224-b844-4aecc98d4c28",
                "destination_uuid": "2210a694-79c4-4581-9176-17f2d5f987b7"
              }
            ]
          },
          {
            "uuid": "2210a694-79c4-4581-9176-17f2d5f987b7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d354183a-9b0e-403a-bb54-3beb3e45ad4d",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "8b5a29d9-63e0-406b-8be0-ce0a3b11d9b0",
                  "type": "has_only_phrase",
                  "uuid": "e4e6e323-ef98-47f3-8a54-88e195ec80f7"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "af00b201-421a-4fbc-968f-83a83a52c1f2",
                  "type": "has_only_phrase",
                  "uuid": "f92e3b22-4937-4eaa-9ab6-b2ccaf05c8b6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c3cf9c03-9f88-4d59-8243-5acc40ec1b67",
                  "name": "All Responses",
                  "uuid": "d354183a-9b0e-403a-bb54-3beb3e45ad4d"
                },
                {
                  "exit_uuid": "c0e1d5b2-6363-484d-8a00-e64b02be65df",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "8b5a29d9-63e0-406b-8be0-ce0a3b11d9b0"
                },
                {
                  "exit_uuid": "506b8481-2bdd-4a75-b10a-f51feb031387",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "af00b201-421a-4fbc-968f-83a83a52c1f2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c3cf9c03-9f88-4d59-8243-5acc40ec1b67",
                "destination_uuid": null
              },
              {
                "uuid": "c0e1d5b2-6363-484d-8a00-e64b02be65df",
                "destination_uuid": "41672b85-2f57-4c22-8d23-289733ad0140"
              },
              {
                "uuid": "506b8481-2bdd-4a75-b10a-f51feb031387",
                "destination_uuid": "7ffe2372-6536-4b88-b178-1cc8432afb25"
              }
            ]
          },
          {
            "uuid": "41672b85-2f57-4c22-8d23-289733ad0140",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "108e86ad-f302-4342-b7c5-8f17d79809e7"
              }
            ],
            "exits": [
              {
                "uuid": "bae4e16e-fa28-4a84-99c7-29d9fe2c6f1f",
                "destination_uuid": "9130b334-74e5-4d63-ae2f-95d148cf24da"
              }
            ]
          },
          {
            "uuid": "7ffe2372-6536-4b88-b178-1cc8432afb25",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "f4c7d817-3d5e-41cc-94f5-fd89549d1204"
              }
            ],
            "exits": [
              {
                "uuid": "95ac0fdc-6a1a-4d1d-8983-c28de26e7898",
                "destination_uuid": "9130b334-74e5-4d63-ae2f-95d148cf24da"
              }
            ]
          },
          {
            "uuid": "9130b334-74e5-4d63-ae2f-95d148cf24da",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "00c70e62-ff9c-4a8a-9543-ea6463303031",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "b990c0f0-af6e-4563-bd4b-2831df058b34",
                  "type": "has_only_phrase",
                  "uuid": "9a806c65-c7d1-421c-8314-65fcfe0c350e"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "68ff5518-8fe8-40b9-b269-7cedde6ecc2c",
                  "type": "has_only_phrase",
                  "uuid": "9d9faca9-c2ad-4e0f-97e1-bc14cdd31cd4"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "166aea67-73e3-4ff8-854b-1c9d40640e2c",
                  "type": "has_only_phrase",
                  "uuid": "b7e77e27-f033-4ee3-a5e5-e5d47960d440"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0a3df7e2-cee9-4697-976b-9111a57c6f63",
                  "name": "All Responses",
                  "uuid": "00c70e62-ff9c-4a8a-9543-ea6463303031"
                },
                {
                  "exit_uuid": "cfe41886-9926-4e31-9129-b2f53b4dd5c4",
                  "name": "Hello",
                  "uuid": "b990c0f0-af6e-4563-bd4b-2831df058b34"
                },
                {
                  "exit_uuid": "fb3ad431-6736-492c-84f5-3dbff8db8bf9",
                  "name": "Goodbye",
                  "uuid": "68ff5518-8fe8-40b9-b269-7cedde6ecc2c"
                },
                {
                  "exit_uuid": "f9734b67-f90b-4c2d-a77e-f1d1794ef96b",
                  "name": "Goodbye",
                  "uuid": "166aea67-73e3-4ff8-854b-1c9d40640e2c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0a3df7e2-cee9-4697-976b-9111a57c6f63",
                "destination_uuid": null
              },
              {
                "uuid": "cfe41886-9926-4e31-9129-b2f53b4dd5c4",
                "destination_uuid": "e5c053ca-4df0-4428-b676-e48c9d635725"
              },
              {
                "uuid": "fb3ad431-6736-492c-84f5-3dbff8db8bf9",
                "destination_uuid": "26c672ed-06d1-47ba-a8c9-fb493bed8214"
              },
              {
                "uuid": "f9734b67-f90b-4c2d-a77e-f1d1794ef96b",
                "destination_uuid": "26c672ed-06d1-47ba-a8c9-fb493bed8214"
              }
            ]
          },
          {
            "uuid": "e5c053ca-4df0-4428-b676-e48c9d635725",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d6016775-e741-45f2-956c-2080c9fa89f5"
              }
            ],
            "exits": [
              {
                "uuid": "67b260c5-b50d-4928-942d-59673958df32",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "26c672ed-06d1-47ba-a8c9-fb493bed8214",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0c324f26-92c9-4cd5-8678-623dcaf88b8c"
              }
            ],
            "exits": [
              {
                "uuid": "321bb5be-5a1f-4b03-af12-64da17d6ae06",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "e2fdc202-cb1a-4e2e-931c-55d8d4b5f767",
            "actions": [
              {
                "uuid": "a715b1dc-e6ed-43a8-af48-2732cd9f92db",
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
                "uuid": "b53beca1-41ef-405a-8ad3-9d6f779ecfbd",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "aaa4412f-16ac-454a-bee6-abddf3329999",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "93b3db1d-3bd1-4c8d-ad06-9375a6994f2d",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7c753565-17be-4c32-8c7a-aba355f614b9"
              }
            ],
            "exits": [
              {
                "uuid": "0066e703-9d57-42f8-b2e5-dc1dd62361aa",
                "destination_uuid": "cc3f11d6-b060-42dc-9321-add6eb016361"
              }
            ]
          },
          {
            "uuid": "cc3f11d6-b060-42dc-9321-add6eb016361",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "92f48b98-6b19-4dc8-8a75-41da44e8e58f"
              }
            ],
            "exits": [
              {
                "uuid": "82aaff60-e671-4502-9c10-8c2408fd5018",
                "destination_uuid": "81a52f5b-adf9-49a1-96a2-acc950ece9e6"
              }
            ]
          },
          {
            "uuid": "81a52f5b-adf9-49a1-96a2-acc950ece9e6",
            "actions": [],
            "exits": [
              {
                "uuid": "d0d0d2cd-b723-420c-a438-192bf509c3ec",
                "destination_uuid": "3bbb85fc-90d1-45b4-9924-671bfc6d0a20"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3b46843e-3ec6-49c1-a3f2-66755be1a923",
              "cases": [],
              "categories": [
                {
                  "uuid": "3b46843e-3ec6-49c1-a3f2-66755be1a923",
                  "name": "All Responses",
                  "exit_uuid": "d0d0d2cd-b723-420c-a438-192bf509c3ec"
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
            "uuid": "3bbb85fc-90d1-45b4-9924-671bfc6d0a20",
            "actions": [
              {
                "uuid": "2bfd5db5-4ffe-48ad-9c77-a5807a892c6c",
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
                "uuid": "7d8a9b91-bae3-4fe2-bce2-1ade03f7fbcc",
                "destination_uuid": "486bb865-a9ca-4814-af48-64f2a60b3c93"
              }
            ]
          },
          {
            "uuid": "486bb865-a9ca-4814-af48-64f2a60b3c93",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "07f0fe59-6818-4603-a275-f417225d9325",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "935a64a5-82c6-4456-9eb5-a50c5fdd9175",
                  "type": "has_only_phrase",
                  "uuid": "50b05db5-ef0d-4171-ac82-e31ec33f1a7d"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "3760c6d7-0b38-4c55-80b4-8d3023e7f847",
                  "type": "has_only_phrase",
                  "uuid": "4026b84b-f244-4076-95a1-1974fc6cf59e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0537d34c-938a-40a4-855b-e01d06b6db3d",
                  "name": "All Responses",
                  "uuid": "07f0fe59-6818-4603-a275-f417225d9325"
                },
                {
                  "exit_uuid": "5a71e5e1-6714-422e-86b8-ed413c9f124d",
                  "name": "1",
                  "uuid": "935a64a5-82c6-4456-9eb5-a50c5fdd9175"
                },
                {
                  "exit_uuid": "ab24a944-471e-45d4-8747-a92273625f48",
                  "name": "2",
                  "uuid": "3760c6d7-0b38-4c55-80b4-8d3023e7f847"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "0537d34c-938a-40a4-855b-e01d06b6db3d",
                "destination_uuid": "6cd30aa6-a187-4f6b-b896-c36dbcb1390d"
              },
              {
                "uuid": "5a71e5e1-6714-422e-86b8-ed413c9f124d",
                "destination_uuid": "8d425abc-269e-492f-93c9-187f517a8fc3"
              },
              {
                "uuid": "ab24a944-471e-45d4-8747-a92273625f48",
                "destination_uuid": "9fe1572b-8988-4a23-9bb4-abeeac75cefa"
              }
            ]
          },
          {
            "uuid": "8d425abc-269e-492f-93c9-187f517a8fc3",
            "actions": [
              {
                "uuid": "a88ad7ee-61cf-454a-9c4b-92aeb2e7e3e8",
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
                "uuid": "0f310214-7c2f-4b50-8ee1-bcac8c6f4623",
                "destination_uuid": "9133b10a-a5d1-4913-a50d-659c0cfc26d2"
              }
            ]
          },
          {
            "uuid": "9fe1572b-8988-4a23-9bb4-abeeac75cefa",
            "actions": [
              {
                "uuid": "14ee0ec7-0ee3-4a47-ac39-de4eceb74a82",
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
                "uuid": "3e15d67d-ebd4-47ed-8df3-50e92dcdb61d",
                "destination_uuid": "2ca1771a-8ec3-420e-9e91-cdb91dc3d49d"
              }
            ]
          },
          {
            "uuid": "6cd30aa6-a187-4f6b-b896-c36dbcb1390d",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "04281942-6850-49b9-a5ce-0c3ac04112b2"
              }
            ],
            "exits": [
              {
                "uuid": "054ace17-564f-41ad-8bf5-3e31d36af3d7",
                "destination_uuid": "698366b8-64b0-4830-b505-a8271f609449"
              }
            ]
          },
          {
            "uuid": "698366b8-64b0-4830-b505-a8271f609449",
            "actions": [],
            "exits": [
              {
                "uuid": "b1e5076f-1924-430a-a8e1-cdaaab34df90",
                "destination_uuid": "19b54021-b9d0-489b-a3b6-59df894a8582"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f579c1d5-2acc-475f-8ea3-afa3c44af709",
              "cases": [],
              "categories": [
                {
                  "uuid": "f579c1d5-2acc-475f-8ea3-afa3c44af709",
                  "name": "All Responses",
                  "exit_uuid": "b1e5076f-1924-430a-a8e1-cdaaab34df90"
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
            "uuid": "19b54021-b9d0-489b-a3b6-59df894a8582",
            "actions": [
              {
                "uuid": "8a3603d6-1b1d-4a08-a179-3c9203b7505a",
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
                "uuid": "1e0bfb14-ccc4-49ed-b869-69fcb144dc74",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "9133b10a-a5d1-4913-a50d-659c0cfc26d2",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5a4e8a86-435b-4f89-914b-556e2d9e28c9"
              }
            ],
            "exits": [
              {
                "uuid": "32014473-326b-4c20-93aa-05b2ac35dd09",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "2ca1771a-8ec3-420e-9e91-cdb91dc3d49d",
            "actions": [
              {
                "uuid": "a6ed1997-f24f-441c-8b7f-bccc59926c24",
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
                "uuid": "a637ae96-4a6c-43fc-abcd-d5ebec16e6f0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "61dcb493-ee81-4a90-a46d-d1bb43a4eb62",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "cc1f8c7c-b28d-4eeb-88db-7347134ee67e",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "188c6428-580f-45b2-910f-8ac42c5efed0"
              }
            ],
            "exits": [
              {
                "uuid": "d8357d1d-33a1-4b6b-af54-98077d15d70b",
                "destination_uuid": "b8bc8dc7-d28f-47d9-adc9-e649664b5d10"
              }
            ]
          },
          {
            "uuid": "b8bc8dc7-d28f-47d9-adc9-e649664b5d10",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0d12b5a0-5be6-4977-b8a9-d0a207ae636d",
              "cases": [
                {
                  "arguments": [
                    "Go to the story"
                  ],
                  "category_uuid": "90411147-2d3a-40db-a32f-ff5078969f03",
                  "type": "has_only_phrase",
                  "uuid": "33d82e12-09d2-469f-a54b-8171504e640d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "130160d2-a4fe-4435-90e9-934806eb9091",
                  "name": "All Responses",
                  "uuid": "0d12b5a0-5be6-4977-b8a9-d0a207ae636d"
                },
                {
                  "exit_uuid": "847b38c4-a8ee-4916-9da0-5bae677679d2",
                  "name": "Go to the story",
                  "uuid": "90411147-2d3a-40db-a32f-ff5078969f03"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "130160d2-a4fe-4435-90e9-934806eb9091",
                "destination_uuid": null
              },
              {
                "uuid": "847b38c4-a8ee-4916-9da0-5bae677679d2",
                "destination_uuid": "e5bb9ca4-0f82-4c7d-9df8-47e2f2d76b10"
              }
            ]
          },
          {
            "uuid": "e5bb9ca4-0f82-4c7d-9df8-47e2f2d76b10",
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
                "uuid": "87e43a5f-1944-42a0-97fc-e4d36f46e828"
              }
            ],
            "exits": [
              {
                "uuid": "b44ac480-8842-4106-92dd-6962c3c60897",
                "destination_uuid": "1d2cc2cb-0ec5-4974-86a5-43038d6db4fa"
              }
            ]
          },
          {
            "uuid": "1d2cc2cb-0ec5-4974-86a5-43038d6db4fa",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2cf1ad21-d818-4c60-b13f-feb1b34b0150",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "eb0de2e0-db7e-49a7-8be0-434dee67468a",
                  "type": "has_only_phrase",
                  "uuid": "b03f3a83-9a65-4391-b930-db676c6af87b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d40a97e1-989a-4835-8a52-28183c6db282",
                  "name": "All Responses",
                  "uuid": "2cf1ad21-d818-4c60-b13f-feb1b34b0150"
                },
                {
                  "exit_uuid": "b1269246-776f-4cdc-99fa-3283034bd56f",
                  "name": "Next",
                  "uuid": "eb0de2e0-db7e-49a7-8be0-434dee67468a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d40a97e1-989a-4835-8a52-28183c6db282",
                "destination_uuid": null
              },
              {
                "uuid": "b1269246-776f-4cdc-99fa-3283034bd56f",
                "destination_uuid": "a8f458be-a6da-4899-a629-e75d038a9385"
              }
            ]
          },
          {
            "uuid": "a8f458be-a6da-4899-a629-e75d038a9385",
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
                "uuid": "00fc77e4-fef7-43da-b377-9436afe811f9"
              }
            ],
            "exits": [
              {
                "uuid": "61533153-4262-4b7e-b6a0-75e339f2a7ff",
                "destination_uuid": "38401b91-ea1f-4cf6-8a25-67f2d86b21b3"
              }
            ]
          },
          {
            "uuid": "38401b91-ea1f-4cf6-8a25-67f2d86b21b3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c885844a-c897-41af-a97c-02eda46db90b",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "758e9853-ada3-4fdb-95f5-872da1c6c2f6",
                  "type": "has_only_phrase",
                  "uuid": "5bb42b43-bce0-4cf0-8a43-53af9fd088ac"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "eec9e10b-bfde-4081-be22-1b31352ec0b5",
                  "type": "has_only_phrase",
                  "uuid": "abb69ca7-7485-49d1-8c3a-42c86f157612"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a36b15b2-8713-4c03-b64b-9af170854a43",
                  "name": "All Responses",
                  "uuid": "c885844a-c897-41af-a97c-02eda46db90b"
                },
                {
                  "exit_uuid": "4063c4e1-ed28-4df4-9fcd-13782ae90913",
                  "name": "Previous",
                  "uuid": "758e9853-ada3-4fdb-95f5-872da1c6c2f6"
                },
                {
                  "exit_uuid": "fa7613b8-820b-4f89-a97f-013739f5db40",
                  "name": "Next",
                  "uuid": "eec9e10b-bfde-4081-be22-1b31352ec0b5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a36b15b2-8713-4c03-b64b-9af170854a43",
                "destination_uuid": null
              },
              {
                "uuid": "4063c4e1-ed28-4df4-9fcd-13782ae90913",
                "destination_uuid": "e5bb9ca4-0f82-4c7d-9df8-47e2f2d76b10"
              },
              {
                "uuid": "fa7613b8-820b-4f89-a97f-013739f5db40",
                "destination_uuid": "91c13725-dc9d-4745-800e-25703712ff02"
              }
            ]
          },
          {
            "uuid": "91c13725-dc9d-4745-800e-25703712ff02",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "47e5912d-22bf-479c-9227-8aaabfdb9bab"
              }
            ],
            "exits": [
              {
                "uuid": "30344a5b-6603-45e3-bbad-c593fdd5ba40",
                "destination_uuid": "e50fcc84-c4e1-4a84-ab64-81f098e0ec31"
              }
            ]
          },
          {
            "uuid": "e50fcc84-c4e1-4a84-ab64-81f098e0ec31",
            "actions": [
              {
                "uuid": "e8e1081c-02e5-4c02-8a2f-84a3cc362cd0",
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
                "uuid": "5318ae0b-e4fd-4f40-8232-a62b55b52027",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "1e147f1d-ff0b-48e0-aae2-7d5255d0f8f8",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "dbc75594-b57d-41c4-9106-e24f67aa0115",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b36628b5-7b77-4321-afa3-4d4e66dc54ba"
              }
            ],
            "exits": [
              {
                "uuid": "2033c729-3f5d-4b95-9747-e29618d0b721",
                "destination_uuid": "82859617-655f-402a-8bb8-05efcae281a5"
              }
            ]
          },
          {
            "uuid": "82859617-655f-402a-8bb8-05efcae281a5",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "49f6e679-8e96-4e45-9f26-49d259086a52"
              }
            ],
            "exits": [
              {
                "uuid": "56146818-0df3-42b7-81d3-8f4ff903c9b5",
                "destination_uuid": "76f27640-e486-484c-9f38-beb53906a66e"
              }
            ]
          },
          {
            "uuid": "76f27640-e486-484c-9f38-beb53906a66e",
            "actions": [],
            "exits": [
              {
                "uuid": "d24aa3f7-f123-4838-8d96-aca1c1abc69a",
                "destination_uuid": "cccf54a5-bc72-42f8-9c12-ab5575bcab12"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8e32af5c-6f4c-4300-99bd-444232dc584c",
              "cases": [],
              "categories": [
                {
                  "uuid": "8e32af5c-6f4c-4300-99bd-444232dc584c",
                  "name": "All Responses",
                  "exit_uuid": "d24aa3f7-f123-4838-8d96-aca1c1abc69a"
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
            "uuid": "cccf54a5-bc72-42f8-9c12-ab5575bcab12",
            "actions": [
              {
                "uuid": "c8a66a71-f644-4b9c-8edb-edba830e05cf",
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
                "uuid": "7aeb8e57-d00f-427c-9b1e-f21785b205a7",
                "destination_uuid": "2a14bc8e-e210-4603-b815-4d1fccf4aa9b"
              }
            ]
          },
          {
            "uuid": "2a14bc8e-e210-4603-b815-4d1fccf4aa9b",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "82aa69e5-a2db-48d4-8bc5-7ddb46e04b64"
                },
                "type": "enter_flow",
                "uuid": "bef0fca1-4c34-4830-b34e-5eb49635fb99"
              }
            ],
            "exits": [
              {
                "uuid": "5e8cd0d2-eed2-4709-8717-ca75d6183f85",
                "destination_uuid": "faf23b1a-3b87-4f4f-91ba-c647f61e694a"
              },
              {
                "uuid": "061d4068-56be-4efe-b166-52ab2bed634a",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8c541590-ffb2-4814-986a-c834d24305f5",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "2d263cc7-cd1f-41e8-a4aa-47e0a6cf6e3d"
                },
                {
                  "uuid": "8a21fd99-1a91-433f-87cd-781eb41864b3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "1855fb1c-9f04-4d10-9da5-2d43647f1fab"
                }
              ],
              "categories": [
                {
                  "uuid": "2d263cc7-cd1f-41e8-a4aa-47e0a6cf6e3d",
                  "name": "Complete",
                  "exit_uuid": "5e8cd0d2-eed2-4709-8717-ca75d6183f85"
                },
                {
                  "uuid": "1855fb1c-9f04-4d10-9da5-2d43647f1fab",
                  "name": "Expired",
                  "exit_uuid": "061d4068-56be-4efe-b166-52ab2bed634a"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "2d263cc7-cd1f-41e8-a4aa-47e0a6cf6e3d"
            }
          },
          {
            "uuid": "faf23b1a-3b87-4f4f-91ba-c647f61e694a",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "b1bb6cf3-f3e4-4c44-85ac-1b73d1c74142"
              }
            ],
            "exits": [
              {
                "uuid": "8735c6cd-ad23-4088-b6a4-626a7b873446",
                "destination_uuid": "f8fec81e-af9e-4d62-96dc-0bad6c185fe4"
              }
            ]
          },
          {
            "uuid": "f8fec81e-af9e-4d62-96dc-0bad6c185fe4",
            "actions": [],
            "exits": [
              {
                "uuid": "aa3b9280-2011-4e32-9ef9-6550c47fd098",
                "destination_uuid": "c2b3a694-057e-4b3e-88c7-623becf0f48e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fbebdcd9-c7e4-4230-a0be-eac6e34d15d1",
              "cases": [],
              "categories": [
                {
                  "uuid": "fbebdcd9-c7e4-4230-a0be-eac6e34d15d1",
                  "name": "All Responses",
                  "exit_uuid": "aa3b9280-2011-4e32-9ef9-6550c47fd098"
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
            "uuid": "c2b3a694-057e-4b3e-88c7-623becf0f48e",
            "actions": [
              {
                "uuid": "3557b63e-1103-4a73-8d4e-1be850201ff9",
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
                "uuid": "2f76df46-687b-4ec9-a1f9-4cefcb0476d2",
                "destination_uuid": "7cb9606a-976f-4a61-8594-d6b5a5c67c64"
              }
            ]
          },
          {
            "uuid": "7cb9606a-976f-4a61-8594-d6b5a5c67c64",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "02a9b221-6113-4fc2-ad5c-b258b8308bf9",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "7e7089d9-7082-4f4c-be0c-fb6070bb4b9c",
                  "type": "has_only_phrase",
                  "uuid": "a46d5cc0-f606-4774-ae33-0a48d383370b"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "e4e9f2e7-4820-4ee2-aa26-59dca78eea9b",
                  "type": "has_only_phrase",
                  "uuid": "e89509c5-4227-499b-b487-322fb848d720"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8a6387e7-326d-4649-90ed-b47c12a5c407",
                  "name": "All Responses",
                  "uuid": "02a9b221-6113-4fc2-ad5c-b258b8308bf9"
                },
                {
                  "exit_uuid": "9b352140-bbac-48f1-ac94-e007d9679ff1",
                  "name": "guide1",
                  "uuid": "7e7089d9-7082-4f4c-be0c-fb6070bb4b9c"
                },
                {
                  "exit_uuid": "dc1d1c3e-eb70-4a52-825a-669607a0d3b5",
                  "name": "guide2",
                  "uuid": "e4e9f2e7-4820-4ee2-aa26-59dca78eea9b"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "8a6387e7-326d-4649-90ed-b47c12a5c407",
                "destination_uuid": null
              },
              {
                "uuid": "9b352140-bbac-48f1-ac94-e007d9679ff1",
                "destination_uuid": "ac62896e-6abf-4461-aab6-8b137e3fd0f2"
              },
              {
                "uuid": "dc1d1c3e-eb70-4a52-825a-669607a0d3b5",
                "destination_uuid": "eff36156-cdef-4989-a8b4-b742b0dfb8a3"
              }
            ]
          },
          {
            "uuid": "ac62896e-6abf-4461-aab6-8b137e3fd0f2",
            "actions": [
              {
                "uuid": "9024e6fb-67b1-40af-80ad-0c4e91f59027",
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
                "uuid": "87100f0b-bc9b-4d25-8610-902563057d70",
                "destination_uuid": "249454b6-c0fc-4c89-82c4-c1f7c3496711"
              }
            ]
          },
          {
            "uuid": "eff36156-cdef-4989-a8b4-b742b0dfb8a3",
            "actions": [
              {
                "uuid": "ae79534b-55d1-4aa3-9787-e6ced5240ed6",
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
                "uuid": "14d7bcb9-308a-4d31-bd72-83093dd1a070",
                "destination_uuid": "249454b6-c0fc-4c89-82c4-c1f7c3496711"
              }
            ]
          },
          {
            "uuid": "249454b6-c0fc-4c89-82c4-c1f7c3496711",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "12e052a2-8611-43fb-9244-9370ddfce65e"
              }
            ],
            "exits": [
              {
                "uuid": "1d26273e-81e6-4dde-9f2e-79700ee75bfe",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "59f920a9-3658-4821-8390-a8c96d882b9b",
            "actions": [
              {
                "uuid": "27743296-2eda-4de2-850a-286190bcba40",
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
                "uuid": "9d753196-3ecc-48b2-9e50-8d914822c779",
                "destination_uuid": "9de63fac-17d7-4b16-a896-b04a24d46e07"
              }
            ]
          },
          {
            "uuid": "9de63fac-17d7-4b16-a896-b04a24d46e07",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "7768c653-c12a-4f67-8c02-b98a42e67c73"
                },
                "type": "enter_flow",
                "uuid": "624ba596-dd87-42e3-80a1-e96f650022df"
              }
            ],
            "exits": [
              {
                "uuid": "34d0360c-41eb-40bc-9608-fce39f4b72a1",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d44d7f22-dcf7-4f1d-a231-6e856e9954bb",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4e60a835-019b-4148-bec0-4d3c0ab389d1",
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
                "uuid": "cba5e6f4-a623-4476-8842-54402c00e926"
              }
            ],
            "exits": [
              {
                "uuid": "f7282e80-e6a1-428c-94ef-d53761a56ea1",
                "destination_uuid": "5be48584-a0c8-4015-b855-19b5b4fe493a"
              }
            ]
          },
          {
            "uuid": "5be48584-a0c8-4015-b855-19b5b4fe493a",
            "actions": [],
            "exits": [
              {
                "uuid": "767c9d81-1e8b-4525-a9c2-1c34f2b53c23",
                "destination_uuid": "a36b0e02-9b58-415a-8c79-625998faaaec"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6e239269-8244-4113-bf49-f66ed6142abb",
              "cases": [],
              "categories": [
                {
                  "uuid": "6e239269-8244-4113-bf49-f66ed6142abb",
                  "name": "All Responses",
                  "exit_uuid": "767c9d81-1e8b-4525-a9c2-1c34f2b53c23"
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
            "uuid": "a36b0e02-9b58-415a-8c79-625998faaaec",
            "actions": [
              {
                "uuid": "dbbe8935-a3da-4bef-96da-d75347748095",
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
                "uuid": "2061ba67-57b0-42a2-836b-f457e7e390dc",
                "destination_uuid": "e6098c78-f97f-4789-82d0-b99a94e8a111"
              }
            ]
          },
          {
            "uuid": "e6098c78-f97f-4789-82d0-b99a94e8a111",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ae4552cc-33f2-440b-8bb7-aaa7e8e53115"
              }
            ],
            "exits": [
              {
                "uuid": "20834aef-0ceb-4633-8d95-58bcd825c2b2",
                "destination_uuid": "a6a86335-bcd2-48fa-8e04-3bfc75ac7143"
              }
            ]
          },
          {
            "uuid": "a6a86335-bcd2-48fa-8e04-3bfc75ac7143",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9990a5d0-26c1-4e2b-8fef-9ca33d0bbb96"
              }
            ],
            "exits": [
              {
                "uuid": "53b7000b-b865-4fbb-a417-65a8e5c91007",
                "destination_uuid": "4c5df15d-c0f7-4374-9b42-3d5e7a2e31de"
              }
            ]
          },
          {
            "uuid": "4c5df15d-c0f7-4374-9b42-3d5e7a2e31de",
            "actions": [
              {
                "flow": {
                  "name": "calm_5",
                  "uuid": "1d76b436-8759-46e5-8f0d-8bc2bbf1088a"
                },
                "type": "enter_flow",
                "uuid": "e0294e24-3c46-44ce-b1fa-746be968688b"
              }
            ],
            "exits": [
              {
                "uuid": "4dd4d028-b39d-43c1-89c9-9af626bcb5dd",
                "destination_uuid": null
              },
              {
                "uuid": "37acad3e-55dd-449a-b15f-4b6f675038a4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5f17c722-35f7-4897-ba2b-01c7b9920b22",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "832f3d24-6845-41b0-bdfb-4246fd0a60e8"
                },
                {
                  "uuid": "bdfbf736-894d-4baf-8261-7e5f3749a153",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "8025a174-8996-4d24-945f-3f13130878d2"
                }
              ],
              "categories": [
                {
                  "uuid": "832f3d24-6845-41b0-bdfb-4246fd0a60e8",
                  "name": "Complete",
                  "exit_uuid": "4dd4d028-b39d-43c1-89c9-9af626bcb5dd"
                },
                {
                  "uuid": "8025a174-8996-4d24-945f-3f13130878d2",
                  "name": "Expired",
                  "exit_uuid": "37acad3e-55dd-449a-b15f-4b6f675038a4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "832f3d24-6845-41b0-bdfb-4246fd0a60e8"
            }
          },
          {
            "uuid": "0fec97bd-1e3b-430e-8136-c0225a439052",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0eab5cf2-4ff3-477d-bd93-1f7db01d0300"
              }
            ],
            "exits": [
              {
                "uuid": "084d2697-38d6-4f49-bf53-d2187c84237e",
                "destination_uuid": "9f32acdd-8285-40cd-93bb-345d1e18b23b"
              }
            ]
          },
          {
            "uuid": "9f32acdd-8285-40cd-93bb-345d1e18b23b",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "f69d1785-c788-460c-9370-11279a98348f"
              }
            ],
            "exits": [
              {
                "uuid": "6951de97-4253-4e18-bd24-45c304bd3ec1",
                "destination_uuid": "7d695827-74d3-4b66-a6c8-bd5541b1dbcf"
              }
            ]
          },
          {
            "uuid": "7d695827-74d3-4b66-a6c8-bd5541b1dbcf",
            "actions": [],
            "exits": [
              {
                "uuid": "190ba51b-f4c2-447c-b9f9-d2bb3d053a23",
                "destination_uuid": "2cbb76ca-3386-48f3-bead-df9c574a6724"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3ea562e5-f7fa-4272-b03d-6b5d24eb0180",
              "cases": [],
              "categories": [
                {
                  "uuid": "3ea562e5-f7fa-4272-b03d-6b5d24eb0180",
                  "name": "All Responses",
                  "exit_uuid": "190ba51b-f4c2-447c-b9f9-d2bb3d053a23"
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
            "uuid": "2cbb76ca-3386-48f3-bead-df9c574a6724",
            "actions": [
              {
                "uuid": "aacf1819-b5fe-4a6a-ba87-b35e965f5518",
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
                "uuid": "e95f0648-bcb1-4ec2-af42-a59d3fbeb8a0",
                "destination_uuid": "3c630fbc-41bc-4fc8-a189-78ab062c9f91"
              }
            ]
          },
          {
            "uuid": "3c630fbc-41bc-4fc8-a189-78ab062c9f91",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0d9c8ade-652c-4aab-b5e4-9159ccbaa8aa"
              }
            ],
            "exits": [
              {
                "uuid": "ce0130b9-31ea-45aa-abed-8e40d15ef28c",
                "destination_uuid": "c65c68bc-8696-4446-a2b0-3b8bd5c46480"
              }
            ]
          },
          {
            "uuid": "c65c68bc-8696-4446-a2b0-3b8bd5c46480",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "686a72c6-8bf8-47b0-9e94-97a52064be83"
              }
            ],
            "exits": [
              {
                "uuid": "80d90bdf-23c2-4e70-8f01-a8bf8af3418f",
                "destination_uuid": "d3bfbda0-8cc0-4501-a94a-8d73c20bd3bd"
              }
            ]
          },
          {
            "uuid": "d3bfbda0-8cc0-4501-a94a-8d73c20bd3bd",
            "actions": [
              {
                "uuid": "410565f0-4acb-4d76-9e3c-5689da383fb6",
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
                "uuid": "420dc316-9615-43a0-bbe2-6c43445ee5d8",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "1cc5eb96-c34a-421c-8f4a-a8c234b65298",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "de4e3f64-aed9-4c8e-9725-4c5d6748253d",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3e492d3c-7b90-4d65-9e6f-aa54231d0d8f"
              }
            ],
            "exits": [
              {
                "uuid": "06009db1-1461-4777-946e-b774eecf2523",
                "destination_uuid": "dbc861eb-b886-4ee0-9903-ca9c10205c4d"
              }
            ]
          },
          {
            "uuid": "dbc861eb-b886-4ee0-9903-ca9c10205c4d",
            "actions": [
              {
                "uuid": "c2ac4bd0-d5c8-4b8d-80a3-8175a14a0d5b",
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
                "uuid": "94d977e2-b53b-45a4-a237-05ebdbf2d2e3",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3f3895e1-e2ef-4363-90a3-4a3850144855",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7d742923-2c38-4656-9d3b-7a15e77455e5",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7913e5af-aaca-407d-a411-7fcc142e0340"
              }
            ],
            "exits": [
              {
                "uuid": "2e30166d-ca19-4fe2-93c4-e34554884cc7",
                "destination_uuid": "c3d7cd16-ed95-43b8-af6f-e43847f9323e"
              }
            ]
          },
          {
            "uuid": "c3d7cd16-ed95-43b8-af6f-e43847f9323e",
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
                "uuid": "86c7d901-0d3b-4b87-98a8-a4f01d36e83d"
              }
            ],
            "exits": [
              {
                "uuid": "85e0d3fe-2d45-49bf-9302-f7bad8d8073c",
                "destination_uuid": "0d567ba6-22f6-4295-8ba9-a685a4942c55"
              }
            ]
          },
          {
            "uuid": "0d567ba6-22f6-4295-8ba9-a685a4942c55",
            "actions": [],
            "exits": [
              {
                "uuid": "521356ee-3e58-42d1-8150-2116722dc8b6",
                "destination_uuid": "03421a49-94f3-49e8-93b9-8bf09aa7fa51"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "54443e5b-e69e-41c0-8139-85baa74bb249",
              "cases": [],
              "categories": [
                {
                  "uuid": "54443e5b-e69e-41c0-8139-85baa74bb249",
                  "name": "All Responses",
                  "exit_uuid": "521356ee-3e58-42d1-8150-2116722dc8b6"
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
            "uuid": "03421a49-94f3-49e8-93b9-8bf09aa7fa51",
            "actions": [
              {
                "uuid": "9a40187f-56c2-4faa-b7d9-c9b682f9c7f8",
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
                "uuid": "75e64357-5883-45bb-b1d2-356fa8a036a1",
                "destination_uuid": "762416aa-ad84-4150-8967-3fc2fdfb2a2b"
              }
            ]
          },
          {
            "uuid": "762416aa-ad84-4150-8967-3fc2fdfb2a2b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "165d7808-f00b-4e72-9fcb-83b0928c6c23",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "7ffd3231-edf8-4625-808e-8b0648265a33",
                  "type": "has_only_phrase",
                  "uuid": "2e36d8d0-c759-4acf-adc0-02b096b87f3f"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "7ffd3231-edf8-4625-808e-8b0648265a33",
                  "type": "has_only_phrase",
                  "uuid": "46cfd53d-9d65-4989-8955-0cc244eeb28c"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "7ffd3231-edf8-4625-808e-8b0648265a33",
                  "type": "has_only_phrase",
                  "uuid": "bcbc71f9-5d19-4b9f-a189-843daad4f444"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "7ffd3231-edf8-4625-808e-8b0648265a33",
                  "type": "has_only_phrase",
                  "uuid": "50acd54f-c61f-40e8-adf3-027ab264da8b"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "454ef594-020f-4871-bda2-d08ac8d10816",
                  "type": "has_only_phrase",
                  "uuid": "5ae87d79-0078-4cd6-b465-080d4dc57f90"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "454ef594-020f-4871-bda2-d08ac8d10816",
                  "type": "has_only_phrase",
                  "uuid": "2643b49d-634d-4e2a-9811-5fc10690ff1b"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "454ef594-020f-4871-bda2-d08ac8d10816",
                  "type": "has_only_phrase",
                  "uuid": "9bd680c3-5807-455e-9eb8-83c143e4f92d"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "454ef594-020f-4871-bda2-d08ac8d10816",
                  "type": "has_only_phrase",
                  "uuid": "12b3d00d-eabb-4219-9170-83624a8b98cb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "93cb7e42-fc1f-4a36-b9a6-58baa9628e27",
                  "name": "All Responses",
                  "uuid": "165d7808-f00b-4e72-9fcb-83b0928c6c23"
                },
                {
                  "exit_uuid": "daa6890a-9851-41d4-acc4-190d73594247",
                  "name": "0;1;2;3",
                  "uuid": "7ffd3231-edf8-4625-808e-8b0648265a33"
                },
                {
                  "exit_uuid": "849d3c3e-09bc-42d4-bc11-6b0b7662285d",
                  "name": "4;5;6;7",
                  "uuid": "454ef594-020f-4871-bda2-d08ac8d10816"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "93cb7e42-fc1f-4a36-b9a6-58baa9628e27",
                "destination_uuid": null
              },
              {
                "uuid": "daa6890a-9851-41d4-acc4-190d73594247",
                "destination_uuid": "88c34188-b683-4a5d-9a95-83800b8bdf4b"
              },
              {
                "uuid": "849d3c3e-09bc-42d4-bc11-6b0b7662285d",
                "destination_uuid": "2198cda1-e8a1-49bb-9752-a6267fb561e3"
              }
            ]
          },
          {
            "uuid": "88c34188-b683-4a5d-9a95-83800b8bdf4b",
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
                "uuid": "1a3dd043-9e2f-4db2-bfa3-70d6c734c85a"
              }
            ],
            "exits": [
              {
                "uuid": "6588098b-2786-42f8-afd7-d95b5b53e3a6",
                "destination_uuid": "b4c23ae8-2527-4640-be24-71871dc74456"
              }
            ]
          },
          {
            "uuid": "2198cda1-e8a1-49bb-9752-a6267fb561e3",
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
                "uuid": "c2ca9a14-a547-470f-a434-27a7b56e24ba"
              }
            ],
            "exits": [
              {
                "uuid": "2476fec4-fcbc-43d7-93d2-deba6b21ac7e",
                "destination_uuid": "b4c23ae8-2527-4640-be24-71871dc74456"
              }
            ]
          },
          {
            "uuid": "b4c23ae8-2527-4640-be24-71871dc74456",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "558b2933-6015-4053-b699-17ed13917a96",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "5c4acc78-8580-4f82-a027-c383d32acb59",
                  "type": "has_only_phrase",
                  "uuid": "38e29f5a-9c99-4f49-9c32-e2d32aedea7c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a079ab18-2f4f-4eae-a9bc-0029132b8c99",
                  "name": "All Responses",
                  "uuid": "558b2933-6015-4053-b699-17ed13917a96"
                },
                {
                  "exit_uuid": "c0e8e41a-e2ad-4ce3-b195-ede91d5b2f9e",
                  "name": "Next",
                  "uuid": "5c4acc78-8580-4f82-a027-c383d32acb59"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a079ab18-2f4f-4eae-a9bc-0029132b8c99",
                "destination_uuid": null
              },
              {
                "uuid": "c0e8e41a-e2ad-4ce3-b195-ede91d5b2f9e",
                "destination_uuid": "efbb5f4a-980b-4ba3-a5c9-7a1dcf236092"
              }
            ]
          },
          {
            "uuid": "efbb5f4a-980b-4ba3-a5c9-7a1dcf236092",
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
                "uuid": "4d4191ad-b72b-44da-b3f6-e02d226f3062"
              }
            ],
            "exits": [
              {
                "uuid": "69792ee7-7e8d-429a-ba49-3eb6db954956",
                "destination_uuid": "0fce3e1f-7534-4309-b73e-05cf202b7646"
              }
            ]
          },
          {
            "uuid": "0fce3e1f-7534-4309-b73e-05cf202b7646",
            "actions": [],
            "exits": [
              {
                "uuid": "3876f5b6-db95-4fcd-b536-80ffb50bc7bb",
                "destination_uuid": "da0de43f-6c56-40cc-9c21-c6a901dc57ea"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3cb924cb-ed57-4702-9886-39549f32bb67",
              "cases": [],
              "categories": [
                {
                  "uuid": "3cb924cb-ed57-4702-9886-39549f32bb67",
                  "name": "All Responses",
                  "exit_uuid": "3876f5b6-db95-4fcd-b536-80ffb50bc7bb"
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
            "uuid": "da0de43f-6c56-40cc-9c21-c6a901dc57ea",
            "actions": [
              {
                "uuid": "4b84dfd8-98df-4b85-ac4e-5e4ee3d5e6a2",
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
                "uuid": "6440337c-cf64-41b4-b537-8ca7d8e94205",
                "destination_uuid": "ad2f1141-bd08-4add-90d5-f8cadcb529c2"
              }
            ]
          },
          {
            "uuid": "ad2f1141-bd08-4add-90d5-f8cadcb529c2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6a7ce063-7289-4b85-b812-8cc7e11a3993",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "86f3701b-8f70-4fde-8889-e06bca8aa498",
                  "type": "has_only_phrase",
                  "uuid": "db3ce042-e4fb-4f00-b84c-fc0890eee3f2"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "86f3701b-8f70-4fde-8889-e06bca8aa498",
                  "type": "has_only_phrase",
                  "uuid": "7e393567-7d3b-4d88-aa01-fb9e888992c9"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "86f3701b-8f70-4fde-8889-e06bca8aa498",
                  "type": "has_only_phrase",
                  "uuid": "ee77fd2c-ca29-4384-9b4f-a26b03e335d5"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "86f3701b-8f70-4fde-8889-e06bca8aa498",
                  "type": "has_only_phrase",
                  "uuid": "14818223-40c2-497a-b72a-b2e43f62f7cb"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "86f3701b-8f70-4fde-8889-e06bca8aa498",
                  "type": "has_only_phrase",
                  "uuid": "d92b7ef6-2f47-46a2-8125-4653b95bc221"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "ad4b71bc-ff4a-479e-9250-36ab470f5a1e",
                  "type": "has_only_phrase",
                  "uuid": "5b6bb8b8-b961-4d09-b3fe-9d397ee42529"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "ad4b71bc-ff4a-479e-9250-36ab470f5a1e",
                  "type": "has_only_phrase",
                  "uuid": "98d9a3e4-cefe-43fe-a995-ad5808a14121"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "ad4b71bc-ff4a-479e-9250-36ab470f5a1e",
                  "type": "has_only_phrase",
                  "uuid": "905b30dd-e68b-4940-be2a-88f54ac1ac1d"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "ad4b71bc-ff4a-479e-9250-36ab470f5a1e",
                  "type": "has_only_phrase",
                  "uuid": "ac233ad2-a6a7-4cdf-bcc1-918a60e4d44b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "99d73cc0-4562-47d2-b357-dd5c5bb3660c",
                  "name": "All Responses",
                  "uuid": "6a7ce063-7289-4b85-b812-8cc7e11a3993"
                },
                {
                  "exit_uuid": "933bbb1c-4ec8-4b5d-9b9a-a2dcf4d11ab1",
                  "name": "0;1;2;3;4",
                  "uuid": "86f3701b-8f70-4fde-8889-e06bca8aa498"
                },
                {
                  "exit_uuid": "283c2495-032a-4870-b5c6-f681e8713397",
                  "name": "5;6;7;8",
                  "uuid": "ad4b71bc-ff4a-479e-9250-36ab470f5a1e"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "99d73cc0-4562-47d2-b357-dd5c5bb3660c",
                "destination_uuid": null
              },
              {
                "uuid": "933bbb1c-4ec8-4b5d-9b9a-a2dcf4d11ab1",
                "destination_uuid": "201484e9-4290-4318-8bad-4a26c49e4c82"
              },
              {
                "uuid": "283c2495-032a-4870-b5c6-f681e8713397",
                "destination_uuid": "9ef1dfea-9292-4ef1-bac3-9bb788ab7825"
              }
            ]
          },
          {
            "uuid": "201484e9-4290-4318-8bad-4a26c49e4c82",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "91f8b954-8c47-4ff0-931a-dbe1c3ae522d"
              }
            ],
            "exits": [
              {
                "uuid": "536b6a71-a818-437d-bf2c-24ff236cba32",
                "destination_uuid": "e67da831-ad04-48e6-a3c3-a7c31debf196"
              }
            ]
          },
          {
            "uuid": "9ef1dfea-9292-4ef1-bac3-9bb788ab7825",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "cfa524ef-2c74-4a44-8cf7-03756544e837"
              }
            ],
            "exits": [
              {
                "uuid": "370ea76e-caae-45d1-bcc6-3635402465bf",
                "destination_uuid": "e67da831-ad04-48e6-a3c3-a7c31debf196"
              }
            ]
          },
          {
            "uuid": "e67da831-ad04-48e6-a3c3-a7c31debf196",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b0379c38-97df-41e0-a731-e848b982aa7c",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9710c85c-4d0c-4f01-bef6-67ffd49378db",
                  "type": "has_only_phrase",
                  "uuid": "a0ed81bb-5448-42c1-83ce-ea70b3bd0ad0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "136a8f01-248c-4faf-a75b-6cf1bac20419",
                  "name": "All Responses",
                  "uuid": "b0379c38-97df-41e0-a731-e848b982aa7c"
                },
                {
                  "exit_uuid": "e0151617-c578-4ef4-9f3d-a6b276a4324c",
                  "name": "Next",
                  "uuid": "9710c85c-4d0c-4f01-bef6-67ffd49378db"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "136a8f01-248c-4faf-a75b-6cf1bac20419",
                "destination_uuid": null
              },
              {
                "uuid": "e0151617-c578-4ef4-9f3d-a6b276a4324c",
                "destination_uuid": "3f2aef0b-15d4-47f9-b802-0e8bb3f77523"
              }
            ]
          },
          {
            "uuid": "3f2aef0b-15d4-47f9-b802-0e8bb3f77523",
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
                "uuid": "a8c90ee0-f24f-4bec-b0bc-4eb11fc131ff"
              }
            ],
            "exits": [
              {
                "uuid": "f1a9b2a4-2779-42d0-8c3b-6cc26c9e7828",
                "destination_uuid": "cb6da43a-f0d0-4ca5-95a2-2128e7077a6e"
              }
            ]
          },
          {
            "uuid": "cb6da43a-f0d0-4ca5-95a2-2128e7077a6e",
            "actions": [],
            "exits": [
              {
                "uuid": "2ed5b114-e672-463c-b1bd-27a798f18cf4",
                "destination_uuid": "2e1e7ebc-af1a-41dd-9ff1-c16763bebcd8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "600dc662-fbcc-4afd-b7eb-4a32bea9420a",
              "cases": [],
              "categories": [
                {
                  "uuid": "600dc662-fbcc-4afd-b7eb-4a32bea9420a",
                  "name": "All Responses",
                  "exit_uuid": "2ed5b114-e672-463c-b1bd-27a798f18cf4"
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
            "uuid": "2e1e7ebc-af1a-41dd-9ff1-c16763bebcd8",
            "actions": [
              {
                "uuid": "e1d5a074-97ea-4de8-ad80-5cb9932d4d7a",
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
                "uuid": "f77c0ce7-66d2-4dcc-aec8-6e7b6607e6f3",
                "destination_uuid": "cdd3a2cf-dd74-4841-a449-b431d035f0bd"
              }
            ]
          },
          {
            "uuid": "cdd3a2cf-dd74-4841-a449-b431d035f0bd",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7977ec35-5653-4ce4-8010-590fbe9d2cdd",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "d082dfb5-9d49-4b4a-9d25-0c265e1681b1",
                  "type": "has_only_phrase",
                  "uuid": "d9b998b0-7894-4131-989c-cd9735507674"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "d082dfb5-9d49-4b4a-9d25-0c265e1681b1",
                  "type": "has_only_phrase",
                  "uuid": "9409adc3-a95c-4a6d-99ac-1211e3f052cb"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "d082dfb5-9d49-4b4a-9d25-0c265e1681b1",
                  "type": "has_only_phrase",
                  "uuid": "6b8f97d9-9c65-4576-8e2c-8ae688087850"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "87edc78e-6ff5-4538-8c75-8f3502620f50",
                  "type": "has_only_phrase",
                  "uuid": "3bdb5a24-4742-4bc8-9f5b-41e75decd2e9"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "87edc78e-6ff5-4538-8c75-8f3502620f50",
                  "type": "has_only_phrase",
                  "uuid": "a8073330-9c8b-431c-befd-424b02b08608"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "87edc78e-6ff5-4538-8c75-8f3502620f50",
                  "type": "has_only_phrase",
                  "uuid": "77a7976c-13bf-42cd-994f-d5050203915b"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "87edc78e-6ff5-4538-8c75-8f3502620f50",
                  "type": "has_only_phrase",
                  "uuid": "2e9ad666-9779-4aec-adac-0237ce7112a4"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "87edc78e-6ff5-4538-8c75-8f3502620f50",
                  "type": "has_only_phrase",
                  "uuid": "3243212e-62bc-4d93-af94-d4e1dc927fc6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0aef1ea5-df57-445d-a1ff-63cc78c192b4",
                  "name": "All Responses",
                  "uuid": "7977ec35-5653-4ce4-8010-590fbe9d2cdd"
                },
                {
                  "exit_uuid": "6f3cef48-d1f9-4248-a8d5-32738c249eb2",
                  "name": "0;1;2",
                  "uuid": "d082dfb5-9d49-4b4a-9d25-0c265e1681b1"
                },
                {
                  "exit_uuid": "488bae8c-e204-4f0a-ad6e-01ea9d66f3a0",
                  "name": "3;4;5;6;7",
                  "uuid": "87edc78e-6ff5-4538-8c75-8f3502620f50"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "0aef1ea5-df57-445d-a1ff-63cc78c192b4",
                "destination_uuid": null
              },
              {
                "uuid": "6f3cef48-d1f9-4248-a8d5-32738c249eb2",
                "destination_uuid": "7fb24e08-142c-40a8-91ec-b6cd10d88810"
              },
              {
                "uuid": "488bae8c-e204-4f0a-ad6e-01ea9d66f3a0",
                "destination_uuid": "8bfa3a2b-eae9-4359-93d0-4a4fda767736"
              }
            ]
          },
          {
            "uuid": "7fb24e08-142c-40a8-91ec-b6cd10d88810",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "2ce137b1-d5cb-4101-9814-b3839f286cbe"
              }
            ],
            "exits": [
              {
                "uuid": "716cf9a5-735f-477e-82d8-da287b3f5e16",
                "destination_uuid": "26fd7675-d88f-4d1b-99bb-f9141b561680"
              }
            ]
          },
          {
            "uuid": "8bfa3a2b-eae9-4359-93d0-4a4fda767736",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "e84a793f-5d14-42e6-8468-ffde4fe889a8"
              }
            ],
            "exits": [
              {
                "uuid": "3770da89-4cd4-4b3f-9e18-a3bb208f27c5",
                "destination_uuid": "26fd7675-d88f-4d1b-99bb-f9141b561680"
              }
            ]
          },
          {
            "uuid": "26fd7675-d88f-4d1b-99bb-f9141b561680",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "653dddac-3725-4a88-8920-8f0bbe9121cc",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "62a69278-4b32-40fd-a027-af3ec5275302",
                  "type": "has_only_phrase",
                  "uuid": "7908639e-6212-41fc-8841-1bd326569b91"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4ddb7fac-239c-4653-8bcf-d9c659cab40c",
                  "name": "All Responses",
                  "uuid": "653dddac-3725-4a88-8920-8f0bbe9121cc"
                },
                {
                  "exit_uuid": "b300394e-50a4-41e5-930a-efa49cdc8d54",
                  "name": "Next",
                  "uuid": "62a69278-4b32-40fd-a027-af3ec5275302"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4ddb7fac-239c-4653-8bcf-d9c659cab40c",
                "destination_uuid": null
              },
              {
                "uuid": "b300394e-50a4-41e5-930a-efa49cdc8d54",
                "destination_uuid": "8b87fac8-5547-4f95-8c86-f4e6b0571b3e"
              }
            ]
          },
          {
            "uuid": "8b87fac8-5547-4f95-8c86-f4e6b0571b3e",
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
                "uuid": "68571444-f965-4871-9b75-31763be0839b"
              }
            ],
            "exits": [
              {
                "uuid": "7a499a5c-04f0-4380-bf0f-2072ceebf89b",
                "destination_uuid": "ea79b84c-4477-4bc8-bdd0-5a2a829e6de2"
              }
            ]
          },
          {
            "uuid": "ea79b84c-4477-4bc8-bdd0-5a2a829e6de2",
            "actions": [],
            "exits": [
              {
                "uuid": "f19c523c-6747-40b3-b157-6ebfcbe2ff14",
                "destination_uuid": "af1255ed-665d-4f5d-86ab-05e1b3aededc"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "adba3cc7-b5a0-4dfd-b16c-49890a791a51",
              "cases": [],
              "categories": [
                {
                  "uuid": "adba3cc7-b5a0-4dfd-b16c-49890a791a51",
                  "name": "All Responses",
                  "exit_uuid": "f19c523c-6747-40b3-b157-6ebfcbe2ff14"
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
            "uuid": "af1255ed-665d-4f5d-86ab-05e1b3aededc",
            "actions": [
              {
                "uuid": "a0a3bc25-b346-49c2-b013-e0479398dfbb",
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
                "uuid": "91c0a61f-9937-455b-bc7f-b34f3542b154",
                "destination_uuid": "80699734-07b6-422d-a810-b6e9fdf89e99"
              }
            ]
          },
          {
            "uuid": "80699734-07b6-422d-a810-b6e9fdf89e99",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8f9344b9-ea9f-4cc6-9528-4b15e697b9c3",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "dba8e726-f846-4422-8c34-27ff120c072a",
                  "type": "has_only_phrase",
                  "uuid": "e0f00448-98d1-4423-9749-35a1aaa705bb"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "dba8e726-f846-4422-8c34-27ff120c072a",
                  "type": "has_only_phrase",
                  "uuid": "2ede3432-af0d-4e18-a3bc-9eca7353064b"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "85b159d1-b7fa-48ab-accd-aed63693758a",
                  "type": "has_only_phrase",
                  "uuid": "b270169c-de2f-4516-b399-8cf7739f5328"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "85b159d1-b7fa-48ab-accd-aed63693758a",
                  "type": "has_only_phrase",
                  "uuid": "ba49a603-3e50-44ad-b2ac-747a697a1753"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "85b159d1-b7fa-48ab-accd-aed63693758a",
                  "type": "has_only_phrase",
                  "uuid": "51e25a4b-cd71-4837-9956-82e3583fb343"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "85b159d1-b7fa-48ab-accd-aed63693758a",
                  "type": "has_only_phrase",
                  "uuid": "bb7a2419-1275-4dd1-9555-f9261a17791c"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "85b159d1-b7fa-48ab-accd-aed63693758a",
                  "type": "has_only_phrase",
                  "uuid": "dcacf2bf-734c-48ba-9830-3bb60b48b3a1"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "85b159d1-b7fa-48ab-accd-aed63693758a",
                  "type": "has_only_phrase",
                  "uuid": "7490ca2e-3e25-4229-8f28-08ff09ef982e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b612ed00-a48a-4028-8107-4caa37d1061e",
                  "name": "All Responses",
                  "uuid": "8f9344b9-ea9f-4cc6-9528-4b15e697b9c3"
                },
                {
                  "exit_uuid": "3192a138-dd8c-491e-a21d-0c7f1e46ebfa",
                  "name": "0;1",
                  "uuid": "dba8e726-f846-4422-8c34-27ff120c072a"
                },
                {
                  "exit_uuid": "bbde091b-97e9-4f26-91b6-82e6a443703e",
                  "name": "2;3;4;5;6;7",
                  "uuid": "85b159d1-b7fa-48ab-accd-aed63693758a"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "b612ed00-a48a-4028-8107-4caa37d1061e",
                "destination_uuid": null
              },
              {
                "uuid": "3192a138-dd8c-491e-a21d-0c7f1e46ebfa",
                "destination_uuid": "c29f6114-c125-4a0b-ac10-a47c2c2d9817"
              },
              {
                "uuid": "bbde091b-97e9-4f26-91b6-82e6a443703e",
                "destination_uuid": "7ca737fc-05f6-42ad-9508-cb2435cea9fd"
              }
            ]
          },
          {
            "uuid": "c29f6114-c125-4a0b-ac10-a47c2c2d9817",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "f628af46-e6f6-4bd4-80eb-1df6ec9dc384"
              }
            ],
            "exits": [
              {
                "uuid": "a0f93247-34ca-4e42-b736-52ffcfda1f5b",
                "destination_uuid": "9773ef74-f57e-49e6-9fe1-f9d088d8eb18"
              }
            ]
          },
          {
            "uuid": "7ca737fc-05f6-42ad-9508-cb2435cea9fd",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "bea9bfc1-b975-45b6-a0b5-59ba2f3efda8"
              }
            ],
            "exits": [
              {
                "uuid": "663a9ffa-3cb3-4cc7-bd44-7715fafa6354",
                "destination_uuid": "9773ef74-f57e-49e6-9fe1-f9d088d8eb18"
              }
            ]
          },
          {
            "uuid": "9773ef74-f57e-49e6-9fe1-f9d088d8eb18",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "11599663-85d8-4630-9516-09f454be6dfa",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "643bc611-17d3-4a24-a5b7-dbda62aee6cf",
                  "type": "has_only_phrase",
                  "uuid": "48101633-cf49-493c-b425-ef572e8743db"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "671eb4d5-9d94-43c2-97c2-fc75f82b520f",
                  "name": "All Responses",
                  "uuid": "11599663-85d8-4630-9516-09f454be6dfa"
                },
                {
                  "exit_uuid": "d0e8eea4-0b4f-40b5-8eb6-c2026ce0acb4",
                  "name": "Next",
                  "uuid": "643bc611-17d3-4a24-a5b7-dbda62aee6cf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "671eb4d5-9d94-43c2-97c2-fc75f82b520f",
                "destination_uuid": null
              },
              {
                "uuid": "d0e8eea4-0b4f-40b5-8eb6-c2026ce0acb4",
                "destination_uuid": "f8d450b8-6b1a-4f07-b21c-255271cd092f"
              }
            ]
          },
          {
            "uuid": "f8d450b8-6b1a-4f07-b21c-255271cd092f",
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
                "uuid": "74a35395-6c92-4fe6-8601-554dc1ca153d"
              }
            ],
            "exits": [
              {
                "uuid": "3fce6299-70ef-4aad-aee5-8a5fbb7a0c63",
                "destination_uuid": "463eb979-7689-4a9c-a9b6-ae002138eabf"
              }
            ]
          },
          {
            "uuid": "463eb979-7689-4a9c-a9b6-ae002138eabf",
            "actions": [],
            "exits": [
              {
                "uuid": "48cdeb9a-f6dd-4802-9a6e-4eeaa473a064",
                "destination_uuid": "0073bf41-dff7-4aa8-a614-6b4a54adf1f0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0d3c733d-90f8-4c41-bd29-cfaf1f532673",
              "cases": [],
              "categories": [
                {
                  "uuid": "0d3c733d-90f8-4c41-bd29-cfaf1f532673",
                  "name": "All Responses",
                  "exit_uuid": "48cdeb9a-f6dd-4802-9a6e-4eeaa473a064"
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
            "uuid": "0073bf41-dff7-4aa8-a614-6b4a54adf1f0",
            "actions": [
              {
                "uuid": "52802fd0-b31b-49bc-ae55-f67542fc5843",
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
                "uuid": "b7ffa161-5a7f-4b1d-9bd0-cd021dc7b82d",
                "destination_uuid": "c2651e2b-7a3e-4736-af45-d9a49e89d261"
              }
            ]
          },
          {
            "uuid": "4347f447-3d55-4f94-9909-8ee20ccc95fd",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "26980acd-8f8f-4d09-b9d8-11dea15c6569"
              }
            ],
            "exits": [
              {
                "uuid": "51a3df33-4b53-4547-92a1-3a311adc46c9",
                "destination_uuid": "90b42cd8-98e3-4c16-95e9-3e0674570e2b"
              }
            ]
          },
          {
            "uuid": "c2651e2b-7a3e-4736-af45-d9a49e89d261",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "034dbd87-3502-4d23-af18-3da4ea02f6fb",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "d5b1b420-3f21-4d46-b857-eca12db21efa",
                  "type": "has_only_phrase",
                  "uuid": "2b1b5755-65c7-42d5-8a96-830415612b5b"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "d5b1b420-3f21-4d46-b857-eca12db21efa",
                  "type": "has_only_phrase",
                  "uuid": "5877ab67-8ae0-4b93-88e0-1daee630a212"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "d5b1b420-3f21-4d46-b857-eca12db21efa",
                  "type": "has_only_phrase",
                  "uuid": "2198c251-9bf4-4bb6-ae93-401951647792"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "d5b1b420-3f21-4d46-b857-eca12db21efa",
                  "type": "has_only_phrase",
                  "uuid": "542297a4-623a-4bd1-8d59-02efa4b29475"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "d5b1b420-3f21-4d46-b857-eca12db21efa",
                  "type": "has_only_phrase",
                  "uuid": "dcee818e-d9da-439e-a5a2-8f9a6181343f"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "d5b1b420-3f21-4d46-b857-eca12db21efa",
                  "type": "has_only_phrase",
                  "uuid": "a0e23f68-c324-4bb1-936b-5a039d5a0862"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "d5b1b420-3f21-4d46-b857-eca12db21efa",
                  "type": "has_only_phrase",
                  "uuid": "d4762f07-95b3-4ed2-9752-d7f803afa170"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b2068e79-06f3-49fc-a995-a8203c4e1d45",
                  "name": "All Responses",
                  "uuid": "034dbd87-3502-4d23-af18-3da4ea02f6fb"
                },
                {
                  "exit_uuid": "2ab80ad5-656c-403c-918d-2511bc769b8b",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "d5b1b420-3f21-4d46-b857-eca12db21efa"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "b2068e79-06f3-49fc-a995-a8203c4e1d45",
                "destination_uuid": "4347f447-3d55-4f94-9909-8ee20ccc95fd"
              },
              {
                "uuid": "2ab80ad5-656c-403c-918d-2511bc769b8b",
                "destination_uuid": "d267cf0c-11b0-487b-9f63-21d62621c3f3"
              }
            ]
          },
          {
            "uuid": "d267cf0c-11b0-487b-9f63-21d62621c3f3",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c855493e-9768-4e9e-a7f1-e3ea7cceb254"
              }
            ],
            "exits": [
              {
                "uuid": "7005650b-a80f-4786-9623-3356f087f8bd",
                "destination_uuid": "90b42cd8-98e3-4c16-95e9-3e0674570e2b"
              }
            ]
          },
          {
            "uuid": "90b42cd8-98e3-4c16-95e9-3e0674570e2b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ad72a2da-9e5f-4c29-bb9d-321fbf3b5fc1",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "1d4b8963-c0db-4168-9d18-5548eba105d4",
                  "type": "has_only_phrase",
                  "uuid": "364e9f47-f5cc-4c63-ac6b-5386daa80df2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2ca4bc64-1377-4fbd-b405-d80c5bffe549",
                  "name": "All Responses",
                  "uuid": "ad72a2da-9e5f-4c29-bb9d-321fbf3b5fc1"
                },
                {
                  "exit_uuid": "25c457bc-69b9-4a5f-a962-7631d17b1585",
                  "name": "Next",
                  "uuid": "1d4b8963-c0db-4168-9d18-5548eba105d4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2ca4bc64-1377-4fbd-b405-d80c5bffe549",
                "destination_uuid": null
              },
              {
                "uuid": "25c457bc-69b9-4a5f-a962-7631d17b1585",
                "destination_uuid": "0980eb4f-fa36-4d25-96bf-f53deffd9aa4"
              }
            ]
          },
          {
            "uuid": "0980eb4f-fa36-4d25-96bf-f53deffd9aa4",
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
                "uuid": "4629c9ee-2609-4551-a311-00eac07c135a"
              }
            ],
            "exits": [
              {
                "uuid": "b424191a-2221-4599-a12c-a7d09029b6d5",
                "destination_uuid": "d9dc8ce0-755a-463c-a80f-2802f0730319"
              }
            ]
          },
          {
            "uuid": "d9dc8ce0-755a-463c-a80f-2802f0730319",
            "actions": [],
            "exits": [
              {
                "uuid": "9c5b7f70-ad0b-439a-a4dd-9f036696d647",
                "destination_uuid": "d2d7e9bf-3082-45bf-bd67-de8604d53206"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2fbb3da4-67e7-456a-8df2-1f7f87d34b9f",
              "cases": [],
              "categories": [
                {
                  "uuid": "2fbb3da4-67e7-456a-8df2-1f7f87d34b9f",
                  "name": "All Responses",
                  "exit_uuid": "9c5b7f70-ad0b-439a-a4dd-9f036696d647"
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
            "uuid": "d2d7e9bf-3082-45bf-bd67-de8604d53206",
            "actions": [
              {
                "uuid": "4fabdbc6-4351-4c72-a297-8f63b65e94b9",
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
                "uuid": "25c623dd-3326-4f13-a05d-0d87b25689f1",
                "destination_uuid": "565038c2-3913-4cfc-ab7c-87f81154664a"
              }
            ]
          },
          {
            "uuid": "565038c2-3913-4cfc-ab7c-87f81154664a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "54507f67-ff73-405a-a485-feb29fa0e0b7",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "cb8cc903-20cd-4ebc-b313-b43358336599",
                  "type": "has_only_phrase",
                  "uuid": "29aa1777-5174-485c-a3b9-d7e5b6e8692b"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "cb8cc903-20cd-4ebc-b313-b43358336599",
                  "type": "has_only_phrase",
                  "uuid": "772f7126-ad9a-43af-9197-4d97cec042c7"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "cb8cc903-20cd-4ebc-b313-b43358336599",
                  "type": "has_only_phrase",
                  "uuid": "2bef15a8-5b55-41f9-9c64-d8a5085f4971"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "cb8cc903-20cd-4ebc-b313-b43358336599",
                  "type": "has_only_phrase",
                  "uuid": "f0d1cefe-96f8-473f-b471-72908cc3b710"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "cb8cc903-20cd-4ebc-b313-b43358336599",
                  "type": "has_only_phrase",
                  "uuid": "fc5f1df8-6881-4fe7-96d3-27ecece310d1"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "46d8b090-b740-4d09-9ede-4cf68fa39b25",
                  "type": "has_only_phrase",
                  "uuid": "192b940c-99e3-4f51-a9a4-c4244182fb35"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "46d8b090-b740-4d09-9ede-4cf68fa39b25",
                  "type": "has_only_phrase",
                  "uuid": "8335a462-a4c5-4041-8e9e-5b5ccc23c2fb"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "46d8b090-b740-4d09-9ede-4cf68fa39b25",
                  "type": "has_only_phrase",
                  "uuid": "991ccc78-e1ce-4bda-a29b-afa378c0cfc7"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "46d8b090-b740-4d09-9ede-4cf68fa39b25",
                  "type": "has_only_phrase",
                  "uuid": "25ca0aaa-61f0-4115-866b-f1d1f3efd611"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fdf08583-7d8b-4aa6-a9fd-6c4bb284474f",
                  "name": "All Responses",
                  "uuid": "54507f67-ff73-405a-a485-feb29fa0e0b7"
                },
                {
                  "exit_uuid": "aa42c6c6-a125-4d8f-95f8-9fb1a5be4ae2",
                  "name": "0;1;2;3;4",
                  "uuid": "cb8cc903-20cd-4ebc-b313-b43358336599"
                },
                {
                  "exit_uuid": "fb0f50b0-e58c-4247-a5d9-b4eceb5f46e8",
                  "name": "5;6;7;8",
                  "uuid": "46d8b090-b740-4d09-9ede-4cf68fa39b25"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "fdf08583-7d8b-4aa6-a9fd-6c4bb284474f",
                "destination_uuid": null
              },
              {
                "uuid": "aa42c6c6-a125-4d8f-95f8-9fb1a5be4ae2",
                "destination_uuid": "0382aae4-9e5a-4841-9f9e-05178cc35706"
              },
              {
                "uuid": "fb0f50b0-e58c-4247-a5d9-b4eceb5f46e8",
                "destination_uuid": "351754e3-c57d-4234-8421-9bbc52155e0b"
              }
            ]
          },
          {
            "uuid": "0382aae4-9e5a-4841-9f9e-05178cc35706",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "0097a361-5b4e-4d1f-a2ad-68ec7bd2a916"
              }
            ],
            "exits": [
              {
                "uuid": "eb4c992a-713d-4374-942e-fd417f30a0ce",
                "destination_uuid": "ff485e7f-62a8-4a26-9bbe-f500c84e3550"
              }
            ]
          },
          {
            "uuid": "351754e3-c57d-4234-8421-9bbc52155e0b",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c0e8de40-ba57-448a-8f13-26afdc10290b"
              }
            ],
            "exits": [
              {
                "uuid": "57e0a4cf-6a9f-45bd-9d84-3b523aff8588",
                "destination_uuid": "ff485e7f-62a8-4a26-9bbe-f500c84e3550"
              }
            ]
          },
          {
            "uuid": "ff485e7f-62a8-4a26-9bbe-f500c84e3550",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8c3ad74f-e96e-4393-925a-a845258f8efa",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9524e94e-bdaf-4df7-96e5-eed3532cfc09",
                  "type": "has_only_phrase",
                  "uuid": "3c210745-9518-4b13-9e45-d6ee0130e2cb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3cdf8b28-7a4b-41f1-aef0-b3bd292b2609",
                  "name": "All Responses",
                  "uuid": "8c3ad74f-e96e-4393-925a-a845258f8efa"
                },
                {
                  "exit_uuid": "ffa685dd-5599-4293-bc92-3913872a6cbe",
                  "name": "Next",
                  "uuid": "9524e94e-bdaf-4df7-96e5-eed3532cfc09"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3cdf8b28-7a4b-41f1-aef0-b3bd292b2609",
                "destination_uuid": null
              },
              {
                "uuid": "ffa685dd-5599-4293-bc92-3913872a6cbe",
                "destination_uuid": "2a8f5724-102b-4634-950a-dc705fa76346"
              }
            ]
          },
          {
            "uuid": "2a8f5724-102b-4634-950a-dc705fa76346",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "9a82be9d-9bc4-485a-bf0d-0d0bc6547f68"
              }
            ],
            "exits": [
              {
                "uuid": "a32389de-7e3d-4805-83ef-4f66f9756519",
                "destination_uuid": "ac6d9e6e-0ad5-4ac1-95ca-42c051d02194"
              }
            ]
          },
          {
            "uuid": "ac6d9e6e-0ad5-4ac1-95ca-42c051d02194",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7be9501d-0fe1-4ff7-84da-79f298038c56",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "ccd1d392-5d7a-49a2-b60f-9b23b64546ab",
                  "type": "has_only_phrase",
                  "uuid": "b22f4cb6-b43b-43a9-be85-cb7811e39b61"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d3d87c22-ffa6-41f3-8749-3db9ed690670",
                  "name": "All Responses",
                  "uuid": "7be9501d-0fe1-4ff7-84da-79f298038c56"
                },
                {
                  "exit_uuid": "1aca1de2-5ffd-4d78-95d5-c0f8ae50be7a",
                  "name": "Next",
                  "uuid": "ccd1d392-5d7a-49a2-b60f-9b23b64546ab"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d3d87c22-ffa6-41f3-8749-3db9ed690670",
                "destination_uuid": null
              },
              {
                "uuid": "1aca1de2-5ffd-4d78-95d5-c0f8ae50be7a",
                "destination_uuid": "df30759e-cec6-4f0b-96b9-7121d444cf02"
              }
            ]
          },
          {
            "uuid": "df30759e-cec6-4f0b-96b9-7121d444cf02",
            "actions": [
              {
                "uuid": "37f55528-110d-43b4-808a-7d7476c3be86",
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
                "uuid": "f7a57a35-233a-4258-a7ea-23e73e0c07cc",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "02f481f9-acc0-410c-8286-f337b962a53a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "46d95853-9baf-4bfa-812b-eaa04edc3dc3",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "a3b82b5b-b68b-4bee-aa7b-4b928219da03"
              }
            ],
            "exits": [
              {
                "uuid": "e1fc4aae-f626-468d-bdb7-a18e31876037",
                "destination_uuid": "fc643c16-2659-4f33-b024-e21f9c6f4aa3"
              }
            ]
          },
          {
            "uuid": "fc643c16-2659-4f33-b024-e21f9c6f4aa3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6d0ee9fc-433e-4804-a87a-6cd8bb83e31b",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "b2647c8f-74f6-4fca-8031-85c024ada212",
                  "type": "has_only_phrase",
                  "uuid": "aec4d228-7b08-4a4a-8d36-e287ea3f0d04"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b1d4049a-26e3-4587-b0a0-2b46303b59c9",
                  "name": "All Responses",
                  "uuid": "6d0ee9fc-433e-4804-a87a-6cd8bb83e31b"
                },
                {
                  "exit_uuid": "f9d65c55-2d60-44a9-8d40-f4c334f1b5c8",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "b2647c8f-74f6-4fca-8031-85c024ada212"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b1d4049a-26e3-4587-b0a0-2b46303b59c9",
                "destination_uuid": null
              },
              {
                "uuid": "f9d65c55-2d60-44a9-8d40-f4c334f1b5c8",
                "destination_uuid": "4d69f220-3178-4126-9844-ce8e4671d455"
              }
            ]
          },
          {
            "uuid": "4d69f220-3178-4126-9844-ce8e4671d455",
            "actions": [
              {
                "uuid": "15370b32-598f-4b95-b263-5a02dc8a5667",
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
                "uuid": "58299905-4281-4481-a3c2-1030d47a6605",
                "destination_uuid": "470e3ea7-7b6b-42e2-a820-293dc5ce6c7c"
              }
            ]
          },
          {
            "uuid": "470e3ea7-7b6b-42e2-a820-293dc5ce6c7c",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "fe1eb99e-f6ce-4bad-a804-fedb2405e554"
                },
                "type": "enter_flow",
                "uuid": "e873c1ae-1925-4b76-8ddf-1c2e180e00bc"
              }
            ],
            "exits": [
              {
                "uuid": "539ecece-9da1-482f-b1b7-f46b14247cfc",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "e650a039-7f47-45c0-9a5a-7ee279a5eae0",
            "actions": [
              {
                "uuid": "e45e3a01-0e64-4e99-90a9-98cea87c4646",
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
                "uuid": "35afce22-4773-4b23-9f62-d6514ca1a2d9",
                "destination_uuid": "cd58fa23-5116-405f-82bd-e180b9f61eac"
              }
            ]
          },
          {
            "uuid": "cd58fa23-5116-405f-82bd-e180b9f61eac",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "41ce7e45-793c-42ee-81fa-58f8bb6b7d95"
                },
                "type": "enter_flow",
                "uuid": "1b52d83b-c1c3-45a7-af9a-8fe52d4c8ebf"
              }
            ],
            "exits": [
              {
                "uuid": "abb5756b-835f-4a11-ade2-26b59820a23f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ae832962-1cf4-4791-9461-615177a4bd0b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1212868d-74d4-4530-8677-5d6e372dd597",
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
                "uuid": "01904bd7-2062-4dbe-b560-e8d359797391"
              }
            ],
            "exits": [
              {
                "uuid": "dad536de-becf-4a60-9370-4a1c6b640564",
                "destination_uuid": "ea77b2df-cdfd-4d6f-8960-76f2af4283b5"
              }
            ]
          },
          {
            "uuid": "ea77b2df-cdfd-4d6f-8960-76f2af4283b5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "87464954-696c-4e95-862f-d87d01b71bbc",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "e606edb2-50d2-403b-9e23-20ff5075d92e",
                  "type": "has_only_phrase",
                  "uuid": "be51f4f4-2987-4d49-a7bd-e5f8e56f3cdc"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "365f8861-f1cb-4e92-904e-b045b0387075",
                  "type": "has_only_phrase",
                  "uuid": "9f7fb211-c5e9-473a-bae0-32392fa5e42e"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "365f8861-f1cb-4e92-904e-b045b0387075",
                  "type": "has_only_phrase",
                  "uuid": "7fd5fc91-5d56-4649-85fd-048a84d48119"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6400ed1d-2149-44f8-8f2c-c3cd5919a4e1",
                  "name": "All Responses",
                  "uuid": "87464954-696c-4e95-862f-d87d01b71bbc"
                },
                {
                  "exit_uuid": "4fbae286-3ef0-4e3c-b425-50850e428567",
                  "name": "Happy",
                  "uuid": "e606edb2-50d2-403b-9e23-20ff5075d92e"
                },
                {
                  "exit_uuid": "b23f99e0-cb12-408d-9445-73eaa687ae1c",
                  "name": "Neutral; Sad",
                  "uuid": "365f8861-f1cb-4e92-904e-b045b0387075"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6400ed1d-2149-44f8-8f2c-c3cd5919a4e1",
                "destination_uuid": null
              },
              {
                "uuid": "4fbae286-3ef0-4e3c-b425-50850e428567",
                "destination_uuid": "b4cdfcfa-c6f9-4045-8022-62780d302c78"
              },
              {
                "uuid": "b23f99e0-cb12-408d-9445-73eaa687ae1c",
                "destination_uuid": "47f11d18-0339-46cf-92da-aff6baf45bb1"
              }
            ]
          },
          {
            "uuid": "b4cdfcfa-c6f9-4045-8022-62780d302c78",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "cebfdae1-b506-4cf0-a68d-a50f28120cac"
              }
            ],
            "exits": [
              {
                "uuid": "d904620b-f7d1-4f49-960e-3ff0f85bc62f",
                "destination_uuid": "7391cb7c-4e3a-44c3-aaf5-712ee1f4ee69"
              }
            ]
          },
          {
            "uuid": "47f11d18-0339-46cf-92da-aff6baf45bb1",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "83b0eef4-5141-4ffc-b158-533464fe85e0"
              }
            ],
            "exits": [
              {
                "uuid": "275489f2-8ef1-4fa0-9f52-a41655c609dc",
                "destination_uuid": "c873b193-b4a3-49c4-97f6-3cc049b12d11"
              }
            ]
          },
          {
            "uuid": "c873b193-b4a3-49c4-97f6-3cc049b12d11",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "d5f2a8a8-5ece-4d0e-a7d8-f6c53c0f696c"
              }
            ],
            "exits": [
              {
                "uuid": "56971dbf-72ff-4f43-8e55-bcbdf3262676",
                "destination_uuid": "2466bdba-c64f-4547-b576-bc0a1ac8d3f8"
              }
            ]
          },
          {
            "uuid": "2466bdba-c64f-4547-b576-bc0a1ac8d3f8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5d2bbfd5-f6a2-4b79-a0da-03e1fa1c437e",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "008d5372-be67-4176-897d-1ae83c03dc58",
                  "type": "has_only_phrase",
                  "uuid": "5b4d03d0-d67e-4e85-91aa-0a3600a3440d"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "7483a04b-e139-4ed8-8a59-4346d6870aa7",
                  "type": "has_only_phrase",
                  "uuid": "ade0f1be-cc20-41aa-b597-b5bbce91ee04"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e381da28-6af4-4239-b7e6-ecd0c49d0011",
                  "name": "All Responses",
                  "uuid": "5d2bbfd5-f6a2-4b79-a0da-03e1fa1c437e"
                },
                {
                  "exit_uuid": "99344e89-6121-46df-b117-a9ffc67ef531",
                  "name": "Yes",
                  "uuid": "008d5372-be67-4176-897d-1ae83c03dc58"
                },
                {
                  "exit_uuid": "cd796ce4-eb70-4729-ab09-b0c50da49132",
                  "name": "No",
                  "uuid": "7483a04b-e139-4ed8-8a59-4346d6870aa7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e381da28-6af4-4239-b7e6-ecd0c49d0011",
                "destination_uuid": null
              },
              {
                "uuid": "99344e89-6121-46df-b117-a9ffc67ef531",
                "destination_uuid": "4886ec6a-d17c-40ca-8984-ba151056668a"
              },
              {
                "uuid": "cd796ce4-eb70-4729-ab09-b0c50da49132",
                "destination_uuid": "f84f1bc7-2187-4c2d-b13b-a0489ed4cddd"
              }
            ]
          },
          {
            "uuid": "4886ec6a-d17c-40ca-8984-ba151056668a",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "0c0bea86-5c66-409b-84cc-c847b42611ff"
                },
                "type": "enter_flow",
                "uuid": "c0a5a1a2-7f6e-4c4b-95b6-22e4a13660fe"
              }
            ],
            "exits": [
              {
                "uuid": "b17bcb49-1179-4637-88f6-bfe7d068928f",
                "destination_uuid": "cc14d343-98be-4d27-8778-052575f76ef3"
              },
              {
                "uuid": "307ec2f3-440d-4c5a-9668-e7ce27b968de",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "0e96029f-9a41-4100-88b0-d74a95388f76",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "16a97d42-677d-4e04-99e4-e8110f6bc513"
                },
                {
                  "uuid": "2f7e7c67-49de-4ba9-a367-e75ad9cf05a4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "7b427807-43ca-4ebd-b083-83a2a9eb4b1d"
                }
              ],
              "categories": [
                {
                  "uuid": "16a97d42-677d-4e04-99e4-e8110f6bc513",
                  "name": "Complete",
                  "exit_uuid": "b17bcb49-1179-4637-88f6-bfe7d068928f"
                },
                {
                  "uuid": "7b427807-43ca-4ebd-b083-83a2a9eb4b1d",
                  "name": "Expired",
                  "exit_uuid": "307ec2f3-440d-4c5a-9668-e7ce27b968de"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "16a97d42-677d-4e04-99e4-e8110f6bc513"
            }
          },
          {
            "uuid": "cc14d343-98be-4d27-8778-052575f76ef3",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "eb988d7e-75bb-4f22-abc1-0305e4804a31"
              }
            ],
            "exits": [
              {
                "uuid": "617b9e8b-7fa7-41b8-9d4c-eee0e0d30ede",
                "destination_uuid": "9334c513-126d-4967-bbf8-c19a17adbfd1"
              }
            ]
          },
          {
            "uuid": "9334c513-126d-4967-bbf8-c19a17adbfd1",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "6aedf6eb-574c-42f8-b799-11317353b4cf"
              }
            ],
            "exits": [
              {
                "uuid": "92fb78e5-1983-42d9-a8db-0433df582cce",
                "destination_uuid": "7391cb7c-4e3a-44c3-aaf5-712ee1f4ee69"
              }
            ]
          },
          {
            "uuid": "f84f1bc7-2187-4c2d-b13b-a0489ed4cddd",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "a6f929e8-742d-4b2c-a38a-43d5c4c22c9c"
              }
            ],
            "exits": [
              {
                "uuid": "8cc91618-c1b4-4338-8516-95ac2e5ce1bb",
                "destination_uuid": "7391cb7c-4e3a-44c3-aaf5-712ee1f4ee69"
              }
            ]
          },
          {
            "uuid": "7391cb7c-4e3a-44c3-aaf5-712ee1f4ee69",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f17e8b79-881f-44d0-9986-e10279c7dec8",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "0de4aafb-b230-47da-883a-5923d23df7f8",
                  "type": "has_only_phrase",
                  "uuid": "7e0f3734-b668-4152-bded-63416a6625e6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a8b21e79-5625-4c5f-91fd-b5af223d0c7d",
                  "name": "All Responses",
                  "uuid": "f17e8b79-881f-44d0-9986-e10279c7dec8"
                },
                {
                  "exit_uuid": "a11ce249-aaba-4ca4-b263-5fb1ac17ef73",
                  "name": "Chat to @fields.elder",
                  "uuid": "0de4aafb-b230-47da-883a-5923d23df7f8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a8b21e79-5625-4c5f-91fd-b5af223d0c7d",
                "destination_uuid": null
              },
              {
                "uuid": "a11ce249-aaba-4ca4-b263-5fb1ac17ef73",
                "destination_uuid": "781710fd-3f58-4cc5-906e-2e4aafac921f"
              }
            ]
          },
          {
            "uuid": "781710fd-3f58-4cc5-906e-2e4aafac921f",
            "actions": [
              {
                "uuid": "e9ae1a3f-b624-4a30-8921-b33add0c76a9",
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
                "uuid": "8c71f48f-7f9e-46d7-bd7b-8d5e7b6a2742",
                "destination_uuid": "0bdfac9d-8756-448f-90a8-8614468f95ee"
              }
            ]
          },
          {
            "uuid": "0bdfac9d-8756-448f-90a8-8614468f95ee",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "df9fab45-7b26-4108-86d9-3d1471d037bd"
                },
                "type": "enter_flow",
                "uuid": "3c3aa0f2-d9d1-4113-bdc6-117270f81c67"
              }
            ],
            "exits": [
              {
                "uuid": "ae821dab-d0e6-4772-8c0a-718f8af7d87a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6ad06f49-2cf0-418f-946f-7a4f15fa03f8",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c9ef4b99-5575-4ded-8415-3afd80b5686b",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fa651fb8-cfb8-4a3a-a629-6b6f805067d7"
              }
            ],
            "exits": [
              {
                "uuid": "f45e8758-b306-4736-b2a8-c5def0b84059",
                "destination_uuid": "bcaeb3b2-5341-4566-976a-8167c291f367"
              }
            ]
          },
          {
            "uuid": "bcaeb3b2-5341-4566-976a-8167c291f367",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "427d485f-1381-4e71-93fa-ee94d5037f6e"
              }
            ],
            "exits": [
              {
                "uuid": "7e69a024-abbe-459d-95f8-afa960bedf32",
                "destination_uuid": "6e452853-aab3-4f84-b642-587485c2a0e3"
              }
            ]
          },
          {
            "uuid": "6e452853-aab3-4f84-b642-587485c2a0e3",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c3ace52b-95cc-4715-ab32-1f9fdfae452e"
              }
            ],
            "exits": [
              {
                "uuid": "513db79b-8108-4231-86f5-0d3ed41c76f1",
                "destination_uuid": "556c1ea7-d8c1-4117-951c-68167b37196b"
              }
            ]
          },
          {
            "uuid": "556c1ea7-d8c1-4117-951c-68167b37196b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b1748bea-34d6-4e51-8a08-b0d6521a6e72",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "4f8da768-276f-4b11-bf1a-771d74de30c0",
                  "type": "has_only_phrase",
                  "uuid": "cc4faaaf-6a96-48fd-b5f1-c4a54de2112e"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "803bce14-ea52-492f-87d6-e695a579cab4",
                  "type": "has_only_phrase",
                  "uuid": "d4abe224-f4ab-4798-8f9c-35fc32fcf6dc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "22f86248-bc02-4bd4-a511-3686e32253ad",
                  "name": "All Responses",
                  "uuid": "b1748bea-34d6-4e51-8a08-b0d6521a6e72"
                },
                {
                  "exit_uuid": "62bf92c1-d119-49f3-bac4-be2e96ef3173",
                  "name": "Yes",
                  "uuid": "4f8da768-276f-4b11-bf1a-771d74de30c0"
                },
                {
                  "exit_uuid": "890a5b46-c088-4568-b38b-af27459806f2",
                  "name": "No",
                  "uuid": "803bce14-ea52-492f-87d6-e695a579cab4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "22f86248-bc02-4bd4-a511-3686e32253ad",
                "destination_uuid": null
              },
              {
                "uuid": "62bf92c1-d119-49f3-bac4-be2e96ef3173",
                "destination_uuid": "eb903344-6b99-42e5-b988-9baecd89ba3c"
              },
              {
                "uuid": "890a5b46-c088-4568-b38b-af27459806f2",
                "destination_uuid": "b09eccb9-ddbc-4b4d-b4fd-48daad547aba"
              }
            ]
          },
          {
            "uuid": "eb903344-6b99-42e5-b988-9baecd89ba3c",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e908345e-6761-4353-80e8-df27edd24257"
              }
            ],
            "exits": [
              {
                "uuid": "91dd611e-f2a7-4e6d-9b35-93ad611f6d3a",
                "destination_uuid": "0fe8ca14-7d69-4afe-b3a2-1e0d460d2a77"
              }
            ]
          },
          {
            "uuid": "b09eccb9-ddbc-4b4d-b4fd-48daad547aba",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b9a9a667-b33e-4571-9354-744a3dc4871b"
              }
            ],
            "exits": [
              {
                "uuid": "a7964f32-a75a-41b9-9a4d-e93f1a4c1e0a",
                "destination_uuid": "0fe8ca14-7d69-4afe-b3a2-1e0d460d2a77"
              }
            ]
          },
          {
            "uuid": "0fe8ca14-7d69-4afe-b3a2-1e0d460d2a77",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3bdeac2a-06f0-407a-ae25-0c8a9377e473"
              }
            ],
            "exits": [
              {
                "uuid": "5b1d404c-fb69-4f1e-9a9d-2486b274e579",
                "destination_uuid": "58994dcc-efe8-42be-8539-50174dddbb36"
              }
            ]
          },
          {
            "uuid": "58994dcc-efe8-42be-8539-50174dddbb36",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "09dc9f90-7dda-464e-870b-71363286e9c3"
              }
            ],
            "exits": [
              {
                "uuid": "09072964-8fe3-42e9-b39e-485e2a266e41",
                "destination_uuid": "be104fd5-21d9-41f0-9792-26336475d600"
              }
            ]
          },
          {
            "uuid": "be104fd5-21d9-41f0-9792-26336475d600",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4f507722-d70e-4cbf-a214-e72370eee437",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "cd3f468b-eedd-4101-aaa5-76553fb95a35",
                  "type": "has_only_phrase",
                  "uuid": "ea71c4c3-2123-499d-a55b-29893a2e1d2e"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "f576ffe1-3d6c-452b-8b53-4b5c5956faac",
                  "type": "has_only_phrase",
                  "uuid": "edd60baa-58f8-4801-934f-04d7fc4e48df"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b13c7f09-ef9c-4587-a95c-e96013a2fe45",
                  "name": "All Responses",
                  "uuid": "4f507722-d70e-4cbf-a214-e72370eee437"
                },
                {
                  "exit_uuid": "e6436a4b-3229-482e-abc0-1de3aa1840a3",
                  "name": "Yes",
                  "uuid": "cd3f468b-eedd-4101-aaa5-76553fb95a35"
                },
                {
                  "exit_uuid": "755b311a-1591-4932-9b97-d0b907dedf82",
                  "name": "Later",
                  "uuid": "f576ffe1-3d6c-452b-8b53-4b5c5956faac"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b13c7f09-ef9c-4587-a95c-e96013a2fe45",
                "destination_uuid": null
              },
              {
                "uuid": "e6436a4b-3229-482e-abc0-1de3aa1840a3",
                "destination_uuid": "30310d58-75af-4768-9f26-0022e0132b57"
              },
              {
                "uuid": "755b311a-1591-4932-9b97-d0b907dedf82",
                "destination_uuid": "d940dda5-b003-42ef-bf29-e54a4f21aee3"
              }
            ]
          },
          {
            "uuid": "30310d58-75af-4768-9f26-0022e0132b57",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "d577e5e2-fde4-4272-82de-e68da080ddb4"
              }
            ],
            "exits": [
              {
                "uuid": "73e965ea-d935-46f3-aafa-de16aae62678",
                "destination_uuid": "3919a88e-9e04-49eb-8130-eabc5c0ac082"
              }
            ]
          },
          {
            "uuid": "3919a88e-9e04-49eb-8130-eabc5c0ac082",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "283fce61-b999-4972-8c3b-66242e779701",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "d56d90e5-6ce7-4378-98ab-2090fcd20dfa",
                  "type": "has_only_phrase",
                  "uuid": "809ae9e4-ad90-4df2-bc2c-e293850cbc0d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7ac2fc10-2b82-422c-ac66-df2efe6fb65d",
                  "name": "All Responses",
                  "uuid": "283fce61-b999-4972-8c3b-66242e779701"
                },
                {
                  "exit_uuid": "3b140c10-7bc4-4165-848c-1c0a183f4548",
                  "name": "Take me to Tips",
                  "uuid": "d56d90e5-6ce7-4378-98ab-2090fcd20dfa"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7ac2fc10-2b82-422c-ac66-df2efe6fb65d",
                "destination_uuid": null
              },
              {
                "uuid": "3b140c10-7bc4-4165-848c-1c0a183f4548",
                "destination_uuid": "2878317b-3b52-4977-b0bd-7513ca484a38"
              }
            ]
          },
          {
            "uuid": "2878317b-3b52-4977-b0bd-7513ca484a38",
            "actions": [
              {
                "uuid": "8b63ff62-26df-49d2-8fe7-ac47c64e071b",
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
                "uuid": "a142dcef-f225-4c16-b205-451d231abb12",
                "destination_uuid": "224f8d7a-2f98-4f90-bd0d-020158fb3943"
              }
            ]
          },
          {
            "uuid": "224f8d7a-2f98-4f90-bd0d-020158fb3943",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "a8a988a6-208e-443b-8824-c404c857d23e"
                },
                "type": "enter_flow",
                "uuid": "45a97e1e-d6ae-40ef-b473-372def3dec3c"
              }
            ],
            "exits": [
              {
                "uuid": "36e65764-048e-4093-9221-562354a8abab",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "d940dda5-b003-42ef-bf29-e54a4f21aee3",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "dc7fc2c2-927a-4737-a73f-506c431b279e"
              }
            ],
            "exits": [
              {
                "uuid": "cfdb2f08-6644-43a3-8108-3f3d6b55194e",
                "destination_uuid": "ef7724d8-3f23-49e3-a0dc-eb360d2c6056"
              }
            ]
          },
          {
            "uuid": "ef7724d8-3f23-49e3-a0dc-eb360d2c6056",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "aad851bf-df9e-45fb-84e3-97ac6f54d553",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "bccf81d0-a533-4b36-84aa-d23b9c28fdf8",
                  "type": "has_only_phrase",
                  "uuid": "92f9cd8d-0682-41fc-9c59-ae2dabeef01c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "38b642df-82ce-4e95-bf6f-0bbcd39a3d76",
                  "name": "All Responses",
                  "uuid": "aad851bf-df9e-45fb-84e3-97ac6f54d553"
                },
                {
                  "exit_uuid": "c8e61714-aab0-4eb2-9ed7-ca8f4c7ff3f3",
                  "name": "Take me to the home screen",
                  "uuid": "bccf81d0-a533-4b36-84aa-d23b9c28fdf8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "38b642df-82ce-4e95-bf6f-0bbcd39a3d76",
                "destination_uuid": null
              },
              {
                "uuid": "c8e61714-aab0-4eb2-9ed7-ca8f4c7ff3f3",
                "destination_uuid": "b17ce949-d70e-42d3-a586-582edba30207"
              }
            ]
          },
          {
            "uuid": "b17ce949-d70e-42d3-a586-582edba30207",
            "actions": [
              {
                "uuid": "ab75abf9-3faa-456e-9dc0-11c6c6193cb8",
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
                "uuid": "193d80a0-4357-4f30-9c07-e7676c977a0c",
                "destination_uuid": "71a9c5b0-3a83-42c5-8f9f-b03d4ba5ec4a"
              }
            ]
          },
          {
            "uuid": "71a9c5b0-3a83-42c5-8f9f-b03d4ba5ec4a",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "782b0dff-a72f-42e7-9ceb-e9b595a6c247"
                },
                "type": "enter_flow",
                "uuid": "9395c408-5038-4be8-bdb5-ae179025e26e"
              }
            ],
            "exits": [
              {
                "uuid": "7f032791-76ff-4a18-9502-298bc1b8c919",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "efb60387-3f9b-47ee-bbb5-cea1f8f50177",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3c6a6e85-1b8e-4db2-af17-7def0209046a",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4590783d-f366-426f-a706-5598083b7887"
              }
            ],
            "exits": [
              {
                "uuid": "2c388ac6-53c1-443f-842d-fb5728e5b0bc",
                "destination_uuid": "5377ce29-1d16-408a-95ae-97ab17ccc1f8"
              }
            ]
          },
          {
            "uuid": "5377ce29-1d16-408a-95ae-97ab17ccc1f8",
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
                "uuid": "c6bd6941-ddf8-4e68-a824-13da9c733056"
              }
            ],
            "exits": [
              {
                "uuid": "8fc3c6cc-e20c-4f39-b156-1f8c654dc676",
                "destination_uuid": "c5891787-3d06-4d48-bd10-1cdb592acc96"
              }
            ]
          },
          {
            "uuid": "c5891787-3d06-4d48-bd10-1cdb592acc96",
            "actions": [],
            "exits": [
              {
                "uuid": "3907ee03-1835-4914-a554-d79c6e86d751",
                "destination_uuid": "45ecf5a2-2119-48df-b8e9-1a05bb9ff4d3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "cbeb56b2-135e-4d92-8e72-36461b00fa32",
              "cases": [],
              "categories": [
                {
                  "uuid": "cbeb56b2-135e-4d92-8e72-36461b00fa32",
                  "name": "All Responses",
                  "exit_uuid": "3907ee03-1835-4914-a554-d79c6e86d751"
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
            "uuid": "45ecf5a2-2119-48df-b8e9-1a05bb9ff4d3",
            "actions": [
              {
                "uuid": "79fd5f6e-a190-4930-aeba-22a51a3c2f02",
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
                "uuid": "45118036-186e-4475-a5a0-a09c0e676461",
                "destination_uuid": "514ef53c-95c5-4460-b5b8-38adaa240578"
              }
            ]
          },
          {
            "uuid": "514ef53c-95c5-4460-b5b8-38adaa240578",
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
                "uuid": "b4e1baa1-8132-453a-8158-f285bf5399df"
              }
            ],
            "exits": [
              {
                "uuid": "721b88f8-0c30-402b-9666-fc1e0a6dfc38",
                "destination_uuid": "fe408aca-e045-4411-b086-f610af65ba99"
              }
            ]
          },
          {
            "uuid": "fe408aca-e045-4411-b086-f610af65ba99",
            "actions": [],
            "exits": [
              {
                "uuid": "0488dc43-b7c3-452a-a3c1-c21384828d19",
                "destination_uuid": "1f9ec2a3-b984-4096-a6ae-ca575d4cfc83"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "90906efe-0bbd-4e3f-988f-40687d79ac05",
              "cases": [],
              "categories": [
                {
                  "uuid": "90906efe-0bbd-4e3f-988f-40687d79ac05",
                  "name": "All Responses",
                  "exit_uuid": "0488dc43-b7c3-452a-a3c1-c21384828d19"
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
            "uuid": "1f9ec2a3-b984-4096-a6ae-ca575d4cfc83",
            "actions": [
              {
                "uuid": "ec7635f4-0848-427a-89d2-8c522cc5ab8a",
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
                "uuid": "6ef3a390-6260-4acb-a71c-b2b297d37f6f",
                "destination_uuid": "82183f22-ec55-4334-a071-eb393c8d5649"
              }
            ]
          },
          {
            "uuid": "82183f22-ec55-4334-a071-eb393c8d5649",
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
                "uuid": "56f1d9de-bb52-4a71-a4d9-03c9e8f3d635"
              }
            ],
            "exits": [
              {
                "uuid": "bc95c482-62c5-4d92-bc05-a2de7a00b4f0",
                "destination_uuid": "767ee966-f5ad-449c-b200-d8a1adc51377"
              }
            ]
          },
          {
            "uuid": "767ee966-f5ad-449c-b200-d8a1adc51377",
            "actions": [],
            "exits": [
              {
                "uuid": "a27e1c17-31c2-4986-9f54-96348af2c44a",
                "destination_uuid": "754d7ec6-ffe6-45eb-8754-cf7bb4a8fbc8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "15a3990f-91cb-48c6-ac77-e907f527372e",
              "cases": [],
              "categories": [
                {
                  "uuid": "15a3990f-91cb-48c6-ac77-e907f527372e",
                  "name": "All Responses",
                  "exit_uuid": "a27e1c17-31c2-4986-9f54-96348af2c44a"
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
            "uuid": "754d7ec6-ffe6-45eb-8754-cf7bb4a8fbc8",
            "actions": [
              {
                "uuid": "82ebfa08-dcd3-4eef-83dd-55ef9c5bc3c2",
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
                "uuid": "be1adc26-71a2-463e-859e-444ac37163a2",
                "destination_uuid": "aa3e9465-1d38-4a58-a21c-31a8e358478d"
              }
            ]
          },
          {
            "uuid": "aa3e9465-1d38-4a58-a21c-31a8e358478d",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "91d4444c-92a3-4df4-8708-609ff1e33981"
              }
            ],
            "exits": [
              {
                "uuid": "c44365f7-43dc-4e3c-8ef0-767dee3a31bc",
                "destination_uuid": "049a68ea-45e8-4abf-81a6-6487c3658b0b"
              }
            ]
          },
          {
            "uuid": "049a68ea-45e8-4abf-81a6-6487c3658b0b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ac8fa9cf-0497-433b-b728-ed739cc44a48",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "f662a0e1-92f0-40fe-9467-3451ad2b42a3",
                  "type": "has_only_phrase",
                  "uuid": "079cfd80-9fc6-421f-9bad-42206c2a4ffa"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d00e40d3-3f06-49a0-b819-34d6311cb70c",
                  "name": "All Responses",
                  "uuid": "ac8fa9cf-0497-433b-b728-ed739cc44a48"
                },
                {
                  "exit_uuid": "a9ee54b8-d8d3-43aa-92bb-ce37c5076f2d",
                  "name": "Take me to Homescreen",
                  "uuid": "f662a0e1-92f0-40fe-9467-3451ad2b42a3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d00e40d3-3f06-49a0-b819-34d6311cb70c",
                "destination_uuid": null
              },
              {
                "uuid": "a9ee54b8-d8d3-43aa-92bb-ce37c5076f2d",
                "destination_uuid": "ba30e438-59dd-4c53-a460-8338a4867598"
              }
            ]
          },
          {
            "uuid": "ba30e438-59dd-4c53-a460-8338a4867598",
            "actions": [
              {
                "uuid": "edb9014b-2f5b-4796-bd27-f19533601c43",
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
                "uuid": "a7f3e2aa-d203-4550-88d4-9cb502f057ac",
                "destination_uuid": "cdffeb00-0f17-48e6-9667-f9b7947c564d"
              }
            ]
          },
          {
            "uuid": "cdffeb00-0f17-48e6-9667-f9b7947c564d",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "74861b34-c6ab-491f-a807-75d357f8167e"
                },
                "type": "enter_flow",
                "uuid": "f0eed1c7-214a-43fd-afd4-d3c7cb48586b"
              }
            ],
            "exits": [
              {
                "uuid": "317fdff3-07b6-40f7-b40e-bfd8f74e978d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bf929992-60ca-4a79-b88d-d9bb03ad8642",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "176dfdd7-7111-4d09-bb7e-db411f14fbbb",
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
                "uuid": "2553c198-8bfc-4bd0-a0be-230d5938c49d"
              }
            ],
            "exits": [
              {
                "uuid": "b25b876b-3233-40ca-85e2-528caf5b8c65",
                "destination_uuid": "55cc3ccb-8dfa-4f27-a09a-f75ab1cca207"
              }
            ]
          },
          {
            "uuid": "55cc3ccb-8dfa-4f27-a09a-f75ab1cca207",
            "actions": [],
            "exits": [
              {
                "uuid": "132482ec-df70-4b28-93c4-b93cdcb7b3ee",
                "destination_uuid": "14d34c8b-ca7f-4eeb-a594-3c30dc3da550"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "84aac8b6-0b12-4092-9c8b-97d854dd66e4",
              "cases": [],
              "categories": [
                {
                  "uuid": "84aac8b6-0b12-4092-9c8b-97d854dd66e4",
                  "name": "All Responses",
                  "exit_uuid": "132482ec-df70-4b28-93c4-b93cdcb7b3ee"
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
            "uuid": "14d34c8b-ca7f-4eeb-a594-3c30dc3da550",
            "actions": [
              {
                "uuid": "cee35c70-0408-4e32-97d9-846b52a93602",
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
                "uuid": "e65a9529-2e35-4b91-9caa-4299bda957ef",
                "destination_uuid": "1f675be6-dab6-4f44-8873-9035e99b4a3b"
              }
            ]
          },
          {
            "uuid": "1f675be6-dab6-4f44-8873-9035e99b4a3b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "03bab3ab-1494-486f-915b-7225a3bb4f19",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "a4a6685f-1e31-4853-a04b-e6405394bdf1",
                  "type": "has_only_phrase",
                  "uuid": "4821f0b7-3382-4f06-a313-bd0d7572dd6f"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "dd0121a9-17e1-441b-a468-28a02ac81e9d",
                  "type": "has_only_phrase",
                  "uuid": "678c988c-d0e4-4034-bca2-4b50c1bc6124"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "7b4515dd-5261-4635-9c13-dad806b81f37",
                  "type": "has_only_phrase",
                  "uuid": "e7dc948b-ac8a-4e50-9f7c-5f35ac160fc4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ebe83a6e-bf14-4d3e-bfb0-b886c89106da",
                  "name": "All Responses",
                  "uuid": "03bab3ab-1494-486f-915b-7225a3bb4f19"
                },
                {
                  "exit_uuid": "b71eb2bf-69f4-48ed-85b3-6d5fc82c76fb",
                  "name": "Great",
                  "uuid": "a4a6685f-1e31-4853-a04b-e6405394bdf1"
                },
                {
                  "exit_uuid": "bd1ca9a8-9b18-449b-95a2-c3a1a18cdc97",
                  "name": "Neutral",
                  "uuid": "dd0121a9-17e1-441b-a468-28a02ac81e9d"
                },
                {
                  "exit_uuid": "b6ae4275-57ab-4026-b232-7715fd5a2e98",
                  "name": "Bad",
                  "uuid": "7b4515dd-5261-4635-9c13-dad806b81f37"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "ebe83a6e-bf14-4d3e-bfb0-b886c89106da",
                "destination_uuid": null
              },
              {
                "uuid": "b71eb2bf-69f4-48ed-85b3-6d5fc82c76fb",
                "destination_uuid": "4ffcb31d-d608-444f-bafe-c2268023fb6b"
              },
              {
                "uuid": "bd1ca9a8-9b18-449b-95a2-c3a1a18cdc97",
                "destination_uuid": "1f1b4398-4014-4991-b5bf-b2fd9724230b"
              },
              {
                "uuid": "b6ae4275-57ab-4026-b232-7715fd5a2e98",
                "destination_uuid": "67a6b0e7-35ea-4df3-a5b6-1f9c80b028aa"
              }
            ]
          },
          {
            "uuid": "4ffcb31d-d608-444f-bafe-c2268023fb6b",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "827354e0-c194-4e48-9f86-4fb253c30522"
              }
            ],
            "exits": [
              {
                "uuid": "a835d495-67f3-43fd-aa24-c1e95edc4fa2",
                "destination_uuid": "49d7e60f-8228-45cd-bf75-e697e362fb04"
              }
            ]
          },
          {
            "uuid": "1f1b4398-4014-4991-b5bf-b2fd9724230b",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2859f169-4559-4093-94fa-9c925739ee3f"
              }
            ],
            "exits": [
              {
                "uuid": "c9fc0d24-e1b7-43fa-9524-4194b54709c9",
                "destination_uuid": "49d7e60f-8228-45cd-bf75-e697e362fb04"
              }
            ]
          },
          {
            "uuid": "49d7e60f-8228-45cd-bf75-e697e362fb04",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "71a5a5b2-89b8-4af5-9ac9-efe911e0660c"
                },
                "type": "enter_flow",
                "uuid": "66c847d8-27ef-4d71-8378-8bbb1c1b32ce"
              }
            ],
            "exits": [
              {
                "uuid": "6ac65c1e-7a1e-47e7-8b02-729eda231a73",
                "destination_uuid": "c27316dc-86c3-41ff-b105-1753564035b2"
              },
              {
                "uuid": "2660c6f6-cbdb-4710-a25a-3a3b94a3b843",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "d08bed77-e068-4ba3-a150-d2cfca45e36e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f58c24bd-ce69-4e88-8671-0f97752e9722"
                },
                {
                  "uuid": "94e40f57-2812-47fb-b419-76f20619761f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "96be421f-f55e-4b15-9503-afa56a652929"
                }
              ],
              "categories": [
                {
                  "uuid": "f58c24bd-ce69-4e88-8671-0f97752e9722",
                  "name": "Complete",
                  "exit_uuid": "6ac65c1e-7a1e-47e7-8b02-729eda231a73"
                },
                {
                  "uuid": "96be421f-f55e-4b15-9503-afa56a652929",
                  "name": "Expired",
                  "exit_uuid": "2660c6f6-cbdb-4710-a25a-3a3b94a3b843"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f58c24bd-ce69-4e88-8671-0f97752e9722"
            }
          },
          {
            "uuid": "c27316dc-86c3-41ff-b105-1753564035b2",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "08d91386-dc50-42e7-b496-137b10713e0e"
                },
                "type": "enter_flow",
                "uuid": "1dcaad04-0a36-4450-a676-fcf8f632399e"
              }
            ],
            "exits": [
              {
                "uuid": "c6edeff5-c5a3-4134-a68e-151243cec155",
                "destination_uuid": "7a90b6e3-2b18-4c8b-b307-ad43439b2740"
              },
              {
                "uuid": "3bcb5561-2f9b-4d1d-b737-139f3bf7c32a",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7e2c7f4c-5019-43cb-bba7-73b9193c9705",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d472a6cf-0349-4344-a7d3-d8c419181cb3"
                },
                {
                  "uuid": "7413fb9d-bdf7-4037-a92a-807641e4b5e0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "848e2c2a-65c3-46dd-9136-def409a7ccbd"
                }
              ],
              "categories": [
                {
                  "uuid": "d472a6cf-0349-4344-a7d3-d8c419181cb3",
                  "name": "Complete",
                  "exit_uuid": "c6edeff5-c5a3-4134-a68e-151243cec155"
                },
                {
                  "uuid": "848e2c2a-65c3-46dd-9136-def409a7ccbd",
                  "name": "Expired",
                  "exit_uuid": "3bcb5561-2f9b-4d1d-b737-139f3bf7c32a"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d472a6cf-0349-4344-a7d3-d8c419181cb3"
            }
          },
          {
            "uuid": "67a6b0e7-35ea-4df3-a5b6-1f9c80b028aa",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "24ca99d1-e7ca-4035-a069-df4e1bf06ba4"
              }
            ],
            "exits": [
              {
                "uuid": "4cdab67e-846c-4f17-982f-f196b68769c3",
                "destination_uuid": "1c44f4cd-0fad-430d-b609-7d53192da936"
              }
            ]
          },
          {
            "uuid": "1c44f4cd-0fad-430d-b609-7d53192da936",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "a84fd5fe-63c6-4297-9dc1-091cf0edb987"
                },
                "type": "enter_flow",
                "uuid": "757ebc88-60fe-4e2b-850d-e00d94b57ea9"
              }
            ],
            "exits": [
              {
                "uuid": "e3580be1-4388-43d6-8d2c-6ad089e82405",
                "destination_uuid": "b12e9b6e-6b7e-4ae8-8e25-79816d3d3387"
              },
              {
                "uuid": "b4f2e26a-fe9d-4566-a4c4-538452fc8897",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "972663de-08fa-46eb-98fd-6a378935be60",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8d2df053-85f5-4caf-9d6a-c75b6e531769"
                },
                {
                  "uuid": "89385ffe-f5dc-4044-b9c5-4a469e334c21",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "06d2e01f-e4cd-43b0-adda-a8a4db86b10d"
                }
              ],
              "categories": [
                {
                  "uuid": "8d2df053-85f5-4caf-9d6a-c75b6e531769",
                  "name": "Complete",
                  "exit_uuid": "e3580be1-4388-43d6-8d2c-6ad089e82405"
                },
                {
                  "uuid": "06d2e01f-e4cd-43b0-adda-a8a4db86b10d",
                  "name": "Expired",
                  "exit_uuid": "b4f2e26a-fe9d-4566-a4c4-538452fc8897"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8d2df053-85f5-4caf-9d6a-c75b6e531769"
            }
          },
          {
            "uuid": "b12e9b6e-6b7e-4ae8-8e25-79816d3d3387",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "22743987-2080-44cf-9699-a7f88f004557"
                },
                "type": "enter_flow",
                "uuid": "a0a63628-0fd4-4ec6-97df-bdf57ebae814"
              }
            ],
            "exits": [
              {
                "uuid": "040731bf-0e87-4d09-b0ad-757eed68b5c9",
                "destination_uuid": "7a90b6e3-2b18-4c8b-b307-ad43439b2740"
              },
              {
                "uuid": "d90c430b-3a31-4f08-b4e3-4783b59a8a41",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "56d09e14-abab-4dd2-a711-cfa30074e637",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "25d711a3-23fb-48a1-a920-01dd1fbdb73d"
                },
                {
                  "uuid": "d6a8895d-35ab-4156-b147-2bac71dcc6af",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "54af3d3c-183f-41af-abf3-2d970008a6cf"
                }
              ],
              "categories": [
                {
                  "uuid": "25d711a3-23fb-48a1-a920-01dd1fbdb73d",
                  "name": "Complete",
                  "exit_uuid": "040731bf-0e87-4d09-b0ad-757eed68b5c9"
                },
                {
                  "uuid": "54af3d3c-183f-41af-abf3-2d970008a6cf",
                  "name": "Expired",
                  "exit_uuid": "d90c430b-3a31-4f08-b4e3-4783b59a8a41"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "25d711a3-23fb-48a1-a920-01dd1fbdb73d"
            }
          },
          {
            "uuid": "7a90b6e3-2b18-4c8b-b307-ad43439b2740",
            "actions": [
              {
                "uuid": "901dffa3-cc1d-4ff1-a168-504aae928359",
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
                "uuid": "b3b84e57-b0e2-42e0-a0b7-0fead2cc233d",
                "destination_uuid": "ea342709-e7c1-4e4b-a539-8a2dee4ffd6c"
              }
            ]
          },
          {
            "uuid": "ea342709-e7c1-4e4b-a539-8a2dee4ffd6c",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "d3aff492-fc51-4d5f-b4cc-4d6b4f2c0a2c"
                },
                "type": "enter_flow",
                "uuid": "39a2f410-1519-4385-a896-2a8963df2be1"
              }
            ],
            "exits": [
              {
                "uuid": "5b495836-d0bc-4f27-acc7-35dbbe2bacf4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d2d653f6-4346-4d6a-9323-64b38c23e663",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "27c26863-fcd1-42ed-be69-40b4f7d923a2",
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
                "uuid": "66bbdb68-c484-43d6-8e18-c916abdcf2e4"
              }
            ],
            "exits": [
              {
                "uuid": "472f8bfd-d2be-4109-a268-a8a4d9891dcc",
                "destination_uuid": "f3802387-8611-4f6f-aa42-72bcdf08af5b"
              }
            ]
          },
          {
            "uuid": "f3802387-8611-4f6f-aa42-72bcdf08af5b",
            "actions": [],
            "exits": [
              {
                "uuid": "117f44e0-2b32-4409-bf87-c6bae0ca74f7",
                "destination_uuid": "829a518f-b9d2-40f2-87a6-6478f76015be"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "786564ba-aaf6-47cd-9f79-1a29f59d2d11",
              "cases": [],
              "categories": [
                {
                  "uuid": "786564ba-aaf6-47cd-9f79-1a29f59d2d11",
                  "name": "All Responses",
                  "exit_uuid": "117f44e0-2b32-4409-bf87-c6bae0ca74f7"
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
            "uuid": "829a518f-b9d2-40f2-87a6-6478f76015be",
            "actions": [
              {
                "uuid": "887687a8-d2d6-4efb-9dcf-d49950a9a79e",
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
                "uuid": "f3e7f33a-21b1-48bd-936c-30c8d5242cc1",
                "destination_uuid": "91ac1043-824e-4a32-ab4b-7152f2944c10"
              }
            ]
          },
          {
            "uuid": "91ac1043-824e-4a32-ab4b-7152f2944c10",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ed27c80a-d4a4-48f6-8463-11203ec69460",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "9e2c94df-59fc-4308-8e52-7a95e2913796",
                  "type": "has_only_phrase",
                  "uuid": "a5cf2d3b-92ff-4e85-a492-82962ed6b0cf"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "a1c5f77a-4d33-43e1-9721-d149da578522",
                  "type": "has_only_phrase",
                  "uuid": "7aa54163-a673-4647-8513-a66b258c00d1"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "1b62c18f-327a-495e-ab25-751b67c27e0d",
                  "type": "has_only_phrase",
                  "uuid": "3dd02af3-b362-4764-b445-660284f5742e"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "dd3c8c85-5340-4565-9661-05fe6a0cee9d",
                  "type": "has_only_phrase",
                  "uuid": "16db8cf3-31ab-48dd-a989-54d714c65e2a"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "64908464-e94c-4a82-bf11-047dcf8d94ff",
                  "type": "has_only_phrase",
                  "uuid": "15f476ac-377e-4b73-a089-bb009675f1d6"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "0d7d36c8-1314-4cb5-aed6-5a1869ff7a07",
                  "type": "has_only_phrase",
                  "uuid": "68fe3b85-d3ff-4379-9532-a25b27bd2fce"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "ec6471a9-6e9d-4ed2-a61a-6e37f57fa0f9",
                  "type": "has_only_phrase",
                  "uuid": "e4bd043d-0ef1-45a3-aab2-b94d334b96fe"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "50a0a03a-0b11-4f1c-8f91-c6a986c6d074",
                  "name": "All Responses",
                  "uuid": "ed27c80a-d4a4-48f6-8463-11203ec69460"
                },
                {
                  "exit_uuid": "983b5a6a-c19a-400c-aebc-620b4ceab144",
                  "name": "Do it every day",
                  "uuid": "9e2c94df-59fc-4308-8e52-7a95e2913796"
                },
                {
                  "exit_uuid": "54143f1c-854a-478d-bbb8-6b302fbac0ec",
                  "name": "Let your teen choose the activity",
                  "uuid": "a1c5f77a-4d33-43e1-9721-d149da578522"
                },
                {
                  "exit_uuid": "b16c2a6a-cce8-4464-aaa8-b5cff30ab2f6",
                  "name": "Follow your teen’s lead",
                  "uuid": "1b62c18f-327a-495e-ab25-751b67c27e0d"
                },
                {
                  "exit_uuid": "336874af-2141-4bc6-97d2-ec475d703845",
                  "name": "Give your teen all of your attention",
                  "uuid": "dd3c8c85-5340-4565-9661-05fe6a0cee9d"
                },
                {
                  "exit_uuid": "85717aef-3536-4792-834f-757d359ef4d3",
                  "name": "Show your teen you are really listening",
                  "uuid": "64908464-e94c-4a82-bf11-047dcf8d94ff"
                },
                {
                  "exit_uuid": "22519129-5b9d-4054-8a97-42d49f31a4fe",
                  "name": "Have fun!",
                  "uuid": "0d7d36c8-1314-4cb5-aed6-5a1869ff7a07"
                },
                {
                  "exit_uuid": "67bd1b21-d5b2-4be7-bb48-7bc388f0ca2b",
                  "name": "None ",
                  "uuid": "ec6471a9-6e9d-4ed2-a61a-6e37f57fa0f9"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "50a0a03a-0b11-4f1c-8f91-c6a986c6d074",
                "destination_uuid": null
              },
              {
                "uuid": "983b5a6a-c19a-400c-aebc-620b4ceab144",
                "destination_uuid": "94194caf-544f-442b-94ad-7ab502a8a421"
              },
              {
                "uuid": "54143f1c-854a-478d-bbb8-6b302fbac0ec",
                "destination_uuid": "2a7f7fab-e219-4c57-b58b-402349164204"
              },
              {
                "uuid": "b16c2a6a-cce8-4464-aaa8-b5cff30ab2f6",
                "destination_uuid": "c7fc38c0-67c1-41d0-affb-43e65d40d9c4"
              },
              {
                "uuid": "336874af-2141-4bc6-97d2-ec475d703845",
                "destination_uuid": "f6baf568-500e-48c7-85a0-ee581aec54ec"
              },
              {
                "uuid": "85717aef-3536-4792-834f-757d359ef4d3",
                "destination_uuid": "407a62d1-b999-43f1-9bb1-5e4597b26d15"
              },
              {
                "uuid": "22519129-5b9d-4054-8a97-42d49f31a4fe",
                "destination_uuid": "5abe2671-54a7-4314-a62a-e6019d667965"
              },
              {
                "uuid": "67bd1b21-d5b2-4be7-bb48-7bc388f0ca2b",
                "destination_uuid": "40492937-b3a7-4e8f-b96b-e9799acfcca8"
              }
            ]
          },
          {
            "uuid": "94194caf-544f-442b-94ad-7ab502a8a421",
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
                "uuid": "6113e48f-eef7-4eea-a7d6-4318457f1626"
              }
            ],
            "exits": [
              {
                "uuid": "5bc7e15d-3f30-4f5d-ba61-3fb294047557",
                "destination_uuid": "a1278559-6425-4153-8759-eae129b9183f"
              }
            ]
          },
          {
            "uuid": "a1278559-6425-4153-8759-eae129b9183f",
            "actions": [],
            "exits": [
              {
                "uuid": "015f78fa-ce46-4f7e-a7b3-b4d82b45448f",
                "destination_uuid": "c0437197-6350-446b-b4d8-4b66721f8036"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "978b53dc-2ac8-47b8-bc40-83a6169e943f",
              "cases": [],
              "categories": [
                {
                  "uuid": "978b53dc-2ac8-47b8-bc40-83a6169e943f",
                  "name": "All Responses",
                  "exit_uuid": "015f78fa-ce46-4f7e-a7b3-b4d82b45448f"
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
            "uuid": "c0437197-6350-446b-b4d8-4b66721f8036",
            "actions": [
              {
                "uuid": "2d62c0ff-d684-4b5d-bdef-fd1957fdc2e0",
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
                "uuid": "07fbaf72-01aa-4421-b047-98273367c8c1",
                "destination_uuid": "ae43196f-7240-4d97-96ee-b978a78a3071"
              }
            ]
          },
          {
            "uuid": "ae43196f-7240-4d97-96ee-b978a78a3071",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ba46f1d3-d9c1-4f0d-b0ed-6f53f5fed1cb"
              }
            ],
            "exits": [
              {
                "uuid": "97865d37-7fb9-442f-9b6c-d07aa406bf50",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "2a7f7fab-e219-4c57-b58b-402349164204",
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
                "uuid": "39cdc79f-5665-4cb0-8a24-00c8a5f74b3b"
              }
            ],
            "exits": [
              {
                "uuid": "799cd974-099e-4585-9b07-07956f56989a",
                "destination_uuid": "d444ec33-8b18-4e8a-b863-ea02e3b34422"
              }
            ]
          },
          {
            "uuid": "d444ec33-8b18-4e8a-b863-ea02e3b34422",
            "actions": [],
            "exits": [
              {
                "uuid": "d2b355b1-a2a0-4099-960f-ce7301355c28",
                "destination_uuid": "bd36a8c9-a7ef-4906-9aa3-30b190f69898"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ad5e3553-466d-4c64-94f9-b2d0cbaa2fbb",
              "cases": [],
              "categories": [
                {
                  "uuid": "ad5e3553-466d-4c64-94f9-b2d0cbaa2fbb",
                  "name": "All Responses",
                  "exit_uuid": "d2b355b1-a2a0-4099-960f-ce7301355c28"
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
            "uuid": "bd36a8c9-a7ef-4906-9aa3-30b190f69898",
            "actions": [
              {
                "uuid": "f9de709c-69df-4481-be41-ef917e18c207",
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
                "uuid": "6306f57e-5f87-457d-938c-d9ba6d9b29a9",
                "destination_uuid": "bd52b437-5d00-4104-8e86-865deac66da8"
              }
            ]
          },
          {
            "uuid": "bd52b437-5d00-4104-8e86-865deac66da8",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "619d1725-a429-4770-9ead-c669ebdb5809"
              }
            ],
            "exits": [
              {
                "uuid": "016b753e-a56e-4efb-8c86-b91e656ed4f0",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "c7fc38c0-67c1-41d0-affb-43e65d40d9c4",
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
                "uuid": "b6d1c38d-2ce8-4881-abaa-472635cb2392"
              }
            ],
            "exits": [
              {
                "uuid": "944f7ede-c07b-41f6-9c1a-d4d79e4993fb",
                "destination_uuid": "941b17df-ca7b-4669-b94b-159683ca5856"
              }
            ]
          },
          {
            "uuid": "941b17df-ca7b-4669-b94b-159683ca5856",
            "actions": [],
            "exits": [
              {
                "uuid": "9890f145-1b16-4a08-82f3-abca322c70bd",
                "destination_uuid": "06054683-5ce8-419b-8947-899ef313b664"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "614502ba-4d12-41ab-8579-d0e01cddee98",
              "cases": [],
              "categories": [
                {
                  "uuid": "614502ba-4d12-41ab-8579-d0e01cddee98",
                  "name": "All Responses",
                  "exit_uuid": "9890f145-1b16-4a08-82f3-abca322c70bd"
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
            "uuid": "06054683-5ce8-419b-8947-899ef313b664",
            "actions": [
              {
                "uuid": "85500779-3062-4b25-b4d9-a0f8af526ceb",
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
                "uuid": "af878d25-e7de-4679-abf2-6723802e6301",
                "destination_uuid": "23006897-3591-4bb7-9167-bd854c5a9848"
              }
            ]
          },
          {
            "uuid": "23006897-3591-4bb7-9167-bd854c5a9848",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "85647b97-d41d-4338-9214-e8d2de97b24e"
              }
            ],
            "exits": [
              {
                "uuid": "1bc9d69f-af09-4c20-9170-0995668fd104",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f6baf568-500e-48c7-85a0-ee581aec54ec",
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
                "uuid": "cf6f6343-4f7a-49c6-befa-fe8d8d9b1a8f"
              }
            ],
            "exits": [
              {
                "uuid": "06875d71-acb9-4af2-9bc7-b097ec547232",
                "destination_uuid": "7db2b4b3-3068-4a0c-9cc2-a7e03adb6f93"
              }
            ]
          },
          {
            "uuid": "7db2b4b3-3068-4a0c-9cc2-a7e03adb6f93",
            "actions": [],
            "exits": [
              {
                "uuid": "8cae4dc5-e1c6-48bb-a30e-8b93fbd76b92",
                "destination_uuid": "cfa19a93-b6c1-437a-bd98-55b1c96b9b3b"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b886aa9e-93cb-4b38-9e31-22b17daec9ad",
              "cases": [],
              "categories": [
                {
                  "uuid": "b886aa9e-93cb-4b38-9e31-22b17daec9ad",
                  "name": "All Responses",
                  "exit_uuid": "8cae4dc5-e1c6-48bb-a30e-8b93fbd76b92"
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
            "uuid": "cfa19a93-b6c1-437a-bd98-55b1c96b9b3b",
            "actions": [
              {
                "uuid": "edda31c7-8f5b-496b-84fe-81fc62004878",
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
                "uuid": "4ecb2d8e-4e15-46c2-a1cf-498a063c7209",
                "destination_uuid": "c8b869eb-5d9b-4639-86ec-4dd5d38b9d33"
              }
            ]
          },
          {
            "uuid": "c8b869eb-5d9b-4639-86ec-4dd5d38b9d33",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "518683e7-7072-46e8-9624-fb3d49da00eb"
              }
            ],
            "exits": [
              {
                "uuid": "1f0fd856-b375-40c3-a2f8-0956223db05c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "407a62d1-b999-43f1-9bb1-5e4597b26d15",
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
                "uuid": "bfc0b6ae-aef9-4a90-ac51-b08f4cc7f6f4"
              }
            ],
            "exits": [
              {
                "uuid": "5268ea30-c938-433f-9b97-97c174b9337e",
                "destination_uuid": "0a23abc8-6898-4095-a279-a3b560ad1f98"
              }
            ]
          },
          {
            "uuid": "0a23abc8-6898-4095-a279-a3b560ad1f98",
            "actions": [],
            "exits": [
              {
                "uuid": "acda7765-a250-4a56-ac3a-7df3c795fd39",
                "destination_uuid": "acd4a115-35c7-4446-b896-7ee966939f30"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "838be648-d6de-4f5f-8c35-45f1eda418df",
              "cases": [],
              "categories": [
                {
                  "uuid": "838be648-d6de-4f5f-8c35-45f1eda418df",
                  "name": "All Responses",
                  "exit_uuid": "acda7765-a250-4a56-ac3a-7df3c795fd39"
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
            "uuid": "acd4a115-35c7-4446-b896-7ee966939f30",
            "actions": [
              {
                "uuid": "8aaeb7b7-f5e9-459d-b38a-73c03f23647f",
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
                "uuid": "4a7b9be6-e911-4fae-815e-1bf2c52026d4",
                "destination_uuid": "c5c9fbd0-8931-4503-8f76-db04d1fadc20"
              }
            ]
          },
          {
            "uuid": "c5c9fbd0-8931-4503-8f76-db04d1fadc20",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0d6ce01f-8e75-4982-8f0e-1f793e9ea6f6"
              }
            ],
            "exits": [
              {
                "uuid": "922ae9a0-4ed9-4eed-8105-1786809058a1",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "5abe2671-54a7-4314-a62a-e6019d667965",
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
                "uuid": "987a59c8-6988-46b4-be3a-251426586a1a"
              }
            ],
            "exits": [
              {
                "uuid": "8be27e3a-cb32-4217-b733-4769c46a11e2",
                "destination_uuid": "4660f309-044c-40c7-ba64-104ac9d397ce"
              }
            ]
          },
          {
            "uuid": "4660f309-044c-40c7-ba64-104ac9d397ce",
            "actions": [],
            "exits": [
              {
                "uuid": "d4d96b89-5539-4854-bf29-35739adfe42f",
                "destination_uuid": "4597703a-72fe-4c02-9598-4fc4a091dff3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b903b44e-afce-4c83-b2b5-a444e0f028f6",
              "cases": [],
              "categories": [
                {
                  "uuid": "b903b44e-afce-4c83-b2b5-a444e0f028f6",
                  "name": "All Responses",
                  "exit_uuid": "d4d96b89-5539-4854-bf29-35739adfe42f"
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
            "uuid": "4597703a-72fe-4c02-9598-4fc4a091dff3",
            "actions": [
              {
                "uuid": "b3d90a56-9a12-46ae-a111-d4e0b7437f8c",
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
                "uuid": "ea74723a-5ed2-4c61-be46-1e1bea0efa76",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "5878eb97-55e2-4263-80ce-2d2305db9ad3",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b278b1ce-aeae-4e36-bff0-84fc1e69cd8a"
              }
            ],
            "exits": [
              {
                "uuid": "55476a70-5c33-4f46-8263-329d4d2b5c54",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "40492937-b3a7-4e8f-b96b-e9799acfcca8",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b96efee4-6a4b-4e9f-a95b-bd2031182725"
              }
            ],
            "exits": [
              {
                "uuid": "ffb0112d-b2ec-4432-b116-3a5f2a73bb1f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6fe070e8-d4cc-4e6d-adc4-764f1b3579cc",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f10c6bc2-3b25-486b-bb7a-8b53648b7aec",
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
                "uuid": "e5fcac34-9c08-40d8-a919-f6967b0fce5d"
              }
            ],
            "exits": [
              {
                "uuid": "4bddb615-6771-41d5-99d5-b31d86638f6a",
                "destination_uuid": "fd59150a-3952-4552-9361-083408061cf7"
              }
            ]
          },
          {
            "uuid": "969318db-4962-4277-89b3-700089c071bc",
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
                "uuid": "01cacac0-5033-4577-9431-5bec17668c05"
              }
            ],
            "exits": [
              {
                "uuid": "9bd51205-b2a5-4b88-aaae-8fb389fa042a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1e380b68-903a-465d-b4c1-0e724c090563",
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
                "uuid": "63571ea4-3c20-4676-a67c-1bedf181418f"
              }
            ],
            "exits": [
              {
                "uuid": "52c5f4eb-fd50-4d91-bfec-e2dc91ea3aa2",
                "destination_uuid": "fd59150a-3952-4552-9361-083408061cf7"
              }
            ]
          },
          {
            "uuid": "fd59150a-3952-4552-9361-083408061cf7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b4e73539-b202-490a-bb03-28aeea0291de",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "56748508-334a-44fd-8cf1-2beb67521cd8",
                  "type": "has_only_phrase",
                  "uuid": "95ce3b40-966a-4ae3-847d-877bfacf7a19"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "bc67f1d6-78a9-4b98-9936-cac4794d4ce4",
                  "type": "has_only_phrase",
                  "uuid": "b20ca23e-c45e-46ab-a2d7-0e29e9b311cd"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "c315ccd2-89cf-4287-a9e8-90e094f720f1",
                  "type": "has_only_phrase",
                  "uuid": "b8b80399-ddb9-4453-b918-7ff8dc7408b4"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "f641cb44-3404-418d-b4c1-3527e48c7ed1",
                  "type": "has_only_phrase",
                  "uuid": "ee8bdd48-cd14-4a34-bd8e-ef9b8e93af80"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "fd0d5a09-5897-4b5a-8bfc-ef586bd9f43c",
                  "type": "has_only_phrase",
                  "uuid": "e6a50d0b-fc38-40b8-9b03-b59fbb501d8c"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "b5cec21b-3f1d-4271-b429-ca06c3f75c57",
                  "type": "has_only_phrase",
                  "uuid": "7d1f4c2e-3f0f-41c5-b036-1febb3bffbf5"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "bbd75b21-27d3-4e8e-b08c-4272a2a7e1ff",
                  "type": "has_only_phrase",
                  "uuid": "0fda3e40-6595-4aa2-b549-1628f3e7843d"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "9de92db0-3a50-4d9b-b772-b10ca784915c",
                  "type": "has_only_phrase",
                  "uuid": "bde99eca-c76d-4842-ab5c-5bda06904b71"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "d2442ab4-5a7a-45b4-88c0-120824185e81",
                  "type": "has_only_phrase",
                  "uuid": "1147e939-fce2-4fa4-8a0e-5828cc023f5e"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "d2f7c930-711f-41ee-8ce5-726c14ae6356",
                  "type": "has_only_phrase",
                  "uuid": "b62ca1e4-1b1b-4c54-8aab-95b8af9ce7dc"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "1edcb68f-7d54-4b3c-a14d-eee920a8d8ef",
                  "type": "has_only_phrase",
                  "uuid": "154c0cfc-5131-4424-9959-db96e38f037c"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "691cb449-fd8d-4ac0-b859-d1826ac91c7b",
                  "type": "has_only_phrase",
                  "uuid": "a7fa55b0-9401-479f-9ae5-7ac0de376a8f"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "f3faf6eb-771a-4dc6-9417-b00fc43366f2",
                  "type": "has_only_phrase",
                  "uuid": "c2c86786-fc58-4fc4-a199-a68aec645685"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "a01b561c-c4e5-4730-9b68-5ac0a25cbe7c",
                  "type": "has_only_phrase",
                  "uuid": "aae004a9-7b99-4c04-80e6-fd4860b63aba"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "d57c8d78-ecb0-4654-9c71-3521fe4b7e24",
                  "type": "has_only_phrase",
                  "uuid": "a996014c-fef1-47ed-bfd0-696ed8da95bf"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a55af46d-b79f-47af-ac38-2aa3e902f7e6",
                  "name": "All Responses",
                  "uuid": "b4e73539-b202-490a-bb03-28aeea0291de"
                },
                {
                  "exit_uuid": "441dbef5-4138-4078-b318-3f2add4bb1e0",
                  "name": "I don’t have enough time",
                  "uuid": "56748508-334a-44fd-8cf1-2beb67521cd8"
                },
                {
                  "exit_uuid": "ef97c777-35bf-409f-b88b-81f088b12ada",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "bc67f1d6-78a9-4b98-9936-cac4794d4ce4"
                },
                {
                  "exit_uuid": "baaf25e0-b5f0-4a28-be1c-a7626e90d2e9",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "c315ccd2-89cf-4287-a9e8-90e094f720f1"
                },
                {
                  "exit_uuid": "31d78762-7e3c-434f-9e5d-36b2e35b5f7d",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "f641cb44-3404-418d-b4c1-3527e48c7ed1"
                },
                {
                  "exit_uuid": "2d14704f-0aaa-46d8-b14d-f1837ef5f42c",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "fd0d5a09-5897-4b5a-8bfc-ef586bd9f43c"
                },
                {
                  "exit_uuid": "38f2f22e-fdff-4ba2-9624-efeafcf9d8e2",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "b5cec21b-3f1d-4271-b429-ca06c3f75c57"
                },
                {
                  "exit_uuid": "f21e3a3c-554b-48a3-8d98-6078bb0f72d8",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "bbd75b21-27d3-4e8e-b08c-4272a2a7e1ff"
                },
                {
                  "exit_uuid": "818428e7-03e1-4ea0-9bde-efff51e1da02",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "9de92db0-3a50-4d9b-b772-b10ca784915c"
                },
                {
                  "exit_uuid": "2560f531-2b2c-4041-962e-49900f8025f0",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "d2442ab4-5a7a-45b4-88c0-120824185e81"
                },
                {
                  "exit_uuid": "fa5166be-7a21-4ebb-8078-a0146abb5fce",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "d2f7c930-711f-41ee-8ce5-726c14ae6356"
                },
                {
                  "exit_uuid": "3ed5f6c2-3cc5-4498-9498-563b0ae0d666",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "1edcb68f-7d54-4b3c-a14d-eee920a8d8ef"
                },
                {
                  "exit_uuid": "067fa2fd-1a7a-4910-9d5f-7e23e9fdff90",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "691cb449-fd8d-4ac0-b859-d1826ac91c7b"
                },
                {
                  "exit_uuid": "b0e79a1e-7f9a-4c4b-9670-2a07ff45d043",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "f3faf6eb-771a-4dc6-9417-b00fc43366f2"
                },
                {
                  "exit_uuid": "bef5badc-df1a-4a0a-b69c-ae355139e2c5",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "a01b561c-c4e5-4730-9b68-5ac0a25cbe7c"
                },
                {
                  "exit_uuid": "2f7402e2-4a7f-44f0-9832-f01f5b773b08",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "d57c8d78-ecb0-4654-9c71-3521fe4b7e24"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a55af46d-b79f-47af-ac38-2aa3e902f7e6",
                "destination_uuid": null
              },
              {
                "uuid": "441dbef5-4138-4078-b318-3f2add4bb1e0",
                "destination_uuid": "af2f8aa6-0359-4eca-9ddc-813a4e4cfdf4"
              },
              {
                "uuid": "ef97c777-35bf-409f-b88b-81f088b12ada",
                "destination_uuid": "2db2791a-9651-4c9e-ae41-6e8aa8c9b0e8"
              },
              {
                "uuid": "baaf25e0-b5f0-4a28-be1c-a7626e90d2e9",
                "destination_uuid": "2db2791a-9651-4c9e-ae41-6e8aa8c9b0e8"
              },
              {
                "uuid": "31d78762-7e3c-434f-9e5d-36b2e35b5f7d",
                "destination_uuid": "90948789-63bd-4318-a799-1b897ece363c"
              },
              {
                "uuid": "2d14704f-0aaa-46d8-b14d-f1837ef5f42c",
                "destination_uuid": "90948789-63bd-4318-a799-1b897ece363c"
              },
              {
                "uuid": "38f2f22e-fdff-4ba2-9624-efeafcf9d8e2",
                "destination_uuid": "7b1da56e-2131-45f9-9abd-b625734f9c7c"
              },
              {
                "uuid": "f21e3a3c-554b-48a3-8d98-6078bb0f72d8",
                "destination_uuid": "7b1da56e-2131-45f9-9abd-b625734f9c7c"
              },
              {
                "uuid": "818428e7-03e1-4ea0-9bde-efff51e1da02",
                "destination_uuid": "3b84e077-ff5b-427c-a3e3-36dee824238b"
              },
              {
                "uuid": "2560f531-2b2c-4041-962e-49900f8025f0",
                "destination_uuid": "3b84e077-ff5b-427c-a3e3-36dee824238b"
              },
              {
                "uuid": "fa5166be-7a21-4ebb-8078-a0146abb5fce",
                "destination_uuid": "03217b49-aa93-4df0-bf6c-64229d0aca77"
              },
              {
                "uuid": "3ed5f6c2-3cc5-4498-9498-563b0ae0d666",
                "destination_uuid": "03217b49-aa93-4df0-bf6c-64229d0aca77"
              },
              {
                "uuid": "067fa2fd-1a7a-4910-9d5f-7e23e9fdff90",
                "destination_uuid": "760959cb-4fcb-40f1-a1c1-abe49b30ee23"
              },
              {
                "uuid": "b0e79a1e-7f9a-4c4b-9670-2a07ff45d043",
                "destination_uuid": "760959cb-4fcb-40f1-a1c1-abe49b30ee23"
              },
              {
                "uuid": "bef5badc-df1a-4a0a-b69c-ae355139e2c5",
                "destination_uuid": "fcfe8f3a-2bf5-4648-9d39-5ffa435f5057"
              },
              {
                "uuid": "2f7402e2-4a7f-44f0-9832-f01f5b773b08",
                "destination_uuid": "fcfe8f3a-2bf5-4648-9d39-5ffa435f5057"
              }
            ]
          },
          {
            "uuid": "af2f8aa6-0359-4eca-9ddc-813a4e4cfdf4",
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
                "uuid": "d7bc64a8-4f9c-43bf-9f4e-9967ee6df1cd"
              }
            ],
            "exits": [
              {
                "uuid": "d8a42d4d-c861-4e5e-8775-2471c669aeb6",
                "destination_uuid": "96c63ec6-f072-46c3-804c-55681013c531"
              }
            ]
          },
          {
            "uuid": "96c63ec6-f072-46c3-804c-55681013c531",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3d335d15-826b-4f40-afbe-3a1309fe8b9b",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "409b4bac-32fe-4c66-9681-b7904697a428",
                  "type": "has_only_phrase",
                  "uuid": "10d6ea01-11f5-4764-9023-4e52d6901e4d"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "1787002a-095e-48b2-b01d-fecce3e40abc",
                  "type": "has_only_phrase",
                  "uuid": "21169377-11ba-4751-b382-4c240d069ab1"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "63da9683-ad73-4490-9d78-4e5b8fb5cecf",
                  "type": "has_only_phrase",
                  "uuid": "74e0d724-59a7-41bd-87d4-6f03d2b183cc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9ecdba24-98c8-497c-811a-ae6462a87be8",
                  "name": "All Responses",
                  "uuid": "3d335d15-826b-4f40-afbe-3a1309fe8b9b"
                },
                {
                  "exit_uuid": "e57e7284-abdf-4bcc-af25-10d6fff8eec1",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "409b4bac-32fe-4c66-9681-b7904697a428"
                },
                {
                  "exit_uuid": "72c9bfa9-cb35-4953-ba7d-5abe68586598",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "1787002a-095e-48b2-b01d-fecce3e40abc"
                },
                {
                  "exit_uuid": "47dfb92d-2db6-40c2-92b7-0a0f4e5ba41a",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "63da9683-ad73-4490-9d78-4e5b8fb5cecf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9ecdba24-98c8-497c-811a-ae6462a87be8",
                "destination_uuid": null
              },
              {
                "uuid": "e57e7284-abdf-4bcc-af25-10d6fff8eec1",
                "destination_uuid": "a9a54433-9e1a-4bf2-821f-2a1e398a5a07"
              },
              {
                "uuid": "72c9bfa9-cb35-4953-ba7d-5abe68586598",
                "destination_uuid": "e93345cd-0476-49b6-87a2-67433504d041"
              },
              {
                "uuid": "47dfb92d-2db6-40c2-92b7-0a0f4e5ba41a",
                "destination_uuid": "3ee2df51-53b8-427e-a3ec-c8196725eb00"
              }
            ]
          },
          {
            "uuid": "a9a54433-9e1a-4bf2-821f-2a1e398a5a07",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7e2d7672-cd2c-4962-8e4d-ea8fcfb89fa6"
              }
            ],
            "exits": [
              {
                "uuid": "f27e3a13-e662-48f1-adab-dd5829ee354b",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "e93345cd-0476-49b6-87a2-67433504d041",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "582fad1d-5912-4b32-8aaa-151427eccfff"
              }
            ],
            "exits": [
              {
                "uuid": "f55b1ae0-bafe-43ca-92e9-dfca2261764c",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "3ee2df51-53b8-427e-a3ec-c8196725eb00",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2b811f92-f9a2-4eda-8bbb-9e5ad0533a81"
              }
            ],
            "exits": [
              {
                "uuid": "039c563e-5e36-4cc7-b63a-0ab24d57a96d",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "2db2791a-9651-4c9e-ae41-6e8aa8c9b0e8",
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
                "uuid": "6e529097-d38c-4af8-90df-74f9856aa817"
              }
            ],
            "exits": [
              {
                "uuid": "1378d0bf-5a35-4a30-9e33-b7a7449a477e",
                "destination_uuid": "45988dd0-0246-435f-8b51-da5ec59eb9ee"
              }
            ]
          },
          {
            "uuid": "45988dd0-0246-435f-8b51-da5ec59eb9ee",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5779849b-f361-4100-b2be-29a41f3e7cf0",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "4513abeb-82d3-45ac-a0b1-808c8b2ba5b3",
                  "type": "has_only_phrase",
                  "uuid": "905486a9-2e70-40cc-8550-e178d9517dac"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "bc278297-008a-4491-a660-be82e6803662",
                  "type": "has_only_phrase",
                  "uuid": "1c3d5917-9037-470e-a9bc-535ca2d06671"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "d8ba08b4-384e-4fc3-8a67-67990c64f311",
                  "type": "has_only_phrase",
                  "uuid": "bbb59385-3275-407b-ae77-187cf0075e13"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a79ad41c-79a2-43e3-bb8d-4729661f6475",
                  "name": "All Responses",
                  "uuid": "5779849b-f361-4100-b2be-29a41f3e7cf0"
                },
                {
                  "exit_uuid": "cdf63458-ca21-4e6b-8326-2b2e0a339c3a",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "4513abeb-82d3-45ac-a0b1-808c8b2ba5b3"
                },
                {
                  "exit_uuid": "bcee3c0e-7c6d-407f-a6bb-8656eeea65dc",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "bc278297-008a-4491-a660-be82e6803662"
                },
                {
                  "exit_uuid": "0c10c729-76b9-4db3-b015-72df4885414b",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "d8ba08b4-384e-4fc3-8a67-67990c64f311"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a79ad41c-79a2-43e3-bb8d-4729661f6475",
                "destination_uuid": null
              },
              {
                "uuid": "cdf63458-ca21-4e6b-8326-2b2e0a339c3a",
                "destination_uuid": "08e6f0bf-b9e9-4408-ae49-d41fd0980a73"
              },
              {
                "uuid": "bcee3c0e-7c6d-407f-a6bb-8656eeea65dc",
                "destination_uuid": "78af17c8-090f-4acb-bafd-ab45e27104f8"
              },
              {
                "uuid": "0c10c729-76b9-4db3-b015-72df4885414b",
                "destination_uuid": "ff2c3e5e-cb99-4123-8b05-2946e4abab56"
              }
            ]
          },
          {
            "uuid": "08e6f0bf-b9e9-4408-ae49-d41fd0980a73",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9ff08f24-e685-4b5c-afd5-c8b4de98473d"
              }
            ],
            "exits": [
              {
                "uuid": "8d997313-9b19-41a1-bbfc-6c8a1ecdf3ee",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "78af17c8-090f-4acb-bafd-ab45e27104f8",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0e90c3dc-10cb-4c7f-9c0f-6df55abefdd6"
              }
            ],
            "exits": [
              {
                "uuid": "32d17512-bfc9-4f76-82f9-16dd0175fe81",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "ff2c3e5e-cb99-4123-8b05-2946e4abab56",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "932b6573-786f-479b-ac04-9aa5791e283d"
              }
            ],
            "exits": [
              {
                "uuid": "6b52685c-3054-4e65-bea5-da6190ade0ad",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "90948789-63bd-4318-a799-1b897ece363c",
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
                "uuid": "f407604e-e0e2-4a3b-9f46-c4053e0627c7"
              }
            ],
            "exits": [
              {
                "uuid": "2adb4ed9-229d-4de7-aa8c-86e131e9d394",
                "destination_uuid": "9b08837b-4c2f-4717-bd26-eef1333cbc33"
              }
            ]
          },
          {
            "uuid": "9b08837b-4c2f-4717-bd26-eef1333cbc33",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "acb205a5-9eef-4447-abb7-e8f67ebf79d0",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "2d4ada06-b212-41c8-bdea-6217efff72ac",
                  "type": "has_only_phrase",
                  "uuid": "3f548f83-14aa-4f41-9f68-1fc140c3f562"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "dcc03ad5-1400-4bc0-ba57-03f555bbeeac",
                  "type": "has_only_phrase",
                  "uuid": "c726836b-6ea6-4966-b0d4-25aef51a7130"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "c7abbd8a-6162-4bc4-9ae5-e7d3caeed837",
                  "type": "has_only_phrase",
                  "uuid": "2cbeb1ca-70c3-4bee-bc29-ef7fc2947d12"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ad011071-b1c0-41eb-9261-453f6e1dceee",
                  "name": "All Responses",
                  "uuid": "acb205a5-9eef-4447-abb7-e8f67ebf79d0"
                },
                {
                  "exit_uuid": "d93a6abd-aadc-46ad-a9da-9843efee811c",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "2d4ada06-b212-41c8-bdea-6217efff72ac"
                },
                {
                  "exit_uuid": "75c87587-3a8b-42a4-a17b-40f3acaefc7e",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "dcc03ad5-1400-4bc0-ba57-03f555bbeeac"
                },
                {
                  "exit_uuid": "811a080d-fc83-4a4d-b75d-67d2bdef0d81",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "c7abbd8a-6162-4bc4-9ae5-e7d3caeed837"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ad011071-b1c0-41eb-9261-453f6e1dceee",
                "destination_uuid": null
              },
              {
                "uuid": "d93a6abd-aadc-46ad-a9da-9843efee811c",
                "destination_uuid": "61bc4488-3ad9-418e-b509-2541ecb64b18"
              },
              {
                "uuid": "75c87587-3a8b-42a4-a17b-40f3acaefc7e",
                "destination_uuid": "efcc9035-c941-4e7b-85b8-b893a5d52542"
              },
              {
                "uuid": "811a080d-fc83-4a4d-b75d-67d2bdef0d81",
                "destination_uuid": "22b9b602-c0f0-4937-8b24-48ff4a1c0f60"
              }
            ]
          },
          {
            "uuid": "61bc4488-3ad9-418e-b509-2541ecb64b18",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4a7aa985-c19b-4bc1-8da2-ed048d9dafca"
              }
            ],
            "exits": [
              {
                "uuid": "8bc257bc-b8a7-4d30-af12-e0ed55b76121",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "efcc9035-c941-4e7b-85b8-b893a5d52542",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9b958fee-fb25-4241-a6f4-0aa867099df2"
              }
            ],
            "exits": [
              {
                "uuid": "b71b894e-d831-4a02-a204-53a160a27e99",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "22b9b602-c0f0-4937-8b24-48ff4a1c0f60",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2c1b2a38-0cdf-498d-ad39-961ebe20ad31"
              }
            ],
            "exits": [
              {
                "uuid": "74f474c3-08ce-486b-95d5-29780b60aeed",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "7b1da56e-2131-45f9-9abd-b625734f9c7c",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "9f70ba95-4d6b-41e4-9785-5741e25f1c9a"
              }
            ],
            "exits": [
              {
                "uuid": "25698302-a16f-4029-aa87-c00ea11a1a0a",
                "destination_uuid": "4afe3fcd-1a25-42bd-99ce-f9e19bc403a6"
              }
            ]
          },
          {
            "uuid": "4afe3fcd-1a25-42bd-99ce-f9e19bc403a6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4aa18e71-9eff-48d6-ae07-867d6060b05d",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "6377f323-1a72-4783-91c9-424e85cb164b",
                  "type": "has_only_phrase",
                  "uuid": "5278ac09-cd89-4563-b6fe-e9048f819ed9"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "c5915fcc-8c06-4d0a-98ae-5cf06b767b54",
                  "type": "has_only_phrase",
                  "uuid": "457b7000-b83b-460c-8ad4-224f1d537070"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "96cf0723-aa09-4d79-b9c1-14fab662a7ae",
                  "name": "All Responses",
                  "uuid": "4aa18e71-9eff-48d6-ae07-867d6060b05d"
                },
                {
                  "exit_uuid": "b9296990-679f-4d1d-910d-d7c8c69ded4e",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "6377f323-1a72-4783-91c9-424e85cb164b"
                },
                {
                  "exit_uuid": "f9ddf7ee-f072-4fa1-afd5-a48209cff8fd",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "c5915fcc-8c06-4d0a-98ae-5cf06b767b54"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "96cf0723-aa09-4d79-b9c1-14fab662a7ae",
                "destination_uuid": null
              },
              {
                "uuid": "b9296990-679f-4d1d-910d-d7c8c69ded4e",
                "destination_uuid": "403d15d1-c049-42ad-b2ed-c5454dcdf8da"
              },
              {
                "uuid": "f9ddf7ee-f072-4fa1-afd5-a48209cff8fd",
                "destination_uuid": "7d651e59-2737-47e4-adf8-7c9089cf6a0a"
              }
            ]
          },
          {
            "uuid": "403d15d1-c049-42ad-b2ed-c5454dcdf8da",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "802f94a4-bac9-4a8c-8b34-1d374c428f36"
              }
            ],
            "exits": [
              {
                "uuid": "06052e5e-1663-4290-96fa-7a2d3e1ff5f7",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "7d651e59-2737-47e4-adf8-7c9089cf6a0a",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6ac7d025-01a5-4b14-a38c-64b962ca8db9"
              }
            ],
            "exits": [
              {
                "uuid": "d9898ce4-4eee-44ec-81ef-bc9683d7053f",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "3b84e077-ff5b-427c-a3e3-36dee824238b",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "09601635-d837-466d-b879-0dedb721ba3c"
              }
            ],
            "exits": [
              {
                "uuid": "3891a77c-56ca-4184-9f81-5430cf53e31e",
                "destination_uuid": "48da3eac-bff1-4256-85bb-f63b4927b710"
              }
            ]
          },
          {
            "uuid": "48da3eac-bff1-4256-85bb-f63b4927b710",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "da4094c1-0643-4cf0-bb98-89c77143d0a0",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "71d28872-15a5-4bcf-8104-b0958092904c",
                  "type": "has_only_phrase",
                  "uuid": "2d5b8487-1158-4e77-a9cf-7e19dfd1dec0"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "0fb6b757-d447-40b8-989d-48c024f007d1",
                  "type": "has_only_phrase",
                  "uuid": "f9b505b3-1341-4656-9de9-593938692e54"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "407ea644-81ca-41ce-a8b9-6e19f404901f",
                  "name": "All Responses",
                  "uuid": "da4094c1-0643-4cf0-bb98-89c77143d0a0"
                },
                {
                  "exit_uuid": "fe105840-1daa-4705-af13-b04a782a99f4",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "71d28872-15a5-4bcf-8104-b0958092904c"
                },
                {
                  "exit_uuid": "47593580-95b2-4599-82b8-94c75ae8dde7",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "0fb6b757-d447-40b8-989d-48c024f007d1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "407ea644-81ca-41ce-a8b9-6e19f404901f",
                "destination_uuid": null
              },
              {
                "uuid": "fe105840-1daa-4705-af13-b04a782a99f4",
                "destination_uuid": "ac965306-83c7-47cc-b683-563ab6daca2e"
              },
              {
                "uuid": "47593580-95b2-4599-82b8-94c75ae8dde7",
                "destination_uuid": "b8f637e7-0533-448d-b530-0b9bcc35e068"
              }
            ]
          },
          {
            "uuid": "ac965306-83c7-47cc-b683-563ab6daca2e",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ee8f9b74-2e83-48db-8e73-98cc278c8803"
              }
            ],
            "exits": [
              {
                "uuid": "1feae1b7-c5a1-4ecc-8ce6-517ffa252553",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "b8f637e7-0533-448d-b530-0b9bcc35e068",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bc0daf19-24d1-47a3-a4c5-5a50374dcb28"
              }
            ],
            "exits": [
              {
                "uuid": "3c5ab153-6db6-4796-9e6b-567d6e7c39c2",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "03217b49-aa93-4df0-bf6c-64229d0aca77",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "e2ec3385-95a5-49b2-b494-bbceb6c13101"
              }
            ],
            "exits": [
              {
                "uuid": "492c83e6-6847-449c-9a6d-1ca0f7e8e2da",
                "destination_uuid": "7fb486c6-bbd1-4f3f-9663-be52e6ce5fb4"
              }
            ]
          },
          {
            "uuid": "7fb486c6-bbd1-4f3f-9663-be52e6ce5fb4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "26f5235a-6878-4ea5-8aec-aed199b50a36",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "58ad5cfa-6f20-4061-ab24-51db5a7801dc",
                  "type": "has_only_phrase",
                  "uuid": "1973e5c9-c6ca-4006-af22-55a13f1760a5"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "a6bc02dc-18a5-46ae-9871-95f7f2ec0cd2",
                  "type": "has_only_phrase",
                  "uuid": "742b8cbc-2b9a-4e3e-8dd6-6f672ebfdff0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a88cb409-6e1c-45e0-b9b9-731c0b648bed",
                  "name": "All Responses",
                  "uuid": "26f5235a-6878-4ea5-8aec-aed199b50a36"
                },
                {
                  "exit_uuid": "4464dc1b-a968-4de6-bcb8-26132293958f",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "58ad5cfa-6f20-4061-ab24-51db5a7801dc"
                },
                {
                  "exit_uuid": "89dd781e-9592-4321-82c8-788177f4c36f",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "a6bc02dc-18a5-46ae-9871-95f7f2ec0cd2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a88cb409-6e1c-45e0-b9b9-731c0b648bed",
                "destination_uuid": null
              },
              {
                "uuid": "4464dc1b-a968-4de6-bcb8-26132293958f",
                "destination_uuid": "a2e4e492-9c5e-41e6-b985-1726460e33ae"
              },
              {
                "uuid": "89dd781e-9592-4321-82c8-788177f4c36f",
                "destination_uuid": "4e339010-ba9e-4427-8ff5-ec1e371a4441"
              }
            ]
          },
          {
            "uuid": "a2e4e492-9c5e-41e6-b985-1726460e33ae",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "f747afdf-5d76-4d1d-927e-5a39525001aa"
              }
            ],
            "exits": [
              {
                "uuid": "f5ff352b-dc22-4886-afe7-feca5aeb77ac",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "4e339010-ba9e-4427-8ff5-ec1e371a4441",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "118873ef-c927-4cca-b816-f1801b2f01a9"
              }
            ],
            "exits": [
              {
                "uuid": "25a54509-9c61-4cb0-87f6-f8ceca98dffa",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "760959cb-4fcb-40f1-a1c1-abe49b30ee23",
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
                "uuid": "4d9b88ac-42a5-4b8c-9e07-62b8b21c2cd3"
              }
            ],
            "exits": [
              {
                "uuid": "9d8b49cd-8f7f-47a6-8184-980ce3375873",
                "destination_uuid": "5fe04d1f-129b-4464-bbec-5f5ed696ee32"
              }
            ]
          },
          {
            "uuid": "5fe04d1f-129b-4464-bbec-5f5ed696ee32",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a7374fd3-c102-44a9-b2b6-2ab0a5936e82",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "711d468e-d4d9-48dc-bdf6-ea75ae3e11f3",
                  "type": "has_only_phrase",
                  "uuid": "53b8b989-7971-4e6c-bf28-625cd2f3cd08"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "ced05281-d773-4b19-bc55-78e74e8de834",
                  "type": "has_only_phrase",
                  "uuid": "66013c12-ec20-4e01-a261-120ff2535191"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "411cabc5-1dcc-43af-880b-e11c28cf7b97",
                  "type": "has_only_phrase",
                  "uuid": "a0338a60-79eb-490c-90c5-28fe8e99ab6b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "48d0a13b-9803-49a2-91b7-2e4d184b8eec",
                  "name": "All Responses",
                  "uuid": "a7374fd3-c102-44a9-b2b6-2ab0a5936e82"
                },
                {
                  "exit_uuid": "3eeb963d-f569-4a99-9559-c6679016ec97",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "711d468e-d4d9-48dc-bdf6-ea75ae3e11f3"
                },
                {
                  "exit_uuid": "c917a803-11d2-46ab-9b52-a0d2e08e972f",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "ced05281-d773-4b19-bc55-78e74e8de834"
                },
                {
                  "exit_uuid": "5d481fca-a70c-4343-b801-19e780a8ca35",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "411cabc5-1dcc-43af-880b-e11c28cf7b97"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "48d0a13b-9803-49a2-91b7-2e4d184b8eec",
                "destination_uuid": null
              },
              {
                "uuid": "3eeb963d-f569-4a99-9559-c6679016ec97",
                "destination_uuid": "cd3a58cc-5583-428e-8a4f-9a4dc1a3ad45"
              },
              {
                "uuid": "c917a803-11d2-46ab-9b52-a0d2e08e972f",
                "destination_uuid": "29c3969b-9a95-4cd6-96b6-5804f5de13cb"
              },
              {
                "uuid": "5d481fca-a70c-4343-b801-19e780a8ca35",
                "destination_uuid": "a65b80dc-3224-41a9-867e-4fa9bcc2c6cc"
              }
            ]
          },
          {
            "uuid": "cd3a58cc-5583-428e-8a4f-9a4dc1a3ad45",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3cc78a7b-6035-4a14-b1d5-d4d84280b36c"
              }
            ],
            "exits": [
              {
                "uuid": "fef8b3e8-f88d-4056-b0dc-b2ddd14c9ced",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "29c3969b-9a95-4cd6-96b6-5804f5de13cb",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bd4382ba-025c-4e64-8289-dd7c48369ea6"
              }
            ],
            "exits": [
              {
                "uuid": "ec7181e0-6bac-4cb1-8a33-1cf40d04a7b5",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "a65b80dc-3224-41a9-867e-4fa9bcc2c6cc",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "41f09892-98da-4077-aef5-bf2c09a25475"
              }
            ],
            "exits": [
              {
                "uuid": "23e6106a-57ae-4a55-8be8-1077bae13634",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "fcfe8f3a-2bf5-4648-9d39-5ffa435f5057",
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
                "uuid": "2bb05302-956d-4c7f-b636-78bd17b608ab"
              }
            ],
            "exits": [
              {
                "uuid": "ae955c9b-d7a9-48fd-b3cc-3040b6ddf9a5",
                "destination_uuid": "4b2f4728-9d13-4e00-b742-a70f0051faff"
              }
            ]
          },
          {
            "uuid": "4b2f4728-9d13-4e00-b742-a70f0051faff",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5fe72295-d1d7-4f1e-9661-55a87a6405fb",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "2d3c56a6-a0ac-4d4f-974d-1216a7654a5f",
                  "type": "has_only_phrase",
                  "uuid": "684b67d7-1382-41cb-b7e3-c120028ed721"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "2fd41ce5-afc7-40e1-8ab7-983901c195f0",
                  "type": "has_only_phrase",
                  "uuid": "f2328405-1c85-410c-88de-8f41597f932a"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "e2031425-4a1c-4385-8806-6e7d8ecc1430",
                  "type": "has_only_phrase",
                  "uuid": "a0cc68a7-f13a-4c47-9372-7075c7242f4b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "408d12df-1019-4569-a62e-69478bb89337",
                  "name": "All Responses",
                  "uuid": "5fe72295-d1d7-4f1e-9661-55a87a6405fb"
                },
                {
                  "exit_uuid": "80115e21-1022-47a7-8b96-698fd65a0f2f",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "2d3c56a6-a0ac-4d4f-974d-1216a7654a5f"
                },
                {
                  "exit_uuid": "e0f601ee-b283-4ea0-9d85-642a1662112e",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "2fd41ce5-afc7-40e1-8ab7-983901c195f0"
                },
                {
                  "exit_uuid": "62330935-9bf0-4486-9be4-cba941909f07",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "e2031425-4a1c-4385-8806-6e7d8ecc1430"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "408d12df-1019-4569-a62e-69478bb89337",
                "destination_uuid": null
              },
              {
                "uuid": "80115e21-1022-47a7-8b96-698fd65a0f2f",
                "destination_uuid": "6889384c-630f-476a-920c-63e7c9e16688"
              },
              {
                "uuid": "e0f601ee-b283-4ea0-9d85-642a1662112e",
                "destination_uuid": "55b6996e-17f5-461b-8d49-9731f39e22ed"
              },
              {
                "uuid": "62330935-9bf0-4486-9be4-cba941909f07",
                "destination_uuid": "6d682925-88b4-4146-8f2c-b9ae1d3972fd"
              }
            ]
          },
          {
            "uuid": "6889384c-630f-476a-920c-63e7c9e16688",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "16c96a3c-ada0-4a31-a106-02e963e53151"
              }
            ],
            "exits": [
              {
                "uuid": "2887e778-084d-4533-aed4-ff50d9219e77",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "55b6996e-17f5-461b-8d49-9731f39e22ed",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "99c36462-a2dd-470f-8e82-9b1eab353c7a"
              }
            ],
            "exits": [
              {
                "uuid": "5bed0689-64c1-4ccf-b4ab-a455d1773b95",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "6d682925-88b4-4146-8f2c-b9ae1d3972fd",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cd9e1b72-c8d2-4b34-9a92-4a002b491889"
              }
            ],
            "exits": [
              {
                "uuid": "74bf9f31-84bd-46dc-a6b6-66b11855a8e2",
                "destination_uuid": "dd155126-38be-429c-89c4-2252527f15a7"
              }
            ]
          },
          {
            "uuid": "dd155126-38be-429c-89c4-2252527f15a7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f46ef342-8aad-4f1c-aefa-00b4b8b99083",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "54da86a8-a179-440a-8674-e0959c6fea8c",
                  "type": "has_only_phrase",
                  "uuid": "82b1e82b-5564-40d6-b321-6290672d084f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "140e369e-7b87-48e0-bab9-8a0e38e85fee",
                  "name": "All Responses",
                  "uuid": "f46ef342-8aad-4f1c-aefa-00b4b8b99083"
                },
                {
                  "exit_uuid": "50767ca9-862d-4ef9-8e8d-ba07d7c6e568",
                  "name": "Next",
                  "uuid": "54da86a8-a179-440a-8674-e0959c6fea8c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "140e369e-7b87-48e0-bab9-8a0e38e85fee",
                "destination_uuid": null
              },
              {
                "uuid": "50767ca9-862d-4ef9-8e8d-ba07d7c6e568",
                "destination_uuid": "b6d5691f-f985-4593-b21c-e2c537d7a447"
              }
            ]
          },
          {
            "uuid": "b6d5691f-f985-4593-b21c-e2c537d7a447",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "d325e5ae-d658-49f7-882d-50f6e6b84e10"
              }
            ],
            "exits": [
              {
                "uuid": "c523bb46-cc9a-45d6-8c27-f6cf563b5891",
                "destination_uuid": "c5abb9dc-8946-46a3-8d70-0ecf60daf129"
              }
            ]
          },
          {
            "uuid": "c5abb9dc-8946-46a3-8d70-0ecf60daf129",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c65022f2-0281-4e9c-9e2f-cb13db11e536",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "3c3fbd67-466a-41ee-a085-76135e1e7ce9",
                  "type": "has_only_phrase",
                  "uuid": "e6c08261-6986-43f9-8844-e133ff06695e"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "2e2a03c1-506d-4453-ac7b-7d78fd0568fd",
                  "type": "has_only_phrase",
                  "uuid": "b96785c3-31b8-4754-914c-604940e12245"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f4016509-0626-4385-9029-fe127ce71ea0",
                  "name": "All Responses",
                  "uuid": "c65022f2-0281-4e9c-9e2f-cb13db11e536"
                },
                {
                  "exit_uuid": "170d06dd-131c-4eea-a98d-56de9128a606",
                  "name": "No",
                  "uuid": "3c3fbd67-466a-41ee-a085-76135e1e7ce9"
                },
                {
                  "exit_uuid": "9b376cda-67e3-4b67-9017-ae7568487c48",
                  "name": "Yes",
                  "uuid": "2e2a03c1-506d-4453-ac7b-7d78fd0568fd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f4016509-0626-4385-9029-fe127ce71ea0",
                "destination_uuid": null
              },
              {
                "uuid": "170d06dd-131c-4eea-a98d-56de9128a606",
                "destination_uuid": "e10b3c80-8d69-48ee-9357-5e39a91ee872"
              },
              {
                "uuid": "9b376cda-67e3-4b67-9017-ae7568487c48",
                "destination_uuid": "718714ba-ce79-43eb-a01b-a19728fa977f"
              }
            ]
          },
          {
            "uuid": "e10b3c80-8d69-48ee-9357-5e39a91ee872",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9ec6e3b6-b849-4dcb-b7e6-3b549837f2c0"
              }
            ],
            "exits": [
              {
                "uuid": "22727e91-6383-4d4d-9d1e-9b33d19048c7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "718714ba-ce79-43eb-a01b-a19728fa977f",
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
                "uuid": "6216d319-7ecf-48b1-99b4-368c024f368c"
              }
            ],
            "exits": [
              {
                "uuid": "36087271-3dae-4538-896f-c3875fe59384",
                "destination_uuid": "2226c4f3-f9bb-4e38-9fab-b363c64d90d1"
              }
            ]
          },
          {
            "uuid": "2226c4f3-f9bb-4e38-9fab-b363c64d90d1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a9697406-1bcc-43fd-85b6-0e4df95c1116",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "3c7d5ae1-389e-425f-af07-dcfe1a8992a1",
                  "type": "has_only_phrase",
                  "uuid": "ba7438ed-9684-4569-b96d-8c26ce46c1b3"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "e459df4e-62f8-4499-aedb-2b2835b48618",
                  "type": "has_only_phrase",
                  "uuid": "20aa80d8-176c-4298-a0b0-14b5fe62d3aa"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "9f6a627a-cde0-4213-aa35-8d4146a65376",
                  "type": "has_only_phrase",
                  "uuid": "cdee9f62-5452-4751-b76c-5262e15d9144"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "ac71cb1f-5772-477f-b4fa-86f450b1b96c",
                  "type": "has_only_phrase",
                  "uuid": "0402d0ea-48f0-45e4-b514-4b8f44e50167"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "7aeca95b-db59-4c30-aca2-b5dc621a3dbc",
                  "type": "has_only_phrase",
                  "uuid": "43a05255-591a-4e70-b839-1512fc5a4f5f"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "414d5650-a87c-406c-afec-052a67bff6dd",
                  "type": "has_only_phrase",
                  "uuid": "e1ad53dd-2d12-408c-9999-652ae442c336"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "6806303a-d6ff-4e97-bd54-e4a6b1f4a9b7",
                  "type": "has_only_phrase",
                  "uuid": "f35c7367-05a1-4cd2-b0f2-70bac767278c"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "51088e01-b953-499e-8b05-e704af960a61",
                  "type": "has_only_phrase",
                  "uuid": "217f613d-93a6-40c2-93d0-fd0cec0ecd87"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b8ffa13e-62e5-43e8-86aa-149c0ab049f6",
                  "name": "All Responses",
                  "uuid": "a9697406-1bcc-43fd-85b6-0e4df95c1116"
                },
                {
                  "exit_uuid": "6d62baea-c0f8-4db7-8c00-6765840d18a0",
                  "name": "I don’t have enough time",
                  "uuid": "3c7d5ae1-389e-425f-af07-dcfe1a8992a1"
                },
                {
                  "exit_uuid": "c21438f5-3d94-4ea7-8c98-885d24e51479",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "e459df4e-62f8-4499-aedb-2b2835b48618"
                },
                {
                  "exit_uuid": "aba0a5ea-9541-45ac-b075-df2fa129c3ae",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "9f6a627a-cde0-4213-aa35-8d4146a65376"
                },
                {
                  "exit_uuid": "e7e1ed05-0ef3-47c4-bfe0-3a3b8ec6803d",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "ac71cb1f-5772-477f-b4fa-86f450b1b96c"
                },
                {
                  "exit_uuid": "3933ba40-934e-4a76-bc44-66faf5a7d7d9",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "7aeca95b-db59-4c30-aca2-b5dc621a3dbc"
                },
                {
                  "exit_uuid": "de48f25d-e4d2-4cb6-8a47-f7501edc1872",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "414d5650-a87c-406c-afec-052a67bff6dd"
                },
                {
                  "exit_uuid": "bd923d69-9c48-47bb-8853-2394d946ac08",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "6806303a-d6ff-4e97-bd54-e4a6b1f4a9b7"
                },
                {
                  "exit_uuid": "eacf8c12-b3d3-42c1-8859-da2da12690bf",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "51088e01-b953-499e-8b05-e704af960a61"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b8ffa13e-62e5-43e8-86aa-149c0ab049f6",
                "destination_uuid": null
              },
              {
                "uuid": "6d62baea-c0f8-4db7-8c00-6765840d18a0",
                "destination_uuid": "af2f8aa6-0359-4eca-9ddc-813a4e4cfdf4"
              },
              {
                "uuid": "c21438f5-3d94-4ea7-8c98-885d24e51479",
                "destination_uuid": "2db2791a-9651-4c9e-ae41-6e8aa8c9b0e8"
              },
              {
                "uuid": "aba0a5ea-9541-45ac-b075-df2fa129c3ae",
                "destination_uuid": "90948789-63bd-4318-a799-1b897ece363c"
              },
              {
                "uuid": "e7e1ed05-0ef3-47c4-bfe0-3a3b8ec6803d",
                "destination_uuid": "7b1da56e-2131-45f9-9abd-b625734f9c7c"
              },
              {
                "uuid": "3933ba40-934e-4a76-bc44-66faf5a7d7d9",
                "destination_uuid": "3b84e077-ff5b-427c-a3e3-36dee824238b"
              },
              {
                "uuid": "de48f25d-e4d2-4cb6-8a47-f7501edc1872",
                "destination_uuid": "03217b49-aa93-4df0-bf6c-64229d0aca77"
              },
              {
                "uuid": "bd923d69-9c48-47bb-8853-2394d946ac08",
                "destination_uuid": "760959cb-4fcb-40f1-a1c1-abe49b30ee23"
              },
              {
                "uuid": "eacf8c12-b3d3-42c1-8859-da2da12690bf",
                "destination_uuid": "fcfe8f3a-2bf5-4648-9d39-5ffa435f5057"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d5f8344c-5617-4684-be76-f48bb094cd18",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d63bb2da-0be6-411d-bd59-6eb9b0864539",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "17fd0ff5-5960-41fc-8729-cdf926a33534"
              }
            ],
            "exits": [
              {
                "uuid": "47090501-4478-447d-ad1a-5ea0c3c83099",
                "destination_uuid": "31aacebd-44b2-4fb9-a36c-e5d2070d3129"
              }
            ]
          },
          {
            "uuid": "31aacebd-44b2-4fb9-a36c-e5d2070d3129",
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
                "uuid": "66cf035d-a58e-4cf6-a083-244e60a768cb"
              }
            ],
            "exits": [
              {
                "uuid": "4efb05e7-7763-431c-abf4-3d4cba3e395f",
                "destination_uuid": "49399670-335d-4e6d-ad92-a1635a0c61ce"
              }
            ]
          },
          {
            "uuid": "49399670-335d-4e6d-ad92-a1635a0c61ce",
            "actions": [],
            "exits": [
              {
                "uuid": "ea77174c-d3c3-4fd9-875e-aeefdd715ce2",
                "destination_uuid": "546bc4e2-327a-4eea-b2a5-712af005d58d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "5330b65d-f13a-497a-8e6c-fa6a3ea3a4f7",
              "cases": [],
              "categories": [
                {
                  "uuid": "5330b65d-f13a-497a-8e6c-fa6a3ea3a4f7",
                  "name": "All Responses",
                  "exit_uuid": "ea77174c-d3c3-4fd9-875e-aeefdd715ce2"
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
            "uuid": "546bc4e2-327a-4eea-b2a5-712af005d58d",
            "actions": [
              {
                "uuid": "88bb95ad-6792-4920-80df-7ca6c561bde1",
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
                "uuid": "d99a0415-7b92-4033-9572-00ab33ed1d72",
                "destination_uuid": "c169ae9f-89ff-49ef-8901-c1f13d142dac"
              }
            ]
          },
          {
            "uuid": "c169ae9f-89ff-49ef-8901-c1f13d142dac",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "036048c1-bb36-4885-8e59-c37fadb6f55a"
              }
            ],
            "exits": [
              {
                "uuid": "e017a0f3-8cef-481c-aac1-1abdf966c0b9",
                "destination_uuid": "1259ec53-3080-4eb4-b045-05735feda84c"
              }
            ]
          },
          {
            "uuid": "1259ec53-3080-4eb4-b045-05735feda84c",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0bf913cd-4f24-41db-8887-8541897fc6c6"
              }
            ],
            "exits": [
              {
                "uuid": "ed4911a8-6a27-42f1-9087-b3c6f7023480",
                "destination_uuid": "1a8ae2aa-1900-44f7-9d53-6b4c1b8a6523"
              }
            ]
          },
          {
            "uuid": "1a8ae2aa-1900-44f7-9d53-6b4c1b8a6523",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e7f49fff-c314-49d3-b9ee-46b1e4b0a692"
              }
            ],
            "exits": [
              {
                "uuid": "aff02c2b-5b85-42ab-9490-bbf9449de043",
                "destination_uuid": "5e3b9e0a-431a-4d4c-ac8c-02e93019ff06"
              }
            ]
          },
          {
            "uuid": "5e3b9e0a-431a-4d4c-ac8c-02e93019ff06",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "7c1fce8a-fab6-41ca-8960-632e2d481547"
              }
            ],
            "exits": [
              {
                "uuid": "abf932f0-22fd-4d00-8f68-ca4fb4d97c2a",
                "destination_uuid": "26d0ac1a-8e3c-4d63-b728-c2fcac810b61"
              }
            ]
          },
          {
            "uuid": "26d0ac1a-8e3c-4d63-b728-c2fcac810b61",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "36bf80ec-bb63-4d8f-8f2c-632f64fe76ff",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "f3a61e68-41c0-4a84-8f64-6eb4bab1a552",
                  "type": "has_only_phrase",
                  "uuid": "0b3eef71-cecb-4d8f-9d1c-46602698b648"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "10fb153b-da26-49e0-8e2c-e4ffcc32af6f",
                  "name": "All Responses",
                  "uuid": "36bf80ec-bb63-4d8f-8f2c-632f64fe76ff"
                },
                {
                  "exit_uuid": "a29ab9ef-5501-402f-90e9-b8a35e67c09b",
                  "name": "Let me hear your story",
                  "uuid": "f3a61e68-41c0-4a84-8f64-6eb4bab1a552"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "10fb153b-da26-49e0-8e2c-e4ffcc32af6f",
                "destination_uuid": null
              },
              {
                "uuid": "a29ab9ef-5501-402f-90e9-b8a35e67c09b",
                "destination_uuid": "e041ab76-73f3-4358-8c2b-bd7ccd58e5b6"
              }
            ]
          },
          {
            "uuid": "e041ab76-73f3-4358-8c2b-bd7ccd58e5b6",
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
                "uuid": "2272abb4-b49b-4236-b34f-4ba4c20dcc23"
              }
            ],
            "exits": [
              {
                "uuid": "9823fcae-1aa3-46a9-9f41-1523314dead9",
                "destination_uuid": "a6a0cd47-abf3-416a-9bad-e90d8af84ea7"
              }
            ]
          },
          {
            "uuid": "a6a0cd47-abf3-416a-9bad-e90d8af84ea7",
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
                "uuid": "fc6d5a8c-2f90-4528-8b03-dddca298a8ed"
              }
            ],
            "exits": [
              {
                "uuid": "d28af5f5-e45b-4460-98cb-66a3112e3b26",
                "destination_uuid": "3c35b57e-9cbe-4457-bd12-5853e2539a2e"
              }
            ]
          },
          {
            "uuid": "3c35b57e-9cbe-4457-bd12-5853e2539a2e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8cf9fb0c-9153-464c-9988-c16aef021b8d",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "23af69ca-225c-4f1f-95d0-c86bd4c0acb8",
                  "type": "has_only_phrase",
                  "uuid": "8a7d099f-2402-42c1-a65e-c0b11c64365d"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "e39a1b13-2e5c-4236-ad82-546277eb91b3",
                  "type": "has_only_phrase",
                  "uuid": "477e19d4-1b45-4f12-a08d-d76b682fc9e0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "214a81ed-8272-45ac-9645-02a4159084f5",
                  "name": "All Responses",
                  "uuid": "8cf9fb0c-9153-464c-9988-c16aef021b8d"
                },
                {
                  "exit_uuid": "3f98645b-623f-49f3-b952-f0d855fd334d",
                  "name": "Previous",
                  "uuid": "23af69ca-225c-4f1f-95d0-c86bd4c0acb8"
                },
                {
                  "exit_uuid": "aba7d01f-992e-4354-ab51-a7c3ead1128b",
                  "name": "Next",
                  "uuid": "e39a1b13-2e5c-4236-ad82-546277eb91b3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "214a81ed-8272-45ac-9645-02a4159084f5",
                "destination_uuid": null
              },
              {
                "uuid": "3f98645b-623f-49f3-b952-f0d855fd334d",
                "destination_uuid": "e041ab76-73f3-4358-8c2b-bd7ccd58e5b6"
              },
              {
                "uuid": "aba7d01f-992e-4354-ab51-a7c3ead1128b",
                "destination_uuid": "52864032-3cdf-445b-af28-92e1b89c620e"
              }
            ]
          },
          {
            "uuid": "52864032-3cdf-445b-af28-92e1b89c620e",
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
                "uuid": "f061c79f-78b9-4de6-9dd3-74d9422dc6cc"
              }
            ],
            "exits": [
              {
                "uuid": "8bd2c643-a6f9-44f0-9a73-0ab93fc46ffd",
                "destination_uuid": "938721e8-68eb-423b-8ddf-31496fe4423c"
              }
            ]
          },
          {
            "uuid": "938721e8-68eb-423b-8ddf-31496fe4423c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2bc8980b-f299-4137-8d91-f89296856e70",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "aa7ada89-ef97-4ccd-bb05-d5f87aad4f25",
                  "type": "has_only_phrase",
                  "uuid": "1f6e0c4d-2dec-419b-a5b3-0ff59e9fde7d"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "4894e15e-4100-4c5b-a408-da2b8006424d",
                  "type": "has_only_phrase",
                  "uuid": "eee473d5-98d9-4fd3-8320-398999a1ceb3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "60e601b8-5ac3-41a5-becf-5391d882d06d",
                  "name": "All Responses",
                  "uuid": "2bc8980b-f299-4137-8d91-f89296856e70"
                },
                {
                  "exit_uuid": "154b176b-db6b-4b63-ae60-779a1cca6d0b",
                  "name": "Previous",
                  "uuid": "aa7ada89-ef97-4ccd-bb05-d5f87aad4f25"
                },
                {
                  "exit_uuid": "b41d6ba5-f61b-401e-b456-0aa2cdaf7060",
                  "name": "Next",
                  "uuid": "4894e15e-4100-4c5b-a408-da2b8006424d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "60e601b8-5ac3-41a5-becf-5391d882d06d",
                "destination_uuid": null
              },
              {
                "uuid": "154b176b-db6b-4b63-ae60-779a1cca6d0b",
                "destination_uuid": "a6a0cd47-abf3-416a-9bad-e90d8af84ea7"
              },
              {
                "uuid": "b41d6ba5-f61b-401e-b456-0aa2cdaf7060",
                "destination_uuid": "5ceed50a-23af-4af8-ae12-ff1019cfb2c4"
              }
            ]
          },
          {
            "uuid": "5ceed50a-23af-4af8-ae12-ff1019cfb2c4",
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
                "uuid": "812bffa6-ab4a-4f88-ac42-a9ef9d7eb2c8"
              }
            ],
            "exits": [
              {
                "uuid": "c2338f2c-bd8e-4db1-ad37-b653adbad6fb",
                "destination_uuid": "9936e580-9a5b-40ed-9cfd-4c6787636b48"
              }
            ]
          },
          {
            "uuid": "9936e580-9a5b-40ed-9cfd-4c6787636b48",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "31d1859e-1707-47a1-8da6-7e7487ab1c84",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "9913619b-7644-4f6e-a521-11e4f83efeaf",
                  "type": "has_only_phrase",
                  "uuid": "53d859c5-8fab-4d87-afc1-d31809be0783"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "70560aaa-9976-4397-a1c7-eeb0666db89f",
                  "type": "has_only_phrase",
                  "uuid": "2428073d-f081-4d9e-bd99-100c6a81c61f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "af784950-7927-4ef0-8022-4d1cb869cc2d",
                  "name": "All Responses",
                  "uuid": "31d1859e-1707-47a1-8da6-7e7487ab1c84"
                },
                {
                  "exit_uuid": "8b972bd0-6197-4cee-be17-2192efc806ed",
                  "name": "Previous",
                  "uuid": "9913619b-7644-4f6e-a521-11e4f83efeaf"
                },
                {
                  "exit_uuid": "b5302da2-68e0-4515-8c06-9deb96dc8d6a",
                  "name": "Next",
                  "uuid": "70560aaa-9976-4397-a1c7-eeb0666db89f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "af784950-7927-4ef0-8022-4d1cb869cc2d",
                "destination_uuid": null
              },
              {
                "uuid": "8b972bd0-6197-4cee-be17-2192efc806ed",
                "destination_uuid": "52864032-3cdf-445b-af28-92e1b89c620e"
              },
              {
                "uuid": "b5302da2-68e0-4515-8c06-9deb96dc8d6a",
                "destination_uuid": "3e763de2-0a26-4271-98c5-b3963174c9dc"
              }
            ]
          },
          {
            "uuid": "3e763de2-0a26-4271-98c5-b3963174c9dc",
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
                "uuid": "b2fb9922-db3a-4a2f-bc27-a3c466feb67b"
              }
            ],
            "exits": [
              {
                "uuid": "fe399ca2-eb7c-479b-a98a-0fe706fcd967",
                "destination_uuid": "ad39708b-c2ac-4dd9-8204-9387eadf6bad"
              }
            ]
          },
          {
            "uuid": "ad39708b-c2ac-4dd9-8204-9387eadf6bad",
            "actions": [],
            "exits": [
              {
                "uuid": "1795423d-e805-4397-9676-146ceb0fc442",
                "destination_uuid": "019a3775-278d-4e0e-bf47-d4ef68a5d1ef"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f25b0434-fd38-412b-bbc0-e93af9e45f0b",
              "cases": [],
              "categories": [
                {
                  "uuid": "f25b0434-fd38-412b-bbc0-e93af9e45f0b",
                  "name": "All Responses",
                  "exit_uuid": "1795423d-e805-4397-9676-146ceb0fc442"
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
            "uuid": "019a3775-278d-4e0e-bf47-d4ef68a5d1ef",
            "actions": [
              {
                "uuid": "c707b040-a8ac-4f27-befd-57c93dce4eff",
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
                "uuid": "6d668a91-f11c-42e1-9a67-facc41442463",
                "destination_uuid": "35668fdc-f5a6-4af1-b5e9-5fff39782859"
              }
            ]
          },
          {
            "uuid": "35668fdc-f5a6-4af1-b5e9-5fff39782859",
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
                "uuid": "ac3832f8-45db-4357-a484-f574ec2a7ec0"
              }
            ],
            "exits": [
              {
                "uuid": "c3afa1ea-30c8-4da2-9cba-e4580f22841b",
                "destination_uuid": "94a06f95-8481-41ef-8334-62421cdad2dc"
              }
            ]
          },
          {
            "uuid": "94a06f95-8481-41ef-8334-62421cdad2dc",
            "actions": [],
            "exits": [
              {
                "uuid": "a6fae502-9059-4bf3-bb2e-2fa07964cc9a",
                "destination_uuid": "ee4de723-19a1-4309-98ca-3e146bbe8eb0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "152b620d-2749-4de4-9aef-0fcdbcd6218c",
              "cases": [],
              "categories": [
                {
                  "uuid": "152b620d-2749-4de4-9aef-0fcdbcd6218c",
                  "name": "All Responses",
                  "exit_uuid": "a6fae502-9059-4bf3-bb2e-2fa07964cc9a"
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
            "uuid": "ee4de723-19a1-4309-98ca-3e146bbe8eb0",
            "actions": [
              {
                "uuid": "12f35eeb-4926-4e62-b9fb-f86119f9dd16",
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
                "uuid": "7e8623d7-df2a-4150-8b78-4ce76f13f997",
                "destination_uuid": "15d66a49-3257-46a6-82d8-33fb4af4a0e7"
              }
            ]
          },
          {
            "uuid": "15d66a49-3257-46a6-82d8-33fb4af4a0e7",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "01750650-62a9-4a60-8ae1-3ee0b34795b5"
              }
            ],
            "exits": [
              {
                "uuid": "08e1e9d0-d49c-42ac-b1ba-c9bf545b7db4",
                "destination_uuid": "dcb7f22b-c35d-4aec-8615-b8db8666bece"
              }
            ]
          },
          {
            "uuid": "dcb7f22b-c35d-4aec-8615-b8db8666bece",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "34e927d6-f383-4f54-bb5a-b3fd9ae9b31e"
              }
            ],
            "exits": [
              {
                "uuid": "b9c874c9-dcde-400e-b476-77b5e2a50cf8",
                "destination_uuid": "7c06b0b4-0436-4e1b-9d04-f903e746048d"
              }
            ]
          },
          {
            "uuid": "7c06b0b4-0436-4e1b-9d04-f903e746048d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "96fc86a0-e3e1-4a96-804f-01a64e80ac40",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "e496ac76-2ba3-4c82-98cc-7e6b6b028cd3",
                  "type": "has_only_phrase",
                  "uuid": "24690ecd-5926-4701-8d45-f5b475bc4105"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "655333af-339c-40b2-b887-3affded6d296",
                  "type": "has_only_phrase",
                  "uuid": "e3086686-4a86-4ebf-bbb4-1dc300e17a4b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a0fed914-1bf3-450c-836a-2f991ab7b424",
                  "name": "All Responses",
                  "uuid": "96fc86a0-e3e1-4a96-804f-01a64e80ac40"
                },
                {
                  "exit_uuid": "b33fbd94-fb65-4b4e-8d15-19952441d18a",
                  "name": "Take me to Tips",
                  "uuid": "e496ac76-2ba3-4c82-98cc-7e6b6b028cd3"
                },
                {
                  "exit_uuid": "6ce4b5fb-c4a0-4a64-9c16-4e298fb16c48",
                  "name": "Take me to Homescreen",
                  "uuid": "655333af-339c-40b2-b887-3affded6d296"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a0fed914-1bf3-450c-836a-2f991ab7b424",
                "destination_uuid": null
              },
              {
                "uuid": "b33fbd94-fb65-4b4e-8d15-19952441d18a",
                "destination_uuid": "29207e22-aba4-4cc1-a792-f2c96f72df64"
              },
              {
                "uuid": "6ce4b5fb-c4a0-4a64-9c16-4e298fb16c48",
                "destination_uuid": "a92e9f38-e7bb-4d1f-b633-4506e3517068"
              }
            ]
          },
          {
            "uuid": "29207e22-aba4-4cc1-a792-f2c96f72df64",
            "actions": [
              {
                "uuid": "a1251ed4-9151-47cb-86ec-36e08a1c271e",
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
                "uuid": "3840bbd9-e953-4ef9-a511-151360c1d3b4",
                "destination_uuid": "1a3b9874-a54d-4737-b354-85ed72bbf79b"
              }
            ]
          },
          {
            "uuid": "1a3b9874-a54d-4737-b354-85ed72bbf79b",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "e358b0d7-18b2-4acb-a2c1-09805ddfcb99"
                },
                "type": "enter_flow",
                "uuid": "206903b8-5afd-430e-86f5-7d6fd2ceafc7"
              }
            ],
            "exits": [
              {
                "uuid": "5a196bb5-da12-4200-a040-14754dc14a61",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "a92e9f38-e7bb-4d1f-b633-4506e3517068",
            "actions": [
              {
                "uuid": "a6afaf9e-9213-4368-85a4-5abf124fc97d",
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
                "uuid": "8d5557a8-449e-4a60-b408-c285f2d349df",
                "destination_uuid": "b3109098-bed2-49f7-a7c7-0374acae6ccc"
              }
            ]
          },
          {
            "uuid": "b3109098-bed2-49f7-a7c7-0374acae6ccc",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "0bac49de-aa1c-49ff-9ba1-299decc39d2d"
                },
                "type": "enter_flow",
                "uuid": "cde56fd3-d2c2-44c2-979f-97ce2f6b8f76"
              }
            ],
            "exits": [
              {
                "uuid": "bebd9c7c-5d73-477a-a2cb-6cc827403a95",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "529959fb-7c86-47bb-96e6-84de17b8fb9b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "68a3b51f-5770-4136-bbf1-d3e85d0e6b2b",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5deabfea-e0cc-4f95-bac6-1d31ed9e6047"
              }
            ],
            "exits": [
              {
                "uuid": "9c41299e-e135-41a2-8a01-4d4912238baa",
                "destination_uuid": "b3d42147-4ac5-46bd-b612-927102d2b104"
              }
            ]
          },
          {
            "uuid": "b3d42147-4ac5-46bd-b612-927102d2b104",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "b377906f-6551-4bb4-93fe-59c46c9c4991"
              }
            ],
            "exits": [
              {
                "uuid": "76917308-2ed4-4f43-9226-13ca9155440a",
                "destination_uuid": "74ed113e-d064-4055-bae7-031497ca022e"
              }
            ]
          },
          {
            "uuid": "74ed113e-d064-4055-bae7-031497ca022e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d1ce040d-99e9-46fc-a74c-d9a37385ee50",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "d2fb63fa-5a79-48b9-87ca-47fd7551f696",
                  "type": "has_only_phrase",
                  "uuid": "9620e8b7-906a-481a-9138-84805a2256ba"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "a9a1289a-daa7-4515-9a33-f890fe2c81b5",
                  "type": "has_only_phrase",
                  "uuid": "9d6e90d9-723a-4236-8347-a895712f1f71"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c6c06b43-b4d1-4d2a-89a8-550f177fa584",
                  "name": "All Responses",
                  "uuid": "d1ce040d-99e9-46fc-a74c-d9a37385ee50"
                },
                {
                  "exit_uuid": "bf4b9731-e26f-4645-9b87-ad176356158e",
                  "name": "Later",
                  "uuid": "d2fb63fa-5a79-48b9-87ca-47fd7551f696"
                },
                {
                  "exit_uuid": "d14d3901-620c-40b0-9b77-9d724b0cd765",
                  "name": "Yes",
                  "uuid": "a9a1289a-daa7-4515-9a33-f890fe2c81b5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c6c06b43-b4d1-4d2a-89a8-550f177fa584",
                "destination_uuid": null
              },
              {
                "uuid": "bf4b9731-e26f-4645-9b87-ad176356158e",
                "destination_uuid": "7a032362-e2b7-4527-870a-c3d507f73143"
              },
              {
                "uuid": "d14d3901-620c-40b0-9b77-9d724b0cd765",
                "destination_uuid": "be67c89f-73b2-46ff-b2ec-2e8ec5e6ae9c"
              }
            ]
          },
          {
            "uuid": "7a032362-e2b7-4527-870a-c3d507f73143",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "bf3ec216-2769-4bf4-b9c6-62a55352faf9"
                },
                "type": "enter_flow",
                "uuid": "0795f594-663e-43bc-845b-c08ad10ee74c"
              }
            ],
            "exits": [
              {
                "uuid": "1c30f4cc-c10d-402b-a983-6d75dcd5a6cd",
                "destination_uuid": null
              },
              {
                "uuid": "7a18c609-8664-46ea-8a43-d25c90ca0584",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1ee68459-4a4d-47af-9980-25e5451c1bff",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "e6c91d31-091e-43c5-914a-b481e24a8408"
                },
                {
                  "uuid": "60251062-28e5-4e02-8e0c-bdcf0154579b",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "31247443-515c-4565-91b3-07d426eee361"
                }
              ],
              "categories": [
                {
                  "uuid": "e6c91d31-091e-43c5-914a-b481e24a8408",
                  "name": "Complete",
                  "exit_uuid": "1c30f4cc-c10d-402b-a983-6d75dcd5a6cd"
                },
                {
                  "uuid": "31247443-515c-4565-91b3-07d426eee361",
                  "name": "Expired",
                  "exit_uuid": "7a18c609-8664-46ea-8a43-d25c90ca0584"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "e6c91d31-091e-43c5-914a-b481e24a8408"
            }
          },
          {
            "uuid": "be67c89f-73b2-46ff-b2ec-2e8ec5e6ae9c",
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
                "uuid": "d51ef356-73ac-45c8-8ff6-877841aa3699"
              }
            ],
            "exits": [
              {
                "uuid": "f5578281-d2fd-45bf-8668-674b34ffc574",
                "destination_uuid": "82e00c51-5ace-4eb8-bf85-ba7f3f9bec4b"
              }
            ]
          },
          {
            "uuid": "82e00c51-5ace-4eb8-bf85-ba7f3f9bec4b",
            "actions": [],
            "exits": [
              {
                "uuid": "f0204d1c-b03e-4849-a301-a93e0d57440b",
                "destination_uuid": "5daa5257-a2d4-4ad2-813b-cbecd84b2ec0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e38c190e-aa27-4b06-926d-d2a0b066d9f1",
              "cases": [],
              "categories": [
                {
                  "uuid": "e38c190e-aa27-4b06-926d-d2a0b066d9f1",
                  "name": "All Responses",
                  "exit_uuid": "f0204d1c-b03e-4849-a301-a93e0d57440b"
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
            "uuid": "5daa5257-a2d4-4ad2-813b-cbecd84b2ec0",
            "actions": [
              {
                "uuid": "5ece807d-022b-4170-8f19-518405234d8c",
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
                "uuid": "a09d428b-a1ca-4637-8adf-9b8976abf6b8",
                "destination_uuid": "301456dc-ba1e-4331-93cd-c428d6492b12"
              }
            ]
          },
          {
            "uuid": "301456dc-ba1e-4331-93cd-c428d6492b12",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "9ea8e041-600e-4746-9106-ac1f10e9efb1"
              }
            ],
            "exits": [
              {
                "uuid": "42f2d9f4-f9c5-403b-a8fc-843cf83d325b",
                "destination_uuid": "dac1fb01-8354-49a6-9dd7-84b0766058d7"
              }
            ]
          },
          {
            "uuid": "dac1fb01-8354-49a6-9dd7-84b0766058d7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "daf134af-656c-4f2e-8259-a24adf8d7f84",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "d16aa33a-6ad6-48e1-ab3d-f55de5fda974",
                  "type": "has_only_phrase",
                  "uuid": "a936804a-7e04-4653-bb0d-1b82bb84871d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5888430a-6f80-44ec-9f33-965a5d1a168f",
                  "name": "All Responses",
                  "uuid": "daf134af-656c-4f2e-8259-a24adf8d7f84"
                },
                {
                  "exit_uuid": "77070e84-f167-4dc5-9ad3-a076b9d3e46e",
                  "name": "Click here when done",
                  "uuid": "d16aa33a-6ad6-48e1-ab3d-f55de5fda974"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5888430a-6f80-44ec-9f33-965a5d1a168f",
                "destination_uuid": null
              },
              {
                "uuid": "77070e84-f167-4dc5-9ad3-a076b9d3e46e",
                "destination_uuid": "3aeea110-d60e-4966-9fbe-662bcf6b2178"
              }
            ]
          },
          {
            "uuid": "3aeea110-d60e-4966-9fbe-662bcf6b2178",
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
                "uuid": "758433e0-1321-4a59-b235-ea73ac721744"
              }
            ],
            "exits": [
              {
                "uuid": "4930cb18-9963-4067-b74e-220e3c725e19",
                "destination_uuid": "8c6f652f-dcc8-4d74-8065-adc44cac85cc"
              }
            ]
          },
          {
            "uuid": "8c6f652f-dcc8-4d74-8065-adc44cac85cc",
            "actions": [],
            "exits": [
              {
                "uuid": "a1539ab0-8ac7-4abc-b958-ecc9bc215280",
                "destination_uuid": "8e81291b-0283-482c-acba-5f4c67e10064"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "96dcbe51-a456-406d-9daa-a1a1363b4a97",
              "cases": [],
              "categories": [
                {
                  "uuid": "96dcbe51-a456-406d-9daa-a1a1363b4a97",
                  "name": "All Responses",
                  "exit_uuid": "a1539ab0-8ac7-4abc-b958-ecc9bc215280"
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
            "uuid": "8e81291b-0283-482c-acba-5f4c67e10064",
            "actions": [
              {
                "uuid": "49ce48cc-4876-4c1e-b237-a88b782c28df",
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
                "uuid": "b7294a1d-6d10-4ae2-af8c-43e236a6829c",
                "destination_uuid": "1f8b5f5b-2411-4524-92fa-37cf84e890c4"
              }
            ]
          },
          {
            "uuid": "1f8b5f5b-2411-4524-92fa-37cf84e890c4",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "77e9b835-3c37-4370-acbf-3b84da02acbd"
              }
            ],
            "exits": [
              {
                "uuid": "81946934-5a28-4744-b7db-c8fe8cfe1206",
                "destination_uuid": "8b8b359e-72a2-4f79-936b-b56575bfd819"
              }
            ]
          },
          {
            "uuid": "8b8b359e-72a2-4f79-936b-b56575bfd819",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bc674300-38fd-4d01-9610-8641a015357c",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "201592fc-7cb9-47a5-8596-9e21697280e6",
                  "type": "has_only_phrase",
                  "uuid": "45b5863a-c6ae-4493-bca7-03dc1a4b045b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c7a9f5da-9a63-4744-bd02-a5203a9f03f3",
                  "name": "All Responses",
                  "uuid": "bc674300-38fd-4d01-9610-8641a015357c"
                },
                {
                  "exit_uuid": "a8cf4d76-04e3-427a-a495-00eb4f017536",
                  "name": "Click here when done",
                  "uuid": "201592fc-7cb9-47a5-8596-9e21697280e6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c7a9f5da-9a63-4744-bd02-a5203a9f03f3",
                "destination_uuid": null
              },
              {
                "uuid": "a8cf4d76-04e3-427a-a495-00eb4f017536",
                "destination_uuid": "1827e0df-d5f7-4863-a813-2f90216ed76d"
              }
            ]
          },
          {
            "uuid": "1827e0df-d5f7-4863-a813-2f90216ed76d",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b7a1f522-6f65-484e-882a-003a2bac4ae1"
              }
            ],
            "exits": [
              {
                "uuid": "18bb651d-efe2-45c0-b12b-143661dc64d5",
                "destination_uuid": "7df3bc12-298e-4f0b-899d-f84bc70363d8"
              }
            ]
          },
          {
            "uuid": "7df3bc12-298e-4f0b-899d-f84bc70363d8",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8a68f6a5-6fb0-4a7b-9ea1-4063d287079c"
              }
            ],
            "exits": [
              {
                "uuid": "4783b741-c5b7-45b7-8f17-cdf82ef2a6b3",
                "destination_uuid": "249e2213-22b8-4a95-87ee-cac5a9669c4a"
              }
            ]
          },
          {
            "uuid": "249e2213-22b8-4a95-87ee-cac5a9669c4a",
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
                "uuid": "72797e40-be83-4b81-b4e2-ab8e1070597b"
              }
            ],
            "exits": [
              {
                "uuid": "5c85208d-a782-4ad6-95a1-b0b219221918",
                "destination_uuid": "c7a0edd1-1fe1-4771-abe7-15035a20c57d"
              }
            ]
          },
          {
            "uuid": "c7a0edd1-1fe1-4771-abe7-15035a20c57d",
            "actions": [],
            "exits": [
              {
                "uuid": "ad02f3bf-6f2e-4ade-b8f9-b5caf0125458",
                "destination_uuid": "06c02c6b-49e9-435f-8c70-0903108f3a04"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b65c9aec-3d7c-4078-ae6e-9fb9730d6ccf",
              "cases": [],
              "categories": [
                {
                  "uuid": "b65c9aec-3d7c-4078-ae6e-9fb9730d6ccf",
                  "name": "All Responses",
                  "exit_uuid": "ad02f3bf-6f2e-4ade-b8f9-b5caf0125458"
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
            "uuid": "06c02c6b-49e9-435f-8c70-0903108f3a04",
            "actions": [
              {
                "uuid": "79d529c6-acac-4cf9-9425-ad7df4624df0",
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
                "uuid": "ba5f3472-6008-493e-b84d-f99ea73b2bcf",
                "destination_uuid": "c0bc57e0-6270-4348-abe9-8addf03c7105"
              }
            ]
          },
          {
            "uuid": "c0bc57e0-6270-4348-abe9-8addf03c7105",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "377009aa-3009-4481-8760-f210b5a51afc"
              }
            ],
            "exits": [
              {
                "uuid": "2704dd7b-6546-42fa-9ac2-f67c949ba409",
                "destination_uuid": "7a26fb8c-ce01-42b0-b6a3-24bf30d1fd67"
              }
            ]
          },
          {
            "uuid": "7a26fb8c-ce01-42b0-b6a3-24bf30d1fd67",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a169628e-c265-4b43-8561-6de1ac5f5fd5",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "8ba44a4d-0d86-46c6-bb35-fb8edb4f74fe",
                  "type": "has_only_phrase",
                  "uuid": "ee548017-9c8f-433d-9bd0-4f781d2a555d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8995dd90-7e45-440a-bfc2-af01c3fab85f",
                  "name": "All Responses",
                  "uuid": "a169628e-c265-4b43-8561-6de1ac5f5fd5"
                },
                {
                  "exit_uuid": "8a2f75a9-0761-40d2-b203-c87e5644b2ec",
                  "name": "Take me to Homescreen",
                  "uuid": "8ba44a4d-0d86-46c6-bb35-fb8edb4f74fe"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8995dd90-7e45-440a-bfc2-af01c3fab85f",
                "destination_uuid": null
              },
              {
                "uuid": "8a2f75a9-0761-40d2-b203-c87e5644b2ec",
                "destination_uuid": "ab6c300d-c8bd-437d-888f-528b139579e9"
              }
            ]
          },
          {
            "uuid": "ab6c300d-c8bd-437d-888f-528b139579e9",
            "actions": [
              {
                "uuid": "644ee7d8-7593-4bf6-a434-a48f9a6f2e08",
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
                "uuid": "18d10458-902b-4897-9714-514852653483",
                "destination_uuid": "fbe30e19-4804-457e-8438-43309160049c"
              }
            ]
          },
          {
            "uuid": "fbe30e19-4804-457e-8438-43309160049c",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "1985d1d8-c5cf-4fd1-a3de-e2b975f6ccd0"
                },
                "type": "enter_flow",
                "uuid": "1bb329be-3a7a-4f9d-96cd-370ba367f918"
              }
            ],
            "exits": [
              {
                "uuid": "cc284c96-bc8e-4361-b3c0-fd48323cf127",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4dc36cd0-8f99-4e47-8f0e-54d4da234993",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "62504716-cf9f-4b58-ae64-2011602fad35",
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
                "uuid": "c22e1a73-0162-45ee-aa40-a5605b5f79e0"
              }
            ],
            "exits": [
              {
                "uuid": "dd1df323-eda6-43c7-b77d-e5914de57018",
                "destination_uuid": "695ac1e3-fdd5-4827-bd13-2e81f5a98333"
              }
            ]
          },
          {
            "uuid": "695ac1e3-fdd5-4827-bd13-2e81f5a98333",
            "actions": [],
            "exits": [
              {
                "uuid": "909c51f0-5a19-4ab8-ab4c-2e076695590e",
                "destination_uuid": "414cfc39-e21d-4c11-b0d9-a9ebe6135d9a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0603f12d-ad25-4968-99a1-25e333697a13",
              "cases": [],
              "categories": [
                {
                  "uuid": "0603f12d-ad25-4968-99a1-25e333697a13",
                  "name": "All Responses",
                  "exit_uuid": "909c51f0-5a19-4ab8-ab4c-2e076695590e"
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
            "uuid": "414cfc39-e21d-4c11-b0d9-a9ebe6135d9a",
            "actions": [
              {
                "uuid": "9a42e25d-40a8-432d-946a-c936772ede5d",
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
                "uuid": "19c7262d-4beb-498d-93dc-3bf654672ee5",
                "destination_uuid": "7a502ced-6fae-44af-a7eb-419b103cc87a"
              }
            ]
          },
          {
            "uuid": "7a502ced-6fae-44af-a7eb-419b103cc87a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "afb6cb9a-56af-4eb9-b13d-862c893bce81",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "27ce52ce-af00-4004-ae9d-241f3137015f",
                  "type": "has_only_phrase",
                  "uuid": "0fb0401c-1549-49d1-8608-af8455098e40"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "b0b2c4d0-02da-45d5-ad16-9ed6dcc7ef43",
                  "type": "has_only_phrase",
                  "uuid": "ff190e7e-cdbf-4eba-b20d-d94054fee587"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "b0b2c4d0-02da-45d5-ad16-9ed6dcc7ef43",
                  "type": "has_only_phrase",
                  "uuid": "fb166903-eb91-4603-81b0-21d0e203b6b7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "32625173-6065-47fa-9177-5556fefc221f",
                  "name": "All Responses",
                  "uuid": "afb6cb9a-56af-4eb9-b13d-862c893bce81"
                },
                {
                  "exit_uuid": "9e68a5c8-45f8-4259-8a57-89975b69b277",
                  "name": "Great",
                  "uuid": "27ce52ce-af00-4004-ae9d-241f3137015f"
                },
                {
                  "exit_uuid": "0663cca6-8cdd-4569-9574-9db1305e2dd8",
                  "name": "Neutral; Bad",
                  "uuid": "b0b2c4d0-02da-45d5-ad16-9ed6dcc7ef43"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "32625173-6065-47fa-9177-5556fefc221f",
                "destination_uuid": null
              },
              {
                "uuid": "9e68a5c8-45f8-4259-8a57-89975b69b277",
                "destination_uuid": "8abd0f92-3af1-49d2-8539-6f3ae3515346"
              },
              {
                "uuid": "0663cca6-8cdd-4569-9574-9db1305e2dd8",
                "destination_uuid": "1db87af6-ceb2-4d57-ade6-4ed0e999b00e"
              }
            ]
          },
          {
            "uuid": "8abd0f92-3af1-49d2-8539-6f3ae3515346",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "3f8ec718-9ebb-4514-86d7-e8036579b346"
              }
            ],
            "exits": [
              {
                "uuid": "af00a12f-9248-4ad0-825f-84d9b0a1a55b",
                "destination_uuid": "e10e746f-1e62-46f4-b6e0-0eb2a419a737"
              }
            ]
          },
          {
            "uuid": "1db87af6-ceb2-4d57-ade6-4ed0e999b00e",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "4fea73b1-42e3-490b-a1c6-3f622212735a"
              }
            ],
            "exits": [
              {
                "uuid": "e3b53983-4c8b-4f85-bdc0-2797d4dac24e",
                "destination_uuid": "00125126-33f1-4377-8ff7-14913fe988e6"
              }
            ]
          },
          {
            "uuid": "00125126-33f1-4377-8ff7-14913fe988e6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9e441a75-ef8c-4862-9ab5-19eb1c671fd6",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "681732a7-4d89-4313-8801-996de1a991e4",
                  "type": "has_only_phrase",
                  "uuid": "839665dd-55fc-461d-ae94-8788ecb4953a"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "22e7dae9-6264-413c-8a17-c99413f816ad",
                  "type": "has_only_phrase",
                  "uuid": "854ba4ed-0894-436a-9b26-083551cff8a2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f8c73300-5d64-46d1-b744-50438f8844a4",
                  "name": "All Responses",
                  "uuid": "9e441a75-ef8c-4862-9ab5-19eb1c671fd6"
                },
                {
                  "exit_uuid": "fb69db88-d1bb-4a49-9353-abba65b9ddd0",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "681732a7-4d89-4313-8801-996de1a991e4"
                },
                {
                  "exit_uuid": "9066614a-94be-4ee4-8cac-d8ff0a7617d5",
                  "name": "Continue",
                  "uuid": "22e7dae9-6264-413c-8a17-c99413f816ad"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f8c73300-5d64-46d1-b744-50438f8844a4",
                "destination_uuid": null
              },
              {
                "uuid": "fb69db88-d1bb-4a49-9353-abba65b9ddd0",
                "destination_uuid": "82fb0eaa-24d1-4406-92c4-75f782dc8e1e"
              },
              {
                "uuid": "9066614a-94be-4ee4-8cac-d8ff0a7617d5",
                "destination_uuid": "596fa437-3c8f-4c46-bf68-8304c4264bba"
              }
            ]
          },
          {
            "uuid": "82fb0eaa-24d1-4406-92c4-75f782dc8e1e",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "228c1fbf-1ba2-4f8d-8bea-5ea0be130ac4"
                },
                "type": "enter_flow",
                "uuid": "c4845996-0b5c-4d29-b64c-55352130c8b0"
              }
            ],
            "exits": [
              {
                "uuid": "91656bee-7e99-4597-8fb5-6550a5fe0f29",
                "destination_uuid": "d800444a-c619-42f3-90c2-86d3284388c0"
              },
              {
                "uuid": "54f32478-cc57-43ca-a95f-f0ee910fd68d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "76564c1f-dd79-4297-9b40-0a4f0ffd7ddf",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b7b7dc6c-346d-4dab-9201-36d0c72dce6c"
                },
                {
                  "uuid": "7e12d5ca-0ff6-4408-b222-dfae2b713b08",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b1343af0-4b1f-49fb-8541-1e4db98af8cc"
                }
              ],
              "categories": [
                {
                  "uuid": "b7b7dc6c-346d-4dab-9201-36d0c72dce6c",
                  "name": "Complete",
                  "exit_uuid": "91656bee-7e99-4597-8fb5-6550a5fe0f29"
                },
                {
                  "uuid": "b1343af0-4b1f-49fb-8541-1e4db98af8cc",
                  "name": "Expired",
                  "exit_uuid": "54f32478-cc57-43ca-a95f-f0ee910fd68d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b7b7dc6c-346d-4dab-9201-36d0c72dce6c"
            }
          },
          {
            "uuid": "e10e746f-1e62-46f4-b6e0-0eb2a419a737",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6491cf6b-5fe4-4f55-a63e-f3f3bd245902",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "3e461f2b-7ef8-4452-93b6-6211720f63ce",
                  "type": "has_only_phrase",
                  "uuid": "26c9a8b8-1800-41ee-87fc-2003ae1a1af3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d490b2f9-64b5-440c-8af1-91d0ee83e34f",
                  "name": "All Responses",
                  "uuid": "6491cf6b-5fe4-4f55-a63e-f3f3bd245902"
                },
                {
                  "exit_uuid": "7e1e071c-37be-4e17-9ea9-cfbab2fe1db6",
                  "name": "Go to Praise check-in",
                  "uuid": "3e461f2b-7ef8-4452-93b6-6211720f63ce"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d490b2f9-64b5-440c-8af1-91d0ee83e34f",
                "destination_uuid": null
              },
              {
                "uuid": "7e1e071c-37be-4e17-9ea9-cfbab2fe1db6",
                "destination_uuid": "e73bfd82-51f2-4094-b8d1-062d6e926b8f"
              }
            ]
          },
          {
            "uuid": "e73bfd82-51f2-4094-b8d1-062d6e926b8f",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "5259c054-5510-457a-b4df-be5cf2882c33"
              }
            ],
            "exits": [
              {
                "uuid": "e964e990-31f0-40ec-96dc-7a0434d36f7c",
                "destination_uuid": "1daa1301-59e8-46c1-8530-a8288c37d9be"
              }
            ]
          },
          {
            "uuid": "596fa437-3c8f-4c46-bf68-8304c4264bba",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c978767a-7517-4123-a597-a25ffa991e24"
              }
            ],
            "exits": [
              {
                "uuid": "77df5e40-3426-4237-9c63-4683d99537b0",
                "destination_uuid": "1daa1301-59e8-46c1-8530-a8288c37d9be"
              }
            ]
          },
          {
            "uuid": "d800444a-c619-42f3-90c2-86d3284388c0",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "5d8e54fb-4e68-45ed-9b81-fb20b8b9316f"
              }
            ],
            "exits": [
              {
                "uuid": "449d247c-e173-4047-b311-455f14170fa2",
                "destination_uuid": "1daa1301-59e8-46c1-8530-a8288c37d9be"
              }
            ]
          },
          {
            "uuid": "1daa1301-59e8-46c1-8530-a8288c37d9be",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "543e8747-97a0-494d-a6e2-be3968fa7b39",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "70bd34da-2c94-4b14-b431-625c6eaeaa09",
                  "type": "has_only_phrase",
                  "uuid": "0a99e2ec-af57-428c-a6c1-7c7045531cd6"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "84b86421-3c4d-4706-9d78-497a0791b4b1",
                  "type": "has_only_phrase",
                  "uuid": "0565cc1a-8762-4909-b1ad-31a1a976b5e1"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "6b2b31f7-7c69-4a20-9c3b-601dc777078c",
                  "type": "has_only_phrase",
                  "uuid": "c5b26ffc-0934-45d1-bb90-0e943679214c"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "d406a908-f924-4820-904f-94b4a2bf35c2",
                  "type": "has_only_phrase",
                  "uuid": "0222bbbc-c01b-42e8-88f8-0a89abe50705"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "60ac3ae1-b3b3-4bc6-8157-a81daa5afdc9",
                  "name": "All Responses",
                  "uuid": "543e8747-97a0-494d-a6e2-be3968fa7b39"
                },
                {
                  "exit_uuid": "9d0e62f3-7ace-4fce-907d-c055665b43a7",
                  "name": "No",
                  "uuid": "70bd34da-2c94-4b14-b431-625c6eaeaa09"
                },
                {
                  "exit_uuid": "f01b85e0-cd72-4417-88c4-9676e689657e",
                  "name": "Yes",
                  "uuid": "84b86421-3c4d-4706-9d78-497a0791b4b1"
                },
                {
                  "exit_uuid": "f9afb0c8-2d44-405a-83e3-47714c2da7a4",
                  "name": "Yes",
                  "uuid": "6b2b31f7-7c69-4a20-9c3b-601dc777078c"
                },
                {
                  "exit_uuid": "081372e7-7061-4f0a-986d-6c32eb4d4336",
                  "name": "Yes",
                  "uuid": "d406a908-f924-4820-904f-94b4a2bf35c2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "60ac3ae1-b3b3-4bc6-8157-a81daa5afdc9",
                "destination_uuid": null
              },
              {
                "uuid": "9d0e62f3-7ace-4fce-907d-c055665b43a7",
                "destination_uuid": "f861a5d3-386a-4d3c-8f3d-2827dda89061"
              },
              {
                "uuid": "f01b85e0-cd72-4417-88c4-9676e689657e",
                "destination_uuid": "475a0f88-0de1-409e-931f-9d116db5f1fd"
              },
              {
                "uuid": "f9afb0c8-2d44-405a-83e3-47714c2da7a4",
                "destination_uuid": "475a0f88-0de1-409e-931f-9d116db5f1fd"
              },
              {
                "uuid": "081372e7-7061-4f0a-986d-6c32eb4d4336",
                "destination_uuid": "475a0f88-0de1-409e-931f-9d116db5f1fd"
              }
            ]
          },
          {
            "uuid": "f861a5d3-386a-4d3c-8f3d-2827dda89061",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f24ad58f-79b6-4f20-b48e-40ee8844db25"
              }
            ],
            "exits": [
              {
                "uuid": "4b772111-6a87-41a1-9a38-36d650c3e6e5",
                "destination_uuid": "3eca297c-42b8-4268-9dd4-dc8434c9a903"
              }
            ]
          },
          {
            "uuid": "475a0f88-0de1-409e-931f-9d116db5f1fd",
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
                "uuid": "bd6f0acb-3757-460c-af1a-1502dcaf2351"
              }
            ],
            "exits": [
              {
                "uuid": "8174af72-1c40-4f55-80d0-2027d9e82385",
                "destination_uuid": "ed7443a3-ba21-424d-94e5-67e13db51e47"
              }
            ]
          },
          {
            "uuid": "ed7443a3-ba21-424d-94e5-67e13db51e47",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5a64082a-99b7-4c08-980f-b727befeaaca",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "f3e54209-2ee5-42da-8a7a-b77bf4502a9b",
                  "type": "has_only_phrase",
                  "uuid": "d45fa823-8f0e-4192-b59b-7158a213577b"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "52ce4d84-0406-4c67-a4b2-1f8c2d69b1a2",
                  "type": "has_only_phrase",
                  "uuid": "63d176bf-c511-49ca-b888-083abafc06fe"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "6bd0bbd2-16a2-4abc-8fd2-146e308be0f2",
                  "type": "has_only_phrase",
                  "uuid": "4e079a35-548c-407b-9cbb-56c0c24bf10f"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "3db8c1e1-6e93-48ef-a782-217d021683e9",
                  "type": "has_only_phrase",
                  "uuid": "535472c8-e29d-4fb9-b5cc-c3c714a098c1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2722467a-9ca5-4df0-8e0d-db91d78d7036",
                  "name": "All Responses",
                  "uuid": "5a64082a-99b7-4c08-980f-b727befeaaca"
                },
                {
                  "exit_uuid": "1fc9195d-17ab-491b-869c-ec0e7d8c20ee",
                  "name": "Surprised",
                  "uuid": "f3e54209-2ee5-42da-8a7a-b77bf4502a9b"
                },
                {
                  "exit_uuid": "f67c8c80-5561-4af5-a961-939b89dc567b",
                  "name": "Happy",
                  "uuid": "52ce4d84-0406-4c67-a4b2-1f8c2d69b1a2"
                },
                {
                  "exit_uuid": "afe2d9aa-a1d7-4a4e-900f-acad95750c57",
                  "name": "My teen did not like it",
                  "uuid": "6bd0bbd2-16a2-4abc-8fd2-146e308be0f2"
                },
                {
                  "exit_uuid": "e53ab62a-a421-4ca3-8cd5-c57a16a948c5",
                  "name": "I don’t know",
                  "uuid": "3db8c1e1-6e93-48ef-a782-217d021683e9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2722467a-9ca5-4df0-8e0d-db91d78d7036",
                "destination_uuid": null
              },
              {
                "uuid": "1fc9195d-17ab-491b-869c-ec0e7d8c20ee",
                "destination_uuid": "9d9dc6be-f4ac-4873-95ef-a9926845c5f9"
              },
              {
                "uuid": "f67c8c80-5561-4af5-a961-939b89dc567b",
                "destination_uuid": "1cc31451-860a-4751-a782-c3d5aa932890"
              },
              {
                "uuid": "afe2d9aa-a1d7-4a4e-900f-acad95750c57",
                "destination_uuid": "fb33eaa8-7bcc-499f-8090-98ccf341c569"
              },
              {
                "uuid": "e53ab62a-a421-4ca3-8cd5-c57a16a948c5",
                "destination_uuid": "b0fcc120-0e5b-4d2c-ab7d-bfa2c90494c5"
              }
            ]
          },
          {
            "uuid": "9d9dc6be-f4ac-4873-95ef-a9926845c5f9",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b3a3d2de-ea83-4ed0-b841-45cbd53c695d"
              }
            ],
            "exits": [
              {
                "uuid": "252bcde3-d062-49c4-858e-cb12fe4cb5b7",
                "destination_uuid": "8bba571f-d595-455b-973d-9f48fe549dab"
              }
            ]
          },
          {
            "uuid": "1cc31451-860a-4751-a782-c3d5aa932890",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1e7e1418-1ee0-477e-96bd-7ab2f43f83d9"
              }
            ],
            "exits": [
              {
                "uuid": "d8321234-d08b-4cc5-a7bf-0d1b51c4e6a7",
                "destination_uuid": "8bba571f-d595-455b-973d-9f48fe549dab"
              }
            ]
          },
          {
            "uuid": "fb33eaa8-7bcc-499f-8090-98ccf341c569",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e8c145a2-5403-4cb6-816d-4ce06c0c2e51"
              }
            ],
            "exits": [
              {
                "uuid": "b5318ec3-4b8b-43ea-b8bc-76e312506434",
                "destination_uuid": "8bba571f-d595-455b-973d-9f48fe549dab"
              }
            ]
          },
          {
            "uuid": "b0fcc120-0e5b-4d2c-ab7d-bfa2c90494c5",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ba89db1f-572d-4c45-96d3-429867c35b13"
              }
            ],
            "exits": [
              {
                "uuid": "2b693351-f31d-4831-9943-9a2f4989ebb0",
                "destination_uuid": "8bba571f-d595-455b-973d-9f48fe549dab"
              }
            ]
          },
          {
            "uuid": "8bba571f-d595-455b-973d-9f48fe549dab",
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
                "uuid": "2e144521-3fde-4f49-ab74-094a568206ec"
              }
            ],
            "exits": [
              {
                "uuid": "bec2a55d-11f5-4ab1-bd69-d50db6fd79ce",
                "destination_uuid": "ead7a708-54d8-4580-bf19-b9f2b225f16d"
              }
            ]
          },
          {
            "uuid": "ead7a708-54d8-4580-bf19-b9f2b225f16d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "01f760e8-ef9f-438a-a94f-607a01af330a",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "fad80bf0-aa01-4ad0-8c9d-f23065731237",
                  "type": "has_only_phrase",
                  "uuid": "c8a43d9c-fd5d-46a5-86d2-bfc034860d92"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "fad80bf0-aa01-4ad0-8c9d-f23065731237",
                  "type": "has_only_phrase",
                  "uuid": "777c87d3-fb24-46f2-8396-c590b8f9e520"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "e199a4ef-3d2b-4199-bb4b-f4b28d2a1bc5",
                  "type": "has_only_phrase",
                  "uuid": "9712375f-a2b3-45aa-a752-41aded26d4d9"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "e199a4ef-3d2b-4199-bb4b-f4b28d2a1bc5",
                  "type": "has_only_phrase",
                  "uuid": "c090bc8e-f9ad-4975-9f64-eb65f78837cc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "be5fa76b-0b88-4164-b077-0927f361bdc0",
                  "name": "All Responses",
                  "uuid": "01f760e8-ef9f-438a-a94f-607a01af330a"
                },
                {
                  "exit_uuid": "eeedb3cd-c10e-49c3-9cda-7bed50c02ce6",
                  "name": "Every day; Almost every day",
                  "uuid": "fad80bf0-aa01-4ad0-8c9d-f23065731237"
                },
                {
                  "exit_uuid": "9478ff21-32a7-44a7-acfd-7a33f3715a7e",
                  "name": "A few days; Never",
                  "uuid": "e199a4ef-3d2b-4199-bb4b-f4b28d2a1bc5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "be5fa76b-0b88-4164-b077-0927f361bdc0",
                "destination_uuid": null
              },
              {
                "uuid": "eeedb3cd-c10e-49c3-9cda-7bed50c02ce6",
                "destination_uuid": "6876be22-ce78-4bcf-a6e0-176c8b2ae327"
              },
              {
                "uuid": "9478ff21-32a7-44a7-acfd-7a33f3715a7e",
                "destination_uuid": "e1471c1d-efb7-497f-8835-27830dd8d281"
              }
            ]
          },
          {
            "uuid": "6876be22-ce78-4bcf-a6e0-176c8b2ae327",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6666ea52-ba63-49cc-9244-a4fee29fb72e"
              }
            ],
            "exits": [
              {
                "uuid": "16e354ff-0762-491e-9b6a-d733ec4a7084",
                "destination_uuid": "3eca297c-42b8-4268-9dd4-dc8434c9a903"
              }
            ]
          },
          {
            "uuid": "e1471c1d-efb7-497f-8835-27830dd8d281",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3c01eb0b-f3e6-474f-991f-f2f9c6d36227"
              }
            ],
            "exits": [
              {
                "uuid": "b902011d-d604-4705-804e-956368ada0c9",
                "destination_uuid": "3eca297c-42b8-4268-9dd4-dc8434c9a903"
              }
            ]
          },
          {
            "uuid": "3eca297c-42b8-4268-9dd4-dc8434c9a903",
            "actions": [
              {
                "uuid": "56575df6-65cf-477f-a061-b462656cadcc",
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
                "uuid": "64dd4171-7ab0-469a-b699-24be6fb4b8cb",
                "destination_uuid": "8d05d9ff-1a45-4d9f-80f4-ba8aa61a395d"
              }
            ]
          },
          {
            "uuid": "8d05d9ff-1a45-4d9f-80f4-ba8aa61a395d",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "748ae34b-daf7-4c95-b889-95f65ecbc5a7"
                },
                "type": "enter_flow",
                "uuid": "898dc190-e021-4612-97d3-3ee32c242a24"
              }
            ],
            "exits": [
              {
                "uuid": "2220065f-b262-41d3-b8a1-36831a696ce5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "49e6d63d-4d52-4ffa-afbe-3027ed9c8a21",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9b5ea5fb-85d0-4de0-a491-d59c599a9eca",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0bf570a0-794c-41e8-a982-aadbb6e3e996"
              }
            ],
            "exits": [
              {
                "uuid": "273b752c-7fd3-441a-ba74-e11be0338c41",
                "destination_uuid": "4b98a0a9-4385-49e8-b350-3fbd962cf888"
              }
            ]
          },
          {
            "uuid": "4b98a0a9-4385-49e8-b350-3fbd962cf888",
            "actions": [
              {
                "uuid": "4286e585-b849-46b2-8c81-4897de2d5f8c",
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
                "uuid": "c33c847e-2fd3-48f3-8ec4-67acc95a8805",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "7522eac1-54c2-4887-8baf-bc7d26fa92ef",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "41c0d619-5101-4be1-b3a7-20bbc26036cf",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b4eb53c7-ca7e-4703-877e-607004666ab8"
              }
            ],
            "exits": [
              {
                "uuid": "e2240e8d-9047-41e5-b897-7f3c63d8a7f0",
                "destination_uuid": "718d62fe-9c93-4545-89bd-fc22b6c279e1"
              }
            ]
          },
          {
            "uuid": "718d62fe-9c93-4545-89bd-fc22b6c279e1",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cafcc958-74af-4faa-ad7a-fc6e5f274692"
              }
            ],
            "exits": [
              {
                "uuid": "f096f926-30b8-441b-b22b-b979957f87b7",
                "destination_uuid": "06d4997a-63be-4d19-be4a-93519e4bd374"
              }
            ]
          },
          {
            "uuid": "06d4997a-63be-4d19-be4a-93519e4bd374",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b936c20a-81e4-4740-a163-5ca5c72d2cf5"
              }
            ],
            "exits": [
              {
                "uuid": "4fb7b54c-0403-4c70-8dd5-0c98c52fc973",
                "destination_uuid": "6dc53688-a84c-4466-a5e7-eab950b4abf9"
              }
            ]
          },
          {
            "uuid": "6dc53688-a84c-4466-a5e7-eab950b4abf9",
            "actions": [
              {
                "uuid": "e5e70425-03d2-4895-a686-5dcd4c42f7b2",
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
                "uuid": "47de483c-f537-40a7-a60e-3777e5e35e76",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f0fc137e-50e6-46a7-a1ae-faae801e0708",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b4444f1e-abd7-45ea-90e1-6b43f76e7923",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2c45c716-3567-4508-8bf4-8a23137c3296"
              }
            ],
            "exits": [
              {
                "uuid": "1d977e82-c29c-43a3-ab62-607ccef2725e",
                "destination_uuid": "664e59c0-5483-437c-a461-bc145032f3ab"
              }
            ]
          },
          {
            "uuid": "664e59c0-5483-437c-a461-bc145032f3ab",
            "actions": [
              {
                "uuid": "5b75f7bd-c096-4430-9c6d-cb29c0f0b2f2",
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
                "uuid": "f866d868-6091-44b8-a23f-d266d0533011",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "37d6a7e5-9e27-4c14-908f-0e6ca475d03d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ffd91647-edec-428a-a66b-3f977984d438",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7b988005-3d67-4c02-8f65-94bbc6483201"
              }
            ],
            "exits": [
              {
                "uuid": "1201bd54-429b-4f9e-a745-dff88ca8245d",
                "destination_uuid": "33b7db56-090f-487f-b1a6-0043470a30b9"
              }
            ]
          },
          {
            "uuid": "33b7db56-090f-487f-b1a6-0043470a30b9",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2458a11b-03d7-45d5-bc27-024d86447d97"
              }
            ],
            "exits": [
              {
                "uuid": "8ccf9bd5-e695-40c9-bee2-593ecb2f3e3f",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "3a18a41f-556c-41db-a089-838f8937ef8a",
            "actions": [
              {
                "uuid": "ac4e4d10-1903-493e-98c7-a47808522c6d",
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
                "uuid": "844d33a5-96a9-4c92-a592-ed443a1cae26",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4ae10e06-b671-4d97-8ba5-67814c26745c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "bb93dd90-08d1-424b-9435-d9fcaa3619aa",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8712c758-25ba-4548-a8f6-b51b9a084476"
              }
            ],
            "exits": [
              {
                "uuid": "fa47ee7d-d18b-4ba8-b8b1-88ffc1ec8456",
                "destination_uuid": "2da32b33-788e-4f8b-95d8-c0bf570d7b40"
              }
            ]
          },
          {
            "uuid": "2da32b33-788e-4f8b-95d8-c0bf570d7b40",
            "actions": [
              {
                "uuid": "b3caff02-8173-4dc9-bb03-82e6fa2dd082",
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
                "uuid": "4fddea4c-b301-45ea-a01b-21a63f1f80ff",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a9092d58-825d-4582-84f6-374c9a63c7e0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c9e5834f-75d8-4dd7-9c54-4f65851b5538",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "d6eeabeb-eede-4927-a3c6-be4dd77990d6"
                },
                "type": "enter_flow",
                "uuid": "1d18d6d7-8270-4594-9dda-422fa7ab19b2"
              }
            ],
            "exits": [
              {
                "uuid": "340116ad-65af-4596-b494-ace7683089b1",
                "destination_uuid": "78615b5e-0575-4c17-a93c-fb35399410a6"
              },
              {
                "uuid": "c28276cc-0d0b-4ee1-acac-76e98168a130",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "3a792016-34f0-44b7-939d-dea0d871d112",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "1d172ecb-6178-454e-90f5-b4e7b17bc27f"
                },
                {
                  "uuid": "e4aa45a6-c0d8-4dc9-8a82-7965237007ff",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "62a3869a-5053-4506-99f0-b7d8cbbcf24c"
                }
              ],
              "categories": [
                {
                  "uuid": "1d172ecb-6178-454e-90f5-b4e7b17bc27f",
                  "name": "Complete",
                  "exit_uuid": "340116ad-65af-4596-b494-ace7683089b1"
                },
                {
                  "uuid": "62a3869a-5053-4506-99f0-b7d8cbbcf24c",
                  "name": "Expired",
                  "exit_uuid": "c28276cc-0d0b-4ee1-acac-76e98168a130"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "1d172ecb-6178-454e-90f5-b4e7b17bc27f"
            }
          },
          {
            "uuid": "78615b5e-0575-4c17-a93c-fb35399410a6",
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
                "uuid": "ed865f75-613e-4455-bc66-0153bea33e35"
              }
            ],
            "exits": [
              {
                "uuid": "dae2153a-dcc1-45c5-81ce-131df03e186f",
                "destination_uuid": "70addce2-ae6f-4518-83b3-b04765931b38"
              }
            ]
          },
          {
            "uuid": "70addce2-ae6f-4518-83b3-b04765931b38",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "11341724-6eb0-4be4-b277-a3ed2e1706ea",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "f27c1031-2841-4f18-859f-781903bd47be",
                  "type": "has_only_phrase",
                  "uuid": "bca359fd-bb2a-456c-afd4-b00f88cb92a4"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "5b969153-13e9-4f6e-895c-6bf3637b9017",
                  "type": "has_only_phrase",
                  "uuid": "2f9f77c1-cb6c-48e8-bd6a-851e3330c32e"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "b53d358d-7a59-492d-9d6c-40b5089317e6",
                  "type": "has_only_phrase",
                  "uuid": "9a8733ab-92b3-4f75-ab69-050d0be14205"
                },
                {
                  "arguments": [
                    "first app opening"
                  ],
                  "category_uuid": "718d7611-59ed-43dc-8873-165c9227adeb",
                  "type": "has_only_phrase",
                  "uuid": "5cb42ee3-c181-48e6-9cad-a71073ea20ee"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "78888d93-9364-44e3-ba31-c6aa61692230",
                  "name": "All Responses",
                  "uuid": "11341724-6eb0-4be4-b277-a3ed2e1706ea"
                },
                {
                  "exit_uuid": "6617ab7b-0f89-4377-a857-eec7c2faa686",
                  "name": "welcome",
                  "uuid": "f27c1031-2841-4f18-859f-781903bd47be"
                },
                {
                  "exit_uuid": "9732c462-53d2-48e5-adbe-27b2dd91282b",
                  "name": "1on1",
                  "uuid": "5b969153-13e9-4f6e-895c-6bf3637b9017"
                },
                {
                  "exit_uuid": "66e1dff8-12d6-4c1b-a685-56d2dd1a1cc1",
                  "name": "praise",
                  "uuid": "b53d358d-7a59-492d-9d6c-40b5089317e6"
                },
                {
                  "exit_uuid": "9e6e7bfa-4105-45f8-8ae3-8cdee8f34d43",
                  "name": "first app opening",
                  "uuid": "718d7611-59ed-43dc-8873-165c9227adeb"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "78888d93-9364-44e3-ba31-c6aa61692230",
                "destination_uuid": null
              },
              {
                "uuid": "6617ab7b-0f89-4377-a857-eec7c2faa686",
                "destination_uuid": "d841161c-c38d-48f4-9e03-2381f0f203fd"
              },
              {
                "uuid": "9732c462-53d2-48e5-adbe-27b2dd91282b",
                "destination_uuid": "aca6ea1c-a9d8-4440-99b3-45342af8d511"
              },
              {
                "uuid": "66e1dff8-12d6-4c1b-a685-56d2dd1a1cc1",
                "destination_uuid": "b2f45ffe-3ec2-4178-bfd1-5529317f61b1"
              },
              {
                "uuid": "9e6e7bfa-4105-45f8-8ae3-8cdee8f34d43",
                "destination_uuid": "b1f88623-6934-4f00-9f99-c93a974818db"
              }
            ]
          },
          {
            "uuid": "d841161c-c38d-48f4-9e03-2381f0f203fd",
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
                "uuid": "2628035e-e40f-46cd-96b1-431e3a694e44"
              }
            ],
            "exits": [
              {
                "uuid": "5803fa3c-d88a-4b5d-b002-b975c58a80d2",
                "destination_uuid": "7c5cec78-809f-4869-8cf2-228e88f402df"
              }
            ]
          },
          {
            "uuid": "7c5cec78-809f-4869-8cf2-228e88f402df",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "efa324b8-03c9-483d-b3a9-dfe0324eb1c2",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "490a0fff-f934-4bc3-a306-374e829cd679",
                  "type": "has_only_phrase",
                  "uuid": "0e20884d-8caf-47ea-b74c-378997944f28"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "0aab701a-8047-4318-b2e3-156b8cb3bed6",
                  "type": "has_only_phrase",
                  "uuid": "198149cd-b431-4aef-9034-7f08136e27fb"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "4707360b-693c-4eb0-bf30-ce1777cc48b7",
                  "type": "has_only_phrase",
                  "uuid": "0223eb32-b7d0-4e9d-93fe-be378d3e9114"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "8f7de1c6-5d44-4058-8190-8597822a4071",
                  "type": "has_only_phrase",
                  "uuid": "ecbb5871-4111-4bf2-85c4-460dddb88ea8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8d06d7d3-e2af-4132-b22a-0f81b0331cf8",
                  "name": "All Responses",
                  "uuid": "efa324b8-03c9-483d-b3a9-dfe0324eb1c2"
                },
                {
                  "exit_uuid": "ff1c23d0-bbda-4d9c-91ab-da905efc4b62",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "490a0fff-f934-4bc3-a306-374e829cd679"
                },
                {
                  "exit_uuid": "fc4792bf-740d-435e-8c47-a7e74f57c5d1",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "0aab701a-8047-4318-b2e3-156b8cb3bed6"
                },
                {
                  "exit_uuid": "3f762db8-983c-4d4e-a2cd-a976dd5f51a4",
                  "name": "mod_welcome_survey",
                  "uuid": "4707360b-693c-4eb0-bf30-ce1777cc48b7"
                },
                {
                  "exit_uuid": "eb13a1d7-a184-444a-9ca9-d3702dca2248",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "8f7de1c6-5d44-4058-8190-8597822a4071"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8d06d7d3-e2af-4132-b22a-0f81b0331cf8",
                "destination_uuid": null
              },
              {
                "uuid": "ff1c23d0-bbda-4d9c-91ab-da905efc4b62",
                "destination_uuid": "4305d4e9-b348-4302-bc6b-7a6200c95dcd"
              },
              {
                "uuid": "fc4792bf-740d-435e-8c47-a7e74f57c5d1",
                "destination_uuid": "9bb5f8e5-fdc6-4a8b-8f2d-09d7569ab8a1"
              },
              {
                "uuid": "3f762db8-983c-4d4e-a2cd-a976dd5f51a4",
                "destination_uuid": "784a4975-720f-4481-83eb-7a3546b223ba"
              },
              {
                "uuid": "eb13a1d7-a184-444a-9ca9-d3702dca2248",
                "destination_uuid": "f07d3f13-d9b1-4c79-b678-bcc0aa44812e"
              }
            ]
          },
          {
            "uuid": "4305d4e9-b348-4302-bc6b-7a6200c95dcd",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "afab17d5-5e34-4f72-85ca-c2493db4b93a"
                },
                "type": "enter_flow",
                "uuid": "5d816b33-aab2-4941-a187-11b75d7f167a"
              }
            ],
            "exits": [
              {
                "uuid": "a2f6e951-f200-483f-b18a-29c20c3ee872",
                "destination_uuid": null
              },
              {
                "uuid": "9bfe3f3c-be36-4ffc-955f-2f469e4199ba",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "21f6642e-39b1-4a2b-87f6-7f763d57594c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "566efc88-cfde-4fa9-a224-e7202c2aa77d"
                },
                {
                  "uuid": "fc9caf78-779e-4935-942e-5bab05049fb5",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "9bbc7192-2780-4ae2-be33-ab4f2150e318"
                }
              ],
              "categories": [
                {
                  "uuid": "566efc88-cfde-4fa9-a224-e7202c2aa77d",
                  "name": "Complete",
                  "exit_uuid": "a2f6e951-f200-483f-b18a-29c20c3ee872"
                },
                {
                  "uuid": "9bbc7192-2780-4ae2-be33-ab4f2150e318",
                  "name": "Expired",
                  "exit_uuid": "9bfe3f3c-be36-4ffc-955f-2f469e4199ba"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "566efc88-cfde-4fa9-a224-e7202c2aa77d"
            }
          },
          {
            "uuid": "9bb5f8e5-fdc6-4a8b-8f2d-09d7569ab8a1",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "a965e1f8-9c50-491a-8667-824e9002187d"
                },
                "type": "enter_flow",
                "uuid": "2d31b989-518a-434d-b5b2-f8823f7f5117"
              }
            ],
            "exits": [
              {
                "uuid": "563fe2a6-2866-4333-a99d-dbff62818408",
                "destination_uuid": null
              },
              {
                "uuid": "8204257c-61b6-4337-b051-71140dbb9003",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ada08b3f-67e9-436f-b7a3-c71c96934e45",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "cd34e9e3-1881-4a92-9124-c04f9a9c4f50"
                },
                {
                  "uuid": "9706b90f-026b-4e8b-a130-1c3635afb21f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "19afc7b1-f03a-4c4f-b147-54d40fa17f31"
                }
              ],
              "categories": [
                {
                  "uuid": "cd34e9e3-1881-4a92-9124-c04f9a9c4f50",
                  "name": "Complete",
                  "exit_uuid": "563fe2a6-2866-4333-a99d-dbff62818408"
                },
                {
                  "uuid": "19afc7b1-f03a-4c4f-b147-54d40fa17f31",
                  "name": "Expired",
                  "exit_uuid": "8204257c-61b6-4337-b051-71140dbb9003"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "cd34e9e3-1881-4a92-9124-c04f9a9c4f50"
            }
          },
          {
            "uuid": "784a4975-720f-4481-83eb-7a3546b223ba",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "196c1b3e-8fdd-4145-b563-c9687d7feef5"
                },
                "type": "enter_flow",
                "uuid": "2838f654-6752-43b8-993f-9db37ef43647"
              }
            ],
            "exits": [
              {
                "uuid": "77a8f314-efd5-4993-99c3-84f00cf0914a",
                "destination_uuid": null
              },
              {
                "uuid": "b428db50-9603-4383-ad56-cfd5821db904",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "dd0fe2ed-81cf-46e8-859a-d7bb6f4cb15a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c5a65f3b-7d86-4726-9f26-91951dc1f0eb"
                },
                {
                  "uuid": "11e5164c-0ecd-487c-830d-9af7a1e31e86",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "07cd3b2d-c535-4a56-b384-19c3af98faef"
                }
              ],
              "categories": [
                {
                  "uuid": "c5a65f3b-7d86-4726-9f26-91951dc1f0eb",
                  "name": "Complete",
                  "exit_uuid": "77a8f314-efd5-4993-99c3-84f00cf0914a"
                },
                {
                  "uuid": "07cd3b2d-c535-4a56-b384-19c3af98faef",
                  "name": "Expired",
                  "exit_uuid": "b428db50-9603-4383-ad56-cfd5821db904"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c5a65f3b-7d86-4726-9f26-91951dc1f0eb"
            }
          },
          {
            "uuid": "f07d3f13-d9b1-4c79-b678-bcc0aa44812e",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "5a275293-44fd-4252-8247-5cc6084441b6"
                },
                "type": "enter_flow",
                "uuid": "11c490e8-931c-4333-8a0c-d652224c990d"
              }
            ],
            "exits": [
              {
                "uuid": "808134eb-7f45-4ac2-ad4e-4d953809cf75",
                "destination_uuid": null
              },
              {
                "uuid": "ff31ddd1-2bc9-4e70-bf7c-54e9fb2bacc4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "89b1c09f-0bf0-45d1-8be3-35414be26351",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4cba7614-d37f-432e-b095-2b416c980d56"
                },
                {
                  "uuid": "4a183731-70aa-4cf5-bfec-358bf28f6c3f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "aef7a46a-9ced-409b-937b-a45b6206f342"
                }
              ],
              "categories": [
                {
                  "uuid": "4cba7614-d37f-432e-b095-2b416c980d56",
                  "name": "Complete",
                  "exit_uuid": "808134eb-7f45-4ac2-ad4e-4d953809cf75"
                },
                {
                  "uuid": "aef7a46a-9ced-409b-937b-a45b6206f342",
                  "name": "Expired",
                  "exit_uuid": "ff31ddd1-2bc9-4e70-bf7c-54e9fb2bacc4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4cba7614-d37f-432e-b095-2b416c980d56"
            }
          },
          {
            "uuid": "aca6ea1c-a9d8-4440-99b3-45342af8d511",
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
                "uuid": "e383499e-29ba-472d-9369-66596a8707f5"
              }
            ],
            "exits": [
              {
                "uuid": "587bc0f7-dadf-4e3e-b7e4-329f3aa5adf0",
                "destination_uuid": "112285d2-c8f7-474a-a128-e941519a9643"
              }
            ]
          },
          {
            "uuid": "112285d2-c8f7-474a-a128-e941519a9643",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "753c9845-1477-4348-bb91-25650694d81e",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "c09e0b2c-6af1-4115-afc9-fe7efeae5c4e",
                  "type": "has_only_phrase",
                  "uuid": "21ae20af-63c2-4079-80b9-e4ef92a8eae9"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "6e6d2744-1bad-47fd-a403-92a0eea4a141",
                  "type": "has_only_phrase",
                  "uuid": "efdc9970-4f3d-451f-8cf6-cd65512fb2e9"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "d9ae4683-afad-4230-b74f-00ce28d846c2",
                  "type": "has_only_phrase",
                  "uuid": "8dfc351b-7b07-4e81-88b2-b421a117ae3f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a6aea3dd-79fa-40c0-a11d-a2905d6843c5",
                  "name": "All Responses",
                  "uuid": "753c9845-1477-4348-bb91-25650694d81e"
                },
                {
                  "exit_uuid": "942c9b90-466c-4d58-a9bd-d11bb902a5f2",
                  "name": "mod_1on1_emo",
                  "uuid": "c09e0b2c-6af1-4115-afc9-fe7efeae5c4e"
                },
                {
                  "exit_uuid": "dfdc529a-8fe5-4f91-b9cc-67b729ca2238",
                  "name": "mod_1on1_activity",
                  "uuid": "6e6d2744-1bad-47fd-a403-92a0eea4a141"
                },
                {
                  "exit_uuid": "cf1095bb-3d9a-4441-b689-d0aa7ee67d03",
                  "name": "mod_1on1_activity_review",
                  "uuid": "d9ae4683-afad-4230-b74f-00ce28d846c2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a6aea3dd-79fa-40c0-a11d-a2905d6843c5",
                "destination_uuid": null
              },
              {
                "uuid": "942c9b90-466c-4d58-a9bd-d11bb902a5f2",
                "destination_uuid": "869125d1-17d7-470b-b0ca-599b4e2eabac"
              },
              {
                "uuid": "dfdc529a-8fe5-4f91-b9cc-67b729ca2238",
                "destination_uuid": "16990862-bab9-4890-a18b-a1963201efb8"
              },
              {
                "uuid": "cf1095bb-3d9a-4441-b689-d0aa7ee67d03",
                "destination_uuid": "cd02e4bd-da16-4ca8-b009-518b3b164145"
              }
            ]
          },
          {
            "uuid": "869125d1-17d7-470b-b0ca-599b4e2eabac",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "172830ea-bbef-4d68-93a8-bfadc5a8f1bd"
                },
                "type": "enter_flow",
                "uuid": "f0cb24ff-6f64-49f9-b46b-e8ee9b8c6e2c"
              }
            ],
            "exits": [
              {
                "uuid": "c50b4cd9-b799-4244-990c-5f67eb52e25f",
                "destination_uuid": null
              },
              {
                "uuid": "6e1fdb4a-d7a1-4e0c-b316-d41b2cb56123",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "3e21dc52-c3ea-43ec-a15c-dd285eae9e82",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "9d1b0565-8557-4fcb-9eb3-f9d929b7c566"
                },
                {
                  "uuid": "ccb5283a-58ac-42e7-bae5-807456f50e24",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2945b7de-9204-46eb-8096-6d4e76d4c2f7"
                }
              ],
              "categories": [
                {
                  "uuid": "9d1b0565-8557-4fcb-9eb3-f9d929b7c566",
                  "name": "Complete",
                  "exit_uuid": "c50b4cd9-b799-4244-990c-5f67eb52e25f"
                },
                {
                  "uuid": "2945b7de-9204-46eb-8096-6d4e76d4c2f7",
                  "name": "Expired",
                  "exit_uuid": "6e1fdb4a-d7a1-4e0c-b316-d41b2cb56123"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "9d1b0565-8557-4fcb-9eb3-f9d929b7c566"
            }
          },
          {
            "uuid": "16990862-bab9-4890-a18b-a1963201efb8",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "87cfc4b8-7fb7-4f54-8c23-b4ebf44087b2"
                },
                "type": "enter_flow",
                "uuid": "8a9556ff-bfc8-4289-b8dc-5170a5f864ce"
              }
            ],
            "exits": [
              {
                "uuid": "c8bd4213-04ba-4a74-90be-5e99afc1ce2d",
                "destination_uuid": null
              },
              {
                "uuid": "43d2141f-256c-4d23-855f-5248554cd425",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "4ac2c84d-cfee-461c-8472-c6eac91382a3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8b2257cb-5512-4ce7-90ab-f3ec1b9d46a9"
                },
                {
                  "uuid": "ff306ed1-b9ed-486a-9930-7e0ed5ec2f19",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "30def12b-9a5d-4948-96c5-7639d01deaae"
                }
              ],
              "categories": [
                {
                  "uuid": "8b2257cb-5512-4ce7-90ab-f3ec1b9d46a9",
                  "name": "Complete",
                  "exit_uuid": "c8bd4213-04ba-4a74-90be-5e99afc1ce2d"
                },
                {
                  "uuid": "30def12b-9a5d-4948-96c5-7639d01deaae",
                  "name": "Expired",
                  "exit_uuid": "43d2141f-256c-4d23-855f-5248554cd425"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8b2257cb-5512-4ce7-90ab-f3ec1b9d46a9"
            }
          },
          {
            "uuid": "cd02e4bd-da16-4ca8-b009-518b3b164145",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "79ac5f32-882d-4f33-934f-3ddbda00e9df"
                },
                "type": "enter_flow",
                "uuid": "16a5999c-f930-4283-84cb-db48dba5e763"
              }
            ],
            "exits": [
              {
                "uuid": "be285f7b-7a27-4a40-b117-b59592e48bdd",
                "destination_uuid": null
              },
              {
                "uuid": "80813ebd-8705-4e90-8fb8-fedf6c9fc6c3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "81020c6c-c6ab-4b52-b93e-d5a2a0e0829f",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "cd353559-3bc1-4df6-bcce-0fe31fe7b826"
                },
                {
                  "uuid": "ab1baa71-3fdd-46e9-9709-b133ba6769ef",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a36b5533-bacd-4442-8a64-a5c1c5d7487f"
                }
              ],
              "categories": [
                {
                  "uuid": "cd353559-3bc1-4df6-bcce-0fe31fe7b826",
                  "name": "Complete",
                  "exit_uuid": "be285f7b-7a27-4a40-b117-b59592e48bdd"
                },
                {
                  "uuid": "a36b5533-bacd-4442-8a64-a5c1c5d7487f",
                  "name": "Expired",
                  "exit_uuid": "80813ebd-8705-4e90-8fb8-fedf6c9fc6c3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "cd353559-3bc1-4df6-bcce-0fe31fe7b826"
            }
          },
          {
            "uuid": "b2f45ffe-3ec2-4178-bfd1-5529317f61b1",
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
                "uuid": "771af46b-3901-4004-a989-05c6191f34dc"
              }
            ],
            "exits": [
              {
                "uuid": "4b767357-e8d8-427f-9dbd-0fe029aad4bf",
                "destination_uuid": "0696dc55-c020-4e9e-8f1e-95aaea736988"
              }
            ]
          },
          {
            "uuid": "0696dc55-c020-4e9e-8f1e-95aaea736988",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6b7d59c1-efe9-4ae2-b2c1-b73c8644b6ca",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "4ef75076-4715-42ff-9504-9f4ead1f08a7",
                  "type": "has_only_phrase",
                  "uuid": "3f2bd509-77df-4a7d-9964-e548d513d03f"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "de98bd3c-53b3-4041-b53b-b3c3b9cc0449",
                  "type": "has_only_phrase",
                  "uuid": "fc08df8b-2047-4a7b-a933-389043f37b9a"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "c2939300-61b3-4f0b-bcfc-608ed6e1199a",
                  "type": "has_only_phrase",
                  "uuid": "f4ec2a1e-b5f8-4c59-8b41-f5890809384e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "130c5927-0632-4e12-b4c4-a25e812af300",
                  "name": "All Responses",
                  "uuid": "6b7d59c1-efe9-4ae2-b2c1-b73c8644b6ca"
                },
                {
                  "exit_uuid": "4786f256-9e85-4165-941c-3ae3c27a6536",
                  "name": "mod_praise_intro",
                  "uuid": "4ef75076-4715-42ff-9504-9f4ead1f08a7"
                },
                {
                  "exit_uuid": "0e45eec4-5464-49db-9082-c2f62878327f",
                  "name": "mod_praise_activity",
                  "uuid": "de98bd3c-53b3-4041-b53b-b3c3b9cc0449"
                },
                {
                  "exit_uuid": "3e41f1aa-a224-44ed-b038-a86dc3944061",
                  "name": "mod_praise_activity_review",
                  "uuid": "c2939300-61b3-4f0b-bcfc-608ed6e1199a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "130c5927-0632-4e12-b4c4-a25e812af300",
                "destination_uuid": null
              },
              {
                "uuid": "4786f256-9e85-4165-941c-3ae3c27a6536",
                "destination_uuid": "5cf27016-bf97-437c-8c0a-4aa26c4ab75c"
              },
              {
                "uuid": "0e45eec4-5464-49db-9082-c2f62878327f",
                "destination_uuid": "86b51fae-c64b-449f-add9-3da0a40f00f3"
              },
              {
                "uuid": "3e41f1aa-a224-44ed-b038-a86dc3944061",
                "destination_uuid": "0c928ce6-d759-44e2-9854-6e8cf48e7351"
              }
            ]
          },
          {
            "uuid": "5cf27016-bf97-437c-8c0a-4aa26c4ab75c",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "60ef3b6c-f62e-4819-a813-77b5356d3eb2"
                },
                "type": "enter_flow",
                "uuid": "2fd984a8-1d77-4e03-9b0e-51ec5634076a"
              }
            ],
            "exits": [
              {
                "uuid": "324f51e0-dedb-4e19-91b4-6c17929819b4",
                "destination_uuid": null
              },
              {
                "uuid": "1a81d42c-8ffe-40ba-bffd-376d4e3b4048",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2df47f62-572c-4bdd-b889-4ea207c7b523",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ccc63921-7079-45fb-85b1-1018ae2d0603"
                },
                {
                  "uuid": "a086b6fb-d9d8-47dc-b8cf-7945e94043ea",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "820f87f4-7bdd-4d9d-bbe7-8d76dfcfb9a2"
                }
              ],
              "categories": [
                {
                  "uuid": "ccc63921-7079-45fb-85b1-1018ae2d0603",
                  "name": "Complete",
                  "exit_uuid": "324f51e0-dedb-4e19-91b4-6c17929819b4"
                },
                {
                  "uuid": "820f87f4-7bdd-4d9d-bbe7-8d76dfcfb9a2",
                  "name": "Expired",
                  "exit_uuid": "1a81d42c-8ffe-40ba-bffd-376d4e3b4048"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ccc63921-7079-45fb-85b1-1018ae2d0603"
            }
          },
          {
            "uuid": "86b51fae-c64b-449f-add9-3da0a40f00f3",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "8570fb24-b563-43e8-89a3-f48ffcb564d0"
                },
                "type": "enter_flow",
                "uuid": "b6e41a4d-34ca-4a8e-a1d8-6402163d10f0"
              }
            ],
            "exits": [
              {
                "uuid": "b4502993-0d08-4ee8-ac6a-d4fc77cd8831",
                "destination_uuid": null
              },
              {
                "uuid": "d31bc150-a5fd-4b40-bed9-3ecd7bf080e0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1b0e763d-a51a-4ca4-9377-f88fbb65d6f8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b977becc-ca49-4007-a5c5-02216be3290d"
                },
                {
                  "uuid": "06f1982b-9521-42d9-8973-cae6216697a3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b0acd469-3302-4506-89f1-02185e7309f2"
                }
              ],
              "categories": [
                {
                  "uuid": "b977becc-ca49-4007-a5c5-02216be3290d",
                  "name": "Complete",
                  "exit_uuid": "b4502993-0d08-4ee8-ac6a-d4fc77cd8831"
                },
                {
                  "uuid": "b0acd469-3302-4506-89f1-02185e7309f2",
                  "name": "Expired",
                  "exit_uuid": "d31bc150-a5fd-4b40-bed9-3ecd7bf080e0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b977becc-ca49-4007-a5c5-02216be3290d"
            }
          },
          {
            "uuid": "0c928ce6-d759-44e2-9854-6e8cf48e7351",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "1762b6a3-e7ff-42b4-840e-45e444564cff"
                },
                "type": "enter_flow",
                "uuid": "e5147193-ca37-443d-a1ec-9f0913cdfcdd"
              }
            ],
            "exits": [
              {
                "uuid": "43be597a-d85a-4409-bbee-d3bfeee6d93c",
                "destination_uuid": null
              },
              {
                "uuid": "86f027ca-dc74-41d5-a007-f8101997216d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "a5c42114-b329-42c5-818b-ab6c9cb17f07",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ed70566c-ddbd-4cb2-a9b6-2d3772aa2ac8"
                },
                {
                  "uuid": "7b2b0363-f39e-4107-8d8f-7ee41450d10c",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "879c1a9b-cbae-46d0-9d26-e876d0578ab2"
                }
              ],
              "categories": [
                {
                  "uuid": "ed70566c-ddbd-4cb2-a9b6-2d3772aa2ac8",
                  "name": "Complete",
                  "exit_uuid": "43be597a-d85a-4409-bbee-d3bfeee6d93c"
                },
                {
                  "uuid": "879c1a9b-cbae-46d0-9d26-e876d0578ab2",
                  "name": "Expired",
                  "exit_uuid": "86f027ca-dc74-41d5-a007-f8101997216d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ed70566c-ddbd-4cb2-a9b6-2d3772aa2ac8"
            }
          },
          {
            "uuid": "b1f88623-6934-4f00-9f99-c93a974818db",
            "actions": [
              {
                "flow": {
                  "name": "first_app_opening",
                  "uuid": "0c2d3a1c-f999-4574-9ebd-83df26707979"
                },
                "type": "enter_flow",
                "uuid": "870c339f-7764-41b4-8788-531cf3875e51"
              }
            ],
            "exits": [
              {
                "uuid": "5e482d46-1812-43c5-a471-130f6a8a2d6a",
                "destination_uuid": null
              },
              {
                "uuid": "67ef75e8-7e03-4e5c-b012-1c03414b0d23",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2f1b7e5a-7d06-4110-bf79-0a39b11dbc10",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c61ea609-9345-480b-9312-25e04d9ef073"
                },
                {
                  "uuid": "b80fcd14-f94c-43d7-b10f-e3f37c162de0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d64ae86d-b96a-4db6-9f05-fc2e1c82ab05"
                }
              ],
              "categories": [
                {
                  "uuid": "c61ea609-9345-480b-9312-25e04d9ef073",
                  "name": "Complete",
                  "exit_uuid": "5e482d46-1812-43c5-a471-130f6a8a2d6a"
                },
                {
                  "uuid": "d64ae86d-b96a-4db6-9f05-fc2e1c82ab05",
                  "name": "Expired",
                  "exit_uuid": "67ef75e8-7e03-4e5c-b012-1c03414b0d23"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c61ea609-9345-480b-9312-25e04d9ef073"
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
        "uuid": "a1ec68a0-a88e-4dd4-96e3-5759a4e0ce19",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "08900f93-2227-46b4-923f-a5c4e381fc0f",
            "actions": [
              {
                "uuid": "9f7c91d3-49f3-4feb-aeff-67ab4be0faaf",
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
                "uuid": "dc889e04-3222-43ff-94db-1885413275e7",
                "destination_uuid": "13a7ac14-de5c-41cb-b880-2d4ef04c058b"
              }
            ]
          },
          {
            "uuid": "13a7ac14-de5c-41cb-b880-2d4ef04c058b",
            "actions": [
              {
                "uuid": "d6f1e0b8-da79-43ff-be3f-ac98022936e1",
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
                "uuid": "9a7deb4e-d21f-4a36-b1f9-58c345ddf2bd",
                "destination_uuid": "28b43a4f-8547-46ac-b294-122e381d0af5"
              }
            ]
          },
          {
            "uuid": "28b43a4f-8547-46ac-b294-122e381d0af5",
            "actions": [
              {
                "uuid": "683b187f-72b7-450c-9f2f-f375789a5edf",
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
                "uuid": "1d74b30d-4051-41bb-8090-b1e59657e7e0",
                "destination_uuid": "f8c879eb-f4b0-42d8-bdf7-73e26019f694"
              }
            ]
          },
          {
            "uuid": "f8c879eb-f4b0-42d8-bdf7-73e26019f694",
            "actions": [
              {
                "uuid": "ea25af00-a97e-4991-ad87-4a606fea5522",
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
                "uuid": "a5c40052-9191-4ac9-a539-41d290e9d37b",
                "destination_uuid": "88f3c0ab-3bb9-448e-b3f8-03b020368029"
              }
            ]
          },
          {
            "uuid": "88f3c0ab-3bb9-448e-b3f8-03b020368029",
            "actions": [
              {
                "uuid": "833c7e3c-c1af-497f-bfaf-9ac0f93278b6",
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
                "uuid": "e1969fa6-e51f-44fd-adb4-06d76085feb6",
                "destination_uuid": "988b68bf-8307-417a-b297-0b0dc6284d5a"
              }
            ]
          },
          {
            "uuid": "988b68bf-8307-417a-b297-0b0dc6284d5a",
            "actions": [
              {
                "uuid": "3143729d-42dc-4e21-abad-a34b574b0db9",
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
                "uuid": "aea5894c-6114-4813-a4bc-fd54b5550dff",
                "destination_uuid": "7a326b06-b6f4-4602-9680-7de35e6c9669"
              }
            ]
          },
          {
            "uuid": "7a326b06-b6f4-4602-9680-7de35e6c9669",
            "actions": [
              {
                "uuid": "83af62e7-3f99-4484-a454-5ebaad3446c8",
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
                "uuid": "5b529360-db7b-45d2-bcc2-039b84d0a577",
                "destination_uuid": "18f1c946-c024-4148-89a7-c92d55a314af"
              }
            ]
          },
          {
            "uuid": "18f1c946-c024-4148-89a7-c92d55a314af",
            "actions": [
              {
                "uuid": "058c8a71-e369-4241-a204-a57cdb3c6171",
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
                "uuid": "29ad7ab9-43b0-459f-bc1b-29f72f83ad24",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a4984c3c-2c80-410d-9214-b198306faa96",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "bdbad425-210d-43a2-a303-7a8ef13a9aac",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6ae8b4f6-50e1-4741-935b-3e1319568769"
              }
            ],
            "exits": [
              {
                "uuid": "162b5e1e-6f8b-4d2a-b298-3c4f28f090e9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "cd457b63-744c-4a07-9fb8-ea87d8112a3b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b5ec3be8-5653-46c3-8427-3155a2ef4c15",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f942af2f-dc8a-4b14-8b48-385e6721423b"
              }
            ],
            "exits": [
              {
                "uuid": "ec124b39-100e-4462-8689-c350f506fe23",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f7205a55-b6cd-45d3-90b5-06c08d5c51d2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e6d190d0-b9ce-4489-ba79-8df1256c0fa7",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8f329b72-ebd6-4cbd-a6ec-cd1ac8408b6a"
              }
            ],
            "exits": [
              {
                "uuid": "4acec890-3ec8-4ce2-afbd-efa8b2c40040",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "fe9e920c-0ad8-40a7-a722-2c5f6b74e5a7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a710f7a5-6e35-4646-8123-3ca42dff8274",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "09d1b2bb-0369-4d42-9af6-be7351a064ed"
              }
            ],
            "exits": [
              {
                "uuid": "33e41e66-1aa3-4c9d-a34b-4917e9174a80",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ccc07318-ef87-412c-a061-488fde26eff9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "033e27b0-f198-4b2c-90c5-9b186e056a0f",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2d0986fc-48d6-485e-a5ee-ce9009d4457f"
              }
            ],
            "exits": [
              {
                "uuid": "67965ad7-995c-47bd-91df-98227d508b7f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3425c446-44e2-4de2-847b-4f0a540786ef",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "86221b87-847a-4a96-8339-a3409949d48b",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f2a10f6e-9f6b-47eb-9fda-ac6ce89eea9c"
              }
            ],
            "exits": [
              {
                "uuid": "c8965101-b9c6-4df4-a45f-75adccc4bc3f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "193b56b0-6579-4a4e-a322-4ddf7b902578",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "05de8f0a-4f40-42ac-b200-204e423960e5",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bc3217dd-f10c-4080-afdd-ff0ab2e11aeb"
              }
            ],
            "exits": [
              {
                "uuid": "d9926b88-67ff-45f4-86af-6162e06e977d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "0c5ed2fd-b696-4f78-943a-7ad2ef545353",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "320282ed-3003-41ca-977e-b905b9fcb111",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c15b783a-33ae-41bd-8cb4-b02af4b0c679"
              }
            ],
            "exits": [
              {
                "uuid": "31e1c85e-2ffe-40f6-9523-5b8c69fcf666",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "602cacd0-8c3b-4c98-b2fd-fad5f3264a16",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9f8a79d7-b4f4-4c1e-99ee-33ceba6af1ed",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7be99296-284b-490d-9bcb-a3bbc2dd1253"
              }
            ],
            "exits": [
              {
                "uuid": "adcdde77-761f-4621-bdfa-2a6faa68314f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f025a2a3-a6fc-4928-8e47-cb2416a1f5b9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ec76f14a-80a3-43b8-8e0c-bfcb20bbd5e2",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "632c5618-038f-4f52-90e4-5ce93f836239"
              }
            ],
            "exits": [
              {
                "uuid": "766ff41c-59e5-456f-9469-b3b577ff99c6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "37c75ad8-8b9b-4f6f-9865-082a787e156c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "de69ec3f-4b7e-441e-b590-2bacee9013ab",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d260d101-e7e5-4b34-b2a7-40882714c946"
              }
            ],
            "exits": [
              {
                "uuid": "6cf59d0f-9bee-42c7-bc55-ab2c7a4b2aa7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e450dbc5-a391-4a14-a4f8-a413ad2cae59",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "150abfb6-4319-496e-96fb-6899557b7938",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "723f35a2-9832-4092-a19e-707b4cb36b03"
              }
            ],
            "exits": [
              {
                "uuid": "f23cf1bb-e3c0-4f08-a520-5bd712f199e6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "cdc7c5d0-11e4-4991-96cb-1fc0c840e8bf",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "36ce3371-a85a-4327-91fe-44fa70b86e20",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f06decd9-b004-44a2-a7a9-cb5fab102a2a"
              }
            ],
            "exits": [
              {
                "uuid": "70c71dc3-9710-48cc-91ab-8c98c502ef43",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8ff330df-3976-42f4-a032-b5f62d9a21a7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4c66fb62-6f02-4518-933c-ea1f8b2eadcf",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2154e0d4-30b7-415a-a90e-9977a88baa20"
              }
            ],
            "exits": [
              {
                "uuid": "39e14fd9-4e74-4fc0-a1f6-16e4f381b494",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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