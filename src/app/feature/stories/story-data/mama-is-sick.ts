import { Story } from '../story.model';

export const mamaissick: Story = {
    id: "mama-is-sick",
    name: "Mama is Sick",
    panels: [0, 1, 2, 3, 4, 5].map((index) => {
        return { imageSrc: `assets/images/stories/mama-is-sick/${index}.jpg` }
    })
};