export default [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "c5da079b-45fa-44c0-a7cd-6d102082975e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "30b42801-4ab0-4850-9753-3b5b0e5aed21",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bc94c88d-6e8f-4675-b0ef-019a55373890"
              }
            ],
            "exits": [
              {
                "uuid": "e32388c3-81d7-4a38-82d4-5fc10efb2840",
                "destination_uuid": "b4145363-9a16-4ef8-97ca-26f31e6f9c4e"
              }
            ]
          },
          {
            "uuid": "b4145363-9a16-4ef8-97ca-26f31e6f9c4e",
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
                "uuid": "a29e7f26-48f0-49cf-8eaa-60a99629075e"
              }
            ],
            "exits": [
              {
                "uuid": "ee17f5c8-14d7-4497-bef8-2bbe6d383580",
                "destination_uuid": "5ec7f52b-fe81-49e9-b209-984508a60644"
              }
            ]
          },
          {
            "uuid": "5ec7f52b-fe81-49e9-b209-984508a60644",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b935702c-bc5d-40de-b81a-3a670e299a82",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "0d2ee19e-97e3-48df-843a-5624be75ab14",
                  "type": "has_only_phrase",
                  "uuid": "a4e5b86f-bb49-4639-abc2-fb904a7915a7"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "2d6ebab4-fcbe-4abf-8753-2b12f210e529",
                  "type": "has_only_phrase",
                  "uuid": "9b60e0db-7af4-4c28-a55f-14d0b6b5e944"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "a00f0cf7-c100-4c73-ad13-2c417968f449",
                  "type": "has_only_phrase",
                  "uuid": "8eed3c01-670e-4903-bf69-c5dfd3781d8a"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "bd739953-f772-46dd-b65c-0a458e4c6086",
                  "type": "has_only_phrase",
                  "uuid": "774a96a1-ea1d-4b8f-b16d-87dc307e6fcf"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "79d4ac76-db3c-4d4a-9195-c0771fdb5eb9",
                  "type": "has_only_phrase",
                  "uuid": "e455a504-ed2f-4521-b607-7a137ab36c12"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8400e746-154c-467d-a7e5-3ef6029254df",
                  "name": "All Responses",
                  "uuid": "b935702c-bc5d-40de-b81a-3a670e299a82"
                },
                {
                  "exit_uuid": "ec944ade-5c61-4423-844e-a6210c83f097",
                  "name": "First option: launch example_media flow",
                  "uuid": "0d2ee19e-97e3-48df-843a-5624be75ab14"
                },
                {
                  "exit_uuid": "7ac4e1b4-dc79-4993-9daa-c7dab18bd458",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "2d6ebab4-fcbe-4abf-8753-2b12f210e529"
                },
                {
                  "exit_uuid": "9b383877-c88f-4af2-b011-447b058c3f0a",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "a00f0cf7-c100-4c73-ad13-2c417968f449"
                },
                {
                  "exit_uuid": "a4b06ce3-df92-4b4b-8457-2e5bdd785c3e",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "bd739953-f772-46dd-b65c-0a458e4c6086"
                },
                {
                  "exit_uuid": "97d163cf-f7f9-406f-b1c2-666d7be59f8f",
                  "name": "Stay in this flow.",
                  "uuid": "79d4ac76-db3c-4d4a-9195-c0771fdb5eb9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8400e746-154c-467d-a7e5-3ef6029254df",
                "destination_uuid": null
              },
              {
                "uuid": "ec944ade-5c61-4423-844e-a6210c83f097",
                "destination_uuid": "4f61afbb-8ba3-4f01-b4b7-b42c00340d1f"
              },
              {
                "uuid": "7ac4e1b4-dc79-4993-9daa-c7dab18bd458",
                "destination_uuid": "54ffd28f-f7e7-4ed7-9ac8-dac0f788bb3b"
              },
              {
                "uuid": "9b383877-c88f-4af2-b011-447b058c3f0a",
                "destination_uuid": "9cbd14d4-1a72-48b3-9c09-d141cc9303e3"
              },
              {
                "uuid": "a4b06ce3-df92-4b4b-8457-2e5bdd785c3e",
                "destination_uuid": "34c2f9f6-9323-4a61-8f53-dca9bf51673c"
              },
              {
                "uuid": "97d163cf-f7f9-406f-b1c2-666d7be59f8f",
                "destination_uuid": "0ae0616b-afe5-40e6-8a47-d0cd515133b8"
              }
            ]
          },
          {
            "uuid": "4f61afbb-8ba3-4f01-b4b7-b42c00340d1f",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "ec3dd9c2-6ea8-4d7e-9074-3ce8b9fb4818"
                },
                "type": "enter_flow",
                "uuid": "2449ec51-806b-41dc-a45f-db0fd0f3fd85"
              }
            ],
            "exits": [
              {
                "uuid": "69736eeb-2aef-410f-ae56-ca704ddd4d4e",
                "destination_uuid": "6695f256-96a5-4109-a560-ea5e530498d8"
              },
              {
                "uuid": "671102ca-5f87-40c3-9ab7-757b0138e3ae",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "ba15bf81-a1c5-4011-9e31-2422578a94a7",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "ac11ca3d-cbdc-46c2-a69e-0bcc8b7cc1d3"
                },
                {
                  "uuid": "07a4fdc7-ae02-47bc-83b4-adf9b4f6e40a",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "4a2557cc-02eb-4d14-9880-1039ed24fc0c"
                }
              ],
              "categories": [
                {
                  "uuid": "ac11ca3d-cbdc-46c2-a69e-0bcc8b7cc1d3",
                  "name": "Complete",
                  "exit_uuid": "69736eeb-2aef-410f-ae56-ca704ddd4d4e"
                },
                {
                  "uuid": "4a2557cc-02eb-4d14-9880-1039ed24fc0c",
                  "name": "Expired",
                  "exit_uuid": "671102ca-5f87-40c3-9ab7-757b0138e3ae"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "ac11ca3d-cbdc-46c2-a69e-0bcc8b7cc1d3"
            }
          },
          {
            "uuid": "54ffd28f-f7e7-4ed7-9ac8-dac0f788bb3b",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "d7e5554b-2f4d-4c71-b1bd-6531fbc1776f"
                },
                "type": "enter_flow",
                "uuid": "b43f3a3d-4c9b-4221-bef6-9941bc741b78"
              }
            ],
            "exits": [
              {
                "uuid": "55fea5f4-f90d-4cd8-af6b-9402081af8db",
                "destination_uuid": "6695f256-96a5-4109-a560-ea5e530498d8"
              },
              {
                "uuid": "219b0800-ca0e-4269-91fa-d1981c482d6e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "0972ad18-b5d2-493e-b2bd-142f4f2c374d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "062210c1-dd6b-4799-bb62-5847c7fa898c"
                },
                {
                  "uuid": "8a25e2f8-60ca-4bb4-987b-14e711698b1b",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a7bd329d-97ff-4ea3-a94a-8968bee40bc5"
                }
              ],
              "categories": [
                {
                  "uuid": "062210c1-dd6b-4799-bb62-5847c7fa898c",
                  "name": "Complete",
                  "exit_uuid": "55fea5f4-f90d-4cd8-af6b-9402081af8db"
                },
                {
                  "uuid": "a7bd329d-97ff-4ea3-a94a-8968bee40bc5",
                  "name": "Expired",
                  "exit_uuid": "219b0800-ca0e-4269-91fa-d1981c482d6e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "062210c1-dd6b-4799-bb62-5847c7fa898c"
            }
          },
          {
            "uuid": "9cbd14d4-1a72-48b3-9c09-d141cc9303e3",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "d353ecd1-4b2d-4b74-8089-a96af610894e"
                },
                "type": "enter_flow",
                "uuid": "fcc7e7f1-b68b-45ff-9bf2-d736b093bed0"
              }
            ],
            "exits": [
              {
                "uuid": "a70c6f52-69c3-470e-9c46-fbd04a7ddab8",
                "destination_uuid": "6695f256-96a5-4109-a560-ea5e530498d8"
              },
              {
                "uuid": "32d06aa4-7d6c-476d-a05c-e078484f8da7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "237fe40a-05e6-4e7b-9996-f0a635020775",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7ff2e92d-8c6e-43f6-8afd-96c243291285"
                },
                {
                  "uuid": "68c4beee-6074-4237-bdaa-64445e856be4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "18303876-b686-4df8-83c1-feeb4fdf04fc"
                }
              ],
              "categories": [
                {
                  "uuid": "7ff2e92d-8c6e-43f6-8afd-96c243291285",
                  "name": "Complete",
                  "exit_uuid": "a70c6f52-69c3-470e-9c46-fbd04a7ddab8"
                },
                {
                  "uuid": "18303876-b686-4df8-83c1-feeb4fdf04fc",
                  "name": "Expired",
                  "exit_uuid": "32d06aa4-7d6c-476d-a05c-e078484f8da7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7ff2e92d-8c6e-43f6-8afd-96c243291285"
            }
          },
          {
            "uuid": "34c2f9f6-9323-4a61-8f53-dca9bf51673c",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "e791d805-3699-4ef9-ac36-844188806ba5"
                },
                "type": "enter_flow",
                "uuid": "5a888c7e-caae-4e7a-a100-e476f8338f78"
              }
            ],
            "exits": [
              {
                "uuid": "83712bb9-c80a-45f0-b7d0-fda578a99cbc",
                "destination_uuid": "6695f256-96a5-4109-a560-ea5e530498d8"
              },
              {
                "uuid": "081721d8-55f2-4a83-9f27-055172547907",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1edc07cd-ee8b-4e01-b2ec-b092fd982530",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "1f41bce9-9549-4d1d-8def-1b16ac19c17a"
                },
                {
                  "uuid": "42daadb2-a0e9-4583-b391-08756e1a6944",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "40aade4c-2ce9-45b9-b949-9e41a67ab023"
                }
              ],
              "categories": [
                {
                  "uuid": "1f41bce9-9549-4d1d-8def-1b16ac19c17a",
                  "name": "Complete",
                  "exit_uuid": "83712bb9-c80a-45f0-b7d0-fda578a99cbc"
                },
                {
                  "uuid": "40aade4c-2ce9-45b9-b949-9e41a67ab023",
                  "name": "Expired",
                  "exit_uuid": "081721d8-55f2-4a83-9f27-055172547907"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "1f41bce9-9549-4d1d-8def-1b16ac19c17a"
            }
          },
          {
            "uuid": "0ae0616b-afe5-40e6-8a47-d0cd515133b8",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8a7d3058-e612-43ac-b0f4-2aa68abfcb59"
              }
            ],
            "exits": [
              {
                "uuid": "dfb093fa-e87d-4917-b10c-ea5ec37cae91",
                "destination_uuid": "3dbeb241-4c33-40a0-922e-adbd6106017e"
              }
            ]
          },
          {
            "uuid": "6695f256-96a5-4109-a560-ea5e530498d8",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4dfdea32-91a0-4ff4-9071-8cc9df8ccf6b"
              }
            ],
            "exits": [
              {
                "uuid": "936f1995-e606-4c1f-8da7-297b57bc4232",
                "destination_uuid": "3dbeb241-4c33-40a0-922e-adbd6106017e"
              }
            ]
          },
          {
            "uuid": "3dbeb241-4c33-40a0-922e-adbd6106017e",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "5a405a43-c23f-429b-9f00-2ff3eb0943cb"
              }
            ],
            "exits": [
              {
                "uuid": "62d40abd-521b-4583-a523-ce4ce8fc5a7d",
                "destination_uuid": "347c3c56-ab3c-437e-b107-88f6f4b7f324"
              }
            ]
          },
          {
            "uuid": "347c3c56-ab3c-437e-b107-88f6f4b7f324",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "39a93200-8af3-420d-988c-05ff51e73355",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "b8f85fe3-5beb-45d9-b9a7-3daee3c17db6",
                  "type": "has_only_phrase",
                  "uuid": "1d51df73-0867-4a42-a05d-545cffe6c3aa"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "f8853054-0547-4ff4-ada0-1a4e4b350837",
                  "type": "has_only_phrase",
                  "uuid": "dd625753-0a49-479b-9c7e-73b0309f5be6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c8f9b231-d8e8-42ae-99f4-e338743a5641",
                  "name": "All Responses",
                  "uuid": "39a93200-8af3-420d-988c-05ff51e73355"
                },
                {
                  "exit_uuid": "376a9ddf-36eb-4e08-b92d-25e0c71f6e76",
                  "name": "Yes",
                  "uuid": "b8f85fe3-5beb-45d9-b9a7-3daee3c17db6"
                },
                {
                  "exit_uuid": "e1da21ad-f947-4616-b7c1-b85419335ac9",
                  "name": "No",
                  "uuid": "f8853054-0547-4ff4-ada0-1a4e4b350837"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c8f9b231-d8e8-42ae-99f4-e338743a5641",
                "destination_uuid": null
              },
              {
                "uuid": "376a9ddf-36eb-4e08-b92d-25e0c71f6e76",
                "destination_uuid": "b4145363-9a16-4ef8-97ca-26f31e6f9c4e"
              },
              {
                "uuid": "e1da21ad-f947-4616-b7c1-b85419335ac9",
                "destination_uuid": "b634d78b-e782-4723-978b-ebc256a2ed4c"
              }
            ]
          },
          {
            "uuid": "b634d78b-e782-4723-978b-ebc256a2ed4c",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2b637e60-133c-45a0-9661-a1530be58d0a"
              }
            ],
            "exits": [
              {
                "uuid": "3d94db85-a5f6-467d-900d-22e59d9480af",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "5423f520-3b0a-4a30-a5b5-895d352ef8da",
            "actions": [
              {
                "uuid": "9188fd4c-3bf2-4d85-91af-f2198c1607d9",
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
                "uuid": "553029bd-8c53-453a-ab34-84eabf6b9a76",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "1da19b8a-632d-4c9f-9d4d-4cc4e44d945f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "76312625-ff6b-4a7a-a488-1a14d676499d",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a4fbf1b8-52e3-48bf-8c0f-8dc33c491b51"
              }
            ],
            "exits": [
              {
                "uuid": "18f7d8c1-9254-4f86-8659-cf5cf14bc609",
                "destination_uuid": "49eb3ce2-e979-4398-a455-6106f04ec33c"
              }
            ]
          },
          {
            "uuid": "e333e7bb-34e8-4527-a67f-e3064d58773e",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0de8bf0a-851e-4734-859f-e347bc75f900"
              }
            ],
            "exits": [
              {
                "uuid": "38ae55ef-c8e7-49bc-b25b-ea5c63f1aa54",
                "destination_uuid": "ea8b21ff-fd78-4b59-84ee-c6728bc4e3ff"
              }
            ]
          },
          {
            "uuid": "ea8b21ff-fd78-4b59-84ee-c6728bc4e3ff",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "51157143-d306-447c-bac7-4a7088bef428"
              }
            ],
            "exits": [
              {
                "uuid": "a41efb5f-65a5-43f6-8c32-cd04da0e075f",
                "destination_uuid": "b8844dff-7474-42a2-b9d1-a37618330857"
              }
            ]
          },
          {
            "uuid": "b8844dff-7474-42a2-b9d1-a37618330857",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "906d9530-2ef0-4c16-b7f3-47ceed531084",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "1a316e5b-deed-41fb-a0cb-c92751df9a3f",
                  "type": "has_only_phrase",
                  "uuid": "d71b10e2-8489-4dd4-8448-b9741cde724f"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "1a316e5b-deed-41fb-a0cb-c92751df9a3f",
                  "type": "has_only_phrase",
                  "uuid": "27f95846-2419-4c72-8dba-dffe95e9108b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ab4d8962-ac82-41bb-8ee6-265478c5aa99",
                  "name": "All Responses",
                  "uuid": "906d9530-2ef0-4c16-b7f3-47ceed531084"
                },
                {
                  "exit_uuid": "a754a7fb-205d-4fc9-b81a-45574f95440b",
                  "name": "image1; image2",
                  "uuid": "1a316e5b-deed-41fb-a0cb-c92751df9a3f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ab4d8962-ac82-41bb-8ee6-265478c5aa99",
                "destination_uuid": null
              },
              {
                "uuid": "a754a7fb-205d-4fc9-b81a-45574f95440b",
                "destination_uuid": "415ff13a-a819-439e-8990-7029e6877d61"
              }
            ]
          },
          {
            "uuid": "415ff13a-a819-439e-8990-7029e6877d61",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "fac65221-3760-448d-b19f-858655a6e70d"
              }
            ],
            "exits": [
              {
                "uuid": "ad947e97-1af8-4dfc-b63f-dd680eb87591",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "49eb3ce2-e979-4398-a455-6106f04ec33c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4e006743-7d54-43a3-96b8-3f7b365cdd4c",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "bbdab693-8f0e-48c8-a7e5-19f700854051",
                  "type": "has_only_phrase",
                  "uuid": "fadbf11c-4cd7-4433-8325-184a310ba0d5"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "bbdab693-8f0e-48c8-a7e5-19f700854051",
                  "type": "has_only_phrase",
                  "uuid": "031de0f6-25fb-43f9-84f6-03e5542a2e75"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "63fe1306-792d-4b65-a738-2759989ff376",
                  "name": "All Responses",
                  "uuid": "4e006743-7d54-43a3-96b8-3f7b365cdd4c"
                },
                {
                  "exit_uuid": "ad401705-f1d8-44a9-a65e-26a8f3cfdb99",
                  "name": "image1; image2",
                  "uuid": "bbdab693-8f0e-48c8-a7e5-19f700854051"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "63fe1306-792d-4b65-a738-2759989ff376",
                "destination_uuid": "e333e7bb-34e8-4527-a67f-e3064d58773e"
              },
              {
                "uuid": "ad401705-f1d8-44a9-a65e-26a8f3cfdb99",
                "destination_uuid": "f745f532-e358-424a-bf05-96de82cc1328"
              }
            ]
          },
          {
            "uuid": "f745f532-e358-424a-bf05-96de82cc1328",
            "actions": [
              {
                "uuid": "f838451a-2549-4338-b2a7-b74b76678f40",
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
                "uuid": "cd3e46a0-2844-4d58-b97d-0e2f962ca9e8",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5618a5e9-50da-4c6d-9dea-bf9c2c04c556",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c2f74219-9df0-479c-baab-28fcf6dfdac4",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "8a0dbd90-8fbf-471e-86be-f79ee680a684"
              }
            ],
            "exits": [
              {
                "uuid": "a2200af8-6d14-42f2-968a-3190568d9857",
                "destination_uuid": "2144d082-7ca6-4b9a-8a53-49a05a0820b2"
              }
            ]
          },
          {
            "uuid": "2144d082-7ca6-4b9a-8a53-49a05a0820b2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "05fdcae5-03d1-4787-b184-a9a890ef882a",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "1dc4d6fa-dfa4-4f89-b441-253da65d30cd",
                  "type": "has_only_phrase",
                  "uuid": "64406dba-a07f-45b9-bd5e-74757030ad10"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "addeb73b-92ea-49ec-8471-2efffbb7f65e",
                  "type": "has_only_phrase",
                  "uuid": "2c585bff-11eb-41e5-b04a-3fb033ccb42f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "be5f4483-e2f2-4a57-8601-c1d3c25e4969",
                  "name": "All Responses",
                  "uuid": "05fdcae5-03d1-4787-b184-a9a890ef882a"
                },
                {
                  "exit_uuid": "35850b54-42cf-4d28-89be-704c657d525b",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "1dc4d6fa-dfa4-4f89-b441-253da65d30cd"
                },
                {
                  "exit_uuid": "e9ac6fac-e8bc-4c40-b6a5-624d302d5404",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "addeb73b-92ea-49ec-8471-2efffbb7f65e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "be5f4483-e2f2-4a57-8601-c1d3c25e4969",
                "destination_uuid": null
              },
              {
                "uuid": "35850b54-42cf-4d28-89be-704c657d525b",
                "destination_uuid": "6616c953-7537-49c0-b083-a89ed0f511d9"
              },
              {
                "uuid": "e9ac6fac-e8bc-4c40-b6a5-624d302d5404",
                "destination_uuid": "550bfab5-454a-4918-87b8-7b6f8e52f609"
              }
            ]
          },
          {
            "uuid": "6616c953-7537-49c0-b083-a89ed0f511d9",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "41de0d1c-eb3b-4be8-bb43-a506882567aa"
              }
            ],
            "exits": [
              {
                "uuid": "6e434269-4b62-4524-8bf7-b190e357c66f",
                "destination_uuid": "35121d7b-3ad1-44df-8bae-cb3d81f08deb"
              }
            ]
          },
          {
            "uuid": "550bfab5-454a-4918-87b8-7b6f8e52f609",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "c2ec3f42-2ec5-4789-8433-a39dd82f54d2"
              }
            ],
            "exits": [
              {
                "uuid": "443988b8-35ad-4dfb-b1b8-ff4a262901a8",
                "destination_uuid": "35121d7b-3ad1-44df-8bae-cb3d81f08deb"
              }
            ]
          },
          {
            "uuid": "35121d7b-3ad1-44df-8bae-cb3d81f08deb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cafe426e-5501-4d80-8df6-f56b878b67c7",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "dd215eb3-8d35-46b3-9d32-c29021782236",
                  "type": "has_only_phrase",
                  "uuid": "b417dc07-011a-43fd-8dab-071a6bbf7bbf"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "1246e37b-9a88-4eb1-8878-7c76118932dd",
                  "type": "has_only_phrase",
                  "uuid": "5ee8abbf-bbe0-425b-8de0-8fa747ba3eb3"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "f336a3f3-172f-41d7-93b6-5bd1da9b79e8",
                  "type": "has_only_phrase",
                  "uuid": "6715395f-e731-42cc-9aa2-2099b41c6572"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ae0b301d-5719-4843-991a-3631233c60eb",
                  "name": "All Responses",
                  "uuid": "cafe426e-5501-4d80-8df6-f56b878b67c7"
                },
                {
                  "exit_uuid": "a640b87c-882c-4bcf-ae4d-48fb1876dcbd",
                  "name": "Hello",
                  "uuid": "dd215eb3-8d35-46b3-9d32-c29021782236"
                },
                {
                  "exit_uuid": "a8118cd5-2e23-44b5-bb24-c8e7ee06a74c",
                  "name": "Goodbye",
                  "uuid": "1246e37b-9a88-4eb1-8878-7c76118932dd"
                },
                {
                  "exit_uuid": "b40767c1-bf7a-400a-86c0-bd70299ef2a9",
                  "name": "Goodbye",
                  "uuid": "f336a3f3-172f-41d7-93b6-5bd1da9b79e8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ae0b301d-5719-4843-991a-3631233c60eb",
                "destination_uuid": null
              },
              {
                "uuid": "a640b87c-882c-4bcf-ae4d-48fb1876dcbd",
                "destination_uuid": "8a2a1f03-8873-4e2a-b6fe-2fcdeb97bd8e"
              },
              {
                "uuid": "a8118cd5-2e23-44b5-bb24-c8e7ee06a74c",
                "destination_uuid": "1a8e2696-623d-4d71-bd9c-32169c50e4d4"
              },
              {
                "uuid": "b40767c1-bf7a-400a-86c0-bd70299ef2a9",
                "destination_uuid": "1a8e2696-623d-4d71-bd9c-32169c50e4d4"
              }
            ]
          },
          {
            "uuid": "8a2a1f03-8873-4e2a-b6fe-2fcdeb97bd8e",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a1f80fda-5f8d-430d-a6b3-84cbb6857b81"
              }
            ],
            "exits": [
              {
                "uuid": "20bd1223-6ea1-4d1b-a75e-b45abbed30cf",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1a8e2696-623d-4d71-bd9c-32169c50e4d4",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "58f60e5d-526e-47ad-8406-03323c08bed9"
              }
            ],
            "exits": [
              {
                "uuid": "53fff122-0deb-415d-b3fb-cea4f34a6546",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "81be49f9-8a19-4daf-972b-2606dc81545e",
            "actions": [
              {
                "uuid": "0e69cf74-4c9e-4bf5-a681-98813c449b70",
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
                "uuid": "f1bade74-06e5-400f-86f5-2d6d01f2d16f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c5f54464-61e5-4d13-91c8-40f9b4454453",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8888e427-162a-438c-9b82-80cc98feba01",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e0856c4f-daef-4bc9-9155-120c7dbfdf4c"
              }
            ],
            "exits": [
              {
                "uuid": "c5266963-8de9-4005-9162-35554a700270",
                "destination_uuid": "b34fb180-9b06-4c37-bb1e-e2495f828c55"
              }
            ]
          },
          {
            "uuid": "b34fb180-9b06-4c37-bb1e-e2495f828c55",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "9833ff62-b2bb-4904-b62a-4b695544d2f8"
              }
            ],
            "exits": [
              {
                "uuid": "6d744211-64df-47f8-bb39-8e7c427aeea9",
                "destination_uuid": "c207c9e5-3809-4cca-99ba-f393c201e9fe"
              }
            ]
          },
          {
            "uuid": "c207c9e5-3809-4cca-99ba-f393c201e9fe",
            "actions": [],
            "exits": [
              {
                "uuid": "736b3eca-1538-4959-9e13-12e7a038d907",
                "destination_uuid": "f06f87c5-0a36-43f3-ba4d-bec097b09e30"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "00a6ab8b-ea06-4c8b-b517-17516869667e",
              "cases": [],
              "categories": [
                {
                  "uuid": "00a6ab8b-ea06-4c8b-b517-17516869667e",
                  "name": "All Responses",
                  "exit_uuid": "736b3eca-1538-4959-9e13-12e7a038d907"
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
            "uuid": "f06f87c5-0a36-43f3-ba4d-bec097b09e30",
            "actions": [
              {
                "uuid": "3719ab68-330d-4de9-a42f-471152f574c0",
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
                "uuid": "b481b8e3-e71a-4858-a57b-3da4946d10be",
                "destination_uuid": "89e29aeb-7469-4c03-8446-878ecc300249"
              }
            ]
          },
          {
            "uuid": "89e29aeb-7469-4c03-8446-878ecc300249",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e4016898-a682-40ac-9452-bd2210ac37ee",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "27461c2d-c66f-4ed6-9b73-6370d6f53d74",
                  "type": "has_only_phrase",
                  "uuid": "346590c1-0dda-4ec7-9565-33f3f394d553"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "56820c92-7d0d-4e19-87d0-7f2685fca037",
                  "type": "has_only_phrase",
                  "uuid": "422b484e-c0a7-4e41-8181-d41e2373366f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7dab642f-e359-4356-8019-8daa82df37fd",
                  "name": "All Responses",
                  "uuid": "e4016898-a682-40ac-9452-bd2210ac37ee"
                },
                {
                  "exit_uuid": "12462fcc-925a-4449-bc1a-e1e1b7f28c99",
                  "name": "1",
                  "uuid": "27461c2d-c66f-4ed6-9b73-6370d6f53d74"
                },
                {
                  "exit_uuid": "e8320ed3-a6b0-4ac1-ae17-9b7a3835a740",
                  "name": "2",
                  "uuid": "56820c92-7d0d-4e19-87d0-7f2685fca037"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "7dab642f-e359-4356-8019-8daa82df37fd",
                "destination_uuid": "66b25533-edf0-454f-8854-7f34c84b80d6"
              },
              {
                "uuid": "12462fcc-925a-4449-bc1a-e1e1b7f28c99",
                "destination_uuid": "fbd40543-f563-4557-b4c5-ead3d7e6f7d7"
              },
              {
                "uuid": "e8320ed3-a6b0-4ac1-ae17-9b7a3835a740",
                "destination_uuid": "c93b6206-7616-406a-82ef-145cf7669499"
              }
            ]
          },
          {
            "uuid": "fbd40543-f563-4557-b4c5-ead3d7e6f7d7",
            "actions": [
              {
                "uuid": "623f5041-3fa9-4523-98ae-575e7329a2cb",
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
                "uuid": "3ccd62c5-ad7b-4eca-92eb-0fec53944abd",
                "destination_uuid": "28a03b71-808b-4ff9-bd96-eec97b0488fa"
              }
            ]
          },
          {
            "uuid": "c93b6206-7616-406a-82ef-145cf7669499",
            "actions": [
              {
                "uuid": "ec96644d-5ece-4ae9-a139-a1448fbdf47e",
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
                "uuid": "618d35ae-601f-4163-a30d-df3dd912368b",
                "destination_uuid": "cf666c93-0b5d-4efe-869a-2a3a351340ae"
              }
            ]
          },
          {
            "uuid": "66b25533-edf0-454f-8854-7f34c84b80d6",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "aa11f693-cbc5-4d06-9402-3276222eae6e"
              }
            ],
            "exits": [
              {
                "uuid": "c404fcbe-9844-4cfc-9769-4b719535eb8b",
                "destination_uuid": "3fe17a85-a285-44c9-ac5c-b705def98fce"
              }
            ]
          },
          {
            "uuid": "3fe17a85-a285-44c9-ac5c-b705def98fce",
            "actions": [],
            "exits": [
              {
                "uuid": "44ed3858-93ca-47b0-8f16-80bab123af0e",
                "destination_uuid": "581035c4-d1ad-4a06-a821-4e24b2b37c5d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "22c8979e-5e18-4ef1-89fe-9bc66b4ab07c",
              "cases": [],
              "categories": [
                {
                  "uuid": "22c8979e-5e18-4ef1-89fe-9bc66b4ab07c",
                  "name": "All Responses",
                  "exit_uuid": "44ed3858-93ca-47b0-8f16-80bab123af0e"
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
            "uuid": "581035c4-d1ad-4a06-a821-4e24b2b37c5d",
            "actions": [
              {
                "uuid": "24ad5fd3-bf8c-4651-b70c-f4ac3ec63c12",
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
                "uuid": "2710ba56-2848-42f8-b02c-cb4453f2a496",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "28a03b71-808b-4ff9-bd96-eec97b0488fa",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e26a9468-cf00-462a-b170-3d3b377f11b4"
              }
            ],
            "exits": [
              {
                "uuid": "deaee0a7-def0-4229-af27-3aff2107c0df",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "cf666c93-0b5d-4efe-869a-2a3a351340ae",
            "actions": [
              {
                "uuid": "0cfc6b37-a349-472f-875a-1a2f7994751d",
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
                "uuid": "fbd08874-1bba-49b6-ad18-6e25139c2c05",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "39767c30-e8fb-4a73-9aec-0853a5ce84a1",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0afbebc2-b8a5-48a6-848d-ca69d69be7f2",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "da8e5df6-9315-49c0-89c7-d3c39fc38ec4"
              }
            ],
            "exits": [
              {
                "uuid": "fe77a15b-2f10-4fb2-92b7-9f36eb849752",
                "destination_uuid": "79b34fab-efd7-47c6-aa29-2ea53c5f1476"
              }
            ]
          },
          {
            "uuid": "79b34fab-efd7-47c6-aa29-2ea53c5f1476",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "54db5803-1c55-4856-bb6e-6d0cae13f7b7",
              "cases": [
                {
                  "arguments": [
                    "Go to the story"
                  ],
                  "category_uuid": "c34a5fca-eacb-40e8-965d-19cb9373651b",
                  "type": "has_only_phrase",
                  "uuid": "7d5722fb-9219-496d-acd6-75a92eea27bf"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ccef0d21-e751-47a5-ac52-aab996fa33d1",
                  "name": "All Responses",
                  "uuid": "54db5803-1c55-4856-bb6e-6d0cae13f7b7"
                },
                {
                  "exit_uuid": "b35c8a5c-de50-4d65-afc0-0fcd04c06600",
                  "name": "Go to the story",
                  "uuid": "c34a5fca-eacb-40e8-965d-19cb9373651b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ccef0d21-e751-47a5-ac52-aab996fa33d1",
                "destination_uuid": null
              },
              {
                "uuid": "b35c8a5c-de50-4d65-afc0-0fcd04c06600",
                "destination_uuid": "3b2da54b-9744-4d34-807a-e5fab3920de4"
              }
            ]
          },
          {
            "uuid": "3b2da54b-9744-4d34-807a-e5fab3920de4",
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
                "uuid": "54e73d1b-60bb-420a-b8a5-63b00e10dcd8"
              }
            ],
            "exits": [
              {
                "uuid": "37870209-7be1-4ee5-aaff-15f1eb9d5bab",
                "destination_uuid": "46ad6577-879a-4897-8a9c-7b8aeb9ec01f"
              }
            ]
          },
          {
            "uuid": "46ad6577-879a-4897-8a9c-7b8aeb9ec01f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a73a4116-fe90-4404-9c75-d87ba32023ef",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "371a5ab1-7e42-4de4-a974-a4d6d0896152",
                  "type": "has_only_phrase",
                  "uuid": "51f6bf8d-ee3b-4120-a355-50db8c1f5dc5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "811cc104-117c-45dd-8f79-0fe97abe4889",
                  "name": "All Responses",
                  "uuid": "a73a4116-fe90-4404-9c75-d87ba32023ef"
                },
                {
                  "exit_uuid": "f801570a-8d34-469d-b795-1ffd585369bd",
                  "name": "Next",
                  "uuid": "371a5ab1-7e42-4de4-a974-a4d6d0896152"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "811cc104-117c-45dd-8f79-0fe97abe4889",
                "destination_uuid": null
              },
              {
                "uuid": "f801570a-8d34-469d-b795-1ffd585369bd",
                "destination_uuid": "ff3e1959-b6b0-4cac-a19a-8e639866cb19"
              }
            ]
          },
          {
            "uuid": "ff3e1959-b6b0-4cac-a19a-8e639866cb19",
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
                "uuid": "80ff664a-b2fd-4809-9b11-ec521b4f457f"
              }
            ],
            "exits": [
              {
                "uuid": "e3088a5e-943f-4736-a6e4-f82b24cfd73a",
                "destination_uuid": "0b27c5c4-81e2-495c-8bee-1d108ce7a73a"
              }
            ]
          },
          {
            "uuid": "0b27c5c4-81e2-495c-8bee-1d108ce7a73a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "eb3afe66-270d-48da-94b4-ccafba753027",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "35fc337c-e012-44ec-8bb2-c20b5f95d47b",
                  "type": "has_only_phrase",
                  "uuid": "7099bbb2-87ad-4ee6-8ee1-7d077062b21e"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "90e6d80c-348b-4396-9a00-5e73e1cf7a88",
                  "type": "has_only_phrase",
                  "uuid": "e0467360-dfc5-4c49-b10a-9848e80a8055"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1884b20d-1cfc-4998-a1a6-9723003b9f05",
                  "name": "All Responses",
                  "uuid": "eb3afe66-270d-48da-94b4-ccafba753027"
                },
                {
                  "exit_uuid": "d95bded2-2c46-42af-b9e6-e4cf9eaf6158",
                  "name": "Previous",
                  "uuid": "35fc337c-e012-44ec-8bb2-c20b5f95d47b"
                },
                {
                  "exit_uuid": "a32eaf76-e532-4e5a-97a9-175cca0ce1d6",
                  "name": "Next",
                  "uuid": "90e6d80c-348b-4396-9a00-5e73e1cf7a88"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1884b20d-1cfc-4998-a1a6-9723003b9f05",
                "destination_uuid": null
              },
              {
                "uuid": "d95bded2-2c46-42af-b9e6-e4cf9eaf6158",
                "destination_uuid": "3b2da54b-9744-4d34-807a-e5fab3920de4"
              },
              {
                "uuid": "a32eaf76-e532-4e5a-97a9-175cca0ce1d6",
                "destination_uuid": "f6e5f30e-0e86-4f45-9253-3a556e262d74"
              }
            ]
          },
          {
            "uuid": "f6e5f30e-0e86-4f45-9253-3a556e262d74",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d08bd6db-7dcf-4547-bc2e-dd7d210c059a"
              }
            ],
            "exits": [
              {
                "uuid": "84675b01-dc2c-46a6-b239-b6213a420b89",
                "destination_uuid": "88f42132-5e82-4c83-9dea-95b8ebc36e6e"
              }
            ]
          },
          {
            "uuid": "88f42132-5e82-4c83-9dea-95b8ebc36e6e",
            "actions": [
              {
                "uuid": "1482df61-bc20-4853-8ede-d794d254e044",
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
                "uuid": "d4c97889-014b-4df0-8b63-5ae5c10cf3a2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f818f298-df6d-4934-8776-db446ffcecb7",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e8950177-28c6-43c2-8dd4-ca4a25c70bc1",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "92ceecb5-246c-4f58-9c2e-14975f4c4b75"
              }
            ],
            "exits": [
              {
                "uuid": "72cf1485-ac19-43e6-8803-72e700ced5ee",
                "destination_uuid": "a1540f60-0602-4a28-a0ee-2cf66939278d"
              }
            ]
          },
          {
            "uuid": "a1540f60-0602-4a28-a0ee-2cf66939278d",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "f3bdbdec-81a7-4ea3-806a-c577a6be5ce5"
              }
            ],
            "exits": [
              {
                "uuid": "8418f8cb-798d-4588-992d-8b380801aeba",
                "destination_uuid": "86514541-a2e5-4cb8-8393-a9d3bd33d960"
              }
            ]
          },
          {
            "uuid": "86514541-a2e5-4cb8-8393-a9d3bd33d960",
            "actions": [],
            "exits": [
              {
                "uuid": "b640e867-eb3a-4f16-b306-424026781719",
                "destination_uuid": "5e90d5fe-0c0d-41d9-84c3-e890478ef5c8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "cb2807c7-94d8-4331-9e81-00a8ef692b5b",
              "cases": [],
              "categories": [
                {
                  "uuid": "cb2807c7-94d8-4331-9e81-00a8ef692b5b",
                  "name": "All Responses",
                  "exit_uuid": "b640e867-eb3a-4f16-b306-424026781719"
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
            "uuid": "5e90d5fe-0c0d-41d9-84c3-e890478ef5c8",
            "actions": [
              {
                "uuid": "81bbcff8-cc6b-4156-8051-6428cfd41b38",
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
                "uuid": "6aaa0ca5-1b76-48bd-8ab7-2db0295f0d40",
                "destination_uuid": "e66af4ff-105c-457d-ac38-f8132a2161e4"
              }
            ]
          },
          {
            "uuid": "e66af4ff-105c-457d-ac38-f8132a2161e4",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "92d42e64-f6f7-4628-869d-116f636fa0ef"
                },
                "type": "enter_flow",
                "uuid": "2932f79f-e00a-4186-aa2d-315154123d42"
              }
            ],
            "exits": [
              {
                "uuid": "739d4ce2-6e23-40cc-a120-d99d12b6cc58",
                "destination_uuid": "3bf7189d-8748-406b-8f1c-a8f6d368d3ac"
              },
              {
                "uuid": "628c64ba-b1bf-4d32-9d8f-6925c8b3987b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "75462a9a-107e-470b-9ab7-e1e44775f1ef",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "78bc728f-cf78-4730-a25d-cab8a68b4da9"
                },
                {
                  "uuid": "d6f6d480-7209-44c6-8e90-24469c2927cc",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c888e778-2e57-4fa4-8770-588333cc3cde"
                }
              ],
              "categories": [
                {
                  "uuid": "78bc728f-cf78-4730-a25d-cab8a68b4da9",
                  "name": "Complete",
                  "exit_uuid": "739d4ce2-6e23-40cc-a120-d99d12b6cc58"
                },
                {
                  "uuid": "c888e778-2e57-4fa4-8770-588333cc3cde",
                  "name": "Expired",
                  "exit_uuid": "628c64ba-b1bf-4d32-9d8f-6925c8b3987b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "78bc728f-cf78-4730-a25d-cab8a68b4da9"
            }
          },
          {
            "uuid": "3bf7189d-8748-406b-8f1c-a8f6d368d3ac",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "65a05244-e814-40ff-a291-fcc6497a2f5b"
              }
            ],
            "exits": [
              {
                "uuid": "24612a76-392c-481e-9234-c6de50a04604",
                "destination_uuid": "7608d5ce-7957-41ef-b99d-2ec428655d1f"
              }
            ]
          },
          {
            "uuid": "7608d5ce-7957-41ef-b99d-2ec428655d1f",
            "actions": [],
            "exits": [
              {
                "uuid": "4a3f4d66-24e5-4904-a435-a25c76c05afc",
                "destination_uuid": "a43d5dfe-9d06-41b4-af3b-6b775e76cee0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "dcc6ca27-2ba1-4d10-a4ed-1d63f0cad5bc",
              "cases": [],
              "categories": [
                {
                  "uuid": "dcc6ca27-2ba1-4d10-a4ed-1d63f0cad5bc",
                  "name": "All Responses",
                  "exit_uuid": "4a3f4d66-24e5-4904-a435-a25c76c05afc"
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
            "uuid": "a43d5dfe-9d06-41b4-af3b-6b775e76cee0",
            "actions": [
              {
                "uuid": "3f01cb7a-c096-4a31-be39-31415cf3476a",
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
                "uuid": "8ee33588-a146-48df-b0e6-cc34fa3a8b52",
                "destination_uuid": "69e748de-d4ad-46e7-b484-7ad6a0882286"
              }
            ]
          },
          {
            "uuid": "69e748de-d4ad-46e7-b484-7ad6a0882286",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0fbf5b79-2777-4e55-9a48-4187700632cb",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "b86afdee-cd18-4cec-9a2b-d8d2e974afb5",
                  "type": "has_only_phrase",
                  "uuid": "7f079651-75ea-4a56-bfbc-3a1bebf4ae39"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "3787f713-9342-46be-8c8b-0c9c9cc78046",
                  "type": "has_only_phrase",
                  "uuid": "41ac28a3-3d68-4289-844a-caaca02ed6c4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8d2940a4-ec62-45d1-b796-d6980f71ddec",
                  "name": "All Responses",
                  "uuid": "0fbf5b79-2777-4e55-9a48-4187700632cb"
                },
                {
                  "exit_uuid": "18775abd-639f-4f07-b0e8-d206b888fc98",
                  "name": "guide1",
                  "uuid": "b86afdee-cd18-4cec-9a2b-d8d2e974afb5"
                },
                {
                  "exit_uuid": "b6012444-93cc-403b-81b2-51ebf3b3970c",
                  "name": "guide2",
                  "uuid": "3787f713-9342-46be-8c8b-0c9c9cc78046"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "8d2940a4-ec62-45d1-b796-d6980f71ddec",
                "destination_uuid": null
              },
              {
                "uuid": "18775abd-639f-4f07-b0e8-d206b888fc98",
                "destination_uuid": "8d6fa8f7-c8cc-417c-83fa-0a7ff0a56c50"
              },
              {
                "uuid": "b6012444-93cc-403b-81b2-51ebf3b3970c",
                "destination_uuid": "247c3192-9b33-4908-ac05-cb1ae9734fdf"
              }
            ]
          },
          {
            "uuid": "8d6fa8f7-c8cc-417c-83fa-0a7ff0a56c50",
            "actions": [
              {
                "uuid": "63b792ff-e010-4807-b557-d2549fc5f6d4",
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
                "uuid": "fc21d580-22a4-43d9-8f4c-1422f6760490",
                "destination_uuid": "147e6dc5-edd3-4e2f-ad91-f8279822a3a3"
              }
            ]
          },
          {
            "uuid": "247c3192-9b33-4908-ac05-cb1ae9734fdf",
            "actions": [
              {
                "uuid": "079d44c7-acc0-4ee1-91e1-a142c2b1ba1d",
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
                "uuid": "5376b6aa-bc00-4f9f-a256-5035450ec0eb",
                "destination_uuid": "147e6dc5-edd3-4e2f-ad91-f8279822a3a3"
              }
            ]
          },
          {
            "uuid": "147e6dc5-edd3-4e2f-ad91-f8279822a3a3",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8b64d08f-d16b-44f4-b9aa-8183b8a3655c"
              }
            ],
            "exits": [
              {
                "uuid": "ddb4195a-28db-430d-bb0c-05413dc8bcee",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "78d57fe0-6f57-48fd-977f-89afdfd37e97",
            "actions": [
              {
                "uuid": "b613321d-d6f4-46cd-99e6-b28cc04b363a",
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
                "uuid": "11070409-4988-4082-a14f-ac1862a64dc9",
                "destination_uuid": "5cfa523f-2765-4219-9740-bffbbce16c55"
              }
            ]
          },
          {
            "uuid": "5cfa523f-2765-4219-9740-bffbbce16c55",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "01c18438-b30f-47d0-81f8-f0a6073ffc4a"
                },
                "type": "enter_flow",
                "uuid": "a0c9d3d0-ce98-484b-b9be-122840edc9b4"
              }
            ],
            "exits": [
              {
                "uuid": "941413a0-7e89-4de1-8d62-0e12140abf76",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a1ee2b04-277e-4970-a02d-3f59e4da4b92",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c05864cc-fff9-479c-99f9-aa754dde6066",
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
                "uuid": "2d11d6ba-a1c5-4d5f-9c71-d989ee5b05d7"
              }
            ],
            "exits": [
              {
                "uuid": "8281049d-ffbc-4fa1-a7cf-91dea140860e",
                "destination_uuid": "fc0cec06-a78f-4bca-8976-40c382dcefa8"
              }
            ]
          },
          {
            "uuid": "fc0cec06-a78f-4bca-8976-40c382dcefa8",
            "actions": [],
            "exits": [
              {
                "uuid": "87bbef72-77f8-4e23-aca4-c8c9b9f4b0d9",
                "destination_uuid": "0d49d26c-01db-43a3-bf1f-de432a4a3ab3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "28b00e00-b609-42a6-983d-9224ea0ada7a",
              "cases": [],
              "categories": [
                {
                  "uuid": "28b00e00-b609-42a6-983d-9224ea0ada7a",
                  "name": "All Responses",
                  "exit_uuid": "87bbef72-77f8-4e23-aca4-c8c9b9f4b0d9"
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
            "uuid": "0d49d26c-01db-43a3-bf1f-de432a4a3ab3",
            "actions": [
              {
                "uuid": "79dd014c-c332-42cc-afbb-7dde33fa78c8",
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
                "uuid": "a6a64066-15c5-4651-a1b0-bba52e21c3e7",
                "destination_uuid": "82d18de6-05e8-4095-b34b-53907de2ed62"
              }
            ]
          },
          {
            "uuid": "82d18de6-05e8-4095-b34b-53907de2ed62",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e0f7e864-3096-49ad-a825-ec7e096774a6"
              }
            ],
            "exits": [
              {
                "uuid": "6375cdb1-53c4-4b0a-8ff2-8bb69771718a",
                "destination_uuid": "f5a97894-b0f7-42d6-a689-8296fe9efb34"
              }
            ]
          },
          {
            "uuid": "f5a97894-b0f7-42d6-a689-8296fe9efb34",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2fca26c7-41b9-484c-a725-58b8cee5f355"
              }
            ],
            "exits": [
              {
                "uuid": "8edee174-0f00-4ff4-aba9-4fe679fc02f6",
                "destination_uuid": "12e60b63-115d-44ea-a44c-cfa97fab1f39"
              }
            ]
          },
          {
            "uuid": "12e60b63-115d-44ea-a44c-cfa97fab1f39",
            "actions": [
              {
                "flow": {
                  "name": "calm5",
                  "uuid": "d79c0d35-d457-4bdd-ad04-c0b25b7c90da"
                },
                "type": "enter_flow",
                "uuid": "37837f4c-eb97-4c89-81ad-ebc2396a275a"
              }
            ],
            "exits": [
              {
                "uuid": "902266cf-6956-4bba-ba18-2892d1e85794",
                "destination_uuid": null
              },
              {
                "uuid": "11031f56-ae03-4013-a5c9-8902503a987d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "935371ac-1c00-4969-9ff3-0ea3dc38d550",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "42636da7-26cd-4569-9f4c-5f01897ee118"
                },
                {
                  "uuid": "1812f97d-e3ae-41db-b588-21ce37f31ece",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0cfc132f-8014-4c5c-8c3c-0ee84fe7bedb"
                }
              ],
              "categories": [
                {
                  "uuid": "42636da7-26cd-4569-9f4c-5f01897ee118",
                  "name": "Complete",
                  "exit_uuid": "902266cf-6956-4bba-ba18-2892d1e85794"
                },
                {
                  "uuid": "0cfc132f-8014-4c5c-8c3c-0ee84fe7bedb",
                  "name": "Expired",
                  "exit_uuid": "11031f56-ae03-4013-a5c9-8902503a987d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "42636da7-26cd-4569-9f4c-5f01897ee118"
            }
          },
          {
            "uuid": "3b8e869f-a3eb-44e7-9770-d114895a8be1",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cbf671ce-aa46-4973-857d-930b005b7970"
              }
            ],
            "exits": [
              {
                "uuid": "252e77fe-0f2e-4801-a7cd-fbc3cfd600d1",
                "destination_uuid": "ba6ef1f2-3f78-416c-801b-3118d7d5a682"
              }
            ]
          },
          {
            "uuid": "ba6ef1f2-3f78-416c-801b-3118d7d5a682",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "5227c3a5-98cc-4c8e-bb97-0d0d934e52f4"
              }
            ],
            "exits": [
              {
                "uuid": "eab0697c-0a89-4e49-959a-6b63b586ea31",
                "destination_uuid": "a102e488-2565-4ce5-91cc-75d27fe58ed8"
              }
            ]
          },
          {
            "uuid": "a102e488-2565-4ce5-91cc-75d27fe58ed8",
            "actions": [],
            "exits": [
              {
                "uuid": "21ebd4d4-3ae3-49fb-8045-47e22046ed40",
                "destination_uuid": "fde97684-cdee-4002-94d5-1088da21cf3f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "855f5f58-76a8-43cf-9d94-5d309e69f760",
              "cases": [],
              "categories": [
                {
                  "uuid": "855f5f58-76a8-43cf-9d94-5d309e69f760",
                  "name": "All Responses",
                  "exit_uuid": "21ebd4d4-3ae3-49fb-8045-47e22046ed40"
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
            "uuid": "fde97684-cdee-4002-94d5-1088da21cf3f",
            "actions": [
              {
                "uuid": "52454744-4c0f-4498-a68d-822836db983c",
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
                "uuid": "96ee5b59-8ba3-474f-a425-eccd2c3ec544",
                "destination_uuid": "a87b8238-0634-4628-b76e-4903b01533ee"
              }
            ]
          },
          {
            "uuid": "a87b8238-0634-4628-b76e-4903b01533ee",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8be1e864-e8ef-45ac-a3d4-4d17dedeb239"
              }
            ],
            "exits": [
              {
                "uuid": "01b047c4-7c66-402d-a813-6b5df3564e75",
                "destination_uuid": "86b35fe5-3f59-40c1-9465-240217ebbfb6"
              }
            ]
          },
          {
            "uuid": "86b35fe5-3f59-40c1-9465-240217ebbfb6",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fad56963-a91c-4320-ad57-6b661b1c08e3"
              }
            ],
            "exits": [
              {
                "uuid": "b82dd344-4f9c-4154-8e58-e8f1c825f095",
                "destination_uuid": "acd7ee66-7821-4f5a-ba32-20afc1d8752f"
              }
            ]
          },
          {
            "uuid": "acd7ee66-7821-4f5a-ba32-20afc1d8752f",
            "actions": [
              {
                "uuid": "d8b9e177-0e66-4538-abb1-e164038779fb",
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
                "uuid": "80d61ece-a044-4233-9fd3-5d37e337f090",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "2c24d6de-ece2-4cf9-839c-76d535b13029",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "b737e548-b8eb-4b38-a697-fda3d055749f",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bb2cacdc-a190-4f40-91d2-7a61824a69e1"
              }
            ],
            "exits": [
              {
                "uuid": "9ebbe6a2-4b54-44c3-8e96-29c90992fc75",
                "destination_uuid": "b9db8c28-8934-45b0-b079-72a3c9959ea7"
              }
            ]
          },
          {
            "uuid": "b9db8c28-8934-45b0-b079-72a3c9959ea7",
            "actions": [
              {
                "uuid": "ca689421-855c-4623-8df9-a0e6e5eb34da",
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
                "uuid": "0c03596c-e294-466d-978c-bfb17f3e994d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e7e7e9d6-3230-4d40-a1a5-15b31b4ecb03",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "189c8f14-bc2a-4a09-9029-38471f7a0629",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "724d98c2-c006-4b69-96c3-ee858b372f03"
              }
            ],
            "exits": [
              {
                "uuid": "32f3fa9e-f35a-42d3-b20d-de2405e46e95",
                "destination_uuid": "247a99f7-480e-4f20-8255-444534aa584c"
              }
            ]
          },
          {
            "uuid": "247a99f7-480e-4f20-8255-444534aa584c",
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
                "uuid": "03c44b2b-18e1-4fe4-ae30-dc6aaf8702da"
              }
            ],
            "exits": [
              {
                "uuid": "d44c8c85-9924-4eec-b99c-74baa9566290",
                "destination_uuid": "8f5b3e0f-c62d-4dc7-b94d-e4720ad38c3d"
              }
            ]
          },
          {
            "uuid": "8f5b3e0f-c62d-4dc7-b94d-e4720ad38c3d",
            "actions": [],
            "exits": [
              {
                "uuid": "ad7bb75f-4339-4d20-8c7d-7e97e6c930d5",
                "destination_uuid": "9b7bacc5-49b0-48d0-b989-0da21066dd38"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "1150e8b3-f90a-45bb-b20e-e947f72f7285",
              "cases": [],
              "categories": [
                {
                  "uuid": "1150e8b3-f90a-45bb-b20e-e947f72f7285",
                  "name": "All Responses",
                  "exit_uuid": "ad7bb75f-4339-4d20-8c7d-7e97e6c930d5"
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
            "uuid": "9b7bacc5-49b0-48d0-b989-0da21066dd38",
            "actions": [
              {
                "uuid": "767c8b84-888e-44e8-b5c1-183a967fb45f",
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
                "uuid": "9b1560b1-31f4-4398-9ec9-c877c6188836",
                "destination_uuid": "fd0becbf-6cfe-4120-8429-f3c732423b81"
              }
            ]
          },
          {
            "uuid": "fd0becbf-6cfe-4120-8429-f3c732423b81",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f46c67ee-790e-4869-81a5-f8f013585981",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "0708e405-0e74-4797-ae62-8dc057f27ad1",
                  "type": "has_only_phrase",
                  "uuid": "c2ac4b0b-bf6c-4864-bdfe-6d1bb82b9638"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "0708e405-0e74-4797-ae62-8dc057f27ad1",
                  "type": "has_only_phrase",
                  "uuid": "d1c85bfa-7cb2-431c-a533-9cfaea3c1f6b"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "0708e405-0e74-4797-ae62-8dc057f27ad1",
                  "type": "has_only_phrase",
                  "uuid": "5f2487ea-a034-4756-9464-534ae12117e4"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "0708e405-0e74-4797-ae62-8dc057f27ad1",
                  "type": "has_only_phrase",
                  "uuid": "bf13ce2c-75c5-45d6-95b2-a0a7f1245309"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "f2fba500-c454-4d88-b31a-b1c6cda8711c",
                  "type": "has_only_phrase",
                  "uuid": "5bf7c732-f0e3-4ebb-ade0-7df4454b80c9"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "f2fba500-c454-4d88-b31a-b1c6cda8711c",
                  "type": "has_only_phrase",
                  "uuid": "ecda47a1-f47f-460a-baf3-13ee346325ae"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "f2fba500-c454-4d88-b31a-b1c6cda8711c",
                  "type": "has_only_phrase",
                  "uuid": "906cca1d-e88e-4ec2-8b11-959e0667b9e1"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "f2fba500-c454-4d88-b31a-b1c6cda8711c",
                  "type": "has_only_phrase",
                  "uuid": "058579f3-2b2b-4764-9b0f-be71d61451b2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cb8be328-10ef-41f2-a6a6-0a495b20de67",
                  "name": "All Responses",
                  "uuid": "f46c67ee-790e-4869-81a5-f8f013585981"
                },
                {
                  "exit_uuid": "0ce17c18-a79f-4733-8618-04ff5ef5a3b7",
                  "name": "0;1;2;3",
                  "uuid": "0708e405-0e74-4797-ae62-8dc057f27ad1"
                },
                {
                  "exit_uuid": "6a47510f-21cb-4d39-9105-be97a50774d8",
                  "name": "4;5;6;7",
                  "uuid": "f2fba500-c454-4d88-b31a-b1c6cda8711c"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "cb8be328-10ef-41f2-a6a6-0a495b20de67",
                "destination_uuid": null
              },
              {
                "uuid": "0ce17c18-a79f-4733-8618-04ff5ef5a3b7",
                "destination_uuid": "7433777a-eaff-43bb-a8b3-2cad2e99cd8e"
              },
              {
                "uuid": "6a47510f-21cb-4d39-9105-be97a50774d8",
                "destination_uuid": "447bbf07-e086-462d-82dc-d41387aecddb"
              }
            ]
          },
          {
            "uuid": "7433777a-eaff-43bb-a8b3-2cad2e99cd8e",
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
                "uuid": "305f6d13-33f8-4d2d-bfae-6a87c9107f9f"
              }
            ],
            "exits": [
              {
                "uuid": "10593abc-7135-47db-87ee-bcd63da81d54",
                "destination_uuid": "0e03ce70-99ea-4289-9b6b-08a85107a1b9"
              }
            ]
          },
          {
            "uuid": "447bbf07-e086-462d-82dc-d41387aecddb",
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
                "uuid": "0671404f-41b1-47a6-b065-9dcb4430f3d8"
              }
            ],
            "exits": [
              {
                "uuid": "3704a189-2e4d-4023-8bf4-c288e58a7937",
                "destination_uuid": "0e03ce70-99ea-4289-9b6b-08a85107a1b9"
              }
            ]
          },
          {
            "uuid": "0e03ce70-99ea-4289-9b6b-08a85107a1b9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9bb867ca-98a8-4440-9ffd-ebe6427eb35d",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "ebde8ce5-cd52-4ba7-b5fa-d3acd01db442",
                  "type": "has_only_phrase",
                  "uuid": "0f31a08f-4197-4dd0-bd05-b125c5686a2b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6ca6c1a1-ec53-4704-aff6-eb2ef85ebf93",
                  "name": "All Responses",
                  "uuid": "9bb867ca-98a8-4440-9ffd-ebe6427eb35d"
                },
                {
                  "exit_uuid": "ed31cca3-a0cc-4bda-ab24-e4a461f150ba",
                  "name": "Next",
                  "uuid": "ebde8ce5-cd52-4ba7-b5fa-d3acd01db442"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6ca6c1a1-ec53-4704-aff6-eb2ef85ebf93",
                "destination_uuid": null
              },
              {
                "uuid": "ed31cca3-a0cc-4bda-ab24-e4a461f150ba",
                "destination_uuid": "9cd34141-6db0-40f6-9dce-1b89fc882faa"
              }
            ]
          },
          {
            "uuid": "9cd34141-6db0-40f6-9dce-1b89fc882faa",
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
                "uuid": "3c9214cf-20ac-4f0d-97cf-0a2be5ded37c"
              }
            ],
            "exits": [
              {
                "uuid": "18ff759f-dc06-484d-9c0c-8d7cf8fe48dd",
                "destination_uuid": "e2ca19da-46f2-4468-8290-fb95de34b23a"
              }
            ]
          },
          {
            "uuid": "e2ca19da-46f2-4468-8290-fb95de34b23a",
            "actions": [],
            "exits": [
              {
                "uuid": "bafd790f-21d8-471f-8352-4fe15a2d517d",
                "destination_uuid": "324fa404-9f55-49fb-915c-c0de30a0774e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "898ace0b-f8c1-44bf-a61c-2b39eb4c4eed",
              "cases": [],
              "categories": [
                {
                  "uuid": "898ace0b-f8c1-44bf-a61c-2b39eb4c4eed",
                  "name": "All Responses",
                  "exit_uuid": "bafd790f-21d8-471f-8352-4fe15a2d517d"
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
            "uuid": "324fa404-9f55-49fb-915c-c0de30a0774e",
            "actions": [
              {
                "uuid": "21e1069b-3f17-415a-a04d-282c763b0f1b",
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
                "uuid": "8bc360c2-4e83-4a28-a0ef-4be855fe15fd",
                "destination_uuid": "b2ff0709-504d-420b-a9b4-0d1b66280f4b"
              }
            ]
          },
          {
            "uuid": "b2ff0709-504d-420b-a9b4-0d1b66280f4b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b02aec2d-db56-4b6f-978a-a68fa9b88012",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "28911d33-deb8-4fc8-b709-9f49e8bae9e4",
                  "type": "has_only_phrase",
                  "uuid": "5af0556a-4583-4c16-b5fb-505ec5fd4d53"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "28911d33-deb8-4fc8-b709-9f49e8bae9e4",
                  "type": "has_only_phrase",
                  "uuid": "7fa8ff71-be35-4729-8393-8e3454151a0c"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "28911d33-deb8-4fc8-b709-9f49e8bae9e4",
                  "type": "has_only_phrase",
                  "uuid": "629dd468-f4ca-444a-8803-965d90f19e4c"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "28911d33-deb8-4fc8-b709-9f49e8bae9e4",
                  "type": "has_only_phrase",
                  "uuid": "cc73697c-77f7-40ce-b046-b6afd5fa8941"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "28911d33-deb8-4fc8-b709-9f49e8bae9e4",
                  "type": "has_only_phrase",
                  "uuid": "6837cd21-1d82-4817-8d84-e0e1eb6ede66"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "439a9196-250f-422c-963f-cf0062f8cd3f",
                  "type": "has_only_phrase",
                  "uuid": "32aa701b-8f60-4f4b-8ade-4ff3e12988b6"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "439a9196-250f-422c-963f-cf0062f8cd3f",
                  "type": "has_only_phrase",
                  "uuid": "003a89cf-1307-4e12-8214-e966eef58819"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "439a9196-250f-422c-963f-cf0062f8cd3f",
                  "type": "has_only_phrase",
                  "uuid": "31fcf6d5-14e8-466a-b0c0-f0f62263ff53"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "439a9196-250f-422c-963f-cf0062f8cd3f",
                  "type": "has_only_phrase",
                  "uuid": "42ec3963-7e1c-4e88-a876-6da829d9084b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4ca41bc6-1b51-4a21-88e5-978a270b2f75",
                  "name": "All Responses",
                  "uuid": "b02aec2d-db56-4b6f-978a-a68fa9b88012"
                },
                {
                  "exit_uuid": "764f88f4-ed15-47c4-9209-0c942b58dbde",
                  "name": "0;1;2;3;4",
                  "uuid": "28911d33-deb8-4fc8-b709-9f49e8bae9e4"
                },
                {
                  "exit_uuid": "e28cdf1a-5ef8-42fd-80ef-e36870c043e6",
                  "name": "5;6;7;8",
                  "uuid": "439a9196-250f-422c-963f-cf0062f8cd3f"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "4ca41bc6-1b51-4a21-88e5-978a270b2f75",
                "destination_uuid": null
              },
              {
                "uuid": "764f88f4-ed15-47c4-9209-0c942b58dbde",
                "destination_uuid": "83604418-eab8-4e57-be28-e6bdd7863c05"
              },
              {
                "uuid": "e28cdf1a-5ef8-42fd-80ef-e36870c043e6",
                "destination_uuid": "37ee54ce-932d-401c-9169-207d2edcba71"
              }
            ]
          },
          {
            "uuid": "83604418-eab8-4e57-be28-e6bdd7863c05",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "a97d2c00-0e7c-4d7a-b371-99981c37ae73"
              }
            ],
            "exits": [
              {
                "uuid": "3997eecb-2d22-47d2-a26c-c320e0307eaa",
                "destination_uuid": "bed8d1ff-e375-4fc1-abd8-a9850a065e2a"
              }
            ]
          },
          {
            "uuid": "37ee54ce-932d-401c-9169-207d2edcba71",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6c1b490c-1494-489f-8d76-98de26bd1b62"
              }
            ],
            "exits": [
              {
                "uuid": "3c89a9f6-fd2c-479e-8b41-4c98a9333918",
                "destination_uuid": "bed8d1ff-e375-4fc1-abd8-a9850a065e2a"
              }
            ]
          },
          {
            "uuid": "bed8d1ff-e375-4fc1-abd8-a9850a065e2a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "41887c13-dd44-4d66-a08d-d07843953020",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "0f09f62f-a8a4-40fe-ac7a-128bc216262a",
                  "type": "has_only_phrase",
                  "uuid": "c11be93a-3827-4005-81c3-d741f9dba2bb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "caf3c831-adc1-435a-8caa-46f32b09384c",
                  "name": "All Responses",
                  "uuid": "41887c13-dd44-4d66-a08d-d07843953020"
                },
                {
                  "exit_uuid": "1c50c7ec-68a5-4e0b-aab5-5e902894785f",
                  "name": "Next",
                  "uuid": "0f09f62f-a8a4-40fe-ac7a-128bc216262a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "caf3c831-adc1-435a-8caa-46f32b09384c",
                "destination_uuid": null
              },
              {
                "uuid": "1c50c7ec-68a5-4e0b-aab5-5e902894785f",
                "destination_uuid": "39dd57f9-003b-4ad3-8e02-8713bde2fba0"
              }
            ]
          },
          {
            "uuid": "39dd57f9-003b-4ad3-8e02-8713bde2fba0",
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
                "uuid": "64aec3d5-4cb1-4fa2-a662-df1a87b8f511"
              }
            ],
            "exits": [
              {
                "uuid": "2c332131-b317-4a3d-9637-1f75b94c41e9",
                "destination_uuid": "fd104fe5-5123-490c-8f26-eb8b0912d250"
              }
            ]
          },
          {
            "uuid": "fd104fe5-5123-490c-8f26-eb8b0912d250",
            "actions": [],
            "exits": [
              {
                "uuid": "ef325de6-c5ce-4b67-a878-1e81a03b063a",
                "destination_uuid": "2c4316f0-8d83-4cdf-af5c-d2a58401c74c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0ae00e84-5a2a-4849-aeeb-5339085f235f",
              "cases": [],
              "categories": [
                {
                  "uuid": "0ae00e84-5a2a-4849-aeeb-5339085f235f",
                  "name": "All Responses",
                  "exit_uuid": "ef325de6-c5ce-4b67-a878-1e81a03b063a"
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
            "uuid": "2c4316f0-8d83-4cdf-af5c-d2a58401c74c",
            "actions": [
              {
                "uuid": "c86e1a5a-fc04-42eb-9c3a-f61cee93329f",
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
                "uuid": "273c0946-1a09-4a53-858b-eed39ca75a20",
                "destination_uuid": "f4ba0292-ab34-4919-ba10-1d04033d8c2d"
              }
            ]
          },
          {
            "uuid": "f4ba0292-ab34-4919-ba10-1d04033d8c2d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9a38590c-495c-42e1-963c-6ac92d1e7f17",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "ef8e72ac-6136-44f7-aad8-ebd63bc7a512",
                  "type": "has_only_phrase",
                  "uuid": "dc0b43b2-96ed-45d9-8be4-89f9a36b89ca"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "ef8e72ac-6136-44f7-aad8-ebd63bc7a512",
                  "type": "has_only_phrase",
                  "uuid": "59cd8a1c-6be3-49d8-938e-3502a823e3ef"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "ef8e72ac-6136-44f7-aad8-ebd63bc7a512",
                  "type": "has_only_phrase",
                  "uuid": "4bd7e5f8-7bfd-4821-870b-4547c132b555"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "1d112268-1192-402f-97db-8052b24cc8f9",
                  "type": "has_only_phrase",
                  "uuid": "cda446fe-8096-411c-91a3-53d5be9bd8c8"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "1d112268-1192-402f-97db-8052b24cc8f9",
                  "type": "has_only_phrase",
                  "uuid": "eb1bdfc1-e401-4da9-9003-a3069b23eabe"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "1d112268-1192-402f-97db-8052b24cc8f9",
                  "type": "has_only_phrase",
                  "uuid": "7cf2978b-5f90-4b83-bff3-43303cefd4fe"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "1d112268-1192-402f-97db-8052b24cc8f9",
                  "type": "has_only_phrase",
                  "uuid": "284dde66-558b-486f-87c7-acb897288edb"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "1d112268-1192-402f-97db-8052b24cc8f9",
                  "type": "has_only_phrase",
                  "uuid": "9cc5a14d-0fae-46af-8147-71063c8db7a6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3ddcecce-9867-4fe5-b7f2-0174246e22e8",
                  "name": "All Responses",
                  "uuid": "9a38590c-495c-42e1-963c-6ac92d1e7f17"
                },
                {
                  "exit_uuid": "7bf92456-0c46-4676-8680-d1b16dda8c0a",
                  "name": "0;1;2",
                  "uuid": "ef8e72ac-6136-44f7-aad8-ebd63bc7a512"
                },
                {
                  "exit_uuid": "3cf213ef-2af9-4af1-9535-037bc437431d",
                  "name": "3;4;5;6;7",
                  "uuid": "1d112268-1192-402f-97db-8052b24cc8f9"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "3ddcecce-9867-4fe5-b7f2-0174246e22e8",
                "destination_uuid": null
              },
              {
                "uuid": "7bf92456-0c46-4676-8680-d1b16dda8c0a",
                "destination_uuid": "723b3243-be96-40be-b5eb-9314e5fc0cf0"
              },
              {
                "uuid": "3cf213ef-2af9-4af1-9535-037bc437431d",
                "destination_uuid": "e75b3e4a-84d0-4c53-baa1-5fe6467d4f0e"
              }
            ]
          },
          {
            "uuid": "723b3243-be96-40be-b5eb-9314e5fc0cf0",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "65afacd3-95d0-4780-9b17-711f0807ec50"
              }
            ],
            "exits": [
              {
                "uuid": "b2819c9d-2ed8-4904-8eb6-f62e374b6c2e",
                "destination_uuid": "07f87aec-fa4f-4cb3-80dc-599ffaad90c6"
              }
            ]
          },
          {
            "uuid": "e75b3e4a-84d0-4c53-baa1-5fe6467d4f0e",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "162cbc7a-7380-4164-8621-020c078fd988"
              }
            ],
            "exits": [
              {
                "uuid": "7342fee8-eab8-4b63-aab9-b9dab3f7bb9e",
                "destination_uuid": "07f87aec-fa4f-4cb3-80dc-599ffaad90c6"
              }
            ]
          },
          {
            "uuid": "07f87aec-fa4f-4cb3-80dc-599ffaad90c6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2444c7a1-3750-495a-80ce-3d6e8be81f85",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "eedeb860-c34b-4443-9b3f-ce0b4fd9027c",
                  "type": "has_only_phrase",
                  "uuid": "5c9e8134-aac5-4be7-b9d6-7349419e7e3c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "01f11c33-b93f-42fe-9928-c1a19cba51d9",
                  "name": "All Responses",
                  "uuid": "2444c7a1-3750-495a-80ce-3d6e8be81f85"
                },
                {
                  "exit_uuid": "6375ee21-d0cd-4d92-8442-956619dea459",
                  "name": "Next",
                  "uuid": "eedeb860-c34b-4443-9b3f-ce0b4fd9027c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "01f11c33-b93f-42fe-9928-c1a19cba51d9",
                "destination_uuid": null
              },
              {
                "uuid": "6375ee21-d0cd-4d92-8442-956619dea459",
                "destination_uuid": "bbdca650-8290-4982-bcbb-4d6da08672c3"
              }
            ]
          },
          {
            "uuid": "bbdca650-8290-4982-bcbb-4d6da08672c3",
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
                "uuid": "f000875d-8261-4800-ac31-d837f36ccd78"
              }
            ],
            "exits": [
              {
                "uuid": "aba3509b-f483-4959-a8c9-2696803bff44",
                "destination_uuid": "6307d39b-a65a-4931-9a01-ad54b36939ea"
              }
            ]
          },
          {
            "uuid": "6307d39b-a65a-4931-9a01-ad54b36939ea",
            "actions": [],
            "exits": [
              {
                "uuid": "2c1f47c0-fdcd-4366-97a0-b38e3cffef92",
                "destination_uuid": "8511a1f7-06ae-4284-aed0-e659f1677d22"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "734200c5-0be9-44f9-9b68-d14e04261352",
              "cases": [],
              "categories": [
                {
                  "uuid": "734200c5-0be9-44f9-9b68-d14e04261352",
                  "name": "All Responses",
                  "exit_uuid": "2c1f47c0-fdcd-4366-97a0-b38e3cffef92"
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
            "uuid": "8511a1f7-06ae-4284-aed0-e659f1677d22",
            "actions": [
              {
                "uuid": "5d3936ab-f325-4c8f-bdad-84280b7af4b7",
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
                "uuid": "35d4676c-7c55-4e55-9ef5-20a5633f3b83",
                "destination_uuid": "69c975a5-eb5e-4380-9589-d8ea5461d9d4"
              }
            ]
          },
          {
            "uuid": "69c975a5-eb5e-4380-9589-d8ea5461d9d4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "117bc77a-f049-4023-9c50-76bac78d1e2a",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "6d18e32c-fba7-4e95-9106-0d947244382b",
                  "type": "has_only_phrase",
                  "uuid": "0f6ba176-ea50-43c2-b6c7-679317657548"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "6d18e32c-fba7-4e95-9106-0d947244382b",
                  "type": "has_only_phrase",
                  "uuid": "502bd52e-0a2b-4ebc-991b-53b18431644d"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "c6d0ff45-f903-4ac1-883c-2ac5af3d3397",
                  "type": "has_only_phrase",
                  "uuid": "53a41ed4-e5ee-4227-91f6-b3fd4f56fce5"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "c6d0ff45-f903-4ac1-883c-2ac5af3d3397",
                  "type": "has_only_phrase",
                  "uuid": "93b13ba6-3a5e-434a-ba4b-d1e364a7cc89"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "c6d0ff45-f903-4ac1-883c-2ac5af3d3397",
                  "type": "has_only_phrase",
                  "uuid": "fd74e0a2-36a5-4503-9e86-940d0a62ab21"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "c6d0ff45-f903-4ac1-883c-2ac5af3d3397",
                  "type": "has_only_phrase",
                  "uuid": "e760b988-76b3-491c-9825-db782eccfc7c"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "c6d0ff45-f903-4ac1-883c-2ac5af3d3397",
                  "type": "has_only_phrase",
                  "uuid": "1bfc1194-607b-42a1-b9b1-79260a905084"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "c6d0ff45-f903-4ac1-883c-2ac5af3d3397",
                  "type": "has_only_phrase",
                  "uuid": "06391d93-c045-4f65-a9de-7182b8e28e4e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "75a0bc9e-6553-4f59-8771-1ca83fd99f50",
                  "name": "All Responses",
                  "uuid": "117bc77a-f049-4023-9c50-76bac78d1e2a"
                },
                {
                  "exit_uuid": "9b352296-f58a-4b0d-8a36-f121bdd6d35b",
                  "name": "0;1",
                  "uuid": "6d18e32c-fba7-4e95-9106-0d947244382b"
                },
                {
                  "exit_uuid": "d52da7ba-59c7-475a-9bf3-a2d00a5829f4",
                  "name": "2;3;4;5;6;7",
                  "uuid": "c6d0ff45-f903-4ac1-883c-2ac5af3d3397"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "75a0bc9e-6553-4f59-8771-1ca83fd99f50",
                "destination_uuid": null
              },
              {
                "uuid": "9b352296-f58a-4b0d-8a36-f121bdd6d35b",
                "destination_uuid": "fbd1d886-4974-413f-a0ac-6dd7679fce95"
              },
              {
                "uuid": "d52da7ba-59c7-475a-9bf3-a2d00a5829f4",
                "destination_uuid": "57d09c2f-d446-4aa5-9aa5-03490816dfbd"
              }
            ]
          },
          {
            "uuid": "fbd1d886-4974-413f-a0ac-6dd7679fce95",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "f6878a3d-5fcc-4180-b77e-479aab85a07a"
              }
            ],
            "exits": [
              {
                "uuid": "65739d54-5a1e-4980-803f-25f2aa4f90c0",
                "destination_uuid": "e440b351-f195-44f3-8795-5651e543a0c9"
              }
            ]
          },
          {
            "uuid": "57d09c2f-d446-4aa5-9aa5-03490816dfbd",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "5e445cb9-e3e3-4923-afd1-4a86584d858c"
              }
            ],
            "exits": [
              {
                "uuid": "88cf62ec-17c0-4dd6-9c94-860703526a8c",
                "destination_uuid": "e440b351-f195-44f3-8795-5651e543a0c9"
              }
            ]
          },
          {
            "uuid": "e440b351-f195-44f3-8795-5651e543a0c9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5f018f80-dd82-4a36-b8e6-9f57b697812d",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "2cb11edd-d05d-44f0-8a9d-7345b8f564b7",
                  "type": "has_only_phrase",
                  "uuid": "b214b436-0504-43ca-ba53-0a4dcc77e77f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "71eb54c6-7893-4a3b-bc2b-c6c10d426fef",
                  "name": "All Responses",
                  "uuid": "5f018f80-dd82-4a36-b8e6-9f57b697812d"
                },
                {
                  "exit_uuid": "317bc2df-9ac0-49d8-86cf-e245d1277878",
                  "name": "Next",
                  "uuid": "2cb11edd-d05d-44f0-8a9d-7345b8f564b7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "71eb54c6-7893-4a3b-bc2b-c6c10d426fef",
                "destination_uuid": null
              },
              {
                "uuid": "317bc2df-9ac0-49d8-86cf-e245d1277878",
                "destination_uuid": "2603aaea-ca15-48a8-a42d-88404e172e3c"
              }
            ]
          },
          {
            "uuid": "2603aaea-ca15-48a8-a42d-88404e172e3c",
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
                "uuid": "26d9e6c2-097e-46fc-bc1e-ee21fa189008"
              }
            ],
            "exits": [
              {
                "uuid": "9c51cc81-b98d-4296-b865-e6121d55bdfe",
                "destination_uuid": "00a73a1f-d6f3-4dae-b4dc-1281384ad9fd"
              }
            ]
          },
          {
            "uuid": "00a73a1f-d6f3-4dae-b4dc-1281384ad9fd",
            "actions": [],
            "exits": [
              {
                "uuid": "7c46c3b9-df80-48fb-82bc-273cb1198d53",
                "destination_uuid": "2d687a8d-048c-4151-8455-686f43ea884a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "82953ee3-ccef-4389-bc5e-358c02254e49",
              "cases": [],
              "categories": [
                {
                  "uuid": "82953ee3-ccef-4389-bc5e-358c02254e49",
                  "name": "All Responses",
                  "exit_uuid": "7c46c3b9-df80-48fb-82bc-273cb1198d53"
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
            "uuid": "2d687a8d-048c-4151-8455-686f43ea884a",
            "actions": [
              {
                "uuid": "9462eb76-7c3b-4da5-94e8-2b1de84a7a7e",
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
                "uuid": "42ec07ed-26c1-4c0a-ad98-46ebf8f3922f",
                "destination_uuid": "a4ae7184-7f42-4f26-8a40-f1cc8f4ac94a"
              }
            ]
          },
          {
            "uuid": "cf0f728c-d788-41e4-b30f-764a593e2a3a",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "0385e1c0-0277-4f00-951b-1db39d5a252f"
              }
            ],
            "exits": [
              {
                "uuid": "1911e988-f535-4985-89c7-183b8551911d",
                "destination_uuid": "254714b5-6b30-4d6d-84a2-1645853bc98e"
              }
            ]
          },
          {
            "uuid": "a4ae7184-7f42-4f26-8a40-f1cc8f4ac94a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0facc788-48dd-49dd-8499-9c7c036bf274",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "5d32d1ca-53a2-4eb7-8e4e-3d775c83ace9",
                  "type": "has_only_phrase",
                  "uuid": "4d21ca64-9413-4d3d-80af-429b9bf7179b"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "5d32d1ca-53a2-4eb7-8e4e-3d775c83ace9",
                  "type": "has_only_phrase",
                  "uuid": "344d11c6-7638-47c4-94a6-31ee6bfad997"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "5d32d1ca-53a2-4eb7-8e4e-3d775c83ace9",
                  "type": "has_only_phrase",
                  "uuid": "ae4afe1e-880f-4e42-a6c8-47bdc560c212"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "5d32d1ca-53a2-4eb7-8e4e-3d775c83ace9",
                  "type": "has_only_phrase",
                  "uuid": "59ff6db0-ba80-406e-93f5-0bcc18e3b4ac"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "5d32d1ca-53a2-4eb7-8e4e-3d775c83ace9",
                  "type": "has_only_phrase",
                  "uuid": "a0d5ee72-ce40-498c-9795-4165a999af53"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "5d32d1ca-53a2-4eb7-8e4e-3d775c83ace9",
                  "type": "has_only_phrase",
                  "uuid": "d1c39de4-c160-490d-b8f0-ec331770abca"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "5d32d1ca-53a2-4eb7-8e4e-3d775c83ace9",
                  "type": "has_only_phrase",
                  "uuid": "f4a188dc-5ef5-46a9-9c10-360c278e0593"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4beb8989-8d94-4415-a07a-90e551806677",
                  "name": "All Responses",
                  "uuid": "0facc788-48dd-49dd-8499-9c7c036bf274"
                },
                {
                  "exit_uuid": "20b36d36-bada-4999-a3ee-d194c40d6b73",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "5d32d1ca-53a2-4eb7-8e4e-3d775c83ace9"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "4beb8989-8d94-4415-a07a-90e551806677",
                "destination_uuid": "cf0f728c-d788-41e4-b30f-764a593e2a3a"
              },
              {
                "uuid": "20b36d36-bada-4999-a3ee-d194c40d6b73",
                "destination_uuid": "c18636bb-f63e-400a-b322-e5a5118998ea"
              }
            ]
          },
          {
            "uuid": "c18636bb-f63e-400a-b322-e5a5118998ea",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "496a879d-18bf-479f-94c7-06ae5be2dd38"
              }
            ],
            "exits": [
              {
                "uuid": "7ffd0f0c-16ef-4508-bf91-8996225134b5",
                "destination_uuid": "254714b5-6b30-4d6d-84a2-1645853bc98e"
              }
            ]
          },
          {
            "uuid": "254714b5-6b30-4d6d-84a2-1645853bc98e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7df7ec29-0ddf-47a1-9e1c-da10cb8789aa",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "14974bfb-8efc-49c6-988c-280a49f98eae",
                  "type": "has_only_phrase",
                  "uuid": "41d2069c-847a-48a1-9336-9d43c2609acf"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7b51edcd-559a-47f0-bb55-f67ad0b85c8e",
                  "name": "All Responses",
                  "uuid": "7df7ec29-0ddf-47a1-9e1c-da10cb8789aa"
                },
                {
                  "exit_uuid": "58ff5914-bf63-49ad-be5d-5482d6d78b1f",
                  "name": "Next",
                  "uuid": "14974bfb-8efc-49c6-988c-280a49f98eae"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7b51edcd-559a-47f0-bb55-f67ad0b85c8e",
                "destination_uuid": null
              },
              {
                "uuid": "58ff5914-bf63-49ad-be5d-5482d6d78b1f",
                "destination_uuid": "e0d86a50-599c-41e0-ae77-3ac2f2bcab9a"
              }
            ]
          },
          {
            "uuid": "e0d86a50-599c-41e0-ae77-3ac2f2bcab9a",
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
                "uuid": "51be51d2-eaeb-462f-9b7f-35b27a461920"
              }
            ],
            "exits": [
              {
                "uuid": "96d9e096-8940-473b-9591-a42a72a17248",
                "destination_uuid": "2494ece4-70f7-4861-801b-2b4a30fc25de"
              }
            ]
          },
          {
            "uuid": "2494ece4-70f7-4861-801b-2b4a30fc25de",
            "actions": [],
            "exits": [
              {
                "uuid": "1afbab31-815c-43d5-a274-0c9ea2099745",
                "destination_uuid": "1fa0f615-e1ab-445b-a388-138236e87037"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "08d5829a-66f3-4c8e-8715-25671c2dd4aa",
              "cases": [],
              "categories": [
                {
                  "uuid": "08d5829a-66f3-4c8e-8715-25671c2dd4aa",
                  "name": "All Responses",
                  "exit_uuid": "1afbab31-815c-43d5-a274-0c9ea2099745"
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
            "uuid": "1fa0f615-e1ab-445b-a388-138236e87037",
            "actions": [
              {
                "uuid": "8fb72652-0313-4ee7-ace7-0c20c11dabe4",
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
                "uuid": "bf5227b4-5fba-48f9-840b-a4b3fd24ebd0",
                "destination_uuid": "9d3d54ea-4a2f-4647-8a42-1da96f40cc88"
              }
            ]
          },
          {
            "uuid": "9d3d54ea-4a2f-4647-8a42-1da96f40cc88",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5de86c27-5d07-4bd8-9a80-bcc6d5082269",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "60e4d54d-a076-4d99-9cda-6d69d91825a6",
                  "type": "has_only_phrase",
                  "uuid": "bd564d66-99dc-4920-bd7e-1df7b234e0ed"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "60e4d54d-a076-4d99-9cda-6d69d91825a6",
                  "type": "has_only_phrase",
                  "uuid": "f75756a9-e20b-4646-bbf9-0c321da24814"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "60e4d54d-a076-4d99-9cda-6d69d91825a6",
                  "type": "has_only_phrase",
                  "uuid": "2ef8ae59-1365-44ac-988f-cd98181d2594"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "60e4d54d-a076-4d99-9cda-6d69d91825a6",
                  "type": "has_only_phrase",
                  "uuid": "1d432e97-cf59-4504-916e-81dc5a1431db"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "60e4d54d-a076-4d99-9cda-6d69d91825a6",
                  "type": "has_only_phrase",
                  "uuid": "4ff45e9e-344e-40ec-9396-f378e18a98e0"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "4f4f4867-7303-41e8-a5e8-930bae523e85",
                  "type": "has_only_phrase",
                  "uuid": "f3a5991d-48a2-43f9-9d95-37d8aa7dc3b4"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "4f4f4867-7303-41e8-a5e8-930bae523e85",
                  "type": "has_only_phrase",
                  "uuid": "81d241ba-9465-4be4-b91d-d3ac83560a22"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "4f4f4867-7303-41e8-a5e8-930bae523e85",
                  "type": "has_only_phrase",
                  "uuid": "be5c8306-0805-4b6e-b453-98d2075e8005"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "4f4f4867-7303-41e8-a5e8-930bae523e85",
                  "type": "has_only_phrase",
                  "uuid": "859a0eab-9990-4e61-91d8-94e4d64c142a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4831492f-e6ca-46b3-8bad-0417ce834bab",
                  "name": "All Responses",
                  "uuid": "5de86c27-5d07-4bd8-9a80-bcc6d5082269"
                },
                {
                  "exit_uuid": "b285f62b-0fb9-4d18-8949-7680098f825c",
                  "name": "0;1;2;3;4",
                  "uuid": "60e4d54d-a076-4d99-9cda-6d69d91825a6"
                },
                {
                  "exit_uuid": "8a16ba34-b5fe-45fe-a0ad-484455721717",
                  "name": "5;6;7;8",
                  "uuid": "4f4f4867-7303-41e8-a5e8-930bae523e85"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "4831492f-e6ca-46b3-8bad-0417ce834bab",
                "destination_uuid": null
              },
              {
                "uuid": "b285f62b-0fb9-4d18-8949-7680098f825c",
                "destination_uuid": "876be94f-8f3e-42ba-af40-41b746a76cb7"
              },
              {
                "uuid": "8a16ba34-b5fe-45fe-a0ad-484455721717",
                "destination_uuid": "d52dd324-25ae-470f-a168-f0b912b33100"
              }
            ]
          },
          {
            "uuid": "876be94f-8f3e-42ba-af40-41b746a76cb7",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "1b506dfb-f225-4c2e-8335-8f74c5527a99"
              }
            ],
            "exits": [
              {
                "uuid": "17a40453-a89b-48a3-a7a9-89f5efa06660",
                "destination_uuid": "97b29a1a-70db-4a93-8efa-0aee9dd7a42a"
              }
            ]
          },
          {
            "uuid": "d52dd324-25ae-470f-a168-f0b912b33100",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "225256f6-2e4d-4d27-aa94-92697920992a"
              }
            ],
            "exits": [
              {
                "uuid": "c8d2699c-76d4-4b42-90dd-bc7042df0349",
                "destination_uuid": "97b29a1a-70db-4a93-8efa-0aee9dd7a42a"
              }
            ]
          },
          {
            "uuid": "97b29a1a-70db-4a93-8efa-0aee9dd7a42a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a2d61ede-4c39-4608-b1b9-bce6756a4da1",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "aecd1eae-9652-4e88-b082-c5c3ff38d6d6",
                  "type": "has_only_phrase",
                  "uuid": "f8217ff1-1059-4806-8227-56b991c8c94d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "68c1610d-d888-4b21-a316-d974c6e13ec9",
                  "name": "All Responses",
                  "uuid": "a2d61ede-4c39-4608-b1b9-bce6756a4da1"
                },
                {
                  "exit_uuid": "0b222b7d-3d27-4721-8ecb-df8229004885",
                  "name": "Next",
                  "uuid": "aecd1eae-9652-4e88-b082-c5c3ff38d6d6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "68c1610d-d888-4b21-a316-d974c6e13ec9",
                "destination_uuid": null
              },
              {
                "uuid": "0b222b7d-3d27-4721-8ecb-df8229004885",
                "destination_uuid": "4c136e7c-c2ae-47a9-b783-0619c0ce6c6e"
              }
            ]
          },
          {
            "uuid": "4c136e7c-c2ae-47a9-b783-0619c0ce6c6e",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "2b91f79e-96ad-4c6e-b3a3-a0549ef2a018"
              }
            ],
            "exits": [
              {
                "uuid": "78db50a1-a798-4263-8c9b-27799ebe55cb",
                "destination_uuid": "98bdc582-876e-4de3-b858-66121ed5cc0c"
              }
            ]
          },
          {
            "uuid": "98bdc582-876e-4de3-b858-66121ed5cc0c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1598d9ae-cb55-4809-90f8-c10ea783035d",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "8899133c-cfe2-44ee-b465-d2730fd6ec07",
                  "type": "has_only_phrase",
                  "uuid": "942c05db-13e1-4b3b-9ce4-640b1fe8be80"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e67abdee-f977-43d0-a852-ebb879ee800f",
                  "name": "All Responses",
                  "uuid": "1598d9ae-cb55-4809-90f8-c10ea783035d"
                },
                {
                  "exit_uuid": "023d6ba8-f3b8-4ef0-a4c3-62a4cf91f250",
                  "name": "Next",
                  "uuid": "8899133c-cfe2-44ee-b465-d2730fd6ec07"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e67abdee-f977-43d0-a852-ebb879ee800f",
                "destination_uuid": null
              },
              {
                "uuid": "023d6ba8-f3b8-4ef0-a4c3-62a4cf91f250",
                "destination_uuid": "58a3302e-9a1c-438c-891c-a083f21790e7"
              }
            ]
          },
          {
            "uuid": "58a3302e-9a1c-438c-891c-a083f21790e7",
            "actions": [
              {
                "uuid": "b33c71d2-900c-443a-b3e8-d4af1c0c4235",
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
                "uuid": "be232ab8-d590-4043-9cbc-78c3679547e0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "aa244215-edf7-47b2-88c3-283c6991ebe0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f625fb3e-8dec-4a4e-b2de-8461a0e242e2",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "5a6fc50d-ee9f-481e-ba52-1ecf7ae43958"
              }
            ],
            "exits": [
              {
                "uuid": "24ea9d69-9c7c-4087-883b-08cf74dcb898",
                "destination_uuid": "5d732209-4298-4610-8a1d-fea33308ca18"
              }
            ]
          },
          {
            "uuid": "5d732209-4298-4610-8a1d-fea33308ca18",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e4abb784-2713-408a-b59a-c182b6b91552",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "b0c274e6-338a-4553-82a9-9164d22badd3",
                  "type": "has_only_phrase",
                  "uuid": "2f092867-9e5b-40b9-a15c-ad226110d483"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dc579267-d8a1-4642-9c1b-1355209a9de0",
                  "name": "All Responses",
                  "uuid": "e4abb784-2713-408a-b59a-c182b6b91552"
                },
                {
                  "exit_uuid": "808d16d6-7a5e-40e1-a6d1-b16c85ef244b",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "b0c274e6-338a-4553-82a9-9164d22badd3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "dc579267-d8a1-4642-9c1b-1355209a9de0",
                "destination_uuid": null
              },
              {
                "uuid": "808d16d6-7a5e-40e1-a6d1-b16c85ef244b",
                "destination_uuid": "b7156c41-4e9a-40a7-b6a5-babf3720a744"
              }
            ]
          },
          {
            "uuid": "b7156c41-4e9a-40a7-b6a5-babf3720a744",
            "actions": [
              {
                "uuid": "31f703ba-3ec6-482a-9a2f-b2e3687a299b",
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
                "uuid": "c35de932-5435-41df-bfba-1a45ef29db0b",
                "destination_uuid": "a364c92a-e7cf-4dc5-b6d3-0fad72f36d37"
              }
            ]
          },
          {
            "uuid": "a364c92a-e7cf-4dc5-b6d3-0fad72f36d37",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "b9faada8-bc9d-498b-a113-97744f524262"
                },
                "type": "enter_flow",
                "uuid": "4cdcd78a-2615-4cc7-8efa-12d71d6c96a8"
              }
            ],
            "exits": [
              {
                "uuid": "61f0af91-c31a-480b-988d-5b09348c6920",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "2a5770a1-0436-4953-80fc-421ea3404c3d",
            "actions": [
              {
                "uuid": "8a7c9222-2d59-4347-ad56-603c3610d257",
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
                "uuid": "e8ce5696-9370-404a-b7b3-d288e3cc52db",
                "destination_uuid": "2ab1ce82-eb2d-41b1-ab78-2793bcc6d1b5"
              }
            ]
          },
          {
            "uuid": "2ab1ce82-eb2d-41b1-ab78-2793bcc6d1b5",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "e8897afc-b082-432a-8147-b163eb8475ff"
                },
                "type": "enter_flow",
                "uuid": "7b1c1373-2bde-4f85-8c89-94f3879ec619"
              }
            ],
            "exits": [
              {
                "uuid": "6c7e8693-1407-4701-977e-62d44f5190bb",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d1db9f06-95c3-444e-a47a-29e142cb7b86",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ea7189a1-f021-4abe-88a6-eabe244e1be0",
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
                "uuid": "7758a971-307e-49ad-ad77-c8e8355be6ec"
              }
            ],
            "exits": [
              {
                "uuid": "df484a1e-f730-4f5a-ba21-78ab48dd3cb2",
                "destination_uuid": "d1c6cac2-cfd3-424e-9259-d2b7d4e0a086"
              }
            ]
          },
          {
            "uuid": "d1c6cac2-cfd3-424e-9259-d2b7d4e0a086",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e4f62802-135e-40b5-a428-392d2bc31331",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "00ae2c63-5d89-4793-8737-3d850dede649",
                  "type": "has_only_phrase",
                  "uuid": "9c40ed16-77dd-4980-a0a1-5cfc234c87af"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "3d3b00f3-e478-4791-b5fe-0d2fa3b9233f",
                  "type": "has_only_phrase",
                  "uuid": "f1226b10-0f34-4a59-93d6-15780d66d319"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "3d3b00f3-e478-4791-b5fe-0d2fa3b9233f",
                  "type": "has_only_phrase",
                  "uuid": "39aea642-277e-47b5-a342-d48cc544a984"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "858e690b-254c-4f9d-829e-3e93a2cc869b",
                  "name": "All Responses",
                  "uuid": "e4f62802-135e-40b5-a428-392d2bc31331"
                },
                {
                  "exit_uuid": "629d450e-badb-4b6b-93b6-11ee5a36a856",
                  "name": "Happy",
                  "uuid": "00ae2c63-5d89-4793-8737-3d850dede649"
                },
                {
                  "exit_uuid": "c4a3040a-7d80-4878-b284-23b0afff6090",
                  "name": "Neutral; Sad",
                  "uuid": "3d3b00f3-e478-4791-b5fe-0d2fa3b9233f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "858e690b-254c-4f9d-829e-3e93a2cc869b",
                "destination_uuid": null
              },
              {
                "uuid": "629d450e-badb-4b6b-93b6-11ee5a36a856",
                "destination_uuid": "09d4e543-2739-42cb-9a01-7a6f580216b3"
              },
              {
                "uuid": "c4a3040a-7d80-4878-b284-23b0afff6090",
                "destination_uuid": "89d7c33d-c6ff-442f-ba7c-ec73bb16bbd7"
              }
            ]
          },
          {
            "uuid": "09d4e543-2739-42cb-9a01-7a6f580216b3",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "ef43acea-e882-437c-86c3-1eee6f9cba27"
              }
            ],
            "exits": [
              {
                "uuid": "8061dbf0-3700-4d84-843a-2aafe4815391",
                "destination_uuid": "a618a6fa-32ba-44e1-9ec4-57117952c429"
              }
            ]
          },
          {
            "uuid": "89d7c33d-c6ff-442f-ba7c-ec73bb16bbd7",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0e7dd25f-4107-4a75-87c1-bb0cb2ede881"
              }
            ],
            "exits": [
              {
                "uuid": "aacd6dc5-332d-4626-9dda-303ba5725eda",
                "destination_uuid": "8f3b6124-8413-4357-98f3-9ee9f7f8b756"
              }
            ]
          },
          {
            "uuid": "8f3b6124-8413-4357-98f3-9ee9f7f8b756",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "fe5e5d41-e030-4152-87af-fb475a1a0c56"
              }
            ],
            "exits": [
              {
                "uuid": "4cb9394d-30aa-4bbd-95b4-29c3d305c23b",
                "destination_uuid": "dd51af05-0d13-46ad-a3b7-9e60e641a5fa"
              }
            ]
          },
          {
            "uuid": "dd51af05-0d13-46ad-a3b7-9e60e641a5fa",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9487b068-89a0-4820-8b1f-77c8af4edc2a",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "b1d1f045-be47-4956-9fd8-94fa51f80dff",
                  "type": "has_only_phrase",
                  "uuid": "d9353e1e-764a-4e8f-a5b3-4039e611b4fc"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "82cae1da-5f0d-4e2d-b485-5564a3e9cec4",
                  "type": "has_only_phrase",
                  "uuid": "1add36f3-ad73-45ab-bce5-bfad7b66df68"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b7e68601-4729-4516-b89b-7a314671e610",
                  "name": "All Responses",
                  "uuid": "9487b068-89a0-4820-8b1f-77c8af4edc2a"
                },
                {
                  "exit_uuid": "7094a83e-4129-45c5-ba1a-87a56cb43638",
                  "name": "Yes",
                  "uuid": "b1d1f045-be47-4956-9fd8-94fa51f80dff"
                },
                {
                  "exit_uuid": "29df1b80-1def-4aa6-8927-a2f5ddc8311f",
                  "name": "No",
                  "uuid": "82cae1da-5f0d-4e2d-b485-5564a3e9cec4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b7e68601-4729-4516-b89b-7a314671e610",
                "destination_uuid": null
              },
              {
                "uuid": "7094a83e-4129-45c5-ba1a-87a56cb43638",
                "destination_uuid": "7071bcec-4856-4d49-9bd6-3b54116aec26"
              },
              {
                "uuid": "29df1b80-1def-4aa6-8927-a2f5ddc8311f",
                "destination_uuid": "6b245308-5938-449c-a9fe-6df040e9ac85"
              }
            ]
          },
          {
            "uuid": "7071bcec-4856-4d49-9bd6-3b54116aec26",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "994cba18-442e-4886-9d13-af7be6e7b5fe"
                },
                "type": "enter_flow",
                "uuid": "d16d8a6b-a213-4586-9fc5-d79636fe1acd"
              }
            ],
            "exits": [
              {
                "uuid": "e1b928e5-efa8-458f-80d1-31181083203f",
                "destination_uuid": "df6f11ea-55f4-4740-8775-e5abfc69a254"
              },
              {
                "uuid": "487b49d6-45af-4b31-be5f-f3e04070417b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "daf459c5-913f-42a8-8a1d-f4128d205690",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f7d4a2f8-f057-4c32-a18a-8234e47b141e"
                },
                {
                  "uuid": "f6866ed8-4ea1-45b6-acdd-41305ce22189",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "1146b987-aa5c-4a51-a8c7-efe518a0e0d9"
                }
              ],
              "categories": [
                {
                  "uuid": "f7d4a2f8-f057-4c32-a18a-8234e47b141e",
                  "name": "Complete",
                  "exit_uuid": "e1b928e5-efa8-458f-80d1-31181083203f"
                },
                {
                  "uuid": "1146b987-aa5c-4a51-a8c7-efe518a0e0d9",
                  "name": "Expired",
                  "exit_uuid": "487b49d6-45af-4b31-be5f-f3e04070417b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f7d4a2f8-f057-4c32-a18a-8234e47b141e"
            }
          },
          {
            "uuid": "df6f11ea-55f4-4740-8775-e5abfc69a254",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4d25a276-f12e-45cb-97a1-cb1c65f39ff3"
              }
            ],
            "exits": [
              {
                "uuid": "9727d809-4de8-4513-9040-b09df3dcd0f5",
                "destination_uuid": "d27b1009-059e-48c5-8654-62adeb11956e"
              }
            ]
          },
          {
            "uuid": "d27b1009-059e-48c5-8654-62adeb11956e",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "b58028ca-ec33-421f-8524-a1fba8f96fe5"
              }
            ],
            "exits": [
              {
                "uuid": "766609ea-e289-4dd3-81dc-743079d6a5dc",
                "destination_uuid": "a618a6fa-32ba-44e1-9ec4-57117952c429"
              }
            ]
          },
          {
            "uuid": "6b245308-5938-449c-a9fe-6df040e9ac85",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "696125df-1b22-4b79-96e1-0f698c0947e4"
              }
            ],
            "exits": [
              {
                "uuid": "09b1ee36-ce25-4bb9-96da-e5e15ba373c9",
                "destination_uuid": "a618a6fa-32ba-44e1-9ec4-57117952c429"
              }
            ]
          },
          {
            "uuid": "a618a6fa-32ba-44e1-9ec4-57117952c429",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f2297fd9-dae5-4781-af9d-b9ceb862dbde",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "903c8d68-b2c9-4b14-80e8-6f3e29415719",
                  "type": "has_only_phrase",
                  "uuid": "8d694e17-b3ff-4384-8ff4-57e43f08a903"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "17c78457-6aa2-41db-ba8a-0bbacfc43bbb",
                  "name": "All Responses",
                  "uuid": "f2297fd9-dae5-4781-af9d-b9ceb862dbde"
                },
                {
                  "exit_uuid": "b0c81f77-ff6a-404d-85a7-a7e257ee6ef3",
                  "name": "Chat to @fields.elder",
                  "uuid": "903c8d68-b2c9-4b14-80e8-6f3e29415719"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "17c78457-6aa2-41db-ba8a-0bbacfc43bbb",
                "destination_uuid": null
              },
              {
                "uuid": "b0c81f77-ff6a-404d-85a7-a7e257ee6ef3",
                "destination_uuid": "9a084c9f-836e-4480-a39f-ccb5cd7bea93"
              }
            ]
          },
          {
            "uuid": "9a084c9f-836e-4480-a39f-ccb5cd7bea93",
            "actions": [
              {
                "uuid": "cf70019c-b9ac-43e3-a243-c290cdf2c38e",
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
                "uuid": "e8d333b4-3812-488c-8f8c-bd0eefdb2103",
                "destination_uuid": "d51c7897-9e00-4098-8ab4-f3687e7c217f"
              }
            ]
          },
          {
            "uuid": "d51c7897-9e00-4098-8ab4-f3687e7c217f",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "ce5605d3-7205-4252-8799-26eeeca1a574"
                },
                "type": "enter_flow",
                "uuid": "d0273d1b-d90f-4549-a511-393e3b06fae9"
              }
            ],
            "exits": [
              {
                "uuid": "c9d3b476-7544-4332-ba54-4886c9dbfa58",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ea655ef9-9f46-4b40-bb78-287a6903c800",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "02619f8a-eeb7-42f7-b7cc-780b24fce887",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d54add03-b655-42c1-9015-4eae3ed466f0"
              }
            ],
            "exits": [
              {
                "uuid": "eef5d5b5-be81-4f8c-9e46-b6e437025f74",
                "destination_uuid": "87785321-b73b-4d45-8e38-f9b628245935"
              }
            ]
          },
          {
            "uuid": "87785321-b73b-4d45-8e38-f9b628245935",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c5bfaf41-5539-4d67-9fe7-fc8ed0438418"
              }
            ],
            "exits": [
              {
                "uuid": "41d64534-99d7-4dbd-b83f-cd9ccacff290",
                "destination_uuid": "ac18988c-8a1c-4e15-ab6c-1cc48fa20848"
              }
            ]
          },
          {
            "uuid": "ac18988c-8a1c-4e15-ab6c-1cc48fa20848",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "15c58039-e9df-4720-91b2-0b21e4806dea"
              }
            ],
            "exits": [
              {
                "uuid": "ff3fcccb-5477-4218-92d0-1c099f63c647",
                "destination_uuid": "6d7341a7-e05c-48f6-94e3-4dae605d91a1"
              }
            ]
          },
          {
            "uuid": "6d7341a7-e05c-48f6-94e3-4dae605d91a1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f40acb32-7064-4945-9de7-bcb62382184c",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "0381984c-ea8d-44c2-8e78-91799546ddb0",
                  "type": "has_only_phrase",
                  "uuid": "dd3944f0-e356-4e3f-86b3-7c323d9582f2"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "5de3763d-d596-4f5f-a632-005256c41d70",
                  "type": "has_only_phrase",
                  "uuid": "a5667670-40e5-4cf0-b377-0cfafa0403cd"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "052d832b-09e6-47a4-96b8-83e4dd12d006",
                  "name": "All Responses",
                  "uuid": "f40acb32-7064-4945-9de7-bcb62382184c"
                },
                {
                  "exit_uuid": "cae707b4-b471-44cc-8b11-92d4cf25a631",
                  "name": "Yes",
                  "uuid": "0381984c-ea8d-44c2-8e78-91799546ddb0"
                },
                {
                  "exit_uuid": "a474c9f1-4c76-4150-96fb-84f3a6ee1b80",
                  "name": "No",
                  "uuid": "5de3763d-d596-4f5f-a632-005256c41d70"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "052d832b-09e6-47a4-96b8-83e4dd12d006",
                "destination_uuid": null
              },
              {
                "uuid": "cae707b4-b471-44cc-8b11-92d4cf25a631",
                "destination_uuid": "e803273e-4793-4bdb-9e74-d2faa6e3ca66"
              },
              {
                "uuid": "a474c9f1-4c76-4150-96fb-84f3a6ee1b80",
                "destination_uuid": "40e834f1-4b44-43b6-9e9f-edc0cf6cef33"
              }
            ]
          },
          {
            "uuid": "e803273e-4793-4bdb-9e74-d2faa6e3ca66",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fddf6293-19c6-4925-a668-303600efc0a5"
              }
            ],
            "exits": [
              {
                "uuid": "58492740-bf30-4ea7-a530-f8b4bc62cf76",
                "destination_uuid": "be6d25ba-8e47-425c-80db-3a55c18d2826"
              }
            ]
          },
          {
            "uuid": "40e834f1-4b44-43b6-9e9f-edc0cf6cef33",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bb4ef46e-1bad-4453-9fdd-d4f30b74137d"
              }
            ],
            "exits": [
              {
                "uuid": "bdaa093e-e24c-4554-bde1-bcad17f5de56",
                "destination_uuid": "be6d25ba-8e47-425c-80db-3a55c18d2826"
              }
            ]
          },
          {
            "uuid": "be6d25ba-8e47-425c-80db-3a55c18d2826",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "57c37ad0-5468-4ba0-84f4-addfb748adef"
              }
            ],
            "exits": [
              {
                "uuid": "ac42a478-acdf-416e-8c00-e072ad84b6b7",
                "destination_uuid": "a19d54a2-dfe9-4fda-b75e-bfe212a20b2e"
              }
            ]
          },
          {
            "uuid": "a19d54a2-dfe9-4fda-b75e-bfe212a20b2e",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "804acb8d-98bc-46ec-93b3-1663d751ec4d"
              }
            ],
            "exits": [
              {
                "uuid": "b09934e4-bbc7-45c4-b9ca-10d8f2b6fe2e",
                "destination_uuid": "0efa6912-dfdc-445c-8f82-bdb8d120ff3e"
              }
            ]
          },
          {
            "uuid": "0efa6912-dfdc-445c-8f82-bdb8d120ff3e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "51467a62-23ac-482b-8bd9-1e66ee890468",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "b440f292-929d-4b0a-8ee4-5f14f666d773",
                  "type": "has_only_phrase",
                  "uuid": "d160ce82-92d6-4d14-a737-cb9e91cbaade"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "3ff33501-4d2f-4a6e-8dd9-ed206060a83b",
                  "type": "has_only_phrase",
                  "uuid": "fc5d174a-508c-4a0f-9365-24e606040684"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7963d28d-1f17-4545-850f-72a2af5eed72",
                  "name": "All Responses",
                  "uuid": "51467a62-23ac-482b-8bd9-1e66ee890468"
                },
                {
                  "exit_uuid": "31b62633-3510-4a91-844c-95ff4207e445",
                  "name": "Yes",
                  "uuid": "b440f292-929d-4b0a-8ee4-5f14f666d773"
                },
                {
                  "exit_uuid": "1f696421-3c35-4bcb-8065-c00d8c01db62",
                  "name": "Later",
                  "uuid": "3ff33501-4d2f-4a6e-8dd9-ed206060a83b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7963d28d-1f17-4545-850f-72a2af5eed72",
                "destination_uuid": null
              },
              {
                "uuid": "31b62633-3510-4a91-844c-95ff4207e445",
                "destination_uuid": "720f9b5f-822c-4339-8f10-e855de581ed6"
              },
              {
                "uuid": "1f696421-3c35-4bcb-8065-c00d8c01db62",
                "destination_uuid": "21ba3955-c937-4c4a-905d-c5fdb5721a68"
              }
            ]
          },
          {
            "uuid": "720f9b5f-822c-4339-8f10-e855de581ed6",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "d9ab6d3d-2dec-4d3d-87f4-2b346489237e"
              }
            ],
            "exits": [
              {
                "uuid": "de68a951-4ed5-4b39-bd7c-59b0e4a048d6",
                "destination_uuid": "8525d412-0413-4252-92a9-93b15e6a0415"
              }
            ]
          },
          {
            "uuid": "8525d412-0413-4252-92a9-93b15e6a0415",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1444e7fd-15c0-48bf-a203-3da6a7c46803",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "0a4d56f0-9736-4c2c-a082-1a26c21d0418",
                  "type": "has_only_phrase",
                  "uuid": "058e0f0f-d542-4752-aff3-adef118547ca"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9486195b-20ed-4237-aff5-48b58da48c66",
                  "name": "All Responses",
                  "uuid": "1444e7fd-15c0-48bf-a203-3da6a7c46803"
                },
                {
                  "exit_uuid": "7363a7b6-cca8-44a2-980c-e60791686dd9",
                  "name": "Take me to Tips",
                  "uuid": "0a4d56f0-9736-4c2c-a082-1a26c21d0418"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9486195b-20ed-4237-aff5-48b58da48c66",
                "destination_uuid": null
              },
              {
                "uuid": "7363a7b6-cca8-44a2-980c-e60791686dd9",
                "destination_uuid": "28a9e32a-4581-460b-aaa8-1f9b295894c1"
              }
            ]
          },
          {
            "uuid": "28a9e32a-4581-460b-aaa8-1f9b295894c1",
            "actions": [
              {
                "uuid": "ebaa341d-2e3e-4731-987e-3878e33b2f2d",
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
                "uuid": "07f5fff1-c489-4432-b3e5-0eb0e2a5d4f4",
                "destination_uuid": "12464e77-c6b7-4bee-af43-70a5979a0670"
              }
            ]
          },
          {
            "uuid": "12464e77-c6b7-4bee-af43-70a5979a0670",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "df84f945-665b-49c1-9c1f-b08bcd69baf2"
                },
                "type": "enter_flow",
                "uuid": "32a69147-61d6-477f-adcf-917b2e6034b9"
              }
            ],
            "exits": [
              {
                "uuid": "108c5331-529f-49ca-820d-51fbb5f8433c",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "21ba3955-c937-4c4a-905d-c5fdb5721a68",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "0115284f-e125-47c2-9a2a-7952c78cf10e"
              }
            ],
            "exits": [
              {
                "uuid": "fc037ef0-2bcb-43f9-8c08-7ecf274edd06",
                "destination_uuid": "843a28c5-9483-44e8-94ca-06cc86baae08"
              }
            ]
          },
          {
            "uuid": "843a28c5-9483-44e8-94ca-06cc86baae08",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a620e5e6-ace8-4a8d-ba8e-26f4d546cda8",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "098abe52-394c-4e10-ab24-899a2340bb16",
                  "type": "has_only_phrase",
                  "uuid": "4e48f64b-cfbe-41bc-9c44-e79947fc16aa"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5dcf9ecc-f9b4-4da3-827c-e37c077324d3",
                  "name": "All Responses",
                  "uuid": "a620e5e6-ace8-4a8d-ba8e-26f4d546cda8"
                },
                {
                  "exit_uuid": "9edfd0da-07b1-42c2-b9a8-5289764d03d4",
                  "name": "Take me to the home screen",
                  "uuid": "098abe52-394c-4e10-ab24-899a2340bb16"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5dcf9ecc-f9b4-4da3-827c-e37c077324d3",
                "destination_uuid": null
              },
              {
                "uuid": "9edfd0da-07b1-42c2-b9a8-5289764d03d4",
                "destination_uuid": "34d26472-0c9d-456a-a4ce-8a1545120f84"
              }
            ]
          },
          {
            "uuid": "34d26472-0c9d-456a-a4ce-8a1545120f84",
            "actions": [
              {
                "uuid": "1d0d37d9-289e-4849-968f-ef75800bc5f8",
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
                "uuid": "ccc86fad-59d1-40a7-a81a-1272cabfe6c6",
                "destination_uuid": "07365813-b6b3-469d-ba0f-746b012fa8b0"
              }
            ]
          },
          {
            "uuid": "07365813-b6b3-469d-ba0f-746b012fa8b0",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "561faa84-4986-4db7-9b0d-c2143025439e"
                },
                "type": "enter_flow",
                "uuid": "3274e2e2-ebf0-4b4d-89af-a2fd87e233ff"
              }
            ],
            "exits": [
              {
                "uuid": "e66090df-6eff-4222-87b6-c69554df1f2c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a46bb62d-ddf9-47e3-824d-18bb27c3fa1f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "307d7fac-1c23-4f94-a55a-b99d489291c1",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "06122927-c181-4fe6-a809-9b9de72e9d2a"
              }
            ],
            "exits": [
              {
                "uuid": "f4ef0a1c-3f76-4d54-af0e-d7c044462f58",
                "destination_uuid": "363c1ce4-fce0-46e2-82a2-56ab88fc1a5e"
              }
            ]
          },
          {
            "uuid": "363c1ce4-fce0-46e2-82a2-56ab88fc1a5e",
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
                "uuid": "a9111bf1-64da-449e-9abf-5b8f68fa28a9"
              }
            ],
            "exits": [
              {
                "uuid": "4fdfcfab-8659-464e-8be7-6de4d7471843",
                "destination_uuid": "5e2b4be5-6c43-47c2-873c-ce4133327392"
              }
            ]
          },
          {
            "uuid": "5e2b4be5-6c43-47c2-873c-ce4133327392",
            "actions": [],
            "exits": [
              {
                "uuid": "e369be1c-ab17-4b3e-bb26-814eade34ca8",
                "destination_uuid": "6c9e558a-b491-4e24-8f31-f3475c9738bd"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7695d882-f3fe-4b4b-b2b4-d92992bca724",
              "cases": [],
              "categories": [
                {
                  "uuid": "7695d882-f3fe-4b4b-b2b4-d92992bca724",
                  "name": "All Responses",
                  "exit_uuid": "e369be1c-ab17-4b3e-bb26-814eade34ca8"
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
            "uuid": "6c9e558a-b491-4e24-8f31-f3475c9738bd",
            "actions": [
              {
                "uuid": "9589c8cc-75a2-4371-a78b-f91ec826d715",
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
                "uuid": "2e7cf5df-847d-4221-953e-a156ad99d66d",
                "destination_uuid": "9c367590-236e-4191-940f-ed6b7bdb23a8"
              }
            ]
          },
          {
            "uuid": "9c367590-236e-4191-940f-ed6b7bdb23a8",
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
                "uuid": "793e62b6-8cbf-4707-be3c-cb14f9b26cd1"
              }
            ],
            "exits": [
              {
                "uuid": "143b6feb-490e-4c33-b0af-69a15d42d3f2",
                "destination_uuid": "09e72c1f-7f04-4c65-8617-288baf5a8618"
              }
            ]
          },
          {
            "uuid": "09e72c1f-7f04-4c65-8617-288baf5a8618",
            "actions": [],
            "exits": [
              {
                "uuid": "bd69ab88-49d6-4de7-b98d-c2ef9e019f2d",
                "destination_uuid": "7d7d7fca-b93c-4ac5-b150-47bbace57369"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "48cc45a0-109a-4901-a71a-bc26617ff1ac",
              "cases": [],
              "categories": [
                {
                  "uuid": "48cc45a0-109a-4901-a71a-bc26617ff1ac",
                  "name": "All Responses",
                  "exit_uuid": "bd69ab88-49d6-4de7-b98d-c2ef9e019f2d"
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
            "uuid": "7d7d7fca-b93c-4ac5-b150-47bbace57369",
            "actions": [
              {
                "uuid": "2a667217-5d1b-4f2b-b4f2-fb097a4c7562",
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
                "uuid": "ad7ad34e-b24f-45ad-bbf7-3a84a8e0d366",
                "destination_uuid": "9ea67e9e-ebaf-4467-a22c-250fa19a040a"
              }
            ]
          },
          {
            "uuid": "9ea67e9e-ebaf-4467-a22c-250fa19a040a",
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
                "uuid": "6e8541da-fac5-4ae4-a1c5-9f475526ad4d"
              }
            ],
            "exits": [
              {
                "uuid": "e4dac98a-9287-4270-ae4e-2b046c72acbe",
                "destination_uuid": "552add3f-17ca-4c1b-85f4-ce9e73d3145b"
              }
            ]
          },
          {
            "uuid": "552add3f-17ca-4c1b-85f4-ce9e73d3145b",
            "actions": [],
            "exits": [
              {
                "uuid": "ea530fa2-6737-4701-8202-6c676f5fdd63",
                "destination_uuid": "258ebf06-14f4-4f91-9585-e9a5d4dfd2f1"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2a668558-4b71-43cd-8a6d-116678585344",
              "cases": [],
              "categories": [
                {
                  "uuid": "2a668558-4b71-43cd-8a6d-116678585344",
                  "name": "All Responses",
                  "exit_uuid": "ea530fa2-6737-4701-8202-6c676f5fdd63"
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
            "uuid": "258ebf06-14f4-4f91-9585-e9a5d4dfd2f1",
            "actions": [
              {
                "uuid": "e1168319-a4b7-4204-bba8-c10377c1fa52",
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
                "uuid": "082d12cd-d590-4728-b4c7-ff37a8eea50a",
                "destination_uuid": "eeb90251-db86-404d-9460-89a570acae8a"
              }
            ]
          },
          {
            "uuid": "eeb90251-db86-404d-9460-89a570acae8a",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "c7690960-803e-40b8-a5b6-b2f76fa58718"
              }
            ],
            "exits": [
              {
                "uuid": "993eb7eb-7d05-4e56-8551-2e8cbc8931a5",
                "destination_uuid": "7aa84b59-9ac3-4905-8dc3-39cd0cde41d1"
              }
            ]
          },
          {
            "uuid": "7aa84b59-9ac3-4905-8dc3-39cd0cde41d1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b208b0a8-c066-471a-959e-8a640fad6380",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "6a9eeae2-8916-4865-8923-e04ee64d66af",
                  "type": "has_only_phrase",
                  "uuid": "5617bfbf-23b0-44d0-98f5-77db8b6f9bb0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "88bb54fb-aed7-4bb4-85dd-c6dbb9029b4d",
                  "name": "All Responses",
                  "uuid": "b208b0a8-c066-471a-959e-8a640fad6380"
                },
                {
                  "exit_uuid": "1d4bd599-63a9-45e4-82ab-04589c6d53ea",
                  "name": "Take me to Homescreen",
                  "uuid": "6a9eeae2-8916-4865-8923-e04ee64d66af"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "88bb54fb-aed7-4bb4-85dd-c6dbb9029b4d",
                "destination_uuid": null
              },
              {
                "uuid": "1d4bd599-63a9-45e4-82ab-04589c6d53ea",
                "destination_uuid": "3d244429-c4ad-4ba8-b0ac-b68622132f27"
              }
            ]
          },
          {
            "uuid": "3d244429-c4ad-4ba8-b0ac-b68622132f27",
            "actions": [
              {
                "uuid": "b59f5105-b192-4114-8b79-ce0510f0da0d",
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
                "uuid": "9cb6de03-48cc-4268-b54d-4d744f67f1a4",
                "destination_uuid": "4b2383d8-fd55-4f86-beb1-b00d80d58e1d"
              }
            ]
          },
          {
            "uuid": "4b2383d8-fd55-4f86-beb1-b00d80d58e1d",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "52a6a880-55f3-4d79-93ec-73348c3bb7c4"
                },
                "type": "enter_flow",
                "uuid": "e6c6fe5d-45c0-4985-bef4-b1eacd4fc30b"
              }
            ],
            "exits": [
              {
                "uuid": "66dba053-80c1-43e1-9fd6-60ed58c3b853",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "9a791edd-f2a4-4dde-9021-c941cf8f38a3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c548e742-a33d-4539-99d6-a61d759881f3",
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
                "uuid": "dfed6840-44ee-489a-8ae0-e8cc6dc09c1d"
              }
            ],
            "exits": [
              {
                "uuid": "4d500b6a-cc26-41cb-aa68-193e11537708",
                "destination_uuid": "aceb395d-8166-4106-b53a-12b014355126"
              }
            ]
          },
          {
            "uuid": "aceb395d-8166-4106-b53a-12b014355126",
            "actions": [],
            "exits": [
              {
                "uuid": "9b7657bb-d0bd-4942-8935-554cf6569d1f",
                "destination_uuid": "81a003a5-bbce-40ba-8824-2040da9618d2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "39415a90-6fce-47c6-bf81-a6003e4c9675",
              "cases": [],
              "categories": [
                {
                  "uuid": "39415a90-6fce-47c6-bf81-a6003e4c9675",
                  "name": "All Responses",
                  "exit_uuid": "9b7657bb-d0bd-4942-8935-554cf6569d1f"
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
            "uuid": "81a003a5-bbce-40ba-8824-2040da9618d2",
            "actions": [
              {
                "uuid": "0d9e10a1-fa5e-4cda-b646-f58dcfb42505",
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
                "uuid": "0a0516d2-c9d2-4e31-921f-7c24c0f22180",
                "destination_uuid": "b73393a1-29ae-471a-8f92-4ba35db6af2b"
              }
            ]
          },
          {
            "uuid": "b73393a1-29ae-471a-8f92-4ba35db6af2b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1f5fbb94-d719-4a10-9b95-a1f268223fce",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "c29a9f05-b26f-4321-9c3a-55cbcbe96d3b",
                  "type": "has_only_phrase",
                  "uuid": "2935d5ff-f918-4238-bdad-21361bdfba4d"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "cd7ee482-e238-47f0-ad75-b02ebabd4bf9",
                  "type": "has_only_phrase",
                  "uuid": "0784a45e-c00b-4ca2-b7f9-1733f3c8cd4b"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "58a474c6-ca10-4ca4-86a6-358a2b18acd5",
                  "type": "has_only_phrase",
                  "uuid": "c6306a46-8721-4a45-89a1-f7437e70b805"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a8ae9a46-3b75-4752-98bf-ebb028395e50",
                  "name": "All Responses",
                  "uuid": "1f5fbb94-d719-4a10-9b95-a1f268223fce"
                },
                {
                  "exit_uuid": "99aab41f-3493-435b-b129-44e40cfe7e9c",
                  "name": "Great",
                  "uuid": "c29a9f05-b26f-4321-9c3a-55cbcbe96d3b"
                },
                {
                  "exit_uuid": "40ba3c8f-2217-41b4-80fd-bc7257705d12",
                  "name": "Neutral",
                  "uuid": "cd7ee482-e238-47f0-ad75-b02ebabd4bf9"
                },
                {
                  "exit_uuid": "fe505315-c5df-4dba-98de-774c1368f62c",
                  "name": "Bad",
                  "uuid": "58a474c6-ca10-4ca4-86a6-358a2b18acd5"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "a8ae9a46-3b75-4752-98bf-ebb028395e50",
                "destination_uuid": null
              },
              {
                "uuid": "99aab41f-3493-435b-b129-44e40cfe7e9c",
                "destination_uuid": "0441084a-45f5-4c90-b63f-3078be230e37"
              },
              {
                "uuid": "40ba3c8f-2217-41b4-80fd-bc7257705d12",
                "destination_uuid": "f85c1bdc-12e4-4920-bef8-bc762f33ddeb"
              },
              {
                "uuid": "fe505315-c5df-4dba-98de-774c1368f62c",
                "destination_uuid": "73bb18d2-f19f-4ba7-ad41-7af395ee379e"
              }
            ]
          },
          {
            "uuid": "0441084a-45f5-4c90-b63f-3078be230e37",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0c26aca4-9181-478d-8b7b-e210de366458"
              }
            ],
            "exits": [
              {
                "uuid": "3b7e6e15-2387-4f91-9e1e-c90ec4c01a09",
                "destination_uuid": "9eac552b-10ee-42c8-a6dc-6b89518c0d70"
              }
            ]
          },
          {
            "uuid": "f85c1bdc-12e4-4920-bef8-bc762f33ddeb",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f8e770c3-3d2e-4044-8b96-3afffe28200e"
              }
            ],
            "exits": [
              {
                "uuid": "cb33f890-25d1-4c43-ba12-f4c5e1bf0224",
                "destination_uuid": "9eac552b-10ee-42c8-a6dc-6b89518c0d70"
              }
            ]
          },
          {
            "uuid": "9eac552b-10ee-42c8-a6dc-6b89518c0d70",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "0f99b769-914b-42fa-b48f-ef9c3f7911a6"
                },
                "type": "enter_flow",
                "uuid": "a57e9595-dcfd-425d-afac-330ccf9cfe72"
              }
            ],
            "exits": [
              {
                "uuid": "c1e2f5b7-bc0d-44e4-805c-dca653bba3f9",
                "destination_uuid": "3d46206a-fa85-4241-ac2c-9d79571f6002"
              },
              {
                "uuid": "829bca31-31b5-4031-914a-d3ae42e35e0b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "07a72a03-db54-4d44-ad67-b8d652d947e3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "fc54b6b5-57aa-4f19-9409-2e4b7490fc15"
                },
                {
                  "uuid": "f0824579-2390-43c3-a735-6dc904520ee2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0fa0a38c-c4a3-4644-ba91-924a34bb0edd"
                }
              ],
              "categories": [
                {
                  "uuid": "fc54b6b5-57aa-4f19-9409-2e4b7490fc15",
                  "name": "Complete",
                  "exit_uuid": "c1e2f5b7-bc0d-44e4-805c-dca653bba3f9"
                },
                {
                  "uuid": "0fa0a38c-c4a3-4644-ba91-924a34bb0edd",
                  "name": "Expired",
                  "exit_uuid": "829bca31-31b5-4031-914a-d3ae42e35e0b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "fc54b6b5-57aa-4f19-9409-2e4b7490fc15"
            }
          },
          {
            "uuid": "3d46206a-fa85-4241-ac2c-9d79571f6002",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "744b2a0d-e344-4839-9fe5-b5a807edf18d"
                },
                "type": "enter_flow",
                "uuid": "44607c39-e6f9-4686-be51-bede9ef6879d"
              }
            ],
            "exits": [
              {
                "uuid": "4d360fed-1344-4dc8-a10b-200dac9f3455",
                "destination_uuid": "c7282073-b697-4d4f-8033-7f7018e6bc5c"
              },
              {
                "uuid": "e6c618ee-df54-46c4-afde-64f45ba88e2e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "9a6038ca-50ec-46c4-8aa7-a346ce3c7b5d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8cf5d9d5-97a4-4830-8db5-41016ca69d25"
                },
                {
                  "uuid": "f81b2e4a-f32c-45e2-aa6a-33f3018124aa",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "54d8132e-9947-4d0f-820b-6f23853dc17a"
                }
              ],
              "categories": [
                {
                  "uuid": "8cf5d9d5-97a4-4830-8db5-41016ca69d25",
                  "name": "Complete",
                  "exit_uuid": "4d360fed-1344-4dc8-a10b-200dac9f3455"
                },
                {
                  "uuid": "54d8132e-9947-4d0f-820b-6f23853dc17a",
                  "name": "Expired",
                  "exit_uuid": "e6c618ee-df54-46c4-afde-64f45ba88e2e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8cf5d9d5-97a4-4830-8db5-41016ca69d25"
            }
          },
          {
            "uuid": "73bb18d2-f19f-4ba7-ad41-7af395ee379e",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cc9ea1e1-0550-4242-8558-8d96ae97b4e1"
              }
            ],
            "exits": [
              {
                "uuid": "4ea991a3-7d74-4d04-84c4-6637df6b89f2",
                "destination_uuid": "7cdf2a88-b118-43dd-b670-8a6c266b184d"
              }
            ]
          },
          {
            "uuid": "7cdf2a88-b118-43dd-b670-8a6c266b184d",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "26673543-a9ea-4d66-922d-2ab4a5a65fba"
                },
                "type": "enter_flow",
                "uuid": "bebae4a2-b8a6-4194-8df7-1241abed36bc"
              }
            ],
            "exits": [
              {
                "uuid": "cd7cc1d3-34a3-4ece-a285-2931fea7427a",
                "destination_uuid": "7748c9ac-ba19-4cbe-9ca1-ba170b22213b"
              },
              {
                "uuid": "7d894fc0-6aca-4bed-9ec5-a6af4f791f4c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "25535a60-1061-4071-b9c1-e05fbbdf327e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "cd080563-4744-4911-bb9e-f5c575cedc2b"
                },
                {
                  "uuid": "91092a5e-b63b-40d0-9cda-980bcd0da886",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f30e19bc-7f0b-4682-85a1-3a63f239f872"
                }
              ],
              "categories": [
                {
                  "uuid": "cd080563-4744-4911-bb9e-f5c575cedc2b",
                  "name": "Complete",
                  "exit_uuid": "cd7cc1d3-34a3-4ece-a285-2931fea7427a"
                },
                {
                  "uuid": "f30e19bc-7f0b-4682-85a1-3a63f239f872",
                  "name": "Expired",
                  "exit_uuid": "7d894fc0-6aca-4bed-9ec5-a6af4f791f4c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "cd080563-4744-4911-bb9e-f5c575cedc2b"
            }
          },
          {
            "uuid": "7748c9ac-ba19-4cbe-9ca1-ba170b22213b",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "0d9602a0-ef05-4d31-a9f1-59e55662a619"
                },
                "type": "enter_flow",
                "uuid": "2c16c249-a774-416b-b9c3-aeb644f1c5d1"
              }
            ],
            "exits": [
              {
                "uuid": "248929cb-a804-4cd2-a072-ef9cb539842a",
                "destination_uuid": "c7282073-b697-4d4f-8033-7f7018e6bc5c"
              },
              {
                "uuid": "fcd96b86-3646-4169-898b-cce702905c6b",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "66f57068-dbe1-43e1-b176-20290d62f0e6",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "1dc106b8-8ddf-4cd5-afc5-143506f3707d"
                },
                {
                  "uuid": "cf03223e-4ce0-4ab4-9801-2273c4577848",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "7f27a8b6-cf5c-43b0-8819-1f07e6f7ad0c"
                }
              ],
              "categories": [
                {
                  "uuid": "1dc106b8-8ddf-4cd5-afc5-143506f3707d",
                  "name": "Complete",
                  "exit_uuid": "248929cb-a804-4cd2-a072-ef9cb539842a"
                },
                {
                  "uuid": "7f27a8b6-cf5c-43b0-8819-1f07e6f7ad0c",
                  "name": "Expired",
                  "exit_uuid": "fcd96b86-3646-4169-898b-cce702905c6b"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "1dc106b8-8ddf-4cd5-afc5-143506f3707d"
            }
          },
          {
            "uuid": "c7282073-b697-4d4f-8033-7f7018e6bc5c",
            "actions": [
              {
                "uuid": "00ab201c-5ac5-427d-9397-2c1019daba9f",
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
                "uuid": "be9889e5-692f-473c-b171-e7e82da26234",
                "destination_uuid": "3eb314e4-bc2a-4726-945d-8d9a501e5146"
              }
            ]
          },
          {
            "uuid": "3eb314e4-bc2a-4726-945d-8d9a501e5146",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "6e1a2f81-6c38-4168-8713-9db4bacc3956"
                },
                "type": "enter_flow",
                "uuid": "531ad56f-ea54-47d6-9b12-f8c7a2fb7ffd"
              }
            ],
            "exits": [
              {
                "uuid": "0d1e36b7-a2ad-485e-b56c-c5950ee27729",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "96bd5f81-bc74-42af-829b-3266eed0a7ef",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a66c2bf7-9bca-4bcf-ab54-16a77b0ff031",
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
                "uuid": "bcd3c5e7-c15b-48d3-b7d6-cab32f091f3a"
              }
            ],
            "exits": [
              {
                "uuid": "06ff0ead-7a78-4401-8367-ed5622725f2a",
                "destination_uuid": "39601ccc-03f0-4895-89fc-19e55d8cf396"
              }
            ]
          },
          {
            "uuid": "39601ccc-03f0-4895-89fc-19e55d8cf396",
            "actions": [],
            "exits": [
              {
                "uuid": "0d060c4a-fec4-4f5a-a7b7-928c0858be20",
                "destination_uuid": "9ec99353-f2c5-4052-9a21-50c833973c16"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8fa2dbff-95d7-411a-812e-4569375111c2",
              "cases": [],
              "categories": [
                {
                  "uuid": "8fa2dbff-95d7-411a-812e-4569375111c2",
                  "name": "All Responses",
                  "exit_uuid": "0d060c4a-fec4-4f5a-a7b7-928c0858be20"
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
            "uuid": "9ec99353-f2c5-4052-9a21-50c833973c16",
            "actions": [
              {
                "uuid": "43a21c97-9f25-4483-845a-c9d911631901",
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
                "uuid": "3533e0b1-7447-4e9f-8c6c-3e5db495262b",
                "destination_uuid": "18b641af-a991-45e9-ada7-4499fca259cb"
              }
            ]
          },
          {
            "uuid": "18b641af-a991-45e9-ada7-4499fca259cb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9a0fc806-3ebe-449e-8f68-5a3eb483685c",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "7c8cf423-5771-41a6-bd8d-94a565e14753",
                  "type": "has_only_phrase",
                  "uuid": "63305f49-9537-415e-a51c-4ea07cd0b73d"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "a2fca038-0a47-43b3-af3b-0afc0aaa825b",
                  "type": "has_only_phrase",
                  "uuid": "6a57a5dc-e58b-4c96-bbb6-d8e4ecaf5b5a"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "0a713596-4987-4e09-b3d3-16967fd6bb3e",
                  "type": "has_only_phrase",
                  "uuid": "b6405677-3e84-44d1-8b2a-69f7f71b04b9"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "7021a81f-a46c-40e3-a8bc-563ff8573cca",
                  "type": "has_only_phrase",
                  "uuid": "7f372cdf-161d-4081-851f-39f8bbcfc325"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "520bb8fe-848f-44d9-b165-467a4c489467",
                  "type": "has_only_phrase",
                  "uuid": "ee3713fb-76b7-4bc1-bfb6-cd73c90458c5"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "d1df3f1d-5ac3-4ba9-80cf-5f162049bf50",
                  "type": "has_only_phrase",
                  "uuid": "c2d1d9eb-c3bc-4f39-a7d7-9880c78a21ec"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "003e55ac-d90f-4d85-be90-4b1180f748f1",
                  "type": "has_only_phrase",
                  "uuid": "022a135a-f2cc-41b3-8ab8-c7d8c8d0da77"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7eca3952-f5a8-4fa3-a8d1-d623aab55964",
                  "name": "All Responses",
                  "uuid": "9a0fc806-3ebe-449e-8f68-5a3eb483685c"
                },
                {
                  "exit_uuid": "f5d6143a-af82-4deb-8c7c-2e3dbfef0f9d",
                  "name": "Do it every day",
                  "uuid": "7c8cf423-5771-41a6-bd8d-94a565e14753"
                },
                {
                  "exit_uuid": "5b647986-4580-4981-9a23-a3d974f5e852",
                  "name": "Let your teen choose the activity",
                  "uuid": "a2fca038-0a47-43b3-af3b-0afc0aaa825b"
                },
                {
                  "exit_uuid": "ceffb60b-23a7-4c50-bce8-b34e66e43a73",
                  "name": "Follow your teen’s lead",
                  "uuid": "0a713596-4987-4e09-b3d3-16967fd6bb3e"
                },
                {
                  "exit_uuid": "b54e2eab-aad6-40e4-b424-e8ce044b0dc2",
                  "name": "Give your teen all of your attention",
                  "uuid": "7021a81f-a46c-40e3-a8bc-563ff8573cca"
                },
                {
                  "exit_uuid": "f4863128-c7b5-4985-aba5-fe758b9203b4",
                  "name": "Show your teen you are really listening",
                  "uuid": "520bb8fe-848f-44d9-b165-467a4c489467"
                },
                {
                  "exit_uuid": "88ad5423-4dd2-44d3-b801-fa02a64c2500",
                  "name": "Have fun!",
                  "uuid": "d1df3f1d-5ac3-4ba9-80cf-5f162049bf50"
                },
                {
                  "exit_uuid": "b1dc1384-a25d-4002-84a0-9c94c88b11cc",
                  "name": "None ",
                  "uuid": "003e55ac-d90f-4d85-be90-4b1180f748f1"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "7eca3952-f5a8-4fa3-a8d1-d623aab55964",
                "destination_uuid": null
              },
              {
                "uuid": "f5d6143a-af82-4deb-8c7c-2e3dbfef0f9d",
                "destination_uuid": "9d513ea3-089f-4513-a2a2-09fea9f28e5e"
              },
              {
                "uuid": "5b647986-4580-4981-9a23-a3d974f5e852",
                "destination_uuid": "e6510b35-c9ef-4797-b23f-93e40f08644a"
              },
              {
                "uuid": "ceffb60b-23a7-4c50-bce8-b34e66e43a73",
                "destination_uuid": "5188c921-b9bd-4473-b08a-02534f91d446"
              },
              {
                "uuid": "b54e2eab-aad6-40e4-b424-e8ce044b0dc2",
                "destination_uuid": "ae399c2c-78fd-4983-beab-43279db477d7"
              },
              {
                "uuid": "f4863128-c7b5-4985-aba5-fe758b9203b4",
                "destination_uuid": "7d3d4160-d3aa-419c-ac1c-04cd1e0c7eb0"
              },
              {
                "uuid": "88ad5423-4dd2-44d3-b801-fa02a64c2500",
                "destination_uuid": "04eb80b5-c71c-46a1-8843-ad46c10bf0ea"
              },
              {
                "uuid": "b1dc1384-a25d-4002-84a0-9c94c88b11cc",
                "destination_uuid": "5594a88f-abd6-4e87-8237-36c028f952d5"
              }
            ]
          },
          {
            "uuid": "9d513ea3-089f-4513-a2a2-09fea9f28e5e",
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
                "uuid": "8ebcb917-44f3-4d46-88a8-ed884ff7015d"
              }
            ],
            "exits": [
              {
                "uuid": "dbd286fc-120c-4815-a505-e8cdadaad3e5",
                "destination_uuid": "25bbdef9-b7bd-4342-a041-3bffc81a63c4"
              }
            ]
          },
          {
            "uuid": "25bbdef9-b7bd-4342-a041-3bffc81a63c4",
            "actions": [],
            "exits": [
              {
                "uuid": "c240a9ac-0e59-4762-98a6-1e21ef6840b5",
                "destination_uuid": "6e36e5a2-0dae-4a9b-b1cc-7c0502602a87"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "01ce2d9b-3b55-4d1a-a577-f10773a2d4f9",
              "cases": [],
              "categories": [
                {
                  "uuid": "01ce2d9b-3b55-4d1a-a577-f10773a2d4f9",
                  "name": "All Responses",
                  "exit_uuid": "c240a9ac-0e59-4762-98a6-1e21ef6840b5"
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
            "uuid": "6e36e5a2-0dae-4a9b-b1cc-7c0502602a87",
            "actions": [
              {
                "uuid": "f9315d1e-9753-467e-965a-ecf1ec47d0bb",
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
                "uuid": "7d891e8a-8897-42f5-8595-09716627d765",
                "destination_uuid": "d3149f62-6f7c-4d42-88d0-cec4055e2a24"
              }
            ]
          },
          {
            "uuid": "d3149f62-6f7c-4d42-88d0-cec4055e2a24",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "24277b66-beea-4a52-8c21-0ff3d4de3572"
              }
            ],
            "exits": [
              {
                "uuid": "c36469e8-1b72-4bbe-9a3f-ceb136b01f87",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "e6510b35-c9ef-4797-b23f-93e40f08644a",
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
                "uuid": "c1b45a06-fe37-480b-a8e8-39c5cc704c95"
              }
            ],
            "exits": [
              {
                "uuid": "9dd25c91-ab8f-4236-afc6-7b1794cb5bce",
                "destination_uuid": "334c4b4c-6662-429e-8aec-c72a88b109c6"
              }
            ]
          },
          {
            "uuid": "334c4b4c-6662-429e-8aec-c72a88b109c6",
            "actions": [],
            "exits": [
              {
                "uuid": "e9689762-9e7d-4ee7-a5b3-9d60334f5f2e",
                "destination_uuid": "25982c26-e78c-4e8e-b98d-89b78861aeb0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "532b7443-1139-457f-b1c5-54f9c9ee8c35",
              "cases": [],
              "categories": [
                {
                  "uuid": "532b7443-1139-457f-b1c5-54f9c9ee8c35",
                  "name": "All Responses",
                  "exit_uuid": "e9689762-9e7d-4ee7-a5b3-9d60334f5f2e"
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
            "uuid": "25982c26-e78c-4e8e-b98d-89b78861aeb0",
            "actions": [
              {
                "uuid": "66cce790-cce5-4a9d-a871-298e481e3416",
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
                "uuid": "7cbe58b7-3499-47ac-8174-5b4d3ec117bf",
                "destination_uuid": "a43a1158-9806-47a0-be11-a5550f74b989"
              }
            ]
          },
          {
            "uuid": "a43a1158-9806-47a0-be11-a5550f74b989",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cc9be9ac-4470-4816-8004-ffd9872cf215"
              }
            ],
            "exits": [
              {
                "uuid": "689ef5da-a9ce-44f7-a546-ffe1659fd569",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "5188c921-b9bd-4473-b08a-02534f91d446",
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
                "uuid": "0e265126-3265-44a4-8065-9bd73cd58764"
              }
            ],
            "exits": [
              {
                "uuid": "f75f3149-250f-4598-a691-ef302f6fd18a",
                "destination_uuid": "5cdcb253-e465-44ad-8dd4-44049eb2ad92"
              }
            ]
          },
          {
            "uuid": "5cdcb253-e465-44ad-8dd4-44049eb2ad92",
            "actions": [],
            "exits": [
              {
                "uuid": "ba45a697-b66c-4004-9122-5ba0ed1eac51",
                "destination_uuid": "07404a42-76e2-4bd5-aff6-07f426b04334"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "17f77a9e-3db1-42c0-b2f5-b7b4139c4242",
              "cases": [],
              "categories": [
                {
                  "uuid": "17f77a9e-3db1-42c0-b2f5-b7b4139c4242",
                  "name": "All Responses",
                  "exit_uuid": "ba45a697-b66c-4004-9122-5ba0ed1eac51"
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
            "uuid": "07404a42-76e2-4bd5-aff6-07f426b04334",
            "actions": [
              {
                "uuid": "c99e701b-7b82-4a5b-a65b-8f3ca9f141b9",
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
                "uuid": "7428fa08-f3ff-4b3a-82d5-2b50f9b2e673",
                "destination_uuid": "8e0bd100-39f0-416c-aa6c-24610c69e64d"
              }
            ]
          },
          {
            "uuid": "8e0bd100-39f0-416c-aa6c-24610c69e64d",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9b2909cc-3d0f-4c4f-82f6-c5ae52066167"
              }
            ],
            "exits": [
              {
                "uuid": "0884e25b-a422-48bd-901c-9a1e227f9de4",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "ae399c2c-78fd-4983-beab-43279db477d7",
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
                "uuid": "e13e235f-4c5d-4052-9072-b645db179170"
              }
            ],
            "exits": [
              {
                "uuid": "e81f49aa-4264-49a8-aee5-3b566ff94bd5",
                "destination_uuid": "7644df46-a848-485f-a918-571e3d184104"
              }
            ]
          },
          {
            "uuid": "7644df46-a848-485f-a918-571e3d184104",
            "actions": [],
            "exits": [
              {
                "uuid": "7c22d79e-a429-40de-b1ee-a3466a848705",
                "destination_uuid": "d32068ea-b01f-4372-b929-3f18d77e693d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "66b206b0-abec-4d11-86e7-6ea20fdd2382",
              "cases": [],
              "categories": [
                {
                  "uuid": "66b206b0-abec-4d11-86e7-6ea20fdd2382",
                  "name": "All Responses",
                  "exit_uuid": "7c22d79e-a429-40de-b1ee-a3466a848705"
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
            "uuid": "d32068ea-b01f-4372-b929-3f18d77e693d",
            "actions": [
              {
                "uuid": "69e22de3-c45f-4572-aa93-b24d677d3ece",
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
                "uuid": "d1b40918-2ee0-43e2-9842-919bc4f2c6c6",
                "destination_uuid": "91d56a27-9d24-4b45-bab8-4765bd32a0c5"
              }
            ]
          },
          {
            "uuid": "91d56a27-9d24-4b45-bab8-4765bd32a0c5",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6b3caa89-cad9-4fd9-bf57-2c0863839560"
              }
            ],
            "exits": [
              {
                "uuid": "1352f841-199a-4685-8a81-91c6da9c16b7",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7d3d4160-d3aa-419c-ac1c-04cd1e0c7eb0",
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
                "uuid": "b89fb8c6-7860-44af-9e1a-c9af14b6f684"
              }
            ],
            "exits": [
              {
                "uuid": "c94bca2b-6de9-40eb-9ae0-9d2a9f6cc33f",
                "destination_uuid": "e0bef479-16a2-4f8c-b8d4-246b315e29fa"
              }
            ]
          },
          {
            "uuid": "e0bef479-16a2-4f8c-b8d4-246b315e29fa",
            "actions": [],
            "exits": [
              {
                "uuid": "74420e7f-7454-45ea-9db1-a3abb50138be",
                "destination_uuid": "ff73936c-99b4-4b1a-a74b-0a0094a9236a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "5778f558-2e23-43ea-b320-5cf1a9aa5012",
              "cases": [],
              "categories": [
                {
                  "uuid": "5778f558-2e23-43ea-b320-5cf1a9aa5012",
                  "name": "All Responses",
                  "exit_uuid": "74420e7f-7454-45ea-9db1-a3abb50138be"
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
            "uuid": "ff73936c-99b4-4b1a-a74b-0a0094a9236a",
            "actions": [
              {
                "uuid": "10f11950-1b6f-4a04-b931-214788fa8d8f",
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
                "uuid": "61928e01-4d25-4b89-887c-3db3dc5f87b0",
                "destination_uuid": "ce7461b5-419b-4b03-bcb2-d60d565c350d"
              }
            ]
          },
          {
            "uuid": "ce7461b5-419b-4b03-bcb2-d60d565c350d",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4626ef31-0b01-4b79-b37f-ade474c5b296"
              }
            ],
            "exits": [
              {
                "uuid": "6c308c3a-f881-4314-99bd-137bf89d5f60",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "04eb80b5-c71c-46a1-8843-ad46c10bf0ea",
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
                "uuid": "c56de0a9-826b-4b87-b6eb-543a41f1d8e5"
              }
            ],
            "exits": [
              {
                "uuid": "5fb2ef5d-ad1c-4813-b569-fcf6e0730789",
                "destination_uuid": "efd9713d-d969-420d-a46b-81daecb5482f"
              }
            ]
          },
          {
            "uuid": "efd9713d-d969-420d-a46b-81daecb5482f",
            "actions": [],
            "exits": [
              {
                "uuid": "cdb81379-f8d5-4512-8912-39c71b934fd1",
                "destination_uuid": "0be372f6-6d4f-4d33-97cd-0945f7b075ea"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "caa90dbd-f7ae-441e-bdce-4e0454bed070",
              "cases": [],
              "categories": [
                {
                  "uuid": "caa90dbd-f7ae-441e-bdce-4e0454bed070",
                  "name": "All Responses",
                  "exit_uuid": "cdb81379-f8d5-4512-8912-39c71b934fd1"
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
            "uuid": "0be372f6-6d4f-4d33-97cd-0945f7b075ea",
            "actions": [
              {
                "uuid": "cdae3530-4203-4cba-8aaf-ea2d7c79bc87",
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
                "uuid": "6b4250e9-1b36-430a-ad19-348329c45025",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "b2aabaa8-1a83-4722-a82e-44bb0fdca0e2",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dd40f042-ce33-4d9e-aff9-a1b1e5e4439c"
              }
            ],
            "exits": [
              {
                "uuid": "a8f40d53-15d7-480f-a768-a010dd81cfa8",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "5594a88f-abd6-4e87-8237-36c028f952d5",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a8775bed-f915-42b2-a60e-6a7924811dfc"
              }
            ],
            "exits": [
              {
                "uuid": "f5ead08b-3f86-4044-a552-b9b134328dc7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3da9a71c-8e7e-455d-a4e6-98b6082b0e05",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1704d4e7-0a15-4cfd-bb83-769fdc87d758",
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
                "uuid": "8ba539d4-410c-48b3-a515-0b02a4408749"
              }
            ],
            "exits": [
              {
                "uuid": "a11a2d2e-4918-486d-88cd-dfbe3af0d908",
                "destination_uuid": "7142998b-7dad-4ef9-bdf2-9aa267f15aaa"
              }
            ]
          },
          {
            "uuid": "ca8335bd-abae-43b6-a62f-cff61dabcded",
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
                "uuid": "35362c19-9aef-4571-8f6c-d4f70ad22a45"
              }
            ],
            "exits": [
              {
                "uuid": "2cd83293-a86f-4989-be83-83eb94bd5ec9",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "cb76dba0-5e9c-4d6b-8f1e-eb8c845cae68",
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
                "uuid": "f9cb15b9-7e81-447f-9421-0b935a91f232"
              }
            ],
            "exits": [
              {
                "uuid": "a6030574-c399-4346-8cb4-ff7875b2df7f",
                "destination_uuid": "7142998b-7dad-4ef9-bdf2-9aa267f15aaa"
              }
            ]
          },
          {
            "uuid": "7142998b-7dad-4ef9-bdf2-9aa267f15aaa",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "004b9acc-b386-4768-bb20-a18eade039db",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "af58e1cb-20f8-49ae-80f1-553600940fcf",
                  "type": "has_only_phrase",
                  "uuid": "8af0046f-792a-4ee4-9e91-1a5999444c20"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "2b17ba83-9439-469e-87ee-d0fd58cb4458",
                  "type": "has_only_phrase",
                  "uuid": "c9e0dedd-b0ac-4322-8bac-9de484e09fd5"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "ddaf6652-475e-40f9-9560-729f9f0b4d99",
                  "type": "has_only_phrase",
                  "uuid": "7e7cdbaf-bba5-49f1-ad69-9727f5fec8c4"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "61eca4ad-5b98-462a-957a-2db32ccd5847",
                  "type": "has_only_phrase",
                  "uuid": "8976a413-cf1a-4451-962d-113f96a4019f"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "d76059ca-7b50-4915-bcbd-a989a747a97a",
                  "type": "has_only_phrase",
                  "uuid": "7e6d1961-8e90-4f6c-842a-b3665f1988c9"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "b4a61187-c9b8-4a3d-9f20-96a79d44574c",
                  "type": "has_only_phrase",
                  "uuid": "8657656f-6f34-4127-bd34-9eaa9e4aa948"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "54251d4c-1796-4cd0-92be-6edf434e57cd",
                  "type": "has_only_phrase",
                  "uuid": "43814c32-840f-4f6a-9eaf-94cac1239264"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "26342132-c99f-4f55-993d-91a637fc71ba",
                  "type": "has_only_phrase",
                  "uuid": "684a42eb-002b-4119-9d11-98ea3ddb51ce"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "c3b0fc67-f506-451c-935f-9b1809cca622",
                  "type": "has_only_phrase",
                  "uuid": "e2193348-13ba-4a4a-a926-5825687d2377"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "451b5429-8ffc-4b2d-9ed7-e5cef258fc26",
                  "type": "has_only_phrase",
                  "uuid": "a02faf0d-80e9-4154-ad25-3289b5aa51d1"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "189fbe23-bfde-4d12-923b-914b5d35a894",
                  "type": "has_only_phrase",
                  "uuid": "a1783f1a-8198-4aa4-90e2-45f2fbb131c9"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "4b187cbe-7ec6-4aeb-95a4-2a1fbe957fa3",
                  "type": "has_only_phrase",
                  "uuid": "4ad16245-9c50-4ccf-9513-5a9facef725e"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "58253890-cc2e-4f94-ab52-744c23391cff",
                  "type": "has_only_phrase",
                  "uuid": "e2983d0c-6617-4bda-b07a-b69738f9e16d"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "c7d0debb-c3e0-4af5-8425-a2fb098e8e91",
                  "type": "has_only_phrase",
                  "uuid": "6a7624ad-97ad-4920-a219-dae1e016b0e6"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "c4b145d1-0a47-4d21-918f-9266aa1d9fa1",
                  "type": "has_only_phrase",
                  "uuid": "f2ec7da2-6514-4e7e-997e-40704f58390c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e6603407-43be-4099-a82a-4fc6753e4eea",
                  "name": "All Responses",
                  "uuid": "004b9acc-b386-4768-bb20-a18eade039db"
                },
                {
                  "exit_uuid": "306a57ef-d4ba-49b8-99eb-94aebd315fbd",
                  "name": "I don’t have enough time",
                  "uuid": "af58e1cb-20f8-49ae-80f1-553600940fcf"
                },
                {
                  "exit_uuid": "6911a0e0-7622-4098-9e2d-a63fbe3ae33a",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "2b17ba83-9439-469e-87ee-d0fd58cb4458"
                },
                {
                  "exit_uuid": "6d64e4dd-c2df-444b-bd16-112fec500a6f",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "ddaf6652-475e-40f9-9560-729f9f0b4d99"
                },
                {
                  "exit_uuid": "cf9ca11a-e1fc-4e7f-911c-d566220b0f4f",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "61eca4ad-5b98-462a-957a-2db32ccd5847"
                },
                {
                  "exit_uuid": "22280272-aa38-40be-b2e0-b52d763a20fe",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "d76059ca-7b50-4915-bcbd-a989a747a97a"
                },
                {
                  "exit_uuid": "32822a6e-7d5e-4a31-8140-fa649ce7a8a7",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "b4a61187-c9b8-4a3d-9f20-96a79d44574c"
                },
                {
                  "exit_uuid": "9227f348-24eb-4e9a-b64e-4e599fbf4e42",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "54251d4c-1796-4cd0-92be-6edf434e57cd"
                },
                {
                  "exit_uuid": "48d8afa3-425f-4d90-be95-ddab77971519",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "26342132-c99f-4f55-993d-91a637fc71ba"
                },
                {
                  "exit_uuid": "32ec7264-a741-4e65-9503-9a8f128ccc59",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "c3b0fc67-f506-451c-935f-9b1809cca622"
                },
                {
                  "exit_uuid": "b0804f5b-8f4b-48dc-b921-3c8cdd65d5ce",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "451b5429-8ffc-4b2d-9ed7-e5cef258fc26"
                },
                {
                  "exit_uuid": "bfad19fe-1d7d-4a2d-8f86-2dad6eb9c2d5",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "189fbe23-bfde-4d12-923b-914b5d35a894"
                },
                {
                  "exit_uuid": "3062343c-fb34-42ef-8083-5fe8e9d34cf4",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "4b187cbe-7ec6-4aeb-95a4-2a1fbe957fa3"
                },
                {
                  "exit_uuid": "4ada5ab8-06a9-45ac-8dba-bf7ca1fa9b9b",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "58253890-cc2e-4f94-ab52-744c23391cff"
                },
                {
                  "exit_uuid": "3d0a83a4-07fe-4ce7-a5fa-c78cfed751fc",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "c7d0debb-c3e0-4af5-8425-a2fb098e8e91"
                },
                {
                  "exit_uuid": "d800ca44-b763-44e0-8e2d-7487451c3b14",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "c4b145d1-0a47-4d21-918f-9266aa1d9fa1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e6603407-43be-4099-a82a-4fc6753e4eea",
                "destination_uuid": null
              },
              {
                "uuid": "306a57ef-d4ba-49b8-99eb-94aebd315fbd",
                "destination_uuid": "f2376281-72a1-4898-8ca6-7c1722ef73aa"
              },
              {
                "uuid": "6911a0e0-7622-4098-9e2d-a63fbe3ae33a",
                "destination_uuid": "cfa5a3a6-3e3d-410b-961d-d82a8a2839bb"
              },
              {
                "uuid": "6d64e4dd-c2df-444b-bd16-112fec500a6f",
                "destination_uuid": "cfa5a3a6-3e3d-410b-961d-d82a8a2839bb"
              },
              {
                "uuid": "cf9ca11a-e1fc-4e7f-911c-d566220b0f4f",
                "destination_uuid": "a89cf7ea-609a-4968-9a41-0c086c0392d1"
              },
              {
                "uuid": "22280272-aa38-40be-b2e0-b52d763a20fe",
                "destination_uuid": "a89cf7ea-609a-4968-9a41-0c086c0392d1"
              },
              {
                "uuid": "32822a6e-7d5e-4a31-8140-fa649ce7a8a7",
                "destination_uuid": "edc1070a-dbdc-4246-ac61-e9f1cfdf7557"
              },
              {
                "uuid": "9227f348-24eb-4e9a-b64e-4e599fbf4e42",
                "destination_uuid": "edc1070a-dbdc-4246-ac61-e9f1cfdf7557"
              },
              {
                "uuid": "48d8afa3-425f-4d90-be95-ddab77971519",
                "destination_uuid": "47fac3d2-b91f-46c3-aa55-cca9dfb264f0"
              },
              {
                "uuid": "32ec7264-a741-4e65-9503-9a8f128ccc59",
                "destination_uuid": "47fac3d2-b91f-46c3-aa55-cca9dfb264f0"
              },
              {
                "uuid": "b0804f5b-8f4b-48dc-b921-3c8cdd65d5ce",
                "destination_uuid": "67fb87f0-a651-47bd-8f87-132461270a7b"
              },
              {
                "uuid": "bfad19fe-1d7d-4a2d-8f86-2dad6eb9c2d5",
                "destination_uuid": "67fb87f0-a651-47bd-8f87-132461270a7b"
              },
              {
                "uuid": "3062343c-fb34-42ef-8083-5fe8e9d34cf4",
                "destination_uuid": "398a2e4a-5b7e-4ce4-bec7-ddeac503fc24"
              },
              {
                "uuid": "4ada5ab8-06a9-45ac-8dba-bf7ca1fa9b9b",
                "destination_uuid": "398a2e4a-5b7e-4ce4-bec7-ddeac503fc24"
              },
              {
                "uuid": "3d0a83a4-07fe-4ce7-a5fa-c78cfed751fc",
                "destination_uuid": "b46b1759-9e09-4492-a89c-a9da187e22dd"
              },
              {
                "uuid": "d800ca44-b763-44e0-8e2d-7487451c3b14",
                "destination_uuid": "b46b1759-9e09-4492-a89c-a9da187e22dd"
              }
            ]
          },
          {
            "uuid": "f2376281-72a1-4898-8ca6-7c1722ef73aa",
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
                "uuid": "bb9ebcb7-417c-4b93-962d-be13378e7017"
              }
            ],
            "exits": [
              {
                "uuid": "f5a762b6-53da-416e-b487-e825e5d34766",
                "destination_uuid": "0bacd40d-6068-403e-aab9-c80442999126"
              }
            ]
          },
          {
            "uuid": "0bacd40d-6068-403e-aab9-c80442999126",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8f3a8c5c-77e6-4e23-b3c4-90f0d0a72877",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "f744b1d6-dc7d-487e-8083-2885f8b4035b",
                  "type": "has_only_phrase",
                  "uuid": "83dc94b6-67ae-4ef0-b082-615689907778"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "4f45e5cb-5c34-4e53-a1a1-9a2615cf4bde",
                  "type": "has_only_phrase",
                  "uuid": "e96af941-f8d7-4423-a013-bbd855e51136"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "9d7df81d-e2e1-4eda-8e9c-61bf36386f22",
                  "type": "has_only_phrase",
                  "uuid": "46f2e390-fe64-4408-8c35-d76ab14ce695"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cdcb1282-5f32-4141-a9c8-2ab4b0561ccb",
                  "name": "All Responses",
                  "uuid": "8f3a8c5c-77e6-4e23-b3c4-90f0d0a72877"
                },
                {
                  "exit_uuid": "1411c1db-49a9-405f-a0c1-d245585058e6",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "f744b1d6-dc7d-487e-8083-2885f8b4035b"
                },
                {
                  "exit_uuid": "8752c610-985e-4295-9062-af9a68f66da5",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "4f45e5cb-5c34-4e53-a1a1-9a2615cf4bde"
                },
                {
                  "exit_uuid": "634573fa-466d-4ff2-8def-2815f0264ff9",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "9d7df81d-e2e1-4eda-8e9c-61bf36386f22"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cdcb1282-5f32-4141-a9c8-2ab4b0561ccb",
                "destination_uuid": null
              },
              {
                "uuid": "1411c1db-49a9-405f-a0c1-d245585058e6",
                "destination_uuid": "5551a2c2-c8f6-4880-bdb1-e02d804ed317"
              },
              {
                "uuid": "8752c610-985e-4295-9062-af9a68f66da5",
                "destination_uuid": "947f125e-91aa-4529-89c1-6dc4b902b301"
              },
              {
                "uuid": "634573fa-466d-4ff2-8def-2815f0264ff9",
                "destination_uuid": "0e32131a-bbce-4b21-8cb1-ac5c62662707"
              }
            ]
          },
          {
            "uuid": "5551a2c2-c8f6-4880-bdb1-e02d804ed317",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f5b76b55-b182-48fe-8ba1-5e9ecf595e18"
              }
            ],
            "exits": [
              {
                "uuid": "d474ed97-963e-4d48-afdc-c9955821bcd8",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "947f125e-91aa-4529-89c1-6dc4b902b301",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ddf81191-c4e4-41a1-96c5-ee5e8b5f2ebb"
              }
            ],
            "exits": [
              {
                "uuid": "46de43f3-991b-4bee-9660-f3c1f677c852",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "0e32131a-bbce-4b21-8cb1-ac5c62662707",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "862b5889-5434-4944-83a1-abf9ed8c51b8"
              }
            ],
            "exits": [
              {
                "uuid": "4a015b75-bcb5-4826-9ba0-1fdd00abd082",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "cfa5a3a6-3e3d-410b-961d-d82a8a2839bb",
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
                "uuid": "c91ebd74-cba2-44c5-b685-570524749cff"
              }
            ],
            "exits": [
              {
                "uuid": "e6314378-ca91-43bb-aa8a-37565e3cb3bb",
                "destination_uuid": "78e809b5-2083-4e06-a38e-a25e3b1a9b40"
              }
            ]
          },
          {
            "uuid": "78e809b5-2083-4e06-a38e-a25e3b1a9b40",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6b539d61-a61c-488c-b2f7-419e2cc9cc73",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "9fadca12-b4c8-42b2-9ce2-cbaf1b79e825",
                  "type": "has_only_phrase",
                  "uuid": "52708106-71a3-41bc-8107-1eaafebaef41"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "6ffe101d-b47c-471e-8257-ba5b5db07d7a",
                  "type": "has_only_phrase",
                  "uuid": "4b6bb2d9-1e85-419e-a503-eb34aeae3bac"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "a58cda85-26ff-42b2-86a3-e6c19ac83167",
                  "type": "has_only_phrase",
                  "uuid": "b365cd1d-f252-4487-8924-cf067125686d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5d2e3c14-02a1-42e3-bf60-6bde825050bc",
                  "name": "All Responses",
                  "uuid": "6b539d61-a61c-488c-b2f7-419e2cc9cc73"
                },
                {
                  "exit_uuid": "0692f593-9fd4-434e-b00d-68d0e23dc86c",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "9fadca12-b4c8-42b2-9ce2-cbaf1b79e825"
                },
                {
                  "exit_uuid": "60bd4076-0db9-4662-9ece-94d6b882c275",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "6ffe101d-b47c-471e-8257-ba5b5db07d7a"
                },
                {
                  "exit_uuid": "abaf8ba9-f913-4b2c-9d83-841ae89dac91",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "a58cda85-26ff-42b2-86a3-e6c19ac83167"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5d2e3c14-02a1-42e3-bf60-6bde825050bc",
                "destination_uuid": null
              },
              {
                "uuid": "0692f593-9fd4-434e-b00d-68d0e23dc86c",
                "destination_uuid": "bcb555c4-546f-47ce-8280-8b7105ad7cc0"
              },
              {
                "uuid": "60bd4076-0db9-4662-9ece-94d6b882c275",
                "destination_uuid": "0f7d736a-2d15-4cd0-94ae-4c3ff61f9de6"
              },
              {
                "uuid": "abaf8ba9-f913-4b2c-9d83-841ae89dac91",
                "destination_uuid": "69d2a15f-bd81-4391-94b8-5936023a2444"
              }
            ]
          },
          {
            "uuid": "bcb555c4-546f-47ce-8280-8b7105ad7cc0",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0512da7d-b871-47d8-af9d-de74523a6f67"
              }
            ],
            "exits": [
              {
                "uuid": "0c7f71f5-7dc2-438f-934e-cbf275127335",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "0f7d736a-2d15-4cd0-94ae-4c3ff61f9de6",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "29292a38-00f0-4562-9168-11d5ee38420d"
              }
            ],
            "exits": [
              {
                "uuid": "9e46802b-a9fe-4413-bbc3-8e436804be6c",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "69d2a15f-bd81-4391-94b8-5936023a2444",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "db4a2c0d-588b-4331-b746-7b0f9e1181f7"
              }
            ],
            "exits": [
              {
                "uuid": "305bb1dc-40da-4d62-97a8-b7bba263c1e7",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "a89cf7ea-609a-4968-9a41-0c086c0392d1",
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
                "uuid": "941c76e0-7d41-47f2-8148-4874251304b0"
              }
            ],
            "exits": [
              {
                "uuid": "d112fdd7-57a4-4714-9689-216815c9e682",
                "destination_uuid": "33d2fe52-aa6d-4903-b726-00a524a1d272"
              }
            ]
          },
          {
            "uuid": "33d2fe52-aa6d-4903-b726-00a524a1d272",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "56644020-0fe2-4df2-ac19-601326c11818",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "aad18301-4996-4ae6-a93e-011066e8ca6d",
                  "type": "has_only_phrase",
                  "uuid": "cc559f24-9f4c-4509-80fc-2f62cbc28071"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "bd94705f-a280-40a7-8b0b-a3521efe3f35",
                  "type": "has_only_phrase",
                  "uuid": "084c21e6-12e9-4009-86b9-960fc4e59487"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "4ee5cdfd-e3d2-4351-9c8b-9c78a764389c",
                  "type": "has_only_phrase",
                  "uuid": "4b99a73b-ee2a-40b1-94a9-94e25977f2fb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "25ddb7d4-69da-48d5-9a5f-c91a791a3cb0",
                  "name": "All Responses",
                  "uuid": "56644020-0fe2-4df2-ac19-601326c11818"
                },
                {
                  "exit_uuid": "3da83698-0668-4a4d-b9af-287521278c7f",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "aad18301-4996-4ae6-a93e-011066e8ca6d"
                },
                {
                  "exit_uuid": "5c8d4c7f-f600-46d4-95b2-64e17a541610",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "bd94705f-a280-40a7-8b0b-a3521efe3f35"
                },
                {
                  "exit_uuid": "aaef7deb-b5bc-459e-b5c9-1608727e608d",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "4ee5cdfd-e3d2-4351-9c8b-9c78a764389c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "25ddb7d4-69da-48d5-9a5f-c91a791a3cb0",
                "destination_uuid": null
              },
              {
                "uuid": "3da83698-0668-4a4d-b9af-287521278c7f",
                "destination_uuid": "a33e04cc-6b93-4d92-b204-126fcb3ea137"
              },
              {
                "uuid": "5c8d4c7f-f600-46d4-95b2-64e17a541610",
                "destination_uuid": "1824ce27-7b78-4321-a1ec-36899c7e218c"
              },
              {
                "uuid": "aaef7deb-b5bc-459e-b5c9-1608727e608d",
                "destination_uuid": "7371eb77-6156-41fa-a377-3436cc1e9aa3"
              }
            ]
          },
          {
            "uuid": "a33e04cc-6b93-4d92-b204-126fcb3ea137",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4e578eac-3fad-4ed0-8b2d-c9285f29d430"
              }
            ],
            "exits": [
              {
                "uuid": "f4b9e094-4cda-4f57-af0f-31a591d4f3c7",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "1824ce27-7b78-4321-a1ec-36899c7e218c",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5295da5e-0201-4937-88df-719fb8e96ed9"
              }
            ],
            "exits": [
              {
                "uuid": "40b2cafa-5848-4f83-bd9e-4dbb3028f6f1",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "7371eb77-6156-41fa-a377-3436cc1e9aa3",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7db67121-86aa-4061-b79f-b974a811d749"
              }
            ],
            "exits": [
              {
                "uuid": "a6241a85-c0f7-4cda-8b75-8c3d016007ac",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "edc1070a-dbdc-4246-ac61-e9f1cfdf7557",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "d17c5709-5c65-4822-9900-bd1320bc80e9"
              }
            ],
            "exits": [
              {
                "uuid": "046b983d-050b-492b-8688-807609af21d7",
                "destination_uuid": "dabdc0dc-8c61-4688-9710-ef903c80e761"
              }
            ]
          },
          {
            "uuid": "dabdc0dc-8c61-4688-9710-ef903c80e761",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "79c736b6-1757-4710-8fa8-a98f558a1085",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "49a9093b-7651-401b-b554-aa68b0cc2f6c",
                  "type": "has_only_phrase",
                  "uuid": "15d04dc5-962b-47ec-8e42-4ea89e685a91"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "05f33a61-4d99-4445-bece-51c64df8eee9",
                  "type": "has_only_phrase",
                  "uuid": "782e0ab6-fc41-4582-95d2-d2cd22eef1cb"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fabef638-cf2d-4bca-aba3-e82d193b26fa",
                  "name": "All Responses",
                  "uuid": "79c736b6-1757-4710-8fa8-a98f558a1085"
                },
                {
                  "exit_uuid": "533dcefb-32e1-4cb1-b874-52b695ea1436",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "49a9093b-7651-401b-b554-aa68b0cc2f6c"
                },
                {
                  "exit_uuid": "da8d3e31-b312-4405-a2a1-9030d626ebb8",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "05f33a61-4d99-4445-bece-51c64df8eee9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fabef638-cf2d-4bca-aba3-e82d193b26fa",
                "destination_uuid": null
              },
              {
                "uuid": "533dcefb-32e1-4cb1-b874-52b695ea1436",
                "destination_uuid": "f7126871-04d3-41b3-89c6-35c139facafc"
              },
              {
                "uuid": "da8d3e31-b312-4405-a2a1-9030d626ebb8",
                "destination_uuid": "da1a6503-cb87-43b1-9526-2a565833368d"
              }
            ]
          },
          {
            "uuid": "f7126871-04d3-41b3-89c6-35c139facafc",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5dc7396f-8a37-4b20-992b-fe86de3fbd02"
              }
            ],
            "exits": [
              {
                "uuid": "c4eca569-d181-478b-8eff-626b77289618",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "da1a6503-cb87-43b1-9526-2a565833368d",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "40f5cb02-ffff-45cf-81e5-c3a5d63c72ef"
              }
            ],
            "exits": [
              {
                "uuid": "599be705-531c-4bf1-b301-dd482fb201c3",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "47fac3d2-b91f-46c3-aa55-cca9dfb264f0",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "bf23ab90-7cf2-4b61-8d4c-4d1569071b6e"
              }
            ],
            "exits": [
              {
                "uuid": "53487970-d72b-4e4a-a23f-0b596a534f84",
                "destination_uuid": "791a037c-3ff9-4bb1-9506-74debcfe4468"
              }
            ]
          },
          {
            "uuid": "791a037c-3ff9-4bb1-9506-74debcfe4468",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "362383d3-e38f-4f8e-a2d5-86c9e41b3c6d",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "e0c2c8f4-f24d-4bdc-bcfb-5c951ef0d9a1",
                  "type": "has_only_phrase",
                  "uuid": "a84b5718-6b68-40e0-905f-9e9c7a513944"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "b8dbe162-1dfb-46b6-b3a1-e387d78a98ac",
                  "type": "has_only_phrase",
                  "uuid": "fa52439e-a7ea-40be-9662-7b7d5daee47f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "05006200-4718-467e-99fa-5e06c1672c88",
                  "name": "All Responses",
                  "uuid": "362383d3-e38f-4f8e-a2d5-86c9e41b3c6d"
                },
                {
                  "exit_uuid": "b1fc4c68-31df-4c2f-a91d-133c8a366871",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "e0c2c8f4-f24d-4bdc-bcfb-5c951ef0d9a1"
                },
                {
                  "exit_uuid": "347b6b70-b262-4c87-8ab2-a672bae973a3",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "b8dbe162-1dfb-46b6-b3a1-e387d78a98ac"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "05006200-4718-467e-99fa-5e06c1672c88",
                "destination_uuid": null
              },
              {
                "uuid": "b1fc4c68-31df-4c2f-a91d-133c8a366871",
                "destination_uuid": "930ff86b-0f70-4da7-874b-657a2f94c25e"
              },
              {
                "uuid": "347b6b70-b262-4c87-8ab2-a672bae973a3",
                "destination_uuid": "ba494c2c-9488-4f2d-ab55-f8943a526fb2"
              }
            ]
          },
          {
            "uuid": "930ff86b-0f70-4da7-874b-657a2f94c25e",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "55d5fab5-752d-43f9-959f-097f7b95dda3"
              }
            ],
            "exits": [
              {
                "uuid": "2b2635fd-1f81-4a1a-aeaa-e76fe0f2cc55",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "ba494c2c-9488-4f2d-ab55-f8943a526fb2",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c2d82c2f-bf9f-4e18-b61b-eba14fccc9f5"
              }
            ],
            "exits": [
              {
                "uuid": "5a4fa4e2-49e2-49c7-b121-ed215c757c5d",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "67fb87f0-a651-47bd-8f87-132461270a7b",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "cffedfe1-7f4a-40fc-98ba-f9f37521d51f"
              }
            ],
            "exits": [
              {
                "uuid": "a89512b3-e33f-4ae0-b9c2-8da7de0a88ab",
                "destination_uuid": "9eef7e3f-73cb-4269-bbc6-2cba6b19e9ff"
              }
            ]
          },
          {
            "uuid": "9eef7e3f-73cb-4269-bbc6-2cba6b19e9ff",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "395ec23c-daf1-4528-aeb0-41a4eebdc5ab",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "90c2b73f-1ebf-4320-b6e0-a5aa4b12857f",
                  "type": "has_only_phrase",
                  "uuid": "32c88142-fe3f-4b58-8e11-bf94a0872985"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "a68f8cc0-dbec-49af-8f24-9dd9626e4bbc",
                  "type": "has_only_phrase",
                  "uuid": "a10428fa-b332-4a42-9166-d154e44d47b4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d9c9d6ef-4e1b-4713-947f-94f6147e6caa",
                  "name": "All Responses",
                  "uuid": "395ec23c-daf1-4528-aeb0-41a4eebdc5ab"
                },
                {
                  "exit_uuid": "d0fe44ef-a9ce-44ad-92bc-88d466839b0b",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "90c2b73f-1ebf-4320-b6e0-a5aa4b12857f"
                },
                {
                  "exit_uuid": "1077ebb7-55f8-4cee-b546-9550f7271552",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "a68f8cc0-dbec-49af-8f24-9dd9626e4bbc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d9c9d6ef-4e1b-4713-947f-94f6147e6caa",
                "destination_uuid": null
              },
              {
                "uuid": "d0fe44ef-a9ce-44ad-92bc-88d466839b0b",
                "destination_uuid": "bf44ddad-284d-4fda-a2ea-2ea0f659fb19"
              },
              {
                "uuid": "1077ebb7-55f8-4cee-b546-9550f7271552",
                "destination_uuid": "cfbfc2ac-c8ae-4e77-b64e-da05bcd5e34b"
              }
            ]
          },
          {
            "uuid": "bf44ddad-284d-4fda-a2ea-2ea0f659fb19",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "5a7d19c0-2f4d-427b-a0e8-6e91d1d9e34e"
              }
            ],
            "exits": [
              {
                "uuid": "a959fde6-a841-48dd-b009-7b486b743ecd",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "cfbfc2ac-c8ae-4e77-b64e-da05bcd5e34b",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "00fe09d5-1d88-4838-8e69-813d78cbf89a"
              }
            ],
            "exits": [
              {
                "uuid": "bda6ba77-26ea-4b2e-b003-6c28f66d9d23",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "398a2e4a-5b7e-4ce4-bec7-ddeac503fc24",
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
                "uuid": "e49becf7-04f8-4a9e-b351-3071f42868c2"
              }
            ],
            "exits": [
              {
                "uuid": "a142fb82-b4f0-4513-b6cb-babcb44b5b94",
                "destination_uuid": "e22c6fa4-a6af-4783-93c0-90da9e7fa319"
              }
            ]
          },
          {
            "uuid": "e22c6fa4-a6af-4783-93c0-90da9e7fa319",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9e87832b-bc2b-496e-9120-af564b3b4bd4",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "b74243f9-5b32-4346-a86c-4a5d5215d9ca",
                  "type": "has_only_phrase",
                  "uuid": "8d54cfda-3a38-4ffc-a14e-4901d4295452"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "837aebea-c6bd-4623-bffd-89ed6810c924",
                  "type": "has_only_phrase",
                  "uuid": "5957232d-69ae-4933-9931-ffd30cbf10bf"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "15758a4b-d1f7-4221-afec-a621ebbec4e2",
                  "type": "has_only_phrase",
                  "uuid": "fd4d48c5-216d-4824-9bb5-27a7867e62d8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ebcdf95e-a43d-458a-9270-c98843454014",
                  "name": "All Responses",
                  "uuid": "9e87832b-bc2b-496e-9120-af564b3b4bd4"
                },
                {
                  "exit_uuid": "f5d29fb2-472d-46b1-864c-af3d6049570e",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "b74243f9-5b32-4346-a86c-4a5d5215d9ca"
                },
                {
                  "exit_uuid": "4d356adb-cde7-4422-9685-6ee6f020385c",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "837aebea-c6bd-4623-bffd-89ed6810c924"
                },
                {
                  "exit_uuid": "8c65dde8-113f-4ece-b407-9a55e65ae251",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "15758a4b-d1f7-4221-afec-a621ebbec4e2"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ebcdf95e-a43d-458a-9270-c98843454014",
                "destination_uuid": null
              },
              {
                "uuid": "f5d29fb2-472d-46b1-864c-af3d6049570e",
                "destination_uuid": "ac0c12d4-8e8d-4e7d-bc4a-f45382334fe2"
              },
              {
                "uuid": "4d356adb-cde7-4422-9685-6ee6f020385c",
                "destination_uuid": "317f424f-3300-4353-b885-43a190b82c03"
              },
              {
                "uuid": "8c65dde8-113f-4ece-b407-9a55e65ae251",
                "destination_uuid": "76bf4c4c-a90b-4594-8528-d260da758820"
              }
            ]
          },
          {
            "uuid": "ac0c12d4-8e8d-4e7d-bc4a-f45382334fe2",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "97e6d364-97ed-4373-ac19-52a2c1396012"
              }
            ],
            "exits": [
              {
                "uuid": "c3ad9f76-da12-4ebe-9ab9-1d2875e13bc9",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "317f424f-3300-4353-b885-43a190b82c03",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cef8c851-7557-423f-8058-1ba54e4c03e5"
              }
            ],
            "exits": [
              {
                "uuid": "f4c7ebca-1938-4557-babc-576ad921446b",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "76bf4c4c-a90b-4594-8528-d260da758820",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9c2085cb-05f0-4b6e-8c7c-971f244b5a82"
              }
            ],
            "exits": [
              {
                "uuid": "e778e31a-bce3-40f8-9ebb-23255034adee",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "b46b1759-9e09-4492-a89c-a9da187e22dd",
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
                "uuid": "cf763907-158a-4dc9-8f64-f478a7f1829e"
              }
            ],
            "exits": [
              {
                "uuid": "7ff44cdc-237f-4f7c-bfc1-044511d65680",
                "destination_uuid": "0e3ac29b-5277-4ac7-bd3b-91579ac10c9c"
              }
            ]
          },
          {
            "uuid": "0e3ac29b-5277-4ac7-bd3b-91579ac10c9c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1bbed633-e4f9-4b0c-a019-6079e94fc57f",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "56a077d9-5b16-41ca-b1d0-a4e8a5f288c0",
                  "type": "has_only_phrase",
                  "uuid": "735b7e92-6726-4910-9610-55701391ff57"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "7b4f5295-5f90-479c-9d36-6361be43026f",
                  "type": "has_only_phrase",
                  "uuid": "196d8c89-e7ff-40be-bd00-ede1d3a8edc5"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "d3ab5065-6957-4f25-89a1-bb7276dbe46e",
                  "type": "has_only_phrase",
                  "uuid": "bd28935e-1983-4273-9cf1-b1e895e5f398"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "be201427-2313-4807-a299-bff79872aba2",
                  "name": "All Responses",
                  "uuid": "1bbed633-e4f9-4b0c-a019-6079e94fc57f"
                },
                {
                  "exit_uuid": "6dd8f0d0-ca80-4cb9-a994-14e25f3e1f63",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "56a077d9-5b16-41ca-b1d0-a4e8a5f288c0"
                },
                {
                  "exit_uuid": "3301385e-0a87-45e0-9dcf-a649ca9f24bd",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "7b4f5295-5f90-479c-9d36-6361be43026f"
                },
                {
                  "exit_uuid": "3e2f0edb-28d9-428a-b9c6-2346cf63de1f",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "d3ab5065-6957-4f25-89a1-bb7276dbe46e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "be201427-2313-4807-a299-bff79872aba2",
                "destination_uuid": null
              },
              {
                "uuid": "6dd8f0d0-ca80-4cb9-a994-14e25f3e1f63",
                "destination_uuid": "2901c937-74fa-40c8-9e05-9df0aec50594"
              },
              {
                "uuid": "3301385e-0a87-45e0-9dcf-a649ca9f24bd",
                "destination_uuid": "97f3be5a-b0a3-4211-b723-be460a0036d9"
              },
              {
                "uuid": "3e2f0edb-28d9-428a-b9c6-2346cf63de1f",
                "destination_uuid": "9badf3bf-41ca-469a-bb75-aa53d475b90b"
              }
            ]
          },
          {
            "uuid": "2901c937-74fa-40c8-9e05-9df0aec50594",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e8d7fce6-cb0b-40ba-919e-e457b6453bcd"
              }
            ],
            "exits": [
              {
                "uuid": "85d6cb97-1325-47a7-beea-a5c7af5d621e",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "97f3be5a-b0a3-4211-b723-be460a0036d9",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b5798406-25d3-4dcd-b9ce-1e956d7f63dc"
              }
            ],
            "exits": [
              {
                "uuid": "2bb20541-a6c1-49b9-ae52-26154519531d",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "9badf3bf-41ca-469a-bb75-aa53d475b90b",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "65e390ff-83f6-4bb1-8aa5-c1aa25b864bf"
              }
            ],
            "exits": [
              {
                "uuid": "0acd4661-408c-4590-a0bc-79971efb776e",
                "destination_uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8"
              }
            ]
          },
          {
            "uuid": "237ab7d6-2dc9-431f-84db-c7c118b7bbb8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e3f3a57a-5d21-4d44-aafc-d22a4756a9da",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "18c7feb4-4ee8-455f-8791-7d7e2724f3de",
                  "type": "has_only_phrase",
                  "uuid": "fce1d0a9-8433-4cdd-81cf-5894209f3745"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2a14f3bd-c270-49e1-8ae6-fd528ca18c5b",
                  "name": "All Responses",
                  "uuid": "e3f3a57a-5d21-4d44-aafc-d22a4756a9da"
                },
                {
                  "exit_uuid": "980c2525-c2a8-4d1f-9409-9e5974838f0b",
                  "name": "Next",
                  "uuid": "18c7feb4-4ee8-455f-8791-7d7e2724f3de"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2a14f3bd-c270-49e1-8ae6-fd528ca18c5b",
                "destination_uuid": null
              },
              {
                "uuid": "980c2525-c2a8-4d1f-9409-9e5974838f0b",
                "destination_uuid": "3beafffb-f918-48ad-91e8-ae740f4ccd27"
              }
            ]
          },
          {
            "uuid": "3beafffb-f918-48ad-91e8-ae740f4ccd27",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "ec0fb0d0-bbaa-412b-bdc4-49148f717744"
              }
            ],
            "exits": [
              {
                "uuid": "f347df79-d507-4aee-a78f-047b137feaf3",
                "destination_uuid": "bc013605-bce4-4fe4-81e9-17e86fabb219"
              }
            ]
          },
          {
            "uuid": "bc013605-bce4-4fe4-81e9-17e86fabb219",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "593ca6ad-c99c-4e08-be52-b264dca4a844",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "6b7b66a9-a43c-4a9e-928f-3ee0cb4ea487",
                  "type": "has_only_phrase",
                  "uuid": "83df845d-2d76-4dd8-aae7-67aa95b80827"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "d5cce184-69d5-4257-8f30-f1eb341b0ddd",
                  "type": "has_only_phrase",
                  "uuid": "8ebf1058-0237-4d9d-b3c5-fcba64f11247"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "21d00671-6f9d-4d28-9d8c-7853ee723bd6",
                  "name": "All Responses",
                  "uuid": "593ca6ad-c99c-4e08-be52-b264dca4a844"
                },
                {
                  "exit_uuid": "a02cdfbd-6b0d-4c84-83f1-603217b789c0",
                  "name": "No",
                  "uuid": "6b7b66a9-a43c-4a9e-928f-3ee0cb4ea487"
                },
                {
                  "exit_uuid": "9b2deecf-bfc4-438e-aeb0-e4efbf64ec06",
                  "name": "Yes",
                  "uuid": "d5cce184-69d5-4257-8f30-f1eb341b0ddd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "21d00671-6f9d-4d28-9d8c-7853ee723bd6",
                "destination_uuid": null
              },
              {
                "uuid": "a02cdfbd-6b0d-4c84-83f1-603217b789c0",
                "destination_uuid": "2c079e5f-5ae3-4f9f-ae58-b464a41aa1fa"
              },
              {
                "uuid": "9b2deecf-bfc4-438e-aeb0-e4efbf64ec06",
                "destination_uuid": "f747e271-6205-445b-8138-984657b1874a"
              }
            ]
          },
          {
            "uuid": "2c079e5f-5ae3-4f9f-ae58-b464a41aa1fa",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d543cd11-e59d-40e1-8bea-302d8308dce8"
              }
            ],
            "exits": [
              {
                "uuid": "31bfa8f6-3ba1-4a78-ad39-ce14a6268b31",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "f747e271-6205-445b-8138-984657b1874a",
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
                "uuid": "ea98be9b-9749-4ffe-b0a6-c2613c85ff04"
              }
            ],
            "exits": [
              {
                "uuid": "25747fa9-5d8a-406c-a23b-4796b74c639c",
                "destination_uuid": "0b23c7f6-f2d5-4fe2-98b9-2cc0197a1e09"
              }
            ]
          },
          {
            "uuid": "0b23c7f6-f2d5-4fe2-98b9-2cc0197a1e09",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ebffe614-e357-4156-bb41-e5818f17931a",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "21d31c60-c53b-4ae6-b30f-1f5978f15a9a",
                  "type": "has_only_phrase",
                  "uuid": "8f740abb-5c19-42a0-b74c-c3da05f6a43f"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "e58f4511-ded2-45ef-8aed-b8508d43dfe3",
                  "type": "has_only_phrase",
                  "uuid": "fe5b3231-25b0-4056-8122-bd9a891494fd"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "26608b7f-e326-4041-9208-46d1bf687fcd",
                  "type": "has_only_phrase",
                  "uuid": "bece8f90-bdce-4d29-b9d9-0b7a34376778"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "500be142-4ff1-490f-af0b-7ea60a2d269f",
                  "type": "has_only_phrase",
                  "uuid": "be2a8a7f-8253-4ae3-9f8b-888759892c83"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "c28f1e06-e9e6-43ac-8f07-bb004f2be16a",
                  "type": "has_only_phrase",
                  "uuid": "7501de43-a593-45ce-a98d-64838acf2955"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "f811bebb-f532-4aed-86a6-514e4ea9832b",
                  "type": "has_only_phrase",
                  "uuid": "4c71e655-27b7-4c6e-85ed-5f68facd025c"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "c48f6731-c024-4bcb-8328-94ab4495f907",
                  "type": "has_only_phrase",
                  "uuid": "65e84714-731a-4497-8b1f-a818f6d25470"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "d3aae2dd-e4f7-44a3-8a70-0e871370d354",
                  "type": "has_only_phrase",
                  "uuid": "c67f6224-99de-4a1f-92b5-8c974d7752db"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7607fca9-8968-4211-a8a5-b5f10b515cc0",
                  "name": "All Responses",
                  "uuid": "ebffe614-e357-4156-bb41-e5818f17931a"
                },
                {
                  "exit_uuid": "beda76e3-2593-4f90-9250-933244269db8",
                  "name": "I don’t have enough time",
                  "uuid": "21d31c60-c53b-4ae6-b30f-1f5978f15a9a"
                },
                {
                  "exit_uuid": "3ce2e392-f47b-47ff-a61e-104f85ffccfb",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "e58f4511-ded2-45ef-8aed-b8508d43dfe3"
                },
                {
                  "exit_uuid": "f7f44ada-5fc0-4082-b8c9-8bdb2123a1fc",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "26608b7f-e326-4041-9208-46d1bf687fcd"
                },
                {
                  "exit_uuid": "1ed718be-c303-46ac-a38e-22d7a2ca8685",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "500be142-4ff1-490f-af0b-7ea60a2d269f"
                },
                {
                  "exit_uuid": "7705686d-1a8e-4fe8-9e70-89ecfd61660b",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "c28f1e06-e9e6-43ac-8f07-bb004f2be16a"
                },
                {
                  "exit_uuid": "84777346-cde9-41f5-a5cf-b792de760881",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "f811bebb-f532-4aed-86a6-514e4ea9832b"
                },
                {
                  "exit_uuid": "b446df81-f87b-4ae3-9bed-817ba9a8a317",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "c48f6731-c024-4bcb-8328-94ab4495f907"
                },
                {
                  "exit_uuid": "0ed993e9-87e6-4ef2-b81b-1db3f694f0c9",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "d3aae2dd-e4f7-44a3-8a70-0e871370d354"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7607fca9-8968-4211-a8a5-b5f10b515cc0",
                "destination_uuid": null
              },
              {
                "uuid": "beda76e3-2593-4f90-9250-933244269db8",
                "destination_uuid": "f2376281-72a1-4898-8ca6-7c1722ef73aa"
              },
              {
                "uuid": "3ce2e392-f47b-47ff-a61e-104f85ffccfb",
                "destination_uuid": "cfa5a3a6-3e3d-410b-961d-d82a8a2839bb"
              },
              {
                "uuid": "f7f44ada-5fc0-4082-b8c9-8bdb2123a1fc",
                "destination_uuid": "a89cf7ea-609a-4968-9a41-0c086c0392d1"
              },
              {
                "uuid": "1ed718be-c303-46ac-a38e-22d7a2ca8685",
                "destination_uuid": "edc1070a-dbdc-4246-ac61-e9f1cfdf7557"
              },
              {
                "uuid": "7705686d-1a8e-4fe8-9e70-89ecfd61660b",
                "destination_uuid": "47fac3d2-b91f-46c3-aa55-cca9dfb264f0"
              },
              {
                "uuid": "84777346-cde9-41f5-a5cf-b792de760881",
                "destination_uuid": "67fb87f0-a651-47bd-8f87-132461270a7b"
              },
              {
                "uuid": "b446df81-f87b-4ae3-9bed-817ba9a8a317",
                "destination_uuid": "398a2e4a-5b7e-4ce4-bec7-ddeac503fc24"
              },
              {
                "uuid": "0ed993e9-87e6-4ef2-b81b-1db3f694f0c9",
                "destination_uuid": "b46b1759-9e09-4492-a89c-a9da187e22dd"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b3f23d31-0092-44e3-82b2-fb89bb4888e5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2f9af170-f018-4276-a888-c2d678180fb7",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "764a28f9-ce1d-4edd-badd-9ea642da5ece"
              }
            ],
            "exits": [
              {
                "uuid": "eb68444e-98ad-4bda-b3cf-9a44cdc190b1",
                "destination_uuid": "b006a671-cc8e-4393-972c-e08e47ca590d"
              }
            ]
          },
          {
            "uuid": "b006a671-cc8e-4393-972c-e08e47ca590d",
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
                "uuid": "486b4c6e-1c3a-424d-ae05-6b28a0c7791b"
              }
            ],
            "exits": [
              {
                "uuid": "ea91790e-763e-4f47-a42a-9eb71b2042c5",
                "destination_uuid": "91a19151-8514-4741-a707-b562c5767156"
              }
            ]
          },
          {
            "uuid": "91a19151-8514-4741-a707-b562c5767156",
            "actions": [],
            "exits": [
              {
                "uuid": "56f81fbb-03e9-4fb5-8298-c24c37b31399",
                "destination_uuid": "6c1fb94f-794a-4407-86da-e681814d073a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "4f0db73c-907f-4eec-8fc2-d7dae24388a7",
              "cases": [],
              "categories": [
                {
                  "uuid": "4f0db73c-907f-4eec-8fc2-d7dae24388a7",
                  "name": "All Responses",
                  "exit_uuid": "56f81fbb-03e9-4fb5-8298-c24c37b31399"
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
            "uuid": "6c1fb94f-794a-4407-86da-e681814d073a",
            "actions": [
              {
                "uuid": "7dc599c6-1791-4699-a104-5a2d0aa69e91",
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
                "uuid": "7cd711b4-28b1-431a-b99d-b24439942ad5",
                "destination_uuid": "8ae6fe21-b0ed-4ec9-86a1-526346d3b4d7"
              }
            ]
          },
          {
            "uuid": "8ae6fe21-b0ed-4ec9-86a1-526346d3b4d7",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a7edeb7b-de91-4089-8789-41cd369c18a6"
              }
            ],
            "exits": [
              {
                "uuid": "e3408c7f-4689-4245-8bff-0ff7734482cc",
                "destination_uuid": "d2d9c80c-7cf1-424d-8597-7cf9844a4cb6"
              }
            ]
          },
          {
            "uuid": "d2d9c80c-7cf1-424d-8597-7cf9844a4cb6",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "17677088-b4ea-406a-84f3-92ffc49d0013"
              }
            ],
            "exits": [
              {
                "uuid": "c5ce4fb5-ce24-45f6-94cb-027446ede0ee",
                "destination_uuid": "b5052023-eb3e-4778-b48e-e7e2c4b9113a"
              }
            ]
          },
          {
            "uuid": "b5052023-eb3e-4778-b48e-e7e2c4b9113a",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9700b5a7-cc3c-4399-aacf-1e0289368561"
              }
            ],
            "exits": [
              {
                "uuid": "bd59577a-8740-41d7-99af-f02152063a0d",
                "destination_uuid": "a589adc2-a193-42de-bdc4-a98bb3b07655"
              }
            ]
          },
          {
            "uuid": "a589adc2-a193-42de-bdc4-a98bb3b07655",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "31e0a9d3-cffa-4b46-b7a0-ba5f22029424"
              }
            ],
            "exits": [
              {
                "uuid": "a484b8d6-bd21-4dff-81a1-12c9fb6b85e4",
                "destination_uuid": "df7027c0-38ee-408e-be98-99f4f35e919b"
              }
            ]
          },
          {
            "uuid": "df7027c0-38ee-408e-be98-99f4f35e919b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "dd107c34-8573-4464-a399-b435462701a5",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "26caee37-ce7b-4ed0-832c-c717d626b994",
                  "type": "has_only_phrase",
                  "uuid": "d6a30127-7861-483f-9cc5-594cc97ac649"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4c362bbc-eb86-432d-bb23-c6114c7e45e9",
                  "name": "All Responses",
                  "uuid": "dd107c34-8573-4464-a399-b435462701a5"
                },
                {
                  "exit_uuid": "acc8bd5b-09a1-4459-9fa7-75712731fe56",
                  "name": "Let me hear your story",
                  "uuid": "26caee37-ce7b-4ed0-832c-c717d626b994"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4c362bbc-eb86-432d-bb23-c6114c7e45e9",
                "destination_uuid": null
              },
              {
                "uuid": "acc8bd5b-09a1-4459-9fa7-75712731fe56",
                "destination_uuid": "f6c7995d-3912-48e5-8ecd-fa633e6b0c12"
              }
            ]
          },
          {
            "uuid": "f6c7995d-3912-48e5-8ecd-fa633e6b0c12",
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
                "uuid": "317ec28f-3002-4797-9b2c-e697ecf2e360"
              }
            ],
            "exits": [
              {
                "uuid": "38c8a1ea-9ab5-4efb-93d9-42b19275d57d",
                "destination_uuid": "74fcdcc8-315c-43be-9f89-52f5d65744fa"
              }
            ]
          },
          {
            "uuid": "74fcdcc8-315c-43be-9f89-52f5d65744fa",
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
                "uuid": "6730dd7d-ccc6-4ae5-8e54-e58f20c0484c"
              }
            ],
            "exits": [
              {
                "uuid": "f3e84ae6-81d3-4343-82c6-18a5b9f65d92",
                "destination_uuid": "d49e2c9f-3f6c-413a-952e-7a35319092d9"
              }
            ]
          },
          {
            "uuid": "d49e2c9f-3f6c-413a-952e-7a35319092d9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "354c627e-86e9-4dbc-b0b3-ec1edc52742f",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "33764cd0-c4a6-4b2c-9368-c81a201c1f21",
                  "type": "has_only_phrase",
                  "uuid": "e6182b48-676b-4f56-b176-f1362de15470"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "879f1599-f6aa-4954-b37f-546cdc2b12a7",
                  "type": "has_only_phrase",
                  "uuid": "8f02a530-e806-4ffc-9ea6-cc7db33c8a69"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "93459637-12dd-4917-9153-de7d1213aa10",
                  "name": "All Responses",
                  "uuid": "354c627e-86e9-4dbc-b0b3-ec1edc52742f"
                },
                {
                  "exit_uuid": "f5300d09-37aa-479b-adb8-dfc4a88afaed",
                  "name": "Previous",
                  "uuid": "33764cd0-c4a6-4b2c-9368-c81a201c1f21"
                },
                {
                  "exit_uuid": "9787c392-c5c3-4ab8-8753-d3423ce68ed4",
                  "name": "Next",
                  "uuid": "879f1599-f6aa-4954-b37f-546cdc2b12a7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "93459637-12dd-4917-9153-de7d1213aa10",
                "destination_uuid": null
              },
              {
                "uuid": "f5300d09-37aa-479b-adb8-dfc4a88afaed",
                "destination_uuid": "f6c7995d-3912-48e5-8ecd-fa633e6b0c12"
              },
              {
                "uuid": "9787c392-c5c3-4ab8-8753-d3423ce68ed4",
                "destination_uuid": "f13bec0d-6651-4040-b852-fa28c50a1bb5"
              }
            ]
          },
          {
            "uuid": "f13bec0d-6651-4040-b852-fa28c50a1bb5",
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
                "uuid": "58c5795d-0156-4a9d-b676-3324e9c11104"
              }
            ],
            "exits": [
              {
                "uuid": "ca4439f2-8c49-4cd2-beb6-cf69169c3a98",
                "destination_uuid": "d550b516-7ca7-4dbc-9f91-c5391854fa99"
              }
            ]
          },
          {
            "uuid": "d550b516-7ca7-4dbc-9f91-c5391854fa99",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5a0ab72e-dcb9-44a3-b572-8adbae9f42da",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "b526d03d-b0bf-4da1-a509-e1e40ca6b77d",
                  "type": "has_only_phrase",
                  "uuid": "e9fc0e6f-375a-405b-9906-8837b04ffe0f"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b78032b9-b000-41ab-803c-5c53a7dab81e",
                  "type": "has_only_phrase",
                  "uuid": "f13fb007-d308-45cc-a5a5-2b3a606ad584"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c3a004c1-0af7-49c4-b4e8-c7640c48a84e",
                  "name": "All Responses",
                  "uuid": "5a0ab72e-dcb9-44a3-b572-8adbae9f42da"
                },
                {
                  "exit_uuid": "be49f5ab-31f1-4eba-a3ba-b9a1b34c0175",
                  "name": "Previous",
                  "uuid": "b526d03d-b0bf-4da1-a509-e1e40ca6b77d"
                },
                {
                  "exit_uuid": "949b67f7-1337-4447-af76-b08474256381",
                  "name": "Next",
                  "uuid": "b78032b9-b000-41ab-803c-5c53a7dab81e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c3a004c1-0af7-49c4-b4e8-c7640c48a84e",
                "destination_uuid": null
              },
              {
                "uuid": "be49f5ab-31f1-4eba-a3ba-b9a1b34c0175",
                "destination_uuid": "74fcdcc8-315c-43be-9f89-52f5d65744fa"
              },
              {
                "uuid": "949b67f7-1337-4447-af76-b08474256381",
                "destination_uuid": "c96f589f-78be-4167-81f1-b375ced29710"
              }
            ]
          },
          {
            "uuid": "c96f589f-78be-4167-81f1-b375ced29710",
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
                "uuid": "1b5a31f7-dafd-49fc-8549-cb1b81983071"
              }
            ],
            "exits": [
              {
                "uuid": "fd52acd3-c8af-4492-a456-8cd8f5b2e8a0",
                "destination_uuid": "cb9fb695-da78-4701-8ed1-a096035722ea"
              }
            ]
          },
          {
            "uuid": "cb9fb695-da78-4701-8ed1-a096035722ea",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "75ebdbb5-ef27-41fe-acbe-0733c2db1df3",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "44193990-2994-4ab4-b79c-46350a8b8a9d",
                  "type": "has_only_phrase",
                  "uuid": "271ee341-28a3-40c4-8aee-a3750565633d"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "de464b42-4b66-4de9-8467-0690cc7d75a4",
                  "type": "has_only_phrase",
                  "uuid": "141ca777-d618-4ac7-8df8-77b2f3fe70b5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "affc0e02-e687-4085-b818-cf1b2e6e56e7",
                  "name": "All Responses",
                  "uuid": "75ebdbb5-ef27-41fe-acbe-0733c2db1df3"
                },
                {
                  "exit_uuid": "8e9d9179-b260-4d7f-bc4d-97db4ac41613",
                  "name": "Previous",
                  "uuid": "44193990-2994-4ab4-b79c-46350a8b8a9d"
                },
                {
                  "exit_uuid": "bf00bfed-18e8-4616-ab92-4140413ce610",
                  "name": "Next",
                  "uuid": "de464b42-4b66-4de9-8467-0690cc7d75a4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "affc0e02-e687-4085-b818-cf1b2e6e56e7",
                "destination_uuid": null
              },
              {
                "uuid": "8e9d9179-b260-4d7f-bc4d-97db4ac41613",
                "destination_uuid": "f13bec0d-6651-4040-b852-fa28c50a1bb5"
              },
              {
                "uuid": "bf00bfed-18e8-4616-ab92-4140413ce610",
                "destination_uuid": "881f7d51-6c54-4791-966d-c391a50f0889"
              }
            ]
          },
          {
            "uuid": "881f7d51-6c54-4791-966d-c391a50f0889",
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
                "uuid": "62e98ed3-7669-43c2-b4aa-ad97ca01476e"
              }
            ],
            "exits": [
              {
                "uuid": "b1d40e0f-440d-4574-b566-fe955cd0ab91",
                "destination_uuid": "6a39f6df-2bed-44aa-af74-a5e002352715"
              }
            ]
          },
          {
            "uuid": "6a39f6df-2bed-44aa-af74-a5e002352715",
            "actions": [],
            "exits": [
              {
                "uuid": "39d5e7a8-029d-4228-8ad8-eca2c022e373",
                "destination_uuid": "e0fe5c51-86e8-40fd-aa4c-4758eb7ba2c3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "05c910ed-2464-48b6-8361-35fad38d5de5",
              "cases": [],
              "categories": [
                {
                  "uuid": "05c910ed-2464-48b6-8361-35fad38d5de5",
                  "name": "All Responses",
                  "exit_uuid": "39d5e7a8-029d-4228-8ad8-eca2c022e373"
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
            "uuid": "e0fe5c51-86e8-40fd-aa4c-4758eb7ba2c3",
            "actions": [
              {
                "uuid": "cdd14a28-5497-40b5-a09a-113e8753aa6f",
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
                "uuid": "65d98291-b970-4939-a4bd-caee1e2b4d73",
                "destination_uuid": "58bf9547-da1d-4318-9606-d2e666cdc739"
              }
            ]
          },
          {
            "uuid": "58bf9547-da1d-4318-9606-d2e666cdc739",
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
                "uuid": "ce642114-7534-4da0-885e-ed749546cfe8"
              }
            ],
            "exits": [
              {
                "uuid": "2f0c8a96-f5d0-4ed4-9e0b-eed17520ec3e",
                "destination_uuid": "0af1caea-b67f-4fc1-9be1-799a93db36fb"
              }
            ]
          },
          {
            "uuid": "0af1caea-b67f-4fc1-9be1-799a93db36fb",
            "actions": [],
            "exits": [
              {
                "uuid": "3ee3f77a-022c-475f-8fd1-71767247cabc",
                "destination_uuid": "1d428510-ee64-4546-95f2-26a0bf20fad4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d3737670-4b83-4cec-aa89-16a389492d70",
              "cases": [],
              "categories": [
                {
                  "uuid": "d3737670-4b83-4cec-aa89-16a389492d70",
                  "name": "All Responses",
                  "exit_uuid": "3ee3f77a-022c-475f-8fd1-71767247cabc"
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
            "uuid": "1d428510-ee64-4546-95f2-26a0bf20fad4",
            "actions": [
              {
                "uuid": "1bcf412c-70c0-4383-91f0-459731bfd750",
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
                "uuid": "56b725ea-8fee-4af7-b4e0-7c8c82ca89f0",
                "destination_uuid": "3d8beca9-778b-4320-adf1-54d3ce876ce5"
              }
            ]
          },
          {
            "uuid": "3d8beca9-778b-4320-adf1-54d3ce876ce5",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c98a1b98-35e5-4eb5-8eaf-8b2da76f91a4"
              }
            ],
            "exits": [
              {
                "uuid": "e4759846-66bc-46fa-a6ca-53f4286876fb",
                "destination_uuid": "c63e3199-4774-48c3-be8f-77654ef71c46"
              }
            ]
          },
          {
            "uuid": "c63e3199-4774-48c3-be8f-77654ef71c46",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "b5f54a04-28a5-419d-9af0-5726d8752c18"
              }
            ],
            "exits": [
              {
                "uuid": "bfb13331-2848-4f60-b56f-04b58c2abe5f",
                "destination_uuid": "dd629701-6626-4584-a348-3f06d7065150"
              }
            ]
          },
          {
            "uuid": "dd629701-6626-4584-a348-3f06d7065150",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c09d0a19-c58c-41b6-a8ec-4e0e74e9d3d2",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "25e3df1d-018a-423e-9e45-8f3d11efecd4",
                  "type": "has_only_phrase",
                  "uuid": "44f83c1a-928b-405c-9521-cbec3acc3c38"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "e9e7b381-e9af-43a4-abfd-bcc97268bbe4",
                  "type": "has_only_phrase",
                  "uuid": "c7965e3f-d330-4092-8580-ec6493c66084"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "77ad97c6-0c54-43eb-a277-7d1b9b9a6187",
                  "name": "All Responses",
                  "uuid": "c09d0a19-c58c-41b6-a8ec-4e0e74e9d3d2"
                },
                {
                  "exit_uuid": "f60463f0-e657-408f-9970-d488df9f243f",
                  "name": "Take me to Tips",
                  "uuid": "25e3df1d-018a-423e-9e45-8f3d11efecd4"
                },
                {
                  "exit_uuid": "c7ac6611-d248-429b-a969-8f82f410ee47",
                  "name": "Take me to Homescreen",
                  "uuid": "e9e7b381-e9af-43a4-abfd-bcc97268bbe4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "77ad97c6-0c54-43eb-a277-7d1b9b9a6187",
                "destination_uuid": null
              },
              {
                "uuid": "f60463f0-e657-408f-9970-d488df9f243f",
                "destination_uuid": "573b54f3-87ad-417e-b489-38b643903db6"
              },
              {
                "uuid": "c7ac6611-d248-429b-a969-8f82f410ee47",
                "destination_uuid": "a75ce2ba-0c45-4aab-9354-f1d4a362b89b"
              }
            ]
          },
          {
            "uuid": "573b54f3-87ad-417e-b489-38b643903db6",
            "actions": [
              {
                "uuid": "105513da-78f8-47a9-bb30-9bcd5f69bf23",
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
                "uuid": "a4950bdd-0584-4251-8817-08fa98d23bea",
                "destination_uuid": "2a1a4c27-be46-4da3-8241-3d1d01b347ac"
              }
            ]
          },
          {
            "uuid": "2a1a4c27-be46-4da3-8241-3d1d01b347ac",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "a218a302-abc6-4300-b694-d89526b5e6f2"
                },
                "type": "enter_flow",
                "uuid": "23d3246c-fabf-436a-ab78-f66465e86a5a"
              }
            ],
            "exits": [
              {
                "uuid": "ae69992d-175a-46e4-b770-7d74aadb3c9a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "a75ce2ba-0c45-4aab-9354-f1d4a362b89b",
            "actions": [
              {
                "uuid": "9e11ce26-2a92-4076-a147-d0bf9909de7c",
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
                "uuid": "09ba0c1e-966d-4d5e-92ef-567ef38aad68",
                "destination_uuid": "f2354b6b-2864-4db6-89b4-02267cb3b787"
              }
            ]
          },
          {
            "uuid": "f2354b6b-2864-4db6-89b4-02267cb3b787",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "497df751-7e18-4051-b034-9b3400b9f096"
                },
                "type": "enter_flow",
                "uuid": "e3000d76-d206-498a-9e67-2d899ca25d7a"
              }
            ],
            "exits": [
              {
                "uuid": "86fb647f-5947-4a79-84c6-810ef31f9684",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "26d38d22-7590-4e1e-af55-cd8553a62c0c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "89245c34-e3d3-4533-992b-09a1660fcf86",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "abb77b31-7437-46e0-b59d-5f465c5ad5ab"
              }
            ],
            "exits": [
              {
                "uuid": "4a117152-c0b8-4712-9cae-ebcbdc7f7420",
                "destination_uuid": "bb86820d-474a-4613-b1e3-cae7673079f7"
              }
            ]
          },
          {
            "uuid": "bb86820d-474a-4613-b1e3-cae7673079f7",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "352af6e9-87b2-4750-af7a-778e7d62c119"
              }
            ],
            "exits": [
              {
                "uuid": "7656db6b-ad0b-4258-9ef9-45cdd82c7e2b",
                "destination_uuid": "56a82a3b-13a2-4fba-92c8-09c98f8c61b2"
              }
            ]
          },
          {
            "uuid": "56a82a3b-13a2-4fba-92c8-09c98f8c61b2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "973606e6-ceb3-4f34-b1fc-6bd23f1b9493",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "80b53eb2-60ad-474f-a0a4-53d0b5dd589e",
                  "type": "has_only_phrase",
                  "uuid": "6944b416-6e24-4dd9-8eaa-c2c1960823bc"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "8b1e5da7-3852-4728-8d46-fa162cfb4702",
                  "type": "has_only_phrase",
                  "uuid": "4b324b8f-ef36-4774-8df3-2c09bf5bd97d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4d50d7b0-efbf-4797-8d0c-db2595dd58d0",
                  "name": "All Responses",
                  "uuid": "973606e6-ceb3-4f34-b1fc-6bd23f1b9493"
                },
                {
                  "exit_uuid": "19be9799-8842-4698-8138-299097b6c59d",
                  "name": "Later",
                  "uuid": "80b53eb2-60ad-474f-a0a4-53d0b5dd589e"
                },
                {
                  "exit_uuid": "f6dbb6d9-f3cf-48db-83db-88e020776378",
                  "name": "Yes",
                  "uuid": "8b1e5da7-3852-4728-8d46-fa162cfb4702"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4d50d7b0-efbf-4797-8d0c-db2595dd58d0",
                "destination_uuid": null
              },
              {
                "uuid": "19be9799-8842-4698-8138-299097b6c59d",
                "destination_uuid": "b548f3b3-88fd-4019-8b7d-7a15b25d1cfa"
              },
              {
                "uuid": "f6dbb6d9-f3cf-48db-83db-88e020776378",
                "destination_uuid": "15b3a903-b5fe-403e-b930-4c9ddf4f1256"
              }
            ]
          },
          {
            "uuid": "b548f3b3-88fd-4019-8b7d-7a15b25d1cfa",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "9153b44e-736e-4af9-96c7-a0816541648a"
                },
                "type": "enter_flow",
                "uuid": "1274e28d-5f7e-4f8d-86d9-1b135166677d"
              }
            ],
            "exits": [
              {
                "uuid": "8e567f35-3c53-45bd-981b-e9ccdb38d6ba",
                "destination_uuid": null
              },
              {
                "uuid": "0cd0a10c-cb3a-4b53-808f-3a26f9dfb8dc",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e8695941-b63c-48da-be82-756a75cb5bef",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "01b37cc4-fd9e-400a-8581-f4a896ea4f22"
                },
                {
                  "uuid": "23cf59b7-8744-4c69-9db6-933374b46607",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "4887c905-c367-4ddf-8d8f-e7dceefe5d56"
                }
              ],
              "categories": [
                {
                  "uuid": "01b37cc4-fd9e-400a-8581-f4a896ea4f22",
                  "name": "Complete",
                  "exit_uuid": "8e567f35-3c53-45bd-981b-e9ccdb38d6ba"
                },
                {
                  "uuid": "4887c905-c367-4ddf-8d8f-e7dceefe5d56",
                  "name": "Expired",
                  "exit_uuid": "0cd0a10c-cb3a-4b53-808f-3a26f9dfb8dc"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "01b37cc4-fd9e-400a-8581-f4a896ea4f22"
            }
          },
          {
            "uuid": "15b3a903-b5fe-403e-b930-4c9ddf4f1256",
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
                "uuid": "d0bd624b-5a43-42c2-a470-e3022edc8bd0"
              }
            ],
            "exits": [
              {
                "uuid": "1dabae2e-f2b9-4849-a6c8-6b55f0d24e27",
                "destination_uuid": "5789c8f1-65b3-4d23-af57-29c4b54698bc"
              }
            ]
          },
          {
            "uuid": "5789c8f1-65b3-4d23-af57-29c4b54698bc",
            "actions": [],
            "exits": [
              {
                "uuid": "9b335b7e-9602-4b14-bfbe-87c5d2189efa",
                "destination_uuid": "a7c0837f-d438-440c-b59d-0f6173877e8a"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d4fc67b2-3e25-4471-8730-b53bc9e5f997",
              "cases": [],
              "categories": [
                {
                  "uuid": "d4fc67b2-3e25-4471-8730-b53bc9e5f997",
                  "name": "All Responses",
                  "exit_uuid": "9b335b7e-9602-4b14-bfbe-87c5d2189efa"
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
            "uuid": "a7c0837f-d438-440c-b59d-0f6173877e8a",
            "actions": [
              {
                "uuid": "607199a3-a042-4bff-ad2c-d3eb5f1ee7a0",
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
                "uuid": "99e01812-3f4f-4b35-afa2-b296a1e8b41c",
                "destination_uuid": "bbbab2e1-e5fa-4c5a-bc5f-5054a1f2f673"
              }
            ]
          },
          {
            "uuid": "bbbab2e1-e5fa-4c5a-bc5f-5054a1f2f673",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "da346861-dd18-433f-817f-638b17191ff4"
              }
            ],
            "exits": [
              {
                "uuid": "389de8c3-28b2-464c-bf82-ce6a05621142",
                "destination_uuid": "7617d72e-4d18-4377-afc6-a313afaf95c1"
              }
            ]
          },
          {
            "uuid": "7617d72e-4d18-4377-afc6-a313afaf95c1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "73e3ff3a-b08a-4300-8385-0adc5dd6e6be",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "4effbd02-76b3-49fc-b5f3-296a2c4b1eb1",
                  "type": "has_only_phrase",
                  "uuid": "e83e0f5a-10b5-465f-a123-9a7f26ecae8c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "885020db-078e-43df-89b5-3d4ebf5bd28c",
                  "name": "All Responses",
                  "uuid": "73e3ff3a-b08a-4300-8385-0adc5dd6e6be"
                },
                {
                  "exit_uuid": "2e56c5c1-63ea-45a1-a29e-b8a87684cfbf",
                  "name": "Click here when done",
                  "uuid": "4effbd02-76b3-49fc-b5f3-296a2c4b1eb1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "885020db-078e-43df-89b5-3d4ebf5bd28c",
                "destination_uuid": null
              },
              {
                "uuid": "2e56c5c1-63ea-45a1-a29e-b8a87684cfbf",
                "destination_uuid": "9fcb2b90-39f2-4b29-9153-6ddcae40d74f"
              }
            ]
          },
          {
            "uuid": "9fcb2b90-39f2-4b29-9153-6ddcae40d74f",
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
                "uuid": "d35b82bd-342a-4ff1-bda4-57d116da8c70"
              }
            ],
            "exits": [
              {
                "uuid": "0b4d573b-71a2-4773-9418-78335ebb35db",
                "destination_uuid": "fa5ed37f-f735-4a14-89a6-164173de236b"
              }
            ]
          },
          {
            "uuid": "fa5ed37f-f735-4a14-89a6-164173de236b",
            "actions": [],
            "exits": [
              {
                "uuid": "0345f563-cbc0-4c73-bc57-1dc7f1ea0e89",
                "destination_uuid": "986514ef-27d5-48f7-b9b4-e7299ff9a0e3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f4d8c84d-aa56-40e1-8f63-576818361a2f",
              "cases": [],
              "categories": [
                {
                  "uuid": "f4d8c84d-aa56-40e1-8f63-576818361a2f",
                  "name": "All Responses",
                  "exit_uuid": "0345f563-cbc0-4c73-bc57-1dc7f1ea0e89"
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
            "uuid": "986514ef-27d5-48f7-b9b4-e7299ff9a0e3",
            "actions": [
              {
                "uuid": "40ab3599-e643-4d85-a105-6aa87f79061c",
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
                "uuid": "144ba313-3758-4627-b1d6-901270d15506",
                "destination_uuid": "f8266dab-15cb-4233-aade-12187b01f9e5"
              }
            ]
          },
          {
            "uuid": "f8266dab-15cb-4233-aade-12187b01f9e5",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "ee431502-5397-4222-ac50-fab1b510111e"
              }
            ],
            "exits": [
              {
                "uuid": "c283ae75-2898-4712-8e4c-dc30f76af03d",
                "destination_uuid": "6c312090-25d4-43c6-ade6-f1d63cb1d5c6"
              }
            ]
          },
          {
            "uuid": "6c312090-25d4-43c6-ade6-f1d63cb1d5c6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ac9754db-6dda-484e-8ac2-2d029363f3a7",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "701c7dea-0784-48c1-83e5-2c761d86edeb",
                  "type": "has_only_phrase",
                  "uuid": "2cb0cd71-580a-4f4d-887f-ee820a8b4919"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5112b52b-ed6e-4b9c-ad3a-60de40c8e2c6",
                  "name": "All Responses",
                  "uuid": "ac9754db-6dda-484e-8ac2-2d029363f3a7"
                },
                {
                  "exit_uuid": "5af2ad5c-7902-4e46-9007-2a16cfe2a8d9",
                  "name": "Click here when done",
                  "uuid": "701c7dea-0784-48c1-83e5-2c761d86edeb"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5112b52b-ed6e-4b9c-ad3a-60de40c8e2c6",
                "destination_uuid": null
              },
              {
                "uuid": "5af2ad5c-7902-4e46-9007-2a16cfe2a8d9",
                "destination_uuid": "d9a05194-fe03-4a59-a16b-51ca13acf1f1"
              }
            ]
          },
          {
            "uuid": "d9a05194-fe03-4a59-a16b-51ca13acf1f1",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4d094741-32f7-4d3a-acf1-88dac88e96ac"
              }
            ],
            "exits": [
              {
                "uuid": "31355735-4bba-41fa-af73-374ff2399feb",
                "destination_uuid": "4e5c29e4-e466-4954-ae67-bc678709aa4c"
              }
            ]
          },
          {
            "uuid": "4e5c29e4-e466-4954-ae67-bc678709aa4c",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e60d0e0d-7cf3-4411-b478-dd460feba82c"
              }
            ],
            "exits": [
              {
                "uuid": "eb8c99ba-3f79-47c5-a3c8-bb37dbfbfd11",
                "destination_uuid": "b17aeceb-9f5b-4c8d-81d0-51abb6977d09"
              }
            ]
          },
          {
            "uuid": "b17aeceb-9f5b-4c8d-81d0-51abb6977d09",
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
                "uuid": "2a2b2aa1-1d08-4787-ae57-5478c5d6783a"
              }
            ],
            "exits": [
              {
                "uuid": "253b67fd-757d-4297-bf70-a0536c1e26d4",
                "destination_uuid": "6d316106-28c6-426b-9436-75c9e41ae586"
              }
            ]
          },
          {
            "uuid": "6d316106-28c6-426b-9436-75c9e41ae586",
            "actions": [],
            "exits": [
              {
                "uuid": "3134cee9-425d-4324-8ca6-e0191ba56c72",
                "destination_uuid": "0191e236-6be2-47c8-bd7d-5be1203d1cc7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a909e42c-56d3-4c24-9367-897e760c9ecb",
              "cases": [],
              "categories": [
                {
                  "uuid": "a909e42c-56d3-4c24-9367-897e760c9ecb",
                  "name": "All Responses",
                  "exit_uuid": "3134cee9-425d-4324-8ca6-e0191ba56c72"
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
            "uuid": "0191e236-6be2-47c8-bd7d-5be1203d1cc7",
            "actions": [
              {
                "uuid": "4dbf0c14-defa-4cc4-a396-bfa9b4600a8a",
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
                "uuid": "4269a5fb-a9a0-4e9b-a023-1eacd97855d0",
                "destination_uuid": "95d4286f-32c3-45d9-b223-e34661b794e0"
              }
            ]
          },
          {
            "uuid": "95d4286f-32c3-45d9-b223-e34661b794e0",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "8fa09419-3496-4076-af10-f887c175dd61"
              }
            ],
            "exits": [
              {
                "uuid": "139c4934-7062-4793-82c7-420c192f07c1",
                "destination_uuid": "d88e590b-4357-4f1c-8c49-a9ef9c641a9d"
              }
            ]
          },
          {
            "uuid": "d88e590b-4357-4f1c-8c49-a9ef9c641a9d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c779b66f-172b-4277-8d73-e06eef8e357a",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "304cc3c7-d536-41ee-afd9-f90524f55c4d",
                  "type": "has_only_phrase",
                  "uuid": "f4acdef0-63ff-4e74-bd2e-cc0758e49d7b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d9c11b74-fbaf-426a-a9ba-e123fb380a8a",
                  "name": "All Responses",
                  "uuid": "c779b66f-172b-4277-8d73-e06eef8e357a"
                },
                {
                  "exit_uuid": "e9fe835a-4fc9-40ff-a2ab-37ebb953c8bc",
                  "name": "Take me to Homescreen",
                  "uuid": "304cc3c7-d536-41ee-afd9-f90524f55c4d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d9c11b74-fbaf-426a-a9ba-e123fb380a8a",
                "destination_uuid": null
              },
              {
                "uuid": "e9fe835a-4fc9-40ff-a2ab-37ebb953c8bc",
                "destination_uuid": "e9d1a837-de08-44d1-8fa3-2afe881f1c3f"
              }
            ]
          },
          {
            "uuid": "e9d1a837-de08-44d1-8fa3-2afe881f1c3f",
            "actions": [
              {
                "uuid": "df216d78-f7a3-4768-a71a-80644352b18e",
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
                "uuid": "96a38315-d96f-4f9f-9ef4-f7dd0a4ed189",
                "destination_uuid": "b3d87909-117a-417f-a4eb-3c265414e197"
              }
            ]
          },
          {
            "uuid": "b3d87909-117a-417f-a4eb-3c265414e197",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "ea335b41-608b-4508-bd60-501f6191aa20"
                },
                "type": "enter_flow",
                "uuid": "aa4faad5-f35d-434f-958b-82cb38304b0c"
              }
            ],
            "exits": [
              {
                "uuid": "de691234-8e56-43e5-8267-e5df8bf9c41a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "10e0fc4d-63b3-49e6-9c1a-dab8625aa32d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c621b8b0-1599-460f-85d7-df4a444ec0d4",
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
                "uuid": "f0cd6074-5383-4884-a2e6-1bd97f9db300"
              }
            ],
            "exits": [
              {
                "uuid": "abfdaaea-e2a5-433b-9c4c-205366a0847f",
                "destination_uuid": "1699dc1d-2ea0-4234-86d7-ca7378ea8bd6"
              }
            ]
          },
          {
            "uuid": "1699dc1d-2ea0-4234-86d7-ca7378ea8bd6",
            "actions": [],
            "exits": [
              {
                "uuid": "4d4dd68e-67fb-4bb1-b783-9669aa2d6c45",
                "destination_uuid": "96d4117b-cfa3-401f-a584-b3b8481bca9c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "51a8912e-073c-4db9-abf9-61a5ba7163d0",
              "cases": [],
              "categories": [
                {
                  "uuid": "51a8912e-073c-4db9-abf9-61a5ba7163d0",
                  "name": "All Responses",
                  "exit_uuid": "4d4dd68e-67fb-4bb1-b783-9669aa2d6c45"
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
            "uuid": "96d4117b-cfa3-401f-a584-b3b8481bca9c",
            "actions": [
              {
                "uuid": "3279642a-75ad-4377-86a5-607080da0853",
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
                "uuid": "7e12b6e0-4e13-488a-b387-545177be6dcf",
                "destination_uuid": "93260369-d4b7-4fc7-95c9-08c7a9d54da9"
              }
            ]
          },
          {
            "uuid": "93260369-d4b7-4fc7-95c9-08c7a9d54da9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "488b511c-f1d7-4fd2-b252-5798ac2203a6",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "8399e16d-7918-4f1e-a78a-116f868b8b9e",
                  "type": "has_only_phrase",
                  "uuid": "7d3e9b5d-c9aa-4ef3-8529-0af0e81dc369"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "180bf0f9-5a53-4b12-bf91-c91eb9f736e3",
                  "type": "has_only_phrase",
                  "uuid": "556099c5-79c4-4c0a-8f78-fee865f1076b"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "180bf0f9-5a53-4b12-bf91-c91eb9f736e3",
                  "type": "has_only_phrase",
                  "uuid": "b2ee4768-97c4-47bb-bd73-0fbd91f570a8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b091c015-22f1-4c9d-8590-caa49bf0c4b0",
                  "name": "All Responses",
                  "uuid": "488b511c-f1d7-4fd2-b252-5798ac2203a6"
                },
                {
                  "exit_uuid": "cff0dac0-0210-4479-8579-56a3e7b691d1",
                  "name": "Great",
                  "uuid": "8399e16d-7918-4f1e-a78a-116f868b8b9e"
                },
                {
                  "exit_uuid": "5d6bc3fb-7f31-42a7-a822-ce16f6741189",
                  "name": "Neutral; Bad",
                  "uuid": "180bf0f9-5a53-4b12-bf91-c91eb9f736e3"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "b091c015-22f1-4c9d-8590-caa49bf0c4b0",
                "destination_uuid": null
              },
              {
                "uuid": "cff0dac0-0210-4479-8579-56a3e7b691d1",
                "destination_uuid": "75a8119c-4b84-400f-b9b6-7cc11f8bf445"
              },
              {
                "uuid": "5d6bc3fb-7f31-42a7-a822-ce16f6741189",
                "destination_uuid": "41b31f98-956c-4b4d-9f6a-5bbab609c3bd"
              }
            ]
          },
          {
            "uuid": "75a8119c-4b84-400f-b9b6-7cc11f8bf445",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "3cd11205-cd8a-4f24-9e05-4ce0cf6aff54"
              }
            ],
            "exits": [
              {
                "uuid": "73c3047e-c739-4ced-b5b6-6e54a0dcacaf",
                "destination_uuid": "c5b3f63c-f22f-403c-a529-a6c984f3ad8e"
              }
            ]
          },
          {
            "uuid": "41b31f98-956c-4b4d-9f6a-5bbab609c3bd",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "d508d60f-a9cf-4c3e-9418-e9ac745b45d5"
              }
            ],
            "exits": [
              {
                "uuid": "b56ebe56-ba40-406b-af6c-53220d6ac4e6",
                "destination_uuid": "48a76169-9890-4891-be1c-663bef746b03"
              }
            ]
          },
          {
            "uuid": "48a76169-9890-4891-be1c-663bef746b03",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "19806c8b-1962-4018-8244-8b28dff099d5",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "645ad696-d2f6-421b-9bc7-bf77b3ba47d3",
                  "type": "has_only_phrase",
                  "uuid": "3ce4814c-cc37-4f15-9035-10ca58aee840"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "d236553a-726d-4616-8854-083f59dd9e97",
                  "type": "has_only_phrase",
                  "uuid": "1e3ba9ef-13e5-4a02-b177-a31f676aaef9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6a1d0865-4c43-4267-9de3-7949a9af942d",
                  "name": "All Responses",
                  "uuid": "19806c8b-1962-4018-8244-8b28dff099d5"
                },
                {
                  "exit_uuid": "5c1f0ac4-9c1f-43c3-bab7-dcefec67483c",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "645ad696-d2f6-421b-9bc7-bf77b3ba47d3"
                },
                {
                  "exit_uuid": "75ae3936-1428-4a1e-b87f-25f2070f9a8d",
                  "name": "Continue",
                  "uuid": "d236553a-726d-4616-8854-083f59dd9e97"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6a1d0865-4c43-4267-9de3-7949a9af942d",
                "destination_uuid": null
              },
              {
                "uuid": "5c1f0ac4-9c1f-43c3-bab7-dcefec67483c",
                "destination_uuid": "18eac277-0795-4baf-a2cf-137402dc9970"
              },
              {
                "uuid": "75ae3936-1428-4a1e-b87f-25f2070f9a8d",
                "destination_uuid": "e2be411c-1099-430e-af64-293f063edcbd"
              }
            ]
          },
          {
            "uuid": "18eac277-0795-4baf-a2cf-137402dc9970",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "3224cec6-4d49-46a6-9e93-58ba2964f2a7"
                },
                "type": "enter_flow",
                "uuid": "b4e384a4-abef-4ab0-855f-3f86aaa893c6"
              }
            ],
            "exits": [
              {
                "uuid": "ffea9e21-c8c1-438c-99f7-7514bbb4d120",
                "destination_uuid": "941f1658-e52d-4bae-99c7-120156203dea"
              },
              {
                "uuid": "743ccf69-00c2-467b-b260-9c706e5420ad",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "60a59b1b-1f01-43bd-8444-1017a6d02522",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "f297ed5f-469c-41f4-a594-6e818fc097a4"
                },
                {
                  "uuid": "a4173d11-c9ed-4d70-9073-0ccd93105393",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b5179c35-101f-46b3-8be4-695af3395fed"
                }
              ],
              "categories": [
                {
                  "uuid": "f297ed5f-469c-41f4-a594-6e818fc097a4",
                  "name": "Complete",
                  "exit_uuid": "ffea9e21-c8c1-438c-99f7-7514bbb4d120"
                },
                {
                  "uuid": "b5179c35-101f-46b3-8be4-695af3395fed",
                  "name": "Expired",
                  "exit_uuid": "743ccf69-00c2-467b-b260-9c706e5420ad"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "f297ed5f-469c-41f4-a594-6e818fc097a4"
            }
          },
          {
            "uuid": "c5b3f63c-f22f-403c-a529-a6c984f3ad8e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fea55481-3cd8-4225-a8e1-1cabd35ad85c",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "06319bcb-7a1d-4387-bf0c-c49c46f1bf5e",
                  "type": "has_only_phrase",
                  "uuid": "eb3907fb-e9ee-48cd-9a74-04495d5631ae"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "96d82cf4-fbbb-44f6-aca9-a1f36fa68132",
                  "name": "All Responses",
                  "uuid": "fea55481-3cd8-4225-a8e1-1cabd35ad85c"
                },
                {
                  "exit_uuid": "7623cc9f-29cc-437a-ba05-4c882958df0f",
                  "name": "Go to Praise check-in",
                  "uuid": "06319bcb-7a1d-4387-bf0c-c49c46f1bf5e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "96d82cf4-fbbb-44f6-aca9-a1f36fa68132",
                "destination_uuid": null
              },
              {
                "uuid": "7623cc9f-29cc-437a-ba05-4c882958df0f",
                "destination_uuid": "cb8b0a77-95b0-4f0f-a13d-3ca0b212bb9c"
              }
            ]
          },
          {
            "uuid": "cb8b0a77-95b0-4f0f-a13d-3ca0b212bb9c",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "d635b76b-04c1-4b7a-b681-145671c79480"
              }
            ],
            "exits": [
              {
                "uuid": "78046a03-9c01-4c06-b878-a42df079ccd2",
                "destination_uuid": "6733dece-d022-483e-9208-42c2387b9015"
              }
            ]
          },
          {
            "uuid": "e2be411c-1099-430e-af64-293f063edcbd",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "777ee443-a707-4157-96b1-aec033589633"
              }
            ],
            "exits": [
              {
                "uuid": "88afd721-3c29-4c60-b8b1-c9f6bf0bc13b",
                "destination_uuid": "6733dece-d022-483e-9208-42c2387b9015"
              }
            ]
          },
          {
            "uuid": "941f1658-e52d-4bae-99c7-120156203dea",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c3e163b2-cf20-4975-b0e0-529655b3a7ac"
              }
            ],
            "exits": [
              {
                "uuid": "69399a3d-e219-4449-aa86-4d3affc37e8a",
                "destination_uuid": "6733dece-d022-483e-9208-42c2387b9015"
              }
            ]
          },
          {
            "uuid": "6733dece-d022-483e-9208-42c2387b9015",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4a762478-80d7-4a28-80d0-ec8182c1e4e1",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "e24ff162-e7e5-4214-a6ac-b391e3f7cdb4",
                  "type": "has_only_phrase",
                  "uuid": "b45e5432-c6a7-463e-8872-b79dff916dd6"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "a2897ef2-f7b7-4960-9c8c-567d05e70013",
                  "type": "has_only_phrase",
                  "uuid": "3a4c116b-1a17-4b1d-bd04-f4b77407f5ec"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "9b736a12-a1ee-41cc-9081-5293acfe809e",
                  "type": "has_only_phrase",
                  "uuid": "858a4a86-8843-47e9-913d-9302971864a5"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "3650b7b5-23db-4b21-b96b-8226e48b6b22",
                  "type": "has_only_phrase",
                  "uuid": "e1bcf857-4abe-4c7f-8a3f-78b795c1110d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f77a43e1-675e-40b3-af44-c03acf318347",
                  "name": "All Responses",
                  "uuid": "4a762478-80d7-4a28-80d0-ec8182c1e4e1"
                },
                {
                  "exit_uuid": "6e25dd97-51dd-4923-8cbe-e0eb289be510",
                  "name": "No",
                  "uuid": "e24ff162-e7e5-4214-a6ac-b391e3f7cdb4"
                },
                {
                  "exit_uuid": "cfe6f9b9-079e-4584-b6d9-a563dbfed0ef",
                  "name": "Yes",
                  "uuid": "a2897ef2-f7b7-4960-9c8c-567d05e70013"
                },
                {
                  "exit_uuid": "88a73e0e-7153-4aca-8e8f-088f4c4d8755",
                  "name": "Yes",
                  "uuid": "9b736a12-a1ee-41cc-9081-5293acfe809e"
                },
                {
                  "exit_uuid": "9d5adde3-93c5-4223-a2f1-ea8ffa0d7f16",
                  "name": "Yes",
                  "uuid": "3650b7b5-23db-4b21-b96b-8226e48b6b22"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f77a43e1-675e-40b3-af44-c03acf318347",
                "destination_uuid": null
              },
              {
                "uuid": "6e25dd97-51dd-4923-8cbe-e0eb289be510",
                "destination_uuid": "3730f534-22f7-4f26-a231-f263feef919f"
              },
              {
                "uuid": "cfe6f9b9-079e-4584-b6d9-a563dbfed0ef",
                "destination_uuid": "08f2a313-d9a8-43f1-95db-3ba02ac94f5b"
              },
              {
                "uuid": "88a73e0e-7153-4aca-8e8f-088f4c4d8755",
                "destination_uuid": "08f2a313-d9a8-43f1-95db-3ba02ac94f5b"
              },
              {
                "uuid": "9d5adde3-93c5-4223-a2f1-ea8ffa0d7f16",
                "destination_uuid": "08f2a313-d9a8-43f1-95db-3ba02ac94f5b"
              }
            ]
          },
          {
            "uuid": "3730f534-22f7-4f26-a231-f263feef919f",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "87c0816e-3498-498a-9086-8348bc7ecdbb"
              }
            ],
            "exits": [
              {
                "uuid": "c0e20abe-4a18-43d8-bf2c-3d21b65c579f",
                "destination_uuid": "67b2f7c7-88e8-4153-b0a3-bd3f023fa89a"
              }
            ]
          },
          {
            "uuid": "08f2a313-d9a8-43f1-95db-3ba02ac94f5b",
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
                "uuid": "daf31119-fbda-4526-8487-46bd27d955f2"
              }
            ],
            "exits": [
              {
                "uuid": "ba5cfa7e-e3d8-40d3-b218-705adb4bc345",
                "destination_uuid": "c0b96689-834b-4eba-b28c-3701a59e08c4"
              }
            ]
          },
          {
            "uuid": "c0b96689-834b-4eba-b28c-3701a59e08c4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "91226a4e-5519-4c2b-b520-cf35968a182a",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "50c6621b-08a9-4edb-96b8-8adaa30ba0b7",
                  "type": "has_only_phrase",
                  "uuid": "0f12120d-31d6-4016-bb4e-c928ac4681b4"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "6f6f27fd-49aa-45c4-b240-8a7f17a6b41a",
                  "type": "has_only_phrase",
                  "uuid": "09478f5a-684a-47db-93b5-701a56d6708a"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "8515a1a8-2d3a-4c6e-8546-43fef0a8f740",
                  "type": "has_only_phrase",
                  "uuid": "4daff222-5dbb-416b-b297-262d345fc376"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "9dc02709-5f92-4e5b-97c7-599ea682b997",
                  "type": "has_only_phrase",
                  "uuid": "31d0e4b6-55ba-4432-91fa-b42d762b9741"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "35459936-a5b5-43db-8dc6-0eb14b707964",
                  "name": "All Responses",
                  "uuid": "91226a4e-5519-4c2b-b520-cf35968a182a"
                },
                {
                  "exit_uuid": "ed8becf7-01a7-4064-9c7c-5e335adfe07d",
                  "name": "Surprised",
                  "uuid": "50c6621b-08a9-4edb-96b8-8adaa30ba0b7"
                },
                {
                  "exit_uuid": "f5b67e9e-829b-455b-a6af-6151d1fc4f29",
                  "name": "Happy",
                  "uuid": "6f6f27fd-49aa-45c4-b240-8a7f17a6b41a"
                },
                {
                  "exit_uuid": "57febe37-983d-4430-9cca-faf0552fb384",
                  "name": "My teen did not like it",
                  "uuid": "8515a1a8-2d3a-4c6e-8546-43fef0a8f740"
                },
                {
                  "exit_uuid": "33e5f446-3d19-4642-8df3-8d1ee5b3d4fe",
                  "name": "I don’t know",
                  "uuid": "9dc02709-5f92-4e5b-97c7-599ea682b997"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "35459936-a5b5-43db-8dc6-0eb14b707964",
                "destination_uuid": null
              },
              {
                "uuid": "ed8becf7-01a7-4064-9c7c-5e335adfe07d",
                "destination_uuid": "1d0b8cf8-0652-4874-8464-7d396c238f64"
              },
              {
                "uuid": "f5b67e9e-829b-455b-a6af-6151d1fc4f29",
                "destination_uuid": "b545af96-4b29-49f1-8ae3-73067831f443"
              },
              {
                "uuid": "57febe37-983d-4430-9cca-faf0552fb384",
                "destination_uuid": "245c6526-a678-4bd6-9164-5d63f3106aa9"
              },
              {
                "uuid": "33e5f446-3d19-4642-8df3-8d1ee5b3d4fe",
                "destination_uuid": "deefcffe-974a-47e6-8d61-c40b9cbfa185"
              }
            ]
          },
          {
            "uuid": "1d0b8cf8-0652-4874-8464-7d396c238f64",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "da3fdc85-d5dc-4b30-bab9-cb97e249a7dc"
              }
            ],
            "exits": [
              {
                "uuid": "b7b8f938-b826-4fae-a842-534e2f72e45b",
                "destination_uuid": "23abbcd0-40fb-436c-a964-f12a7b06ce35"
              }
            ]
          },
          {
            "uuid": "b545af96-4b29-49f1-8ae3-73067831f443",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cfd7b533-9b81-4a27-94e1-3f3dae249a2a"
              }
            ],
            "exits": [
              {
                "uuid": "510acb6b-53cb-45e4-a083-cad77d65948a",
                "destination_uuid": "23abbcd0-40fb-436c-a964-f12a7b06ce35"
              }
            ]
          },
          {
            "uuid": "245c6526-a678-4bd6-9164-5d63f3106aa9",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5b06187a-8c40-44b0-bcc2-acd6de8bda1b"
              }
            ],
            "exits": [
              {
                "uuid": "0b275abf-5cd9-4e9a-bcec-14849cb8d324",
                "destination_uuid": "23abbcd0-40fb-436c-a964-f12a7b06ce35"
              }
            ]
          },
          {
            "uuid": "deefcffe-974a-47e6-8d61-c40b9cbfa185",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "503119e3-78f8-4acf-9194-f3136eae880e"
              }
            ],
            "exits": [
              {
                "uuid": "d6455027-6057-42d4-a51c-55c39b66633c",
                "destination_uuid": "23abbcd0-40fb-436c-a964-f12a7b06ce35"
              }
            ]
          },
          {
            "uuid": "23abbcd0-40fb-436c-a964-f12a7b06ce35",
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
                "uuid": "f7a9661e-25bf-4438-bf25-fe5339ba9a44"
              }
            ],
            "exits": [
              {
                "uuid": "074ac9a3-ba52-4d6b-a63f-400a546c1140",
                "destination_uuid": "f2c27367-ae17-484f-a18e-d4b706824934"
              }
            ]
          },
          {
            "uuid": "f2c27367-ae17-484f-a18e-d4b706824934",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "39027b33-27ad-4298-8c37-aabb246b1f20",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "7274f5fc-95a3-4464-84f6-15fad828e27c",
                  "type": "has_only_phrase",
                  "uuid": "9508f1cb-d85c-4c25-8c7d-04b42358cc67"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "7274f5fc-95a3-4464-84f6-15fad828e27c",
                  "type": "has_only_phrase",
                  "uuid": "474263ee-5516-4f2b-97f2-2f073cb4dece"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "ec0adf4a-88e2-4c94-8009-9b1a48e63196",
                  "type": "has_only_phrase",
                  "uuid": "8758d902-87a1-4cb6-b09e-c19cecc7ed4f"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "ec0adf4a-88e2-4c94-8009-9b1a48e63196",
                  "type": "has_only_phrase",
                  "uuid": "2e65a6c5-c8fc-44ed-aef8-2bb528a493c3"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7754ee3a-dea8-4cc0-bbfb-ad1652e683c7",
                  "name": "All Responses",
                  "uuid": "39027b33-27ad-4298-8c37-aabb246b1f20"
                },
                {
                  "exit_uuid": "6ac2e2b7-b4c0-4dcf-9d64-8b26ba174ba1",
                  "name": "Every day; Almost every day",
                  "uuid": "7274f5fc-95a3-4464-84f6-15fad828e27c"
                },
                {
                  "exit_uuid": "b75b0820-7abc-4b84-8b1a-834d2fb6b05d",
                  "name": "A few days; Never",
                  "uuid": "ec0adf4a-88e2-4c94-8009-9b1a48e63196"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7754ee3a-dea8-4cc0-bbfb-ad1652e683c7",
                "destination_uuid": null
              },
              {
                "uuid": "6ac2e2b7-b4c0-4dcf-9d64-8b26ba174ba1",
                "destination_uuid": "40cb1d57-d1f9-4ce6-99ac-694d68c8f28f"
              },
              {
                "uuid": "b75b0820-7abc-4b84-8b1a-834d2fb6b05d",
                "destination_uuid": "c163bba1-37a7-46a4-b851-659089506251"
              }
            ]
          },
          {
            "uuid": "40cb1d57-d1f9-4ce6-99ac-694d68c8f28f",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "babb4a96-009f-4e71-90f5-38cca4d77fef"
              }
            ],
            "exits": [
              {
                "uuid": "9b3977e3-6ee8-4bc2-b7ee-eb39c21aae96",
                "destination_uuid": "67b2f7c7-88e8-4153-b0a3-bd3f023fa89a"
              }
            ]
          },
          {
            "uuid": "c163bba1-37a7-46a4-b851-659089506251",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1e477d7e-f2d2-4874-b8a4-4cb170a694c8"
              }
            ],
            "exits": [
              {
                "uuid": "4adb7ab2-ad0b-40a1-bf71-3422df091cfb",
                "destination_uuid": "67b2f7c7-88e8-4153-b0a3-bd3f023fa89a"
              }
            ]
          },
          {
            "uuid": "67b2f7c7-88e8-4153-b0a3-bd3f023fa89a",
            "actions": [
              {
                "uuid": "c0a82ffa-e53f-4dbb-8e56-042489337c11",
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
                "uuid": "1f40b3d6-babd-4e52-a367-b0673a96edac",
                "destination_uuid": "38d6e2ff-eb5e-488d-93c0-7fe55201b2aa"
              }
            ]
          },
          {
            "uuid": "38d6e2ff-eb5e-488d-93c0-7fe55201b2aa",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "9f9d91c8-bc90-4638-af2f-7eb12216c431"
                },
                "type": "enter_flow",
                "uuid": "33bb43bf-0fbb-4eb1-8e88-402e4930df2b"
              }
            ],
            "exits": [
              {
                "uuid": "f0453cb2-36c2-4002-bb19-f8f93a97cdc9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6eb0c131-99bd-4850-a27e-fe310e6eee3d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f7b23587-a4aa-4c7e-991d-701f1c90348b",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "17dc9728-c775-4243-ba7b-9ed77f1da9b3"
              }
            ],
            "exits": [
              {
                "uuid": "6bf6f391-2ad4-4e75-993b-69c97bd236b3",
                "destination_uuid": "afdb8fca-0f12-4387-b4af-4883b5412d42"
              }
            ]
          },
          {
            "uuid": "afdb8fca-0f12-4387-b4af-4883b5412d42",
            "actions": [
              {
                "uuid": "df348410-b998-44e6-8a3c-f903ec3c12f5",
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
                "uuid": "1ab4ca2c-65b8-4a8b-a152-79fafdb753fa",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "659cfa65-e41b-4b96-bc07-4925d998f27f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "677fc69b-93e3-4d3a-8888-f99bae35ebf7",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f39b5753-3c23-4c18-a7c9-19f464743077"
              }
            ],
            "exits": [
              {
                "uuid": "48fe08f3-6517-4b43-a568-33f8cf08e42d",
                "destination_uuid": "33ca4ad7-8721-406f-be9e-025da7cb6d5f"
              }
            ]
          },
          {
            "uuid": "33ca4ad7-8721-406f-be9e-025da7cb6d5f",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "093b0315-8248-4c33-b2a6-c788c9133371"
              }
            ],
            "exits": [
              {
                "uuid": "f30606bd-992b-4048-a3cd-092b03d6d8ea",
                "destination_uuid": "70ef6076-936a-4673-9be3-c8744b6637d7"
              }
            ]
          },
          {
            "uuid": "70ef6076-936a-4673-9be3-c8744b6637d7",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b89fc472-5e60-4f31-ae08-73ed97d26df3"
              }
            ],
            "exits": [
              {
                "uuid": "ea6b026d-7e9d-45c9-b5c4-4d683428764b",
                "destination_uuid": "22832775-63fc-4c20-acb6-5f9136b1a667"
              }
            ]
          },
          {
            "uuid": "22832775-63fc-4c20-acb6-5f9136b1a667",
            "actions": [
              {
                "uuid": "09fea4b0-3c74-442c-b287-f08537a17377",
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
                "uuid": "f252a342-c48e-414d-8898-42c17cd52056",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4e3fd184-adf8-4d86-bade-b63c04403578",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "91a7fb5b-e94a-47b5-9e6b-da021a06574c",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bef8f29c-34cd-49ad-8cb0-872ee9666831"
              }
            ],
            "exits": [
              {
                "uuid": "53fbad3f-761a-46f0-b9ce-821d361ae905",
                "destination_uuid": "30dbe4e4-67d0-4ecc-90f5-5a71fff020bb"
              }
            ]
          },
          {
            "uuid": "30dbe4e4-67d0-4ecc-90f5-5a71fff020bb",
            "actions": [
              {
                "uuid": "be3d1879-8ca7-42e8-9cfb-fa67cc0f7ded",
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
                "uuid": "e135ca3d-5686-426d-8eca-9a6c16e56f23",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "83f0f39e-8e7e-4a07-a515-0b7cfebc4ffb",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "020e6ae0-5e0e-4e31-afa7-b03ad69627de",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "80a51c87-56cb-45a3-9b2d-14a0d04bbf45"
              }
            ],
            "exits": [
              {
                "uuid": "93250935-f561-40b1-a608-17d7a96f7149",
                "destination_uuid": "63c8d004-b04a-496e-8f2e-62f9ffdb17f3"
              }
            ]
          },
          {
            "uuid": "63c8d004-b04a-496e-8f2e-62f9ffdb17f3",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c9126bf5-8330-402d-bea2-ece76685e327"
              }
            ],
            "exits": [
              {
                "uuid": "b56e8291-f04c-4c50-a073-052a8dce3364",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "8d47dc26-0575-4bea-98ed-7012629ba3aa",
            "actions": [
              {
                "uuid": "fab13889-6f81-4a1b-8870-8e41f9c453c1",
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
                "uuid": "09a3093f-9be8-4488-a14b-fd48fb3d4664",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "190fa869-ed25-4ef7-a6d7-22dd533ba3c5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "20d0fdab-aab3-43ce-b3a6-e5241c5122d4",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5407003e-37ea-41db-af8f-b5c9bf6d668e"
              }
            ],
            "exits": [
              {
                "uuid": "e522c1dc-c57e-493b-9f80-a160ecbd5eda",
                "destination_uuid": "298f6418-6ced-4f99-90de-5893fecf4a11"
              }
            ]
          },
          {
            "uuid": "298f6418-6ced-4f99-90de-5893fecf4a11",
            "actions": [
              {
                "uuid": "ca62f733-833f-4b29-87f0-3cc4af51767b",
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
                "uuid": "07f2a75d-45b7-4792-bf7e-a1bc10dd5281",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "df33d9e0-5736-45ff-a5eb-56ec3b74848e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c5c10a34-b3d7-4e7b-b4ca-82b5cd010645",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "478baf72-538e-45b8-a101-36b6f3ea6ac0"
                },
                "type": "enter_flow",
                "uuid": "9357a836-ac33-4898-9c18-f636429817eb"
              }
            ],
            "exits": [
              {
                "uuid": "85603e9f-6fc1-4776-bf92-9a2b3aae2779",
                "destination_uuid": "8a8d5327-6276-411f-98f9-f9eda6895e76"
              },
              {
                "uuid": "86b59fd7-a237-47fb-85d4-b765de6a81ad",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "4178c9bf-0449-4156-aad3-10935b5984db",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a295b3d3-fc9e-487c-8c85-bd5dcf4b1639"
                },
                {
                  "uuid": "ba31be8c-2b4b-4400-90b4-b98259bceca7",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2acd3a45-02bd-4414-b8e0-252a603512ac"
                }
              ],
              "categories": [
                {
                  "uuid": "a295b3d3-fc9e-487c-8c85-bd5dcf4b1639",
                  "name": "Complete",
                  "exit_uuid": "85603e9f-6fc1-4776-bf92-9a2b3aae2779"
                },
                {
                  "uuid": "2acd3a45-02bd-4414-b8e0-252a603512ac",
                  "name": "Expired",
                  "exit_uuid": "86b59fd7-a237-47fb-85d4-b765de6a81ad"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a295b3d3-fc9e-487c-8c85-bd5dcf4b1639"
            }
          },
          {
            "uuid": "8a8d5327-6276-411f-98f9-f9eda6895e76",
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
                "uuid": "5a91d234-25fb-42ac-a07c-25e35e34577f"
              }
            ],
            "exits": [
              {
                "uuid": "f4a2ba31-2008-4366-8bee-26406dd5de99",
                "destination_uuid": "55921616-8401-4a75-86df-910e8129759f"
              }
            ]
          },
          {
            "uuid": "55921616-8401-4a75-86df-910e8129759f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7f67e686-f3a8-407e-9fe6-f1371a11b6b4",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "83904b20-b61f-4b2f-a5d8-57f512abc4f5",
                  "type": "has_only_phrase",
                  "uuid": "12b75ae8-1c44-493d-ae4b-4bb8c5b5711d"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "110173ae-f971-4e22-98f9-36f4a67732b4",
                  "type": "has_only_phrase",
                  "uuid": "f0780b7c-4377-4ef9-8803-942c5c3ae191"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "bc29d96d-f7d4-496c-8b53-6dd618a9d784",
                  "type": "has_only_phrase",
                  "uuid": "876b01fa-fc68-42c2-bd9b-960a2fcfd593"
                },
                {
                  "arguments": [
                    "first app opening"
                  ],
                  "category_uuid": "296fc249-f457-4db3-bc5a-a382c957e998",
                  "type": "has_only_phrase",
                  "uuid": "274c523d-00aa-405c-a004-a80d9dca2b0b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "bcfb5577-5913-4b3f-9e0f-a4e2d2d18475",
                  "name": "All Responses",
                  "uuid": "7f67e686-f3a8-407e-9fe6-f1371a11b6b4"
                },
                {
                  "exit_uuid": "d2afc497-567c-4081-9854-d6fbe70f513d",
                  "name": "welcome",
                  "uuid": "83904b20-b61f-4b2f-a5d8-57f512abc4f5"
                },
                {
                  "exit_uuid": "2ec8076f-c67c-460e-bdaa-b1c644f3d284",
                  "name": "1on1",
                  "uuid": "110173ae-f971-4e22-98f9-36f4a67732b4"
                },
                {
                  "exit_uuid": "567073ac-fef7-4c92-a880-25925017a0a2",
                  "name": "praise",
                  "uuid": "bc29d96d-f7d4-496c-8b53-6dd618a9d784"
                },
                {
                  "exit_uuid": "92d97d99-865b-494d-bc59-95394b9ba616",
                  "name": "first app opening",
                  "uuid": "296fc249-f457-4db3-bc5a-a382c957e998"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "bcfb5577-5913-4b3f-9e0f-a4e2d2d18475",
                "destination_uuid": null
              },
              {
                "uuid": "d2afc497-567c-4081-9854-d6fbe70f513d",
                "destination_uuid": "e2cda3d8-0624-4867-af4a-ee0e2ccd9e9a"
              },
              {
                "uuid": "2ec8076f-c67c-460e-bdaa-b1c644f3d284",
                "destination_uuid": "7fbb86c5-a957-4ec4-adf8-e98077cd2a81"
              },
              {
                "uuid": "567073ac-fef7-4c92-a880-25925017a0a2",
                "destination_uuid": "70a6bc55-2cfd-46f1-81c8-ead65cefc724"
              },
              {
                "uuid": "92d97d99-865b-494d-bc59-95394b9ba616",
                "destination_uuid": "649fef08-4022-4ed5-aaaf-a56087811bae"
              }
            ]
          },
          {
            "uuid": "e2cda3d8-0624-4867-af4a-ee0e2ccd9e9a",
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
                "uuid": "35c82b17-9459-4a11-a25c-56d361f9e6e7"
              }
            ],
            "exits": [
              {
                "uuid": "9878d562-2a53-4a50-8080-9572a53578a1",
                "destination_uuid": "84ac778c-c671-41ab-8043-4f128beb49c4"
              }
            ]
          },
          {
            "uuid": "84ac778c-c671-41ab-8043-4f128beb49c4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "725670df-27fa-4f77-8e09-02a3f69d5fc7",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "f07038e3-b6a3-4b13-a6ff-050cacc3b558",
                  "type": "has_only_phrase",
                  "uuid": "10642946-3a11-45f5-941c-6868976797d9"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "adccccf8-817c-4010-996d-7ca55986acb4",
                  "type": "has_only_phrase",
                  "uuid": "06ba9fc3-24d9-406a-90a6-8b5f1a02cc63"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "4c408aa5-aa9a-4e61-b084-2168cab15d3e",
                  "type": "has_only_phrase",
                  "uuid": "01a1e4fe-3510-4048-87fd-7dac56a64fce"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "17c13655-2b30-45e2-b7da-662b503be69e",
                  "type": "has_only_phrase",
                  "uuid": "b2709237-05e4-4e3d-b62d-65b1fe2ad467"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "80061f60-c710-420f-a364-012500925983",
                  "name": "All Responses",
                  "uuid": "725670df-27fa-4f77-8e09-02a3f69d5fc7"
                },
                {
                  "exit_uuid": "280d3164-2cc8-4520-8890-efc2c1aefbc8",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "f07038e3-b6a3-4b13-a6ff-050cacc3b558"
                },
                {
                  "exit_uuid": "78bf5c66-884f-48d7-a5a0-4a7c1be2ad4f",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "adccccf8-817c-4010-996d-7ca55986acb4"
                },
                {
                  "exit_uuid": "c00b6396-aae9-45b4-9082-2203f24c097e",
                  "name": "mod_welcome_survey",
                  "uuid": "4c408aa5-aa9a-4e61-b084-2168cab15d3e"
                },
                {
                  "exit_uuid": "fd686be5-87f6-4d13-9440-1ee492992273",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "17c13655-2b30-45e2-b7da-662b503be69e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "80061f60-c710-420f-a364-012500925983",
                "destination_uuid": null
              },
              {
                "uuid": "280d3164-2cc8-4520-8890-efc2c1aefbc8",
                "destination_uuid": "74c20941-f2da-4639-8068-e5864eaa98df"
              },
              {
                "uuid": "78bf5c66-884f-48d7-a5a0-4a7c1be2ad4f",
                "destination_uuid": "4fd00b51-8ec8-4009-9e6c-cb453075157f"
              },
              {
                "uuid": "c00b6396-aae9-45b4-9082-2203f24c097e",
                "destination_uuid": "2c18878b-fc36-4e25-89ce-6fcd80e92a5b"
              },
              {
                "uuid": "fd686be5-87f6-4d13-9440-1ee492992273",
                "destination_uuid": "576c4a47-8cee-4160-a9b2-01ab6526181c"
              }
            ]
          },
          {
            "uuid": "74c20941-f2da-4639-8068-e5864eaa98df",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "330ed67d-f721-4874-ad72-8bf423ed4cc4"
                },
                "type": "enter_flow",
                "uuid": "097e55dd-6c7a-4321-b087-e6917717cd4e"
              }
            ],
            "exits": [
              {
                "uuid": "dd70f5d4-87c4-4cf9-9a59-bcc9346bd9c3",
                "destination_uuid": null
              },
              {
                "uuid": "bd09906c-18f4-4c76-b0ac-10e9f899dff9",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "a683b4a6-3e13-481d-a228-c70f1079d998",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "b94d75e0-325b-4df6-a44f-d64ffbc3236c"
                },
                {
                  "uuid": "097ffa3e-0219-4940-9ed5-1dc8fb20da19",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d575b12f-f470-4301-bd4b-c014777cbc01"
                }
              ],
              "categories": [
                {
                  "uuid": "b94d75e0-325b-4df6-a44f-d64ffbc3236c",
                  "name": "Complete",
                  "exit_uuid": "dd70f5d4-87c4-4cf9-9a59-bcc9346bd9c3"
                },
                {
                  "uuid": "d575b12f-f470-4301-bd4b-c014777cbc01",
                  "name": "Expired",
                  "exit_uuid": "bd09906c-18f4-4c76-b0ac-10e9f899dff9"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "b94d75e0-325b-4df6-a44f-d64ffbc3236c"
            }
          },
          {
            "uuid": "4fd00b51-8ec8-4009-9e6c-cb453075157f",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "d87885c8-6e5f-488b-8c8d-0266ed222446"
                },
                "type": "enter_flow",
                "uuid": "92b5de19-566f-4ecb-85ff-f04370989343"
              }
            ],
            "exits": [
              {
                "uuid": "e6ab2b14-4b86-4b60-8e96-c1719be65ce4",
                "destination_uuid": null
              },
              {
                "uuid": "1d3ef597-2c91-4ca9-9d89-d3833c3e3a96",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5c504613-f948-4954-8c47-b248c853a39c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8b5e89bd-2710-4282-8d55-9074f5bdc345"
                },
                {
                  "uuid": "015e700b-42db-432f-9e56-e9a233f3e110",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "bc15852c-b086-4dbe-9039-a49cf54c8820"
                }
              ],
              "categories": [
                {
                  "uuid": "8b5e89bd-2710-4282-8d55-9074f5bdc345",
                  "name": "Complete",
                  "exit_uuid": "e6ab2b14-4b86-4b60-8e96-c1719be65ce4"
                },
                {
                  "uuid": "bc15852c-b086-4dbe-9039-a49cf54c8820",
                  "name": "Expired",
                  "exit_uuid": "1d3ef597-2c91-4ca9-9d89-d3833c3e3a96"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8b5e89bd-2710-4282-8d55-9074f5bdc345"
            }
          },
          {
            "uuid": "2c18878b-fc36-4e25-89ce-6fcd80e92a5b",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "82d2134d-20f6-49cf-8052-a49174d69469"
                },
                "type": "enter_flow",
                "uuid": "18aa3737-5717-4eaa-899e-bc27d4416b94"
              }
            ],
            "exits": [
              {
                "uuid": "d2e96c32-5606-445d-a13e-2d5985a015dc",
                "destination_uuid": null
              },
              {
                "uuid": "179ee81d-ba4a-453f-b003-77995e678581",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "03e7e2bd-8349-4720-82bd-a1c1a69b293f",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "9d9ece68-6492-4db7-a288-ebfd426fb787"
                },
                {
                  "uuid": "3a65c3b8-3d9e-409e-b68a-00b3a98cb266",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "5edbc483-b22e-4902-9e78-196ff3fcfbf7"
                }
              ],
              "categories": [
                {
                  "uuid": "9d9ece68-6492-4db7-a288-ebfd426fb787",
                  "name": "Complete",
                  "exit_uuid": "d2e96c32-5606-445d-a13e-2d5985a015dc"
                },
                {
                  "uuid": "5edbc483-b22e-4902-9e78-196ff3fcfbf7",
                  "name": "Expired",
                  "exit_uuid": "179ee81d-ba4a-453f-b003-77995e678581"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "9d9ece68-6492-4db7-a288-ebfd426fb787"
            }
          },
          {
            "uuid": "576c4a47-8cee-4160-a9b2-01ab6526181c",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "c36730d5-bec2-47ea-8cf4-05e7e05ec877"
                },
                "type": "enter_flow",
                "uuid": "0df509c5-7bd8-42d3-8fc3-7c69ee63c951"
              }
            ],
            "exits": [
              {
                "uuid": "5b7b69c9-2552-4ac8-a789-a985a0a28e6b",
                "destination_uuid": null
              },
              {
                "uuid": "b401e0e6-837e-471f-a43f-9d18d6500ed8",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "253648d2-c611-43ad-9507-f9f8f08c0f61",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4fa9c5fe-6d20-4164-af52-77bc24682bc5"
                },
                {
                  "uuid": "47ea365e-d8b1-4c68-b9a0-c2eced79dc65",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "3a4cba4f-73f4-4cfe-8770-b7aeceb9c9e5"
                }
              ],
              "categories": [
                {
                  "uuid": "4fa9c5fe-6d20-4164-af52-77bc24682bc5",
                  "name": "Complete",
                  "exit_uuid": "5b7b69c9-2552-4ac8-a789-a985a0a28e6b"
                },
                {
                  "uuid": "3a4cba4f-73f4-4cfe-8770-b7aeceb9c9e5",
                  "name": "Expired",
                  "exit_uuid": "b401e0e6-837e-471f-a43f-9d18d6500ed8"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4fa9c5fe-6d20-4164-af52-77bc24682bc5"
            }
          },
          {
            "uuid": "7fbb86c5-a957-4ec4-adf8-e98077cd2a81",
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
                "uuid": "1f5a568d-75a5-4b32-b382-5cdc003f01ef"
              }
            ],
            "exits": [
              {
                "uuid": "9e2e6721-e5a5-44bb-a5ca-ce437badb8de",
                "destination_uuid": "34207388-d683-446f-8271-5ccfe94f8364"
              }
            ]
          },
          {
            "uuid": "34207388-d683-446f-8271-5ccfe94f8364",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9686e6b0-0219-4f77-9a4e-3a1884c81d5a",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "333f6703-b28b-4683-abfa-30f70316921b",
                  "type": "has_only_phrase",
                  "uuid": "a5bb0865-55f3-4617-9f93-68a8f5e2f1f0"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "c26a21f1-b495-44ad-ac2c-e6e1eb995dbb",
                  "type": "has_only_phrase",
                  "uuid": "53315eba-f32c-4e91-aefd-9fffb26e1538"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "4332533e-ce27-4d56-873f-d5b28003c433",
                  "type": "has_only_phrase",
                  "uuid": "729f5adf-13f9-48a3-af4d-bae0370aff01"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7a61ad3c-e899-4dbb-b91c-dda977eb47ae",
                  "name": "All Responses",
                  "uuid": "9686e6b0-0219-4f77-9a4e-3a1884c81d5a"
                },
                {
                  "exit_uuid": "a938a5ce-4a08-476d-8ee2-255c38fda701",
                  "name": "mod_1on1_emo",
                  "uuid": "333f6703-b28b-4683-abfa-30f70316921b"
                },
                {
                  "exit_uuid": "1d21a727-c680-456d-a2c4-e983358317a0",
                  "name": "mod_1on1_activity",
                  "uuid": "c26a21f1-b495-44ad-ac2c-e6e1eb995dbb"
                },
                {
                  "exit_uuid": "609a7135-2839-446f-8c54-70b85a66b693",
                  "name": "mod_1on1_activity_review",
                  "uuid": "4332533e-ce27-4d56-873f-d5b28003c433"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7a61ad3c-e899-4dbb-b91c-dda977eb47ae",
                "destination_uuid": null
              },
              {
                "uuid": "a938a5ce-4a08-476d-8ee2-255c38fda701",
                "destination_uuid": "2cb2cd78-9ae1-4852-af3e-a862ca97dfbd"
              },
              {
                "uuid": "1d21a727-c680-456d-a2c4-e983358317a0",
                "destination_uuid": "1c45e915-ea30-4aca-850b-2a5d43df0003"
              },
              {
                "uuid": "609a7135-2839-446f-8c54-70b85a66b693",
                "destination_uuid": "cb6c7324-7a42-4f76-aa70-b19e725281a0"
              }
            ]
          },
          {
            "uuid": "2cb2cd78-9ae1-4852-af3e-a862ca97dfbd",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "c789b54f-27ee-4dcc-809a-c1eeba1fb1e3"
                },
                "type": "enter_flow",
                "uuid": "32a31984-747c-4a9e-a755-f03e75339758"
              }
            ],
            "exits": [
              {
                "uuid": "28d01e2b-c17b-4d0b-a714-70b9304526ac",
                "destination_uuid": null
              },
              {
                "uuid": "dd0724b0-71e2-444d-a51d-4e7c45c3e93f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5924720a-1132-4b25-ac97-a308c509278d",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "78b964c6-9cc2-44be-97f0-18067e630961"
                },
                {
                  "uuid": "68bbe36b-4089-4d4e-a794-015e2114e512",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "59fc2e5e-571a-4fe3-aa66-b4216cf48f23"
                }
              ],
              "categories": [
                {
                  "uuid": "78b964c6-9cc2-44be-97f0-18067e630961",
                  "name": "Complete",
                  "exit_uuid": "28d01e2b-c17b-4d0b-a714-70b9304526ac"
                },
                {
                  "uuid": "59fc2e5e-571a-4fe3-aa66-b4216cf48f23",
                  "name": "Expired",
                  "exit_uuid": "dd0724b0-71e2-444d-a51d-4e7c45c3e93f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "78b964c6-9cc2-44be-97f0-18067e630961"
            }
          },
          {
            "uuid": "1c45e915-ea30-4aca-850b-2a5d43df0003",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "7a02a4e1-744f-44c1-9bd3-04ab90ac3c70"
                },
                "type": "enter_flow",
                "uuid": "a5abd482-72a8-4425-a107-148074d210a1"
              }
            ],
            "exits": [
              {
                "uuid": "31cb471a-737d-499b-bba2-6e9849275c6f",
                "destination_uuid": null
              },
              {
                "uuid": "975cee9f-1645-48d7-8f21-b9da0dfa1faa",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "356c68f2-e762-4ff7-be30-536ccfb4cb00",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "9e9a3bc6-e0b9-46fc-9b08-3e6d2b0cca0a"
                },
                {
                  "uuid": "d865a086-621c-4f0a-8449-85435348ce58",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "dbe48ea0-3924-4a10-b642-3ea597daf07e"
                }
              ],
              "categories": [
                {
                  "uuid": "9e9a3bc6-e0b9-46fc-9b08-3e6d2b0cca0a",
                  "name": "Complete",
                  "exit_uuid": "31cb471a-737d-499b-bba2-6e9849275c6f"
                },
                {
                  "uuid": "dbe48ea0-3924-4a10-b642-3ea597daf07e",
                  "name": "Expired",
                  "exit_uuid": "975cee9f-1645-48d7-8f21-b9da0dfa1faa"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "9e9a3bc6-e0b9-46fc-9b08-3e6d2b0cca0a"
            }
          },
          {
            "uuid": "cb6c7324-7a42-4f76-aa70-b19e725281a0",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "a11f054b-2131-4b4a-932a-9839225b1477"
                },
                "type": "enter_flow",
                "uuid": "ed7ddb5b-54c3-4ac6-8880-859a76e67f43"
              }
            ],
            "exits": [
              {
                "uuid": "b6d948d8-92b4-4b85-b7d8-a1b4f63b770b",
                "destination_uuid": null
              },
              {
                "uuid": "34d5e626-d027-4096-9a25-c7141b03e0a8",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "cf9a4ee8-e172-4ed3-84f0-fc7092d6ec09",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "1ed74148-4bea-4696-bf5c-17e8c9bd3d64"
                },
                {
                  "uuid": "b2f89e8a-b3c9-4000-bc23-7a79c2749694",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b3e28e65-3448-41bc-bf69-8ee96eda4a78"
                }
              ],
              "categories": [
                {
                  "uuid": "1ed74148-4bea-4696-bf5c-17e8c9bd3d64",
                  "name": "Complete",
                  "exit_uuid": "b6d948d8-92b4-4b85-b7d8-a1b4f63b770b"
                },
                {
                  "uuid": "b3e28e65-3448-41bc-bf69-8ee96eda4a78",
                  "name": "Expired",
                  "exit_uuid": "34d5e626-d027-4096-9a25-c7141b03e0a8"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "1ed74148-4bea-4696-bf5c-17e8c9bd3d64"
            }
          },
          {
            "uuid": "70a6bc55-2cfd-46f1-81c8-ead65cefc724",
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
                "uuid": "e716552d-7e3b-4422-84ce-45a73464a3b7"
              }
            ],
            "exits": [
              {
                "uuid": "d3a01f89-30a5-4206-bbc6-5ffc992007e0",
                "destination_uuid": "d4373b90-76d0-4667-a132-a4ec85bb6ce4"
              }
            ]
          },
          {
            "uuid": "d4373b90-76d0-4667-a132-a4ec85bb6ce4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5cd70e96-6acb-4935-a9eb-790256375c46",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "a5cabf7d-0b0e-4135-ad85-ee8e4fe2db30",
                  "type": "has_only_phrase",
                  "uuid": "157e7079-cef4-4b7d-a616-15e884e4cb25"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "70627e80-4fa4-4c94-b929-8b6411dd30c1",
                  "type": "has_only_phrase",
                  "uuid": "43969161-bfe8-40af-af25-2197ca7cf456"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "b667bb36-825e-41e8-b466-21c21c2a04e7",
                  "type": "has_only_phrase",
                  "uuid": "67a449d2-8953-47c9-9008-f731549125e5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "777b73a5-fdf7-4eda-9a3b-e3bdfc27085d",
                  "name": "All Responses",
                  "uuid": "5cd70e96-6acb-4935-a9eb-790256375c46"
                },
                {
                  "exit_uuid": "5916c54c-616d-4b84-a254-4b7e474dda1a",
                  "name": "mod_praise_intro",
                  "uuid": "a5cabf7d-0b0e-4135-ad85-ee8e4fe2db30"
                },
                {
                  "exit_uuid": "49c3645d-c1a2-47f8-b6e2-09e8488e9027",
                  "name": "mod_praise_activity",
                  "uuid": "70627e80-4fa4-4c94-b929-8b6411dd30c1"
                },
                {
                  "exit_uuid": "ab06a76d-3156-4cb4-822d-e49c63e6f9e7",
                  "name": "mod_praise_activity_review",
                  "uuid": "b667bb36-825e-41e8-b466-21c21c2a04e7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "777b73a5-fdf7-4eda-9a3b-e3bdfc27085d",
                "destination_uuid": null
              },
              {
                "uuid": "5916c54c-616d-4b84-a254-4b7e474dda1a",
                "destination_uuid": "a3549ae8-2a4a-46ab-a817-78da119cf71f"
              },
              {
                "uuid": "49c3645d-c1a2-47f8-b6e2-09e8488e9027",
                "destination_uuid": "e1f117be-946f-490c-b33d-39009bfa44a6"
              },
              {
                "uuid": "ab06a76d-3156-4cb4-822d-e49c63e6f9e7",
                "destination_uuid": "167cdff8-24bc-49c1-bdb0-da6eb73615ff"
              }
            ]
          },
          {
            "uuid": "a3549ae8-2a4a-46ab-a817-78da119cf71f",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "9fe7581a-bf20-4d41-a113-209aee100967"
                },
                "type": "enter_flow",
                "uuid": "cb95943a-b904-44e0-9642-fe16d91a5f6a"
              }
            ],
            "exits": [
              {
                "uuid": "20842fc8-9b76-49b0-bda1-e5c7fd06da91",
                "destination_uuid": null
              },
              {
                "uuid": "a69fc011-b338-4864-b0ec-bb68c7831cea",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "7bc312ee-e839-44cc-8713-9237a5a77574",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "36e0eb59-4ff9-4e21-8aba-a29358944c62"
                },
                {
                  "uuid": "232aa2e8-c8c5-4b5d-9ba1-300bb05e82b0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "af305b83-c964-4ad2-bf49-84cfe399315d"
                }
              ],
              "categories": [
                {
                  "uuid": "36e0eb59-4ff9-4e21-8aba-a29358944c62",
                  "name": "Complete",
                  "exit_uuid": "20842fc8-9b76-49b0-bda1-e5c7fd06da91"
                },
                {
                  "uuid": "af305b83-c964-4ad2-bf49-84cfe399315d",
                  "name": "Expired",
                  "exit_uuid": "a69fc011-b338-4864-b0ec-bb68c7831cea"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "36e0eb59-4ff9-4e21-8aba-a29358944c62"
            }
          },
          {
            "uuid": "e1f117be-946f-490c-b33d-39009bfa44a6",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "e4480756-0f5f-4421-bba0-843478785164"
                },
                "type": "enter_flow",
                "uuid": "fb8df437-b595-4c89-bbb3-e8f30d7d030b"
              }
            ],
            "exits": [
              {
                "uuid": "e2f06070-7d3a-4321-afe4-ea5fac53a28c",
                "destination_uuid": null
              },
              {
                "uuid": "3e651ac0-5fda-4a90-9c57-922879003879",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "75188a39-bb5e-4144-8347-f3a9b696e69c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4cf51d47-649e-467c-b32b-c9e59efa0844"
                },
                {
                  "uuid": "5e0b2f71-bf7a-4cd2-8063-e3a7abd1029e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "97b67dd7-86ea-4332-8b5d-d00e0578c585"
                }
              ],
              "categories": [
                {
                  "uuid": "4cf51d47-649e-467c-b32b-c9e59efa0844",
                  "name": "Complete",
                  "exit_uuid": "e2f06070-7d3a-4321-afe4-ea5fac53a28c"
                },
                {
                  "uuid": "97b67dd7-86ea-4332-8b5d-d00e0578c585",
                  "name": "Expired",
                  "exit_uuid": "3e651ac0-5fda-4a90-9c57-922879003879"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4cf51d47-649e-467c-b32b-c9e59efa0844"
            }
          },
          {
            "uuid": "167cdff8-24bc-49c1-bdb0-da6eb73615ff",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "0c4973cf-f660-4cb2-9a15-ed7bc8db8888"
                },
                "type": "enter_flow",
                "uuid": "a8b37e4f-1e2c-460d-98a3-8c60591bd498"
              }
            ],
            "exits": [
              {
                "uuid": "cb0230d5-7d62-4d15-9ca4-12240e27eec3",
                "destination_uuid": null
              },
              {
                "uuid": "45d13086-5e51-42c8-b8b9-ac23827bffe7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "fd311f18-4297-4110-9d7e-e55b57233f17",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "9cb5b476-f5d9-4c1b-9a9e-0cc9ab5140c0"
                },
                {
                  "uuid": "b67a8e34-a760-41eb-8774-438f60cad3b2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "6d31f2dd-2395-4e17-835e-4f2f143520c5"
                }
              ],
              "categories": [
                {
                  "uuid": "9cb5b476-f5d9-4c1b-9a9e-0cc9ab5140c0",
                  "name": "Complete",
                  "exit_uuid": "cb0230d5-7d62-4d15-9ca4-12240e27eec3"
                },
                {
                  "uuid": "6d31f2dd-2395-4e17-835e-4f2f143520c5",
                  "name": "Expired",
                  "exit_uuid": "45d13086-5e51-42c8-b8b9-ac23827bffe7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "9cb5b476-f5d9-4c1b-9a9e-0cc9ab5140c0"
            }
          },
          {
            "uuid": "649fef08-4022-4ed5-aaaf-a56087811bae",
            "actions": [
              {
                "flow": {
                  "name": "first_app_opening",
                  "uuid": "b867cae3-aa93-48e5-80b0-92446b3e886d"
                },
                "type": "enter_flow",
                "uuid": "9ab356db-6d2a-420b-a3c4-6097cd6374e3"
              }
            ],
            "exits": [
              {
                "uuid": "c926c365-710b-4588-a95d-34570287cb29",
                "destination_uuid": null
              },
              {
                "uuid": "3d6cfee4-38e8-42e0-9c2b-b37334cc17ef",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "95727dc1-f9dd-446e-ba61-4640f9558889",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0a247bee-1988-4732-8b0a-b586fe57576d"
                },
                {
                  "uuid": "1540d78e-5690-4ec6-9d99-7ba080ccce17",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "8946fb42-ea1a-48e1-ade8-6cf862308180"
                }
              ],
              "categories": [
                {
                  "uuid": "0a247bee-1988-4732-8b0a-b586fe57576d",
                  "name": "Complete",
                  "exit_uuid": "c926c365-710b-4588-a95d-34570287cb29"
                },
                {
                  "uuid": "8946fb42-ea1a-48e1-ade8-6cf862308180",
                  "name": "Expired",
                  "exit_uuid": "3d6cfee4-38e8-42e0-9c2b-b37334cc17ef"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0a247bee-1988-4732-8b0a-b586fe57576d"
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
        "uuid": "8364ee4b-4314-4b64-b7cc-3237a6d2400b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "faec294e-c85c-4d81-b293-59b23133692c",
            "actions": [
              {
                "uuid": "0e159127-d98a-4b70-86ba-fbd23e975e7c",
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
                "uuid": "ffcca9e0-5eae-4412-a7e3-ee1962e1725d",
                "destination_uuid": "96289794-0395-400a-91e5-168577a92e9c"
              }
            ]
          },
          {
            "uuid": "96289794-0395-400a-91e5-168577a92e9c",
            "actions": [
              {
                "uuid": "2fc27b3c-bb20-4a2f-b995-f53f83098ee8",
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
                "uuid": "c1651538-d299-4e8e-9926-9b759f7ab4bf",
                "destination_uuid": "49003d3a-8c1b-41b7-9c18-7cff9e34ad03"
              }
            ]
          },
          {
            "uuid": "49003d3a-8c1b-41b7-9c18-7cff9e34ad03",
            "actions": [
              {
                "uuid": "2b593523-e6dd-4980-bdf4-cbcd7c3cb143",
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
                "uuid": "19bf7ac1-2309-481d-ab5c-ad98ee9b79cd",
                "destination_uuid": "25607fb8-967c-472d-b051-83c79dc0ab12"
              }
            ]
          },
          {
            "uuid": "25607fb8-967c-472d-b051-83c79dc0ab12",
            "actions": [
              {
                "uuid": "b3ef6cdf-86da-4150-ad70-04987dc0b30d",
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
                "uuid": "b7691db6-9d05-4e80-9ed3-d1998984a4d4",
                "destination_uuid": "c4443426-77b0-4dae-9aa0-8e83f6c43acc"
              }
            ]
          },
          {
            "uuid": "c4443426-77b0-4dae-9aa0-8e83f6c43acc",
            "actions": [
              {
                "uuid": "0b894b16-2899-422c-88d8-432c4df3b8db",
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
                "uuid": "21411ded-e209-4243-99ce-13e6f9f6b8d0",
                "destination_uuid": "60a48b94-e245-4074-b02a-54796faa40c9"
              }
            ]
          },
          {
            "uuid": "60a48b94-e245-4074-b02a-54796faa40c9",
            "actions": [
              {
                "uuid": "cc9df3c4-3f90-4732-9b59-0aa72902e0ea",
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
                "uuid": "d4676d6f-4642-45db-a794-6c8ad5d2676a",
                "destination_uuid": "535d1340-05e4-451f-a6c2-1dcc5424749e"
              }
            ]
          },
          {
            "uuid": "535d1340-05e4-451f-a6c2-1dcc5424749e",
            "actions": [
              {
                "uuid": "f2b328bf-b9f6-44b7-ad6f-cf8b570e180a",
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
                "uuid": "6d1175cf-9760-4a16-b38f-9c576c068ad9",
                "destination_uuid": "fa34abef-2692-4979-bc25-0ce799f0ac06"
              }
            ]
          },
          {
            "uuid": "fa34abef-2692-4979-bc25-0ce799f0ac06",
            "actions": [
              {
                "uuid": "199802de-6902-47b1-8a56-5f0ca9464fa0",
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
                "uuid": "a164f6fd-a176-4bfd-86ed-ff9c698858e9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ef3dcad6-3391-42e8-ac3b-1a120888ce8f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c0c6f2e6-ce7b-4130-917c-a4b4033d1f38",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c7236ab7-2e9f-4165-b357-3cd166f8e132"
              }
            ],
            "exits": [
              {
                "uuid": "42829155-6a64-451b-87da-6720271993ce",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ab3eb33b-2bcb-461e-8480-1fa9aa066056",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2382bb21-108f-459a-a663-056037c973ae",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6ca76cfc-44d7-43f6-a20e-1aff095e0518"
              }
            ],
            "exits": [
              {
                "uuid": "0681a3cc-c969-46f0-a5ae-f897491db1f0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bd787a50-aafc-4d8a-b965-8d203a1e6f9f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3a4ac186-660c-40d6-a5f1-c5e32356b20e",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1f13ce6f-e7d3-4929-aaa2-a626e0f61294"
              }
            ],
            "exits": [
              {
                "uuid": "a3142bef-ccbd-48a9-8cab-42a3d28b711b",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8e837ab3-cee4-473d-a361-7491ac085233",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a2158443-b0ee-48b7-9072-89d282b992bb",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "100784e6-dd3c-4269-b150-e7e2853fb2b8"
              }
            ],
            "exits": [
              {
                "uuid": "b970e7e6-3168-47ca-8640-3ab7fcf1b47f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3284fc19-c138-4119-a7bb-56986cc6a7cf",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8080d029-1a10-478f-a1a9-dac5b78d61f8",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "113ab5bd-9ad3-43de-95c2-601facb6bb07"
              }
            ],
            "exits": [
              {
                "uuid": "1cf2fa4f-816a-45c8-a067-3768ea7c85f5",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b5807f13-dc12-45a6-ac60-88669d115b51",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5750d0d3-e8aa-4596-85c3-af9bb3676eb1",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2ac24278-6156-4d7e-b150-a200f7f22d97"
              }
            ],
            "exits": [
              {
                "uuid": "7ba29bfa-b92c-4d40-83da-60402a426a17",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "155865d9-acb0-4e2d-b039-38d5f0aebc28",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "f60d24fb-55ed-4cf7-a2ce-cb33afd9142f",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "576d2e2f-291e-4d0e-a16e-64f011274b1a"
              }
            ],
            "exits": [
              {
                "uuid": "d19c9734-221d-4634-beb3-86e8384d60b7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "ff92f2a3-e80a-4142-8454-3706016aa26a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1dded66d-cabc-4bff-8d1e-9b4f3715c167",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "51d3baee-3aef-4898-817d-a702d23645fe"
              }
            ],
            "exits": [
              {
                "uuid": "0ba4eb0b-8118-4691-b84c-abb4c62caa0d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d4ed80c8-a1ef-4c69-ad77-ae4438893510",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "7e0464db-6f40-48e5-a7e1-8393501daa9b",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4cb9445d-6949-43be-9cb2-437ae0d3aba6"
              }
            ],
            "exits": [
              {
                "uuid": "34e1a22c-d128-496a-9928-97a72a084d24",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "09c36b98-df53-4dbe-a821-b953d3c92ab9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c7e375e3-5b6f-468e-916b-7b7362cd1350",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "11c46ac5-7ff7-4387-b61d-567db87ff25a"
              }
            ],
            "exits": [
              {
                "uuid": "b803d6ed-eb7c-492b-897a-a90a305ca596",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "7052f3cc-5e97-4cfe-9976-6c14bb3939ac",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "918c9bef-0d42-4429-8804-fa23cb937abc",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d2cd4031-35aa-4d70-ada1-c35f8df4dc73"
              }
            ],
            "exits": [
              {
                "uuid": "c4da11e7-17f6-4c3b-95bc-7460d7463aec",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "09eb0408-bb6f-41ea-8190-83cd235f4d91",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "20a36a9e-9bc6-487c-8689-c8a132b15e47",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "50be79cf-2000-4caf-b114-ea05b0a6e75d"
              }
            ],
            "exits": [
              {
                "uuid": "8e3dd0c0-4523-40c4-80f8-76c238267f99",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "4687eeb2-f7b1-4980-9240-bb4f68779b91",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e982e065-2561-4e96-a3fc-5c8d11234384",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b1bc5bbe-9867-464c-821b-37ac1e265dfb"
              }
            ],
            "exits": [
              {
                "uuid": "c629fbcb-a67d-4d0d-b264-f05d90c0b0f4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "9426cbae-cff2-4343-bb8a-4add65aa58a6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "bd1aa7e5-853f-4bf5-8de3-275f45471e21",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "eb19fc33-9351-43f5-a017-ab72e971b2a6"
              }
            ],
            "exits": [
              {
                "uuid": "ae8ebb83-1a6f-47d3-8349-245307ca1e90",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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