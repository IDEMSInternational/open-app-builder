export default [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "Welcome_Intro",
        "uuid": "40a09e0a-3f07-49d8-aa39-fcd3cc694404",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "cee5ecbc-7170-42a7-90b1-703bc54c8fc9",
            "actions": [
              {
                "flow": {
                  "name": "CharacterNames",
                  "uuid": "ac0fda3f-de0a-48f3-96b8-6869c4fa2aeb"
                },
                "type": "enter_flow",
                "uuid": "52b45022-f52c-4bd6-9fcf-8581e0cfdff8"
              }
            ],
            "exits": [
              {
                "uuid": "1faf6e40-e949-4893-b677-3ec4584f3bf2",
                "destination_uuid": "7253f0a8-d5d1-4c3f-b86d-1ea7faec7df0"
              },
              {
                "uuid": "9e02412f-cb2c-4422-8208-d9b9cf50385e",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8123db59-d71d-4194-a9eb-5da8846e1176",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "dbcdcbae-5d23-472d-9d43-602e56b7d753"
                },
                {
                  "uuid": "1780c989-ab0f-4b5b-b8e1-566fa7613c64",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e379898b-27c6-4e30-9c23-249ef40f7ab0"
                }
              ],
              "categories": [
                {
                  "uuid": "dbcdcbae-5d23-472d-9d43-602e56b7d753",
                  "name": "Complete",
                  "exit_uuid": "1faf6e40-e949-4893-b677-3ec4584f3bf2"
                },
                {
                  "uuid": "e379898b-27c6-4e30-9c23-249ef40f7ab0",
                  "name": "Expired",
                  "exit_uuid": "9e02412f-cb2c-4422-8208-d9b9cf50385e"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "dbcdcbae-5d23-472d-9d43-602e56b7d753"
            }
          },
          {
            "uuid": "7253f0a8-d5d1-4c3f-b86d-1ea7faec7df0",
            "actions": [
              {
                "attachments": [],
                "text": "We want to make this work for you! \nPlease choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1 https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg",
                  "guide2 https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide2/Welcome01.jpg"
                ],
                "uuid": "e550f067-7bff-403e-9e66-8006a6f99955"
              }
            ],
            "exits": [
              {
                "uuid": "062483a3-6389-4ed3-9661-f810810f0344",
                "destination_uuid": "4a81386d-14e4-46a8-8219-872e75b4b033"
              }
            ]
          },
          {
            "uuid": "4a81386d-14e4-46a8-8219-872e75b4b033",
            "actions": [],
            "exits": [
              {
                "uuid": "aabe6282-41ef-48aa-8a30-87bc7a4dd6de",
                "destination_uuid": "79b085bd-86d7-4d34-88c6-e7a7916d2773"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "23cabc34-643e-4349-85b1-b7f368028623",
              "cases": [],
              "categories": [
                {
                  "uuid": "23cabc34-643e-4349-85b1-b7f368028623",
                  "name": "All Responses",
                  "exit_uuid": "aabe6282-41ef-48aa-8a30-87bc7a4dd6de"
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
            "uuid": "79b085bd-86d7-4d34-88c6-e7a7916d2773",
            "actions": [
              {
                "uuid": "d9d71cd3-7da1-44d2-bd3b-3b188cfa8409",
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
                "uuid": "dade4aa6-dce6-4397-88a6-babeda18ba5a",
                "destination_uuid": "9b0418c4-50c9-4fc0-8324-c2704df1c49a"
              }
            ]
          },
          {
            "uuid": "9b0418c4-50c9-4fc0-8324-c2704df1c49a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "99545c8a-3db4-42cb-8bfe-689d3a8c0baf",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "428b7a6b-9eeb-47da-b667-a386d85592c3",
                  "type": "has_only_phrase",
                  "uuid": "de87cc13-867f-451c-8458-464fbdcae4e9"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "f8538146-df6a-45b1-8e30-ed29d1710d92",
                  "type": "has_only_phrase",
                  "uuid": "c417c47f-dcf4-400a-8201-3e39fcae8dd5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "24baa998-d1f8-422b-a6f4-40515f0ac8ad",
                  "name": "All Responses",
                  "uuid": "99545c8a-3db4-42cb-8bfe-689d3a8c0baf"
                },
                {
                  "exit_uuid": "cd682c06-e9e1-4571-b998-2ee785920aff",
                  "name": "guide1",
                  "uuid": "428b7a6b-9eeb-47da-b667-a386d85592c3"
                },
                {
                  "exit_uuid": "7acdc5f4-cf0e-4bae-b5f9-f9ba4942cf41",
                  "name": "guide2",
                  "uuid": "f8538146-df6a-45b1-8e30-ed29d1710d92"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "24baa998-d1f8-422b-a6f4-40515f0ac8ad",
                "destination_uuid": null
              },
              {
                "uuid": "cd682c06-e9e1-4571-b998-2ee785920aff",
                "destination_uuid": "88b177da-15c5-46f8-bf62-433dd8a61cd0"
              },
              {
                "uuid": "7acdc5f4-cf0e-4bae-b5f9-f9ba4942cf41",
                "destination_uuid": "142c1cdf-bb48-42cc-9d5b-cd903beb4823"
              }
            ]
          },
          {
            "uuid": "88b177da-15c5-46f8-bf62-433dd8a61cd0",
            "actions": [
              {
                "uuid": "4202314c-42ed-4432-af4e-7f237b64585f",
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
                "uuid": "7896f1ff-4a15-4856-a84f-b6d45095b79f",
                "destination_uuid": "5b34068f-be29-4583-9e52-3a7390dbc6ee"
              }
            ]
          },
          {
            "uuid": "142c1cdf-bb48-42cc-9d5b-cd903beb4823",
            "actions": [
              {
                "uuid": "e30a058e-6a90-40a6-b879-4419b32d6c52",
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
                "uuid": "56e8254e-1584-4fb2-825b-6595c90ea136",
                "destination_uuid": "5b34068f-be29-4583-9e52-3a7390dbc6ee"
              }
            ]
          },
          {
            "uuid": "5b34068f-be29-4583-9e52-3a7390dbc6ee",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I'm @fields.guide, and I have two teens – a boy and a girl. I'll be your guide.\n\nThis is how it works: You'll get a weekly session with stress-reducing activities for you, and effective tools for bringing up a teenager. In between, you'll get reminders for things to do together that improve family relationships.\n\nFor this week, let's start with a short introduction:",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4d7b2107-6227-474e-be6f-066a12986587"
              }
            ],
            "exits": [
              {
                "uuid": "098bba24-4364-4225-98b3-e8677b9ab7de",
                "destination_uuid": "3209e106-2486-49da-b2b8-a4b0ff30d72d"
              }
            ]
          },
          {
            "uuid": "3209e106-2486-49da-b2b8-a4b0ff30d72d",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "A daily stress-reducer can help us with parenting, and make us feel better.  Let's start with 30 seconds of relaxation for yourself. You deserve this! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "5595a7c9-bbb1-441b-87fa-a8503ca03db5"
              }
            ],
            "exits": [
              {
                "uuid": "df663f30-36cd-4fb5-9e91-bc9b037d00de",
                "destination_uuid": "554f2355-3531-4491-b7b9-95881844fa18"
              }
            ]
          },
          {
            "uuid": "554f2355-3531-4491-b7b9-95881844fa18",
            "actions": [
              {
                "flow": {
                  "name": "calm5",
                  "uuid": "bb6ab2b9-f3c8-42cd-b27d-941401e31129"
                },
                "type": "enter_flow",
                "uuid": "42d9533c-7a1d-40dd-bb3b-225f86ec6efe"
              }
            ],
            "exits": [
              {
                "uuid": "83a2c5cf-2ac0-476f-b5cb-21deea92b318",
                "destination_uuid": "e5df77ec-5817-4f41-92f0-e7b8eae02f33"
              },
              {
                "uuid": "e8085186-a45f-482e-842f-7f2b73ee08a0",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "98730303-e816-4779-a613-2451fd20d1f3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "79ceed4d-5a3f-4f0e-826c-fbbfdfc851ed"
                },
                {
                  "uuid": "13dda885-79ed-44c3-b67e-0608fa1c306a",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "54e7b8b2-3cba-49f2-9891-acab958c418f"
                }
              ],
              "categories": [
                {
                  "uuid": "79ceed4d-5a3f-4f0e-826c-fbbfdfc851ed",
                  "name": "Complete",
                  "exit_uuid": "83a2c5cf-2ac0-476f-b5cb-21deea92b318"
                },
                {
                  "uuid": "54e7b8b2-3cba-49f2-9891-acab958c418f",
                  "name": "Expired",
                  "exit_uuid": "e8085186-a45f-482e-842f-7f2b73ee08a0"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "79ceed4d-5a3f-4f0e-826c-fbbfdfc851ed"
            }
          },
          {
            "uuid": "e5df77ec-5817-4f41-92f0-e7b8eae02f33",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relaxation activity https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "40afef01-c248-4c63-9824-beb942639cbb"
              }
            ],
            "exits": [
              {
                "uuid": "fd299c6f-586e-42ab-9746-03d6c590d575",
                "destination_uuid": "aa8ef95e-b082-40a5-aa5d-3668acd66d10"
              }
            ]
          },
          {
            "uuid": "aa8ef95e-b082-40a5-aa5d-3668acd66d10",
            "actions": [],
            "exits": [
              {
                "uuid": "6f69a083-290a-473c-aa3d-81aae6db0f00",
                "destination_uuid": "e7b346e9-d8ef-4b7c-b46e-5a6aa637d592"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ef1b063b-de18-4526-904e-f65e0be3d133",
              "cases": [],
              "categories": [
                {
                  "uuid": "ef1b063b-de18-4526-904e-f65e0be3d133",
                  "name": "All Responses",
                  "exit_uuid": "6f69a083-290a-473c-aa3d-81aae6db0f00"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "dailycalm"
            }
          },
          {
            "uuid": "e7b346e9-d8ef-4b7c-b46e-5a6aa637d592",
            "actions": [
              {
                "uuid": "d962711e-c47e-4ce6-92f6-cabd0340d408",
                "type": "set_contact_field",
                "field": {
                  "key": "dailycalm",
                  "name": "dailycalm"
                },
                "value": "@results.dailycalm"
              }
            ],
            "exits": [
              {
                "uuid": "48462b36-e6bb-4d07-802e-844742e42af5",
                "destination_uuid": "db78583b-2468-46c7-b9be-84e85b68e978"
              }
            ]
          },
          {
            "uuid": "db78583b-2468-46c7-b9be-84e85b68e978",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens can make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud. Can you think of one thing that your teenager has done recently that you want them to do more of? This can be even a small thing such as \n- came home on time   \n- said something nice to someone at home  \n- smiled \n\nNext time you see your teenager, tell them how much you appreciated that thing.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "6fad3d86-2076-4ce6-aac5-3351d3618364"
              }
            ],
            "exits": [
              {
                "uuid": "c3d750ef-8d22-40e6-bbcb-454276c64064",
                "destination_uuid": "294aa0b6-c67f-4ebd-b20b-93891b4d061e"
              }
            ]
          },
          {
            "uuid": "294aa0b6-c67f-4ebd-b20b-93891b4d061e",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will make the app work better for you: ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "dd5a922e-e492-46ed-8d68-b9671e2ae9a9"
              }
            ],
            "exits": [
              {
                "uuid": "bf3dc940-57d0-451b-a1e0-a69be3316cdb",
                "destination_uuid": "52ae9d42-d573-461c-be9b-eea6b69b10bc"
              }
            ]
          },
          {
            "uuid": "52ae9d42-d573-461c-be9b-eea6b69b10bc",
            "actions": [
              {
                "flow": {
                  "name": "Welcome_Survey",
                  "uuid": "56cc3f6b-dddc-439d-acb9-df4211c23229"
                },
                "type": "enter_flow",
                "uuid": "f21879e0-92a2-44c3-8598-744d0c390b61"
              }
            ],
            "exits": [
              {
                "uuid": "4cd8e0c9-2cc0-4c23-9895-fc8e8c036468",
                "destination_uuid": null
              },
              {
                "uuid": "fe9acd3a-baf6-42de-b9aa-1c584221aea2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "91339272-eba5-4bae-86ca-cb5269f80e05",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "5f857b3c-383e-4703-885f-046508be419a"
                },
                {
                  "uuid": "5367d1c1-5a26-4b43-8aa4-a7f170162bf0",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "c83f7952-773b-432d-931b-600962732aa7"
                }
              ],
              "categories": [
                {
                  "uuid": "5f857b3c-383e-4703-885f-046508be419a",
                  "name": "Complete",
                  "exit_uuid": "4cd8e0c9-2cc0-4c23-9895-fc8e8c036468"
                },
                {
                  "uuid": "c83f7952-773b-432d-931b-600962732aa7",
                  "name": "Expired",
                  "exit_uuid": "fe9acd3a-baf6-42de-b9aa-1c584221aea2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "5f857b3c-383e-4703-885f-046508be419a"
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
        "name": "Welcome_Survey",
        "uuid": "6951d3ee-0c75-4140-9bb0-78ba59d16508",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "6770324a-d934-46e5-8f74-dd7e37158f08",
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
                "uuid": "1f1cfdad-fca6-414b-a10a-19927a248c60"
              }
            ],
            "exits": [
              {
                "uuid": "45688504-38f1-455b-afac-4d72bb05b8f5",
                "destination_uuid": "81864d91-8304-4b04-9a5d-17eebfda73b0"
              }
            ]
          },
          {
            "uuid": "81864d91-8304-4b04-9a5d-17eebfda73b0",
            "actions": [],
            "exits": [
              {
                "uuid": "4a22cca8-049f-4448-bff5-f6fac90bc080",
                "destination_uuid": "a387c74f-b1fc-4c7f-a83d-041f2ba14161"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d2a93361-ba57-42e1-acdf-669c12763c43",
              "cases": [],
              "categories": [
                {
                  "uuid": "d2a93361-ba57-42e1-acdf-669c12763c43",
                  "name": "All Responses",
                  "exit_uuid": "4a22cca8-049f-4448-bff5-f6fac90bc080"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcomesurvey_q1"
            }
          },
          {
            "uuid": "a387c74f-b1fc-4c7f-a83d-041f2ba14161",
            "actions": [
              {
                "uuid": "dbf0a40c-487b-438a-a06a-7b9272acd282",
                "type": "set_contact_field",
                "field": {
                  "key": "welcomesurvey_q1",
                  "name": "welcomesurvey_q1"
                },
                "value": "@results.welcomesurvey_q1"
              }
            ],
            "exits": [
              {
                "uuid": "fb74b2ea-d55c-4b56-98bf-7d367fe3d276",
                "destination_uuid": "5f82a664-8ed3-4629-bccc-bbede196f0e4"
              }
            ]
          },
          {
            "uuid": "5f82a664-8ed3-4629-bccc-bbede196f0e4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "4250085d-1be0-4090-8acc-6f8f833b5fb4",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "36da6fa6-644b-420c-9caa-9ce7c10e9a4e",
                  "type": "has_only_phrase",
                  "uuid": "57abbab6-75de-4280-bd60-ef2b3a828ddc"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "36da6fa6-644b-420c-9caa-9ce7c10e9a4e",
                  "type": "has_only_phrase",
                  "uuid": "5dae504d-c125-4336-ac5d-997a00ff1f39"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "36da6fa6-644b-420c-9caa-9ce7c10e9a4e",
                  "type": "has_only_phrase",
                  "uuid": "8aae96b3-02ee-4bdd-8c9a-014576bf4c34"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "36da6fa6-644b-420c-9caa-9ce7c10e9a4e",
                  "type": "has_only_phrase",
                  "uuid": "977ed9ee-4f35-46ce-86fe-2d40021161ad"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "7766fd6f-3f76-48af-9f7b-8b93bae86158",
                  "type": "has_only_phrase",
                  "uuid": "b0345155-cbab-4c38-9f95-f46840ab6e8f"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "7766fd6f-3f76-48af-9f7b-8b93bae86158",
                  "type": "has_only_phrase",
                  "uuid": "4dc2e130-034c-4d5f-b9c0-fb507041aa15"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "7766fd6f-3f76-48af-9f7b-8b93bae86158",
                  "type": "has_only_phrase",
                  "uuid": "ee1dc199-4e17-413f-be48-2519ba5fdaf2"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "7766fd6f-3f76-48af-9f7b-8b93bae86158",
                  "type": "has_only_phrase",
                  "uuid": "f4089351-9e03-4a5d-9fac-61dd2b1d5cb8"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "c4ccc6a3-08f2-4fd5-b6b7-8382c8596bd1",
                  "name": "All Responses",
                  "uuid": "4250085d-1be0-4090-8acc-6f8f833b5fb4"
                },
                {
                  "exit_uuid": "099b082e-e449-409d-ace6-f349093da2c1",
                  "name": "0;1;2;3",
                  "uuid": "36da6fa6-644b-420c-9caa-9ce7c10e9a4e"
                },
                {
                  "exit_uuid": "9b0ae6c1-e440-4797-8bfb-cff659f54466",
                  "name": "4;5;6;7",
                  "uuid": "7766fd6f-3f76-48af-9f7b-8b93bae86158"
                }
              ],
              "operand": "@fields.welcomesurvey_q1"
            },
            "exits": [
              {
                "uuid": "c4ccc6a3-08f2-4fd5-b6b7-8382c8596bd1",
                "destination_uuid": null
              },
              {
                "uuid": "099b082e-e449-409d-ace6-f349093da2c1",
                "destination_uuid": "1b99d421-206b-4d0c-a305-b28cc5cb3202"
              },
              {
                "uuid": "9b0ae6c1-e440-4797-8bfb-cff659f54466",
                "destination_uuid": "5ffeeb72-b08b-4c4b-9f95-191e18d97e3f"
              }
            ]
          },
          {
            "uuid": "1b99d421-206b-4d0c-a305-b28cc5cb3202",
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
                "uuid": "778843ad-a6bc-4980-8ef2-623c178b1740"
              }
            ],
            "exits": [
              {
                "uuid": "2012eeda-127c-41ed-b897-ca01b9356528",
                "destination_uuid": "4ce3c03d-166a-4f0c-8ce9-4b93d4bb9947"
              }
            ]
          },
          {
            "uuid": "5ffeeb72-b08b-4c4b-9f95-191e18d97e3f",
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
                "uuid": "f344e848-4e7d-4041-ae15-aa9e031df17a"
              }
            ],
            "exits": [
              {
                "uuid": "dbf09db9-e0bf-460b-b73e-ea4486f4a82e",
                "destination_uuid": "4ce3c03d-166a-4f0c-8ce9-4b93d4bb9947"
              }
            ]
          },
          {
            "uuid": "4ce3c03d-166a-4f0c-8ce9-4b93d4bb9947",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "44a08cff-1d98-4217-b45e-d5636f153da8",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "e7d7e459-2a06-4925-ab4c-362dbe02abcd",
                  "type": "has_only_phrase",
                  "uuid": "6b7f8d17-b032-45b8-9e62-0322c10d8b02"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d80351e5-addc-4b46-9ff8-5e8a5956d46a",
                  "name": "All Responses",
                  "uuid": "44a08cff-1d98-4217-b45e-d5636f153da8"
                },
                {
                  "exit_uuid": "fe5f133b-b2de-4b02-add1-48905c932eca",
                  "name": "Next",
                  "uuid": "e7d7e459-2a06-4925-ab4c-362dbe02abcd"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d80351e5-addc-4b46-9ff8-5e8a5956d46a",
                "destination_uuid": null
              },
              {
                "uuid": "fe5f133b-b2de-4b02-add1-48905c932eca",
                "destination_uuid": "d76b72ea-7037-4764-b289-6d5cab285e5b"
              }
            ]
          },
          {
            "uuid": "d76b72ea-7037-4764-b289-6d5cab285e5b",
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
                "uuid": "987ab42d-5efc-4b16-aeed-e304c8eca83f"
              }
            ],
            "exits": [
              {
                "uuid": "e2389dba-e7b2-41b3-95f6-e564f77e15b5",
                "destination_uuid": "78389fb3-0c44-47a2-a111-cb1a37553df6"
              }
            ]
          },
          {
            "uuid": "78389fb3-0c44-47a2-a111-cb1a37553df6",
            "actions": [],
            "exits": [
              {
                "uuid": "93811f7a-86fd-4826-b780-48defe98cabf",
                "destination_uuid": "6909397f-a1be-4f69-be8e-83a4425b0d4d"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "de0f867c-b27d-48c2-952b-79500ba164ae",
              "cases": [],
              "categories": [
                {
                  "uuid": "de0f867c-b27d-48c2-952b-79500ba164ae",
                  "name": "All Responses",
                  "exit_uuid": "93811f7a-86fd-4826-b780-48defe98cabf"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcomesurvey_q2"
            }
          },
          {
            "uuid": "6909397f-a1be-4f69-be8e-83a4425b0d4d",
            "actions": [
              {
                "uuid": "a8ffe929-0d6b-4e4c-b761-1fc726d8a791",
                "type": "set_contact_field",
                "field": {
                  "key": "welcomesurvey_q2",
                  "name": "welcomesurvey_q2"
                },
                "value": "@results.welcomesurvey_q2"
              }
            ],
            "exits": [
              {
                "uuid": "8feb46fd-b36d-40c0-96b5-7404f846a61e",
                "destination_uuid": "bdb87f5c-bf4a-4fd2-ae4c-7af7f38aa482"
              }
            ]
          },
          {
            "uuid": "bdb87f5c-bf4a-4fd2-ae4c-7af7f38aa482",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c2183063-ac3a-43aa-9142-9044f8d6d533",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "da62533a-492d-4fe9-9067-48673d9f09ec",
                  "type": "has_only_phrase",
                  "uuid": "88094e04-e79d-443b-b905-e4a40721efa8"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "da62533a-492d-4fe9-9067-48673d9f09ec",
                  "type": "has_only_phrase",
                  "uuid": "bc63ce6a-989a-4bf5-9174-0e10ede687a9"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "da62533a-492d-4fe9-9067-48673d9f09ec",
                  "type": "has_only_phrase",
                  "uuid": "5fd4b5b5-6ae5-401b-8651-e9f170a4ee99"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "da62533a-492d-4fe9-9067-48673d9f09ec",
                  "type": "has_only_phrase",
                  "uuid": "1f8d47d5-8b83-4280-8db2-f74a2ab510bc"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "da62533a-492d-4fe9-9067-48673d9f09ec",
                  "type": "has_only_phrase",
                  "uuid": "c2784d0d-4774-4107-a19d-839d57b4be07"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "e058b13d-870e-45da-860d-9dac23951858",
                  "type": "has_only_phrase",
                  "uuid": "dd91832d-3404-473f-b082-9c86794d15b4"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "e058b13d-870e-45da-860d-9dac23951858",
                  "type": "has_only_phrase",
                  "uuid": "f78a8e6e-d741-4f83-b6a4-090bb7037354"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "e058b13d-870e-45da-860d-9dac23951858",
                  "type": "has_only_phrase",
                  "uuid": "0a643ad7-b86e-4e53-8684-00a514dbb01e"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "e058b13d-870e-45da-860d-9dac23951858",
                  "type": "has_only_phrase",
                  "uuid": "efb367a1-3352-4a2b-a2f5-3ed0362b8be6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "25883821-6533-4bc7-a799-c410defccc0e",
                  "name": "All Responses",
                  "uuid": "c2183063-ac3a-43aa-9142-9044f8d6d533"
                },
                {
                  "exit_uuid": "751c7c3e-91d4-4869-a32b-a6d541215cbd",
                  "name": "0;1;2;3;4",
                  "uuid": "da62533a-492d-4fe9-9067-48673d9f09ec"
                },
                {
                  "exit_uuid": "82b52008-ce72-4c17-9bf6-687bb7f3a446",
                  "name": "5;6;7;8",
                  "uuid": "e058b13d-870e-45da-860d-9dac23951858"
                }
              ],
              "operand": "@fields.welcomesurvey_q2"
            },
            "exits": [
              {
                "uuid": "25883821-6533-4bc7-a799-c410defccc0e",
                "destination_uuid": null
              },
              {
                "uuid": "751c7c3e-91d4-4869-a32b-a6d541215cbd",
                "destination_uuid": "8427b231-9fc2-4d06-9d21-bae672415b4d"
              },
              {
                "uuid": "82b52008-ce72-4c17-9bf6-687bb7f3a446",
                "destination_uuid": "c34986c5-5eef-4208-b91e-22333ea9ff8e"
              }
            ]
          },
          {
            "uuid": "8427b231-9fc2-4d06-9d21-bae672415b4d",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "d336461f-7241-42a0-b15f-50bd5426eba0"
              }
            ],
            "exits": [
              {
                "uuid": "1a377780-2f4f-4274-994a-0c51d4e84520",
                "destination_uuid": "c84b09c1-d163-402b-b251-e7e6bae36e64"
              }
            ]
          },
          {
            "uuid": "c34986c5-5eef-4208-b91e-22333ea9ff8e",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "30340511-f781-472e-902f-3f8a0822410b"
              }
            ],
            "exits": [
              {
                "uuid": "55846423-e7ca-4609-b524-5ebbf01d017d",
                "destination_uuid": "c84b09c1-d163-402b-b251-e7e6bae36e64"
              }
            ]
          },
          {
            "uuid": "c84b09c1-d163-402b-b251-e7e6bae36e64",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "08539be6-4f54-4b28-92c4-528f693dcb8c",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "4e62be1f-c494-427d-8a48-d2e9509276a4",
                  "type": "has_only_phrase",
                  "uuid": "88ccb450-9354-42cd-8c79-abf37ccaa30e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "5b64db04-f5d8-4a81-ae43-3333df7fb7ac",
                  "name": "All Responses",
                  "uuid": "08539be6-4f54-4b28-92c4-528f693dcb8c"
                },
                {
                  "exit_uuid": "9478b8ab-0b88-4a35-ae96-2e780a2a6b8b",
                  "name": "Next",
                  "uuid": "4e62be1f-c494-427d-8a48-d2e9509276a4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "5b64db04-f5d8-4a81-ae43-3333df7fb7ac",
                "destination_uuid": null
              },
              {
                "uuid": "9478b8ab-0b88-4a35-ae96-2e780a2a6b8b",
                "destination_uuid": "75531918-2271-47bf-a304-bc7a41c2c60f"
              }
            ]
          },
          {
            "uuid": "75531918-2271-47bf-a304-bc7a41c2c60f",
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
                "uuid": "7890ed84-4194-4037-9e4e-4a7c0f2ffc10"
              }
            ],
            "exits": [
              {
                "uuid": "6439f00e-65d0-4861-a121-bff0c05ffad4",
                "destination_uuid": "fd9b4769-b238-4504-9bf6-6c7bb0c0659c"
              }
            ]
          },
          {
            "uuid": "fd9b4769-b238-4504-9bf6-6c7bb0c0659c",
            "actions": [],
            "exits": [
              {
                "uuid": "86d75112-f6f7-443c-8f64-27c72afba577",
                "destination_uuid": "775f679e-aee9-4189-ba56-6e64f26be27e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "06c38a17-a5a7-4815-9ab1-5825bea387a2",
              "cases": [],
              "categories": [
                {
                  "uuid": "06c38a17-a5a7-4815-9ab1-5825bea387a2",
                  "name": "All Responses",
                  "exit_uuid": "86d75112-f6f7-443c-8f64-27c72afba577"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcomesurvey_q3"
            }
          },
          {
            "uuid": "775f679e-aee9-4189-ba56-6e64f26be27e",
            "actions": [
              {
                "uuid": "cc44aacf-3249-4a72-a47b-d234cbe867d3",
                "type": "set_contact_field",
                "field": {
                  "key": "welcomesurvey_q3",
                  "name": "welcomesurvey_q3"
                },
                "value": "@results.welcomesurvey_q3"
              }
            ],
            "exits": [
              {
                "uuid": "48aabdd5-dfd5-4f49-8ced-db59b793d4e6",
                "destination_uuid": "46731180-8c0e-4cb0-b07a-3b01a3e0b730"
              }
            ]
          },
          {
            "uuid": "46731180-8c0e-4cb0-b07a-3b01a3e0b730",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6d4c2254-5ac1-4cc0-b4a2-7d33dcecca1c",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "c7b0f474-246d-485d-ae10-8d3bd88cec39",
                  "type": "has_only_phrase",
                  "uuid": "a76ec00e-daa8-471e-a1d8-fdea1f8442c0"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "c7b0f474-246d-485d-ae10-8d3bd88cec39",
                  "type": "has_only_phrase",
                  "uuid": "70547724-514e-4e71-9777-8cdf135f78de"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "c7b0f474-246d-485d-ae10-8d3bd88cec39",
                  "type": "has_only_phrase",
                  "uuid": "f66d93c6-5152-437a-82b5-cc0e5c5d2cfa"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "ad62c4c8-3ccf-4204-b2fd-ac753b9aa703",
                  "type": "has_only_phrase",
                  "uuid": "3b9a841f-28c0-40dd-9d5a-0dadca0b6e8f"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "ad62c4c8-3ccf-4204-b2fd-ac753b9aa703",
                  "type": "has_only_phrase",
                  "uuid": "e0ab515a-5b39-41e3-81fd-3d03f9c5a107"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "ad62c4c8-3ccf-4204-b2fd-ac753b9aa703",
                  "type": "has_only_phrase",
                  "uuid": "f2a28b6b-5b89-4620-8796-805f75d1a13d"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "ad62c4c8-3ccf-4204-b2fd-ac753b9aa703",
                  "type": "has_only_phrase",
                  "uuid": "0ca77fc1-1355-4436-9ad2-307df497b217"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "ad62c4c8-3ccf-4204-b2fd-ac753b9aa703",
                  "type": "has_only_phrase",
                  "uuid": "219d5a3b-97a3-4edc-9249-e7e9272d70af"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "28fc7e84-b359-4237-97ec-d02f165529d9",
                  "name": "All Responses",
                  "uuid": "6d4c2254-5ac1-4cc0-b4a2-7d33dcecca1c"
                },
                {
                  "exit_uuid": "51734d93-c33d-492c-8f17-e08577ea18fb",
                  "name": "0;1;2",
                  "uuid": "c7b0f474-246d-485d-ae10-8d3bd88cec39"
                },
                {
                  "exit_uuid": "83344547-8634-4fca-b90a-208ed91e48cb",
                  "name": "3;4;5;6;7",
                  "uuid": "ad62c4c8-3ccf-4204-b2fd-ac753b9aa703"
                }
              ],
              "operand": "@fields.welcomesurvey_q3"
            },
            "exits": [
              {
                "uuid": "28fc7e84-b359-4237-97ec-d02f165529d9",
                "destination_uuid": null
              },
              {
                "uuid": "51734d93-c33d-492c-8f17-e08577ea18fb",
                "destination_uuid": "e05bab82-442c-47a8-a4e9-92fe3f494c76"
              },
              {
                "uuid": "83344547-8634-4fca-b90a-208ed91e48cb",
                "destination_uuid": "7df19eb0-61bc-4d87-8f6b-f93854b446b3"
              }
            ]
          },
          {
            "uuid": "e05bab82-442c-47a8-a4e9-92fe3f494c76",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6770c4b3-816c-41aa-9406-45286207e9d6"
              }
            ],
            "exits": [
              {
                "uuid": "b2db1288-0934-42b5-82e0-f26baa882798",
                "destination_uuid": "71fd2c5a-533a-4697-b48d-a8671a887f3a"
              }
            ]
          },
          {
            "uuid": "7df19eb0-61bc-4d87-8f6b-f93854b446b3",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "3a0de6c7-484f-4f76-9aff-eed95613f549"
              }
            ],
            "exits": [
              {
                "uuid": "857b79dd-9008-4474-bb45-98d0de9d2dcf",
                "destination_uuid": "71fd2c5a-533a-4697-b48d-a8671a887f3a"
              }
            ]
          },
          {
            "uuid": "71fd2c5a-533a-4697-b48d-a8671a887f3a",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "35c86e31-114e-4e28-be26-082a9dfbd155",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "cf0abfac-a8e4-4498-a429-d7ff1d6f9002",
                  "type": "has_only_phrase",
                  "uuid": "ddcdc4c1-97be-4f31-8249-dbb4ee274c9a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6194514a-097f-4026-9233-1f8f9e914ac4",
                  "name": "All Responses",
                  "uuid": "35c86e31-114e-4e28-be26-082a9dfbd155"
                },
                {
                  "exit_uuid": "71b08fd4-5316-41ea-8390-2698e83b9e59",
                  "name": "Next",
                  "uuid": "cf0abfac-a8e4-4498-a429-d7ff1d6f9002"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6194514a-097f-4026-9233-1f8f9e914ac4",
                "destination_uuid": null
              },
              {
                "uuid": "71b08fd4-5316-41ea-8390-2698e83b9e59",
                "destination_uuid": "9279ba99-50ec-4487-8c4a-c2f7ed6d3dbd"
              }
            ]
          },
          {
            "uuid": "9279ba99-50ec-4487-8c4a-c2f7ed6d3dbd",
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
                "uuid": "ef56b0a1-bf2c-42ae-beab-dafda629f2e0"
              }
            ],
            "exits": [
              {
                "uuid": "0b850980-516b-4af8-b840-1b5a96b48650",
                "destination_uuid": "53fcbb23-de27-4638-8933-57efd2aa4a97"
              }
            ]
          },
          {
            "uuid": "53fcbb23-de27-4638-8933-57efd2aa4a97",
            "actions": [],
            "exits": [
              {
                "uuid": "b60b9037-6982-4def-b8ac-b05af0039b4f",
                "destination_uuid": "8e91a047-66d6-499b-b90a-518f7c368f2e"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "1d72d968-2214-41fe-a1f1-4295adc9ed32",
              "cases": [],
              "categories": [
                {
                  "uuid": "1d72d968-2214-41fe-a1f1-4295adc9ed32",
                  "name": "All Responses",
                  "exit_uuid": "b60b9037-6982-4def-b8ac-b05af0039b4f"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcomesurvey_q4"
            }
          },
          {
            "uuid": "8e91a047-66d6-499b-b90a-518f7c368f2e",
            "actions": [
              {
                "uuid": "f9cfcdbe-6113-4a76-84d8-a9a93409c455",
                "type": "set_contact_field",
                "field": {
                  "key": "welcomesurvey_q4",
                  "name": "welcomesurvey_q4"
                },
                "value": "@results.welcomesurvey_q4"
              }
            ],
            "exits": [
              {
                "uuid": "1cab9f92-3140-40a7-8b88-f4c312e98956",
                "destination_uuid": "f3058942-4388-42be-9ba1-39e7f6045793"
              }
            ]
          },
          {
            "uuid": "f3058942-4388-42be-9ba1-39e7f6045793",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "ed517a40-f927-448f-83f6-0eb439e712ef",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "bf988b8d-3041-4015-836c-3896d5980159",
                  "type": "has_only_phrase",
                  "uuid": "87383e8c-7d3c-42a9-a019-8173157449c4"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "bf988b8d-3041-4015-836c-3896d5980159",
                  "type": "has_only_phrase",
                  "uuid": "a0b14a4d-f8ad-429f-af49-2e45fa2b780e"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "0a8edfa3-39a5-4b9d-a9d2-ee462eea4c6b",
                  "type": "has_only_phrase",
                  "uuid": "2ab72b00-2389-4117-b497-a3e84e949e80"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "0a8edfa3-39a5-4b9d-a9d2-ee462eea4c6b",
                  "type": "has_only_phrase",
                  "uuid": "69bc493a-245b-45b7-86be-b33c110d3895"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "0a8edfa3-39a5-4b9d-a9d2-ee462eea4c6b",
                  "type": "has_only_phrase",
                  "uuid": "0ce31599-946a-407d-9c41-4145bff148da"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "0a8edfa3-39a5-4b9d-a9d2-ee462eea4c6b",
                  "type": "has_only_phrase",
                  "uuid": "21824073-3424-436b-bfdc-18f5ac2b1556"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "0a8edfa3-39a5-4b9d-a9d2-ee462eea4c6b",
                  "type": "has_only_phrase",
                  "uuid": "2f0d05c5-ad5c-419b-8959-41c89949a368"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "0a8edfa3-39a5-4b9d-a9d2-ee462eea4c6b",
                  "type": "has_only_phrase",
                  "uuid": "b0708965-699c-4938-a93a-a3b011b04682"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2d82bb86-4135-4bf9-9f93-18fbde093a5e",
                  "name": "All Responses",
                  "uuid": "ed517a40-f927-448f-83f6-0eb439e712ef"
                },
                {
                  "exit_uuid": "2777994a-9365-40c1-b2e8-45ed8956bc23",
                  "name": "0;1",
                  "uuid": "bf988b8d-3041-4015-836c-3896d5980159"
                },
                {
                  "exit_uuid": "01021819-a225-402f-bddb-9bf282ca640d",
                  "name": "2;3;4;5;6;7",
                  "uuid": "0a8edfa3-39a5-4b9d-a9d2-ee462eea4c6b"
                }
              ],
              "operand": "@fields.welcomesurvey_q4"
            },
            "exits": [
              {
                "uuid": "2d82bb86-4135-4bf9-9f93-18fbde093a5e",
                "destination_uuid": null
              },
              {
                "uuid": "2777994a-9365-40c1-b2e8-45ed8956bc23",
                "destination_uuid": "8d7d0c46-f6f2-461a-bb3b-54ada3a8c9d2"
              },
              {
                "uuid": "01021819-a225-402f-bddb-9bf282ca640d",
                "destination_uuid": "78302176-d6ed-470f-8363-ecfa379b51a9"
              }
            ]
          },
          {
            "uuid": "8d7d0c46-f6f2-461a-bb3b-54ada3a8c9d2",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "4bb8803e-575d-4ffd-8245-a54d57079a23"
              }
            ],
            "exits": [
              {
                "uuid": "d0d70faf-91e9-4c4e-91f8-a0f624792ee1",
                "destination_uuid": "1ad53b85-e74f-4ce7-bfe9-c6c8ad6c202b"
              }
            ]
          },
          {
            "uuid": "78302176-d6ed-470f-8363-ecfa379b51a9",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "ef2e7395-9307-46f3-8d52-2fee77e91e54"
              }
            ],
            "exits": [
              {
                "uuid": "5e3e76bd-780c-42dd-ab6d-0b71c3f3e28b",
                "destination_uuid": "1ad53b85-e74f-4ce7-bfe9-c6c8ad6c202b"
              }
            ]
          },
          {
            "uuid": "1ad53b85-e74f-4ce7-bfe9-c6c8ad6c202b",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "e334e78b-d4df-4f5c-b036-103002867003",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "456b2d58-b4ba-4b65-bc90-5bbe309f2425",
                  "type": "has_only_phrase",
                  "uuid": "b3832784-2713-4539-8a40-75579ada5c34"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "7e9774a3-6972-4ee9-b19b-564fbe94355a",
                  "name": "All Responses",
                  "uuid": "e334e78b-d4df-4f5c-b036-103002867003"
                },
                {
                  "exit_uuid": "06d6700f-01dc-4367-928e-7afdad988059",
                  "name": "Next",
                  "uuid": "456b2d58-b4ba-4b65-bc90-5bbe309f2425"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "7e9774a3-6972-4ee9-b19b-564fbe94355a",
                "destination_uuid": null
              },
              {
                "uuid": "06d6700f-01dc-4367-928e-7afdad988059",
                "destination_uuid": "759813f2-173a-48d2-b3ef-6545cabc3a8f"
              }
            ]
          },
          {
            "uuid": "759813f2-173a-48d2-b3ef-6545cabc3a8f",
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
                "uuid": "88f729fd-af17-48bc-bcd4-afd68d679652"
              }
            ],
            "exits": [
              {
                "uuid": "02fa10cc-fd6c-4700-9524-7bd06cade36a",
                "destination_uuid": "415359e8-503d-418d-bb7b-abf853e66145"
              }
            ]
          },
          {
            "uuid": "415359e8-503d-418d-bb7b-abf853e66145",
            "actions": [],
            "exits": [
              {
                "uuid": "7aec5241-a890-4572-b21d-4917f27a26eb",
                "destination_uuid": "05c0b91b-e881-4dee-bf58-9864d6525ff7"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "eaca577e-463e-4bb0-912e-75d892ff3a73",
              "cases": [],
              "categories": [
                {
                  "uuid": "eaca577e-463e-4bb0-912e-75d892ff3a73",
                  "name": "All Responses",
                  "exit_uuid": "7aec5241-a890-4572-b21d-4917f27a26eb"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcomesurvey_q5"
            }
          },
          {
            "uuid": "05c0b91b-e881-4dee-bf58-9864d6525ff7",
            "actions": [
              {
                "uuid": "f4f62992-478b-45a6-bc22-5b79bb1ceea3",
                "type": "set_contact_field",
                "field": {
                  "key": "welcomesurvey_q5",
                  "name": "welcomesurvey_q5"
                },
                "value": "@results.welcomesurvey_q5"
              }
            ],
            "exits": [
              {
                "uuid": "ff1ed1ef-b9a4-49a7-b685-abd25538dd30",
                "destination_uuid": "ecd49f44-ad5f-4c35-a21a-d1145247fa32"
              }
            ]
          },
          {
            "uuid": "ab1c9147-e5c2-4400-887f-499c36ac4a41",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "007495ed-fe48-4e19-bce8-6f0cd76b40e6"
              }
            ],
            "exits": [
              {
                "uuid": "8e8919ea-bbb1-416d-b664-358980519f06",
                "destination_uuid": "c904ee0a-228d-4aef-b00e-2e812f63d49e"
              }
            ]
          },
          {
            "uuid": "ecd49f44-ad5f-4c35-a21a-d1145247fa32",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "f5eaa052-d0b2-4e1d-9beb-b93c2202b8b9",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "338ca9a2-941c-4b10-a807-fb89178e105e",
                  "type": "has_only_phrase",
                  "uuid": "20cd70d9-95f8-4c09-a74f-7c8519b44534"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "338ca9a2-941c-4b10-a807-fb89178e105e",
                  "type": "has_only_phrase",
                  "uuid": "fac34e97-2355-4ab6-a827-dad477bdc0a8"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "338ca9a2-941c-4b10-a807-fb89178e105e",
                  "type": "has_only_phrase",
                  "uuid": "33adb4af-2b94-42c4-87cf-1599217815d3"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "338ca9a2-941c-4b10-a807-fb89178e105e",
                  "type": "has_only_phrase",
                  "uuid": "f9f7fd08-0378-4d9a-bc13-a618bd25ca7f"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "338ca9a2-941c-4b10-a807-fb89178e105e",
                  "type": "has_only_phrase",
                  "uuid": "584bf540-6168-4125-973f-cd35ac235802"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "338ca9a2-941c-4b10-a807-fb89178e105e",
                  "type": "has_only_phrase",
                  "uuid": "d0cd0aab-2fa8-498a-a82e-7e5a48c45a74"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "338ca9a2-941c-4b10-a807-fb89178e105e",
                  "type": "has_only_phrase",
                  "uuid": "8da27c1d-dca7-4834-8d71-a7af6b305e5a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d88db99d-f598-4835-8f3c-bcaca7e03d4b",
                  "name": "All Responses",
                  "uuid": "f5eaa052-d0b2-4e1d-9beb-b93c2202b8b9"
                },
                {
                  "exit_uuid": "5412fa88-fbf4-4003-b45a-6f1e20accb64",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "338ca9a2-941c-4b10-a807-fb89178e105e"
                }
              ],
              "operand": "@fields.welcomesurvey_q5"
            },
            "exits": [
              {
                "uuid": "d88db99d-f598-4835-8f3c-bcaca7e03d4b",
                "destination_uuid": "ab1c9147-e5c2-4400-887f-499c36ac4a41"
              },
              {
                "uuid": "5412fa88-fbf4-4003-b45a-6f1e20accb64",
                "destination_uuid": "df0de3f1-8915-4d74-8051-b64f271c2624"
              }
            ]
          },
          {
            "uuid": "df0de3f1-8915-4d74-8051-b64f271c2624",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "fede69af-88c1-469c-a1ad-57fd2263cb26"
              }
            ],
            "exits": [
              {
                "uuid": "6ddedc14-ad04-4a40-abdd-64d88bb3fce8",
                "destination_uuid": "c904ee0a-228d-4aef-b00e-2e812f63d49e"
              }
            ]
          },
          {
            "uuid": "c904ee0a-228d-4aef-b00e-2e812f63d49e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "16cdd83f-2213-4677-9975-375ced980ed7",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "a348e2e2-fb79-4a76-8dac-b56460922e45",
                  "type": "has_only_phrase",
                  "uuid": "689ea322-5fbd-481d-8b06-6dd8c5dec25a"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f80760ad-f1ed-4de7-a073-32ef7b3876bc",
                  "name": "All Responses",
                  "uuid": "16cdd83f-2213-4677-9975-375ced980ed7"
                },
                {
                  "exit_uuid": "b08c8c4c-bf2b-4bb5-bedc-10d131e14da3",
                  "name": "Next",
                  "uuid": "a348e2e2-fb79-4a76-8dac-b56460922e45"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f80760ad-f1ed-4de7-a073-32ef7b3876bc",
                "destination_uuid": null
              },
              {
                "uuid": "b08c8c4c-bf2b-4bb5-bedc-10d131e14da3",
                "destination_uuid": "e064000d-43dc-4786-ba12-a80d664111cf"
              }
            ]
          },
          {
            "uuid": "e064000d-43dc-4786-ba12-a80d664111cf",
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
                "uuid": "dbfa8491-a76a-444d-aa17-b02759151c2d"
              }
            ],
            "exits": [
              {
                "uuid": "3dc85511-59f5-4af5-9ae7-4adacd57caec",
                "destination_uuid": "73f0c59b-6464-42dc-9a96-1daa85c1774c"
              }
            ]
          },
          {
            "uuid": "73f0c59b-6464-42dc-9a96-1daa85c1774c",
            "actions": [],
            "exits": [
              {
                "uuid": "0da7dd82-fcf8-48c6-a459-b8a203e27843",
                "destination_uuid": "52c4d7cd-1241-4991-9899-e38f0abdd7bb"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "c6b7a492-e280-4b1b-9cfd-5cd2747795d2",
              "cases": [],
              "categories": [
                {
                  "uuid": "c6b7a492-e280-4b1b-9cfd-5cd2747795d2",
                  "name": "All Responses",
                  "exit_uuid": "0da7dd82-fcf8-48c6-a459-b8a203e27843"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "welcomesurvey_q6"
            }
          },
          {
            "uuid": "52c4d7cd-1241-4991-9899-e38f0abdd7bb",
            "actions": [
              {
                "uuid": "6ded2372-88c8-4699-9883-6adece9327a9",
                "type": "set_contact_field",
                "field": {
                  "key": "welcomesurvey_q6",
                  "name": "welcomesurvey_q6"
                },
                "value": "@results.welcomesurvey_q6"
              }
            ],
            "exits": [
              {
                "uuid": "17df6b59-edb0-466a-bad6-38b5d056cf72",
                "destination_uuid": "997f1781-16cf-40b5-b27d-d169217c8bb2"
              }
            ]
          },
          {
            "uuid": "997f1781-16cf-40b5-b27d-d169217c8bb2",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "6d27bd8b-540d-4f81-963e-483d107848ac",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "bb3cc493-eff8-43e1-87b2-1fa2c626abf2",
                  "type": "has_only_phrase",
                  "uuid": "ebf95b66-1328-4000-b5a1-44b66bf52e5f"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "bb3cc493-eff8-43e1-87b2-1fa2c626abf2",
                  "type": "has_only_phrase",
                  "uuid": "18497ed2-166c-496f-b67c-6d20c93a9b0d"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "bb3cc493-eff8-43e1-87b2-1fa2c626abf2",
                  "type": "has_only_phrase",
                  "uuid": "0757be2e-99cb-41e6-bc77-40a69f050e6b"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "bb3cc493-eff8-43e1-87b2-1fa2c626abf2",
                  "type": "has_only_phrase",
                  "uuid": "0a280414-2d1e-4196-adba-a10a962a7e6d"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "bb3cc493-eff8-43e1-87b2-1fa2c626abf2",
                  "type": "has_only_phrase",
                  "uuid": "96135d02-76f2-4aae-a4c9-c3597ddcf64b"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "c06cf865-67cf-41d6-895d-0f7521e6be62",
                  "type": "has_only_phrase",
                  "uuid": "43e547aa-cef7-4744-be56-4b8f4074b496"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "c06cf865-67cf-41d6-895d-0f7521e6be62",
                  "type": "has_only_phrase",
                  "uuid": "058217a1-beb5-4a0c-b174-b26f3e18a871"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "c06cf865-67cf-41d6-895d-0f7521e6be62",
                  "type": "has_only_phrase",
                  "uuid": "6d527878-d8b5-48d5-b117-315a4897ec0f"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "c06cf865-67cf-41d6-895d-0f7521e6be62",
                  "type": "has_only_phrase",
                  "uuid": "662aa90a-877f-4bf3-b7c0-56abf68ed74e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "58f6318f-6cba-4c32-b0e0-5785043bcdae",
                  "name": "All Responses",
                  "uuid": "6d27bd8b-540d-4f81-963e-483d107848ac"
                },
                {
                  "exit_uuid": "684ce507-d163-4437-a8cd-aec34a2082c1",
                  "name": "0;1;2;3;4",
                  "uuid": "bb3cc493-eff8-43e1-87b2-1fa2c626abf2"
                },
                {
                  "exit_uuid": "d529d186-405d-4b29-a8cf-95e5e3535741",
                  "name": "5;6;7;8",
                  "uuid": "c06cf865-67cf-41d6-895d-0f7521e6be62"
                }
              ],
              "operand": "@fields.welcomesurvey_q6"
            },
            "exits": [
              {
                "uuid": "58f6318f-6cba-4c32-b0e0-5785043bcdae",
                "destination_uuid": null
              },
              {
                "uuid": "684ce507-d163-4437-a8cd-aec34a2082c1",
                "destination_uuid": "b7ccfdf4-7eeb-476d-a62e-b83eaaf89be7"
              },
              {
                "uuid": "d529d186-405d-4b29-a8cf-95e5e3535741",
                "destination_uuid": "fe0132c1-6622-47ef-8a22-0615b91a53ac"
              }
            ]
          },
          {
            "uuid": "b7ccfdf4-7eeb-476d-a62e-b83eaaf89be7",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "75cbdf1b-6acb-4255-8388-5a630cb596e5"
              }
            ],
            "exits": [
              {
                "uuid": "bce87be8-981b-4e72-9b14-7adb61775a1b",
                "destination_uuid": "d7456ec5-8f53-4232-832f-e1be1e607a01"
              }
            ]
          },
          {
            "uuid": "fe0132c1-6622-47ef-8a22-0615b91a53ac",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "5ddef41c-140b-4769-9a5e-af4662422a8b"
              }
            ],
            "exits": [
              {
                "uuid": "7de1af40-7942-4b05-b2f2-5f9d0dff0498",
                "destination_uuid": "d7456ec5-8f53-4232-832f-e1be1e607a01"
              }
            ]
          },
          {
            "uuid": "d7456ec5-8f53-4232-832f-e1be1e607a01",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cc5267bd-0960-453b-b9e6-6567e25e751a",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "17aa37e7-34a5-46d1-9e2b-233fd2a4d2f5",
                  "type": "has_only_phrase",
                  "uuid": "f4a45386-a45a-4f1e-8e12-c91cdd6592d5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2b83b2e4-898c-420d-80c9-f2a15e581775",
                  "name": "All Responses",
                  "uuid": "cc5267bd-0960-453b-b9e6-6567e25e751a"
                },
                {
                  "exit_uuid": "9ec8a09a-4194-4e1b-aba5-da4b56b4df8c",
                  "name": "Next",
                  "uuid": "17aa37e7-34a5-46d1-9e2b-233fd2a4d2f5"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2b83b2e4-898c-420d-80c9-f2a15e581775",
                "destination_uuid": null
              },
              {
                "uuid": "9ec8a09a-4194-4e1b-aba5-da4b56b4df8c",
                "destination_uuid": "993917d1-795d-4fa1-8292-3eb9233348b2"
              }
            ]
          },
          {
            "uuid": "993917d1-795d-4fa1-8292-3eb9233348b2",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c289c8a7-00d1-48b2-96d8-9e5ab384ceb0"
              }
            ],
            "exits": [
              {
                "uuid": "938f62b0-5b03-43e7-8ce7-d2cd9e7d41e4",
                "destination_uuid": "deecc1e8-4ce7-4e4c-afea-0b18fe3eab6e"
              }
            ]
          },
          {
            "uuid": "deecc1e8-4ce7-4e4c-afea-0b18fe3eab6e",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "fc0d9979-9f7d-47ea-90e5-e71dbfde1c2a",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "fdb44433-e49d-4f8a-bb72-4b9f820bfaea",
                  "type": "has_only_phrase",
                  "uuid": "0344ced2-d70a-4cd8-ae7d-4a9715637d14"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "d103a2c7-e311-4ac0-969d-9e5357cc0db3",
                  "name": "All Responses",
                  "uuid": "fc0d9979-9f7d-47ea-90e5-e71dbfde1c2a"
                },
                {
                  "exit_uuid": "a1762fed-ed5a-4c8a-8ffc-bcd54d6a39bc",
                  "name": "Next",
                  "uuid": "fdb44433-e49d-4f8a-bb72-4b9f820bfaea"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "d103a2c7-e311-4ac0-969d-9e5357cc0db3",
                "destination_uuid": null
              },
              {
                "uuid": "a1762fed-ed5a-4c8a-8ffc-bcd54d6a39bc",
                "destination_uuid": "9605bfad-47c8-4871-a0f7-b3387af21518"
              }
            ]
          },
          {
            "uuid": "9605bfad-47c8-4871-a0f7-b3387af21518",
            "actions": [
              {
                "flow": {
                  "name": "ImmediateSupport",
                  "uuid": "60e33097-e2aa-474c-b36a-21bb653ebf87"
                },
                "type": "enter_flow",
                "uuid": "74f991cd-833b-4ee3-85ec-637ff7fa05f9"
              }
            ],
            "exits": [
              {
                "uuid": "831a1e27-f02e-4183-8390-b47e3272ef85",
                "destination_uuid": null
              },
              {
                "uuid": "b3c4a8d9-d126-4ab5-ad67-a050fbc71ca2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "9111f7ac-a4a0-47de-9acc-8217fb104840",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "233fcc62-7297-49a0-a03b-8eb1af9992d2"
                },
                {
                  "uuid": "0cb004ac-29a9-488a-98a8-7353d1d0bb56",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "90ea9aa7-7e1a-4ed6-b60c-6b1dcb6ca898"
                }
              ],
              "categories": [
                {
                  "uuid": "233fcc62-7297-49a0-a03b-8eb1af9992d2",
                  "name": "Complete",
                  "exit_uuid": "831a1e27-f02e-4183-8390-b47e3272ef85"
                },
                {
                  "uuid": "90ea9aa7-7e1a-4ed6-b60c-6b1dcb6ca898",
                  "name": "Expired",
                  "exit_uuid": "b3c4a8d9-d126-4ab5-ad67-a050fbc71ca2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "233fcc62-7297-49a0-a03b-8eb1af9992d2"
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
        "name": "ImmediateSupport",
        "uuid": "7264fe0b-0991-40e8-b403-6c3abf13d909",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "9c88134f-41b4-4951-a721-147e2efaba9f",
            "actions": [
              {
                "attachments": [],
                "text": "Could you choose one parenting goal that is important to you?",
                "type": "send_msg",
                "quick_replies": [
                  "I want to have a better relationship with my teen",
                  "I want my teen to behave better",
                  "I want to feel less stress loneliness or anger",
                  "I want to worry about money less",
                  "I want less conflict in my family",
                  "I want to know more about how to keep my teen safe online and offline",
                  "JML TO ADD DISABILITY OPTION "
                ],
                "uuid": "4c6747b2-2cf1-4690-a760-9d41141ff2c0"
              }
            ],
            "exits": [
              {
                "uuid": "174e1eb9-2a1c-481d-9d6d-36b59ee855e7",
                "destination_uuid": "507a52fa-b3d5-4bb3-bd74-b0780faaecfe"
              }
            ]
          },
          {
            "uuid": "507a52fa-b3d5-4bb3-bd74-b0780faaecfe",
            "actions": [],
            "exits": [
              {
                "uuid": "0133f033-5a37-482c-aed8-67ff1c3d3351",
                "destination_uuid": "70788435-332d-4b46-a8d8-8edde9535844"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "ec4bc557-6e7c-44da-9a88-a8b85189d88e",
              "cases": [],
              "categories": [
                {
                  "uuid": "ec4bc557-6e7c-44da-9a88-a8b85189d88e",
                  "name": "All Responses",
                  "exit_uuid": "0133f033-5a37-482c-aed8-67ff1c3d3351"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              },
              "result_name": "programmegoal"
            }
          },
          {
            "uuid": "70788435-332d-4b46-a8d8-8edde9535844",
            "actions": [
              {
                "uuid": "db14066f-055a-4c0d-9339-cc6bfac6dbcc",
                "type": "set_contact_field",
                "field": {
                  "key": "programmegoal",
                  "name": "programmegoal"
                },
                "value": "@results.programmegoal"
              }
            ],
            "exits": [
              {
                "uuid": "91ab85ca-36b5-46d9-991f-1204e1d5d8a8",
                "destination_uuid": "be2cfbdd-89cf-4c53-a39a-ee4a76c68379"
              }
            ]
          },
          {
            "uuid": "be2cfbdd-89cf-4c53-a39a-ee4a76c68379",
            "actions": [
              {
                "attachments": [],
                "text": "We know it can be hard to know what to do sometimes…",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "759bd950-1305-44ad-a2ef-4610b5b74fbf"
              }
            ],
            "exits": [
              {
                "uuid": "6f3ebf6d-4fdd-451c-ad45-3c2ea0033825",
                "destination_uuid": "63610fc8-5950-47b8-8608-4c117314b801"
              }
            ]
          },
          {
            "uuid": "63610fc8-5950-47b8-8608-4c117314b801",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b84661f0-0e52-438e-a0c3-bffb48dab729",
              "cases": [
                {
                  "arguments": [
                    "I want to have a better relationship with my teen"
                  ],
                  "category_uuid": "513a1e0f-42e1-46c5-b61a-55d0645d30c9",
                  "type": "has_only_phrase",
                  "uuid": "cda6ca60-bc81-4a87-9143-ace5af4fb6ab"
                },
                {
                  "arguments": [
                    "I want my teen to behave better"
                  ],
                  "category_uuid": "e65fe73d-8bf9-46ab-ad39-3b652537c8af",
                  "type": "has_only_phrase",
                  "uuid": "f8ffc832-2be2-4f8a-b63b-dc0297d426d1"
                },
                {
                  "arguments": [
                    "I want to feel less stress loneliness or anger"
                  ],
                  "category_uuid": "c5721a28-ec62-4120-8e5a-ba27f22a6a8a",
                  "type": "has_only_phrase",
                  "uuid": "75840f23-68b0-488a-a006-251ad263ee99"
                },
                {
                  "arguments": [
                    "I want to worry about money less"
                  ],
                  "category_uuid": "8e3cd837-2fea-40d7-82a1-8182660ac334",
                  "type": "has_only_phrase",
                  "uuid": "050341cf-aaf4-4ca2-84eb-de1f64fba5a5"
                },
                {
                  "arguments": [
                    "I want less conflict in my family"
                  ],
                  "category_uuid": "0936fcdb-83f3-42c4-9a9a-f966158f9348",
                  "type": "has_only_phrase",
                  "uuid": "93619cdf-2653-400f-8097-45280c58e8b1"
                },
                {
                  "arguments": [
                    "I want to know more about how to keep my teen safe online and offline"
                  ],
                  "category_uuid": "7623554d-dcbd-4873-8424-4025d264122d",
                  "type": "has_only_phrase",
                  "uuid": "afffea49-7c69-463f-bc9b-3eab0b59ac6c"
                },
                {
                  "arguments": [
                    "JML TO ADD DISABILITY OPTION "
                  ],
                  "category_uuid": "a2bec1d2-e684-48c3-9056-3ae9fafa323e",
                  "type": "has_only_phrase",
                  "uuid": "0c23bbe0-de23-418e-8222-bee904eba6c4"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1f136d64-d526-495e-b206-42b5d478d919",
                  "name": "All Responses",
                  "uuid": "b84661f0-0e52-438e-a0c3-bffb48dab729"
                },
                {
                  "exit_uuid": "40ca112c-0df8-4a7f-ad79-e36c4208ab2f",
                  "name": "I want to have a better relationship with my teen",
                  "uuid": "513a1e0f-42e1-46c5-b61a-55d0645d30c9"
                },
                {
                  "exit_uuid": "f6a0ba20-39e4-4c71-8988-9a0ad9ca5421",
                  "name": "I want my teen to behave better",
                  "uuid": "e65fe73d-8bf9-46ab-ad39-3b652537c8af"
                },
                {
                  "exit_uuid": "191ced57-4375-415a-b06a-5ba41a475d4f",
                  "name": "I want to feel less stress loneliness or anger",
                  "uuid": "c5721a28-ec62-4120-8e5a-ba27f22a6a8a"
                },
                {
                  "exit_uuid": "1d905acd-bfbe-436e-aec8-2554161f35f6",
                  "name": "I want to worry about money less",
                  "uuid": "8e3cd837-2fea-40d7-82a1-8182660ac334"
                },
                {
                  "exit_uuid": "6b5fe062-989c-4bd5-ba82-8c801772a0f6",
                  "name": "I want less conflict in my family",
                  "uuid": "0936fcdb-83f3-42c4-9a9a-f966158f9348"
                },
                {
                  "exit_uuid": "e248f718-434d-4b84-be0d-26c862f86bfa",
                  "name": "I want to know more about how to keep my teen safe online and offline",
                  "uuid": "7623554d-dcbd-4873-8424-4025d264122d"
                },
                {
                  "exit_uuid": "4e78e201-2338-4e36-85f4-cbbb1405200b",
                  "name": "JML TO ADD DISABILITY OPTION ",
                  "uuid": "a2bec1d2-e684-48c3-9056-3ae9fafa323e"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "1f136d64-d526-495e-b206-42b5d478d919",
                "destination_uuid": null
              },
              {
                "uuid": "40ca112c-0df8-4a7f-ad79-e36c4208ab2f",
                "destination_uuid": "efb3442e-92dc-4d6b-a24a-e51b9fe0594c"
              },
              {
                "uuid": "f6a0ba20-39e4-4c71-8988-9a0ad9ca5421",
                "destination_uuid": "1b451ca4-7e3b-458e-ba5b-2d2986c64d96"
              },
              {
                "uuid": "191ced57-4375-415a-b06a-5ba41a475d4f",
                "destination_uuid": "eac74cb9-503b-4bf3-9dc5-6de16cf3a8d9"
              },
              {
                "uuid": "1d905acd-bfbe-436e-aec8-2554161f35f6",
                "destination_uuid": "aaed9419-5124-4cef-9e63-6f0a25025197"
              },
              {
                "uuid": "6b5fe062-989c-4bd5-ba82-8c801772a0f6",
                "destination_uuid": "5a1689bd-5dd1-4d28-929a-bac7ed45b589"
              },
              {
                "uuid": "e248f718-434d-4b84-be0d-26c862f86bfa",
                "destination_uuid": "33539a9d-93d9-4237-9f70-57bbf364d6b2"
              },
              {
                "uuid": "4e78e201-2338-4e36-85f4-cbbb1405200b",
                "destination_uuid": "2e181e7b-5865-4e30-b602-67177aa26f89"
              }
            ]
          },
          {
            "uuid": "efb3442e-92dc-4d6b-a24a-e51b9fe0594c",
            "actions": [
              {
                "attachments": [],
                "text": "Spending time with your teen is free and even 10 minutes a day helps build trust. Try asking your teen what they would like to do together. It can be fun and relaxing for you too! \n\n",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "ded79a91-1f13-4ed7-9c8f-655a5f2beecf"
              }
            ],
            "exits": [
              {
                "uuid": "3c2004a1-7665-4eff-a89a-13f2a5d95ed3",
                "destination_uuid": "ea692dbf-6529-4188-8c2b-7c170eaab8a1"
              }
            ]
          },
          {
            "uuid": "ea692dbf-6529-4188-8c2b-7c170eaab8a1",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "21c0f3e3-b754-4a4d-8788-01806dd90407",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "94e239d0-0fb8-4490-a970-fd81b71c11e4",
                  "type": "has_only_phrase",
                  "uuid": "02ddcde0-d731-419e-acc6-6d957482841e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a4a5ccc6-34d2-4f8d-9c91-800f5b5021f6",
                  "name": "All Responses",
                  "uuid": "21c0f3e3-b754-4a4d-8788-01806dd90407"
                },
                {
                  "exit_uuid": "22d47c17-9671-4955-ae9f-73c1badbe362",
                  "name": "Next",
                  "uuid": "94e239d0-0fb8-4490-a970-fd81b71c11e4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a4a5ccc6-34d2-4f8d-9c91-800f5b5021f6",
                "destination_uuid": null
              },
              {
                "uuid": "22d47c17-9671-4955-ae9f-73c1badbe362",
                "destination_uuid": "7533b16b-d483-4bbf-b771-d34bfe2a5d57"
              }
            ]
          },
          {
            "uuid": "7533b16b-d483-4bbf-b771-d34bfe2a5d57",
            "actions": [
              {
                "attachments": [],
                "text": "Your PARENTapp journey will include more support for this goal.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "b59e4b93-5026-4eed-8e1b-569564f5d318"
              }
            ],
            "exits": [
              {
                "uuid": "de459a2c-32b0-42f4-9abf-281b3eb3c54f",
                "destination_uuid": "b734b85b-9f99-46c7-b018-07ea424f10d1"
              }
            ]
          },
          {
            "uuid": "1b451ca4-7e3b-458e-ba5b-2d2986c64d96",
            "actions": [
              {
                "attachments": [],
                "text": "One thing that can help with teenage behaviour is to praise anytime that they do something good – however small. Teens may not look like they want your praise but they still really, really do.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6544df2c-cce8-47c4-b602-8973202bf456"
              }
            ],
            "exits": [
              {
                "uuid": "4bcc38fe-9156-4774-8804-238c4a78de9b",
                "destination_uuid": "9e8e3904-ce67-47fe-8927-f356d7c5aefb"
              }
            ]
          },
          {
            "uuid": "9e8e3904-ce67-47fe-8927-f356d7c5aefb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "55a3ac45-fe2e-47af-95bb-7905e27a1e5e",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "0e488d1f-9fb1-437b-bcc7-df3a7ca3455d",
                  "type": "has_only_phrase",
                  "uuid": "0716d71d-6e41-4dfc-8ca3-9fdd612a0ba5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fcf14762-a6d7-4fa7-84f6-255cc3d5b38e",
                  "name": "All Responses",
                  "uuid": "55a3ac45-fe2e-47af-95bb-7905e27a1e5e"
                },
                {
                  "exit_uuid": "2b99713f-2976-4f09-8235-38a191b6f56f",
                  "name": "Next",
                  "uuid": "0e488d1f-9fb1-437b-bcc7-df3a7ca3455d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fcf14762-a6d7-4fa7-84f6-255cc3d5b38e",
                "destination_uuid": null
              },
              {
                "uuid": "2b99713f-2976-4f09-8235-38a191b6f56f",
                "destination_uuid": "cb89ac7f-b9e7-461f-ad17-99b010fb7935"
              }
            ]
          },
          {
            "uuid": "cb89ac7f-b9e7-461f-ad17-99b010fb7935",
            "actions": [
              {
                "attachments": [],
                "text": "We hope this small tip will help. More support on how to deal with difficult teen behaviour will be covered later on when we talk about \"Rules\".",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "519418e3-ce79-4926-9496-c6f971eb51fe"
              }
            ],
            "exits": [
              {
                "uuid": "02e92f8e-95df-43b5-b015-64bdc21cc394",
                "destination_uuid": "b734b85b-9f99-46c7-b018-07ea424f10d1"
              }
            ]
          },
          {
            "uuid": "eac74cb9-503b-4bf3-9dc5-6de16cf3a8d9",
            "actions": [
              {
                "attachments": [],
                "text": "Caring for yourself is really important. Try taking five deep breaths when you feel overwhelmed. Why not talk to a friend, or do something relaxing for yourself? You deserve it! ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "3b263967-fe49-459f-9822-132aa48ad903"
              }
            ],
            "exits": [
              {
                "uuid": "875f7d6b-7079-4780-84a8-25fb04f2770b",
                "destination_uuid": "f63c4310-6ecc-4932-b1d5-7600f18cfdc6"
              }
            ]
          },
          {
            "uuid": "f63c4310-6ecc-4932-b1d5-7600f18cfdc6",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c6abe8cb-61ea-4ffe-9779-82c2baebe3b9",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "f82be18e-5a86-4b2b-be21-a29b779f4213",
                  "type": "has_only_phrase",
                  "uuid": "6c548c09-2322-43d3-ba54-e10f92bf41f0"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "41a164ee-49ed-44be-8527-7efc4751d07a",
                  "name": "All Responses",
                  "uuid": "c6abe8cb-61ea-4ffe-9779-82c2baebe3b9"
                },
                {
                  "exit_uuid": "82105213-2819-4e54-8885-12ceb267579f",
                  "name": "Next",
                  "uuid": "f82be18e-5a86-4b2b-be21-a29b779f4213"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "41a164ee-49ed-44be-8527-7efc4751d07a",
                "destination_uuid": null
              },
              {
                "uuid": "82105213-2819-4e54-8885-12ceb267579f",
                "destination_uuid": "ff513e4c-e6ee-4cca-bba2-3305f0b048b8"
              }
            ]
          },
          {
            "uuid": "ff513e4c-e6ee-4cca-bba2-3305f0b048b8",
            "actions": [
              {
                "attachments": [],
                "text": "We hope this small tip will help. More support will be given later on when we talk about \"Managing anger and stress\".",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "8631606a-9b9a-4f07-a000-a4c8305a797b"
              }
            ],
            "exits": [
              {
                "uuid": "fc0e1cf6-c06f-4812-a7c7-844b49e2b855",
                "destination_uuid": "b734b85b-9f99-46c7-b018-07ea424f10d1"
              }
            ]
          },
          {
            "uuid": "aaed9419-5124-4cef-9e63-6f0a25025197",
            "actions": [
              {
                "attachments": [],
                "text": "Talk to your teen about how much money comes in and what you spend money on as a family each month. When everyone sees where the money goes, it is easier to agree on where you can save money together! ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "dafa2ed0-7e59-4415-bb71-d455421c6734"
              }
            ],
            "exits": [
              {
                "uuid": "eb41a510-e830-463f-ba01-9aaee2bf173e",
                "destination_uuid": "06dc8856-df35-491b-adad-7145c5299879"
              }
            ]
          },
          {
            "uuid": "06dc8856-df35-491b-adad-7145c5299879",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "dcb040c2-6870-4498-a2af-8902fab7a853",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "b25f2cfb-12c5-40a9-8a7a-23a184c27de9",
                  "type": "has_only_phrase",
                  "uuid": "5a105681-c64a-4d87-9104-dfe60b7a038e"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9c1a78f9-c38a-49bf-b3b4-f9b6d143af03",
                  "name": "All Responses",
                  "uuid": "dcb040c2-6870-4498-a2af-8902fab7a853"
                },
                {
                  "exit_uuid": "f8be6ad3-6fe4-4ca5-8c29-2cafdf46a7c5",
                  "name": "Next",
                  "uuid": "b25f2cfb-12c5-40a9-8a7a-23a184c27de9"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "9c1a78f9-c38a-49bf-b3b4-f9b6d143af03",
                "destination_uuid": null
              },
              {
                "uuid": "f8be6ad3-6fe4-4ca5-8c29-2cafdf46a7c5",
                "destination_uuid": "153667d8-b39f-4121-81bc-930f415d5bf8"
              }
            ]
          },
          {
            "uuid": "153667d8-b39f-4121-81bc-930f415d5bf8",
            "actions": [
              {
                "attachments": [],
                "text": "We hope this small tip will help. More support will be given in \"Family budgeting\".",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "d389f57b-5291-41f6-9a8d-cee849c76f23"
              }
            ],
            "exits": [
              {
                "uuid": "982d530c-0f3f-4489-9162-ef8661fc3e6e",
                "destination_uuid": "b734b85b-9f99-46c7-b018-07ea424f10d1"
              }
            ]
          },
          {
            "uuid": "5a1689bd-5dd1-4d28-929a-bac7ed45b589",
            "actions": [
              {
                "attachments": [],
                "text": "When a problem comes up, talk about it together! What is the problem exactly? What different solutions are there and what are the consequences of one? That way, you can find a solution that can be OK for everyone.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "85b1552e-e260-425d-b181-3d81b17552a7"
              }
            ],
            "exits": [
              {
                "uuid": "45b7a228-52ab-4843-8bb7-3d39282ef41e",
                "destination_uuid": "66a7b93c-16ac-4d92-ab87-d439e914ca3d"
              }
            ]
          },
          {
            "uuid": "66a7b93c-16ac-4d92-ab87-d439e914ca3d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "93ccae2d-16f7-4657-be10-76f1b562a182",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "95d83c29-d93a-42f9-8257-dc0f8f1d1b64",
                  "type": "has_only_phrase",
                  "uuid": "42654b1e-0240-4c29-9902-ad7bcf2ddde1"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "f69d1c65-ebe4-4fa4-88a9-a7f5f2ce78a4",
                  "name": "All Responses",
                  "uuid": "93ccae2d-16f7-4657-be10-76f1b562a182"
                },
                {
                  "exit_uuid": "38d577a9-ee1e-4783-82cf-7428b8d6d656",
                  "name": "Next",
                  "uuid": "95d83c29-d93a-42f9-8257-dc0f8f1d1b64"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "f69d1c65-ebe4-4fa4-88a9-a7f5f2ce78a4",
                "destination_uuid": null
              },
              {
                "uuid": "38d577a9-ee1e-4783-82cf-7428b8d6d656",
                "destination_uuid": "03430b22-5107-41fa-9345-5955cdd179aa"
              }
            ]
          },
          {
            "uuid": "03430b22-5107-41fa-9345-5955cdd179aa",
            "actions": [
              {
                "attachments": [],
                "text": "We hope this small tip will help. More support will be given later on when we talk about \"Problem solving\".",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "249b2d56-8552-45b0-8e7b-3f2b68708844"
              }
            ],
            "exits": [
              {
                "uuid": "0f908456-e2c0-42d5-a31a-6997ae5e2278",
                "destination_uuid": "b734b85b-9f99-46c7-b018-07ea424f10d1"
              }
            ]
          },
          {
            "uuid": "33539a9d-93d9-4237-9f70-57bbf364d6b2",
            "actions": [
              {
                "attachments": [],
                "text": "Try to start a conversation with your teen about safe and unsafe places in your community and online. They may even know some you don’t. This will help you make a plan together about how to stay safe.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6c8582fb-90b1-435e-905f-40cd7ce6a019"
              }
            ],
            "exits": [
              {
                "uuid": "8d15f2b0-674e-4891-8ae6-a4dc4211ae65",
                "destination_uuid": "28725d92-ba38-4f0e-a4c4-0d3c35d55625"
              }
            ]
          },
          {
            "uuid": "28725d92-ba38-4f0e-a4c4-0d3c35d55625",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "cb715243-b7ad-40c8-b40a-5150b2adf930",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "eff97809-6d8f-4c4e-b77b-af754a11adf4",
                  "type": "has_only_phrase",
                  "uuid": "d677d869-13a3-43e2-a032-f9f053335c34"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "a85cf6ae-5748-4bed-a12b-891af5955f94",
                  "name": "All Responses",
                  "uuid": "cb715243-b7ad-40c8-b40a-5150b2adf930"
                },
                {
                  "exit_uuid": "38a2d423-dd05-4380-ac21-e325b7fb69c3",
                  "name": "Next",
                  "uuid": "eff97809-6d8f-4c4e-b77b-af754a11adf4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "a85cf6ae-5748-4bed-a12b-891af5955f94",
                "destination_uuid": null
              },
              {
                "uuid": "38a2d423-dd05-4380-ac21-e325b7fb69c3",
                "destination_uuid": "b8d970aa-2d88-49d8-9f66-76e24fabf2ca"
              }
            ]
          },
          {
            "uuid": "b8d970aa-2d88-49d8-9f66-76e24fabf2ca",
            "actions": [
              {
                "attachments": [],
                "text": "We hope this small tip will help. More support will be given later on when we talk about \"keeping my teen safe\".",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "0e457885-3146-4536-a5e4-952b8ec56fb4"
              }
            ],
            "exits": [
              {
                "uuid": "41732ed5-da68-4a3c-b083-0ccba6fd5371",
                "destination_uuid": "b734b85b-9f99-46c7-b018-07ea424f10d1"
              }
            ]
          },
          {
            "uuid": "2e181e7b-5865-4e30-b602-67177aa26f89",
            "actions": [
              {
                "attachments": [],
                "text": "[disability quick tip]",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "24bfe2a1-277e-4088-8abe-b81d2406c5c8"
              }
            ],
            "exits": [
              {
                "uuid": "8335041d-16cf-4096-ac27-4ffdc2e2b946",
                "destination_uuid": "b734b85b-9f99-46c7-b018-07ea424f10d1"
              }
            ]
          },
          {
            "uuid": "b734b85b-9f99-46c7-b018-07ea424f10d1",
            "actions": [
              {
                "attachments": [],
                "text": "There are many more practical and useful parenting tips that will help make your home a safe and happy place for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Click to start your PARENTapp parenting journey!"
                ],
                "uuid": "40f8598d-654f-49ba-8e63-4e7e9a45a4c6"
              }
            ],
            "exits": [
              {
                "uuid": "39a1fdc3-22a4-4d54-9e17-3700c96a6005",
                "destination_uuid": "fcea6b63-5c36-4761-963a-4a1414f182b4"
              }
            ]
          },
          {
            "uuid": "fcea6b63-5c36-4761-963a-4a1414f182b4",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "9256892d-e3ac-43d5-bdda-1b3191b01f50",
              "cases": [
                {
                  "arguments": [
                    "Click to start your PARENTapp parenting journey!"
                  ],
                  "category_uuid": "87394b87-d4cf-4573-a1b3-b67754c03244",
                  "type": "has_only_phrase",
                  "uuid": "57a280bd-b6dd-4bb3-8940-45c1b53e1ad9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "898a770c-1119-4991-94db-e3c52bcc4019",
                  "name": "All Responses",
                  "uuid": "9256892d-e3ac-43d5-bdda-1b3191b01f50"
                },
                {
                  "exit_uuid": "7ee2a603-4459-471d-87d3-702d8c80b51b",
                  "name": "Click to start your PARENTapp parenting journey!",
                  "uuid": "87394b87-d4cf-4573-a1b3-b67754c03244"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "898a770c-1119-4991-94db-e3c52bcc4019",
                "destination_uuid": null
              },
              {
                "uuid": "7ee2a603-4459-471d-87d3-702d8c80b51b",
                "destination_uuid": "6a164c5f-9be4-4086-af00-3c52af063e8d"
              }
            ]
          },
          {
            "uuid": "6a164c5f-9be4-4086-af00-3c52af063e8d",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "b742fa5f-6f65-4c64-90a9-661c3b736777"
                },
                "type": "enter_flow",
                "uuid": "cb078915-b27e-42bd-86b9-a172d0959753"
              }
            ],
            "exits": [
              {
                "uuid": "02c3c1ff-5587-4bd8-85c1-e4064d8daa72",
                "destination_uuid": null
              },
              {
                "uuid": "e44ff47a-1b61-42de-b00c-6f705d528d20",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "99f56970-ccb5-4940-b28a-8e7e0d718c10",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "e311ce31-145c-47c0-918e-dc47bfe4564a"
                },
                {
                  "uuid": "71a75297-1dcb-487f-8bc7-f21c7e5a6b73",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "b54ee745-d786-4e80-a58f-fc2b0eeb496e"
                }
              ],
              "categories": [
                {
                  "uuid": "e311ce31-145c-47c0-918e-dc47bfe4564a",
                  "name": "Complete",
                  "exit_uuid": "02c3c1ff-5587-4bd8-85c1-e4064d8daa72"
                },
                {
                  "uuid": "b54ee745-d786-4e80-a58f-fc2b0eeb496e",
                  "name": "Expired",
                  "exit_uuid": "e44ff47a-1b61-42de-b00c-6f705d528d20"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "e311ce31-145c-47c0-918e-dc47bfe4564a"
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
  }
]