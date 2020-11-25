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

export type ToolboxElementType = "LIST" | "CORE_TIP" | "TEXT"

export type ToolboxElement = {
    type: ToolboxElementType,
    intro?: string,
    text?: string,
    items?: {
        heading: string,
        body: string
    }[]
}

export interface ToolboxExport {
    topics: ToolboxTopic[]
}

export interface ToolboxTip{
    "Flow_Type": string,
    "Module": string,
    "Flow_Name": string,
    "Title"?: string,
    "data": TipData[]
}

export interface TipData{
    "Type": string,
    "MessageText"?: string,
    "Media"?: string
    "Comment/suggestion/visual"?: string
}