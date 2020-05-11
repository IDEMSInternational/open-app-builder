import { Story } from '../story.model';

export const breadAndBullyStory: Story = {
    id: "bread-and-bully",
    name: "Bread and the Bully",
    panels: [0, 1, 2, 3, 4, 5, 6].map((index) => {
        return { imageSrc: `assets/images/stories/bread-and-bully-story/${index}.jpg` }
    })
};