import { RapidProFlowExport } from '../rapid-pro-export.model';

export const testFlowExport1: RapidProFlowExport.RootObject = {
    "version": "13",
    "site": "https://rapidpro.idems.international",
    "flows": [
        {
            "name": "test1",
            "uuid": "uuid1234-4bcc-4530-9c5a-14cd94f7e75e",
            "spec_version": "13.1.0",
            "language": "base",
            "type": "messaging",
            "nodes": [
                {
                    "uuid": "4f6c1c9d-25b9-4378-ba47-7f72fe0d57c4",
                    "actions": [
                        {
                            "attachments": [],
                            "text": "hello are you feeling?",
                            "type": "send_msg",
                            "quick_replies": [],
                            "uuid": "977642b9-e6bb-4a0d-8e2f-7013a6831fa1"
                        }
                    ],
                    "exits": [
                        {
                            "uuid": "f9b4e831-7b6d-4975-ba01-2a9882b9214f",
                            "destination_uuid": null
                        }
                    ]
                }
            ],
            "_ui": {
                "nodes": {
                    "4f6c1c9d-25b9-4378-ba47-7f72fe0d57c4": {
                        "position": {
                            "left": 20,
                            "top": 20
                        },
                        "type": "execute_actions"
                    }
                }
            },
            "revision": 11,
            "expire_after_minutes": 10080,
            "metadata": {
                "revision": 10
            },
            "localization": {}
        }
    ],
    "campaigns": [],
    "triggers": [],
    "fields": [],
    "groups": []
}