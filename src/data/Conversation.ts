export default [
  {
    "campaigns": [],
    "fields": [],
    "flows": [
      {
        "name": "Welcome_Intro",
        "uuid": "61a369a8-5cf1-425c-ab97-ad0f43c0a670",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "3b2094b0-6e9e-439e-9abc-817ae090cc82",
            "actions": [
              {
                "flow": {
                  "name": "CharacterNames",
                  "uuid": "fde03726-692e-447b-be1f-68640fbbaf0d"
                },
                "type": "enter_flow",
                "uuid": "2c321c48-25ae-4a13-b9bd-1e2561d8c652"
              }
            ],
            "exits": [
              {
                "uuid": "f3e1d69a-e3bb-4c74-83c0-87bd5e90d9fe",
                "destination_uuid": "95452b79-b4e5-4431-bc75-dca1e4af2ea6"
              },
              {
                "uuid": "30f38688-2aed-468c-8aec-643b2b9e0a1d",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "22c82ea7-cedd-4ac1-a4de-c2a682b7e00b",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "99f15dcb-da2b-413f-9d02-2c1a5b376bfe"
                },
                {
                  "uuid": "0e413bc6-538a-4afc-b16d-a892f4409426",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "13aac86b-3adc-4a6d-bc01-6ba36aa80d62"
                }
              ],
              "categories": [
                {
                  "uuid": "99f15dcb-da2b-413f-9d02-2c1a5b376bfe",
                  "name": "Complete",
                  "exit_uuid": "f3e1d69a-e3bb-4c74-83c0-87bd5e90d9fe"
                },
                {
                  "uuid": "13aac86b-3adc-4a6d-bc01-6ba36aa80d62",
                  "name": "Expired",
                  "exit_uuid": "30f38688-2aed-468c-8aec-643b2b9e0a1d"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "99f15dcb-da2b-413f-9d02-2c1a5b376bfe"
            }
          },
          {
            "uuid": "95452b79-b4e5-4431-bc75-dca1e4af2ea6",
            "actions": [
              {
                "attachments": [],
                "text": "We want to make this work for you! \nPlease choose your guide https://plh-demo1.idems.international/chat/msg-info?choiceMediaDisplay=media",
                "type": "send_msg",
                "quick_replies": [
                  "guide1 https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide1/Welcome01.jpg",
                  "guide2 https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/guide2/Welcome01.jpg"
                ],
                "uuid": "c2689f82-1fb9-4d32-81fe-f8e62580956b"
              }
            ],
            "exits": [
              {
                "uuid": "b1ccf4df-c660-4338-b09b-5ec9b2d34a4a",
                "destination_uuid": "f44d0300-bdba-415f-aac7-051de13325d1"
              }
            ]
          },
          {
            "uuid": "f44d0300-bdba-415f-aac7-051de13325d1",
            "actions": [],
            "exits": [
              {
                "uuid": "74cedb24-10be-4973-88df-19b9c9eaf546",
                "destination_uuid": "1bef24f3-a797-4cef-94c5-d69af028bce2"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "0a7ab06a-e348-4eb6-8fda-5e8e132929f6",
              "cases": [],
              "categories": [
                {
                  "uuid": "0a7ab06a-e348-4eb6-8fda-5e8e132929f6",
                  "name": "All Responses",
                  "exit_uuid": "74cedb24-10be-4973-88df-19b9c9eaf546"
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
            "uuid": "1bef24f3-a797-4cef-94c5-d69af028bce2",
            "actions": [
              {
                "uuid": "9a551a7d-e630-4d1d-b4c3-cdc13ba20efe",
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
                "uuid": "7f0dc4b5-2b15-4bd2-a94d-9221b4354e9c",
                "destination_uuid": "02e0965b-14bb-4d75-a52c-78d08e46f644"
              }
            ]
          },
          {
            "uuid": "02e0965b-14bb-4d75-a52c-78d08e46f644",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "c085b7d4-8a16-4120-852f-975aa906c062",
              "cases": [
                {
                  "arguments": [
                    "guide1"
                  ],
                  "category_uuid": "7c4fcbf5-34ff-4907-9d48-5cc3f021933e",
                  "type": "has_only_phrase",
                  "uuid": "8a6b680a-b28b-4799-9e91-f32f2b2a41b3"
                },
                {
                  "arguments": [
                    "guide2"
                  ],
                  "category_uuid": "ee5061d2-8d94-49ab-b7c8-c17821e12da4",
                  "type": "has_only_phrase",
                  "uuid": "2b4e6547-ae99-49b1-9287-d06f2210c891"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "9d265c9b-b5ed-4c70-a89f-5ef7587b933a",
                  "name": "All Responses",
                  "uuid": "c085b7d4-8a16-4120-852f-975aa906c062"
                },
                {
                  "exit_uuid": "d48ad247-aaf0-4d6d-a519-a976d09d8218",
                  "name": "guide1",
                  "uuid": "7c4fcbf5-34ff-4907-9d48-5cc3f021933e"
                },
                {
                  "exit_uuid": "ee7ee2a6-044e-46fc-a589-1243348c6b97",
                  "name": "guide2",
                  "uuid": "ee5061d2-8d94-49ab-b7c8-c17821e12da4"
                }
              ],
              "operand": "@fields.guidenumber"
            },
            "exits": [
              {
                "uuid": "9d265c9b-b5ed-4c70-a89f-5ef7587b933a",
                "destination_uuid": null
              },
              {
                "uuid": "d48ad247-aaf0-4d6d-a519-a976d09d8218",
                "destination_uuid": "9f07c056-f661-4a10-ae00-53877789c93a"
              },
              {
                "uuid": "ee7ee2a6-044e-46fc-a589-1243348c6b97",
                "destination_uuid": "ed056435-1e21-41f0-bc25-8cfd2e7cde1b"
              }
            ]
          },
          {
            "uuid": "9f07c056-f661-4a10-ae00-53877789c93a",
            "actions": [
              {
                "uuid": "08c1c053-2698-487c-acee-6ca521cffc13",
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
                "uuid": "9df1c184-a8e3-4163-aa05-b20ce778fd92",
                "destination_uuid": "dcec5806-3460-4eda-88e1-2fdce376fe00"
              }
            ]
          },
          {
            "uuid": "ed056435-1e21-41f0-bc25-8cfd2e7cde1b",
            "actions": [
              {
                "uuid": "5778add5-b96f-46d5-abb8-7fa30dabc284",
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
                "uuid": "b075c6eb-7e59-4740-a979-1b13848db3e3",
                "destination_uuid": "dcec5806-3460-4eda-88e1-2fdce376fe00"
              }
            ]
          },
          {
            "uuid": "dcec5806-3460-4eda-88e1-2fdce376fe00",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome02.jpg"
                ],
                "text": "Hi there! I'm @fields.guide, and I have two teens – a boy and a girl. I'll be your guide.\n\nThis is how it works: You'll get a weekly session with stress-reducing activities for you, and effective tools for bringing up a teenager. In between, you'll get reminders for things to do together that improve family relationships.\n\nFor this week, let's start with a short introduction:",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "c8641af7-5389-4f28-9818-cd142ebb15fd"
              }
            ],
            "exits": [
              {
                "uuid": "0f00cce9-ba5d-4461-9051-099079768245",
                "destination_uuid": "b7dd149d-dc69-45ed-93f4-73de3a8cd474"
              }
            ]
          },
          {
            "uuid": "b7dd149d-dc69-45ed-93f4-73de3a8cd474",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome03.jpg"
                ],
                "text": "A daily stress-reducer can help us with parenting, and make us feel better.  Let's start with 30 seconds of relaxation for yourself. You deserve this! ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "bcc40fea-6337-4f90-8811-7dfee2b66351"
              }
            ],
            "exits": [
              {
                "uuid": "0cd727ad-63b0-4d45-9f5a-a43f50f190bd",
                "destination_uuid": "63a338b3-e207-4ab6-aac6-dff1a994944c"
              }
            ]
          },
          {
            "uuid": "63a338b3-e207-4ab6-aac6-dff1a994944c",
            "actions": [
              {
                "flow": {
                  "name": "calm5",
                  "uuid": "af887e6f-986f-4fbc-86ad-e5a156ef653e"
                },
                "type": "enter_flow",
                "uuid": "9492cf58-34fd-4ea7-b7cb-34e15dff01bc"
              }
            ],
            "exits": [
              {
                "uuid": "4019481b-6e94-4a09-92e0-269a2c1811f9",
                "destination_uuid": "8089cbeb-7a4d-402e-80c8-b6f6ff32a172"
              },
              {
                "uuid": "88b8d6e5-d2c7-48b0-9263-7a19717b8de2",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "b86267d5-cad3-41c4-a97a-69e55db8eb1f",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "619da743-23ad-4288-b15c-99b09f574ad9"
                },
                {
                  "uuid": "de63d77e-2685-4f47-b691-5b0065ad97f6",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "8e59fd38-c739-4d0c-b2f7-d3559d12d645"
                }
              ],
              "categories": [
                {
                  "uuid": "619da743-23ad-4288-b15c-99b09f574ad9",
                  "name": "Complete",
                  "exit_uuid": "4019481b-6e94-4a09-92e0-269a2c1811f9"
                },
                {
                  "uuid": "8e59fd38-c739-4d0c-b2f7-d3559d12d645",
                  "name": "Expired",
                  "exit_uuid": "88b8d6e5-d2c7-48b0-9263-7a19717b8de2"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "619da743-23ad-4288-b15c-99b09f574ad9"
            }
          },
          {
            "uuid": "8089cbeb-7a4d-402e-80c8-b6f6ff32a172",
            "actions": [
              {
                "attachments": [],
                "text": "Send me a daily quick relaxation activity https://plh-demo1.idems.international/chat/msg-info?displayAsTick=true",
                "type": "send_msg",
                "quick_replies": [
                  "Yes",
                  "No"
                ],
                "uuid": "8ae9b3dd-f09a-481e-b079-2d287a8ee8b0"
              }
            ],
            "exits": [
              {
                "uuid": "72115340-1596-4eda-bfb5-552a76869d82",
                "destination_uuid": "c235be38-bc7e-4159-93ad-be0a73e2ed1c"
              }
            ]
          },
          {
            "uuid": "c235be38-bc7e-4159-93ad-be0a73e2ed1c",
            "actions": [],
            "exits": [
              {
                "uuid": "55bcb738-ba4b-4300-b1d7-fbbb9ff3971d",
                "destination_uuid": "ff2cf025-4593-493a-bfb5-ee259cbb4257"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "d2eb266a-314a-4e4e-bd78-0759af1acf9e",
              "cases": [],
              "categories": [
                {
                  "uuid": "d2eb266a-314a-4e4e-bd78-0759af1acf9e",
                  "name": "All Responses",
                  "exit_uuid": "55bcb738-ba4b-4300-b1d7-fbbb9ff3971d"
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
            "uuid": "ff2cf025-4593-493a-bfb5-ee259cbb4257",
            "actions": [
              {
                "uuid": "52d624a6-4e49-40f3-a434-4c61ad6d40c9",
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
                "uuid": "f073ffc8-126b-4a49-b8ef-61691866be09",
                "destination_uuid": "2f053117-f0ae-47ac-9eb1-4054cb8c30e0"
              }
            ]
          },
          {
            "uuid": "2f053117-f0ae-47ac-9eb1-4054cb8c30e0",
            "actions": [
              {
                "attachments": [
                  "image:https://plh-demo1.idems.international/assets/images/flows/Welcome_Flow/@fields.guidenumber/Welcome04.jpg"
                ],
                "text": "Sometimes our teens can make us want to scream. Here is one effective tool that can help. Teenagers want our praise (even if they don't show it). They want to make us proud. Can you think of one thing that your teenager has done recently that you want them to do more of? This can be even a small thing such as \n- came home on time   \n- said something nice to someone at home  \n- smiled \n\nNext time you see your teenager, tell them how much you appreciated that thing.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "81faff96-9a7d-4078-a081-1fda28d30de2"
              }
            ],
            "exits": [
              {
                "uuid": "1dabf932-d37e-4877-9c36-983a6d28af15",
                "destination_uuid": "7d3d28b2-3681-478a-aa92-80294a64b87b"
              }
            ]
          },
          {
            "uuid": "7d3d28b2-3681-478a-aa92-80294a64b87b",
            "actions": [
              {
                "attachments": [],
                "text": "Every parent in the world is struggling in these hard times. These five quick questions will make the app work better for you: ",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "f993361e-f3ff-4f25-80a8-ae4be1c8716b"
              }
            ],
            "exits": [
              {
                "uuid": "2c362b0c-801a-48e2-91b9-770f390c6c26",
                "destination_uuid": "1f7d63c9-d4de-48d7-b5a9-4d5fd4d6b0c1"
              }
            ]
          },
          {
            "uuid": "1f7d63c9-d4de-48d7-b5a9-4d5fd4d6b0c1",
            "actions": [
              {
                "flow": {
                  "name": "Welcome_Survey",
                  "uuid": "6ed4d55b-dd15-4ee9-84ed-174a71750685"
                },
                "type": "enter_flow",
                "uuid": "2bbe25b7-0394-4115-a147-047370efdd83"
              }
            ],
            "exits": [
              {
                "uuid": "c986517e-7156-4169-932d-4894c3f5c117",
                "destination_uuid": null
              },
              {
                "uuid": "b259d85d-e1f5-45fe-ac00-63ce8d593e57",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "c06bcb1d-d910-4b2d-ba77-8eada800a4a3",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "6eb7ea17-989b-4f59-8e45-d45d8fc64e37"
                },
                {
                  "uuid": "d12cadbb-7935-4671-be8a-bc1ca3a74753",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "e259dc46-872f-4220-a1fa-03a5de9bbeea"
                }
              ],
              "categories": [
                {
                  "uuid": "6eb7ea17-989b-4f59-8e45-d45d8fc64e37",
                  "name": "Complete",
                  "exit_uuid": "c986517e-7156-4169-932d-4894c3f5c117"
                },
                {
                  "uuid": "e259dc46-872f-4220-a1fa-03a5de9bbeea",
                  "name": "Expired",
                  "exit_uuid": "b259d85d-e1f5-45fe-ac00-63ce8d593e57"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "6eb7ea17-989b-4f59-8e45-d45d8fc64e37"
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
        "uuid": "28cc174f-d0f7-4406-b950-8ba4b8670a0c",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "78de0566-2351-4eef-97a6-32f2d07ede44",
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
                "uuid": "d653d75e-c236-4173-a25a-4e563b6d5097"
              }
            ],
            "exits": [
              {
                "uuid": "c0d08ae5-d014-46a3-891f-5666b49ec04d",
                "destination_uuid": "7562e371-466b-4978-8e06-699fe5ac9221"
              }
            ]
          },
          {
            "uuid": "7562e371-466b-4978-8e06-699fe5ac9221",
            "actions": [],
            "exits": [
              {
                "uuid": "15e9ba3a-9166-4b09-92f2-622b05c0ac53",
                "destination_uuid": "a4639012-7f61-41a0-9a9a-3fdb360f9d02"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "a1448a72-2b84-4530-a457-06cab13ba2a6",
              "cases": [],
              "categories": [
                {
                  "uuid": "a1448a72-2b84-4530-a457-06cab13ba2a6",
                  "name": "All Responses",
                  "exit_uuid": "15e9ba3a-9166-4b09-92f2-622b05c0ac53"
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
            "uuid": "a4639012-7f61-41a0-9a9a-3fdb360f9d02",
            "actions": [
              {
                "uuid": "14b02299-f292-45f9-9d4a-1560ac4e99e3",
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
                "uuid": "7ec8f481-1736-49eb-81e7-0aed8cefca92",
                "destination_uuid": "0ec2b7b6-942b-4c4a-8d66-d777121c0421"
              }
            ]
          },
          {
            "uuid": "0ec2b7b6-942b-4c4a-8d66-d777121c0421",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b5a4467c-f27d-4171-abd6-d69505943190",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "8145d825-e3ad-4d1c-908d-aa97dc046066",
                  "type": "has_only_phrase",
                  "uuid": "293a10ef-226f-4608-89a4-b2cd77725f1c"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "8145d825-e3ad-4d1c-908d-aa97dc046066",
                  "type": "has_only_phrase",
                  "uuid": "3632057e-a9c1-4ef4-910c-cf7d37cc39b6"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "8145d825-e3ad-4d1c-908d-aa97dc046066",
                  "type": "has_only_phrase",
                  "uuid": "c3d09987-30b2-46dc-9f53-f6cc45216e9f"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "8145d825-e3ad-4d1c-908d-aa97dc046066",
                  "type": "has_only_phrase",
                  "uuid": "5d92344a-8127-469f-b514-80a25887f7dc"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "57eb252b-484f-44e1-a09a-9e6fab2d16f2",
                  "type": "has_only_phrase",
                  "uuid": "7e674e47-60a2-465c-bb3d-b976e18881bf"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "57eb252b-484f-44e1-a09a-9e6fab2d16f2",
                  "type": "has_only_phrase",
                  "uuid": "2df7e709-f9a0-472b-9235-73904e991659"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "57eb252b-484f-44e1-a09a-9e6fab2d16f2",
                  "type": "has_only_phrase",
                  "uuid": "dc29c382-1af0-4c48-b97e-3cf67a9db12f"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "57eb252b-484f-44e1-a09a-9e6fab2d16f2",
                  "type": "has_only_phrase",
                  "uuid": "144f091a-b423-4ad5-8e5d-a24d5588f71c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "e71bd1f7-7494-4721-9a85-d0af7965180a",
                  "name": "All Responses",
                  "uuid": "b5a4467c-f27d-4171-abd6-d69505943190"
                },
                {
                  "exit_uuid": "71e2c10e-35b3-46dc-bbc5-63c8b113a9dd",
                  "name": "0;1;2;3",
                  "uuid": "8145d825-e3ad-4d1c-908d-aa97dc046066"
                },
                {
                  "exit_uuid": "6fddbed5-5522-4527-99d4-cc488fb69234",
                  "name": "4;5;6;7",
                  "uuid": "57eb252b-484f-44e1-a09a-9e6fab2d16f2"
                }
              ],
              "operand": "@fields.welcomesurvey_q1"
            },
            "exits": [
              {
                "uuid": "e71bd1f7-7494-4721-9a85-d0af7965180a",
                "destination_uuid": null
              },
              {
                "uuid": "71e2c10e-35b3-46dc-bbc5-63c8b113a9dd",
                "destination_uuid": "191ece53-0e2b-4dac-a1e8-988319e5e871"
              },
              {
                "uuid": "6fddbed5-5522-4527-99d4-cc488fb69234",
                "destination_uuid": "50b76164-7de1-499d-954c-b585dd460424"
              }
            ]
          },
          {
            "uuid": "191ece53-0e2b-4dac-a1e8-988319e5e871",
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
                "uuid": "6693fd03-2ab6-4484-9ccd-c40e050a8112"
              }
            ],
            "exits": [
              {
                "uuid": "5a562d4a-3a82-4a5b-8963-21c7d3667b1f",
                "destination_uuid": "fe969bf8-9fc8-4e29-8dd0-49bb3e71938f"
              }
            ]
          },
          {
            "uuid": "50b76164-7de1-499d-954c-b585dd460424",
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
                "uuid": "87e6412a-88f4-4c28-8c70-3ab3c8e24012"
              }
            ],
            "exits": [
              {
                "uuid": "03fd87ee-bfa5-4d97-a9cc-d92c5c5c06e0",
                "destination_uuid": "fe969bf8-9fc8-4e29-8dd0-49bb3e71938f"
              }
            ]
          },
          {
            "uuid": "fe969bf8-9fc8-4e29-8dd0-49bb3e71938f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1ce48aaa-34e6-42e6-8a2b-1eb98d77cf2a",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "3d98f91f-9690-4587-9191-d6a0046620a4",
                  "type": "has_only_phrase",
                  "uuid": "c1d930d7-9047-4ef0-bcdf-c8fc35b0f6d5"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "27f01203-1662-402e-b05f-0fcb9c77a46b",
                  "name": "All Responses",
                  "uuid": "1ce48aaa-34e6-42e6-8a2b-1eb98d77cf2a"
                },
                {
                  "exit_uuid": "2ce00034-b48a-48f5-8d3a-c7ccc02d895e",
                  "name": "Next",
                  "uuid": "3d98f91f-9690-4587-9191-d6a0046620a4"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "27f01203-1662-402e-b05f-0fcb9c77a46b",
                "destination_uuid": null
              },
              {
                "uuid": "2ce00034-b48a-48f5-8d3a-c7ccc02d895e",
                "destination_uuid": "70bae433-3e1e-40e7-9b6d-e2da7cfe9e77"
              }
            ]
          },
          {
            "uuid": "70bae433-3e1e-40e7-9b6d-e2da7cfe9e77",
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
                "uuid": "b6feffc3-38dd-47b1-a232-7fc2a92888b9"
              }
            ],
            "exits": [
              {
                "uuid": "fc07746d-4b0e-4361-90a5-ed246802fb69",
                "destination_uuid": "b5a0ff36-7477-4669-93fe-ce129804ede4"
              }
            ]
          },
          {
            "uuid": "b5a0ff36-7477-4669-93fe-ce129804ede4",
            "actions": [],
            "exits": [
              {
                "uuid": "d7a1be35-e2ed-4ca3-9632-ab35603552ab",
                "destination_uuid": "00c326d1-e7d7-4337-b0ae-baf44deb2294"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fa5dae02-da5c-426c-99d7-b0282de974d2",
              "cases": [],
              "categories": [
                {
                  "uuid": "fa5dae02-da5c-426c-99d7-b0282de974d2",
                  "name": "All Responses",
                  "exit_uuid": "d7a1be35-e2ed-4ca3-9632-ab35603552ab"
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
            "uuid": "00c326d1-e7d7-4337-b0ae-baf44deb2294",
            "actions": [
              {
                "uuid": "77ad9fe8-d576-4e84-a95e-df75a26a4ae4",
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
                "uuid": "68e90981-30fa-4592-ab5d-5578a6238897",
                "destination_uuid": "32c96f10-2daa-47e1-9231-69beaccf3a39"
              }
            ]
          },
          {
            "uuid": "32c96f10-2daa-47e1-9231-69beaccf3a39",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2dca77cd-88e3-4c04-ba5e-17e6fc3bfd23",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "0cb8ec9f-2eaa-47f6-a40e-1a2268f2d12d",
                  "type": "has_only_phrase",
                  "uuid": "96cb7d70-eb97-422f-9834-f44696beebda"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "0cb8ec9f-2eaa-47f6-a40e-1a2268f2d12d",
                  "type": "has_only_phrase",
                  "uuid": "5aec3b2e-1b4a-414e-a121-bf5201e98cf4"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "0cb8ec9f-2eaa-47f6-a40e-1a2268f2d12d",
                  "type": "has_only_phrase",
                  "uuid": "80a7ec7e-2eef-4d33-ae8f-d3b06d9913b2"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "0cb8ec9f-2eaa-47f6-a40e-1a2268f2d12d",
                  "type": "has_only_phrase",
                  "uuid": "bbdb7f85-1c55-44a6-ba4f-86f459def6f1"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "0cb8ec9f-2eaa-47f6-a40e-1a2268f2d12d",
                  "type": "has_only_phrase",
                  "uuid": "80d7328d-1cc1-415c-b5b6-2b36c1af6198"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "2e31a714-2bad-412c-acde-184b33fc903b",
                  "type": "has_only_phrase",
                  "uuid": "47fde380-5805-474f-92ce-9382de86e11b"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "2e31a714-2bad-412c-acde-184b33fc903b",
                  "type": "has_only_phrase",
                  "uuid": "6953c7b2-7beb-4dee-9c61-8d10fac0898d"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "2e31a714-2bad-412c-acde-184b33fc903b",
                  "type": "has_only_phrase",
                  "uuid": "ab554d9b-db12-47e3-8dc6-26b96695a046"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "2e31a714-2bad-412c-acde-184b33fc903b",
                  "type": "has_only_phrase",
                  "uuid": "b5762bd1-8c50-4578-81b8-8fd7618eb996"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b19301cd-8f46-4e07-a6e3-30f10ddb52e6",
                  "name": "All Responses",
                  "uuid": "2dca77cd-88e3-4c04-ba5e-17e6fc3bfd23"
                },
                {
                  "exit_uuid": "b6d60a7c-aa80-452c-b98b-388da50cb8cc",
                  "name": "0;1;2;3;4",
                  "uuid": "0cb8ec9f-2eaa-47f6-a40e-1a2268f2d12d"
                },
                {
                  "exit_uuid": "dcc1de95-64aa-471f-918b-39bf9c12001b",
                  "name": "5;6;7;8",
                  "uuid": "2e31a714-2bad-412c-acde-184b33fc903b"
                }
              ],
              "operand": "@fields.welcomesurvey_q2"
            },
            "exits": [
              {
                "uuid": "b19301cd-8f46-4e07-a6e3-30f10ddb52e6",
                "destination_uuid": null
              },
              {
                "uuid": "b6d60a7c-aa80-452c-b98b-388da50cb8cc",
                "destination_uuid": "2a235e2e-021b-4935-96d2-fbce238ab2ae"
              },
              {
                "uuid": "dcc1de95-64aa-471f-918b-39bf9c12001b",
                "destination_uuid": "a801bbda-9cb0-4133-9c85-33ad93a62853"
              }
            ]
          },
          {
            "uuid": "2a235e2e-021b-4935-96d2-fbce238ab2ae",
            "actions": [
              {
                "attachments": [],
                "text": "We all sometimes feel like our teens are causing more negativity than positivity. Try to see through negative attitudes and praise any positive behaviour you notice. With time, you will see the change!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "97172811-d26f-4abd-b1f3-90d0f023777a"
              }
            ],
            "exits": [
              {
                "uuid": "33a63a32-c3e5-4ebf-9ecd-a8b80d998f64",
                "destination_uuid": "ccfb31bf-65e7-4adb-a33a-b25aaaa64f72"
              }
            ]
          },
          {
            "uuid": "a801bbda-9cb0-4133-9c85-33ad93a62853",
            "actions": [
              {
                "attachments": [],
                "text": "Wonderful that you are praising your teen! This helps them feel seen and loved – your encouragement means a lot.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "b85f80c7-fec6-40ff-89bc-602f5a51892b"
              }
            ],
            "exits": [
              {
                "uuid": "3812e3c1-c728-4fa1-b930-182dc05d2a5f",
                "destination_uuid": "ccfb31bf-65e7-4adb-a33a-b25aaaa64f72"
              }
            ]
          },
          {
            "uuid": "ccfb31bf-65e7-4adb-a33a-b25aaaa64f72",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d10ebfc6-74af-4d97-8db1-e75fffb694a1",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "f56633c5-b4c5-4a69-861a-7fc0ed29e5be",
                  "type": "has_only_phrase",
                  "uuid": "c266634d-82bb-4b58-83ed-66059be39b77"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "63e44f30-4f49-421a-a29f-862b4d9d7726",
                  "name": "All Responses",
                  "uuid": "d10ebfc6-74af-4d97-8db1-e75fffb694a1"
                },
                {
                  "exit_uuid": "4406b3aa-1771-4dad-a9ed-c51b31142808",
                  "name": "Next",
                  "uuid": "f56633c5-b4c5-4a69-861a-7fc0ed29e5be"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "63e44f30-4f49-421a-a29f-862b4d9d7726",
                "destination_uuid": null
              },
              {
                "uuid": "4406b3aa-1771-4dad-a9ed-c51b31142808",
                "destination_uuid": "034dad2f-4621-4af1-9e64-563b7f3c532d"
              }
            ]
          },
          {
            "uuid": "034dad2f-4621-4af1-9e64-563b7f3c532d",
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
                "uuid": "66d8065a-3025-4b57-8992-c56d2242a7ca"
              }
            ],
            "exits": [
              {
                "uuid": "5e12f44e-267f-48e9-a0f0-424aa70b0d30",
                "destination_uuid": "e97ad7b3-76f8-4c00-93f7-fc2ae4f976a8"
              }
            ]
          },
          {
            "uuid": "e97ad7b3-76f8-4c00-93f7-fc2ae4f976a8",
            "actions": [],
            "exits": [
              {
                "uuid": "dcd2646f-7a04-4eee-8d43-b4e5f8dec4bd",
                "destination_uuid": "db31be30-63d8-42d9-9232-1556b6cd0e84"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "fa4443fd-92da-4031-b9d6-450d4c792dd1",
              "cases": [],
              "categories": [
                {
                  "uuid": "fa4443fd-92da-4031-b9d6-450d4c792dd1",
                  "name": "All Responses",
                  "exit_uuid": "dcd2646f-7a04-4eee-8d43-b4e5f8dec4bd"
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
            "uuid": "db31be30-63d8-42d9-9232-1556b6cd0e84",
            "actions": [
              {
                "uuid": "e59ae667-21f7-4bc6-b6f7-238dcc99ad72",
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
                "uuid": "7dcb77eb-4321-457d-b20b-3e9a316df41e",
                "destination_uuid": "1bbb9882-ba00-40b3-bdeb-6f4004844221"
              }
            ]
          },
          {
            "uuid": "1bbb9882-ba00-40b3-bdeb-6f4004844221",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d4593893-45d1-48e6-88c4-82519ad588ec",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "ef7dbc7d-408a-4d56-94a3-b313681677e8",
                  "type": "has_only_phrase",
                  "uuid": "cd0dd099-bb47-40ab-a921-39f2cc6c3b28"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "ef7dbc7d-408a-4d56-94a3-b313681677e8",
                  "type": "has_only_phrase",
                  "uuid": "a79d3864-6c1d-486b-8ca3-44f450d2568f"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "ef7dbc7d-408a-4d56-94a3-b313681677e8",
                  "type": "has_only_phrase",
                  "uuid": "24487f94-d070-4914-9f73-c3dc60e4dcad"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "3dc0dd9b-ad4f-43aa-9737-13aca20f67f2",
                  "type": "has_only_phrase",
                  "uuid": "2f54a3f7-14a7-49e1-a4a2-7e93db9b20d5"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "3dc0dd9b-ad4f-43aa-9737-13aca20f67f2",
                  "type": "has_only_phrase",
                  "uuid": "e87c9379-fadd-4c6c-9e21-4882c52a82ea"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "3dc0dd9b-ad4f-43aa-9737-13aca20f67f2",
                  "type": "has_only_phrase",
                  "uuid": "986e06a9-59bb-451c-831c-184e936b6678"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "3dc0dd9b-ad4f-43aa-9737-13aca20f67f2",
                  "type": "has_only_phrase",
                  "uuid": "89745910-4054-4285-98a4-a61ca806e634"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "3dc0dd9b-ad4f-43aa-9737-13aca20f67f2",
                  "type": "has_only_phrase",
                  "uuid": "04e855cd-3ecd-4c1f-9d99-178270b2fbfe"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "dfdd9377-7d90-465a-9547-86e06a374849",
                  "name": "All Responses",
                  "uuid": "d4593893-45d1-48e6-88c4-82519ad588ec"
                },
                {
                  "exit_uuid": "d99d6676-f3d8-44cb-9282-e336965cd9f9",
                  "name": "0;1;2",
                  "uuid": "ef7dbc7d-408a-4d56-94a3-b313681677e8"
                },
                {
                  "exit_uuid": "d084194a-c336-4dc4-ba71-077d201d8996",
                  "name": "3;4;5;6;7",
                  "uuid": "3dc0dd9b-ad4f-43aa-9737-13aca20f67f2"
                }
              ],
              "operand": "@fields.welcomesurvey_q3"
            },
            "exits": [
              {
                "uuid": "dfdd9377-7d90-465a-9547-86e06a374849",
                "destination_uuid": null
              },
              {
                "uuid": "d99d6676-f3d8-44cb-9282-e336965cd9f9",
                "destination_uuid": "6e19fbe5-c637-4e60-95c6-7555baff1cc7"
              },
              {
                "uuid": "d084194a-c336-4dc4-ba71-077d201d8996",
                "destination_uuid": "30a2a077-e234-4481-becb-5bcd47ca3592"
              }
            ]
          },
          {
            "uuid": "6e19fbe5-c637-4e60-95c6-7555baff1cc7",
            "actions": [
              {
                "attachments": [],
                "text": "Great to hear that your stress levels are manageable! Whenever you feel stressed, take a deep breath – you are doing amazing.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "d9d50659-bb4a-465e-a0ec-888b903b22b5"
              }
            ],
            "exits": [
              {
                "uuid": "9d5671a4-a856-4d2c-a9fe-4f047a60c60d",
                "destination_uuid": "9e2285a4-5b49-4ef0-8c29-5b786aab9009"
              }
            ]
          },
          {
            "uuid": "30a2a077-e234-4481-becb-5bcd47ca3592",
            "actions": [
              {
                "attachments": [],
                "text": "I understand that this is a stressful time. Remember that you are not alone. A daily relaxation activity will help.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "21f189d8-d0fa-4bb9-83c4-24598315e58b"
              }
            ],
            "exits": [
              {
                "uuid": "6774b250-1ac7-4ab3-8e17-0ada5e124bc8",
                "destination_uuid": "9e2285a4-5b49-4ef0-8c29-5b786aab9009"
              }
            ]
          },
          {
            "uuid": "9e2285a4-5b49-4ef0-8c29-5b786aab9009",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b0532de6-20a5-4f95-b5d5-b83430031d11",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "645ee94f-aa26-464d-8320-1c44e0ccc57d",
                  "type": "has_only_phrase",
                  "uuid": "9aa7368f-7d06-4b86-af6a-14f42c3ddffe"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "b367f9e7-e698-474f-9977-25f26683bc25",
                  "name": "All Responses",
                  "uuid": "b0532de6-20a5-4f95-b5d5-b83430031d11"
                },
                {
                  "exit_uuid": "0377fb7b-100b-4f10-b5c3-c4462362af9e",
                  "name": "Next",
                  "uuid": "645ee94f-aa26-464d-8320-1c44e0ccc57d"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "b367f9e7-e698-474f-9977-25f26683bc25",
                "destination_uuid": null
              },
              {
                "uuid": "0377fb7b-100b-4f10-b5c3-c4462362af9e",
                "destination_uuid": "a786c0e5-a284-466c-9b4d-0d93718884e5"
              }
            ]
          },
          {
            "uuid": "a786c0e5-a284-466c-9b4d-0d93718884e5",
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
                "uuid": "56aa19ff-887f-438a-97d2-bb0ed23ad721"
              }
            ],
            "exits": [
              {
                "uuid": "8bce419b-ec9b-4b14-936a-18ab036b38a0",
                "destination_uuid": "0f4631bc-76a7-4fce-a96b-b0f7f6691db3"
              }
            ]
          },
          {
            "uuid": "0f4631bc-76a7-4fce-a96b-b0f7f6691db3",
            "actions": [],
            "exits": [
              {
                "uuid": "cfac1673-2160-4784-baae-3815d5f4afc2",
                "destination_uuid": "990453d0-3162-4f30-b415-e63312e458a0"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "35b87799-d8c8-46c1-8f91-e5ca1e19a8e2",
              "cases": [],
              "categories": [
                {
                  "uuid": "35b87799-d8c8-46c1-8f91-e5ca1e19a8e2",
                  "name": "All Responses",
                  "exit_uuid": "cfac1673-2160-4784-baae-3815d5f4afc2"
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
            "uuid": "990453d0-3162-4f30-b415-e63312e458a0",
            "actions": [
              {
                "uuid": "e5677375-9a3d-42ff-b0a5-68a4f455a9d1",
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
                "uuid": "8cd059f3-6f04-42c5-94ce-3466a82d1e19",
                "destination_uuid": "10012f09-4f0d-4a2c-80ef-f6dc1950c812"
              }
            ]
          },
          {
            "uuid": "10012f09-4f0d-4a2c-80ef-f6dc1950c812",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "1d9c22c2-56a1-4919-bd9a-142cb4c3aeb1",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "18293b93-3359-4946-8606-db2fc536db74",
                  "type": "has_only_phrase",
                  "uuid": "4412a959-be96-4ed6-a0b5-ead91ef41eb2"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "18293b93-3359-4946-8606-db2fc536db74",
                  "type": "has_only_phrase",
                  "uuid": "303079f1-0d3a-4fe7-8c06-39dd9c15f0ad"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "cdc246f6-9725-48ad-ae68-effe74420a17",
                  "type": "has_only_phrase",
                  "uuid": "4f37b3a4-d154-4f6f-83c8-fe5f5a789d37"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "cdc246f6-9725-48ad-ae68-effe74420a17",
                  "type": "has_only_phrase",
                  "uuid": "1a42c423-cf35-4047-b928-a21ec7740808"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "cdc246f6-9725-48ad-ae68-effe74420a17",
                  "type": "has_only_phrase",
                  "uuid": "da466d41-a911-4102-92b2-958a3b8d7ef4"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "cdc246f6-9725-48ad-ae68-effe74420a17",
                  "type": "has_only_phrase",
                  "uuid": "63d03a69-97d8-4740-bda1-12cf7e200d12"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "cdc246f6-9725-48ad-ae68-effe74420a17",
                  "type": "has_only_phrase",
                  "uuid": "893fa743-d682-4a42-8eda-449bd3e14a62"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "cdc246f6-9725-48ad-ae68-effe74420a17",
                  "type": "has_only_phrase",
                  "uuid": "80f3b30f-b4cc-4ae2-8f56-5cf0370dc429"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "1f8e10e3-2461-4d3d-9a41-c6bd52abc59e",
                  "name": "All Responses",
                  "uuid": "1d9c22c2-56a1-4919-bd9a-142cb4c3aeb1"
                },
                {
                  "exit_uuid": "d213cea6-b2c0-4b2d-81b4-693fdef706fb",
                  "name": "0;1",
                  "uuid": "18293b93-3359-4946-8606-db2fc536db74"
                },
                {
                  "exit_uuid": "b6b1f0bd-c85c-42bf-80a2-f53749cf0112",
                  "name": "2;3;4;5;6;7",
                  "uuid": "cdc246f6-9725-48ad-ae68-effe74420a17"
                }
              ],
              "operand": "@fields.welcomesurvey_q4"
            },
            "exits": [
              {
                "uuid": "1f8e10e3-2461-4d3d-9a41-c6bd52abc59e",
                "destination_uuid": null
              },
              {
                "uuid": "d213cea6-b2c0-4b2d-81b4-693fdef706fb",
                "destination_uuid": "eba8ffd8-1786-4308-aa3e-41a7b9400193"
              },
              {
                "uuid": "b6b1f0bd-c85c-42bf-80a2-f53749cf0112",
                "destination_uuid": "e49ad741-e622-4e42-a417-fbea97f38a73"
              }
            ]
          },
          {
            "uuid": "eba8ffd8-1786-4308-aa3e-41a7b9400193",
            "actions": [
              {
                "attachments": [],
                "text": "Well done! Brain science shows if you control your anger when your teen misbehaves, you increase your child's brain development. Be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "df4bd6d7-9378-49c2-a367-1efc737622d5"
              }
            ],
            "exits": [
              {
                "uuid": "d45ff0dc-247e-495b-b058-f38e403d48b8",
                "destination_uuid": "86201052-51e6-4cc3-a479-54a0c18aae85"
              }
            ]
          },
          {
            "uuid": "e49ad741-e622-4e42-a417-fbea97f38a73",
            "actions": [
              {
                "attachments": [],
                "text": "It can be difficult to control our anger, especially when our teens make us really angry. Take a deep breath, and be proud of yourself when you manage to do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "91d83865-f4e8-4f4d-9008-7f40876b633a"
              }
            ],
            "exits": [
              {
                "uuid": "c20017eb-51bc-42aa-b7dc-408792ca8ef4",
                "destination_uuid": "86201052-51e6-4cc3-a479-54a0c18aae85"
              }
            ]
          },
          {
            "uuid": "86201052-51e6-4cc3-a479-54a0c18aae85",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "a658b422-a619-4f70-9143-ee77f145b207",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "af368fbc-e1cd-47e8-89e9-f386bea6922c",
                  "type": "has_only_phrase",
                  "uuid": "a149c23e-8851-48b7-9f4b-229a427b4cb7"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "fe363008-0cc4-45d0-aeb9-150f443471c9",
                  "name": "All Responses",
                  "uuid": "a658b422-a619-4f70-9143-ee77f145b207"
                },
                {
                  "exit_uuid": "104948b1-017e-4bd7-b479-b7501a63c873",
                  "name": "Next",
                  "uuid": "af368fbc-e1cd-47e8-89e9-f386bea6922c"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "fe363008-0cc4-45d0-aeb9-150f443471c9",
                "destination_uuid": null
              },
              {
                "uuid": "104948b1-017e-4bd7-b479-b7501a63c873",
                "destination_uuid": "b3d98796-5fb4-4832-adfe-9d7651a843dd"
              }
            ]
          },
          {
            "uuid": "b3d98796-5fb4-4832-adfe-9d7651a843dd",
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
                "uuid": "943683e5-08c3-433c-bf6c-8f5aef04560e"
              }
            ],
            "exits": [
              {
                "uuid": "550f296e-4e9d-4d6b-bc5c-4b69bdd351fe",
                "destination_uuid": "2e143bc8-7100-449e-81b8-48b7a7cb0c3d"
              }
            ]
          },
          {
            "uuid": "2e143bc8-7100-449e-81b8-48b7a7cb0c3d",
            "actions": [],
            "exits": [
              {
                "uuid": "a2da115f-3938-4847-ae77-0da685366876",
                "destination_uuid": "7a50ab67-1ad9-4546-a2ff-56253ece2fb8"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "48de7175-38f0-45f5-bd0f-2bf24f063dc7",
              "cases": [],
              "categories": [
                {
                  "uuid": "48de7175-38f0-45f5-bd0f-2bf24f063dc7",
                  "name": "All Responses",
                  "exit_uuid": "a2da115f-3938-4847-ae77-0da685366876"
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
            "uuid": "7a50ab67-1ad9-4546-a2ff-56253ece2fb8",
            "actions": [
              {
                "uuid": "0a79e320-3382-41d2-b397-297273641ffd",
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
                "uuid": "c165ddb3-39fb-49fa-a437-10271d791974",
                "destination_uuid": "cf9e3803-6f6c-45db-afcd-a0d2d4ac7d0f"
              }
            ]
          },
          {
            "uuid": "a14ac960-7892-4db0-8bc4-09f907733e82",
            "actions": [
              {
                "attachments": [],
                "text": "It is wonderful that you are responding calmly when your teen does something upsetting. They can learn so much from you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "2d928c84-4997-4cb8-899d-a01d1027190e"
              }
            ],
            "exits": [
              {
                "uuid": "8cb5b6e2-9ced-4f4a-89dc-f8c078901af9",
                "destination_uuid": "dd969e47-0f2b-40aa-abc3-6627ecfb28bc"
              }
            ]
          },
          {
            "uuid": "cf9e3803-6f6c-45db-afcd-a0d2d4ac7d0f",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "d121acbc-fcd9-439b-b84f-32aa7167fcd7",
              "cases": [
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "cd3721d0-c29d-4747-9497-d0cbd517b24e",
                  "type": "has_only_phrase",
                  "uuid": "372d7950-2d9c-4839-8514-20df9a5b9fc9"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "cd3721d0-c29d-4747-9497-d0cbd517b24e",
                  "type": "has_only_phrase",
                  "uuid": "efd81017-2227-4c1e-91f7-457c4110beb6"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "cd3721d0-c29d-4747-9497-d0cbd517b24e",
                  "type": "has_only_phrase",
                  "uuid": "daa60028-fe53-4676-9db1-baf663d0c565"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "cd3721d0-c29d-4747-9497-d0cbd517b24e",
                  "type": "has_only_phrase",
                  "uuid": "6db35269-131f-4ae8-a580-6e525713feea"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "cd3721d0-c29d-4747-9497-d0cbd517b24e",
                  "type": "has_only_phrase",
                  "uuid": "9cd686a0-91b3-4f77-8c75-a956300090f8"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "cd3721d0-c29d-4747-9497-d0cbd517b24e",
                  "type": "has_only_phrase",
                  "uuid": "9413f084-0560-41c5-9571-cbd54f628f47"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "cd3721d0-c29d-4747-9497-d0cbd517b24e",
                  "type": "has_only_phrase",
                  "uuid": "7e5b52f9-4da8-4b9b-b9e8-b90a8da79d87"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "296defa3-b7e6-47e7-8cbd-50edd93d75b7",
                  "name": "All Responses",
                  "uuid": "d121acbc-fcd9-439b-b84f-32aa7167fcd7"
                },
                {
                  "exit_uuid": "1f136d35-3831-4f54-8279-830591b78b79",
                  "name": "1;2;3;4;5;6;7",
                  "uuid": "cd3721d0-c29d-4747-9497-d0cbd517b24e"
                }
              ],
              "operand": "@fields.welcomesurvey_q5"
            },
            "exits": [
              {
                "uuid": "296defa3-b7e6-47e7-8cbd-50edd93d75b7",
                "destination_uuid": "a14ac960-7892-4db0-8bc4-09f907733e82"
              },
              {
                "uuid": "1f136d35-3831-4f54-8279-830591b78b79",
                "destination_uuid": "349c90f9-9d7a-46fd-b323-e8772e30bd1a"
              }
            ]
          },
          {
            "uuid": "349c90f9-9d7a-46fd-b323-e8772e30bd1a",
            "actions": [
              {
                "attachments": [],
                "text": "It sounds like you are having a difficult time with your teen. This can be really hard so be patient with yourself. Try to take a pause (even one deep breath!) next time and respond differently. You can do it!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "89df32e3-fd0c-443a-8c75-bf13b5da1712"
              }
            ],
            "exits": [
              {
                "uuid": "076581cb-52de-4702-8831-f219954e28fb",
                "destination_uuid": "dd969e47-0f2b-40aa-abc3-6627ecfb28bc"
              }
            ]
          },
          {
            "uuid": "dd969e47-0f2b-40aa-abc3-6627ecfb28bc",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "2f3b4d3a-6275-4482-ae0e-1f8f38bbb1ec",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "9572ad1e-74a0-408c-9bec-da0cb1f7f9a6",
                  "type": "has_only_phrase",
                  "uuid": "27c3c86c-abc2-4005-ba60-e964b5b75b01"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "2966fb10-0349-4112-8f78-3f0c886c67e2",
                  "name": "All Responses",
                  "uuid": "2f3b4d3a-6275-4482-ae0e-1f8f38bbb1ec"
                },
                {
                  "exit_uuid": "d70499d4-fdb0-46be-b3c4-f426359c46db",
                  "name": "Next",
                  "uuid": "9572ad1e-74a0-408c-9bec-da0cb1f7f9a6"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "2966fb10-0349-4112-8f78-3f0c886c67e2",
                "destination_uuid": null
              },
              {
                "uuid": "d70499d4-fdb0-46be-b3c4-f426359c46db",
                "destination_uuid": "9fab27dd-52c6-4ac5-9420-9ea909889eba"
              }
            ]
          },
          {
            "uuid": "9fab27dd-52c6-4ac5-9420-9ea909889eba",
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
                "uuid": "6e3b8426-dd65-4a4c-b189-96540398890d"
              }
            ],
            "exits": [
              {
                "uuid": "77ae1479-b049-4cdd-9e3a-7d54fb66d9e1",
                "destination_uuid": "9efb30d2-d78f-4bf2-9043-c30459d22dcf"
              }
            ]
          },
          {
            "uuid": "9efb30d2-d78f-4bf2-9043-c30459d22dcf",
            "actions": [],
            "exits": [
              {
                "uuid": "203e3077-3c57-4537-b722-fbb2186b270e",
                "destination_uuid": "d76e5040-8bd4-4736-a73a-7c124189cb00"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "01abdec7-7129-4edc-b8e5-499bee1ce4b2",
              "cases": [],
              "categories": [
                {
                  "uuid": "01abdec7-7129-4edc-b8e5-499bee1ce4b2",
                  "name": "All Responses",
                  "exit_uuid": "203e3077-3c57-4537-b722-fbb2186b270e"
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
            "uuid": "d76e5040-8bd4-4736-a73a-7c124189cb00",
            "actions": [
              {
                "uuid": "deec6a72-9aab-4ceb-8cf6-199f11ef5997",
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
                "uuid": "e6e489b5-4d88-4c9b-a053-537ce216d8ab",
                "destination_uuid": "74aa7e1b-cce0-4be2-9a88-f5f319599f4d"
              }
            ]
          },
          {
            "uuid": "74aa7e1b-cce0-4be2-9a88-f5f319599f4d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "103aeca4-2ea0-4e0e-8a20-7bc5e6b52069",
              "cases": [
                {
                  "arguments": [
                    "0"
                  ],
                  "category_uuid": "8681ab9e-9c82-4aad-8449-146f26827e7c",
                  "type": "has_only_phrase",
                  "uuid": "cfa0c7ba-d40b-40ef-87ca-40218e8914b1"
                },
                {
                  "arguments": [
                    "1"
                  ],
                  "category_uuid": "8681ab9e-9c82-4aad-8449-146f26827e7c",
                  "type": "has_only_phrase",
                  "uuid": "ccbc5101-98cb-4187-8215-f72e9c48cdbb"
                },
                {
                  "arguments": [
                    "2"
                  ],
                  "category_uuid": "8681ab9e-9c82-4aad-8449-146f26827e7c",
                  "type": "has_only_phrase",
                  "uuid": "d83cb506-d8ff-4a61-968f-19bc217ea5f2"
                },
                {
                  "arguments": [
                    "3"
                  ],
                  "category_uuid": "8681ab9e-9c82-4aad-8449-146f26827e7c",
                  "type": "has_only_phrase",
                  "uuid": "f23fd9c2-fd52-4669-952c-0e4d65655b43"
                },
                {
                  "arguments": [
                    "4"
                  ],
                  "category_uuid": "8681ab9e-9c82-4aad-8449-146f26827e7c",
                  "type": "has_only_phrase",
                  "uuid": "8e67a6d2-58dc-46a0-9fd4-d8f754c06d90"
                },
                {
                  "arguments": [
                    "5"
                  ],
                  "category_uuid": "1e10eb0c-c00b-4e94-aec7-3b0422ca37c7",
                  "type": "has_only_phrase",
                  "uuid": "fadea77e-4507-46fb-abe1-367ce1c3dfa5"
                },
                {
                  "arguments": [
                    "6"
                  ],
                  "category_uuid": "1e10eb0c-c00b-4e94-aec7-3b0422ca37c7",
                  "type": "has_only_phrase",
                  "uuid": "c79861d0-021b-4166-bd68-53e2beede428"
                },
                {
                  "arguments": [
                    "7"
                  ],
                  "category_uuid": "1e10eb0c-c00b-4e94-aec7-3b0422ca37c7",
                  "type": "has_only_phrase",
                  "uuid": "fbbe9449-cc40-48a0-a00a-8ba41f1f2bfe"
                },
                {
                  "arguments": [
                    "8"
                  ],
                  "category_uuid": "1e10eb0c-c00b-4e94-aec7-3b0422ca37c7",
                  "type": "has_only_phrase",
                  "uuid": "588e62a6-cece-4186-93e5-09baad139c70"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "ad276874-9633-4857-9f06-3e899321d031",
                  "name": "All Responses",
                  "uuid": "103aeca4-2ea0-4e0e-8a20-7bc5e6b52069"
                },
                {
                  "exit_uuid": "81915b6a-0d68-468f-8c25-2020c4b09b1b",
                  "name": "0;1;2;3;4",
                  "uuid": "8681ab9e-9c82-4aad-8449-146f26827e7c"
                },
                {
                  "exit_uuid": "80a4d030-9a9a-45ec-93cf-832ce26e86ec",
                  "name": "5;6;7;8",
                  "uuid": "1e10eb0c-c00b-4e94-aec7-3b0422ca37c7"
                }
              ],
              "operand": "@fields.welcomesurvey_q6"
            },
            "exits": [
              {
                "uuid": "ad276874-9633-4857-9f06-3e899321d031",
                "destination_uuid": null
              },
              {
                "uuid": "81915b6a-0d68-468f-8c25-2020c4b09b1b",
                "destination_uuid": "7bb5f32c-4f81-44b5-8679-03d0517d8336"
              },
              {
                "uuid": "80a4d030-9a9a-45ec-93cf-832ce26e86ec",
                "destination_uuid": "20e56954-91ff-4c89-a474-ce6d0c2857b5"
              }
            ]
          },
          {
            "uuid": "7bb5f32c-4f81-44b5-8679-03d0517d8336",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. It can be difficult to know how to keep our teens safe. We are here to support you!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c2b2c8b7-399f-4b3d-a5a0-028cf40e08d1"
              }
            ],
            "exits": [
              {
                "uuid": "9de2b26e-b7f8-4b9f-9bc8-e158cb6b7bfe",
                "destination_uuid": "44baf32b-0d5e-48db-8f39-514f0a167beb"
              }
            ]
          },
          {
            "uuid": "20e56954-91ff-4c89-a474-ce6d0c2857b5",
            "actions": [
              {
                "attachments": [],
                "text": "Being a parent is not easy and comes with lots of stress and responsibilities. Well done for focusing on keeping your teen safe!",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c306cbb2-58a0-46f7-8776-f7841646b765"
              }
            ],
            "exits": [
              {
                "uuid": "33b28e12-28c6-4cdb-a212-6fa90c80b3aa",
                "destination_uuid": "44baf32b-0d5e-48db-8f39-514f0a167beb"
              }
            ]
          },
          {
            "uuid": "44baf32b-0d5e-48db-8f39-514f0a167beb",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "70114fe0-cc26-4e31-91fc-2bd55fbaac09",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "2a8f17be-1e4f-4a36-8056-c96dc0ff0b94",
                  "type": "has_only_phrase",
                  "uuid": "7210d432-5efd-4f4e-9cd7-fc0e9ba055ed"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "08679928-1e3b-42bf-b00b-48101eaf8355",
                  "name": "All Responses",
                  "uuid": "70114fe0-cc26-4e31-91fc-2bd55fbaac09"
                },
                {
                  "exit_uuid": "3bee03d5-8a73-40a2-b595-c7089ccd1f00",
                  "name": "Next",
                  "uuid": "2a8f17be-1e4f-4a36-8056-c96dc0ff0b94"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "08679928-1e3b-42bf-b00b-48101eaf8355",
                "destination_uuid": null
              },
              {
                "uuid": "3bee03d5-8a73-40a2-b595-c7089ccd1f00",
                "destination_uuid": "1811126d-af18-40da-b3a7-3e75233b3761"
              }
            ]
          },
          {
            "uuid": "1811126d-af18-40da-b3a7-3e75233b3761",
            "actions": [
              {
                "attachments": [],
                "text": "That's it! We promised it will be less than a minute 😊 Thank you again for being honest. Remember that you are not alone! Millions of parents feel like you do, and we all deserve support. ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "689a5717-78a7-4d21-9748-971a151a3506"
              }
            ],
            "exits": [
              {
                "uuid": "73dc471d-1d76-4f98-95c2-c98f79b8e60a",
                "destination_uuid": "dc1f60c0-1005-4323-b4f4-7a0ff8e042a0"
              }
            ]
          },
          {
            "uuid": "dc1f60c0-1005-4323-b4f4-7a0ff8e042a0",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "766c70a3-caee-48d1-bd8f-b0ca3b615d16",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "32968e20-5331-455d-bba1-2c6f26e894db",
                  "type": "has_only_phrase",
                  "uuid": "41f74bb2-d5b7-40f1-8181-df8cbc1220b6"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "634f4bf5-f875-47d5-8c62-4be3f241f41b",
                  "name": "All Responses",
                  "uuid": "766c70a3-caee-48d1-bd8f-b0ca3b615d16"
                },
                {
                  "exit_uuid": "0b4c7141-ac51-4d54-9d89-3c14ac28a923",
                  "name": "Next",
                  "uuid": "32968e20-5331-455d-bba1-2c6f26e894db"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "634f4bf5-f875-47d5-8c62-4be3f241f41b",
                "destination_uuid": null
              },
              {
                "uuid": "0b4c7141-ac51-4d54-9d89-3c14ac28a923",
                "destination_uuid": "385cd79f-c553-4e9b-a754-f4d1636ce1d6"
              }
            ]
          },
          {
            "uuid": "385cd79f-c553-4e9b-a754-f4d1636ce1d6",
            "actions": [
              {
                "flow": {
                  "name": "ImmediateSupport",
                  "uuid": "15040b88-4eae-4aed-86b8-d9f353dc75d0"
                },
                "type": "enter_flow",
                "uuid": "c7ef3577-7799-4821-9774-b7b216153c7e"
              }
            ],
            "exits": [
              {
                "uuid": "2f998a40-5aa5-43ea-a765-c5c4fa37e523",
                "destination_uuid": null
              },
              {
                "uuid": "b62aeda8-b8e3-4eb4-be74-50204cf2fded",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "50710588-3a04-43cc-af3d-fa3edb8b8555",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "57130846-0bbb-4819-9929-f35add6af4c0"
                },
                {
                  "uuid": "b0afe5f3-0bbe-4dde-aed1-9850bf71c8d4",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "7835e05f-5c5a-4b22-bc9e-4da67df4fb50"
                }
              ],
              "categories": [
                {
                  "uuid": "57130846-0bbb-4819-9929-f35add6af4c0",
                  "name": "Complete",
                  "exit_uuid": "2f998a40-5aa5-43ea-a765-c5c4fa37e523"
                },
                {
                  "uuid": "7835e05f-5c5a-4b22-bc9e-4da67df4fb50",
                  "name": "Expired",
                  "exit_uuid": "b62aeda8-b8e3-4eb4-be74-50204cf2fded"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "57130846-0bbb-4819-9929-f35add6af4c0"
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
        "uuid": "d5b3f240-fc1b-4f67-9b1f-67fdd304c792",
        "spec_version": "13.1.0",
        "language": "base",
        "type": "messaging",
        "nodes": [
          {
            "uuid": "deedb1eb-0b11-4d45-aedb-2268b9700c87",
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
                "uuid": "628c6711-de5b-49f3-98e6-2d19d2f5a095"
              }
            ],
            "exits": [
              {
                "uuid": "7472b92c-3b01-4b42-bba8-4b32685a4eba",
                "destination_uuid": "0f80024f-7c43-4de8-b1b8-824b5aa269b0"
              }
            ]
          },
          {
            "uuid": "0f80024f-7c43-4de8-b1b8-824b5aa269b0",
            "actions": [],
            "exits": [
              {
                "uuid": "6abb0bdf-1eb4-49d6-9f04-f5fdba73d92b",
                "destination_uuid": "6eeb289f-9cf1-4062-9058-c93bb25caa96"
              }
            ],
            "router": {
              "type": "switch",
              "default_category_uuid": "502b3c8b-75ff-4db4-b4f8-da6e63f57a8b",
              "cases": [],
              "categories": [
                {
                  "uuid": "502b3c8b-75ff-4db4-b4f8-da6e63f57a8b",
                  "name": "All Responses",
                  "exit_uuid": "6abb0bdf-1eb4-49d6-9f04-f5fdba73d92b"
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
            "uuid": "6eeb289f-9cf1-4062-9058-c93bb25caa96",
            "actions": [
              {
                "uuid": "96c0d97d-5d8b-4fd8-9334-b8a7a23fd436",
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
                "uuid": "4978b5bc-20ef-4549-ac6f-d3e27f57faa2",
                "destination_uuid": "d12be7c3-cba6-4260-a92a-5b0339a80e57"
              }
            ]
          },
          {
            "uuid": "d12be7c3-cba6-4260-a92a-5b0339a80e57",
            "actions": [
              {
                "attachments": [],
                "text": "We know it can be hard to know what to do sometimes…",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "a002db5c-de37-4bd1-9de9-8959da51f1c0"
              }
            ],
            "exits": [
              {
                "uuid": "c7619d44-630e-4085-b57c-4715ab0a84e8",
                "destination_uuid": "2b1575ab-913b-4f3e-984c-7df476fda8bf"
              }
            ]
          },
          {
            "uuid": "2b1575ab-913b-4f3e-984c-7df476fda8bf",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "23d29205-7e33-4dcf-abcf-a0a0d3dcb843",
              "cases": [
                {
                  "arguments": [
                    "I want to have a better relationship with my teen"
                  ],
                  "category_uuid": "dfca1e2b-b30c-4193-ab7c-09e83343b664",
                  "type": "has_only_phrase",
                  "uuid": "071fc7fb-95cc-44d2-a270-fc4c9d77abb3"
                },
                {
                  "arguments": [
                    "I want my teen to behave better"
                  ],
                  "category_uuid": "e1b97819-148a-4288-a0b6-e40d8c3e4946",
                  "type": "has_only_phrase",
                  "uuid": "78139b73-639f-4faf-a085-317916232f33"
                },
                {
                  "arguments": [
                    "I want to feel less stress loneliness or anger"
                  ],
                  "category_uuid": "8c2285b5-31f2-43b5-a1df-5ee60fd8a772",
                  "type": "has_only_phrase",
                  "uuid": "870b6edd-1f4d-46b8-bc32-b0de7172cf01"
                },
                {
                  "arguments": [
                    "I want to worry about money less"
                  ],
                  "category_uuid": "4d9243da-eaca-44b9-935e-5115226b2000",
                  "type": "has_only_phrase",
                  "uuid": "47e5c628-0872-41dc-8597-2b504ac216c7"
                },
                {
                  "arguments": [
                    "I want less conflict in my family"
                  ],
                  "category_uuid": "07434e59-ba2e-4bbc-83a5-1566999c021a",
                  "type": "has_only_phrase",
                  "uuid": "137c9db9-96ca-4539-8c01-d302ad7b7955"
                },
                {
                  "arguments": [
                    "I want to know more about how to keep my teen safe online and offline"
                  ],
                  "category_uuid": "0eb2b5f1-31b5-4eae-9746-1dc852e21a68",
                  "type": "has_only_phrase",
                  "uuid": "1c9b473a-92a3-4a9e-8fa8-a5b94827ab12"
                },
                {
                  "arguments": [
                    "JML TO ADD DISABILITY OPTION "
                  ],
                  "category_uuid": "56931828-03cf-435e-82ee-f77e84281ebe",
                  "type": "has_only_phrase",
                  "uuid": "4f762330-4979-44b1-96ae-c4745d4b1693"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "55716bb0-e0ff-4e4c-946a-c1350eee479c",
                  "name": "All Responses",
                  "uuid": "23d29205-7e33-4dcf-abcf-a0a0d3dcb843"
                },
                {
                  "exit_uuid": "b174ea0a-5912-4869-be5a-a4b4c1f75638",
                  "name": "I want to have a better relationship with my teen",
                  "uuid": "dfca1e2b-b30c-4193-ab7c-09e83343b664"
                },
                {
                  "exit_uuid": "c5965a3e-800a-4fa8-9d0d-1dd6bfcaef60",
                  "name": "I want my teen to behave better",
                  "uuid": "e1b97819-148a-4288-a0b6-e40d8c3e4946"
                },
                {
                  "exit_uuid": "4b6a7973-0f8a-4c49-8f26-2bf56e350f14",
                  "name": "I want to feel less stress loneliness or anger",
                  "uuid": "8c2285b5-31f2-43b5-a1df-5ee60fd8a772"
                },
                {
                  "exit_uuid": "c3da94e4-f85f-4027-800e-e54e79aaea40",
                  "name": "I want to worry about money less",
                  "uuid": "4d9243da-eaca-44b9-935e-5115226b2000"
                },
                {
                  "exit_uuid": "24bac228-b374-4d0c-b140-5e41aaf3ce1a",
                  "name": "I want less conflict in my family",
                  "uuid": "07434e59-ba2e-4bbc-83a5-1566999c021a"
                },
                {
                  "exit_uuid": "e7842a41-4846-4877-8147-c724b9f1f9c6",
                  "name": "I want to know more about how to keep my teen safe online and offline",
                  "uuid": "0eb2b5f1-31b5-4eae-9746-1dc852e21a68"
                },
                {
                  "exit_uuid": "efd56a9f-d31e-4034-8563-8c37f160969e",
                  "name": "JML TO ADD DISABILITY OPTION ",
                  "uuid": "56931828-03cf-435e-82ee-f77e84281ebe"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "55716bb0-e0ff-4e4c-946a-c1350eee479c",
                "destination_uuid": null
              },
              {
                "uuid": "b174ea0a-5912-4869-be5a-a4b4c1f75638",
                "destination_uuid": "e55d8157-c3c3-4d4b-9b11-1ad473358f9c"
              },
              {
                "uuid": "c5965a3e-800a-4fa8-9d0d-1dd6bfcaef60",
                "destination_uuid": "2fbd28c6-dc33-4930-ae67-4b3ceeeea38f"
              },
              {
                "uuid": "4b6a7973-0f8a-4c49-8f26-2bf56e350f14",
                "destination_uuid": "be157a35-1172-47e3-a584-c81a574ce396"
              },
              {
                "uuid": "c3da94e4-f85f-4027-800e-e54e79aaea40",
                "destination_uuid": "729f3bff-933c-4fce-949d-398128a190f7"
              },
              {
                "uuid": "24bac228-b374-4d0c-b140-5e41aaf3ce1a",
                "destination_uuid": "5f256c96-a307-4348-996b-f223adbe5b0d"
              },
              {
                "uuid": "e7842a41-4846-4877-8147-c724b9f1f9c6",
                "destination_uuid": "d6e4d339-ab3f-4cfa-b0ea-f68ae8f61e5c"
              },
              {
                "uuid": "efd56a9f-d31e-4034-8563-8c37f160969e",
                "destination_uuid": "1e7afdda-224b-4f96-8b56-648f35b5f338"
              }
            ]
          },
          {
            "uuid": "e55d8157-c3c3-4d4b-9b11-1ad473358f9c",
            "actions": [
              {
                "attachments": [],
                "text": "Spending time with your teen is free and even 10 minutes a day helps build trust. Try asking your teen what they would like to do together. It can be fun and relaxing for you too! \n\n",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "ad4ebbb3-b875-4090-92c9-dea837e5e94d"
              }
            ],
            "exits": [
              {
                "uuid": "2651bce9-b22d-4b39-9882-eb87bbf18c71",
                "destination_uuid": "8a25c00c-6bbe-4f78-a7bf-f70db234d023"
              }
            ]
          },
          {
            "uuid": "8a25c00c-6bbe-4f78-a7bf-f70db234d023",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "87813952-2d9f-47d1-b69a-d7ef35bbf1f7",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "1a4608fa-1f2f-48bc-bb24-9de0afccfa07",
                  "type": "has_only_phrase",
                  "uuid": "681e9caf-38cb-44bd-ae30-514006e87109"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "cd92dbb3-0385-46b7-aec8-a5b85d4a6d3a",
                  "name": "All Responses",
                  "uuid": "87813952-2d9f-47d1-b69a-d7ef35bbf1f7"
                },
                {
                  "exit_uuid": "2dceca86-433b-40df-88d1-42a91e464fed",
                  "name": "Next",
                  "uuid": "1a4608fa-1f2f-48bc-bb24-9de0afccfa07"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "cd92dbb3-0385-46b7-aec8-a5b85d4a6d3a",
                "destination_uuid": null
              },
              {
                "uuid": "2dceca86-433b-40df-88d1-42a91e464fed",
                "destination_uuid": "ced84221-28c2-49e6-973a-0bc03c7bb812"
              }
            ]
          },
          {
            "uuid": "ced84221-28c2-49e6-973a-0bc03c7bb812",
            "actions": [
              {
                "attachments": [],
                "text": "Your PARENTapp journey will include more support for this goal.",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2675b0b5-948a-4d1e-b067-ca3f902ea639"
              }
            ],
            "exits": [
              {
                "uuid": "e625872d-3ab2-43d7-9185-6297b70a6b99",
                "destination_uuid": "09f38258-2c4d-4ab7-98aa-af4f0698e570"
              }
            ]
          },
          {
            "uuid": "2fbd28c6-dc33-4930-ae67-4b3ceeeea38f",
            "actions": [
              {
                "attachments": [],
                "text": "One thing that can help with teenage behaviour is to praise anytime that they do something good – however small. Teens may not look like they want your praise but they still really, really do.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "cf1a43d0-4056-45de-8637-f2e89071830a"
              }
            ],
            "exits": [
              {
                "uuid": "97878c2c-5c8e-4736-9f0f-c9fbeb6131fa",
                "destination_uuid": "9d8e65d8-12c6-461a-975d-9018db38eace"
              }
            ]
          },
          {
            "uuid": "9d8e65d8-12c6-461a-975d-9018db38eace",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "0173837d-1d3c-44f4-b9e6-ab7166524255",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "15a2f6d0-b899-4992-bcf9-6a25b1b7c014",
                  "type": "has_only_phrase",
                  "uuid": "9555dd6a-e441-47d1-a384-60eda244de6c"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "55a1e7ba-a194-4d93-b688-e26b31323e9e",
                  "name": "All Responses",
                  "uuid": "0173837d-1d3c-44f4-b9e6-ab7166524255"
                },
                {
                  "exit_uuid": "3c47d1af-b728-4c76-abb2-7fe0e86f789a",
                  "name": "Next",
                  "uuid": "15a2f6d0-b899-4992-bcf9-6a25b1b7c014"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "55a1e7ba-a194-4d93-b688-e26b31323e9e",
                "destination_uuid": null
              },
              {
                "uuid": "3c47d1af-b728-4c76-abb2-7fe0e86f789a",
                "destination_uuid": "5dc351a7-788b-43cd-b532-10588671e547"
              }
            ]
          },
          {
            "uuid": "5dc351a7-788b-43cd-b532-10588671e547",
            "actions": [
              {
                "attachments": [],
                "text": "We hope this small tip will help. More support on how to deal with difficult teen behaviour will be covered later on when we talk about \"Rules\".",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ed9df55d-0490-4942-b234-f45837ebb82f"
              }
            ],
            "exits": [
              {
                "uuid": "6f301c66-3277-42a4-b5a3-b3fef88a16cf",
                "destination_uuid": "09f38258-2c4d-4ab7-98aa-af4f0698e570"
              }
            ]
          },
          {
            "uuid": "be157a35-1172-47e3-a584-c81a574ce396",
            "actions": [
              {
                "attachments": [],
                "text": "Caring for yourself is really important. Try taking five deep breaths when you feel overwhelmed. Why not talk to a friend, or do something relaxing for yourself? You deserve it! ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "c0321f38-3267-4c35-abe2-8e07cf4fd170"
              }
            ],
            "exits": [
              {
                "uuid": "e4c6e016-8516-4717-9293-f0eaa3a79241",
                "destination_uuid": "e7248bc8-fbd3-453a-b8e5-b5312b3f90c8"
              }
            ]
          },
          {
            "uuid": "e7248bc8-fbd3-453a-b8e5-b5312b3f90c8",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "764997cb-5b75-4646-b504-34a07e569bc1",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "0ea7af8a-34f1-48a0-87f3-20b1cc355d2a",
                  "type": "has_only_phrase",
                  "uuid": "22f280a8-5810-4274-801f-dd386a912f34"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "3b555ba7-b414-4fb0-9a87-beb32103e95d",
                  "name": "All Responses",
                  "uuid": "764997cb-5b75-4646-b504-34a07e569bc1"
                },
                {
                  "exit_uuid": "7c0a5b48-cfc2-48d5-b4d2-352415b78a63",
                  "name": "Next",
                  "uuid": "0ea7af8a-34f1-48a0-87f3-20b1cc355d2a"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "3b555ba7-b414-4fb0-9a87-beb32103e95d",
                "destination_uuid": null
              },
              {
                "uuid": "7c0a5b48-cfc2-48d5-b4d2-352415b78a63",
                "destination_uuid": "926649f5-b846-41dc-9a97-ccb3396fb43b"
              }
            ]
          },
          {
            "uuid": "926649f5-b846-41dc-9a97-ccb3396fb43b",
            "actions": [
              {
                "attachments": [],
                "text": "We hope this small tip will help. More support will be given later on when we talk about \"Managing anger and stress\".",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "ae804ac9-081c-43c2-86de-7122f85ce54f"
              }
            ],
            "exits": [
              {
                "uuid": "d40f1370-5f8b-4d7e-afff-565ed276a256",
                "destination_uuid": "09f38258-2c4d-4ab7-98aa-af4f0698e570"
              }
            ]
          },
          {
            "uuid": "729f3bff-933c-4fce-949d-398128a190f7",
            "actions": [
              {
                "attachments": [],
                "text": "Talk to your teen about how much money comes in and what you spend money on as a family each month. When everyone sees where the money goes, it is easier to agree on where you can save money together! ",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "9a5dd86e-2f92-44cc-9705-d03e8258a107"
              }
            ],
            "exits": [
              {
                "uuid": "97a1cc61-20ad-49b2-94a8-7604eb020e38",
                "destination_uuid": "20e08276-14ea-42bd-a340-f13459b5ad13"
              }
            ]
          },
          {
            "uuid": "20e08276-14ea-42bd-a340-f13459b5ad13",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "b4e2924f-1165-4f7a-878f-0b2e43acedef",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "bfe8c951-2fa5-4d8d-b772-5539a345f684",
                  "type": "has_only_phrase",
                  "uuid": "3690cb85-9296-4035-a0c3-7881f7afa9bf"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0dacdaf0-ef93-4e98-b821-69ae919373ca",
                  "name": "All Responses",
                  "uuid": "b4e2924f-1165-4f7a-878f-0b2e43acedef"
                },
                {
                  "exit_uuid": "3b3e2211-a7ae-4f78-8bc9-7ce40fa12cbb",
                  "name": "Next",
                  "uuid": "bfe8c951-2fa5-4d8d-b772-5539a345f684"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0dacdaf0-ef93-4e98-b821-69ae919373ca",
                "destination_uuid": null
              },
              {
                "uuid": "3b3e2211-a7ae-4f78-8bc9-7ce40fa12cbb",
                "destination_uuid": "1aaf88de-add0-47ab-a33a-96ef7c5c5a69"
              }
            ]
          },
          {
            "uuid": "1aaf88de-add0-47ab-a33a-96ef7c5c5a69",
            "actions": [
              {
                "attachments": [],
                "text": "We hope this small tip will help. More support will be given in \"Family budgeting\".",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "4f16b381-0bb0-4387-80d0-0907112199eb"
              }
            ],
            "exits": [
              {
                "uuid": "30db1ea5-3b70-49c9-82bd-5add9ca332dd",
                "destination_uuid": "09f38258-2c4d-4ab7-98aa-af4f0698e570"
              }
            ]
          },
          {
            "uuid": "5f256c96-a307-4348-996b-f223adbe5b0d",
            "actions": [
              {
                "attachments": [],
                "text": "When a problem comes up, talk about it together! What is the problem exactly? What different solutions are there and what are the consequences of one? That way, you can find a solution that can be OK for everyone.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "6fdf1e2a-3a9b-42a6-99c8-6c3fddcf7d37"
              }
            ],
            "exits": [
              {
                "uuid": "99247bdc-749d-40df-a600-31daf7f81199",
                "destination_uuid": "d9d42455-0ee4-4b26-9af5-eec2b3e4443c"
              }
            ]
          },
          {
            "uuid": "d9d42455-0ee4-4b26-9af5-eec2b3e4443c",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "560bd5eb-52f4-48ed-beb4-8839ef28110c",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "cd2bd591-4986-47a0-a45d-d4d47c503004",
                  "type": "has_only_phrase",
                  "uuid": "aa8e244b-2b37-4527-bad1-d8a238decc03"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "75af5847-a1fb-44e6-be84-d46f40d7b96a",
                  "name": "All Responses",
                  "uuid": "560bd5eb-52f4-48ed-beb4-8839ef28110c"
                },
                {
                  "exit_uuid": "3b576fa6-5f4c-4aaa-8113-3c6c3f74ebc1",
                  "name": "Next",
                  "uuid": "cd2bd591-4986-47a0-a45d-d4d47c503004"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "75af5847-a1fb-44e6-be84-d46f40d7b96a",
                "destination_uuid": null
              },
              {
                "uuid": "3b576fa6-5f4c-4aaa-8113-3c6c3f74ebc1",
                "destination_uuid": "5feaf1f5-91de-43ec-bb38-2aac0d938677"
              }
            ]
          },
          {
            "uuid": "5feaf1f5-91de-43ec-bb38-2aac0d938677",
            "actions": [
              {
                "attachments": [],
                "text": "We hope this small tip will help. More support will be given later on when we talk about \"Problem solving\".",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "2f21539d-d9f8-426b-a1eb-47d8ea17f5dc"
              }
            ],
            "exits": [
              {
                "uuid": "c1856720-ce93-4995-beea-0f6960d6a00d",
                "destination_uuid": "09f38258-2c4d-4ab7-98aa-af4f0698e570"
              }
            ]
          },
          {
            "uuid": "d6e4d339-ab3f-4cfa-b0ea-f68ae8f61e5c",
            "actions": [
              {
                "attachments": [],
                "text": "Try to start a conversation with your teen about safe and unsafe places in your community and online. They may even know some you don’t. This will help you make a plan together about how to stay safe.",
                "type": "send_msg",
                "quick_replies": [
                  "Next"
                ],
                "uuid": "48b79a2b-eeaf-44cc-95db-41bff1dd410a"
              }
            ],
            "exits": [
              {
                "uuid": "a8fd776c-164d-4740-a660-fb9e91c88bbc",
                "destination_uuid": "79c0e006-12e8-496c-a5ab-fe4bf0b2c82d"
              }
            ]
          },
          {
            "uuid": "79c0e006-12e8-496c-a5ab-fe4bf0b2c82d",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "31280fa7-0442-438f-aff5-90f55a5d3e75",
              "cases": [
                {
                  "arguments": [
                    "Next"
                  ],
                  "category_uuid": "926fa724-d974-44b9-942b-c3cf1801a044",
                  "type": "has_only_phrase",
                  "uuid": "06de4e6e-e78c-4beb-8404-6d86da9107d9"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "6fe2e9c5-5c50-4976-8ceb-e3890ea9b5c7",
                  "name": "All Responses",
                  "uuid": "31280fa7-0442-438f-aff5-90f55a5d3e75"
                },
                {
                  "exit_uuid": "c6831c97-ea17-486d-8945-70b2b74673b3",
                  "name": "Next",
                  "uuid": "926fa724-d974-44b9-942b-c3cf1801a044"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "6fe2e9c5-5c50-4976-8ceb-e3890ea9b5c7",
                "destination_uuid": null
              },
              {
                "uuid": "c6831c97-ea17-486d-8945-70b2b74673b3",
                "destination_uuid": "5054c54b-f5ac-43f3-bcd4-403a1b989c8f"
              }
            ]
          },
          {
            "uuid": "5054c54b-f5ac-43f3-bcd4-403a1b989c8f",
            "actions": [
              {
                "attachments": [],
                "text": "We hope this small tip will help. More support will be given later on when we talk about \"keeping my teen safe\".",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "fa55715a-7b2d-436f-b87c-76ab653b1f34"
              }
            ],
            "exits": [
              {
                "uuid": "53f7e6c5-ce4a-43c1-ad23-b2cff57f0f05",
                "destination_uuid": "09f38258-2c4d-4ab7-98aa-af4f0698e570"
              }
            ]
          },
          {
            "uuid": "1e7afdda-224b-4f96-8b56-648f35b5f338",
            "actions": [
              {
                "attachments": [],
                "text": "[disability quick tip]",
                "type": "send_msg",
                "quick_replies": [],
                "uuid": "24a3fe13-5ea0-4266-809c-64c5805798e4"
              }
            ],
            "exits": [
              {
                "uuid": "8c89c847-0fac-47f7-b261-5acabe4b3e99",
                "destination_uuid": "09f38258-2c4d-4ab7-98aa-af4f0698e570"
              }
            ]
          },
          {
            "uuid": "09f38258-2c4d-4ab7-98aa-af4f0698e570",
            "actions": [
              {
                "attachments": [],
                "text": "There are many more practical and useful parenting tips that will help make your home a safe and happy place for everyone!",
                "type": "send_msg",
                "quick_replies": [
                  "Click to start your PARENTapp parenting journey!"
                ],
                "uuid": "051c22a5-4446-4b06-bccc-ec6962654344"
              }
            ],
            "exits": [
              {
                "uuid": "b8dc033f-1fbf-4716-9cd6-2ec75dc7c392",
                "destination_uuid": "ac05ca03-df92-469c-925b-6962090b7950"
              }
            ]
          },
          {
            "uuid": "ac05ca03-df92-469c-925b-6962090b7950",
            "actions": [],
            "router": {
              "type": "switch",
              "default_category_uuid": "67a5a4ec-220c-4483-8d7c-3d7918e4b50a",
              "cases": [
                {
                  "arguments": [
                    "Click to start your PARENTapp parenting journey!"
                  ],
                  "category_uuid": "3ec3cd0f-1689-4aa8-8119-00cbf4d8a1f1",
                  "type": "has_only_phrase",
                  "uuid": "a9fd2f02-5b6e-4dd2-9787-7b78cf30112b"
                }
              ],
              "categories": [
                {
                  "exit_uuid": "0d8daf13-366d-4b6c-984f-9763749295c0",
                  "name": "All Responses",
                  "uuid": "67a5a4ec-220c-4483-8d7c-3d7918e4b50a"
                },
                {
                  "exit_uuid": "89405eac-4d32-42af-849b-89919b1fb7e1",
                  "name": "Click to start your PARENTapp parenting journey!",
                  "uuid": "3ec3cd0f-1689-4aa8-8119-00cbf4d8a1f1"
                }
              ],
              "operand": "@input.text",
              "wait": {
                "type": "msg"
              }
            },
            "exits": [
              {
                "uuid": "0d8daf13-366d-4b6c-984f-9763749295c0",
                "destination_uuid": null
              },
              {
                "uuid": "89405eac-4d32-42af-849b-89919b1fb7e1",
                "destination_uuid": "c512ebbc-0566-4e12-b8b0-e8dedf99a621"
              }
            ]
          },
          {
            "uuid": "c512ebbc-0566-4e12-b8b0-e8dedf99a621",
            "actions": [
              {
                "flow": {
                  "name": "homescreen",
                  "uuid": "53e73ce7-40ca-48ea-9345-cf6b690902fe"
                },
                "type": "enter_flow",
                "uuid": "c4cf61b4-9dfc-42ac-935f-ab510d898ebe"
              }
            ],
            "exits": [
              {
                "uuid": "16da8264-d8ce-408f-ad09-178797889f5b",
                "destination_uuid": null
              },
              {
                "uuid": "f11d8987-8f7a-4d42-9861-5a27a1aba00c",
                "destination_uuid": null
              }
            ],
            "router": {
              "cases": [
                {
                  "uuid": "8e01d415-740b-4299-aad7-5b3821bb3958",
                  "type": "has_only_text",
                  "arguments": [
                    "completed"
                  ],
                  "category_uuid": "c7e3f435-cb31-4d99-ad96-f20ff58019a4"
                },
                {
                  "uuid": "228ad69d-03a2-4b19-ac86-e2a627086135",
                  "type": "has_only_text",
                  "arguments": [
                    "expired"
                  ],
                  "category_uuid": "29180219-1121-4764-80a7-ad8df743ec5b"
                }
              ],
              "categories": [
                {
                  "uuid": "c7e3f435-cb31-4d99-ad96-f20ff58019a4",
                  "name": "Complete",
                  "exit_uuid": "16da8264-d8ce-408f-ad09-178797889f5b"
                },
                {
                  "uuid": "29180219-1121-4764-80a7-ad8df743ec5b",
                  "name": "Expired",
                  "exit_uuid": "f11d8987-8f7a-4d42-9861-5a27a1aba00c"
                }
              ],
              "operand": "@child.run.status",
              "type": "switch",
              "default_category_uuid": "c7e3f435-cb31-4d99-ad96-f20ff58019a4"
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