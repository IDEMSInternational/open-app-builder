import { Story } from '../story.model';

export const bibiSaraStory: Story = {
    id: "bibi-sara",
    name: "Bibi Sara",
    panels: [0, 1, 2, 3, 4].map((index) => {
        return { imageSrc: `assets/images/stories/bibi-sara-story/${index}.jpg` }
    })
};