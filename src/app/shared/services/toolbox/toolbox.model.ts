export type ToolboxTopicType = "ONE_ON_ONE_TIME"
    | "PRAISE_AND_POSITIVE_REINFORCEMENT"
    | "MANAGING_ANGER_AND_STRESS"
    | "FAMILY_BUDGETING"
    | "RULES_AND_ROUTINES"
    | "ACCEPTING_RESPONSIBILITY"
    | "PROBLEM_SOLVING"
    | "RISK_MAPPING_AND_DEALING_WITH_CRISIS"

export interface ToolboxTopic {
    type: ToolboxTopicType,
    languageCode: string,
    name: string,
    unlocked?: boolean,
    buttonColor?: string,
    pages?: ToolboxPage[]
}

export type ToolboxContentType = ""

export interface ToolboxPage {
    title: string,
    elements: ToolboxElement[]
}

export type ToolboxListElement = {
    type: "LIST",
    intro: string,
    items: {
        heading: string,
        body: string
    }[]
}

export type ToolboxCoreTipElement = {
    type: "CORE_TIP",
    text: string
}

export type ToolboxTextElement = {
    type: "TEXT",
    text: string
}

export type ToolboxElement = ToolboxListElement | ToolboxCoreTipElement | ToolboxTextElement

export interface ToolboxExport {
    topics: ToolboxTopic[]
}

