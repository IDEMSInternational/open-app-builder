export default [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "fec04b67-49f3-4d2e-a71b-c4b905d32761",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a1c61336-6959-4b40-b5da-de0657a1b271",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "da6eba25-07ac-4705-b3e5-bea6f634b816"
              }
            ],
            "exits": [
              {
                "uuid": "b23dc13d-32ae-4374-ac5f-33462b8f1910",
                "destination_uuid": "f0d78336-6845-4461-b6c6-c97c530ba1bf"
              }
            ]
          },
          {
            "uuid": "f0d78336-6845-4461-b6c6-c97c530ba1bf",
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
                "uuid": "c0847a21-485c-44c5-8fda-6573ba6f19c9"
              }
            ],
            "exits": [
              {
                "uuid": "81e8dd09-d149-4fb2-b247-0acc2dd6d5d3",
                "destination_uuid": "4cc3e320-ade6-4f06-ae45-c373bd774ac2"
              }
            ]
          },
          {
            "uuid": "4cc3e320-ade6-4f06-ae45-c373bd774ac2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e7ad31f4-3c56-4f49-b3bd-92d7c79ceb8c",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "4f76451c-eeff-44df-a957-d1ab3e0fe13f",
                  "type": "has_only_phrase",
                  "uuid": "84b10008-2399-4489-9234-116fa04a2a54"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "5f729e29-d54b-48f6-8603-a924a26cc3c1",
                  "type": "has_only_phrase",
                  "uuid": "cea26e15-dbd8-4df7-b64d-b19d02df961e"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "b05b1a62-d7c7-46f6-90e1-0ccdfb400ac4",
                  "type": "has_only_phrase",
                  "uuid": "5eccbb6f-dc54-46a3-bbe1-b43eacc8f270"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "23bec68c-a802-41e3-b8f1-65cc0bdde6d6",
                  "type": "has_only_phrase",
                  "uuid": "05509fbf-c29a-4d84-abbe-e2eea107a980"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "f11a760e-c982-4d89-807d-1c76f28cc758",
                  "type": "has_only_phrase",
                  "uuid": "9bac7080-efb8-42b6-8019-32ce91cfd7a1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4e7b59d9-5b83-451a-8c29-c1fd952ad941",
                  "name": "All Responses",
                  "uuid": "e7ad31f4-3c56-4f49-b3bd-92d7c79ceb8c"
                },
                {
                  "exit_uuid": "5bcdb93c-50f5-4535-892d-efbedd8491e8",
                  "name": "First option: launch example_media flow",
                  "uuid": "4f76451c-eeff-44df-a957-d1ab3e0fe13f"
                },
                {
                  "exit_uuid": "faa9deb6-b3bc-42b1-9a92-20ec0a6ef59f",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "5f729e29-d54b-48f6-8603-a924a26cc3c1"
                },
                {
                  "exit_uuid": "78ecef1d-d10a-495a-8984-a448a794de67",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "b05b1a62-d7c7-46f6-90e1-0ccdfb400ac4"
                },
                {
                  "exit_uuid": "ffe3eedf-36c2-4804-b265-88dee6fe189c",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "23bec68c-a802-41e3-b8f1-65cc0bdde6d6"
                },
                {
                  "exit_uuid": "6261c15c-cd0d-40c0-a7be-16a6f50119b2",
                  "name": "Stay in this flow.",
                  "uuid": "f11a760e-c982-4d89-807d-1c76f28cc758"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4e7b59d9-5b83-451a-8c29-c1fd952ad941",
                "destination_uuid": null
              },
              {
                "uuid": "5bcdb93c-50f5-4535-892d-efbedd8491e8",
                "destination_uuid": "1606e895-a2a0-4b45-b806-c98b01103813"
              },
              {
                "uuid": "faa9deb6-b3bc-42b1-9a92-20ec0a6ef59f",
                "destination_uuid": "4db2ea2c-9bb9-4a97-b5df-85a73eb83bd9"
              },
              {
                "uuid": "78ecef1d-d10a-495a-8984-a448a794de67",
                "destination_uuid": "67a56edb-a3f3-4345-91c1-ea15c5aa013b"
              },
              {
                "uuid": "ffe3eedf-36c2-4804-b265-88dee6fe189c",
                "destination_uuid": "1d390f02-b002-4452-ba18-22c4e91ed4f3"
              },
              {
                "uuid": "6261c15c-cd0d-40c0-a7be-16a6f50119b2",
                "destination_uuid": "830a1d53-d2a6-457d-b87d-28f7be34bfd6"
              }
            ]
          },
          {
            "uuid": "1606e895-a2a0-4b45-b806-c98b01103813",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "603aafcc-5119-448e-8e91-f67504eaa4c2"
                },
                "type": "enter_flow",
                "uuid": "a9096a36-a15d-434f-b424-9fd21a38d731"
              }
            ],
            "exits": [
              {
                "uuid": "755125a8-abf4-48a5-b7da-ed1aa6a897f2",
                "destination_uuid": "ef03c17d-e18d-4afe-888e-0c1da21c63b7"
              },
              {
                "uuid": "90b37e30-873a-4f88-bac6-7dd746bf2919",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2456d45f-ae2c-477c-a456-66b8b7df84a2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "144bb547-4aed-4c8a-8786-0b825d956932"
                },
                {
                  "uuid": "e189247f-ee51-469d-b378-98947578df6f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "87c2e393-49ad-4099-ae2f-23d5f12a131d"
                }
              ],
              "categories": [
                {
                  "uuid": "144bb547-4aed-4c8a-8786-0b825d956932",
                  "name": "Complete",
                  "exit_uuid": "755125a8-abf4-48a5-b7da-ed1aa6a897f2"
                },
                {
                  "uuid": "87c2e393-49ad-4099-ae2f-23d5f12a131d",
                  "name": "Expired",
                  "exit_uuid": "90b37e30-873a-4f88-bac6-7dd746bf2919"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "144bb547-4aed-4c8a-8786-0b825d956932"
            }
          },
          {
            "uuid": "4db2ea2c-9bb9-4a97-b5df-85a73eb83bd9",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "c0edc70d-79b3-42f7-ad02-8be8f0ef9db6"
                },
                "type": "enter_flow",
                "uuid": "2a1cea23-1bb7-4593-b57f-98d8111a4e31"
              }
            ],
            "exits": [
              {
                "uuid": "41ad5fd4-5ee6-49a3-ba2a-822fea1b4362",
                "destination_uuid": "ef03c17d-e18d-4afe-888e-0c1da21c63b7"
              },
              {
                "uuid": "91146dc9-4838-47c0-9516-da1fe7762cf4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "587cc2ea-94e6-465f-b92f-be6540d9198e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8a25a097-fbab-4974-8f79-729d218fc701"
                },
                {
                  "uuid": "04edd682-caec-4baf-b294-50b97812b23e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "11ca58a9-cf38-49cf-a1ac-457e3d6f4ff0"
                }
              ],
              "categories": [
                {
                  "uuid": "8a25a097-fbab-4974-8f79-729d218fc701",
                  "name": "Complete",
                  "exit_uuid": "41ad5fd4-5ee6-49a3-ba2a-822fea1b4362"
                },
                {
                  "uuid": "11ca58a9-cf38-49cf-a1ac-457e3d6f4ff0",
                  "name": "Expired",
                  "exit_uuid": "91146dc9-4838-47c0-9516-da1fe7762cf4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8a25a097-fbab-4974-8f79-729d218fc701"
            }
          },
          {
            "uuid": "67a56edb-a3f3-4345-91c1-ea15c5aa013b",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "35f7d4f7-999f-4908-b859-c80a89707bc8"
                },
                "type": "enter_flow",
                "uuid": "9d8f885e-79b1-43f1-a4aa-3a4e5982a837"
              }
            ],
            "exits": [
              {
                "uuid": "29c82996-98cb-422a-a17e-d53b83363a17",
                "destination_uuid": "ef03c17d-e18d-4afe-888e-0c1da21c63b7"
              },
              {
                "uuid": "8fb4e5ff-03f2-447b-b653-3a858ada9f6e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "014f780f-4cb9-487e-acaa-fdc3623c882e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "32dd2e87-f0c8-4e24-a610-1c7d0dff1956"
                },
                {
                  "uuid": "fe1a74dd-2071-40ad-ab12-10626d9b7700",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f6206b43-d450-4c75-bedd-638b008936b7"
                }
              ],
              "categories": [
                {
                  "uuid": "32dd2e87-f0c8-4e24-a610-1c7d0dff1956",
                  "name": "Complete",
                  "exit_uuid": "29c82996-98cb-422a-a17e-d53b83363a17"
                },
                {
                  "uuid": "f6206b43-d450-4c75-bedd-638b008936b7",
                  "name": "Expired",
                  "exit_uuid": "8fb4e5ff-03f2-447b-b653-3a858ada9f6e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "32dd2e87-f0c8-4e24-a610-1c7d0dff1956"
            }
          },
          {
            "uuid": "1d390f02-b002-4452-ba18-22c4e91ed4f3",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "837a9d49-ed57-40b3-ad0f-fcc140aa7c4c"
                },
                "type": "enter_flow",
                "uuid": "f3658d40-719b-4027-a74d-c83ca3286084"
              }
            ],
            "exits": [
              {
                "uuid": "50ef78b7-60dd-4ec5-be19-e72270c3064b",
                "destination_uuid": "ef03c17d-e18d-4afe-888e-0c1da21c63b7"
              },
              {
                "uuid": "20e2215e-6f88-40bd-a010-cf8b960d684f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "d5629fdd-57aa-45ae-88b8-e5236d0d258a",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "5c822eed-da71-48af-99ff-d114c148da88"
                },
                {
                  "uuid": "2a154a37-cfd1-4df4-8da7-1dfe2d5341e6",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "afa8b05c-72ee-4c7b-b655-750dd3d5b436"
                }
              ],
              "categories": [
                {
                  "uuid": "5c822eed-da71-48af-99ff-d114c148da88",
                  "name": "Complete",
                  "exit_uuid": "50ef78b7-60dd-4ec5-be19-e72270c3064b"
                },
                {
                  "uuid": "afa8b05c-72ee-4c7b-b655-750dd3d5b436",
                  "name": "Expired",
                  "exit_uuid": "20e2215e-6f88-40bd-a010-cf8b960d684f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "5c822eed-da71-48af-99ff-d114c148da88"
            }
          },
          {
            "uuid": "830a1d53-d2a6-457d-b87d-28f7be34bfd6",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2d876cb3-e110-4fa8-9346-5549c58598df"
              }
            ],
            "exits": [
              {
                "uuid": "b099cc00-45a2-4da7-989a-1c91e08e9bd5",
                "destination_uuid": "7d1a61fd-bee6-40d4-a6ce-ff7298f4a1e2"
              }
            ]
          },
          {
            "uuid": "ef03c17d-e18d-4afe-888e-0c1da21c63b7",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "35408dbc-3da1-4a39-89fe-ddb87ae675f2"
              }
            ],
            "exits": [
              {
                "uuid": "490c1561-d6b9-40a3-aa5e-b3d2d081bff2",
                "destination_uuid": "7d1a61fd-bee6-40d4-a6ce-ff7298f4a1e2"
              }
            ]
          },
          {
            "uuid": "7d1a61fd-bee6-40d4-a6ce-ff7298f4a1e2",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "3d88ce64-5d58-4b3a-a5e1-bb60adc142e7"
              }
            ],
            "exits": [
              {
                "uuid": "fcecb1ca-4c66-47e6-8d54-ba8a114fb5da",
                "destination_uuid": "f1f6067b-b419-4b20-8792-1ec4b0b62328"
              }
            ]
          },
          {
            "uuid": "f1f6067b-b419-4b20-8792-1ec4b0b62328",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ea53e6d8-ca57-4cd5-b422-28ac7adc1010",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "98e8937b-f185-4276-9825-2fb57342c7a7",
                  "type": "has_only_phrase",
                  "uuid": "0d648a2c-8dd9-4001-aa6f-b0289e8e383e"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "6bfb0e7e-42ff-4cb4-8e9b-31fadde114ff",
                  "type": "has_only_phrase",
                  "uuid": "09d7d9f7-ff08-4124-880e-1d3c172a51b3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a8deea02-d65b-4884-8a0f-fb822dbafe49",
                  "name": "All Responses",
                  "uuid": "ea53e6d8-ca57-4cd5-b422-28ac7adc1010"
                },
                {
                  "exit_uuid": "9c1cbfbb-db32-496d-bd89-a13422de2734",
                  "name": "Yes",
                  "uuid": "98e8937b-f185-4276-9825-2fb57342c7a7"
                },
                {
                  "exit_uuid": "a14e56be-cbf7-4375-86dd-da78baf8467c",
                  "name": "No",
                  "uuid": "6bfb0e7e-42ff-4cb4-8e9b-31fadde114ff"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a8deea02-d65b-4884-8a0f-fb822dbafe49",
                "destination_uuid": null
              },
              {
                "uuid": "9c1cbfbb-db32-496d-bd89-a13422de2734",
                "destination_uuid": "f0d78336-6845-4461-b6c6-c97c530ba1bf"
              },
              {
                "uuid": "a14e56be-cbf7-4375-86dd-da78baf8467c",
                "destination_uuid": "678baed2-6d55-41d8-a850-e60ed770bd76"
              }
            ]
          },
          {
            "uuid": "678baed2-6d55-41d8-a850-e60ed770bd76",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6b52336a-29a4-433b-aba5-7d190c608f25"
              }
            ],
            "exits": [
              {
                "uuid": "06473b86-d481-4ae7-b1a9-aadb649131e0",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b827239c-3491-49f1-be62-77637889818a",
            "actions": [
              {
                "uuid": "43498fcf-0163-46b9-990d-6cac9dc23f92",
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
                "uuid": "9a010891-f2e9-4244-b94b-95aa593d0a4b",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "9cb13269-001a-4054-a899-51b2e55a52b3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "487f994a-dafa-4fee-9957-21cdbcdf4d2d",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6a30df59-6e69-47c1-9e66-e8bff303e241"
              }
            ],
            "exits": [
              {
                "uuid": "cb11a55e-3c07-40ee-b869-a6e8b2daa52f",
                "destination_uuid": "6ae8ab71-3806-4187-ad28-20113c7cf0fa"
              }
            ]
          },
          {
            "uuid": "71ba852d-9cdc-45b8-a4ff-f8b489077627",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d45a5a9f-0960-4cff-8679-f6637b8bceab"
              }
            ],
            "exits": [
              {
                "uuid": "8eb7fa9d-05b1-448a-9c12-a3cd3cf24f55",
                "destination_uuid": "17e9f867-9d49-4952-8dbe-1eae21c29965"
              }
            ]
          },
          {
            "uuid": "17e9f867-9d49-4952-8dbe-1eae21c29965",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "e769262f-362d-4ad0-ace2-f7d3629dd0fa"
              }
            ],
            "exits": [
              {
                "uuid": "04c82680-e1b6-4b17-82c0-67128879b58f",
                "destination_uuid": "12975ef4-47f2-49a6-9cae-51130d8f35a6"
              }
            ]
          },
          {
            "uuid": "12975ef4-47f2-49a6-9cae-51130d8f35a6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "61473084-f2b3-48d5-b7a4-36a6cd8f3804",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "7e196bc5-7351-4efd-b3cd-3b78519907da",
                  "type": "has_only_phrase",
                  "uuid": "fb41901f-68b6-4d0f-b4dc-28f9d621e648"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "7e196bc5-7351-4efd-b3cd-3b78519907da",
                  "type": "has_only_phrase",
                  "uuid": "e97f70d6-e715-4e1a-a392-28b7aae285b8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e7af765b-1a08-4c86-aeeb-49357bc58fed",
                  "name": "All Responses",
                  "uuid": "61473084-f2b3-48d5-b7a4-36a6cd8f3804"
                },
                {
                  "exit_uuid": "fe6eb0be-f4dd-4ed2-8288-e002c4da0276",
                  "name": "image1; image2",
                  "uuid": "7e196bc5-7351-4efd-b3cd-3b78519907da"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e7af765b-1a08-4c86-aeeb-49357bc58fed",
                "destination_uuid": null
              },
              {
                "uuid": "fe6eb0be-f4dd-4ed2-8288-e002c4da0276",
                "destination_uuid": "ceb9380e-cc7e-4932-89d2-0270029d9d2e"
              }
            ]
          },
          {
            "uuid": "ceb9380e-cc7e-4932-89d2-0270029d9d2e",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "14d89774-4ce5-4c69-9a34-4d523a96f9a4"
              }
            ],
            "exits": [
              {
                "uuid": "4fb1539a-9f58-44c9-9fd2-f9631da9172c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "6ae8ab71-3806-4187-ad28-20113c7cf0fa",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "52ddcb4a-51a2-42cd-bca1-8449078ad8a9",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "9b58db39-9c1e-4c42-8655-03b50be675ea",
                  "type": "has_only_phrase",
                  "uuid": "0c58a8df-402d-4a2d-a96b-2cff19fcc156"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "9b58db39-9c1e-4c42-8655-03b50be675ea",
                  "type": "has_only_phrase",
                  "uuid": "09f0df88-2434-445f-afda-fc375b6f92d3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6f1568ea-1759-4168-9429-2e34162577ed",
                  "name": "All Responses",
                  "uuid": "52ddcb4a-51a2-42cd-bca1-8449078ad8a9"
                },
                {
                  "exit_uuid": "0a9d8601-2edc-412b-adcf-bd5f669034d1",
                  "name": "image1; image2",
                  "uuid": "9b58db39-9c1e-4c42-8655-03b50be675ea"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6f1568ea-1759-4168-9429-2e34162577ed",
                "destination_uuid": "71ba852d-9cdc-45b8-a4ff-f8b489077627"
              },
              {
                "uuid": "0a9d8601-2edc-412b-adcf-bd5f669034d1",
                "destination_uuid": "658da16a-cfa6-495a-8d65-271ae5ed7a32"
              }
            ]
          },
          {
            "uuid": "658da16a-cfa6-495a-8d65-271ae5ed7a32",
            "actions": [
              {
                "uuid": "1056722e-7998-4ca7-92a1-95f6631a8ae9",
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
                "uuid": "6821e28e-bd03-44b9-a338-0c288a0fd402",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "07356fc7-b064-4b61-b1b9-55deceb1ba9b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "47e7a1e7-b244-4ee0-bfbf-d483e985f474",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "d74d4675-b58e-41c9-814f-b1d743aa4a1a"
              }
            ],
            "exits": [
              {
                "uuid": "2c1e4b2c-758a-495e-a763-a5c8d3ba7f3e",
                "destination_uuid": "7a9cfdcf-fd28-4e8c-9084-ee6c3abae7a8"
              }
            ]
          },
          {
            "uuid": "7a9cfdcf-fd28-4e8c-9084-ee6c3abae7a8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5ba2dd39-09da-4989-b129-95d08fa317f0",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "1b42fce5-5d9a-4f11-bf6b-325d1585211b",
                  "type": "has_only_phrase",
                  "uuid": "0b82f232-788e-45eb-91d8-cb7284ee5684"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "cb9434cf-ff35-4a14-9c84-2be6df2b6a98",
                  "type": "has_only_phrase",
                  "uuid": "210cd364-58a8-4a69-80f8-50e644b02e51"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "84407eb3-3061-4ce2-93f3-f9e3e659a35b",
                  "name": "All Responses",
                  "uuid": "5ba2dd39-09da-4989-b129-95d08fa317f0"
                },
                {
                  "exit_uuid": "9ede63ff-6488-4505-8d1a-3aad4cc90b5e",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "1b42fce5-5d9a-4f11-bf6b-325d1585211b"
                },
                {
                  "exit_uuid": "cf59b19c-92cb-43ea-9259-58d943786df9",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "cb9434cf-ff35-4a14-9c84-2be6df2b6a98"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "84407eb3-3061-4ce2-93f3-f9e3e659a35b",
                "destination_uuid": null
              },
              {
                "uuid": "9ede63ff-6488-4505-8d1a-3aad4cc90b5e",
                "destination_uuid": "6b1ef859-849a-4ec5-aa5d-6316376949ab"
              },
              {
                "uuid": "cf59b19c-92cb-43ea-9259-58d943786df9",
                "destination_uuid": "76b5d8bc-9d9b-4977-b55e-65afe168b3ed"
              }
            ]
          },
          {
            "uuid": "6b1ef859-849a-4ec5-aa5d-6316376949ab",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "0899d51d-184a-4736-8507-f0616e54e3fe"
              }
            ],
            "exits": [
              {
                "uuid": "b2fd8b74-4024-424c-9aaa-22af9bde21a7",
                "destination_uuid": "560c8652-6a8d-43db-9e70-a3a9c9ffc8ee"
              }
            ]
          },
          {
            "uuid": "76b5d8bc-9d9b-4977-b55e-65afe168b3ed",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "462cc41a-d6d2-4ccd-9b83-109cbb4696b5"
              }
            ],
            "exits": [
              {
                "uuid": "967b8343-cc70-430b-9704-02b27eb1f6dd",
                "destination_uuid": "560c8652-6a8d-43db-9e70-a3a9c9ffc8ee"
              }
            ]
          },
          {
            "uuid": "560c8652-6a8d-43db-9e70-a3a9c9ffc8ee",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8a646767-1625-42b0-9933-3269e82c1e77",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "e9f6a3e0-d450-49a2-bd13-c02f38f6c88e",
                  "type": "has_only_phrase",
                  "uuid": "cc4d0857-97a7-4ef3-8209-0c739a81d766"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "dab66576-29d9-4261-b411-796bd995c876",
                  "type": "has_only_phrase",
                  "uuid": "71d897cd-f8fc-4599-8879-bdbadac71274"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "b3139736-0ff8-4bc2-9d03-91b15e0d459a",
                  "type": "has_only_phrase",
                  "uuid": "6c8bd493-0d47-4f05-9202-ee8f7b5fcef6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8e41891d-3895-4cbe-9535-f26e1bcdbe60",
                  "name": "All Responses",
                  "uuid": "8a646767-1625-42b0-9933-3269e82c1e77"
                },
                {
                  "exit_uuid": "7e65d886-7738-4f19-b5f7-9f957eaa59f8",
                  "name": "Hello",
                  "uuid": "e9f6a3e0-d450-49a2-bd13-c02f38f6c88e"
                },
                {
                  "exit_uuid": "605a7fc9-e3f8-466d-88f2-c0e51f160947",
                  "name": "Goodbye",
                  "uuid": "dab66576-29d9-4261-b411-796bd995c876"
                },
                {
                  "exit_uuid": "67707e10-f660-477f-aae9-8f92ece3ba76",
                  "name": "Goodbye",
                  "uuid": "b3139736-0ff8-4bc2-9d03-91b15e0d459a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8e41891d-3895-4cbe-9535-f26e1bcdbe60",
                "destination_uuid": null
              },
              {
                "uuid": "7e65d886-7738-4f19-b5f7-9f957eaa59f8",
                "destination_uuid": "302981b0-50b2-423d-922d-24e682a8638e"
              },
              {
                "uuid": "605a7fc9-e3f8-466d-88f2-c0e51f160947",
                "destination_uuid": "3be61e05-64de-4ba7-a4f3-7e956c985530"
              },
              {
                "uuid": "67707e10-f660-477f-aae9-8f92ece3ba76",
                "destination_uuid": "3be61e05-64de-4ba7-a4f3-7e956c985530"
              }
            ]
          },
          {
            "uuid": "302981b0-50b2-423d-922d-24e682a8638e",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "91f9235d-63a0-463d-9ce6-576181a6b6fe"
              }
            ],
            "exits": [
              {
                "uuid": "75c55c2c-bde5-4d1b-abbb-54cf84aca607",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "3be61e05-64de-4ba7-a4f3-7e956c985530",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e8ffa83d-9108-4b82-acb8-b48b05939c77"
              }
            ],
            "exits": [
              {
                "uuid": "c9eb6178-f90d-4464-9247-aeb1a0c781d4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ebc20d2d-0be8-4060-94b3-647e929a8377",
            "actions": [
              {
                "uuid": "7170e414-f9b2-4f18-8e12-9e027eff5604",
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
                "uuid": "4c36f1d3-a535-4096-97e9-9fece2abf322",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "41769693-6aa5-4810-8112-9fae7db221e9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1a471428-b5df-439e-a021-cc132505dd50",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4edb5491-0e47-4319-8823-19c8a1e4bd3c"
              }
            ],
            "exits": [
              {
                "uuid": "f8e1f7ce-a620-46da-a79e-af7d50daa4e0",
                "destination_uuid": "72d75f67-b447-434d-b487-f80cd3b02e81"
              }
            ]
          },
          {
            "uuid": "72d75f67-b447-434d-b487-f80cd3b02e81",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "705d24ae-e8e6-4bbf-90c3-69141c6f8392"
              }
            ],
            "exits": [
              {
                "uuid": "2f4ca0a2-29ff-48c5-8a4d-1e1c67940c88",
                "destination_uuid": "bd0a652d-e9ca-4d01-adfe-ab52d75df6c5"
              }
            ]
          },
          {
            "uuid": "bd0a652d-e9ca-4d01-adfe-ab52d75df6c5",
            "actions": [],
            "exits": [
              {
                "uuid": "a2d79a42-db03-4671-a63c-08fbad372c0d",
                "destination_uuid": "5eb6e5fc-4a8d-43c7-b52a-3f8512c29ab5"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e87ec832-bbdf-4f54-b15c-4f3033736735",
              "cases": [],
              "categories": [
                {
                  "uuid": "e87ec832-bbdf-4f54-b15c-4f3033736735",
                  "name": "All Responses",
                  "exit_uuid": "a2d79a42-db03-4671-a63c-08fbad372c0d"
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
            "uuid": "5eb6e5fc-4a8d-43c7-b52a-3f8512c29ab5",
            "actions": [
              {
                "uuid": "743b4112-df6f-4926-a2c7-b2f1ba5a2ea0",
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
                "uuid": "2220cfa1-d91e-486f-a4fe-c3a598f2d36c",
                "destination_uuid": "a30d3d76-b2ce-4a65-9ec6-14753ade509d"
              }
            ]
          },
          {
            "uuid": "a30d3d76-b2ce-4a65-9ec6-14753ade509d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c7da5e3d-8e94-46b1-b344-e278daa7b6ba",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "ec9de7fc-8524-480b-ac23-7952c9e51f27",
                  "type": "has_only_phrase",
                  "uuid": "18e41f3d-5f5e-411d-9760-9bb207f74220"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "396cf0ff-8e08-4b46-a56e-ca1b9dd7024f",
                  "type": "has_only_phrase",
                  "uuid": "c2aeb43f-f0fa-4bc7-a09a-0d0f11cb14ec"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e3736adc-4d3a-40dc-b17f-b8a0ed5a81d0",
                  "name": "All Responses",
                  "uuid": "c7da5e3d-8e94-46b1-b344-e278daa7b6ba"
                },
                {
                  "exit_uuid": "6fce6b0c-1b6f-4c3b-aa97-f27a057abd7c",
                  "name": "1",
                  "uuid": "ec9de7fc-8524-480b-ac23-7952c9e51f27"
                },
                {
                  "exit_uuid": "3901209e-f01c-4d2a-917c-4d130bfb88f5",
                  "name": "2",
                  "uuid": "396cf0ff-8e08-4b46-a56e-ca1b9dd7024f"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "e3736adc-4d3a-40dc-b17f-b8a0ed5a81d0",
                "destination_uuid": "8343c3bd-6c1f-4128-9900-c591d5c0e038"
              },
              {
                "uuid": "6fce6b0c-1b6f-4c3b-aa97-f27a057abd7c",
                "destination_uuid": "482f210d-8a50-46e2-97df-7320e351e8bd"
              },
              {
                "uuid": "3901209e-f01c-4d2a-917c-4d130bfb88f5",
                "destination_uuid": "f3c5bf75-8a60-43ad-8099-08cd9d18dc8f"
              }
            ]
          },
          {
            "uuid": "482f210d-8a50-46e2-97df-7320e351e8bd",
            "actions": [
              {
                "uuid": "aecfc1be-bd41-463b-bb28-45bd8810e70d",
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
                "uuid": "eb270c0c-f67b-48eb-86de-f93a2d35b600",
                "destination_uuid": "36aa8acb-0883-4c78-81e3-f5460b88706d"
              }
            ]
          },
          {
            "uuid": "f3c5bf75-8a60-43ad-8099-08cd9d18dc8f",
            "actions": [
              {
                "uuid": "57448bf2-bb59-4ef9-baf3-f6343696d7be",
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
                "uuid": "2b415ba2-a9b6-418d-a719-5709b933995f",
                "destination_uuid": "ea55c09c-57c1-4c07-b541-15a6d977a562"
              }
            ]
          },
          {
            "uuid": "8343c3bd-6c1f-4128-9900-c591d5c0e038",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f7eb3316-4871-4856-9c26-7a094c3733ee"
              }
            ],
            "exits": [
              {
                "uuid": "e52724ce-a543-4fa7-9d18-68b13673def5",
                "destination_uuid": "eb8e6333-9c56-4575-8432-804eeed27535"
              }
            ]
          },
          {
            "uuid": "eb8e6333-9c56-4575-8432-804eeed27535",
            "actions": [],
            "exits": [
              {
                "uuid": "574da3ee-a33e-40f2-836f-c738477d173d",
                "destination_uuid": "e8a258bd-61d5-414e-a33c-bf559f574364"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "55a45003-6048-4af5-b0a0-4b63dd9ac3cc",
              "cases": [],
              "categories": [
                {
                  "uuid": "55a45003-6048-4af5-b0a0-4b63dd9ac3cc",
                  "name": "All Responses",
                  "exit_uuid": "574da3ee-a33e-40f2-836f-c738477d173d"
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
            "uuid": "e8a258bd-61d5-414e-a33c-bf559f574364",
            "actions": [
              {
                "uuid": "964372fb-9949-4824-b474-fa30290c23e7",
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
                "uuid": "5daefda6-e8fd-4cc4-82b0-263aa140b0b4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "36aa8acb-0883-4c78-81e3-f5460b88706d",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a50c0c3e-9c32-4683-bed5-646dffe7c2a0"
              }
            ],
            "exits": [
              {
                "uuid": "13c5a3cd-f378-44d6-822d-ed8a7ac75ee8",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ea55c09c-57c1-4c07-b541-15a6d977a562",
            "actions": [
              {
                "uuid": "86a7eb15-1199-422f-a4c6-2675a18f384e",
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
                "uuid": "61e74dc1-bcc2-487e-8710-b15a08073dfc",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a1834dc6-7fa1-4da9-8bee-a87b93955872",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "375b3eb0-ceb2-438c-b67c-f21f6425ba48",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "3ac38a1f-128f-4749-8447-91dbb75abc1c"
              }
            ],
            "exits": [
              {
                "uuid": "385d0e4f-c88a-485c-8173-6e1cfa3be04b",
                "destination_uuid": "30330468-8124-4947-ae83-40df9ab78695"
              }
            ]
          },
          {
            "uuid": "30330468-8124-4947-ae83-40df9ab78695",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "880a0b73-56b0-490e-9c6e-5bae61eb814e",
              "cases": [
                {
                  "arguments": [
                    "Go to the story"
                  ],
                  "category_uuid": "f310ab4b-b8c7-485f-a2e3-96c99fb7d822",
                  "type": "has_only_phrase",
                  "uuid": "98679aca-a477-439d-9ab0-51d30e893f4b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "91dbd11e-31de-4ac9-a938-1a8f7cb79a22",
                  "name": "All Responses",
                  "uuid": "880a0b73-56b0-490e-9c6e-5bae61eb814e"
                },
                {
                  "exit_uuid": "98c9c64c-b443-4418-92a6-f3c43ba29389",
                  "name": "Go to the story",
                  "uuid": "f310ab4b-b8c7-485f-a2e3-96c99fb7d822"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "91dbd11e-31de-4ac9-a938-1a8f7cb79a22",
                "destination_uuid": null
              },
              {
                "uuid": "98c9c64c-b443-4418-92a6-f3c43ba29389",
                "destination_uuid": "d16913ec-fab0-4505-a480-56704070204b"
              }
            ]
          },
          {
            "uuid": "d16913ec-fab0-4505-a480-56704070204b",
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
                "uuid": "8a3509c5-18a4-4909-b2dc-19ed270083ce"
              }
            ],
            "exits": [
              {
                "uuid": "f1caa482-59e8-4b87-9cc8-f0c9995047f8",
                "destination_uuid": "4f20b20e-017e-4b1e-85ae-60b80b2e85bb"
              }
            ]
          },
          {
            "uuid": "4f20b20e-017e-4b1e-85ae-60b80b2e85bb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f2ad787c-0fda-43c2-b95e-54c31eb84db5",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "3d973c97-00b5-4a7b-822c-4b4ffa32347a",
                  "type": "has_only_phrase",
                  "uuid": "c0275516-a5d1-4562-b5c9-663585bf0c20"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b2f08639-8790-40b3-a1d8-98cf6c8bb00e",
                  "name": "All Responses",
                  "uuid": "f2ad787c-0fda-43c2-b95e-54c31eb84db5"
                },
                {
                  "exit_uuid": "fa4e2ac5-03b4-4cef-857d-12b169356b87",
                  "name": "Next",
                  "uuid": "3d973c97-00b5-4a7b-822c-4b4ffa32347a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b2f08639-8790-40b3-a1d8-98cf6c8bb00e",
                "destination_uuid": null
              },
              {
                "uuid": "fa4e2ac5-03b4-4cef-857d-12b169356b87",
                "destination_uuid": "5470d8f2-eca3-4026-aad7-bc1d12c77a90"
              }
            ]
          },
          {
            "uuid": "5470d8f2-eca3-4026-aad7-bc1d12c77a90",
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
                "uuid": "e216044d-d8b4-4ef6-a252-33ac2aa1fd0a"
              }
            ],
            "exits": [
              {
                "uuid": "d538dc84-212e-41d3-989a-6ab47a682ae8",
                "destination_uuid": "55bf570d-996d-4670-af3f-d5b0d63d1ec4"
              }
            ]
          },
          {
            "uuid": "55bf570d-996d-4670-af3f-d5b0d63d1ec4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "662fc13d-5486-46ef-a1e0-540513bfbd6c",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "cd132508-bcec-4d03-a058-aa5dfb7a0d0b",
                  "type": "has_only_phrase",
                  "uuid": "404c2b36-ccf7-4b7b-8ec9-0bb188ac6504"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "49e64386-d368-4aa8-9966-1cd86eef5b3d",
                  "type": "has_only_phrase",
                  "uuid": "6ecd1344-b62d-4da4-a164-16105df1fc41"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8cec242f-1375-4432-83b5-2d1d8438f860",
                  "name": "All Responses",
                  "uuid": "662fc13d-5486-46ef-a1e0-540513bfbd6c"
                },
                {
                  "exit_uuid": "b9d5b185-6515-4c6d-bd7b-fd9c9813b122",
                  "name": "Previous",
                  "uuid": "cd132508-bcec-4d03-a058-aa5dfb7a0d0b"
                },
                {
                  "exit_uuid": "94f7b74f-ef98-4ecb-a3dc-c2ea8c1eda5d",
                  "name": "Next",
                  "uuid": "49e64386-d368-4aa8-9966-1cd86eef5b3d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8cec242f-1375-4432-83b5-2d1d8438f860",
                "destination_uuid": null
              },
              {
                "uuid": "b9d5b185-6515-4c6d-bd7b-fd9c9813b122",
                "destination_uuid": "d16913ec-fab0-4505-a480-56704070204b"
              },
              {
                "uuid": "94f7b74f-ef98-4ecb-a3dc-c2ea8c1eda5d",
                "destination_uuid": "73bdc723-be66-454f-a142-a296cc726a4a"
              }
            ]
          },
          {
            "uuid": "73bdc723-be66-454f-a142-a296cc726a4a",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c975f69e-3f20-44f6-aeba-a9ccbc9bcf91"
              }
            ],
            "exits": [
              {
                "uuid": "bfbda07b-5616-4153-bf2e-1ffcdddb3be1",
                "destination_uuid": "0e08b127-48cd-4ec5-8bc5-dfc98f9a5187"
              }
            ]
          },
          {
            "uuid": "0e08b127-48cd-4ec5-8bc5-dfc98f9a5187",
            "actions": [
              {
                "uuid": "3cd7ec4f-499a-4a49-b0e7-4347e4e0c0be",
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
                "uuid": "0b87c8ab-2f53-49e4-a8f1-d63d5a5e298f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e0b3bc62-5eb4-48f7-b20a-46c1d1f2927c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "bc9666a8-d887-4a8b-92b6-e605b5cb32cd",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9e3aa0a6-1909-436b-96a5-63dc7ae60490"
              }
            ],
            "exits": [
              {
                "uuid": "73bb9994-3604-4e97-9828-d894c2231b4c",
                "destination_uuid": "9bd40cf9-eec1-4bfe-8f24-a2d6ceb3df0a"
              }
            ]
          },
          {
            "uuid": "9bd40cf9-eec1-4bfe-8f24-a2d6ceb3df0a",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "1d0241ad-c3a3-424a-8633-68a78f61a920"
              }
            ],
            "exits": [
              {
                "uuid": "2c613f1d-8f14-4a2c-9bbf-e212d01a3166",
                "destination_uuid": "f6eea1d0-eaee-43e7-b885-c86119b3eda6"
              }
            ]
          },
          {
            "uuid": "f6eea1d0-eaee-43e7-b885-c86119b3eda6",
            "actions": [],
            "exits": [
              {
                "uuid": "e7d7ac76-78ac-46c8-9676-6633d7f68251",
                "destination_uuid": "aac3ef27-d938-4b9c-9220-0503d1d92693"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "44654b06-b952-4679-94b1-76b39a430612",
              "cases": [],
              "categories": [
                {
                  "uuid": "44654b06-b952-4679-94b1-76b39a430612",
                  "name": "All Responses",
                  "exit_uuid": "e7d7ac76-78ac-46c8-9676-6633d7f68251"
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
            "uuid": "aac3ef27-d938-4b9c-9220-0503d1d92693",
            "actions": [
              {
                "uuid": "dceafe88-872b-4b9c-8a74-365d6871365a",
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
                "uuid": "96b11844-f510-4bf4-b797-5622c623ddfe",
                "destination_uuid": "2012193a-a47f-42df-961f-606d4c47f301"
              }
            ]
          },
          {
            "uuid": "2012193a-a47f-42df-961f-606d4c47f301",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "d050da13-d538-4682-90c4-032b077150c0"
                },
                "type": "enter_flow",
                "uuid": "740e7eb1-6a9a-4e23-8481-cd2f830a2b76"
              }
            ],
            "exits": [
              {
                "uuid": "98ae7859-2038-47c5-917e-9fda94a003d0",
                "destination_uuid": "459d80c8-f2a5-4153-a33a-7e6113900c3e"
              },
              {
                "uuid": "3e9a4ab5-f314-4406-9e1c-8e60fc5671bb",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "d15d90aa-6cbd-4192-b29c-8bee8a39fcad",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "88ecf344-71c7-495c-9cf5-5b98ef2aa4c3"
                },
                {
                  "uuid": "3a48a5c2-a85e-46a7-ba68-cdab6775f084",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2ec51fdf-4e8b-4b26-a1b2-d131c4a17374"
                }
              ],
              "categories": [
                {
                  "uuid": "88ecf344-71c7-495c-9cf5-5b98ef2aa4c3",
                  "name": "Complete",
                  "exit_uuid": "98ae7859-2038-47c5-917e-9fda94a003d0"
                },
                {
                  "uuid": "2ec51fdf-4e8b-4b26-a1b2-d131c4a17374",
                  "name": "Expired",
                  "exit_uuid": "3e9a4ab5-f314-4406-9e1c-8e60fc5671bb"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "88ecf344-71c7-495c-9cf5-5b98ef2aa4c3"
            }
          },
          {
            "uuid": "459d80c8-f2a5-4153-a33a-7e6113900c3e",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "e5e9bdf9-e368-4ba2-95bc-726eeaafb5c2"
              }
            ],
            "exits": [
              {
                "uuid": "0f29c098-fc32-41a4-b232-9f317a173c9b",
                "destination_uuid": "c4889c35-0735-49f2-bad6-590602a6e864"
              }
            ]
          },
          {
            "uuid": "c4889c35-0735-49f2-bad6-590602a6e864",
            "actions": [],
            "exits": [
              {
                "uuid": "ac56b021-fb1f-49ba-aeb8-2e4a9187cc39",
                "destination_uuid": "72b0a517-e958-4fcf-9482-a6cc2b9e8a9b"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2b3ff48f-fea2-48f0-8b2e-7c88bb071410",
              "cases": [],
              "categories": [
                {
                  "uuid": "2b3ff48f-fea2-48f0-8b2e-7c88bb071410",
                  "name": "All Responses",
                  "exit_uuid": "ac56b021-fb1f-49ba-aeb8-2e4a9187cc39"
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
            "uuid": "72b0a517-e958-4fcf-9482-a6cc2b9e8a9b",
            "actions": [
              {
                "uuid": "182a7e6f-69e2-4e46-98b2-32011a81502f",
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
                "uuid": "f410484a-8e5a-486f-b489-cb8c5bd3c9ef",
                "destination_uuid": "77206dbf-24e3-4dd2-a54d-cdccd37f8e3f"
              }
            ]
          },
          {
            "uuid": "77206dbf-24e3-4dd2-a54d-cdccd37f8e3f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "94f79519-ccd7-4009-a244-ce07e1b94eab",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "a005b2c1-06c6-4fc4-a0d8-690247db96f5",
                  "type": "has_only_phrase",
                  "uuid": "475d3e55-a648-4676-b533-473cb4843ee9"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "411c612b-7e44-4c2f-ba49-cf1723eb4538",
                  "type": "has_only_phrase",
                  "uuid": "1fe644e4-101b-41de-9aa7-e78690c2e0e4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "03409ac6-992c-42dc-a457-a6bfa7250bf0",
                  "name": "All Responses",
                  "uuid": "94f79519-ccd7-4009-a244-ce07e1b94eab"
                },
                {
                  "exit_uuid": "894aa21c-1850-489f-940a-9026b6780fc2",
                  "name": "guide1",
                  "uuid": "a005b2c1-06c6-4fc4-a0d8-690247db96f5"
                },
                {
                  "exit_uuid": "88670b8a-c34c-4e23-b63d-9b9bd4940ec0",
                  "name": "guide2",
                  "uuid": "411c612b-7e44-4c2f-ba49-cf1723eb4538"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "03409ac6-992c-42dc-a457-a6bfa7250bf0",
                "destination_uuid": null
              },
              {
                "uuid": "894aa21c-1850-489f-940a-9026b6780fc2",
                "destination_uuid": "cc12e1e7-e88f-48d3-9c64-9bde05aa6a0d"
              },
              {
                "uuid": "88670b8a-c34c-4e23-b63d-9b9bd4940ec0",
                "destination_uuid": "8e7f15fd-c9e2-47eb-86a1-d116449a8d81"
              }
            ]
          },
          {
            "uuid": "cc12e1e7-e88f-48d3-9c64-9bde05aa6a0d",
            "actions": [
              {
                "uuid": "95bd402d-8be6-42a4-9be9-5064d1cfea4d",
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
                "uuid": "a22c869f-58a1-4f88-9ce2-ddc9fc75d968",
                "destination_uuid": "6ba9fa10-f327-460a-ad62-9e16dffe2d12"
              }
            ]
          },
          {
            "uuid": "8e7f15fd-c9e2-47eb-86a1-d116449a8d81",
            "actions": [
              {
                "uuid": "a01b5fd2-db2b-441d-8f89-866cd10bd267",
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
                "uuid": "f8077eac-a7cc-4d64-9fe0-24dbed7a75bb",
                "destination_uuid": "6ba9fa10-f327-460a-ad62-9e16dffe2d12"
              }
            ]
          },
          {
            "uuid": "6ba9fa10-f327-460a-ad62-9e16dffe2d12",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2bbbdb11-475e-4d6b-848f-e87f13f0a1c4"
              }
            ],
            "exits": [
              {
                "uuid": "513f3538-dd9a-4e87-8c16-69995ed3d8cc",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "dd04814d-10c9-4cb5-8936-4eeb5c0cfc36",
            "actions": [
              {
                "uuid": "4958b7d5-f1d7-4f97-9127-fb79ce810465",
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
                "uuid": "49df96fa-9186-4d17-9fc8-39c83e860247",
                "destination_uuid": "e8871e5d-40b3-4017-bd80-1686b31d4e24"
              }
            ]
          },
          {
            "uuid": "e8871e5d-40b3-4017-bd80-1686b31d4e24",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "e4d533ce-ae44-4cf4-8fc5-abe496034ba0"
                },
                "type": "enter_flow",
                "uuid": "675fe748-bc98-4fbf-8aaf-6c9903287dee"
              }
            ],
            "exits": [
              {
                "uuid": "87077573-bf9b-42b8-8139-9824b07f9728",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "38486843-57a5-4872-bb0f-6f5650a50a8c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6bdefcf1-c0dc-4254-86fd-a84bd8ae723b",
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
                "uuid": "0fa8eab6-dba8-4955-b35a-c1414cdb31fb"
              }
            ],
            "exits": [
              {
                "uuid": "df0860dc-44c0-44ab-b4f9-8c09446278ab",
                "destination_uuid": "01c43253-464f-4a5c-aaa0-5d3e28e8f8ff"
              }
            ]
          },
          {
            "uuid": "01c43253-464f-4a5c-aaa0-5d3e28e8f8ff",
            "actions": [],
            "exits": [
              {
                "uuid": "b432763f-24b5-4bba-8862-6f35b2f2c5cd",
                "destination_uuid": "a4ea786f-5c47-4c26-b7c7-8ae3ad36fc8a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "01c0caa7-c3e4-4f1f-b525-9d8336f98504",
              "cases": [],
              "categories": [
                {
                  "uuid": "01c0caa7-c3e4-4f1f-b525-9d8336f98504",
                  "name": "All Responses",
                  "exit_uuid": "b432763f-24b5-4bba-8862-6f35b2f2c5cd"
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
            "uuid": "a4ea786f-5c47-4c26-b7c7-8ae3ad36fc8a",
            "actions": [
              {
                "uuid": "1c48de6b-8af0-40f7-a19b-210171fcc418",
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
                "uuid": "f810f038-ae8c-41b9-93c7-176ee68b2204",
                "destination_uuid": "c3a47628-59cd-42f7-b72a-32e9f7002528"
              }
            ]
          },
          {
            "uuid": "c3a47628-59cd-42f7-b72a-32e9f7002528",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e0319f4f-4b93-42ca-a478-ccf580ca863e"
              }
            ],
            "exits": [
              {
                "uuid": "6a532fd0-9545-4f09-9d3d-09c7b97f2c8e",
                "destination_uuid": "ccb77c64-972c-4c03-a3c6-337aad80dee0"
              }
            ]
          },
          {
            "uuid": "ccb77c64-972c-4c03-a3c6-337aad80dee0",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cd7f0853-03af-42cb-baa5-29b52d513856"
              }
            ],
            "exits": [
              {
                "uuid": "078f4419-7863-4433-8b62-cbe48ea07e13",
                "destination_uuid": "5632afe3-5461-4dcd-8f7b-fd3227d4c874"
              }
            ]
          },
          {
            "uuid": "5632afe3-5461-4dcd-8f7b-fd3227d4c874",
            "actions": [
              {
                "flow": {
                  "name": "calm5",
                  "uuid": "68d3eb7a-1b9a-4356-9ad9-53daa6a7f9fe"
                },
                "type": "enter_flow",
                "uuid": "beb28ff7-1631-4ac6-a39f-0400798de11e"
              }
            ],
            "exits": [
              {
                "uuid": "4fea218f-f03d-4291-b063-d2e45ea751fe",
                "destination_uuid": null
              },
              {
                "uuid": "b189571b-a0b1-4c74-b0d7-b33bc2679caa",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "dfba50bc-96b3-4476-98a4-0157f26f8d7c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b2db498d-6e68-437f-b410-d4d7040587f4"
                },
                {
                  "uuid": "1b0ba383-c66e-4edf-8340-78a3821cc5f5",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "bd84af32-fb65-46aa-810e-9be190684ec1"
                }
              ],
              "categories": [
                {
                  "uuid": "b2db498d-6e68-437f-b410-d4d7040587f4",
                  "name": "Complete",
                  "exit_uuid": "4fea218f-f03d-4291-b063-d2e45ea751fe"
                },
                {
                  "uuid": "bd84af32-fb65-46aa-810e-9be190684ec1",
                  "name": "Expired",
                  "exit_uuid": "b189571b-a0b1-4c74-b0d7-b33bc2679caa"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b2db498d-6e68-437f-b410-d4d7040587f4"
            }
          },
          {
            "uuid": "fd5dd5ab-5e57-43e7-88ca-45b905a44ef4",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "813a7f9b-d217-4b0b-9b5c-048db6029651"
              }
            ],
            "exits": [
              {
                "uuid": "971a3d5e-b9c8-49ff-94ae-097f7337f9f8",
                "destination_uuid": "8603507b-6a87-42a4-9636-f972d2ca94bc"
              }
            ]
          },
          {
            "uuid": "8603507b-6a87-42a4-9636-f972d2ca94bc",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "471a3fd3-d483-4854-bd79-ff0e6f684f0a"
              }
            ],
            "exits": [
              {
                "uuid": "60eb4986-0de5-4509-b8eb-e070b3f813ef",
                "destination_uuid": "b706a064-157d-40ec-bed3-3a2b41c2c5dd"
              }
            ]
          },
          {
            "uuid": "b706a064-157d-40ec-bed3-3a2b41c2c5dd",
            "actions": [],
            "exits": [
              {
                "uuid": "aeb9378e-28e4-40f3-a52d-f1de4b730294",
                "destination_uuid": "7319d33d-f4c1-4185-9af9-914f0541f371"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "08e3f610-0c5e-4875-b604-08008b6101a5",
              "cases": [],
              "categories": [
                {
                  "uuid": "08e3f610-0c5e-4875-b604-08008b6101a5",
                  "name": "All Responses",
                  "exit_uuid": "aeb9378e-28e4-40f3-a52d-f1de4b730294"
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
            "uuid": "7319d33d-f4c1-4185-9af9-914f0541f371",
            "actions": [
              {
                "uuid": "2b17dfe4-d1c8-4a30-a8e4-1db6c1ac5820",
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
                "uuid": "9d839c74-380e-445d-930b-d777d276389b",
                "destination_uuid": "b7c56bb4-7ee8-445b-98a6-695315c3059c"
              }
            ]
          },
          {
            "uuid": "b7c56bb4-7ee8-445b-98a6-695315c3059c",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d4c2e91a-21eb-43ad-ab40-74c4f9cec128"
              }
            ],
            "exits": [
              {
                "uuid": "f9ab41f5-52eb-4be0-ba61-1ffa16158372",
                "destination_uuid": "400c68cb-d3d6-470a-b2b1-d28aaba18cf1"
              }
            ]
          },
          {
            "uuid": "400c68cb-d3d6-470a-b2b1-d28aaba18cf1",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5f59c6ce-fb02-46c2-88e9-8ff3239dc0db"
              }
            ],
            "exits": [
              {
                "uuid": "ea16f40f-f792-4c92-a518-6763c317a7ec",
                "destination_uuid": "791b94b5-f815-4371-bd1b-5a86a65687a4"
              }
            ]
          },
          {
            "uuid": "791b94b5-f815-4371-bd1b-5a86a65687a4",
            "actions": [
              {
                "uuid": "ccfd99fc-6345-4269-bb1d-f40ce71b0d9c",
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
                "uuid": "fbec5b90-6722-4572-8f74-0188e1e4131a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "18327340-44cd-411d-ac7b-adbaa8bdddbb",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "199d6920-9701-41a2-8f9f-0b62b7ae6b6d",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "731cd13e-504f-4eee-9b07-4aa72dfa5a1e"
              }
            ],
            "exits": [
              {
                "uuid": "c4a03e4b-a948-4abf-ac5a-edeb7a235587",
                "destination_uuid": "6d8c02f2-60fd-4f1f-977e-bfcfcb525855"
              }
            ]
          },
          {
            "uuid": "6d8c02f2-60fd-4f1f-977e-bfcfcb525855",
            "actions": [
              {
                "uuid": "aa1c39a4-fcaf-48c8-8d70-1389bdc9b692",
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
                "uuid": "43507dc3-4abb-4860-89c6-ae13b6a9bc0b",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "2656ef60-1f44-4863-9fca-533ae0744233",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "41a86a02-6912-46d7-bf69-8f35fcde7ed2",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9270d685-4266-4fd5-abdd-d04fba8dd665"
              }
            ],
            "exits": [
              {
                "uuid": "81916877-4f59-41b4-b579-e9226de5d9c0",
                "destination_uuid": "7a7b90ce-ec83-4de6-ad7a-41695e104432"
              }
            ]
          },
          {
            "uuid": "7a7b90ce-ec83-4de6-ad7a-41695e104432",
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
                "uuid": "f1e3e042-7d9a-4523-bb37-cf958e242fa7"
              }
            ],
            "exits": [
              {
                "uuid": "1a6acdc4-2f5d-4ad8-acf2-1d36d491064a",
                "destination_uuid": "12d81605-bdad-4eb1-afdc-933aaa76c463"
              }
            ]
          },
          {
            "uuid": "12d81605-bdad-4eb1-afdc-933aaa76c463",
            "actions": [],
            "exits": [
              {
                "uuid": "dce0583c-19aa-41ec-9723-2cf92d3ae507",
                "destination_uuid": "f886f4de-d3c2-4c44-bdad-44a9bb1b7d92"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b619ec58-cebe-40f0-9594-ab1b287c7579",
              "cases": [],
              "categories": [
                {
                  "uuid": "b619ec58-cebe-40f0-9594-ab1b287c7579",
                  "name": "All Responses",
                  "exit_uuid": "dce0583c-19aa-41ec-9723-2cf92d3ae507"
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
            "uuid": "f886f4de-d3c2-4c44-bdad-44a9bb1b7d92",
            "actions": [
              {
                "uuid": "e3664673-f690-4961-8eb7-97b8b8fa42b8",
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
                "uuid": "07d5dfa1-2232-4fdf-aae8-4266836d420c",
                "destination_uuid": "e4f72f29-c033-4475-a954-e23ac1da572d"
              }
            ]
          },
          {
            "uuid": "e4f72f29-c033-4475-a954-e23ac1da572d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f83a4eb8-abba-43c9-ab08-07904794fbbc",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "1f4c4bd0-178d-4316-a451-f890c2072480",
                  "type": "has_only_phrase",
                  "uuid": "a23cfa1e-e24e-479b-8b04-83055f77d27e"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "1f4c4bd0-178d-4316-a451-f890c2072480",
                  "type": "has_only_phrase",
                  "uuid": "0993ed5e-2a0a-45aa-aaa4-417a693f4ab6"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "1f4c4bd0-178d-4316-a451-f890c2072480",
                  "type": "has_only_phrase",
                  "uuid": "83c02d9b-e71d-455e-a208-d246ab907f27"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "1f4c4bd0-178d-4316-a451-f890c2072480",
                  "type": "has_only_phrase",
                  "uuid": "e393bc8c-48ff-4efc-8ffd-87c1de50bf3e"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "4e0974c9-35c1-4b61-8e4d-27cc22eb52d0",
                  "type": "has_only_phrase",
                  "uuid": "3eb50abf-a554-4fe7-87be-0b68631ea722"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "4e0974c9-35c1-4b61-8e4d-27cc22eb52d0",
                  "type": "has_only_phrase",
                  "uuid": "08f6a3ea-bc87-4ebc-a5d3-443432b8aad9"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "4e0974c9-35c1-4b61-8e4d-27cc22eb52d0",
                  "type": "has_only_phrase",
                  "uuid": "ef32f22e-0cea-4562-8c8a-ac0e580f854c"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "4e0974c9-35c1-4b61-8e4d-27cc22eb52d0",
                  "type": "has_only_phrase",
                  "uuid": "dbeca3c2-8d37-4ffc-a683-7f7d0ec1f8a7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5637059b-bd53-47e5-be1b-7ea1f41f844e",
                  "name": "All Responses",
                  "uuid": "f83a4eb8-abba-43c9-ab08-07904794fbbc"
                },
                {
                  "exit_uuid": "43162a23-63d8-4048-9c1f-041cf620db36",
                  "name": "0;1;2;3",
                  "uuid": "1f4c4bd0-178d-4316-a451-f890c2072480"
                },
                {
                  "exit_uuid": "91cd44d6-2bab-448d-a901-02de28c714d6",
                  "name": "4;5;6;7",
                  "uuid": "4e0974c9-35c1-4b61-8e4d-27cc22eb52d0"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "5637059b-bd53-47e5-be1b-7ea1f41f844e",
                "destination_uuid": null
              },
              {
                "uuid": "43162a23-63d8-4048-9c1f-041cf620db36",
                "destination_uuid": "9e947084-ea15-4343-bd85-1a13c4e0ad07"
              },
              {
                "uuid": "91cd44d6-2bab-448d-a901-02de28c714d6",
                "destination_uuid": "d87d7b6b-c866-49f1-8593-6ef4559aeda5"
              }
            ]
          },
          {
            "uuid": "9e947084-ea15-4343-bd85-1a13c4e0ad07",
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
                "uuid": "e43c85ed-1961-4dac-8968-ff1069de74e9"
              }
            ],
            "exits": [
              {
                "uuid": "4925a365-6a11-4ad6-a8ea-2e894e8d43c0",
                "destination_uuid": "308bf41e-27e5-4395-b5f5-cdad567aa934"
              }
            ]
          },
          {
            "uuid": "d87d7b6b-c866-49f1-8593-6ef4559aeda5",
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
                "uuid": "29ecfdee-b8c6-40ad-a818-e4bd952d6977"
              }
            ],
            "exits": [
              {
                "uuid": "cbfdfa22-0e83-4d3d-b72a-2733e3eeb32f",
                "destination_uuid": "308bf41e-27e5-4395-b5f5-cdad567aa934"
              }
            ]
          },
          {
            "uuid": "308bf41e-27e5-4395-b5f5-cdad567aa934",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "52a377d8-15e0-46d9-84e5-4be163ccc1a6",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "53ec08ea-3401-4778-975d-0fc87dad3396",
                  "type": "has_only_phrase",
                  "uuid": "b253b955-8fc0-4e16-96a8-82e888a115be"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6b806cb6-a331-4bfe-ae54-d29e486d5a65",
                  "name": "All Responses",
                  "uuid": "52a377d8-15e0-46d9-84e5-4be163ccc1a6"
                },
                {
                  "exit_uuid": "101171c9-36ab-4bef-bba8-aaf6fa967433",
                  "name": "Next",
                  "uuid": "53ec08ea-3401-4778-975d-0fc87dad3396"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6b806cb6-a331-4bfe-ae54-d29e486d5a65",
                "destination_uuid": null
              },
              {
                "uuid": "101171c9-36ab-4bef-bba8-aaf6fa967433",
                "destination_uuid": "4f74eccf-71f4-4439-9ae8-4ba4d3adfd6d"
              }
            ]
          },
          {
            "uuid": "4f74eccf-71f4-4439-9ae8-4ba4d3adfd6d",
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
                "uuid": "12a0a67f-feea-492e-9193-367eda9ba5d9"
              }
            ],
            "exits": [
              {
                "uuid": "e7594c9e-0086-4ae8-aae5-11bc8c9c98f1",
                "destination_uuid": "04a2952f-f52a-4bfa-932c-9dfd7826f614"
              }
            ]
          },
          {
            "uuid": "04a2952f-f52a-4bfa-932c-9dfd7826f614",
            "actions": [],
            "exits": [
              {
                "uuid": "aa32e3f1-3a3b-4757-9f79-2f8b1527c3b4",
                "destination_uuid": "612e4707-3e33-44c6-8960-ac34c87fe6a8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "243c65d7-d0cc-4b3b-94c4-c0cc3ab7ec2b",
              "cases": [],
              "categories": [
                {
                  "uuid": "243c65d7-d0cc-4b3b-94c4-c0cc3ab7ec2b",
                  "name": "All Responses",
                  "exit_uuid": "aa32e3f1-3a3b-4757-9f79-2f8b1527c3b4"
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
            "uuid": "612e4707-3e33-44c6-8960-ac34c87fe6a8",
            "actions": [
              {
                "uuid": "9510c07b-622c-4624-8efa-4b544340a113",
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
                "uuid": "1133ec8c-3234-472a-99bd-ec4cf41c3dfa",
                "destination_uuid": "3dfde5f8-bca3-437c-bd45-35e9cd9ac74c"
              }
            ]
          },
          {
            "uuid": "3dfde5f8-bca3-437c-bd45-35e9cd9ac74c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3af580ef-5264-46cd-9a00-0895d9c7e1dc",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "4e4bd5ef-6641-43f6-a4d2-79584c8b78e0",
                  "type": "has_only_phrase",
                  "uuid": "46d77b1e-d17d-40d5-917d-b189f942ac95"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "4e4bd5ef-6641-43f6-a4d2-79584c8b78e0",
                  "type": "has_only_phrase",
                  "uuid": "1bf3364c-5b86-446b-a2dc-e5e24315bb0b"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "4e4bd5ef-6641-43f6-a4d2-79584c8b78e0",
                  "type": "has_only_phrase",
                  "uuid": "5d01c29f-8178-438d-83bb-6677e0289208"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "4e4bd5ef-6641-43f6-a4d2-79584c8b78e0",
                  "type": "has_only_phrase",
                  "uuid": "1acde412-4e2a-443e-8b59-6d7735062625"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "4e4bd5ef-6641-43f6-a4d2-79584c8b78e0",
                  "type": "has_only_phrase",
                  "uuid": "2be08312-750b-4d59-8542-d7ee01aff85f"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "0721fe5e-dd90-49d1-8a82-21cdeaf6356d",
                  "type": "has_only_phrase",
                  "uuid": "b34af90a-d675-4c84-80dd-f14dc5686dfb"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "0721fe5e-dd90-49d1-8a82-21cdeaf6356d",
                  "type": "has_only_phrase",
                  "uuid": "6c4b75ce-71cb-4900-a5fa-cc5ebc17d9df"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "0721fe5e-dd90-49d1-8a82-21cdeaf6356d",
                  "type": "has_only_phrase",
                  "uuid": "e303d55b-f3b9-413a-b31a-4e9f758520fb"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "0721fe5e-dd90-49d1-8a82-21cdeaf6356d",
                  "type": "has_only_phrase",
                  "uuid": "6c6c8dd5-ed24-4416-a879-0d9490bc91a8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3645516c-b649-40b2-9d18-e9341cde4a7e",
                  "name": "All Responses",
                  "uuid": "3af580ef-5264-46cd-9a00-0895d9c7e1dc"
                },
                {
                  "exit_uuid": "5bb16089-dabe-4c37-9405-829de12b58f0",
                  "name": "0;1;2;3;4",
                  "uuid": "4e4bd5ef-6641-43f6-a4d2-79584c8b78e0"
                },
                {
                  "exit_uuid": "88478213-4b34-41a3-9f06-cb15d48e3df3",
                  "name": "5;6;7;8",
                  "uuid": "0721fe5e-dd90-49d1-8a82-21cdeaf6356d"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "3645516c-b649-40b2-9d18-e9341cde4a7e",
                "destination_uuid": null
              },
              {
                "uuid": "5bb16089-dabe-4c37-9405-829de12b58f0",
                "destination_uuid": "df023fdd-fe55-4bee-988b-d6a3c84368b9"
              },
              {
                "uuid": "88478213-4b34-41a3-9f06-cb15d48e3df3",
                "destination_uuid": "127eca84-f0ba-412e-97c5-a1d26f047248"
              }
            ]
          },
          {
            "uuid": "df023fdd-fe55-4bee-988b-d6a3c84368b9",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "288534e3-d99d-4985-a925-b3fb88132935"
              }
            ],
            "exits": [
              {
                "uuid": "ea991d99-0018-46ab-9b15-f5080db49e07",
                "destination_uuid": "c901fea9-cf0a-4f9f-9d26-df69a9ce2652"
              }
            ]
          },
          {
            "uuid": "127eca84-f0ba-412e-97c5-a1d26f047248",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "dd8f49a4-13fd-4067-a6ea-d31f40dfc6f3"
              }
            ],
            "exits": [
              {
                "uuid": "33e12a06-88fb-423f-8714-a4da288ea397",
                "destination_uuid": "c901fea9-cf0a-4f9f-9d26-df69a9ce2652"
              }
            ]
          },
          {
            "uuid": "c901fea9-cf0a-4f9f-9d26-df69a9ce2652",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d35a40a6-e26a-4d7d-8ad6-bbf07872fbd7",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "83a0350a-97c3-45bc-a6c9-bfda091026be",
                  "type": "has_only_phrase",
                  "uuid": "85f69eb6-df49-4d72-b1c9-deda225a6a33"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2b5826f3-cd28-41a5-9190-1fab086fc3fa",
                  "name": "All Responses",
                  "uuid": "d35a40a6-e26a-4d7d-8ad6-bbf07872fbd7"
                },
                {
                  "exit_uuid": "15551086-f46d-4933-bc93-1b492ba424c2",
                  "name": "Next",
                  "uuid": "83a0350a-97c3-45bc-a6c9-bfda091026be"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2b5826f3-cd28-41a5-9190-1fab086fc3fa",
                "destination_uuid": null
              },
              {
                "uuid": "15551086-f46d-4933-bc93-1b492ba424c2",
                "destination_uuid": "b0973b79-d335-44d0-9481-269847e86c33"
              }
            ]
          },
          {
            "uuid": "b0973b79-d335-44d0-9481-269847e86c33",
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
                "uuid": "9a723c4e-c4c6-40c6-a05d-9a577a869be6"
              }
            ],
            "exits": [
              {
                "uuid": "1f0156a6-7abc-4e76-b1da-3e6303c3842e",
                "destination_uuid": "7c2e5bf9-29ec-4054-b597-d7020822acc8"
              }
            ]
          },
          {
            "uuid": "7c2e5bf9-29ec-4054-b597-d7020822acc8",
            "actions": [],
            "exits": [
              {
                "uuid": "5784727e-923e-44be-b409-5edd60e4bb98",
                "destination_uuid": "27480d24-b9b6-4095-924c-60edd381c3db"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e7a86296-c7c4-45be-90e4-e700420599dd",
              "cases": [],
              "categories": [
                {
                  "uuid": "e7a86296-c7c4-45be-90e4-e700420599dd",
                  "name": "All Responses",
                  "exit_uuid": "5784727e-923e-44be-b409-5edd60e4bb98"
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
            "uuid": "27480d24-b9b6-4095-924c-60edd381c3db",
            "actions": [
              {
                "uuid": "7e380d5c-b9b0-44c7-9197-041d5f2a6cde",
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
                "uuid": "fc616de5-badc-42df-8c86-7a869e496c92",
                "destination_uuid": "3047b318-afa8-49e1-8726-10e8248b97c5"
              }
            ]
          },
          {
            "uuid": "3047b318-afa8-49e1-8726-10e8248b97c5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cdc1d9a6-4b3d-434f-bf05-1fd7ca89437e",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "134fb420-6bc8-4d61-8deb-15ad0faacd17",
                  "type": "has_only_phrase",
                  "uuid": "71432171-304c-404a-9a8d-93df18d12a4b"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "134fb420-6bc8-4d61-8deb-15ad0faacd17",
                  "type": "has_only_phrase",
                  "uuid": "27f6788d-672c-4d98-9f25-52978ad31a86"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "134fb420-6bc8-4d61-8deb-15ad0faacd17",
                  "type": "has_only_phrase",
                  "uuid": "43bdad23-d591-4beb-9830-b89d3f1a20b0"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "8671b5ff-5a73-4c44-9c5f-637cb3a16bca",
                  "type": "has_only_phrase",
                  "uuid": "453283dd-ae20-4074-95e1-9ea40303b469"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "8671b5ff-5a73-4c44-9c5f-637cb3a16bca",
                  "type": "has_only_phrase",
                  "uuid": "bc8b51a7-f7e1-45d5-a9b4-073edb362dc1"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "8671b5ff-5a73-4c44-9c5f-637cb3a16bca",
                  "type": "has_only_phrase",
                  "uuid": "3ae6b553-74b4-4ea9-b8b7-dff6412929df"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "8671b5ff-5a73-4c44-9c5f-637cb3a16bca",
                  "type": "has_only_phrase",
                  "uuid": "eb60f366-ea34-46d0-9199-99fbaf4767cc"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "8671b5ff-5a73-4c44-9c5f-637cb3a16bca",
                  "type": "has_only_phrase",
                  "uuid": "ce4ffb6e-70be-425f-8e9b-e6eaa695d5e9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "052ed92a-a369-422d-b665-16945528f8c1",
                  "name": "All Responses",
                  "uuid": "cdc1d9a6-4b3d-434f-bf05-1fd7ca89437e"
                },
                {
                  "exit_uuid": "14955523-7ebd-4b11-a8bb-8b56a5578813",
                  "name": "0;1;2",
                  "uuid": "134fb420-6bc8-4d61-8deb-15ad0faacd17"
                },
                {
                  "exit_uuid": "8759c828-40f2-499a-9aca-2e8073a2501c",
                  "name": "3;4;5;6;7",
                  "uuid": "8671b5ff-5a73-4c44-9c5f-637cb3a16bca"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "052ed92a-a369-422d-b665-16945528f8c1",
                "destination_uuid": null
              },
              {
                "uuid": "14955523-7ebd-4b11-a8bb-8b56a5578813",
                "destination_uuid": "537115c0-ee29-4efa-8084-8c18a4f27248"
              },
              {
                "uuid": "8759c828-40f2-499a-9aca-2e8073a2501c",
                "destination_uuid": "dfa3a943-fd18-40be-a4a8-13d47244463a"
              }
            ]
          },
          {
            "uuid": "537115c0-ee29-4efa-8084-8c18a4f27248",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "0f700e29-7488-46dd-9952-d8c1affe1a95"
              }
            ],
            "exits": [
              {
                "uuid": "89d3f6ac-e0fd-42a9-a06c-73c57c4c6490",
                "destination_uuid": "59740921-44aa-4b7d-a169-0dfdcfce87de"
              }
            ]
          },
          {
            "uuid": "dfa3a943-fd18-40be-a4a8-13d47244463a",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c8d3d8f2-e75c-4906-8107-7066dc14c14d"
              }
            ],
            "exits": [
              {
                "uuid": "24b8699b-39c5-4f5d-9b51-50e2e8be82ae",
                "destination_uuid": "59740921-44aa-4b7d-a169-0dfdcfce87de"
              }
            ]
          },
          {
            "uuid": "59740921-44aa-4b7d-a169-0dfdcfce87de",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cd5c92e7-261a-4435-a86a-1b98fb8d4b56",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "e4fc5c80-a24b-4449-b62c-e74ffa6bd3fa",
                  "type": "has_only_phrase",
                  "uuid": "58d7af07-0d63-48fb-8b83-89a49d150f66"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "244f84fd-8cdb-44f2-9172-28851188c8d0",
                  "name": "All Responses",
                  "uuid": "cd5c92e7-261a-4435-a86a-1b98fb8d4b56"
                },
                {
                  "exit_uuid": "4aef383f-ddbd-4c66-8e27-e808cdab5ea2",
                  "name": "Next",
                  "uuid": "e4fc5c80-a24b-4449-b62c-e74ffa6bd3fa"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "244f84fd-8cdb-44f2-9172-28851188c8d0",
                "destination_uuid": null
              },
              {
                "uuid": "4aef383f-ddbd-4c66-8e27-e808cdab5ea2",
                "destination_uuid": "057af035-31b9-4659-878f-e79cc91fb538"
              }
            ]
          },
          {
            "uuid": "057af035-31b9-4659-878f-e79cc91fb538",
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
                "uuid": "1d455693-77c3-4c02-88a1-9b55e73430b8"
              }
            ],
            "exits": [
              {
                "uuid": "5f39d5e6-355c-4bee-a5c5-f2b553bef05f",
                "destination_uuid": "3545b8b6-7cf2-4043-95f8-3c794c7ecdf7"
              }
            ]
          },
          {
            "uuid": "3545b8b6-7cf2-4043-95f8-3c794c7ecdf7",
            "actions": [],
            "exits": [
              {
                "uuid": "1c23785b-5e1a-43f1-9802-10e70e9a1b61",
                "destination_uuid": "31a2f647-1754-4431-8579-6fdd8337d31b"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f5e101c5-6e24-4026-9fda-d18670be487c",
              "cases": [],
              "categories": [
                {
                  "uuid": "f5e101c5-6e24-4026-9fda-d18670be487c",
                  "name": "All Responses",
                  "exit_uuid": "1c23785b-5e1a-43f1-9802-10e70e9a1b61"
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
            "uuid": "31a2f647-1754-4431-8579-6fdd8337d31b",
            "actions": [
              {
                "uuid": "605e9b37-ad71-4b29-94dd-7dce0a776c30",
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
                "uuid": "12afddab-a416-4b39-9714-a58c3418c16c",
                "destination_uuid": "2f4a4cd3-1a8d-428c-a8a6-2f09ad2f6c99"
              }
            ]
          },
          {
            "uuid": "2f4a4cd3-1a8d-428c-a8a6-2f09ad2f6c99",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8979ee00-77da-419a-b4fe-b89ea4ce1b38",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "3c728d57-483c-4d6b-912e-4a0b504585a8",
                  "type": "has_only_phrase",
                  "uuid": "af886308-e01d-45d4-8ec1-180cdea0bbf0"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "3c728d57-483c-4d6b-912e-4a0b504585a8",
                  "type": "has_only_phrase",
                  "uuid": "9908bc48-d036-44ed-b3bf-a7d692314713"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "543faa63-5c6b-4ded-b3e7-20a26187b33f",
                  "type": "has_only_phrase",
                  "uuid": "e2baf377-8ab8-425f-811a-a3cfc750770c"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "543faa63-5c6b-4ded-b3e7-20a26187b33f",
                  "type": "has_only_phrase",
                  "uuid": "250e2b74-5a3c-43a4-8bf3-ed3df0d81e30"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "543faa63-5c6b-4ded-b3e7-20a26187b33f",
                  "type": "has_only_phrase",
                  "uuid": "1ab1babe-bbb7-4c3d-a10e-67d052ed3733"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "543faa63-5c6b-4ded-b3e7-20a26187b33f",
                  "type": "has_only_phrase",
                  "uuid": "eb9591d7-ed87-4215-8d6d-752584bc6b20"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "543faa63-5c6b-4ded-b3e7-20a26187b33f",
                  "type": "has_only_phrase",
                  "uuid": "1f04f4ce-a243-4004-b11b-a74d6fb8db57"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "543faa63-5c6b-4ded-b3e7-20a26187b33f",
                  "type": "has_only_phrase",
                  "uuid": "b099fc21-d3f5-41fb-94ab-64a3b1a7fb18"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a3158299-90ab-47c4-b80f-532c6fff91d3",
                  "name": "All Responses",
                  "uuid": "8979ee00-77da-419a-b4fe-b89ea4ce1b38"
                },
                {
                  "exit_uuid": "f43c50c8-f1d6-43f7-9911-a6d00fe680ba",
                  "name": "0;1",
                  "uuid": "3c728d57-483c-4d6b-912e-4a0b504585a8"
                },
                {
                  "exit_uuid": "bad38c86-34d3-4fc2-b2a4-b52488557d07",
                  "name": "2;3;4;5;6;7",
                  "uuid": "543faa63-5c6b-4ded-b3e7-20a26187b33f"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "a3158299-90ab-47c4-b80f-532c6fff91d3",
                "destination_uuid": null
              },
              {
                "uuid": "f43c50c8-f1d6-43f7-9911-a6d00fe680ba",
                "destination_uuid": "897ad5f2-5fe5-4c99-a28a-d23be56b4864"
              },
              {
                "uuid": "bad38c86-34d3-4fc2-b2a4-b52488557d07",
                "destination_uuid": "47516987-fc2b-4010-a31c-4f40ddfa86a3"
              }
            ]
          },
          {
            "uuid": "897ad5f2-5fe5-4c99-a28a-d23be56b4864",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "157c7468-1abc-4eeb-aa8d-c81bf8afa93b"
              }
            ],
            "exits": [
              {
                "uuid": "fbbabedb-f074-439a-8a17-7ba5e3ee830c",
                "destination_uuid": "000a0904-37cd-411b-a87d-20d8295c2773"
              }
            ]
          },
          {
            "uuid": "47516987-fc2b-4010-a31c-4f40ddfa86a3",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "fb758090-c07b-4e92-923b-2f054e294557"
              }
            ],
            "exits": [
              {
                "uuid": "2d2d9441-d811-4c77-851f-c51d2a3c8915",
                "destination_uuid": "000a0904-37cd-411b-a87d-20d8295c2773"
              }
            ]
          },
          {
            "uuid": "000a0904-37cd-411b-a87d-20d8295c2773",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "45840e1a-66eb-4246-b8a8-0ccb8de51595",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "ae823859-e169-429e-9c1c-ba2341b83e0d",
                  "type": "has_only_phrase",
                  "uuid": "77f1ca0b-d5a2-44a5-b72c-680777a8be35"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "daa58337-c1ae-4608-87ce-3e1f293ec8a4",
                  "name": "All Responses",
                  "uuid": "45840e1a-66eb-4246-b8a8-0ccb8de51595"
                },
                {
                  "exit_uuid": "edce84dd-bc87-4d31-b076-ca78608c9bf9",
                  "name": "Next",
                  "uuid": "ae823859-e169-429e-9c1c-ba2341b83e0d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "daa58337-c1ae-4608-87ce-3e1f293ec8a4",
                "destination_uuid": null
              },
              {
                "uuid": "edce84dd-bc87-4d31-b076-ca78608c9bf9",
                "destination_uuid": "db433b70-1961-40b7-aa34-26ea1ef08d61"
              }
            ]
          },
          {
            "uuid": "db433b70-1961-40b7-aa34-26ea1ef08d61",
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
                "uuid": "b01f4c9b-cfc0-4f0a-b3aa-22d27840b933"
              }
            ],
            "exits": [
              {
                "uuid": "395618f2-1d7d-4b3c-94d1-0f976381f8f5",
                "destination_uuid": "616c2813-bf70-4c88-a34c-83a8fcee5f4d"
              }
            ]
          },
          {
            "uuid": "616c2813-bf70-4c88-a34c-83a8fcee5f4d",
            "actions": [],
            "exits": [
              {
                "uuid": "9f75d6e8-aaeb-470f-bd53-f01cdb04b964",
                "destination_uuid": "e4c46c6f-81c3-4409-8c08-46bcfee21a76"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "83ce645f-206a-4e2b-9cb6-665d252cb08f",
              "cases": [],
              "categories": [
                {
                  "uuid": "83ce645f-206a-4e2b-9cb6-665d252cb08f",
                  "name": "All Responses",
                  "exit_uuid": "9f75d6e8-aaeb-470f-bd53-f01cdb04b964"
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
            "uuid": "e4c46c6f-81c3-4409-8c08-46bcfee21a76",
            "actions": [
              {
                "uuid": "fb8abd33-8a5f-4934-a3d6-de43fbeabbb3",
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
                "uuid": "23231ccc-baec-42c9-8ac2-d5d588f4a488",
                "destination_uuid": "0668a8dc-26a6-4cd6-bf21-faa9e26d885f"
              }
            ]
          },
          {
            "uuid": "76acc73c-96d4-415d-8a91-4b3ba4240d09",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "e9fa629f-adf4-442a-9260-6d07b6929c22"
              }
            ],
            "exits": [
              {
                "uuid": "3fa414b4-c575-40c6-baf9-1c4b42352269",
                "destination_uuid": "9ba33874-00c8-4a44-b255-68b4595a05b8"
              }
            ]
          },
          {
            "uuid": "0668a8dc-26a6-4cd6-bf21-faa9e26d885f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "379d141b-f655-43e6-9b64-b83eda975e46",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "ac1672e8-c7b1-4ceb-82d6-9b45b87caef8",
                  "type": "has_only_phrase",
                  "uuid": "345ab23a-c080-4e6a-8030-6dbdb26b1c1d"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "ac1672e8-c7b1-4ceb-82d6-9b45b87caef8",
                  "type": "has_only_phrase",
                  "uuid": "49d25bfe-7503-41d5-8cc5-b46e56e88632"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "ac1672e8-c7b1-4ceb-82d6-9b45b87caef8",
                  "type": "has_only_phrase",
                  "uuid": "fb3adf62-0e86-4260-93bf-9f7e08295f90"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "ac1672e8-c7b1-4ceb-82d6-9b45b87caef8",
                  "type": "has_only_phrase",
                  "uuid": "cd101f10-7ec3-48d6-8432-74e4d2777608"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "ac1672e8-c7b1-4ceb-82d6-9b45b87caef8",
                  "type": "has_only_phrase",
                  "uuid": "85515c88-a58d-45df-845e-90f0e2df3174"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "ac1672e8-c7b1-4ceb-82d6-9b45b87caef8",
                  "type": "has_only_phrase",
                  "uuid": "8ed8e321-b608-4026-9051-4d62c8da1029"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "ac1672e8-c7b1-4ceb-82d6-9b45b87caef8",
                  "type": "has_only_phrase",
                  "uuid": "83477349-b6e4-4c71-a082-eaa1e02d495f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7f0786a4-bad9-4f7d-85a9-0b8a0b0fed19",
                  "name": "All Responses",
                  "uuid": "379d141b-f655-43e6-9b64-b83eda975e46"
                },
                {
                  "exit_uuid": "f563204f-9266-4759-82f8-567fd29fdc7d",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "ac1672e8-c7b1-4ceb-82d6-9b45b87caef8"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "7f0786a4-bad9-4f7d-85a9-0b8a0b0fed19",
                "destination_uuid": "76acc73c-96d4-415d-8a91-4b3ba4240d09"
              },
              {
                "uuid": "f563204f-9266-4759-82f8-567fd29fdc7d",
                "destination_uuid": "478218b5-3e6a-4dbd-b82d-c6cc6a80fb66"
              }
            ]
          },
          {
            "uuid": "478218b5-3e6a-4dbd-b82d-c6cc6a80fb66",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "17e88cbe-4807-416d-8dc3-bef5eeebf790"
              }
            ],
            "exits": [
              {
                "uuid": "e039a336-d34d-41db-9601-e2a780b45217",
                "destination_uuid": "9ba33874-00c8-4a44-b255-68b4595a05b8"
              }
            ]
          },
          {
            "uuid": "9ba33874-00c8-4a44-b255-68b4595a05b8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "97af2602-3949-49ee-96b5-548958a16de3",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "1bd824c1-7f39-428b-ab46-85e82cae1a09",
                  "type": "has_only_phrase",
                  "uuid": "81ef4cf3-9ab1-44f0-8dc3-b40458bb2c95"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1a4bd61f-a4ea-4dc7-a221-9b61c7d5ee44",
                  "name": "All Responses",
                  "uuid": "97af2602-3949-49ee-96b5-548958a16de3"
                },
                {
                  "exit_uuid": "53cf54c9-a8fd-4c9e-bb14-95de5b805f47",
                  "name": "Next",
                  "uuid": "1bd824c1-7f39-428b-ab46-85e82cae1a09"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1a4bd61f-a4ea-4dc7-a221-9b61c7d5ee44",
                "destination_uuid": null
              },
              {
                "uuid": "53cf54c9-a8fd-4c9e-bb14-95de5b805f47",
                "destination_uuid": "b4857004-547b-4389-88b0-c8d93557080e"
              }
            ]
          },
          {
            "uuid": "b4857004-547b-4389-88b0-c8d93557080e",
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
                "uuid": "a6957f96-71a1-4567-a098-069824029166"
              }
            ],
            "exits": [
              {
                "uuid": "be3fd4f2-9a96-4156-b1e9-9dbe3734fc10",
                "destination_uuid": "75cad094-b772-435e-8c7d-dc1bf078e861"
              }
            ]
          },
          {
            "uuid": "75cad094-b772-435e-8c7d-dc1bf078e861",
            "actions": [],
            "exits": [
              {
                "uuid": "cdd66bc0-136d-478c-bc21-804a0441a69e",
                "destination_uuid": "6865358e-cee1-41d2-a451-e86b82d05549"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ffd44300-c031-4ae7-a652-bc3ae0030478",
              "cases": [],
              "categories": [
                {
                  "uuid": "ffd44300-c031-4ae7-a652-bc3ae0030478",
                  "name": "All Responses",
                  "exit_uuid": "cdd66bc0-136d-478c-bc21-804a0441a69e"
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
            "uuid": "6865358e-cee1-41d2-a451-e86b82d05549",
            "actions": [
              {
                "uuid": "bb727db8-4ba5-4422-9ea7-67d5a4fed7f3",
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
                "uuid": "705376c6-9079-4248-8040-2d7303e0fc1f",
                "destination_uuid": "2803d29b-e27f-4b91-8f80-e82b6e608da7"
              }
            ]
          },
          {
            "uuid": "2803d29b-e27f-4b91-8f80-e82b6e608da7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "732963fd-48d2-4d36-a7df-ea7cb53d85fd",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "a4132d6a-9db5-4914-b5fe-307118222cc4",
                  "type": "has_only_phrase",
                  "uuid": "fdf91b94-1857-49b5-ad58-2ca4e30c9c2f"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "a4132d6a-9db5-4914-b5fe-307118222cc4",
                  "type": "has_only_phrase",
                  "uuid": "52b9cf69-a395-4aa6-88ff-21f595425086"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "a4132d6a-9db5-4914-b5fe-307118222cc4",
                  "type": "has_only_phrase",
                  "uuid": "15ead668-4ebc-4bf6-8159-1a70d051a747"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "a4132d6a-9db5-4914-b5fe-307118222cc4",
                  "type": "has_only_phrase",
                  "uuid": "49d87db2-155c-475d-b01c-947a1a7fa5f3"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "a4132d6a-9db5-4914-b5fe-307118222cc4",
                  "type": "has_only_phrase",
                  "uuid": "3ac6b829-37ff-488b-b8ff-d587a7ea373d"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "96a9adcd-c57e-4af0-966f-b5e2ac0b7ac5",
                  "type": "has_only_phrase",
                  "uuid": "5246c755-c0b7-41c6-9d9e-9f69a7e78e75"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "96a9adcd-c57e-4af0-966f-b5e2ac0b7ac5",
                  "type": "has_only_phrase",
                  "uuid": "34447f8a-23b5-4190-a541-bbf8beed83d4"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "96a9adcd-c57e-4af0-966f-b5e2ac0b7ac5",
                  "type": "has_only_phrase",
                  "uuid": "a15fa550-3609-4b45-b96a-6e5ff068e2d2"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "96a9adcd-c57e-4af0-966f-b5e2ac0b7ac5",
                  "type": "has_only_phrase",
                  "uuid": "80e9c9e5-94ad-439f-8604-4138f70db200"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1bc1d229-fa04-4491-9b4a-6075e8404a43",
                  "name": "All Responses",
                  "uuid": "732963fd-48d2-4d36-a7df-ea7cb53d85fd"
                },
                {
                  "exit_uuid": "b700b932-ec1a-4ab8-b8e5-97c43b802d70",
                  "name": "0;1;2;3;4",
                  "uuid": "a4132d6a-9db5-4914-b5fe-307118222cc4"
                },
                {
                  "exit_uuid": "b6a1f835-a186-46a3-a6b3-9a42101d9f8c",
                  "name": "5;6;7;8",
                  "uuid": "96a9adcd-c57e-4af0-966f-b5e2ac0b7ac5"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "1bc1d229-fa04-4491-9b4a-6075e8404a43",
                "destination_uuid": null
              },
              {
                "uuid": "b700b932-ec1a-4ab8-b8e5-97c43b802d70",
                "destination_uuid": "f8f4b91e-8641-4e8c-9e5d-e7a7ac3bfc6e"
              },
              {
                "uuid": "b6a1f835-a186-46a3-a6b3-9a42101d9f8c",
                "destination_uuid": "273767db-d8ec-48ae-9fdb-8fe875ca5f9e"
              }
            ]
          },
          {
            "uuid": "f8f4b91e-8641-4e8c-9e5d-e7a7ac3bfc6e",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "41492a4e-f3c5-4a12-bb86-509f6703efc2"
              }
            ],
            "exits": [
              {
                "uuid": "0cb2b201-2678-4f20-bd26-5370da9ae258",
                "destination_uuid": "23525be9-352b-440e-ba50-9e1d62c20912"
              }
            ]
          },
          {
            "uuid": "273767db-d8ec-48ae-9fdb-8fe875ca5f9e",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "8e1fa3b6-1ecd-4560-8cb7-6480acf8c8c7"
              }
            ],
            "exits": [
              {
                "uuid": "15f32af5-7360-4b5c-a0e3-1da84900cc69",
                "destination_uuid": "23525be9-352b-440e-ba50-9e1d62c20912"
              }
            ]
          },
          {
            "uuid": "23525be9-352b-440e-ba50-9e1d62c20912",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f7a51552-95b5-457c-9eef-3eaff1c6f996",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "1382d019-a880-42dd-9cee-5670af5ec2be",
                  "type": "has_only_phrase",
                  "uuid": "c08bc04c-3799-4f0c-858d-09d5cfc51076"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e538dccf-05b5-4e80-bb72-55cc9c8ba98f",
                  "name": "All Responses",
                  "uuid": "f7a51552-95b5-457c-9eef-3eaff1c6f996"
                },
                {
                  "exit_uuid": "9e0f4723-3e9e-46c4-8bb2-ea775946885d",
                  "name": "Next",
                  "uuid": "1382d019-a880-42dd-9cee-5670af5ec2be"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e538dccf-05b5-4e80-bb72-55cc9c8ba98f",
                "destination_uuid": null
              },
              {
                "uuid": "9e0f4723-3e9e-46c4-8bb2-ea775946885d",
                "destination_uuid": "f969ec66-45bc-4c6b-8438-d47efe8902fb"
              }
            ]
          },
          {
            "uuid": "f969ec66-45bc-4c6b-8438-d47efe8902fb",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "b59e8bb8-6894-4a8e-9493-c94d23f492dd"
              }
            ],
            "exits": [
              {
                "uuid": "05fb80f1-1f88-4f92-9d16-071bb8adbafe",
                "destination_uuid": "ded2dcda-d6e7-4457-8fb2-3fb7e5e85e58"
              }
            ]
          },
          {
            "uuid": "ded2dcda-d6e7-4457-8fb2-3fb7e5e85e58",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ed521206-09fe-4654-891a-804f7a64b01e",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "50ed7f7c-78af-4489-a544-af8a456bd6b4",
                  "type": "has_only_phrase",
                  "uuid": "ad7670ef-0fee-442b-af1c-15ed764ba0a5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5a681d1b-a569-4814-8647-1a3b9c455eb3",
                  "name": "All Responses",
                  "uuid": "ed521206-09fe-4654-891a-804f7a64b01e"
                },
                {
                  "exit_uuid": "4776aac9-81ef-4c74-b5cd-2a93c84f0eeb",
                  "name": "Next",
                  "uuid": "50ed7f7c-78af-4489-a544-af8a456bd6b4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5a681d1b-a569-4814-8647-1a3b9c455eb3",
                "destination_uuid": null
              },
              {
                "uuid": "4776aac9-81ef-4c74-b5cd-2a93c84f0eeb",
                "destination_uuid": "24a9ba0e-df6e-46ce-b52a-99ba2cd90e60"
              }
            ]
          },
          {
            "uuid": "24a9ba0e-df6e-46ce-b52a-99ba2cd90e60",
            "actions": [
              {
                "uuid": "b1d12f61-52a7-478c-97b6-91a33f4d7473",
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
                "uuid": "eacab1b1-7f49-4b50-a869-cab4a2dd05d6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "45e871a8-dd13-4870-9658-620702daec2e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5b5a6822-6b43-4d21-982b-f11b7afd9896",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "1c1ca0c8-63e8-44c5-9a80-b8cc76851be7"
              }
            ],
            "exits": [
              {
                "uuid": "90da3900-6ee6-4d72-892f-28174cd0bf5b",
                "destination_uuid": "86142265-dffa-455d-84bc-6103371ec0b8"
              }
            ]
          },
          {
            "uuid": "86142265-dffa-455d-84bc-6103371ec0b8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "79ad47a9-0baa-4c8e-afe4-c29a0ec6810c",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "ad2677ba-83ab-485c-bb3d-770752226f96",
                  "type": "has_only_phrase",
                  "uuid": "ba13035b-e603-42ba-8767-7aaa04567570"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "319d82c9-48fc-4214-99fb-8ef113bd7b84",
                  "name": "All Responses",
                  "uuid": "79ad47a9-0baa-4c8e-afe4-c29a0ec6810c"
                },
                {
                  "exit_uuid": "eeb1dd69-7310-4544-ab2e-7d9321608f5e",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "ad2677ba-83ab-485c-bb3d-770752226f96"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "319d82c9-48fc-4214-99fb-8ef113bd7b84",
                "destination_uuid": null
              },
              {
                "uuid": "eeb1dd69-7310-4544-ab2e-7d9321608f5e",
                "destination_uuid": "fc5403ef-7b7d-42c7-ab00-88e48850b5b2"
              }
            ]
          },
          {
            "uuid": "fc5403ef-7b7d-42c7-ab00-88e48850b5b2",
            "actions": [
              {
                "uuid": "074f67b5-cc83-4f23-95d2-e425d7ed58a1",
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
                "uuid": "83544628-985c-4b8d-8e88-5c0ee6fb6b62",
                "destination_uuid": "3c504280-20fe-4119-970b-7f911353e65e"
              }
            ]
          },
          {
            "uuid": "3c504280-20fe-4119-970b-7f911353e65e",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "b566d80a-dcff-4a34-99bd-9b22615747ee"
                },
                "type": "enter_flow",
                "uuid": "1df782e0-d049-4c3f-aeaa-96c464f6e76f"
              }
            ],
            "exits": [
              {
                "uuid": "fdc6d60c-8f39-44d2-a523-1a4a20d67d1b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "cacc91ec-138d-451e-8876-4e762cab6d17",
            "actions": [
              {
                "uuid": "a0dd92f8-f5ed-49fa-b10e-f3c429270291",
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
                "uuid": "1826ec08-954c-4197-bf78-3001f4609f5c",
                "destination_uuid": "9079e26e-63a6-46ca-8716-4d59323fb32a"
              }
            ]
          },
          {
            "uuid": "9079e26e-63a6-46ca-8716-4d59323fb32a",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "42508468-8d14-4bd1-b5bc-04561ae00286"
                },
                "type": "enter_flow",
                "uuid": "73752ca8-c098-40d6-9a9d-0353a4ffc8ac"
              }
            ],
            "exits": [
              {
                "uuid": "1bef655b-cd9a-46d9-adbd-17d8e9f8ecd4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f35f0fa4-033a-4d19-a849-e7d1e37587d2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ae44589a-a072-4b23-8ba8-499623da6999",
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
                "uuid": "79bc4683-8735-4fa3-9c45-a48c3d7486d5"
              }
            ],
            "exits": [
              {
                "uuid": "d667f5d9-8b5b-4bc6-9b0c-4bbc478a8cb4",
                "destination_uuid": "f8160b72-7837-4596-831a-bd35304cc973"
              }
            ]
          },
          {
            "uuid": "f8160b72-7837-4596-831a-bd35304cc973",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b4e981c5-164b-4abb-a720-fb439faa5c1f",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "3d204904-b156-4a4e-a55c-08616590cda5",
                  "type": "has_only_phrase",
                  "uuid": "0015510e-3490-4a35-8d75-b283b3e049d0"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "52466269-bd70-4336-84f5-6a8cebbdc66a",
                  "type": "has_only_phrase",
                  "uuid": "fad0c32b-d867-4cd4-b3c6-4095ac0b21c2"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "52466269-bd70-4336-84f5-6a8cebbdc66a",
                  "type": "has_only_phrase",
                  "uuid": "1386976d-321b-448a-9531-7588fc7f8b1b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6ebc4b48-5da0-4dd5-82c8-1f1d31f5c36c",
                  "name": "All Responses",
                  "uuid": "b4e981c5-164b-4abb-a720-fb439faa5c1f"
                },
                {
                  "exit_uuid": "9bd3cb3b-15f0-482a-90d5-b15ff5636672",
                  "name": "Happy",
                  "uuid": "3d204904-b156-4a4e-a55c-08616590cda5"
                },
                {
                  "exit_uuid": "3a47ccaf-69d6-4b8c-814b-68084c4f6fe7",
                  "name": "Neutral; Sad",
                  "uuid": "52466269-bd70-4336-84f5-6a8cebbdc66a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6ebc4b48-5da0-4dd5-82c8-1f1d31f5c36c",
                "destination_uuid": null
              },
              {
                "uuid": "9bd3cb3b-15f0-482a-90d5-b15ff5636672",
                "destination_uuid": "34946899-0c63-4302-84e9-e8563bb2b9f8"
              },
              {
                "uuid": "3a47ccaf-69d6-4b8c-814b-68084c4f6fe7",
                "destination_uuid": "86b77ddc-c567-4545-ade6-43eceef2069b"
              }
            ]
          },
          {
            "uuid": "34946899-0c63-4302-84e9-e8563bb2b9f8",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "1b56be3c-6e53-4838-9718-9c7a832a0045"
              }
            ],
            "exits": [
              {
                "uuid": "5d8cb123-5613-4875-9f3b-e214c28d2e3f",
                "destination_uuid": "31833e1a-8626-40dd-bc71-baf31a7ea09f"
              }
            ]
          },
          {
            "uuid": "86b77ddc-c567-4545-ade6-43eceef2069b",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "11f165c5-6742-4f68-a370-9a56a66fb31a"
              }
            ],
            "exits": [
              {
                "uuid": "660cf8b2-e276-44ff-9df2-e8b2dedf5659",
                "destination_uuid": "0a92b59a-e7b1-4269-8ddb-da2057c67fd9"
              }
            ]
          },
          {
            "uuid": "0a92b59a-e7b1-4269-8ddb-da2057c67fd9",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "57cec9a4-6667-4f5f-81d6-0d38d833ee6a"
              }
            ],
            "exits": [
              {
                "uuid": "be7d660f-e296-4bb2-ba86-40687e55886a",
                "destination_uuid": "a551e78a-0c88-4f68-9ff3-fc0f56f1f002"
              }
            ]
          },
          {
            "uuid": "a551e78a-0c88-4f68-9ff3-fc0f56f1f002",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "34b40843-0835-41d5-b488-3f5baf2b187c",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "6d5c9c91-616f-4078-b490-b4ea60e39539",
                  "type": "has_only_phrase",
                  "uuid": "a771d967-bd99-40a5-8640-588a46c8cb80"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "17331027-002c-4ec0-bc16-30f0347bc3d4",
                  "type": "has_only_phrase",
                  "uuid": "8476a3df-5b05-4072-b87f-d958a100ecf7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0e0a55bf-f760-46e0-9702-71157d0e61be",
                  "name": "All Responses",
                  "uuid": "34b40843-0835-41d5-b488-3f5baf2b187c"
                },
                {
                  "exit_uuid": "5a857e2a-a02a-49f8-a5a6-9d7a441b499d",
                  "name": "Yes",
                  "uuid": "6d5c9c91-616f-4078-b490-b4ea60e39539"
                },
                {
                  "exit_uuid": "143856c9-0b86-4792-acf5-31cc3e3c8247",
                  "name": "No",
                  "uuid": "17331027-002c-4ec0-bc16-30f0347bc3d4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0e0a55bf-f760-46e0-9702-71157d0e61be",
                "destination_uuid": null
              },
              {
                "uuid": "5a857e2a-a02a-49f8-a5a6-9d7a441b499d",
                "destination_uuid": "50962407-155d-4ad2-99bd-41f0449e2a8d"
              },
              {
                "uuid": "143856c9-0b86-4792-acf5-31cc3e3c8247",
                "destination_uuid": "af134b8e-f29b-4aea-b1b2-9104d11772b6"
              }
            ]
          },
          {
            "uuid": "50962407-155d-4ad2-99bd-41f0449e2a8d",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "1d365380-662a-4c3e-94bc-f2c1b500b267"
                },
                "type": "enter_flow",
                "uuid": "f9f928ad-a440-442f-bc28-dacfd6d20d9c"
              }
            ],
            "exits": [
              {
                "uuid": "a298c2b0-72d6-40c5-8803-472cd6d54b32",
                "destination_uuid": "05ce0308-cbd8-40df-8c4b-29c7b2ebeb8e"
              },
              {
                "uuid": "dcc2664c-a514-4b0b-8655-961b69745760",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "a1d5d9c9-226b-4f78-b267-82c19c4ebb69",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "593bda46-75c8-4bf3-b680-850db9f82006"
                },
                {
                  "uuid": "12fa08f9-3a73-451d-a876-43cb96ec71d8",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "6bb1b9de-b261-403c-bc3e-069cb49a2b9f"
                }
              ],
              "categories": [
                {
                  "uuid": "593bda46-75c8-4bf3-b680-850db9f82006",
                  "name": "Complete",
                  "exit_uuid": "a298c2b0-72d6-40c5-8803-472cd6d54b32"
                },
                {
                  "uuid": "6bb1b9de-b261-403c-bc3e-069cb49a2b9f",
                  "name": "Expired",
                  "exit_uuid": "dcc2664c-a514-4b0b-8655-961b69745760"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "593bda46-75c8-4bf3-b680-850db9f82006"
            }
          },
          {
            "uuid": "05ce0308-cbd8-40df-8c4b-29c7b2ebeb8e",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e0a40445-f1a3-497b-bb09-8d3fb596902a"
              }
            ],
            "exits": [
              {
                "uuid": "1362c941-b68c-4b7b-8a24-75f6850cabce",
                "destination_uuid": "1279f049-3905-4339-bbcb-205027f26c1e"
              }
            ]
          },
          {
            "uuid": "1279f049-3905-4339-bbcb-205027f26c1e",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "59fa864d-ec33-4a95-9a3b-ff4b8b333f8a"
              }
            ],
            "exits": [
              {
                "uuid": "da03280c-68a2-46cf-8b87-db36c444f6d7",
                "destination_uuid": "31833e1a-8626-40dd-bc71-baf31a7ea09f"
              }
            ]
          },
          {
            "uuid": "af134b8e-f29b-4aea-b1b2-9104d11772b6",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "d2ad5d97-cc59-448c-9d21-e1612df2ec82"
              }
            ],
            "exits": [
              {
                "uuid": "8ab30caa-0304-49c7-a8dd-9027557b7d05",
                "destination_uuid": "31833e1a-8626-40dd-bc71-baf31a7ea09f"
              }
            ]
          },
          {
            "uuid": "31833e1a-8626-40dd-bc71-baf31a7ea09f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "aec11404-b711-4285-b790-82bc6f528b75",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "3262b506-5e18-4d75-8b54-321b9cfd4fe8",
                  "type": "has_only_phrase",
                  "uuid": "4662ac77-6158-48b0-af41-bd4e3ae62f09"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3250f3d8-d5b7-4865-ade9-6157e80f41e2",
                  "name": "All Responses",
                  "uuid": "aec11404-b711-4285-b790-82bc6f528b75"
                },
                {
                  "exit_uuid": "ff5509bc-c508-4a97-bd5b-1ce815c9e3a5",
                  "name": "Chat to @fields.elder",
                  "uuid": "3262b506-5e18-4d75-8b54-321b9cfd4fe8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3250f3d8-d5b7-4865-ade9-6157e80f41e2",
                "destination_uuid": null
              },
              {
                "uuid": "ff5509bc-c508-4a97-bd5b-1ce815c9e3a5",
                "destination_uuid": "2c4261f6-6520-4caa-95ba-dbd2bc079a0c"
              }
            ]
          },
          {
            "uuid": "2c4261f6-6520-4caa-95ba-dbd2bc079a0c",
            "actions": [
              {
                "uuid": "49999082-cc73-4eb2-ad3e-ee4213978556",
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
                "uuid": "9643c981-b171-4576-bb46-8edfaa7565f9",
                "destination_uuid": "826b7b0a-7653-49e4-a789-a360253411c4"
              }
            ]
          },
          {
            "uuid": "826b7b0a-7653-49e4-a789-a360253411c4",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "a1360823-7dc7-40c9-99ed-7479b4104c06"
                },
                "type": "enter_flow",
                "uuid": "7413a47f-17d8-47f5-be35-fc0c8100737b"
              }
            ],
            "exits": [
              {
                "uuid": "b4c08b01-0ea5-49bd-853e-e71f86692a5f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5fd69362-0e0c-4f1f-9a9c-3dac6b39b29f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2439211e-189c-4fde-b435-7b9a137e7a7f",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "174882d1-2a14-4a16-9687-5d8e65fb09c1"
              }
            ],
            "exits": [
              {
                "uuid": "f9aa7621-b301-4555-8734-0eff3a8d05dc",
                "destination_uuid": "991ecd4c-18cb-4c0e-993a-9230b6874cbe"
              }
            ]
          },
          {
            "uuid": "991ecd4c-18cb-4c0e-993a-9230b6874cbe",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "24a4df14-a962-4fbe-8ecd-169c6d4b9a2e"
              }
            ],
            "exits": [
              {
                "uuid": "6761f044-4123-4e02-8486-04c939ee7104",
                "destination_uuid": "cd680cef-17ef-40e6-b24f-737e34acc955"
              }
            ]
          },
          {
            "uuid": "cd680cef-17ef-40e6-b24f-737e34acc955",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c0c964eb-7634-48c8-8578-beaee53b2bf1"
              }
            ],
            "exits": [
              {
                "uuid": "9bfdca74-1bf7-4656-867a-3f94fa26c1b7",
                "destination_uuid": "8d04a7bc-98ee-42e0-8934-ef57a06b15ce"
              }
            ]
          },
          {
            "uuid": "8d04a7bc-98ee-42e0-8934-ef57a06b15ce",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "829a4528-aa15-4f15-8083-2cd75de27e5b",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "853930e7-084a-46e2-bbbe-7b5e3058ebf8",
                  "type": "has_only_phrase",
                  "uuid": "0c686e3e-63be-4d16-b451-1a00291afb59"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "b8c52203-2b05-49c1-8e82-c43390d72287",
                  "type": "has_only_phrase",
                  "uuid": "e3a3f624-8390-4fb8-b53d-c7cf5b4e0e33"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "581cc6f5-235f-45fe-bed3-1112b2300648",
                  "name": "All Responses",
                  "uuid": "829a4528-aa15-4f15-8083-2cd75de27e5b"
                },
                {
                  "exit_uuid": "54e414d5-fb0f-43ce-a946-f95efc6bbb3c",
                  "name": "Yes",
                  "uuid": "853930e7-084a-46e2-bbbe-7b5e3058ebf8"
                },
                {
                  "exit_uuid": "ee441dd2-0ee5-451d-9f77-c279f4208172",
                  "name": "No",
                  "uuid": "b8c52203-2b05-49c1-8e82-c43390d72287"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "581cc6f5-235f-45fe-bed3-1112b2300648",
                "destination_uuid": null
              },
              {
                "uuid": "54e414d5-fb0f-43ce-a946-f95efc6bbb3c",
                "destination_uuid": "e861aea9-fd3b-4bd3-ad96-f38fc27b507e"
              },
              {
                "uuid": "ee441dd2-0ee5-451d-9f77-c279f4208172",
                "destination_uuid": "4c2a730d-56e5-4f05-ba63-d10013cf29d1"
              }
            ]
          },
          {
            "uuid": "e861aea9-fd3b-4bd3-ad96-f38fc27b507e",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f9143bc1-064d-4343-baf1-0819add65ea7"
              }
            ],
            "exits": [
              {
                "uuid": "bd49bfd2-c7f8-401d-b697-ebac796ec063",
                "destination_uuid": "25a2c44b-6b2d-42e0-9e03-ede2d3e0792e"
              }
            ]
          },
          {
            "uuid": "4c2a730d-56e5-4f05-ba63-d10013cf29d1",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a1d8fc40-a4a7-4942-a32e-e8a66ef6a60b"
              }
            ],
            "exits": [
              {
                "uuid": "c25825b1-5416-4850-b067-ca0d9ac4ccd9",
                "destination_uuid": "25a2c44b-6b2d-42e0-9e03-ede2d3e0792e"
              }
            ]
          },
          {
            "uuid": "25a2c44b-6b2d-42e0-9e03-ede2d3e0792e",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d4591b75-2903-4591-bd2a-03065abe96ff"
              }
            ],
            "exits": [
              {
                "uuid": "b9332e06-34a2-41f1-85ec-5a4ecba57435",
                "destination_uuid": "033c7dfb-2c8d-4420-9165-d668e01ce57f"
              }
            ]
          },
          {
            "uuid": "033c7dfb-2c8d-4420-9165-d668e01ce57f",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "075348a8-12d8-4db3-9e9f-7a73ff9a612c"
              }
            ],
            "exits": [
              {
                "uuid": "44c2927f-b9b4-4dd3-a2e2-95465597f7cc",
                "destination_uuid": "8f04de02-1cc4-47d9-abc0-1c6e90e7cb87"
              }
            ]
          },
          {
            "uuid": "8f04de02-1cc4-47d9-abc0-1c6e90e7cb87",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0bb732dc-2692-4a73-b782-7ca4c84f06d1",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "90e5c9e4-7dfa-4166-adeb-7bd89bb9e9da",
                  "type": "has_only_phrase",
                  "uuid": "16cfe94f-be4c-4670-9bde-dbe1b515d6ef"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "30715434-3a33-4e72-87af-281bae928bfa",
                  "type": "has_only_phrase",
                  "uuid": "76b56abb-24c6-4bc5-8920-92b54a538fb5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c45eb71d-686e-43c1-b965-03fbcff6a894",
                  "name": "All Responses",
                  "uuid": "0bb732dc-2692-4a73-b782-7ca4c84f06d1"
                },
                {
                  "exit_uuid": "4dbce345-c24e-4f5f-b75f-0cda54f6af0a",
                  "name": "Yes",
                  "uuid": "90e5c9e4-7dfa-4166-adeb-7bd89bb9e9da"
                },
                {
                  "exit_uuid": "adc3ab92-f3c7-4b78-a227-33e7bc9b4bbe",
                  "name": "Later",
                  "uuid": "30715434-3a33-4e72-87af-281bae928bfa"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c45eb71d-686e-43c1-b965-03fbcff6a894",
                "destination_uuid": null
              },
              {
                "uuid": "4dbce345-c24e-4f5f-b75f-0cda54f6af0a",
                "destination_uuid": "5a58d159-5582-4a21-a7c1-8318c5edcb80"
              },
              {
                "uuid": "adc3ab92-f3c7-4b78-a227-33e7bc9b4bbe",
                "destination_uuid": "1de9d535-66be-4c62-a67e-a888ae090bc9"
              }
            ]
          },
          {
            "uuid": "5a58d159-5582-4a21-a7c1-8318c5edcb80",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "a350487f-8135-4c11-be12-df7aa48a5d5a"
              }
            ],
            "exits": [
              {
                "uuid": "242a6eb7-18ae-424d-8029-383a3e83515b",
                "destination_uuid": "276a4664-7433-4319-9329-a1c763c5d3c2"
              }
            ]
          },
          {
            "uuid": "276a4664-7433-4319-9329-a1c763c5d3c2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "65dd03f9-f4e3-4dd6-a198-c9fbbaa4b684",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "83afb7e4-6f2b-4666-859a-5759d7190765",
                  "type": "has_only_phrase",
                  "uuid": "5a69f2a8-cfd3-451e-9ec4-be523b598121"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "458bc7d8-61fc-4077-9a72-ff063aed719c",
                  "name": "All Responses",
                  "uuid": "65dd03f9-f4e3-4dd6-a198-c9fbbaa4b684"
                },
                {
                  "exit_uuid": "3716605e-d37d-4eef-a209-c05d3998e9a5",
                  "name": "Take me to Tips",
                  "uuid": "83afb7e4-6f2b-4666-859a-5759d7190765"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "458bc7d8-61fc-4077-9a72-ff063aed719c",
                "destination_uuid": null
              },
              {
                "uuid": "3716605e-d37d-4eef-a209-c05d3998e9a5",
                "destination_uuid": "b573d2c5-c1b2-4b27-a150-34c31b259104"
              }
            ]
          },
          {
            "uuid": "b573d2c5-c1b2-4b27-a150-34c31b259104",
            "actions": [
              {
                "uuid": "04b38ec5-88e0-4ea1-bc05-b1b14fc86542",
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
                "uuid": "cf536667-a17e-4648-99f5-a32b57d4655b",
                "destination_uuid": "09df1b64-fb5c-4daa-ae9d-f2f5c184c131"
              }
            ]
          },
          {
            "uuid": "09df1b64-fb5c-4daa-ae9d-f2f5c184c131",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "5aef55cf-6d27-449c-a37e-5856da561918"
                },
                "type": "enter_flow",
                "uuid": "29570fc9-409f-448b-846d-fcbc9b69b942"
              }
            ],
            "exits": [
              {
                "uuid": "c716f2f1-6be4-4e7b-b605-48eac99c155b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1de9d535-66be-4c62-a67e-a888ae090bc9",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "42fdc299-4caa-44a3-b71d-ba067e145550"
              }
            ],
            "exits": [
              {
                "uuid": "ec965368-6797-44ae-ba39-0fddbf17e6ec",
                "destination_uuid": "27d9ddeb-18e1-4d47-9082-2b18a20d4a2f"
              }
            ]
          },
          {
            "uuid": "27d9ddeb-18e1-4d47-9082-2b18a20d4a2f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "893d0558-532c-4776-800f-040009fcc9e6",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "848da6d8-be5d-4a5b-a53f-788fb89b89af",
                  "type": "has_only_phrase",
                  "uuid": "5f661115-6d18-4e7c-ad43-3355ca4d8bf4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "38743651-e5f2-4790-9c6a-30038b10937b",
                  "name": "All Responses",
                  "uuid": "893d0558-532c-4776-800f-040009fcc9e6"
                },
                {
                  "exit_uuid": "80a4e7ed-e9f8-49c5-8aed-ccb4192f78eb",
                  "name": "Take me to the home screen",
                  "uuid": "848da6d8-be5d-4a5b-a53f-788fb89b89af"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "38743651-e5f2-4790-9c6a-30038b10937b",
                "destination_uuid": null
              },
              {
                "uuid": "80a4e7ed-e9f8-49c5-8aed-ccb4192f78eb",
                "destination_uuid": "112c383d-7aa2-461e-bf7e-31af76160574"
              }
            ]
          },
          {
            "uuid": "112c383d-7aa2-461e-bf7e-31af76160574",
            "actions": [
              {
                "uuid": "55ae9839-1ea8-40e7-aa80-51db63bcad80",
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
                "uuid": "7335ed27-6205-4712-8c90-0ce807acb29f",
                "destination_uuid": "42c18a26-96b0-4a78-9d33-340295b52fc2"
              }
            ]
          },
          {
            "uuid": "42c18a26-96b0-4a78-9d33-340295b52fc2",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "f0d85c3a-eb79-40ec-9380-165b24cf5e37"
                },
                "type": "enter_flow",
                "uuid": "96ac6384-db4c-4d89-b825-6c0011539551"
              }
            ],
            "exits": [
              {
                "uuid": "5c70079e-1108-4af3-b99c-ca94106a3ef2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "74edf1f3-1f26-4e87-b8e8-5f4c45186fd9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "40da71b9-3edd-4c5a-a2e6-dec9ff7f5d67",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "133c4926-9148-4e3f-8c97-6a5c2f20ee9b"
              }
            ],
            "exits": [
              {
                "uuid": "fc615be2-3222-46f7-b214-c6af79cbd762",
                "destination_uuid": "11eef5b3-5515-4b8f-ac94-b87703531c31"
              }
            ]
          },
          {
            "uuid": "11eef5b3-5515-4b8f-ac94-b87703531c31",
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
                "uuid": "0b9159b1-f033-4501-80ab-b31b10ad54db"
              }
            ],
            "exits": [
              {
                "uuid": "a82d8f00-979f-48d6-ad33-dcaeb0fd1447",
                "destination_uuid": "29b69aac-8fb3-4bda-ae87-a3a0afacaaf3"
              }
            ]
          },
          {
            "uuid": "29b69aac-8fb3-4bda-ae87-a3a0afacaaf3",
            "actions": [],
            "exits": [
              {
                "uuid": "28d3c407-5715-49e8-83c8-d4bad7e31371",
                "destination_uuid": "3d93d9de-a9e5-4e40-b559-d880d5673e67"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "54d465f4-0f0c-44cd-9cce-58dc9b352f7c",
              "cases": [],
              "categories": [
                {
                  "uuid": "54d465f4-0f0c-44cd-9cce-58dc9b352f7c",
                  "name": "All Responses",
                  "exit_uuid": "28d3c407-5715-49e8-83c8-d4bad7e31371"
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
            "uuid": "3d93d9de-a9e5-4e40-b559-d880d5673e67",
            "actions": [
              {
                "uuid": "273f3f84-dce1-4003-9222-9cb9ff3d88ee",
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
                "uuid": "935d45a6-f7f3-4405-981a-f85d0fd41816",
                "destination_uuid": "ec27f8ec-9397-4955-af29-89dfdb198288"
              }
            ]
          },
          {
            "uuid": "ec27f8ec-9397-4955-af29-89dfdb198288",
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
                "uuid": "ccfec980-6c32-42d3-a32a-453a45344094"
              }
            ],
            "exits": [
              {
                "uuid": "984f5389-a0b7-49a7-a646-359f25e52f0a",
                "destination_uuid": "3b5c3fba-b867-462e-8fbe-7d6e2e28d189"
              }
            ]
          },
          {
            "uuid": "3b5c3fba-b867-462e-8fbe-7d6e2e28d189",
            "actions": [],
            "exits": [
              {
                "uuid": "647af3f6-5812-415c-971b-58b06e18ba45",
                "destination_uuid": "3749991c-719a-4a75-adfb-5db768eee506"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e2a4967e-db3e-4956-bd6c-c7d95506010c",
              "cases": [],
              "categories": [
                {
                  "uuid": "e2a4967e-db3e-4956-bd6c-c7d95506010c",
                  "name": "All Responses",
                  "exit_uuid": "647af3f6-5812-415c-971b-58b06e18ba45"
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
            "uuid": "3749991c-719a-4a75-adfb-5db768eee506",
            "actions": [
              {
                "uuid": "e338d566-0d73-43d0-a206-c88d329b32e6",
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
                "uuid": "e1728274-47d2-45ed-aa4f-11b2114ef0d4",
                "destination_uuid": "36734d05-85f9-4143-8c31-afbc5118f348"
              }
            ]
          },
          {
            "uuid": "36734d05-85f9-4143-8c31-afbc5118f348",
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
                "uuid": "2f4237ff-b2de-4da3-8811-13943a87a081"
              }
            ],
            "exits": [
              {
                "uuid": "6f34b76b-60d4-44fd-b303-7abc4150afc6",
                "destination_uuid": "c214317a-a1fa-4f53-b353-18e503803c93"
              }
            ]
          },
          {
            "uuid": "c214317a-a1fa-4f53-b353-18e503803c93",
            "actions": [],
            "exits": [
              {
                "uuid": "845fca3f-a2a7-4910-9e56-c8e46a27f0eb",
                "destination_uuid": "c630d2f3-b63b-43aa-80d5-7ca6154d96b3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ec395e81-bff2-4c14-a811-02587e9021ca",
              "cases": [],
              "categories": [
                {
                  "uuid": "ec395e81-bff2-4c14-a811-02587e9021ca",
                  "name": "All Responses",
                  "exit_uuid": "845fca3f-a2a7-4910-9e56-c8e46a27f0eb"
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
            "uuid": "c630d2f3-b63b-43aa-80d5-7ca6154d96b3",
            "actions": [
              {
                "uuid": "7afcec21-bba6-488e-8fa4-fbce3aef9678",
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
                "uuid": "769b40f2-ab04-4f45-9cbc-e3a6f59d82d7",
                "destination_uuid": "06d22d2b-e166-4932-931b-ba4e2423c626"
              }
            ]
          },
          {
            "uuid": "06d22d2b-e166-4932-931b-ba4e2423c626",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "7c6f97b5-2899-4a4e-871e-fd44d67e156c"
              }
            ],
            "exits": [
              {
                "uuid": "703a0c30-4334-4feb-bbb0-ff1deee18f39",
                "destination_uuid": "f17b175b-11b8-4b0b-8112-2759cbc52a48"
              }
            ]
          },
          {
            "uuid": "f17b175b-11b8-4b0b-8112-2759cbc52a48",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "69bcf526-3616-4d6f-92ee-47e267b798fa",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "9e585bb2-e841-4ab7-8cbd-3b3c4be63a51",
                  "type": "has_only_phrase",
                  "uuid": "b8161952-63b3-4239-b78d-6574dd11ae42"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "feb496a8-ab81-4432-bf1b-94bb0b8eb064",
                  "name": "All Responses",
                  "uuid": "69bcf526-3616-4d6f-92ee-47e267b798fa"
                },
                {
                  "exit_uuid": "a16ca1bf-9a72-48ba-8d27-845476ac801d",
                  "name": "Take me to Homescreen",
                  "uuid": "9e585bb2-e841-4ab7-8cbd-3b3c4be63a51"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "feb496a8-ab81-4432-bf1b-94bb0b8eb064",
                "destination_uuid": null
              },
              {
                "uuid": "a16ca1bf-9a72-48ba-8d27-845476ac801d",
                "destination_uuid": "1c294986-c30c-4089-a6ed-6f4e0f0b0c14"
              }
            ]
          },
          {
            "uuid": "1c294986-c30c-4089-a6ed-6f4e0f0b0c14",
            "actions": [
              {
                "uuid": "2516e43e-8366-47f7-87a4-bdd4e2a25e3d",
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
                "uuid": "5f7c7111-beed-42a6-b909-ff714b2171a4",
                "destination_uuid": "1885735f-f588-4d91-a666-687a99ceea23"
              }
            ]
          },
          {
            "uuid": "1885735f-f588-4d91-a666-687a99ceea23",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "1a534255-f1c6-4f28-9163-ece3bc4b3e06"
                },
                "type": "enter_flow",
                "uuid": "f2770950-3ba7-48b5-be1c-ea88038b5a27"
              }
            ],
            "exits": [
              {
                "uuid": "daf88165-1ad2-4630-85db-270c8e1ccdab",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d0d777cc-350d-4c4d-81b2-ec2df6863b43",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2f7abac8-6ac1-49af-b241-73178e09122e",
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
                "uuid": "71d3a091-5c69-4773-bd4d-6a4e95c54ab5"
              }
            ],
            "exits": [
              {
                "uuid": "acf608a6-cad0-4ede-9fb4-95a0d2a67394",
                "destination_uuid": "c4db508b-ebc2-43fc-9c32-cc573ca687c8"
              }
            ]
          },
          {
            "uuid": "c4db508b-ebc2-43fc-9c32-cc573ca687c8",
            "actions": [],
            "exits": [
              {
                "uuid": "957e727e-8c5c-4692-baf3-bd854409a5d2",
                "destination_uuid": "e85d6600-dba2-438d-b5fc-71e579e16c98"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "29c8eb7a-cddf-4628-b514-5449513fc56d",
              "cases": [],
              "categories": [
                {
                  "uuid": "29c8eb7a-cddf-4628-b514-5449513fc56d",
                  "name": "All Responses",
                  "exit_uuid": "957e727e-8c5c-4692-baf3-bd854409a5d2"
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
            "uuid": "e85d6600-dba2-438d-b5fc-71e579e16c98",
            "actions": [
              {
                "uuid": "91da7c5c-d145-406b-bfca-f774fae68ddb",
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
                "uuid": "dde9af85-c018-44da-8525-28062aab7cf2",
                "destination_uuid": "3cfa513a-c928-443f-bac3-38d987b3ca54"
              }
            ]
          },
          {
            "uuid": "3cfa513a-c928-443f-bac3-38d987b3ca54",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8736b661-2485-4335-8b6b-66e348a85a6a",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "adba3ab5-1c04-4c77-a221-bc5c3393dc9d",
                  "type": "has_only_phrase",
                  "uuid": "58e271fa-ed30-498a-b8cc-ce814b12f063"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "76ff2376-1b07-4b12-b41b-bfabfc9d68b2",
                  "type": "has_only_phrase",
                  "uuid": "2718f97b-80fd-4282-bf72-b0db7a0291ac"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "a8c19b18-29e4-4309-ab35-f3dd6a3ebe54",
                  "type": "has_only_phrase",
                  "uuid": "c6850e33-cdb6-4d42-af82-7032d1cf1e85"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "80eab1e3-ef19-4663-b269-4772a2f0e287",
                  "name": "All Responses",
                  "uuid": "8736b661-2485-4335-8b6b-66e348a85a6a"
                },
                {
                  "exit_uuid": "02e414a2-65ca-4ebd-a5f1-a9bad0a4f918",
                  "name": "Great",
                  "uuid": "adba3ab5-1c04-4c77-a221-bc5c3393dc9d"
                },
                {
                  "exit_uuid": "7576e648-8a61-43fb-b69c-ae19685836bd",
                  "name": "Neutral",
                  "uuid": "76ff2376-1b07-4b12-b41b-bfabfc9d68b2"
                },
                {
                  "exit_uuid": "5effd202-cf98-431a-b2b8-111a8bd45671",
                  "name": "Bad",
                  "uuid": "a8c19b18-29e4-4309-ab35-f3dd6a3ebe54"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "80eab1e3-ef19-4663-b269-4772a2f0e287",
                "destination_uuid": null
              },
              {
                "uuid": "02e414a2-65ca-4ebd-a5f1-a9bad0a4f918",
                "destination_uuid": "3b71802d-afb4-4ed9-af1b-2fb570487293"
              },
              {
                "uuid": "7576e648-8a61-43fb-b69c-ae19685836bd",
                "destination_uuid": "7b8a0bfe-9bf8-448f-876a-0d834fc6dfc1"
              },
              {
                "uuid": "5effd202-cf98-431a-b2b8-111a8bd45671",
                "destination_uuid": "df29a554-166f-411d-8310-72f6e952b966"
              }
            ]
          },
          {
            "uuid": "3b71802d-afb4-4ed9-af1b-2fb570487293",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a186aa71-1741-46e9-8b64-7c0f016e98bd"
              }
            ],
            "exits": [
              {
                "uuid": "ac80158f-0c49-45e9-bcbf-45862768a7ac",
                "destination_uuid": "417194a8-ea46-4404-99b1-c80d0bf2175d"
              }
            ]
          },
          {
            "uuid": "7b8a0bfe-9bf8-448f-876a-0d834fc6dfc1",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9aae02d8-6046-402a-ab22-0540a85921ec"
              }
            ],
            "exits": [
              {
                "uuid": "28395bce-f614-45cc-87ba-da15fa743e55",
                "destination_uuid": "417194a8-ea46-4404-99b1-c80d0bf2175d"
              }
            ]
          },
          {
            "uuid": "417194a8-ea46-4404-99b1-c80d0bf2175d",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "fc1ea88a-7c66-48af-b982-3003cc133c00"
                },
                "type": "enter_flow",
                "uuid": "5c021b2a-d3e4-4968-a879-a61c2c95fc2a"
              }
            ],
            "exits": [
              {
                "uuid": "b9091a14-ecc5-4090-b976-0a71df86e088",
                "destination_uuid": "25133f9d-bb3b-418f-a497-9f7309c5d66b"
              },
              {
                "uuid": "08a09099-78c9-4596-b3ec-bbd323e48bb3",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1dcfda75-ca67-4810-b6f7-20fbe5778c9e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "3f45091b-c9f6-408a-906c-d82ac802a86f"
                },
                {
                  "uuid": "68a7b4f0-2887-4876-b346-fa9324e8e669",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a055b8d1-23e8-4791-bb97-f1bcf7a31813"
                }
              ],
              "categories": [
                {
                  "uuid": "3f45091b-c9f6-408a-906c-d82ac802a86f",
                  "name": "Complete",
                  "exit_uuid": "b9091a14-ecc5-4090-b976-0a71df86e088"
                },
                {
                  "uuid": "a055b8d1-23e8-4791-bb97-f1bcf7a31813",
                  "name": "Expired",
                  "exit_uuid": "08a09099-78c9-4596-b3ec-bbd323e48bb3"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "3f45091b-c9f6-408a-906c-d82ac802a86f"
            }
          },
          {
            "uuid": "25133f9d-bb3b-418f-a497-9f7309c5d66b",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "ecd0a15c-81a3-4caa-ab70-fcb678c000ea"
                },
                "type": "enter_flow",
                "uuid": "73dcfe16-5fc3-412b-92f7-1dbaecfd9e55"
              }
            ],
            "exits": [
              {
                "uuid": "308eb8dc-29e8-4df8-b92d-cbca465ac55f",
                "destination_uuid": "9af16162-fb9a-4680-92b6-4a1baed78c7e"
              },
              {
                "uuid": "6004b168-1163-4c4d-bcbc-8e8fed02dfd0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ea6547c9-25be-4e8a-baf2-4c6eec290000",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "69ff7381-6a28-4136-851a-0135864fc59a"
                },
                {
                  "uuid": "1045edeb-f8f9-46b0-b9e8-ebbb8c8a56b1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "85669ada-8c33-4318-b2ae-d7a1dc03b2cc"
                }
              ],
              "categories": [
                {
                  "uuid": "69ff7381-6a28-4136-851a-0135864fc59a",
                  "name": "Complete",
                  "exit_uuid": "308eb8dc-29e8-4df8-b92d-cbca465ac55f"
                },
                {
                  "uuid": "85669ada-8c33-4318-b2ae-d7a1dc03b2cc",
                  "name": "Expired",
                  "exit_uuid": "6004b168-1163-4c4d-bcbc-8e8fed02dfd0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "69ff7381-6a28-4136-851a-0135864fc59a"
            }
          },
          {
            "uuid": "df29a554-166f-411d-8310-72f6e952b966",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a9e8820c-91b4-434e-8ab7-9acc62d3b236"
              }
            ],
            "exits": [
              {
                "uuid": "c33190c0-311b-40f8-bbfe-733d198b4d0b",
                "destination_uuid": "e9c54d6f-a776-4516-bd16-70328568c726"
              }
            ]
          },
          {
            "uuid": "e9c54d6f-a776-4516-bd16-70328568c726",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "15d03efe-70db-4400-a044-3889d8cdeca2"
                },
                "type": "enter_flow",
                "uuid": "d3b1c406-0572-4cc7-a656-f66a2f932348"
              }
            ],
            "exits": [
              {
                "uuid": "47bf3a55-51db-4a48-98f2-f5c0e1e763d1",
                "destination_uuid": "62cc00a9-9d2c-4807-9f9f-fed98eaa2b93"
              },
              {
                "uuid": "c8bdacc2-0782-40d0-9175-bb5d3dae732f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "aee1545a-2a9e-4451-a884-855c21ab567c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b0e3de54-e80d-492e-b198-ef2e4189d2c9"
                },
                {
                  "uuid": "845a1257-f93c-4bc0-8377-53e528bf0384",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "74701b89-1562-4f48-b8e4-d7885b3a466a"
                }
              ],
              "categories": [
                {
                  "uuid": "b0e3de54-e80d-492e-b198-ef2e4189d2c9",
                  "name": "Complete",
                  "exit_uuid": "47bf3a55-51db-4a48-98f2-f5c0e1e763d1"
                },
                {
                  "uuid": "74701b89-1562-4f48-b8e4-d7885b3a466a",
                  "name": "Expired",
                  "exit_uuid": "c8bdacc2-0782-40d0-9175-bb5d3dae732f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b0e3de54-e80d-492e-b198-ef2e4189d2c9"
            }
          },
          {
            "uuid": "62cc00a9-9d2c-4807-9f9f-fed98eaa2b93",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "4d396987-b5f2-42b1-81a9-2eac6e7fdfa9"
                },
                "type": "enter_flow",
                "uuid": "9bb8f3bf-8988-48a5-aa58-5b15734efe07"
              }
            ],
            "exits": [
              {
                "uuid": "88acfad3-26b9-4a84-bfb3-71062f3a6375",
                "destination_uuid": "9af16162-fb9a-4680-92b6-4a1baed78c7e"
              },
              {
                "uuid": "398bb00c-ae11-47c7-b9d7-d2d8fabc8856",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "fdefb0a1-09c2-437b-9f62-11400a6211fe",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "258c41c1-8ed8-4a88-a697-81157e18f3ca"
                },
                {
                  "uuid": "70d9e59c-ad1f-495f-b917-ccf955441412",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "21fbd361-fb17-4607-8589-ebfc4436f647"
                }
              ],
              "categories": [
                {
                  "uuid": "258c41c1-8ed8-4a88-a697-81157e18f3ca",
                  "name": "Complete",
                  "exit_uuid": "88acfad3-26b9-4a84-bfb3-71062f3a6375"
                },
                {
                  "uuid": "21fbd361-fb17-4607-8589-ebfc4436f647",
                  "name": "Expired",
                  "exit_uuid": "398bb00c-ae11-47c7-b9d7-d2d8fabc8856"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "258c41c1-8ed8-4a88-a697-81157e18f3ca"
            }
          },
          {
            "uuid": "9af16162-fb9a-4680-92b6-4a1baed78c7e",
            "actions": [
              {
                "uuid": "df12ca4b-101a-4b55-88e7-4416a0686e13",
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
                "uuid": "7e17572c-7ac9-48cb-ab2b-347d7c32f432",
                "destination_uuid": "eae44528-36eb-4a66-8df3-2c891569d335"
              }
            ]
          },
          {
            "uuid": "eae44528-36eb-4a66-8df3-2c891569d335",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "d4be0c4f-f353-4ecc-a4d8-acf4e5898968"
                },
                "type": "enter_flow",
                "uuid": "393fd6fd-44dd-4bd5-94c5-8bcbd98134f4"
              }
            ],
            "exits": [
              {
                "uuid": "a1f0b57e-6871-457b-9552-5158ff73f4a3",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "63595697-43e9-4946-8a7b-23dba02991f5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6b58455a-0d99-4c12-87f7-e0788b9b5c69",
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
                "uuid": "7cf2bb12-ded4-4d65-bca7-42773a1ef356"
              }
            ],
            "exits": [
              {
                "uuid": "509a87ba-24c0-42ea-93de-2a542b30a976",
                "destination_uuid": "c4310a85-6a88-4c57-8ce8-bd5b29a0b42d"
              }
            ]
          },
          {
            "uuid": "c4310a85-6a88-4c57-8ce8-bd5b29a0b42d",
            "actions": [],
            "exits": [
              {
                "uuid": "d4ae94be-8dba-4a50-88eb-1290dba44643",
                "destination_uuid": "562026c1-2299-4e33-9ead-5177d89c2e14"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8a6fea97-cf96-48c0-94c3-b7fc12428d04",
              "cases": [],
              "categories": [
                {
                  "uuid": "8a6fea97-cf96-48c0-94c3-b7fc12428d04",
                  "name": "All Responses",
                  "exit_uuid": "d4ae94be-8dba-4a50-88eb-1290dba44643"
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
            "uuid": "562026c1-2299-4e33-9ead-5177d89c2e14",
            "actions": [
              {
                "uuid": "ff2e975a-236a-42ea-aff2-3b4f39a22864",
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
                "uuid": "01b0a017-ef6d-4a7c-b9d2-2a0c72572577",
                "destination_uuid": "65592c70-c52b-43d6-a5e8-7c929efd0dc9"
              }
            ]
          },
          {
            "uuid": "65592c70-c52b-43d6-a5e8-7c929efd0dc9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9616ec64-1cbf-4762-ad1a-25eeed659d05",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "617e83d1-4f88-479c-8bf4-4d4563b1b4e9",
                  "type": "has_only_phrase",
                  "uuid": "fa22cfeb-e2a3-4bad-8d62-4b199b65508b"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "6f3ead78-e014-4e25-8d81-8f6c24420309",
                  "type": "has_only_phrase",
                  "uuid": "352f08e6-72d1-4903-bdb9-6661d2b3de45"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "df8e2e0a-d7f2-4c35-bee1-c474bdaeaa89",
                  "type": "has_only_phrase",
                  "uuid": "7e8f2dfb-888b-425f-92ba-379b06a330d3"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "7d877e18-939b-47d3-b8a4-ef4c03f03087",
                  "type": "has_only_phrase",
                  "uuid": "f5067a7f-b4b9-45d7-b558-0598ff805cb5"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "4054f065-0a31-45f9-8f87-e363112a8956",
                  "type": "has_only_phrase",
                  "uuid": "086e9d9d-cd23-41e9-a342-a942ed8ccf69"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "e424a7b4-1ebe-4308-bdc9-99be67eb4910",
                  "type": "has_only_phrase",
                  "uuid": "3591cb68-7e28-460e-912c-8915482ff52e"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "7ccadae7-54fd-4a8c-a9a8-ccfa6175c289",
                  "type": "has_only_phrase",
                  "uuid": "893f2744-f658-488f-afc2-36a734a534a3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1ac6dc8d-7fb6-4680-8b98-335685977503",
                  "name": "All Responses",
                  "uuid": "9616ec64-1cbf-4762-ad1a-25eeed659d05"
                },
                {
                  "exit_uuid": "3874038e-f80e-488e-b1d4-f2de791e200c",
                  "name": "Do it every day",
                  "uuid": "617e83d1-4f88-479c-8bf4-4d4563b1b4e9"
                },
                {
                  "exit_uuid": "bde0bbf5-5cb9-4e52-a884-11dad387c011",
                  "name": "Let your teen choose the activity",
                  "uuid": "6f3ead78-e014-4e25-8d81-8f6c24420309"
                },
                {
                  "exit_uuid": "e3d427fa-0693-477c-a9e4-8b5c9b47aecf",
                  "name": "Follow your teen’s lead",
                  "uuid": "df8e2e0a-d7f2-4c35-bee1-c474bdaeaa89"
                },
                {
                  "exit_uuid": "f0a811d2-86d6-4d8e-8e47-43d0c4c62428",
                  "name": "Give your teen all of your attention",
                  "uuid": "7d877e18-939b-47d3-b8a4-ef4c03f03087"
                },
                {
                  "exit_uuid": "cc55a202-710c-4434-8a7d-c31ca8481baa",
                  "name": "Show your teen you are really listening",
                  "uuid": "4054f065-0a31-45f9-8f87-e363112a8956"
                },
                {
                  "exit_uuid": "0172d3ce-5146-48b1-bf61-090150ba37b1",
                  "name": "Have fun!",
                  "uuid": "e424a7b4-1ebe-4308-bdc9-99be67eb4910"
                },
                {
                  "exit_uuid": "972523ae-92d3-411a-ad93-0f2daf98d73f",
                  "name": "None ",
                  "uuid": "7ccadae7-54fd-4a8c-a9a8-ccfa6175c289"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "1ac6dc8d-7fb6-4680-8b98-335685977503",
                "destination_uuid": null
              },
              {
                "uuid": "3874038e-f80e-488e-b1d4-f2de791e200c",
                "destination_uuid": "8c900747-043f-4b8a-ba39-706d58a661d9"
              },
              {
                "uuid": "bde0bbf5-5cb9-4e52-a884-11dad387c011",
                "destination_uuid": "edc995c8-a16c-4104-afd0-e29f7e203612"
              },
              {
                "uuid": "e3d427fa-0693-477c-a9e4-8b5c9b47aecf",
                "destination_uuid": "41fa1bf2-31b8-4ff6-a0bb-dc1d4465ad61"
              },
              {
                "uuid": "f0a811d2-86d6-4d8e-8e47-43d0c4c62428",
                "destination_uuid": "d55d7b4b-957e-4594-92fc-13cc269fcfa7"
              },
              {
                "uuid": "cc55a202-710c-4434-8a7d-c31ca8481baa",
                "destination_uuid": "7d827be0-1a56-430a-918a-4c0fccae9ad4"
              },
              {
                "uuid": "0172d3ce-5146-48b1-bf61-090150ba37b1",
                "destination_uuid": "f923b540-90ac-4306-9b2e-2a1c3b256e9e"
              },
              {
                "uuid": "972523ae-92d3-411a-ad93-0f2daf98d73f",
                "destination_uuid": "14a9c669-4c3d-4bef-ae45-2fcd628b35bc"
              }
            ]
          },
          {
            "uuid": "8c900747-043f-4b8a-ba39-706d58a661d9",
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
                "uuid": "912e8627-bb99-4a70-a499-930b22c969e4"
              }
            ],
            "exits": [
              {
                "uuid": "f5d9bca4-aefc-41fb-8daf-1c4ebbec71d5",
                "destination_uuid": "607f7533-6166-49f4-8abd-f47578ef6205"
              }
            ]
          },
          {
            "uuid": "607f7533-6166-49f4-8abd-f47578ef6205",
            "actions": [],
            "exits": [
              {
                "uuid": "4bdc295b-00ef-440f-9254-0a837f071ab0",
                "destination_uuid": "195709fe-3962-4752-b3f5-91b9e2edc9a4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "e2929c16-5ce7-4d2a-a4cf-812623e0b66f",
              "cases": [],
              "categories": [
                {
                  "uuid": "e2929c16-5ce7-4d2a-a4cf-812623e0b66f",
                  "name": "All Responses",
                  "exit_uuid": "4bdc295b-00ef-440f-9254-0a837f071ab0"
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
            "uuid": "195709fe-3962-4752-b3f5-91b9e2edc9a4",
            "actions": [
              {
                "uuid": "2d3aebbd-e6fd-4870-9025-9735ba2cf67d",
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
                "uuid": "b9573619-f939-43a2-aa45-7dfe25c471f6",
                "destination_uuid": "70625484-3666-4730-bb87-4279d62f335e"
              }
            ]
          },
          {
            "uuid": "70625484-3666-4730-bb87-4279d62f335e",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6e84b494-419a-462f-9465-dd42cd196f09"
              }
            ],
            "exits": [
              {
                "uuid": "bbe382c7-bc5e-46bb-94c6-31b8f4767713",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "edc995c8-a16c-4104-afd0-e29f7e203612",
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
                "uuid": "2057c321-cc19-4482-84b0-fe2eb8178bb0"
              }
            ],
            "exits": [
              {
                "uuid": "01eebaa8-384a-4189-95e6-5fdb6a147d15",
                "destination_uuid": "5ea811cf-860f-4446-8107-85043209da37"
              }
            ]
          },
          {
            "uuid": "5ea811cf-860f-4446-8107-85043209da37",
            "actions": [],
            "exits": [
              {
                "uuid": "41c5439b-8026-4a55-afdc-ac6e582972dd",
                "destination_uuid": "7c470d48-e1e5-496b-aefc-96854e44d9b6"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7bf63bab-d35a-4617-ada0-d86cdf1bbed2",
              "cases": [],
              "categories": [
                {
                  "uuid": "7bf63bab-d35a-4617-ada0-d86cdf1bbed2",
                  "name": "All Responses",
                  "exit_uuid": "41c5439b-8026-4a55-afdc-ac6e582972dd"
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
            "uuid": "7c470d48-e1e5-496b-aefc-96854e44d9b6",
            "actions": [
              {
                "uuid": "074fcb44-94bd-47cf-a1ff-a55c01b764af",
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
                "uuid": "37d4c269-bc90-444b-be24-56259fa01661",
                "destination_uuid": "d27353a4-a6fd-4f80-87e5-34e044f1c60c"
              }
            ]
          },
          {
            "uuid": "d27353a4-a6fd-4f80-87e5-34e044f1c60c",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b5ebfefc-f835-4123-820e-70c7ef9cb1e9"
              }
            ],
            "exits": [
              {
                "uuid": "5ce59c5f-12e6-4478-a1b3-62debbd3c68c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "41fa1bf2-31b8-4ff6-a0bb-dc1d4465ad61",
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
                "uuid": "c779f140-3b93-4931-a236-865a17fee8c9"
              }
            ],
            "exits": [
              {
                "uuid": "016dad6f-0a6e-4dc0-8eea-a0419ffd787e",
                "destination_uuid": "df7a2d34-3cef-4e78-9b10-41e11191061f"
              }
            ]
          },
          {
            "uuid": "df7a2d34-3cef-4e78-9b10-41e11191061f",
            "actions": [],
            "exits": [
              {
                "uuid": "b611049b-ebc1-4283-ba14-50145d37f430",
                "destination_uuid": "863817bd-288c-41d3-bbbd-9f322a5345dc"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8f163fc1-acfb-4c84-a9d2-14e7fab78640",
              "cases": [],
              "categories": [
                {
                  "uuid": "8f163fc1-acfb-4c84-a9d2-14e7fab78640",
                  "name": "All Responses",
                  "exit_uuid": "b611049b-ebc1-4283-ba14-50145d37f430"
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
            "uuid": "863817bd-288c-41d3-bbbd-9f322a5345dc",
            "actions": [
              {
                "uuid": "3b8238cd-bf36-4bc2-b5bc-3b9fd7ed1e7c",
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
                "uuid": "34f07f33-b240-4657-8c6c-4cefc5311c26",
                "destination_uuid": "a2735e03-5314-4381-bc96-8cf2e0f0e261"
              }
            ]
          },
          {
            "uuid": "a2735e03-5314-4381-bc96-8cf2e0f0e261",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "998aaac0-fddc-4249-b743-ea5872de683f"
              }
            ],
            "exits": [
              {
                "uuid": "4c5a031e-5bff-4736-a52e-c58b6d4608ed",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "d55d7b4b-957e-4594-92fc-13cc269fcfa7",
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
                "uuid": "966412c3-9d05-42ae-9d62-e3857562517e"
              }
            ],
            "exits": [
              {
                "uuid": "3af22ee7-8ce5-4dcc-a9e6-577b7d00ca8d",
                "destination_uuid": "bf56cb6c-c806-4b52-9542-39b02b088af1"
              }
            ]
          },
          {
            "uuid": "bf56cb6c-c806-4b52-9542-39b02b088af1",
            "actions": [],
            "exits": [
              {
                "uuid": "843272d5-1307-4812-a300-655c5d725b8b",
                "destination_uuid": "cdb54328-9efc-41a3-83ac-97e79e50775f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2fba2e04-554c-4b37-83a5-755159fc7314",
              "cases": [],
              "categories": [
                {
                  "uuid": "2fba2e04-554c-4b37-83a5-755159fc7314",
                  "name": "All Responses",
                  "exit_uuid": "843272d5-1307-4812-a300-655c5d725b8b"
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
            "uuid": "cdb54328-9efc-41a3-83ac-97e79e50775f",
            "actions": [
              {
                "uuid": "826161fe-c8bf-4fac-9aa3-34a7acaf61e2",
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
                "uuid": "697fd0eb-d8fc-4b44-a7e0-5cc8907d1878",
                "destination_uuid": "530accb8-9429-4f02-85e8-88b438173bd7"
              }
            ]
          },
          {
            "uuid": "530accb8-9429-4f02-85e8-88b438173bd7",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "96145129-2c51-4761-9f4a-d67b5d6193d9"
              }
            ],
            "exits": [
              {
                "uuid": "e6128766-ce92-4db7-bc71-1085d1be9a2a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7d827be0-1a56-430a-918a-4c0fccae9ad4",
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
                "uuid": "f4ddf48e-7986-45c7-bf52-48e2e9a4c5ed"
              }
            ],
            "exits": [
              {
                "uuid": "e490b424-d383-43db-ae81-e067dc71c878",
                "destination_uuid": "85b6172e-f2ae-4026-899b-38cf5978c852"
              }
            ]
          },
          {
            "uuid": "85b6172e-f2ae-4026-899b-38cf5978c852",
            "actions": [],
            "exits": [
              {
                "uuid": "97ccf5d3-53d4-4cb7-96a8-87f6c3e709f0",
                "destination_uuid": "e02a9430-f5da-464f-b14f-2e017ceb5842"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2488ae89-e129-4828-be4d-94a1c53df606",
              "cases": [],
              "categories": [
                {
                  "uuid": "2488ae89-e129-4828-be4d-94a1c53df606",
                  "name": "All Responses",
                  "exit_uuid": "97ccf5d3-53d4-4cb7-96a8-87f6c3e709f0"
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
            "uuid": "e02a9430-f5da-464f-b14f-2e017ceb5842",
            "actions": [
              {
                "uuid": "8d8e6e8f-ee66-40bc-9e04-73ddbbad8212",
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
                "uuid": "82d86682-4efd-4107-af8e-7476a392ed4a",
                "destination_uuid": "f046bfd9-c199-4f35-9b6c-8142604a14a0"
              }
            ]
          },
          {
            "uuid": "f046bfd9-c199-4f35-9b6c-8142604a14a0",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c3952370-ae26-4d3f-96c5-e5d851f3e71b"
              }
            ],
            "exits": [
              {
                "uuid": "3aa9f09b-7fee-41a6-9740-4cbdaf1ae79d",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f923b540-90ac-4306-9b2e-2a1c3b256e9e",
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
                "uuid": "d51631d2-8bec-42e6-a0ca-f08b1311e554"
              }
            ],
            "exits": [
              {
                "uuid": "16a675a9-f8b4-4ea1-abe4-814d835d20b8",
                "destination_uuid": "4bc68f39-e9e0-4b80-b4a2-52fb9c4cebc9"
              }
            ]
          },
          {
            "uuid": "4bc68f39-e9e0-4b80-b4a2-52fb9c4cebc9",
            "actions": [],
            "exits": [
              {
                "uuid": "63ecda63-3b91-47d5-8d0c-f772164fce98",
                "destination_uuid": "673a1427-4705-442b-b08d-ebf80c0e432a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0f9c1323-e0b0-4c6c-a66e-86a2d55a9b0e",
              "cases": [],
              "categories": [
                {
                  "uuid": "0f9c1323-e0b0-4c6c-a66e-86a2d55a9b0e",
                  "name": "All Responses",
                  "exit_uuid": "63ecda63-3b91-47d5-8d0c-f772164fce98"
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
            "uuid": "673a1427-4705-442b-b08d-ebf80c0e432a",
            "actions": [
              {
                "uuid": "6e4c8316-d3ee-4610-bc02-db3cb68584dd",
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
                "uuid": "f51dd736-9189-4cb4-8540-5ef337b512cf",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "be238d3a-05d0-442b-ac2a-9a2941c3e5e6",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4081a7b3-d07b-4586-aefd-0b9039db7393"
              }
            ],
            "exits": [
              {
                "uuid": "4d8beb07-78bc-477f-8de0-cd1b7b87f89f",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "14a9c669-4c3d-4bef-ae45-2fcd628b35bc",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fb241214-b0eb-4106-845d-4b2fee16de7d"
              }
            ],
            "exits": [
              {
                "uuid": "4649c7e6-52ce-4c33-935f-40c7e79d4a59",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5ac7118e-8141-4a19-8540-bf2bbcf85df5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "88ad43f7-5eaa-42d9-850b-9bec8e4a0ea8",
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
                "uuid": "39b010de-d108-4cbe-8092-24bc9f296ec1"
              }
            ],
            "exits": [
              {
                "uuid": "09fa66e8-b7ee-489d-9479-3f54e3e756a7",
                "destination_uuid": "692e9e53-b926-4dfb-91c4-839127f39ff6"
              }
            ]
          },
          {
            "uuid": "92716820-21ea-4361-9e31-5abc863d8e58",
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
                "uuid": "2b81ffa8-d40d-4db1-a29b-cffb4aa60368"
              }
            ],
            "exits": [
              {
                "uuid": "25c561d6-c258-4242-8312-d78cc297cfa6",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7467337c-380a-457b-ae82-f6613a32f789",
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
                "uuid": "57c3041c-540a-400c-8e4e-6280222361fe"
              }
            ],
            "exits": [
              {
                "uuid": "c19432c4-dc08-4f1b-8552-2513c4360a40",
                "destination_uuid": "692e9e53-b926-4dfb-91c4-839127f39ff6"
              }
            ]
          },
          {
            "uuid": "692e9e53-b926-4dfb-91c4-839127f39ff6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "07be8f40-1c1d-4667-98f0-5b615f2a0f56",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "9db887ff-847c-4633-889e-9d9ee7e9392f",
                  "type": "has_only_phrase",
                  "uuid": "170b6813-3275-476a-9a45-cc803d19e2b2"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "4875526e-369f-4447-ba52-7bf6a06382af",
                  "type": "has_only_phrase",
                  "uuid": "f042f3a9-1336-4947-908c-e5ecdb2ad930"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "476b6d64-0ff4-49c9-bc4d-096786b01c43",
                  "type": "has_only_phrase",
                  "uuid": "e220b1ef-80da-4613-ba42-666c0d234097"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "98be8e87-40da-4736-b75e-241a55db52a0",
                  "type": "has_only_phrase",
                  "uuid": "31959e45-c37f-407b-8e27-7e372f64ddb3"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "f7481736-f2c3-44eb-af6a-69bc61167807",
                  "type": "has_only_phrase",
                  "uuid": "4112a4a8-b8dd-4408-a4a5-fec0b8293d93"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "ccfc9317-3eae-454a-94d4-da36643da300",
                  "type": "has_only_phrase",
                  "uuid": "b81e7b11-cf20-4ec4-95df-43d610c419e7"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "f122eeb3-6394-498d-9a89-439d383ef62a",
                  "type": "has_only_phrase",
                  "uuid": "35b1991b-7717-4d8e-8004-7833df623a92"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "f8832a3f-fa5e-4e1c-ad0e-1e0453cecf3d",
                  "type": "has_only_phrase",
                  "uuid": "82babd84-6ad1-4836-88e9-ddfd4074ea3d"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "06c6b464-7a05-4b19-af6d-25b65b078aeb",
                  "type": "has_only_phrase",
                  "uuid": "d57f7fd8-3a27-4e95-99fb-bc38c50e1c9c"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "639dfaa3-fe14-4034-8056-61ca05bb61d2",
                  "type": "has_only_phrase",
                  "uuid": "b6666f42-20d3-4b35-999a-619b6fcfa368"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "1f4febd6-90c8-4ba7-b3d2-fef2da59f05b",
                  "type": "has_only_phrase",
                  "uuid": "f411f9dd-1762-47a2-acc0-7e502b4a18e8"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "0876da4e-1df9-4f2a-8e46-b792af2de8f9",
                  "type": "has_only_phrase",
                  "uuid": "e29c37dd-0428-41ab-800b-f393185c6ad1"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "89c0ca16-685a-418e-87d3-6a2b658cf0f5",
                  "type": "has_only_phrase",
                  "uuid": "b50b6efa-190c-436f-ad0c-677a51a1b26c"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "6b2ec8d2-d1cd-487a-80fb-3f3291867c21",
                  "type": "has_only_phrase",
                  "uuid": "591d3b02-5931-43bd-bcc0-9c214ba4f644"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "4f224687-ca45-4fe7-a021-119af718efa5",
                  "type": "has_only_phrase",
                  "uuid": "de7496c2-5f33-44c0-89a7-6552698e9e26"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fa50314a-5e83-46ca-a1a5-9201e0785ac4",
                  "name": "All Responses",
                  "uuid": "07be8f40-1c1d-4667-98f0-5b615f2a0f56"
                },
                {
                  "exit_uuid": "5ab129f7-83b0-44d1-a804-cfadff2d4b98",
                  "name": "I don’t have enough time",
                  "uuid": "9db887ff-847c-4633-889e-9d9ee7e9392f"
                },
                {
                  "exit_uuid": "9a453232-e35b-4791-b93a-b3080a0b7341",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "4875526e-369f-4447-ba52-7bf6a06382af"
                },
                {
                  "exit_uuid": "b0ad0884-a54c-4fbc-91e7-1aab346a0180",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "476b6d64-0ff4-49c9-bc4d-096786b01c43"
                },
                {
                  "exit_uuid": "fdf34e44-0295-42d2-8d01-baf091ebd41e",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "98be8e87-40da-4736-b75e-241a55db52a0"
                },
                {
                  "exit_uuid": "a627771c-33c9-43a1-8663-ed0bfdb99e02",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "f7481736-f2c3-44eb-af6a-69bc61167807"
                },
                {
                  "exit_uuid": "cb8e0835-31cd-49f4-964d-81557859b13a",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "ccfc9317-3eae-454a-94d4-da36643da300"
                },
                {
                  "exit_uuid": "3ddf8216-6b9a-47ca-8cc4-e20478360824",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "f122eeb3-6394-498d-9a89-439d383ef62a"
                },
                {
                  "exit_uuid": "e56387bf-a15e-43c7-9507-bc377d950a5d",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "f8832a3f-fa5e-4e1c-ad0e-1e0453cecf3d"
                },
                {
                  "exit_uuid": "5af7e3e1-b467-4fb5-a87f-2ba5d8ab7526",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "06c6b464-7a05-4b19-af6d-25b65b078aeb"
                },
                {
                  "exit_uuid": "73402400-836d-4f42-8e50-819ef88bdae2",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "639dfaa3-fe14-4034-8056-61ca05bb61d2"
                },
                {
                  "exit_uuid": "075ba32b-432c-432a-8086-1b5f2a400075",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "1f4febd6-90c8-4ba7-b3d2-fef2da59f05b"
                },
                {
                  "exit_uuid": "9461f14b-84ab-4af0-b232-bc775774413e",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "0876da4e-1df9-4f2a-8e46-b792af2de8f9"
                },
                {
                  "exit_uuid": "ed92d6c6-16c0-491d-a5e7-f312792aaa95",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "89c0ca16-685a-418e-87d3-6a2b658cf0f5"
                },
                {
                  "exit_uuid": "b5ec960c-acfc-4518-bdbc-9824c9a9fbeb",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "6b2ec8d2-d1cd-487a-80fb-3f3291867c21"
                },
                {
                  "exit_uuid": "5a2b6ef8-5d49-4db5-bf45-7c4317a2c48d",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "4f224687-ca45-4fe7-a021-119af718efa5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fa50314a-5e83-46ca-a1a5-9201e0785ac4",
                "destination_uuid": null
              },
              {
                "uuid": "5ab129f7-83b0-44d1-a804-cfadff2d4b98",
                "destination_uuid": "e86bc447-f0a1-48d8-a69b-a897bae2fe9f"
              },
              {
                "uuid": "9a453232-e35b-4791-b93a-b3080a0b7341",
                "destination_uuid": "75b20707-e942-43d6-9a35-e5e710fddf6b"
              },
              {
                "uuid": "b0ad0884-a54c-4fbc-91e7-1aab346a0180",
                "destination_uuid": "75b20707-e942-43d6-9a35-e5e710fddf6b"
              },
              {
                "uuid": "fdf34e44-0295-42d2-8d01-baf091ebd41e",
                "destination_uuid": "d60a3d5d-c231-44dc-8676-6a5c4ad15326"
              },
              {
                "uuid": "a627771c-33c9-43a1-8663-ed0bfdb99e02",
                "destination_uuid": "d60a3d5d-c231-44dc-8676-6a5c4ad15326"
              },
              {
                "uuid": "cb8e0835-31cd-49f4-964d-81557859b13a",
                "destination_uuid": "e21cf450-82fb-43a4-8e57-652db5d0cec7"
              },
              {
                "uuid": "3ddf8216-6b9a-47ca-8cc4-e20478360824",
                "destination_uuid": "e21cf450-82fb-43a4-8e57-652db5d0cec7"
              },
              {
                "uuid": "e56387bf-a15e-43c7-9507-bc377d950a5d",
                "destination_uuid": "1f0a3b85-a6d2-4c5a-8ef3-0ed0c1c45a27"
              },
              {
                "uuid": "5af7e3e1-b467-4fb5-a87f-2ba5d8ab7526",
                "destination_uuid": "1f0a3b85-a6d2-4c5a-8ef3-0ed0c1c45a27"
              },
              {
                "uuid": "73402400-836d-4f42-8e50-819ef88bdae2",
                "destination_uuid": "91466e70-bf86-45d1-ba77-56a3f9dd8f89"
              },
              {
                "uuid": "075ba32b-432c-432a-8086-1b5f2a400075",
                "destination_uuid": "91466e70-bf86-45d1-ba77-56a3f9dd8f89"
              },
              {
                "uuid": "9461f14b-84ab-4af0-b232-bc775774413e",
                "destination_uuid": "cc3deca5-b47c-4151-91ff-35b13a8e01b9"
              },
              {
                "uuid": "ed92d6c6-16c0-491d-a5e7-f312792aaa95",
                "destination_uuid": "cc3deca5-b47c-4151-91ff-35b13a8e01b9"
              },
              {
                "uuid": "b5ec960c-acfc-4518-bdbc-9824c9a9fbeb",
                "destination_uuid": "90309e0d-c4d7-431c-be8d-68bcb560fbbf"
              },
              {
                "uuid": "5a2b6ef8-5d49-4db5-bf45-7c4317a2c48d",
                "destination_uuid": "90309e0d-c4d7-431c-be8d-68bcb560fbbf"
              }
            ]
          },
          {
            "uuid": "e86bc447-f0a1-48d8-a69b-a897bae2fe9f",
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
                "uuid": "10ce0dc5-4da6-46eb-8e03-a9714fa7f9db"
              }
            ],
            "exits": [
              {
                "uuid": "42bdb537-5836-4dc8-b336-d9cf1b8af102",
                "destination_uuid": "33adfc92-7098-4e75-ae82-28d8fd0b39c8"
              }
            ]
          },
          {
            "uuid": "33adfc92-7098-4e75-ae82-28d8fd0b39c8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "86a27cfe-3f41-45b9-8797-c1c61e5eebb6",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "1a86ef14-6d56-49f1-bd48-de0fd0068a8c",
                  "type": "has_only_phrase",
                  "uuid": "16529318-0eba-49f9-a25b-4bf8d4e122c9"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "4ddc3b14-8799-4210-9224-5986cd8b7b67",
                  "type": "has_only_phrase",
                  "uuid": "d9837cac-33c9-4e39-a886-69274dd9c473"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "397a7808-de7d-4f8e-9bbf-e9c5286d345c",
                  "type": "has_only_phrase",
                  "uuid": "55145cd7-4b1a-4bf1-92db-4f04c6b764d3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b667e0fd-883d-428a-acb9-2ec3e7998725",
                  "name": "All Responses",
                  "uuid": "86a27cfe-3f41-45b9-8797-c1c61e5eebb6"
                },
                {
                  "exit_uuid": "8c4ebdee-97bd-45fb-98f3-329918b30f04",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "1a86ef14-6d56-49f1-bd48-de0fd0068a8c"
                },
                {
                  "exit_uuid": "67950cf2-33d5-4e6c-be40-fa68b109061d",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "4ddc3b14-8799-4210-9224-5986cd8b7b67"
                },
                {
                  "exit_uuid": "6796efee-637e-44ed-bcee-f48f33e37b97",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "397a7808-de7d-4f8e-9bbf-e9c5286d345c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b667e0fd-883d-428a-acb9-2ec3e7998725",
                "destination_uuid": null
              },
              {
                "uuid": "8c4ebdee-97bd-45fb-98f3-329918b30f04",
                "destination_uuid": "0e6bde26-164a-4b2e-ae7b-502c0ccc0357"
              },
              {
                "uuid": "67950cf2-33d5-4e6c-be40-fa68b109061d",
                "destination_uuid": "d6492a72-96e8-47fb-8b53-0eec4dabaad0"
              },
              {
                "uuid": "6796efee-637e-44ed-bcee-f48f33e37b97",
                "destination_uuid": "31210e8b-8b7e-4538-ac59-4886904bc58b"
              }
            ]
          },
          {
            "uuid": "0e6bde26-164a-4b2e-ae7b-502c0ccc0357",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "637cccb2-8ba0-42c6-8e07-f2e0546d8484"
              }
            ],
            "exits": [
              {
                "uuid": "44fc8200-4fd2-4069-afe4-de17d00f52d8",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "d6492a72-96e8-47fb-8b53-0eec4dabaad0",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "390e0178-3cfc-429d-bb8d-29188744b882"
              }
            ],
            "exits": [
              {
                "uuid": "c04125ff-ba6d-4738-80e4-1b11004a6d91",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "31210e8b-8b7e-4538-ac59-4886904bc58b",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1780b047-3a8f-4c44-b3fa-9aa879ca694a"
              }
            ],
            "exits": [
              {
                "uuid": "57169161-5a62-4329-a371-f7ccfff1c32f",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "75b20707-e942-43d6-9a35-e5e710fddf6b",
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
                "uuid": "53976e8e-9332-484c-a64a-1606005fcbb2"
              }
            ],
            "exits": [
              {
                "uuid": "7c1bb9ac-2f3d-4e36-bc25-f1ae9aee854a",
                "destination_uuid": "1d0daa2e-6e6f-4891-abe4-f73288fb7753"
              }
            ]
          },
          {
            "uuid": "1d0daa2e-6e6f-4891-abe4-f73288fb7753",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7d64def9-fa93-46e3-9557-d04b693fd02d",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "23023084-151f-41fa-97c3-6e8ca026250b",
                  "type": "has_only_phrase",
                  "uuid": "4e8379ef-110a-464e-b079-49bd8f233fd7"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "82c6fcad-c859-41f4-b31f-0836292b44e8",
                  "type": "has_only_phrase",
                  "uuid": "3c762850-fcef-417c-8723-9eee20b57ea3"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "c2031382-df61-4522-a74e-d1e7f674cc81",
                  "type": "has_only_phrase",
                  "uuid": "7e097927-499c-4fec-9466-f9777d6798df"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "65621653-296f-4986-b835-c1ed4f266df9",
                  "name": "All Responses",
                  "uuid": "7d64def9-fa93-46e3-9557-d04b693fd02d"
                },
                {
                  "exit_uuid": "b7ed34e4-a55e-485a-acd3-1588de04c39b",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "23023084-151f-41fa-97c3-6e8ca026250b"
                },
                {
                  "exit_uuid": "91274ded-0803-43ef-a3e2-c04bc282c0fc",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "82c6fcad-c859-41f4-b31f-0836292b44e8"
                },
                {
                  "exit_uuid": "b7c2430a-6867-4a13-a1d9-7f91cd308165",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "c2031382-df61-4522-a74e-d1e7f674cc81"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "65621653-296f-4986-b835-c1ed4f266df9",
                "destination_uuid": null
              },
              {
                "uuid": "b7ed34e4-a55e-485a-acd3-1588de04c39b",
                "destination_uuid": "a0e83190-aa10-44c1-9802-9eb510e9ea61"
              },
              {
                "uuid": "91274ded-0803-43ef-a3e2-c04bc282c0fc",
                "destination_uuid": "d39e85c2-cb0b-4f85-b2a4-973db5a2310f"
              },
              {
                "uuid": "b7c2430a-6867-4a13-a1d9-7f91cd308165",
                "destination_uuid": "ee5fe673-bf45-41e9-b17c-987ae7d45408"
              }
            ]
          },
          {
            "uuid": "a0e83190-aa10-44c1-9802-9eb510e9ea61",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "61ca4384-502e-44e1-aa86-1d40e8cdd9f5"
              }
            ],
            "exits": [
              {
                "uuid": "007121ff-b793-467a-a013-b8d11bca8d63",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "d39e85c2-cb0b-4f85-b2a4-973db5a2310f",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9de780c8-e43a-41b8-b70d-81e8214f460e"
              }
            ],
            "exits": [
              {
                "uuid": "ad804f66-8a47-4482-815a-a616052accfd",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "ee5fe673-bf45-41e9-b17c-987ae7d45408",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "de072eb2-ee68-4232-bf34-5143cf70215e"
              }
            ],
            "exits": [
              {
                "uuid": "16b173cc-293a-4ff7-bdd4-5a8b1c57b8d5",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "d60a3d5d-c231-44dc-8676-6a5c4ad15326",
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
                "uuid": "7a22fb4b-c6fe-487b-9d82-e089935f7447"
              }
            ],
            "exits": [
              {
                "uuid": "27c62aeb-de3a-4058-b6ec-2c78b90465d0",
                "destination_uuid": "f61d53bc-1f66-4b82-82d7-86fc65e5066e"
              }
            ]
          },
          {
            "uuid": "f61d53bc-1f66-4b82-82d7-86fc65e5066e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "92e85b79-0bd8-4c90-8860-ff5604fe1201",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "9df53b2c-fc28-4d55-a71d-8e5e5d814557",
                  "type": "has_only_phrase",
                  "uuid": "dbf5a79a-8c88-4cb8-b469-42d6fd65f2b5"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "fe2e3fef-87e5-4600-84f9-3417bd91f725",
                  "type": "has_only_phrase",
                  "uuid": "0ecb6fe7-2acd-4104-a2d9-815ba3e92a24"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "866f562c-137b-424a-9795-9f2ba677bbf6",
                  "type": "has_only_phrase",
                  "uuid": "2844cb97-a696-4ca1-9a9c-906f03eb9b79"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f763e18a-6bdf-4778-9893-39b09ce73a00",
                  "name": "All Responses",
                  "uuid": "92e85b79-0bd8-4c90-8860-ff5604fe1201"
                },
                {
                  "exit_uuid": "f9cfb953-df79-44d0-8a02-a2ea7f873771",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "9df53b2c-fc28-4d55-a71d-8e5e5d814557"
                },
                {
                  "exit_uuid": "710cd93b-1056-4a57-8cd5-045371685aba",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "fe2e3fef-87e5-4600-84f9-3417bd91f725"
                },
                {
                  "exit_uuid": "a3b8399b-fe8b-4a97-855d-966a181f092a",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "866f562c-137b-424a-9795-9f2ba677bbf6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f763e18a-6bdf-4778-9893-39b09ce73a00",
                "destination_uuid": null
              },
              {
                "uuid": "f9cfb953-df79-44d0-8a02-a2ea7f873771",
                "destination_uuid": "5646b51a-5783-4db2-a35a-ef814bf0a080"
              },
              {
                "uuid": "710cd93b-1056-4a57-8cd5-045371685aba",
                "destination_uuid": "3c2a94bc-8039-4e24-aa64-12b2d8ee9fab"
              },
              {
                "uuid": "a3b8399b-fe8b-4a97-855d-966a181f092a",
                "destination_uuid": "8b263d24-9c61-4acc-b3ec-c6742bc97995"
              }
            ]
          },
          {
            "uuid": "5646b51a-5783-4db2-a35a-ef814bf0a080",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6b4e315f-7dac-4fd4-9d27-d788d1ec4aff"
              }
            ],
            "exits": [
              {
                "uuid": "0b78c029-2a9b-4bdf-875e-c8684fa99146",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "3c2a94bc-8039-4e24-aa64-12b2d8ee9fab",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3b357ff9-3ca1-4ccb-9b82-68302b304ed6"
              }
            ],
            "exits": [
              {
                "uuid": "72b10a56-4b1d-4c36-b668-16895acf369a",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "8b263d24-9c61-4acc-b3ec-c6742bc97995",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d41af87f-ae13-4473-b92b-13015b9ff9fa"
              }
            ],
            "exits": [
              {
                "uuid": "34608c17-298b-4920-8581-882753c5c576",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "e21cf450-82fb-43a4-8e57-652db5d0cec7",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "0eed3b2c-e644-4548-9206-db3ec840e054"
              }
            ],
            "exits": [
              {
                "uuid": "5dfd089f-77a2-4f88-8c6e-8f1e0a9b6738",
                "destination_uuid": "dba5ac0e-3806-477f-a5e4-86cd99fe0074"
              }
            ]
          },
          {
            "uuid": "dba5ac0e-3806-477f-a5e4-86cd99fe0074",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cf9dcba0-b6de-4678-9a38-46fc88d40202",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "ee41a103-7e17-490e-ab2c-27d2876d9e84",
                  "type": "has_only_phrase",
                  "uuid": "fc14a59c-bb59-45e6-9dab-d5020c277971"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "4d2f1cf5-b2db-429e-8dae-5d916a0be2fa",
                  "type": "has_only_phrase",
                  "uuid": "09d3403c-a714-4982-921b-81cc68118df3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8a2713f3-19f4-4ec4-b711-2e811a4578e2",
                  "name": "All Responses",
                  "uuid": "cf9dcba0-b6de-4678-9a38-46fc88d40202"
                },
                {
                  "exit_uuid": "707c9cd2-4fa5-493e-86d5-36a8b3971a6c",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "ee41a103-7e17-490e-ab2c-27d2876d9e84"
                },
                {
                  "exit_uuid": "89717a10-b198-4c79-b6d4-957b3c4b8326",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "4d2f1cf5-b2db-429e-8dae-5d916a0be2fa"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8a2713f3-19f4-4ec4-b711-2e811a4578e2",
                "destination_uuid": null
              },
              {
                "uuid": "707c9cd2-4fa5-493e-86d5-36a8b3971a6c",
                "destination_uuid": "3c3e9b6d-a4ea-4c1d-bfda-03dfc6d54a95"
              },
              {
                "uuid": "89717a10-b198-4c79-b6d4-957b3c4b8326",
                "destination_uuid": "8dcf0f55-5592-4b57-96f7-72adc83b729c"
              }
            ]
          },
          {
            "uuid": "3c3e9b6d-a4ea-4c1d-bfda-03dfc6d54a95",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c3be3599-8168-4149-892b-1e5c558618d8"
              }
            ],
            "exits": [
              {
                "uuid": "07d6e924-a2de-4330-a198-789429a950c7",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "8dcf0f55-5592-4b57-96f7-72adc83b729c",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9e72bbf9-ab8e-40a9-9fcd-b7836e5b98f0"
              }
            ],
            "exits": [
              {
                "uuid": "01f595d5-3214-4ff4-b1f5-1302ad80d5d7",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "1f0a3b85-a6d2-4c5a-8ef3-0ed0c1c45a27",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "f952923c-3525-4fca-acdc-0bce3f1770c1"
              }
            ],
            "exits": [
              {
                "uuid": "7bff5420-5f12-44ac-a9b1-819df8b51660",
                "destination_uuid": "a10d13c9-ba6b-4eca-a707-86314941c6eb"
              }
            ]
          },
          {
            "uuid": "a10d13c9-ba6b-4eca-a707-86314941c6eb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e9512db4-7d24-491f-9e7b-3ef8a49df25a",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "669c19bb-cfcb-4c5c-9d81-8c16365b1632",
                  "type": "has_only_phrase",
                  "uuid": "58f12f98-e2fc-4739-aa08-71187726ea4e"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "24f3489e-9658-4fa7-acc6-7d94f81e3c63",
                  "type": "has_only_phrase",
                  "uuid": "fddb155e-8358-48c9-8e0f-ed5c58c6aeac"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3dabc644-200d-4a60-882b-0881831f2832",
                  "name": "All Responses",
                  "uuid": "e9512db4-7d24-491f-9e7b-3ef8a49df25a"
                },
                {
                  "exit_uuid": "ddaf6169-04de-4d7c-97f3-b5d2a32ce2f1",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "669c19bb-cfcb-4c5c-9d81-8c16365b1632"
                },
                {
                  "exit_uuid": "6c577ba0-a3a1-48f5-92d8-ca71c11751a3",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "24f3489e-9658-4fa7-acc6-7d94f81e3c63"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3dabc644-200d-4a60-882b-0881831f2832",
                "destination_uuid": null
              },
              {
                "uuid": "ddaf6169-04de-4d7c-97f3-b5d2a32ce2f1",
                "destination_uuid": "9e964c60-766e-429f-b3ba-4ade02d9c970"
              },
              {
                "uuid": "6c577ba0-a3a1-48f5-92d8-ca71c11751a3",
                "destination_uuid": "34cb64da-e817-4c45-a739-0f071e6eb003"
              }
            ]
          },
          {
            "uuid": "9e964c60-766e-429f-b3ba-4ade02d9c970",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5f182322-d9de-4d93-a1d1-2e3abc9f69b8"
              }
            ],
            "exits": [
              {
                "uuid": "4ccdeef7-1d59-49fd-88fa-6446a78d02e0",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "34cb64da-e817-4c45-a739-0f071e6eb003",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c30a058a-5f22-4fb6-bf68-330433fab3cd"
              }
            ],
            "exits": [
              {
                "uuid": "83235e4f-36f1-4cff-9ce7-65afd8181d03",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "91466e70-bf86-45d1-ba77-56a3f9dd8f89",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "89f73bdb-d769-4f94-9a30-68c6ddc186e8"
              }
            ],
            "exits": [
              {
                "uuid": "7dd08329-a4c9-444d-982d-394449b9fb63",
                "destination_uuid": "d3eb9be1-1d60-42b1-a95a-6e336b9d1977"
              }
            ]
          },
          {
            "uuid": "d3eb9be1-1d60-42b1-a95a-6e336b9d1977",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fce31648-7f79-44f2-91ac-44d15817a30a",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "5174aa4a-e7dc-41ed-b1d8-f773f8322b3d",
                  "type": "has_only_phrase",
                  "uuid": "3fb57ae9-539f-445b-925b-9bd4f3a95d83"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "fe0f5dca-8a8e-45b7-86e8-afb98a657a54",
                  "type": "has_only_phrase",
                  "uuid": "4e30d6b9-cd84-468f-94bf-93bcfdc59d3f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5ac751fd-414b-4b25-abbe-232c5ebfe436",
                  "name": "All Responses",
                  "uuid": "fce31648-7f79-44f2-91ac-44d15817a30a"
                },
                {
                  "exit_uuid": "048e1dc8-9d8c-4718-bbd6-4c10aa17c781",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "5174aa4a-e7dc-41ed-b1d8-f773f8322b3d"
                },
                {
                  "exit_uuid": "54e99a37-ffad-4943-af9a-d11e16a3ff8a",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "fe0f5dca-8a8e-45b7-86e8-afb98a657a54"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5ac751fd-414b-4b25-abbe-232c5ebfe436",
                "destination_uuid": null
              },
              {
                "uuid": "048e1dc8-9d8c-4718-bbd6-4c10aa17c781",
                "destination_uuid": "52dcaa0d-5a9c-4584-b2d1-686d4a173540"
              },
              {
                "uuid": "54e99a37-ffad-4943-af9a-d11e16a3ff8a",
                "destination_uuid": "139e18c8-982e-4661-9c37-4385dfe69b3f"
              }
            ]
          },
          {
            "uuid": "52dcaa0d-5a9c-4584-b2d1-686d4a173540",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "bcb24b60-2616-46b5-8658-b9aeab87e47f"
              }
            ],
            "exits": [
              {
                "uuid": "f372662e-b583-433f-86f7-65b414c51c95",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "139e18c8-982e-4661-9c37-4385dfe69b3f",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "939fd90e-d861-4b52-8709-8a60b8fb18ca"
              }
            ],
            "exits": [
              {
                "uuid": "12cca3a7-3e96-409f-88c7-4cacbb55eca5",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "cc3deca5-b47c-4151-91ff-35b13a8e01b9",
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
                "uuid": "a65d63c2-e1e0-4adc-822b-329af8c34ba6"
              }
            ],
            "exits": [
              {
                "uuid": "15637ce8-bd47-4a6c-82ae-57a5b3596693",
                "destination_uuid": "8ca5c68a-aa22-447b-99f1-c0b2badaa2b8"
              }
            ]
          },
          {
            "uuid": "8ca5c68a-aa22-447b-99f1-c0b2badaa2b8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "278c2bdc-4a02-4e0f-ab4d-b435fcce636f",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "c9b4b728-4cf9-4900-9384-759c858200b1",
                  "type": "has_only_phrase",
                  "uuid": "5c8f71c0-8be1-4308-9104-3534890d43af"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "eae69315-2896-4e23-80b5-2e0d8f35e673",
                  "type": "has_only_phrase",
                  "uuid": "6d022383-bc2b-4f5b-8f6c-7c7cb8f150dd"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "ea62a4f1-afbf-4e5b-aa10-b42c72d25e77",
                  "type": "has_only_phrase",
                  "uuid": "28e2c1ed-e3e8-4ae0-972d-d34a5b6ab585"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "19a97a76-2f09-40e8-82b1-954a2768d540",
                  "name": "All Responses",
                  "uuid": "278c2bdc-4a02-4e0f-ab4d-b435fcce636f"
                },
                {
                  "exit_uuid": "138acb36-fc68-4666-a005-101d0b9cd864",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "c9b4b728-4cf9-4900-9384-759c858200b1"
                },
                {
                  "exit_uuid": "5ccbe5b8-2b43-4186-8e12-51c9c64fe53f",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "eae69315-2896-4e23-80b5-2e0d8f35e673"
                },
                {
                  "exit_uuid": "a65cf945-8cd9-4fe2-a222-896ed79106a1",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "ea62a4f1-afbf-4e5b-aa10-b42c72d25e77"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "19a97a76-2f09-40e8-82b1-954a2768d540",
                "destination_uuid": null
              },
              {
                "uuid": "138acb36-fc68-4666-a005-101d0b9cd864",
                "destination_uuid": "e5882262-a1f3-4e5e-92cf-aa9fc4065a08"
              },
              {
                "uuid": "5ccbe5b8-2b43-4186-8e12-51c9c64fe53f",
                "destination_uuid": "6a368eba-c75d-4e4e-9e8e-807242a90b4a"
              },
              {
                "uuid": "a65cf945-8cd9-4fe2-a222-896ed79106a1",
                "destination_uuid": "9ecbca5b-757f-4400-8488-9baaa71389e7"
              }
            ]
          },
          {
            "uuid": "e5882262-a1f3-4e5e-92cf-aa9fc4065a08",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "52698724-29f7-4027-bfa2-f97f93e04561"
              }
            ],
            "exits": [
              {
                "uuid": "eb96dded-bd08-42fd-b419-5d7b571510f2",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "6a368eba-c75d-4e4e-9e8e-807242a90b4a",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "eff2c352-8746-46e4-a650-021a3068f75e"
              }
            ],
            "exits": [
              {
                "uuid": "d1246f0b-971a-412c-8b3d-784511e9d70a",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "9ecbca5b-757f-4400-8488-9baaa71389e7",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "21682f79-7b56-405c-b704-e22af6efeeb3"
              }
            ],
            "exits": [
              {
                "uuid": "319e1252-020b-4aec-9e7b-99a56a353256",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "90309e0d-c4d7-431c-be8d-68bcb560fbbf",
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
                "uuid": "d1f03b61-f46a-49ce-ab2e-04d245c441a2"
              }
            ],
            "exits": [
              {
                "uuid": "272596a7-c779-4190-884d-c9080e489a9b",
                "destination_uuid": "03642959-88a5-49c4-b20a-fec2e1903c24"
              }
            ]
          },
          {
            "uuid": "03642959-88a5-49c4-b20a-fec2e1903c24",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "526b0cfe-8347-4d78-8b7a-4e2708084f80",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "57a30004-9121-4c9d-bc82-d72f0a7e79c1",
                  "type": "has_only_phrase",
                  "uuid": "4ecd86ab-264e-48ff-bb42-20ee8a882ea5"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "bdda88eb-5abb-46f5-aafd-5672bb0abcac",
                  "type": "has_only_phrase",
                  "uuid": "34b663b1-7183-41a1-8906-69f9d031085a"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "3c1b8f4a-3622-4cb8-a363-19e2669fd8a8",
                  "type": "has_only_phrase",
                  "uuid": "a317cf93-7967-4fb7-8fff-2caa6810162a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d6671a62-3320-411f-b26f-15642fb2aa5b",
                  "name": "All Responses",
                  "uuid": "526b0cfe-8347-4d78-8b7a-4e2708084f80"
                },
                {
                  "exit_uuid": "b69ed2c3-60cc-4dab-aaa0-edb98220c225",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "57a30004-9121-4c9d-bc82-d72f0a7e79c1"
                },
                {
                  "exit_uuid": "d65ad825-d64f-4b55-bd7e-b86430beed03",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "bdda88eb-5abb-46f5-aafd-5672bb0abcac"
                },
                {
                  "exit_uuid": "0f22371f-0100-465a-aa49-e6463011db39",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "3c1b8f4a-3622-4cb8-a363-19e2669fd8a8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d6671a62-3320-411f-b26f-15642fb2aa5b",
                "destination_uuid": null
              },
              {
                "uuid": "b69ed2c3-60cc-4dab-aaa0-edb98220c225",
                "destination_uuid": "c54ca2f4-f882-44ca-98dd-66fa6094edf3"
              },
              {
                "uuid": "d65ad825-d64f-4b55-bd7e-b86430beed03",
                "destination_uuid": "c661c998-b8c2-46d2-86f2-598bfafaf2bb"
              },
              {
                "uuid": "0f22371f-0100-465a-aa49-e6463011db39",
                "destination_uuid": "20badd75-0bf8-42b6-824e-a9f2a1a91c43"
              }
            ]
          },
          {
            "uuid": "c54ca2f4-f882-44ca-98dd-66fa6094edf3",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "448da208-845c-407e-b41d-a63b72dd1105"
              }
            ],
            "exits": [
              {
                "uuid": "8dfdad65-ce2c-4e72-a026-87bf94f5c4d2",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "c661c998-b8c2-46d2-86f2-598bfafaf2bb",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ff22ac5b-b707-4dcd-85e5-548544903505"
              }
            ],
            "exits": [
              {
                "uuid": "3d71b474-5a0d-412d-91cb-2db52c776317",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "20badd75-0bf8-42b6-824e-a9f2a1a91c43",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "03c14c7e-85e4-4d72-a3d4-839d396d9a75"
              }
            ],
            "exits": [
              {
                "uuid": "0a4d6c5f-fa3d-45b7-b380-cffbd9eb9741",
                "destination_uuid": "49a4fedd-13e7-4893-b398-73725aa70552"
              }
            ]
          },
          {
            "uuid": "49a4fedd-13e7-4893-b398-73725aa70552",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6724e827-1bd3-4f25-b214-45b0c5908bdc",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "e4adfdf6-6662-467b-b9ee-8cec9cfca36f",
                  "type": "has_only_phrase",
                  "uuid": "3989e499-c5dd-4c10-9587-83d1cdf57777"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "77f117dd-6f62-4e92-b5eb-6590f813ff4d",
                  "name": "All Responses",
                  "uuid": "6724e827-1bd3-4f25-b214-45b0c5908bdc"
                },
                {
                  "exit_uuid": "e70e169e-aa31-4a7c-b13a-83c5e55162e8",
                  "name": "Next",
                  "uuid": "e4adfdf6-6662-467b-b9ee-8cec9cfca36f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "77f117dd-6f62-4e92-b5eb-6590f813ff4d",
                "destination_uuid": null
              },
              {
                "uuid": "e70e169e-aa31-4a7c-b13a-83c5e55162e8",
                "destination_uuid": "ffc9a3db-5f97-44c1-96e0-8e12c816eb72"
              }
            ]
          },
          {
            "uuid": "ffc9a3db-5f97-44c1-96e0-8e12c816eb72",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "373e4539-91b4-4fd3-ab96-5c4363dc28ed"
              }
            ],
            "exits": [
              {
                "uuid": "5dc8d09e-5279-433a-acf1-fa6b8335e2fa",
                "destination_uuid": "10398e12-d8e4-4f1c-86e5-db53937385e3"
              }
            ]
          },
          {
            "uuid": "10398e12-d8e4-4f1c-86e5-db53937385e3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "341072b8-abaf-4457-ae4b-f7ad68e47edb",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "b4f48ef2-3231-4c7e-b3ab-724051d624f8",
                  "type": "has_only_phrase",
                  "uuid": "1efec5f1-0104-413b-b391-899bc82c38cc"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "0cf52f6c-992d-489c-affd-bb9790f1e541",
                  "type": "has_only_phrase",
                  "uuid": "355a262e-42ff-4266-b701-22cc4d4bcd8d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "934d5e8d-fdcf-4611-bf65-4c06d08200df",
                  "name": "All Responses",
                  "uuid": "341072b8-abaf-4457-ae4b-f7ad68e47edb"
                },
                {
                  "exit_uuid": "586e8bb0-7b35-4c3e-b0ef-398ce732bfa0",
                  "name": "No",
                  "uuid": "b4f48ef2-3231-4c7e-b3ab-724051d624f8"
                },
                {
                  "exit_uuid": "5598cccd-2f41-41df-8c9c-dfd6d5d5cd71",
                  "name": "Yes",
                  "uuid": "0cf52f6c-992d-489c-affd-bb9790f1e541"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "934d5e8d-fdcf-4611-bf65-4c06d08200df",
                "destination_uuid": null
              },
              {
                "uuid": "586e8bb0-7b35-4c3e-b0ef-398ce732bfa0",
                "destination_uuid": "32b2b949-6fee-4400-8edd-cc2f1e82ce39"
              },
              {
                "uuid": "5598cccd-2f41-41df-8c9c-dfd6d5d5cd71",
                "destination_uuid": "6d9c1e9d-6aa7-4b4a-8c0d-aa951ce03e90"
              }
            ]
          },
          {
            "uuid": "32b2b949-6fee-4400-8edd-cc2f1e82ce39",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4df40c51-49b9-488d-b0f6-ef7fb7d2cacb"
              }
            ],
            "exits": [
              {
                "uuid": "e36f6747-7e37-4bc3-b224-1dae45261b97",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "6d9c1e9d-6aa7-4b4a-8c0d-aa951ce03e90",
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
                "uuid": "8c1cf43b-18ff-4024-9049-0a25de25c75b"
              }
            ],
            "exits": [
              {
                "uuid": "e5be2a72-525b-4cd7-b07e-73db826e98b3",
                "destination_uuid": "6ea11e66-8186-47c9-b71f-e888889dc6b3"
              }
            ]
          },
          {
            "uuid": "6ea11e66-8186-47c9-b71f-e888889dc6b3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ceaa4cdb-4a27-475c-a2f8-e20d855f6f6d",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "9860658b-e15e-4696-8fdc-7eeec69ba8e3",
                  "type": "has_only_phrase",
                  "uuid": "54695f9c-4a1f-4157-b18b-ab52dbb511d8"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "fc0836b0-ae8e-4b09-a42c-2f2290d71d94",
                  "type": "has_only_phrase",
                  "uuid": "8149c415-e09a-43d7-900c-59921b7b052c"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "c5f24e20-aa96-49e6-9951-10bcfdd3afd0",
                  "type": "has_only_phrase",
                  "uuid": "1f50ec41-1c1b-465c-9305-3110c86fdd73"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "d7728ce6-8ea5-49fc-835f-9f9c40a39001",
                  "type": "has_only_phrase",
                  "uuid": "8315cf73-0678-4ebe-903a-858eb3239c81"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "f5abe584-76ab-4711-bff9-e1e5f44a51f8",
                  "type": "has_only_phrase",
                  "uuid": "cb4e33fd-4653-4462-a9c4-e72a956d2c48"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "61eef15a-44b3-4c32-9a00-ed9e3c2ad86e",
                  "type": "has_only_phrase",
                  "uuid": "84dd000c-3e31-4a4a-9357-c7501e00d8c4"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "8a89e236-f307-4110-a41e-244ac35317c1",
                  "type": "has_only_phrase",
                  "uuid": "ce9d021a-a7ea-4620-b5a4-2688459d26aa"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "26b73b95-0a6a-4f14-a817-fe0489fa6043",
                  "type": "has_only_phrase",
                  "uuid": "d5245824-9d68-4c99-b940-cb1f2027c8ae"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "09810775-d796-4e08-b522-83cc81c1f051",
                  "name": "All Responses",
                  "uuid": "ceaa4cdb-4a27-475c-a2f8-e20d855f6f6d"
                },
                {
                  "exit_uuid": "8932b72d-6d70-42bb-9698-b27b85e487d5",
                  "name": "I don’t have enough time",
                  "uuid": "9860658b-e15e-4696-8fdc-7eeec69ba8e3"
                },
                {
                  "exit_uuid": "a5f1a3dc-e987-48ad-a8c0-ffd83374bb11",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "fc0836b0-ae8e-4b09-a42c-2f2290d71d94"
                },
                {
                  "exit_uuid": "882c9dc9-7ae9-4065-ac5b-b73fcf2e1b65",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "c5f24e20-aa96-49e6-9951-10bcfdd3afd0"
                },
                {
                  "exit_uuid": "97e2c81f-8382-4e8a-aa0e-2cdbe0394f29",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "d7728ce6-8ea5-49fc-835f-9f9c40a39001"
                },
                {
                  "exit_uuid": "957020c3-6078-42b4-a876-acff4c871d71",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "f5abe584-76ab-4711-bff9-e1e5f44a51f8"
                },
                {
                  "exit_uuid": "50fc7c9b-fb38-4d04-b05d-094d7adde97e",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "61eef15a-44b3-4c32-9a00-ed9e3c2ad86e"
                },
                {
                  "exit_uuid": "9c662dff-ce1f-49a5-b715-3903cb6a2a08",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "8a89e236-f307-4110-a41e-244ac35317c1"
                },
                {
                  "exit_uuid": "684e8b1f-9ba5-48d3-8610-597e33c57cf2",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "26b73b95-0a6a-4f14-a817-fe0489fa6043"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "09810775-d796-4e08-b522-83cc81c1f051",
                "destination_uuid": null
              },
              {
                "uuid": "8932b72d-6d70-42bb-9698-b27b85e487d5",
                "destination_uuid": "e86bc447-f0a1-48d8-a69b-a897bae2fe9f"
              },
              {
                "uuid": "a5f1a3dc-e987-48ad-a8c0-ffd83374bb11",
                "destination_uuid": "75b20707-e942-43d6-9a35-e5e710fddf6b"
              },
              {
                "uuid": "882c9dc9-7ae9-4065-ac5b-b73fcf2e1b65",
                "destination_uuid": "d60a3d5d-c231-44dc-8676-6a5c4ad15326"
              },
              {
                "uuid": "97e2c81f-8382-4e8a-aa0e-2cdbe0394f29",
                "destination_uuid": "e21cf450-82fb-43a4-8e57-652db5d0cec7"
              },
              {
                "uuid": "957020c3-6078-42b4-a876-acff4c871d71",
                "destination_uuid": "1f0a3b85-a6d2-4c5a-8ef3-0ed0c1c45a27"
              },
              {
                "uuid": "50fc7c9b-fb38-4d04-b05d-094d7adde97e",
                "destination_uuid": "91466e70-bf86-45d1-ba77-56a3f9dd8f89"
              },
              {
                "uuid": "9c662dff-ce1f-49a5-b715-3903cb6a2a08",
                "destination_uuid": "cc3deca5-b47c-4151-91ff-35b13a8e01b9"
              },
              {
                "uuid": "684e8b1f-9ba5-48d3-8610-597e33c57cf2",
                "destination_uuid": "90309e0d-c4d7-431c-be8d-68bcb560fbbf"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "81c2d40f-3f86-47aa-a158-983fcf466cb5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c30f7013-bcda-4851-8a1b-c48e3a30a1d9",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "df824066-75aa-497a-8cb8-ae49f2cdce9b"
              }
            ],
            "exits": [
              {
                "uuid": "67fb9254-610d-43d3-b2ef-4526fb64ee4c",
                "destination_uuid": "c1384f04-d3af-42d2-b21a-359c11e112bd"
              }
            ]
          },
          {
            "uuid": "c1384f04-d3af-42d2-b21a-359c11e112bd",
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
                "uuid": "021074c2-3149-44a8-b849-025790a0d2d0"
              }
            ],
            "exits": [
              {
                "uuid": "2c9026cb-d49e-4ca7-858e-f196a1fd268c",
                "destination_uuid": "92f80d4e-71da-457b-a671-bc94dcd7f710"
              }
            ]
          },
          {
            "uuid": "92f80d4e-71da-457b-a671-bc94dcd7f710",
            "actions": [],
            "exits": [
              {
                "uuid": "7be33a10-8b11-4626-b061-3aaa514ec079",
                "destination_uuid": "a5f2e751-ca52-4b8c-a002-df7907a3902f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7de42464-1c23-4559-b2d2-472f87d3bd06",
              "cases": [],
              "categories": [
                {
                  "uuid": "7de42464-1c23-4559-b2d2-472f87d3bd06",
                  "name": "All Responses",
                  "exit_uuid": "7be33a10-8b11-4626-b061-3aaa514ec079"
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
            "uuid": "a5f2e751-ca52-4b8c-a002-df7907a3902f",
            "actions": [
              {
                "uuid": "981ee638-e8a5-4ac2-8e03-5d2cae6e860e",
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
                "uuid": "2f8b8524-aacf-485e-923a-db7e377c0f2e",
                "destination_uuid": "f838a248-6ded-40cb-8a04-702f5b7ea5ac"
              }
            ]
          },
          {
            "uuid": "f838a248-6ded-40cb-8a04-702f5b7ea5ac",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "eb0c061c-8d0e-4828-89d8-fed60220ad49"
              }
            ],
            "exits": [
              {
                "uuid": "03e2d0dd-a2b7-4289-8d0d-24b6c1450b04",
                "destination_uuid": "0bb377d3-bce5-4936-99e8-fc2c69edde44"
              }
            ]
          },
          {
            "uuid": "0bb377d3-bce5-4936-99e8-fc2c69edde44",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e925edf2-2dc1-45c7-8b16-a51ea93357b2"
              }
            ],
            "exits": [
              {
                "uuid": "eda9be9d-d415-44f8-94fd-82f3f4892a54",
                "destination_uuid": "729fd549-efc3-4b73-9c17-37479a435150"
              }
            ]
          },
          {
            "uuid": "729fd549-efc3-4b73-9c17-37479a435150",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e2a62774-9fef-4f58-8275-71db8a03341c"
              }
            ],
            "exits": [
              {
                "uuid": "9acf0d72-7b6a-4249-9cb5-1b2fba8a1044",
                "destination_uuid": "74678ca8-6aa9-4f5c-ac48-53b968592483"
              }
            ]
          },
          {
            "uuid": "74678ca8-6aa9-4f5c-ac48-53b968592483",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "747846da-3138-411f-8da3-7963620f84ea"
              }
            ],
            "exits": [
              {
                "uuid": "0f7e3891-a27a-46f4-9ee2-325819435e18",
                "destination_uuid": "efe68f20-eed3-4ec3-87c8-2f553d1de436"
              }
            ]
          },
          {
            "uuid": "efe68f20-eed3-4ec3-87c8-2f553d1de436",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5bef35e6-3f6d-4389-84d9-6e15e5ad8dc4",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "3b236f7d-bb19-470e-8929-56a908175e47",
                  "type": "has_only_phrase",
                  "uuid": "99001a59-7bde-4431-a3ff-29a8fbd81fc5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c1732248-227b-43d6-986c-73aafc2b35f0",
                  "name": "All Responses",
                  "uuid": "5bef35e6-3f6d-4389-84d9-6e15e5ad8dc4"
                },
                {
                  "exit_uuid": "e8904df4-6865-4ec6-ac60-1a463f23a2a2",
                  "name": "Let me hear your story",
                  "uuid": "3b236f7d-bb19-470e-8929-56a908175e47"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c1732248-227b-43d6-986c-73aafc2b35f0",
                "destination_uuid": null
              },
              {
                "uuid": "e8904df4-6865-4ec6-ac60-1a463f23a2a2",
                "destination_uuid": "9f428cc8-2f1a-4328-8ff1-64d98ae7fa5c"
              }
            ]
          },
          {
            "uuid": "9f428cc8-2f1a-4328-8ff1-64d98ae7fa5c",
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
                "uuid": "a2ce350d-addd-4d52-824d-d740bf46c99d"
              }
            ],
            "exits": [
              {
                "uuid": "b8e37c5e-92da-4f6a-a0d0-871f9040fd87",
                "destination_uuid": "2379fcf5-1a66-4021-896f-94a861147bb5"
              }
            ]
          },
          {
            "uuid": "2379fcf5-1a66-4021-896f-94a861147bb5",
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
                "uuid": "a372681f-5dfa-47d5-b498-0bba30727ebf"
              }
            ],
            "exits": [
              {
                "uuid": "7c049096-9ced-469d-a4cc-c8291373e74c",
                "destination_uuid": "f62ad919-361f-4a62-8a88-13d3da8fe41d"
              }
            ]
          },
          {
            "uuid": "f62ad919-361f-4a62-8a88-13d3da8fe41d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6d9e3217-541f-4c83-9db5-2845e0a9fc59",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "714cf382-a17d-4938-825a-96f10cb315ca",
                  "type": "has_only_phrase",
                  "uuid": "b5bef853-888a-435c-b789-8cdb9cff6710"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "556a9c0c-558d-4566-8955-3663b7df41f2",
                  "type": "has_only_phrase",
                  "uuid": "8f7a327a-e32c-4416-94b3-380269117b2e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3c73655d-b66d-41f0-84ae-314d835b0c19",
                  "name": "All Responses",
                  "uuid": "6d9e3217-541f-4c83-9db5-2845e0a9fc59"
                },
                {
                  "exit_uuid": "6de81c92-e56c-4e12-9aa3-399bd3760799",
                  "name": "Previous",
                  "uuid": "714cf382-a17d-4938-825a-96f10cb315ca"
                },
                {
                  "exit_uuid": "8b4b877e-d9d9-41e2-9ca5-0981f4447e36",
                  "name": "Next",
                  "uuid": "556a9c0c-558d-4566-8955-3663b7df41f2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3c73655d-b66d-41f0-84ae-314d835b0c19",
                "destination_uuid": null
              },
              {
                "uuid": "6de81c92-e56c-4e12-9aa3-399bd3760799",
                "destination_uuid": "9f428cc8-2f1a-4328-8ff1-64d98ae7fa5c"
              },
              {
                "uuid": "8b4b877e-d9d9-41e2-9ca5-0981f4447e36",
                "destination_uuid": "75de3b91-33c8-4eec-9ab2-5b9716d43be7"
              }
            ]
          },
          {
            "uuid": "75de3b91-33c8-4eec-9ab2-5b9716d43be7",
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
                "uuid": "2b68dbbd-8307-4bb5-9883-a436c4295cf7"
              }
            ],
            "exits": [
              {
                "uuid": "38266144-7f25-4f0d-a08b-657180788593",
                "destination_uuid": "483b45f5-cd1c-4427-af5b-e9261f0a5188"
              }
            ]
          },
          {
            "uuid": "483b45f5-cd1c-4427-af5b-e9261f0a5188",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3b90df4f-3550-47ce-b154-7f9604faa833",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "ebe72363-1d8a-405b-b668-6640272c0867",
                  "type": "has_only_phrase",
                  "uuid": "752f8ca2-1aea-48d3-8e64-8201862a970e"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "37c23902-3eda-4c3b-b40c-04f3d1d715b5",
                  "type": "has_only_phrase",
                  "uuid": "12e737bd-086e-4275-a741-45d08f82a110"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "88efa55c-eca9-478c-928a-74ae37803541",
                  "name": "All Responses",
                  "uuid": "3b90df4f-3550-47ce-b154-7f9604faa833"
                },
                {
                  "exit_uuid": "943bd0ec-0743-4933-b53d-1950d982326f",
                  "name": "Previous",
                  "uuid": "ebe72363-1d8a-405b-b668-6640272c0867"
                },
                {
                  "exit_uuid": "6d9f615a-6ca1-4d54-9c2e-3d3ca5ccb121",
                  "name": "Next",
                  "uuid": "37c23902-3eda-4c3b-b40c-04f3d1d715b5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "88efa55c-eca9-478c-928a-74ae37803541",
                "destination_uuid": null
              },
              {
                "uuid": "943bd0ec-0743-4933-b53d-1950d982326f",
                "destination_uuid": "2379fcf5-1a66-4021-896f-94a861147bb5"
              },
              {
                "uuid": "6d9f615a-6ca1-4d54-9c2e-3d3ca5ccb121",
                "destination_uuid": "2f0ddbf5-a58f-412a-9dde-a5f40f0cd034"
              }
            ]
          },
          {
            "uuid": "2f0ddbf5-a58f-412a-9dde-a5f40f0cd034",
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
                "uuid": "8893e4c6-ce09-44fb-8f57-83cf6b814985"
              }
            ],
            "exits": [
              {
                "uuid": "4e642c8e-4eac-4f6b-83ea-2bcc037fec57",
                "destination_uuid": "f5736994-e4bf-4f1d-8f5c-e69e5d16eb00"
              }
            ]
          },
          {
            "uuid": "f5736994-e4bf-4f1d-8f5c-e69e5d16eb00",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "857884b4-69ba-41dc-82c6-6be3e31db73f",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "1837849d-c1f3-4770-b4ee-5b2faef7adc0",
                  "type": "has_only_phrase",
                  "uuid": "ae4c043f-2412-4c76-93a1-65e608c1aa4f"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "a58fffd4-fdf1-4b18-98b8-c8629d704e28",
                  "type": "has_only_phrase",
                  "uuid": "871ce6b1-3774-469b-9a22-34eb638bf3cd"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2f98e2d6-4928-436e-8730-f6a426c69814",
                  "name": "All Responses",
                  "uuid": "857884b4-69ba-41dc-82c6-6be3e31db73f"
                },
                {
                  "exit_uuid": "209695b3-fc70-4213-b8e3-1ae0421ffab9",
                  "name": "Previous",
                  "uuid": "1837849d-c1f3-4770-b4ee-5b2faef7adc0"
                },
                {
                  "exit_uuid": "c3891eac-222c-4d4f-a480-d936cc230558",
                  "name": "Next",
                  "uuid": "a58fffd4-fdf1-4b18-98b8-c8629d704e28"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2f98e2d6-4928-436e-8730-f6a426c69814",
                "destination_uuid": null
              },
              {
                "uuid": "209695b3-fc70-4213-b8e3-1ae0421ffab9",
                "destination_uuid": "75de3b91-33c8-4eec-9ab2-5b9716d43be7"
              },
              {
                "uuid": "c3891eac-222c-4d4f-a480-d936cc230558",
                "destination_uuid": "b3a8c7e9-ac91-4cc7-9e6b-beda8f75565b"
              }
            ]
          },
          {
            "uuid": "b3a8c7e9-ac91-4cc7-9e6b-beda8f75565b",
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
                "uuid": "7f63d8ea-f173-48c1-b204-941b131ba953"
              }
            ],
            "exits": [
              {
                "uuid": "e6b8cf95-d7e1-46d2-90f4-2c85278cd07f",
                "destination_uuid": "69ef31e5-55f4-42f6-bb0e-ed5ea36535b8"
              }
            ]
          },
          {
            "uuid": "69ef31e5-55f4-42f6-bb0e-ed5ea36535b8",
            "actions": [],
            "exits": [
              {
                "uuid": "949a3f3e-c9b7-4057-b9c3-1c54bb18311d",
                "destination_uuid": "9707224c-ec06-4ec5-9b40-c4007e8eda4e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f5f0d8fc-0736-499b-a8ea-156734c6e2d0",
              "cases": [],
              "categories": [
                {
                  "uuid": "f5f0d8fc-0736-499b-a8ea-156734c6e2d0",
                  "name": "All Responses",
                  "exit_uuid": "949a3f3e-c9b7-4057-b9c3-1c54bb18311d"
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
            "uuid": "9707224c-ec06-4ec5-9b40-c4007e8eda4e",
            "actions": [
              {
                "uuid": "ab908778-8575-49e5-a930-7f77ace45dce",
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
                "uuid": "d9962ac7-99ca-4165-9d5a-8221b769d703",
                "destination_uuid": "9fd909c5-6fab-44b0-bf29-68fcee3fdde8"
              }
            ]
          },
          {
            "uuid": "9fd909c5-6fab-44b0-bf29-68fcee3fdde8",
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
                "uuid": "8177c367-a551-4120-9424-20a0894845f4"
              }
            ],
            "exits": [
              {
                "uuid": "5bab6600-dc77-4937-a6e1-7ac63ff25f11",
                "destination_uuid": "d90ba2c1-73e4-42ce-8992-ffa7116f0f08"
              }
            ]
          },
          {
            "uuid": "d90ba2c1-73e4-42ce-8992-ffa7116f0f08",
            "actions": [],
            "exits": [
              {
                "uuid": "322468e6-04d9-4044-ae9d-d8aa8efd878d",
                "destination_uuid": "552cf162-169e-49d9-9261-9eca88ad077c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6eda01d5-04cb-4df6-bb6d-59edfcaeceab",
              "cases": [],
              "categories": [
                {
                  "uuid": "6eda01d5-04cb-4df6-bb6d-59edfcaeceab",
                  "name": "All Responses",
                  "exit_uuid": "322468e6-04d9-4044-ae9d-d8aa8efd878d"
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
            "uuid": "552cf162-169e-49d9-9261-9eca88ad077c",
            "actions": [
              {
                "uuid": "fda35337-388b-4a45-b64a-835cf06384dd",
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
                "uuid": "ad9609f0-a6e4-40fc-b163-3b992c590b8f",
                "destination_uuid": "9bf9458a-e311-4e50-985e-8e40798a7dcf"
              }
            ]
          },
          {
            "uuid": "9bf9458a-e311-4e50-985e-8e40798a7dcf",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f8e452b6-57f1-4b39-beb0-1c9e420eacee"
              }
            ],
            "exits": [
              {
                "uuid": "795ee6b0-a8a7-4b6a-a304-7e548a522d2c",
                "destination_uuid": "a466e908-37b0-427a-aa52-805a3e1aa0e0"
              }
            ]
          },
          {
            "uuid": "a466e908-37b0-427a-aa52-805a3e1aa0e0",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "f0be9d01-9a2c-4a05-9823-acfaac766055"
              }
            ],
            "exits": [
              {
                "uuid": "e849ede9-ea56-44fb-9b39-6ed52faa9018",
                "destination_uuid": "73506507-a13b-4270-8e4e-e71c1f16388b"
              }
            ]
          },
          {
            "uuid": "73506507-a13b-4270-8e4e-e71c1f16388b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a76ea952-6685-4fc2-9ab2-94e0998e5df6",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "a2358e6c-f714-4dcd-8ee5-f3d6072cde04",
                  "type": "has_only_phrase",
                  "uuid": "8216d154-6d49-4325-bfd4-987850634a17"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "df2b8924-6fa3-4870-8d53-fb038aebae34",
                  "type": "has_only_phrase",
                  "uuid": "e8b91242-2acf-43ca-a3e4-ca61dc37b489"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "78b67e72-627d-48cc-a1ec-b536601ed536",
                  "name": "All Responses",
                  "uuid": "a76ea952-6685-4fc2-9ab2-94e0998e5df6"
                },
                {
                  "exit_uuid": "2443f1a4-b315-4987-9fe6-c2815500d7fa",
                  "name": "Take me to Tips",
                  "uuid": "a2358e6c-f714-4dcd-8ee5-f3d6072cde04"
                },
                {
                  "exit_uuid": "d31ee3f9-d576-4464-a4c4-4ccc7cbe45f0",
                  "name": "Take me to Homescreen",
                  "uuid": "df2b8924-6fa3-4870-8d53-fb038aebae34"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "78b67e72-627d-48cc-a1ec-b536601ed536",
                "destination_uuid": null
              },
              {
                "uuid": "2443f1a4-b315-4987-9fe6-c2815500d7fa",
                "destination_uuid": "b03e7453-ce9a-480c-b70d-436f2b6c7305"
              },
              {
                "uuid": "d31ee3f9-d576-4464-a4c4-4ccc7cbe45f0",
                "destination_uuid": "f55a90c5-0970-4452-b031-be56847aa205"
              }
            ]
          },
          {
            "uuid": "b03e7453-ce9a-480c-b70d-436f2b6c7305",
            "actions": [
              {
                "uuid": "46ff82a5-a499-40fc-b23a-861b28e37d55",
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
                "uuid": "299f11a3-4d8d-4feb-83db-b48d5471d43a",
                "destination_uuid": "6b621a91-38c1-4f71-923d-51244328fb53"
              }
            ]
          },
          {
            "uuid": "6b621a91-38c1-4f71-923d-51244328fb53",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "726174b8-bfff-45b9-9cc2-cb91861c8d59"
                },
                "type": "enter_flow",
                "uuid": "1f9c9690-d5ef-43ee-a884-664e93217aaf"
              }
            ],
            "exits": [
              {
                "uuid": "86e643f9-217c-4181-b921-0ef8403ac470",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f55a90c5-0970-4452-b031-be56847aa205",
            "actions": [
              {
                "uuid": "89b1f742-2b21-4156-85f4-3c530110bae3",
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
                "uuid": "ddc0e632-2d1e-4230-be50-1b8e2ecdb1db",
                "destination_uuid": "a4b1c2e9-8b7e-4463-8f78-16bdf6e13fc5"
              }
            ]
          },
          {
            "uuid": "a4b1c2e9-8b7e-4463-8f78-16bdf6e13fc5",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "5da2a8c1-8f98-4241-bdbe-a09f47561aea"
                },
                "type": "enter_flow",
                "uuid": "5ef310ed-1c2c-490a-b01d-18f65dcb95eb"
              }
            ],
            "exits": [
              {
                "uuid": "4244bc97-e328-48e9-b2ca-329231d1c145",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "110c2f92-a8af-4d88-a429-6096bf3a14dc",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "722354dd-9204-4a5e-b1f6-38f65ef57e81",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "76375e50-f64c-46c5-a038-08dd9d7e1601"
              }
            ],
            "exits": [
              {
                "uuid": "7d6a4387-cf93-44a5-a761-4ce50f8e1401",
                "destination_uuid": "d28cbc47-1c6b-40bf-9af3-4fbc96ee8de1"
              }
            ]
          },
          {
            "uuid": "d28cbc47-1c6b-40bf-9af3-4fbc96ee8de1",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "55fdf3d6-4831-45ad-8683-dd3010c03e6d"
              }
            ],
            "exits": [
              {
                "uuid": "e2a974c5-5ac4-490a-8b59-7e4c725ad6b7",
                "destination_uuid": "5fac29e3-dd3c-49f0-9300-476acf6f4b8a"
              }
            ]
          },
          {
            "uuid": "5fac29e3-dd3c-49f0-9300-476acf6f4b8a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f5b4e84a-6cfe-49bf-b744-7c048e23870b",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "d751f4e0-22ad-4ad4-b436-618f78f8cbc8",
                  "type": "has_only_phrase",
                  "uuid": "077c5614-8267-457f-8372-45c4743b9c9e"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "0aab44b4-c200-4ec4-b1af-1fee8d0b4ad0",
                  "type": "has_only_phrase",
                  "uuid": "4701cb0a-eb57-4874-a300-c569471e0840"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "01117968-2932-4d0e-abee-a0b49b60ebe3",
                  "name": "All Responses",
                  "uuid": "f5b4e84a-6cfe-49bf-b744-7c048e23870b"
                },
                {
                  "exit_uuid": "db43b6e4-349c-4ed2-bfd5-fc50160c04f2",
                  "name": "Later",
                  "uuid": "d751f4e0-22ad-4ad4-b436-618f78f8cbc8"
                },
                {
                  "exit_uuid": "9a2d1ec8-9112-4e63-9387-7561021c030e",
                  "name": "Yes",
                  "uuid": "0aab44b4-c200-4ec4-b1af-1fee8d0b4ad0"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "01117968-2932-4d0e-abee-a0b49b60ebe3",
                "destination_uuid": null
              },
              {
                "uuid": "db43b6e4-349c-4ed2-bfd5-fc50160c04f2",
                "destination_uuid": "b7de6c07-3887-4b2a-b6c6-1845d49f38f7"
              },
              {
                "uuid": "9a2d1ec8-9112-4e63-9387-7561021c030e",
                "destination_uuid": "e2aa1059-8991-4b41-b8e4-2b4d70f3b8a7"
              }
            ]
          },
          {
            "uuid": "b7de6c07-3887-4b2a-b6c6-1845d49f38f7",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "4928c025-e74f-4615-b2db-2f7f38de9862"
                },
                "type": "enter_flow",
                "uuid": "7707e0f2-dfd8-444b-ac15-490c438a83f6"
              }
            ],
            "exits": [
              {
                "uuid": "a4159895-a6ba-4ae7-b64d-946ad4ec491c",
                "destination_uuid": null
              },
              {
                "uuid": "c42066d5-4b4e-4ce7-984f-272b33c3f1dc",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ca9dd220-0f5a-4612-a275-0c3cbadc91e4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f5ff24ec-bd30-4157-9ef0-e7937176f5ab"
                },
                {
                  "uuid": "dd6bace6-0baa-4389-af67-1d6f92878a38",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d21ca9fd-0d2a-466c-83a7-c5e398f5c94e"
                }
              ],
              "categories": [
                {
                  "uuid": "f5ff24ec-bd30-4157-9ef0-e7937176f5ab",
                  "name": "Complete",
                  "exit_uuid": "a4159895-a6ba-4ae7-b64d-946ad4ec491c"
                },
                {
                  "uuid": "d21ca9fd-0d2a-466c-83a7-c5e398f5c94e",
                  "name": "Expired",
                  "exit_uuid": "c42066d5-4b4e-4ce7-984f-272b33c3f1dc"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f5ff24ec-bd30-4157-9ef0-e7937176f5ab"
            }
          },
          {
            "uuid": "e2aa1059-8991-4b41-b8e4-2b4d70f3b8a7",
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
                "uuid": "1d9d0b97-29dd-4106-9bef-8a5e4badfa4f"
              }
            ],
            "exits": [
              {
                "uuid": "10dba74c-4824-49d0-91f6-b74a769f1bd3",
                "destination_uuid": "3152c4bb-f25f-416e-8251-255a33703506"
              }
            ]
          },
          {
            "uuid": "3152c4bb-f25f-416e-8251-255a33703506",
            "actions": [],
            "exits": [
              {
                "uuid": "18f9717e-058f-4ed3-8b6c-c07d2488a749",
                "destination_uuid": "f7e79ffa-6176-4b7b-8557-314737948329"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "6368d20b-36e1-48b2-922e-d655d37cd0c1",
              "cases": [],
              "categories": [
                {
                  "uuid": "6368d20b-36e1-48b2-922e-d655d37cd0c1",
                  "name": "All Responses",
                  "exit_uuid": "18f9717e-058f-4ed3-8b6c-c07d2488a749"
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
            "uuid": "f7e79ffa-6176-4b7b-8557-314737948329",
            "actions": [
              {
                "uuid": "06da73a7-a021-4234-88ff-636cbbe7d994",
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
                "uuid": "76c151db-231a-4c56-a54a-5c8f46b63e77",
                "destination_uuid": "bf0e19b9-7a7c-437a-bb78-3db38ed3eba4"
              }
            ]
          },
          {
            "uuid": "bf0e19b9-7a7c-437a-bb78-3db38ed3eba4",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "b4a82dfb-db68-40f2-aa89-46ccaf4a73a3"
              }
            ],
            "exits": [
              {
                "uuid": "a0cbae6b-8dac-42db-a626-6d09d7e0e019",
                "destination_uuid": "78d93c39-987c-45ee-bcbc-18f799d585d3"
              }
            ]
          },
          {
            "uuid": "78d93c39-987c-45ee-bcbc-18f799d585d3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "583ffa4d-b4dc-4084-b6ca-64c7c1171405",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "7afe42bd-72b5-401a-a0c0-9e7d9bc32413",
                  "type": "has_only_phrase",
                  "uuid": "1372d403-5354-4405-9e27-461f3047870a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0d46e59f-a638-4a2c-9c02-b4fe318f1518",
                  "name": "All Responses",
                  "uuid": "583ffa4d-b4dc-4084-b6ca-64c7c1171405"
                },
                {
                  "exit_uuid": "a30a708c-bb8e-4c5e-b585-a3731fc2a768",
                  "name": "Click here when done",
                  "uuid": "7afe42bd-72b5-401a-a0c0-9e7d9bc32413"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0d46e59f-a638-4a2c-9c02-b4fe318f1518",
                "destination_uuid": null
              },
              {
                "uuid": "a30a708c-bb8e-4c5e-b585-a3731fc2a768",
                "destination_uuid": "b9a6383a-4ea4-4ff9-9360-177a724cf582"
              }
            ]
          },
          {
            "uuid": "b9a6383a-4ea4-4ff9-9360-177a724cf582",
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
                "uuid": "323faff3-5d18-47f6-9da2-6af76ad7c4e4"
              }
            ],
            "exits": [
              {
                "uuid": "2a9071a7-ec1b-4fb3-9060-5f771e27e528",
                "destination_uuid": "369410c7-6dcf-4db4-862f-82e63cb901c0"
              }
            ]
          },
          {
            "uuid": "369410c7-6dcf-4db4-862f-82e63cb901c0",
            "actions": [],
            "exits": [
              {
                "uuid": "b7685b3c-62ad-43f5-80ec-c8513faa309e",
                "destination_uuid": "574d62e5-c6ee-4e23-9a6c-4bd23a4442c4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "55f8a4c7-0f13-4383-9c64-3959230b2c98",
              "cases": [],
              "categories": [
                {
                  "uuid": "55f8a4c7-0f13-4383-9c64-3959230b2c98",
                  "name": "All Responses",
                  "exit_uuid": "b7685b3c-62ad-43f5-80ec-c8513faa309e"
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
            "uuid": "574d62e5-c6ee-4e23-9a6c-4bd23a4442c4",
            "actions": [
              {
                "uuid": "ad64e353-bb29-4942-96f0-74854fc872f9",
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
                "uuid": "9a861d18-c3d9-403d-8c3a-62af90b50372",
                "destination_uuid": "6bff6a98-21b2-4e2a-9a37-49c27036e861"
              }
            ]
          },
          {
            "uuid": "6bff6a98-21b2-4e2a-9a37-49c27036e861",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "2698e5db-3257-4927-ba86-7a960a8dfeb7"
              }
            ],
            "exits": [
              {
                "uuid": "c4b02b70-38d7-47de-9087-0702abd454ef",
                "destination_uuid": "f802b07b-71af-4119-ab34-a2ec99986d2b"
              }
            ]
          },
          {
            "uuid": "f802b07b-71af-4119-ab34-a2ec99986d2b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "36c55ed7-08dd-42fb-83f0-cd53862b7ffa",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "6f3307d7-0027-45f7-8482-6d694585bb25",
                  "type": "has_only_phrase",
                  "uuid": "39fbe75f-702a-43f0-9f53-2c6351808db5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c7869f68-1ddd-4c22-89d9-1fc04da63bcc",
                  "name": "All Responses",
                  "uuid": "36c55ed7-08dd-42fb-83f0-cd53862b7ffa"
                },
                {
                  "exit_uuid": "0cc3286c-f55d-4c48-a8a2-486427ade9af",
                  "name": "Click here when done",
                  "uuid": "6f3307d7-0027-45f7-8482-6d694585bb25"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c7869f68-1ddd-4c22-89d9-1fc04da63bcc",
                "destination_uuid": null
              },
              {
                "uuid": "0cc3286c-f55d-4c48-a8a2-486427ade9af",
                "destination_uuid": "d13d0273-ca68-4697-a5dc-8aa38e4a933b"
              }
            ]
          },
          {
            "uuid": "d13d0273-ca68-4697-a5dc-8aa38e4a933b",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6636ef95-6d1e-4489-821a-211dc89da6dc"
              }
            ],
            "exits": [
              {
                "uuid": "c30b0d70-ae3e-48f5-b0a3-c6f98404361b",
                "destination_uuid": "660d300a-f66f-42ae-b1cb-0ec895405498"
              }
            ]
          },
          {
            "uuid": "660d300a-f66f-42ae-b1cb-0ec895405498",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "533c4c9d-adce-4ef0-9692-83daae2cc00e"
              }
            ],
            "exits": [
              {
                "uuid": "318ccdb1-e0a8-4e69-840b-d04b2d84ba66",
                "destination_uuid": "e8a76bbd-0f07-4741-a374-66bf064feca8"
              }
            ]
          },
          {
            "uuid": "e8a76bbd-0f07-4741-a374-66bf064feca8",
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
                "uuid": "a0b68ccc-408b-4d36-9b4b-36db40b52652"
              }
            ],
            "exits": [
              {
                "uuid": "cc945a11-fc75-48ca-8c8c-5e6b5bf4b313",
                "destination_uuid": "0192239d-ef96-48d0-a6d1-76556e523044"
              }
            ]
          },
          {
            "uuid": "0192239d-ef96-48d0-a6d1-76556e523044",
            "actions": [],
            "exits": [
              {
                "uuid": "32df3ae9-de7e-4789-a8d5-1955a5688a92",
                "destination_uuid": "268994a6-2aa6-4220-a31b-9b1f838765b8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "9c882f3b-f471-48f1-9079-c960a398347b",
              "cases": [],
              "categories": [
                {
                  "uuid": "9c882f3b-f471-48f1-9079-c960a398347b",
                  "name": "All Responses",
                  "exit_uuid": "32df3ae9-de7e-4789-a8d5-1955a5688a92"
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
            "uuid": "268994a6-2aa6-4220-a31b-9b1f838765b8",
            "actions": [
              {
                "uuid": "f31dedfd-ca71-4862-8344-92ea4c752bb8",
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
                "uuid": "7808d1d4-9b13-4084-8374-fc20ca3dce8c",
                "destination_uuid": "5c188a1b-0a63-4965-90f5-df9189e2ab7f"
              }
            ]
          },
          {
            "uuid": "5c188a1b-0a63-4965-90f5-df9189e2ab7f",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "95ee5bd0-bfde-4868-8fa8-125a3653bf51"
              }
            ],
            "exits": [
              {
                "uuid": "c01512cf-b529-4100-876c-269ce54a0209",
                "destination_uuid": "e16ea097-d665-4734-9df7-09b49ed7b6a8"
              }
            ]
          },
          {
            "uuid": "e16ea097-d665-4734-9df7-09b49ed7b6a8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "627548e0-151e-4461-a29a-550d7a9f908b",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "9e873ef5-498c-4374-a58b-d8e92c186024",
                  "type": "has_only_phrase",
                  "uuid": "fb0e9bc0-7aac-4048-b41b-51c4a203d07c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "76078b4c-01e1-4e19-9f41-f521801eae7d",
                  "name": "All Responses",
                  "uuid": "627548e0-151e-4461-a29a-550d7a9f908b"
                },
                {
                  "exit_uuid": "35eb8063-32e0-4418-b87b-2ad6958bf091",
                  "name": "Take me to Homescreen",
                  "uuid": "9e873ef5-498c-4374-a58b-d8e92c186024"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "76078b4c-01e1-4e19-9f41-f521801eae7d",
                "destination_uuid": null
              },
              {
                "uuid": "35eb8063-32e0-4418-b87b-2ad6958bf091",
                "destination_uuid": "f44292ad-2dea-461a-bbad-30883b63e6e0"
              }
            ]
          },
          {
            "uuid": "f44292ad-2dea-461a-bbad-30883b63e6e0",
            "actions": [
              {
                "uuid": "09e324d8-5ff5-4b35-8963-546d701d2cca",
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
                "uuid": "cf32beb2-b922-414b-afe4-6492646dba3f",
                "destination_uuid": "0544d543-30be-49ed-a28e-cadc8040256f"
              }
            ]
          },
          {
            "uuid": "0544d543-30be-49ed-a28e-cadc8040256f",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "5961f780-429a-4fe2-b864-a2a2b4750e86"
                },
                "type": "enter_flow",
                "uuid": "1c993835-3fa0-4ab2-b9e6-7a22cbf92629"
              }
            ],
            "exits": [
              {
                "uuid": "647f90c0-cda5-444e-b040-c47f8643b3af",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "18391bcd-aae5-41b1-9539-ca55b412505d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "dff08db1-33c8-408e-96b5-682fe74bea1a",
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
                "uuid": "a2252794-d315-4010-a15a-380b80d9e0cb"
              }
            ],
            "exits": [
              {
                "uuid": "200b646a-a3d9-487c-8169-990a18b239a2",
                "destination_uuid": "516acb58-6b0c-4d36-b70f-d58ff8575b17"
              }
            ]
          },
          {
            "uuid": "516acb58-6b0c-4d36-b70f-d58ff8575b17",
            "actions": [],
            "exits": [
              {
                "uuid": "30eb674d-47b2-4277-b07c-d42e1574a4ca",
                "destination_uuid": "7170667d-1f75-483b-8fbf-12b69421d41c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "bfa481e6-f155-4073-88d4-4bc8db94a08f",
              "cases": [],
              "categories": [
                {
                  "uuid": "bfa481e6-f155-4073-88d4-4bc8db94a08f",
                  "name": "All Responses",
                  "exit_uuid": "30eb674d-47b2-4277-b07c-d42e1574a4ca"
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
            "uuid": "7170667d-1f75-483b-8fbf-12b69421d41c",
            "actions": [
              {
                "uuid": "6623e23e-a10a-4451-baff-c4f0f6e29bfd",
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
                "uuid": "4467def5-8ec3-4222-a76c-96c27676f1ed",
                "destination_uuid": "2cc88a32-e1b4-4277-b89f-24b01c484926"
              }
            ]
          },
          {
            "uuid": "2cc88a32-e1b4-4277-b89f-24b01c484926",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a6adaaec-6c27-4f88-9e98-6661947767eb",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "c46c298b-5612-4aa2-88d0-8aa7920f6fb2",
                  "type": "has_only_phrase",
                  "uuid": "46c3169c-6c9f-4690-8055-2c5e865aa0b9"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "33b4ff07-3056-422c-b075-58c41b488417",
                  "type": "has_only_phrase",
                  "uuid": "f87ceacc-2411-45fb-8b35-84656a008baa"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "33b4ff07-3056-422c-b075-58c41b488417",
                  "type": "has_only_phrase",
                  "uuid": "338b54d1-e790-443d-a2bb-a790c59e9b34"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ae955638-16ec-4cf0-b1be-8ec5e45b678c",
                  "name": "All Responses",
                  "uuid": "a6adaaec-6c27-4f88-9e98-6661947767eb"
                },
                {
                  "exit_uuid": "9f80405c-9d54-4e0a-af2e-9f4289ebe845",
                  "name": "Great",
                  "uuid": "c46c298b-5612-4aa2-88d0-8aa7920f6fb2"
                },
                {
                  "exit_uuid": "d084d43e-f3d9-43b4-bb4d-cf11d5709459",
                  "name": "Neutral; Bad",
                  "uuid": "33b4ff07-3056-422c-b075-58c41b488417"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "ae955638-16ec-4cf0-b1be-8ec5e45b678c",
                "destination_uuid": null
              },
              {
                "uuid": "9f80405c-9d54-4e0a-af2e-9f4289ebe845",
                "destination_uuid": "92e09528-bbf0-43ba-a652-771b82f05f65"
              },
              {
                "uuid": "d084d43e-f3d9-43b4-bb4d-cf11d5709459",
                "destination_uuid": "8e273b5f-5b16-4a6f-a916-34a27c04f822"
              }
            ]
          },
          {
            "uuid": "92e09528-bbf0-43ba-a652-771b82f05f65",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "cf2add37-4e46-494a-9343-018bc73ef43c"
              }
            ],
            "exits": [
              {
                "uuid": "9495bf9d-8d20-4d78-adbd-6d9e4af7e4e4",
                "destination_uuid": "a03cad4f-989d-42a2-9f3f-b1279d363457"
              }
            ]
          },
          {
            "uuid": "8e273b5f-5b16-4a6f-a916-34a27c04f822",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "c0c0f062-a0fa-4f2b-8dff-694a8d47e19d"
              }
            ],
            "exits": [
              {
                "uuid": "37051267-31ae-48d3-948e-1e7139002d1f",
                "destination_uuid": "00470994-62f1-4c57-bf62-b4ca87efe890"
              }
            ]
          },
          {
            "uuid": "00470994-62f1-4c57-bf62-b4ca87efe890",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9ec826ee-5bce-4e04-92a4-6f348be463dc",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "676b7f97-abba-4f3b-a980-c3a6615a2795",
                  "type": "has_only_phrase",
                  "uuid": "c788c333-4791-47ee-a6ad-b74d2b42ec07"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "3d89eece-7fef-4600-a5ba-6558bd59b0c7",
                  "type": "has_only_phrase",
                  "uuid": "293cc8e2-89b8-469d-9811-5d77e8d3d287"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "bc1afb47-8564-438d-a39a-956ed60d0c2e",
                  "name": "All Responses",
                  "uuid": "9ec826ee-5bce-4e04-92a4-6f348be463dc"
                },
                {
                  "exit_uuid": "0d9e176d-dc6a-42ef-bce2-206773b821ce",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "676b7f97-abba-4f3b-a980-c3a6615a2795"
                },
                {
                  "exit_uuid": "9f75ad6a-082b-442a-b50f-3672a5b98087",
                  "name": "Continue",
                  "uuid": "3d89eece-7fef-4600-a5ba-6558bd59b0c7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "bc1afb47-8564-438d-a39a-956ed60d0c2e",
                "destination_uuid": null
              },
              {
                "uuid": "0d9e176d-dc6a-42ef-bce2-206773b821ce",
                "destination_uuid": "1dc22747-73a4-4af5-8c7f-116de0efdc32"
              },
              {
                "uuid": "9f75ad6a-082b-442a-b50f-3672a5b98087",
                "destination_uuid": "0f420f2b-7eeb-40b3-aac2-7520c83148f1"
              }
            ]
          },
          {
            "uuid": "1dc22747-73a4-4af5-8c7f-116de0efdc32",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "ce48d97a-7329-473d-842d-b605f331a6c9"
                },
                "type": "enter_flow",
                "uuid": "5e61fed4-305b-44ec-957e-74580420da76"
              }
            ],
            "exits": [
              {
                "uuid": "ad5b9e94-d1d1-4711-809d-2a697a3ee3f7",
                "destination_uuid": "00b68d35-a304-4771-b0b4-9ee7881e770f"
              },
              {
                "uuid": "9ccd03b8-b8d6-48d1-a6a4-48dfa5558e98",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "72b99586-76e6-4be9-b26d-1923aeb535a5",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b58dc0c4-98f8-451b-952b-7d4ee0ba7023"
                },
                {
                  "uuid": "bee72356-733f-4303-a910-6c3b5c661ca0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "40ce8092-cc2a-46e5-9ffc-b195c20598db"
                }
              ],
              "categories": [
                {
                  "uuid": "b58dc0c4-98f8-451b-952b-7d4ee0ba7023",
                  "name": "Complete",
                  "exit_uuid": "ad5b9e94-d1d1-4711-809d-2a697a3ee3f7"
                },
                {
                  "uuid": "40ce8092-cc2a-46e5-9ffc-b195c20598db",
                  "name": "Expired",
                  "exit_uuid": "9ccd03b8-b8d6-48d1-a6a4-48dfa5558e98"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b58dc0c4-98f8-451b-952b-7d4ee0ba7023"
            }
          },
          {
            "uuid": "a03cad4f-989d-42a2-9f3f-b1279d363457",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "067603b8-93e4-4a10-8dc4-67b1d6f86efd",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "39c35eae-4aaa-4f3f-86d5-ad22605fdfe7",
                  "type": "has_only_phrase",
                  "uuid": "3ed8649f-e90a-4606-b99a-3307908411a5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "74df0cde-9a20-4c6a-930d-ed902c5d4ad4",
                  "name": "All Responses",
                  "uuid": "067603b8-93e4-4a10-8dc4-67b1d6f86efd"
                },
                {
                  "exit_uuid": "5532a100-2dd2-480e-b5d8-eec6ad1373e3",
                  "name": "Go to Praise check-in",
                  "uuid": "39c35eae-4aaa-4f3f-86d5-ad22605fdfe7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "74df0cde-9a20-4c6a-930d-ed902c5d4ad4",
                "destination_uuid": null
              },
              {
                "uuid": "5532a100-2dd2-480e-b5d8-eec6ad1373e3",
                "destination_uuid": "2d077662-1935-496b-9ba6-e8b5e4da2564"
              }
            ]
          },
          {
            "uuid": "2d077662-1935-496b-9ba6-e8b5e4da2564",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "4b6514ad-de4b-4c7e-bbf7-fefd24c39f1c"
              }
            ],
            "exits": [
              {
                "uuid": "c3417d8e-36d8-4972-ba5f-c27aea93c3c2",
                "destination_uuid": "21d8f4ef-b9c8-4a78-8a62-27f9e6077460"
              }
            ]
          },
          {
            "uuid": "0f420f2b-7eeb-40b3-aac2-7520c83148f1",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "ddb7c358-fe79-450c-b426-e1a7ed39e948"
              }
            ],
            "exits": [
              {
                "uuid": "63133527-82f9-4c04-b24b-2fd90e799249",
                "destination_uuid": "21d8f4ef-b9c8-4a78-8a62-27f9e6077460"
              }
            ]
          },
          {
            "uuid": "00b68d35-a304-4771-b0b4-9ee7881e770f",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "63ff41db-d9c1-4f01-9ae5-f3ece6e5f546"
              }
            ],
            "exits": [
              {
                "uuid": "925b66cc-9958-4ac8-909c-dbc2dbdcb382",
                "destination_uuid": "21d8f4ef-b9c8-4a78-8a62-27f9e6077460"
              }
            ]
          },
          {
            "uuid": "21d8f4ef-b9c8-4a78-8a62-27f9e6077460",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f0f6d8c8-4d60-41ae-8f58-5148e201c253",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "bd541c2e-fac5-4e49-a605-6c692150ea80",
                  "type": "has_only_phrase",
                  "uuid": "a472e42b-21cd-4182-902a-263b133cce4b"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "65a4e3d5-cccf-4fb2-ac80-12293951c717",
                  "type": "has_only_phrase",
                  "uuid": "292bad72-b65a-40c2-bc72-f80bbbcc9def"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "86c404d1-d8df-49b2-aad9-62c6b9f1bbde",
                  "type": "has_only_phrase",
                  "uuid": "86898eea-6c1a-44d2-872e-c8f89349e207"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "fdc897fc-1dd2-46c1-8e64-3c9152b6f3a8",
                  "type": "has_only_phrase",
                  "uuid": "908cd1e1-58e9-4374-b70d-7796cc9c92fe"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3824d9af-b2d0-4fe9-b16d-b6b614f56d26",
                  "name": "All Responses",
                  "uuid": "f0f6d8c8-4d60-41ae-8f58-5148e201c253"
                },
                {
                  "exit_uuid": "80bf171d-5ce3-47bf-a604-62491b6341b1",
                  "name": "No",
                  "uuid": "bd541c2e-fac5-4e49-a605-6c692150ea80"
                },
                {
                  "exit_uuid": "221d0986-ba04-4335-ac7b-1bc58b98144e",
                  "name": "Yes",
                  "uuid": "65a4e3d5-cccf-4fb2-ac80-12293951c717"
                },
                {
                  "exit_uuid": "5997347d-baa6-4788-a215-45337e7571b3",
                  "name": "Yes",
                  "uuid": "86c404d1-d8df-49b2-aad9-62c6b9f1bbde"
                },
                {
                  "exit_uuid": "425c5877-378f-4550-b929-8c79aeda030a",
                  "name": "Yes",
                  "uuid": "fdc897fc-1dd2-46c1-8e64-3c9152b6f3a8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3824d9af-b2d0-4fe9-b16d-b6b614f56d26",
                "destination_uuid": null
              },
              {
                "uuid": "80bf171d-5ce3-47bf-a604-62491b6341b1",
                "destination_uuid": "e447e056-6861-49a2-afa7-dfbee0adb773"
              },
              {
                "uuid": "221d0986-ba04-4335-ac7b-1bc58b98144e",
                "destination_uuid": "512a3992-9317-4088-8295-77216b803e4a"
              },
              {
                "uuid": "5997347d-baa6-4788-a215-45337e7571b3",
                "destination_uuid": "512a3992-9317-4088-8295-77216b803e4a"
              },
              {
                "uuid": "425c5877-378f-4550-b929-8c79aeda030a",
                "destination_uuid": "512a3992-9317-4088-8295-77216b803e4a"
              }
            ]
          },
          {
            "uuid": "e447e056-6861-49a2-afa7-dfbee0adb773",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "806d2723-a278-4a05-b438-9bf5763feceb"
              }
            ],
            "exits": [
              {
                "uuid": "c0aae67f-8465-447b-942c-4f1ce08a9a5e",
                "destination_uuid": "cfa14662-a6ac-45ee-990a-cdd0a352537a"
              }
            ]
          },
          {
            "uuid": "512a3992-9317-4088-8295-77216b803e4a",
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
                "uuid": "1f329eaf-9465-4d48-97f8-c1ea66bee5b5"
              }
            ],
            "exits": [
              {
                "uuid": "7740d4ca-3742-439f-a0ee-0ebdab23cee9",
                "destination_uuid": "aad02fde-63fb-4cdd-bb02-c7b28e276291"
              }
            ]
          },
          {
            "uuid": "aad02fde-63fb-4cdd-bb02-c7b28e276291",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "705c9259-c13b-4a24-9a1e-7d5b037631e8",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "598dd637-2e53-4267-ac6c-a82a93c16bd7",
                  "type": "has_only_phrase",
                  "uuid": "9b328270-0fd7-4b5a-ab6e-9c510af22233"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "0928bc5a-6b6d-4cb8-912c-3e2c149a9f40",
                  "type": "has_only_phrase",
                  "uuid": "d0d94500-b8fc-4633-9e84-c6e72c427d5e"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "1c75deb4-bd34-465f-8a58-0025a0aeea6d",
                  "type": "has_only_phrase",
                  "uuid": "b8d04fa6-d478-490d-ae49-f64652c49759"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "97d2f54b-94d1-4dd5-b941-9453324e2e7d",
                  "type": "has_only_phrase",
                  "uuid": "ce4c076d-6202-40d5-87e4-86a81002a940"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d02d9324-65b2-435e-9a34-85c0dec5363e",
                  "name": "All Responses",
                  "uuid": "705c9259-c13b-4a24-9a1e-7d5b037631e8"
                },
                {
                  "exit_uuid": "a75b73b2-df93-42a1-ab8f-87d15aa7cab1",
                  "name": "Surprised",
                  "uuid": "598dd637-2e53-4267-ac6c-a82a93c16bd7"
                },
                {
                  "exit_uuid": "6749962e-084d-40e7-a76b-a268f42df28b",
                  "name": "Happy",
                  "uuid": "0928bc5a-6b6d-4cb8-912c-3e2c149a9f40"
                },
                {
                  "exit_uuid": "08412be4-07d1-49ac-a76f-27cde67905dd",
                  "name": "My teen did not like it",
                  "uuid": "1c75deb4-bd34-465f-8a58-0025a0aeea6d"
                },
                {
                  "exit_uuid": "ee9de14e-c6f9-40af-9f04-9dac57d3c56a",
                  "name": "I don’t know",
                  "uuid": "97d2f54b-94d1-4dd5-b941-9453324e2e7d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d02d9324-65b2-435e-9a34-85c0dec5363e",
                "destination_uuid": null
              },
              {
                "uuid": "a75b73b2-df93-42a1-ab8f-87d15aa7cab1",
                "destination_uuid": "3a1cf552-c7b2-467d-ac14-08e0ce75d55a"
              },
              {
                "uuid": "6749962e-084d-40e7-a76b-a268f42df28b",
                "destination_uuid": "6d038d63-1486-483d-8c18-de151f003f42"
              },
              {
                "uuid": "08412be4-07d1-49ac-a76f-27cde67905dd",
                "destination_uuid": "b8a611df-cd70-4460-b927-d2fc744c080b"
              },
              {
                "uuid": "ee9de14e-c6f9-40af-9f04-9dac57d3c56a",
                "destination_uuid": "999191db-bc92-40dc-b7af-d4b034d4b599"
              }
            ]
          },
          {
            "uuid": "3a1cf552-c7b2-467d-ac14-08e0ce75d55a",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "32ebc0e0-ae92-4c4a-a734-ba5c53114129"
              }
            ],
            "exits": [
              {
                "uuid": "d059f865-2144-4f04-ad27-182dff837930",
                "destination_uuid": "9f2c691f-35bd-4405-a478-e62a3c5eb74b"
              }
            ]
          },
          {
            "uuid": "6d038d63-1486-483d-8c18-de151f003f42",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1a60b988-baf5-4c52-bfd5-37445d799cc9"
              }
            ],
            "exits": [
              {
                "uuid": "5ed9305d-860e-431a-bf67-4efdc272bbee",
                "destination_uuid": "9f2c691f-35bd-4405-a478-e62a3c5eb74b"
              }
            ]
          },
          {
            "uuid": "b8a611df-cd70-4460-b927-d2fc744c080b",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "233b27d3-3962-4702-81fe-b2f35ecba1cd"
              }
            ],
            "exits": [
              {
                "uuid": "7f8d22d0-708f-4589-a412-b08d6acf5616",
                "destination_uuid": "9f2c691f-35bd-4405-a478-e62a3c5eb74b"
              }
            ]
          },
          {
            "uuid": "999191db-bc92-40dc-b7af-d4b034d4b599",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7cd24a2a-072e-4abe-ba15-bbd9f3c690fc"
              }
            ],
            "exits": [
              {
                "uuid": "738b0f86-dc1e-4f03-9962-1490e28739f2",
                "destination_uuid": "9f2c691f-35bd-4405-a478-e62a3c5eb74b"
              }
            ]
          },
          {
            "uuid": "9f2c691f-35bd-4405-a478-e62a3c5eb74b",
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
                "uuid": "3e06803e-b9df-4b2a-9fcd-8bb95883bdab"
              }
            ],
            "exits": [
              {
                "uuid": "0904b0d3-b598-4076-8979-4dbfc596c5a6",
                "destination_uuid": "e8d2e6fc-82fe-4561-bde9-c539f4b6d0b4"
              }
            ]
          },
          {
            "uuid": "e8d2e6fc-82fe-4561-bde9-c539f4b6d0b4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7d7a5808-cb2d-4b16-a8f9-94f6942d0a0f",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "bec2997d-ac6a-4ada-a266-1fd1edda431d",
                  "type": "has_only_phrase",
                  "uuid": "d5a1c881-d809-4107-ad56-b62548cbedd2"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "bec2997d-ac6a-4ada-a266-1fd1edda431d",
                  "type": "has_only_phrase",
                  "uuid": "d7274f23-60ca-4c3a-bb65-de5f493adc33"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "266c8256-07dc-4b77-907f-21cf6421d565",
                  "type": "has_only_phrase",
                  "uuid": "1c57ee9a-10aa-43b6-a69f-ae7f2aed28fc"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "266c8256-07dc-4b77-907f-21cf6421d565",
                  "type": "has_only_phrase",
                  "uuid": "b0ddccab-558e-4848-a9a5-108031ae94a8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0ac466f2-0415-46fe-81fc-31bfb1273ef9",
                  "name": "All Responses",
                  "uuid": "7d7a5808-cb2d-4b16-a8f9-94f6942d0a0f"
                },
                {
                  "exit_uuid": "d7c0f8df-fee1-4c1a-b8e8-32005dd0ac81",
                  "name": "Every day; Almost every day",
                  "uuid": "bec2997d-ac6a-4ada-a266-1fd1edda431d"
                },
                {
                  "exit_uuid": "66d75561-f949-429f-991c-5a0c4aadaa22",
                  "name": "A few days; Never",
                  "uuid": "266c8256-07dc-4b77-907f-21cf6421d565"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0ac466f2-0415-46fe-81fc-31bfb1273ef9",
                "destination_uuid": null
              },
              {
                "uuid": "d7c0f8df-fee1-4c1a-b8e8-32005dd0ac81",
                "destination_uuid": "c978eb84-f259-4719-8e37-aa79f987565b"
              },
              {
                "uuid": "66d75561-f949-429f-991c-5a0c4aadaa22",
                "destination_uuid": "e3173af5-dda8-425b-802a-d53b01fe4cd0"
              }
            ]
          },
          {
            "uuid": "c978eb84-f259-4719-8e37-aa79f987565b",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5714a1ae-0eca-49b2-a93a-b292df3bdc2e"
              }
            ],
            "exits": [
              {
                "uuid": "9b8d43f3-273b-437d-a9e1-24fb45395653",
                "destination_uuid": "cfa14662-a6ac-45ee-990a-cdd0a352537a"
              }
            ]
          },
          {
            "uuid": "e3173af5-dda8-425b-802a-d53b01fe4cd0",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "881cfb75-df8c-48bb-986e-ba0fd20d53a4"
              }
            ],
            "exits": [
              {
                "uuid": "36ac8229-67fd-485a-9ffc-ec83b67c6b99",
                "destination_uuid": "cfa14662-a6ac-45ee-990a-cdd0a352537a"
              }
            ]
          },
          {
            "uuid": "cfa14662-a6ac-45ee-990a-cdd0a352537a",
            "actions": [
              {
                "uuid": "e6eb1319-4d84-4848-b1f6-8f1424e9f893",
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
                "uuid": "10e1a931-9c6e-4a9f-a5c9-787de2d79a91",
                "destination_uuid": "e4993d0c-c749-40b6-94f8-2439ddb3bf3c"
              }
            ]
          },
          {
            "uuid": "e4993d0c-c749-40b6-94f8-2439ddb3bf3c",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "0b5f300c-ffbf-4193-bdaf-8eb78bd4be97"
                },
                "type": "enter_flow",
                "uuid": "4fe9a9d0-a0b2-4035-9b80-0a8894687911"
              }
            ],
            "exits": [
              {
                "uuid": "ba3b4f7e-5b6d-4c72-adaf-77fbc230b7f6",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "aff2e0be-0eae-4436-87d3-6211d93c6376",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d972b578-d104-41f6-abc2-8d780f5d638a",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ebcfbe36-6d8f-4d2c-b42a-14588900e98a"
              }
            ],
            "exits": [
              {
                "uuid": "5427217d-ff35-4147-aa8b-4aad03404e75",
                "destination_uuid": "2ea08633-c2f9-4ab2-b0f4-a72191877c8e"
              }
            ]
          },
          {
            "uuid": "2ea08633-c2f9-4ab2-b0f4-a72191877c8e",
            "actions": [
              {
                "uuid": "51a769ab-077d-4b30-ac8a-99bdee421e06",
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
                "uuid": "1da5fd03-054e-4c7a-9a52-2a3031eb8d8d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "72a71ca6-a1d0-4966-9283-38c0cfbe7e23",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "078ca174-72af-4fab-b164-ca4704409d68",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "78d93bfd-a41f-4106-b958-1e412e2297b9"
              }
            ],
            "exits": [
              {
                "uuid": "51afa2df-a083-41da-be70-0a73dc3b7aca",
                "destination_uuid": "3849d71f-0852-4b67-bedc-a2bf6412718a"
              }
            ]
          },
          {
            "uuid": "3849d71f-0852-4b67-bedc-a2bf6412718a",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "735ce691-628d-437a-9139-765975c47f49"
              }
            ],
            "exits": [
              {
                "uuid": "52dee204-8a8b-49da-a50c-d20a14a22348",
                "destination_uuid": "b8a0e5ca-84d6-4d8c-892e-66b025eba31c"
              }
            ]
          },
          {
            "uuid": "b8a0e5ca-84d6-4d8c-892e-66b025eba31c",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "28bd3d33-ea0a-44d8-87a7-fbe19502bd48"
              }
            ],
            "exits": [
              {
                "uuid": "8a2fb57f-5719-408f-b3c1-cfc2d2440271",
                "destination_uuid": "941c62c6-1860-4e67-8be8-f776c5f0bbd8"
              }
            ]
          },
          {
            "uuid": "941c62c6-1860-4e67-8be8-f776c5f0bbd8",
            "actions": [
              {
                "uuid": "31d506ec-942f-4d10-9aa2-94b9e5d23c92",
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
                "uuid": "cb65d2a5-5e39-4ec1-9940-5e8236ce39a0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "cef917f4-290d-45c1-bef4-41b8fab8d711",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2edade46-318e-42bb-b2cb-db73fe1d4dbc",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6a6f646b-c14c-48af-a2a7-8e4942b3c899"
              }
            ],
            "exits": [
              {
                "uuid": "604ee5e3-8972-4a64-9f89-6d8b12b3eb9f",
                "destination_uuid": "8fe41b3c-580f-4494-acad-3d7dae1d7d79"
              }
            ]
          },
          {
            "uuid": "8fe41b3c-580f-4494-acad-3d7dae1d7d79",
            "actions": [
              {
                "uuid": "d2350550-bfdb-4ea4-9f56-58d99b8e5385",
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
                "uuid": "036a443b-2546-4bec-8f6e-1c78b941ac10",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d28dd2f4-102c-4607-a16d-00274b777d50",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0846cf87-fce1-447c-a19a-773b600db299",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1c8d80be-b4fa-41c0-ac02-e7292d1bf5fb"
              }
            ],
            "exits": [
              {
                "uuid": "e9264189-93c8-496f-93db-fb10eb2971bc",
                "destination_uuid": "c6b05beb-7a39-40d5-a506-830977214432"
              }
            ]
          },
          {
            "uuid": "c6b05beb-7a39-40d5-a506-830977214432",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "613f94c3-777d-47ea-bf42-4a69d35d9990"
              }
            ],
            "exits": [
              {
                "uuid": "52737ef5-7762-44f8-bc3c-26a8bb68bbf1",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7572d87d-46f6-4372-9820-e14aa9030f92",
            "actions": [
              {
                "uuid": "c7b8d97b-ba98-4e55-ada3-0bd0f982dfd6",
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
                "uuid": "78613831-a29c-4af4-8103-e9ebff0f5fe0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "2ff5afa4-cecd-4878-be6e-62be9c40b196",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "45cad5fb-d2e5-458f-aa9b-6ad05fe2d376",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "04c513cb-6b5e-4070-a815-f0ed7ea56657"
              }
            ],
            "exits": [
              {
                "uuid": "44307ed8-3c87-4b02-b55c-820252cbb6ed",
                "destination_uuid": "953c8c2e-d753-46a4-adea-7afe43c1e98f"
              }
            ]
          },
          {
            "uuid": "953c8c2e-d753-46a4-adea-7afe43c1e98f",
            "actions": [
              {
                "uuid": "9a96af8c-dada-42de-8ebf-24b852a9a2a6",
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
                "uuid": "0fd6b018-c696-4ba9-a00b-26dd3cb6d588",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "86bf81af-326e-48e9-bdfb-f3257f79f559",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2653b33e-8373-4902-952a-991f242898b2",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "25266732-e246-48d5-95a7-eea12f2df652"
                },
                "type": "enter_flow",
                "uuid": "3d834f0b-ef37-44ca-8084-c769878534d6"
              }
            ],
            "exits": [
              {
                "uuid": "d1c607f3-3244-4a70-80d1-f9351eea3c55",
                "destination_uuid": "149f823a-eb33-4f3c-a04e-55469008aa64"
              },
              {
                "uuid": "44d7074d-3066-454c-8aa4-5f3e0a237c03",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e18fb405-59cd-489a-a29f-74d00ae08c4d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a4c22250-0811-41db-a7ea-24dddfac459e"
                },
                {
                  "uuid": "975b18b4-111a-4295-b8fd-0341ccf480ee",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "47ee8242-e753-4c1e-8d28-75637153558a"
                }
              ],
              "categories": [
                {
                  "uuid": "a4c22250-0811-41db-a7ea-24dddfac459e",
                  "name": "Complete",
                  "exit_uuid": "d1c607f3-3244-4a70-80d1-f9351eea3c55"
                },
                {
                  "uuid": "47ee8242-e753-4c1e-8d28-75637153558a",
                  "name": "Expired",
                  "exit_uuid": "44d7074d-3066-454c-8aa4-5f3e0a237c03"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a4c22250-0811-41db-a7ea-24dddfac459e"
            }
          },
          {
            "uuid": "149f823a-eb33-4f3c-a04e-55469008aa64",
            "actions": [
              {
                "attachments": [],
                "text": "Which module would you like to test?",
                "type": "send_msg",
                "quick_replies": [
                  "welcome",
                  "1on1",
                  "praise"
                ],
                "uuid": "dceb38dc-dbcd-4c59-af3e-8faf280f566d"
              }
            ],
            "exits": [
              {
                "uuid": "385e795d-c24f-4159-a5ff-3b56adf08b8e",
                "destination_uuid": "eb3a1690-1217-49d3-a47c-202dfbc02730"
              }
            ]
          },
          {
            "uuid": "eb3a1690-1217-49d3-a47c-202dfbc02730",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5cea2e12-6d43-4064-83c4-b1c877929ebe",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "56b298f9-ca53-4cd3-a97a-62c79ef708b6",
                  "type": "has_only_phrase",
                  "uuid": "9f9a0881-7981-4ad4-96a5-8e2d569bacf3"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "f4fe0e2a-401c-441b-a86e-d0dbddc888b0",
                  "type": "has_only_phrase",
                  "uuid": "ee1257a0-1c5f-4aee-a9ee-fa646a8750f2"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "ef347d89-3997-422d-bb41-3e68ffe9ee0a",
                  "type": "has_only_phrase",
                  "uuid": "5360ac2b-45e8-47f5-9e26-e3da570c30d9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "15c8998f-2681-45f3-9243-10a442383d30",
                  "name": "All Responses",
                  "uuid": "5cea2e12-6d43-4064-83c4-b1c877929ebe"
                },
                {
                  "exit_uuid": "3b8df18f-877a-47b0-88ef-598d9967ecea",
                  "name": "welcome",
                  "uuid": "56b298f9-ca53-4cd3-a97a-62c79ef708b6"
                },
                {
                  "exit_uuid": "5c18a0f8-cdac-4099-ab83-1936bc84afa8",
                  "name": "1on1",
                  "uuid": "f4fe0e2a-401c-441b-a86e-d0dbddc888b0"
                },
                {
                  "exit_uuid": "52931208-f178-494c-834d-22d05cd16a06",
                  "name": "praise",
                  "uuid": "ef347d89-3997-422d-bb41-3e68ffe9ee0a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "15c8998f-2681-45f3-9243-10a442383d30",
                "destination_uuid": null
              },
              {
                "uuid": "3b8df18f-877a-47b0-88ef-598d9967ecea",
                "destination_uuid": "fd982c04-05f9-44b9-a912-24b17f52050a"
              },
              {
                "uuid": "5c18a0f8-cdac-4099-ab83-1936bc84afa8",
                "destination_uuid": "b568d56e-f9e5-4161-b55e-4f0823c28ba1"
              },
              {
                "uuid": "52931208-f178-494c-834d-22d05cd16a06",
                "destination_uuid": "35346a28-ec21-45e0-b195-65c5b4ceb580"
              }
            ]
          },
          {
            "uuid": "fd982c04-05f9-44b9-a912-24b17f52050a",
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
                "uuid": "ff972b9e-a01b-4604-b8ec-284e1f50b6f1"
              }
            ],
            "exits": [
              {
                "uuid": "f418d2fb-2f41-48c5-9f5d-fa271c89f254",
                "destination_uuid": "a27a1d1a-d31f-41bd-920e-576bc90a3d9c"
              }
            ]
          },
          {
            "uuid": "a27a1d1a-d31f-41bd-920e-576bc90a3d9c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2519775b-6761-4885-90f0-5029e16e6620",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "9231383a-dc79-4a39-b6b7-cdcd5a9efcd1",
                  "type": "has_only_phrase",
                  "uuid": "b16fb01a-a595-4ffe-b0e1-6aa16ac85858"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "1845b78c-2fc9-4e54-a3e6-3466c2179f29",
                  "type": "has_only_phrase",
                  "uuid": "1291446a-66ba-4c5c-9869-f85006a14311"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "aa3fe43e-30b7-45dc-8af4-b1fbdf66631c",
                  "type": "has_only_phrase",
                  "uuid": "dd17cdcf-1ca2-4eb3-a0e1-a11ab1c533c5"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "6d87f1d5-9572-47b8-bdf8-a2df16845f7f",
                  "type": "has_only_phrase",
                  "uuid": "36ab3308-9c61-4ff0-9910-732f7a9618b0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "93c01aa9-3eed-4080-9d27-5f96d3143e10",
                  "name": "All Responses",
                  "uuid": "2519775b-6761-4885-90f0-5029e16e6620"
                },
                {
                  "exit_uuid": "ffab2f49-8814-4b73-b4cb-554df4254467",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "9231383a-dc79-4a39-b6b7-cdcd5a9efcd1"
                },
                {
                  "exit_uuid": "62c9f4a8-ac85-4405-a77d-393087f36682",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "1845b78c-2fc9-4e54-a3e6-3466c2179f29"
                },
                {
                  "exit_uuid": "c9475239-4826-4f4a-b405-efe69e3f1d39",
                  "name": "mod_welcome_survey",
                  "uuid": "aa3fe43e-30b7-45dc-8af4-b1fbdf66631c"
                },
                {
                  "exit_uuid": "5d95cbfb-5f49-4ca4-b273-094110f5c848",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "6d87f1d5-9572-47b8-bdf8-a2df16845f7f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "93c01aa9-3eed-4080-9d27-5f96d3143e10",
                "destination_uuid": null
              },
              {
                "uuid": "ffab2f49-8814-4b73-b4cb-554df4254467",
                "destination_uuid": "40150545-2b85-4030-af2c-d6318dd96714"
              },
              {
                "uuid": "62c9f4a8-ac85-4405-a77d-393087f36682",
                "destination_uuid": "208ff15c-1d83-4f91-acf3-6c28d97337db"
              },
              {
                "uuid": "c9475239-4826-4f4a-b405-efe69e3f1d39",
                "destination_uuid": "1e415332-aa97-4c8c-afd1-6e11889b312c"
              },
              {
                "uuid": "5d95cbfb-5f49-4ca4-b273-094110f5c848",
                "destination_uuid": "67c979fc-47a4-4403-999c-507360e1e316"
              }
            ]
          },
          {
            "uuid": "40150545-2b85-4030-af2c-d6318dd96714",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "e64c4cd3-88c2-4dc3-872f-28bcefe7c024"
                },
                "type": "enter_flow",
                "uuid": "1e0fb97d-4c78-4d59-ad6b-262cac460f8b"
              }
            ],
            "exits": [
              {
                "uuid": "2b13e960-2cfb-402f-b4fa-bd8ff198039f",
                "destination_uuid": null
              },
              {
                "uuid": "d3720ae0-95cd-4791-9b76-053a47f6f4c2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "114286e0-d036-4435-842c-98f6b505f0e9",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "2bae7a24-efb7-4c4a-943c-0d889922be5e"
                },
                {
                  "uuid": "6216c746-16b1-488d-8e19-59c6ec814cb4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "60af5745-fc79-4598-99b4-e9476a0cec03"
                }
              ],
              "categories": [
                {
                  "uuid": "2bae7a24-efb7-4c4a-943c-0d889922be5e",
                  "name": "Complete",
                  "exit_uuid": "2b13e960-2cfb-402f-b4fa-bd8ff198039f"
                },
                {
                  "uuid": "60af5745-fc79-4598-99b4-e9476a0cec03",
                  "name": "Expired",
                  "exit_uuid": "d3720ae0-95cd-4791-9b76-053a47f6f4c2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "2bae7a24-efb7-4c4a-943c-0d889922be5e"
            }
          },
          {
            "uuid": "208ff15c-1d83-4f91-acf3-6c28d97337db",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "f0c383cf-5eeb-48ff-941d-ef942116234c"
                },
                "type": "enter_flow",
                "uuid": "f9f878b3-2cb6-4bee-a4b7-cb14af3359c4"
              }
            ],
            "exits": [
              {
                "uuid": "1332ffa8-632b-4506-bcf9-169ea2fff213",
                "destination_uuid": null
              },
              {
                "uuid": "559ac03a-0f9f-45fa-964c-3e4721006f8f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "9fb85461-c2e5-4ecf-9ea8-da81986ef2a2",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "af1ec037-6eef-4897-8ee6-54a6778a6630"
                },
                {
                  "uuid": "216aa1c1-b30a-4471-a50f-969a25438126",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "bfdca37c-36c9-4d59-b1cd-44376a4ab8b0"
                }
              ],
              "categories": [
                {
                  "uuid": "af1ec037-6eef-4897-8ee6-54a6778a6630",
                  "name": "Complete",
                  "exit_uuid": "1332ffa8-632b-4506-bcf9-169ea2fff213"
                },
                {
                  "uuid": "bfdca37c-36c9-4d59-b1cd-44376a4ab8b0",
                  "name": "Expired",
                  "exit_uuid": "559ac03a-0f9f-45fa-964c-3e4721006f8f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "af1ec037-6eef-4897-8ee6-54a6778a6630"
            }
          },
          {
            "uuid": "1e415332-aa97-4c8c-afd1-6e11889b312c",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "3258587d-cb25-429f-a133-bf2b1348849d"
                },
                "type": "enter_flow",
                "uuid": "47f81055-4539-4ee0-9d53-cd5da4c320c1"
              }
            ],
            "exits": [
              {
                "uuid": "305c9335-836e-4f15-a35a-3279c13bb946",
                "destination_uuid": null
              },
              {
                "uuid": "e34d2c90-f4d0-47ad-974c-cd0c4f2cb356",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "915a40dc-c896-4dc1-8c99-723019eb1c9b",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7d86749e-9439-41cb-bb59-0d4d389de49d"
                },
                {
                  "uuid": "f9f3d4f0-6ccd-4367-bde8-4669d7f65579",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a0b14678-0ca4-43ab-a0a9-f7301472a680"
                }
              ],
              "categories": [
                {
                  "uuid": "7d86749e-9439-41cb-bb59-0d4d389de49d",
                  "name": "Complete",
                  "exit_uuid": "305c9335-836e-4f15-a35a-3279c13bb946"
                },
                {
                  "uuid": "a0b14678-0ca4-43ab-a0a9-f7301472a680",
                  "name": "Expired",
                  "exit_uuid": "e34d2c90-f4d0-47ad-974c-cd0c4f2cb356"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7d86749e-9439-41cb-bb59-0d4d389de49d"
            }
          },
          {
            "uuid": "67c979fc-47a4-4403-999c-507360e1e316",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "7786f8c9-488d-4994-b0ff-02285e18de07"
                },
                "type": "enter_flow",
                "uuid": "5e5c5508-946c-4912-a51e-27001ba1ede9"
              }
            ],
            "exits": [
              {
                "uuid": "4e10e4f1-2246-4075-9230-86c8094a9b6b",
                "destination_uuid": null
              },
              {
                "uuid": "f8eb61b0-4c19-4a61-9050-91fca4b471ef",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2001b360-3e3d-4107-a340-1fe2e7742dbd",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "30499f25-379c-49d5-9bc1-9d7c527b8dc7"
                },
                {
                  "uuid": "d90d065b-deeb-4d9e-a33c-0d692e2ba246",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "ad9d52cd-fe37-4bc0-af80-267e33d15336"
                }
              ],
              "categories": [
                {
                  "uuid": "30499f25-379c-49d5-9bc1-9d7c527b8dc7",
                  "name": "Complete",
                  "exit_uuid": "4e10e4f1-2246-4075-9230-86c8094a9b6b"
                },
                {
                  "uuid": "ad9d52cd-fe37-4bc0-af80-267e33d15336",
                  "name": "Expired",
                  "exit_uuid": "f8eb61b0-4c19-4a61-9050-91fca4b471ef"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "30499f25-379c-49d5-9bc1-9d7c527b8dc7"
            }
          },
          {
            "uuid": "b568d56e-f9e5-4161-b55e-4f0823c28ba1",
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
                "uuid": "881c41c7-329b-4ea7-bd8a-4612757a2f33"
              }
            ],
            "exits": [
              {
                "uuid": "a88c53a2-ed22-4817-905f-3e7479548997",
                "destination_uuid": "71069a67-099c-4d27-b3c4-2e09963cc165"
              }
            ]
          },
          {
            "uuid": "71069a67-099c-4d27-b3c4-2e09963cc165",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4896eed3-f9aa-4591-ae75-bc347f9c3beb",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "6bbda281-7428-42ac-a4e5-1d4d666eae5c",
                  "type": "has_only_phrase",
                  "uuid": "ef311970-6d8d-45b0-9334-2902c8f5b577"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "72f9d613-3e4f-47ba-b9d3-ab8b81bef826",
                  "type": "has_only_phrase",
                  "uuid": "55ced348-8988-402b-9db7-d5b062eb65fd"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "e39bd0ee-b9d1-4d22-ac0b-c0f337ed0a14",
                  "type": "has_only_phrase",
                  "uuid": "817d43bc-5283-4c4a-a73e-f39f80ab1114"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "70ec0008-8742-4907-9f42-a3eec9ae6f73",
                  "name": "All Responses",
                  "uuid": "4896eed3-f9aa-4591-ae75-bc347f9c3beb"
                },
                {
                  "exit_uuid": "28a48ea4-0f93-4dce-aa67-194523b5cd43",
                  "name": "mod_1on1_emo",
                  "uuid": "6bbda281-7428-42ac-a4e5-1d4d666eae5c"
                },
                {
                  "exit_uuid": "791cc1d2-dee8-458c-af5c-e7a2ed633bea",
                  "name": "mod_1on1_activity",
                  "uuid": "72f9d613-3e4f-47ba-b9d3-ab8b81bef826"
                },
                {
                  "exit_uuid": "b8bafa26-6f2c-4bc3-a62e-04e8b30f6618",
                  "name": "mod_1on1_activity_review",
                  "uuid": "e39bd0ee-b9d1-4d22-ac0b-c0f337ed0a14"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "70ec0008-8742-4907-9f42-a3eec9ae6f73",
                "destination_uuid": null
              },
              {
                "uuid": "28a48ea4-0f93-4dce-aa67-194523b5cd43",
                "destination_uuid": "5461f4ec-b3c9-4e5c-bd46-d69dea602ac9"
              },
              {
                "uuid": "791cc1d2-dee8-458c-af5c-e7a2ed633bea",
                "destination_uuid": "f31cd679-0ae4-4930-b5ec-57882467fe26"
              },
              {
                "uuid": "b8bafa26-6f2c-4bc3-a62e-04e8b30f6618",
                "destination_uuid": "22b60ad9-da6c-4d76-94ed-2693ff9b8605"
              }
            ]
          },
          {
            "uuid": "5461f4ec-b3c9-4e5c-bd46-d69dea602ac9",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "59f8458c-1a44-4b2f-be32-635eebe6ea63"
                },
                "type": "enter_flow",
                "uuid": "6337ae9f-f97a-414b-a871-c4e19314b52d"
              }
            ],
            "exits": [
              {
                "uuid": "04133d29-e5da-4c0f-90f9-07c4dbfc9f39",
                "destination_uuid": null
              },
              {
                "uuid": "84b1b067-c565-46f8-883a-522e20e6c4dd",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c0508317-de55-4109-ae79-32232b12caa1",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "efe4efb9-99ae-4954-858e-4c74ed59fcde"
                },
                {
                  "uuid": "dbdfbde8-5c51-4003-b224-6da43fe14317",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "dcd5ae47-e682-489a-9ba3-9fac2bc334cf"
                }
              ],
              "categories": [
                {
                  "uuid": "efe4efb9-99ae-4954-858e-4c74ed59fcde",
                  "name": "Complete",
                  "exit_uuid": "04133d29-e5da-4c0f-90f9-07c4dbfc9f39"
                },
                {
                  "uuid": "dcd5ae47-e682-489a-9ba3-9fac2bc334cf",
                  "name": "Expired",
                  "exit_uuid": "84b1b067-c565-46f8-883a-522e20e6c4dd"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "efe4efb9-99ae-4954-858e-4c74ed59fcde"
            }
          },
          {
            "uuid": "f31cd679-0ae4-4930-b5ec-57882467fe26",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "6a8b188c-f7b0-4be4-ac2b-9497649552ac"
                },
                "type": "enter_flow",
                "uuid": "d3f02350-7d7a-4427-accc-3c380cbfaaa3"
              }
            ],
            "exits": [
              {
                "uuid": "74997ef6-bfbc-485c-b478-f1ef1a176ce8",
                "destination_uuid": null
              },
              {
                "uuid": "72d94ba3-1cfe-4528-9c80-076e281ece8c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7f204c7d-16fd-49bf-a0e5-bf3ffe0e2ac8",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "1fd3de84-1a70-4d46-8ad1-9a3e350c38c8"
                },
                {
                  "uuid": "f397878f-65ec-45da-b9bf-c7877f1a4276",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "6e29a9ff-63a5-4fed-a16b-24a7d3e46b75"
                }
              ],
              "categories": [
                {
                  "uuid": "1fd3de84-1a70-4d46-8ad1-9a3e350c38c8",
                  "name": "Complete",
                  "exit_uuid": "74997ef6-bfbc-485c-b478-f1ef1a176ce8"
                },
                {
                  "uuid": "6e29a9ff-63a5-4fed-a16b-24a7d3e46b75",
                  "name": "Expired",
                  "exit_uuid": "72d94ba3-1cfe-4528-9c80-076e281ece8c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "1fd3de84-1a70-4d46-8ad1-9a3e350c38c8"
            }
          },
          {
            "uuid": "22b60ad9-da6c-4d76-94ed-2693ff9b8605",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "86b66487-aab9-47b3-bcf0-1c1f22691771"
                },
                "type": "enter_flow",
                "uuid": "be66a7fe-d6df-406e-8c5d-9e00d666a1ca"
              }
            ],
            "exits": [
              {
                "uuid": "59497589-a90c-4a41-a317-7f9b4c647076",
                "destination_uuid": null
              },
              {
                "uuid": "23859107-b3d0-401b-91d2-8345ac9b4c05",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "f1fbc09b-b06b-46fa-9063-8fb1e93afb21",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "d56cadd9-c4ef-47a8-86cd-877e3960e2b0"
                },
                {
                  "uuid": "b228b88b-4a3f-424b-b710-a9553f699c24",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "858ca95f-c429-4e37-addc-bea2b4041a56"
                }
              ],
              "categories": [
                {
                  "uuid": "d56cadd9-c4ef-47a8-86cd-877e3960e2b0",
                  "name": "Complete",
                  "exit_uuid": "59497589-a90c-4a41-a317-7f9b4c647076"
                },
                {
                  "uuid": "858ca95f-c429-4e37-addc-bea2b4041a56",
                  "name": "Expired",
                  "exit_uuid": "23859107-b3d0-401b-91d2-8345ac9b4c05"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "d56cadd9-c4ef-47a8-86cd-877e3960e2b0"
            }
          },
          {
            "uuid": "35346a28-ec21-45e0-b195-65c5b4ceb580",
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
                "uuid": "b38925b8-913e-4411-b887-4a477189c70d"
              }
            ],
            "exits": [
              {
                "uuid": "b360f977-1f7b-4ad9-a6e6-67f2001467c7",
                "destination_uuid": "e61ba90b-3891-4e2e-a6b3-13a4dbfec7db"
              }
            ]
          },
          {
            "uuid": "e61ba90b-3891-4e2e-a6b3-13a4dbfec7db",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b433638d-ca0d-45e2-a440-38ac48fb77ee",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "05591db2-66a0-4b04-99f6-e1bb98ec8afa",
                  "type": "has_only_phrase",
                  "uuid": "f527963f-9182-4b42-91d2-1d76641e47fd"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "7b502448-bf25-4f23-8b3a-b98044fea0cb",
                  "type": "has_only_phrase",
                  "uuid": "7976dbf5-aefa-43b1-9173-95ad64fdb2f1"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "7db1ea5c-ec07-4f09-9c4d-b87490c638c7",
                  "type": "has_only_phrase",
                  "uuid": "69ec7019-3855-4ba1-9765-9020e22570d8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a88ec783-e70e-45a6-a458-877374069073",
                  "name": "All Responses",
                  "uuid": "b433638d-ca0d-45e2-a440-38ac48fb77ee"
                },
                {
                  "exit_uuid": "705e3060-e64e-4e25-b139-79d0476b1c2b",
                  "name": "mod_praise_intro",
                  "uuid": "05591db2-66a0-4b04-99f6-e1bb98ec8afa"
                },
                {
                  "exit_uuid": "b2122a43-7c6a-43f3-a7b0-173d0df7db95",
                  "name": "mod_praise_activity",
                  "uuid": "7b502448-bf25-4f23-8b3a-b98044fea0cb"
                },
                {
                  "exit_uuid": "0c17ce2c-a249-4627-8642-c005f51d068d",
                  "name": "mod_praise_activity_review",
                  "uuid": "7db1ea5c-ec07-4f09-9c4d-b87490c638c7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a88ec783-e70e-45a6-a458-877374069073",
                "destination_uuid": null
              },
              {
                "uuid": "705e3060-e64e-4e25-b139-79d0476b1c2b",
                "destination_uuid": "28f07345-a996-4fd5-843b-5cf605ae8709"
              },
              {
                "uuid": "b2122a43-7c6a-43f3-a7b0-173d0df7db95",
                "destination_uuid": "17804b16-36fc-49ea-b445-6ec4528f62aa"
              },
              {
                "uuid": "0c17ce2c-a249-4627-8642-c005f51d068d",
                "destination_uuid": "2bc657a0-de82-4b4f-8281-bd638dd4ab4d"
              }
            ]
          },
          {
            "uuid": "28f07345-a996-4fd5-843b-5cf605ae8709",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "4a407a21-f3fc-45e7-b4b1-4cf8154e1297"
                },
                "type": "enter_flow",
                "uuid": "d9512ac0-11cc-484a-9fcb-3ec3a105fd51"
              }
            ],
            "exits": [
              {
                "uuid": "954b0394-3f07-49db-828d-7c1ffd3bdcda",
                "destination_uuid": null
              },
              {
                "uuid": "302b1385-98f9-42ce-ad09-9220170e71c0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "4bf2d2ff-65eb-4e41-9e56-bfc694c9abc6",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "cc085ab6-2a25-4bbf-8f72-5a6943c6f632"
                },
                {
                  "uuid": "c41a84eb-f869-42fe-807b-4163397b5020",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c79281fa-1040-4594-8fe5-87b90e625bb3"
                }
              ],
              "categories": [
                {
                  "uuid": "cc085ab6-2a25-4bbf-8f72-5a6943c6f632",
                  "name": "Complete",
                  "exit_uuid": "954b0394-3f07-49db-828d-7c1ffd3bdcda"
                },
                {
                  "uuid": "c79281fa-1040-4594-8fe5-87b90e625bb3",
                  "name": "Expired",
                  "exit_uuid": "302b1385-98f9-42ce-ad09-9220170e71c0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "cc085ab6-2a25-4bbf-8f72-5a6943c6f632"
            }
          },
          {
            "uuid": "17804b16-36fc-49ea-b445-6ec4528f62aa",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "b0b319b5-45ee-422c-b212-3a58beddfd3e"
                },
                "type": "enter_flow",
                "uuid": "6ef37547-08b0-4eac-a24c-7cd47addfe78"
              }
            ],
            "exits": [
              {
                "uuid": "f45a3653-0bbd-42dd-8a21-eaf4dfc5babd",
                "destination_uuid": null
              },
              {
                "uuid": "a13aa334-d16a-4e2d-896b-7a6b4bb63d98",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "bc3ad48f-1449-4f71-9ce9-e7704eaa90ec",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "97026560-4b3a-4b99-834e-1b60d8bb7816"
                },
                {
                  "uuid": "6f0c33fe-a6f0-4023-b5fd-e46e31aa265d",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "8d719d3c-291e-4ce2-99b9-374d7b7129a7"
                }
              ],
              "categories": [
                {
                  "uuid": "97026560-4b3a-4b99-834e-1b60d8bb7816",
                  "name": "Complete",
                  "exit_uuid": "f45a3653-0bbd-42dd-8a21-eaf4dfc5babd"
                },
                {
                  "uuid": "8d719d3c-291e-4ce2-99b9-374d7b7129a7",
                  "name": "Expired",
                  "exit_uuid": "a13aa334-d16a-4e2d-896b-7a6b4bb63d98"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "97026560-4b3a-4b99-834e-1b60d8bb7816"
            }
          },
          {
            "uuid": "2bc657a0-de82-4b4f-8281-bd638dd4ab4d",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "24125d32-a629-46d9-bd79-8590f158fdef"
                },
                "type": "enter_flow",
                "uuid": "a9456429-f464-4b7e-95a7-c0faf59a5ae8"
              }
            ],
            "exits": [
              {
                "uuid": "75cec1a6-f000-4a00-bda4-e2794540b266",
                "destination_uuid": null
              },
              {
                "uuid": "6007070e-6b6c-4326-99fd-d64b825c16c9",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "6421e282-5104-40d0-a75d-77fee65136df",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b428161c-f9ec-45a7-9fe8-c76cced4ffd4"
                },
                {
                  "uuid": "68b6ac93-6da8-4086-9103-36fe5fd818e3",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "dce15acd-e4c3-44df-a25a-2ccfac3e104b"
                }
              ],
              "categories": [
                {
                  "uuid": "b428161c-f9ec-45a7-9fe8-c76cced4ffd4",
                  "name": "Complete",
                  "exit_uuid": "75cec1a6-f000-4a00-bda4-e2794540b266"
                },
                {
                  "uuid": "dce15acd-e4c3-44df-a25a-2ccfac3e104b",
                  "name": "Expired",
                  "exit_uuid": "6007070e-6b6c-4326-99fd-d64b825c16c9"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b428161c-f9ec-45a7-9fe8-c76cced4ffd4"
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
        "uuid": "b710d9d9-496e-4e43-8344-e23af04c5095",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "73bccbd0-e05d-40dc-9609-1ffd6f55c397",
            "actions": [
              {
                "uuid": "c9e81927-9444-4dfd-98a7-49e29b08da55",
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
                "uuid": "765a3c0c-9dfc-4be8-97fe-aa0f0d1e83ff",
                "destination_uuid": "48360e96-c396-4f15-8799-91bd67fa9937"
              }
            ]
          },
          {
            "uuid": "48360e96-c396-4f15-8799-91bd67fa9937",
            "actions": [
              {
                "uuid": "0a50caa8-f624-4090-bd36-26323f2b11eb",
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
                "uuid": "b4cbdecd-fd28-4bd7-be8c-336a33796449",
                "destination_uuid": "a652696b-17ef-4bb4-89c0-76ddb8ce5e61"
              }
            ]
          },
          {
            "uuid": "a652696b-17ef-4bb4-89c0-76ddb8ce5e61",
            "actions": [
              {
                "uuid": "0a04dc32-4a2a-4b9e-86dc-30e047ef408e",
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
                "uuid": "10651a55-90d0-40e6-8e44-466df8593eba",
                "destination_uuid": "1a358b14-8b89-4e9f-aea8-e8ddbcf4fe2e"
              }
            ]
          },
          {
            "uuid": "1a358b14-8b89-4e9f-aea8-e8ddbcf4fe2e",
            "actions": [
              {
                "uuid": "48145ec1-0622-45dd-a24d-b511f8733c6f",
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
                "uuid": "2f30b4d4-01cc-4dbe-90b2-f96312ea991a",
                "destination_uuid": "0a00fa2e-74e4-4984-b0e1-ccde6ae9c2df"
              }
            ]
          },
          {
            "uuid": "0a00fa2e-74e4-4984-b0e1-ccde6ae9c2df",
            "actions": [
              {
                "uuid": "a763207b-d14d-4559-a18c-53bc23eb5dac",
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
                "uuid": "546a9832-7265-4dee-bed1-2de3fe93a249",
                "destination_uuid": "b448eb02-6e4d-46eb-a8bb-067f90adb946"
              }
            ]
          },
          {
            "uuid": "b448eb02-6e4d-46eb-a8bb-067f90adb946",
            "actions": [
              {
                "uuid": "ca94fa05-e15d-4585-983a-240e3fc94caa",
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
                "uuid": "443581f9-1974-41bd-a0d0-346c52faf857",
                "destination_uuid": "083f41f4-ecb8-47ef-b918-f1a5d7a3768f"
              }
            ]
          },
          {
            "uuid": "083f41f4-ecb8-47ef-b918-f1a5d7a3768f",
            "actions": [
              {
                "uuid": "6fb7bbab-3e12-422b-8222-78f148a53e27",
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
                "uuid": "c3d266a8-8ebc-4979-9c0d-4a52dfe01356",
                "destination_uuid": "b1f348aa-7450-4189-9643-bcb7038de2b2"
              }
            ]
          },
          {
            "uuid": "b1f348aa-7450-4189-9643-bcb7038de2b2",
            "actions": [
              {
                "uuid": "cb1bbdbf-44bd-45b1-b480-a7d0adc54261",
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
                "uuid": "5be59584-c9b5-45c1-8386-daea68a020f5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f2144a9f-99d9-4f50-8b4a-c1f4e4da11f6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a68f8b66-607d-4bd6-88c7-e3ee714a3b18",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "23955673-eb0e-4ce0-94d2-0750ca15f2d7"
              }
            ],
            "exits": [
              {
                "uuid": "5d19c003-dfb4-49fd-b3cb-d348c7efac36",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "536556f6-ff14-4609-a319-23af665440c7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8ba93cfb-2033-455f-913d-1a13c3a72d31",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "441d5690-cd0e-448e-8105-9a703bb6a564"
              }
            ],
            "exits": [
              {
                "uuid": "6614ed5e-2b15-48be-a2db-99baf163ac34",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "38f87f9e-0d4b-4930-bf27-22f63a971c23",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "881a21d3-57db-4aaa-bb7b-59b3a6c720ec",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "952d7b99-a938-4f06-858b-b99691b8fd7d"
              }
            ],
            "exits": [
              {
                "uuid": "a9a0ccbc-a511-4752-8d5c-fce6f3d255c4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f978cffc-d80d-421c-b99c-9c705bbdaca5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3726ad2b-2409-4712-82b0-771bc6e53110",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "19139c4e-2ac8-48ae-93dd-58f4d6aababc"
              }
            ],
            "exits": [
              {
                "uuid": "76fcf0d8-c5fa-48c2-b41d-35458022d212",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3c6d9d56-e485-4400-bdf5-fe5753ccb4ac",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8cef0f8c-9376-4b36-87b7-72d74f32527b",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cb97b467-5ae5-4720-8fff-9cc52a07b45d"
              }
            ],
            "exits": [
              {
                "uuid": "c1e8b54e-2f20-4370-9ce9-d417c3e5a210",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "43ee4cb7-2a72-4660-a8b0-eeda0e32e215",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b09d8437-0f62-4145-8d8a-0b27ecd41bea",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "06a57f19-2bea-44c9-ae48-f9a4d220261e"
              }
            ],
            "exits": [
              {
                "uuid": "9f201f2b-99ea-4cf9-a577-ca3dde39f0cc",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "328e9f1c-2c2d-446a-9f99-85b68c96787a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "26d404fc-3211-42aa-9f47-5f87d26c2a5b",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fe5154f2-e2b5-4d49-83fb-03f08409b0cd"
              }
            ],
            "exits": [
              {
                "uuid": "6a3bc396-e764-4357-9ea0-5dfd16dacdfc",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "027cab4c-58a9-4406-8d86-9a2c899cedad",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3c2add5d-687c-4d83-b8a0-4e6163599f4f",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "df032266-2be5-4fd4-87d0-66ea6c12810b"
              }
            ],
            "exits": [
              {
                "uuid": "2a888614-7890-48ee-9a01-fb9ace7a227d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4f89b8c9-4412-42c4-96dd-59d4a132585e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2344cc57-455d-4211-b4f4-23914cacdfb4",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1f08623d-2222-44db-8ced-fdc5cbecee0d"
              }
            ],
            "exits": [
              {
                "uuid": "beecc7d5-2b2e-429b-a359-8f3601ec0e89",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "1d511ad8-a032-4d99-8f4f-06546362ebd1",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "44ca1125-ca4c-4870-9859-86cdfc11e444",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e53bd35e-7099-4d70-a2f3-e82469ab3bf8"
              }
            ],
            "exits": [
              {
                "uuid": "59de645b-adab-43d5-8507-d06ee860ba1a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4d64e20e-844c-4821-86f5-d8a9e35f1fe3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "75a88ac3-30fd-4e8e-91d0-be2fd4082912",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "11ac8435-1f9a-41f0-ab3a-d702a56d1daa"
              }
            ],
            "exits": [
              {
                "uuid": "b9802943-a2b0-4ec8-a760-bb4df9df783d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bb93b2cb-3ab3-44bf-82be-fe9c3b555368",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "eed66b1a-a9e3-4c38-b3d8-a38edb21da08",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1bd94974-a98b-406e-8e15-aa50b9f293da"
              }
            ],
            "exits": [
              {
                "uuid": "be1b2eb5-3af9-4b64-8c75-09db407a0e82",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d2a805d9-4a5b-415c-b293-a4da2d23ecb2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5d99c006-997d-4bbf-8daa-643f54a164a4",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bc99e34d-dae1-43b9-90c2-2de56d57a2d8"
              }
            ],
            "exits": [
              {
                "uuid": "c56a17e7-0dc7-4f32-9db8-b7444e58449d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "17a80f3b-a13f-4cc9-8795-814128ea901d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0e200b70-db12-4465-85dd-eb64c0a9b84a",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "999df245-d925-45a3-938a-ddb76d6f9512"
              }
            ],
            "exits": [
              {
                "uuid": "4d42da66-a776-49dc-8258-85c92fb85ad7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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