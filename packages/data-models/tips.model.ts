export type ToolboxTopicType =
  | "ONE_ON_ONE_TIME"
  | "PRAISE_AND_POSITIVE_REINFORCEMENT"
  | "MANAGING_ANGER_AND_STRESS"
  | "FAMILY_BUDGETING"
  | "RULES_AND_ROUTINES"
  | "ACCEPTING_RESPONSIBILITY"
  | "PROBLEM_SOLVING"
  | "RISK_MAPPING_AND_DEALING_WITH_CRISIS";

export interface ToolboxTopicMetadata {
  type: ToolboxTopicType;
  languageCode: string;
  name: string;
  unlocked?: boolean;
  buttonColor?: string;
}

export type ToolboxTopic = {
  metadata: ToolboxTopicMetadata;
  contentSections: ToolboxSection[];
};

export interface ToolboxSection {
  title: string;
  elements: ToolboxElement[];
}

export type ToolboxElementType = "TITLE" | "CORE_TIP" | "TEXT" | "LIST";

export type ToolboxElement = {
  type: ToolboxElementType;
  intro?: string;
  text?: string;
  items?: {
    heading: string;
    body: string;
  }[];
};

export interface ToolboxExport {
  topics: ToolboxTopic[];
}

export interface TipRow {
  type: "title" | "text" | "list_intro" | "core_tip" | "list_item" | "list_group";
  message_text?: string;
  media?: string;
  comment?: string;
  comments?: string;
  rows?: TipRow[];
}
