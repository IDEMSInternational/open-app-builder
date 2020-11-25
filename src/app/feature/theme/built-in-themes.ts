import { AppTheme } from './theme.model';

export const BASE_THEME: AppTheme = {
    "name": "PLH Teens 1",
    "editable": true,
    "colors": {
        "primary": {
            "name": "Primary",
            "lightValue": "#0d4060",
            "darkValue": "#0d4060",
            "id": "primary",
        },
        "secondary": {
            "id": "secondary",
            "name": "Secondary",
            "lightValue": "#f3d668",
            "darkValue": "#f3d668",
        },
        "tertiary": {
            "id": "tertiary",
            "name": "Tertiary",
            "lightValue": "#00a1cd",
            "darkValue": "#00a1cd",
        },
        "success": {
            "id": "success",
            "name": "Success",
            "lightValue": "#2dd36f",
            "darkValue": "#2dd36f",
        },
        "warning": {
            "id": "warning",
            "name": "Warning",
            "lightValue": "#ffc409",
            "darkValue": "#ffc409",
        },
        "danger": {
            "id": "danger",
            "name": "Danger",
            "lightValue": "#eb445a",
            "darkValue": "#eb445a",
        },
        "dark": {
            "id": "dark",
            "name": "Dark",
            "lightValue": "#222428",
            "darkValue": "#222428",
        },
        "medium": {
            "id": "medium",
            "name": "Medium",
            "lightValue": "#92949c",
            "darkValue": "#92949c",
        },
        "light": {
            "id": "light",
            "name": "Light",
            "lightValue": "#f4f5f8",
            "darkValue": "#f4f5f8",
        },
        "background": {
            "id": "background",
            "name": "Background",
            "lightValue": "#F3D668",
            "darkValue": "#222",
        },
        "itemBackground": {
            "id": "itemBackground",
            "name": "Item Background",
            "lightValue": "#eee",
            "darkValue": "#222",
        },
        "myJourneyButton": {
            "id": "myJourneyButton",
            "name": "Home - My Journey Button",
            "lightValue": "#ed1651",
            "darkValue": "#ed1651",
        },
        "toolboxButton": {
            "id": "toolboxButton",
            "name": "Home - Toolbox Button",
            "lightValue": "#ff9b05",
            "darkValue": "#ff9b05",
        },
        "helpMeNowButton": {
            "id": "helpMeNowButton",
            "name": "Home - Help Me Now Button",
            "lightValue": "#5FC4D2",
            "darkValue": "#5FC4D2",
        },
        "myPlansButton": {
            "id": "myPlansButton",
            "name": "Home - My Plan Button",
            "lightValue": "#5652a3",
            "darkValue": "#5652a3",
        },
        "myParentingMomentsButton": {
            "id": "myParentingMomentsButton",
            "name": "Home - My parenting moments Button",
            "lightValue": "#0f8ab2",
            "darkValue": "#0f8ab2",
        },
        "ONE_ON_ONE_TIME": {
            "id": "ONE_ON_ONE_TIME",
            "name": "Module - One-on-One Time",
            "lightValue": "#F7911E",
            "darkValue": "#F7911E"
        },
        "PRAISE_AND_POSITIVE_REINFORCEMENT": {
            "id": "PRAISE_AND_POSITIVE_REINFORCEMENT",
            "name": "Module - Praise & Positive Reinforcement",
            "lightValue": "#ED1651",
            "darkValue": "#ED1651"
        },
        "MANAGING_ANGER_AND_STRESS": {
            "id": "MANAGING_ANGER_AND_STRESS",
            "name": "Module - Managing Anger & Stress",
            "lightValue": "#5652A3",
            "darkValue": "#5652A3"
        },
        "FAMILY_BUDGETING": {
            "id": "FAMILY_BUDGETING",
            "name": "Module - Family Budgeting",
            "lightValue": "#8885D1",
            "darkValue": "#8885D1"
        },
        "RULES_AND_ROUTINES": {
            "id": "RULES_AND_ROUTINES",
            "name": "Module - Rules & Routines",
            "lightValue": "#54C5D0",
            "darkValue": "#54C5D0"
        },
        "ACCEPTING_RESPONSIBILITY": {
            "id": "ACCEPTING_RESPONSIBILITY",
            "name": "Module - Accepting Responsibilities",
            "lightValue": "#0F8AB2",
            "darkValue": "#0F8AB2"
        },
        "PROBLEM_SOLVING": {
            "id": "PROBLEM_SOLVING",
            "name": "Module - Problem Solving",
            "lightValue": "#2E9E48",
            "darkValue": "#2E9E48"
        },
        "RISK_MAPPING_AND_DEALING_WITH_CRISIS": {
            "id": "RISK_MAPPING_AND_DEALING_WITH_CRISIS",
            "name": "Module - Risk Mapping & Dealing with Crisis",
            "lightValue": "#227535",
            "darkValue": "#227535"
        },
        "userMsgBubble": {
            "id": "userMsgBubble",
            "name": "Chat - User Message Bubble",
            "lightValue": "#E9EBEB",
            "darkValue": "#E9EBEB"
        },
        "botMsgBubble": {
            "id": "botMsgBubble",
            "name": "Chat - Bot Message Bubble",
            "lightValue": "#CAE6FC",
            "darkValue": "#CAE6FC"
        }
    }
};

export const THEME_1: AppTheme = {
    name: "PLH Teens 1",
    editable: true,
    colors: {
        primary: {
            name: "Primary",
            lightValue: "#0d4060",
            darkValue: "#0d4060"
        }
    }
};


export const THEME_2: AppTheme = {
    name: "PLH Teens 2",
    editable: true,
    colors: {
        primary: {
            name: "Primary",
            lightValue: "#ff4060",
            darkValue: "#ff4060"
        }
    }
};

export const BUILT_IN_EDITABLE_THEMES: AppTheme[] = [THEME_1, THEME_2];