export type ToolboxTopicType = "ONE_ON_ONE_TIME"
    | "PRAISE_AND_POSITIVE_REINFORCEMENT"
    | "MANAGING_ANGER_AND_STRESS"
    | "FAMILY_BUDGETING"
    | "RULES_AND_ROUTINES"
    | "ACCEPTING_RESPONSIBILITY"
    | "PROBLEM_SOLVING"
    | "RISK_MAPPING_AND_DEALING_WITH_CRISIS"

export interface ToolboxTopicMetadata {
    type: ToolboxTopicType,
    languageCode: string,
    name: string,
    unlocked?: boolean,
    buttonColor?: string,
}

export type ToolboxTopic = {
    metadata: ToolboxTopicMetadata,
    contentSections: ToolboxSection[]
}

export interface ToolboxSection {
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

export type ToolboxElementType = "LIST" | "CORE_TIP" | "TEXT"

export type ToolboxElement = { type: ToolboxElementType } & ToolboxListElement | ToolboxCoreTipElement | ToolboxTextElement

export interface ToolboxExport {
    topics: ToolboxTopic[]
}

