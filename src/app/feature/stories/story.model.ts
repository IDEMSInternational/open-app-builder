export interface Story {
    id: string;
    name: string;
    panels: StoryPanel[];
}

export interface StoryPanel {
    imageSrc: string;
}