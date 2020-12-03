export default [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "example_main",
        "uuid": "a3901043-c355-4516-8f19-64df5b2e2927",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e37e569b-fd0e-438e-a22c-236eb2d76df9",
            "actions": [
              {
                "attachments": [],
                "text": "This is the main example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "38ea57a8-48ad-45cd-8531-84fe7a1ef5d2"
              }
            ],
            "exits": [
              {
                "uuid": "207b97fd-733a-4b06-a35d-4ca01eb24968",
                "destination_uuid": "d342fcb4-e3e2-4cc1-94b2-5e72f9237603"
              }
            ]
          },
          {
            "uuid": "d342fcb4-e3e2-4cc1-94b2-5e72f9237603",
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
                "uuid": "bfb2834d-aa4f-4edb-a359-57ec22e046ca"
              }
            ],
            "exits": [
              {
                "uuid": "497e35c2-ada6-4977-880f-e9c6702412fd",
                "destination_uuid": "88eb3d8c-20e5-4685-ad50-4767ba6aa88e"
              }
            ]
          },
          {
            "uuid": "88eb3d8c-20e5-4685-ad50-4767ba6aa88e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2103719f-7e96-42b1-aaa7-409e9e616ea4",
              "cases": [
                {
                  "arguments": [
                    "First option: launch example_media flow"
                  ],
                  "category_uuid": "05392b35-0950-41cd-9810-ede333166ec7",
                  "type": "has_only_phrase",
                  "uuid": "412eb74e-f719-4c3b-a1a0-2dc5d5d80660"
                },
                {
                  "arguments": [
                    "Second option: launch example_tickbox flow"
                  ],
                  "category_uuid": "1ed907e7-4066-4fea-b42d-2fca3932154c",
                  "type": "has_only_phrase",
                  "uuid": "0536f1cb-2b5a-4a34-8833-ca252b6f565c"
                },
                {
                  "arguments": [
                    "Third option: launch example_variables flow"
                  ],
                  "category_uuid": "f7965e79-2ece-4a75-9ba6-09707f679d9d",
                  "type": "has_only_phrase",
                  "uuid": "7e05632f-12d9-4887-9326-e26bb71bdc13"
                },
                {
                  "arguments": [
                    "Fourth option: launch example_story flow"
                  ],
                  "category_uuid": "57b4c9d3-56d6-4761-b9cb-1d93de4475ab",
                  "type": "has_only_phrase",
                  "uuid": "a716c748-ec86-4330-9a3c-5855d1c6c5b3"
                },
                {
                  "arguments": [
                    "Stay in this flow."
                  ],
                  "category_uuid": "838c704d-f50f-4f47-91f1-164357ff7208",
                  "type": "has_only_phrase",
                  "uuid": "5ac1f7bf-9bec-43d0-803a-10ed18fa793a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a82827c5-37a4-41fa-9397-912cb6cf5be6",
                  "name": "All Responses",
                  "uuid": "2103719f-7e96-42b1-aaa7-409e9e616ea4"
                },
                {
                  "exit_uuid": "cc96fb02-2bd9-4237-b34e-cf6ed6135c18",
                  "name": "First option: launch example_media flow",
                  "uuid": "05392b35-0950-41cd-9810-ede333166ec7"
                },
                {
                  "exit_uuid": "b327d3a4-6671-49b2-9b76-30e89af74d92",
                  "name": "Second option: launch example_tickbox flow",
                  "uuid": "1ed907e7-4066-4fea-b42d-2fca3932154c"
                },
                {
                  "exit_uuid": "22bffafa-bf80-4462-908e-7b41420d4243",
                  "name": "Third option: launch example_variables flow",
                  "uuid": "f7965e79-2ece-4a75-9ba6-09707f679d9d"
                },
                {
                  "exit_uuid": "3343aafa-f539-458b-bd56-dd4e9d13b278",
                  "name": "Fourth option: launch example_story flow",
                  "uuid": "57b4c9d3-56d6-4761-b9cb-1d93de4475ab"
                },
                {
                  "exit_uuid": "602a5ea5-5828-43d1-a8d5-524f71a6bc01",
                  "name": "Stay in this flow.",
                  "uuid": "838c704d-f50f-4f47-91f1-164357ff7208"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a82827c5-37a4-41fa-9397-912cb6cf5be6",
                "destination_uuid": null
              },
              {
                "uuid": "cc96fb02-2bd9-4237-b34e-cf6ed6135c18",
                "destination_uuid": "e6fe60c7-feed-49ec-9a56-9de6728639f0"
              },
              {
                "uuid": "b327d3a4-6671-49b2-9b76-30e89af74d92",
                "destination_uuid": "951b9d13-e690-4e90-a8e2-42715d48075a"
              },
              {
                "uuid": "22bffafa-bf80-4462-908e-7b41420d4243",
                "destination_uuid": "55f47115-f618-430f-b176-cd88cb7f35de"
              },
              {
                "uuid": "3343aafa-f539-458b-bd56-dd4e9d13b278",
                "destination_uuid": "ff532084-ccba-472b-a883-822e5bb3485b"
              },
              {
                "uuid": "602a5ea5-5828-43d1-a8d5-524f71a6bc01",
                "destination_uuid": "00b0fa41-8a52-49fd-ac2f-cd45c513a397"
              }
            ]
          },
          {
            "uuid": "e6fe60c7-feed-49ec-9a56-9de6728639f0",
            "actions": [
              {
                "flow": {
                  "name": "example_media",
                  "uuid": "9d1e758c-9320-42cc-bdad-a3d31570569c"
                },
                "type": "enter_flow",
                "uuid": "795bdd41-de07-4eca-a14e-12213b1832f8"
              }
            ],
            "exits": [
              {
                "uuid": "011e9edf-e1d7-40c9-b0ec-d4f60f5b62f2",
                "destination_uuid": "6be94159-c724-49d7-956c-fae9b7d7aa13"
              },
              {
                "uuid": "087d0a14-c872-43c3-9e05-48d30ee63ca7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "f6127eda-5039-4771-835f-67f6ea7bc4ec",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "2f02ac6f-55d6-4611-b633-0b58ec984861"
                },
                {
                  "uuid": "ccbdbe6c-6e91-4349-b7c3-7538eecea70a",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "39ff2314-dd6f-4a52-9972-9efce23b8def"
                }
              ],
              "categories": [
                {
                  "uuid": "2f02ac6f-55d6-4611-b633-0b58ec984861",
                  "name": "Complete",
                  "exit_uuid": "011e9edf-e1d7-40c9-b0ec-d4f60f5b62f2"
                },
                {
                  "uuid": "39ff2314-dd6f-4a52-9972-9efce23b8def",
                  "name": "Expired",
                  "exit_uuid": "087d0a14-c872-43c3-9e05-48d30ee63ca7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "2f02ac6f-55d6-4611-b633-0b58ec984861"
            }
          },
          {
            "uuid": "951b9d13-e690-4e90-a8e2-42715d48075a",
            "actions": [
              {
                "flow": {
                  "name": "example_tickbox",
                  "uuid": "af0bb385-d9c1-44cc-8db0-7c7e7c31b598"
                },
                "type": "enter_flow",
                "uuid": "486100d5-44e7-43b6-8381-3e9228b29115"
              }
            ],
            "exits": [
              {
                "uuid": "fda92a00-33dd-44ef-bc99-5aaace3c1a0c",
                "destination_uuid": "6be94159-c724-49d7-956c-fae9b7d7aa13"
              },
              {
                "uuid": "0692e2f3-84b5-4660-9119-fb8e14a33a12",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "221f26f2-608a-4e44-9b43-d8a92d7b214b",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "6bf9a639-e17a-4e19-9fd1-22086eded2a8"
                },
                {
                  "uuid": "2a7b29bc-ac9d-4269-9fd7-8cd4c1e71b22",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "0368e292-08aa-4734-8647-262f670f1f7f"
                }
              ],
              "categories": [
                {
                  "uuid": "6bf9a639-e17a-4e19-9fd1-22086eded2a8",
                  "name": "Complete",
                  "exit_uuid": "fda92a00-33dd-44ef-bc99-5aaace3c1a0c"
                },
                {
                  "uuid": "0368e292-08aa-4734-8647-262f670f1f7f",
                  "name": "Expired",
                  "exit_uuid": "0692e2f3-84b5-4660-9119-fb8e14a33a12"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "6bf9a639-e17a-4e19-9fd1-22086eded2a8"
            }
          },
          {
            "uuid": "55f47115-f618-430f-b176-cd88cb7f35de",
            "actions": [
              {
                "flow": {
                  "name": "example_variables",
                  "uuid": "2ec9d844-d52e-49ce-80b3-cc6d23f488cd"
                },
                "type": "enter_flow",
                "uuid": "0a951e03-01a2-4946-9ec1-049d8e800570"
              }
            ],
            "exits": [
              {
                "uuid": "3818cddd-aabc-45b7-918f-6db9f2598182",
                "destination_uuid": "6be94159-c724-49d7-956c-fae9b7d7aa13"
              },
              {
                "uuid": "974bd9b5-f9cd-4c7e-bf9b-ae9f995f0b0c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c982d6af-2c24-4757-b34a-2474e48bc064",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7ad7e0d8-0214-468b-94e2-52e6b8b01146"
                },
                {
                  "uuid": "729aa433-3460-46e7-918c-30defe0416cc",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2145576b-8b57-4c50-aea1-7999dac3a64c"
                }
              ],
              "categories": [
                {
                  "uuid": "7ad7e0d8-0214-468b-94e2-52e6b8b01146",
                  "name": "Complete",
                  "exit_uuid": "3818cddd-aabc-45b7-918f-6db9f2598182"
                },
                {
                  "uuid": "2145576b-8b57-4c50-aea1-7999dac3a64c",
                  "name": "Expired",
                  "exit_uuid": "974bd9b5-f9cd-4c7e-bf9b-ae9f995f0b0c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7ad7e0d8-0214-468b-94e2-52e6b8b01146"
            }
          },
          {
            "uuid": "ff532084-ccba-472b-a883-822e5bb3485b",
            "actions": [
              {
                "flow": {
                  "name": "example_story",
                  "uuid": "ce0ba982-5fe7-40c5-901c-6d38037f4f1e"
                },
                "type": "enter_flow",
                "uuid": "6712c599-69e3-409b-b50c-6294521b4d5a"
              }
            ],
            "exits": [
              {
                "uuid": "2099feeb-d461-4da0-b18b-0388a524c18c",
                "destination_uuid": "6be94159-c724-49d7-956c-fae9b7d7aa13"
              },
              {
                "uuid": "886d7acf-d499-42c1-a67a-d4139eb880ae",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "6d93fceb-0834-4953-957b-5bb7463990aa",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "8b8fc6d9-0b33-4a29-abf5-6d813ca7545c"
                },
                {
                  "uuid": "1243dc35-240c-4540-a657-5b658a191a37",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "01289b06-9e13-411c-89fa-e0d3c9d00a62"
                }
              ],
              "categories": [
                {
                  "uuid": "8b8fc6d9-0b33-4a29-abf5-6d813ca7545c",
                  "name": "Complete",
                  "exit_uuid": "2099feeb-d461-4da0-b18b-0388a524c18c"
                },
                {
                  "uuid": "01289b06-9e13-411c-89fa-e0d3c9d00a62",
                  "name": "Expired",
                  "exit_uuid": "886d7acf-d499-42c1-a67a-d4139eb880ae"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "8b8fc6d9-0b33-4a29-abf5-6d813ca7545c"
            }
          },
          {
            "uuid": "00b0fa41-8a52-49fd-ac2f-cd45c513a397",
            "actions": [
              {
                "attachments": [],
                "text": "You're still in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ace3c7cc-d37e-4d16-a1bb-7f08945577f1"
              }
            ],
            "exits": [
              {
                "uuid": "bafb6949-e206-41b8-be4b-b219361f1de7",
                "destination_uuid": "db4d6c94-55f7-4e78-9f7a-e1f2985c8aa4"
              }
            ]
          },
          {
            "uuid": "6be94159-c724-49d7-956c-fae9b7d7aa13",
            "actions": [
              {
                "attachments": [],
                "text": "You're now back in the main example flow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3977b5a2-1879-4395-a55f-ac7709d96580"
              }
            ],
            "exits": [
              {
                "uuid": "dbaf5fcc-c099-4f9b-b620-7606c57a1b16",
                "destination_uuid": "db4d6c94-55f7-4e78-9f7a-e1f2985c8aa4"
              }
            ]
          },
          {
            "uuid": "db4d6c94-55f7-4e78-9f7a-e1f2985c8aa4",
            "actions": [
              {
                "attachments": [],
                "text": "Would you like to try another example flow?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "b7c0ce4d-c273-4e44-ad01-e348c4ad53db"
              }
            ],
            "exits": [
              {
                "uuid": "3a6e28f1-ae9e-4fff-aad2-e37118fc0bae",
                "destination_uuid": "256b1fbf-df5b-45ab-bc2c-b0f06e3a43b6"
              }
            ]
          },
          {
            "uuid": "256b1fbf-df5b-45ab-bc2c-b0f06e3a43b6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c8c8933c-fae8-4b54-a6fe-d0ed7c693596",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "b9a5473b-f957-4e74-a562-68ccacb386f1",
                  "type": "has_only_phrase",
                  "uuid": "e3073b67-fdad-4a48-99f0-57351bad8fc4"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "511bd9fe-0700-4a32-9046-fd16985fa03a",
                  "type": "has_only_phrase",
                  "uuid": "5e593a7c-d4e4-4d4d-a8ed-cacd2ceaa102"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d38ac7cb-01d1-48e8-8d92-6de3f67f68b9",
                  "name": "All Responses",
                  "uuid": "c8c8933c-fae8-4b54-a6fe-d0ed7c693596"
                },
                {
                  "exit_uuid": "031d790c-52a9-41fc-aaf2-49ff26404dee",
                  "name": "Yes",
                  "uuid": "b9a5473b-f957-4e74-a562-68ccacb386f1"
                },
                {
                  "exit_uuid": "c6159557-3b1d-4a48-8463-c20af914aec2",
                  "name": "No",
                  "uuid": "511bd9fe-0700-4a32-9046-fd16985fa03a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d38ac7cb-01d1-48e8-8d92-6de3f67f68b9",
                "destination_uuid": null
              },
              {
                "uuid": "031d790c-52a9-41fc-aaf2-49ff26404dee",
                "destination_uuid": "d342fcb4-e3e2-4cc1-94b2-5e72f9237603"
              },
              {
                "uuid": "c6159557-3b1d-4a48-8463-c20af914aec2",
                "destination_uuid": "7d462c66-585a-4c61-b598-1bfba30acabe"
              }
            ]
          },
          {
            "uuid": "7d462c66-585a-4c61-b598-1bfba30acabe",
            "actions": [
              {
                "attachments": [],
                "text": "OK thanks bye!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "686d18ca-fcca-4101-8df4-f953d9b37be7"
              }
            ],
            "exits": [
              {
                "uuid": "a6bbb757-b045-45be-8a5e-47bc9cf8c0f0",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "303e75f3-3080-4308-bbc7-89a5bf7f2b77",
            "actions": [
              {
                "uuid": "1b262c3e-77e9-42c7-b107-bfdf166145ac",
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
                "uuid": "f527dbe6-e22f-42ab-8e0a-6ff5a93fea14",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "fde5695b-e061-4ee8-8c4c-684cc5845133",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "32ddb745-8d4a-4c95-996d-76336c69c61b",
            "actions": [
              {
                "attachments": [],
                "text": "This is the media example flow. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "92987ba9-c6ce-4812-bddd-de91b32fa890"
              }
            ],
            "exits": [
              {
                "uuid": "06a4400b-d3d6-4173-aed2-c945a37ed7d0",
                "destination_uuid": "1f8475d7-2bf9-4171-b2c5-3e2ac53cef12"
              }
            ]
          },
          {
            "uuid": "71bd83bc-1922-4b0e-a82c-cc23916039bf",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg"
                ],
                "text": "This message has an attached image.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7123405d-beab-4773-9c13-6b33bb3850a2"
              }
            ],
            "exits": [
              {
                "uuid": "0448649e-ebf9-429f-9991-3eb7e7347331",
                "destination_uuid": "657a89a1-e894-4307-b19b-60c74509a7f2"
              }
            ]
          },
          {
            "uuid": "657a89a1-e894-4307-b19b-60c74509a7f2",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying both media and text. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=both",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "8af22db1-11d2-4672-96cd-2b4b63ef9c74"
              }
            ],
            "exits": [
              {
                "uuid": "447432df-2f16-43d3-8d11-a4b5af0d2862",
                "destination_uuid": "2ba069b2-c5ce-4887-ad4e-3ec9c38293a1"
              }
            ]
          },
          {
            "uuid": "2ba069b2-c5ce-4887-ad4e-3ec9c38293a1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e9fecd05-054b-4391-9a93-53096d2722f6",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "285987d4-9318-4423-9bbf-98f7c36f00df",
                  "type": "has_only_phrase",
                  "uuid": "b981459e-f99d-48ff-b53c-8ee9fd5811a1"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "285987d4-9318-4423-9bbf-98f7c36f00df",
                  "type": "has_only_phrase",
                  "uuid": "155029d9-418a-4a7b-b77a-e2c229d5693a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7966bf0a-0a80-44bf-b908-58ca9f8556fe",
                  "name": "All Responses",
                  "uuid": "e9fecd05-054b-4391-9a93-53096d2722f6"
                },
                {
                  "exit_uuid": "95b2c78b-2d66-460b-8263-a00daa808336",
                  "name": "image1; image2",
                  "uuid": "285987d4-9318-4423-9bbf-98f7c36f00df"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7966bf0a-0a80-44bf-b908-58ca9f8556fe",
                "destination_uuid": null
              },
              {
                "uuid": "95b2c78b-2d66-460b-8263-a00daa808336",
                "destination_uuid": "1b788b6f-0419-4dcb-a303-97725cb7c525"
              }
            ]
          },
          {
            "uuid": "1b788b6f-0419-4dcb-a303-97725cb7c525",
            "actions": [
              {
                "attachments": [],
                "text": "This is a multiple choice question with images attached to the choices, displaying only media. https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "image1",
                  "image2"
                ],
                "uuid": "a59d80f3-2217-4dd2-a3cb-6f742a62f338"
              }
            ],
            "exits": [
              {
                "uuid": "a2f764b2-cb1a-413e-a379-40086959daf9",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "1f8475d7-2bf9-4171-b2c5-3e2ac53cef12",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "10a200b9-9223-4c96-ab69-779f11809667",
              "cases": [
                {
                  "arguments": [
                    "image1"
                  ],
                  "category_uuid": "6064c9da-ad50-4576-b77e-970dd74eefcf",
                  "type": "has_only_phrase",
                  "uuid": "74602e30-5a18-4bc9-8e8b-d77d7e99a4e8"
                },
                {
                  "arguments": [
                    "image2"
                  ],
                  "category_uuid": "6064c9da-ad50-4576-b77e-970dd74eefcf",
                  "type": "has_only_phrase",
                  "uuid": "11e02e3d-cd29-4b2b-895a-0a85f6b39e19"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b3eb1b5a-65c0-48b3-a4f9-961d871bde03",
                  "name": "All Responses",
                  "uuid": "10a200b9-9223-4c96-ab69-779f11809667"
                },
                {
                  "exit_uuid": "694dda8b-cd8c-487a-822b-a0947e41daf3",
                  "name": "image1; image2",
                  "uuid": "6064c9da-ad50-4576-b77e-970dd74eefcf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b3eb1b5a-65c0-48b3-a4f9-961d871bde03",
                "destination_uuid": "71bd83bc-1922-4b0e-a82c-cc23916039bf"
              },
              {
                "uuid": "694dda8b-cd8c-487a-822b-a0947e41daf3",
                "destination_uuid": "96de0478-d7a8-476e-abd3-2841ebd98f34"
              }
            ]
          },
          {
            "uuid": "96de0478-d7a8-476e-abd3-2841ebd98f34",
            "actions": [
              {
                "uuid": "ec02ead7-360d-4657-85d6-ba45cb77ec13",
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
                "uuid": "0b746dd3-41e3-46b3-a143-9d392127a005",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3955e48e-67f0-461b-94c4-faffdbd5ce41",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "59effb27-ad88-4707-9d07-e8483493cff9",
            "actions": [
              {
                "attachments": [],
                "text": "This is the tickbox example flow.",
                "type": "send_msg",
                "quick_replies": [
                  "Show a tickbox that is ticked by default.",
                  "Show a tickbox that is unticked by default."
                ],
                "uuid": "10b13f97-4af6-463d-ba30-2264830d577c"
              }
            ],
            "exits": [
              {
                "uuid": "be9988b4-270a-4e64-9147-70cadbbe1def",
                "destination_uuid": "f8807d30-9dea-46fb-9944-0681924c1c63"
              }
            ]
          },
          {
            "uuid": "f8807d30-9dea-46fb-9944-0681924c1c63",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "26e9210e-792b-4d52-99fa-6b76501b9572",
              "cases": [
                {
                  "arguments": [
                    "Show a tickbox that is ticked by default."
                  ],
                  "category_uuid": "d56e1f32-bf78-4823-90b9-88c5f11e94ce",
                  "type": "has_only_phrase",
                  "uuid": "4e0512a2-3695-446f-b2cc-e94179c4d61f"
                },
                {
                  "arguments": [
                    "Show a tickbox that is unticked by default."
                  ],
                  "category_uuid": "edbb9f79-b17f-4070-a05f-a533ad87969d",
                  "type": "has_only_phrase",
                  "uuid": "dec223f7-e329-43cd-b4af-d95abf4c54c2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4a088b79-f316-4ef2-9a51-523295288dd7",
                  "name": "All Responses",
                  "uuid": "26e9210e-792b-4d52-99fa-6b76501b9572"
                },
                {
                  "exit_uuid": "e9e1bfe3-74fc-4833-93c6-40db5ad61831",
                  "name": "Show a tickbox that is ticked by default.",
                  "uuid": "d56e1f32-bf78-4823-90b9-88c5f11e94ce"
                },
                {
                  "exit_uuid": "b05aca33-51b8-48c1-abae-76e6d8a852c7",
                  "name": "Show a tickbox that is unticked by default.",
                  "uuid": "edbb9f79-b17f-4070-a05f-a533ad87969d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4a088b79-f316-4ef2-9a51-523295288dd7",
                "destination_uuid": null
              },
              {
                "uuid": "e9e1bfe3-74fc-4833-93c6-40db5ad61831",
                "destination_uuid": "2c3fda2e-2b2a-4307-85e0-53d75a93c101"
              },
              {
                "uuid": "b05aca33-51b8-48c1-abae-76e6d8a852c7",
                "destination_uuid": "2d2b1ae7-06f3-427a-9f87-7ff4024ef33d"
              }
            ]
          },
          {
            "uuid": "2c3fda2e-2b2a-4307-85e0-53d75a93c101",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is ticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "2b2be0f6-51b9-4b62-a89d-9533b6021881"
              }
            ],
            "exits": [
              {
                "uuid": "61f4e89b-5cc3-438d-a1fe-933d8a4a4522",
                "destination_uuid": "7e18f4b6-33d5-4eb0-b5f3-6f8be15fcede"
              }
            ]
          },
          {
            "uuid": "2d2b1ae7-06f3-427a-9f87-7ff4024ef33d",
            "actions": [
              {
                "attachments": [],
                "text": "This tickbox is unticked by default. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Hello",
                  "Goodbye"
                ],
                "uuid": "2e66dcfa-cccc-453b-b615-72f527da9784"
              }
            ],
            "exits": [
              {
                "uuid": "a6e83cc9-75c5-4b07-bd30-6c1991668168",
                "destination_uuid": "7e18f4b6-33d5-4eb0-b5f3-6f8be15fcede"
              }
            ]
          },
          {
            "uuid": "7e18f4b6-33d5-4eb0-b5f3-6f8be15fcede",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bfb84522-2b8b-4a8f-b704-71657c8f6aa2",
              "cases": [
                {
                  "arguments": [
                    "Hello"
                  ],
                  "category_uuid": "5e4d390d-e839-4f6d-a6df-fa64deef4381",
                  "type": "has_only_phrase",
                  "uuid": "9423ae5c-6bc7-4511-9b5b-a97e1489d238"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "74300d18-2abe-48b3-86a1-1a6607a947d4",
                  "type": "has_only_phrase",
                  "uuid": "c4e5c515-268a-4fe9-88fb-626fc92e3398"
                },
                {
                  "arguments": [
                    "Goodbye"
                  ],
                  "category_uuid": "57ab7a25-3bbf-413d-9d6e-9e0a626a9746",
                  "type": "has_only_phrase",
                  "uuid": "3270a0ab-2130-448a-ab86-066279ebc956"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "83abcc75-79c9-4ea0-b78c-ff71df918e52",
                  "name": "All Responses",
                  "uuid": "bfb84522-2b8b-4a8f-b704-71657c8f6aa2"
                },
                {
                  "exit_uuid": "e3cce1cb-7a3b-42e5-8f96-d1cc2ef24af1",
                  "name": "Hello",
                  "uuid": "5e4d390d-e839-4f6d-a6df-fa64deef4381"
                },
                {
                  "exit_uuid": "279a78e5-86c8-4b18-81ed-3a0d7f61d283",
                  "name": "Goodbye",
                  "uuid": "74300d18-2abe-48b3-86a1-1a6607a947d4"
                },
                {
                  "exit_uuid": "ae6f103e-95b7-4b4f-9571-f1d80a3e3739",
                  "name": "Goodbye",
                  "uuid": "57ab7a25-3bbf-413d-9d6e-9e0a626a9746"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "83abcc75-79c9-4ea0-b78c-ff71df918e52",
                "destination_uuid": null
              },
              {
                "uuid": "e3cce1cb-7a3b-42e5-8f96-d1cc2ef24af1",
                "destination_uuid": "b110078d-ecdf-4a2b-9d89-0a1feeb92692"
              },
              {
                "uuid": "279a78e5-86c8-4b18-81ed-3a0d7f61d283",
                "destination_uuid": "4c1ad5f0-b583-4974-8e0f-75d833807da6"
              },
              {
                "uuid": "ae6f103e-95b7-4b4f-9571-f1d80a3e3739",
                "destination_uuid": "4c1ad5f0-b583-4974-8e0f-75d833807da6"
              }
            ]
          },
          {
            "uuid": "b110078d-ecdf-4a2b-9d89-0a1feeb92692",
            "actions": [
              {
                "attachments": [],
                "text": "You chose ticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "942312e7-a02a-4a48-a9b1-a480ee120eec"
              }
            ],
            "exits": [
              {
                "uuid": "3c83e3ad-51b4-480f-b1e4-f607355b840e",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "4c1ad5f0-b583-4974-8e0f-75d833807da6",
            "actions": [
              {
                "attachments": [],
                "text": "You chose unticked.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b0c8401b-256b-474b-bb8e-93c16a16a821"
              }
            ],
            "exits": [
              {
                "uuid": "4086848c-e216-47d4-8a97-80acc9352715",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "40cb4b08-d805-42c5-9d75-5ef8ee93644e",
            "actions": [
              {
                "uuid": "7763a40d-9047-4f77-85ef-e6ea52a7b7ee",
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
                "uuid": "9f73717a-fed2-40df-a57a-a999e113aa57",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "7ae0c812-a7d6-475f-90a3-cc829bf5614f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d584aaf5-8b89-49e3-85d7-93811592f899",
            "actions": [
              {
                "attachments": [],
                "text": "This is the variables example flow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fdce5d34-83bd-438d-b461-9dd110edd5e4"
              }
            ],
            "exits": [
              {
                "uuid": "e8bdcc28-658e-4311-8548-2cd09bdb8e8c",
                "destination_uuid": "a5bf18c5-2924-4699-adcf-113933621703"
              }
            ]
          },
          {
            "uuid": "a5bf18c5-2924-4699-adcf-113933621703",
            "actions": [
              {
                "attachments": [],
                "text": "Choose a number.",
                "type": "send_msg",
                "quick_replies": [
                  "1",
                  "2"
                ],
                "uuid": "e0a941b3-8b72-41b8-8bd6-4cf49d8114b2"
              }
            ],
            "exits": [
              {
                "uuid": "2ca95aab-a4b9-4a47-8a88-a9fb9bad8020",
                "destination_uuid": "38297064-a8b7-4c44-a135-45d9d6418383"
              }
            ]
          },
          {
            "uuid": "38297064-a8b7-4c44-a135-45d9d6418383",
            "actions": [],
            "exits": [
              {
                "uuid": "45bbaf17-2f9d-4758-b279-624bc9e7097c",
                "destination_uuid": "dd6361cc-23da-4d59-bc5f-5ea7010d69fa"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "89364733-4d9a-4e74-bebe-f74e98a2c2b4",
              "cases": [],
              "categories": [
                {
                  "uuid": "89364733-4d9a-4e74-bebe-f74e98a2c2b4",
                  "name": "All Responses",
                  "exit_uuid": "45bbaf17-2f9d-4758-b279-624bc9e7097c"
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
            "uuid": "dd6361cc-23da-4d59-bc5f-5ea7010d69fa",
            "actions": [
              {
                "uuid": "721adaad-8d40-4ac3-a03c-447edba03746",
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
                "uuid": "d807dfe4-8ff9-440f-8378-2e287af3c8a6",
                "destination_uuid": "233e2192-0de0-46e7-8cc4-fb04cdc6c446"
              }
            ]
          },
          {
            "uuid": "233e2192-0de0-46e7-8cc4-fb04cdc6c446",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e81f0c53-ba9d-4a28-ac45-4870da739d80",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "8ab3dbae-9408-4fe0-986a-574a08715a79",
                  "type": "has_only_phrase",
                  "uuid": "d099a7fb-b04f-4ad5-9172-6d2a2e2187bd"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "9478480f-6349-41a4-bc9c-666430d8a40e",
                  "type": "has_only_phrase",
                  "uuid": "e0093df1-ce42-44a3-8f43-3c5753541965"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d2441223-aa21-4e22-aeb1-5b7f02e2e3e5",
                  "name": "All Responses",
                  "uuid": "e81f0c53-ba9d-4a28-ac45-4870da739d80"
                },
                {
                  "exit_uuid": "6aa97b82-ed73-409d-a5a7-7cc56c637255",
                  "name": "1",
                  "uuid": "8ab3dbae-9408-4fe0-986a-574a08715a79"
                },
                {
                  "exit_uuid": "643b3174-ad7b-44bb-8187-ebdea44faa38",
                  "name": "2",
                  "uuid": "9478480f-6349-41a4-bc9c-666430d8a40e"
                }
              ],
              "operand": "@fields.favourite_number"
            },
            "exits": [
              {
                "uuid": "d2441223-aa21-4e22-aeb1-5b7f02e2e3e5",
                "destination_uuid": "df8b8d7d-7b2f-4694-af71-43ee803e13c6"
              },
              {
                "uuid": "6aa97b82-ed73-409d-a5a7-7cc56c637255",
                "destination_uuid": "80f35dd2-b5fc-4893-90a7-bd2939c32928"
              },
              {
                "uuid": "643b3174-ad7b-44bb-8187-ebdea44faa38",
                "destination_uuid": "088b6f72-f147-41c8-a366-e3b5d0d5c281"
              }
            ]
          },
          {
            "uuid": "80f35dd2-b5fc-4893-90a7-bd2939c32928",
            "actions": [
              {
                "uuid": "0a20400e-4d1f-4e54-84bf-2eb01f8edd65",
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
                "uuid": "05907616-266f-4a23-929e-3e986eb00bb3",
                "destination_uuid": "7b1dffd5-b1da-4744-bfa5-8c5ab0747b9c"
              }
            ]
          },
          {
            "uuid": "088b6f72-f147-41c8-a366-e3b5d0d5c281",
            "actions": [
              {
                "uuid": "3b5bddcb-7e0c-46a5-bd62-13054e59092e",
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
                "uuid": "74ef7895-67da-43de-859f-d3f5b8250831",
                "destination_uuid": "7f9ffc48-5db7-4a8d-80f1-198e01d3a950"
              }
            ]
          },
          {
            "uuid": "df8b8d7d-7b2f-4694-af71-43ee803e13c6",
            "actions": [
              {
                "attachments": [],
                "text": "Now type a word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "302334f7-4620-4ac7-8d29-cba6c1a7cb4c"
              }
            ],
            "exits": [
              {
                "uuid": "cf87fde8-e484-4bea-a126-f633d23fcab3",
                "destination_uuid": "80010e7b-b476-442d-a103-73d49da97162"
              }
            ]
          },
          {
            "uuid": "80010e7b-b476-442d-a103-73d49da97162",
            "actions": [],
            "exits": [
              {
                "uuid": "2a89a35e-3bb9-437d-b68b-4f520e736293",
                "destination_uuid": "bef13e47-f554-49f8-8033-b544889c8d2e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "be5cdb12-2fa5-4e09-b945-246db65414ad",
              "cases": [],
              "categories": [
                {
                  "uuid": "be5cdb12-2fa5-4e09-b945-246db65414ad",
                  "name": "All Responses",
                  "exit_uuid": "2a89a35e-3bb9-437d-b68b-4f520e736293"
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
            "uuid": "bef13e47-f554-49f8-8033-b544889c8d2e",
            "actions": [
              {
                "uuid": "6ae1c112-ecb5-4e7b-a5ae-347b0194cf65",
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
                "uuid": "b3a8825e-71b1-4e1c-bfe1-a40a235dfd27",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7b1dffd5-b1da-4744-bfa5-8c5ab0747b9c",
            "actions": [
              {
                "attachments": [],
                "text": "Your chosen number is @fields.favourite_number, that is, @fields.favourite_number_text. You typed the word @fields.favourite_word.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9cbad11b-1bfd-4f17-9f0e-a4d2381c3536"
              }
            ],
            "exits": [
              {
                "uuid": "3cf9111c-747c-4a30-9f1b-3b9c3017f9da",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "7f9ffc48-5db7-4a8d-80f1-198e01d3a950",
            "actions": [
              {
                "uuid": "b47930ac-1e0c-4957-8912-285aaf0666e9",
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
                "uuid": "8ce7f80e-1596-4255-b9c6-59da20031261",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "3bc7a325-380d-4c7c-8013-be4f1f0e4003",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a5b169cc-b429-4aab-bfff-a4db85cbd93c",
            "actions": [
              {
                "attachments": [],
                "text": "This flow shows an example of the story mode.",
                "type": "send_msg",
                "quick_replies": [
                  "Go to the story"
                ],
                "uuid": "16b838ea-b09f-4f86-aad5-78345dec3467"
              }
            ],
            "exits": [
              {
                "uuid": "dd68f5dc-13bb-41d0-95fa-0998b0a1ec75",
                "destination_uuid": "85d011ce-8f80-4a20-8e75-293e2b452839"
              }
            ]
          },
          {
            "uuid": "85d011ce-8f80-4a20-8e75-293e2b452839",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "355fb012-127d-472c-8a55-a68536dec4ed",
              "cases": [
                {
                  "arguments": [
                    "Go to the story"
                  ],
                  "category_uuid": "d45df7cb-ff72-45b7-8f8a-4a099a62c38b",
                  "type": "has_only_phrase",
                  "uuid": "10a9bc91-971b-424d-a2e7-5a262e6e8fc1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "79d356ab-316d-450a-96cc-d05397e7164b",
                  "name": "All Responses",
                  "uuid": "355fb012-127d-472c-8a55-a68536dec4ed"
                },
                {
                  "exit_uuid": "c8922598-58ca-471f-91a3-e6d3c0e95eb7",
                  "name": "Go to the story",
                  "uuid": "d45df7cb-ff72-45b7-8f8a-4a099a62c38b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "79d356ab-316d-450a-96cc-d05397e7164b",
                "destination_uuid": null
              },
              {
                "uuid": "c8922598-58ca-471f-91a3-e6d3c0e95eb7",
                "destination_uuid": "4c1782bf-be62-49f1-99b9-d7b37ba3580d"
              }
            ]
          },
          {
            "uuid": "4c1782bf-be62-49f1-99b9-d7b37ba3580d",
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
                "uuid": "95a6420e-489d-4a0f-8072-8e6e25cf9d86"
              }
            ],
            "exits": [
              {
                "uuid": "26b96b32-55d6-4071-ad5b-e4c6d0f247d4",
                "destination_uuid": "d56fa8ec-3ed5-47c3-8e09-b7f004729258"
              }
            ]
          },
          {
            "uuid": "d56fa8ec-3ed5-47c3-8e09-b7f004729258",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0e06365e-eca8-45fc-807d-89ddf00c4b2e",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "960b254c-ecf1-4501-91e3-c832a966950c",
                  "type": "has_only_phrase",
                  "uuid": "5099d009-cc6b-4b10-b610-b7ae58090268"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "bf4ecbee-0f8a-4e95-847b-a833d770e0f1",
                  "name": "All Responses",
                  "uuid": "0e06365e-eca8-45fc-807d-89ddf00c4b2e"
                },
                {
                  "exit_uuid": "17d18840-ca8b-40c7-934e-2fa475e11508",
                  "name": "Next",
                  "uuid": "960b254c-ecf1-4501-91e3-c832a966950c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "bf4ecbee-0f8a-4e95-847b-a833d770e0f1",
                "destination_uuid": null
              },
              {
                "uuid": "17d18840-ca8b-40c7-934e-2fa475e11508",
                "destination_uuid": "81e74bbf-2ea9-4ea1-8dff-71c51e6b2c54"
              }
            ]
          },
          {
            "uuid": "81e74bbf-2ea9-4ea1-8dff-71c51e6b2c54",
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
                "uuid": "2e120e4f-019d-4c87-bc51-f71c72d027c1"
              }
            ],
            "exits": [
              {
                "uuid": "ee71ffdd-32f3-42b2-9951-da0b6fa5af1f",
                "destination_uuid": "9b82b705-207a-45fb-97e1-a1b0c750b43f"
              }
            ]
          },
          {
            "uuid": "9b82b705-207a-45fb-97e1-a1b0c750b43f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1897c2fc-6a0e-40ad-953b-4c0b8c9a3626",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "69a34fa4-5de3-4e44-a915-2f85289fdb88",
                  "type": "has_only_phrase",
                  "uuid": "fc9ecaa4-a784-4af9-bc74-732d3f42cd39"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "21334e14-33f6-47da-9bac-ff6b54b925b3",
                  "type": "has_only_phrase",
                  "uuid": "d45930f1-df05-4e49-a423-555b0838f96c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "890384e4-62ee-435a-9c74-73bf4386b2ec",
                  "name": "All Responses",
                  "uuid": "1897c2fc-6a0e-40ad-953b-4c0b8c9a3626"
                },
                {
                  "exit_uuid": "48889086-0fd0-433e-8fd8-f7d2135648bf",
                  "name": "Previous",
                  "uuid": "69a34fa4-5de3-4e44-a915-2f85289fdb88"
                },
                {
                  "exit_uuid": "5f6c1a3b-ad30-46d9-a2ed-b118d7d652ee",
                  "name": "Next",
                  "uuid": "21334e14-33f6-47da-9bac-ff6b54b925b3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "890384e4-62ee-435a-9c74-73bf4386b2ec",
                "destination_uuid": null
              },
              {
                "uuid": "48889086-0fd0-433e-8fd8-f7d2135648bf",
                "destination_uuid": "4c1782bf-be62-49f1-99b9-d7b37ba3580d"
              },
              {
                "uuid": "5f6c1a3b-ad30-46d9-a2ed-b118d7d652ee",
                "destination_uuid": "366d3e33-9e46-4244-becb-edf3674a9cd3"
              }
            ]
          },
          {
            "uuid": "366d3e33-9e46-4244-becb-edf3674a9cd3",
            "actions": [
              {
                "attachments": [],
                "text": "Now we're back in chat mode. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1aaf30d9-598e-4812-a4c4-5af24552d365"
              }
            ],
            "exits": [
              {
                "uuid": "912c8620-7ce2-47fe-b63a-568ba0b4f871",
                "destination_uuid": "92f3f0e8-4dc7-4be7-b72d-8736d16577cb"
              }
            ]
          },
          {
            "uuid": "92f3f0e8-4dc7-4be7-b72d-8736d16577cb",
            "actions": [
              {
                "uuid": "eefd8801-23b9-45fa-94f0-c903e674cb8b",
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
                "uuid": "cf173b0a-062b-4a39-814a-3bd81c06adbf",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bb31c803-0d44-460d-9a1d-0e70781f520b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ed5db2c6-95e2-4436-ac23-e627d272800d",
            "actions": [
              {
                "attachments": [],
                "text": "Do you allow our researchers to use your anonymous answers to the customise your app section and the quick questions we ask you throughout this app? We need this anonymous information to learn about how to better support you and other families globally.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4dd658b1-6417-4aa9-b147-567f4a2d081c"
              }
            ],
            "exits": [
              {
                "uuid": "a2a08240-4e72-4b8d-9a13-248ca7a378a7",
                "destination_uuid": "14dc9024-f29f-40d1-94ac-fcb7e3d3f047"
              }
            ]
          },
          {
            "uuid": "14dc9024-f29f-40d1-94ac-fcb7e3d3f047",
            "actions": [
              {
                "attachments": [],
                "text": "Agree to share anonymous answers https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "agree",
                  "disagree"
                ],
                "uuid": "23f84982-7403-4216-8b60-d140f515ed15"
              }
            ],
            "exits": [
              {
                "uuid": "7323a7a4-67d9-4a79-ad01-4f100b12b99b",
                "destination_uuid": "ad13c828-7265-4bcf-a1e4-a14207a063f7"
              }
            ]
          },
          {
            "uuid": "ad13c828-7265-4bcf-a1e4-a14207a063f7",
            "actions": [],
            "exits": [
              {
                "uuid": "28818ca4-654a-4066-bde5-d636663f414e",
                "destination_uuid": "0cd2b18e-a55d-4add-a4cc-3e395f4506c7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "68eab6ae-ec3d-4bc8-8edd-b013300bfa13",
              "cases": [],
              "categories": [
                {
                  "uuid": "68eab6ae-ec3d-4bc8-8edd-b013300bfa13",
                  "name": "All Responses",
                  "exit_uuid": "28818ca4-654a-4066-bde5-d636663f414e"
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
            "uuid": "0cd2b18e-a55d-4add-a4cc-3e395f4506c7",
            "actions": [
              {
                "uuid": "957ac882-ac8a-452a-925a-0d8de0d64ca4",
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
                "uuid": "381f8f5f-322f-4a94-9aba-ef5e29fa8d1a",
                "destination_uuid": "a7cc8343-8483-4a67-91b2-a61f8b4a3cba"
              }
            ]
          },
          {
            "uuid": "a7cc8343-8483-4a67-91b2-a61f8b4a3cba",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "9116c2e2-bb1e-40d8-9627-9d8e9e66fc8e"
                },
                "type": "enter_flow",
                "uuid": "83bddf75-f85b-4d9c-b83e-7338868c070c"
              }
            ],
            "exits": [
              {
                "uuid": "9469a4a7-109f-409d-bb19-a38624eef4ce",
                "destination_uuid": "0144bb8b-2ccf-49cc-8368-03e58ea12066"
              },
              {
                "uuid": "de2b20f3-24d6-454c-980c-b7d8b6ca9e89",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c05751c1-688a-44a3-9a60-a57b65484321",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "56cae082-6269-40a9-ab3d-55973809868c"
                },
                {
                  "uuid": "841a1a47-2fc9-44df-b274-c6479cd72dd6",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b7889eda-efc5-4dd6-9223-0be9d67185aa"
                }
              ],
              "categories": [
                {
                  "uuid": "56cae082-6269-40a9-ab3d-55973809868c",
                  "name": "Complete",
                  "exit_uuid": "9469a4a7-109f-409d-bb19-a38624eef4ce"
                },
                {
                  "uuid": "b7889eda-efc5-4dd6-9223-0be9d67185aa",
                  "name": "Expired",
                  "exit_uuid": "de2b20f3-24d6-454c-980c-b7d8b6ca9e89"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "56cae082-6269-40a9-ab3d-55973809868c"
            }
          },
          {
            "uuid": "0144bb8b-2ccf-49cc-8368-03e58ea12066",
            "actions": [
              {
                "attachments": [],
                "text": "Please choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1",
                  "guide2"
                ],
                "uuid": "aafb18a6-ef9f-46a4-970c-8ee144465995"
              }
            ],
            "exits": [
              {
                "uuid": "590dab4e-aa5d-4efe-97b0-7594a411287e",
                "destination_uuid": "d46d108e-065a-431a-87e6-6e5eb25278e3"
              }
            ]
          },
          {
            "uuid": "d46d108e-065a-431a-87e6-6e5eb25278e3",
            "actions": [],
            "exits": [
              {
                "uuid": "2c39366b-7c6f-4815-b09f-416d3cc80c43",
                "destination_uuid": "02fc8374-ad78-4d60-9bdd-7c532caab63e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "8c1c0039-534b-4a28-b0c1-3a3922c450d1",
              "cases": [],
              "categories": [
                {
                  "uuid": "8c1c0039-534b-4a28-b0c1-3a3922c450d1",
                  "name": "All Responses",
                  "exit_uuid": "2c39366b-7c6f-4815-b09f-416d3cc80c43"
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
            "uuid": "02fc8374-ad78-4d60-9bdd-7c532caab63e",
            "actions": [
              {
                "uuid": "c13b63c9-f39e-4174-8f95-6de6b087952a",
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
                "uuid": "9d66c082-5ee5-4661-89f4-00873f46a90c",
                "destination_uuid": "33e56bc2-4e78-4450-9b92-0974129f2b0e"
              }
            ]
          },
          {
            "uuid": "33e56bc2-4e78-4450-9b92-0974129f2b0e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cdd5533a-99de-45f5-9f1f-4fa9099e6322",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "5a92b9f0-6f33-4a64-97e6-de923e3380a6",
                  "type": "has_only_phrase",
                  "uuid": "0db6b663-72fc-4901-b92e-7cc591c5e5e2"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "c4411350-7765-4976-886e-0719732f9050",
                  "type": "has_only_phrase",
                  "uuid": "4e372c38-ac27-41be-b382-b4b2b7143092"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "00450fcb-0bb7-465a-883f-328eb14218a9",
                  "name": "All Responses",
                  "uuid": "cdd5533a-99de-45f5-9f1f-4fa9099e6322"
                },
                {
                  "exit_uuid": "8bb892fb-5297-4a9e-b8fb-c523d9499042",
                  "name": "guide1",
                  "uuid": "5a92b9f0-6f33-4a64-97e6-de923e3380a6"
                },
                {
                  "exit_uuid": "924863ee-8a0e-4551-9182-1bacf42e953b",
                  "name": "guide2",
                  "uuid": "c4411350-7765-4976-886e-0719732f9050"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "00450fcb-0bb7-465a-883f-328eb14218a9",
                "destination_uuid": null
              },
              {
                "uuid": "8bb892fb-5297-4a9e-b8fb-c523d9499042",
                "destination_uuid": "20c6166e-998a-4657-b719-23efa2853dbc"
              },
              {
                "uuid": "924863ee-8a0e-4551-9182-1bacf42e953b",
                "destination_uuid": "e0c44e1d-178a-4ff3-9c64-4261f6b3a7c8"
              }
            ]
          },
          {
            "uuid": "20c6166e-998a-4657-b719-23efa2853dbc",
            "actions": [
              {
                "uuid": "1e570645-e2b3-4c63-9ffa-833b0845e385",
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
                "uuid": "9a77eaaf-342c-406e-9695-05c348ba754c",
                "destination_uuid": "bf8dcf70-d3f9-4bc1-af1e-8eb3638e902a"
              }
            ]
          },
          {
            "uuid": "e0c44e1d-178a-4ff3-9c64-4261f6b3a7c8",
            "actions": [
              {
                "uuid": "5ebc25e5-4543-4f2e-a4af-182cbd355a4c",
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
                "uuid": "93351d35-cedc-4d17-8a74-eb342bad8c89",
                "destination_uuid": "bf8dcf70-d3f9-4bc1-af1e-8eb3638e902a"
              }
            ]
          },
          {
            "uuid": "bf8dcf70-d3f9-4bc1-af1e-8eb3638e902a",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I’m @fields.guide. \n\nLet’s get you what you deserve: \n- Feeling good \n- Better family relationships  \n\nWhat will you get?\n- Your customised self-care package \n- Proven strategies for bringing up your teenager \n- Real-time reminders \n- See your own success  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "976493d6-7c94-42b3-92bc-f75ca5390320"
              }
            ],
            "exits": [
              {
                "uuid": "60122936-42d4-4d50-921d-b50cdbcd5c16",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "fa136e08-ca1c-4651-8465-3f0a9308917a",
            "actions": [
              {
                "uuid": "cab695a3-7b14-47a4-967d-4ace7f9af907",
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
                "uuid": "959612c6-5fca-411a-8ad5-7ba35b5052ef",
                "destination_uuid": "bcf12d52-5392-4808-8e73-5f8818b733d4"
              }
            ]
          },
          {
            "uuid": "bcf12d52-5392-4808-8e73-5f8818b733d4",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "d0c782e6-a65a-4394-8a7b-7fe4913a460e"
                },
                "type": "enter_flow",
                "uuid": "664fbd0b-eb95-4f5f-ab38-e31c554870a1"
              }
            ],
            "exits": [
              {
                "uuid": "40ce2c32-b6ac-41dd-8879-1763ac948c4c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "0df0b64d-dfb6-4aa0-94a4-06f1739dad3a",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "844d233b-a2dd-4a03-a43c-6c9f81df4df0",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will fit this app to your needs: https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dbf2dbed-6ee7-4d88-9eab-576d2832a860"
              }
            ],
            "exits": [
              {
                "uuid": "e9eaea5d-2495-4560-a314-232322469993",
                "destination_uuid": "74fecd15-cb23-45be-a81b-8976d9d73837"
              }
            ]
          },
          {
            "uuid": "74fecd15-cb23-45be-a81b-8976d9d73837",
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
                "uuid": "bdaabda5-745a-4ea4-b989-04c44a2e66b1"
              }
            ],
            "exits": [
              {
                "uuid": "060cb81d-4834-4163-8f3c-bd360d9ba203",
                "destination_uuid": "52e06077-f2c3-4c0d-bd9b-cf77408dbfcf"
              }
            ]
          },
          {
            "uuid": "52e06077-f2c3-4c0d-bd9b-cf77408dbfcf",
            "actions": [],
            "exits": [
              {
                "uuid": "6322eb85-229a-4018-b2b0-241843c3eb3b",
                "destination_uuid": "589de06e-9772-4874-8106-f2137983b48b"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "733f04ef-7122-4801-83e4-765f22482891",
              "cases": [],
              "categories": [
                {
                  "uuid": "733f04ef-7122-4801-83e4-765f22482891",
                  "name": "All Responses",
                  "exit_uuid": "6322eb85-229a-4018-b2b0-241843c3eb3b"
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
            "uuid": "589de06e-9772-4874-8106-f2137983b48b",
            "actions": [
              {
                "uuid": "73e13278-e5df-4515-83ab-594865fbe2c6",
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
                "uuid": "6b31b969-5304-437b-b1bb-70df654fa082",
                "destination_uuid": "949acbe9-055f-4b09-a094-493ba5a45830"
              }
            ]
          },
          {
            "uuid": "949acbe9-055f-4b09-a094-493ba5a45830",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e87a220a-b796-4634-8ea5-039b46999984",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "2f2b8d13-20ac-4572-99b1-a6ea5cd4b1f1",
                  "type": "has_only_phrase",
                  "uuid": "57a564ae-f505-4020-867e-f1eff5ec4f05"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "2f2b8d13-20ac-4572-99b1-a6ea5cd4b1f1",
                  "type": "has_only_phrase",
                  "uuid": "4f29a844-95b6-452c-b86d-4ec2e0823bb2"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "2f2b8d13-20ac-4572-99b1-a6ea5cd4b1f1",
                  "type": "has_only_phrase",
                  "uuid": "1e5ddbcf-ac63-4768-bf2f-8619e4a40d82"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "2f2b8d13-20ac-4572-99b1-a6ea5cd4b1f1",
                  "type": "has_only_phrase",
                  "uuid": "7cd676a9-4f27-4a93-bdbe-743b74b7a864"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "cbd5cccf-b4a0-410e-b08f-4403647295d2",
                  "type": "has_only_phrase",
                  "uuid": "e51c40dd-5e91-4bb2-8b25-b8656ca60e0a"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "cbd5cccf-b4a0-410e-b08f-4403647295d2",
                  "type": "has_only_phrase",
                  "uuid": "c9213455-9cb8-474d-ae35-219085f59985"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "cbd5cccf-b4a0-410e-b08f-4403647295d2",
                  "type": "has_only_phrase",
                  "uuid": "718308c3-2a5e-4a3c-85ce-a379a87a6fe0"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "cbd5cccf-b4a0-410e-b08f-4403647295d2",
                  "type": "has_only_phrase",
                  "uuid": "dd5eb35c-f338-4050-9642-090a60740be0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "275595ae-0a06-4e6a-a712-f3a6888a5ff6",
                  "name": "All Responses",
                  "uuid": "e87a220a-b796-4634-8ea5-039b46999984"
                },
                {
                  "exit_uuid": "7c6ea3f1-fa1f-4423-be22-7fcaee915b80",
                  "name": "0;1;2;3",
                  "uuid": "2f2b8d13-20ac-4572-99b1-a6ea5cd4b1f1"
                },
                {
                  "exit_uuid": "ab6f3456-3971-4201-9d5b-5f75e5f396cc",
                  "name": "4;5;6;7",
                  "uuid": "cbd5cccf-b4a0-410e-b08f-4403647295d2"
                }
              ],
              "operand": "@fields.welcome_survey_q_1"
            },
            "exits": [
              {
                "uuid": "275595ae-0a06-4e6a-a712-f3a6888a5ff6",
                "destination_uuid": null
              },
              {
                "uuid": "7c6ea3f1-fa1f-4423-be22-7fcaee915b80",
                "destination_uuid": "af1a9ddf-de1f-4192-aba9-7304498578a7"
              },
              {
                "uuid": "ab6f3456-3971-4201-9d5b-5f75e5f396cc",
                "destination_uuid": "b01a472d-6d81-459b-a58d-aba6ddedc103"
              }
            ]
          },
          {
            "uuid": "af1a9ddf-de1f-4192-aba9-7304498578a7",
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
                "uuid": "5d2c9c1d-f561-466a-a72d-cc1eb7fbf605"
              }
            ],
            "exits": [
              {
                "uuid": "2c39e68b-6438-403c-9dc9-05ceccc3bf25",
                "destination_uuid": "787a8128-238d-4a21-929a-2b144c85b885"
              }
            ]
          },
          {
            "uuid": "b01a472d-6d81-459b-a58d-aba6ddedc103",
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
                "uuid": "c67bb86f-22af-45de-a36f-126ae08474b9"
              }
            ],
            "exits": [
              {
                "uuid": "555b57d9-63f3-4f66-8745-d3cba11ab7f0",
                "destination_uuid": "787a8128-238d-4a21-929a-2b144c85b885"
              }
            ]
          },
          {
            "uuid": "787a8128-238d-4a21-929a-2b144c85b885",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5058c959-8989-4219-b555-8d2280f67ab6",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "e6575409-564b-495a-ad09-5589cb7ef846",
                  "type": "has_only_phrase",
                  "uuid": "779e95ef-aae5-469d-b150-12caf6fe418e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a1625559-0deb-43bb-8b7d-97b0376ab928",
                  "name": "All Responses",
                  "uuid": "5058c959-8989-4219-b555-8d2280f67ab6"
                },
                {
                  "exit_uuid": "c2826a2c-3762-4146-b6fe-0da28a90c896",
                  "name": "Next",
                  "uuid": "e6575409-564b-495a-ad09-5589cb7ef846"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a1625559-0deb-43bb-8b7d-97b0376ab928",
                "destination_uuid": null
              },
              {
                "uuid": "c2826a2c-3762-4146-b6fe-0da28a90c896",
                "destination_uuid": "6c1ece8e-b3ca-46b3-9655-c25ef1004b9a"
              }
            ]
          },
          {
            "uuid": "6c1ece8e-b3ca-46b3-9655-c25ef1004b9a",
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
                "uuid": "871a605d-851e-4bbc-b0d3-2759183cac53"
              }
            ],
            "exits": [
              {
                "uuid": "f2d7c022-5e96-447d-9133-0ba65fe059f8",
                "destination_uuid": "c4191a3f-5194-40e5-a684-03aadf020221"
              }
            ]
          },
          {
            "uuid": "c4191a3f-5194-40e5-a684-03aadf020221",
            "actions": [],
            "exits": [
              {
                "uuid": "1c9bfa79-ec41-4730-b1fb-6a9e08870dd0",
                "destination_uuid": "0e6bc693-fa20-43c7-af16-ce3607f87ca5"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c3e0e440-97ff-4a0c-ae7d-ef6ccb83b8a9",
              "cases": [],
              "categories": [
                {
                  "uuid": "c3e0e440-97ff-4a0c-ae7d-ef6ccb83b8a9",
                  "name": "All Responses",
                  "exit_uuid": "1c9bfa79-ec41-4730-b1fb-6a9e08870dd0"
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
            "uuid": "0e6bc693-fa20-43c7-af16-ce3607f87ca5",
            "actions": [
              {
                "uuid": "25f0e922-cb62-418b-891f-59b35ba27516",
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
                "uuid": "57ad577f-8eb4-4211-a71f-821946be8bf0",
                "destination_uuid": "1ea4d2f3-20ac-48bc-b981-29e4a75548ad"
              }
            ]
          },
          {
            "uuid": "1ea4d2f3-20ac-48bc-b981-29e4a75548ad",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "49f97621-3479-455f-a338-9526829cd2d2",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "d5cb4d92-5481-4c8d-8fd0-cfd3005ae4c9",
                  "type": "has_only_phrase",
                  "uuid": "abfce94c-a5fc-4279-a3f9-438ca66a1fbb"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "d5cb4d92-5481-4c8d-8fd0-cfd3005ae4c9",
                  "type": "has_only_phrase",
                  "uuid": "c092a94e-66cc-4471-b4c7-be3b17eb3e21"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "d5cb4d92-5481-4c8d-8fd0-cfd3005ae4c9",
                  "type": "has_only_phrase",
                  "uuid": "d5f20abe-d40e-428d-bb93-a4ea518e1f91"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "d5cb4d92-5481-4c8d-8fd0-cfd3005ae4c9",
                  "type": "has_only_phrase",
                  "uuid": "a3c7e750-0fee-40ee-a371-9d758faa427a"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "d5cb4d92-5481-4c8d-8fd0-cfd3005ae4c9",
                  "type": "has_only_phrase",
                  "uuid": "edd08246-db7d-4f51-9110-5a44f1920a6a"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "0dc235f0-8b08-4e38-becf-680b1b67a589",
                  "type": "has_only_phrase",
                  "uuid": "a873631c-3f46-4cf8-accd-300275539588"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "0dc235f0-8b08-4e38-becf-680b1b67a589",
                  "type": "has_only_phrase",
                  "uuid": "26b09f63-96ad-4e02-b154-b981d85713f4"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "0dc235f0-8b08-4e38-becf-680b1b67a589",
                  "type": "has_only_phrase",
                  "uuid": "fb819d49-2fe7-4278-aaf1-074f28a858e4"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "0dc235f0-8b08-4e38-becf-680b1b67a589",
                  "type": "has_only_phrase",
                  "uuid": "4379d452-4ce6-447b-acc8-4440391c64ee"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c993c782-7167-4a69-9c40-74177e57772b",
                  "name": "All Responses",
                  "uuid": "49f97621-3479-455f-a338-9526829cd2d2"
                },
                {
                  "exit_uuid": "968ab4e2-6ea8-420f-accc-e24d1bb3aaf9",
                  "name": "0;1;2;3;4",
                  "uuid": "d5cb4d92-5481-4c8d-8fd0-cfd3005ae4c9"
                },
                {
                  "exit_uuid": "a974610f-e2cc-4424-9507-c8ab2f6ab66b",
                  "name": "5;6;7;8",
                  "uuid": "0dc235f0-8b08-4e38-becf-680b1b67a589"
                }
              ],
              "operand": "@fields.welcome_survey_q_2"
            },
            "exits": [
              {
                "uuid": "c993c782-7167-4a69-9c40-74177e57772b",
                "destination_uuid": null
              },
              {
                "uuid": "968ab4e2-6ea8-420f-accc-e24d1bb3aaf9",
                "destination_uuid": "d53bb08f-4fd2-49ec-b279-a1ab15c74a76"
              },
              {
                "uuid": "a974610f-e2cc-4424-9507-c8ab2f6ab66b",
                "destination_uuid": "43c34fa5-8873-4695-a68a-a4320a451044"
              }
            ]
          },
          {
            "uuid": "d53bb08f-4fd2-49ec-b279-a1ab15c74a76",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "49868cfa-0e34-48c2-9a87-c3e6af376192"
              }
            ],
            "exits": [
              {
                "uuid": "4069cf22-c0c6-4ed1-9999-f09ce0a6da4a",
                "destination_uuid": "8211dd4c-7370-4304-8185-32caa3e52e0e"
              }
            ]
          },
          {
            "uuid": "43c34fa5-8873-4695-a68a-a4320a451044",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "16eff8aa-38aa-4e93-a3f6-9866e1a0594c"
              }
            ],
            "exits": [
              {
                "uuid": "98fe721e-5632-4065-8813-49de3169feda",
                "destination_uuid": "8211dd4c-7370-4304-8185-32caa3e52e0e"
              }
            ]
          },
          {
            "uuid": "8211dd4c-7370-4304-8185-32caa3e52e0e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2c4d04f6-ae35-42f2-9f55-8525d446e169",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b319959f-62fa-4660-a78d-0aee795594cc",
                  "type": "has_only_phrase",
                  "uuid": "7b39ed02-9e7b-4d20-a453-eccc8b967ad6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5d2797b9-e172-4336-babe-4557a668f269",
                  "name": "All Responses",
                  "uuid": "2c4d04f6-ae35-42f2-9f55-8525d446e169"
                },
                {
                  "exit_uuid": "c90116f7-8305-4008-b282-74829f3d07f8",
                  "name": "Next",
                  "uuid": "b319959f-62fa-4660-a78d-0aee795594cc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5d2797b9-e172-4336-babe-4557a668f269",
                "destination_uuid": null
              },
              {
                "uuid": "c90116f7-8305-4008-b282-74829f3d07f8",
                "destination_uuid": "fd489fa2-25e6-4d28-82e7-2630a4856c84"
              }
            ]
          },
          {
            "uuid": "fd489fa2-25e6-4d28-82e7-2630a4856c84",
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
                "uuid": "2ccd8f06-9c96-4b9b-9c3a-0d8c7322b96b"
              }
            ],
            "exits": [
              {
                "uuid": "0248705f-2dbb-4b06-bec4-caf55a484c4c",
                "destination_uuid": "05ce86c4-209a-47e8-93d5-62285e3972d7"
              }
            ]
          },
          {
            "uuid": "05ce86c4-209a-47e8-93d5-62285e3972d7",
            "actions": [],
            "exits": [
              {
                "uuid": "b8a14407-c68d-439c-87e8-1133ce9d9aa2",
                "destination_uuid": "af23d76b-4410-4ac6-8ef9-15ae1c1e1a47"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "b06ea82c-1d00-4c82-9adc-67468d80b303",
              "cases": [],
              "categories": [
                {
                  "uuid": "b06ea82c-1d00-4c82-9adc-67468d80b303",
                  "name": "All Responses",
                  "exit_uuid": "b8a14407-c68d-439c-87e8-1133ce9d9aa2"
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
            "uuid": "af23d76b-4410-4ac6-8ef9-15ae1c1e1a47",
            "actions": [
              {
                "uuid": "3c61ab99-f55c-4250-864a-10912041f572",
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
                "uuid": "dde43de6-47d9-4ca2-99ec-08317fe6cd21",
                "destination_uuid": "b8452286-2a27-46a9-8d10-783389c84bb3"
              }
            ]
          },
          {
            "uuid": "b8452286-2a27-46a9-8d10-783389c84bb3",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "36834dc1-a4e7-4cfc-9ae7-968bf8e35b7e",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "fbba42cd-ce5d-410b-8d52-398a1b7e7c89",
                  "type": "has_only_phrase",
                  "uuid": "1cad5a06-5dbe-4b55-a8a8-fd15e041d6f2"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "fbba42cd-ce5d-410b-8d52-398a1b7e7c89",
                  "type": "has_only_phrase",
                  "uuid": "56c1c1ba-2371-4aeb-8add-5b130fe0a619"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "fbba42cd-ce5d-410b-8d52-398a1b7e7c89",
                  "type": "has_only_phrase",
                  "uuid": "dcb66d00-7bc2-462a-b8e6-a599ca160636"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "1bb9f829-1512-4985-b979-5fd4dc00033e",
                  "type": "has_only_phrase",
                  "uuid": "3604c6b7-1fb7-4a13-94ce-2d6bd1054b3f"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "1bb9f829-1512-4985-b979-5fd4dc00033e",
                  "type": "has_only_phrase",
                  "uuid": "f8db949a-ea68-46bc-9d75-53a397c7814a"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "1bb9f829-1512-4985-b979-5fd4dc00033e",
                  "type": "has_only_phrase",
                  "uuid": "1cdbbb32-548f-4821-98aa-cf0144fc7d8b"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "1bb9f829-1512-4985-b979-5fd4dc00033e",
                  "type": "has_only_phrase",
                  "uuid": "541ad21e-fda0-44b0-8406-3f387c820fbd"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "1bb9f829-1512-4985-b979-5fd4dc00033e",
                  "type": "has_only_phrase",
                  "uuid": "adf98d34-a537-48c7-a6bd-d9ce554e1524"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c98a9126-19b3-4654-9b8e-191c402a13bc",
                  "name": "All Responses",
                  "uuid": "36834dc1-a4e7-4cfc-9ae7-968bf8e35b7e"
                },
                {
                  "exit_uuid": "40764379-47a5-492a-a571-9d42eaaf8db6",
                  "name": "0;1;2",
                  "uuid": "fbba42cd-ce5d-410b-8d52-398a1b7e7c89"
                },
                {
                  "exit_uuid": "42bc2457-f287-4d4e-ba1f-5598b215bd67",
                  "name": "3;4;5;6;7",
                  "uuid": "1bb9f829-1512-4985-b979-5fd4dc00033e"
                }
              ],
              "operand": "@fields.welcome_survey_q_3"
            },
            "exits": [
              {
                "uuid": "c98a9126-19b3-4654-9b8e-191c402a13bc",
                "destination_uuid": null
              },
              {
                "uuid": "40764379-47a5-492a-a571-9d42eaaf8db6",
                "destination_uuid": "8cfaecda-af31-4140-979f-a0fb6de87ff2"
              },
              {
                "uuid": "42bc2457-f287-4d4e-ba1f-5598b215bd67",
                "destination_uuid": "0278fd81-cbc8-4ef7-922a-dbca0dcd0dac"
              }
            ]
          },
          {
            "uuid": "8cfaecda-af31-4140-979f-a0fb6de87ff2",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "bf42c10e-390e-4c16-a627-e20c3c09b3c7"
              }
            ],
            "exits": [
              {
                "uuid": "05ca5b45-336b-498e-aac4-96dcb46b8905",
                "destination_uuid": "5135dadd-be33-4e9f-b54d-ff77338903d2"
              }
            ]
          },
          {
            "uuid": "0278fd81-cbc8-4ef7-922a-dbca0dcd0dac",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "f3b83b68-f740-409e-9350-99503dfe00a0"
              }
            ],
            "exits": [
              {
                "uuid": "1091fc35-371e-4ae5-ad4b-77aef77e70f0",
                "destination_uuid": "5135dadd-be33-4e9f-b54d-ff77338903d2"
              }
            ]
          },
          {
            "uuid": "5135dadd-be33-4e9f-b54d-ff77338903d2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fb55700c-d247-4c13-95dc-78aac96c7e3f",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "176ad23d-cb77-4f5e-9af0-b251ca42686f",
                  "type": "has_only_phrase",
                  "uuid": "638ebcfc-ded6-43a7-833a-6eb3c6a020c8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1e14adeb-f3c3-4fb3-8c54-7d8729d9e3b9",
                  "name": "All Responses",
                  "uuid": "fb55700c-d247-4c13-95dc-78aac96c7e3f"
                },
                {
                  "exit_uuid": "3ce8d02c-560a-4b42-89aa-7e3e63f58dfe",
                  "name": "Next",
                  "uuid": "176ad23d-cb77-4f5e-9af0-b251ca42686f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1e14adeb-f3c3-4fb3-8c54-7d8729d9e3b9",
                "destination_uuid": null
              },
              {
                "uuid": "3ce8d02c-560a-4b42-89aa-7e3e63f58dfe",
                "destination_uuid": "deac7b59-0473-4f8a-b5d8-84f11537bb98"
              }
            ]
          },
          {
            "uuid": "deac7b59-0473-4f8a-b5d8-84f11537bb98",
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
                "uuid": "64f5751d-2640-42ea-9066-3ef71b18e520"
              }
            ],
            "exits": [
              {
                "uuid": "27c2471d-24ff-4fc8-a52f-b32b985b9667",
                "destination_uuid": "2671d61f-99da-4c70-8ade-e878c7166f71"
              }
            ]
          },
          {
            "uuid": "2671d61f-99da-4c70-8ade-e878c7166f71",
            "actions": [],
            "exits": [
              {
                "uuid": "9d1a22fd-8b5c-4cf5-8654-8868151e8da5",
                "destination_uuid": "f8adcf10-af99-4463-8642-e6b8aa851527"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3eb457cf-a83e-4be3-903e-2952fad6ae06",
              "cases": [],
              "categories": [
                {
                  "uuid": "3eb457cf-a83e-4be3-903e-2952fad6ae06",
                  "name": "All Responses",
                  "exit_uuid": "9d1a22fd-8b5c-4cf5-8654-8868151e8da5"
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
            "uuid": "f8adcf10-af99-4463-8642-e6b8aa851527",
            "actions": [
              {
                "uuid": "23885d48-f0df-40b1-bad0-6395f03ec57e",
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
                "uuid": "fa2b9fee-6151-45ba-85e7-3ccae13597a4",
                "destination_uuid": "2b0d0ff0-eaba-4aa8-9173-aa8b617aecda"
              }
            ]
          },
          {
            "uuid": "2b0d0ff0-eaba-4aa8-9173-aa8b617aecda",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "215018c9-c4b6-4b2e-8cf0-23182e81863f",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "e67a3781-4a87-44ab-9f51-831fd0ddbd8e",
                  "type": "has_only_phrase",
                  "uuid": "7aa96be2-e2bf-4e77-b1e0-c702cce08fd1"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "e67a3781-4a87-44ab-9f51-831fd0ddbd8e",
                  "type": "has_only_phrase",
                  "uuid": "c98aab0b-34b1-4a2c-8894-e7e6b40d1495"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "93a82064-a6a2-49ff-9ae2-787dcc8c40e8",
                  "type": "has_only_phrase",
                  "uuid": "e6c67c37-d108-4f00-9e35-4e569b5f61bc"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "93a82064-a6a2-49ff-9ae2-787dcc8c40e8",
                  "type": "has_only_phrase",
                  "uuid": "2adc210e-9d88-48b5-a033-3f5ebc1e17a3"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "93a82064-a6a2-49ff-9ae2-787dcc8c40e8",
                  "type": "has_only_phrase",
                  "uuid": "d962dd2a-769e-4f4e-9b15-9dcb0fac64f5"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "93a82064-a6a2-49ff-9ae2-787dcc8c40e8",
                  "type": "has_only_phrase",
                  "uuid": "e5968b25-d1de-464b-95ed-a57c66eacc09"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "93a82064-a6a2-49ff-9ae2-787dcc8c40e8",
                  "type": "has_only_phrase",
                  "uuid": "ae9e52dc-ddc5-4669-908a-d4aa6497f39a"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "93a82064-a6a2-49ff-9ae2-787dcc8c40e8",
                  "type": "has_only_phrase",
                  "uuid": "ce764b86-78a8-4021-b5e0-458c8ea418c4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "10d904f2-1370-43da-b029-eaf47c0a9903",
                  "name": "All Responses",
                  "uuid": "215018c9-c4b6-4b2e-8cf0-23182e81863f"
                },
                {
                  "exit_uuid": "eda01a86-0f1e-41fc-9197-98ab9506172c",
                  "name": "0;1",
                  "uuid": "e67a3781-4a87-44ab-9f51-831fd0ddbd8e"
                },
                {
                  "exit_uuid": "8f439764-dda0-4949-993e-ca87a08a56bd",
                  "name": "2;3;4;5;6;7",
                  "uuid": "93a82064-a6a2-49ff-9ae2-787dcc8c40e8"
                }
              ],
              "operand": "@fields.welcome_survey_q_4"
            },
            "exits": [
              {
                "uuid": "10d904f2-1370-43da-b029-eaf47c0a9903",
                "destination_uuid": null
              },
              {
                "uuid": "eda01a86-0f1e-41fc-9197-98ab9506172c",
                "destination_uuid": "87da20cb-0d4c-4b1e-b158-7875f1d08bea"
              },
              {
                "uuid": "8f439764-dda0-4949-993e-ca87a08a56bd",
                "destination_uuid": "fade61fb-909e-49a8-a6e5-0962fb9df349"
              }
            ]
          },
          {
            "uuid": "87da20cb-0d4c-4b1e-b158-7875f1d08bea",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "cb62cea1-5719-46e1-8624-d7d88ae82086"
              }
            ],
            "exits": [
              {
                "uuid": "5bb2ec6d-382c-4b77-b68b-37df3e38cee0",
                "destination_uuid": "21cd00fe-3a2c-45c3-8181-90e19349c229"
              }
            ]
          },
          {
            "uuid": "fade61fb-909e-49a8-a6e5-0962fb9df349",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "2769956c-956a-410f-b596-b83d089530b8"
              }
            ],
            "exits": [
              {
                "uuid": "f131e68d-3e43-4123-83f7-cc1769b015d5",
                "destination_uuid": "21cd00fe-3a2c-45c3-8181-90e19349c229"
              }
            ]
          },
          {
            "uuid": "21cd00fe-3a2c-45c3-8181-90e19349c229",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bb33a0ae-1180-4010-99b9-4d92222cadf7",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "bc0688d9-b406-4605-9a6b-2e07f0bd73cc",
                  "type": "has_only_phrase",
                  "uuid": "4aab725a-b5c5-49bd-94a9-748dae8d5e49"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5d96e087-5ae8-4cde-b5e7-410c7cc6afab",
                  "name": "All Responses",
                  "uuid": "bb33a0ae-1180-4010-99b9-4d92222cadf7"
                },
                {
                  "exit_uuid": "ee3759bf-05b2-4715-9fad-09e7bd2723b7",
                  "name": "Next",
                  "uuid": "bc0688d9-b406-4605-9a6b-2e07f0bd73cc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5d96e087-5ae8-4cde-b5e7-410c7cc6afab",
                "destination_uuid": null
              },
              {
                "uuid": "ee3759bf-05b2-4715-9fad-09e7bd2723b7",
                "destination_uuid": "5ba06fc4-4623-4083-8a3c-ed4653f773be"
              }
            ]
          },
          {
            "uuid": "5ba06fc4-4623-4083-8a3c-ed4653f773be",
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
                "uuid": "f843e73b-cc5c-4418-a88c-a5f85a615190"
              }
            ],
            "exits": [
              {
                "uuid": "09d5bf2e-5c04-428b-9c55-d3659681dbbf",
                "destination_uuid": "8dd115a2-e93b-4336-8ac2-6e3aa6f694e0"
              }
            ]
          },
          {
            "uuid": "8dd115a2-e93b-4336-8ac2-6e3aa6f694e0",
            "actions": [],
            "exits": [
              {
                "uuid": "6b8e6770-1de2-43e5-8649-8aa3578daf51",
                "destination_uuid": "8ec52c65-def8-40a2-b373-75701289e04f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "cb67d642-f5da-4886-be33-34e69cd39733",
              "cases": [],
              "categories": [
                {
                  "uuid": "cb67d642-f5da-4886-be33-34e69cd39733",
                  "name": "All Responses",
                  "exit_uuid": "6b8e6770-1de2-43e5-8649-8aa3578daf51"
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
            "uuid": "8ec52c65-def8-40a2-b373-75701289e04f",
            "actions": [
              {
                "uuid": "e532cbb5-ab51-445a-94ac-3f6192fddaed",
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
                "uuid": "01b04b45-37a7-4e84-b847-963fa542fbd9",
                "destination_uuid": "3524ef39-c3ee-4567-adf9-c4e5fcd7196c"
              }
            ]
          },
          {
            "uuid": "0ce794ae-9f65-4936-922f-a7d8ffaf0b2c",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "9e54c6a3-9064-46fe-91cf-72206384f240"
              }
            ],
            "exits": [
              {
                "uuid": "a99791fc-8308-4cb8-b77d-4b4ea1def96b",
                "destination_uuid": "21a567e5-bbb5-4db7-b05f-a02fb5c70e94"
              }
            ]
          },
          {
            "uuid": "3524ef39-c3ee-4567-adf9-c4e5fcd7196c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "81249910-bc90-476e-a3a4-72b2617d97f2",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "2b1126c6-49ba-40cd-a05f-82da0f7b6798",
                  "type": "has_only_phrase",
                  "uuid": "e052412c-349e-4ef2-8c59-ef0f04b46db2"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "2b1126c6-49ba-40cd-a05f-82da0f7b6798",
                  "type": "has_only_phrase",
                  "uuid": "b47f1f71-c424-4d10-a400-889c5870d332"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "2b1126c6-49ba-40cd-a05f-82da0f7b6798",
                  "type": "has_only_phrase",
                  "uuid": "e893d458-7882-4f78-8bd4-1ff27d5e956b"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "2b1126c6-49ba-40cd-a05f-82da0f7b6798",
                  "type": "has_only_phrase",
                  "uuid": "0b799057-fed7-4192-854f-c89715119366"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "2b1126c6-49ba-40cd-a05f-82da0f7b6798",
                  "type": "has_only_phrase",
                  "uuid": "9b5a1392-da1e-4962-964f-8f94e5b1a029"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "2b1126c6-49ba-40cd-a05f-82da0f7b6798",
                  "type": "has_only_phrase",
                  "uuid": "04fc1df7-c682-4ec4-920e-9162a8a07b6f"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "2b1126c6-49ba-40cd-a05f-82da0f7b6798",
                  "type": "has_only_phrase",
                  "uuid": "d98da2f4-5c99-49f8-9681-ba0d8d23f8fa"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f65adcb7-6ee8-4e46-9564-ba214d646ad3",
                  "name": "All Responses",
                  "uuid": "81249910-bc90-476e-a3a4-72b2617d97f2"
                },
                {
                  "exit_uuid": "53cc2799-6b7a-4f23-a76d-e6fb6d681aa9",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "2b1126c6-49ba-40cd-a05f-82da0f7b6798"
                }
              ],
              "operand": "@fields.welcome_survey_q_5"
            },
            "exits": [
              {
                "uuid": "f65adcb7-6ee8-4e46-9564-ba214d646ad3",
                "destination_uuid": "0ce794ae-9f65-4936-922f-a7d8ffaf0b2c"
              },
              {
                "uuid": "53cc2799-6b7a-4f23-a76d-e6fb6d681aa9",
                "destination_uuid": "efac163e-36a6-484a-a501-7f3e1000ce6f"
              }
            ]
          },
          {
            "uuid": "efac163e-36a6-484a-a501-7f3e1000ce6f",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c8ac897c-863e-406d-a0f0-46fdb3f4cc65"
              }
            ],
            "exits": [
              {
                "uuid": "d52838ce-2482-47cf-88c1-86f2a095939e",
                "destination_uuid": "21a567e5-bbb5-4db7-b05f-a02fb5c70e94"
              }
            ]
          },
          {
            "uuid": "21a567e5-bbb5-4db7-b05f-a02fb5c70e94",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b541ba27-bfcd-4b08-aa74-6c86fdff9e87",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "a87aa592-6c7d-490a-800e-007a7104d700",
                  "type": "has_only_phrase",
                  "uuid": "33a790b9-6af7-414c-a173-4d8232671e69"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e672640e-5918-42dc-ae82-4b5ed1a408cc",
                  "name": "All Responses",
                  "uuid": "b541ba27-bfcd-4b08-aa74-6c86fdff9e87"
                },
                {
                  "exit_uuid": "3b1019c6-4ffd-4588-b5d4-b28930afd59a",
                  "name": "Next",
                  "uuid": "a87aa592-6c7d-490a-800e-007a7104d700"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e672640e-5918-42dc-ae82-4b5ed1a408cc",
                "destination_uuid": null
              },
              {
                "uuid": "3b1019c6-4ffd-4588-b5d4-b28930afd59a",
                "destination_uuid": "eea3b2a7-d2c9-4484-b6d7-f9d78d6109c4"
              }
            ]
          },
          {
            "uuid": "eea3b2a7-d2c9-4484-b6d7-f9d78d6109c4",
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
                "uuid": "95ab87d9-ae2a-4b45-98ed-ca05189b2825"
              }
            ],
            "exits": [
              {
                "uuid": "0b73631b-ed33-4edd-b27a-f11e80249108",
                "destination_uuid": "26767d4e-b768-4444-bb15-c3eeed651bd5"
              }
            ]
          },
          {
            "uuid": "26767d4e-b768-4444-bb15-c3eeed651bd5",
            "actions": [],
            "exits": [
              {
                "uuid": "eae7156d-de3c-419b-bdda-e36477836b62",
                "destination_uuid": "f8c27178-2511-459e-9dc5-56833b2e9d6c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "17c0d937-6a45-44d7-862b-0d6464f20772",
              "cases": [],
              "categories": [
                {
                  "uuid": "17c0d937-6a45-44d7-862b-0d6464f20772",
                  "name": "All Responses",
                  "exit_uuid": "eae7156d-de3c-419b-bdda-e36477836b62"
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
            "uuid": "f8c27178-2511-459e-9dc5-56833b2e9d6c",
            "actions": [
              {
                "uuid": "a8410b0f-c33b-4da6-9270-6d4cbaf88fef",
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
                "uuid": "fc0e2c6a-9ff2-46d7-b839-ceb2e04d5f4f",
                "destination_uuid": "d5c8511c-10a0-4a72-bbbb-5f9e8d8bfffe"
              }
            ]
          },
          {
            "uuid": "d5c8511c-10a0-4a72-bbbb-5f9e8d8bfffe",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "24ed3f9b-e2a5-47bc-976d-ad1d100b463b",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "49d4543c-3ab6-4000-a51a-4c967d7d6be7",
                  "type": "has_only_phrase",
                  "uuid": "df8ce858-4b33-4f55-9746-b6b6b16c1cd3"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "49d4543c-3ab6-4000-a51a-4c967d7d6be7",
                  "type": "has_only_phrase",
                  "uuid": "ef972c4b-3f0d-45c0-a21e-66ec4dbb4a29"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "49d4543c-3ab6-4000-a51a-4c967d7d6be7",
                  "type": "has_only_phrase",
                  "uuid": "8b58372f-bf67-4bef-97c4-132011fc0a56"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "49d4543c-3ab6-4000-a51a-4c967d7d6be7",
                  "type": "has_only_phrase",
                  "uuid": "f6af56c2-b8b3-4337-a7d6-6a2a05b749b3"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "49d4543c-3ab6-4000-a51a-4c967d7d6be7",
                  "type": "has_only_phrase",
                  "uuid": "d24bcc1e-6a0f-44ae-9e67-03c95e9dca2b"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "0075969e-741b-4b86-a3c2-df2531953014",
                  "type": "has_only_phrase",
                  "uuid": "1ffca7b5-67bc-4884-9716-066319fa0a52"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "0075969e-741b-4b86-a3c2-df2531953014",
                  "type": "has_only_phrase",
                  "uuid": "f9c7121d-280b-4bee-b36e-5f481619cffe"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "0075969e-741b-4b86-a3c2-df2531953014",
                  "type": "has_only_phrase",
                  "uuid": "e2353549-932e-4610-8efd-df44f66c2f84"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "0075969e-741b-4b86-a3c2-df2531953014",
                  "type": "has_only_phrase",
                  "uuid": "1b2382ba-6c81-4384-8dae-8ba97f4225bc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "aac1643f-4af7-4dae-b7e8-d3635021febe",
                  "name": "All Responses",
                  "uuid": "24ed3f9b-e2a5-47bc-976d-ad1d100b463b"
                },
                {
                  "exit_uuid": "02dcc44c-bcab-46c7-b12e-f980011c72fa",
                  "name": "0;1;2;3;4",
                  "uuid": "49d4543c-3ab6-4000-a51a-4c967d7d6be7"
                },
                {
                  "exit_uuid": "3169ba5c-d3fb-45c4-8515-9bc248217758",
                  "name": "5;6;7;8",
                  "uuid": "0075969e-741b-4b86-a3c2-df2531953014"
                }
              ],
              "operand": "@fields.welcome_survey_q_6"
            },
            "exits": [
              {
                "uuid": "aac1643f-4af7-4dae-b7e8-d3635021febe",
                "destination_uuid": null
              },
              {
                "uuid": "02dcc44c-bcab-46c7-b12e-f980011c72fa",
                "destination_uuid": "c566ce4e-e5ca-450a-8dde-d686a06b14bf"
              },
              {
                "uuid": "3169ba5c-d3fb-45c4-8515-9bc248217758",
                "destination_uuid": "bbcecfef-ee44-4fc7-902d-bcdbdd3f8c58"
              }
            ]
          },
          {
            "uuid": "c566ce4e-e5ca-450a-8dde-d686a06b14bf",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "9aea8cfd-0dd6-4f75-82fd-1bb2aa5c3543"
              }
            ],
            "exits": [
              {
                "uuid": "85bd62c2-d036-4b6a-a161-d535e8f5f1e0",
                "destination_uuid": "2049d27b-bfa7-470a-a745-69c830c9e749"
              }
            ]
          },
          {
            "uuid": "bbcecfef-ee44-4fc7-902d-bcdbdd3f8c58",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6b83f13d-e784-4a11-bb47-6f02a54656b3"
              }
            ],
            "exits": [
              {
                "uuid": "70aa9d0a-d99e-4b0b-83a0-f3eb3101cac2",
                "destination_uuid": "2049d27b-bfa7-470a-a745-69c830c9e749"
              }
            ]
          },
          {
            "uuid": "2049d27b-bfa7-470a-a745-69c830c9e749",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "370e5d4f-912f-4224-9794-562452039a51",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "65a719ce-66e4-40a2-9822-1747a2c0a5ed",
                  "type": "has_only_phrase",
                  "uuid": "ab800306-9a6a-49cf-b1e4-4982d51b9c08"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "368d7783-76f9-44e6-95db-4cb23aaab138",
                  "name": "All Responses",
                  "uuid": "370e5d4f-912f-4224-9794-562452039a51"
                },
                {
                  "exit_uuid": "66586dba-b9e2-48d7-b44a-6e77b3dd6046",
                  "name": "Next",
                  "uuid": "65a719ce-66e4-40a2-9822-1747a2c0a5ed"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "368d7783-76f9-44e6-95db-4cb23aaab138",
                "destination_uuid": null
              },
              {
                "uuid": "66586dba-b9e2-48d7-b44a-6e77b3dd6046",
                "destination_uuid": "cf759bec-9401-461a-acac-3730d64000d4"
              }
            ]
          },
          {
            "uuid": "cf759bec-9401-461a-acac-3730d64000d4",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "e784562f-71c2-49ff-ad2f-5273807f2bce"
              }
            ],
            "exits": [
              {
                "uuid": "731f0f77-2ad5-4c53-a0aa-7a2cb49eda50",
                "destination_uuid": "e4c4d83f-a576-4383-a4ca-d3cfdde75836"
              }
            ]
          },
          {
            "uuid": "e4c4d83f-a576-4383-a4ca-d3cfdde75836",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "5252e3f2-ca5e-49fd-98fb-d60bc4643e4b",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9d09e530-66f7-4853-aa89-2978056cdc23",
                  "type": "has_only_phrase",
                  "uuid": "be06b943-ec4c-4f83-b7b8-bb9d91e3c603"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1776e62d-b2d7-41f7-9b58-9274f22195e3",
                  "name": "All Responses",
                  "uuid": "5252e3f2-ca5e-49fd-98fb-d60bc4643e4b"
                },
                {
                  "exit_uuid": "1cb125e5-33cb-44ef-97f2-38286970d225",
                  "name": "Next",
                  "uuid": "9d09e530-66f7-4853-aa89-2978056cdc23"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1776e62d-b2d7-41f7-9b58-9274f22195e3",
                "destination_uuid": null
              },
              {
                "uuid": "1cb125e5-33cb-44ef-97f2-38286970d225",
                "destination_uuid": "d40f7c17-8e06-4b64-ae39-63ccc60f1846"
              }
            ]
          },
          {
            "uuid": "d40f7c17-8e06-4b64-ae39-63ccc60f1846",
            "actions": [
              {
                "uuid": "6efceb6b-49cd-4d7e-b93d-a328dc0595c7",
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
                "uuid": "e2249c60-b50f-4b00-8fce-d99d36d5b890",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "de48030a-816b-49ea-a5f5-abe1187b7a30",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c01cb76e-4fa9-4cbb-b6ab-d67ead8d5e2d",
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
                "uuid": "5b95b3cb-56a0-49d2-a69f-970cc4af2dfc"
              }
            ],
            "exits": [
              {
                "uuid": "6569febf-e225-4f35-a731-2d60f04b9921",
                "destination_uuid": "63219568-a586-4569-97d3-43ffe9e8941a"
              }
            ]
          },
          {
            "uuid": "63219568-a586-4569-97d3-43ffe9e8941a",
            "actions": [],
            "exits": [
              {
                "uuid": "77130bf3-df69-4e46-9241-31d47f9c61fa",
                "destination_uuid": "231c0158-a0bb-4f14-9883-d7768cc2a2c7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "7dd2272f-cb23-45c4-a57e-36b632b1c5ff",
              "cases": [],
              "categories": [
                {
                  "uuid": "7dd2272f-cb23-45c4-a57e-36b632b1c5ff",
                  "name": "All Responses",
                  "exit_uuid": "77130bf3-df69-4e46-9241-31d47f9c61fa"
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
            "uuid": "231c0158-a0bb-4f14-9883-d7768cc2a2c7",
            "actions": [
              {
                "uuid": "7ed5a2df-d31c-4b3a-b98e-f1be1b73899c",
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
                "uuid": "0bac125c-333c-47fc-8aff-88bb1c962653",
                "destination_uuid": "5c4cf02e-174a-4618-8428-0d146ce074ea"
              }
            ]
          },
          {
            "uuid": "5c4cf02e-174a-4618-8428-0d146ce074ea",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of yourself is an important parenting skill! Every time you do one of these, mark your STAR.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9ecd9ab4-3c52-47cb-9191-3c74233d39b7"
              }
            ],
            "exits": [
              {
                "uuid": "1939de97-6402-451f-94fe-b8a7bc013176",
                "destination_uuid": "4d41f90f-f828-4a7d-aadd-03df734dbf7e"
              }
            ]
          },
          {
            "uuid": "4d41f90f-f828-4a7d-aadd-03df734dbf7e",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "Now let’s do a 30 second quick relaxation activity",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a70549a5-1ce4-4486-ac54-c9fbee96389a"
              }
            ],
            "exits": [
              {
                "uuid": "25150d91-1869-44ab-9383-0dcec35f1960",
                "destination_uuid": "b050f9c1-6c55-476f-8536-01c864a2adab"
              }
            ]
          },
          {
            "uuid": "b050f9c1-6c55-476f-8536-01c864a2adab",
            "actions": [
              {
                "flow": {
                  "name": "calm5",
                  "uuid": "5b65a457-292a-45fc-a6de-20ccd30c57cb"
                },
                "type": "enter_flow",
                "uuid": "c0a2f432-baea-4707-834b-54069448431d"
              }
            ],
            "exits": [
              {
                "uuid": "7d803174-d844-45f9-9586-ddbbd3cf2237",
                "destination_uuid": null
              },
              {
                "uuid": "d7287341-633e-4a73-9169-25743a431b5f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e984c873-a907-40bb-bf15-1eaf21ca5781",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "e200a5bf-c4a6-4f20-9bd8-485da6d15633"
                },
                {
                  "uuid": "f9f2d479-d85c-434c-83a5-5ab7e8bdb63f",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "2822bb79-9fa0-446e-bbdb-6c4860470107"
                }
              ],
              "categories": [
                {
                  "uuid": "e200a5bf-c4a6-4f20-9bd8-485da6d15633",
                  "name": "Complete",
                  "exit_uuid": "7d803174-d844-45f9-9586-ddbbd3cf2237"
                },
                {
                  "uuid": "2822bb79-9fa0-446e-bbdb-6c4860470107",
                  "name": "Expired",
                  "exit_uuid": "d7287341-633e-4a73-9169-25743a431b5f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "e200a5bf-c4a6-4f20-9bd8-485da6d15633"
            }
          },
          {
            "uuid": "fb94a181-f006-4052-8683-2786a1f9825c",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Do this every day and mark your STAR to track your success. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ef4107d3-eba1-4aa1-8624-be57212273c0"
              }
            ],
            "exits": [
              {
                "uuid": "169ea792-465c-4233-b1ef-300ddb8663a9",
                "destination_uuid": "a39b331a-b2e8-4192-8410-8aa69b94331b"
              }
            ]
          },
          {
            "uuid": "a39b331a-b2e8-4192-8410-8aa69b94331b",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relax. https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true&tickedByDefault=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "505169e6-a1b2-4c52-8306-4fc4895cb669"
              }
            ],
            "exits": [
              {
                "uuid": "0ffac28f-70bb-417f-88c5-d407b6b4600e",
                "destination_uuid": "88d2620e-e74a-4796-a62b-cedba17d5474"
              }
            ]
          },
          {
            "uuid": "88d2620e-e74a-4796-a62b-cedba17d5474",
            "actions": [],
            "exits": [
              {
                "uuid": "4d9b828f-4d1d-4977-a469-c37581fd0617",
                "destination_uuid": "3aa2556c-2d8c-40ad-a3f7-3a9f1802cb2f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "4896fb7d-e3ee-4f84-afc3-0bbbe076e573",
              "cases": [],
              "categories": [
                {
                  "uuid": "4896fb7d-e3ee-4f84-afc3-0bbbe076e573",
                  "name": "All Responses",
                  "exit_uuid": "4d9b828f-4d1d-4977-a469-c37581fd0617"
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
            "uuid": "3aa2556c-2d8c-40ad-a3f7-3a9f1802cb2f",
            "actions": [
              {
                "uuid": "381b2d9e-9edc-4596-a988-c1cc74d1fb83",
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
                "uuid": "6f8941c1-e7fd-465f-876c-10bf5aeec40d",
                "destination_uuid": "3acbc311-1681-48d1-b7e0-b68ac6e319ae"
              }
            ]
          },
          {
            "uuid": "3acbc311-1681-48d1-b7e0-b68ac6e319ae",
            "actions": [
              {
                "attachments": [],
                "text": "You can get a relax anytime on the home screen.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d98e967d-6d28-4a66-982c-36f18a4d875e"
              }
            ],
            "exits": [
              {
                "uuid": "8fe1d54e-f1e0-428f-b4c2-99de93757dbb",
                "destination_uuid": "acac18e4-e07d-4a1e-9b84-847ca729111a"
              }
            ]
          },
          {
            "uuid": "acac18e4-e07d-4a1e-9b84-847ca729111a",
            "actions": [
              {
                "attachments": [],
                "text": "Now go @fields.mod_welcome_happy",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9eb6951f-4662-46aa-b5fe-888305451b8d"
              }
            ],
            "exits": [
              {
                "uuid": "e27db624-397f-49b4-8bd1-6c6185a5545c",
                "destination_uuid": "6eaf340f-54e2-43d3-a1dc-7582287df7ae"
              }
            ]
          },
          {
            "uuid": "6eaf340f-54e2-43d3-a1dc-7582287df7ae",
            "actions": [
              {
                "uuid": "cccb494b-7353-4d27-a0ff-4f246881ac39",
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
                "uuid": "9b2dbc69-e59a-4811-b528-838186002e1b",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "6c06b674-8be7-4c4c-9ec3-e073a97425e2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "e3cdd2a7-3a38-4520-8de3-698152d7e587",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud.  \n\nCan you think of one thing that your teenager has done recently that you want them to do more of?   \n\nThis can be even a small thing such as  \n - came home on time  \n - said something nice  \n- smiled \n\nTry telling your teen how much you appreciated that. Over time they will want to do these more.  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "da33cf68-5901-468b-a119-82f6e95d8c8f"
              }
            ],
            "exits": [
              {
                "uuid": "f439b477-d2f4-4edc-a744-74e4145e6d96",
                "destination_uuid": "4291de8d-56cd-4c9e-954e-c9f17ba0b0e1"
              }
            ]
          },
          {
            "uuid": "4291de8d-56cd-4c9e-954e-c9f17ba0b0e1",
            "actions": [
              {
                "uuid": "cdd86fcb-6e59-4c78-8ec6-e65942f57ecb",
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
                "uuid": "ab81f245-9cc9-48f9-8ee7-155a59fba7a4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "0079a6e0-c213-4043-b4ac-2404dbd92674",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6cc989ff-6548-4004-9a17-6cc7946c04c9",
            "actions": [
              {
                "attachments": [],
                "text": "Is there a photo of you, your teen or your family which makes you smile? If yes, upload it here!",
                "type": "send_msg",
                "quick_replies": [
                  "Yes! I'll upload a photo now",
                  "Prefer not to"
                ],
                "uuid": "6a2e7da2-c081-4e66-8dec-2835a5cc9f2b"
              }
            ],
            "exits": [
              {
                "uuid": "db25cac2-44b6-4c04-a84d-e5893e9c4b5a",
                "destination_uuid": "7b5f0ed8-3217-4873-a616-e0dbb54a4270"
              }
            ]
          },
          {
            "uuid": "7b5f0ed8-3217-4873-a616-e0dbb54a4270",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bcb8c9fb-b1b7-4fac-88f2-ddc87fce2f41",
              "cases": [
                {
                  "arguments": [
                    "Yes! I'll upload a photo now"
                  ],
                  "category_uuid": "7595176e-01ed-45bb-80e1-a1e79ddb7882",
                  "type": "has_only_phrase",
                  "uuid": "ff4bc7e5-ae14-4d6f-8716-d57d129ef2a4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5401da4f-590f-45d7-9509-8ee889051b76",
                  "name": "All Responses",
                  "uuid": "bcb8c9fb-b1b7-4fac-88f2-ddc87fce2f41"
                },
                {
                  "exit_uuid": "507f89d6-6bdb-4cee-993e-34bb83f060ec",
                  "name": "Yes! I'll upload a photo now",
                  "uuid": "7595176e-01ed-45bb-80e1-a1e79ddb7882"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5401da4f-590f-45d7-9509-8ee889051b76",
                "destination_uuid": null
              },
              {
                "uuid": "507f89d6-6bdb-4cee-993e-34bb83f060ec",
                "destination_uuid": "c7a12545-edc5-4817-9f5e-f24accabb1ab"
              }
            ]
          },
          {
            "uuid": "c7a12545-edc5-4817-9f5e-f24accabb1ab",
            "actions": [
              {
                "uuid": "ca42063d-9054-40ff-aad1-e1fc0e28a0a5",
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
                "uuid": "632bb48d-9a2c-4765-bab8-5fec956a8c78",
                "destination_uuid": "02d33910-079d-46c9-a7cf-5ad1359eece4"
              }
            ]
          },
          {
            "uuid": "02d33910-079d-46c9-a7cf-5ad1359eece4",
            "actions": [
              {
                "flow": {
                  "name": "gallery",
                  "uuid": "d2d504f5-12b7-4637-8aaa-3c421bf81e3b"
                },
                "type": "enter_flow",
                "uuid": "364fb924-8571-4d81-9635-4b7180886add"
              }
            ],
            "exits": [
              {
                "uuid": "de816ef9-9874-4fb3-850c-993f297d32e1",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "4e8338d6-38f8-478d-9c66-b713704da907",
            "actions": [
              {
                "uuid": "461ef3ba-7e49-4aa6-8b30-b2a9442691ca",
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
                "uuid": "7af4b46c-ea48-477f-bbff-4307bf37e42d",
                "destination_uuid": "db5ebd6e-38b4-432c-95fb-001ddd4a4d56"
              }
            ]
          },
          {
            "uuid": "db5ebd6e-38b4-432c-95fb-001ddd4a4d56",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "8e0a8ce2-790d-48c9-8201-ad37dce938db"
                },
                "type": "enter_flow",
                "uuid": "b53e6eb2-1d58-4e0f-ac9e-adea7c61827d"
              }
            ],
            "exits": [
              {
                "uuid": "34daa3fd-150c-4ca9-8664-ebe7eefb9367",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "70faece4-4cca-4841-9927-9d02729c8270",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "75170081-b128-4799-9850-a85c50ead10d",
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
                "uuid": "00b26c16-a715-489e-8c7c-77874cefacfd"
              }
            ],
            "exits": [
              {
                "uuid": "c21ec0f4-e088-418e-b04d-dc8ca43187ea",
                "destination_uuid": "53fa83f8-0db7-4ab9-a242-502af04296f8"
              }
            ]
          },
          {
            "uuid": "53fa83f8-0db7-4ab9-a242-502af04296f8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "eff5ab5a-ad1e-4090-807d-8b6ed34c86ef",
              "cases": [
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "e5a438a4-1152-435e-927e-719133e52f24",
                  "type": "has_only_phrase",
                  "uuid": "91000c16-366b-4baa-8a29-e7a7e46b54b4"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "ea7f4e09-60fa-40a2-982c-038ef840fcd6",
                  "type": "has_only_phrase",
                  "uuid": "1c916095-bf2c-449c-824e-8700b160dad4"
                },
                {
                  "arguments": [
                    "Sad"
                  ],
                  "category_uuid": "ea7f4e09-60fa-40a2-982c-038ef840fcd6",
                  "type": "has_only_phrase",
                  "uuid": "227b00b3-561a-4060-805c-f68f89a1eb52"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c276e9c2-0c24-44ae-bff1-6d38b5e98acb",
                  "name": "All Responses",
                  "uuid": "eff5ab5a-ad1e-4090-807d-8b6ed34c86ef"
                },
                {
                  "exit_uuid": "06fee902-28c0-4d49-93a3-82c25d89a3d0",
                  "name": "Happy",
                  "uuid": "e5a438a4-1152-435e-927e-719133e52f24"
                },
                {
                  "exit_uuid": "77970dc7-47f3-43da-84e1-5bb71b0042a5",
                  "name": "Neutral; Sad",
                  "uuid": "ea7f4e09-60fa-40a2-982c-038ef840fcd6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "c276e9c2-0c24-44ae-bff1-6d38b5e98acb",
                "destination_uuid": null
              },
              {
                "uuid": "06fee902-28c0-4d49-93a3-82c25d89a3d0",
                "destination_uuid": "208b148c-f7ba-426b-aeaa-22199a35269d"
              },
              {
                "uuid": "77970dc7-47f3-43da-84e1-5bb71b0042a5",
                "destination_uuid": "8ffc00fc-6c5c-4f52-b5b6-3cce5a08ce9a"
              }
            ]
          },
          {
            "uuid": "208b148c-f7ba-426b-aeaa-22199a35269d",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear you are doing well! Here is @fields.elder, have you met him? https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "f9f4e380-50d8-4a1d-9339-6291e1f2c494"
              }
            ],
            "exits": [
              {
                "uuid": "0611941e-2841-47bf-ba1f-c0c6aad90ba4",
                "destination_uuid": "d20fdf33-db70-4805-bd27-e254ec78d8a4"
              }
            ]
          },
          {
            "uuid": "8ffc00fc-6c5c-4f52-b5b6-3cce5a08ce9a",
            "actions": [
              {
                "attachments": [],
                "text": "I know life can be hard sometimes. Whatever you are feeling, it's great that you are here! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "022cec9a-d25a-4f92-8326-f1f9b44e81db"
              }
            ],
            "exits": [
              {
                "uuid": "f92799d4-1491-4647-a7a7-b0487c4d8da4",
                "destination_uuid": "1a8d823a-b726-43b9-bb5c-dca05e202764"
              }
            ]
          },
          {
            "uuid": "1a8d823a-b726-43b9-bb5c-dca05e202764",
            "actions": [
              {
                "attachments": [],
                "text": "Let's take a quick pause together. It may help you feel more relaxed and peaceful. Do you have 30 seconds?  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "bc3b95b4-907e-460a-8b43-5b0911d8b548"
              }
            ],
            "exits": [
              {
                "uuid": "25386189-57b4-48c7-b416-04d1d9306b00",
                "destination_uuid": "c9627f17-8163-4954-8a68-4efaf732422a"
              }
            ]
          },
          {
            "uuid": "c9627f17-8163-4954-8a68-4efaf732422a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "28591acc-1895-45d4-9402-a775fb77a6f2",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "9da371c0-e32c-4d4a-91c6-288ccd3351b8",
                  "type": "has_only_phrase",
                  "uuid": "3e6b6c9b-8af3-4cec-a50b-543a8e1cc1ae"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "0ff8afd9-3371-43ba-a746-e6ed7ef555c4",
                  "type": "has_only_phrase",
                  "uuid": "6213dbff-0672-40ff-82e3-333b6736df1f"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3d1dbd09-aa9b-4056-86aa-35f75008a12f",
                  "name": "All Responses",
                  "uuid": "28591acc-1895-45d4-9402-a775fb77a6f2"
                },
                {
                  "exit_uuid": "0dc108ca-9e2b-4dc0-9839-09f3ca372068",
                  "name": "Yes",
                  "uuid": "9da371c0-e32c-4d4a-91c6-288ccd3351b8"
                },
                {
                  "exit_uuid": "aa7d2eef-b87c-44f7-9164-ccc29628c249",
                  "name": "No",
                  "uuid": "0ff8afd9-3371-43ba-a746-e6ed7ef555c4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3d1dbd09-aa9b-4056-86aa-35f75008a12f",
                "destination_uuid": null
              },
              {
                "uuid": "0dc108ca-9e2b-4dc0-9839-09f3ca372068",
                "destination_uuid": "dbb11058-0ae2-4eeb-a00e-8a4ba45c4a5a"
              },
              {
                "uuid": "aa7d2eef-b87c-44f7-9164-ccc29628c249",
                "destination_uuid": "2683163a-ae0f-4465-ad67-5274e3264f16"
              }
            ]
          },
          {
            "uuid": "dbb11058-0ae2-4eeb-a00e-8a4ba45c4a5a",
            "actions": [
              {
                "flow": {
                  "name": "calm_1",
                  "uuid": "5ef7ae74-4751-4291-bbe5-1c92480b9617"
                },
                "type": "enter_flow",
                "uuid": "410c4c0e-ac88-4941-a5b9-d9a3a33663f7"
              }
            ],
            "exits": [
              {
                "uuid": "cdccf546-7434-4f62-918b-e6e8af77b41d",
                "destination_uuid": "33f611ee-2618-42bd-b029-a87cbc271ea0"
              },
              {
                "uuid": "b4d5c382-16d2-41be-8a48-c1bf7a34f38f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "3262aefa-9e0e-4962-8406-e2b80b901092",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "3c26e7b0-4d00-4918-bf56-7399b392e951"
                },
                {
                  "uuid": "42503b60-88b5-4925-8fe8-aa0fbda5a01b",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d242e553-d3be-46ef-a0d6-062f50d3e9b4"
                }
              ],
              "categories": [
                {
                  "uuid": "3c26e7b0-4d00-4918-bf56-7399b392e951",
                  "name": "Complete",
                  "exit_uuid": "cdccf546-7434-4f62-918b-e6e8af77b41d"
                },
                {
                  "uuid": "d242e553-d3be-46ef-a0d6-062f50d3e9b4",
                  "name": "Expired",
                  "exit_uuid": "b4d5c382-16d2-41be-8a48-c1bf7a34f38f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "3c26e7b0-4d00-4918-bf56-7399b392e951"
            }
          },
          {
            "uuid": "33f611ee-2618-42bd-b029-a87cbc271ea0",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for taking a pause. You can really be proud of yourself, I know how hard you work to look after your family! https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "840d4d6c-7f2e-4702-b6fc-1c2053d608b3"
              }
            ],
            "exits": [
              {
                "uuid": "2e39e185-0442-4b05-b1af-d93387f57e03",
                "destination_uuid": "c5d1505c-cbf3-4144-a49c-3ccd165e3ca1"
              }
            ]
          },
          {
            "uuid": "c5d1505c-cbf3-4144-a49c-3ccd165e3ca1",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some other helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "1a3aeda9-e93f-42c8-8cd2-9d4b5ef024ec"
              }
            ],
            "exits": [
              {
                "uuid": "758bc516-bb0a-4263-a170-c83e2b103f66",
                "destination_uuid": "d20fdf33-db70-4805-bd27-e254ec78d8a4"
              }
            ]
          },
          {
            "uuid": "2683163a-ae0f-4465-ad67-5274e3264f16",
            "actions": [
              {
                "attachments": [],
                "text": "Here is @fields.elder, have you met him? He may have some helpful ideas for you!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [
                  "Chat to @fields.elder"
                ],
                "uuid": "dac70c1b-cbf1-4020-bc7c-75d6b6272c81"
              }
            ],
            "exits": [
              {
                "uuid": "1661f777-b7a7-412c-8f60-af98ae2c7cd1",
                "destination_uuid": "d20fdf33-db70-4805-bd27-e254ec78d8a4"
              }
            ]
          },
          {
            "uuid": "d20fdf33-db70-4805-bd27-e254ec78d8a4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f5af9249-0114-4fb9-b61d-dbd3991aed21",
              "cases": [
                {
                  "arguments": [
                    "Chat to @fields.elder"
                  ],
                  "category_uuid": "c45495bc-52d8-4c50-bf41-2fbccec40d70",
                  "type": "has_only_phrase",
                  "uuid": "f1e8d332-c9cc-4f38-b94a-bbb5b23cc89a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "05fc392f-7b45-4e53-863c-45d30d6fcb4e",
                  "name": "All Responses",
                  "uuid": "f5af9249-0114-4fb9-b61d-dbd3991aed21"
                },
                {
                  "exit_uuid": "d8339d36-3c67-483c-b74c-899ad4675417",
                  "name": "Chat to @fields.elder",
                  "uuid": "c45495bc-52d8-4c50-bf41-2fbccec40d70"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "05fc392f-7b45-4e53-863c-45d30d6fcb4e",
                "destination_uuid": null
              },
              {
                "uuid": "d8339d36-3c67-483c-b74c-899ad4675417",
                "destination_uuid": "08d85507-6822-4aa3-bf73-0d98c8866efa"
              }
            ]
          },
          {
            "uuid": "08d85507-6822-4aa3-bf73-0d98c8866efa",
            "actions": [
              {
                "uuid": "7c1db211-2c51-436e-9bcd-8e2e2269b666",
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
                "uuid": "4277082c-b9f4-483d-861d-da252018d061",
                "destination_uuid": "65c3df22-47af-4075-a360-0d5f9ea43784"
              }
            ]
          },
          {
            "uuid": "65c3df22-47af-4075-a360-0d5f9ea43784",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_intro",
                  "uuid": "db71f9c3-3ae0-4719-aa48-647fecce0e9c"
                },
                "type": "enter_flow",
                "uuid": "d25457fd-aae5-448a-b265-26493ab78963"
              }
            ],
            "exits": [
              {
                "uuid": "2cd66a63-cc9c-4a8d-a615-9d80d39acf04",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8d6f764b-0009-43f6-b7fc-e16fc5606e74",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6963116e-21a4-45a5-9be8-181d79aa958a",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! It is so nice to meet you! I just moved here. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c7c4e68f-a90b-4369-8e69-f0433b23e402"
              }
            ],
            "exits": [
              {
                "uuid": "9787ac91-7771-4fb2-932c-9a8fdb3c2e9a",
                "destination_uuid": "bce0d224-daa7-42e9-a6c4-5702bebf5268"
              }
            ]
          },
          {
            "uuid": "bce0d224-daa7-42e9-a6c4-5702bebf5268",
            "actions": [
              {
                "attachments": [],
                "text": "I used to struggle so much with my granddaughter. She would do whatever she wanted, and would not even listen to me! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e5ac058a-a254-4771-9769-9c98f87ca658"
              }
            ],
            "exits": [
              {
                "uuid": "53736867-9d6a-48b6-a9d0-93729e06676d",
                "destination_uuid": "1f6041d6-2b21-49a6-b962-7928f46991f9"
              }
            ]
          },
          {
            "uuid": "1f6041d6-2b21-49a6-b962-7928f46991f9",
            "actions": [
              {
                "attachments": [],
                "text": "Do you ever have any challenges with your teens?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "472d6438-5ab0-44cf-971b-ddcd397815fc"
              }
            ],
            "exits": [
              {
                "uuid": "535717d1-f4fc-4f4c-973a-0a48126e6b06",
                "destination_uuid": "6e2884fc-664b-4936-b00f-792e1681e24f"
              }
            ]
          },
          {
            "uuid": "6e2884fc-664b-4936-b00f-792e1681e24f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d37a7240-d708-4a12-b7be-bc33d887975c",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "69b29a5f-d3b2-40ac-8fe7-a71713c51bd7",
                  "type": "has_only_phrase",
                  "uuid": "ecfc2167-6517-4c00-bd6d-ffea6702d19e"
                },
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "af7b5fa9-0a29-4b8e-b3a9-b46ca615c4f8",
                  "type": "has_only_phrase",
                  "uuid": "93834222-a16e-434e-bb16-6b97e8282a24"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "58ec40a0-3d83-4734-9481-eabd8cae23a6",
                  "name": "All Responses",
                  "uuid": "d37a7240-d708-4a12-b7be-bc33d887975c"
                },
                {
                  "exit_uuid": "925a75bf-6224-404b-bd27-c7ada30fb380",
                  "name": "Yes",
                  "uuid": "69b29a5f-d3b2-40ac-8fe7-a71713c51bd7"
                },
                {
                  "exit_uuid": "ebc9e162-2265-4799-bea4-bac3c471438d",
                  "name": "No",
                  "uuid": "af7b5fa9-0a29-4b8e-b3a9-b46ca615c4f8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "58ec40a0-3d83-4734-9481-eabd8cae23a6",
                "destination_uuid": null
              },
              {
                "uuid": "925a75bf-6224-404b-bd27-c7ada30fb380",
                "destination_uuid": "9674b787-9f1a-416b-867b-58d3f5531d60"
              },
              {
                "uuid": "ebc9e162-2265-4799-bea4-bac3c471438d",
                "destination_uuid": "a365c93f-f1e5-4029-add8-a056da2b6bed"
              }
            ]
          },
          {
            "uuid": "9674b787-9f1a-416b-867b-58d3f5531d60",
            "actions": [
              {
                "attachments": [],
                "text": "Ah it's good to know that I am not the only one! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e4fea524-3220-494f-b066-155f259f6652"
              }
            ],
            "exits": [
              {
                "uuid": "88743f41-533f-45a5-a3ce-acd8c94bf832",
                "destination_uuid": "4d68ef80-cfe2-4a40-8b46-b4034bf8209a"
              }
            ]
          },
          {
            "uuid": "a365c93f-f1e5-4029-add8-a056da2b6bed",
            "actions": [
              {
                "attachments": [],
                "text": "That's amazing! What is your secret? Perhaps we can share experiences?  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8bed8382-349f-4875-b59b-7fa6f820ddd3"
              }
            ],
            "exits": [
              {
                "uuid": "5f84bde9-8fb1-4c77-acee-1734602f5ae5",
                "destination_uuid": "4d68ef80-cfe2-4a40-8b46-b4034bf8209a"
              }
            ]
          },
          {
            "uuid": "4d68ef80-cfe2-4a40-8b46-b4034bf8209a",
            "actions": [
              {
                "attachments": [],
                "text": "Actually, I have taken notes over the years of all the things that helped me and my grandchildren build a good relationship and solve any problems.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5d27a04f-f0f9-43b3-ad9f-149252bed600"
              }
            ],
            "exits": [
              {
                "uuid": "a5fb91e9-2acb-4a57-9a59-c67b7b5b0ee7",
                "destination_uuid": "73da333e-6f38-47c3-94bc-eeac95b4010c"
              }
            ]
          },
          {
            "uuid": "73da333e-6f38-47c3-94bc-eeac95b4010c",
            "actions": [
              {
                "attachments": [],
                "text": "Can I show you? It will only take 2 minutes, and then you can take my notes home so you can use them any time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "9b844ea3-ee21-4f0d-9d34-e90aad88d2f5"
              }
            ],
            "exits": [
              {
                "uuid": "06f1f073-ea3f-4122-b577-c367bbe6ac69",
                "destination_uuid": "2dbb5d88-a453-4faa-8b35-ba4a3ede46d5"
              }
            ]
          },
          {
            "uuid": "2dbb5d88-a453-4faa-8b35-ba4a3ede46d5",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fa02decb-9ebc-4148-9ad9-50694194d8e8",
              "cases": [
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "5df742cf-793c-4119-96e2-9ac788b4e2cb",
                  "type": "has_only_phrase",
                  "uuid": "d8d45aaf-6356-47c9-88d9-e4f7b1f9a5b0"
                },
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "068afd9e-1421-4050-91c8-61748b1ac5cf",
                  "type": "has_only_phrase",
                  "uuid": "e8d64e15-9f28-478e-ab10-67d6d4bd4f5b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "794d2d60-b58a-4076-aa12-3d600d1e504d",
                  "name": "All Responses",
                  "uuid": "fa02decb-9ebc-4148-9ad9-50694194d8e8"
                },
                {
                  "exit_uuid": "3be78370-3b7d-4078-99e2-5542b2f39314",
                  "name": "Yes",
                  "uuid": "5df742cf-793c-4119-96e2-9ac788b4e2cb"
                },
                {
                  "exit_uuid": "0f35d974-1e12-4770-8559-4850fbf46107",
                  "name": "Later",
                  "uuid": "068afd9e-1421-4050-91c8-61748b1ac5cf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "794d2d60-b58a-4076-aa12-3d600d1e504d",
                "destination_uuid": null
              },
              {
                "uuid": "3be78370-3b7d-4078-99e2-5542b2f39314",
                "destination_uuid": "947e6519-a5f3-42ea-9113-29789d26f004"
              },
              {
                "uuid": "0f35d974-1e12-4770-8559-4850fbf46107",
                "destination_uuid": "102b3470-4c2c-4b34-8030-027242cb0d9d"
              }
            ]
          },
          {
            "uuid": "947e6519-a5f3-42ea-9113-29789d26f004",
            "actions": [
              {
                "attachments": [],
                "text": "Great, let's see… https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips"
                ],
                "uuid": "94ec64f7-bd45-4d03-a754-da1bbfc166f3"
              }
            ],
            "exits": [
              {
                "uuid": "d30fffca-2dd5-4739-9b19-c39c032ecdf6",
                "destination_uuid": "0787f746-4fee-45dc-b03b-af726d5fc768"
              }
            ]
          },
          {
            "uuid": "0787f746-4fee-45dc-b03b-af726d5fc768",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "23edf675-49f3-4dcc-93bb-bc910fa7be9f",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "4d7a3585-7bee-4bb5-ab86-90b0baa7611e",
                  "type": "has_only_phrase",
                  "uuid": "cbd116ec-0a39-4fcd-a5be-e3f7c44c04a8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "72b735a1-5ec8-4dc5-b3fc-afeea83ee0b2",
                  "name": "All Responses",
                  "uuid": "23edf675-49f3-4dcc-93bb-bc910fa7be9f"
                },
                {
                  "exit_uuid": "8d99b9fd-6aae-41c3-b779-25e674ef5a56",
                  "name": "Take me to Tips",
                  "uuid": "4d7a3585-7bee-4bb5-ab86-90b0baa7611e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "72b735a1-5ec8-4dc5-b3fc-afeea83ee0b2",
                "destination_uuid": null
              },
              {
                "uuid": "8d99b9fd-6aae-41c3-b779-25e674ef5a56",
                "destination_uuid": "a84b3f72-cfd3-4997-9789-c36aec91938d"
              }
            ]
          },
          {
            "uuid": "a84b3f72-cfd3-4997-9789-c36aec91938d",
            "actions": [
              {
                "uuid": "9def8117-03b6-4be8-ad40-9f40668f48a9",
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
                "uuid": "e00b7bad-1373-452e-8f88-ccea157e477b",
                "destination_uuid": "005f782c-9219-44fe-8a86-b92933368be0"
              }
            ]
          },
          {
            "uuid": "005f782c-9219-44fe-8a86-b92933368be0",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_1on1_tips",
                  "uuid": "5fea807f-8955-4cbd-96b3-cc2c2bfc9e13"
                },
                "type": "enter_flow",
                "uuid": "9cc98b86-2451-411f-b6e4-d5b679dc59f8"
              }
            ],
            "exits": [
              {
                "uuid": "96ecbc63-8d92-46b8-bd39-e7db4419b792",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "102b3470-4c2c-4b34-8030-027242cb0d9d",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, I will show you another time. See you later! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to the home screen"
                ],
                "uuid": "4ebe5e0a-03b0-404f-b197-1ce50c4645cd"
              }
            ],
            "exits": [
              {
                "uuid": "2c1bed8e-2df1-4aed-8f95-0c5598ab1e26",
                "destination_uuid": "51c992dd-7ecb-434a-9748-32fd55ca26c2"
              }
            ]
          },
          {
            "uuid": "51c992dd-7ecb-434a-9748-32fd55ca26c2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7be3eddb-9478-4e07-9132-49a7cb58b79f",
              "cases": [
                {
                  "arguments": [
                    "Take me to the home screen"
                  ],
                  "category_uuid": "711402af-e4a1-455f-9160-c7f54df9e4bc",
                  "type": "has_only_phrase",
                  "uuid": "09ff88b8-7ca5-4542-97a7-68984d242c42"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f5f415fe-af40-4654-8d24-8ca7b5f5415d",
                  "name": "All Responses",
                  "uuid": "7be3eddb-9478-4e07-9132-49a7cb58b79f"
                },
                {
                  "exit_uuid": "9c1cd659-1e93-4bf8-8d6a-73f12bd77a49",
                  "name": "Take me to the home screen",
                  "uuid": "711402af-e4a1-455f-9160-c7f54df9e4bc"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f5f415fe-af40-4654-8d24-8ca7b5f5415d",
                "destination_uuid": null
              },
              {
                "uuid": "9c1cd659-1e93-4bf8-8d6a-73f12bd77a49",
                "destination_uuid": "e57fd6fa-e7d2-4660-af70-11297dc9f1aa"
              }
            ]
          },
          {
            "uuid": "e57fd6fa-e7d2-4660-af70-11297dc9f1aa",
            "actions": [
              {
                "uuid": "8619e21b-e523-4a5b-99cc-3c9b8757490b",
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
                "uuid": "a35d44ec-a3f9-4b61-a3a1-31dbe98384e9",
                "destination_uuid": "9c1e03d1-eed6-464e-8938-d829f3ec1b8a"
              }
            ]
          },
          {
            "uuid": "9c1e03d1-eed6-464e-8938-d829f3ec1b8a",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "29e5a8c1-20ee-43f6-8103-36972ab4e4b8"
                },
                "type": "enter_flow",
                "uuid": "a6515f0d-d577-423c-88da-8db7d33f77dd"
              }
            ],
            "exits": [
              {
                "uuid": "0c9a8f6e-5a28-43dc-83dd-c1a074036ee2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "d686fca5-99ea-4888-bf1b-e9c96c86b6f5",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "fa7a3f64-6ecf-4a84-82e2-8ea0e38e32f8",
            "actions": [
              {
                "attachments": [],
                "text": "Here are some ideas for easy activities you and your teen can try together.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "99de683c-f107-49f4-8809-e6cee4c697d4"
              }
            ],
            "exits": [
              {
                "uuid": "71833208-84cb-4774-861e-1b78a5eaec35",
                "destination_uuid": "f61e9711-ddca-4f98-82e4-9bfd6300eabe"
              }
            ]
          },
          {
            "uuid": "f61e9711-ddca-4f98-82e4-9bfd6300eabe",
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
                "uuid": "ee092104-dbae-46e5-a624-238381b5c866"
              }
            ],
            "exits": [
              {
                "uuid": "2fc41a34-9e7b-41c7-8117-80b16ca47cc1",
                "destination_uuid": "e2fe8e0a-1b25-43cb-b673-f31a19d231e6"
              }
            ]
          },
          {
            "uuid": "e2fe8e0a-1b25-43cb-b673-f31a19d231e6",
            "actions": [],
            "exits": [
              {
                "uuid": "d5f05aca-7a2c-4f9b-bf1f-f80c459afa47",
                "destination_uuid": "f89396d3-da21-414d-a428-a39511a5aba3"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "da367f46-1f8c-4dad-a30d-8be387dfabd0",
              "cases": [],
              "categories": [
                {
                  "uuid": "da367f46-1f8c-4dad-a30d-8be387dfabd0",
                  "name": "All Responses",
                  "exit_uuid": "d5f05aca-7a2c-4f9b-bf1f-f80c459afa47"
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
            "uuid": "f89396d3-da21-414d-a428-a39511a5aba3",
            "actions": [
              {
                "uuid": "d715cef0-0862-432a-a9b5-55b957de6375",
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
                "uuid": "ef4ea8f7-361e-4611-bd50-d06719a20a50",
                "destination_uuid": "2b74127d-d43d-4f36-a1ae-45034710269f"
              }
            ]
          },
          {
            "uuid": "2b74127d-d43d-4f36-a1ae-45034710269f",
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
                "uuid": "f46707ca-fbb2-4218-9c78-30da48632355"
              }
            ],
            "exits": [
              {
                "uuid": "bda49ba2-74de-43a8-b4d4-8154cb48e519",
                "destination_uuid": "097affc8-5728-446f-9021-325da581b249"
              }
            ]
          },
          {
            "uuid": "097affc8-5728-446f-9021-325da581b249",
            "actions": [],
            "exits": [
              {
                "uuid": "2bd42441-6ded-435b-ba92-9beac00518bf",
                "destination_uuid": "f6590cd4-d978-4166-8726-bbb136b01e54"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2c4a38fe-dc32-4295-b141-59e686b1d83f",
              "cases": [],
              "categories": [
                {
                  "uuid": "2c4a38fe-dc32-4295-b141-59e686b1d83f",
                  "name": "All Responses",
                  "exit_uuid": "2bd42441-6ded-435b-ba92-9beac00518bf"
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
            "uuid": "f6590cd4-d978-4166-8726-bbb136b01e54",
            "actions": [
              {
                "uuid": "1028987a-56fc-4b1d-b924-803f7081b727",
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
                "uuid": "d2a194c3-643a-4002-8174-ab0212c3ec6c",
                "destination_uuid": "904adb4c-598c-4a30-a901-cf8888722f01"
              }
            ]
          },
          {
            "uuid": "904adb4c-598c-4a30-a901-cf8888722f01",
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
                "uuid": "3988b57b-9654-4b2c-9321-82c84c0c8961"
              }
            ],
            "exits": [
              {
                "uuid": "d4432aa0-9ba6-4c78-a885-e475be560900",
                "destination_uuid": "94b717a9-47c5-44e4-b383-9b13b7261001"
              }
            ]
          },
          {
            "uuid": "94b717a9-47c5-44e4-b383-9b13b7261001",
            "actions": [],
            "exits": [
              {
                "uuid": "24465ed5-899b-4657-8817-9a3dd91da156",
                "destination_uuid": "b6d4a784-2371-4218-8919-71be05623276"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "88e0af91-0beb-4367-9c3a-d100d2ed404a",
              "cases": [],
              "categories": [
                {
                  "uuid": "88e0af91-0beb-4367-9c3a-d100d2ed404a",
                  "name": "All Responses",
                  "exit_uuid": "24465ed5-899b-4657-8817-9a3dd91da156"
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
            "uuid": "b6d4a784-2371-4218-8919-71be05623276",
            "actions": [
              {
                "uuid": "fd292793-ee53-4cd9-8a09-f5835df84aad",
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
                "uuid": "f4591d4f-1b6c-4a22-985a-5c5a8a092a23",
                "destination_uuid": "73f08d5a-bec2-429c-b1ff-5e84e12fe2fd"
              }
            ]
          },
          {
            "uuid": "73f08d5a-bec2-429c-b1ff-5e84e12fe2fd",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for committing to spending time together, you will see it makes all the difference! And remember, I am always here to support.",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "da9cab58-586d-4b05-9fab-53ae00355afe"
              }
            ],
            "exits": [
              {
                "uuid": "cce8d3ce-8d51-4ee3-9102-1ceb218f64d2",
                "destination_uuid": "05161883-41f5-4245-bbae-03f3f9f460a7"
              }
            ]
          },
          {
            "uuid": "05161883-41f5-4245-bbae-03f3f9f460a7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "93e518c0-4455-4278-a02a-22a2ceb4eb6d",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "6edcf182-7a7c-4ff1-8a20-0d61c80157b7",
                  "type": "has_only_phrase",
                  "uuid": "6c47942d-bf47-4668-99f2-9643392b9f76"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "4a00c3b6-f2ba-4158-ac3c-1ac0fad4a8e5",
                  "name": "All Responses",
                  "uuid": "93e518c0-4455-4278-a02a-22a2ceb4eb6d"
                },
                {
                  "exit_uuid": "f8ad4ecb-af75-42b0-82ee-ca19aaec82ec",
                  "name": "Take me to Homescreen",
                  "uuid": "6edcf182-7a7c-4ff1-8a20-0d61c80157b7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "4a00c3b6-f2ba-4158-ac3c-1ac0fad4a8e5",
                "destination_uuid": null
              },
              {
                "uuid": "f8ad4ecb-af75-42b0-82ee-ca19aaec82ec",
                "destination_uuid": "b9911444-9460-4e62-b9f4-68747fd53ee0"
              }
            ]
          },
          {
            "uuid": "b9911444-9460-4e62-b9f4-68747fd53ee0",
            "actions": [
              {
                "uuid": "dca097c8-ef67-4190-ac81-c5dc9a6724d2",
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
                "uuid": "fe6c5fe6-ce20-4a46-9112-3c7832f73585",
                "destination_uuid": "b335d08e-300a-4ae6-aea9-61443ef343b7"
              }
            ]
          },
          {
            "uuid": "b335d08e-300a-4ae6-aea9-61443ef343b7",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "e93dd3eb-9656-428b-a905-24c584d82fe5"
                },
                "type": "enter_flow",
                "uuid": "9fb570eb-46b2-4c86-adf5-52b01ad0681a"
              }
            ],
            "exits": [
              {
                "uuid": "a339feec-ae86-43eb-8a80-8b4ebd8e4198",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "b193f836-1719-45cb-98e8-82765a0aed69",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "d508b20d-5532-48d7-a4e9-0fd8b99258e4",
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
                "uuid": "f9c4e0a3-9202-43f4-a6fa-a978d2339aeb"
              }
            ],
            "exits": [
              {
                "uuid": "adbcc071-85be-4782-99df-f20017831c87",
                "destination_uuid": "f7a20864-d75d-4866-af68-d195cd8b9a0b"
              }
            ]
          },
          {
            "uuid": "f7a20864-d75d-4866-af68-d195cd8b9a0b",
            "actions": [],
            "exits": [
              {
                "uuid": "c8af61c3-3f12-419e-b792-48f22d4cf7e9",
                "destination_uuid": "e6ed04b3-8481-435d-a49c-80ea5d4228f6"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "87a1f41c-b1e9-4478-ac11-ea0c94bf5e8c",
              "cases": [],
              "categories": [
                {
                  "uuid": "87a1f41c-b1e9-4478-ac11-ea0c94bf5e8c",
                  "name": "All Responses",
                  "exit_uuid": "c8af61c3-3f12-419e-b792-48f22d4cf7e9"
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
            "uuid": "e6ed04b3-8481-435d-a49c-80ea5d4228f6",
            "actions": [
              {
                "uuid": "17d8303b-59f5-431f-9ba0-8060eac3fd4f",
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
                "uuid": "68c48604-4cb2-4424-b6f1-986aec35dc66",
                "destination_uuid": "7ace205e-8849-47af-9893-5134c4581bc0"
              }
            ]
          },
          {
            "uuid": "7ace205e-8849-47af-9893-5134c4581bc0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b83c59ee-aed2-484b-829b-4b9ab3cf5c6e",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "f6e5b757-8753-4233-8f49-4601f2daf89b",
                  "type": "has_only_phrase",
                  "uuid": "4259029f-1d3f-4b53-9c9f-ba516d60dc2a"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "63f356bd-c728-4686-8bae-92a041f6e1a4",
                  "type": "has_only_phrase",
                  "uuid": "db64b7ac-a29c-425a-946f-2883158e81a5"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "144015ea-1e13-4e92-ab55-e62a28b3d9f9",
                  "type": "has_only_phrase",
                  "uuid": "1fe7f74a-5a85-4602-b95c-3ccfa65e71a2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1b6c972a-f4fd-4e5b-9bfc-ff6b78783c2d",
                  "name": "All Responses",
                  "uuid": "b83c59ee-aed2-484b-829b-4b9ab3cf5c6e"
                },
                {
                  "exit_uuid": "ed442061-95b8-4729-94b5-cad3e9b238dd",
                  "name": "Great",
                  "uuid": "f6e5b757-8753-4233-8f49-4601f2daf89b"
                },
                {
                  "exit_uuid": "b77726f3-6e85-4a68-bbe0-d54ce34a4f5b",
                  "name": "Neutral",
                  "uuid": "63f356bd-c728-4686-8bae-92a041f6e1a4"
                },
                {
                  "exit_uuid": "c0aae52c-c5d0-4d8d-824a-8b0457342c8c",
                  "name": "Bad",
                  "uuid": "144015ea-1e13-4e92-ab55-e62a28b3d9f9"
                }
              ],
              "operand": "@fields.mod_1on1_experience"
            },
            "exits": [
              {
                "uuid": "1b6c972a-f4fd-4e5b-9bfc-ff6b78783c2d",
                "destination_uuid": null
              },
              {
                "uuid": "ed442061-95b8-4729-94b5-cad3e9b238dd",
                "destination_uuid": "67c1b86e-4b47-48fb-b19f-cc1d6c742619"
              },
              {
                "uuid": "b77726f3-6e85-4a68-bbe0-d54ce34a4f5b",
                "destination_uuid": "82081932-fa23-497d-9991-e8f23031b2d5"
              },
              {
                "uuid": "c0aae52c-c5d0-4d8d-824a-8b0457342c8c",
                "destination_uuid": "fe78017e-5bbd-4885-bcd3-99683f9c4937"
              }
            ]
          },
          {
            "uuid": "67c1b86e-4b47-48fb-b19f-cc1d6c742619",
            "actions": [
              {
                "attachments": [],
                "text": "That's wonderful, well done for spending time together, it lays the foundation for a great relationship with your teen! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "323aed2f-6018-4454-8ae9-844aa6410a94"
              }
            ],
            "exits": [
              {
                "uuid": "b0553767-4867-47a7-aaba-ac59322a0391",
                "destination_uuid": "84a63a5e-e100-4901-a0bd-6cf7bfe255e4"
              }
            ]
          },
          {
            "uuid": "82081932-fa23-497d-9991-e8f23031b2d5",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it will be easy and fun to spend time with your teens, and sometimes it will be more challenging. Spending time together will really improve your relationship – well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6a24ab7e-b89f-437b-ba9f-de8069a0ec9b"
              }
            ],
            "exits": [
              {
                "uuid": "a2f2cb2c-e49d-44d3-892b-a9174f573a6e",
                "destination_uuid": "84a63a5e-e100-4901-a0bd-6cf7bfe255e4"
              }
            ]
          },
          {
            "uuid": "84a63a5e-e100-4901-a0bd-6cf7bfe255e4",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "76792b9d-65e9-41c0-8a7a-be92a96113b8"
                },
                "type": "enter_flow",
                "uuid": "3f2a9ecf-62b9-4a11-950c-3cd6189db12e"
              }
            ],
            "exits": [
              {
                "uuid": "46a1b2ac-eae3-441f-9e2a-f46ca092a3b4",
                "destination_uuid": "9649f605-3137-4b58-a05c-e0805415118b"
              },
              {
                "uuid": "d92f9a29-0b70-4973-afbb-c9101c04b2ef",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "1c620970-a082-49c3-9369-419c699d5820",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c06bf999-d721-4625-9a25-d6ae72b7b6c1"
                },
                {
                  "uuid": "f755b936-78c3-4306-914f-443263288a89",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "8d9c8688-ae18-4f53-86a8-0d0927ea70cb"
                }
              ],
              "categories": [
                {
                  "uuid": "c06bf999-d721-4625-9a25-d6ae72b7b6c1",
                  "name": "Complete",
                  "exit_uuid": "46a1b2ac-eae3-441f-9e2a-f46ca092a3b4"
                },
                {
                  "uuid": "8d9c8688-ae18-4f53-86a8-0d0927ea70cb",
                  "name": "Expired",
                  "exit_uuid": "d92f9a29-0b70-4973-afbb-c9101c04b2ef"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c06bf999-d721-4625-9a25-d6ae72b7b6c1"
            }
          },
          {
            "uuid": "9649f605-3137-4b58-a05c-e0805415118b",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "19f85a31-5462-4a1c-aacc-96b0ca6b73fc"
                },
                "type": "enter_flow",
                "uuid": "3a0875ac-72e2-4b18-9c70-8770323a7e33"
              }
            ],
            "exits": [
              {
                "uuid": "da56cf1f-fbf8-4738-8331-2b5a083682c3",
                "destination_uuid": "75870cdc-8374-4c84-bab4-3d12c6089a40"
              },
              {
                "uuid": "89d4d15f-50e3-4d58-81aa-f7ec7b48b6c4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "f6bc5075-a29f-4dfc-bdd8-6a4cd590b26c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "67f068f3-9109-4658-a766-cf9ae64a7c64"
                },
                {
                  "uuid": "54b70796-7a72-4468-96e8-e5009ca378a9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e8b5e7a0-835c-473e-a509-e3815e950b3c"
                }
              ],
              "categories": [
                {
                  "uuid": "67f068f3-9109-4658-a766-cf9ae64a7c64",
                  "name": "Complete",
                  "exit_uuid": "da56cf1f-fbf8-4738-8331-2b5a083682c3"
                },
                {
                  "uuid": "e8b5e7a0-835c-473e-a509-e3815e950b3c",
                  "name": "Expired",
                  "exit_uuid": "89d4d15f-50e3-4d58-81aa-f7ec7b48b6c4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "67f068f3-9109-4658-a766-cf9ae64a7c64"
            }
          },
          {
            "uuid": "fe78017e-5bbd-4885-bcd3-99683f9c4937",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear that it was difficult for you to spend time with your teen. We all have challenges sometimes. Just be patient with yourself and your teen, things will get better. Well done for trying!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f7f956a6-3798-4de2-8e99-8fb98d8b4cf4"
              }
            ],
            "exits": [
              {
                "uuid": "e89537a0-fa6a-48cd-9b0e-124b87562b41",
                "destination_uuid": "3c26a0b2-873c-4203-a44a-e0efbfd1d67c"
              }
            ]
          },
          {
            "uuid": "3c26a0b2-873c-4203-a44a-e0efbfd1d67c",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "128b5bad-4569-4179-8be4-8c95f5bffa29"
                },
                "type": "enter_flow",
                "uuid": "91fc1681-26b7-4222-bea3-765dff9ea9b9"
              }
            ],
            "exits": [
              {
                "uuid": "76890377-7b97-404f-957e-8c6e5127a1c5",
                "destination_uuid": "148a06ab-b8d9-4ad1-90e5-620b9e7ec4cd"
              },
              {
                "uuid": "85746029-7c23-4d9d-9877-950b4f5bbe1e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "32020bfb-3f33-4b20-a0d5-0d8fe03128da",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "4d79b94b-b112-4d5a-b8ab-d9963a303378"
                },
                {
                  "uuid": "cbae361d-0da0-4a5c-910a-b0fc04b5dee8",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "fe6264fc-c56b-4a7b-ae5e-05bddf9c4b21"
                }
              ],
              "categories": [
                {
                  "uuid": "4d79b94b-b112-4d5a-b8ab-d9963a303378",
                  "name": "Complete",
                  "exit_uuid": "76890377-7b97-404f-957e-8c6e5127a1c5"
                },
                {
                  "uuid": "fe6264fc-c56b-4a7b-ae5e-05bddf9c4b21",
                  "name": "Expired",
                  "exit_uuid": "85746029-7c23-4d9d-9877-950b4f5bbe1e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "4d79b94b-b112-4d5a-b8ab-d9963a303378"
            }
          },
          {
            "uuid": "148a06ab-b8d9-4ad1-90e5-620b9e7ec4cd",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_highlights",
                  "uuid": "7a878f2e-34f3-4d70-814b-3c038ee89cf8"
                },
                "type": "enter_flow",
                "uuid": "f0524175-2fb6-43e5-b8af-e1aeff88933b"
              }
            ],
            "exits": [
              {
                "uuid": "fb509429-c03f-4b10-8f11-4e62aeb5c4dc",
                "destination_uuid": "75870cdc-8374-4c84-bab4-3d12c6089a40"
              },
              {
                "uuid": "7ee8f1cc-d7e6-4175-a26a-0f21db1dbc6f",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e077fb04-b4f9-4691-b02f-6aa638a3ad9e",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "77eabc9a-c884-432d-babc-464879b9a094"
                },
                {
                  "uuid": "5f5a5e8c-0ebf-4020-840a-a80c231b2a34",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "aa0607ad-76de-4393-9f5f-4600d377dd4c"
                }
              ],
              "categories": [
                {
                  "uuid": "77eabc9a-c884-432d-babc-464879b9a094",
                  "name": "Complete",
                  "exit_uuid": "fb509429-c03f-4b10-8f11-4e62aeb5c4dc"
                },
                {
                  "uuid": "aa0607ad-76de-4393-9f5f-4600d377dd4c",
                  "name": "Expired",
                  "exit_uuid": "7ee8f1cc-d7e6-4175-a26a-0f21db1dbc6f"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "77eabc9a-c884-432d-babc-464879b9a094"
            }
          },
          {
            "uuid": "75870cdc-8374-4c84-bab4-3d12c6089a40",
            "actions": [
              {
                "uuid": "e7ccc977-c259-4f4f-a690-65b7d44bf739",
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
                "uuid": "f0395330-d2a5-4527-815d-641f3383de47",
                "destination_uuid": "5c339d9e-0842-4e3b-912d-2a1da55f1cf5"
              }
            ]
          },
          {
            "uuid": "5c339d9e-0842-4e3b-912d-2a1da55f1cf5",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "34bad077-c81d-4099-b4d0-f6ec1802ea2b"
                },
                "type": "enter_flow",
                "uuid": "39e8c656-5f2d-4e49-834d-a9bda75ccbe2"
              }
            ],
            "exits": [
              {
                "uuid": "4dffbb1f-f341-4166-9d96-b7c85178311a",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "15ab6c08-5efb-4ab5-820e-5dcc71728e79",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a1453c60-a85c-456a-b890-b3c156f594e8",
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
                "uuid": "0f12f007-d4fb-473a-980e-3025484d817c"
              }
            ],
            "exits": [
              {
                "uuid": "04ffcaf4-5e56-4723-8014-c0f5068e0dc1",
                "destination_uuid": "d74035ed-1de6-4bbf-b802-66bbb0db554a"
              }
            ]
          },
          {
            "uuid": "d74035ed-1de6-4bbf-b802-66bbb0db554a",
            "actions": [],
            "exits": [
              {
                "uuid": "4b5d4fc0-d658-4094-9d86-c4659515511c",
                "destination_uuid": "b2161d73-e885-4a51-a64a-ebfe066ee9ab"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0b3a0be9-194f-4c86-bc9d-25fd4c30bc68",
              "cases": [],
              "categories": [
                {
                  "uuid": "0b3a0be9-194f-4c86-bc9d-25fd4c30bc68",
                  "name": "All Responses",
                  "exit_uuid": "4b5d4fc0-d658-4094-9d86-c4659515511c"
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
            "uuid": "b2161d73-e885-4a51-a64a-ebfe066ee9ab",
            "actions": [
              {
                "uuid": "4e13cb2e-b4cc-4c95-95ef-d3eb86ed2a95",
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
                "uuid": "29daf8e6-c990-4a79-87d1-e2f376dab0fd",
                "destination_uuid": "55fbec2b-0664-45a7-b2a4-452edb8bb40a"
              }
            ]
          },
          {
            "uuid": "55fbec2b-0664-45a7-b2a4-452edb8bb40a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4ab5ff2a-af2d-452a-8f2b-4d0bdc62aa58",
              "cases": [
                {
                  "arguments": [
                    "Do it every day"
                  ],
                  "category_uuid": "c461653c-b00a-4b57-9ebf-eb7828632f88",
                  "type": "has_only_phrase",
                  "uuid": "9ab74d53-664e-4198-8030-09e5800151d7"
                },
                {
                  "arguments": [
                    "Let your teen choose the activity"
                  ],
                  "category_uuid": "226b26e0-911b-43ef-a537-1dcd9ede0a60",
                  "type": "has_only_phrase",
                  "uuid": "ab4208c0-399d-499c-bf8c-595ce9b76a7f"
                },
                {
                  "arguments": [
                    "Follow your teen’s lead"
                  ],
                  "category_uuid": "cb4e0e42-7bb0-46d2-a3f4-8c198b1a9746",
                  "type": "has_only_phrase",
                  "uuid": "e816a550-513a-4d15-8cdb-bb7c2faf6a23"
                },
                {
                  "arguments": [
                    "Give your teen all of your attention"
                  ],
                  "category_uuid": "51482f6d-8a31-4fdd-8361-a4830be24fa9",
                  "type": "has_only_phrase",
                  "uuid": "bc997636-783a-4246-a476-cb114fbe4794"
                },
                {
                  "arguments": [
                    "Show your teen you are really listening"
                  ],
                  "category_uuid": "4daa7dca-c620-4129-97bd-02b71946b3e4",
                  "type": "has_only_phrase",
                  "uuid": "10d2b167-2091-4d5e-9660-1ed27a86f9bc"
                },
                {
                  "arguments": [
                    "Have fun!"
                  ],
                  "category_uuid": "2203b8c9-352f-4974-9b03-4133a54d089d",
                  "type": "has_only_phrase",
                  "uuid": "c4cfb3c9-367b-41b4-9e7b-8a987adc266b"
                },
                {
                  "arguments": [
                    "None "
                  ],
                  "category_uuid": "9e773c6f-8c9c-41c2-a6ac-f5e4eee2c3e4",
                  "type": "has_only_phrase",
                  "uuid": "adf0e26c-8ee4-4826-a6c9-071089882dbc"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "af3b836d-79c9-40ea-a492-f3dc57c0c37f",
                  "name": "All Responses",
                  "uuid": "4ab5ff2a-af2d-452a-8f2b-4d0bdc62aa58"
                },
                {
                  "exit_uuid": "d0b03a72-2625-43d6-8b39-fac79e5c4385",
                  "name": "Do it every day",
                  "uuid": "c461653c-b00a-4b57-9ebf-eb7828632f88"
                },
                {
                  "exit_uuid": "da309317-327a-422f-b497-762e5b0b90f2",
                  "name": "Let your teen choose the activity",
                  "uuid": "226b26e0-911b-43ef-a537-1dcd9ede0a60"
                },
                {
                  "exit_uuid": "49f8f96c-0066-465b-980e-c1e78fabcc6f",
                  "name": "Follow your teen’s lead",
                  "uuid": "cb4e0e42-7bb0-46d2-a3f4-8c198b1a9746"
                },
                {
                  "exit_uuid": "4bc0bab1-f1ae-4aa4-9e2f-08277a22e528",
                  "name": "Give your teen all of your attention",
                  "uuid": "51482f6d-8a31-4fdd-8361-a4830be24fa9"
                },
                {
                  "exit_uuid": "4ac4c06e-41e4-4168-9b62-d68e12c4005e",
                  "name": "Show your teen you are really listening",
                  "uuid": "4daa7dca-c620-4129-97bd-02b71946b3e4"
                },
                {
                  "exit_uuid": "95b96097-779a-4094-b905-e6b5ee730f00",
                  "name": "Have fun!",
                  "uuid": "2203b8c9-352f-4974-9b03-4133a54d089d"
                },
                {
                  "exit_uuid": "ffc2bf69-f3e4-464c-867f-6994b9c4efc5",
                  "name": "None ",
                  "uuid": "9e773c6f-8c9c-41c2-a6ac-f5e4eee2c3e4"
                }
              ],
              "operand": "@fields.mod_1on1_high_1"
            },
            "exits": [
              {
                "uuid": "af3b836d-79c9-40ea-a492-f3dc57c0c37f",
                "destination_uuid": null
              },
              {
                "uuid": "d0b03a72-2625-43d6-8b39-fac79e5c4385",
                "destination_uuid": "1658e7c0-f859-4e42-9321-66f819a110fd"
              },
              {
                "uuid": "da309317-327a-422f-b497-762e5b0b90f2",
                "destination_uuid": "6ebb1e3d-ba06-400d-b4a9-0a1e799ee153"
              },
              {
                "uuid": "49f8f96c-0066-465b-980e-c1e78fabcc6f",
                "destination_uuid": "4e050779-2565-4985-a052-a83546b3547c"
              },
              {
                "uuid": "4bc0bab1-f1ae-4aa4-9e2f-08277a22e528",
                "destination_uuid": "44f56ea7-40ad-4c9c-a5f7-32a88c3e47bb"
              },
              {
                "uuid": "4ac4c06e-41e4-4168-9b62-d68e12c4005e",
                "destination_uuid": "c6cdbb2f-fe5c-41c5-9a47-e571d0a9566d"
              },
              {
                "uuid": "95b96097-779a-4094-b905-e6b5ee730f00",
                "destination_uuid": "90006181-b3b4-4986-a489-4c863a67ad3a"
              },
              {
                "uuid": "ffc2bf69-f3e4-464c-867f-6994b9c4efc5",
                "destination_uuid": "cf9aa97b-ba82-4898-bafd-5785e208b591"
              }
            ]
          },
          {
            "uuid": "1658e7c0-f859-4e42-9321-66f819a110fd",
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
                "uuid": "448f95b9-9080-463d-8112-c1eaadd698c1"
              }
            ],
            "exits": [
              {
                "uuid": "e1e1277b-f54b-49d7-9036-1c56ed284e18",
                "destination_uuid": "42306f5c-c48a-412d-ba55-caaba18ad80e"
              }
            ]
          },
          {
            "uuid": "42306f5c-c48a-412d-ba55-caaba18ad80e",
            "actions": [],
            "exits": [
              {
                "uuid": "8802c39f-6a5e-44ff-a259-04d5adcd3bfd",
                "destination_uuid": "efe9b2c7-87c2-43af-b97e-0e075a1f6600"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fc7aa13a-b493-412b-8f85-ec7cfcbb968a",
              "cases": [],
              "categories": [
                {
                  "uuid": "fc7aa13a-b493-412b-8f85-ec7cfcbb968a",
                  "name": "All Responses",
                  "exit_uuid": "8802c39f-6a5e-44ff-a259-04d5adcd3bfd"
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
            "uuid": "efe9b2c7-87c2-43af-b97e-0e075a1f6600",
            "actions": [
              {
                "uuid": "5f3893ee-17a0-4f5b-8688-2ab336a9e19f",
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
                "uuid": "2cfc7ce2-f551-41df-a805-25473c355fb1",
                "destination_uuid": "faa85c19-89be-4712-8f67-f5d482ceaf76"
              }
            ]
          },
          {
            "uuid": "faa85c19-89be-4712-8f67-f5d482ceaf76",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and 10 minutes already makes a big difference – that makes it easy to schedule it in next to our work and chores! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4736742d-b544-4cd3-89b8-5ceebe6bec97"
              }
            ],
            "exits": [
              {
                "uuid": "6bb81a37-96c4-460f-b9d9-630fcecf49e3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "6ebb1e3d-ba06-400d-b4a9-0a1e799ee153",
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
                "uuid": "a2b3788d-9587-4c19-9c5d-f18f07b2f592"
              }
            ],
            "exits": [
              {
                "uuid": "09203768-5042-4b08-abd2-61ac86589a39",
                "destination_uuid": "c3a99aa7-ba59-4be9-8223-8f85dddd41cd"
              }
            ]
          },
          {
            "uuid": "c3a99aa7-ba59-4be9-8223-8f85dddd41cd",
            "actions": [],
            "exits": [
              {
                "uuid": "efab68d4-d0aa-4be8-83f5-7c7ab725aab0",
                "destination_uuid": "d49e0778-890f-4091-a799-ecfa1e1a35b0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "18d84d29-2885-4413-9aa1-d94cc0aae380",
              "cases": [],
              "categories": [
                {
                  "uuid": "18d84d29-2885-4413-9aa1-d94cc0aae380",
                  "name": "All Responses",
                  "exit_uuid": "efab68d4-d0aa-4be8-83f5-7c7ab725aab0"
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
            "uuid": "d49e0778-890f-4091-a799-ecfa1e1a35b0",
            "actions": [
              {
                "uuid": "744fa550-c429-4f08-a80a-4e1480292fe7",
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
                "uuid": "4c9f2062-f518-4f9c-9835-e39894b5f3a9",
                "destination_uuid": "8d8112ea-ef3e-44d6-b59e-6ec184fd295f"
              }
            ]
          },
          {
            "uuid": "8d8112ea-ef3e-44d6-b59e-6ec184fd295f",
            "actions": [
              {
                "attachments": [],
                "text": "So true! And if our teens choose, they are encouraged to also take responsibility in other areas of their lives. https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "39fbeada-9789-45e0-8d91-285a47b78b04"
              }
            ],
            "exits": [
              {
                "uuid": "b21d954b-7184-4ef1-bd76-0c546dd8640e",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "4e050779-2565-4985-a052-a83546b3547c",
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
                "uuid": "e75cbbd7-d3e2-4226-bb90-1240814c7f2f"
              }
            ],
            "exits": [
              {
                "uuid": "2d6fc33c-a2c7-4ade-8b3f-38914123c7cd",
                "destination_uuid": "e5213bc3-08ed-4764-a07b-1d9c1a41fa06"
              }
            ]
          },
          {
            "uuid": "e5213bc3-08ed-4764-a07b-1d9c1a41fa06",
            "actions": [],
            "exits": [
              {
                "uuid": "5284fdc8-146e-4170-8d3a-2e81dcd2db2e",
                "destination_uuid": "e36868bb-f112-4485-8d2d-8829ebd43b65"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "aef67a97-31d9-4f88-980a-471140e974dc",
              "cases": [],
              "categories": [
                {
                  "uuid": "aef67a97-31d9-4f88-980a-471140e974dc",
                  "name": "All Responses",
                  "exit_uuid": "5284fdc8-146e-4170-8d3a-2e81dcd2db2e"
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
            "uuid": "e36868bb-f112-4485-8d2d-8829ebd43b65",
            "actions": [
              {
                "uuid": "40f2e7e4-7df7-4b97-9e0b-881900598262",
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
                "uuid": "d614b714-6ad4-4162-b32f-af9ca5657364",
                "destination_uuid": "2d68c3a5-7eba-4d26-b24b-33e7d879fa93"
              }
            ]
          },
          {
            "uuid": "2d68c3a5-7eba-4d26-b24b-33e7d879fa93",
            "actions": [
              {
                "attachments": [],
                "text": "You are 100% right. What a great way to improve communication with our teens! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a6f87555-56d7-43e8-b1bc-8f5a8973e707"
              }
            ],
            "exits": [
              {
                "uuid": "70e5c890-6045-40a1-8c4a-ff3bc7ecad8a",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "44f56ea7-40ad-4c9c-a5f7-32a88c3e47bb",
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
                "uuid": "3bef54d0-6912-4a9a-af02-11acb4be852f"
              }
            ],
            "exits": [
              {
                "uuid": "8b3d2216-bf7a-4e09-a3f2-9a20ff484aea",
                "destination_uuid": "f4927d7f-4f22-44ad-af90-29c3e420ffb4"
              }
            ]
          },
          {
            "uuid": "f4927d7f-4f22-44ad-af90-29c3e420ffb4",
            "actions": [],
            "exits": [
              {
                "uuid": "bab0373b-ce38-4f3d-94ac-652108ea04e4",
                "destination_uuid": "c18038b1-3572-413c-8c06-4ae412d08eb9"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "3f46c9ab-131e-42fc-a841-ad17c1ed6abe",
              "cases": [],
              "categories": [
                {
                  "uuid": "3f46c9ab-131e-42fc-a841-ad17c1ed6abe",
                  "name": "All Responses",
                  "exit_uuid": "bab0373b-ce38-4f3d-94ac-652108ea04e4"
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
            "uuid": "c18038b1-3572-413c-8c06-4ae412d08eb9",
            "actions": [
              {
                "uuid": "4d43a3cb-ab3b-4556-847f-85ab69ffb74f",
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
                "uuid": "1fbe4f1e-4e76-48b5-852a-6cf25cff62db",
                "destination_uuid": "45fed15c-5c19-4ef6-96ea-fa46ae77f2ab"
              }
            ]
          },
          {
            "uuid": "45fed15c-5c19-4ef6-96ea-fa46ae77f2ab",
            "actions": [
              {
                "attachments": [],
                "text": "Ah yes, and if we give our teen our full attention, this will make them more likely to do the same for us next time we ask them something! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "603bc290-f395-4463-90e5-56493ecc4c12"
              }
            ],
            "exits": [
              {
                "uuid": "f6cbec2f-51a0-40dc-ad51-2174f3a76556",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "c6cdbb2f-fe5c-41c5-9a47-e571d0a9566d",
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
                "uuid": "f37aed6d-fd18-4f2b-b67d-620582e40b49"
              }
            ],
            "exits": [
              {
                "uuid": "af2b1078-8eff-43c7-857b-ceaf7c11e0a0",
                "destination_uuid": "5cad3bca-ce18-4808-8fcc-857a8d803ec7"
              }
            ]
          },
          {
            "uuid": "5cad3bca-ce18-4808-8fcc-857a8d803ec7",
            "actions": [],
            "exits": [
              {
                "uuid": "3d213ce9-7de5-4e37-acaf-7a8ef5956fec",
                "destination_uuid": "5772598a-635b-4ae9-9f1c-debcf8a087ec"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "4e83463e-8ca9-4505-8867-7b4669fb4fde",
              "cases": [],
              "categories": [
                {
                  "uuid": "4e83463e-8ca9-4505-8867-7b4669fb4fde",
                  "name": "All Responses",
                  "exit_uuid": "3d213ce9-7de5-4e37-acaf-7a8ef5956fec"
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
            "uuid": "5772598a-635b-4ae9-9f1c-debcf8a087ec",
            "actions": [
              {
                "uuid": "d3931378-0092-4113-aa25-d0153c115c18",
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
                "uuid": "456831e0-ade5-449a-8a4d-2a5dd5b29405",
                "destination_uuid": "637aae09-434e-4b96-b6bf-b721e16e2155"
              }
            ]
          },
          {
            "uuid": "637aae09-434e-4b96-b6bf-b721e16e2155",
            "actions": [
              {
                "attachments": [],
                "text": "Great point! And when we listen well, it will be easier for our teens to share other important things that are going on in their lives!  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d561d13d-4353-4bc2-8a48-c52bd493737f"
              }
            ],
            "exits": [
              {
                "uuid": "5f2c036a-59d7-43b9-90da-80e185fe29e3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "90006181-b3b4-4986-a489-4c863a67ad3a",
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
                "uuid": "9cfbb1b7-df06-48b5-808e-30cd90fa1b57"
              }
            ],
            "exits": [
              {
                "uuid": "7a92e47f-f759-46e9-bb54-144a6f05b4da",
                "destination_uuid": "249a0640-5bcc-4b9a-9dbe-fe81c8c452c3"
              }
            ]
          },
          {
            "uuid": "249a0640-5bcc-4b9a-9dbe-fe81c8c452c3",
            "actions": [],
            "exits": [
              {
                "uuid": "7d5fa4d0-124a-4d46-8e1c-89dbeb8f0c1e",
                "destination_uuid": "5a434916-65e0-4561-ba51-22923a963510"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "f6352b27-d0c7-4748-b049-328cbceecce1",
              "cases": [],
              "categories": [
                {
                  "uuid": "f6352b27-d0c7-4748-b049-328cbceecce1",
                  "name": "All Responses",
                  "exit_uuid": "7d5fa4d0-124a-4d46-8e1c-89dbeb8f0c1e"
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
            "uuid": "5a434916-65e0-4561-ba51-22923a963510",
            "actions": [
              {
                "uuid": "aaf1dd10-994a-4761-88e4-fe93cc51d90f",
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
                "uuid": "d5a674f8-56db-4849-ae32-5e7529bd5472",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "4b1cb5b4-9d76-4f8f-a120-937d4e7bd717",
            "actions": [
              {
                "attachments": [],
                "text": "So right! We can all enjoy and build a stronger family at the same time! https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bfc04ff4-c9a4-4848-829a-1c11bf4c7f66"
              }
            ],
            "exits": [
              {
                "uuid": "f5a920bf-b34e-415d-b55e-b2e6cfb36036",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "cf9aa97b-ba82-4898-bafd-5785e208b591",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear my tips did not help you.  https://plh-demo1.idems.international/chat/msg-info?character=Elder",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2b7c85fd-a340-499c-8137-51cb7318ce6b"
              }
            ],
            "exits": [
              {
                "uuid": "185dc887-7825-4b1b-9124-9d7c1eaf06a9",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "209bcf62-84e4-41fb-ab24-93778dda721c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "dadf3b24-57c7-4609-a75d-2c7bb761ce0a",
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
                "uuid": "7917edff-f549-4edb-9eaa-ebaa53945915"
              }
            ],
            "exits": [
              {
                "uuid": "a9dd82cc-5852-40e8-9aa9-2eb2f1ed59b7",
                "destination_uuid": "ae1a8078-896d-404c-a4c9-e20e38464d3f"
              }
            ]
          },
          {
            "uuid": "a200ef73-2baf-44ad-bc26-bcaf0a46245b",
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
                "uuid": "1c1109ae-9715-4208-b534-490b3d50a1d5"
              }
            ],
            "exits": [
              {
                "uuid": "387a0258-6e4f-4172-833e-91a49aa271c3",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "415f08ba-d84c-43b2-a147-5f7b1a63d798",
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
                "uuid": "3936ba69-bd92-4069-8879-4ac2b9e0055e"
              }
            ],
            "exits": [
              {
                "uuid": "e1a0da62-46ae-4544-8b87-371a98286570",
                "destination_uuid": "ae1a8078-896d-404c-a4c9-e20e38464d3f"
              }
            ]
          },
          {
            "uuid": "ae1a8078-896d-404c-a4c9-e20e38464d3f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cc0f31a9-31cf-44fb-9d6c-d1e3a4b1bc48",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "5db5ec5c-f4aa-4833-8c31-0b46b37d8438",
                  "type": "has_only_phrase",
                  "uuid": "2a9e0cd4-b89e-4c73-ab0e-8d7daf4736d5"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "dcd8fa93-04e0-4213-a35e-eba9ab9358ba",
                  "type": "has_only_phrase",
                  "uuid": "55a3df77-cf31-46c9-b8bd-a9bfb87c0065"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "e8386405-b1bf-45f2-b43b-2e3d8cf8fee2",
                  "type": "has_only_phrase",
                  "uuid": "44f39f7c-adda-4e2a-bf47-d327b8aa117a"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "6ba87cca-dc88-4295-972d-dc87d0f01c4e",
                  "type": "has_only_phrase",
                  "uuid": "77e00c09-96d5-4736-824d-38d428428d71"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "1b5ac364-7f23-43be-a932-d2745b843a3b",
                  "type": "has_only_phrase",
                  "uuid": "703d02e5-f524-4df9-b0ce-a46058856c3f"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "f0727127-676d-4407-9475-5a8d2fc84b4f",
                  "type": "has_only_phrase",
                  "uuid": "8d2b37e1-d2bb-4285-9386-5e63424b43f1"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "0a889e5e-3ce8-49af-b589-f29c886c4201",
                  "type": "has_only_phrase",
                  "uuid": "e694bf61-52d1-489b-a08d-c1cbace47310"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "cfb72fcb-04ea-475e-8d25-4d862d35fb54",
                  "type": "has_only_phrase",
                  "uuid": "0cb7706c-a994-41bd-aec3-1cb2fe50bf31"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "655254de-cbd5-44b5-a72a-ff7b3db83f0f",
                  "type": "has_only_phrase",
                  "uuid": "49a1d9c2-4e8e-47c4-a814-b6e1275c9da9"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "e0ca6fd9-ed80-4f5c-a7aa-ce7f00068496",
                  "type": "has_only_phrase",
                  "uuid": "11b84135-4449-45f1-8efe-4c5e17cc9012"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "4332efdf-23c0-41ee-b0a4-5e56af92cbba",
                  "type": "has_only_phrase",
                  "uuid": "51bc56ce-f2f1-43c4-a394-85c5d5a9ec8f"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "b70c9c1b-1e8b-46bb-9caf-8fce69e1b3a3",
                  "type": "has_only_phrase",
                  "uuid": "9cdeaad1-406b-401a-9905-b170564c4a65"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "513b76b5-6e52-444a-aac5-b1ef2df92ff2",
                  "type": "has_only_phrase",
                  "uuid": "0c01f960-d307-42e8-9322-14911ad041fc"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "932c8bdb-29e0-4d5b-800b-06a5f27f16b7",
                  "type": "has_only_phrase",
                  "uuid": "99029894-cce7-4c4a-80f0-93c0833052a6"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "d45e0245-a7cd-4fa9-a139-7f9e81735720",
                  "type": "has_only_phrase",
                  "uuid": "fb4bd742-2afe-4827-8620-a6c293a98b67"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "90bc6e12-5ad2-4206-84f5-581302f57e4a",
                  "name": "All Responses",
                  "uuid": "cc0f31a9-31cf-44fb-9d6c-d1e3a4b1bc48"
                },
                {
                  "exit_uuid": "3f44a78c-1f05-4f10-9c94-29a4243ce930",
                  "name": "I don’t have enough time",
                  "uuid": "5db5ec5c-f4aa-4833-8c31-0b46b37d8438"
                },
                {
                  "exit_uuid": "732fd9be-8cef-4a24-8c2a-8dcd1ec15e86",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "dcd8fa93-04e0-4213-a35e-eba9ab9358ba"
                },
                {
                  "exit_uuid": "5d5f6c0f-fdf1-49b7-905a-c86aefdff621",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "e8386405-b1bf-45f2-b43b-2e3d8cf8fee2"
                },
                {
                  "exit_uuid": "5c47f9a2-cfc9-4175-922a-9ea3416afd2a",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "6ba87cca-dc88-4295-972d-dc87d0f01c4e"
                },
                {
                  "exit_uuid": "e81f40ad-61df-4343-852a-c792b7849e87",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "1b5ac364-7f23-43be-a932-d2745b843a3b"
                },
                {
                  "exit_uuid": "53603c1d-5b6c-41d8-b13f-6f2d69c76f25",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "f0727127-676d-4407-9475-5a8d2fc84b4f"
                },
                {
                  "exit_uuid": "b2cdd947-d009-4c3f-899e-e8e03b776d12",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "0a889e5e-3ce8-49af-b589-f29c886c4201"
                },
                {
                  "exit_uuid": "20594577-4424-4f1a-944d-3c41e476e2b1",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "cfb72fcb-04ea-475e-8d25-4d862d35fb54"
                },
                {
                  "exit_uuid": "e38b0675-7a73-4286-98c3-31001526c4f5",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "655254de-cbd5-44b5-a72a-ff7b3db83f0f"
                },
                {
                  "exit_uuid": "3fe080c6-e260-4728-abc3-14235b24b835",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "e0ca6fd9-ed80-4f5c-a7aa-ce7f00068496"
                },
                {
                  "exit_uuid": "7471dc85-681a-4d47-ac39-3261911be86e",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "4332efdf-23c0-41ee-b0a4-5e56af92cbba"
                },
                {
                  "exit_uuid": "b1b109c7-f5e9-40f0-b5b3-5515ccadc54c",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "b70c9c1b-1e8b-46bb-9caf-8fce69e1b3a3"
                },
                {
                  "exit_uuid": "8ea454c3-76f4-425b-802a-b6f057089ead",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "513b76b5-6e52-444a-aac5-b1ef2df92ff2"
                },
                {
                  "exit_uuid": "c0a0c900-7480-4c8b-872c-6fc7a0d11267",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "932c8bdb-29e0-4d5b-800b-06a5f27f16b7"
                },
                {
                  "exit_uuid": "7cff6860-3d7a-4890-98a8-ecb6cfd5ffe9",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "d45e0245-a7cd-4fa9-a139-7f9e81735720"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "90bc6e12-5ad2-4206-84f5-581302f57e4a",
                "destination_uuid": null
              },
              {
                "uuid": "3f44a78c-1f05-4f10-9c94-29a4243ce930",
                "destination_uuid": "b37d576a-a9fa-4655-b751-f2460df6866e"
              },
              {
                "uuid": "732fd9be-8cef-4a24-8c2a-8dcd1ec15e86",
                "destination_uuid": "b3030307-9e3b-4aa0-82d6-80159125747d"
              },
              {
                "uuid": "5d5f6c0f-fdf1-49b7-905a-c86aefdff621",
                "destination_uuid": "b3030307-9e3b-4aa0-82d6-80159125747d"
              },
              {
                "uuid": "5c47f9a2-cfc9-4175-922a-9ea3416afd2a",
                "destination_uuid": "a0ef3c1a-1a6a-4d7e-8607-6ecc9e601016"
              },
              {
                "uuid": "e81f40ad-61df-4343-852a-c792b7849e87",
                "destination_uuid": "a0ef3c1a-1a6a-4d7e-8607-6ecc9e601016"
              },
              {
                "uuid": "53603c1d-5b6c-41d8-b13f-6f2d69c76f25",
                "destination_uuid": "48b81d9b-594d-40a1-afcb-8f7c82f34213"
              },
              {
                "uuid": "b2cdd947-d009-4c3f-899e-e8e03b776d12",
                "destination_uuid": "48b81d9b-594d-40a1-afcb-8f7c82f34213"
              },
              {
                "uuid": "20594577-4424-4f1a-944d-3c41e476e2b1",
                "destination_uuid": "88ca507b-ccb4-472b-8f3a-8606124e2312"
              },
              {
                "uuid": "e38b0675-7a73-4286-98c3-31001526c4f5",
                "destination_uuid": "88ca507b-ccb4-472b-8f3a-8606124e2312"
              },
              {
                "uuid": "3fe080c6-e260-4728-abc3-14235b24b835",
                "destination_uuid": "bbcaa5c7-77d9-4fdc-a219-ab636a341b58"
              },
              {
                "uuid": "7471dc85-681a-4d47-ac39-3261911be86e",
                "destination_uuid": "bbcaa5c7-77d9-4fdc-a219-ab636a341b58"
              },
              {
                "uuid": "b1b109c7-f5e9-40f0-b5b3-5515ccadc54c",
                "destination_uuid": "35f0b950-a3b7-412f-8419-052f3a82b04c"
              },
              {
                "uuid": "8ea454c3-76f4-425b-802a-b6f057089ead",
                "destination_uuid": "35f0b950-a3b7-412f-8419-052f3a82b04c"
              },
              {
                "uuid": "c0a0c900-7480-4c8b-872c-6fc7a0d11267",
                "destination_uuid": "7ff0ebf9-c4b2-415f-8726-40d39e2ffe46"
              },
              {
                "uuid": "7cff6860-3d7a-4890-98a8-ecb6cfd5ffe9",
                "destination_uuid": "7ff0ebf9-c4b2-415f-8726-40d39e2ffe46"
              }
            ]
          },
          {
            "uuid": "b37d576a-a9fa-4655-b751-f2460df6866e",
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
                "uuid": "7d594875-ed92-45f3-b14b-eb09e24d2b83"
              }
            ],
            "exits": [
              {
                "uuid": "01cf9e75-1a24-46f8-93ca-5fd9ff673c3c",
                "destination_uuid": "31560a74-605a-47e9-8c45-326a341e6f4f"
              }
            ]
          },
          {
            "uuid": "31560a74-605a-47e9-8c45-326a341e6f4f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1751f1dc-68ad-4b8d-92b5-adffef23d6fd",
              "cases": [
                {
                  "arguments": [
                    "Think of a time each day that I can make 5 minutes or a bit more."
                  ],
                  "category_uuid": "136ca9cc-8c0f-46d3-aa44-d8bfaf1888a3",
                  "type": "has_only_phrase",
                  "uuid": "1ace84d6-d444-491d-9072-9459e494fcd1"
                },
                {
                  "arguments": [
                    "Find a chore that I could do together in a fun way."
                  ],
                  "category_uuid": "156acce3-0ca0-4834-9659-0e545decc391",
                  "type": "has_only_phrase",
                  "uuid": "bebe9811-110c-4535-98e9-3804947919a9"
                },
                {
                  "arguments": [
                    "Ask my teen or someone else to help me with a chore so I have some extra free time."
                  ],
                  "category_uuid": "4c6a9e94-edc7-45b5-9dc4-1f646104de94",
                  "type": "has_only_phrase",
                  "uuid": "d9f3f79e-12e6-4be2-a01d-90c913ab1f00"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "344dd54e-cb74-4128-842c-ce1e158b8392",
                  "name": "All Responses",
                  "uuid": "1751f1dc-68ad-4b8d-92b5-adffef23d6fd"
                },
                {
                  "exit_uuid": "4e95a9c5-989d-4e43-b880-a3915cc09a93",
                  "name": "Think of a time each day that I can make 5 minutes or a bit more.",
                  "uuid": "136ca9cc-8c0f-46d3-aa44-d8bfaf1888a3"
                },
                {
                  "exit_uuid": "ff4e2e58-9a64-4d98-87ef-3a1644f82151",
                  "name": "Find a chore that I could do together in a fun way.",
                  "uuid": "156acce3-0ca0-4834-9659-0e545decc391"
                },
                {
                  "exit_uuid": "a825de87-f0f3-41a5-9c80-0cc5616654e3",
                  "name": "Ask my teen or someone else to help me with a chore so I have some extra free time.",
                  "uuid": "4c6a9e94-edc7-45b5-9dc4-1f646104de94"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "344dd54e-cb74-4128-842c-ce1e158b8392",
                "destination_uuid": null
              },
              {
                "uuid": "4e95a9c5-989d-4e43-b880-a3915cc09a93",
                "destination_uuid": "26561d71-165a-43c7-ac01-0eaf5a28a76d"
              },
              {
                "uuid": "ff4e2e58-9a64-4d98-87ef-3a1644f82151",
                "destination_uuid": "2e40c10c-d541-487b-bf20-726df719f1fb"
              },
              {
                "uuid": "a825de87-f0f3-41a5-9c80-0cc5616654e3",
                "destination_uuid": "6eb3d6d5-dd9d-4ebf-affa-41acb83fa98b"
              }
            ]
          },
          {
            "uuid": "26561d71-165a-43c7-ac01-0eaf5a28a76d",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, even spending 5 minutes makes a big difference, and if you do it at the same time every day (like at breakfast or before bed), it will be easier to keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "884cd7a1-bfd9-4235-a7e0-ab35927de25e"
              }
            ],
            "exits": [
              {
                "uuid": "55f73cea-2f73-4932-a368-ec5d128226f1",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "2e40c10c-d541-487b-bf20-726df719f1fb",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way you get your work done and have a fun time together with your teen!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2d00c2f7-b0dd-4ba5-b0bf-8dfc7abdeaa8"
              }
            ],
            "exits": [
              {
                "uuid": "1af14e46-e7ee-431e-828b-4f9f9c90c4b1",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "6eb3d6d5-dd9d-4ebf-affa-41acb83fa98b",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By sharing responsibilities, you will have more time to do something fun with your teen – it's so important!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "75716280-5c6a-4e23-ac58-a763c359ff11"
              }
            ],
            "exits": [
              {
                "uuid": "0d109e0b-6aa3-4ec7-adcd-46dfa2df4de9",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "b3030307-9e3b-4aa0-82d6-80159125747d",
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
                "uuid": "7fdab7c9-5832-4aa0-89f0-0528ecf36d0a"
              }
            ],
            "exits": [
              {
                "uuid": "fe4d0e5e-8485-4507-9cc1-02ad9dfa31b7",
                "destination_uuid": "bf51d0f7-b4c5-4c8f-9ed4-1ebb94886d1c"
              }
            ]
          },
          {
            "uuid": "bf51d0f7-b4c5-4c8f-9ed4-1ebb94886d1c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "50191a15-3821-4ba4-bbf1-872c8d4bf151",
              "cases": [
                {
                  "arguments": [
                    "Think of a time when my teen is more open to me like in the morning or right before bedtime."
                  ],
                  "category_uuid": "dacfc534-efdb-4e3b-a9e1-e514aa944e61",
                  "type": "has_only_phrase",
                  "uuid": "ec272d5a-d7b4-4600-ad27-cd39ed2c9192"
                },
                {
                  "arguments": [
                    "Sit next to my teen while they are doing something they enjoy and show interest in what they like."
                  ],
                  "category_uuid": "90d709ba-897b-4629-8e71-e83cf5bdff4a",
                  "type": "has_only_phrase",
                  "uuid": "31993030-741a-4394-a994-a24f20375f33"
                },
                {
                  "arguments": [
                    "Do something fun with the whole family. "
                  ],
                  "category_uuid": "7c540bfd-0828-466b-b299-5cf93118bb5b",
                  "type": "has_only_phrase",
                  "uuid": "76c71076-7504-4924-a90c-f951e358198d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "676452e5-bea9-4878-aee8-0b82f2d451f4",
                  "name": "All Responses",
                  "uuid": "50191a15-3821-4ba4-bbf1-872c8d4bf151"
                },
                {
                  "exit_uuid": "6b4e4fe4-b740-43ce-afb9-a65a57373afc",
                  "name": "Think of a time when my teen is more open to me like in the morning or right before bedtime.",
                  "uuid": "dacfc534-efdb-4e3b-a9e1-e514aa944e61"
                },
                {
                  "exit_uuid": "cf537e6c-992c-4904-b5e2-e5c223e948b2",
                  "name": "Sit next to my teen while they are doing something they enjoy and show interest in what they like.",
                  "uuid": "90d709ba-897b-4629-8e71-e83cf5bdff4a"
                },
                {
                  "exit_uuid": "15de3bba-e920-40f5-961e-e3eb5ac584d4",
                  "name": "Do something fun with the whole family. ",
                  "uuid": "7c540bfd-0828-466b-b299-5cf93118bb5b"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "676452e5-bea9-4878-aee8-0b82f2d451f4",
                "destination_uuid": null
              },
              {
                "uuid": "6b4e4fe4-b740-43ce-afb9-a65a57373afc",
                "destination_uuid": "21ed84a7-0f47-401f-86e9-44c2e448c048"
              },
              {
                "uuid": "cf537e6c-992c-4904-b5e2-e5c223e948b2",
                "destination_uuid": "ad59c72c-70e7-42d1-84d9-81d17e3c5bf4"
              },
              {
                "uuid": "15de3bba-e920-40f5-961e-e3eb5ac584d4",
                "destination_uuid": "58ecea40-5080-4c7d-8de5-e75ea40f77cb"
              }
            ]
          },
          {
            "uuid": "21ed84a7-0f47-401f-86e9-44c2e448c048",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Picking a time when your teen is more talkative will help them to respond well to your attempt to connect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "465f3415-9be6-4e1a-8675-7d1c720764c1"
              }
            ],
            "exits": [
              {
                "uuid": "0528c35e-cdec-4753-a1ef-2ec11294ecf0",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "ad59c72c-70e7-42d1-84d9-81d17e3c5bf4",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Watching their favourite T.V. show or sports match together will show them that you care. Just be patient, they will open up to you over time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "aaf13559-4ad3-49ce-91f9-2ed68bb53dad"
              }
            ],
            "exits": [
              {
                "uuid": "93561923-fd2d-44a1-b517-0dc8cc15616d",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "58ecea40-5080-4c7d-8de5-e75ea40f77cb",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect! Sometimes it can be easier to start with doing something with the whole family. That way your teen can get more comfortable with you over time.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "970e8b75-cf3c-4f5c-80ab-f61e236b1f26"
              }
            ],
            "exits": [
              {
                "uuid": "22145264-61bf-4ea2-ae5c-93de4750714c",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "a0ef3c1a-1a6a-4d7e-8607-6ecc9e601016",
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
                "uuid": "a800fb53-d55f-40c3-80f1-bc1cfbb11671"
              }
            ],
            "exits": [
              {
                "uuid": "ba661786-9702-4b64-a2db-e46b95101177",
                "destination_uuid": "dc5be772-cf12-435b-b2dd-726fbdc03cc2"
              }
            ]
          },
          {
            "uuid": "dc5be772-cf12-435b-b2dd-726fbdc03cc2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0f3b4f11-a625-4a1f-a465-7e3045642693",
              "cases": [
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "3d2e3c66-d980-42a7-bd12-8e33e8db4e78",
                  "type": "has_only_phrase",
                  "uuid": "95687b09-8b33-41a8-a705-9cda5e9242ef"
                },
                {
                  "arguments": [
                    "Find something educational to do together with my teen on the gadget."
                  ],
                  "category_uuid": "67c8faca-17f4-4d71-9fc9-219c37cc9f77",
                  "type": "has_only_phrase",
                  "uuid": "6265a859-7217-45b5-a092-a1a6bc290bb1"
                },
                {
                  "arguments": [
                    "Ask my teen to show how their phone/gadget works."
                  ],
                  "category_uuid": "0cacab43-b5a5-4061-b359-283fc82a9866",
                  "type": "has_only_phrase",
                  "uuid": "0b5279a2-0e1a-4225-b685-3db308007da8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fc2c0cf8-f84b-4bc7-8cd8-5accb2c79a7d",
                  "name": "All Responses",
                  "uuid": "0f3b4f11-a625-4a1f-a465-7e3045642693"
                },
                {
                  "exit_uuid": "bc466f03-7798-494b-867f-0069d0783733",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "3d2e3c66-d980-42a7-bd12-8e33e8db4e78"
                },
                {
                  "exit_uuid": "8a8b1bcc-ff35-4cfb-b535-1525b563ed86",
                  "name": "Find something educational to do together with my teen on the gadget.",
                  "uuid": "67c8faca-17f4-4d71-9fc9-219c37cc9f77"
                },
                {
                  "exit_uuid": "62ae68be-8277-434e-9cbd-f1fce7a8a738",
                  "name": "Ask my teen to show how their phone/gadget works.",
                  "uuid": "0cacab43-b5a5-4061-b359-283fc82a9866"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fc2c0cf8-f84b-4bc7-8cd8-5accb2c79a7d",
                "destination_uuid": null
              },
              {
                "uuid": "bc466f03-7798-494b-867f-0069d0783733",
                "destination_uuid": "c1b260b3-773f-4ec5-97f1-495fd9cedad5"
              },
              {
                "uuid": "8a8b1bcc-ff35-4cfb-b535-1525b563ed86",
                "destination_uuid": "88a0ce1e-3612-40b6-b051-636f9ff409bc"
              },
              {
                "uuid": "62ae68be-8277-434e-9cbd-f1fce7a8a738",
                "destination_uuid": "b776b439-52b3-492f-b926-8e815a024fa8"
              }
            ]
          },
          {
            "uuid": "c1b260b3-773f-4ec5-97f1-495fd9cedad5",
            "actions": [
              {
                "attachments": [],
                "text": "That's perfect! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1af0fd9c-de9c-4804-a126-7c1ce76b01ca"
              }
            ],
            "exits": [
              {
                "uuid": "f276de4f-5fe4-4c7f-b49a-5451f5ac777d",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "88a0ce1e-3612-40b6-b051-636f9ff409bc",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! There are lots of fun apps you can play on phones together. Ask questions, show interest, and remember to say something nice.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9039f526-a2ed-4cb0-a749-3fbbf08a9948"
              }
            ],
            "exits": [
              {
                "uuid": "a9a6cff8-9699-4e1c-8ea3-1c9c9c6429a1",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "b776b439-52b3-492f-b926-8e815a024fa8",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Teens love it if you show interest and if they can explain something they know to you. It's a great starting point! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a8ec3cde-9d6b-4555-8b4b-f6e44375fc3b"
              }
            ],
            "exits": [
              {
                "uuid": "5636c807-e4b7-4972-be6b-677319784f56",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "48b81d9b-594d-40a1-afcb-8f7c82f34213",
            "actions": [
              {
                "attachments": [],
                "text": "I have that challenge too sometimes. One-on-one time should always be safe, and it does not have to cost a thing!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "d072eeea-7c38-4c2d-9d38-ff04b3fd174b"
              }
            ],
            "exits": [
              {
                "uuid": "8ad25955-11e3-4387-984c-0bfd0082b5ff",
                "destination_uuid": "45b65250-f89d-489e-b824-12a90904f324"
              }
            ]
          },
          {
            "uuid": "45b65250-f89d-489e-b824-12a90904f324",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f1e4e5ba-17c4-4944-a9b7-19d164ad2d5d",
              "cases": [
                {
                  "arguments": [
                    "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. "
                  ],
                  "category_uuid": "e0ebed04-44c4-42ae-84cc-35fae51f5d26",
                  "type": "has_only_phrase",
                  "uuid": "661f373d-509e-4511-8200-115bc7e2679f"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "68afb0df-4692-47df-8cdc-07724b53dbbf",
                  "type": "has_only_phrase",
                  "uuid": "17f90618-0b79-4265-aa7a-809f1a59c28d"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e5ad4200-baac-4b08-8b02-0456b4fe63b9",
                  "name": "All Responses",
                  "uuid": "f1e4e5ba-17c4-4944-a9b7-19d164ad2d5d"
                },
                {
                  "exit_uuid": "0cea6d68-c2fd-4138-b802-d7231474b6dd",
                  "name": "Explain to my teen why their suggestion is not safe or possible and ask them for other ideas. ",
                  "uuid": "e0ebed04-44c4-42ae-84cc-35fae51f5d26"
                },
                {
                  "exit_uuid": "041eef29-3032-4834-a3c7-cee02d9e7698",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "68afb0df-4692-47df-8cdc-07724b53dbbf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "e5ad4200-baac-4b08-8b02-0456b4fe63b9",
                "destination_uuid": null
              },
              {
                "uuid": "0cea6d68-c2fd-4138-b802-d7231474b6dd",
                "destination_uuid": "3649c7a7-1d83-4eea-b0c1-e7617fee9362"
              },
              {
                "uuid": "041eef29-3032-4834-a3c7-cee02d9e7698",
                "destination_uuid": "404557b6-d25f-4148-aad5-49f7037d67a2"
              }
            ]
          },
          {
            "uuid": "3649c7a7-1d83-4eea-b0c1-e7617fee9362",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, it is very important that your teen understands why you cannot do the activity that they suggested. Then ask them for other ideas!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "808e7575-1687-4061-954e-3082e0fb93e3"
              }
            ],
            "exits": [
              {
                "uuid": "550e4a83-f9d4-4219-85a2-7e5a00ebddd4",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "404557b6-d25f-4148-aad5-49f7037d67a2",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of fun and free things that you could do! Remember, let your teen choose! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f122ea2c-5a2b-45d3-bab0-e21407087a20"
              }
            ],
            "exits": [
              {
                "uuid": "16ecff16-d824-4a68-99d6-9f7c2f3fdd1b",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "88ca507b-ccb4-472b-8f3a-8606124e2312",
            "actions": [
              {
                "attachments": [],
                "text": "Ai sorry, our teens may be disappointed if we cannot do what they want to do, like sports or other heavy activities. But remember, it’s most important that we spend time with them – that looks different for everyone!\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Watch my teen do the activity and cheer them on.",
                  "Suggest other fun options to do instead."
                ],
                "uuid": "0ad23fcd-8c74-40c5-bbec-7c392450808c"
              }
            ],
            "exits": [
              {
                "uuid": "7fe3e8fb-0b51-464d-9096-a9a5e0ff025c",
                "destination_uuid": "f9cdca52-35f1-49cc-8eea-f930906357c9"
              }
            ]
          },
          {
            "uuid": "f9cdca52-35f1-49cc-8eea-f930906357c9",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "801561af-e3bd-4a59-b1bf-e4a6b75d27fa",
              "cases": [
                {
                  "arguments": [
                    "Watch my teen do the activity and cheer them on."
                  ],
                  "category_uuid": "86565dba-c3e5-4d3b-9a48-ddfb2c7cfbcb",
                  "type": "has_only_phrase",
                  "uuid": "2f8ea86f-13b2-49cf-bb7f-441f0f358c07"
                },
                {
                  "arguments": [
                    "Suggest other fun options to do instead."
                  ],
                  "category_uuid": "e919cb51-7d73-4d53-9826-60d9131856ae",
                  "type": "has_only_phrase",
                  "uuid": "e5291b72-2e06-4c5e-bf3d-24308a2f8612"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3d4cc1e7-1885-4040-977d-3652cbb87f56",
                  "name": "All Responses",
                  "uuid": "801561af-e3bd-4a59-b1bf-e4a6b75d27fa"
                },
                {
                  "exit_uuid": "de59e388-d43e-4b03-b987-84b3175c30d7",
                  "name": "Watch my teen do the activity and cheer them on.",
                  "uuid": "86565dba-c3e5-4d3b-9a48-ddfb2c7cfbcb"
                },
                {
                  "exit_uuid": "c6cbac04-98fd-406e-8173-53283f62cf42",
                  "name": "Suggest other fun options to do instead.",
                  "uuid": "e919cb51-7d73-4d53-9826-60d9131856ae"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3d4cc1e7-1885-4040-977d-3652cbb87f56",
                "destination_uuid": null
              },
              {
                "uuid": "de59e388-d43e-4b03-b987-84b3175c30d7",
                "destination_uuid": "2a8811cb-7c82-49e7-a36d-5685aac31e27"
              },
              {
                "uuid": "c6cbac04-98fd-406e-8173-53283f62cf42",
                "destination_uuid": "566238ac-34a5-4142-b951-aa6853ee479e"
              }
            ]
          },
          {
            "uuid": "2a8811cb-7c82-49e7-a36d-5685aac31e27",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Even if you are watching instead of doing the activity together, you can show your interest well by describing and praising what your teen is doing!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7e51a0e6-d808-4bdc-96e7-1f3d110d2654"
              }
            ],
            "exits": [
              {
                "uuid": "186b5c04-997b-4ecf-a881-0be09393c32b",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "566238ac-34a5-4142-b951-aa6853ee479e",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "95092b5c-6ca5-474e-83b5-543f2ed8b4e2"
              }
            ],
            "exits": [
              {
                "uuid": "a255e44a-bb4e-4a13-aeb8-487a530377c2",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "bbcaa5c7-77d9-4fdc-a219-ab636a341b58",
            "actions": [
              {
                "attachments": [],
                "text": "So true, competitive games can be challenging for teens (and adults!) if they have difficulty losing.\nDo you want to try one of the following things?",
                "type": "send_msg",
                "quick_replies": [
                  "Suggest other activities that we can do together instead of against each other.",
                  "Play the activity in teams so I can encourage my teen when we may lose."
                ],
                "uuid": "176889ce-c7fe-4a08-b3c2-674b7b3fb2b2"
              }
            ],
            "exits": [
              {
                "uuid": "f95c2806-eaf8-4993-8428-870a587995ba",
                "destination_uuid": "b96164ff-ba03-4ec4-87ce-8778b1e855af"
              }
            ]
          },
          {
            "uuid": "b96164ff-ba03-4ec4-87ce-8778b1e855af",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b23afea0-8522-4f1c-83fc-a6b458fd4c75",
              "cases": [
                {
                  "arguments": [
                    "Suggest other activities that we can do together instead of against each other."
                  ],
                  "category_uuid": "72dc7765-eeb9-4e20-b54d-e4e0aa3b028c",
                  "type": "has_only_phrase",
                  "uuid": "26b36190-a19d-4866-94b0-43be1e45f757"
                },
                {
                  "arguments": [
                    "Play the activity in teams so I can encourage my teen when we may lose."
                  ],
                  "category_uuid": "a64784dd-07f9-408b-b36e-1fc653ca2734",
                  "type": "has_only_phrase",
                  "uuid": "280a58d9-48a7-4a39-af49-8050f72c4f03"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dfaefad5-c307-47db-892c-a51998eeebbd",
                  "name": "All Responses",
                  "uuid": "b23afea0-8522-4f1c-83fc-a6b458fd4c75"
                },
                {
                  "exit_uuid": "48212102-872a-45a8-a8da-594b1c3d4174",
                  "name": "Suggest other activities that we can do together instead of against each other.",
                  "uuid": "72dc7765-eeb9-4e20-b54d-e4e0aa3b028c"
                },
                {
                  "exit_uuid": "26e13c88-a75d-45d5-9d5f-5c0714f06414",
                  "name": "Play the activity in teams so I can encourage my teen when we may lose.",
                  "uuid": "a64784dd-07f9-408b-b36e-1fc653ca2734"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "dfaefad5-c307-47db-892c-a51998eeebbd",
                "destination_uuid": null
              },
              {
                "uuid": "48212102-872a-45a8-a8da-594b1c3d4174",
                "destination_uuid": "57ea6def-cbae-465f-a7d7-a3519e6a120b"
              },
              {
                "uuid": "26e13c88-a75d-45d5-9d5f-5c0714f06414",
                "destination_uuid": "d35ad170-50f2-4611-81df-ab61a20d6c6d"
              }
            ]
          },
          {
            "uuid": "57ea6def-cbae-465f-a7d7-a3519e6a120b",
            "actions": [
              {
                "attachments": [],
                "text": "Great! If you need any inspiration, @fields.elder can give you some ideas of what you could do! Remember, let your teen choose!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "dea32e95-580d-4163-b458-3266172ed4e4"
              }
            ],
            "exits": [
              {
                "uuid": "35c30b3e-8984-43af-8885-9f2be101d1a5",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "d35ad170-50f2-4611-81df-ab61a20d6c6d",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you and your teen are in the same team, you can help them manage their emotions if you may lose. I can give you more tips about that later on!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "39eb668f-babf-4b18-a223-f124c0590731"
              }
            ],
            "exits": [
              {
                "uuid": "46002b4c-a894-4758-bd9f-7a4f2cec3ac3",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "35f0b950-a3b7-412f-8419-052f3a82b04c",
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
                "uuid": "12f58477-c275-4b69-a6e6-89898a8a3741"
              }
            ],
            "exits": [
              {
                "uuid": "77282cc7-4e73-42bb-8e87-cafd0fba3ace",
                "destination_uuid": "b29d8b25-d1b8-4141-b4e4-3ade757cfed0"
              }
            ]
          },
          {
            "uuid": "b29d8b25-d1b8-4141-b4e4-3ade757cfed0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8cef29bd-c769-406d-a046-a5b606dd9bd6",
              "cases": [
                {
                  "arguments": [
                    "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. "
                  ],
                  "category_uuid": "9497aa05-4547-4667-a842-5ace2f6f4065",
                  "type": "has_only_phrase",
                  "uuid": "01d3fb51-3ab7-43ac-a1fa-a56af0dcc032"
                },
                {
                  "arguments": [
                    "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch."
                  ],
                  "category_uuid": "53f7cce1-ef6c-4da2-ae28-fdf57c5ee1f5",
                  "type": "has_only_phrase",
                  "uuid": "1e0226d4-787e-4a44-93d9-2cbe4e2b2906"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time right before another activity my teen enjoys."
                  ],
                  "category_uuid": "ee4d81a0-6e69-4827-99c9-a1632a7496cd",
                  "type": "has_only_phrase",
                  "uuid": "ac40ed04-6e57-4f6e-90f6-61d95e290f5e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "8c5cd58f-b366-47a9-9124-c9bb9903af4c",
                  "name": "All Responses",
                  "uuid": "8cef29bd-c769-406d-a046-a5b606dd9bd6"
                },
                {
                  "exit_uuid": "a4d38a4a-c1fd-40fa-81ae-02e67e92e430",
                  "name": "Say \"we have 1 minute   before it’s the end of One-on-One Time today\" so my teen is prepared. ",
                  "uuid": "9497aa05-4547-4667-a842-5ace2f6f4065"
                },
                {
                  "exit_uuid": "a05fad33-51f0-4f30-9402-2cdbf642ec97",
                  "name": "Clearly tell my teen how much time I have for One-on-One Time and ask them to keep track on a clock or watch.",
                  "uuid": "53f7cce1-ef6c-4da2-ae28-fdf57c5ee1f5"
                },
                {
                  "exit_uuid": "55289218-b3a2-465b-85d2-efbba60f6299",
                  "name": "Plan One-on-One Time right before another activity my teen enjoys.",
                  "uuid": "ee4d81a0-6e69-4827-99c9-a1632a7496cd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "8c5cd58f-b366-47a9-9124-c9bb9903af4c",
                "destination_uuid": null
              },
              {
                "uuid": "a4d38a4a-c1fd-40fa-81ae-02e67e92e430",
                "destination_uuid": "e7b78265-0e61-42e8-8d74-6ce7e7ec9f83"
              },
              {
                "uuid": "a05fad33-51f0-4f30-9402-2cdbf642ec97",
                "destination_uuid": "aef4832d-1346-44ff-9478-076398dcc0f0"
              },
              {
                "uuid": "55289218-b3a2-465b-85d2-efbba60f6299",
                "destination_uuid": "83c35f43-dde6-4bb0-ac60-74231c0ff457"
              }
            ]
          },
          {
            "uuid": "e7b78265-0e61-42e8-8d74-6ce7e7ec9f83",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! By giving your teen a heads-up, the end of One-on-One Time does not come as a surprise. And you can remind your teen you will spend time again together tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "901452ef-fa56-411d-9777-88efae8af810"
              }
            ],
            "exits": [
              {
                "uuid": "7450b276-0215-4cfc-b0a9-dfabfd79decb",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "aef4832d-1346-44ff-9478-076398dcc0f0",
            "actions": [
              {
                "attachments": [],
                "text": "Great! That way your teen has the responsibility to watch time and will be aware when time is almost up. Remind them you will spend time together again tomorrow.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e3919f75-ca8e-473c-9de3-0c93726aca16"
              }
            ],
            "exits": [
              {
                "uuid": "b0a80694-a88b-48ad-827b-8825b5a17732",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "83c35f43-dde6-4bb0-ac60-74231c0ff457",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! If you spend time together right before dinner, you can enthusiastically say \"One-on-One Time is over, let's get ready for dinner with the rest of the family!\"",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6bd800c0-607a-4984-b1f4-a1b255466b19"
              }
            ],
            "exits": [
              {
                "uuid": "ce62e03a-ead1-4450-bbbc-47d0cf39c4e8",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "7ff0ebf9-c4b2-415f-8726-40d39e2ffe46",
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
                "uuid": "a2f5327d-6dcf-451a-92c8-3e57b9526f0f"
              }
            ],
            "exits": [
              {
                "uuid": "ebfe5ec3-6f55-4cdc-9f3a-edffc131e667",
                "destination_uuid": "92386808-5944-4206-a05c-9cbed1c3eb16"
              }
            ]
          },
          {
            "uuid": "92386808-5944-4206-a05c-9cbed1c3eb16",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "8c237d34-2949-44a6-973d-2df904e7ab06",
              "cases": [
                {
                  "arguments": [
                    "Ask another adult or older sibling to look after the younger children during that time."
                  ],
                  "category_uuid": "d0f57bfc-0f02-42bf-b842-fac7f9b5174e",
                  "type": "has_only_phrase",
                  "uuid": "e9a81e8f-3ea7-48d9-a302-0dde2a2c70b9"
                },
                {
                  "arguments": [
                    "Think of a time when the other children are not around and spend time then."
                  ],
                  "category_uuid": "31d46618-10dc-4a63-9214-89f3d1598a87",
                  "type": "has_only_phrase",
                  "uuid": "52006b92-fb4a-47de-96d8-af33ddf86aae"
                },
                {
                  "arguments": [
                    "Plan One-on-One Time in a place other than at home"
                  ],
                  "category_uuid": "c6c3f2b1-77ab-4536-bc96-b510ca588b39",
                  "type": "has_only_phrase",
                  "uuid": "c44da505-460c-401c-9deb-027c073303b4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a442f4b1-4d99-4584-b63f-adb92f6a8000",
                  "name": "All Responses",
                  "uuid": "8c237d34-2949-44a6-973d-2df904e7ab06"
                },
                {
                  "exit_uuid": "a0db1ddf-41fa-42bb-aace-46d260a7ea44",
                  "name": "Ask another adult or older sibling to look after the younger children during that time.",
                  "uuid": "d0f57bfc-0f02-42bf-b842-fac7f9b5174e"
                },
                {
                  "exit_uuid": "27c6edd3-e13b-4c2e-83f5-fa6941c3c978",
                  "name": "Think of a time when the other children are not around and spend time then.",
                  "uuid": "31d46618-10dc-4a63-9214-89f3d1598a87"
                },
                {
                  "exit_uuid": "0e0260a7-a3b1-4ce2-9916-85d930cd681b",
                  "name": "Plan One-on-One Time in a place other than at home",
                  "uuid": "c6c3f2b1-77ab-4536-bc96-b510ca588b39"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a442f4b1-4d99-4584-b63f-adb92f6a8000",
                "destination_uuid": null
              },
              {
                "uuid": "a0db1ddf-41fa-42bb-aace-46d260a7ea44",
                "destination_uuid": "4c50e190-efe1-42ee-875a-cfd1ff06fdb0"
              },
              {
                "uuid": "27c6edd3-e13b-4c2e-83f5-fa6941c3c978",
                "destination_uuid": "9cdeaf54-9038-45d5-a020-fc619b192188"
              },
              {
                "uuid": "0e0260a7-a3b1-4ce2-9916-85d930cd681b",
                "destination_uuid": "0c9cb615-b26b-49a5-9956-d6312d5bf773"
              }
            ]
          },
          {
            "uuid": "4c50e190-efe1-42ee-875a-cfd1ff06fdb0",
            "actions": [
              {
                "attachments": [],
                "text": "Perfect, that way you can give your undivided attention to your teen, so they feel valued and loved.  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "1c7a432e-9a00-49cd-86f3-115683a302d1"
              }
            ],
            "exits": [
              {
                "uuid": "73297d40-57f9-4a63-b9fa-9eb274123903",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "9cdeaf54-9038-45d5-a020-fc619b192188",
            "actions": [
              {
                "attachments": [],
                "text": "Great! You can try spending time with your teen when the other children have already gone to bed, or are playing outside.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a7907866-a9ac-4e5f-b7f3-b147bdc44b85"
              }
            ],
            "exits": [
              {
                "uuid": "230fe46f-1174-4f6a-ae37-a34f56c0f498",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "0c9cb615-b26b-49a5-9956-d6312d5bf773",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful! Maybe you can walk to the shops together or go watch a sports match, so you can chat without the other children demanding attention. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a89afc7a-d10a-46d4-8d1a-460639946383"
              }
            ],
            "exits": [
              {
                "uuid": "f0e9d14e-0d36-42d8-a142-6f9e9cfdcdff",
                "destination_uuid": "74f59ce9-b401-43d2-b24c-25261b909760"
              }
            ]
          },
          {
            "uuid": "74f59ce9-b401-43d2-b24c-25261b909760",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "50db538d-c791-4a03-9817-fbac8d5370d0",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "0d8479bd-e8b4-4be5-8963-be33737a46ab",
                  "type": "has_only_phrase",
                  "uuid": "eeb55109-319e-4f20-9a58-5dff29cb88af"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "75cab63b-7f07-4599-b6e4-130daaa5cb56",
                  "name": "All Responses",
                  "uuid": "50db538d-c791-4a03-9817-fbac8d5370d0"
                },
                {
                  "exit_uuid": "bfa84c3f-634a-4172-99b5-b9c501b0679e",
                  "name": "Next",
                  "uuid": "0d8479bd-e8b4-4be5-8963-be33737a46ab"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "75cab63b-7f07-4599-b6e4-130daaa5cb56",
                "destination_uuid": null
              },
              {
                "uuid": "bfa84c3f-634a-4172-99b5-b9c501b0679e",
                "destination_uuid": "388196d2-e775-42c1-86f4-708e10d63256"
              }
            ]
          },
          {
            "uuid": "388196d2-e775-42c1-86f4-708e10d63256",
            "actions": [
              {
                "attachments": [],
                "text": "Did you have any other challenges?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "d6323746-4cea-46ff-b0c5-5fc7e25741d9"
              }
            ],
            "exits": [
              {
                "uuid": "9ed08457-1b64-44f7-bb29-ec2ce43312d6",
                "destination_uuid": "11adacb8-116e-465a-9d59-e9ee052e3058"
              }
            ]
          },
          {
            "uuid": "11adacb8-116e-465a-9d59-e9ee052e3058",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1f4bd291-8549-429d-958e-b997a8edef9c",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "1ea20bd3-deac-4b79-a573-d216687d9807",
                  "type": "has_only_phrase",
                  "uuid": "dfad1e39-44a9-4650-9eae-5000593d78e4"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "178a936b-7ed5-4199-b381-70425e72aadb",
                  "type": "has_only_phrase",
                  "uuid": "2a2abbab-bd01-49ea-8fe9-36989ea14d0c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "be4faefb-d18e-4d83-87bc-ea830ef2c2a7",
                  "name": "All Responses",
                  "uuid": "1f4bd291-8549-429d-958e-b997a8edef9c"
                },
                {
                  "exit_uuid": "10cbb7a1-e9dc-45e2-80f9-ab2debfb45e0",
                  "name": "No",
                  "uuid": "1ea20bd3-deac-4b79-a573-d216687d9807"
                },
                {
                  "exit_uuid": "d9946112-8c11-4875-80e1-20ee45f117d9",
                  "name": "Yes",
                  "uuid": "178a936b-7ed5-4199-b381-70425e72aadb"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "be4faefb-d18e-4d83-87bc-ea830ef2c2a7",
                "destination_uuid": null
              },
              {
                "uuid": "10cbb7a1-e9dc-45e2-80f9-ab2debfb45e0",
                "destination_uuid": "79c056ef-039d-4d19-9c98-637a1bc221ea"
              },
              {
                "uuid": "d9946112-8c11-4875-80e1-20ee45f117d9",
                "destination_uuid": "c697fb39-9d9c-43fc-ae81-3f9b2d083fca"
              }
            ]
          },
          {
            "uuid": "79c056ef-039d-4d19-9c98-637a1bc221ea",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for sharing! You are an awesome parent for spending time with your teen, it makes all the difference. Keep up the good work – and remember, I am always here to support!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8fb99c47-0d1f-45de-8bb7-6876260bb0cf"
              }
            ],
            "exits": [
              {
                "uuid": "6e6c5463-00f6-4b45-bf1c-e1241c72937b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "c697fb39-9d9c-43fc-ae81-3f9b2d083fca",
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
                "uuid": "a68b4398-15ee-47d2-875b-51f1ccb5c0f9"
              }
            ],
            "exits": [
              {
                "uuid": "51f10ecf-6df5-4f3c-b5f4-7a858ef72c27",
                "destination_uuid": "12ffa722-f372-49d2-8508-fbf14c1f6df2"
              }
            ]
          },
          {
            "uuid": "12ffa722-f372-49d2-8508-fbf14c1f6df2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0aeb837e-9569-4acf-aa8e-f4bf2806b692",
              "cases": [
                {
                  "arguments": [
                    "I don’t have enough time"
                  ],
                  "category_uuid": "2bed36ce-77a1-4928-b741-9c20cd87dd36",
                  "type": "has_only_phrase",
                  "uuid": "f06dc20d-c163-4199-b4d3-9a1c802b8d8a"
                },
                {
                  "arguments": [
                    "My teen does not want to spend time with me"
                  ],
                  "category_uuid": "e4f21c3f-5c58-4aae-a1a0-57648f10f763",
                  "type": "has_only_phrase",
                  "uuid": "a71d6624-00c9-48fc-a655-aa7c075cebc0"
                },
                {
                  "arguments": [
                    "My teen only wants to watch TV or play on their phone"
                  ],
                  "category_uuid": "818d6abe-c1b3-4dc6-a387-bfb788f46961",
                  "type": "has_only_phrase",
                  "uuid": "185771f9-4f2a-4d58-b0a1-8e93c8e169f5"
                },
                {
                  "arguments": [
                    "My teen wants to do things that are not safe or that cost money"
                  ],
                  "category_uuid": "ca2762a8-0457-4010-84fd-8cdd04e8b782",
                  "type": "has_only_phrase",
                  "uuid": "9aff9eae-77e4-4870-a3a2-b2886ce47442"
                },
                {
                  "arguments": [
                    "My teen wants to do things that I cannot do physically"
                  ],
                  "category_uuid": "233dcb1f-b3f0-469d-93f5-dce9a558de42",
                  "type": "has_only_phrase",
                  "uuid": "c6b303aa-a31d-4d36-bd9f-b7435f999d82"
                },
                {
                  "arguments": [
                    "My teen chose a competitive activity. I won and they got angry."
                  ],
                  "category_uuid": "ceb3c798-e806-42eb-92f6-6b10c36e4ac3",
                  "type": "has_only_phrase",
                  "uuid": "f64b3119-fcae-4b58-86da-b9d51a4631f0"
                },
                {
                  "arguments": [
                    "I struggled to end One-on-One Time"
                  ],
                  "category_uuid": "2d3146c0-b97b-4abb-9bf0-cf0346f74b1b",
                  "type": "has_only_phrase",
                  "uuid": "7710d51c-f9b0-4ac5-b8db-a1ce9aa5f414"
                },
                {
                  "arguments": [
                    "All my children want One-on-One Time at the same time"
                  ],
                  "category_uuid": "1d90f472-3860-4944-837f-39eace5a3ff3",
                  "type": "has_only_phrase",
                  "uuid": "9f54897b-15fa-49d1-b5cc-a40d3d7d1a10"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "21b3208c-3333-4fbf-81af-888b6b5c9498",
                  "name": "All Responses",
                  "uuid": "0aeb837e-9569-4acf-aa8e-f4bf2806b692"
                },
                {
                  "exit_uuid": "1f04ca26-2b0e-418f-b72e-6897fbd5f71e",
                  "name": "I don’t have enough time",
                  "uuid": "2bed36ce-77a1-4928-b741-9c20cd87dd36"
                },
                {
                  "exit_uuid": "6c349414-7154-4e4b-81d7-01e5d3137f69",
                  "name": "My teen does not want to spend time with me",
                  "uuid": "e4f21c3f-5c58-4aae-a1a0-57648f10f763"
                },
                {
                  "exit_uuid": "c59818df-04ef-4b91-b2d0-033232918a7e",
                  "name": "My teen only wants to watch TV or play on their phone",
                  "uuid": "818d6abe-c1b3-4dc6-a387-bfb788f46961"
                },
                {
                  "exit_uuid": "70b49763-b05e-48e5-9149-85e3f4248bf7",
                  "name": "My teen wants to do things that are not safe or that cost money",
                  "uuid": "ca2762a8-0457-4010-84fd-8cdd04e8b782"
                },
                {
                  "exit_uuid": "8cd63c43-05e4-4fb7-8cd3-fd7fcd629167",
                  "name": "My teen wants to do things that I cannot do physically",
                  "uuid": "233dcb1f-b3f0-469d-93f5-dce9a558de42"
                },
                {
                  "exit_uuid": "3d855cef-4afc-4ead-8305-2b1eb29c0c32",
                  "name": "My teen chose a competitive activity. I won and they got angry.",
                  "uuid": "ceb3c798-e806-42eb-92f6-6b10c36e4ac3"
                },
                {
                  "exit_uuid": "c20fa22a-a4e2-4970-a9c0-5eb6c1a6404c",
                  "name": "I struggled to end One-on-One Time",
                  "uuid": "2d3146c0-b97b-4abb-9bf0-cf0346f74b1b"
                },
                {
                  "exit_uuid": "20050f41-52b5-41e7-9ab7-ecd194bc45dd",
                  "name": "All my children want One-on-One Time at the same time",
                  "uuid": "1d90f472-3860-4944-837f-39eace5a3ff3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "21b3208c-3333-4fbf-81af-888b6b5c9498",
                "destination_uuid": null
              },
              {
                "uuid": "1f04ca26-2b0e-418f-b72e-6897fbd5f71e",
                "destination_uuid": "b37d576a-a9fa-4655-b751-f2460df6866e"
              },
              {
                "uuid": "6c349414-7154-4e4b-81d7-01e5d3137f69",
                "destination_uuid": "b3030307-9e3b-4aa0-82d6-80159125747d"
              },
              {
                "uuid": "c59818df-04ef-4b91-b2d0-033232918a7e",
                "destination_uuid": "a0ef3c1a-1a6a-4d7e-8607-6ecc9e601016"
              },
              {
                "uuid": "70b49763-b05e-48e5-9149-85e3f4248bf7",
                "destination_uuid": "48b81d9b-594d-40a1-afcb-8f7c82f34213"
              },
              {
                "uuid": "8cd63c43-05e4-4fb7-8cd3-fd7fcd629167",
                "destination_uuid": "88ca507b-ccb4-472b-8f3a-8606124e2312"
              },
              {
                "uuid": "3d855cef-4afc-4ead-8305-2b1eb29c0c32",
                "destination_uuid": "bbcaa5c7-77d9-4fdc-a219-ab636a341b58"
              },
              {
                "uuid": "c20fa22a-a4e2-4970-a9c0-5eb6c1a6404c",
                "destination_uuid": "35f0b950-a3b7-412f-8419-052f3a82b04c"
              },
              {
                "uuid": "20050f41-52b5-41e7-9ab7-ecd194bc45dd",
                "destination_uuid": "7ff0ebf9-c4b2-415f-8726-40d39e2ffe46"
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "54b61e4d-54e8-48ac-bd59-6c860c5770c0",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "df8c5e9f-aa0f-4b58-9d8a-df59e4716416",
            "actions": [
              {
                "attachments": [],
                "text": "Hi! Thank you for being so committed to improving the life of your children. It shows you really care!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b60634c5-61e2-40a4-8c9e-68a4a7ce5472"
              }
            ],
            "exits": [
              {
                "uuid": "7e13eb0b-54d2-4bf5-aec3-efbfef75422d",
                "destination_uuid": "acd27bca-86c8-4bca-85cf-917720a6da07"
              }
            ]
          },
          {
            "uuid": "acd27bca-86c8-4bca-85cf-917720a6da07",
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
                "uuid": "2cf6edd0-2536-453b-abea-62c15e7f65f9"
              }
            ],
            "exits": [
              {
                "uuid": "af31c915-0764-4b26-9411-1992a2212ba1",
                "destination_uuid": "f3dcc3f9-277c-4480-949f-a57af5eb038c"
              }
            ]
          },
          {
            "uuid": "f3dcc3f9-277c-4480-949f-a57af5eb038c",
            "actions": [],
            "exits": [
              {
                "uuid": "52deb72c-f141-4e43-854e-a640cb1da4d6",
                "destination_uuid": "31167054-9609-428c-9b16-385e21ad3b24"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "2af20db6-c801-404d-8dab-de07f0288f6a",
              "cases": [],
              "categories": [
                {
                  "uuid": "2af20db6-c801-404d-8dab-de07f0288f6a",
                  "name": "All Responses",
                  "exit_uuid": "52deb72c-f141-4e43-854e-a640cb1da4d6"
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
            "uuid": "31167054-9609-428c-9b16-385e21ad3b24",
            "actions": [
              {
                "uuid": "44cf6c91-1f21-4c74-9584-5ee0fe66f8b2",
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
                "uuid": "15fd5441-ea63-4573-aa6f-09b8dd2a010a",
                "destination_uuid": "287fdad5-2b75-4653-b9a3-7fe366ca81f3"
              }
            ]
          },
          {
            "uuid": "287fdad5-2b75-4653-b9a3-7fe366ca81f3",
            "actions": [
              {
                "attachments": [],
                "text": "We all appreciate it when the good things we do are recognised by others, especially \nwhen it is someone who is close to us. ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "db82df43-402a-40fb-bb0b-8ee46909bc87"
              }
            ],
            "exits": [
              {
                "uuid": "eabb24ff-950a-4f7b-ba65-77e10af15f05",
                "destination_uuid": "0f5abae8-ee00-4b61-bd86-f5b05049b270"
              }
            ]
          },
          {
            "uuid": "0f5abae8-ee00-4b61-bd86-f5b05049b270",
            "actions": [
              {
                "attachments": [],
                "text": "Oh, look, it’s our neighbour @fields.neighbour.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5f406b25-b445-4de9-a0cc-819e5d9beb9d"
              }
            ],
            "exits": [
              {
                "uuid": "0f95e795-42fc-487e-91c0-f9f16db60780",
                "destination_uuid": "1cbcb798-be0b-47be-9638-1a4f1c254130"
              }
            ]
          },
          {
            "uuid": "1cbcb798-be0b-47be-9638-1a4f1c254130",
            "actions": [
              {
                "attachments": [],
                "text": "Hi @fields.guide, good to see you! https://plh-demo1.idems.international/chat/msg-info?character=Neighbour",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "52b6eb8f-e41f-4e33-b4ea-92335ec86010"
              }
            ],
            "exits": [
              {
                "uuid": "87feac92-6237-4b04-8574-0ae2a2d4fe9d",
                "destination_uuid": "9f15161e-1682-4e23-ae6c-5e36ec802347"
              }
            ]
          },
          {
            "uuid": "9f15161e-1682-4e23-ae6c-5e36ec802347",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes I struggle with my teens. But the other day, they surprised me: They were actually helping each other! Let me tell you:",
                "type": "send_msg",
                "quick_replies": [
                  "Let me hear your story"
                ],
                "uuid": "5f6b9efc-2bcd-41e2-90ff-e41dbcd4039b"
              }
            ],
            "exits": [
              {
                "uuid": "bb51f559-80cb-466f-92fe-e7b1defd1533",
                "destination_uuid": "356d591e-805c-4088-b2de-e1f25339596e"
              }
            ]
          },
          {
            "uuid": "356d591e-805c-4088-b2de-e1f25339596e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "3aee6bde-84e5-495e-8741-8b949548b1c2",
              "cases": [
                {
                  "arguments": [
                    "Let me hear your story"
                  ],
                  "category_uuid": "3a2d0ef5-ec2e-4fe3-96ce-45bf36f90d4e",
                  "type": "has_only_phrase",
                  "uuid": "7c2cb954-d3d4-4997-a8bb-53b23068cd3e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "12700e7c-072f-4fa8-a962-52b9ef581366",
                  "name": "All Responses",
                  "uuid": "3aee6bde-84e5-495e-8741-8b949548b1c2"
                },
                {
                  "exit_uuid": "e38dc1b2-9de9-4921-8565-ffca7b8a96cf",
                  "name": "Let me hear your story",
                  "uuid": "3a2d0ef5-ec2e-4fe3-96ce-45bf36f90d4e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "12700e7c-072f-4fa8-a962-52b9ef581366",
                "destination_uuid": null
              },
              {
                "uuid": "e38dc1b2-9de9-4921-8565-ffca7b8a96cf",
                "destination_uuid": "60748932-1d26-47c7-9ccd-c1740a2d64d5"
              }
            ]
          },
          {
            "uuid": "60748932-1d26-47c7-9ccd-c1740a2d64d5",
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
                "uuid": "a8bb623a-bda1-43a9-bb63-246ed3f70378"
              }
            ],
            "exits": [
              {
                "uuid": "646f2554-6f38-40f3-9882-c969a166f686",
                "destination_uuid": "edb382ab-f87d-43ca-a17a-6869dead3e54"
              }
            ]
          },
          {
            "uuid": "edb382ab-f87d-43ca-a17a-6869dead3e54",
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
                "uuid": "6a19849e-71f3-4383-a41c-489bf1777e98"
              }
            ],
            "exits": [
              {
                "uuid": "5ec6649c-3e07-45da-b612-1db87e02f6a8",
                "destination_uuid": "fbdd4e29-615e-4fe6-9c1f-6c8bcfb3594c"
              }
            ]
          },
          {
            "uuid": "fbdd4e29-615e-4fe6-9c1f-6c8bcfb3594c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ce73e920-e1c3-4cc7-b844-ed21b55a8165",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "6e464ec3-7709-4c0f-a898-8d1a8d2b3470",
                  "type": "has_only_phrase",
                  "uuid": "1bb8bc28-62f2-4323-8257-f2ce947aea56"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "ebc08d47-2111-409f-b9f4-ded8a6bf0900",
                  "type": "has_only_phrase",
                  "uuid": "c30c7335-f5ed-4d80-9b79-6a097bd791f4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7ca91dd6-9714-4a0e-b4fc-3ee57494b083",
                  "name": "All Responses",
                  "uuid": "ce73e920-e1c3-4cc7-b844-ed21b55a8165"
                },
                {
                  "exit_uuid": "fe7b3103-a517-4734-8302-bbb7d7eb11b9",
                  "name": "Previous",
                  "uuid": "6e464ec3-7709-4c0f-a898-8d1a8d2b3470"
                },
                {
                  "exit_uuid": "5ea9a662-4507-4d04-b80b-644e648502e5",
                  "name": "Next",
                  "uuid": "ebc08d47-2111-409f-b9f4-ded8a6bf0900"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7ca91dd6-9714-4a0e-b4fc-3ee57494b083",
                "destination_uuid": null
              },
              {
                "uuid": "fe7b3103-a517-4734-8302-bbb7d7eb11b9",
                "destination_uuid": "60748932-1d26-47c7-9ccd-c1740a2d64d5"
              },
              {
                "uuid": "5ea9a662-4507-4d04-b80b-644e648502e5",
                "destination_uuid": "f2ab54eb-4a9c-49e8-8c5e-0822239aec68"
              }
            ]
          },
          {
            "uuid": "f2ab54eb-4a9c-49e8-8c5e-0822239aec68",
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
                "uuid": "e3ca576f-b605-4a6b-a563-45fd214ff731"
              }
            ],
            "exits": [
              {
                "uuid": "62e61db2-a36c-409b-88fb-d09c0c018b6f",
                "destination_uuid": "ae89ac98-24bc-407f-99ec-cc345e7eb66a"
              }
            ]
          },
          {
            "uuid": "ae89ac98-24bc-407f-99ec-cc345e7eb66a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2a16d0e5-2605-48c5-b979-fc6465953ce5",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "8a04c2a9-ab25-499b-8faa-e609842e71ce",
                  "type": "has_only_phrase",
                  "uuid": "9e3b4697-5dd3-4c98-b651-c1dbd93b36ac"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "14d13b5c-2894-4db6-9270-4d876a97889e",
                  "type": "has_only_phrase",
                  "uuid": "f5a8edc1-940c-43e4-8376-82c45ae6590a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "eb843432-6931-4328-a0e1-11b860db2542",
                  "name": "All Responses",
                  "uuid": "2a16d0e5-2605-48c5-b979-fc6465953ce5"
                },
                {
                  "exit_uuid": "cd9333f8-d2b3-4053-b284-f5a738015e74",
                  "name": "Previous",
                  "uuid": "8a04c2a9-ab25-499b-8faa-e609842e71ce"
                },
                {
                  "exit_uuid": "b4d7f678-4a70-4779-bef3-3264e1722708",
                  "name": "Next",
                  "uuid": "14d13b5c-2894-4db6-9270-4d876a97889e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "eb843432-6931-4328-a0e1-11b860db2542",
                "destination_uuid": null
              },
              {
                "uuid": "cd9333f8-d2b3-4053-b284-f5a738015e74",
                "destination_uuid": "edb382ab-f87d-43ca-a17a-6869dead3e54"
              },
              {
                "uuid": "b4d7f678-4a70-4779-bef3-3264e1722708",
                "destination_uuid": "ba11c218-557d-4c99-a4ef-17f9eabc5f9a"
              }
            ]
          },
          {
            "uuid": "ba11c218-557d-4c99-a4ef-17f9eabc5f9a",
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
                "uuid": "36feb812-11fe-449c-9c97-df06b1529690"
              }
            ],
            "exits": [
              {
                "uuid": "6efec7a9-f437-4537-aea5-bf4b4e0ff698",
                "destination_uuid": "87d265c0-8320-4c35-ba97-43009f134128"
              }
            ]
          },
          {
            "uuid": "87d265c0-8320-4c35-ba97-43009f134128",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "99bbe2fd-684a-437d-b7b3-15afd2a9871d",
              "cases": [
                {
                  "arguments": [
                    "Previous"
                  ],
                  "category_uuid": "2e01ed7e-7c1f-48ea-85c2-d54b6c5678cd",
                  "type": "has_only_phrase",
                  "uuid": "cb60ebbe-c9c0-4b82-bac7-4411e9167f64"
                },
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "51d1161c-bc3c-48c5-8753-bac463b96cff",
                  "type": "has_only_phrase",
                  "uuid": "6013828c-58d1-4172-8627-dd5270ba080c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ca26795b-3a22-47a0-a2e4-9f5791c6f245",
                  "name": "All Responses",
                  "uuid": "99bbe2fd-684a-437d-b7b3-15afd2a9871d"
                },
                {
                  "exit_uuid": "679f1966-eb32-48b0-9ee8-9abe83f9c615",
                  "name": "Previous",
                  "uuid": "2e01ed7e-7c1f-48ea-85c2-d54b6c5678cd"
                },
                {
                  "exit_uuid": "5f360ed2-b913-42e8-a5fe-030ca16838b0",
                  "name": "Next",
                  "uuid": "51d1161c-bc3c-48c5-8753-bac463b96cff"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ca26795b-3a22-47a0-a2e4-9f5791c6f245",
                "destination_uuid": null
              },
              {
                "uuid": "679f1966-eb32-48b0-9ee8-9abe83f9c615",
                "destination_uuid": "f2ab54eb-4a9c-49e8-8c5e-0822239aec68"
              },
              {
                "uuid": "5f360ed2-b913-42e8-a5fe-030ca16838b0",
                "destination_uuid": "49e08aed-5e7e-461f-ba20-8a08c2aa750e"
              }
            ]
          },
          {
            "uuid": "49e08aed-5e7e-461f-ba20-8a08c2aa750e",
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
                "uuid": "27e66e40-3d39-41ac-923d-d46f01ca7cc5"
              }
            ],
            "exits": [
              {
                "uuid": "365d9304-4a55-440a-85d5-a48084b8cb92",
                "destination_uuid": "294c2aaf-bcd1-477b-b84e-67d97b3c0d07"
              }
            ]
          },
          {
            "uuid": "294c2aaf-bcd1-477b-b84e-67d97b3c0d07",
            "actions": [],
            "exits": [
              {
                "uuid": "3d3323ab-d587-4aa2-abde-ba5e81cbe2e4",
                "destination_uuid": "295329f0-2357-4d6d-ac86-b0c86058767f"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "cb3700bc-2baa-4228-b080-c47dd58836fb",
              "cases": [],
              "categories": [
                {
                  "uuid": "cb3700bc-2baa-4228-b080-c47dd58836fb",
                  "name": "All Responses",
                  "exit_uuid": "3d3323ab-d587-4aa2-abde-ba5e81cbe2e4"
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
            "uuid": "295329f0-2357-4d6d-ac86-b0c86058767f",
            "actions": [
              {
                "uuid": "826f011f-b4a5-497c-9706-0936fea6565a",
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
                "uuid": "95555c2c-f4fd-40eb-8c82-d7b2ffb1fc64",
                "destination_uuid": "c4bca716-a6ae-4d5b-901c-fddb7674c6f3"
              }
            ]
          },
          {
            "uuid": "c4bca716-a6ae-4d5b-901c-fddb7674c6f3",
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
                "uuid": "d74ca614-e084-448a-be7c-2a9c9d350a94"
              }
            ],
            "exits": [
              {
                "uuid": "9b36918f-b564-4ffb-974a-60b5b7ace228",
                "destination_uuid": "f2923415-4b0e-4c4b-86c1-6edde5c39b18"
              }
            ]
          },
          {
            "uuid": "f2923415-4b0e-4c4b-86c1-6edde5c39b18",
            "actions": [],
            "exits": [
              {
                "uuid": "2293d002-2cbf-4778-8f81-b36b6e88d210",
                "destination_uuid": "a81aeade-3ce9-4c52-b862-ae416f1ad48c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "06af1355-4eb3-48b6-b1e5-c486135ebee1",
              "cases": [],
              "categories": [
                {
                  "uuid": "06af1355-4eb3-48b6-b1e5-c486135ebee1",
                  "name": "All Responses",
                  "exit_uuid": "2293d002-2cbf-4778-8f81-b36b6e88d210"
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
            "uuid": "a81aeade-3ce9-4c52-b862-ae416f1ad48c",
            "actions": [
              {
                "uuid": "93a208b0-67f3-4b99-98fb-349cfe469f19",
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
                "uuid": "b31867eb-64cf-4293-b4ea-0236262bc168",
                "destination_uuid": "391604c0-0aee-4f34-b2e9-1d6d884cbd74"
              }
            ]
          },
          {
            "uuid": "391604c0-0aee-4f34-b2e9-1d6d884cbd74",
            "actions": [
              {
                "attachments": [],
                "text": "All of those things are true! When my daughters feel happy, I feel happy. And I got my work done. The same can work for you!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f06c291d-9c07-4d90-90d3-6ea99bc970ed"
              }
            ],
            "exits": [
              {
                "uuid": "319b5d15-5b79-4b82-90a1-7108ac00eb99",
                "destination_uuid": "514e18ff-13ae-4e1a-9a3f-18c84cd21521"
              }
            ]
          },
          {
            "uuid": "514e18ff-13ae-4e1a-9a3f-18c84cd21521",
            "actions": [
              {
                "attachments": [],
                "text": "Let me break it down for you in 3 easy steps! \n",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Tips",
                  "Take me to Homescreen"
                ],
                "uuid": "0036c69e-5608-4a85-92cb-ed2db8a4e5a3"
              }
            ],
            "exits": [
              {
                "uuid": "23f09bf8-6cca-4b6c-b35b-5350c454eec4",
                "destination_uuid": "3bee8693-e095-4da2-9163-39cead174b06"
              }
            ]
          },
          {
            "uuid": "3bee8693-e095-4da2-9163-39cead174b06",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c041a815-1c81-40d6-9959-e8d89cdc4d0c",
              "cases": [
                {
                  "arguments": [
                    "Take me to Tips"
                  ],
                  "category_uuid": "0dac2654-ecea-4778-8903-8ea05af87806",
                  "type": "has_only_phrase",
                  "uuid": "0be7f59d-ab30-460b-b4a6-81e183f9cc88"
                },
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "5be89223-d212-4762-a1e3-5b2e146c993a",
                  "type": "has_only_phrase",
                  "uuid": "c0c902ef-2435-4565-b159-66be3a782cfd"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "226422cf-50b0-4f29-851b-e140d584aa6e",
                  "name": "All Responses",
                  "uuid": "c041a815-1c81-40d6-9959-e8d89cdc4d0c"
                },
                {
                  "exit_uuid": "a654c87b-c04b-49de-8946-6ad804315562",
                  "name": "Take me to Tips",
                  "uuid": "0dac2654-ecea-4778-8903-8ea05af87806"
                },
                {
                  "exit_uuid": "7e01f7f0-3b53-46f9-8456-3ab501cd8973",
                  "name": "Take me to Homescreen",
                  "uuid": "5be89223-d212-4762-a1e3-5b2e146c993a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "226422cf-50b0-4f29-851b-e140d584aa6e",
                "destination_uuid": null
              },
              {
                "uuid": "a654c87b-c04b-49de-8946-6ad804315562",
                "destination_uuid": "e40a7041-1c0c-4a3c-b0a5-58ce9e4e1925"
              },
              {
                "uuid": "7e01f7f0-3b53-46f9-8456-3ab501cd8973",
                "destination_uuid": "fad2d002-6564-4be3-ae5f-63af91f4a5f9"
              }
            ]
          },
          {
            "uuid": "e40a7041-1c0c-4a3c-b0a5-58ce9e4e1925",
            "actions": [
              {
                "uuid": "02a3c965-f2ae-4a01-b90c-2a6badbfc4e7",
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
                "uuid": "4785a09f-54ba-4c6c-bae8-65d6c3867251",
                "destination_uuid": "618cb5d7-b55b-4b48-9433-f62c223c755b"
              }
            ]
          },
          {
            "uuid": "618cb5d7-b55b-4b48-9433-f62c223c755b",
            "actions": [
              {
                "flow": {
                  "name": "toolbox_mod_praise_tips",
                  "uuid": "09d7e67d-3346-4fba-b39e-3021219228e0"
                },
                "type": "enter_flow",
                "uuid": "31ff4146-1015-4eed-8c98-cd022021e8b7"
              }
            ],
            "exits": [
              {
                "uuid": "eca7c3f0-6b9a-42e0-9c04-5779966fbc9b",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "fad2d002-6564-4be3-ae5f-63af91f4a5f9",
            "actions": [
              {
                "uuid": "b5e8e4ac-e7ce-4fc0-a703-5ac0023ee2d2",
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
                "uuid": "66ac9589-d232-4211-9a9a-f2999d5dc1d6",
                "destination_uuid": "d527f0d0-4f01-4650-a145-24f69b309823"
              }
            ]
          },
          {
            "uuid": "d527f0d0-4f01-4650-a145-24f69b309823",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "4a2b0408-3feb-4fc6-8eee-088b96b8928e"
                },
                "type": "enter_flow",
                "uuid": "388be307-ec0b-4d8a-a73a-8a5955730f19"
              }
            ],
            "exits": [
              {
                "uuid": "f5ea3418-09f6-41b2-908b-10349c4b4844",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "78977d17-b83c-4624-aee9-d8b225c8002b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9e72105a-97d9-4981-a89d-274fad361253",
            "actions": [
              {
                "attachments": [],
                "text": "Continue spending one-on-one time with your teen. Try to praise your teen at least once when spending time together and notice how they respond!  https://plh-demo1.idems.international/chat/msg-info?character=Guide",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2ca44dd6-11b2-4e29-aa96-4bf1f7b6988c"
              }
            ],
            "exits": [
              {
                "uuid": "3073425a-964a-4ffc-974c-78c34ab44b84",
                "destination_uuid": "e88cea2d-7fd7-44ab-a50a-dbe34ee9e31a"
              }
            ]
          },
          {
            "uuid": "e88cea2d-7fd7-44ab-a50a-dbe34ee9e31a",
            "actions": [
              {
                "attachments": [],
                "text": "Let's practice praising! Would you like to do this with your teen now?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "Later"
                ],
                "uuid": "ac534e6c-9681-430d-84f1-80929c380d87"
              }
            ],
            "exits": [
              {
                "uuid": "a0465016-1690-46ec-b382-b2d08dc8bce3",
                "destination_uuid": "2bd2a673-9775-4656-992f-a771020d6bc0"
              }
            ]
          },
          {
            "uuid": "2bd2a673-9775-4656-992f-a771020d6bc0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "215c9790-e5a6-4b17-8ebc-3d83748f6463",
              "cases": [
                {
                  "arguments": [
                    "Later"
                  ],
                  "category_uuid": "727251f0-e9bf-489d-ba70-9109dd2c920d",
                  "type": "has_only_phrase",
                  "uuid": "90ccb4ef-cc56-46b8-a17b-5683bed88c40"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "71779e66-14d2-48ca-bfef-bc9d54c2a9b3",
                  "type": "has_only_phrase",
                  "uuid": "6ecfb6db-844a-453e-b1f5-a4bd51aba883"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "219c4d5e-8160-43f7-8f68-c520ecd58531",
                  "name": "All Responses",
                  "uuid": "215c9790-e5a6-4b17-8ebc-3d83748f6463"
                },
                {
                  "exit_uuid": "a51038e1-d4ec-453f-874a-7c131d73c8cb",
                  "name": "Later",
                  "uuid": "727251f0-e9bf-489d-ba70-9109dd2c920d"
                },
                {
                  "exit_uuid": "4b1e221d-d585-4f06-a8af-2e141c234fc0",
                  "name": "Yes",
                  "uuid": "71779e66-14d2-48ca-bfef-bc9d54c2a9b3"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "219c4d5e-8160-43f7-8f68-c520ecd58531",
                "destination_uuid": null
              },
              {
                "uuid": "a51038e1-d4ec-453f-874a-7c131d73c8cb",
                "destination_uuid": "c69cdf97-970c-4d12-b87b-652894bacb8c"
              },
              {
                "uuid": "4b1e221d-d585-4f06-a8af-2e141c234fc0",
                "destination_uuid": "4b378d78-43b8-4c36-9dde-f175ad009944"
              }
            ]
          },
          {
            "uuid": "c69cdf97-970c-4d12-b87b-652894bacb8c",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "6ac28eab-b312-4574-89b1-606ba888dcdc"
                },
                "type": "enter_flow",
                "uuid": "8ab5c5a8-e965-4765-9967-a04263e017e3"
              }
            ],
            "exits": [
              {
                "uuid": "6a2da935-e829-460b-a1c7-116baa1ec0e6",
                "destination_uuid": null
              },
              {
                "uuid": "52c696b9-5ba8-4283-ac3b-29006f592bb7",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "648dd59d-5b2f-4e07-a390-fec8b443bf5f",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0b8ab5c2-051d-4970-9153-9c993b69d834"
                },
                {
                  "uuid": "f7041046-f3d7-4ef3-b1a8-99bc721b5958",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "8a4a4733-1bc2-4e38-9f23-53ad0949b8eb"
                }
              ],
              "categories": [
                {
                  "uuid": "0b8ab5c2-051d-4970-9153-9c993b69d834",
                  "name": "Complete",
                  "exit_uuid": "6a2da935-e829-460b-a1c7-116baa1ec0e6"
                },
                {
                  "uuid": "8a4a4733-1bc2-4e38-9f23-53ad0949b8eb",
                  "name": "Expired",
                  "exit_uuid": "52c696b9-5ba8-4283-ac3b-29006f592bb7"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0b8ab5c2-051d-4970-9153-9c993b69d834"
            }
          },
          {
            "uuid": "4b378d78-43b8-4c36-9dde-f175ad009944",
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
                "uuid": "d8ce2f58-5844-41f5-a8cd-bf9f9907b322"
              }
            ],
            "exits": [
              {
                "uuid": "4cabe646-45cc-47c6-a8c5-242f63b17b3d",
                "destination_uuid": "c23d5501-3c22-4fb2-9d7e-76609251386b"
              }
            ]
          },
          {
            "uuid": "c23d5501-3c22-4fb2-9d7e-76609251386b",
            "actions": [],
            "exits": [
              {
                "uuid": "7bcf1799-3017-4802-bd4a-35704328e24f",
                "destination_uuid": "68790e64-83df-45c0-b122-80dc9e46d76c"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "649b799b-65a4-490e-a5c1-e5bb1a34f245",
              "cases": [],
              "categories": [
                {
                  "uuid": "649b799b-65a4-490e-a5c1-e5bb1a34f245",
                  "name": "All Responses",
                  "exit_uuid": "7bcf1799-3017-4802-bd4a-35704328e24f"
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
            "uuid": "68790e64-83df-45c0-b122-80dc9e46d76c",
            "actions": [
              {
                "uuid": "10c74d73-a378-4d26-8654-144fc26ac99d",
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
                "uuid": "682ef79a-7bcd-4a7a-a3c7-37ed23b6962c",
                "destination_uuid": "f4821ec1-c8ae-47a9-b56a-2682747d92cb"
              }
            ]
          },
          {
            "uuid": "f4821ec1-c8ae-47a9-b56a-2682747d92cb",
            "actions": [
              {
                "attachments": [],
                "text": "Great! Go for it parent! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "9c2fbe78-8c2e-4412-b3a5-9eaa1ea91f02"
              }
            ],
            "exits": [
              {
                "uuid": "a2fa9d4c-c2a4-4cfe-aaa3-76543c527594",
                "destination_uuid": "27de086e-d48a-430a-8126-ff6265834460"
              }
            ]
          },
          {
            "uuid": "27de086e-d48a-430a-8126-ff6265834460",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9379bb9e-64ba-4db8-a861-65d2c7169264",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "b4833f0e-0fb3-4064-b90b-dc11a66dbbc9",
                  "type": "has_only_phrase",
                  "uuid": "46953bb7-eac5-4f1e-afe5-0b789302a2d2"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ee08a411-b375-4548-88d7-26d45eb12d47",
                  "name": "All Responses",
                  "uuid": "9379bb9e-64ba-4db8-a861-65d2c7169264"
                },
                {
                  "exit_uuid": "81055d7c-2f07-4c1a-98a7-74fdd5bde3cd",
                  "name": "Click here when done",
                  "uuid": "b4833f0e-0fb3-4064-b90b-dc11a66dbbc9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ee08a411-b375-4548-88d7-26d45eb12d47",
                "destination_uuid": null
              },
              {
                "uuid": "81055d7c-2f07-4c1a-98a7-74fdd5bde3cd",
                "destination_uuid": "afaeace5-ba0b-4e62-8a94-d5cd4d4615f3"
              }
            ]
          },
          {
            "uuid": "afaeace5-ba0b-4e62-8a94-d5cd4d4615f3",
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
                "uuid": "83f323d3-8fd4-451a-83bf-43edb276250a"
              }
            ],
            "exits": [
              {
                "uuid": "dfa972ff-fdd6-4128-843a-ee8303fd0f06",
                "destination_uuid": "d02fa1f4-b4aa-484a-bb52-9cd0adecfd44"
              }
            ]
          },
          {
            "uuid": "d02fa1f4-b4aa-484a-bb52-9cd0adecfd44",
            "actions": [],
            "exits": [
              {
                "uuid": "b2148932-ef26-4d3e-abcf-823c5bf855c7",
                "destination_uuid": "9a3750ec-6d06-4e86-ada3-45b3ce0064a1"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "298de631-8c2f-469b-ac65-5190403421fb",
              "cases": [],
              "categories": [
                {
                  "uuid": "298de631-8c2f-469b-ac65-5190403421fb",
                  "name": "All Responses",
                  "exit_uuid": "b2148932-ef26-4d3e-abcf-823c5bf855c7"
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
            "uuid": "9a3750ec-6d06-4e86-ada3-45b3ce0064a1",
            "actions": [
              {
                "uuid": "8f5eddb0-6f9b-4d41-bdf7-9910b349c299",
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
                "uuid": "feb21926-f534-4bd3-844e-43a5325339c4",
                "destination_uuid": "c095d49d-3f44-48f5-aac7-d5122505f439"
              }
            ]
          },
          {
            "uuid": "c095d49d-3f44-48f5-aac7-d5122505f439",
            "actions": [
              {
                "attachments": [],
                "text": "Nice! Go for it teen! Remember to praise with enthusiasm!  ",
                "type": "send_msg",
                "quick_replies": [
                  "Click here when done"
                ],
                "uuid": "348242e3-d1a0-4d4d-985a-da9617f0db31"
              }
            ],
            "exits": [
              {
                "uuid": "b78dcf3f-bf0f-4707-9f09-95845f970314",
                "destination_uuid": "f46c238c-9d04-4912-88d7-8a721cd0498d"
              }
            ]
          },
          {
            "uuid": "f46c238c-9d04-4912-88d7-8a721cd0498d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "38b914e4-2f6e-4a53-8a5c-867b7f9b2f8c",
              "cases": [
                {
                  "arguments": [
                    "Click here when done"
                  ],
                  "category_uuid": "00a71ea6-1bea-4e22-84f5-1d7033567364",
                  "type": "has_only_phrase",
                  "uuid": "378bbff7-74ff-453e-a5a1-a4559543f780"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "aa2a0831-892a-496b-beeb-d163e7ea007f",
                  "name": "All Responses",
                  "uuid": "38b914e4-2f6e-4a53-8a5c-867b7f9b2f8c"
                },
                {
                  "exit_uuid": "502bffc4-1ff0-4a37-a6d3-05721102114b",
                  "name": "Click here when done",
                  "uuid": "00a71ea6-1bea-4e22-84f5-1d7033567364"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "aa2a0831-892a-496b-beeb-d163e7ea007f",
                "destination_uuid": null
              },
              {
                "uuid": "502bffc4-1ff0-4a37-a6d3-05721102114b",
                "destination_uuid": "d591d327-034b-473b-8a6a-67c9c5a5c759"
              }
            ]
          },
          {
            "uuid": "d591d327-034b-473b-8a6a-67c9c5a5c759",
            "actions": [
              {
                "attachments": [],
                "text": "Way to go dream team!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5394097b-8499-43b5-aea2-49d786e5e9d8"
              }
            ],
            "exits": [
              {
                "uuid": "7bb1a283-4534-4143-a8ed-d782dd2a4d2c",
                "destination_uuid": "16dbe231-b015-49fd-9b69-286286721053"
              }
            ]
          },
          {
            "uuid": "16dbe231-b015-49fd-9b69-286286721053",
            "actions": [
              {
                "attachments": [],
                "text": "It's also important to praise yourself for things you do well!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "46666e4c-974a-4b06-840a-3d3da9c1712b"
              }
            ],
            "exits": [
              {
                "uuid": "10f0b2d2-5e28-4238-8251-35ceacec3f0d",
                "destination_uuid": "704e382e-931a-4196-8c6c-98994ac88443"
              }
            ]
          },
          {
            "uuid": "704e382e-931a-4196-8c6c-98994ac88443",
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
                "uuid": "4d4ff00b-9028-46a6-b9a9-eb300a75c99a"
              }
            ],
            "exits": [
              {
                "uuid": "85f93a54-1d61-4d0e-ae47-bcce8c64151e",
                "destination_uuid": "78a2b0bc-6dc4-4916-9d08-82ca6c9bc5a3"
              }
            ]
          },
          {
            "uuid": "78a2b0bc-6dc4-4916-9d08-82ca6c9bc5a3",
            "actions": [],
            "exits": [
              {
                "uuid": "48f9210c-d9dd-4897-85e9-c8f900ef6002",
                "destination_uuid": "70d26ca1-73c9-4ca9-9a62-4840e410c6e4"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c441e47a-f33d-45d3-a874-a6fda5a97874",
              "cases": [],
              "categories": [
                {
                  "uuid": "c441e47a-f33d-45d3-a874-a6fda5a97874",
                  "name": "All Responses",
                  "exit_uuid": "48f9210c-d9dd-4897-85e9-c8f900ef6002"
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
            "uuid": "70d26ca1-73c9-4ca9-9a62-4840e410c6e4",
            "actions": [
              {
                "uuid": "2526c979-9600-4534-aa48-6b6b71602289",
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
                "uuid": "7902eff8-307a-4182-ae34-277952776cb3",
                "destination_uuid": "4bcaaef0-20d4-456a-bc32-3f8553c8d54c"
              }
            ]
          },
          {
            "uuid": "4bcaaef0-20d4-456a-bc32-3f8553c8d54c",
            "actions": [
              {
                "attachments": [],
                "text": "Try to say it out loud: \"Well done for @fields.selfpraise!\". Yesterday evening, I said to myself \"Well done for spending time with my two teens!\". And I praised my partner too! Praising is for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Take me to Homescreen"
                ],
                "uuid": "fffba29d-aff9-4f07-8039-d67a56fa97ba"
              }
            ],
            "exits": [
              {
                "uuid": "77c226f8-4a07-41d0-8061-2ff498cc3ed2",
                "destination_uuid": "3597e53b-2787-45b5-bdef-b16c2125af95"
              }
            ]
          },
          {
            "uuid": "3597e53b-2787-45b5-bdef-b16c2125af95",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fefe2147-6131-47b6-9c95-1d15856b11fc",
              "cases": [
                {
                  "arguments": [
                    "Take me to Homescreen"
                  ],
                  "category_uuid": "f1b01cdc-e6ef-4c66-b44a-e01eb958d183",
                  "type": "has_only_phrase",
                  "uuid": "32cee59c-6ca7-42b0-a69b-f81e8d62f2f1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cdd18b3d-0227-4792-80d0-a153e78694a2",
                  "name": "All Responses",
                  "uuid": "fefe2147-6131-47b6-9c95-1d15856b11fc"
                },
                {
                  "exit_uuid": "2858c166-8bc9-4cbd-90e8-16d30be6c860",
                  "name": "Take me to Homescreen",
                  "uuid": "f1b01cdc-e6ef-4c66-b44a-e01eb958d183"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cdd18b3d-0227-4792-80d0-a153e78694a2",
                "destination_uuid": null
              },
              {
                "uuid": "2858c166-8bc9-4cbd-90e8-16d30be6c860",
                "destination_uuid": "b885437a-1789-4976-8b7b-76f8f90a0299"
              }
            ]
          },
          {
            "uuid": "b885437a-1789-4976-8b7b-76f8f90a0299",
            "actions": [
              {
                "uuid": "d8643480-ce48-4acc-a93d-76a577f398c4",
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
                "uuid": "35a85655-a23f-4961-ad4a-4dba40ee37e6",
                "destination_uuid": "dad06cf4-94e4-4ae2-a656-9b6f783df40b"
              }
            ]
          },
          {
            "uuid": "dad06cf4-94e4-4ae2-a656-9b6f783df40b",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "f8ac612f-18ea-469a-9b6e-43d36449fec1"
                },
                "type": "enter_flow",
                "uuid": "e41d0ddd-b593-4fd2-8eb9-68a2c2a468cd"
              }
            ],
            "exits": [
              {
                "uuid": "d0d169b6-6477-4cdd-a5b4-122abb9a97c0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bdd335a3-6a30-47ba-a77f-cd05d9ce377b",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "86206378-59de-4d0e-8c26-2cc4d9ce28ee",
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
                "uuid": "9132173e-54a3-434b-9c12-6faf304a1522"
              }
            ],
            "exits": [
              {
                "uuid": "7d2e8dfa-a66c-4594-aa5e-b855dfe185aa",
                "destination_uuid": "b85711c3-9f6b-4fac-85b5-ba242b69da9c"
              }
            ]
          },
          {
            "uuid": "b85711c3-9f6b-4fac-85b5-ba242b69da9c",
            "actions": [],
            "exits": [
              {
                "uuid": "33f432b5-ffa2-4b46-8273-7c3915205460",
                "destination_uuid": "745ba105-44ad-49e3-8e4f-8aea9a450881"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ef3aea7a-4669-417f-9841-39e2283c35eb",
              "cases": [],
              "categories": [
                {
                  "uuid": "ef3aea7a-4669-417f-9841-39e2283c35eb",
                  "name": "All Responses",
                  "exit_uuid": "33f432b5-ffa2-4b46-8273-7c3915205460"
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
            "uuid": "745ba105-44ad-49e3-8e4f-8aea9a450881",
            "actions": [
              {
                "uuid": "6a6b0bbb-cf89-4f30-a479-72ac1c9da52b",
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
                "uuid": "56cf7f55-8bf2-4389-b9fa-7ac01d5e6bbc",
                "destination_uuid": "5951553c-5fe0-477c-ba2f-e0b94f477611"
              }
            ]
          },
          {
            "uuid": "5951553c-5fe0-477c-ba2f-e0b94f477611",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d71b784e-29cb-45ef-a2d1-dd1557464580",
              "cases": [
                {
                  "arguments": [
                    "Great"
                  ],
                  "category_uuid": "49a8970c-b040-4459-baef-06120eea261b",
                  "type": "has_only_phrase",
                  "uuid": "eaf39487-5bac-4bc3-96b0-131ba75372a1"
                },
                {
                  "arguments": [
                    "Neutral"
                  ],
                  "category_uuid": "5a250d89-0669-4cb4-8cf3-1e9cc32b8c8f",
                  "type": "has_only_phrase",
                  "uuid": "df5e44af-edae-4e93-83d1-6bee4368684d"
                },
                {
                  "arguments": [
                    "Bad"
                  ],
                  "category_uuid": "5a250d89-0669-4cb4-8cf3-1e9cc32b8c8f",
                  "type": "has_only_phrase",
                  "uuid": "92fbd0ee-b468-4b69-a74c-3eeeda0c6f0b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5b68561e-1302-43af-8cba-96fc66a0f19f",
                  "name": "All Responses",
                  "uuid": "d71b784e-29cb-45ef-a2d1-dd1557464580"
                },
                {
                  "exit_uuid": "c5f60ccf-6687-4c42-bf02-10bfd80789c7",
                  "name": "Great",
                  "uuid": "49a8970c-b040-4459-baef-06120eea261b"
                },
                {
                  "exit_uuid": "e2edeec1-03a6-495e-91ba-51284ac7eecd",
                  "name": "Neutral; Bad",
                  "uuid": "5a250d89-0669-4cb4-8cf3-1e9cc32b8c8f"
                }
              ],
              "operand": "@fields.mod_praise_experience"
            },
            "exits": [
              {
                "uuid": "5b68561e-1302-43af-8cba-96fc66a0f19f",
                "destination_uuid": null
              },
              {
                "uuid": "c5f60ccf-6687-4c42-bf02-10bfd80789c7",
                "destination_uuid": "5100459a-829f-4bf8-a0ba-96cf2633a7d7"
              },
              {
                "uuid": "e2edeec1-03a6-495e-91ba-51284ac7eecd",
                "destination_uuid": "ecfbeb41-0503-490b-9f89-51d9162e5bef"
              }
            ]
          },
          {
            "uuid": "5100459a-829f-4bf8-a0ba-96cf2633a7d7",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear it went well! Well done for spending time with your teen.  ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to Praise check-in"
                ],
                "uuid": "e0a21d9f-3e67-4e11-94bf-bcc530678f17"
              }
            ],
            "exits": [
              {
                "uuid": "25459863-dd6b-421f-bdc7-42fe73fdc624",
                "destination_uuid": "62257eac-c15a-4e71-ad0e-902b4986667b"
              }
            ]
          },
          {
            "uuid": "ecfbeb41-0503-490b-9f89-51d9162e5bef",
            "actions": [
              {
                "attachments": [],
                "text": "Sorry to hear it was difficult for you. Well done for trying! ",
                "type": "send_msg",
                "quick_replies": [
                  "Go to One-on-One Time Challenges"
                ],
                "uuid": "2b664fb7-f8d3-4e81-89e5-3f0b7f252ea5"
              }
            ],
            "exits": [
              {
                "uuid": "99d7779d-b365-4c5a-a153-25f27fdf9356",
                "destination_uuid": "af7d4f6c-db30-4b47-8385-5e2647fd5aab"
              }
            ]
          },
          {
            "uuid": "af7d4f6c-db30-4b47-8385-5e2647fd5aab",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "175a1b00-6d23-4db5-9ba6-e57a78a36c12",
              "cases": [
                {
                  "arguments": [
                    "Go to One-on-One Time Challenges"
                  ],
                  "category_uuid": "cc757475-cd21-4f25-bf84-9e19986a39e9",
                  "type": "has_only_phrase",
                  "uuid": "88257dcc-d404-40d6-b0a8-f33c43d186e3"
                },
                {
                  "arguments": [
                    "Continue"
                  ],
                  "category_uuid": "858eb5ce-c04b-49c2-bfa3-9b9e1956c47f",
                  "type": "has_only_phrase",
                  "uuid": "f096825e-dd42-4966-9d14-568235f19c17"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3c14de79-f83b-488d-b0b7-96da13d67986",
                  "name": "All Responses",
                  "uuid": "175a1b00-6d23-4db5-9ba6-e57a78a36c12"
                },
                {
                  "exit_uuid": "3aa2cc39-2e3e-4abd-bd0b-42f2143b9414",
                  "name": "Go to One-on-One Time Challenges",
                  "uuid": "cc757475-cd21-4f25-bf84-9e19986a39e9"
                },
                {
                  "exit_uuid": "61971068-f152-4ab5-9b8f-e502e8052a51",
                  "name": "Continue",
                  "uuid": "858eb5ce-c04b-49c2-bfa3-9b9e1956c47f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3c14de79-f83b-488d-b0b7-96da13d67986",
                "destination_uuid": null
              },
              {
                "uuid": "3aa2cc39-2e3e-4abd-bd0b-42f2143b9414",
                "destination_uuid": "71aa975d-2134-4ab9-aeee-43b10a1f60a2"
              },
              {
                "uuid": "61971068-f152-4ab5-9b8f-e502e8052a51",
                "destination_uuid": "77c0a833-bb9b-4cc1-9486-c54b99fd5c1e"
              }
            ]
          },
          {
            "uuid": "71aa975d-2134-4ab9-aeee-43b10a1f60a2",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_challenges",
                  "uuid": "3ad31b59-884b-46c5-97a9-b45231675c25"
                },
                "type": "enter_flow",
                "uuid": "def2e873-1880-4c2f-b1e4-3675dffc4118"
              }
            ],
            "exits": [
              {
                "uuid": "fecead28-168d-4111-a055-00009c88707c",
                "destination_uuid": "27d573ba-6121-47ec-b769-7e5aaf760ddc"
              },
              {
                "uuid": "1534bb4d-ab07-4e91-8d2f-40c2438df5e9",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "9743b787-2d06-415f-8406-6d8d50022974",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a4c1082d-4558-4ae5-8097-b64c6b9912cb"
                },
                {
                  "uuid": "0caa5419-9845-41a7-aaa9-b4fcd81d20bc",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "482992ff-6d2b-4fc4-8ac6-be43b07042cc"
                }
              ],
              "categories": [
                {
                  "uuid": "a4c1082d-4558-4ae5-8097-b64c6b9912cb",
                  "name": "Complete",
                  "exit_uuid": "fecead28-168d-4111-a055-00009c88707c"
                },
                {
                  "uuid": "482992ff-6d2b-4fc4-8ac6-be43b07042cc",
                  "name": "Expired",
                  "exit_uuid": "1534bb4d-ab07-4e91-8d2f-40c2438df5e9"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a4c1082d-4558-4ae5-8097-b64c6b9912cb"
            }
          },
          {
            "uuid": "62257eac-c15a-4e71-ad0e-902b4986667b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4a7ed0bc-8b8d-40df-96a6-a32ad1fa3e1e",
              "cases": [
                {
                  "arguments": [
                    "Go to Praise check-in"
                  ],
                  "category_uuid": "52140c48-7860-4653-95ea-53948d56d084",
                  "type": "has_only_phrase",
                  "uuid": "2afb5c01-9aeb-4388-a636-7c35656b6bd6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2f39e49a-5eb0-4f96-8c09-1e5a3a133955",
                  "name": "All Responses",
                  "uuid": "4a7ed0bc-8b8d-40df-96a6-a32ad1fa3e1e"
                },
                {
                  "exit_uuid": "22af92d2-b890-47c4-aa2f-51330cae45a3",
                  "name": "Go to Praise check-in",
                  "uuid": "52140c48-7860-4653-95ea-53948d56d084"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2f39e49a-5eb0-4f96-8c09-1e5a3a133955",
                "destination_uuid": null
              },
              {
                "uuid": "22af92d2-b890-47c4-aa2f-51330cae45a3",
                "destination_uuid": "6714df73-25c0-48fa-898a-185e051e20ca"
              }
            ]
          },
          {
            "uuid": "6714df73-25c0-48fa-898a-185e051e20ca",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "8f8830cf-df35-4b7f-995e-802614aa0f02"
              }
            ],
            "exits": [
              {
                "uuid": "7bd3bc19-c338-4443-b576-194315666f5f",
                "destination_uuid": "d609b429-987b-4714-8098-0fa6cff08f17"
              }
            ]
          },
          {
            "uuid": "77c0a833-bb9b-4cc1-9486-c54b99fd5c1e",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "b7f06607-1067-4b3b-8d44-bbef604b3232"
              }
            ],
            "exits": [
              {
                "uuid": "6cd8d0f7-9fb7-4d89-b116-7beae2b290f3",
                "destination_uuid": "d609b429-987b-4714-8098-0fa6cff08f17"
              }
            ]
          },
          {
            "uuid": "27d573ba-6121-47ec-b769-7e5aaf760ddc",
            "actions": [
              {
                "attachments": [],
                "text": "Did you praise your teen during one-on-one time?",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "c5f5e4f6-693a-499b-b5d7-61aaf30fbd15"
              }
            ],
            "exits": [
              {
                "uuid": "0555e77c-142d-47d0-b648-f84891eacfbc",
                "destination_uuid": "d609b429-987b-4714-8098-0fa6cff08f17"
              }
            ]
          },
          {
            "uuid": "d609b429-987b-4714-8098-0fa6cff08f17",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "28a6f88c-1a8f-4a3b-8795-88734f7adedc",
              "cases": [
                {
                  "arguments": [
                    "No"
                  ],
                  "category_uuid": "ad91331e-fea6-4eec-b22d-daec73747542",
                  "type": "has_only_phrase",
                  "uuid": "75d7c38f-afbe-4ad7-abdb-e2fc7d7f8527"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "03d697ab-d76c-43b5-aebb-890ef605a92c",
                  "type": "has_only_phrase",
                  "uuid": "78bf96c2-3b49-45a5-b510-2d5a63e8f887"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "27088a9f-bba4-4b97-9a14-b56deef3935d",
                  "type": "has_only_phrase",
                  "uuid": "4a085b79-8fa3-46c7-a0d1-72e26db48491"
                },
                {
                  "arguments": [
                    "Yes"
                  ],
                  "category_uuid": "40a3bbce-8431-4a0d-a06b-8c015bac16d7",
                  "type": "has_only_phrase",
                  "uuid": "992a4ed7-ed3c-4c08-8e33-491a0540f7d6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "200570c3-6a6b-4ab5-854a-a194fceda317",
                  "name": "All Responses",
                  "uuid": "28a6f88c-1a8f-4a3b-8795-88734f7adedc"
                },
                {
                  "exit_uuid": "d3ec8708-c092-4324-8347-c8f35d3af8ca",
                  "name": "No",
                  "uuid": "ad91331e-fea6-4eec-b22d-daec73747542"
                },
                {
                  "exit_uuid": "186b87df-7441-4d0b-8bd1-ef73476a5dd1",
                  "name": "Yes",
                  "uuid": "03d697ab-d76c-43b5-aebb-890ef605a92c"
                },
                {
                  "exit_uuid": "75246088-4ef7-44c2-b94b-b8383e3bfe04",
                  "name": "Yes",
                  "uuid": "27088a9f-bba4-4b97-9a14-b56deef3935d"
                },
                {
                  "exit_uuid": "79e70841-4337-4dfe-89cf-488c8e837df8",
                  "name": "Yes",
                  "uuid": "40a3bbce-8431-4a0d-a06b-8c015bac16d7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "200570c3-6a6b-4ab5-854a-a194fceda317",
                "destination_uuid": null
              },
              {
                "uuid": "d3ec8708-c092-4324-8347-c8f35d3af8ca",
                "destination_uuid": "aa46df12-077b-4328-ba2d-4ef5c51c08ca"
              },
              {
                "uuid": "186b87df-7441-4d0b-8bd1-ef73476a5dd1",
                "destination_uuid": "dd9f836c-c451-42fa-89b9-3f8c40038757"
              },
              {
                "uuid": "75246088-4ef7-44c2-b94b-b8383e3bfe04",
                "destination_uuid": "dd9f836c-c451-42fa-89b9-3f8c40038757"
              },
              {
                "uuid": "79e70841-4337-4dfe-89cf-488c8e837df8",
                "destination_uuid": "dd9f836c-c451-42fa-89b9-3f8c40038757"
              }
            ]
          },
          {
            "uuid": "aa46df12-077b-4328-ba2d-4ef5c51c08ca",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard sometime to remember. Next time you spend one-on-one time, try and think of one thing you can praise them for. You can even say “thank you for spending time with me!”.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "cb959184-67d9-48ad-a125-44f5866f9635"
              }
            ],
            "exits": [
              {
                "uuid": "9935ff97-f9dc-472e-a2af-f92d4ca25853",
                "destination_uuid": "8b073a37-2e91-40bf-9b03-edce2dd69f20"
              }
            ]
          },
          {
            "uuid": "dd9f836c-c451-42fa-89b9-3f8c40038757",
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
                "uuid": "40f9ab6e-851e-4407-8d2a-304657ae921a"
              }
            ],
            "exits": [
              {
                "uuid": "2856e2ee-5ded-428b-baa3-306e90457715",
                "destination_uuid": "25b80e95-4fbd-4943-8424-2b476c9f96cf"
              }
            ]
          },
          {
            "uuid": "25b80e95-4fbd-4943-8424-2b476c9f96cf",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "510a4218-72ef-46d7-bbc2-b22d7f9ef16d",
              "cases": [
                {
                  "arguments": [
                    "Surprised"
                  ],
                  "category_uuid": "f6411732-9264-42a7-ac26-1f4aea71c3c3",
                  "type": "has_only_phrase",
                  "uuid": "b600cacc-c77d-44c8-bdf1-819ff60ac94f"
                },
                {
                  "arguments": [
                    "Happy"
                  ],
                  "category_uuid": "cc12c907-8bff-434d-92bc-7c80fb33fdb8",
                  "type": "has_only_phrase",
                  "uuid": "66398f97-f4de-411f-8850-db6a83808a0f"
                },
                {
                  "arguments": [
                    "My teen did not like it"
                  ],
                  "category_uuid": "65cdc40f-9c71-4f3e-9495-07964d39c6a4",
                  "type": "has_only_phrase",
                  "uuid": "75f79db1-e1a1-4bcf-872c-817bf5709b11"
                },
                {
                  "arguments": [
                    "I don’t know"
                  ],
                  "category_uuid": "7f2e5d0b-3e1e-4f86-a8af-bbd06723d926",
                  "type": "has_only_phrase",
                  "uuid": "56ada155-8bf7-4bdd-a0b7-3ffce0897315"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "eb226b13-7c72-4287-82b4-dc20f1326c8e",
                  "name": "All Responses",
                  "uuid": "510a4218-72ef-46d7-bbc2-b22d7f9ef16d"
                },
                {
                  "exit_uuid": "000ae612-fe77-4c61-95e5-227b25d8b462",
                  "name": "Surprised",
                  "uuid": "f6411732-9264-42a7-ac26-1f4aea71c3c3"
                },
                {
                  "exit_uuid": "f40dfcbc-e00c-4a36-8deb-c27d954a5278",
                  "name": "Happy",
                  "uuid": "cc12c907-8bff-434d-92bc-7c80fb33fdb8"
                },
                {
                  "exit_uuid": "c0d788db-f382-41e3-87e6-06b947ab12f5",
                  "name": "My teen did not like it",
                  "uuid": "65cdc40f-9c71-4f3e-9495-07964d39c6a4"
                },
                {
                  "exit_uuid": "70cb3f1a-e2a0-437b-b3bb-0cf0d6edb121",
                  "name": "I don’t know",
                  "uuid": "7f2e5d0b-3e1e-4f86-a8af-bbd06723d926"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "eb226b13-7c72-4287-82b4-dc20f1326c8e",
                "destination_uuid": null
              },
              {
                "uuid": "000ae612-fe77-4c61-95e5-227b25d8b462",
                "destination_uuid": "341bd124-2282-4592-91a4-e967fcbcc76b"
              },
              {
                "uuid": "f40dfcbc-e00c-4a36-8deb-c27d954a5278",
                "destination_uuid": "071649ad-0304-48e3-a07a-164b7c060b0c"
              },
              {
                "uuid": "c0d788db-f382-41e3-87e6-06b947ab12f5",
                "destination_uuid": "ea797d63-5e77-4770-a390-937a30bc6042"
              },
              {
                "uuid": "70cb3f1a-e2a0-437b-b3bb-0cf0d6edb121",
                "destination_uuid": "ac01b137-43f9-4b57-8d29-4ca8d0bb806f"
              }
            ]
          },
          {
            "uuid": "341bd124-2282-4592-91a4-e967fcbcc76b",
            "actions": [
              {
                "attachments": [],
                "text": "Remember, it takes some time for your teen to get used to you praising them. The more time you spend with them, the better it will go!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "e62821bc-db2e-4a23-bcf1-650bfbafe4f4"
              }
            ],
            "exits": [
              {
                "uuid": "aebc4359-bb46-4230-8736-4ad9429e0014",
                "destination_uuid": "d6f3aded-8247-4a52-a012-44a112027e07"
              }
            ]
          },
          {
            "uuid": "071649ad-0304-48e3-a07a-164b7c060b0c",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for noticing how your teen felt, keep it up!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5c381136-bf1c-4c51-a355-eae9103582d1"
              }
            ],
            "exits": [
              {
                "uuid": "b4e4edab-d4af-45b0-b2d9-d744f25cc75f",
                "destination_uuid": "d6f3aded-8247-4a52-a012-44a112027e07"
              }
            ]
          },
          {
            "uuid": "ea797d63-5e77-4770-a390-937a30bc6042",
            "actions": [
              {
                "attachments": [],
                "text": "It happens, just be patient. Make sure to keep spending time with your teen, so they will value your opinion more and more. When your praise is genuine, you will see the benefits soon! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "50e89816-8a95-4a0d-a9a2-a58456a6bd87"
              }
            ],
            "exits": [
              {
                "uuid": "d5fefda1-247c-44eb-a6cc-d2b32888093d",
                "destination_uuid": "d6f3aded-8247-4a52-a012-44a112027e07"
              }
            ]
          },
          {
            "uuid": "ac01b137-43f9-4b57-8d29-4ca8d0bb806f",
            "actions": [
              {
                "attachments": [],
                "text": "No problem, try to notice how they respond next time!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "7f7f09fa-5d72-4ea3-b995-aad6e8b496a1"
              }
            ],
            "exits": [
              {
                "uuid": "4566a52b-1f29-4418-abe7-4e715abaf3eb",
                "destination_uuid": "d6f3aded-8247-4a52-a012-44a112027e07"
              }
            ]
          },
          {
            "uuid": "d6f3aded-8247-4a52-a012-44a112027e07",
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
                "uuid": "10e71197-5d6c-48c4-bc15-88a76fed2738"
              }
            ],
            "exits": [
              {
                "uuid": "02a30e6c-3aaa-47c0-8de4-0848ea8cd1df",
                "destination_uuid": "f4732194-f88e-4572-b84c-0ce92d66557b"
              }
            ]
          },
          {
            "uuid": "f4732194-f88e-4572-b84c-0ce92d66557b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e9bba7c1-d341-4c78-9fdf-8a1712fd1219",
              "cases": [
                {
                  "arguments": [
                    "Every day"
                  ],
                  "category_uuid": "14847c10-8d12-4e14-a03e-22fafeefc8f5",
                  "type": "has_only_phrase",
                  "uuid": "7361eccb-435a-4430-98a4-b1679dd67b48"
                },
                {
                  "arguments": [
                    "Almost every day"
                  ],
                  "category_uuid": "14847c10-8d12-4e14-a03e-22fafeefc8f5",
                  "type": "has_only_phrase",
                  "uuid": "075366ab-fda0-4d61-8383-c09ba33912ae"
                },
                {
                  "arguments": [
                    "A few days"
                  ],
                  "category_uuid": "47fa81df-0c1b-4c58-ad1c-d5fd8ba91de7",
                  "type": "has_only_phrase",
                  "uuid": "bc298674-4a38-447a-a30d-d80ca1b976b2"
                },
                {
                  "arguments": [
                    "Never"
                  ],
                  "category_uuid": "47fa81df-0c1b-4c58-ad1c-d5fd8ba91de7",
                  "type": "has_only_phrase",
                  "uuid": "c0d67814-5aba-4f6f-92c0-ef95a91d2405"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5b106055-5fe8-4631-8c41-65d6820ad504",
                  "name": "All Responses",
                  "uuid": "e9bba7c1-d341-4c78-9fdf-8a1712fd1219"
                },
                {
                  "exit_uuid": "85a700ec-49d3-40c9-bed9-2f03e4a1247a",
                  "name": "Every day; Almost every day",
                  "uuid": "14847c10-8d12-4e14-a03e-22fafeefc8f5"
                },
                {
                  "exit_uuid": "29c41d6d-c972-4783-a2e9-5e4eac49d947",
                  "name": "A few days; Never",
                  "uuid": "47fa81df-0c1b-4c58-ad1c-d5fd8ba91de7"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5b106055-5fe8-4631-8c41-65d6820ad504",
                "destination_uuid": null
              },
              {
                "uuid": "85a700ec-49d3-40c9-bed9-2f03e4a1247a",
                "destination_uuid": "65959451-1290-4723-9530-213f47adbd42"
              },
              {
                "uuid": "29c41d6d-c972-4783-a2e9-5e4eac49d947",
                "destination_uuid": "9f464f65-8303-4ab5-81b7-511640737ea9"
              }
            ]
          },
          {
            "uuid": "65959451-1290-4723-9530-213f47adbd42",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for remembering to praise your teen – it makes a big difference!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c1cdd5e3-b025-4335-8d21-0476556d0f04"
              }
            ],
            "exits": [
              {
                "uuid": "89286e69-8030-4fd5-8807-63696f58fbf3",
                "destination_uuid": "8b073a37-2e91-40bf-9b03-edce2dd69f20"
              }
            ]
          },
          {
            "uuid": "9f464f65-8303-4ab5-81b7-511640737ea9",
            "actions": [
              {
                "attachments": [],
                "text": "It can be hard to remember to praise your teen, especially if they are behaving difficult. Try and think of a time when you can praise them. Remember, praising helps to encourage positive behaviour – you will see them do it more!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ea5bd82b-179b-4be4-b6ca-3a8a3b46ec30"
              }
            ],
            "exits": [
              {
                "uuid": "787071ee-a410-4920-8b2f-e3e76f3bc481",
                "destination_uuid": "8b073a37-2e91-40bf-9b03-edce2dd69f20"
              }
            ]
          },
          {
            "uuid": "8b073a37-2e91-40bf-9b03-edce2dd69f20",
            "actions": [
              {
                "uuid": "f289956a-6545-4f00-bde5-d5b057465fb3",
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
                "uuid": "5f5dc0cf-a34f-493b-87ae-b56e24410714",
                "destination_uuid": "97eda3fc-227b-4747-8355-761542a337d5"
              }
            ]
          },
          {
            "uuid": "97eda3fc-227b-4747-8355-761542a337d5",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "ad0ee9dc-c73b-416e-9834-12965142649c"
                },
                "type": "enter_flow",
                "uuid": "cba69e22-587b-4736-91cf-be774465907c"
              }
            ],
            "exits": [
              {
                "uuid": "6ec8f603-19a3-4b25-86fb-56b5fe5835c4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "9c9cef61-d77b-4cb5-8c27-87e2d17b7b2e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "37b30a6c-ee21-415e-a40d-208ec25090ef",
            "actions": [
              {
                "attachments": [],
                "text": "Sit down, close your eyes and listen to your breath as it goes in and out. Notice how you feel. When you are ready, open your eyes again. \nTry this whenever you are feeling stressed and you need a break to reconnect.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "42606163-f484-4f12-a112-b8f790374c25"
              }
            ],
            "exits": [
              {
                "uuid": "4ed9ba2e-3485-4f85-b203-e80bb22c9d1b",
                "destination_uuid": "e70f4150-88e4-47df-8c89-10d52312cd73"
              }
            ]
          },
          {
            "uuid": "e70f4150-88e4-47df-8c89-10d52312cd73",
            "actions": [
              {
                "uuid": "bb021aa8-4013-439f-a481-4e37e76ad030",
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
                "uuid": "f66ee09b-b3c6-4117-8aea-104cdd62c2bf",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "e913e6fa-10cd-4da0-bf09-e713e6a265b2",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "cc3cf40a-0a1d-402f-ba51-f900565d9b1d",
            "actions": [
              {
                "attachments": [],
                "text": "Let's use the magic power of three stay present and relax. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "3cfeae1d-a99e-4703-b8f1-a34db563b40e"
              }
            ],
            "exits": [
              {
                "uuid": "f54c7767-be11-4f21-b1b1-a4b2b3f258ac",
                "destination_uuid": "3101df7b-ccdc-4aab-a4e2-b75f6e244e87"
              }
            ]
          },
          {
            "uuid": "3101df7b-ccdc-4aab-a4e2-b75f6e244e87",
            "actions": [
              {
                "attachments": [],
                "text": "Name three sounds you can hear right now. \nName three smells you can smell right now. \nName your three favourite foods. \nWhat are three things you can be grateful for right now? They don't have to be big. \n",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a3393ae5-b142-42a1-8597-04fff9878150"
              }
            ],
            "exits": [
              {
                "uuid": "1079c601-ae45-4a61-98b4-0a807bb56145",
                "destination_uuid": "a194c1c6-eb26-4b57-be6f-b1979cdd4f74"
              }
            ]
          },
          {
            "uuid": "a194c1c6-eb26-4b57-be6f-b1979cdd4f74",
            "actions": [
              {
                "attachments": [],
                "text": "At the end of a tough day, thinking of three things to be grateful for can help us find the courage to try again tomorrow.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0a53dfc8-bbd2-477f-92cf-8130393f7d8a"
              }
            ],
            "exits": [
              {
                "uuid": "dc7a7ab5-02de-4a26-89a4-c7baab244582",
                "destination_uuid": "54bc8186-72ba-4f5f-b4ba-e2dea86d96a4"
              }
            ]
          },
          {
            "uuid": "54bc8186-72ba-4f5f-b4ba-e2dea86d96a4",
            "actions": [
              {
                "uuid": "9a7dc243-96d6-43f5-bfb0-6653042258d4",
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
                "uuid": "244bbab6-e24f-4fb7-846f-8c26a08cce97",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "510ed0a1-9f9b-4110-84d3-a6afb10bd71f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "43b6290a-95ec-4231-8b2d-6d994e258a7e",
            "actions": [
              {
                "attachments": [],
                "text": "Close your eyes and think about the day. \nName 1 thing that you are grateful for. \nName 1 thing that you did well. \nName 1 thing that you love. \nWell done, you are a hero!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b7f7322d-2cb4-4eb7-800c-4775778abf46"
              }
            ],
            "exits": [
              {
                "uuid": "b6e21910-1cb6-4b15-8619-482584603b42",
                "destination_uuid": "b05bc240-e007-4acf-90c9-df6abc82607d"
              }
            ]
          },
          {
            "uuid": "b05bc240-e007-4acf-90c9-df6abc82607d",
            "actions": [
              {
                "uuid": "d280db02-137b-4cc2-b496-d9dcf0bc1f31",
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
                "uuid": "6cf9301c-f83e-417c-937f-41eca3600eca",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "172996f5-36ac-44c6-bba6-f133c67b95b9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "1bf1bec4-e61c-4dea-958a-cac784150466",
            "actions": [
              {
                "attachments": [],
                "text": "Use the magic power of three to stay connected and relax.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d7945f5b-7c21-4c42-b47c-f1792b44f6e1"
              }
            ],
            "exits": [
              {
                "uuid": "9a848280-a530-4c7d-bdf7-d00c767a929e",
                "destination_uuid": "b399bf3a-a234-4f36-aa0f-10ba66667225"
              }
            ]
          },
          {
            "uuid": "b399bf3a-a234-4f36-aa0f-10ba66667225",
            "actions": [
              {
                "attachments": [],
                "text": "Breathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3. \nBreathe in to the count of three. 1, 2, 3. \nBreath out to the count of three. 1, 2, 3.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4722a7f3-8fe7-49d9-b3eb-ba50eec488b7"
              }
            ],
            "exits": [
              {
                "uuid": "d5cad750-3225-47fc-9689-606f08310cfc",
                "destination_uuid": null
              }
            ]
          },
          {
            "uuid": "952c6bc1-f04f-44d1-b0e0-657f9f87d147",
            "actions": [
              {
                "uuid": "821aa4e4-cbe9-4ec2-a36b-6a2471312b87",
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
                "uuid": "cd5a3659-cf0a-45b2-ae6d-e171062e0c26",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "bc3dc021-bb4d-4b8f-9cf2-c4fdb7d99376",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "877ec973-cbf0-44da-a5ee-4e814abd22da",
            "actions": [
              {
                "attachments": [],
                "text": "1. Close your eyes.  \n2. Listen to your breath as it goes in and out five times.  \n3. Notice how you feel. \n4. When you are ready open your eyes again.  \n5. You are in control!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bb47f699-82ea-4889-8af4-2850363fca38"
              }
            ],
            "exits": [
              {
                "uuid": "fc77bee2-ac97-4d54-bca0-b2a1520fda92",
                "destination_uuid": "c983c951-f58e-4488-b517-503325f952d5"
              }
            ]
          },
          {
            "uuid": "c983c951-f58e-4488-b517-503325f952d5",
            "actions": [
              {
                "uuid": "9410030e-be5d-46c7-b69e-22bc7a2754b8",
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
                "uuid": "e448f77a-2ff9-46c8-be9c-f8ba2261b2d2",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "5142cf99-43eb-4ec0-bc32-4f625174fce6",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8966e882-2197-4a29-baea-7fdbc41511ff",
            "actions": [
              {
                "flow": {
                  "name": "character_names",
                  "uuid": "ebad9e83-e29c-4138-9387-b4aa557a2fd8"
                },
                "type": "enter_flow",
                "uuid": "d5ec145b-8a69-47a5-8dc1-19d6019d9252"
              }
            ],
            "exits": [
              {
                "uuid": "5981add4-b616-4a07-9e3d-ccbc39a8e367",
                "destination_uuid": "2ccc51e9-7ad5-4a5e-9b43-2e8b2258f028"
              },
              {
                "uuid": "886576c9-5b35-4f99-91d9-1b7049b09747",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "90f2528f-a98a-4192-93b0-8b5a97c57a7c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "876b7707-7772-4350-9ef3-6b4348401e33"
                },
                {
                  "uuid": "86c98427-c5bf-484d-9c2a-c9a843b1f0d1",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e51cc016-5c59-41ab-baa7-45ccb277e4b5"
                }
              ],
              "categories": [
                {
                  "uuid": "876b7707-7772-4350-9ef3-6b4348401e33",
                  "name": "Complete",
                  "exit_uuid": "5981add4-b616-4a07-9e3d-ccbc39a8e367"
                },
                {
                  "uuid": "e51cc016-5c59-41ab-baa7-45ccb277e4b5",
                  "name": "Expired",
                  "exit_uuid": "886576c9-5b35-4f99-91d9-1b7049b09747"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "876b7707-7772-4350-9ef3-6b4348401e33"
            }
          },
          {
            "uuid": "2ccc51e9-7ad5-4a5e-9b43-2e8b2258f028",
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
                "uuid": "c5738947-9ce8-4b56-8fc6-3a90d6e6a040"
              }
            ],
            "exits": [
              {
                "uuid": "ff1c1a2e-a8bf-4943-aab5-1190c8c3ce93",
                "destination_uuid": "56ecdb7b-02dc-4342-84f9-cbbd830952e7"
              }
            ]
          },
          {
            "uuid": "56ecdb7b-02dc-4342-84f9-cbbd830952e7",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "7483edf0-a416-4d4c-81c2-c700d005f438",
              "cases": [
                {
                  "arguments": [
                    "welcome"
                  ],
                  "category_uuid": "5d6d4ffe-122e-4da7-96c9-fd260bd33470",
                  "type": "has_only_phrase",
                  "uuid": "ad988d21-738c-49b9-9f7b-3a970ce30e56"
                },
                {
                  "arguments": [
                    "1on1"
                  ],
                  "category_uuid": "e792cd8c-c16e-4445-9a73-4c737a3ee625",
                  "type": "has_only_phrase",
                  "uuid": "f9d109b5-7ee3-43c9-8236-85946cad902b"
                },
                {
                  "arguments": [
                    "praise"
                  ],
                  "category_uuid": "e966c8b8-1f57-40f3-bef8-5bfa9b3aa5d8",
                  "type": "has_only_phrase",
                  "uuid": "b55af21c-415b-41b3-9fe6-319a420e4d2c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ff9ebfb3-bda9-4ac8-a6c8-935af0720176",
                  "name": "All Responses",
                  "uuid": "7483edf0-a416-4d4c-81c2-c700d005f438"
                },
                {
                  "exit_uuid": "242c601f-d953-46c3-a701-55e0ca08120a",
                  "name": "welcome",
                  "uuid": "5d6d4ffe-122e-4da7-96c9-fd260bd33470"
                },
                {
                  "exit_uuid": "3cb6b234-5041-4cfc-8271-dbdc7de1b642",
                  "name": "1on1",
                  "uuid": "e792cd8c-c16e-4445-9a73-4c737a3ee625"
                },
                {
                  "exit_uuid": "8fc8a578-f121-4fb4-b6c0-d7b8c92d2cdb",
                  "name": "praise",
                  "uuid": "e966c8b8-1f57-40f3-bef8-5bfa9b3aa5d8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "ff9ebfb3-bda9-4ac8-a6c8-935af0720176",
                "destination_uuid": null
              },
              {
                "uuid": "242c601f-d953-46c3-a701-55e0ca08120a",
                "destination_uuid": "babbd4f3-d65f-4f2c-b14b-af4932241d5a"
              },
              {
                "uuid": "3cb6b234-5041-4cfc-8271-dbdc7de1b642",
                "destination_uuid": "c9748138-edc4-4f5c-ba09-840de9567a25"
              },
              {
                "uuid": "8fc8a578-f121-4fb4-b6c0-d7b8c92d2cdb",
                "destination_uuid": "ca7642be-7adc-46ac-a3c1-042d0bcb2c4e"
              }
            ]
          },
          {
            "uuid": "babbd4f3-d65f-4f2c-b14b-af4932241d5a",
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
                "uuid": "cc855278-3b5c-48c7-8318-4f4bde71e3fb"
              }
            ],
            "exits": [
              {
                "uuid": "d7fccdc7-8b97-4bef-a1d6-aac6c9a979cb",
                "destination_uuid": "744a47c5-fb13-4293-93be-3f1678763262"
              }
            ]
          },
          {
            "uuid": "744a47c5-fb13-4293-93be-3f1678763262",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a5c7be5c-99cc-49ef-b433-9101d22eec56",
              "cases": [
                {
                  "arguments": [
                    "mod_welcome_self-care_package"
                  ],
                  "category_uuid": "22b52c95-c01b-4865-995d-7c0aa1277586",
                  "type": "has_only_phrase",
                  "uuid": "b55b9d1f-3a31-4c26-bd42-4dbce7aac42d"
                },
                {
                  "arguments": [
                    "mod_welcome_quick_praise"
                  ],
                  "category_uuid": "7ca85d5d-268a-4c93-84d9-f9e2014267b3",
                  "type": "has_only_phrase",
                  "uuid": "fa89f03c-e182-4765-a1b9-ac2b5f3ec9a6"
                },
                {
                  "arguments": [
                    "mod_welcome_survey"
                  ],
                  "category_uuid": "8f2750bd-55d6-4517-b39f-9153121a5534",
                  "type": "has_only_phrase",
                  "uuid": "6131cd8e-5bce-4257-a85a-fb9d46bb845f"
                },
                {
                  "arguments": [
                    "mod_welcome_photo_activity"
                  ],
                  "category_uuid": "d022c29e-cb1a-4ee7-9ac2-022e3fa39fc8",
                  "type": "has_only_phrase",
                  "uuid": "609dc0ab-85cb-4b90-9ae2-ba7771a012db"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "31062e12-d2c9-498f-8545-68c035f46181",
                  "name": "All Responses",
                  "uuid": "a5c7be5c-99cc-49ef-b433-9101d22eec56"
                },
                {
                  "exit_uuid": "d8f2660d-48b4-4c8e-88f6-0c5a952b689d",
                  "name": "mod_welcome_self-care_package",
                  "uuid": "22b52c95-c01b-4865-995d-7c0aa1277586"
                },
                {
                  "exit_uuid": "85eea489-45a7-4c64-91b3-9ea5d4f5bb51",
                  "name": "mod_welcome_quick_praise",
                  "uuid": "7ca85d5d-268a-4c93-84d9-f9e2014267b3"
                },
                {
                  "exit_uuid": "001de126-f890-4379-86dd-e0f9be1e41c4",
                  "name": "mod_welcome_survey",
                  "uuid": "8f2750bd-55d6-4517-b39f-9153121a5534"
                },
                {
                  "exit_uuid": "1b371e2d-a673-4d01-8a0d-360d3f6026da",
                  "name": "mod_welcome_photo_activity",
                  "uuid": "d022c29e-cb1a-4ee7-9ac2-022e3fa39fc8"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "31062e12-d2c9-498f-8545-68c035f46181",
                "destination_uuid": null
              },
              {
                "uuid": "d8f2660d-48b4-4c8e-88f6-0c5a952b689d",
                "destination_uuid": "8f1959a0-22cc-4c92-88a7-c8233cc51271"
              },
              {
                "uuid": "85eea489-45a7-4c64-91b3-9ea5d4f5bb51",
                "destination_uuid": "88547438-afff-43d9-aa74-f8b863771da3"
              },
              {
                "uuid": "001de126-f890-4379-86dd-e0f9be1e41c4",
                "destination_uuid": "c6eccd5f-dba2-44a7-8490-b41dfb94e5fb"
              },
              {
                "uuid": "1b371e2d-a673-4d01-8a0d-360d3f6026da",
                "destination_uuid": "cd16a2e3-5e3e-41c5-87ea-851fc1f74817"
              }
            ]
          },
          {
            "uuid": "8f1959a0-22cc-4c92-88a7-c8233cc51271",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_self-care_package",
                  "uuid": "23acd936-5809-46c9-9c64-f01ac3d41630"
                },
                "type": "enter_flow",
                "uuid": "cc068f1c-d365-4efe-917c-893b2e56becb"
              }
            ],
            "exits": [
              {
                "uuid": "929e53f3-2b6c-445c-a0af-57429d778159",
                "destination_uuid": null
              },
              {
                "uuid": "38b31520-7aef-4019-abbb-c214a3d2342e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "234a3df0-9ddd-41a4-91bd-e028f8f0c8dc",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "700ddfbf-1ff3-44fe-bdef-8819591017be"
                },
                {
                  "uuid": "367d8f15-66d8-48c5-a374-969bd9a89e3b",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "34bfec07-3ca8-4893-a63a-21718148c294"
                }
              ],
              "categories": [
                {
                  "uuid": "700ddfbf-1ff3-44fe-bdef-8819591017be",
                  "name": "Complete",
                  "exit_uuid": "929e53f3-2b6c-445c-a0af-57429d778159"
                },
                {
                  "uuid": "34bfec07-3ca8-4893-a63a-21718148c294",
                  "name": "Expired",
                  "exit_uuid": "38b31520-7aef-4019-abbb-c214a3d2342e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "700ddfbf-1ff3-44fe-bdef-8819591017be"
            }
          },
          {
            "uuid": "88547438-afff-43d9-aa74-f8b863771da3",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_quick_praise",
                  "uuid": "0bbb7d57-20fd-42b9-896c-dd48d3cad9b4"
                },
                "type": "enter_flow",
                "uuid": "2d3ada0a-0a0e-4d87-a05e-baba59c69f85"
              }
            ],
            "exits": [
              {
                "uuid": "323efaf7-99c9-4792-ace8-61be9b2f6b46",
                "destination_uuid": null
              },
              {
                "uuid": "55921c70-716b-4a85-9766-2bd061a2af59",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c698fc34-7352-4483-857a-dfdd2c0817a4",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "7cebff7d-cc12-4d89-88af-2bc4bf21d8e0"
                },
                {
                  "uuid": "0d83b1e5-26de-4df7-9cc0-bed8caa05904",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "4387e6cd-7948-4ace-870b-648fe02c33ad"
                }
              ],
              "categories": [
                {
                  "uuid": "7cebff7d-cc12-4d89-88af-2bc4bf21d8e0",
                  "name": "Complete",
                  "exit_uuid": "323efaf7-99c9-4792-ace8-61be9b2f6b46"
                },
                {
                  "uuid": "4387e6cd-7948-4ace-870b-648fe02c33ad",
                  "name": "Expired",
                  "exit_uuid": "55921c70-716b-4a85-9766-2bd061a2af59"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "7cebff7d-cc12-4d89-88af-2bc4bf21d8e0"
            }
          },
          {
            "uuid": "c6eccd5f-dba2-44a7-8490-b41dfb94e5fb",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_survey",
                  "uuid": "cf4556a9-e616-4a96-b98b-f21e853e1266"
                },
                "type": "enter_flow",
                "uuid": "6cdd18fb-4681-487d-8a6f-f955995eb356"
              }
            ],
            "exits": [
              {
                "uuid": "7513b9e8-2381-4051-8a89-1ad5310bf5a5",
                "destination_uuid": null
              },
              {
                "uuid": "36c7fdad-2a9c-4d5a-ad63-8b5ccccfd924",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "5c73073a-96b9-4143-8ec9-9a5685a1e1ea",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "309147b9-354c-4571-98b1-68715f2ab47f"
                },
                {
                  "uuid": "60531ca4-173a-49af-8889-7b1e59b8e8c4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "d101e8c2-9b37-4cc3-a065-6fa8a9897be0"
                }
              ],
              "categories": [
                {
                  "uuid": "309147b9-354c-4571-98b1-68715f2ab47f",
                  "name": "Complete",
                  "exit_uuid": "7513b9e8-2381-4051-8a89-1ad5310bf5a5"
                },
                {
                  "uuid": "d101e8c2-9b37-4cc3-a065-6fa8a9897be0",
                  "name": "Expired",
                  "exit_uuid": "36c7fdad-2a9c-4d5a-ad63-8b5ccccfd924"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "309147b9-354c-4571-98b1-68715f2ab47f"
            }
          },
          {
            "uuid": "cd16a2e3-5e3e-41c5-87ea-851fc1f74817",
            "actions": [
              {
                "flow": {
                  "name": "mod_welcome_photo_activity",
                  "uuid": "7d97c31e-76af-4ad4-a36a-635314e85daf"
                },
                "type": "enter_flow",
                "uuid": "1703c8ef-4b9a-429c-8d91-be1058f6161d"
              }
            ],
            "exits": [
              {
                "uuid": "c1407d7a-2d77-4577-b0f3-71dcfe79b231",
                "destination_uuid": null
              },
              {
                "uuid": "3649c0b9-b517-4a82-86ab-3bf9f99ab215",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b220f2c5-576e-48c8-8b4f-966832716f41",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "89793043-7ee1-4a8d-9efd-16e4050976da"
                },
                {
                  "uuid": "a6ede3f3-0be8-4dca-8527-93f4050e2caf",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "52f88158-d853-4955-b113-7d5c2d6c2d6b"
                }
              ],
              "categories": [
                {
                  "uuid": "89793043-7ee1-4a8d-9efd-16e4050976da",
                  "name": "Complete",
                  "exit_uuid": "c1407d7a-2d77-4577-b0f3-71dcfe79b231"
                },
                {
                  "uuid": "52f88158-d853-4955-b113-7d5c2d6c2d6b",
                  "name": "Expired",
                  "exit_uuid": "3649c0b9-b517-4a82-86ab-3bf9f99ab215"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "89793043-7ee1-4a8d-9efd-16e4050976da"
            }
          },
          {
            "uuid": "c9748138-edc4-4f5c-ba09-840de9567a25",
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
                "uuid": "d96d8d6e-e4cc-4ccb-a901-00b1557109e1"
              }
            ],
            "exits": [
              {
                "uuid": "086f9892-3ea4-419a-a8d5-e26123ab2fcd",
                "destination_uuid": "a236c0f1-38f7-4bf5-907f-35cdfb6d3854"
              }
            ]
          },
          {
            "uuid": "a236c0f1-38f7-4bf5-907f-35cdfb6d3854",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "bbcc249b-4920-4ef5-88bf-70a0018a244e",
              "cases": [
                {
                  "arguments": [
                    "mod_1on1_emo"
                  ],
                  "category_uuid": "f0557aa1-f7d6-44a2-9d9e-f7cfe9aba47b",
                  "type": "has_only_phrase",
                  "uuid": "969e8afb-7382-441f-93b2-cbbfb79c4363"
                },
                {
                  "arguments": [
                    "mod_1on1_activity"
                  ],
                  "category_uuid": "4f3572c4-9c7c-4f1b-ac16-887b49c4fb46",
                  "type": "has_only_phrase",
                  "uuid": "91f26b6e-82b4-4aae-a299-f62091480e8b"
                },
                {
                  "arguments": [
                    "mod_1on1_activity_review"
                  ],
                  "category_uuid": "7c2eff9b-74c5-47bb-a1fd-cbc701a58208",
                  "type": "has_only_phrase",
                  "uuid": "a082aae7-81b6-4ae1-ad41-f08479368c39"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "529ed098-cce4-4e35-85c2-ab1a84c8827c",
                  "name": "All Responses",
                  "uuid": "bbcc249b-4920-4ef5-88bf-70a0018a244e"
                },
                {
                  "exit_uuid": "b0ebeb2b-46f6-4cae-9536-c43e16a58380",
                  "name": "mod_1on1_emo",
                  "uuid": "f0557aa1-f7d6-44a2-9d9e-f7cfe9aba47b"
                },
                {
                  "exit_uuid": "8230c435-1a64-4d0e-8cb9-7326b5b601ea",
                  "name": "mod_1on1_activity",
                  "uuid": "4f3572c4-9c7c-4f1b-ac16-887b49c4fb46"
                },
                {
                  "exit_uuid": "6f3c9a46-794b-4a93-a753-f10ad89ef314",
                  "name": "mod_1on1_activity_review",
                  "uuid": "7c2eff9b-74c5-47bb-a1fd-cbc701a58208"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "529ed098-cce4-4e35-85c2-ab1a84c8827c",
                "destination_uuid": null
              },
              {
                "uuid": "b0ebeb2b-46f6-4cae-9536-c43e16a58380",
                "destination_uuid": "aa65f545-edc4-4c06-90e1-49c58050c2cc"
              },
              {
                "uuid": "8230c435-1a64-4d0e-8cb9-7326b5b601ea",
                "destination_uuid": "ffd1ad75-1d3e-48cd-95ec-2a33f4ad7f67"
              },
              {
                "uuid": "6f3c9a46-794b-4a93-a753-f10ad89ef314",
                "destination_uuid": "56f69238-8fef-4d72-8bdc-19c4d08e235a"
              }
            ]
          },
          {
            "uuid": "aa65f545-edc4-4c06-90e1-49c58050c2cc",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_emo",
                  "uuid": "3628c49b-c2e6-4fad-8a6b-e39ed010f372"
                },
                "type": "enter_flow",
                "uuid": "f8cf7b41-5964-415b-b1df-9f290a59a143"
              }
            ],
            "exits": [
              {
                "uuid": "2cc825fd-1caa-438e-affc-5a572d97bf50",
                "destination_uuid": null
              },
              {
                "uuid": "31f18b52-8662-4c3c-b8fa-d68104e85e55",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "bf51d5d3-0b8a-401d-9480-21fb0f155993",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "96823ec5-b0b1-4b76-97da-574411a5d8cc"
                },
                {
                  "uuid": "e0c00e91-effb-4fed-809a-06f1ce0d1c9e",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "1e6a32a4-6ae1-436d-b171-1221cbe25b28"
                }
              ],
              "categories": [
                {
                  "uuid": "96823ec5-b0b1-4b76-97da-574411a5d8cc",
                  "name": "Complete",
                  "exit_uuid": "2cc825fd-1caa-438e-affc-5a572d97bf50"
                },
                {
                  "uuid": "1e6a32a4-6ae1-436d-b171-1221cbe25b28",
                  "name": "Expired",
                  "exit_uuid": "31f18b52-8662-4c3c-b8fa-d68104e85e55"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "96823ec5-b0b1-4b76-97da-574411a5d8cc"
            }
          },
          {
            "uuid": "ffd1ad75-1d3e-48cd-95ec-2a33f4ad7f67",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity",
                  "uuid": "784ccf69-62cf-48f9-be10-022eca9fe782"
                },
                "type": "enter_flow",
                "uuid": "e90f955c-df4c-4aeb-8f69-43dcea53fe89"
              }
            ],
            "exits": [
              {
                "uuid": "4dbc6ae7-ed3b-49a2-b9e7-f178df77535a",
                "destination_uuid": null
              },
              {
                "uuid": "48d638b5-dac1-4ccc-8a6e-d9a4e960c98e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "2bc33e3f-2d6d-47f7-8d00-0f6af20ae8ed",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "497b6438-cb8c-4e36-b849-a57cb993da46"
                },
                {
                  "uuid": "8705a446-6732-4bfa-8124-7c2c6dfca9e9",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "a71939e2-f9e6-4dd8-bf6d-ce6a8dd6fc55"
                }
              ],
              "categories": [
                {
                  "uuid": "497b6438-cb8c-4e36-b849-a57cb993da46",
                  "name": "Complete",
                  "exit_uuid": "4dbc6ae7-ed3b-49a2-b9e7-f178df77535a"
                },
                {
                  "uuid": "a71939e2-f9e6-4dd8-bf6d-ce6a8dd6fc55",
                  "name": "Expired",
                  "exit_uuid": "48d638b5-dac1-4ccc-8a6e-d9a4e960c98e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "497b6438-cb8c-4e36-b849-a57cb993da46"
            }
          },
          {
            "uuid": "56f69238-8fef-4d72-8bdc-19c4d08e235a",
            "actions": [
              {
                "flow": {
                  "name": "mod_1on1_activity_review",
                  "uuid": "23e22641-e414-4c9b-957b-dc85b00cf473"
                },
                "type": "enter_flow",
                "uuid": "bccc2dc5-4d95-4541-9f94-6cd7c1c01120"
              }
            ],
            "exits": [
              {
                "uuid": "ebd52426-5da6-445a-92fa-e660fc02caf5",
                "destination_uuid": null
              },
              {
                "uuid": "6085f778-14be-4ddc-8e7e-07463f3913ce",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "e06d3c0b-dc0a-4eee-ab6a-860392dbbf2c",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "a9284d4d-3fc6-49e5-8d8d-da86ba74c959"
                },
                {
                  "uuid": "7667318a-abbd-47dc-b3e7-27c466ecbbbd",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e63d28c6-8779-478e-b1ff-e5b88b15f911"
                }
              ],
              "categories": [
                {
                  "uuid": "a9284d4d-3fc6-49e5-8d8d-da86ba74c959",
                  "name": "Complete",
                  "exit_uuid": "ebd52426-5da6-445a-92fa-e660fc02caf5"
                },
                {
                  "uuid": "e63d28c6-8779-478e-b1ff-e5b88b15f911",
                  "name": "Expired",
                  "exit_uuid": "6085f778-14be-4ddc-8e7e-07463f3913ce"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "a9284d4d-3fc6-49e5-8d8d-da86ba74c959"
            }
          },
          {
            "uuid": "ca7642be-7adc-46ac-a3c1-042d0bcb2c4e",
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
                "uuid": "e926cd98-f105-41a7-86a2-f29ae19f06b3"
              }
            ],
            "exits": [
              {
                "uuid": "5484ddb6-7562-4a13-8bcd-7a44afe665f4",
                "destination_uuid": "c8d2cc36-87c4-4349-aba4-19e66c1e854e"
              }
            ]
          },
          {
            "uuid": "c8d2cc36-87c4-4349-aba4-19e66c1e854e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b0407e8e-c118-4869-b483-9d3551652a06",
              "cases": [
                {
                  "arguments": [
                    "mod_praise_intro"
                  ],
                  "category_uuid": "497c9d56-f958-4ab6-b097-41c98a69c110",
                  "type": "has_only_phrase",
                  "uuid": "54f13b86-4a73-4fda-addb-3c4a2c3f7ad0"
                },
                {
                  "arguments": [
                    "mod_praise_activity"
                  ],
                  "category_uuid": "213b00cb-c7d3-4c07-b02c-4327fab433c9",
                  "type": "has_only_phrase",
                  "uuid": "a28d6b36-f0f0-493b-a5de-d6f2f8b12e46"
                },
                {
                  "arguments": [
                    "mod_praise_activity_review"
                  ],
                  "category_uuid": "ada1d35b-912f-490e-b770-6c030eeed75f",
                  "type": "has_only_phrase",
                  "uuid": "def7b50c-efd2-401d-a46c-ddecf8620312"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "84bc24f2-e955-4c46-8919-e80f2ad4ed32",
                  "name": "All Responses",
                  "uuid": "b0407e8e-c118-4869-b483-9d3551652a06"
                },
                {
                  "exit_uuid": "113ca6ad-53ee-4876-bd0b-a13a2638ac80",
                  "name": "mod_praise_intro",
                  "uuid": "497c9d56-f958-4ab6-b097-41c98a69c110"
                },
                {
                  "exit_uuid": "959a13c1-2d0f-4ec5-a470-2d04188a87c2",
                  "name": "mod_praise_activity",
                  "uuid": "213b00cb-c7d3-4c07-b02c-4327fab433c9"
                },
                {
                  "exit_uuid": "5b37591d-2083-40fa-81b0-d524e0053467",
                  "name": "mod_praise_activity_review",
                  "uuid": "ada1d35b-912f-490e-b770-6c030eeed75f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "84bc24f2-e955-4c46-8919-e80f2ad4ed32",
                "destination_uuid": null
              },
              {
                "uuid": "113ca6ad-53ee-4876-bd0b-a13a2638ac80",
                "destination_uuid": "a82df249-360c-4f38-9020-7cfee1990928"
              },
              {
                "uuid": "959a13c1-2d0f-4ec5-a470-2d04188a87c2",
                "destination_uuid": "b1d7a7f8-9886-456f-9bd5-01f27af8e44b"
              },
              {
                "uuid": "5b37591d-2083-40fa-81b0-d524e0053467",
                "destination_uuid": "1ce23648-d2ea-4228-af34-c053a02944b0"
              }
            ]
          },
          {
            "uuid": "a82df249-360c-4f38-9020-7cfee1990928",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_intro",
                  "uuid": "1c40e67c-5c52-4ba8-a1af-ec8fa9fb0ecc"
                },
                "type": "enter_flow",
                "uuid": "93d3fe0f-5eed-4c1d-98c3-f84252f75fa0"
              }
            ],
            "exits": [
              {
                "uuid": "f19011aa-31ad-4fb2-8ed3-351e41f3c8dd",
                "destination_uuid": null
              },
              {
                "uuid": "839c286f-2ec7-41fe-9700-6624e0a4d7e5",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "abcab3c2-6437-405d-bf24-2734938a3837",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "2fdb4c3c-d214-46bd-b7e9-f4a47ae5693a"
                },
                {
                  "uuid": "76080584-b3c6-47e4-ba90-9f9768b25170",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "7f45cfcc-3fa4-4778-8e64-fa5aad58c860"
                }
              ],
              "categories": [
                {
                  "uuid": "2fdb4c3c-d214-46bd-b7e9-f4a47ae5693a",
                  "name": "Complete",
                  "exit_uuid": "f19011aa-31ad-4fb2-8ed3-351e41f3c8dd"
                },
                {
                  "uuid": "7f45cfcc-3fa4-4778-8e64-fa5aad58c860",
                  "name": "Expired",
                  "exit_uuid": "839c286f-2ec7-41fe-9700-6624e0a4d7e5"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "2fdb4c3c-d214-46bd-b7e9-f4a47ae5693a"
            }
          },
          {
            "uuid": "b1d7a7f8-9886-456f-9bd5-01f27af8e44b",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity",
                  "uuid": "551234f0-1e0e-404b-a193-05d1c7305120"
                },
                "type": "enter_flow",
                "uuid": "858eaf63-ac7d-4eec-9e12-d96c8297d05c"
              }
            ],
            "exits": [
              {
                "uuid": "a6e96646-968d-4e63-9aa9-25b8abd7635e",
                "destination_uuid": null
              },
              {
                "uuid": "d1cf5474-56aa-4d10-87df-abe64e4683e4",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "62da0e50-4e0f-4412-98da-56c8f6660faf",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "9e8ee0b0-ea62-4661-95c8-0c8ac213335d"
                },
                {
                  "uuid": "13b69c43-db18-49ca-af4c-c3904e2fc5f2",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "bdc1e3ea-95d6-45bf-8357-2b6cc0a9553d"
                }
              ],
              "categories": [
                {
                  "uuid": "9e8ee0b0-ea62-4661-95c8-0c8ac213335d",
                  "name": "Complete",
                  "exit_uuid": "a6e96646-968d-4e63-9aa9-25b8abd7635e"
                },
                {
                  "uuid": "bdc1e3ea-95d6-45bf-8357-2b6cc0a9553d",
                  "name": "Expired",
                  "exit_uuid": "d1cf5474-56aa-4d10-87df-abe64e4683e4"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "9e8ee0b0-ea62-4661-95c8-0c8ac213335d"
            }
          },
          {
            "uuid": "1ce23648-d2ea-4228-af34-c053a02944b0",
            "actions": [
              {
                "flow": {
                  "name": "mod_praise_activity_review",
                  "uuid": "7a74c485-ce80-4c2a-8cf3-c7b1471487eb"
                },
                "type": "enter_flow",
                "uuid": "aa766c3d-6b27-464d-a2ba-825471be5087"
              }
            ],
            "exits": [
              {
                "uuid": "150b26d9-1772-48a8-93fb-8287fccabdc7",
                "destination_uuid": null
              },
              {
                "uuid": "8ba44644-335c-4f8e-9dfa-df7f95275ffc",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "02e4dc07-0097-4768-a4a3-b00006d6bab7",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "0e47a001-c478-45f5-b479-4aec5d8474e0"
                },
                {
                  "uuid": "4708d4a7-8168-4d0c-9090-ba99de39ae41",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "f441a6dd-488b-4db9-9d77-de15f727f5b3"
                }
              ],
              "categories": [
                {
                  "uuid": "0e47a001-c478-45f5-b479-4aec5d8474e0",
                  "name": "Complete",
                  "exit_uuid": "150b26d9-1772-48a8-93fb-8287fccabdc7"
                },
                {
                  "uuid": "f441a6dd-488b-4db9-9d77-de15f727f5b3",
                  "name": "Expired",
                  "exit_uuid": "8ba44644-335c-4f8e-9dfa-df7f95275ffc"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "0e47a001-c478-45f5-b479-4aec5d8474e0"
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
        "uuid": "42e914ca-5ba4-4883-9a55-d45202ca44fa",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "682ac28f-1730-453c-8da0-18967e95c52e",
            "actions": [
              {
                "uuid": "e77ae361-59c5-4b3e-a527-02f7a74d684b",
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
                "uuid": "ca073730-79ea-4828-86b6-0b6f87a88b92",
                "destination_uuid": "c6a298f4-e8e1-4705-b164-dd04702aa7ac"
              }
            ]
          },
          {
            "uuid": "c6a298f4-e8e1-4705-b164-dd04702aa7ac",
            "actions": [
              {
                "uuid": "478760fd-1221-49da-80ca-5f6cbad3256f",
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
                "uuid": "5613c7ff-b2c5-40d5-8f8b-f1eeaa280219",
                "destination_uuid": "123701f0-3486-4d57-9df2-107bd72da200"
              }
            ]
          },
          {
            "uuid": "123701f0-3486-4d57-9df2-107bd72da200",
            "actions": [
              {
                "uuid": "a6134109-ec85-4d84-aab9-48120746bcdd",
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
                "uuid": "2b91ef08-912e-44e3-9e37-70ee28cc4393",
                "destination_uuid": "b51398dc-b206-4d2f-9d28-8eabc1a9c960"
              }
            ]
          },
          {
            "uuid": "b51398dc-b206-4d2f-9d28-8eabc1a9c960",
            "actions": [
              {
                "uuid": "ac26a9e9-677d-481b-b441-bf25f3d8f9d8",
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
                "uuid": "217a9bf6-77f4-4719-99c1-4ecb8b3c503b",
                "destination_uuid": "a966db99-9a0d-4c06-a8be-93d2d216a947"
              }
            ]
          },
          {
            "uuid": "a966db99-9a0d-4c06-a8be-93d2d216a947",
            "actions": [
              {
                "uuid": "a2801ed1-7a25-449f-823c-f0652a580df6",
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
                "uuid": "a83b325d-47db-46a8-9f57-be880611ecc3",
                "destination_uuid": "c68bdf8f-d7a6-43ac-8564-20b585444ecd"
              }
            ]
          },
          {
            "uuid": "c68bdf8f-d7a6-43ac-8564-20b585444ecd",
            "actions": [
              {
                "uuid": "226ed8ec-aed3-4161-b066-9ecd00ffa8fe",
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
                "uuid": "bc8ce33e-0fd3-40ab-819e-8fc855ce0655",
                "destination_uuid": "9cb21545-bfdb-4f83-865e-0b38dfb567b5"
              }
            ]
          },
          {
            "uuid": "9cb21545-bfdb-4f83-865e-0b38dfb567b5",
            "actions": [
              {
                "uuid": "cb7b71c5-cc01-4cc8-9f23-d4e9c2b96870",
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
                "uuid": "32600893-ee2a-40d5-879b-4c0356f9a866",
                "destination_uuid": "af266183-e3ca-4529-ac63-174d21acfba5"
              }
            ]
          },
          {
            "uuid": "af266183-e3ca-4529-ac63-174d21acfba5",
            "actions": [
              {
                "uuid": "ad1ece0e-a179-4158-9226-42c35ece433f",
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
                "uuid": "cb7ec184-5a42-499b-b08b-494a40fa4886",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "f661c6c5-39fa-45bf-b369-e1277ca1438e",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3a3829d6-a4d1-48bf-b898-decc587a720e",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/home",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "83e25904-6410-4c5d-8378-a7ffac0c7c5c"
              }
            ],
            "exits": [
              {
                "uuid": "b95d9293-8f68-4dc6-9ee8-56805c33bf65",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "486681b4-1480-4c72-b551-99bd3752b03d",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "ffad604b-2918-47b8-902c-831e5935fe33",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/chat",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f573282c-bb60-4945-b11b-eed54cfdaff1"
              }
            ],
            "exits": [
              {
                "uuid": "8fac016e-7967-493f-90f8-bd4f28398237",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "90d223d0-8898-42ef-840b-319cc5fe9bfe",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "c6cd545c-32f9-4bb8-ac43-2d4b5bb2e646",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a36ac485-6731-4226-a3f2-16fef7ec6c2f"
              }
            ],
            "exits": [
              {
                "uuid": "a527b6c1-324c-4afb-840a-cdf22dc1f3d4",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "a3159aaf-bbb0-4ffa-b2fc-3ce9610d234f",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "a5b77bac-2576-48a3-ae48-66ebba7690e4",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/ONE_ON_ONE_TIME/1on1_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0c103ade-521e-450a-a844-db4123de120c"
              }
            ],
            "exits": [
              {
                "uuid": "0a4c144e-dfb9-4d83-aae4-59807401730e",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "1734b8b8-bfb0-44c5-8b36-c1aa79398845",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "0435e2ea-45ba-477c-91f0-cb8116066ad8",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/PRAISE_AND_POSITIVE_REINFORCEMENT/Praise_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "18c9c737-0a3f-4e9d-ab78-ab2d719fbfdb"
              }
            ],
            "exits": [
              {
                "uuid": "4ed96e1b-0347-46a1-8bb2-e50a9dbfe8fb",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "51e09310-c5b1-4fb2-aa07-2e476a8e1570",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2cc6b049-97bd-40e9-9c8b-755590282371",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/toolbox/topic/POSITIVE_INSTRUCTIONS/Instructions_Tips",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "eddad6ce-4cdc-4290-81b2-c77438ac9177"
              }
            ],
            "exits": [
              {
                "uuid": "2ee57c6f-f5fa-41a1-ad75-66423022e77c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "295a43e2-e266-4307-9da9-a6238bbbc6dd",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "87028b38-cced-48f5-b454-139ce6622a64",
            "actions": [
              {
                "attachments": [],
                "text": "https://plh-demo1.idems.international/gallery",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bd1411c5-d8d3-4afa-b7fa-fafde3074c40"
              }
            ],
            "exits": [
              {
                "uuid": "32a62058-358f-4d51-8fab-16df2d3950ee",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "257ce935-1d2a-4124-84dd-427faca1694c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "5ca4ac01-ddec-43d2-901d-6e7a21f8203e",
            "actions": [
              {
                "attachments": [],
                "text": "Taking care of teens is hard.\nNobody is doing this perfectly.\nTake a moment to praise yourself for not giving up.\nYou are a real star.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2f28c2f4-ab50-432b-8227-dd56ffd9b9c1"
              }
            ],
            "exits": [
              {
                "uuid": "96961611-8f57-428b-bc14-db7789456754",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "65866da2-d03b-4123-9911-2196e8da4860",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "83f38630-41ac-4920-9270-6f296820e8c1",
            "actions": [
              {
                "attachments": [],
                "text": "Sometimes it’s easy, sometimes it’s not. Let go of the mistakes and celebrate the wins, however small! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8aa5becd-d42f-440c-a462-50b3dec6bcaa"
              }
            ],
            "exits": [
              {
                "uuid": "624a8064-7a70-4c62-85f0-89e64c84564f",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c3259d5e-15c3-44a1-b75d-320be0aa6760",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "2e5c6392-4f9c-4e87-85d6-6627a3191839",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for making so much effort to be a better parent. You are loved and appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "33f80790-3a20-4ee5-8d2b-097d5f502725"
              }
            ],
            "exits": [
              {
                "uuid": "e6b1398d-88fc-4216-939c-5b53b55271c7",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "8a0c9b25-f5b6-4f27-8bca-8b5a32e78ee9",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "4955ade2-ca66-4131-8f2b-f5c7c664b6b3",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for getting up every morning and trying again. Even when you are tired. That is real courage and dedication!  ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c21232dd-f75d-4fd8-a967-2953f1b82da0"
              }
            ],
            "exits": [
              {
                "uuid": "6cf8dcad-ceb4-432c-84b7-7248708586c0",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "c81ded72-f588-4d6d-9527-2847195a5906",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6cfd5a0a-9e9d-4681-a64f-2743d64dd130",
            "actions": [
              {
                "attachments": [],
                "text": "Well done for trying to figure everything out. Nobody has all the answers but you really do your best!",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "9e00d705-a612-4744-ae0a-2aaff70a431b"
              }
            ],
            "exits": [
              {
                "uuid": "91b70bfc-33bb-4b0c-98da-5a2e3ed231ba",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "0b6e21f3-1376-40ae-8557-759e3947f583",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6e1f6063-0e01-4ad4-9c2e-62fe0b341452",
            "actions": [
              {
                "attachments": [],
                "text": "Thank you for showing up for your family today and doing your best! You are appreciated! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ff936ca6-7272-4695-bd95-7dfa094e0d74"
              }
            ],
            "exits": [
              {
                "uuid": "382317df-2905-4f08-adec-9591ed31a14c",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
          "revision": 0
        },
        "localization": {}
      }
    ],
    "groups": [],
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
        "uuid": "2d002262-a447-43ab-9601-6323b5f98ab3",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "8e459855-07f3-4d54-bcf3-f470fa82325f",
            "actions": [
              {
                "attachments": [],
                "text": "Congratulations! You are doing amazing! Remember it's the small things that make the big difference.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b823e69c-3646-4af8-b260-77a1cee688ef"
              }
            ],
            "exits": [
              {
                "uuid": "b7c97f0a-fdb2-4c9c-a84f-a2184336316d",
                "destination_uuid": null
              }
            ]
          }
        ],
        "_ui": null,
        "revision": 0,
        "expire_after_minutes": 60,
        "metadata": {
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