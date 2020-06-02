export interface Story {
    id: string;
    name: string;
    hasChoices?: boolean; // True if a choose your own adventure
    panels: StoryPanel[];
    narrationAudioSrc?: string;
}

export interface StoryPanel {
    id?: string;
    imageSrc: string;
    audioStartTimeSeconds?: number;
    audioEndTimeSeconds?: number;
    currentPanelDescription?: string;
    nextPanelQuestion?: string; // e.g Should she pick up the phone?
    nextPanelOptions?: StoryOption[];
    conclusion?: string;
    goodEnding?: boolean;
}

export interface StoryOption {
    type: "next" | "choice" | "random";
    nextPanelId: string;
    optionDescription?: string; // e.g Option A: Tell Amani it's grandma's hospital
    optionButtonType?: "yes" | "no" | "optionA" | "optionB";
}