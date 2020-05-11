export interface Story {
    id: string;
    name: string;
    panels: StoryPanel[];
    narrationAudioSrc?: string;
}

export interface StoryPanel {
    imageSrc: string;
    audioStartTimeSeconds?: number;
}